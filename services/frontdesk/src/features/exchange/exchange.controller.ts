import { Request, Response, NextFunction } from "express";
import ExchangeRateService from "./exchange.service";

const service = new ExchangeRateService();

export const addExchangeRate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { hotelId } = req.user!;

    if (!hotelId) {
      res.status(400).json({ status: 400, message: "Hotel ID is required" });
      return;
    }


    const { baseCurrency, targetCurrency, rate } = req.body;
    const result = await service.createExchangeRate({ baseCurrency, targetCurrency, rate, hotelId });

    res.status(201).json({ status: 200, message: "Exchange rate created successfully", data: result });
  } catch (err) {
    console.error("Error creating exchange rate:", err);
    next(err)
  }
};

export const getExchangeRates = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { hotelId } = req.user!;

    if (!hotelId) {
      res.status(400).json({ status: 400, message: "Hotel ID is required" });
      return;
    }

    const data = await service.getExchangeRates(hotelId);
    res.json({ status: 200, message: "Exchange rates retrieved successfully", data });
  } catch (err) {
    next(err)
  }
};

export const getExchangeRate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { hotelId } = req.user!;

    const id = req.params.id;
    if (!hotelId) {
      res.status(400).json({ status: 400, message: "Hotel ID is required" });
      return;
    }

    const rate = await service.getExchangeRate(id, hotelId);
    res.json({ status: 200, message: "Exchange rate retrieved successfully", data: rate });
  } catch (err) {
  }
};

export const updateExchangeRate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { hotelId } = req.user!;

    const id = req.params.id;
    if (!hotelId) {
      res.status(400).json({ status: 400, message: "Hotel ID is required" });
      return;
    }


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
    const { hotelId } = req.user!;

    const id = req.params.id;
    if (!hotelId) {
      res.status(400).json({ status: 400, message: "Hotel ID is required" });
      return;
    }


    await service.deleteExchangeRate(id, hotelId);
    res.json({ status: 200, message: "Exchange rate deleted successfully" });
  } catch (err) {
  }
};
