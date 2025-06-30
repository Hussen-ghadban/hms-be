import { Router } from "express";
import { requirePermissions } from "../../middleware/requirePermissions";
import { validateRequest } from "../../middleware/validation";
import { createHouseKeepingTaskSchema, houseKeepingTaskParamsSchema, updateHouseKeepingTaskSchema } from "./houseKeeping.validation";
import { createHouseKeepingTask, deleteHouseKeepingTasks, getHouseKeepingTask, getHouseKeepingTasks, updateHouseKeepingTasks } from "./houseKeeping.controller";

const router=Router();


router.post('/add',
    requirePermissions(["HouseKeeping.create"]),
    validateRequest({ body: createHouseKeepingTaskSchema }),
    createHouseKeepingTask
);

router.get('/get/:id',
    requirePermissions(["HouseKeeping.read"]),
    validateRequest({ params: houseKeepingTaskParamsSchema }),
    getHouseKeepingTask
);

router.get('/get',
    requirePermissions(["HouseKeeping.read"]),
    getHouseKeepingTasks
);

router.put('/update/:id',
    requirePermissions(["HouseKeeping.update"]),
    validateRequest({
        params: houseKeepingTaskParamsSchema,
        body: updateHouseKeepingTaskSchema
    }),
    updateHouseKeepingTasks
);

router.delete('/delete/:id',
    requirePermissions(["HouseKeeping.delete"]),
    validateRequest({ params: houseKeepingTaskParamsSchema }),
    deleteHouseKeepingTasks
);
export default router;