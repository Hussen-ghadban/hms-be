import z from "zod";
import { RoomStatus } from "../../../generated/prisma";

export const createRoomSchema = z.object({
  roomNumber: z.string().min(1, "Room number is required"),
  roomTypeId: z.string().min(1, "Room type ID is required"),
  floor: z.number({ required_error: "Floor is required" }),
  status: z.nativeEnum(RoomStatus).optional(),
  description: z.string().optional(),
  photos: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  connectedRoomIds: z.array(z.string()).optional()
});



export const updateRoomSchema = z.object({
  roomNumber: z.string().min(1, "Room number is required").optional(),
  status: z.nativeEnum(RoomStatus).optional(),
  roomTypeId: z.string().min(1, "Room type ID is required").optional(),
  floor: z.number({ required_error: "Floor is required" }).int().nonnegative().optional(),
  description: z.string().optional(),
  photos: z.array(z.string().url()).optional(),
  amenities: z.array(z.string()).optional(),
  connectedRoomIds: z.array(z.string()).optional(),
});

export const roomParamsSchema = z.object({
  id: z.string().min(1, "Room ID is required")
});

// Type inference for TypeScript
export type CreateRoomInput = z.infer<typeof createRoomSchema>;
export type UpdateRoomInput = z.infer<typeof updateRoomSchema>;
export type RoomParamsInput = z.infer<typeof roomParamsSchema>;