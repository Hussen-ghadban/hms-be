import { Request, Response, NextFunction } from "express";
import ExchangeRateService from "./exchange.service";
import { AppError } from "../../utils/AppError";

const service = new ExchangeRateService();

export const addExchangeRate = async (req: Request, res: Response, next: NextFunction) => {
  try {
        if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }
        const { hotelId } = req.user;
    const { baseCurrency, targetCurrency, rate } = req.body;
    const result = await service.createExchangeRate({ baseCurrency, targetCurrency, rate, hotelId });

    res.status(201).json({ status: 200, message: "Exchange rate created successfully", data: result });
  } catch (err) {
    console.error("Error creating exchange rate:", err);
    next(err)
  }
};

export const getExchangeRates = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user || !req.user.hotelId) {
      throw new AppError("Hotel ID is required", 400);
    }

    if (!req.pagination) {
      throw new AppError("Pagination middleware not initialized", 500);
    }

    const { hotelId } = req.user;
    const { skip, limit } = req.pagination;

    const result = await req.pagination.getPaginationResult(
      () => service.getExchangeRates(hotelId, skip, limit),
      () => service.countExchangeRates(hotelId)
    );

    res.status(200).json({
      status: 200,
      message: "Exchange rates retrieved successfully",
      data: result.data,
      pagination: result.pagination,
    });
  } catch (err) {
    next(err);
  }
};

export const getExchangeRate = async (req: Request, res: Response, next: NextFunction) => {
  try {
        if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }

        const { hotelId } = req.user;
    const id = req.params.id;

    const rate = await service.getExchangeRate(id, hotelId);
    res.json({ status: 200, message: "Exchange rate retrieved successfully", data: rate });
  } catch (err) {
    next(err);
  }
};

export const updateExchangeRate = async (req: Request, res: Response, next: NextFunction) => {
  try {
        if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }

        const { hotelId } = req.user;
    const id = req.params.id;


    const { baseCurrency, targetCurrency, rate } = req.body;
    const updated = await service.updateExchangeRate({
      id,
      baseCurrency,
      targetCurrency,
      rate,
      hotelId,
    });

    res.json({ status: 200, message: "Exchange rate updated successfully", data: updated });
  } catch (err) {
    console.error("Error updating exchange rate:", err);
    next(err);
  }
};

export const deleteExchangeRate = async (req: Request, res: Response, next: NextFunction) => {
  try {
        if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }

        const { hotelId } = req.user;
    
    const id = req.params.id;

    await service.deleteExchangeRate(id, hotelId);
    res.json({ status: 200, message: "Exchange rate deleted successfully" });
  } catch (err) {
    console.error("Error deleting exchange rate:", err);
    next(err);
  }
};
