import { FolioStatus, GroupBookingStatus, ReservationStatus, RoomStatus } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { checkRoomAvailability } from "../../utils/availability";
import { validateGroupProfile, validateGuest } from "../../utils/customer";
import { CheckInParams, createGroupBookingParams, CreateReservationParams, UpdateReservationParams } from "./reservation.type";
import { Decimal } from "@prisma/client/runtime/library"; // 👈 Required for Decimal operations

const CUSTOMER_SERVICE_URL = process.env.CUSTOMER_SERVICE_URL;

export default class ReservationService {
  async createReservation({
    checkIn,
    checkOut,
    guestId,
    roomIds,
    ratePlanId,
    hotelId,
    authorization
  }: CreateReservationParams & { authorization?: string }) {
    try {
      // 1. Guest validation
      const guestRes = await fetch(`${CUSTOMER_SERVICE_URL}/guest/get/${guestId}`, {
        headers: {
          Authorization: authorization || "",
          "Content-Type": "application/json"
        }
      });
      if (!guestRes.ok) throw new AppError("Guest not found", 404);
      const guestData = await guestRes.json();
      if (!guestData || !guestData.data) throw new AppError("Guest not found", 404);

      // 2. Date validation
      if (checkOut <= checkIn) {
        throw new AppError("Check-out date must be after check-in date", 400);
      }

      // 3. Connected rooms validation
      if (roomIds.length > 1) {
        const allConnected = await this.areRoomsConnected(roomIds);
        if (!allConnected) {
          throw new AppError("All selected rooms must be connected to each other", 400);
        }
      }

      // 4. Overlapping check for each room
      for (const roomId of roomIds) {
        const overlapping = await prisma.reservation.findFirst({
          where: {
            rooms: { some: { id: roomId } },
            checkIn: { lt: checkOut },
            checkOut: { gt: checkIn },
          },
        });
        if (overlapping) {
          throw new AppError(`Room ${roomId} is already reserved for the selected dates`, 400);
        }
      }

      // 5. RatePlan validation
      const ratePlan = await prisma.ratePlan.findUnique({ where: { id: ratePlanId } });
      if (!ratePlan) throw new AppError("RatePlan not found", 404);
      if (ratePlan.hotelId !== hotelId) {
        throw new AppError("RatePlan does not belong to the selected hotel", 400);
      }

      // 6. Price calculation for all rooms
      let totalPrice = new Decimal(0);
      for (const roomId of roomIds) {
        const room = await prisma.room.findUnique({ where: { id: roomId } });
        if (!room) throw new AppError(`Room ${roomId} not found`, 404);
        if (room.hotelId !== hotelId) {
          throw new AppError("Room does not belong to the selected hotel", 400);
        }
        const roomType = await prisma.roomType.findUnique({ where: { id: room.roomTypeId } });
        if (!roomType) throw new AppError(`RoomType for room ${roomId} not found`, 404);

        let price = new Decimal(roomType.baseRate);
        if (ratePlan.baseAdjType === "PERCENT") {
          price = price.plus(price.mul(ratePlan.baseAdjVal).div(100));
        } else if (ratePlan.baseAdjType === "FIXED") {
          price = price.plus(ratePlan.baseAdjVal);
        }
        totalPrice = totalPrice.plus(price);
      }

      // 7. Create reservation with all rooms
      const reservation = await prisma.reservation.create({
        data: {
          checkIn,
          checkOut,
          guestId,
          rooms: {
            connect: roomIds.map(id => ({ id })),
          },
          ratePlanId,
          hotelId,
          price: totalPrice,
        },
        include: {
          rooms: true,
        },
      });

      return reservation;
    } catch (err) {
      console.error("Failed to create reservation:", err);
      if (err instanceof AppError) throw err;
      throw new AppError("Failed to create reservation", 500);
    }
  }
  async updateReservation({
    reservationId,
    checkIn,
    checkOut,
    roomIds, // now expects an array
    ratePlanId,
  }: UpdateReservationParams & { roomIds?: string[] }) {
    try {
      const reservation = await prisma.reservation.findUnique({
        where: { id: reservationId },
        include: { rooms: true },
      });

      if (!reservation) {
        throw new AppError("Reservation not found", 404);
      }

      const dataToUpdate: Record<string, any> = {};

      if (checkIn) dataToUpdate.checkIn = checkIn;
      if (checkOut) dataToUpdate.checkOut = checkOut;
      if (ratePlanId) dataToUpdate.ratePlanId = ratePlanId;

      // Update rooms if provided
      if (roomIds && roomIds.length > 0) {
        dataToUpdate.rooms = { set: roomIds.map(id => ({ id })) };
      }

      // Overlapping check for each room if rooms or dates are changing
      const effectiveRoomIds = roomIds ?? reservation.rooms.map(r => r.id);
      const effectiveCheckIn = checkIn ?? reservation.checkIn;
      const effectiveCheckOut = checkOut ?? reservation.checkOut;

      if (effectiveCheckOut <= effectiveCheckIn) {
        throw new AppError("Check-out date must be after check-in date", 400);
      }

      for (const roomId of effectiveRoomIds) {
        const overlapping = await prisma.reservation.findFirst({
          where: {
            id: { not: reservationId },
            rooms: { some: { id: roomId } },
            checkIn: { lt: effectiveCheckOut },
            checkOut: { gt: effectiveCheckIn },
          },
        });
        if (overlapping) {
          throw new AppError(
            `Room ${roomId} is already reserved for the selected dates`,
            400
          );
        }
      }

      // Price recalculation if rate plan or rooms changed
      if (ratePlanId || roomIds) {
        const ratePlan = await prisma.ratePlan.findUnique({
          where: { id: ratePlanId ?? reservation.ratePlanId },
        });
        if (!ratePlan) throw new AppError("RatePlan not found", 404);

        let totalPrice = new Decimal(0);
        for (const roomId of effectiveRoomIds) {
          const room = await prisma.room.findUnique({ where: { id: roomId } });
          if (!room) throw new AppError(`Room ${roomId} not found`, 404);
          const roomType = await prisma.roomType.findUnique({ where: { id: room.roomTypeId } });
          if (!roomType) throw new AppError(`RoomType for room ${roomId} not found`, 404);

          let price = new Decimal(roomType.baseRate);
          if (ratePlan.baseAdjType === "PERCENT") {
            price = price.plus(price.mul(ratePlan.baseAdjVal).div(100));
          } else if (ratePlan.baseAdjType === "FIXED") {
            price = price.plus(ratePlan.baseAdjVal);
          }
          totalPrice = totalPrice.plus(price);
        }
        dataToUpdate.price = totalPrice;
      }

      const updatedReservation = await prisma.reservation.update({
        where: { id: reservationId },
        data: dataToUpdate,
        include: { rooms: true },
      });

      return updatedReservation;
    } catch (error) {
      console.error("Failed to update reservation:", error);
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to update reservation", 500);
    }
  }

  async areRoomsConnected(roomIds: string[]): Promise<boolean> {
    // Handle edge cases
    if (roomIds.length <= 1) return true;

    // Fetch all rooms with their connectedRooms
    const rooms = await prisma.room.findMany({
      where: { id: { in: roomIds } },
      include: { connectedRooms: true },
    });

    // If we didn't find all rooms, they can't be connected
    if (rooms.length !== roomIds.length) return false;

    // Build adjacency map for the graph
    const adjacencyMap = new Map<string, Set<string>>();

    for (const room of rooms) {
      const connectedIds = new Set(
        room.connectedRooms
          .map(r => r.id)
          .filter(id => roomIds.includes(id)) // Only include rooms from our input set
      );
      adjacencyMap.set(room.id, connectedIds);
    }

    // Use DFS to check if all rooms are reachable from the first room
    const visited = new Set<string>();
    const stack = [roomIds[0]]; // Start from the first room

    while (stack.length > 0) {
      const currentRoom = stack.pop()!;

      if (visited.has(currentRoom)) continue;

      visited.add(currentRoom);

      // Add all connected rooms to the stack
      const connectedRooms = adjacencyMap.get(currentRoom) || new Set();
      for (const connectedRoom of connectedRooms) {
        if (!visited.has(connectedRoom)) {
          stack.push(connectedRoom);
        }
      }
    }

    // Check if we visited all rooms
    return visited.size === roomIds.length;
  }

  async checkIn({ reservationId, hotelId, deposit }: CheckInParams) {
    return await prisma.$transaction(async (tx) => {
      const reservation = await tx.reservation.findUnique({
        where: { id: reservationId },
        include: { rooms: true },
      });

      if (!reservation) {
        throw new AppError("Reservation not found", 404);
      }
      if (reservation.status !== "CONFIRMED" && reservation.status !== "HELD") {
        throw new AppError("Only CONFIRMED or HELD reservations can be checked in", 400);
      }

      // Check all rooms are available
      for (const room of reservation.rooms) {
        if (room.status !== "AVAILABLE") {
          throw new AppError(`Room ${room.id} is not available for check-in`, 400);
        }
      }

      // Update reservation status
      const updatedReservation = await tx.reservation.update({
        where: { id: reservationId },
        data: {
          status: "CHECKED_IN",
        },
      });

      // Update all rooms' status
      for (const room of reservation.rooms) {
        await tx.room.update({
          where: { id: room.id },
          data: {
            status: "OCCUPIED",
          },
        });
      }

      // Create folio
      const folio = await tx.folio.create({
        data: {
          hotelId,
          reservationId: reservation.id,
          balance: deposit,
        },
      });

      return {
        reservation: updatedReservation,
        folio,
      };
    });
  }

  async createGroupBooking(input: createGroupBookingParams, token: string) {
    try {
      const allRoomIds = Object.values(input.guestsAndRooms).flat();
      const uniqueRoomIds = Array.from(new Set(allRoomIds));
      if (allRoomIds.length !== uniqueRoomIds.length) {
        // Find which rooms are duplicated
        const roomCounts = new Map<string, number>();
        allRoomIds.forEach(roomId => {
          roomCounts.set(roomId, (roomCounts.get(roomId) || 0) + 1);
        });

        const duplicates = Array.from(roomCounts.entries())
          .filter(([roomId, count]) => count > 1)
          .map(([roomId, count]) => `${roomId} (${count} times)`);

        throw new AppError(
          `Duplicate room assignments detected: ${duplicates.join(', ')}. Each room can only be assigned once.`,
          400
        );
      }
      await checkRoomAvailability({ checkIn: input.checkIn, checkOut: input.checkOut, roomIds: uniqueRoomIds });
      const groupProfile = await validateGroupProfile(input.groupProfileId, token);
      if (!groupProfile) {
        throw new AppError("Group profile not found", 404);
      }
      for (const [guestId, roomId] of Object.entries(input.guestsAndRooms)) {
        const guest = await validateGuest(guestId, token);
        if (!guest) {
          throw new AppError(`Guest with ID ${guestId} not found`, 404);
        }
      }
      const groupBooking = await prisma.groupBooking.create({
        data: {
          groupProfileId: input.groupProfileId,
          hotelId: input.hotelId,
          checkIn: input.checkIn,
          checkOut: input.checkOut,
        }
      });

      const ratePlan = await prisma.ratePlan.findUnique({
        where: {
          id: input.ratePlanId
        }
      });
      if (!ratePlan) {
        throw new AppError("Rate Plan Could Not Be Found", 404);
      }

      const reservations = await Promise.all(
        Object.entries(input.guestsAndRooms).map(async ([guestId, roomIds]) => {
          let totalPrice = new Decimal(0);
          for (const roomId of roomIds) {
            const room = await prisma.room.findUnique({ where: { id: roomId } });
            if (!room) throw new AppError(`Room ${roomId} not found`, 404);
            if (room.hotelId !== input.hotelId) {
              throw new AppError("Room does not belong to the selected hotel", 400);
            }
            const roomType = await prisma.roomType.findUnique({ where: { id: room.roomTypeId } });
            if (!roomType) throw new AppError(`RoomType for room ${roomId} not found`, 404);

            let price = new Decimal(roomType.baseRate);
            if (ratePlan.baseAdjType === "PERCENT") {
              price = price.plus(price.mul(ratePlan.baseAdjVal).div(100));
            } else if (ratePlan.baseAdjType === "FIXED") {
              price = price.plus(ratePlan.baseAdjVal);
            }
            totalPrice = totalPrice.plus(price);
          }

          return await prisma.reservation.create({
            data: {
              checkIn: input.checkIn,
              checkOut: input.checkOut,
              guestId,
              hotelId: input.hotelId,
              ratePlanId: input.ratePlanId,
              rooms: {
                connect: roomIds.map(id => ({ id }))
              },
              price: totalPrice,
              groupBookingId: groupBooking.id
            }
          });
        })
      );
      return groupBooking;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }

  async validateCheckout(reservationId: string, hotelId: string) {
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId, hotelId },
      include: { rooms: true, folio: true },
    });

    if (!reservation) {
      throw new AppError("Reservation not found", 404);
    }

    if (reservation.status != ReservationStatus.CHECKED_IN) {
      throw new AppError("This reservation cannot be checked out.", 405);
    }

    if (reservation.folio?.balance && !reservation.folio.balance.equals(0)) {
      throw new AppError("Folio balance must be settled before checkout", 400);
    }

    return reservation;
  }
  async checkout(reservationId: string, hotelId: string) {
    const reservation = await this.validateCheckout(reservationId, hotelId);
    const roomIds = reservation.rooms.map(room => room.id);

    const result = await prisma.$transaction(async (tx) => {
      // Update reservation status to CHECKED_OUT
      const updatedReservation = await tx.reservation.update({
        where: { id: reservationId },
        data: { status: ReservationStatus.CHECKED_OUT },
      });

      if (reservation.folio?.balance && !reservation.folio.balance.equals(0)) {
        throw new AppError("Folio balance must be settled before checkout", 400);
      }

      // Update all rooms' status to AVAILABLE
      await tx.room.updateMany({
        where: { id: { in: roomIds } },
        data: { status: RoomStatus.DIRTY },
      });

      const settledFolio = await tx.folio.update({
        where: { id: reservation.folio?.id },
        data: { status: FolioStatus.CLOSED },
      });

      if (reservation.groupBookingId) {
        const groupBooking = await tx.groupBooking.findUnique({
          where: { id: reservation.groupBookingId },
          include: { reservations: true },
        });
        if (!groupBooking) {
          throw new AppError("Group booking not found", 404);
        }

        const allReservationsCheckedOut = groupBooking.reservations.every(
          res => res.id === reservationId || res.status === ReservationStatus.CHECKED_OUT
        );
        if(allReservationsCheckedOut) {
          await tx.groupBooking.update({
            where: { id: groupBooking.id },
            data: { status: GroupBookingStatus.CHECKED_OUT }, // Assuming "COMPLETED" is a valid status
          });
        }
        else{
          await tx.groupBooking.update({
            where: { id: groupBooking.id },
            data: { status: GroupBookingStatus.PARTIALLY_CHECKED_OUT }, // Assuming this is a valid status
          });
        }
      }
      return {
        reservation: updatedReservation,
        folio: settledFolio,
      };
    });
  }
}


