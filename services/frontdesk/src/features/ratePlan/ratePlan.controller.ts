import { Request, Response, NextFunction } from "express";
import RatePlanService from "./ratePlan.service";

const ratePlanService = new RatePlanService();

export const  addRatePlan = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  try {
    const { hotelId } = req.user!;


    if ( !hotelId) { res.status(400).json({ error: "Tenant ID and Hotel ID are required" }); return; }

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
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getRatePlans = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  try {
    const { hotelId } = req.user!;


    if ( !hotelId)  {res.status(400).json({ error: "Tenant ID and Hotel ID are required" }); return; }

    const plans = await ratePlanService.getRatePlans(hotelId);

    res.json({
      status: 200,
      message: "Rate plans retrieved successfully",
      data: plans,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getRatePlan = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  try {
    const { hotelId } = req.user!;

    const id = req.params.id;

    if (!hotelId)  {res.status(400).json({ error: "Tenant ID and Hotel ID are required" }); return; }

    const plan = await ratePlanService.getRatePlan(id, hotelId);
    if (!plan) { res.status(404).json({ error: "Rate plan not found" }); return; }

    res.json({
      status: 200,
      message: "Rate plan retrieved successfully",
      data: plan,
    });
  } catch (err) {
    console.error("Error retrieving rate plan:", err);
     res.status(500).json({ error: "Internal server error" });
     return;
  }
};

export const updateRatePlan = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  try {
    const {  hotelId } = req.user!;

    const id = req.params.id;

    if (!hotelId)  {res.status(400).json({ error: "Tenant ID and Hotel ID are required" }); return; }
    const { code,name, baseAdjType, baseAdjVal, currencyId, isActive } = req.body;

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
     res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteRatePlan = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  try {
    const { hotelId } = req.user!;

    const id = req.params.id;

    if (!hotelId) { res.status(400).json({ error: "Tenant ID and Hotel ID are required" }); return; }
    await ratePlanService.deleteRatePlan(id,  hotelId);

    res.json({
      status: 200,
      message: "Rate plan deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting rate plan:", err);
     res.status(500).json({ error: "Internal server error" });
    }
};
