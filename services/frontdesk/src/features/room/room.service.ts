import { RoomStatus } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { CreateRoomParams, UpdateRoomParams } from "./room.types";

export default class RoomService {
    async createRoom({
        roomNumber,
        roomTypeId,
        hotelId,
        floor,
        maxOccupancy,
        childOccupancy,
        adultOccupancy,
        amenities,
        connectedRoomIds
    }: CreateRoomParams) {
        try {
            const existing = await prisma.room.findUnique({
                where: {
                    hotelId_roomNumber: {
                        hotelId,
                        roomNumber
                    }
                },
            });

            if (existing) {
                throw new Error("Room with this number already exists");
            }

            const roomType = await prisma.roomType.findFirst({
                where: { id: roomTypeId, hotelId },
            });

            if (!roomType) {
                throw new Error("Invalid room type ID");
            }
            if (connectedRoomIds && connectedRoomIds.length > 0) {
    const foundRooms = await prisma.room.findMany({
        where: {
            id: { in: connectedRoomIds },
            hotelId, // optional: ensures rooms are in the same hotel
        },
        select: { id: true }
    });
    const foundIds = foundRooms.map(r => r.id);
    const notFound = connectedRoomIds.filter(id => !foundIds.includes(id));
    if (notFound.length > 0) {
        throw new AppError(`Connected room(s) not found: ${notFound.join(", ")}`, 400);
    }
}

            const room = await prisma.room.create({
                data: {
                    floor,
                    roomNumber,
                    status: RoomStatus.AVAILABLE,
                    roomTypeId,
                    hotelId,
                    maxOccupancy,
                    adultOccupancy,
                    childOccupancy,
                    Amenities: amenities && amenities.length > 0
                        ? {
                            connect: amenities.map((id: string) => ({ id }))
                        }
                        : undefined,
                    connectedRooms: connectedRoomIds && connectedRoomIds.length > 0
                    ? { connect: connectedRoomIds.map(id => ({ id })) }
                    : undefined,
                },
                include: {
                    roomType: true,
                    connectedRooms:true,
                },
            });

            return room;
        } catch (err) {
              console.error("Failed to create room type:", err);
              if (err instanceof AppError) throw err;
              throw new AppError("Failed to create room type", 500);
            }
    }

    async getRooms(hotelId: string) {
        return prisma.room.findMany({
            where: { hotelId },
            include: {
                roomType: true,
                connectedRooms:{
                    select:{
                        id:true,
                        roomNumber:true
                    }
                }
            },
            orderBy: { roomNumber: "asc" },
        });
    }

    async getRoom(id: string, hotelId: string) {
        const room = await prisma.room.findFirst({
            where: { id, hotelId },
            include: {
                roomType: true,
                Amenities:{
                    select:{
                        id:true,
                    },
                },
                connectedRooms:{
                    select:{
                        id:true,
                        roomNumber:true
                    }
                }
            }
        });

        if (!room) {
            throw new AppError("Room not found", 404);
        }

        return room;
    }

    async updateRoom({
        id,
        roomNumber,
        roomTypeId,
        hotelId,
        floor,
        maxOccupancy,
        childOccupancy,
        adultOccupancy,
        amenities,
        connectedRoomIds
    }: UpdateRoomParams) {
        // Check existence and ownership
        const room = await prisma.room.findFirst({
            where: { id, hotelId },
        });

        if (!room) {
            throw new AppError("Room not found", 404);
        }

        // If roomNumber is being updated, check for duplicates
        if (roomNumber && roomNumber !== room.roomNumber) {
            const existing = await prisma.room.findUnique({
                where: {
                    hotelId_roomNumber: {
                        hotelId,
                        roomNumber
                    }
                },
            });

            if (existing) {
                throw new AppError("Room with this number already exists", 400);
            }
        }

        // If roomTypeId is being updated, verify it exists
        if (roomTypeId && roomTypeId !== room.roomTypeId) {
            const roomType = await prisma.roomType.findFirst({
                where: { id: roomTypeId, hotelId },
            });

            if (!roomType) {
                throw new AppError("Invalid room type ID", 400);
            }
        }
        if (connectedRoomIds !== undefined && connectedRoomIds.length > 0) {
    const foundRooms = await prisma.room.findMany({
        where: {
            id: { in: connectedRoomIds },
            hotelId,
        },
        select: { id: true }
    });
    const foundIds = foundRooms.map(r => r.id);
    const notFound = connectedRoomIds.filter(id => !foundIds.includes(id));
    if (notFound.length > 0) {
        throw new AppError(`Connected room(s) not found: ${notFound.join(", ")}`, 400);
    }
}

        const updateData: any = {
            roomNumber,
            roomTypeId,
            floor,
            maxOccupancy,
            childOccupancy,
            adultOccupancy,
        };

        if (amenities !== undefined) {
            updateData.Amenities = {
                set: amenities && amenities.length > 0
                    ? amenities.map((id: string) => ({ id }))
                    : []
            };
        }
        if (connectedRoomIds !== undefined) {
            updateData.connectedRooms = {
            set: connectedRoomIds && connectedRoomIds.length > 0
                ? connectedRoomIds.map(id => ({ id }))
                : []
        };
    }

        const updatedRoom = await prisma.room.update({
            where: { id },
            data: updateData,
            include: {
            connectedRooms: true,
        },
        });

        return updatedRoom;
    }

    async deleteRoom(id: string, hotelId: string) {
        const room = await prisma.room.findFirst({
            where: { id, hotelId },
            include: {
            }
        });

        if (!room) {
            throw new AppError("Room not found", 404);
        }

        await prisma.room.delete({
            where: { id },
        });

        return { message: "Room deleted successfully" };
    }

    // Additional method to get rooms by status
    async getRoomsByStatus(status: string, hotelId: string) {
        return prisma.room.findMany({
            where: {
                status: status as any,
                hotelId
            },
            include: {
                roomType: true,
            },
            orderBy: { roomNumber: "asc" },
        });
    }
}