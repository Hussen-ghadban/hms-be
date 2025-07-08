import z from "zod";

export const maintenanceStatusEnum = z.enum([
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELED"
]);

export const createMaintenanceSchema = z
  .object({
    description: z.string().min(1, "Description is required"),
    priority: z.string().min(1, "Priority is required"),
    roomId: z.string().optional(),
    areaId: z.string().optional(),
    userId: z.string().optional(),
  })
  .refine((data) => data.roomId || data.areaId, {
    message: "Either roomId or areaId must be provided",
  });

export const updateMaintenanceSchema = z
  .object({
    description: z.string().optional(),
    priority: z.string().optional(),
    roomId: z.string().optional(),
    areaId: z.string().optional(),
    status: maintenanceStatusEnum.optional(),
    startedAt: z.coerce.date().optional(),
    completedAt: z.coerce.date().optional()
  })
  .refine((data) => data.roomId || data.areaId, {
    message: "Either roomId or areaId must be provided",
    path: ["roomId"]
  });

export const maintenanceParamsSchema = z.object({
  id: z.string().min(1, "Maintenance ID is required")
});
