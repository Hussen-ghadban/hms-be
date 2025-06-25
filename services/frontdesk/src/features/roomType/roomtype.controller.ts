import { Request, Response, NextFunction } from "express"
import RoomTypeService from "./roomtype.service";
import { AppError } from "../../utils/AppError";

const roomTypeService = new RoomTypeService();

export const create = async (req: Request, res: Response, next: NextFunction) => {
   try{ 
if (!req.user || !req.user.hotelId) {
  throw new AppError("Hotel ID is required", 400);
}

const { hotelId } = req.user;

    const { name, description, baseRate } = req.body;
    const roomType = await roomTypeService.create(hotelId, name, description, baseRate);
    res.status(201).json({
        message: "Room type created successfully",
        data: roomType
    });
}
catch(error) {
    next(error);
  }
}