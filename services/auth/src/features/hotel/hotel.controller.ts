import { Request, Response, NextFunction } from "express";
import HotelService from "./hotel.service";
import { AppError } from "../../utils/AppError";

const service = new HotelService();

export const getBaseCurrency = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.user.hotelId) {
      throw new AppError("Hotel ID is required", 400);
    }

    const { hotelId } = req.user;
    const baseCurrency = await service.getBaseCurrency(hotelId);

    res.status(200).json({
      status: 200,
      message: "Base currency retrieved successfully",
      data: baseCurrency,
    });
  } catch (err) {
    next(err);
  }
};
