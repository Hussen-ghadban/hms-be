import { Request, Response, NextFunction } from "express";
import PayoutService from "./payout.service";
import { AppError } from "../../utils/AppError";
import { UpdatePayoutInput } from "./payout.types";

const payoutService = new PayoutService();

export const createPayout = async (req: Request, res: Response, next: NextFunction) => {
  try {
            if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }
        const { hotelId } = req.user;
    if(!req.headers.authorization){
        throw new AppError("user needs to be authenticated",401)
    }
    const {
      amount,
      currencyId,
      source,
      status,
      type,
      reference,
      guestId,
      itemId,
    } = req.body;

    const payout = await payoutService.createPayout({
      amount,
      currencyId,
      source,
      status,
      type,
      reference,
      guestId,
      itemId,
      hotelId,
      authorization:req.headers.authorization
    });

    res.status(201).json({ status: 201, message: "Payout created", data: payout });
  } catch (err) {
    next(err);
  }
};


export const getPayout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payout = await payoutService.getPayout(req.params.id);
    if (!payout) throw new AppError("Payout not found", 404);

    res.json({ status: 200, data: payout });
  } catch (err) {
    next(err);
  }
};

export const getPayouts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const payouts = await payoutService.getPayouts();
    res.json({ status: 200, data: payouts });
  } catch (err) {
    next(err);
  }
};

export const updatePayout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.hotelId) throw new AppError("Hotel ID is required", 400);
    if (!req.headers.authorization) throw new AppError("User needs to be authenticated", 401);

    const authorization = req.headers.authorization;
    const hotelId = req.user.hotelId;
    const payoutId = req.params.id;

    // Destructure body here
    const {
      amount,
      currencyId,
      source,
      type,
      reference,
      guestId,
      itemId,
      status,
    } = req.body;

    const updateData: UpdatePayoutInput & { authorization: string; hotelId: string } = {
      amount,
      currencyId,
      source,
      type,
      reference,
      guestId,
      itemId,
      authorization,
      hotelId,
      status
    };
    const payout = await payoutService.updatePayout(payoutId, updateData);
    res.json({ status: 200, message: "Payout updated", data: payout });
  } catch (err) {
    next(err);
  }
};



export const getPayoutByFolioItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const payout = await payoutService.getPayoutByFolioItem(id);

    if (!payout) {
      return res.status(404).json({
        status: 404,
        message: "No payout found for this folio item",
      });
    }
    res.json({
      status: 200,
      message: "Payout found",
      data: payout,
    });
  } catch (err) {
    next(err);
  }
};


export const deletePayout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await payoutService.deletePayout(req.params.id);
    res.json({ status: 200, message: "Payout deleted" });
  } catch (err) {
    next(err);
  }
};
