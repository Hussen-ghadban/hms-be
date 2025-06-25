import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";

export default class RoomTypeService {
    constructor() { }

    async create( hotelId: string, name: string, description: string, baseRate: number) {
        try {
            // Validate input
            if ( !hotelId || !name || !description || baseRate === undefined) {
                throw new AppError("Missing required fields", 400);
            }

            // Create room type in the database
            const roomType = await prisma.roomType.create({
                data: {
                    hotelId,
                    name,
                    description,
                    baseRate
                }
            });

            return roomType;
        } catch (err) {
      console.error("Failed to create room type:", err);
      if (err instanceof AppError) throw err;
      throw new AppError("Failed to create room type", 500);
    }
    }
    async getAll( hotelId: string) {
        try {
            const roomTypes = await prisma.roomType.findMany({
                where: {
                    hotelId: hotelId
                }
            });
            return roomTypes;
        } catch (err) {
      console.error("Failed to create room type:", err);
      if (err instanceof AppError) throw err;
      throw new AppError("Failed to create room type", 500);
    }
    }
    async getById( hotelId: string, roomTypeId: string) {
        try {
            const roomType = await prisma.roomType.findUnique({
                where: {
                    id: roomTypeId,
                    hotelId: hotelId
                }
            });
            if (!roomType) {
                throw new AppError("Room type not found", 404);
            }
            return roomType;
        } catch (err) {
      console.error("Failed to create room type:", err);
      if (err instanceof AppError) throw err;
      throw new AppError("Failed to create room type", 500);
    }
    }
}