export interface CreateAmenityParams {
    name: string;
    hotelId: string;
}

export interface UpdateAmenityParams {
    id: string;
    name?: string;
    hotelId: string;
}

export interface Amenity {
    id: string;
    name: string;
    hotelId: string;
    createdAt: Date;
    updatedAt: Date;
}
