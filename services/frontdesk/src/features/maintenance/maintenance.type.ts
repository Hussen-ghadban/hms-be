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
  status?: string;
  hotelId: string;
}