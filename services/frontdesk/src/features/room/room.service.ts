import { RoomStatus } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";
import { CreateRoomParams, UpdateRoomParams } from "./room.types";

export default class RoomService {
    async createRoom({
        roomNumber,
        roomTypeId,
        hotelId,
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

            const room = await prisma.room.create({
                data: {
                    roomNumber,
                    status:RoomStatus.AVAILABLE,
                    roomTypeId,
                    hotelId,
                },
                include: {
                    roomType: true,
                },
            });

            return room;
        } catch (error) {
            console.error("Error creating room:", error);
            throw new Error("Failed to create room");
        }
    }

    async getRooms(hotelId: string) {
        return prisma.room.findMany({
            where: { hotelId },
            include: {
                roomType: true,
            },
            orderBy: { roomNumber: "asc" },
        });
    }

    async getRoom(id: string, hotelId: string) {
        const room = await prisma.room.findFirst({
            where: { id, hotelId },
            include: {
                roomType: true,
        }});

        if (!room) {
            throw new Error("Room not found");
        }

        return room;
    }

    async updateRoom({
        id,
        roomNumber,
        status,
        roomTypeId,
        hotelId,
    }: UpdateRoomParams) {
        // Check existence and ownership
        const room = await prisma.room.findFirst({
            where: { id, hotelId },
        });

        if (!room) {
            throw new Error("Room not found");
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
                throw new Error("Room with this number already exists");
            }
        }

        // If roomTypeId is being updated, verify it exists
        if (roomTypeId && roomTypeId !== room.roomTypeId) {
            const roomType = await prisma.roomType.findFirst({
                where: { id: roomTypeId, hotelId },
            });

            if (!roomType) {
                throw new Error("Invalid room type ID");
            }
        }

        const updatedRoom = await prisma.room.update({
            where: { id },
            data: {
                ...(roomNumber && { roomNumber }),
                ...(status && { status }),
                ...(roomTypeId && { roomTypeId }),
            },
            include: {
                roomType: true,
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
            throw new Error("Room not found");
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