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

// export const getFolioItemsSchema = z.object({
//   folioId: z.string().min(1, "folioId is required"),
// });
export const folioItemIdSchema = z.object({
  id: z.string().min(1),
});
export const TransferFolioItemsSchema = z.object({
  fromFolioId: z.string().min(1, "Source folio ID is required"),
  toFolioId: z.string().min(1, "Target folio ID is required"),
});
// export const maintenanceParamsSchema = z.object({
//   id: z.string().min(1, "ID is required"),
// });

export type AddFolioItemInput = z.infer<typeof addFolioItemSchema>;
export type UpdateFolioItemInput = z.infer<typeof updateFolioItemSchema>;
