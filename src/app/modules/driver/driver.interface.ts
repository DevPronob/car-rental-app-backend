import { Types } from 'mongoose';

export interface IDriver {
  _id: string;
  user?: Types.ObjectId;
  isOnline: boolean;
  vehicleInfo: {
    plate: string,
      model: string,
      color: string,
      capacity: { type: number, default: 4 }, 
  };
  earnings: number;
  lastLocation?:{
    lat:string,
    lng:string,
  }
  approved: boolean;
  suspended: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
