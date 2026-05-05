
import { UserRoutes } from '../modules/User/user.route'
import { CarRoutes } from '../modules/Car/car.route'
import { AuthRoutes } from '../modules/Auth/auth.route'
import { BookingRoutes } from '../modules/Booking/booking.route'
import { Router } from 'express'

export const router = Router()

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/cars",
        route: CarRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/bookings",
        route: BookingRoutes
    }
];

moduleRoutes.forEach((module) => {
    router.use(module.path, module.route)
})