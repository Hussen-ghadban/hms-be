export interface CreateGroupProfileParams {
  name: string;
  legalName?: string;
  email?: string;
  phone?: string;
  primaryContact?: any;
  address?: any;
  billingAddress?: any;
  businessType: string;
  specialRequirements?: string;
  status?: string;
  isVip?: boolean;
  notes?: string;
  hotelId: string;
}

export interface UpdateGroupProfileParams extends CreateGroupProfileParams {
  id: string;
}