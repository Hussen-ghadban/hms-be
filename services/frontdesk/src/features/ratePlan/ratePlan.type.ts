export interface CreateRatePlanParams {
  code: string;
  name: string;
  baseAdjType: "PERCENT" | "FIXED";
  baseAdjVal: number;
  currencyId: string;
  hotelId: string;
}

export interface UpdateRatePlanParams {
  id: string;
  code?: string;
  name?: string;
  baseAdjType?: "PERCENT" | "FIXED";
  baseAdjVal?: number;
  currencyId?: string;
  isActive?: boolean;
  hotelId: string;
}

export interface RatePlan {
  id: string;
  code: string;
  name: string;
  baseAdjType: "PERCENT" | "FIXED";
  baseAdjVal: number;
  currencyId: string;
  hotelId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
