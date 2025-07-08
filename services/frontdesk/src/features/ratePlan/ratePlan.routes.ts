
import express from 'express';

import { validateRequest } from '../../middleware/validation';
import { addRatePlanSchema, ratePlanIdSchema, updateRatePlanSchema } from './ratePlan.validation';
import { addRatePlan, deleteRatePlan, getRatePlan, getRatePlans, updateRatePlan } from './ratePlan.controller';
import { requirePermissions } from '../../middleware/requirePermissions';
import { actionLogger } from '../../middleware/logger';
import { paginateResults } from '../../middleware/pagination.middleware';

const router=express.Router();

router.post('/add',  requirePermissions(["RatePlan.create"]), validateRequest({body:addRatePlanSchema}), addRatePlan,actionLogger("add ratePlan"));
router.get('/get/:id',  requirePermissions(["RatePlan.read"]), validateRequest({params:ratePlanIdSchema}),getRatePlan,actionLogger("get ratePlan"));
router.get('/get',  requirePermissions(["RatePlan.read"]),paginateResults,getRatePlans,actionLogger("get ratePlans"));
router.put('/update/:id', requirePermissions(["RatePlan.update"]), validateRequest({params:ratePlanIdSchema,body:updateRatePlanSchema}), updateRatePlan,actionLogger("update ratePlan"));
router.delete('/delete/:id',  requirePermissions(["RatePlan.delete"]),validateRequest({params:ratePlanIdSchema}),deleteRatePlan,actionLogger("delete ratePlan"));
export default router;