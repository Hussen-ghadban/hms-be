import express from 'express';
import { validateRequest } from "../../middleware/validation";
import { addRoom, getRooms, getRoom, updateRoom, deleteRoom, getRoomsByStatus } from "./room.controller";
import { createRoomSchema, updateRoomSchema, roomParamsSchema } from "./room.validation";
import { requirePermissions } from '../../middleware/requirePermissions';

const router = express.Router();

router.post('/add',
    
    requirePermissions(["Room.create"]),
    validateRequest({ body: createRoomSchema }),
    addRoom
);

router.get('/get/:id',
    
    requirePermissions(["Room.read"]),
    validateRequest({ params: roomParamsSchema }),
    getRoom
);


router.get('/get',
    
    requirePermissions(["Room.read"]),
    getRooms
);


router.put('/update/:id',
    
    requirePermissions(["Room.update"]),
    validateRequest({
        params: roomParamsSchema,
        body: updateRoomSchema
    }),
    updateRoom
);

router.delete('/delete/:id',
    
    requirePermissions(["Room.delete"]),
    validateRequest({ params: roomParamsSchema }),
    deleteRoom
);

// Additional route for getting rooms by status
router.get('/get-rooms-by-status/:status',
    
    requirePermissions(["Room.read"]),
    getRoomsByStatus
);

export default router;