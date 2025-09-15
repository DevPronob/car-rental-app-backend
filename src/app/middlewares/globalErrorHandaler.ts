/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errorHalpers/AppError';
import { handleCastError } from '../halpers/handleCaseError';
import { handleDuplicateError } from '../halpers/handleDuplicateError';
import { handleValidationError } from '../halpers/handleValidationError';
import { envConfig } from '../config';
import { handleZodError } from '../halpers/handleZodError';
import { TErrrorSourses } from '../interfaces/error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler = (err: any, req: Request, res: Response,next:NextFunction) => {
  // if (envConfig.NODE_ENV === 'development') {
  //   console.log('🔥 Global Error Caught:', err);
  // }

  let statusCode = 500;
  let message = 'Something went wrong';
  let errorSources: TErrrorSourses[] = [];

  if (err.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  } else if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSource;
  } else if (err.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSourses;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error: envConfig.NODE_ENV === 'development' ? err : undefined,
    stack: envConfig.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default globalErrorHandler;
