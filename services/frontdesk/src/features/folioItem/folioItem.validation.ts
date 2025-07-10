import z from "zod";
import { FolioType } from "../../../generated/prisma";

export const addFolioItemSchema = z.object({
  folioId: z.string().min(1),
  itemType: z.nativeEnum(FolioType),
  quantity: z.number().min(1),
  unitPrice: z.number().optional(),
});

export const updateFolioItemSchema = z.object({
  itemType: z.nativeEnum(FolioType).optional(),
  quantity: z.number().min(1).optional(),
  unitPrice: z.number().optional(),
  amount: z.number().optional(),
});

export const settleFolioItemSchema = z.object({
  folioItemIds: z.array(z.string()).nonempty("At least one folio item ID is required"),
  currencyId: z.string().optional(),
  type: z.string().optional(),
  source: z.string().optional(),
  reference: z.string().optional(),
});
export const folioItemIdSchema = z.object({
  id: z.string().min(1),
});
export const TransferFolioItemsSchema = z.object({
  fromFolioId: z.string().min(1, "Source folio ID is required"),
  toFolioId: z.string().min(1, "Target folio ID is required"),
});

export type AddFolioItemInput = z.infer<typeof addFolioItemSchema>;
export type UpdateFolioItemInput = z.infer<typeof updateFolioItemSchema>;
