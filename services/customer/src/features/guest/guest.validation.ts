import z from "zod";

import z from "zod";

export const addGuestSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format").optional(),
  phoneNumber: z.string().optional(),
  identification: z.object({
    type: z.string().min(1, "Identification type is required"),
    number: z.string().min(1, "Identification number is required"),
  }),
  nationality: z.string().optional(),
  preferences: z.record(z.any()).optional(),
  dob: z.string().optional(),
});

export const updateGuestSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  email: z.string().email("Invalid email format").optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
    identification: z.object({
    type: z.string().min(1, "Identification type is required"),
    number: z.string().min(1, "Identification number is required"),
  }).optional(),
  nationality: z.string().optional(),
  preferences: z.record(z.any()).optional(),
  dob: z.string().optional(),
});

export const guestIdSchema = z.object({
  id: z.string().min(1, "Guest ID is required"),
});

export type AddGuestInput = z.infer<typeof addGuestSchema>;
export type UpdateGuestInput = z.infer<typeof updateGuestSchema>;
export type GuestIdInput = z.infer<typeof guestIdSchema>;