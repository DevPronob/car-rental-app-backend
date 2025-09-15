import { JwtPayload } from 'jsonwebtoken';
import { generateToken } from './jwt';
import { envConfig } from '../config';

export const useToken = (payload: JwtPayload) => {
  const userData: JwtPayload = {
    _id: payload._id,
    name: payload.name,
    email: payload.email,
    role: payload.role,
    isBlocked: payload.isBlocked,
  };
  const accessToken = generateToken(
    userData as JwtPayload,
    envConfig.JWT_SECRET as string,
  );
  const refreshToken = generateToken(
    userData as JwtPayload,
    envConfig.JWT_SECRET as string,
  );

  return {
    accessToken,
    refreshToken: refreshToken,
  };
};
