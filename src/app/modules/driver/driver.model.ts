import { Schema, model, Types } from 'mongoose';

const driverSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      unique: true,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    vehicleInfo: {
      plate: { type: String, required: true },
      model: { type: String, required: true },
      color: { type: String, required: true },
      capacity: { type: Number, default: 4 },
    },
    earnings: {
      type: Number,
      default: 0,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    suspended: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Driver = model('Driver', driverSchema);
