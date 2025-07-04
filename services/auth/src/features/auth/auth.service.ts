import { prisma } from '../../lib/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AppActions, AppSubjects, defineAbilitiesForUser } from '../../utils/ability';
import { Permission } from './auth.types';

class AuthService {
  async login(email: string, password: string, hotelId: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: { include: { permissions: true } }, hotel: true },
    });

    if (!user || !user.isActive) {
      throw new Error('INVALID_CRED');
    }

    const userHotel = user.hotel.find(h => h.id === hotelId);
    if (!userHotel) {
      throw new Error('INVALID_CRED');
    }

    // const passwordMatches = await bcrypt.compare(password, user.password);
    // if (!passwordMatches) {
    //   throw new Error('INVALID_CRED');
    // }

    const payload = {
      sub: user.id,
      hid: userHotel.id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    return token;
  }


  async authenticate(token: string, requiredPermissions: string[] = []) {
    try {
      if (!token) {
        throw new Error('No token provided');
      }

      // Handle Bearer token format

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { sub: string; hid: string };

      if (!decoded || !decoded.sub || !decoded.hid) {
        throw new Error("Invalid token structure");
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
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      if (!user.isActive) {
        throw new Error("User account is inactive");
      }

      if (!user.role) {
        throw new Error("User has no role assigned");
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
          throw new Error(`Invalid permission format: ${perm}. Expected format: subject.action`);
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
        throw new Error('Invalid token');
      }
      if (e instanceof jwt.TokenExpiredError) {
        throw new Error('Token expired');
      }
      if (e instanceof jwt.NotBeforeError) {
        throw new Error('Token not active');
      }

      if (e instanceof Error) {
        throw e; // Re-throw our custom errors
      }
      throw new Error("An unexpected error occurred during authentication");
    }
  }
}

export const authService = new AuthService();
export { AuthService };
