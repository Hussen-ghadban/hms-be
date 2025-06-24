import { Router } from "express";
import { addReservation, checkInReservation } from "./reservation.controller";
import { requirePermissions } from "../../middleware/requirePermissions";

const router=Router();

router.post("/add", requirePermissions([]),addReservation);
router.post("/check-in/:reservationId",requirePermissions([]),checkInReservation);
export default router;