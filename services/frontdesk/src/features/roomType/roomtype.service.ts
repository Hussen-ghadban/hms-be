import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { CreateRoomTypeParams, UpdateRoomTypeParams } from "./roomType.type";



export default class RoomTypeService {
  async createRoomType({ hotelId, name, description, baseRate, maxOccupancy, childOccupancy, adultOccupancy}: CreateRoomTypeParams) {
    // Check duplicate
    const existing = await prisma.roomType.findFirst({
      where: {
        hotelId,
        name,
      },
    });

    if (existing) {
      throw new AppError("RoomType with this name already exists", 409);
    }

    console.log(adultOccupancy,childOccupancy,maxOccupancy)
    const roomType = await prisma.roomType.create({
      data: {
        hotelId,
        name,
        description,
        baseRate,
        maxOccupancy, 
        childOccupancy,
        adultOccupancy
      },
    });

    return roomType;
  }

  async getRoomTypes(hotelId: string) {
    return prisma.roomType.findMany({
      where: { hotelId },
      orderBy: { createdAt: "desc" },
    });
  }

  async getRoomType(id: string, hotelId: string) {
    const roomType = await prisma.roomType.findFirst({
      where: { id, hotelId },
    });

    if (!roomType) {
      throw new AppError("RoomType not found", 404);
    }

    return roomType;
  }

  async updateRoomType({ id, hotelId, name, description, baseRate, maxOccupancy, childOccupancy, adultOccupancy}: UpdateRoomTypeParams) {
    const existing = await prisma.roomType.findFirst({
      where: { id, hotelId },
    });

    if (!existing) {
      throw new AppError("RoomType not found", 404);
    }

    if (name && name !== existing.name) {
      const duplicate = await prisma.roomType.findFirst({
        where: { hotelId, name },
      });
      if (duplicate) {
        throw new AppError("RoomType with this name already exists", 409);
      }
    }

    const updated = await prisma.roomType.update({
      where: { id },
      data: { name, description, baseRate, maxOccupancy, childOccupancy, adultOccupancy},
    });

    return updated;
  }

  async deleteRoomType(id: string, hotelId: string) {
    const existing = await prisma.roomType.findFirst({
      where: { id, hotelId },
    });

    if (!existing) {
      throw new AppError("RoomType not found", 404);
    }

    await prisma.roomType.delete({
      where: { id },
    });

    return { message: "RoomType deleted successfully" };
  }
}
