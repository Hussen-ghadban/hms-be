// src/routes/auth.ts
import { Router } from 'express';
import { authenticate, login } from './auth.controller';
const router = Router();

router.post('/login', login);
// router.post('/add-user', addUser);
router.post('/services/authenticate',authenticate);
export default router;