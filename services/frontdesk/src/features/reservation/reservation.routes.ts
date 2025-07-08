import { Router } from "express";
import { addReservation, checkInReservation, createGroupBookingController, updateReservation, checkoutReservation } from "./reservation.controller";
import { requirePermissions } from "../../middleware/requirePermissions";
import { actionLogger } from "../../middleware/logger";

const router=Router();

router.post("/add", requirePermissions(["Reservation.create","Guest.read"]),addReservation,actionLogger("add reservation"));
router.put("/update/:reservationId", requirePermissions(["Reservation.update"]),updateReservation,actionLogger("update reservation"));

router.post("/check-in/:reservationId",requirePermissions(["Reservation.update"]),checkInReservation,actionLogger("add check-in"));
router.post(
  "/create",
  requirePermissions(["GroupBooking.create"]),
  createGroupBookingController
);

router.post('/check-out/:reservationId', requirePermissions(["Reservation.update"]),checkoutReservation,actionLogger("Check Out Reservation")); 
export default router;