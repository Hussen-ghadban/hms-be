import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { CreateGuestParams, UpdateGuestParams } from "./guest.type";

export default class GuestService {
  async createGuest({
    firstName,
    lastName,
    email,
    phoneNumber,
    identification,
    nationality,
    preferences,
    dob,
    hotelId,
  }: CreateGuestParams) {
    try {
      // Generate unique guest ID
      const gid = `GUEST-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const guest = await prisma.guest.create({
        data: {
          gid,
          firstName,
          lastName,
          email,
          phoneNumber,
          identification,
          nationality,
          preferences,
          dob,
          hotelId,
        },
      });

      return guest;
    } catch (err) {
      console.error("Failed to create room type:", err);
      if (err instanceof AppError) throw err;
      throw new AppError("Failed to create room type", 500);
    }
  }

  async getGuests(hotelId: string) {
    return prisma.guest.findMany({
      where: { hotelId },
      orderBy: { createdAt: "desc" },
    });
  }

  async getGuest(id: string, hotelId: string) {
    const guest = await prisma.guest.findFirst({
      where: { id, hotelId },
    });

    if (!guest) {
      throw new AppError("Guest not found", 404);
    }

    return guest;
  }

  async updateGuest({
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    identification,
    nationality,
    preferences,
    dob,
    hotelId,
  }: UpdateGuestParams) {
    // Check existence and ownership
    const guest = await prisma.guest.findFirst({
      where: { id, hotelId },
    });

    if (!guest) {
      throw new AppError("Guest not found", 404);
    }

    const updatedGuest = await prisma.guest.update({
      where: { id },
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        identification,
        nationality,
        preferences,
        dob,
      },
    });

    return updatedGuest;
  }

  async deleteGuest(id: string, hotelId: string) {
    const guest = await prisma.guest.findFirst({
      where: { id, hotelId },
    });

    if (!guest) {
      throw new AppError("Guest not found", 404);
    }

    await prisma.guest.delete({
      where: { id },
    });

    return { message: "Guest deleted successfully" };
  }
}