import { Router } from "express";
import { create } from "./roomtype.controller";
import { requirePermissions } from "../../middleware/requirePermissions";



const router = Router();

router.post("/", requirePermissions(['Room.create']),create);

export default router;