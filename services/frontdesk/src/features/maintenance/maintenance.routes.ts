import express from "express";
import { requirePermissions } from "../../middleware/requirePermissions";
import { validateRequest } from "../../middleware/validation";
import {
  createMaintenanceSchema,
  updateMaintenanceSchema,
  maintenanceParamsSchema
} from "./maintenance.validation";
import {
  addMaintenance,
  getMaintenances,
  getMaintenance,
  updateMaintenance,
  deleteMaintenance
} from "./maintenance.controller";

const router = express.Router();

router.post(
  "/add",
  requirePermissions(["Maintenance.create"]),
  validateRequest({ body: createMaintenanceSchema }),
  addMaintenance
);

router.get(
  "/get/:id",
  requirePermissions(["Maintenance.read"]),
  validateRequest({ params: maintenanceParamsSchema }),
  getMaintenance
);

router.get("/get", requirePermissions(["Maintenance.read"]), getMaintenances);

router.put(
  "/update/:id",
  requirePermissions(["Maintenance.update"]),
  validateRequest({ params: maintenanceParamsSchema, body: updateMaintenanceSchema }),
  updateMaintenance
);

router.delete(
  "/delete/:id",
  requirePermissions(["Maintenance.delete"]),
  validateRequest({ params: maintenanceParamsSchema }),
  deleteMaintenance
);

export default router;
