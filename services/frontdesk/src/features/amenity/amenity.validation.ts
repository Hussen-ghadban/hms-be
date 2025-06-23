import z from "zod";

// Schema for creating an amenity
export const createAmenitySchema = z.object({
    name: z.string().min(1, "Amenity name is required")
});

// Schema for updating an amenity (all fields optional)
export const updateAmenitySchema = z.object({
    name: z.string().min(1, "Amenity name is required").optional()
});

// Schema for amenity ID parameter
export const amenityParamsSchema = z.object({
    id: z.string().min(1, "Amenity ID is required")
});

// Type inference for TypeScript
export type CreateAmenityInput = z.infer<typeof createAmenitySchema>;
export type UpdateAmenityInput = z.infer<typeof updateAmenitySchema>;
export type AmenityParamsInput = z.infer<typeof amenityParamsSchema>;
