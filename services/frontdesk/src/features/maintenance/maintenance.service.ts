import { maintenanceStatus, RoomStatus } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { CreateMaintenanceParams, UpdateMaintenanceParams } from "./maintenance.type";

export default class MaintenanceService {
async createMaintenance({
  description,
  priority,
  roomId,
  areaId,
  userId,
  hotelId,
}: CreateMaintenanceParams) {
  if (!roomId && !areaId) {
    throw new AppError("Either roomId or areaId must be provided", 400);
  }

  if (roomId) {
    const room = await prisma.room.findFirst({
      where: { id: roomId, hotelId },
    });
    if (!room) throw new AppError("Room not found in hotel", 404);
  }

  if (areaId) {
    const area = await prisma.area.findFirst({
      where: { id: areaId, hotelId },
    });
    if (!area) throw new AppError("Area not found in hotel", 404);
  }

  return prisma.maintenance.create({
    data: {
      description,
      priority,
      roomId: roomId || undefined,
      areaId: areaId || undefined,
      userId,
    },
  });
}

async startMaintenance(id: string, hotelId: string) {
  const existing = await prisma.maintenance.findFirst({
    where: { id, room: { hotelId } },
    include: { room: true }
  });

  if (!existing) throw new AppError("Maintenance not found", 404);
  if (!existing.roomId) throw new AppError("Maintenance not linked to a room", 400);

  // Update both maintenance status and room status
  return prisma.$transaction([
    prisma.maintenance.update({
      where: { id },
      data: {
        status: maintenanceStatus.IN_PROGRESS,
        startedAt: new Date()
      }
    }),
    prisma.room.update({
      where: { id: existing.roomId },
      data: { status: RoomStatus.MAINTENANCE }
    })
  ]);
}


async completeMaintenance(id: string, hotelId: string) {
  const existing = await prisma.maintenance.findFirst({
    where: { id, room: { hotelId } },
    include: { room: true }
  });

  if (!existing) throw new AppError("Maintenance not found", 404);
  if (!existing.roomId) throw new AppError("Maintenance not linked to a room", 400);

  return prisma.$transaction([
    prisma.maintenance.update({
      where: { id },
      data: {
        status: maintenanceStatus.COMPLETED,
        completedAt:  new Date()
      }
    }),
    prisma.room.update({
      where: { id: existing.roomId },
      data: { status: RoomStatus.AVAILABLE }
    })
  ]);
}


// Get paginated maintenances
async getMaintenances(hotelId: string, skip: number, take: number) {
  return await prisma.maintenance.findMany({
    where: {
      room: {
        hotelId,
      },
    },
    include: {
      room: {
        select:{
          id:true,
          roomNumber:true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take,
  });
}

// Count total maintenances for pagination
async countMaintenances(hotelId: string) {
  return await prisma.maintenance.count({
    where: {
      room: {
        hotelId,
      },
    },
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
