import { prisma } from "../../lib/prisma";
import { CreateGuestParams, UpdateGuestParams } from "./guest.type";

export default class GuestService {
  async createGuest({
    firstName,
    lastName,
    email,
    phoneNumber,
    hotelId,
  }: CreateGuestParams) {
    try {
      const guest = await prisma.guest.create({
        data: {
          firstName,
          lastName,
          email,
          phoneNumber,
          hotelId,
        },
      });

      return guest;
    } catch (error) {
      console.error("Error creating guest:", error);
      throw new Error("Failed to create guest");
    }
  }

  async getGuests( hotelId: string) {
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
      throw new Error("Guest not found");
    }

    return guest;
  }

  async updateGuest({
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    hotelId,
  }: UpdateGuestParams) {
    // Check existence and ownership
    const guest = await prisma.guest.findFirst({
      where: { id, hotelId },
    });

    if (!guest) {
      throw new Error("Guest not found");
    }

    const updatedGuest = await prisma.guest.update({
      where: { id },
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
      },
    });

    return updatedGuest;
  }

  async deleteGuest(id: string, hotelId: string) {
    const guest = await prisma.guest.findFirst({
      where: { id,  hotelId },
    });

    if (!guest) {
      throw new Error("Guest not found");
    }

    await prisma.guest.delete({
      where: { id },
    });

    return { message: "Guest deleted successfully" };
  }
}