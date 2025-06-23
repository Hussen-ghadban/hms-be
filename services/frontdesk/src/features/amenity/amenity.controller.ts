import { Request, Response, NextFunction } from "express";
import AmenityService from "./amenity.service";

const amenityService = new AmenityService();

export const addAmenity = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
    const { hotelId } = req.user!;


        if ( !hotelId) {
             res.status(400).json({ status: 400, message: "Hotel ID are required" });
                return;
        }

        const { name } = req.body;

        const newAmenity = await amenityService.createAmenity({
            name,
            hotelId,
        });

        res.status(201).json({
            status: 200,
            message: "Amenity created successfully",
            data: newAmenity,
        });
    } catch (error) {
        next(error);

    }
};

export const getAmenities = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
    const {hotelId } = req.user!;


        if ( !hotelId) {
            res.status(400).json({ status: 400, message: "Hotel ID are required" });
            return;
        }

        const amenities = await amenityService.getAmenities(hotelId);

        res.json({
            status: 200,
            data: amenities,
        });
    } catch (error) {
        next(error);
    }
};

export const getAmenity = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
    const {hotelId } = req.user!;

        const { id } = req.params;

        if (!hotelId) {
            res.status(400).json({ status: 400, message: "Hotel ID are required" });
            return;
        }


        const amenity = await amenityService.getAmenity(id, hotelId);

        res.json({
            status: 200,
            data: amenity,
        });
    } catch (error) {
        next(error);
    }
};

export const updateAmenity = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
    const {hotelId } = req.user!;

        const { id } = req.params;

        if (!hotelId) {
            res.status(400).json({ status: 400, message: "Hotel ID are required" });
            return;
        }

        const { name } = req.body;

        const updatedAmenity = await amenityService.updateAmenity({
            id,
            name,
            hotelId,
        });

        res.json({
            status: 200,
            message: "Amenity updated successfully",
            data: updatedAmenity,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteAmenity = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
    const { hotelId } = req.user!;

        const { id } = req.params;

        if ( !hotelId) {
            res.status(400).json({ status: 400, message: "Tenant ID and Hotel ID are required" });
            return;
        }

        const result = await amenityService.deleteAmenity(id, hotelId);

        res.json({
            status: 200,
            message: result.message,
        });
    } catch (error) {
        next(error);
    }
};
