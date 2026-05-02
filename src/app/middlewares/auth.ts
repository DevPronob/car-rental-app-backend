import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { AppError } from '../errors/AppErrror';
import { catchAsync } from '../utils/catchAsync';
import { verifyToken } from '../utils/jwt';
import config from '../config';
import { User } from '../modules/User/user.model';

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // Handle Bearer prefix if present
    if (token.startsWith('Bearer ')) {
      token = token.split(' ')[1];
    }

    // checking if the given token is valid
    let decoded;
    try {
      decoded = verifyToken(
        token,
        config.jwt_access_secret as string,
      ) as any;
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
    }

    const { role, email, _id, id } = decoded;

    // checking if the user exists
    const user = await User.findOne({
      $or: [
        { _id: _id || id },
        { email: { $regex: new RegExp(`^${email}$`, 'i') } }
      ]
    });

    if (!user) {
      throw new AppError(
        httpStatus.NOT_FOUND, 
        `User session invalid. Please log in again. (Ref: ${email || _id || id})`
      );
    }
    
    if (user.status !== 'ACTIVE') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    console.log('Auth Check:', { requiredRoles, userRole: user.role, email: user.email });

    if (requiredRoles && !requiredRoles.includes(user.role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        `You are not authorized! Required: ${requiredRoles}, Current: ${user.role}`,
      );
    }

    req.user = user;
    next();
  });
};

export default auth;
