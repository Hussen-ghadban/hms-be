import { Router } from "express";
import { addReservation, checkInReservation, createGroupBookingController, updateReservation, checkoutReservation, getReservation, nightPrice } from "./reservation.controller";

import { requirePermissions } from "../../middleware/requirePermissions";
import { actionLogger } from "../../middleware/logger";

const router=Router();

router.post("/add", requirePermissions(["Reservation.create","Guest.read"]),addReservation,actionLogger("add reservation"));
router.get("/get-night-price", requirePermissions(["RoomType.read","RatePlan.read"]),nightPrice,actionLogger("get night price"));

router.put("/update/:reservationId", requirePermissions(["Reservation.update"]),updateReservation,actionLogger("update reservation"));
router.post("/check-in/:reservationId",requirePermissions(["Reservation.update"]),checkInReservation,actionLogger("add check-in"));
router.get("/get-reservation",requirePermissions(["Reservation.read","Room.read","RoomType.read"]),getReservation,actionLogger("get reservations"))
router.post(
  "/create",
  requirePermissions(["GroupBooking.create"]),
  createGroupBookingController
);
router.post('/check-out/:reservationId', requirePermissions(["Reservation.update"]),checkoutReservation,actionLogger("Check Out Reservation")); 
export default router;