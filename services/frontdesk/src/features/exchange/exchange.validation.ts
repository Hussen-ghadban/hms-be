import z from "zod";

export const addExchangeRateSchema = z.object({
  baseCurrency: z.string().min(1, "Base currency is required"),
  targetCurrency: z.string().min(1, "Target currency is required"),
  rate: z.number().positive("Rate must be positive"),
});

export const updateExchangeRateSchema = z.object({
  baseCurrency: z.string().min(1).optional(),
  targetCurrency: z.string().min(1).optional(),
  rate: z.number().positive().optional(),
});

export const exchangeRateIdSchema = z.object({
  id: z.string().min(1, "Exchange rate ID is required"),
});

export type AddExchangeRateInput = z.infer<typeof addExchangeRateSchema>;
export type UpdateExchangeRateInput = z.infer<typeof updateExchangeRateSchema>;
export type ExchangeRateIdInput = z.infer<typeof exchangeRateIdSchema>;
