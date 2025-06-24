// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import guestRouter from './features/guest/guest.routes';


const app = express();
app.use(express.json());

app.use("/guest", guestRouter);



const PORT = process.env.PORT || 4002;
app.listen(process.env.PORT || 4002, () =>
  console.log(`Customer listening 🚪 ${PORT}`)
);
