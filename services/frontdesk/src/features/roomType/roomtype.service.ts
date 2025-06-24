import { prisma } from "../../lib/prisma";

export default class RoomTypeService {
    constructor() { }

    async create( hotelId: string, name: string, description: string, baseRate: number) {
        try {
            // Validate input
            if ( !hotelId || !name || !description || baseRate === undefined) {
                throw new Error("Invalid input parameters");
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
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(e.message);
            }
            throw new Error("An unexpected error occurred");
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
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(e.message);
            }
            throw new Error("An unexpected error occurred");
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
                throw new Error("Room type not found");
            }
            return roomType;
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(e.message);
            }
            throw new Error("An unexpected error occurred");
        }
    }
}