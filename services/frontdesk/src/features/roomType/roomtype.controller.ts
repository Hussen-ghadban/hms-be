import { Request, Response, NextFunction } from "express"
import RoomTypeService from "./roomtype.service";

const roomTypeService = new RoomTypeService();

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const { hotelId } = req.user!
    const { name, description, baseRate } = req.body;
    const roomType = await roomTypeService.create(hotelId, name, description, baseRate);
    res.status(201).json({
        message: "Room type created successfully",
        data: roomType
    });
}