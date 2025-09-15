import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { IUser } from "./user.interface";

const getAllUsers = catchAsync(async (_req: Request, res: Response) => {
  const users = await UserServices.getAllUsers();
  sendResponse(res, {
    success: true,
    message: "Users retrieved successfully",
    statusCode: httpStatus.OK,
    data: users,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getUserById(req.params.id);
  sendResponse(res, {
    success: true,
    message: "User retrieved successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const user = await UserServices.updateUser(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    message: "User updated successfully",
    statusCode: httpStatus.OK,
    data: user,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  await UserServices.deleteUser(req.params.id);
  sendResponse(res, {
    success: true,
    message: "User deleted successfully",
    statusCode: httpStatus.NO_CONTENT,
    data: null,
  });
});

const blockUser = catchAsync(async (req: Request, res: Response) => {
  const blocked = await UserServices.blockUser(req.params.id);
  sendResponse(res, {
    success: true,
    message: "User blocked successfully",
    statusCode: httpStatus.OK,
    data: blocked,
  });
});

const unBlockUser = catchAsync(async (req: Request, res: Response) => {
  const unblocked = await UserServices.unBlockUser(req.params.id);
  sendResponse(res, {
    success: true,
    message: "User unblocked successfully",
    statusCode: httpStatus.OK,
    data: unblocked,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id as string;
  console.log(userId,"userId")
  const user = await UserServices.getMe(userId);
  sendResponse(res, {
    success: true,
    message: "User retrieved successfully",
    statusCode: httpStatus.OK,
    data: user,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id as string;
  const user = await UserServices.updateProfile(userId, req.body);
  sendResponse(res, {
    success: true,
    message: "User profile updated successfully",
    statusCode: httpStatus.OK,
    data: user,
  });
});

const adminUpdateProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id as string;
  const user = await UserServices.adminUpdateProfile(userId, req.body);
  sendResponse(res, {
    success: true,
    message: "Admin profile updated successfully",
    statusCode: httpStatus.OK,
    data: user,
  });
});

export const UserControllers = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  blockUser,
  unBlockUser,
  getMe,
  updateProfile,
  adminUpdateProfile,
};
