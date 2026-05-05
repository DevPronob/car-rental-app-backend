"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const user_route_1 = require("../modules/User/user.route");
const car_route_1 = require("../modules/Car/car.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const booking_route_1 = require("../modules/Booking/booking.route");
const express_1 = require("express");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.UserRoutes
    },
    {
        path: "/cars",
        route: car_route_1.CarRoutes
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes
    },
    {
        path: "/bookings",
        route: booking_route_1.BookingRoutes
    }
];
moduleRoutes.forEach((module) => {
    exports.router.use(module.path, module.route);
});
