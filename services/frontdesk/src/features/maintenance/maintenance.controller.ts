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

export const getMaintenances = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.hotelId) throw new AppError("Hotel ID is required", 400);
    const maintenances = await maintenanceService.getMaintenances(req.user.hotelId);
    res.json({ status: 200, message:"Maintenances were fetched successfully",data: maintenances });
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
    const updates = req.body;
    const updated = await maintenanceService.updateMaintenance({ id, hotelId: req.user.hotelId, ...updates });
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