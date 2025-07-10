// folioItem.controller.ts
import { Request, Response, NextFunction } from "express";
import FolioItemService from "./folioItem.service";
import { AppError } from "../../utils/AppError";

const folioItemService = new FolioItemService();

export const addChargeFolioItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.hotelId) throw new AppError("Hotel ID is required", 400);
    const { hotelId } = req.user;
    const { folioId, itemType, quantity, unitPrice } = req.body;

    const item = await folioItemService.createFolioItem({
      folioId,
      itemType,
      quantity,
      unitPrice,
      hotelId,
    });

    res.status(201).json({
      status: 201,
      message: "Charge item added successfully",
      data: item,
    });
  } catch (err) {
    console.error("Error creating charge folio item:", err);
    next(err);
  }
};

export const TransferFolioItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.hotelId) throw new AppError("Hotel ID is required", 400);

    const { fromFolioId, toFolioId } = req.body;
    const result = await folioItemService.TransferFolioItems(fromFolioId, toFolioId, req.user.hotelId);

    res.status(200).json({
      status: 200,
      message: result.message,
      totalAmount: result.totalAmount,
    });
  } catch (err) {
    next(err);
  }
};

export const settleCharge = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.user.hotelId) throw new AppError("Hotel ID is required", 400);
    const { hotelId } = req.user;

    const {
      folioItemIds,
      currencyId,
      type,
      source,
      reference,
    } = req.body;

    const authToken = req.headers.authorization || "";

    const result = await folioItemService.settleCharge(
      folioItemIds,
      hotelId,
      authToken,
      { currencyId, type, source, reference }
    );

    res.status(200).json({
      status: 200,
      message: "Items were settled successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


export const voidFolioItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.hotelId || !req.user?.id) throw new AppError("Authentication required", 401);

    const { id } = req.params;
    const { voidReason } = req.body;
    const userId = req.user.id;
    const hotelId = req.user.hotelId;
    const authToken = req.headers.authorization;

    if (!authToken) throw new AppError("Authorization token required", 401);
    if (!voidReason?.trim()) throw new AppError("Void reason is required", 400);

    const updatedItem = await folioItemService.voidFolioItem(id, voidReason, userId, hotelId, authToken);

    res.json({
      status: 200,
      message: "Folio item voided successfully",
      data: updatedItem,
    });
  } catch (err) {
    next(err);
  }
};


export const getFolioItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user || !req.user.hotelId) throw new AppError("Hotel ID is required", 400);
    const { hotelId } = req.user;
    const items = await folioItemService.getFolioItems(hotelId);

    res.json({
      status: 200,
      message: "Folio items retrieved successfully",
      data: items,
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
};
export const getFolioItemsByFolio = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user || !req.user.hotelId) throw new AppError("Hotel ID is required", 400);
    const { hotelId } = req.user;
    const { folioId } = req.query;
    const items = await folioItemService.getFolioItemsByFolio(String(folioId), hotelId);

    res.json({
      status: 200,
      message: "Folio items retrieved successfully",
      data: items,
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
};

export const getFolioItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user || !req.user.hotelId) throw new AppError("Hotel ID is required", 400);

    const { hotelId } = req.user;
    const id = req.params.id;

    const item = await folioItemService.getFolioItem(id, hotelId);
    if (!item) throw new AppError("folio item not found",404)

    res.json({
      status: 200,
      message: "Folio item retrieved successfully",
      data: item,
    });
  } catch (err) {
    next(err);
  }
};

export const updateFolioItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user || !req.user.hotelId) throw new AppError("Hotel ID is required", 400);

    const { hotelId } = req.user;
    const id = req.params.id;
    const data = req.body;

    const updated = await folioItemService.updateFolioItem(id, data, hotelId);

    res.json({
      status: 200,
      message: "Folio item updated successfully",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteFolioItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user || !req.user.hotelId) throw new AppError("Hotel ID is required", 400);

    const { hotelId } = req.user;
    const id = req.params.id;

    await folioItemService.deleteFolioItem(id, hotelId);

    res.json({
      status: 200,
      message: "Folio item deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
