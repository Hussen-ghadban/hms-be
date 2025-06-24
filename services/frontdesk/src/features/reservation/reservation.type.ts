export interface CreateReservationParams {
  checkIn: Date;
  checkOut: Date;
  guestId: string;
  roomId: string;
  ratePlanId: string;
  hotelId: string;
}
export interface CheckInParams {
    reservationId: string;
    hotelId: string;
    deposit: number;
}