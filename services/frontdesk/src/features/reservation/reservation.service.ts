import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { CheckInParams, CreateReservationParams } from "./reservation.type";
import { Decimal } from "@prisma/client/runtime/library"; // 👈 Required for Decimal operations

export default class ReservationService {
  async createReservation({
    checkIn,
    checkOut,
    guestId,
    roomId,
    ratePlanId,
    hotelId,
  }: CreateReservationParams) {
    try {
        const overlapping = await prisma.reservation.findFirst({
        where: {
          roomId,
          // Overlap condition: (existing.checkIn < new.checkOut) && (existing.checkOut > new.checkIn)
          checkIn: { lt: checkOut },
          checkOut: { gt: checkIn },
        },
      });

      if (overlapping) {
        throw new AppError("Room is already reserved for the selected dates", 400);
      }
      const room = await prisma.room.findUnique({ where: { id: roomId } });
      const roomType = await prisma.roomType.findUnique({ where: { id: room?.roomTypeId } });
      const ratePlan = await prisma.ratePlan.findUnique({ where: { id: ratePlanId } });

      if (!room || !roomType || !ratePlan) {
        throw new AppError("Room, RoomType, or RatePlan not found",404);
      }

      let price = new Decimal(roomType.baseRate);

      if (ratePlan.baseAdjType === "PERCENT") {
        price = price.plus(price.mul(ratePlan.baseAdjVal).div(100));
      } else if (ratePlan.baseAdjType === "FIXED") {
        price = price.plus(ratePlan.baseAdjVal);
      }

      const reservation = await prisma.reservation.create({
        data: {
          checkIn,
          checkOut,
          guestId,
          roomId,
          ratePlanId,
          hotelId,
          price,
        },
      });

      return reservation;
    } catch (err) {
          console.error("Failed to create room type:", err);
          if (err instanceof AppError) throw err;
          throw new AppError("Failed to create room type", 500);
        }
  }
  async checkIn({reservationId, hotelId,deposit}:CheckInParams) {
    return await prisma.$transaction(async (tx) => {
      const reservation = await tx.reservation.findUnique({
        where: { id: reservationId },
        include: { room: true },
      });

      if (!reservation) {
        throw new AppError("Reservation not found", 404);
      }
      if (reservation.status !== "CONFIRMED" && reservation.status !== "HELD") {
        throw new AppError("Only CONFIRMED or HELD reservations can be checked in", 400);
      }
        if (reservation.room.status !== "AVAILABLE") {
            throw new AppError("Room is not available for check-in", 400);
        }
      // 2. Update reservation status
      const updatedReservation = await tx.reservation.update({
        where: { id: reservationId },
        data: {
          status: "CHECKED_IN",
        },
      });

      // 3. Update room status
      await tx.room.update({
        where: { id: reservation.roomId },
        data: {
          status: "OCCUPIED",
        },
      });

      // 4. Create folio
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
}

