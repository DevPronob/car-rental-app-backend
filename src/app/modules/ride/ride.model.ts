import { Schema, model } from 'mongoose';
import { IRide } from './ride.interface';

const rideSchema = new Schema<IRide>(
  {
    rider: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    pickupLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String, required: true },
    },
    destinationLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String, required: true },
    },
    status: {
      type: String,
      enum: [
        'requested',
        'accepted',
        'picked_up',
        'in_transit',
        'completed',
        'cancelled',
      ],
      default: 'requested',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    fare: {
      type: Number,
      default: 0,
    },
    requestedAt: {
      type: Date,
      default: Date.now,
    },
    pickedUpAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    canceledAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export const Ride = model<IRide>('Ride', rideSchema);
