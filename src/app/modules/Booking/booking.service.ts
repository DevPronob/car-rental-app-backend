import { IBooking } from './booking.interface';
import { Booking } from './booking.model';
import { Car } from '../Car/car.model';
import { AppError } from '../../errors/AppErrror';
import httpStatus from 'http-status-codes';

const createBookingInDb = async (payload: IBooking) => {
    const car = await Car.findById(payload.car);
    if (!car) {
        throw new AppError(httpStatus.NOT_FOUND, 'Car not found');
    }

    if (car.status !== 'available') {
        throw new AppError(httpStatus.BAD_REQUEST, 'Car is not available for booking');
    }

    // Create booking
    const result = await Booking.create(payload);

    // Update car status to unavailable (optional, depending on business logic)
    // await Car.findByIdAndUpdate(payload.car, { status: 'unavailable' });

    return result;
};

const getAllBookingsFromDb = async (query: Record<string, any>) => {
    const result = await Booking.find(query).populate('car');
    return result;
};

const getMyBookingsFromDb = async (email: string) => {
    const result = await Booking.find({ email }).populate('car');
    return result;
};

const getDriverBookingsFromDb = async (driverId: string) => {
    const result = await Booking.find({ driver: driverId }).populate('car').populate('driver');
    return result;
};

const getUnassignedBookingsFromDb = async () => {
    const result = await Booking.find({ 
        driver: null, 
        status: { $in: ['pending', 'confirmed'] } 
    }).populate('car');
    return result;
};

const claimBookingInDb = async (bookingId: string, driverId: string) => {
    const result = await Booking.findByIdAndUpdate(
        bookingId,
        { driver: driverId },
        { new: true }
    );
    return result;
};

const updateBookingInDb = async (id: string, payload: Partial<IBooking>) => {
    const result = await Booking.findByIdAndUpdate(id, payload, { new: true });
    return result;
};

const deleteBookingFromDb = async (id: string) => {
    const result = await Booking.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );
    return result;
};

export const BookingServices = {
    createBookingInDb,
    getAllBookingsFromDb,
    getMyBookingsFromDb,
    getDriverBookingsFromDb,
    getUnassignedBookingsFromDb,
    claimBookingInDb,
    updateBookingInDb,
    deleteBookingFromDb,
};
