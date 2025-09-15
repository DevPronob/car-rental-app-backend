"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("./app/routes");
const globalErrorHandaler_1 = __importDefault(require("./app/middlewares/globalErrorHandaler"));
const notFound_1 = require("./app/utils/notFound");
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
require("./app/config/passport");
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    },
});
exports.io.on("connection", (socket) => {
    console.log(socket.id, "connected");
    socket.on("joiedRoom", (rideId) => {
        socket.join(rideId);
    });
    socket.on("sendDriverLocation", (rideId, location) => {
        exports.io.to(rideId).emit("driverLocationUpdate", location);
    });
    socket.on("endRide", (rideId) => {
        exports.io.to(rideId).emit("rideEnded", { message: "Ride has ended" });
        socket.leave(rideId);
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});
app.use((0, express_session_1.default)({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("all ok");
});
app.use("/api/v1", routes_1.router);
app.use(globalErrorHandaler_1.default);
app.use(notFound_1.notFound);
exports.default = app;
