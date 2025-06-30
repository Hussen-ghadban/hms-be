import { Router } from "express";
import { addRole, getRole, getRoles, updateRole, deleteRole } from "./role.controller";
import { validateRequest } from "../../middleware/validation";
import { createRoleSchema, updateRoleSchema, roleIdSchema } from "./role.validation";
import { requirePermissions } from "../../middleware/requirePermissions";

const router = Router();

router.post('/add', requirePermissions(["Role.create"]),validateRequest({ body: createRoleSchema }), addRole);
router.get('/get',  requirePermissions(["Role.read"]),getRoles);
router.get('/get/:id', requirePermissions(["Role.read"]),validateRequest({ params: roleIdSchema }), getRole);
router.put('/update/:id',requirePermissions(["Role.update"]), validateRequest({ params: roleIdSchema, body: updateRoleSchema }), updateRole);
router.delete('/delete/:id',requirePermissions(["Role.delete"]), validateRequest({ params: roleIdSchema }), deleteRole);

export default router;