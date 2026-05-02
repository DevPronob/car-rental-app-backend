import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
export const validateRequest = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const parsedBody = await schema.parseAsync(req.body);

    req.body = parsedBody;
    next();
  };
};
