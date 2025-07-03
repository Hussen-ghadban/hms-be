import { maintenanceStatus } from "../../../generated/prisma";

export interface CreateMaintenanceParams {
  description: string;
  priority: string;
  roomId: string;
  hotelId: string;
}

export interface UpdateMaintenanceParams {
  id: string;
  description?: string;
  priority?: string;
  roomId?: string;
  status?: maintenanceStatus;
  hotelId: string;
}