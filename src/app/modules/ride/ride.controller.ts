import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { RideService } from './ride.service';
import { AppError } from '../../errorHalpers/AppError';
import { IUser } from './../user/user.interface';

const requestRide = catchAsync(async (req: Request, res: Response) => {
  console.log('Request body:', req.body);
  const rider = (req.user as IUser)._id as string;
  console.log(rider, 'rider id');
  const ride = await RideService.requestRide(req.body, rider);
  sendResponse(res, {
    success: true,
    message: 'Ride requested successfully',
    statusCode: 201,
    data: ride,
  });
});

const cancleRide = catchAsync(async (req: Request, res: Response) => {
  const riderId = (req.user as IUser)._id as string;
  console.log(riderId);
  const result = await RideService.cancelRide(req.params.id);
  sendResponse(res, {
    success: true,
    message: 'Ride cancle successfully',
    statusCode: 200,
    data: result,
  });
});
const getRideById = catchAsync(async (req: Request, res: Response) => {
  const ride = await RideService.getRideById(req.params.id);
  sendResponse(res, {
    success: true,
    message: 'Ride retrieved successfully',
    statusCode: 200,
    data: ride,
  });
});
const updateRideStatus = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body, req.params.id, 'req');
  const updatedRide = await RideService.updateRideStatus(
    req.params.id,
    req.body.status,
  );
  sendResponse(res, {
    success: true,
    message: 'Ride status updated successfully',
    statusCode: 200,
    data: updatedRide,
  });
});

const getRidesByUser = catchAsync(async (req: Request, res: Response) => {
  const rides = await RideService.getRidesByUser(req.params.userId);
  sendResponse(res, {
    success: true,
    message: 'Rides retrieved successfully',
    statusCode: 200,
    data: rides,
  });
});

const getRidesByDriver = catchAsync(async (req: Request, res: Response) => {
  const user = (req.user as IUser)._id as string;
  const rides = await RideService.getRidesByDriver(user,req.query);
  sendResponse(res, {
    success: true,
    message: 'Rides retrieved successfully',
    statusCode: 200,
    data: rides,
  });
});

const getAllRides = catchAsync(async (req: Request, res: Response) => {
  const rides = await RideService.getAllRides(req.query);
  sendResponse(res, {
    success: true,
    message: 'All rides retrieved successfully',
    statusCode: 200,
    data: rides,
  });
});

const acceptByDriver = catchAsync(async (req: Request, res: Response) => {
  const { id: rideId } = req.params;
  const driverId = (req.user as IUser)._id as string; // ✅ get logged-in driver's id from token

  const ride = await RideService.acceptByDriver(rideId, driverId);

  sendResponse(res, {
    success: true,
    message: 'Ride assigned to driver successfully',
    statusCode: 200,
    data: ride,
  });
});
const completeRide = catchAsync(async (req: Request, res: Response) => {
  const ride = await RideService.completeRide(req.params.id);
  sendResponse(res, {
    success: true,
    message: 'Ride completed successfully',
    statusCode: 200,
    data: ride,
  });
});

const getRiderHistory = catchAsync(async (req: Request, res: Response) => {
  const riderId = (req.user as IUser)._id as string;
  console.log(riderId);
  const rides = await RideService.getRiderHistory(riderId,req.query);
  sendResponse(res, {
    success: true,
    message: 'Rider history successfully',
    statusCode: 200,
    data: rides,
  });
});

const getDriverHistory = catchAsync(async (req: Request, res: Response) => {
  const driverId = (req.user as IUser)._id as string;
  const rides = await RideService.getDriverHistory(driverId);
  sendResponse(res, {
    success: true,
    message: 'Driver history successfully',
    statusCode: 200,
    data: rides,
  });
});

const getActiveRideByDriver = catchAsync(async (req: Request, res: Response) => {
  const driverId = (req.user as IUser)._id as string;
  const rides = await RideService.getActiveRide(driverId);
  sendResponse(res, {
    success: true,
    message: 'Driver active ride rectrive successfully',
    statusCode: 200,
    data: rides,
  });
});


const getRideAnalytics = catchAsync(async (req: Request, res: Response) => {
  const rides = await RideService.rideAnalytics();
 res.status(200).json({
  success: true,
  message: "Ride analytics retrieved successfully",
  statusCode: 200,
  data: rides[0] || { monthlyData: [], totalRides: 0 },
});
});


const activeRide = catchAsync(async (req: Request, res: Response) => {
  console.log(req.user,"userrr")
  if(!req.user){
    throw new AppError(404,"Active Ride not Found")
  }
  const rider = (req.user as  IUser)._id as string;
  const rides = await RideService.activeRide(rider);
  sendResponse(res, {
    success: true,
    message: 'active ride rectrive successfully',
    statusCode: 200,
    data: rides,
  });
});

export const RideControllers = {
  requestRide,
  cancleRide,
  getRiderHistory,
  getDriverHistory,
  getRideAnalytics,
  getRideById,
  updateRideStatus,
  getRidesByUser,
  getRidesByDriver,
  getAllRides,
  acceptByDriver,
  getActiveRideByDriver,
  completeRide,
  activeRide
};
