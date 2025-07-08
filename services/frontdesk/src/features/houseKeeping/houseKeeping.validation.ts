import z from "zod";

// Enum for room cleaning status
export const roomCleaningStatusEnum = z.enum([
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELED"
]);

// Schema for creating a HouseKeepingTask
export const createHouseKeepingTaskSchema = z.object({
  roomId: z.string().min(1, "Room ID is required"),
  userId: z.string().min(1, "User ID is required"),
});

// Schema for updating a HouseKeepingTask (all fields optional)
export const updateHouseKeepingTaskSchema = z.object({
  roomId: z.string().min(1).optional(),
  userId: z.string().min(1).optional(),
  status: roomCleaningStatusEnum.optional()
});

// Schema for task ID parameter
export const houseKeepingTaskParamsSchema = z.object({
  id: z.string().min(1, "Task ID is required")
});

// Inferred Types
export type CreateHouseKeepingTaskInput = z.infer<typeof createHouseKeepingTaskSchema>;
export type UpdateHouseKeepingTaskInput = z.infer<typeof updateHouseKeepingTaskSchema>;
export type HouseKeepingTaskParamsInput = z.infer<typeof houseKeepingTaskParamsSchema>;
