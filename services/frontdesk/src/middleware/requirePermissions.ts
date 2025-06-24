import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        hotelId: string;
      };
    }
  }
}

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;

export const requirePermissions = (permissions: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ error: 'NO_TOKEN' });
      return;
    }
    const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;
    try {
      const response = await fetch(`${AUTH_SERVICE_URL}/auth/services/authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          token: cleanToken,
          permissions: permissions
        })
      });

      const data = await response.json();

      if (!response.ok) {
        res.status(response.status).json(data);
        return;
      }

      if (!data?.granted) {
        res.status(403).json({
          error: 'INSUFFICIENT_PERMISSIONS',
          required: permissions,
          denied: data?.denied || [],
          available: data?.available || []
        });
        return;
      }

      if (!data.user?.id || !data.user?.hotelId) {
        res.status(401).json({ error: 'INVALID_USER_DATA' });
        return;
      }

      req.user = {
        id: data.user.id,
        hotelId: data.user.hotelId
      };

      next();
    } catch (err) {
      console.error('Permission check failed:', err);
      res.status(500).json({ error: 'AUTH_SERVICE_UNREACHABLE' });
    }
  };
};
