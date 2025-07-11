import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";

export default class HotelService {
  async getBaseCurrency(hotelId: string): Promise<string> {
    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
      select: { baseCurrency: true },
    });

    if (!hotel || !hotel.baseCurrency) {
      throw new AppError("Base currency not found for hotel", 404);
    }

    return hotel.baseCurrency;
  }
}
