/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppError } from '../../errorHalpers/AppError';
import { Ride } from '../ride/ride.model';
import { Role } from '../user/user.constant';
import { User } from '../user/user.model';
import { IDriver } from './driver.interface';
import { Driver } from './driver.model';
import httpStatus from 'http-status-codes';

import { Types } from 'mongoose';

export const createDriver = async (payload: IDriver, rider: string) => {
  const data = {
    ...payload,
    user: rider,
  };
  const driver = await Driver.create(data);
  await User.findByIdAndUpdate(rider, { role: 'DRIVER' }, { new: true });
  return driver;
};

export const rejectRequest = async (payload: IDriver) => {
  const isDriverExist = await User.findOne({ _id: payload.user });
  if (!isDriverExist || isDriverExist.role !== Role.DRIVER) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Driver does not exist');
  }
  if (isDriverExist.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'Driver is blocked');
  }
  const driver = await Driver.create(payload);
  return driver;
};

const updateDriverStatus = async (id: string, status: string) => {
  const driver = await Driver.findById(id);
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, 'Driver not found');
  }
  const updatedDriver = await Driver.findByIdAndUpdate(
    id,
    { status: status },
    { new: true },
  );
  return updatedDriver;
};

const getDriverById = async (id: string) => {
  console.log(id, 'id in service');
  const driver = await Driver.findOne({user:id}).populate('user')
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, 'Driver not found');
  }
  return driver;
};

const getAllDrivers = async () => {
  const drivers = await Driver.find({}).populate("user","-password");
  return drivers;
};
const approveDriver = async (id: string) => {
  console.log(id, 'id in service');
  
  const driver = await Driver.findById(id);
  if (!driver) {
    throw new AppError(404, 'Driver not found');
  }
  driver.approved = true;
  driver.suspended = false;
  await driver.save();
  return driver;
};
const suspendDriver = async (id: string) => {
  const driver = await Driver.findById(id);
  if (!driver) {
    throw new AppError(404, 'Driver not found');
  }
  driver.suspended = true;
  driver.isOnline = false;
  await driver.save();
  return driver;
};

const getEarning = async (id: string) => {


  const objectId = new Types.ObjectId(id);

  // Aggregate earnings grouped by month
  const earningsByMonth = await Ride.aggregate([
    { $match: { driver: objectId, status: "completed" } }, // only completed rides
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        monthlyEarnings: { $sum: "$fare" }, // adjust field if you store differently
        totalRides: { $sum: 1 },
      },
    },
    {
      $project: {
        year: "$_id.year",
        month: "$_id.month",
        monthlyEarnings: 1,
        totalRides: 1,
        _id: 0,
      },
    },
    { $sort: { year: 1, month: 1 } },
  ]);

  // Calculate total earnings
  const totalEarnings = earningsByMonth.reduce(
    (sum, item) => sum + item.monthlyEarnings,
    0
  );

  return {
    totalEarnings,
    earningsByMonth,
  };
};
const updateAvivility =async(id:string) =>{
 const driverData = await Driver.findOne({ user: id });

  if (!driverData) {
    throw new AppError(404, "Driver not found");
  }

  const updatedDriver = await Driver.findOneAndUpdate(
    { user: id },
    { isOnline: !driverData.isOnline },
    { new: true }
  );

  if (!updatedDriver) {
    throw new AppError(404, "Driver not found");
  }

  return updatedDriver;
}

const updateDriver = async (
  userId: string,
  payload: Partial<{
    name: string;
    email: string;
    phone: string;
    plate: string;
    model: string;
    color: string;
    capacity: number;
  }>
) => {
  console.log(payload, "payload");

  // Find driver by userId
  const driver = await Driver.findOne({ user: userId });
  if (!driver) {
    throw new AppError(404, "Driver not found");
  }
  console.log(driver,"driver")

  const userData: any = {};
  const driverData: any = {};
  console.log(userData,"userData")
  console.log(driverData,"driverData")

  // Map payload fields
  if (payload.name?.trim()) userData.name = payload.name;
  if (payload.email?.trim()) userData.email = payload.email;
  if (payload.phone?.trim()) userData.phone = payload.phone;

  if (payload.plate?.trim()) driverData.plate = payload.plate;
  if (payload.model?.trim()) driverData.model = payload.model;
  if (payload.color?.trim()) driverData.color = payload.color;
  if (payload.capacity !== undefined && payload.capacity !== null)
    driverData.capacity = payload.capacity;

  // Update User
  if (Object.keys(userData).length > 0) {
    await User.findByIdAndUpdate(driver.user, userData, {
      new: true,
      runValidators: true,
    });
  }

  // Update Driver
  let updatedDriver:any = driver;
  if (Object.keys(driverData).length > 0) {
    updatedDriver = await Driver.findOneAndUpdate({ user: userId }, {vehicleInfo:driverData}, {
      new: true,
      runValidators: true,
    }).populate("user", "-password");
  }

  return updatedDriver;
};

export const DriverService = {
  createDriver,
  approveDriver,
  suspendDriver,
  updateDriverStatus,
  updateDriver,
  getDriverById,
  getAllDrivers,
  getEarning,
  updateAvivility
};
