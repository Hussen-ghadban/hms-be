import { RoomStatus } from "../../../generated/prisma";

export interface CreateRoomParams {
  roomNumber: string;
  roomTypeId: string;
  hotelId: string;
  floor: number;
  maxOccupancy: number;
  adultOccupancy: number;
  childOccupancy: number;
  amenities?: string[];
  connectedRoomIds?: string[] 
}

export interface UpdateRoomParams {
  id: string;
  roomNumber?: string;
  status?: RoomStatus;
  roomTypeId?: string;
  hotelId: string;
  floor:number;
  maxOccupancy:number;
  adultOccupancy:number;
  childOccupancy: number;
  description?: string;
  amenities?: string[];
  connectedRoomIds?: string[] 
}