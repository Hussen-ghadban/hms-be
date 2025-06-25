import { Router } from "express";
import { addReservation, checkInReservation, updateReservation } from "./reservation.controller";
import { requirePermissions } from "../../middleware/requirePermissions";

const router=Router();

router.post("/add", requirePermissions([]),addReservation);
router.put("/update/:reservationId", requirePermissions([]),updateReservation);

router.post("/check-in/:reservationId",requirePermissions([]),checkInReservation);
export default router;