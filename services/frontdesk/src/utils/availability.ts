import { prisma } from '../lib/prisma';
import { AppError } from './AppError';

interface RoomAvailabilityCheck {
    roomIds: string[];
    checkIn: Date;
    checkOut: Date;
    excludeReservationId?: string; // For updating existing reservations
}

interface UnavailableRoom {
    roomId: string;
    roomNumber: string;
    conflictingReservations: {
        id: string;
        checkIn: Date;
        checkOut: Date;
        status: string;
    }[];
}

export async function checkRoomAvailability({
    roomIds,
    checkIn,
    checkOut,
    excludeReservationId
}: RoomAvailabilityCheck): Promise<void> {

    // Validate input dates
    if (checkIn >= checkOut) {
        throw new AppError('Check-in date must be before check-out date', 400);
    }

    if (checkIn < new Date()) {
        throw new AppError('Check-in date cannot be in the past', 400);
    }

    // Check if rooms exist and get their details
    const rooms = await prisma.room.findMany({
        where: {
            id: {
                in: roomIds
            }
        },
        select: {
            id: true,
            roomNumber: true,
            status: true
        }
    });

    // Check if all requested rooms exist
    if (rooms.length !== roomIds.length) {
        const foundRoomIds = rooms.map(room => room.id);
        const missingRoomIds = roomIds.filter(id => !foundRoomIds.includes(id));
        throw new AppError(`Rooms not found: ${missingRoomIds.join(', ')}`, 404);
    }

    // Check for rooms that are out of service or under maintenance
    const unavailableRooms = rooms.filter(room =>
        room.status === 'OUT_OF_SERVICE' || room.status === 'MAINTENANCE'
    );

    if (unavailableRooms.length > 0) {
        const roomNumbers = unavailableRooms.map(room => `${room.roomNumber} (${room.status})`);
        throw new AppError(`Rooms are not available due to status: ${roomNumbers.join(', ')}`, 400);
    }

    // Build the where clause for reservation conflicts
    const reservationWhereClause: any = {
        rooms: {
            some: {
                id: {
                    in: roomIds
                }
            }
        },
        OR: [
            // New reservation starts during existing reservation
            {
                AND: [
                    { checkIn: { lte: checkIn } },
                    { checkOut: { gt: checkIn } }
                ]
            },
            // New reservation ends during existing reservation
            {
                AND: [
                    { checkIn: { lt: checkOut } },
                    { checkOut: { gte: checkOut } }
                ]
            },
            // New reservation completely encompasses existing reservation
            {
                AND: [
                    { checkIn: { gte: checkIn } },
                    { checkOut: { lte: checkOut } }
                ]
            }
        ]
    };

    // Exclude current reservation if updating
    if (excludeReservationId) {
        reservationWhereClause.id = {
            not: excludeReservationId
        };
    }

    // Find conflicting reservations
    const conflictingReservations = await prisma.reservation.findMany({
        where: reservationWhereClause,
        include: {
            rooms: {
                select: {
                    id: true,
                    roomNumber: true
                }
            }
        }
    });

    if (conflictingReservations.length > 0) {
        // Group conflicts by room
        const unavailableRoomsMap = new Map<string, UnavailableRoom>();

        conflictingReservations.forEach(reservation => {
            reservation.rooms.forEach(room => {
                if (roomIds.includes(room.id)) {
                    if (!unavailableRoomsMap.has(room.id)) {
                        unavailableRoomsMap.set(room.id, {
                            roomId: room.id,
                            roomNumber: room.roomNumber,
                            conflictingReservations: []
                        });
                    }

                    unavailableRoomsMap.get(room.id)!.conflictingReservations.push({
                        id: reservation.id,
                        checkIn: reservation.checkIn,
                        checkOut: reservation.checkOut,
                        status: reservation.status
                    });
                }
            });
        });

        const unavailableRoomsList = Array.from(unavailableRoomsMap.values());

        // Create detailed error message
        const errorDetails = unavailableRoomsList.map(room => {
            const conflicts = room.conflictingReservations
                .map(res => `${res.checkIn.toLocaleDateString()} - ${res.checkOut.toLocaleDateString()} (${res.status})`)
                .join(', ');
            return `Room ${room.roomNumber}: conflicts with reservations [${conflicts}]`;
        }).join('; ');

        throw new AppError(
            `The following rooms are not available for the selected dates: ${errorDetails}`,
            409
        );
    }

    // If we reach here, all rooms are available
    return;
}

// Helper function to check availability for a single room
export async function checkSingleRoomAvailability(
    roomId: string,
    checkIn: Date,
    checkOut: Date,
    excludeReservationId?: string
): Promise<void> {
    return checkRoomAvailability({
        roomIds: [roomId],
        checkIn,
        checkOut,
        excludeReservationId
    });
}

// Helper function to get available rooms of specific types within date range
export async function getAvailableRooms(
    hotelId: string,
    checkIn: Date,
    checkOut: Date,
    roomTypeIds?: string[]
): Promise<any[]> {
    const whereClause: any = {
        hotelId,
    };

    if (roomTypeIds && roomTypeIds.length > 0) {
        whereClause.roomTypeId = {
            in: roomTypeIds
        };
    }

    const availableRooms = await prisma.room.findMany({
        where: {
            ...whereClause,
            NOT: {
                reservations: {
                    some: {
                        OR: [
                            {
                                AND: [
                                    { checkIn: { lte: checkIn } },
                                    { checkOut: { gt: checkIn } }
                                ]
                            },
                            {
                                AND: [
                                    { checkIn: { lt: checkOut } },
                                    { checkOut: { gte: checkOut } }
                                ]
                            },
                            {
                                AND: [
                                    { checkIn: { gte: checkIn } },
                                    { checkOut: { lte: checkOut } }
                                ]
                            }
                        ]
                    }
                }
            }
        },
        include: {
            roomType: true
        }
    });

    return availableRooms;
}