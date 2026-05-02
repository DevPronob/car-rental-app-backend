import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
    const result = await BookingServices.createBookingInDb(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Booking created successfully',
        data: result,
    });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
    const result = await BookingServices.getAllBookingsFromDb(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bookings retrieved successfully',
        data: result,
    });
});

const getMyBookings = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.user;
    const result = await BookingServices.getMyBookingsFromDb(email);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'My Bookings retrieved successfully',
        data: result,
    });
});

const getDriverBookings = catchAsync(async (req: Request, res: Response) => {
    const { _id } = req.user;
    const result = await BookingServices.getDriverBookingsFromDb(_id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Driver Bookings retrieved successfully',
        data: result,
    });
});

const getUnassignedBookings = catchAsync(async (req: Request, res: Response) => {
    const result = await BookingServices.getUnassignedBookingsFromDb();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Unassigned Bookings retrieved successfully',
        data: result,
    });
});

const claimBooking = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { _id } = req.user;
    const result = await BookingServices.claimBookingInDb(id, _id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking claimed successfully',
        data: result,
    });
});

const updateBooking = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookingServices.updateBookingInDb(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking updated successfully',
        data: result,
    });
});

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await BookingServices.deleteBookingFromDb(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking cancelled successfully',
        data: null,
    });
});

export const BookingControllers = {
    createBooking,
    getAllBookings,
    getMyBookings,
    getDriverBookings,
    getUnassignedBookings,
    claimBooking,
    updateBooking,
    deleteBooking,
};
