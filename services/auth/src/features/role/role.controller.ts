import { Request, Response, NextFunction } from "express";
import RoleService from "./role.service";
import { AppError } from "../../utils/AppError";

const roleService = new RoleService();

export const addRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, hotelId, permissionIds } = req.body;
    const role = await roleService.createRole({ name, hotelId, permissionIds });
    res.status(201).json({ status: 201, message: "Role created", data: role });
  } catch (error) {
    next(error);
  }
};

export const getRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
        if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }
        const { hotelId } = req.user;
    const roles = await roleService.getRoles(hotelId);
    res.json({ status: 200, data: roles });
  } catch (error) {
    next(error);
  }
};

export const getRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
        if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }
        const { hotelId } = req.user;
    const role = await roleService.getRole(id, hotelId);
    res.json({ status: 200, data: role });
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
            if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }
        const { hotelId } = req.user;
    const { name, permissionIds } = req.body;
    const updated = await roleService.updateRole({ id, name, hotelId, permissionIds });
    res.json({ status: 200, message: "Role updated", data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
        if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }
        const { hotelId } = req.user;
    const result = await roleService.deleteRole(id, hotelId);
    res.json({ status: 200, ...result });
  } catch (error) {
    next(error);
  }
};