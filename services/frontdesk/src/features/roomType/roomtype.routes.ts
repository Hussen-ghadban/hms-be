import { Router } from "express";
import { validateRequest } from "../../middleware/validation";
import { createRoomTypeSchema, updateRoomTypeSchema, roomTypeParamsSchema } from "./roomType.validation";
import { requirePermissions } from "../../middleware/requirePermissions";
import { createRoomType, deleteRoomType, getRoomType, getRoomTypes, updateRoomType } from "./roomType.controller";

const router = Router();

router.post(
  "/add",
  requirePermissions(["RoomType.create"]),
  validateRequest({ body: createRoomTypeSchema }),
  createRoomType
);

router.get(
  "/get",
  requirePermissions(["RoomType.read"]),
  getRoomTypes
);

router.get(
  "/get/:id",
  requirePermissions(["RoomType.read"]),
  validateRequest({ params: roomTypeParamsSchema }),
  getRoomType
);

router.put(
  "/update/:id",
  requirePermissions(["RoomType.update"]),
  validateRequest({ params: roomTypeParamsSchema, body: updateRoomTypeSchema }),
  updateRoomType
);

router.delete(
  "/delete/:id",
  requirePermissions(["RoomType.delete"]),
  validateRequest({ params: roomTypeParamsSchema }),
  deleteRoomType
);

export default router;
