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
import { actionLogger } from "../../middleware/logger";

const router = express.Router();

router.post(
  "/add",
  requirePermissions(["Maintenance.create"]),
  validateRequest({ body: createMaintenanceSchema }),
  addMaintenance,
  actionLogger("add maintenance")
);

router.get(
  "/get/:id",
  requirePermissions(["Maintenance.read"]),
  validateRequest({ params: maintenanceParamsSchema }),
  getMaintenance,
  actionLogger("get maintenance")
);

  
router.get("/get", requirePermissions(["Maintenance.read"]), getMaintenances,actionLogger("get maintenances"));

router.put(
  "/update/:id",
  requirePermissions(["Maintenance.update"]),
  validateRequest({ params: maintenanceParamsSchema, body: updateMaintenanceSchema }),
  updateMaintenance,
  actionLogger("update maintenance")
);

router.delete(
  "/delete/:id",
  requirePermissions(["Maintenance.delete"]),
  validateRequest({ params: maintenanceParamsSchema }),
  deleteMaintenance,
  actionLogger("delete maintenance")
);

export default router;
