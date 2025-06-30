// houseKeeping.service.ts
import { RoomCleaningStatus, RoomStatus } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { CreateHouseKeepingTaskParams, UpdateHouseKeepingTaskParams } from "./houseKeeping.type";

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;

export default class HouseKeepingService {
    
  async createTask({ roomId, userId, status, hotelId,authorization }: CreateHouseKeepingTaskParams & {authorization?:string}) {
    try {
            const userRes = await fetch(`${AUTH_SERVICE_URL}/auth/get-user/${userId}`, {
              headers: {
                Authorization: authorization || "",
                "Content-Type": "application/json"
              }
            });
            if (!userRes.ok) throw new AppError("user not found", 404);
            const guestData = await userRes.json();
            if (!guestData || !guestData.data) throw new AppError("user not found", 404);
      
      const room = await prisma.room.findFirst({
        where: { id: roomId, hotelId },
      });

      if (!room) {
        throw new AppError("Room not found in hotel", 404);
      }

      const task = await prisma.houseKeepingTask.create({
        data: {
          roomId,
          userId,
          status,
        },
      });
      await prisma.room.update({
        where:{id:roomId},
        data:{status:RoomStatus.CLEANING}
      });

      return task;
    } catch (err) {
      console.error("Failed to create housekeeping task:", err);
      if (err instanceof AppError) throw err;
      throw new AppError("Failed to create housekeeping task", 500);
    }
  }

  async getTasks(hotelId: string) {
    return prisma.houseKeepingTask.findMany({
      where: { room: { hotelId } },
      include: { room: true },
    });
  }

  async getTask(id: string, hotelId: string) {
    const task = await prisma.houseKeepingTask.findFirst({
      where: { id, room: { hotelId } },
      include: { room: true },
    });

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    return task;
  }

  async updateTask({ id, hotelId, ...updates }: UpdateHouseKeepingTaskParams) {
    const existingTask = await prisma.houseKeepingTask.findFirst({
      where: { id, room: { hotelId } },
    });

    if (!existingTask) {
      throw new AppError("Task not found", 404);
    }

    const updated = await prisma.houseKeepingTask.update({
      where: { id },
      data: updates,
    });

    return updated;
  }

  async deleteTask(id: string, hotelId: string) {
    const task = await prisma.houseKeepingTask.findFirst({
      where: { id, room: { hotelId } },
      include:{room:true},
    });

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    await prisma.houseKeepingTask.update({
      where: { id },
      data:{status:RoomCleaningStatus.COMPLETED}
    });
    await prisma.room.update({
        where:{id:task.roomId},
        data:{status:RoomStatus.AVAILABLE}
    });
    return { message: "Task deleted successfully" };
  }
}
