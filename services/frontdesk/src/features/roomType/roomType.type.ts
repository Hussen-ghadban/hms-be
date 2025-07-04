export interface CreateRoomTypeParams {
  name: string;
  description?: string;
  baseRate: number;
  maxOccupancy:number;
  childOccupancy:number;
  adultOccupancy: number;
  hotelId: string;
}

export interface UpdateRoomTypeParams {
  id: string;
  name?: string;
  description?: string;
  baseRate?: number;
  maxOccupancy:number;
  childOccupancy:number;
  adultOccupancy: number;
  hotelId: string;
}

export interface RoomType {
  id: string;
  name: string;
  description?: string | null;
  baseRate: string;
  maxOccupancy:number;
  childOccupancy:number;
  adultOccupancy: number;
  hotelId: string;
  createdAt: Date;
  updatedAt: Date;
}
