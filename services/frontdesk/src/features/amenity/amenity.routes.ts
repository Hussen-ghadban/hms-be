import express from 'express';
import { validateRequest } from "../../middleware/validation";
import { addAmenity, getAmenities, getAmenity, updateAmenity, deleteAmenity } from "./amenity.controller";
import { createAmenitySchema, updateAmenitySchema, amenityParamsSchema } from "./amenity.validation";
import { requirePermissions } from '../../middleware/requirePermissions';
import { actionLogger } from '../../middleware/logger';

const router = express.Router();

router.post('/add',
    
    requirePermissions(["Amenity.create"]),
    validateRequest({ body: createAmenitySchema }),
    addAmenity,
    actionLogger("add Amenity")
);

router.get('/get/:id',
    
    requirePermissions(["Amenity.read"]),
    validateRequest({ params: amenityParamsSchema }),
    getAmenity,
    actionLogger("Get Amenity")
);

router.get('/get',
    
    requirePermissions(["Amenity.read"]),
    getAmenities,
    actionLogger("Get Amenities")
);

router.put('/update/:id',
    
    requirePermissions(["Amenity.update"]),
    validateRequest({
        params: amenityParamsSchema,
        body: updateAmenitySchema
    }),
    updateAmenity,
    actionLogger("update Amenity")
);

router.delete('/delete/:id',
    
    requirePermissions(["Amenity.delete"]),
    validateRequest({ params: amenityParamsSchema }),
    deleteAmenity,
    actionLogger("delete Amenity")
);

export default router;
