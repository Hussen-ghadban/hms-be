// src/routes/auth.ts
import { Router } from 'express';
import { authenticate, login, addUser, getUser } from './auth.controller';
import { actionLogger } from '../../middleware/logger';
import { requirePermissions } from '../../middleware/authenticate';
import { validateRequest } from '../../middleware/validation';
import { createUserSchema } from './auth.validation';

const router = Router();

router.post('/login', login,actionLogger("login"));
router.post('/add-user',requirePermissions(["User.create"]), validateRequest({ body: createUserSchema }),  addUser,actionLogger("add user"));
router.get('/get-user/:id',requirePermissions(["User.read"]), getUser, actionLogger("get user"))
router.post('/services/authenticate',authenticate);
router.get('/employees', requirePermissions(["User.read"]),getUser, actionLogger("Query Employees")); 
export default router;