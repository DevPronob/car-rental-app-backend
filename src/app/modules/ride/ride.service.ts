/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppError } from '../../errorHalpers/AppError';
import { IRide } from './ride.interface';
import httpStatus from 'http-status-codes';
import { Ride } from './ride.model';
import { User } from '../user/user.model';
import { calculateDistance, calculateFare } from '../../utils/calculateFare';
import { Driver } from '../driver/driver.model';
import { Types } from 'mongoose';

const requestRide = async (payload: Partial<IRide>, rider: string) => {
  console.log(payload.destinationLocation,rider, 'payload in service');
  const isRiderExist = await User.findOne({ _id: rider, role: 'RIDER' });
  console.log(rider, payload);
  if (!isRiderExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Rider does not exist');
  }

  if (isRiderExist.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'Driver or Rider is blocked');
  }
if (
  payload.destinationLocation?.lat === undefined ||
  payload.destinationLocation?.lng === undefined
) {
  throw new AppError(
    httpStatus.BAD_GATEWAY,
    "Please Insert Your Destination"
  );
}

if (
  payload.pickupLocation?.lat === undefined ||
  payload.pickupLocation?.lng === undefined
) {
  throw new AppError(
    httpStatus.BAD_GATEWAY,
    "Please Insert Your Pickup Location"
  );
}

  const distance = calculateDistance(
    payload.pickupLocation?.lat,
    payload.pickupLocation.lng,
    payload.destinationLocation.lat,
    payload.destinationLocation.lng,
  );

  const estimatedFare = calculateFare(distance);
  console.log('Requesting ride with payload:', estimatedFare,"here");
  const data = {
    ...payload,
    rider: rider,
    fare: estimatedFare,
  };
  const ride = await Ride.create(data);
  return ride;
};

const cancelRide = async (rideId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new AppError(404, 'Ride not found');

  if (ride.status !== 'requested') {
    throw new AppError(400, 'You can only cancel before acceptance');
  }

  const now = new Date();
  const diff =
    (now.getTime() - (ride.createdAt as any)!.getTime()) / (1000 * 60);
  if (diff > 5) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Cancel time window expired');
  }
  ride.status = 'cancelled';
  ride.canceledAt = new Date();
  await ride.save();
  return ride;
};

const updateRideStatus = async (rideId: string, newStatus: any) => {
  console.log(newStatus);
  const ride = await Ride.findById(rideId);
  if (!ride) throw new AppError(404, 'Ride not found');

  if (ride.status === 'completed') {
    throw new AppError(400, 'Ride is already completed');
  }

  ride.status = newStatus;
  //  "requested",
  //       "accepted",
  //       "picked_up",
  //       "in_transit",
  //       "completed",
  //       "cancelled",

  if (newStatus === 'picked_up') {
    ride.pickedUpAt = new Date();
  }

  if (newStatus === 'completed') {
    ride.completedAt = new Date();
    console.log(ride);

    if (ride.driver) {
      console.log(ride, 'ride');
      const driver = await Driver.findOne({ user: ride.driver });
      if (!driver) throw new AppError(404, 'Driver not found');

      driver.earnings += ride.fare || 0;
      await driver.save();
    }
  }

  await ride.save();
  return ride;
};

const getRideById = async (rideId: string) => {
  return Ride.findById(rideId).populate('rider').populate('driver');
};

const getRidesByUser = async (userId: string) => {
  return Ride.find({ rider: userId })
    .sort({ requestedAt: -1 })
    .populate('rider')
    .populate('driver');
};

const getRidesByDriver = async (driverId: string,query:Record<string,any>) => {
   const {
      status,
      riderId,
      search,
      startDate,
      endDate,
      page = 1,
      limit = 20,
    } = query;
    console.log(query,"query");

    const filter: any = {};

  
    if (status) filter.status = status;

    // Filter by driver/rider
    if (riderId) filter.rider = riderId;

    // Search pickup or destination
    if (search) {
      filter.$or = [
        { "pickupLocation.address": { $regex: search, $options: "i" } },
        { "destinationLocation.address": { $regex: search, $options: "i" } },
      ];
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const skip = (Number(page) - 1) * Number(limit);

    // Fetch rides
    const rides = await Ride.find({...filter,driver:driverId})
      .populate("rider", "name email")
      .populate("driver", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Ride.countDocuments(filter);

    return { rides, total, page: Number(page), limit: Number(limit) };
};

const getAllRides = async (query:Record<string,any>) => {
    const {
      status,
      driverId,
      riderId,
      search,
      startDate,
      endDate,
      page = 1,
      limit = 20,
    } = query;
    console.log(query,"query");

    const filter: any = {};

  
    if (status) filter.status = status;

    // Filter by driver/rider
    if (driverId) filter.driver = driverId;
    if (riderId) filter.rider = riderId;

    // Search pickup or destination
    if (search) {
      filter.$or = [
        { "pickupLocation.address": { $regex: search, $options: "i" } },
        { "destinationLocation.address": { $regex: search, $options: "i" } },
      ];
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const skip = (Number(page) - 1) * Number(limit);

    // Fetch rides
    const rides = await Ride.find(filter)
      .populate("rider", "name email")
      .populate("driver", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Ride.countDocuments(filter);

    return { rides, total, page: Number(page), limit: Number(limit) };
};

const acceptByDriver = async (rideId: string, driverId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, 'Ride not found');
  }

  const driver =await Driver.findById(driverId)
  if(driver?.isOnline === false){
    throw new AppError(httpStatus.NOT_FOUND, 'Cant Assign You Are Offline');
  }
  const isDriverOnRide = await Ride.findOne({
    driver: driverId
  })

  if(isDriverOnRide?.status !=="completed" && isDriverOnRide?.status !=="cancelled" && isDriverOnRide){ 
    throw new AppError(httpStatus.BAD_REQUEST, 'You are already on a ride');
  }

    ride.status = 'accepted';
  ride.driver = new Types.ObjectId(driverId); 
  ride.requestedAt = new Date();

  await ride.save();
  return ride;
};

const completeRide = async (rideId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, 'Ride not found');
  }

  ride.status = 'completed';
  ride.fare = ride.fare || 0;
  ride.completedAt = new Date();
  await ride.save();

  return ride;
};

const getRiderHistory = async (riderId: string,query:Record<string,any>) => {
 const {status,startDate,
      endDate,
      page = 1,
      limit = 20,} =query
 const filter:any ={}
 if(status){
  filter.status =status
 }
if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const skip = (Number(page) - 1) * Number(limit);

  const riderHistory = await Ride.find({ rider: riderId }).skip(skip).populate("rider").populate("rider")
  console.log(riderHistory);
  return riderHistory;
};

const getDriverHistory = async (driverId: string) => {
  return await Ride.find({ driver: driverId }).sort({ createdAt: -1 });
};
const getActiveRide =async(driverId:string) =>{
  const activeRide =await Ride.findOne({ driver: driverId,status: { $nin: ["completed", "canceled"] }}).populate("rider", "name email")
      .populate("driver", "name email")
  return activeRide
}


const rideAnalytics = async () => {
  const rideByMonth = await Ride.aggregate([
    { $match: { status: "accepted" } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        monthlyRides: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
    {
      $group: {
        _id: null,
        monthlyData: {
          $push: {
            year: "$_id.year",
            month: "$_id.month",
            monthlyRides: "$monthlyRides",
          },
        },
        totalRides: { $sum: "$monthlyRides" },
      },
    },
    {
      $project: {
        _id: 0,
        monthlyData: 1,
        totalRides: 1,
      },
    },
  ]);
  return rideByMonth;
};


const activeRide =async(rider:string) =>{
  console.log(rider,"riderrr")
 const activeRide =await Ride.findOne({ rider: rider,status: { $nin: ["completed", "canceled"] }})
     console.log(activeRide,"activeRide")
  return activeRide
}

export const RideService = {
  requestRide,
  cancelRide,
  getRiderHistory,
  getDriverHistory,
  updateRideStatus,
  getRideById,
  getRidesByUser,
  getRidesByDriver,
  getAllRides,
  acceptByDriver,
  completeRide,
  getActiveRide,
  rideAnalytics,
  activeRide
};
