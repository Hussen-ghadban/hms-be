import z from "zod";

export const createMaintenanceSchema = z.object({
  description: z.string().min(1, "Description is required"),
  priority: z.string().min(1, "Priority is required"),
  roomId: z.string().min(1, "Room ID is required")
});

export const updateMaintenanceSchema = z.object({
  description: z.string().optional(),
  priority: z.string().optional(),
  roomId: z.string().optional(),
  status: z.string().optional()
});

export const maintenanceParamsSchema = z.object({
  id: z.string().min(1, "Maintenance ID is required")
});
