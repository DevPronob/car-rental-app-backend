import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import  httpStatus  from 'http-status-codes';
import { catchAsync } from "../../utils/catchAsync";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const result = await UserServices.registerUserIntoDb(userData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.user;
    const result = await UserServices.getMeFromDb(email);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User profile retrieved successfully",
        data: result,
    });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserServices.updateUserInDb(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User updated successfully",
        data: result,
    });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await UserServices.getAllUsersFromDb(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users retrieved successfully",
        data: result,
    });
});

const getDriverRequests = catchAsync(async (req: Request, res: Response) => {
    const result = await UserServices.getDriverRequestsFromDb();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Driver requests retrieved successfully",
        data: result,
    });
});

export const UserControllers= {
    registerUser,
    getMe,
    updateUser,
    getAllUsers,
    getDriverRequests
}