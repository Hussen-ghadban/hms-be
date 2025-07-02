import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { CreateFolioItemParams, UpdateFolioItemParams } from "./folioItem.types";

export default class FolioItemService {
  async createFolioItem({ folioId, itemType, quantity, unitPrice, amount, hotelId }: CreateFolioItemParams) {
    const finalUnitPrice = unitPrice ?? (amount! / quantity);
    const finalAmount = amount ?? (finalUnitPrice * quantity);

    return await prisma.$transaction(async (tx) => {
      const item = await tx.folioItem.create({
        data: { folioId, itemType, quantity, unitPrice: finalUnitPrice, amount: finalAmount },
      });
      await tx.folio.update({ where: { id: folioId }, data: { balance: { increment: finalAmount } } });
      return item;
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