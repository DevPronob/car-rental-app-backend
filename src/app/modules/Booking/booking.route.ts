import express from 'express';
import auth from '../../middlewares/auth';
import { BookingControllers } from './booking.controller';

const router = express.Router();

router.post('/', auth('user', 'admin'), BookingControllers.createBooking);
router.get('/', auth('admin'), BookingControllers.getAllBookings);
router.get('/my-bookings', auth('user', 'admin'), BookingControllers.getMyBookings);
router.get('/driver-bookings', auth('driver', 'admin'), BookingControllers.getDriverBookings);
router.get('/unassigned-bookings', auth('driver', 'admin'), BookingControllers.getUnassignedBookings);
router.put('/claim/:id', auth('driver', 'admin'), BookingControllers.claimBooking);
router.put('/:id', auth('admin', 'driver'), BookingControllers.updateBooking);
router.delete('/:id', auth('user', 'admin'), BookingControllers.deleteBooking);

export const BookingRoutes = router;
