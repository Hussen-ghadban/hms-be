import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { CreateAmenityParams, UpdateAmenityParams } from "./amenity.type";

export default class AmenityService {
    async createAmenity({
        name,
        hotelId,
    }: CreateAmenityParams) {
        try {
            const existing = await prisma.amenity.findFirst({
                where: { name, hotelId },
            });
            if (existing) {
                throw new AppError("Amenity with this name already exists", 400);
            }

            const amenity = await prisma.amenity.create({
                data: {
                    name,
                    hotelId,
                },
            });

            return amenity;
        } catch (err) {
      console.error("Failed to create room type:", err);
      if (err instanceof AppError) throw err;
      throw new AppError("Failed to create room type", 500);
    }
    }

    async getAmenities(hotelId: string) {
        return prisma.amenity.findMany({
            where: { hotelId },
            orderBy: { createdAt: "desc" },
        });
    }

    async getAmenity(id: string, hotelId: string) {
        const amenity = await prisma.amenity.findFirst({
            where: { id, hotelId },
        });

        if (!amenity) {
            throw new AppError("Amenity not found",404);
        }

        return amenity;
    }

    async updateAmenity({
        id,
        name,
        hotelId,
    }: UpdateAmenityParams) {
        // Check existence and ownership
        const amenity = await prisma.amenity.findFirst({
            where: { id, hotelId },
        });

        if (!amenity) {
            throw new AppError("Amenity not found",404);
        }

        // Check for duplicate name if name is being updated
        if (name && name !== amenity.name) {
            const existing = await prisma.amenity.findFirst({
                where: { name, hotelId },
            });
            if (existing) {
                throw new AppError("Amenity with this name already exists", 400);
            }
        }

        const updatedAmenity = await prisma.amenity.update({
            where: { id },
            data: {
                name,
            },
        });

        return updatedAmenity;
    }

    async deleteAmenity(id: string, hotelId: string) {
        const amenity = await prisma.amenity.findFirst({
            where: { id, hotelId },
        });

        if (!amenity) {
            throw new AppError("Amenity not found",404);
        }

        await prisma.amenity.delete({
            where: { id },
        });

        return { message: "Amenity deleted successfully" };
    }
}
