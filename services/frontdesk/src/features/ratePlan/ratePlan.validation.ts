import z from "zod";

export const addRatePlanSchema = z.object({
  code: z.string().min(1, "Code is required"),
  name: z.string().min(1, "Name is required"),
  baseAdjType: z.enum(["PERCENT", "FIXED"], {
    errorMap: () => ({ message: "Adjustment type must be either PERCENT or FIXED" }),
  }),
  baseAdjVal: z
    .number({ invalid_type_error: "Adjustment value must be a number" })
    .min(0, "Adjustment value must be non-negative"),
  currencyId: z.string().min(1, "Currency ID is required"),
});

export const updateRatePlanSchema = z.object({
  code: z.string().min(1, "Code is required").optional(),
  name: z.string().min(1, "Name is required").optional(),
  baseAdjType: z.enum(["PERCENT", "FIXED"]).optional(),
  baseAdjVal: z
    .number({ invalid_type_error: "Adjustment value must be a number" })
    .min(0, "Adjustment value must be non-negative")
    .optional(),
  currencyId: z.string().min(1, "Currency ID is required").optional(),
});

export const ratePlanIdSchema = z.object({
  id: z.string().min(1, "Rate plan ID is required"),
});

export type AddRatePlanInput = z.infer<typeof addRatePlanSchema>;
export type UpdateRatePlanInput = z.infer<typeof updateRatePlanSchema>;
export type RatePlanIdInput = z.infer<typeof ratePlanIdSchema>;
