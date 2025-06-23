import z from "zod";

export const addGuestSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format").optional(),
  phoneNumber: z.string().optional(),
});

export const updateGuestSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  email: z.string().email("Invalid email format").optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
});

export const guestIdSchema = z.object({
  id: z.string().min(1, "Guest ID is required"),
});

export type AddGuestInput = z.infer<typeof addGuestSchema>;
export type UpdateGuestInput = z.infer<typeof updateGuestSchema>;
export type GuestIdInput = z.infer<typeof guestIdSchema>;