import { PayoutStatus, PayoutType } from "../../../generated/prisma";

export interface CreatePayoutInput {
  amount: number;
  currencyId: string;
  source: string;
  type: PayoutType;
  status: PayoutStatus;
  reference?: string;
  guestId?: string;
  itemId?: string;
  hotelId: string;
}

export type UpdatePayoutInput = Partial<CreatePayoutInput>;
