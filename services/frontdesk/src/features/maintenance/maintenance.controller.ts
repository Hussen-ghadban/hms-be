import { Request, Response, NextFunction } from "express";
import MaintenanceService from "./maintenance.service";
import { AppError } from "../../utils/AppError";

const maintenanceService = new MaintenanceService();

export const addMaintenance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.hotelId) throw new AppError("Hotel ID is required", 400);
    const { hotelId } = req.user;
    const { description, priority, roomId } = req.body;

    const maintenance = await maintenanceService.createMaintenance({
      description,
      priority,
      roomId,
      hotelId
    });

    res.status(201).json({ status: 200, message: "Maintenance created successfully", data: maintenance });
  } catch (error) {
    next(error);
  }
};

export const startMaintenance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.hotelId) throw new AppError("Hotel ID is required", 400);
    const { id } = req.params;

    const updated = await maintenanceService.startMaintenance(id, req.user.hotelId);
    res.json({ status: 200, message: "Maintenance started", data: updated });
  } catch (error) {
    next(error);
  }
};

export const completeMaintenance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.hotelId) throw new AppError("Hotel ID is required", 400);
    const { id } = req.params;

    const updated = await maintenanceService.completeMaintenance(id, req.user.hotelId);
    res.json({ status: 200, message: "Maintenance completed", data: updated });
  } catch (error) {
    next(error);
  }
};


export const getMaintenances = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user?.hotelId) {
      throw new AppError("Hotel ID is required", 400);
    }

    if (!req.pagination) {
      throw new AppError("Pagination middleware not initialized", 500);
    }

    const { hotelId } = req.user;
    const { skip, limit } = req.pagination;

    const result = await req.pagination.getPaginationResult(
      () => maintenanceService.getMaintenances(hotelId, skip, limit),
      () => maintenanceService.countMaintenances(hotelId)
    );

    res.status(200).json({
      status: 200,
      message: "Maintenances were fetched successfully",
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};


export const getMaintenance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.hotelId) throw new AppError("Hotel ID is required", 400);
    const { id } = req.params;
    const maintenance = await maintenanceService.getMaintenance(id, req.user.hotelId);
    res.json({ status: 200, message:"Maintenance was fetched successfully", data: maintenance });
  } catch (error) {
    next(error);
  }
};

export const updateMaintenance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.hotelId) throw new AppError("Hotel ID is required", 400);

    const { id } = req.params;
    const { description, priority, roomId, status, startedAt, completedAt } = req.body;

    // Build updates object with keys directly from req.body
    const updates = {
      description,
      priority,
      roomId,
      status,
      startedAt,
      completedAt,
    };

    const updated = await maintenanceService.updateMaintenance({
      id,
      hotelId: req.user.hotelId,
      ...updates,
    });

    res.json({ status: 200, message: "Maintenance updated", data: updated });
  } catch (error) {
    next(error);
  }
};


export const deleteMaintenance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.hotelId) throw new AppError("Hotel ID is required", 400);
    const { id } = req.params;
    const result = await maintenanceService.deleteMaintenance(id, req.user.hotelId);
    res.json({ status: 200, message: result.message });
  } catch (error) {
    next(error);
  }
};