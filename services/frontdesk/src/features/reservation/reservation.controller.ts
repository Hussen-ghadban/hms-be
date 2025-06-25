import { Request, Response, NextFunction } from "express";
import ReservationService from "./reservation.service";
import { AppError } from "../../utils/AppError";

const reservationService = new ReservationService();

export const addReservation = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
  try {
        if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }

        const { hotelId } = req.user;
    const { checkIn, checkOut, guestId, roomId, ratePlanId } = req.body;

    const newReservation = await reservationService.createReservation({
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guestId,
      roomId,
      ratePlanId,
      hotelId,
    });

    res.status(201).json({
      status: 201,
      message: "Reservation created successfully",
      data: newReservation,
    });
  } catch (error) {
    next(error);
  }
};
export const checkInReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
        if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }

        const { hotelId } = req.user;
    const {deposit}=req.body;
    const { reservationId } = req.params;

    if (!reservationId) {
      res.status(400).json({ message: "Reservation ID is required" });
      return;
    }

    const result = await reservationService.checkIn({reservationId, hotelId, deposit});

    res.status(200).json({
      message: "Guest checked in successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};