import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { CreatePayoutInput, UpdatePayoutInput } from "./payout.types";

const FRONTDESK_SERVICE_URL = process.env.FRONTDESK_SERVICE_URL || "http://localhost:4001";
const CUSTOMER_SERVICE_URL = process.env.CUSTOMER_SERVICE_URL || "http://localhost:4002";

export default class PayoutService {
async createPayout(data: CreatePayoutInput & { authorization: string }) {
  const { authorization, ...payoutData } = data;
  await this.validateReferences(payoutData, authorization);
  return prisma.payout.create({ data: payoutData });
}



  async getPayout(id: string) {
    return prisma.payout.findUnique({ where: { id } });
  }

  async getPayouts() {
    return prisma.payout.findMany();
  }

async updatePayout(id: string, data: UpdatePayoutInput & { authorization: string; hotelId: string }) {
  const { authorization, hotelId, ...payoutData } = data;

  const existing = await prisma.payout.findUnique({ where: { id } });
  if (!existing) throw new AppError("Payout not found", 404);

  // Ensure payout belongs to this hotel (optional but safer)
  if (existing.hotelId !== hotelId) {
    throw new AppError("Unauthorized to update this payout", 403);
  }

  // Only validate references if guestId or itemId is being updated
  if (payoutData.guestId || payoutData.itemId) {
    await this.validateReferences(payoutData, authorization);
  }

  return prisma.payout.update({
    where: { id },
    data: payoutData,
  });
}


async getPayoutByFolioItem(itemId:string){
  return prisma.payout.findFirst({
    where:{itemId}
  })
}
  async deletePayout(id: string) {
    return prisma.payout.delete({ where: { id } });
  }
 private async validateReferences(data: Partial<CreatePayoutInput>, authorization: string) {
  const { guestId, itemId } = data;

  // Validate guestId if present
  if (guestId) {
    const res = await fetch(`${CUSTOMER_SERVICE_URL}/guest/get/${guestId}`, {
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new AppError("Invalid guest ID", 400);
    }
  }

  // Validate itemId only if present
  if (itemId) {
    const res = await fetch(`${FRONTDESK_SERVICE_URL}/folio-item/get/${itemId}`, {
      headers: {
        Authorization: authorization || "",
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new AppError(`Invalid folio item ID: ${itemId}`, 400);
    }
  }
}
}