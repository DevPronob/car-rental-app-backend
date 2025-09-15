import { Request, Response } from 'express';
import { AdminServices } from './admin.service';

import httpStatus from 'http-status-codes';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';

const getAllUsers = catchAsync(async (_req: Request, res: Response) => {
  const users = await AdminServices.getAllUsers();
  sendResponse(res, {
    success: true,
    message: 'Users retrieved successfully',
    statusCode: httpStatus.OK,
    data: users,
  });
});

const getAllDrivers = catchAsync(async (_req: Request, res: Response) => {
  const drivers = await AdminServices.getAllDriver();
  sendResponse(res, {
    success: true,
    message: 'Drivers retrieved successfully',
    statusCode: httpStatus.OK,
    data: drivers,
  });
});

const getAllRides = catchAsync(async (_req: Request, res: Response) => {
  const rides = await AdminServices.getAllRides();
  sendResponse(res, {
    success: true,
    message: 'Rides retrieved successfully',
    statusCode: httpStatus.OK,
    data: rides,
  });
});

const approveDriver = catchAsync(async (req: Request, res: Response) => {
  const driver = await AdminServices.approvedDriver(req.params.id);
  sendResponse(res, {
    success: true,
    message: 'Driver approved successfully',
    statusCode: httpStatus.OK,
    data: driver,
  });
});

const suspendDriver = catchAsync(async (req: Request, res: Response) => {
  const driver = await AdminServices.suspandDriver(req.params.id);
  sendResponse(res, {
    success: true,
    message: 'Driver suspended successfully',
    statusCode: httpStatus.OK,
    data: driver,
  });
});

export const AdminController = {
  getAllUsers,
  getAllDrivers,
  getAllRides,
  approveDriver,
  suspendDriver,
};
