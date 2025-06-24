import { NextFunction, Request, Response } from "express";
import GuestService from "./guest.service";

const guestService =new GuestService();

export const addGuest=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try {
    const { hotelId } = req.user!;


        if (!hotelId) {
             res.status(400).json({ status: 400, message: "Hotel ID are required" });
             return;
        }

        const { firstName, lastName, email, phoneNumber } = req.body;

        // Assuming guestService is defined and has a method to create a guest
        const newGuest = await guestService.createGuest({
            firstName,
            lastName,
            email,
            phoneNumber,
            hotelId,
        });

        res.status(201).json({
            status: 200,
            message: "Guest created successfully",
            data: newGuest,
        });
    } catch (error) {
        
    }
}
export const getGuests = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const { hotelId } = req.user!;

        if (!hotelId) {
        }

        // Assuming guestService is defined and has a method to get guests
        const guests = await guestService.getGuests(hotelId);

        res.json({
            status: 200,
            message: "Guests retrieved successfully",
            data: guests,
        });
    } catch (error) {
    }
}
export const getGuest = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const {  hotelId } = req.user!;

        const id = req.params.id;

        if (!hotelId) {
        }

        // Assuming guestService is defined and has a method to get a guest by ID
        const guest = await guestService.getGuest(id, hotelId);

        if (!guest) {
        }

        res.json({
            status: 200,
            message: "Guest retrieved successfully",
            data: guest,
        });
    } catch (error) {
    }
}
export const updateGuest = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const { hotelId } = req.user!;

        const id = req.params.id;

        if (!hotelId) {
        }

        const { firstName, lastName, email, phoneNumber } = req.body;

        const updatedGuest = await guestService.updateGuest({
            id,
            firstName,
            lastName,
            email,
            phoneNumber,
            hotelId,
        });

        res.json({
            status: 200,
            message: "Guest updated successfully",
            data: updatedGuest,
        });
    } catch (error) {
    }
}
export const deleteGuest = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const {  hotelId } = req.user!;

        const id = req.params.id;

        if ( !hotelId) {

        }

        // Assuming guestService is defined and has a method to delete a guest
        await guestService.deleteGuest(id, hotelId);

        res.json({
            status: 200,
            message: "Guest deleted successfully",
        });
    } catch (error) {
    }
}