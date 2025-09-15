import { AppError } from '../../errorHalpers/AppError';
import { IAuthProvider, IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import httpStatus from 'http-status-codes';

import bcrypt from 'bcryptjs';
import { generateToken } from '../../utils/jwt';
import { envConfig } from '../../config';

export const registerUser = async (payload: IUser) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "User already exists with this email"
    );
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  // 3. Create auth provider entry
  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: payload.email,
  };

  // 4. Create user in DB
  const user = await User.create({
    ...payload,
    password: hashedPassword,
    auths: [authProvider],
  });

  // 5. Prepare user data for tokens
  const userData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isBlocked: user.isBlocked,
  };

  // 6. Generate tokens
  const accessToken = generateToken(userData, envConfig.JWT_SECRET as string);
  const refreshToken = generateToken(userData, envConfig.JWT_SECRET as string);

  // 7. Return tokens
  return {
    accessToken,
    refreshToken,
  };
};
const loginUser = async (email: string, password: string) => {
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }
  const isPasswordMatch = await bcrypt.compare(password, isUserExist.password);
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }
  if (isUserExist.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are blocked by admin');
  }
  const userData = {
    _id: isUserExist._id,
    name: isUserExist.name,
    email: isUserExist.email,
    role: isUserExist.role,
    isBlocked: isUserExist.isBlocked,
  };
  const accessToken = generateToken(userData, envConfig.JWT_SECRET as string);

  const refreshToken = generateToken(userData, envConfig.JWT_SECRET as string);
  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  registerUser,
  loginUser,
};
