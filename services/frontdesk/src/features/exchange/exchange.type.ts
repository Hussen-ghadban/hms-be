export interface CreateExchangeRateParams {
  baseCurrency: string;
  targetCurrency: string;
  rate: number;
  hotelId: string;
}

export interface UpdateExchangeRateParams {
  id: string;
  baseCurrency?: string;
  targetCurrency?: string;
  rate?: number;
  hotelId: string;
}

export interface ExchangeRate {
  id: string;
  baseCurrency: string;
  targetCurrency: string;
  rate: number;
  hotelId: string;
  createdAt: Date;
  updatedAt: Date;
}
