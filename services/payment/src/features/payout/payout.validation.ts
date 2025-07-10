import z from "zod";
import { PayoutStatus, PayoutType } from "../../../generated/prisma"; // or your enum path

export const addPayoutSchema = z.object({
  amount: z.number(),
  currencyId: z.string().min(1),
  source: z.string().min(1),
  type: z.nativeEnum(PayoutType),
  status:z.nativeEnum(PayoutStatus),
  reference: z.string().optional(),
  guestId: z.string().optional(),
  itemId: z.string().optional(),
});

export const updatePayoutSchema = addPayoutSchema.partial();

export const payoutIdSchema = z.object({
    id: z.string().min(1, "payout ID is required"),
});
