import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/AppErrror';
import { catchAsync } from '../utils/catchAsync';
import { verifyToken } from '../utils/jwt';
import config from '../config';
import { User } from '../modules/User/user.model';

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }

    if (token.startsWith('Bearer ')) {
      token = token.split(' ')[1];
    }

    let decoded: any;
    try {
      decoded = verifyToken(token, config.jwt_access_secret as string);
    } catch {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid token');
    }

    const userId = decoded._id || decoded.id;

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
    }

    if (user.status !== 'ACTIVE') {
      throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked');
    }

    if (requiredRoles.length && !requiredRoles.includes(user.role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Not authorized');
    }

    req.user = user;
    next();
  });
};

export default auth;