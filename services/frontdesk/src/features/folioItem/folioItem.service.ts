import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { CreateFolioItemParams, UpdateFolioItemParams } from "./folioItem.types";

export default class FolioItemService {
async createFolioItem({
  folioId,
  itemType,
  quantity,
  unitPrice,
  hotelId,
  isPayment = false,
}: CreateFolioItemParams & { isPayment?: boolean }) {
  const finalUnitPrice = unitPrice!;
  const calculatedAmount = finalUnitPrice * quantity;

  // Save amount negative if payment, positive if charge
  const amountToSave = isPayment ? -Math.abs(calculatedAmount) : calculatedAmount;

  return await prisma.$transaction(async (tx) => {
    const item = await tx.folioItem.create({
      data: { folioId, itemType, quantity, unitPrice: finalUnitPrice, amount: amountToSave },
    });

    await tx.folio.update({
      where: { id: folioId },
      data: {
        balance: {
          [isPayment ? "decrement" : "increment"]: Math.abs(calculatedAmount),
        },
      },
    });

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
      data: { status: "TRANSFERRED" },
    });

    return { message: `${itemsToCopy.length} items copied`, totalAmount };
  });
}

async voidFolioItem(id: string, voidReason: string, voidedBy: string, hotelId: string) {
  // Find the folio item including folio to check hotel ownership
  const folioItem = await prisma.folioItem.findFirst({
    where: {
      id,
      Folio: { hotelId }
    },
    include: { Folio: true },
  });

  if (!folioItem) {
    throw new AppError("Folio item not found", 404);
  }

  if (folioItem.isVoided) {
    throw new AppError("Folio item is already voided", 400);
  }

  // Start transaction: update folio item and adjust folio balance
  return await prisma.$transaction(async (tx) => {
    // Mark the item as voided
    const updatedItem = await tx.folioItem.update({
      where: { id },
      data: {
        isVoided: true,
        voidReason,
        voidedAt: new Date(),
        voidedBy,
      },
    });

    // Subtract the amount from the folio balance
    await tx.folio.update({
      where: { id: folioItem.folioId },
      data: {
        balance: { decrement: updatedItem.amount },
      },
    });

    return updatedItem;
  });
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