import { Router } from "express";
import { addReservation, checkInReservation, createGroupBookingController, getReservation, updateReservation } from "./reservation.controller";
import { requirePermissions } from "../../middleware/requirePermissions";
import { actionLogger } from "../../middleware/logger";

const router=Router();

router.post("/add", requirePermissions(["Reservation.create","Guest.read"]),addReservation,actionLogger("add reservation"));
router.put("/update/:reservationId", requirePermissions(["Reservation.update"]),updateReservation,actionLogger("update reservation"));
router.post("/get-reservation",requirePermissions(["Reservation.read","Room.read","RoomType.read"]),getReservation,actionLogger("get reservations"))
router.post("/check-in/:reservationId",requirePermissions([]),checkInReservation,actionLogger("add check-in"));
router.post(
  "/create",
  requirePermissions(["GroupBooking.create"]),
  createGroupBookingController
);
export default router;