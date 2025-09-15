import { NextFunction, Request, Response } from 'express';
import { ZodObject } from 'zod';

export const validateRequest = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse(req.body);
      req.body = result;
      next();
    } catch (error) {
      next(error);
    }
  };
};
