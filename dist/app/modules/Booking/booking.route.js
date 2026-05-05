"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('user', 'admin'), booking_controller_1.BookingControllers.createBooking);
router.get('/', (0, auth_1.default)('admin'), booking_controller_1.BookingControllers.getAllBookings);
router.get('/my-bookings', (0, auth_1.default)('user', 'admin'), booking_controller_1.BookingControllers.getMyBookings);
router.get('/driver-bookings', (0, auth_1.default)('driver', 'admin'), booking_controller_1.BookingControllers.getDriverBookings);
router.get('/unassigned-bookings', (0, auth_1.default)('driver', 'admin'), booking_controller_1.BookingControllers.getUnassignedBookings);
router.put('/claim/:id', (0, auth_1.default)('driver', 'admin'), booking_controller_1.BookingControllers.claimBooking);
router.put('/:id', (0, auth_1.default)('admin', 'driver'), booking_controller_1.BookingControllers.updateBooking);
router.delete('/:id', (0, auth_1.default)('user', 'admin'), booking_controller_1.BookingControllers.deleteBooking);
exports.BookingRoutes = router;
