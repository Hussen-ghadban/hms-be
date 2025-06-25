export interface CreateReservationParams {
  checkIn: Date;
  checkOut: Date;
  guestId: string;
  roomId: string;
  ratePlanId: string;
  hotelId: string;
}
export interface UpdateReservationParams {
  reservationId: string;
  checkIn?: Date;
  checkOut?: Date;
  roomId?: string;
  ratePlanId?: string;
}
export interface CheckInParams {
    reservationId: string;
    hotelId: string;
    deposit: number;
}