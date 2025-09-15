import { Response } from 'express';

export interface TResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
  //   meta?: {
  //     total: number;
  //   };
}

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    statusCode: data.statusCode,
    data: data.data,
    // meta: data.meta,
  });
};
