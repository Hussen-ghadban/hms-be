import { Request, Response, NextFunction } from "express";
import RatePlanService from "./ratePlan.service";
import { AppError } from "../../utils/AppError";

const ratePlanService = new RatePlanService();

export const addRatePlan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
        if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }

        const { hotelId } = req.user;
    const { code, name, baseAdjType, baseAdjVal, currencyId } = req.body;

    const newRatePlan = await ratePlanService.createRatePlan({
      code,
      name,
      baseAdjType,
      baseAdjVal,
      currencyId,
      hotelId,
    });

    res.status(201).json({
      status: 201,
      message: "Rate plan created successfully",
      data: newRatePlan,
    });
  } catch (err) {
    console.error("Error creating rate plan:", err);
   next(err);
  }
};

export const getRatePlans = async (
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
      () => ratePlanService.getRatePlans(hotelId, skip, limit),
      () => ratePlanService.countRatePlans(hotelId)
    );

    res.status(200).json({
      status: 200,
      message: "Rate plans retrieved successfully",
      data:result.data,
      pagination: result.pagination,
    });
  } catch (err) {
    next(err);
  }
};


export const getRatePlan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
        if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }

        const { hotelId } = req.user;
    const id = req.params.id;
    const plan = await ratePlanService.getRatePlan(id, hotelId);
    if (!plan) { res.status(404).json({ error: "Rate plan not found" }); return; }

    res.json({
      status: 200,
      message: "Rate plan retrieved successfully",
      data: plan,
    });
  } catch (err) {
    console.error("Error retrieving rate plan:", err);
    next(err);
  }
};

export const updateRatePlan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
        if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }

        const { hotelId } = req.user;
    const id = req.params.id;
    const { code, name, baseAdjType, baseAdjVal, currencyId, isActive } = req.body;

    const updatedPlan = await ratePlanService.updateRatePlan({
      id,
      code,
      name,
      baseAdjType,
      baseAdjVal,
      currencyId,
      isActive,
      hotelId,
    });

    res.json({
      status: 200,
      message: "Rate plan updated successfully",
      data: updatedPlan,
    });
  } catch (err) {
    console.error("Error updating rate plan:", err);
    next(err);
  }
};

export const deleteRatePlan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
        if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }

        const { hotelId } = req.user;
    const id = req.params.id;
    await ratePlanService.deleteRatePlan(id, hotelId);

    res.json({
      status: 200,
      message: "Rate plan deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting rate plan:", err);
    next(err);
  }
};
