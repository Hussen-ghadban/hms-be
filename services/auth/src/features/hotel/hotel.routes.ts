import express from "express";
import { getBaseCurrency } from "./hotel.controller";
import { actionLogger } from "../../middleware/logger";
import { requirePermissions } from "../../middleware/authenticate";

const router = express.Router();

router.get(
  "/base-currency",
  requirePermissions(["Hotel.read"]),
  getBaseCurrency,
  actionLogger("get hotel base currency")
);

export default router;
