import { PayoutType } from "../../../generated/prisma";

export interface CreatePayoutInput {
  amount: number;
  currencyId: string;
  source: string;
  type: PayoutType;
  reference?: string;
  guestId?: string;
  folioItemIds?: string[];
  hotelId: string;
}

export type UpdatePayoutInput = Partial<CreatePayoutInput>;
