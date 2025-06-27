import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { CheckInParams, CreateReservationParams, UpdateReservationParams } from "./reservation.type";
import { Decimal } from "@prisma/client/runtime/library"; // 👈 Required for Decimal operations

const CUSTOMER_SERVICE_URL = process.env.CUSTOMER_SERVICE_URL;

export default class ReservationService {
  async createReservation({
    checkIn,
    checkOut,
    guestId,
    roomId,
    ratePlanId,
    hotelId,
    authorization
  }: CreateReservationParams & { authorization?: string }) {
    try {
      console.log("Fetching guest from:", `${CUSTOMER_SERVICE_URL}/guest/get/${guestId}`);
        const guestRes = await fetch(`${CUSTOMER_SERVICE_URL}/guest/get/${guestId}`, {
  headers: {
    Authorization: authorization || "",
    "Content-Type": "application/json"
  }
});
      if (!guestRes.ok) {
        throw new AppError("Guest not found", 404);
      }
      const guestData = await guestRes.json();
      if (!guestData || !guestData.data) {
        throw new AppError("Guest not found", 404);
      }
          if (checkOut <= checkIn) {
      throw new AppError("Check-out date must be after check-in date", 400);
    }
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
          if (room.hotelId !== hotelId) {
      throw new AppError("Room does not belong to the selected hotel", 400);
    }
    if (ratePlan.hotelId !== hotelId) {
      throw new AppError(
        "RatePlan does not belong to the selected hotel",
        400
      );
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
          console.error("Failed to create reservation:", err);
          if (err instanceof AppError) throw err;
          throw new AppError("Failed to create reservation", 500);
        }
  }

  async updateReservation({
    reservationId,
    checkIn,
    checkOut,
    roomId,
    ratePlanId,
  }: UpdateReservationParams) {
    try {
      // ✅ Fetch the current reservation
      const reservation = await prisma.reservation.findUnique({
        where: { id: reservationId },
      });

      if (!reservation) {
        throw new AppError("Reservation not found", 404);
      }

      const dataToUpdate: Record<string, any> = {};

      // ✅ Update dates if provided
      if (checkIn) dataToUpdate.checkIn = checkIn;
      if (checkOut) dataToUpdate.checkOut = checkOut;

      // ✅ Update room if provided
      if (roomId) dataToUpdate.roomId = roomId;

      // ✅ Update rate plan if provided
      if (ratePlanId) dataToUpdate.ratePlanId = ratePlanId;

      const effectiveRoomId = roomId ?? reservation.roomId;
      const effectiveCheckIn = checkIn ?? reservation.checkIn;
      const effectiveCheckOut = checkOut ?? reservation.checkOut;
        if (effectiveCheckOut <= effectiveCheckIn) {
    throw new AppError(
      "Check-out date must be after check-in date",
      400
    );
  }
      // ✅ Check for overlapping reservations if room or dates are changing
      const overlapping = await prisma.reservation.findFirst({
        where: {
          id: { not: reservationId },
          roomId: effectiveRoomId,
          checkIn: { lt: effectiveCheckOut },
          checkOut: { gt: effectiveCheckIn },
        },
      });

      if (overlapping) {
        throw new AppError(
          "Room is already reserved for the selected dates",
          400
        );
      }

      // ✅ Handle price recalculation if rate plan is changed
if (ratePlanId || roomId) {
  const room = await prisma.room.findUnique({
    where: { id: effectiveRoomId },
  });

  if (!room) {
    throw new AppError("Room not found", 404);
  }

  const roomType = await prisma.roomType.findUnique({
    where: { id: room.roomTypeId },
  });

  const effectiveRatePlanId = ratePlanId ?? reservation.ratePlanId;

  if (!roomType || !effectiveRatePlanId) {
    throw new AppError(
      "RoomType or RatePlan ID missing for price calculation",
      404
    );
  }

  const ratePlan = await prisma.ratePlan.findUnique({
    where: { id: effectiveRatePlanId },
  });

  if (!ratePlan) {
    throw new AppError("RatePlan not found", 404);
  }
  if (room.hotelId !== reservation.hotelId) {
  throw new AppError(
    "Room does not belong to the selected hotel",
    400
  );
}

if (ratePlan.hotelId !== reservation.hotelId) {
  throw new AppError(
    "RatePlan does not belong to the selected hotel",
    400
  );
}

  let price = new Decimal(roomType.baseRate);

  if (ratePlan.baseAdjType === "PERCENT") {
    price = price.plus(price.mul(ratePlan.baseAdjVal).div(100));
  } else if (ratePlan.baseAdjType === "FIXED") {
    price = price.plus(ratePlan.baseAdjVal);
  }

  dataToUpdate.price = price;
}


      // ✅ Final reservation update
      const updatedReservation = await prisma.reservation.update({
        where: { id: reservationId },
        data: dataToUpdate,
      });

      return updatedReservation;
    } catch (error) {
      console.error("Failed to update reservation:", error);
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to update reservation", 500);
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

