// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import roomtypeRoutes from './features/roomType/roomtype.routes';
import roomRoutes from './features/room/room.routes'
import guestRouter from './features/guest/guest.routes';
import ratePlanRouter from './features/ratePlan/ratePlan.routes';
import exchangeRouter from './features/exchange/exchange.routes';
import amenityRouter from './features/amenity/amenity.routes';

const app = express();
app.use(express.json());
app.use("/roomtype", roomtypeRoutes)
app.use("/room", roomRoutes)
app.use("/guest", guestRouter);
app.use("/ratePlan", ratePlanRouter);
app.use("/exchange", exchangeRouter);
app.use("/amenity",amenityRouter)


const PORT = process.env.PORT || 4001;
app.listen(process.env.PORT || 4001, () =>
  console.log(`Front Desk listening 🚪 ${PORT}`)
);
