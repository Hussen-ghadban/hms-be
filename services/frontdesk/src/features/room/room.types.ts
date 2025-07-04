import { RoomStatus } from "../../../generated/prisma";

export interface CreateRoomParams {
  roomNumber: string;
  roomTypeId: string;
  hotelId: string;
  floor: number;
  status?: RoomStatus;
  description?: string;
  photos?: string[];
  amenities?: string[];
  connectedRoomIds?: string[];
}


export interface UpdateRoomParams {
  id: string;
  roomNumber?: string;
  roomTypeId?: string;
  hotelId: string;
  floor?: number;
  status?: RoomStatus;
  description?: string;
  photos?: string[];
  amenities?: string[];
  connectedRoomIds?: string[];
}
