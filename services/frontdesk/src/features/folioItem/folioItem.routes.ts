// folioItem.routes.ts
import express from "express";
import { validateRequest } from "../../middleware/validation";
import { getFolioItem, getFolioItemsByFolio, updateFolioItem, deleteFolioItem, getFolioItems, TransferFolioItems, addChargeFolioItem, voidFolioItem, settleCharge } from "./folioItem.controller";
import { requirePermissions } from "../../middleware/requirePermissions";
import { actionLogger } from "../../middleware/logger";
import { addFolioItemSchema, TransferFolioItemsSchema, folioItemIdSchema, updateFolioItemSchema, settleFolioItemSchema } from "./folioItem.validation";

const router = express.Router();

router.post("/add-charge", requirePermissions(["FolioItem.create"]), validateRequest({ body: addFolioItemSchema }), addChargeFolioItem, actionLogger("add charge folioItem"));

router.get("/get", requirePermissions(["FolioItem.read"]), getFolioItems, actionLogger("get folioItems by folio"));
router.post("/transfer", requirePermissions(["Folio.update"]), validateRequest({ body: TransferFolioItemsSchema }), TransferFolioItems, actionLogger("Copy Folio Items"));
router.put("/void/:id", requirePermissions(["FolioItem.update"]), voidFolioItem, actionLogger("void folio item"));

router.get("/get-by-folio", requirePermissions(["FolioItem.read"]), getFolioItemsByFolio, actionLogger("get folioItems by folio"));
router.get("/get/:id", requirePermissions(["FolioItem.read"]), validateRequest({ params: folioItemIdSchema }), getFolioItem, actionLogger("get folioItem"));
router.put("/update/:id", requirePermissions(["FolioItem.update"]), validateRequest({ params: folioItemIdSchema, body: updateFolioItemSchema }), updateFolioItem, actionLogger("update folioItem"));
router.post("/settle", requirePermissions(["FolioItem.update"]), validateRequest({ body: settleFolioItemSchema }), settleCharge, actionLogger("settle folio items"));
router.delete("/delete/:id", requirePermissions(["FolioItem.delete"]), validateRequest({ params: folioItemIdSchema }), deleteFolioItem, actionLogger("delete folioItem"));

export default router;
