import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { router } from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandaler';
import { notFound } from './app/utils/notFound';
import dotenv from 'dotenv';
import passport from 'passport';
import expressSession from 'express-session';
import './app/config/passport';
import http from 'http';
import { Server, Socket } from 'socket.io';

dotenv.config();
const app = express();

app.use(express.json());

export const serverApp = http.createServer(app);
export const io = new Server(serverApp, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  },
});

io.on("connection", (socket: Socket) => {
  console.log(socket.id, "connected");

  // Join a ride room
  socket.on("joinRoom", (rideId: string) => {
    console.log(`Socket ${socket.id} joined ride room: ${rideId}`);
    socket.join(rideId);
  });

  // Driver sends live location → broadcast to riders in that room
  socket.on("sendDriverLocation", (rideId: string, location: { lat: number; lng: number }) => {
    console.log("Driver location update:", location);
    io.to(rideId).emit("driverLocationUpdate", location);
  });

  // End ride → notify riders
  socket.on("endRide", (rideId: string) => {
    console.log(`Ride ${rideId} ended`);
    io.to(rideId).emit("rideEnded", { message: "Ride has ended" });
    socket.leave(rideId);
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

app.use(expressSession({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("all ok");
});

app.use("/api/v1", router);
app.use(globalErrorHandler);
app.use(notFound);


export default app;
