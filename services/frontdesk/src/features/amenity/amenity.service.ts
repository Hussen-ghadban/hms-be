import { prisma } from "../../lib/prisma";
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
                throw new Error("Amenity with this name already exists");
            }

            const amenity = await prisma.amenity.create({
                data: {
                    name,
                    hotelId,
                },
            });

            return amenity;
        } catch (error) {
            console.error("Error creating amenity:", error);
            throw new Error("Failed to create amenity");
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
            throw new Error("Amenity not found");
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
            throw new Error("Amenity not found");
        }

        // Check for duplicate name if name is being updated
        if (name && name !== amenity.name) {
            const existing = await prisma.amenity.findFirst({
                where: { name, hotelId },
            });
            if (existing) {
                throw new Error("Amenity with this name already exists");
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
            throw new Error("Amenity not found");
        }

        await prisma.amenity.delete({
            where: { id },
        });

        return { message: "Amenity deleted successfully" };
    }
}
