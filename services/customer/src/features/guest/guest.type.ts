export interface CreateGuestParams {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  hotelId: string;
}

export interface UpdateGuestParams {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string | null;
  phoneNumber?: string | null;
  hotelId: string;
}

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  phoneNumber?: string | null;
  hotelId: string;
  createdAt: Date;
  updatedAt: Date;
}