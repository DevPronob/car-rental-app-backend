/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import { setAuthCookie } from '../../utils/setCookie';
import passport from 'passport';
import { AppError } from '../../errorHalpers/AppError';
import { useToken } from '../../utils/useToken';
import { IUser } from '../user/user.interface';
import httpStatus from 'http-status-codes'
import { envConfig } from '../../config';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const user = await AuthServices.registerUser(req.body);
  if (user) {
    setAuthCookie(res, user);
  }
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: 201,
    data: user,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response,next:NextFunction) => {
  passport.authenticate("local",async(error:any,user:IUser,info:any) =>{
     if (error) {

            // ❌❌❌❌❌
            // throw new AppError(401, "Some error")
            // next(err)
            // return new AppError(401, err)


            // ✅✅✅✅
            // return next(err)
            // console.log("from err");
            return next(new AppError(401, error))
        }
        if(!user){
          return next(new AppError(404,info.message))
        }

        const userToken =await useToken(user)
        setAuthCookie(res,userToken)
        const {password,...rest} =user

        sendResponse(res,{
          success: true,
    message: 'User login successfully',
    statusCode: 200,
    data: rest,
        })
  })(req, res, next)
});
const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
  });
   res.clearCookie('accessToken', {
    httpOnly: true,
    secure: true,
  });
  sendResponse(res, {
    success: true,
    message: 'User logged out successfully',
    statusCode: 200,
    data: null,
  });
})


const googleCallback =catchAsync(async (req:Request,res:Response) =>{
     let redirectTo = req.query.state ? req.query.state as string : ""

    if (redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1)
    }

    // /booking => booking , => "/" => ""
    const user = req.user;

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User Not Found")
    }

    const tokenInfo = useToken(user)

    setAuthCookie(res, tokenInfo)

    // sendResponse(res, {
    //     success: true,
    //     statusCode: httpStatus.OK,
    //     message: "Password Changed Successfully",
    //     data: null,
    // })

    res.redirect(`http://localhost:5173/${redirectTo}`);
})

export const AuthControllers = {
  registerUser,
  loginUser,
  logout,
  googleCallback
};
