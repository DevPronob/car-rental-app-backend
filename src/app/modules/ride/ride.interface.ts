import { Types } from 'mongoose';

export interface IRide {
  _id?: Types.ObjectId;
  rider: Types.ObjectId;
  driver?: Types.ObjectId;
  pickupLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  destinationLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  status:
    | 'requested'
    | 'accepted'
    | 'picked_up'
    | 'in_transit'
    | 'completed'
    | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed';
  fare: number;
  requestedAt: Date;
  pickedUpAt: Date;
  completedAt: Date;
  canceledAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
