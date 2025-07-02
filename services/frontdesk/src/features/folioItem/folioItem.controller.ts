// folioItem.controller.ts
import { Request, Response, NextFunction } from "express";
import FolioItemService from "./folioItem.service";
import { AppError } from "../../utils/AppError";

const folioItemService = new FolioItemService();

export const addFolioItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user || !req.user.hotelId) throw new AppError("Hotel ID is required", 400);

    const { hotelId } = req.user;
    const { folioId, itemType, quantity, unitPrice, amount } = req.body;

    const item = await folioItemService.createFolioItem({
      folioId,
      itemType,
      quantity,
      unitPrice,
      amount,
      hotelId,
    });

    res.status(201).json({
      status: 201,
      message: "Folio item created successfully",
      data: item,
    });
  } catch (err) {
    console.error("Error creating folio item:", err);
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
