// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './features/auth/auth.routes';
import validateRoutes from './middleware/authenticate';
import { errorHandler } from './middleware/errorHandler';
import loggerRoutes from './features/logger/logger.routes';

dotenv.config();
const app = express();
app.use(express.json());
app.use(validateRoutes);
app.use(errorHandler);

app.use('/auth', authRoutes);
app.use('/logger',loggerRoutes)


app.listen(process.env.PORT || 4000, () =>
  console.log('Auth listening 🔒', process.env.PORT || 4000)
);


