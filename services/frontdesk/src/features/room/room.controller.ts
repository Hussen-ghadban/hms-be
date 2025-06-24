import { Request, Response, NextFunction } from "express";
import RoomService from "./room.service";

const roomService = new RoomService();

export const addRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { hotelId } = req.user!


        if (!hotelId) {
            res.status(400).json({ status: 400, message: "Hotel ID is required" });
            return;
        }


        const { roomNumber, roomTypeId } = req.body;

        const newRoom = await roomService.createRoom({
            roomNumber,
            roomTypeId,
            hotelId,
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
        const { hotelId } = req.user!


        if (!hotelId) {
            res.status(400).json({ status: 400, message: "Hotel ID is required" });
            return;
        }

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
        const { hotelId } = req.user!

        const { id } = req.params;

        if (!hotelId) {
            res.status(400).json({ status: 400, message: "Hotel ID is required" });
            return;
        }

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
        const { hotelId } = req.user!

        const { id } = req.params;

        if (!hotelId) {
            res.status(400).json({ status: 400, message: "Hotel ID is required" });
            return;
        }

        const { roomNumber, status, roomTypeId } = req.body;

        const updatedRoom = await roomService.updateRoom({
            id,
            roomNumber,
            status,
            roomTypeId,
            hotelId,
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
        const { hotelId } = req.user!

        const { id } = req.params;

        if (!hotelId) {
            res.status(400).json({ status: 400, message: " Hotel ID is required" });
            return;
        }

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
        const { hotelId } = req.user!

        const { status } = req.params;

        if (!hotelId) {
            res.status(400).json({ status: 400, message: "Hotel ID is required" });
            return;
        }
        const rooms = await roomService.getRoomsByStatus(status, hotelId);

        res.json({
            status: 200,
            data: rooms,
        });
    } catch (error) {
        next(error);
    }
};