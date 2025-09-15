import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errorHalpers/AppError';
import { verifyToken } from '../utils/jwt';
import { envConfig } from '../config';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../modules/user/user.model';
import httpStatus from 'http-status-codes';

export const auth = (authRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies, 'cookies from middleware');
    try {
      // Ensure cookies are parsed using cookie-parser middleware
      const token = req.cookies?.accessToken;
      console.log(token, 'token from middleware');

      if (!token) {
        throw new AppError(401, 'You do not have a token to access this route');
      }

      const verifiedToken = verifyToken(token, envConfig.JWT_SECRET) as JwtPayload;

      if (!verifiedToken?.email) {
        throw new AppError(401, 'Token is invalid or missing email');
      }

      if (verifiedToken.isBlocked) {
        throw new AppError(403, 'User is blocked');
      }

      const user = await User.findOne({ email: verifiedToken.email });
      if (!user) {
        throw new AppError(404, 'User does not exist');
      }

      if (user.isBlocked) {
        return res.status(403).json({
          status: 'error',
          message: 'User is blocked',
        });
      }

      if (!authRoles.includes(user.role as unknown as string)) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          'You are not allowed to access this route'
        );
      }

      req.user = user;
      next();
    } catch (error) {
      console.log('jwt error', error);
      next(error);
    }
  };
};
