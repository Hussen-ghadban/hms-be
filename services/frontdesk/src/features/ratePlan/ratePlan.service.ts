import { prisma } from "../../lib/prisma";
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
    } catch (error) {
      console.error("Error creating rate plan:", error);
      throw new Error("Failed to create rate plan");
    }
  }



  async getRatePlans(hotelId: string) {
    return await prisma.ratePlan.findMany({
      where: { hotelId },
      orderBy: { createdAt: "desc" },
    });
  }

  async getRatePlan(id: string,hotelId: string) {
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
    if (!plan) throw new Error("Rate plan not found");

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
    if (!plan) throw new Error("Rate plan not found");

    await prisma.ratePlan.delete({ where: { id } });
    return { message: "Deleted successfully" };
  }
}
