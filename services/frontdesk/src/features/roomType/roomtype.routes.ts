import { Router } from "express";
import { validateRequest } from "../../middleware/validation";
import { createRoomTypeSchema, updateRoomTypeSchema, roomTypeParamsSchema } from "./roomType.validation";
import { requirePermissions } from "../../middleware/requirePermissions";
import { createRoomType, deleteRoomType, getRoomType, getRoomTypes, updateRoomType } from "./roomtype.controller";
import { actionLogger } from "../../middleware/logger";
import { paginateResults } from "../../middleware/pagination.middleware";

const router = Router();

router.post(
  "/add",
  requirePermissions(["RoomType.create"]),
  validateRequest({ body: createRoomTypeSchema }),
  createRoomType,
  actionLogger("add room-type")
  
);

router.get(
  "/get",
  requirePermissions(["RoomType.read"]),
  paginateResults,
  getRoomTypes,
  actionLogger("get room-type")
);

router.get(
  "/get/:id",
  requirePermissions(["RoomType.read"]),
  validateRequest({ params: roomTypeParamsSchema }),
  getRoomType,
  actionLogger("get room-type")
);

router.put(
  "/update/:id",
  requirePermissions(["RoomType.update"]),
  validateRequest({ params: roomTypeParamsSchema, body: updateRoomTypeSchema }),
  updateRoomType,
  actionLogger("update room-type")
);

router.delete(
  "/delete/:id",
  requirePermissions(["RoomType.delete"]),
  validateRequest({ params: roomTypeParamsSchema }),
  deleteRoomType,
  actionLogger("delete room-type")
);

export default router;
