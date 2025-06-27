// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import guestRouter from './features/guest/guest.routes';
import { errorHandler } from './middleware/errorHandler';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
  allowedHeaders: ['*'],
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use("/guest", guestRouter);



const PORT = process.env.PORT || 4002;
app.listen(process.env.PORT || 4002, () =>
  console.log(`Customer listening 🚪 ${PORT}`)
);


app.use(errorHandler);