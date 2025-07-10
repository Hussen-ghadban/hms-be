// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import payoutRoutes from './features/payout/payout.routes';
import { errorHandler } from "./middleware/errorHandler";
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors({
  allowedHeaders: ['*'],
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use("/payout", payoutRoutes)

const PORT = process.env.PORT || 4003;
app.listen(process.env.PORT || 4003, () =>
  console.log(`Front Desk listening 🚪 ${PORT}`)
);
app.use(errorHandler);