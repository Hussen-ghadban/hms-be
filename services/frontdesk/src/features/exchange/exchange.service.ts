import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { CreateExchangeRateParams, UpdateExchangeRateParams } from "./exchange.type";

export default class ExchangeRateService {
  async createExchangeRate({
    baseCurrency,
    targetCurrency,
    rate,
    hotelId,
  }: CreateExchangeRateParams) {
    try {
      const exchangeRate = await prisma.exchangeRate.create({
        data: {
          baseCurrency,
          targetCurrency,
          rate,
          hotelId,
        },
      });
      return exchangeRate;
    } catch (err) {
          console.error("Failed to create room type:", err);
          if (err instanceof AppError) throw err;
          throw new AppError("Failed to create room type", 500);
        }
  }

async getExchangeRates(hotelId: string, skip: number, take: number) {
  return prisma.exchangeRate.findMany({
    where: { hotelId },
    orderBy: { createdAt: "desc" },
    skip,
    take,
  });
}

async countExchangeRates(hotelId: string) {
  return prisma.exchangeRate.count({
    where: { hotelId },
  });
}

// exchange.service.ts
async convertCurrency({
  baseCurrency,
  targetCurrency,
  amount,
  hotelId,
}: {
  baseCurrency: string;
  targetCurrency: string;
  amount: number;
  hotelId: string;
}) {
  const rate = await prisma.exchangeRate.findFirst({
    where: {
      baseCurrency,
      targetCurrency,
      hotelId,
    },
  });

  if (!rate) throw new AppError("Exchange rate not found", 404);

  const convertedAmount = Number(rate.rate) * amount;
  return { rate: Number(rate.rate), convertedAmount };
}

  async getExchangeRate(id: string, hotelId: string) {
    const rate = await prisma.exchangeRate.findFirst({
      where: { id, hotelId },
    });

    if (!rate) throw new AppError("Exchange rate not found",404);
    return rate;
  }

  async updateExchangeRate({
    id,
    baseCurrency,
    targetCurrency,
    rate,
    hotelId,
  }: UpdateExchangeRateParams) {
    const existing = await prisma.exchangeRate.findFirst({
      where: { id, hotelId },
    });

    if (!existing) throw new AppError("Exchange rate not found", 404);

    return prisma.exchangeRate.update({
      where: { id },
      data: {
        baseCurrency,
        targetCurrency,
        rate,
      },
    });
  }

  async deleteExchangeRate(id: string, hotelId: string) {
    const existing = await prisma.exchangeRate.findFirst({
      where: { id, hotelId },
    });

    if (!existing) throw new AppError("Exchange rate not found", 404);

    await prisma.exchangeRate.delete({ where: { id } });
    return { message: "Exchange rate deleted successfully" };
  }
  async getCurrencies(){
    return prisma.currency.findMany({
      orderBy: { code: "asc" },
    })
  }
}
