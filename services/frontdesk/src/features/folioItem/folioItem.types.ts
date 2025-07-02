import { FolioType } from "../../../generated/prisma";

export interface CreateFolioItemParams {
  folioId: string;
  itemType: FolioType; // ✅ Enum instead of string
  quantity: number;
  unitPrice?: number;
  amount?: number;
  hotelId: string;
}


export interface UpdateFolioItemParams {
  itemType?: FolioType; // ✅ Use the correct enum type
  quantity?: number;
  unitPrice?: number;
  amount?: number;
}