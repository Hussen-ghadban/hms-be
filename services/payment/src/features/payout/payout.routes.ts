import express from "express";
import { validateRequest } from "../../middleware/validation";
import { requirePermissions } from "../../middleware/requirePermissions";
import { actionLogger } from "../../middleware/logger";
import {
  addPayoutSchema,
  updatePayoutSchema,
  payoutIdSchema,
} from "./payout.validation";
import {
  createPayout,
  getPayout,
  getPayouts,
  updatePayout,
  deletePayout,
  getPayoutByFolioItem,
} from "./payout.controller";

const router = express.Router();

router.post(
  "/add",
  requirePermissions(["Payout.create"]),
  validateRequest({ body: addPayoutSchema }),
  createPayout,
  actionLogger("create payout")
);

router.get(
  "/get/:id",
  requirePermissions(["Payout.read"]),
  validateRequest({ params: payoutIdSchema }),
  getPayout,
  actionLogger("get payout")
);

router.get(
  "/get",
  requirePermissions(["Payout.read"]),
  getPayouts,
  actionLogger("get payouts")
);

router.put(
  "/update/:id",
  requirePermissions(["Payout.update"]),
  validateRequest({ params: payoutIdSchema, body: updatePayoutSchema }),
  updatePayout,
  actionLogger("update payout")
);
  
router.get("/get-by-folio-item/:folioItemId", requirePermissions(["Payout.read"]), getPayoutByFolioItem, actionLogger("update payout"));


router.delete(
  "/delete/:id",
  requirePermissions(["Payout.delete"]),
  validateRequest({ params: payoutIdSchema }),
  deletePayout,
  actionLogger("delete payout")
);

export default router;
