import { Request, Response, NextFunction } from "express";
import ReservationService from "./reservation.service";

const reservationService = new ReservationService();

export const addReservation = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
  try {
    const { hotelId } = req.user!;
    const { checkIn, checkOut, guestId, roomId, ratePlanId } = req.body;

    if (!hotelId) {
      res.status(400).json({ status: 400, message: "Hotel ID is required" });
      return;
    }

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
    const { reservationId } = req.params;
    const {hotelId} = req.user!;
    const {deposit}=req.body;
        if (!hotelId) {
      res.status(400).json({ status: 400, message: "Hotel ID is required" });
      return;
    }

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