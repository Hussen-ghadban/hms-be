// src/routes/auth.ts
import { Router } from 'express';
import { login } from './auth.controller';
const router = Router();

router.post('/login', login);
// router.post('/add-user', addUser);
export default router;