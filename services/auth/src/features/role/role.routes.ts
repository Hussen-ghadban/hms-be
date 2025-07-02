import { Router } from "express";
import { addRole, getRole, getRoles, updateRole, deleteRole } from "./role.controller";
import { validateRequest } from "../../middleware/validation";
import { createRoleSchema, updateRoleSchema, roleIdSchema } from "./role.validation";
import { requirePermissions } from "../../middleware/requirePermissions";
import { actionLogger } from "../../middleware/logger";

const router = Router();

router.post('/add', requirePermissions(["Role.create"]),validateRequest({ body: createRoleSchema }), addRole,actionLogger("add role"));
router.get('/get',  requirePermissions(["Role.read"]),getRoles,actionLogger("get role"));
router.get('/get/:id', requirePermissions(["Role.read"]),validateRequest({ params: roleIdSchema }), getRole,actionLogger("get role"));
router.put('/update/:id',requirePermissions(["Role.update"]), validateRequest({ params: roleIdSchema, body: updateRoleSchema }), updateRole,actionLogger("update role"));
router.delete('/delete/:id',requirePermissions(["Role.delete"]), validateRequest({ params: roleIdSchema }), deleteRole,actionLogger("delete role"));

export default router;