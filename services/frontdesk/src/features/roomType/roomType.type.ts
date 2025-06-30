export interface CreateRoomTypeParams {
  name: string;
  description?: string;
  baseRate?: number;
  hotelId: string;
}

export interface UpdateRoomTypeParams {
  id: string;
  name?: string;
  description?: string;
  baseRate?: number;
  hotelId: string;
}

export interface RoomType {
  id: string;
  name: string;
  description?: string | null;
  baseRate: string; // Prisma Decimal serialized as string
  hotelId: string;
  createdAt: Date;
  updatedAt: Date;
}
