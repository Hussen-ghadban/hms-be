import z from "zod";

export const createRoomTypeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  baseRate: z
    .union([z.string(), z.number()])
    .transform((val) => val.toString())
    .optional(),
});

export const updateRoomTypeSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().optional(),
  baseRate: z
    .union([z.string(), z.number()])
    .transform((val) => val.toString())
    .optional(),
});

export const roomTypeParamsSchema = z.object({
  id: z.string().min(1, "RoomType ID is required"),
});
