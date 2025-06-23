import { RoomStatus } from "../../../generated/prisma";

export interface CreateRoomParams {
  roomNumber: string;
  roomTypeId: string;
  hotelId: string;
}

export interface UpdateRoomParams {
  id: string;
  roomNumber?: string;
  status?: RoomStatus;
  roomTypeId?: string;
  hotelId: string;
}