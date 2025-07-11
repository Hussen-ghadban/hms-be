import { BusinessType, GroupStatus } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { CreateGroupProfileParams, UpdateGroupProfileParams } from "./groupProfile.types";

export default class GroupProfileService {
  async createGroupProfile(data: CreateGroupProfileParams) {
    // Cast businessType and status if they come as strings (optional)
    return prisma.groupProfile.create({
      data: {
        ...data,
        businessType: data.businessType as BusinessType,
        status:GroupStatus.ACTIVE
      },
    });
  }

async getGroupProfiles(hotelId: string, skip: number, take: number) {
  return prisma.groupProfile.findMany({
    where: { hotelId },
    orderBy: { createdAt: "desc" },
    skip,
    take,
  });
}

async countGroupProfiles(hotelId: string) {
  return prisma.groupProfile.count({
    where: { hotelId },
  });
}

  async getGroupProfile(id: string, hotelId: string) {
    const profile = await prisma.groupProfile.findFirst({ where: { id, hotelId } });
    if (!profile) throw new AppError("Group profile not found", 404);
    return profile;
  }

async updateGroupProfile(params: UpdateGroupProfileParams) {
  const existing = await prisma.groupProfile.findFirst({ where: { id: params.id, hotelId: params.hotelId } });
  if (!existing) throw new AppError("Group profile not found", 404);

  const { id, hotelId, businessType,  ...rest } = params;

  const updateData: any = { ...rest };

  if (businessType) {
    updateData.businessType = { set: businessType as BusinessType };
  }

  if (status) {
    updateData.status = { set: status as GroupStatus };
  }

  return prisma.groupProfile.update({
    where: { id },
    data: updateData,
  });
}

  async deleteGroupProfile(id: string, hotelId: string) {
    const profile = await prisma.groupProfile.findFirst({ where: { id, hotelId } });
    if (!profile) throw new AppError("Group profile not found", 404);
    await prisma.groupProfile.delete({ where: { id } });
  }

  async linkGuests(groupId: string, guestIds: string[]) {
    const groupProfile = await prisma.groupProfile.findFirst({ where: { id: groupId } });
    if (!groupProfile) throw new AppError("Group profile not found", 404);

    const guests = await prisma.guest.findMany({
      where: { id: { in: guestIds }, hotelId: groupProfile.hotelId },
    });

    if (guests.length !== guestIds.length) {
      throw new AppError("Some guests not found or do not belong to this hotel", 404);
    }

    return prisma.groupProfile.update({
      where: { id: groupId },
      data: {
        LinkedGuests: {
          connect: guests.map(guest => ({ id: guest.id })),
        },
      },
    });
  }
}
