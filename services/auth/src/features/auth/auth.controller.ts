// src/controllers/auth.ts
import { AuthService } from './auth.service';
import { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/AppError";


const authService = new AuthService();

export const login = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const { username, password } = req.body;
        if(!username || !password) {
            throw new AppError("Username and password are required", 400);
        }
        const token = await authService.login(username, password);
        res.status(200).json({ accessToken: token });
    } catch (error) {
        console.error('Login error:', error);
        next(error)
    }
};
export const addUser = async (req: Request, res: Response,next:NextFunction) => {
    try {
        if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }
        const { hotelId } = req.user;
        const { email, username,password, firstName, lastName, roleId } = req.body;
        const user = await authService.addUser({email, username,password, firstName, lastName, roleId,hotelId});
        res.status(201).json({
            status:201,
            message:"user was added successfully",
            data:user
        });
    } catch (error) {
        console.error('Add user error:', error);
        next(error)
    }
};
export const getUser =async(req: Request, res: Response,next:NextFunction) => {
try{
    const {id}=req.params;
      if (!req.user || !req.user.hotelId) throw new AppError("Hotel ID is required", 400);
    const { hotelId } = req.user;
    
    const user=await authService.getUser(id,hotelId)
    res.json({status:200,message:"user was fetched successfully",data:user})
}catch(error){
    next(error)
}

}
export const authenticate = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const { token,permissions } = req.body;
        const result = await authService.authenticate(token,permissions);
        if (!result) {
            res.status(401).json({ error: 'Unauthorized' });
        }
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

export const employees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, hotelId } = req.user!;

    if (!hotelId || !id) {
      throw new AppError("Hotel ID is required", 400);
    }

    if (!req.pagination) {
      throw new AppError("Pagination middleware not initialized", 500);
    }

    const { skip, limit } = req.pagination;

    const result = await req.pagination.getPaginationResult(
      () => authService.getUsers(id, hotelId, skip, limit),
      () => authService.countUsers(hotelId)
    );

    res.status(200).json({
      status: 200,
      message: "Employees fetched successfully",
      data: {
        employees: result.data,
      },
      pagination: result.pagination,
    });
  } catch (error) {
    console.error('Get employees error:', error);
    next(error);
  }
};
