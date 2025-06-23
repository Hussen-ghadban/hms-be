import { prisma } from '../../lib/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
}

export const authService = new AuthService();
export { AuthService };
