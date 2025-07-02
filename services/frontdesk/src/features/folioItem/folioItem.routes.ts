// folioItem.routes.ts
import express from "express";
import { validateRequest } from "../../middleware/validation";
import { addFolioItem, getFolioItem, getFolioItemsByFolio, updateFolioItem, deleteFolioItem, getFolioItems } from "./folioItem.controller";
import { requirePermissions } from "../../middleware/requirePermissions";
import { actionLogger } from "../../middleware/logger";
import { addFolioItemSchema, folioItemIdSchema, updateFolioItemSchema } from "./folioItem.validation";

const router = express.Router();

router.post("/add", requirePermissions(["FolioItem.create"]), validateRequest({ body: addFolioItemSchema }), addFolioItem, actionLogger("add folioItem"));
router.get("/get", requirePermissions(["FolioItem.read"]), getFolioItems, actionLogger("get folioItems by folio"));

router.get("/get-by-folio", requirePermissions(["FolioItem.read"]), getFolioItemsByFolio, actionLogger("get folioItems by folio"));
router.get("/get/:id", requirePermissions(["FolioItem.read"]), validateRequest({ params: folioItemIdSchema }), getFolioItem, actionLogger("get folioItem"));
router.put("/update/:id", requirePermissions(["FolioItem.update"]), validateRequest({ params: folioItemIdSchema, body: updateFolioItemSchema }), updateFolioItem, actionLogger("update folioItem"));
router.delete("/delete/:id", requirePermissions(["FolioItem.delete"]), validateRequest({ params: folioItemIdSchema }), deleteFolioItem, actionLogger("delete folioItem"));

export default router;
