export interface user {
    role: {
        permissions: {
            id: string;
            subject: string;
            action: string;
        }[]
    }
    id: string;
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    roleId: string;
}

export interface Permission {
  subject: string;
  action: string;
}
export interface addUserParams {
    email: string,
    password: string,
    username: string,
    firstName: string,
    lastName: string,
    roleId: string
    hotelId: string,
}