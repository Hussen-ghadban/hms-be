// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import guestRouter from './features/guest/guest.routes';
import groupProfileRouter from './features/groupProfile/groupProfile.routes'
import { errorHandler } from './middleware/errorHandler';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  allowedHeaders: ['*'],
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use("/guest", guestRouter);
app.use("/groupProfile", groupProfileRouter);




const PORT = process.env.PORT || 4002;
app.listen(process.env.PORT || 4002, () =>
  console.log(`Customer listening 🚪 ${PORT}`)
);


app.use(errorHandler);