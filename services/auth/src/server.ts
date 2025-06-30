// src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './features/auth/auth.routes';
import roleRoutes from './features/role/role.routes';
// import introspectRoutes from './features/introspection/introspection.routes'
import validateRoutes from './middleware/authenticate';
import { errorHandler } from './middleware/errorHandler';
import loggerRoutes from './features/logger/logger.routes';

dotenv.config();
const app = express();
app.use(cors({
  allowedHeaders: ['*'],
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(express.json());
app.use(validateRoutes);

app.use('/auth', authRoutes);
app.use('/logger',loggerRoutes)
app.use('/role', roleRoutes);


app.listen(process.env.PORT || 4000, () =>
  console.log('Auth listening 🔒', process.env.PORT || 4000)
);

app.use(errorHandler);

