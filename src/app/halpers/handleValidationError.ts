/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TErrrorSourses } from '../interfaces/error';

export const handleValidationError = (
  error: mongoose.Error.ValidationError,
) => {
  const errorSourses: TErrrorSourses[] = [];
  const errors = Object.values(error.errors);
  errors.forEach((errorObject: any) =>
    errorSourses.push({
      path: errorObject.path,
      message: errorObject.message,
    }),
  );
  return {
    statusCode: 400,
    message: 'Validation Error',
    errorSourses,
  };
};
