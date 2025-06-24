export interface CreateGuestParams {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  identification: any;
  nationality?: string;
  preferences?: any;
  dob?: Date;
  hotelId: string;
}

export interface UpdateGuestParams {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string | null;
  phoneNumber?: string | null;
  identification?: any;
  nationality?: string | null;
  preferences?: any | null;
  dob?: Date | null;
  hotelId: string;
}

export interface Guest {
  id: string;
  gid: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  phoneNumber?: string | null;
  identification: any;
  nationality?: string | null;
  preferences?: any | null;
  dob?: Date | null;
  hotelId: string;
  createdAt: Date;
  updatedAt: Date;
}