/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppError } from '../../errorHalpers/AppError';
import { IUser } from './user.interface';
import { User } from './user.model';
import httpStatus from 'http-status-codes';
import bcrypt from 'bcryptjs';

const getUserById = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};
const getAllUsers = async () => {
  const users = await User.find({});
  return users;
};

const updateUser = async (id: string, payload: IUser) => {
  const user = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return user;
};
const deleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return null;
};

const blockUser = async (userId: string) => {
  const blockedUser = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true },
  );
  return blockedUser;
};

const unBlockUser = async (userId: string) => {
  const blockedUser = await User.findByIdAndUpdate(
    userId,
    { isBlocked: false },
    { new: true },
  );
  return blockedUser;
};

const getMe = async (id: string) => {
  console.log(id,"id")
  const user = await User.findOne({ _id: id });
  console.log(user,"user")
  return user;
};
const updateProfile =async(id:string,payload:IUser) =>{
  console.log(payload,"payload")
  const updatedData:Partial<{name:string,phone:string,password:string}> ={}
  if(payload.name && payload.name.trim() !==""){
    updatedData.name =payload.name
  }
  if(payload.phone && payload.phone.trim() !==""){
    updatedData.phone =payload.phone
  }
  if(payload.password && payload.password.trim() !==""){
    const hashPassword =await  bcrypt.hash(payload.password,10)
    updatedData.password =hashPassword as string
  }
  const updatedProfile = await User.findByIdAndUpdate(id,updatedData,{new:true})
  return updatedProfile
}
const adminUpdateProfile =async(id:string,payload:IUser) =>{
  console.log(payload,"payload")
  const updatedData:Partial<{name:string,phone:string,password:string}> ={}
  if(payload.name && payload.name.trim() !==""){
    updatedData.name =payload.name
  }
  if(payload.phone && payload.phone.trim() !==""){
    updatedData.phone =payload.phone
  }
  if(payload.password && payload.password.trim() !==""){
    const hashPassword =await  bcrypt.hash(payload.password,10)
    updatedData.password =hashPassword as string
  }
  const updatedProfile = await User.findByIdAndUpdate(id,updatedData,{new:true})
  return updatedProfile
}
export const UserServices = {
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  blockUser,
  unBlockUser,
  updateProfile,
  getMe,
  adminUpdateProfile
};
