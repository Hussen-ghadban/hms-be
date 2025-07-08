import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError";
import RoomTypeService from "./roomtype.service";

const roomTypeService = new RoomTypeService();

export const createRoomType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user || !req.user.hotelId) throw new AppError("Hotel ID is required", 400);

    const { hotelId } = req.user;
    const { name, description, baseRate, maxOccupancy, childOccupancy, adultOccupancy } = req.body;

    console.log(req.body);

    const roomType = await roomTypeService.createRoomType({ hotelId, name, description, baseRate, maxOccupancy, childOccupancy, adultOccupancy });

    res.status(201).json({ status: 200, message: "RoomType created successfully", data: roomType });
  } catch (err) {
    next(err);
  }
};

export const getRoomTypes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user || !req.user.hotelId) throw new AppError("Hotel ID is required", 400);
    if (!req.pagination) throw new AppError("Pagination middleware not initialized", 500);

    const { hotelId } = req.user;
    const { skip, limit } = req.pagination;

    const result = await req.pagination.getPaginationResult(
      () => roomTypeService.getRoomTypes(hotelId, skip, limit),
      () => roomTypeService.countRoomTypes(hotelId)
    );

    res.status(200).json({
      status: 200,
      message: 'Room types fetched successfully',
      data: result.data,
      pagination: result.pagination,
    });
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
    const { name, description, baseRate, maxOccupancy, childOccupancy, adultOccupancy} = req.body;

    const updated = await roomTypeService.updateRoomType({ id, hotelId, name, description, baseRate, maxOccupancy, childOccupancy, adultOccupancy });

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
