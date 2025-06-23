
import express from 'express';

import { validateRequest } from '../../middleware/validation';
import { addRatePlanSchema, ratePlanIdSchema, updateRatePlanSchema } from './ratePlan.validation';
import { addRatePlan, deleteRatePlan, getRatePlan, getRatePlans, updateRatePlan } from './ratePlan.controller';
import { requirePermissions } from '../../middleware/requirePermissions';

const router=express.Router();

router.post('/add',  requirePermissions(["RatePlan.create"]), validateRequest({body:addRatePlanSchema}), addRatePlan);
router.get('/get/:id',  requirePermissions(["RatePlan.read"]), validateRequest({params:ratePlanIdSchema}),getRatePlan);
router.get('/get',  requirePermissions(["RatePlan.read"]),getRatePlans);
router.put('/update/:id', requirePermissions(["RatePlan.update"]), validateRequest({params:ratePlanIdSchema,body:updateRatePlanSchema}), updateRatePlan);
router.delete('/delete/:id',  requirePermissions(["RatePlan.delete"]),validateRequest({params:ratePlanIdSchema}),deleteRatePlan);
export default router;