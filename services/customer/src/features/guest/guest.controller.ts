import { NextFunction, Request, Response } from "express";
import GuestService from "./guest.service";
import { AppError } from "../../utils/AppError";

const guestService = new GuestService();

export const addGuest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }

        const { hotelId } = req.user;
        const { firstName, lastName, email, phoneNumber, identification, nationality, preferences, dob } = req.body;

        if (!identification) {
            throw new AppError("Identification is required", 400);
        }

        const newGuest = await guestService.createGuest({
            firstName,
            lastName,
            email,
            phoneNumber,
            identification,
            nationality,
            preferences,
            dob: dob ? new Date(dob) : undefined,
            hotelId,
        });

        res.status(201).json({
            status: 200,
            message: "Guest created successfully",
            data: newGuest,
        });
    } catch (error) {
        next(error);
    }
}
export const getGuests = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.user.hotelId) {
      throw new AppError("Hotel ID is required", 400);
    }

    if (!req.pagination) {
      throw new AppError("Pagination middleware not initialized", 500);
    }

    const { hotelId } = req.user;
    const { skip, limit } = req.pagination;

    const result = await req.pagination.getPaginationResult(
      () => guestService.getGuests(hotelId, skip, limit),
      () => guestService.countGuests(hotelId)
    );

    res.json({
      status: 200,
      message: "Guests retrieved successfully",
      data: {
        guests: result.data,
      },
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const getGuest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }

        const { hotelId } = req.user;
        const id = req.params.id;

        // Assuming guestService is defined and has a method to get a guest by ID
        const guest = await guestService.getGuest(id, hotelId);

        if (!guest) {
        }

        res.json({
            status: 200,
            message: "Guest retrieved successfully",
            data: guest,
        });
    } catch (error) {
        next(error);
    }
}
export const updateGuest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }

        const { hotelId } = req.user;
        const id = req.params.id;

        const { firstName, lastName, email, phoneNumber, identification, nationality, preferences, dob } = req.body;

        const updatedGuest = await guestService.updateGuest({
            id,
            firstName,
            lastName,
            email,
            phoneNumber,
            identification,
            nationality,
            preferences,
            dob: dob ? new Date(dob) : undefined,
            hotelId,
        });

        res.json({
            status: 200,
            message: "Guest updated successfully",
            data: updatedGuest,
        });
    } catch (error) {
        next(error);
    }
}
export const deleteGuest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }

        const { hotelId } = req.user;
        const id = req.params.id;
        await guestService.deleteGuest(id, hotelId);
        res.json({
            status: 200,
            message: "Guest deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}