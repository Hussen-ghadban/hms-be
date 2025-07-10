import { prisma } from "../lib/prisma";

export const recalculateFolioBalance = async (folioId: string): Promise<number> => {
  const unpaidItems = await prisma.folioItem.findMany({
    where: {
      folioId,
      status: "UNPAID",
    },
    select: {
      amount: true,
    },
  });

  const totalUnpaid = unpaidItems.reduce((sum, item) => sum + Number(item.amount), 0);

  await prisma.folio.update({
    where: { id: folioId },
    data: {
      balance: totalUnpaid,
    },
  });

  return totalUnpaid;
};
