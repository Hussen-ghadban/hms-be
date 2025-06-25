export interface CreateRoleParams {
  name: string;
  hotelId: string;
  permissionIds?: string[];
}

export interface UpdateRoleParams {
  id: string;
  name?: string;
  hotelId: string;
  permissionIds?: string[];
}