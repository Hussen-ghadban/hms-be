import z from "zod";

// Schema for creating a user
export const createUserSchema = z.object({
  email: z.string().email("Valid email is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  roleId: z.string().min(1, "Role ID is required"),
});

// Schema for updating a user
export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  username: z.string().min(1).optional(),
  password: z.string().min(6).optional(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  roleId: z.string().optional(),
  isActive: z.boolean().optional(),
});

// Schema for validating user ID
export const userIdSchema = z.object({
  id: z.string().min(1, "User ID is required"),
});
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserIdInput = z.infer<typeof userIdSchema>;
