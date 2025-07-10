import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { CreateRatePlanParams, UpdateRatePlanParams } from "./ratePlan.type";

export default class RatePlanService {
  async createRatePlan({
    code,
    name,
    baseAdjType,
    baseAdjVal,
    currencyId,
    hotelId,
  }: CreateRatePlanParams) {
    try {

      const ratePlan = await prisma.ratePlan.create({
        data: {
          code,
          name,
          baseAdjType,
          baseAdjVal,
          currencyId,
          hotelId,
        },
      });

      return ratePlan;
    } catch (err) {
      console.error("Failed to create rate plan:", err);
      if (err instanceof AppError) throw err;
      throw new AppError("Failed to create rate plan", 500);
    }
  }




  // Paginated list
  async getRatePlans(hotelId: string, skip: number, take: number) {
    return await prisma.ratePlan.findMany({
      where: { hotelId },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    });
  }

  // Count for pagination
  async countRatePlans(hotelId: string) {
    return await prisma.ratePlan.count({
      where: { hotelId },
    });
  }


  async getRatePlan(id: string, hotelId: string) {
    return await prisma.ratePlan.findFirst({
      where: { id, hotelId },
    });
  }

  async updateRatePlan({
    id,
    code,
    name,
    baseAdjType,
    baseAdjVal,
    currencyId,
    isActive,
    hotelId,
  }: UpdateRatePlanParams) {

    const plan = await prisma.ratePlan.findFirst({ where: { id, hotelId } });
    if (!plan) throw new AppError("Rate plan not found", 404);

    const updatedRatePlan = await prisma.ratePlan.update({
      where: { id },
      data: {
        code,
        name,
        baseAdjType,
        baseAdjVal,
        currencyId,
        hotelId,
      },
    });
    return updatedRatePlan;
  }

  async deleteRatePlan(id: string, hotelId: string) {
    const plan = await prisma.ratePlan.findFirst({ where: { id, hotelId } });
    if (!plan) throw new AppError("Rate plan not found", 404);

    await prisma.ratePlan.delete({ where: { id } });
    return { message: "Deleted successfully" };
  }
}
