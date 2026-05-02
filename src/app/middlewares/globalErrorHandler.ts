import { NextFunction, Request, Response } from "express";
import { TErrorSources } from "../interfaces/error.interface";
import httpStatus from "http-status-codes";
import config from "../config";
import { handlerDuplicateError } from "../errors/handlerDuplicateError";
import { AppError } from "../errors/AppErrror";
export const globalErrorHandler =async(err:any,req:Request,res:Response,next:NextFunction) =>{
     let statusCode = 500;
  let message = 'Something went wrong!';
  let errorSources:TErrorSources  = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if(err.code ===11000){
    const simplifiedError =await handlerDuplicateError(err)
    statusCode =simplifiedError.statusCode,
    message =simplifiedError.message,
    errorSources =simplifiedError.errorSources
  }
  if(err instanceof AppError){
    statusCode =err.statusCode,
    message =err.message,
    errorSources =[{
        path:"",
        message:err.message
    }]
  }
  if(err instanceof Error){
    statusCode =500,
    message =err.message,
    errorSources =[{
        path:"",
        message:err.message
    }]
  }

  res.status(statusCode).json({ success: false,
    message,
    errorSources,
    err,
    stack: config.node_env === 'development' ? err?.stack : null,})
}