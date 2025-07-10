import z from "zod";

export const createRoleSchema = z.object({
  name: z.string().min(1, "Role name is required"),
  permissionIds: z.array(z.string()).optional(),
});

export const updateRoleSchema = z.object({
  name: z.string().min(1, "Role name is required").optional(),
  permissionIds: z.array(z.string()).optional(),
});

export const roleIdSchema = z.object({
  id: z.string().min(1, "Role ID is required"),
});

export type CreateRoleInput = z.infer<typeof createRoleSchema>;
export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;
export type RoleIdInput = z.infer<typeof roleIdSchema>;