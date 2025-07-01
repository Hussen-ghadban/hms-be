import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { CreateMaintenanceParams, UpdateMaintenanceParams } from "./maintenance.type";

export default class MaintenanceService {
  async createMaintenance({ description, priority, roomId, hotelId }: CreateMaintenanceParams) {
    const room = await prisma.room.findFirst({ where: { id: roomId, hotelId } });
    if (!room) throw new AppError("Room not found in hotel", 404);

    return prisma.maintenance.create({
      data: { description, priority, roomId }
    });
  }

  async getMaintenances(hotelId: string) {
    return prisma.maintenance.findMany({
      where: { room: { hotelId } },
      include: { room: true },
      orderBy: { createdAt: "desc" }
    });
  }

  async getMaintenance(id: string, hotelId: string) {
    const maintenance = await prisma.maintenance.findFirst({
      where: { id, room: { hotelId } },
      include: { room: true }
    });
    if (!maintenance) throw new AppError("Maintenance not found", 404);
    return maintenance;
  }

  async updateMaintenance({ id, hotelId, ...updates }: UpdateMaintenanceParams) {
    const existing = await prisma.maintenance.findFirst({
      where: { id, room: { hotelId } }
    });
    if (!existing) throw new AppError("Maintenance not found", 404);

    return prisma.maintenance.update({
      where: { id },
      data: updates
    });
  }

  async deleteMaintenance(id: string, hotelId: string) {
    const existing = await prisma.maintenance.findFirst({
      where: { id, room: { hotelId } }
    });
    if (!existing) throw new AppError("Maintenance not found", 404);

    await prisma.maintenance.delete({ where: { id } });
    return { message: "Maintenance deleted successfully" };
  }
}
