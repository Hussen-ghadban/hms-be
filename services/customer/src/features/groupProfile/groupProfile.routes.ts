import express from "express";
import {
  addGroupProfile,
  getGroupProfiles,
  getGroupProfile,
  updateGroupProfile,
  deleteGroupProfile,
} from "./groupProfile.controller";
import { validateRequest } from "../../middleware/validation";
import { requirePermissions } from "../../middleware/requirePermissions";
import { actionLogger } from "../../middleware/logger";
import { groupProfileSchema, groupProfileIdSchema, updateGroupProfileSchema } from "./groupProfile.validation";

const router = express.Router();

router.post("/add", requirePermissions(["GroupProfile.create"]), validateRequest({ body: groupProfileSchema }), addGroupProfile, actionLogger("add group profile"));
router.get("/get", requirePermissions(["GroupProfile.read"]), getGroupProfiles, actionLogger("get group profiles"));
router.get("/get/:id", requirePermissions(["GroupProfile.read"]), validateRequest({ params: groupProfileIdSchema }), getGroupProfile, actionLogger("get group profile"));
router.put("/update/:id", requirePermissions(["GroupProfile.update"]), validateRequest({ params: groupProfileIdSchema, body: updateGroupProfileSchema }), updateGroupProfile, actionLogger("update group profile"));
router.delete("/delete/:id", requirePermissions(["GroupProfile.delete"]), validateRequest({ params: groupProfileIdSchema }), deleteGroupProfile, actionLogger("delete group profile"));

export default router;
