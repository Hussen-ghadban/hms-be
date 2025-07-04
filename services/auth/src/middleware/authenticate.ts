import { Request, Response, NextFunction } from 'express';
import { authService } from '../features/auth/auth.service';
import { AppError } from '../utils/AppError';

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

export const requirePermissions = (permissions: string[] = []) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new AppError('No token provided', 401);
      }

      const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7)
        : authHeader;

      const result = await authService.authenticate(token, permissions);

      if (!result.granted) {
        throw new AppError('Insufficient permissions', 403);
      }

      req.user = {
        id: result.user.id,
        hotelId: result.user.hotelId,
      };

      next();
    } catch (err) {
      next(err);
    }
  };
};
