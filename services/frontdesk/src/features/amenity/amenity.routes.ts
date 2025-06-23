import express from 'express';
import { validateRequest } from "../../middleware/validation";
import { addAmenity, getAmenities, getAmenity, updateAmenity, deleteAmenity } from "./amenity.controller";
import { createAmenitySchema, updateAmenitySchema, amenityParamsSchema } from "./amenity.validation";
import { requirePermissions } from '../../middleware/requirePermissions';

const router = express.Router();

router.post('/add',
    
    requirePermissions(["Amenity.create"]),
    validateRequest({ body: createAmenitySchema }),
    addAmenity
);

router.get('/get/:id',
    
    requirePermissions(["Amenity.read"]),
    validateRequest({ params: amenityParamsSchema }),
    getAmenity
);

router.get('/get',
    
    requirePermissions(["Amenity.read"]),
    getAmenities
);

router.put('/update/:id',
    
    requirePermissions(["Amenity.update"]),
    validateRequest({
        params: amenityParamsSchema,
        body: updateAmenitySchema
    }),
    updateAmenity
);

router.delete('/delete/:id',
    
    requirePermissions(["Amenity.delete"]),
    validateRequest({ params: amenityParamsSchema }),
    deleteAmenity
);

export default router;
