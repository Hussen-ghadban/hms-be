import z from "zod";

export const groupProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  legalName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  primaryContact: z.record(z.any()).optional(),
  address: z.record(z.any()).optional(),
  billingAddress: z.record(z.any()).optional(),
  businessType: z.enum(["CORPORATE", "TRAVEL_AGENCY", "EVENT_PLANNER", "GOVERNMENT", "OTHER"]),
  specialRequirements: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]).optional(),
  isVip: z.boolean().optional(),
  notes: z.string().optional(),
});

export const updateGroupProfileSchema = groupProfileSchema.partial();

export const groupProfileIdSchema = z.object({
  id: z.string().min(1, "ID is required"),
});
