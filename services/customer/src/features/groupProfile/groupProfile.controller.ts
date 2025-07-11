import { NextFunction, Request, Response } from "express";
import GroupProfileService from "./groupProfile.service";
import { AppError } from "../../utils/AppError";

const groupProfileService = new GroupProfileService();

export const addGroupProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user || !req.user.hotelId) {
      throw new AppError("Hotel ID is required", 400);
    }

    const { hotelId } = req.user;

    const {
      name,
      legalName,
      email,
      phone,
      primaryContact,
      address,
      billingAddress,
      businessType,
      specialRequirements,
      isVip,
      notes,
    } = req.body;

    const newGroupProfile = await groupProfileService.createGroupProfile({
      name,
      legalName,
      email,
      phone,
      primaryContact,
      address,
      billingAddress,
      businessType,
      specialRequirements,
      isVip,
      notes,
      hotelId,
    });

    res.status(201).json({
      status: 200,
      message: "Group profile created successfully",
      data: newGroupProfile,
    });
  } catch (error) {
    next(error);
  }
};

export const getGroupProfiles = async (req: Request, res: Response, next: NextFunction) => {
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
      () => groupProfileService.getGroupProfiles(hotelId, skip, limit),
      () => groupProfileService.countGroupProfiles(hotelId)
    );

    res.json({
      status: 200,
      message: "Group profiles retrieved successfully",
      data:result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};


export const getGroupProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.user.hotelId) {
      throw new AppError("Hotel ID is required", 400);
    }

    const { hotelId } = req.user;
    const id = req.params.id;

    const groupProfile = await groupProfileService.getGroupProfile(id, hotelId);

    if (!groupProfile) {
      throw new AppError("Group profile not found", 404);
    }

    res.json({
      status: 200,
      message: "Group profile retrieved successfully",
      data: groupProfile,
    });
  } catch (error) {
    next(error);
  }
};

export const updateGroupProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.user.hotelId) {
      throw new AppError("Hotel ID is required", 400);
    }

    const { hotelId } = req.user;
    const id = req.params.id;

    const {
      name,
      legalName,
      email,
      phone,
      primaryContact,
      address,
      billingAddress,
      businessType,
      specialRequirements,
      status,
      isVip,
      notes,
    } = req.body;

    const updatedGroupProfile = await groupProfileService.updateGroupProfile({
      id,
      name,
      legalName,
      email,
      phone,
      primaryContact,
      address,
      billingAddress,
      businessType,
      specialRequirements,
      status,
      isVip,
      notes,
      hotelId,
    });

    res.json({
      status: 200,
      message: "Group profile updated successfully",
      data: updatedGroupProfile,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteGroupProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.user.hotelId) {
      throw new AppError("Hotel ID is required", 400);
    }

    const { hotelId } = req.user;
    const id = req.params.id;

    await groupProfileService.deleteGroupProfile(id, hotelId);

    res.json({
      status: 200,
      message: "Group profile deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const linkGuestsToGroup = async (req:Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.user.hotelId) {
      throw new AppError("Hotel ID is required", 400);
    }

    const { hotelId } = req.user;
    const groupId = req.params.groupId;
    const guestIds: string[] = req.body.guestIds;

    if (!guestIds || guestIds.length === 0) {
      throw new AppError("Guest IDs are required", 400);
    }

    const updatedGroupProfile = await groupProfileService.linkGuests(groupId, guestIds);

    res.json({
      status: 200,
      message: "Guests linked to group profile successfully",
      data: updatedGroupProfile,
    });
  } catch (error) {
    next(error);
  }
}