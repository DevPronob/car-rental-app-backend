import { AppError } from '../../errorHalpers/AppError';
import { Driver } from '../driver/driver.model';
import { Ride } from '../ride/ride.model';
import { User } from '../user/user.model';
import httpStatus from 'http-status-codes';

const getAllUsers = async () => {
  const users = await User.find({});
  return users;
};

const getAllRides = async () => {
  const rides = await Ride.find({});
  return rides;
};

const getAllDriver = async () => {
  const driver = await Driver.find({});
  return driver;
};

const approvedDriver = async (id: string) => {
  const driver = await Driver.findById(id);
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, 'Driver not found');
  }
  const updatedDriver = await Driver.findByIdAndUpdate(
    id,
    { approved: true },
    { new: true },
  );

  return updatedDriver;
};

const suspandDriver = async (id: string) => {
  const driver = await Driver.findById(id);
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, 'Driver not found');
  }
  const updatedDriver = await Driver.findByIdAndUpdate(
    id,
    { approved: false },
    { new: true },
  );
  return updatedDriver;
};

export const AdminServices = {
  getAllUsers,
  getAllRides,
  getAllDriver,
  approvedDriver,
  suspandDriver,
};
