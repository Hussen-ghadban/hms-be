import z from "zod";
import { RoomStatus } from "../../../generated/prisma";

export const createRoomSchema = z.object({
  roomNumber: z.string().min(1, "Room number is required"),
  roomTypeId: z.string().min(1, "Room type ID is required"),
  floor: z.number({ required_error: "Floor is required" }),
  maxOccupancy: z.number({ required_error: "Max occupancy is required" }),
  adultOccupancy: z.number({ required_error: "Adult occupancy is required" }),
  childOccupancy: z.number({ required_error: "Child occupancy is required" }),
  amenities: z.array(z.string()).optional(),
  connectedRoomIds: z.array(z.string()).optional()
});


export const updateRoomSchema = z.object({
  roomNumber: z.string().min(1, "Room number is required").optional(),
  status: z.nativeEnum(RoomStatus).optional(),
  roomTypeId: z.string().min(1, "Room type ID is required").optional(),
});

export const roomParamsSchema = z.object({
  id: z.string().min(1, "Room ID is required")
});

// Type inference for TypeScript
export type CreateRoomInput = z.infer<typeof createRoomSchema>;
export type UpdateRoomInput = z.infer<typeof updateRoomSchema>;
export type RoomParamsInput = z.infer<typeof roomParamsSchema>;