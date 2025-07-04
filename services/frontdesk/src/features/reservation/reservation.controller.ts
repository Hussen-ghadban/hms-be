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
    const { checkIn, checkOut, guestId, roomIds, ratePlanId } = req.body;

    const newReservation = await reservationService.createReservation({
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guestId,
      roomIds,
      ratePlanId,
      hotelId,
      authorization: req.headers.authorization
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

export const updateReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reservationId } = req.params;
    const { checkIn, checkOut, roomId, ratePlanId } = req.body;

    if (!reservationId) {
      throw new AppError("Reservation ID is required", 400);
    }

    const updatedReservation = await reservationService.updateReservation({
      reservationId,
      checkIn: checkIn ? new Date(checkIn) : undefined,
      checkOut: checkOut ? new Date(checkOut) : undefined,
      roomId,
      ratePlanId,
    });

    res.status(200).json({
      status: 200,
      message: "Reservation updated successfully",
      data: updatedReservation,
    });
  } catch (error) {
    next(error);
  }
};
export const getReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.user.hotelId) {
      throw new AppError("Hotel ID is required", 400);
    }

    const { hotelId } = req.user;
    const { startDate, endDate } = req.query;

    if (typeof startDate !== 'string' || typeof endDate !== 'string') {
      throw new AppError("startDate and endDate must be provided as query parameters", 400);
    }

    const result = await reservationService.getReservation(hotelId, startDate, endDate);

    res.status(200).json({
      status: 200,
      message: "Reservations fetched successfully",
      data: result,
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

export const createGroupBookingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user || !req.user.hotelId) {
      throw new AppError("Hotel ID is required", 400);
    }

    const token = req.headers.authorization || "";
    const hotelId = req.user.hotelId;

    // Destructure fields from body
    const { checkIn, checkOut, guestsAndRooms, groupProfileId, ratePlanId } = req.body;

    const data = {
      checkIn,
      checkOut,
      guestsAndRooms,
      groupProfileId,
      ratePlanId,
      hotelId, // override
    };

    const groupBooking = await reservationService.createGroupBooking(data, token);

    res.status(201).json({
      status: 201,
      message: "Group booking created successfully",
      data: groupBooking,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
