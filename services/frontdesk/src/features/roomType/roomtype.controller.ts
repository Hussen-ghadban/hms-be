import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError";
import RoomTypeService from "./roomType.service";

const roomTypeService = new RoomTypeService();

export const createRoomType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user || !req.user.hotelId) throw new AppError("Hotel ID is required", 400);

    const { hotelId } = req.user;
    const { name, description, baseRate } = req.body;

    const roomType = await roomTypeService.createRoomType({ hotelId, name, description, baseRate });

    res.status(201).json({ status: 200, message: "RoomType created successfully", data: roomType });
  } catch (err) {
    next(err);
  }
};

export const getRoomTypes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user || !req.user.hotelId) throw new AppError("Hotel ID is required", 400);

    const { hotelId } = req.user;
    const roomTypes = await roomTypeService.getRoomTypes(hotelId);

    res.json({ status: 200, data: roomTypes });
  } catch (err) {
    next(err);
  }
};

export const getRoomType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user || !req.user.hotelId) throw new AppError("Hotel ID is required", 400);

    const { hotelId } = req.user;
    const { id } = req.params;

    const roomType = await roomTypeService.getRoomType(id, hotelId);

    res.json({ status: 200, data: roomType });
  } catch (err) {
    next(err);
  }
};

export const updateRoomType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user || !req.user.hotelId) throw new AppError("Hotel ID is required", 400);

    const { hotelId } = req.user;
    const { id } = req.params;
    const { name, description, baseRate } = req.body;

    const updated = await roomTypeService.updateRoomType({ id, hotelId, name, description, baseRate });

    res.json({ status: 200, message: "RoomType updated successfully", data: updated });
  } catch (err) {
    next(err);
  }
};

export const deleteRoomType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user || !req.user.hotelId) throw new AppError("Hotel ID is required", 400);

    const { hotelId } = req.user;
    const { id } = req.params;

    const result = await roomTypeService.deleteRoomType(id, hotelId);

    res.json({ status: 200, message: result.message });
  } catch (err) {
    next(err);
  }
};
