import { Request, Response, NextFunction } from "express";
import RoomService from "./room.service";
import { AppError } from "../../utils/AppError";

const roomService = new RoomService();

export const addRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }
        console.log("Received room data:", req.body);

        const { hotelId } = req.user;
        const {
        roomNumber,
        roomTypeId,
        floor,
        maxOccupancy,
        childOccupancy,
        adultOccupancy,
        amenities,
        connectedRoomIds,
        status,
        description,
        photos
        } = req.body;

        const newRoom = await roomService.createRoom({
        roomNumber,
        roomTypeId,
        hotelId,
        floor,
        maxOccupancy,
        childOccupancy,
        adultOccupancy,
        amenities,
        connectedRoomIds,
        status,
        description,
        photos
        });

        res.status(201).json({
            status: 200,
            message: "Room created successfully",
            data: newRoom,
        });
    } catch (error) {
        next(error);
    }
};

export const getRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }

        const { hotelId } = req.user;

        const rooms = await roomService.getRooms(hotelId);

        res.json({
            status: 200,
            data: rooms,
        });
    } catch (error) {
        next(error);
    }
};

export const getRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }

        const { hotelId } = req.user;
        
        const { id } = req.params;
        const room = await roomService.getRoom(id, hotelId);

        res.json({
            status: 200,
            data: room,
        });
    } catch (error) {
        next(error);
    }
};

export const updateRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }

        const { hotelId } = req.user;
        const { id } = req.params;

        const { roomNumber, status, roomTypeId, floor, maxOccupancy, childOccupancy, adultOccupancy, amenities, connectedRoomIds, description, photos   } = req.body;

        const updatedRoom = await roomService.updateRoom({
            id,
            roomNumber,
            roomTypeId,
            hotelId,
            floor,
            maxOccupancy,
            childOccupancy,
            adultOccupancy,
            amenities,
            connectedRoomIds,
            status,
            description,
            photos
        });

        res.json({
            status: 200,
            message: "Room updated successfully",
            data: updatedRoom,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }

        const { hotelId } = req.user;
        
        const { id } = req.params;
        const result = await roomService.deleteRoom(id, hotelId);

        res.json({
            status: 200,
            message: result.message,
        });
    } catch (error) {
        next(error);
    }
};

export const getRoomsByStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.hotelId) {
        throw new AppError("Hotel ID is required", 400);
        }

        const { hotelId } = req.user;
        const { status } = req.params;
        const rooms = await roomService.getRoomsByStatus(status, hotelId);

        res.json({
            status: 200,
            data: rooms,
        });
    } catch (error) {
        next(error);
    }
};