// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './features/auth/auth.routes';
// import introspectRoutes from './features/introspection/introspection.routes'
import validateRoutes from './middleware/authenticate';
dotenv.config();
const app = express();
app.use(express.json());
app.use(validateRoutes);

app.use('/auth', authRoutes);
// app.use('/introspect', introspectRoutes);




app.listen(process.env.PORT || 4000, () =>
  console.log('Auth listening 🔒', process.env.PORT || 4000)
);
