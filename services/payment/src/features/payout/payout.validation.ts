import z from "zod";
import { PayoutType } from "../../../generated/prisma"; // or your enum path

export const addPayoutSchema = z.object({
  amount: z.number(),
  currencyId: z.string().min(1),
  source: z.string().min(1),
  type: z.nativeEnum(PayoutType),
  reference: z.string().optional(),
  guestId: z.string().optional(),
  folioItemIds: z.array(z.string()).optional(), // Prisma supports string[]
});

export const updatePayoutSchema = addPayoutSchema.partial();

export const payoutIdSchema = z.object({
  id: z.string().uuid(),
});
