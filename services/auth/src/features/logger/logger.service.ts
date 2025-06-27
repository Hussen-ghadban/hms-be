import { prisma } from '../../lib/prisma';
import { SessionData, ActionLogEntry, SessionWithUser, BusinessContext } from './logger.types';

class LoggerService {
  async logAction(entry: ActionLogEntry): Promise<void> {
    try {
      await prisma.actionLog.create({
        data: {
          userId: entry.userId,
          hotelId: entry.hotelId,
          service: entry.service,
          action: entry.action,
          resourceType: entry.resourceType,
          status: entry.status,
          errorMessage: entry.errorMessage,
        },
      });
      console.log(`[${entry.status}] ${entry.service}.${entry.action} by user ${entry.userId}`);
    } catch (error) {
      console.error('Failed to log action:', error);
    }
  }
}
export const loggerService = new LoggerService();
export { LoggerService };
