import { FolioItemStatus, FolioStatus } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { recalculateFolioBalance } from "../../utils/recalculateFolioBalance";
import { CreateFolioItemParams, UpdateFolioItemParams } from "./folioItem.types";

const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL;
export enum PayoutStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  VOIDED = "VOIDED",
}

export default class FolioItemService {

async createFolioItem({
  folioId,
  itemType,
  quantity,
  unitPrice,
  hotelId,
}: CreateFolioItemParams) {
  const finalUnitPrice = unitPrice!;
  const calculatedAmount = finalUnitPrice * quantity;

  return await prisma.$transaction(async (tx) => {
    const item = await tx.folioItem.create({
      data: {
        folioId,
        itemType,
        quantity,
        unitPrice: finalUnitPrice,
        amount: calculatedAmount,
      },
    });

    // Call balance recalculation
    await recalculateFolioBalance(folioId);

    return item;
  });
}

async TransferFolioItems(fromFolioId: string, toFolioId: string, hotelId: string) {
  const sourceFolio = await prisma.folio.findFirst({
    where: { id: fromFolioId, hotelId },
    include: { folioItems: true },
  });

  if (!sourceFolio) throw new AppError("Source folio not found", 404);

  const targetFolio = await prisma.folio.findFirst({
    where: { id: toFolioId, hotelId },
  });

  if (!targetFolio) throw new AppError("Target folio not found", 404);

  // Prepare new folio items to copy
  const itemsToCopy = sourceFolio.folioItems.map((item) => ({
    folioId: toFolioId,
    itemType: item.itemType,
    amount: item.amount,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    isVoided: false,
  }));

  const totalAmount = itemsToCopy.reduce((sum, item) => sum + Number(item.amount), 0);

  return await prisma.$transaction(async (tx) => {
    // Create new folio items on target folio
    await tx.folioItem.createMany({ data: itemsToCopy });

    // Update target folio balance
    await tx.folio.update({
      where: { id: toFolioId },
      data: { balance: { increment: totalAmount } },
    });

    // Set source folio status to TRANSFERRED
    await tx.folio.update({
      where: { id: fromFolioId },
      data: { status: FolioStatus.TRANSFERRED },
    });

    return { message: `${itemsToCopy.length} items copied`, totalAmount };
  });
}

async settleCharge(
  folioItemIds: string[],
  hotelId: string,
  authToken: string,
  payoutData: {
    currencyId?: string;
    type?: string;
    source?: string;
    reference?: string;
  }
) {
  const folioItems = await prisma.folioItem.findMany({
    where: {
      id: { in: folioItemIds },
      status: "UNPAID",
      Folio: { hotelId },
    },
    select: {
      id: true,
      folioId: true,
      amount: true,
      Folio: {
        select: {
          reservation: {
            select: {
              guestId: true,
            },
          },
        },
      },
    },
  });

  if (folioItems.length === 0) {
    throw new AppError("No valid unpaid folio items found", 400);
  }

  await prisma.folioItem.updateMany({
    where: {
      id: { in: folioItems.map((item) => item.id) },
      status: "UNPAID",
    },
    data: { status: "PAID" },
  });

  const affectedFolioIds = [...new Set(folioItems.map((item) => item.folioId))];
  console.log("folioItems",folioItems)
  for (const item of folioItems) {
    try {
const res = await fetch(`${PAYMENT_SERVICE_URL}/payout/add`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: authToken,
  },
  body: JSON.stringify({
    amount: Number(item.amount),
    currencyId: payoutData.currencyId,
    source: payoutData.source,
    status:PayoutStatus.COMPLETED,
    type: payoutData.type,
    reference: payoutData.reference,
    guestId: item.Folio?.reservation?.guestId || null,
    itemId: item.id,
  }),
});

if (!res.ok) {
  const errBody = await res.text();
  console.error(`Payout failed for item ${item.id}:`, errBody);
}

    } catch (err) {
      console.error(`Failed to create payout for folioItem ${item.id}`, err);
    }
  }

  for (const folioId of affectedFolioIds) {
    await recalculateFolioBalance(folioId);
  }

  return {
    message: `${folioItems.length} folio items settled and payouts created`,
    folioIds: affectedFolioIds,
  };
}

async voidFolioItem(
  id: string,
  voidReason: string,
  voidedBy: string,
  hotelId: string,
  authToken: string
) {
  const folioItem = await prisma.folioItem.findFirst({
    where: { id, Folio: { hotelId } },
    include: { Folio: true },
  });

  if (!folioItem) throw new AppError("Folio item not found", 404);
  if (folioItem.status === FolioItemStatus.VOIDED) {
    throw new AppError("Folio item is already voided", 400);
  }

  const wasPaid = folioItem.status === FolioItemStatus.PAID;
  // Start DB transaction
  const updatedItem = await prisma.$transaction(async (tx) => {
    const item = await tx.folioItem.update({
      where: { id },
      data: {
        status: FolioItemStatus.VOIDED,
        voidReason,
        voidedAt: new Date(),
        voidedBy,
      },
    });

    await recalculateFolioBalance(item.folioId);
    return item;
  });

  // If it was paid before being voided, update the payout status
  if (wasPaid) {
    try {
      const payoutRes = await fetch(`${PAYMENT_SERVICE_URL}/payout/get-by-folio-item/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      });

      if (payoutRes.ok) {
        const payoutJson = await payoutRes.json();
        const payoutId = payoutJson?.data?.id;
        if (payoutId) {
          console.log("updating..")
          const updateRes = await fetch(`${PAYMENT_SERVICE_URL}/payout/update/${payoutId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: authToken,
            },
            body: JSON.stringify({
              status: PayoutStatus.VOIDED,
              hotelId,
            }),
          });

          if (!updateRes.ok) {
            const error = await updateRes.json().catch(() => ({}));
            console.error("Failed to void payout status:", error);
          }
        }
      } else {
        const errorData = await payoutRes.json().catch(() => ({}));
        console.error("Failed to fetch payout for voiding:", errorData);
      }
    } catch (err) {
      console.error("Error while voiding payout:", err);
    }
  }

  return updatedItem;
}






async getFolioItems(hotelId: string) {
  const folio = await prisma.folio.findMany({
    where: { hotelId },
  });
  return folio;
}

async getFolioItemsByFolio(folioId: string, hotelId: string) {
  const folio = await prisma.folio.findFirst({
    where: { id: folioId, hotelId },
  });
  if (!folio) throw new AppError("Folio not found or no access", 404);

  return prisma.folioItem.findMany({ where: { folioId } });
}


  async getFolioItem(id: string, hotelId: string) {
    return prisma.folioItem.findFirst({ where: { id, Folio: { hotelId } } });
  }

  async updateFolioItem(id: string, data: UpdateFolioItemParams, hotelId: string) {
    const existing = await prisma.folioItem.findFirst({ where: { id, Folio: { hotelId } } });
    if (!existing) throw new AppError("Folio item not found", 404);
    return prisma.folioItem.update({ where: { id }, data });
  }

  async deleteFolioItem(id: string, hotelId: string) {
    const existing = await prisma.folioItem.findFirst({ where: { id, Folio: { hotelId } } });
    if (!existing) throw new AppError("Folio item not found", 404);
    await prisma.folioItem.delete({ where: { id } });
  }
}