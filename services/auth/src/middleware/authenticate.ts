import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppActions, AppSubjects, defineAbilitiesForUser } from '../utils/ability';
import { prisma } from '../lib/prisma';

const router = express.Router();

export interface Permission {
  subject: string;
  action: string;
}

// Ensure JWT_SECRET is set
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not set in environment variables");
}

router.post('/auth/check-permissions', async (req: Request, res: Response): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'NO_TOKEN' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const requiredPermissions: string[] = req.body.required || [];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;

    const userId = payload.sub;
    const hotelId = payload.hid;

    if (typeof userId !== 'string') {
      res.status(401).json({ error: 'MISSING_USER_ID' });
      return;
    }

    if (typeof hotelId !== 'string') {
      res.status(401).json({ error: 'MISSING_HOTEL_ID' });
      return;
    }

    // Fetch user's role and permissions from the database
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
      res.status(401).json({ error: 'USER_OR_ROLE_NOT_FOUND' });
      return;
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
        res.status(400).json({ error: `Invalid permission format: '${perm}'` });
        return;
      }

      if (!ability.can(action as AppActions, subject as AppSubjects)) {
        denied.push(`${subject}.${action}`);
      }
    }

    const granted = denied.length === 0;

    res.status(200).json({
      granted,
      denied,
      perms: userPermissions,
      available: userPermissions.map(p => `${p.subject}.${p.action}`),
      user: {
        id: userId,
        hotelId: hotelId
      }
    });

  } catch (err) {
    console.error('JWT verification error:', err);
    res.status(401).json({ error: 'BAD_TOKEN' });
  }
});

export default router;
