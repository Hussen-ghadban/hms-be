// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import roomtypeRoutes from './features/roomType/roomtype.routes';
import roomRoutes from './features/room/room.routes'
import ratePlanRouter from './features/ratePlan/ratePlan.routes';
import exchangeRouter from './features/exchange/exchange.routes';
import amenityRouter from './features/amenity/amenity.routes';
import reservationRouter from './features/reservation/reservation.routes';
import { errorHandler } from "./middleware/errorHandler";
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors({
  allowedHeaders: ['*'],
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use("/roomtype", roomtypeRoutes)
app.use("/room", roomRoutes)
app.use("/ratePlan", ratePlanRouter);
app.use("/exchange", exchangeRouter);
app.use("/amenity",amenityRouter)
app.use("/reservation",reservationRouter)



const PORT = process.env.PORT || 4001;
app.listen(process.env.PORT || 4001, () =>
  console.log(`Front Desk listening 🚪 ${PORT}`)
);
app.use(errorHandler);