import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { CarServices } from './car.service';
import httpStatus from 'http-status-codes';

const createCar = catchAsync(async (req: Request, res: Response) => {
    const result = await CarServices.createCarIntoDb(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Car created successfully',
        data: result,
    });
});

const getAllCars = catchAsync(async (req: Request, res: Response) => {
    const result = await CarServices.getAllCarsFromDb(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cars retrieved successfully',
        data: result,
    });
});

const getSingleCar = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CarServices.getSingleCarFromDb(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Car retrieved successfully',
        data: result,
    });
});

const updateCar = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CarServices.updateCarInDb(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Car updated successfully',
        data: result,
    });
});

const deleteCar = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CarServices.deleteCarFromDb(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Car deleted successfully',
        data: result,
    });
});

const returnCar = catchAsync(async (req: Request, res: Response) => {
    const { bookingId, endTime } = req.body;
    const result = await CarServices.returnCarInDb(bookingId, endTime);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Car returned successfully',
        data: result,
    });
});

export const CarControllers = {
    createCar,
    getAllCars,
    getSingleCar,
    updateCar,
    deleteCar,
    returnCar
};
