
import express from 'express';
import { addGuest, getGuests,getGuest,updateGuest,deleteGuest } from './guest.controller';
import { addGuestSchema, guestIdSchema, updateGuestSchema } from './guest.validation';
import { validateRequest } from '../../middleware/validation';
import { requirePermissions } from '../../middleware/requirePermissions';

const router=express.Router();

router.post('/add',  requirePermissions(["Guest.create"]), validateRequest({body:addGuestSchema}), addGuest);
router.get('/get/:id',  requirePermissions(["Guest.read"]), validateRequest({params:guestIdSchema}),getGuest);
router.get('/get',  requirePermissions(["Guest.read"]),getGuests);
router.put('/update/:id', requirePermissions(["Guest.update"]), validateRequest({params:guestIdSchema,body:updateGuestSchema}), updateGuest);
router.delete('/delete/:id',  requirePermissions(["Guest.delete"]),validateRequest({params:guestIdSchema}),deleteGuest);
export default router;