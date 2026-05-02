import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "../User/user.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.loginUser(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        data: result,
    });
});

const signUpUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserServices.registerUserIntoDb(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User registered successfully",
        data: result,
    });
});

const signUpDriver = catchAsync(async (req: Request, res: Response) => {
    const userData = {
        ...req.body,
        status: 'PENDING',
        isDriverRequested: true,
        role: 'user'
    };
    const result = await UserServices.registerUserIntoDb(userData);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Driver application submitted successfully",
        data: result,
    });
});

export const AuthControllers = {
    loginUser,
    signUpUser,
    signUpDriver
}
