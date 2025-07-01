import { Router } from "express";
import { addReservation, checkInReservation, updateReservation } from "./reservation.controller";
import { requirePermissions } from "../../middleware/requirePermissions";
import { actionLogger } from "../../middleware/logger";

const router=Router();

router.post("/add", requirePermissions(["Reservation.create","Guest.read"]),addReservation,actionLogger("add reservation"));
router.put("/update/:reservationId", requirePermissions(["Reservation.update"]),updateReservation,actionLogger("update reservation"));

router.post("/check-in/:reservationId",requirePermissions([]),checkInReservation,actionLogger("add check-in"));
export default router;