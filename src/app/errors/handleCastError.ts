import { TErrorSources } from "../interfaces/error.interface";

export const handleCastError = (error: any) => {
  const errorSources: TErrorSources = [
    {
      path: error?.path || '',
      message: error.message,
    },
  ];
   
  return {
    statusCode: 400,
    message: 'Cast Error',
    errorSources,
  };
};
