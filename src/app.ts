import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { router } from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandaler";
import { notFound } from "./app/utils/notFound";
import dotenv from "dotenv";
import passport from "passport";
import expressSession from "express-session";
import "./app/config/passport";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();

app.use(express.json());

// ✅ CORS FIRST
app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "https://rent-sharing-system.vercel.app", 
    ],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(
  expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", 
      sameSite: "none", 
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("all ok");
});

app.use("/api/v1", router);
app.use(globalErrorHandler);
app.use(notFound);


export const serverApp = http.createServer(app);
export const io = new Server(serverApp, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://rent-sharing-system.vercel.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});
