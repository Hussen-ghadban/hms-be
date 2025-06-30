// src/routes/auth.ts
import { Router } from 'express';
import { authenticate, login, addUser, getUser } from './auth.controller';
import { requirePermissions } from "../../middleware/requirePermissions";

const router = Router();

router.post('/login', login);
router.post('/add-user',requirePermissions(["User.create"]), addUser);
router.get('/get-user/:id',requirePermissions(["User.read"]), getUser)
router.post('/services/authenticate',authenticate);
export default router;