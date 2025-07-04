import z from "zod";

export const createRoomTypeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  baseRate: z
    .union([z.string(), z.number()])
    .transform((val) => val.toString()),
  maxOccupancy: z.number({ required_error: "Max occupancy is required" }),
  adultOccupancy: z.number({ required_error: "Adult occupancy is required" }),
  childOccupancy: z.number({ required_error: "Child occupancy is required" }),
});

export const updateRoomTypeSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().optional(),
  baseRate: z
    .union([z.string(), z.number()])
    .transform((val) => val.toString())
    .optional(),
  maxOccupancy: z.number({ required_error: "Max occupancy is required" }).optional(),
  adultOccupancy: z.number({ required_error: "Adult occupancy is required" }).optional(),
  childOccupancy: z.number({ required_error: "Child occupancy is required" }).optional(),
});

export const roomTypeParamsSchema = z.object({
  id: z.string().min(1, "RoomType ID is required"),
});
