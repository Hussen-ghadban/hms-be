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

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { sub: string; hid: string };

      if (!decoded) {
        throw new Error("Error decoding token");
      }

      const userId = decoded.sub;
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

      if (!user || !user.role) {
        throw new Error("")
      }

      // Map permissions from DB to Permission[]
      const userPermissions: Permission[] = user.role.permissions.map(p => ({
        subject: p.subject,
        action: p.action,
      }));

      // Build ability based on user's permissions
      const ability = await defineAbilitiesForUser(userPermissions);

      const denied: string[] = [];

      for (const perm of requiredPermissions) {
        const [subject, action] = perm.split('.');
        if (!subject || !action) {
          throw new Error(`Invalid permission format: ${perm}`);
        }

        if (!ability.can(action as AppActions, subject as AppSubjects)) {
          denied.push(`${subject}.${action}`);
        }
      }

      const granted = denied.length === 0;

      return {
        granted,
        userId: decoded.sub,
        hotelId: decoded.hid,
      }
      return user;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}

export const authService = new AuthService();
export { AuthService };
