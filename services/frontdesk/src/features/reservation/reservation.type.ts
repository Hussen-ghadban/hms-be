export interface CreateReservationParams {
  checkIn: Date;
  checkOut: Date;
  guestId: string;
  roomIds: string[];
  ratePlanId: string;
  hotelId: string;
  authorization?: string;
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
export interface createGroupBookingParams{
  groupProfileId: string;
  hotelId: string;
  guestsAndRooms:Record<string,string[]>
  checkIn: Date;
  checkOut: Date;
  ratePlanId: string;
} 