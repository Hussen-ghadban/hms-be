
import express from 'express';
import { addGuest, getGuests,getGuest,updateGuest,deleteGuest } from './guest.controller';
import { addGuestSchema, guestIdSchema, updateGuestSchema } from './guest.validation';
import { validateRequest } from '../../middleware/validation';
import { requirePermissions } from '../../middleware/requirePermissions';
import { actionLogger } from '../../middleware/logger';
import { paginateResults } from '../../middleware/pagination.middleware';

const router=express.Router();

router.post('/add',  requirePermissions(["Guest.create"]), validateRequest({body:addGuestSchema}), addGuest,actionLogger("add guest"));
router.get('/get/:id',  requirePermissions(["Guest.read"]), validateRequest({params:guestIdSchema}),getGuest,actionLogger("get guest"));
router.get('/get',  requirePermissions(["Guest.read"]),paginateResults,getGuests,actionLogger("get guests"));
router.put('/update/:id', requirePermissions(["Guest.update"]), validateRequest({params:guestIdSchema,body:updateGuestSchema}), updateGuest,actionLogger("update guest"));
router.delete('/delete/:id',  requirePermissions(["Guest.delete"]),validateRequest({params:guestIdSchema}),deleteGuest,actionLogger("delete guest"));
export default router;