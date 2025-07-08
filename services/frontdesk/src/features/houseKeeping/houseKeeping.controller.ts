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

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;

export const getHouseKeepingTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
      () => houseKeepingService.getTasks(hotelId, skip, limit),
      () => houseKeepingService.countTasks(hotelId)
    );

    const uniqueUserIds = [...new Set(result.data.map(task => task.userId))];

    const userMap = new Map<string, { id: string; firstName: string; lastName: string } | null>();

    await Promise.all(
      uniqueUserIds.map(async (userId) => {
        try {
          const response = await fetch(`${AUTH_SERVICE_URL}/auth/get-user/${userId}`, {
            headers: {
              Authorization: req.headers.authorization || "",
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) throw new Error(`Failed to fetch user ${userId}`);

          const userData = await response.json();

          // Extract only id, firstName, lastName
          const userInfo = {
            id: userData.data.id,
            firstName: userData.data.firstName,
            lastName: userData.data.lastName,
          };

          userMap.set(userId, userInfo);
        } catch (error) {
          console.error(`Failed to fetch user ${userId}:`, error);
          userMap.set(userId, null);
        }
      })
    );

    const enrichedTasks = result.data.map(task => ({
      ...task,
      user: userMap.get(task.userId),
    }));

    res.json({
      status: 200,
      message: "Housekeeping tasks retrieved successfully",
      data: enrichedTasks,
      pagination: result.pagination,
    });
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