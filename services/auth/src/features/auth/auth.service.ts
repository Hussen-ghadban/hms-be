import { prisma } from '../../lib/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AppActions, AppSubjects, defineAbilitiesForUser } from '../../utils/ability';
import { LogInput, Permission } from './auth.types';
import { loggerService } from '../logger/logger.service';
import { BusinessContext } from '../logger/logger.types';
import { addUserParams } from './auth.types';
import { AppError } from '../../utils/AppError';

class AuthService {
  async login(username: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { role: { include: { permissions: true } }, hotel: true },
    });

    if (!user || !user.isActive) {
      throw new AppError('Invalid Credentials',401);
    }

    const userHotel = user.hotel[0];
    if (!userHotel) {
      throw new AppError('Invalid Credentials',401);
    }

    // const passwordMatches = await bcrypt.compare(password, user.password);
    // if (!passwordMatches) {
    //   throw new AppError('Invalid Credentials',401);
    // }

    const payload = {
      sub: user.id,
      hid: userHotel.id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '24h',
    });
    // Create session and log login
    try {
      await loggerService.logAction({
        userId: user.id,
        hotelId: userHotel.id,
        service: 'auth',
        action: 'login',
        status: 'SUCCESS',
      });
    } catch (error) {
      console.error('Failed to log login:', error);
    }
        const permissions = user.role.permissions.map((p) => ({
      subject: p.subject,
      action: p.action,
    }));

        return {
      token,
        permissions,
    };
  }

  async addUser({
    email,
    password,
    username,
    firstName,
    lastName,
    roleId,
    hotelId,
  }:addUserParams) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new AppError('User already exists');
    }
    const existingUser = await prisma.user.findUnique({
  where: { username },
});

if (existingUser) {
  throw new AppError("Username already exists", 409);
}

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username: username,
        firstName: firstName,
        lastName: lastName,
        hotel: { connect: { id: hotelId } },
        roleId: roleId
      },
      include: {
        role: true,
        hotel: true,
      },
    });

    return user;
  }
  async getUser(id:string,hotelId:string){
      const user=await prisma.user.findFirst({
        where:{id}
      })
      if(!user){
        throw new AppError("user not found",404)
      }
      return user;
    
  }

  async authenticate(token: string, requiredPermissions: string[] = []) {
    try {
      if (!token) {
        throw new AppError('No token provided',401);
      }


      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { sub: string; hid: string };

      if (!decoded || !decoded.sub || !decoded.hid) {
        throw new AppError("Invalid token structure",401);
      }

      const userId = decoded.sub;
      const hotelId = decoded.hid;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          role: {
            include: {
              permissions: true,
            },
          },
          hotel: true,
        },
      });
      if (!user) {
        throw new AppError("User not found",404);
      }

      if (!user.role) {
        throw new AppError("User has no role assigned",403);
      }

      // Map permissions from DB to Permission[]
      const userPermissions: Permission[] = user.role.permissions.map(p => ({
        subject: p.subject,
        action: p.action,
      }));

      // Build ability based on user's permissions
      const ability = await defineAbilitiesForUser(userPermissions);

      const denied: string[] = [];
      const available: string[] = userPermissions.map(p => `${p.subject}.${p.action}`);

      // Check required permissions
      for (const perm of requiredPermissions) {
        const [subject, action] = perm.split('.');
        if (!subject || !action) {
          throw new AppError(`Invalid permission format: ${perm}. Expected format: subject.action`);
        }

        if (!ability.can(action as AppActions, subject as AppSubjects)) {
          denied.push(perm);
        }
      }

      const granted = denied.length === 0;

      return {
        granted,
        denied,
        available,
        user: {
          id: userId,
          hotelId: hotelId,
          email: user.email,
          role: user.role.name
        }
      };

    } catch (e) {
      // Re-throw JWT errors with more specific messages
      if (e instanceof jwt.JsonWebTokenError) {
        throw new AppError('Invalid token',401);
      }
      if (e instanceof jwt.TokenExpiredError) {
        throw new AppError('Token expired',401);
      }
      if (e instanceof jwt.NotBeforeError) {
        throw new AppError('Token not active',401);
      }

      if (e instanceof AppError) {
        throw e; // Re-throw our custom errors
      }
      throw new AppError("An unexpected error occurred during authentication",500);
    }
  }
async getUsers(userId: string, hotelId: string, skip: number, take: number) {
  return prisma.user.findMany({
    where: {
      hotel: {
        some: {
          id: hotelId,
        },
      },
    },
    include: {
      role: true,
      hotel: true,
    },
    skip,
    take,
  });
}

async countUsers(hotelId: string) {
  return prisma.user.count({
    where: {
      hotel: {
        some: {
          id: hotelId,
        },
      },
    },
  });
}

}

export const authService = new AuthService();
export { AuthService };
