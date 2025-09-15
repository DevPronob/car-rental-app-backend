import { Types } from 'mongoose';
import { Role } from './user.constant';
export type RoleType = (typeof Role)[keyof typeof Role];

export interface IAuthProvider {
  provider: 'google' | 'credentials'; 
  providerId: string;
}
export interface IUser {
  _id?: Types.ObjectId | string;
  name: string;
  phone?: string;
  email: string;
  password: string;
  isBlocked: boolean;
  auths: IAuthProvider[];
  role?: RoleType;
  status: 'pending' | 'approved' | 'suspended';
  createdAt?: Date;
  updatedAt?: Date;
}
