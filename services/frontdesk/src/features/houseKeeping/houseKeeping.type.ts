// housekeeping.types.ts

export type RoomCleaningStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELED";

export interface CreateHouseKeepingTaskParams {
  roomId: string;
  userId: string;
  hotelId: string;
  status: RoomCleaningStatus;
}

export interface UpdateHouseKeepingTaskParams {
  id: string;
  roomId?: string;
  userId?: string;
  status?: RoomCleaningStatus;
  hotelId: string;
}

export interface HouseKeepingTask {
  id: string;
  roomId: string;
  userId: string;
  hotelId: string;
  status: RoomCleaningStatus;
  createdAt: Date;
  updatedAt: Date;
}
