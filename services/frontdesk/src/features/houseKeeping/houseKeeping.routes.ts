import { Router } from "express";
import { requirePermissions } from "../../middleware/requirePermissions";
import { validateRequest } from "../../middleware/validation";
import { createHouseKeepingTaskSchema, houseKeepingTaskParamsSchema, updateHouseKeepingTaskSchema } from "./houseKeeping.validation";
import { completeHouseKeepingTask, createHouseKeepingTask, deleteHouseKeepingTasks, getHouseKeepingTask, getHouseKeepingTasks, startHouseKeepingTask, updateHouseKeepingTasks } from "./houseKeeping.controller";
import { actionLogger } from "../../middleware/logger";
import { paginateResults } from "../../middleware/pagination.middleware";

const router=Router();


router.post('/add',
    requirePermissions(["HouseKeeping.create"]),
    validateRequest({ body: createHouseKeepingTaskSchema }),
    createHouseKeepingTask,
    actionLogger("add HouseKeeping")
);
router.post(
  "/start/:id",
  requirePermissions(["HouseKeeping.update"]),
  validateRequest({ params: houseKeepingTaskParamsSchema }),
  startHouseKeepingTask,
  actionLogger("start housekeeping task")
);

router.post(
  "/complete/:id",
  requirePermissions(["HouseKeeping.update"]),
  validateRequest({ params: houseKeepingTaskParamsSchema }),
  completeHouseKeepingTask,
  actionLogger("complete housekeeping task")
);

router.get('/get/:id',
    requirePermissions(["HouseKeeping.read"]),
    validateRequest({ params: houseKeepingTaskParamsSchema }),
    getHouseKeepingTask,
    actionLogger("get HouseKeeping")
);

router.get('/get',
    requirePermissions(["HouseKeeping.read"]),
    paginateResults,
    getHouseKeepingTasks,
    actionLogger("get HouseKeepings")
);

router.put('/update/:id',
    requirePermissions(["HouseKeeping.update"]),
    validateRequest({
        params: houseKeepingTaskParamsSchema,
        body: updateHouseKeepingTaskSchema
    }),
    updateHouseKeepingTasks,
    actionLogger("update HouseKeeping")
);

router.delete('/delete/:id',
    requirePermissions(["HouseKeeping.delete"]),
    validateRequest({ params: houseKeepingTaskParamsSchema }),
    deleteHouseKeepingTasks,
    actionLogger("delete HouseKeeping")
);
export default router;