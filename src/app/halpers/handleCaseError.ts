import { CastError } from 'mongoose';

export const handleCastError = (error: CastError) => {
  console.log(error);
  const statusCode = 400;
  const message = 'Invalid MongoDB ObjectID. Please provide a valid id';
  return {
    statusCode,
    message,
  };
};
