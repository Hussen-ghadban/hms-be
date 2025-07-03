// houseKeeping.service.ts
import { date } from "zod";
import { RoomCleaningStatus, RoomStatus } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { CreateHouseKeepingTaskParams, UpdateHouseKeepingTaskParams } from "./houseKeeping.type";

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;

export default class HouseKeepingService {

  async createTask({ roomId, userId, hotelId, authorization }: CreateHouseKeepingTaskParams & { authorization?: string }) {
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
      if (room.status == RoomStatus.CLEANING) {
        throw new AppError("room is already has a housekeeper")
      }
      const task = await prisma.houseKeepingTask.create({
        data: {
          roomId,
          userId,
          status: RoomCleaningStatus.PENDING,
        },
      });
      return task;
    } catch (err) {
      console.error("Failed to create housekeeping task:", err);
      if (err instanceof AppError) throw err;
      throw new AppError("Failed to create housekeeping task", 500);
    }
  }

  async startTask(taskId: string, hotelId: string) {
    const task = await prisma.houseKeepingTask.findFirst({
      where: { id: taskId },
      include: { room: true },
    });

    if (!task) {
      throw new AppError("Task not found", 404);
    }
    const startedTask = await prisma.$transaction(async (tx) => {
      const updatedTask = await tx.houseKeepingTask.update({
        where: { id: taskId },
        data: {
          status: RoomCleaningStatus.IN_PROGRESS,
          startedAt: new Date()
        },
      });

      await tx.room.update({
        where: { id: task.roomId },
        data: { status: RoomStatus.CLEANING, },
      });

      return updatedTask;
    });
    return startedTask;
  }

  async completeTask(taskId: string, hotelId: string) {
    const task = await prisma.houseKeepingTask.findFirst({
      where: { id: taskId, room: { hotelId } },
      include: { room: true },
    });

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    const completedTask = await prisma.$transaction(async (tx) => {
      const updatedTask = await tx.houseKeepingTask.update({
        where: { id: taskId },
        data: {
          status: RoomCleaningStatus.COMPLETED,
          completedAt: new Date()
        },
      });

      await tx.room.update({
        where: { id: task.roomId },
        data: { status: RoomStatus.AVAILABLE },
      });

      return updatedTask;
    });

    return completedTask;
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
      include: { room: true },
    });

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    await prisma.houseKeepingTask.update({
      where: { id },
      data: { status: RoomCleaningStatus.COMPLETED }
    });
    await prisma.room.update({
      where: { id: task.roomId },
      data: { status: RoomStatus.AVAILABLE }
    });
    return { message: "Task deleted successfully" };
  }
}
