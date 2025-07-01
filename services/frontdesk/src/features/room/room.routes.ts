import express from 'express';
import { validateRequest } from "../../middleware/validation";
import { addRoom, getRooms, getRoom, updateRoom, deleteRoom, getRoomsByStatus } from "./room.controller";
import { createRoomSchema, updateRoomSchema, roomParamsSchema } from "./room.validation";
import { requirePermissions } from '../../middleware/requirePermissions';
import { actionLogger } from '../../middleware/logger';

const router = express.Router();

router.post('/add',
    
    requirePermissions(["Room.create"]),
    validateRequest({ body: createRoomSchema }),
    addRoom,
    actionLogger("add room")
);

router.get('/get/:id',
    
    requirePermissions(["Room.read"]),
    validateRequest({ params: roomParamsSchema }),
    getRoom,
    actionLogger("get room")
);


router.get('/get',
    
    requirePermissions(["Room.read"]),
    getRooms,
    actionLogger("get rooms")
);


router.put('/update/:id',
    
    requirePermissions(["Room.update"]),
    validateRequest({
        params: roomParamsSchema,
        body: updateRoomSchema
    }),
    updateRoom,
    actionLogger("update room")
);

router.delete('/delete/:id',
    
    requirePermissions(["Room.delete"]),
    validateRequest({ params: roomParamsSchema }),
    deleteRoom,
    actionLogger("delete room")
);

// Additional route for getting rooms by status
router.get('/get-rooms-by-status/:status',
    
    requirePermissions(["Room.read"]),
    getRoomsByStatus
);

export default router;