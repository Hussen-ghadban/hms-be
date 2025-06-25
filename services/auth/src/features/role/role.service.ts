import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { CreateRoleParams, UpdateRoleParams } from "./role.types";

export default class RoleService {
  async createRole({ name, hotelId, permissionIds }: CreateRoleParams) {
    // Check for duplicate
    const exists = await prisma.role.findFirst({ where: { name, hotelId } });
    if (exists) throw new AppError("Role already exists", 400);

    const role = await prisma.role.create({
      data: {
        name,
        hotelId,
        permissions: permissionIds
          ? { connect: permissionIds.map(id => ({ id })) }
          : undefined,
      },
      include: { permissions: true },
    });
    return role;
  }

  async getRoles(hotelId: string) {
    return prisma.role.findMany({
      where: { hotelId },
      include: { permissions: true },
    });
  }

  async getRole(id: string, hotelId: string) {
    const role = await prisma.role.findFirst({
      where: { id, hotelId },
      include: { permissions: true },
    });
    if (!role) throw new AppError("Role not found", 404);
    return role;
  }

  async updateRole({ id, name, hotelId, permissionIds }: UpdateRoleParams) {
    const role = await prisma.role.findFirst({ where: { id, hotelId } });
    if (!role) throw new AppError("Role not found", 404);

    const updated = await prisma.role.update({
      where: { id },
      data: {
        name,
        permissions: permissionIds
          ? { set: permissionIds.map(id => ({ id })) }
          : undefined,
      },
      include: { permissions: true },
    });
    return updated;
  }

  async deleteRole(id: string, hotelId: string) {
    const role = await prisma.role.findFirst({ where: { id, hotelId } });
    if (!role) throw new AppError("Role not found", 404);

    await prisma.role.delete({ where: { id } });
    return { message: "Role deleted successfully" };
  }
}