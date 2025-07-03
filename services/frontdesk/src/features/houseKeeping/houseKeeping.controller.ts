import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError";
import HouseKeepingService from "./houseKeeping.service";

const houseKeepingService = new HouseKeepingService();

export const createHouseKeepingTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user || !req.user.hotelId) throw new AppError("Hotel ID is required", 400);

    const { hotelId } = req.user;
    const { roomId, userId, status } = req.body;

    const task = await houseKeepingService.createTask({ hotelId, roomId, userId, status,authorization: req.headers.authorization });

    res.status(201).json({ status: 200, message: "Task created successfully", data: task });
  } catch (err) {
    next(err);
  }
};
export const startHouseKeepingTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.hotelId) throw new AppError("Hotel ID is required", 400);

    const { id } = req.params;
    const startedTask = await houseKeepingService.startTask(id, req.user.hotelId);

    res.json({ status: 200, message: "Housekeeping task started", data: startedTask });
  } catch (error) {
    next(error);
  }
};

export const completeHouseKeepingTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.hotelId) throw new AppError("Hotel ID is required", 400);

    const { id } = req.params;
    const completedTask = await houseKeepingService.completeTask(id, req.user.hotelId);

    res.json({ status: 200, message: "Housekeeping task completed", data: completedTask });
  } catch (error) {
    next(error);
  }
};

export const getHouseKeepingTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user || !req.user.hotelId) throw new AppError("Hotel ID is required", 400);

    const { hotelId } = req.user;
    const tasks = await houseKeepingService.getTasks(hotelId);

    res.json({ status: 200, data: tasks });
  } catch (err) {
    next(err);
  }
};

export const getHouseKeepingTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user || !req.user.hotelId) throw new AppError("Hotel ID is required", 400);

    const { hotelId } = req.user;
    const { id } = req.params;

    const task = await houseKeepingService.getTask(id, hotelId);

    res.json({ status: 200, data: task });
  } catch (err) {
    next(err);
  }
};

export const updateHouseKeepingTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user || !req.user.hotelId) throw new AppError("Hotel ID is required", 400);

    const { hotelId } = req.user;
    const { id } = req.params;
    const { roomId, userId, status } = req.body;

    const updated = await houseKeepingService.updateTask({ id, hotelId, roomId, userId, status });

    res.json({ status: 200, message: "Task updated successfully", data: updated });
  } catch (err) {
    next(err);
  }
};

export const deleteHouseKeepingTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user || !req.user.hotelId) throw new AppError("Hotel ID is required", 400);

    const { hotelId } = req.user;
    const { id } = req.params;

    const result = await houseKeepingService.deleteTask(id, hotelId);
    res.json({ status: 200, message: result.message });
  } catch (err) {
    next(err);
  }
};