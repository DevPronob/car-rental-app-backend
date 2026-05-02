import { Schema, model } from 'mongoose';
import { IBooking } from './booking.interface';

const bookingSchema = new Schema<IBooking>(
    {
        car: {
            type: Schema.Types.ObjectId,
            required: [true, 'Car ID is required'],
            ref: 'Car',
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
        },
        date: {
            type: String,
            required: [true, 'Date is required'],
        },
        pickUpLocation: {
            type: String,
            required: [true, 'Pick up location is required'],
        },
        coordinates: {
            lat: { type: Number },
            lng: { type: Number },
        },
        costWithFeature: {
            type: Number,
            required: [true, 'Total cost is required'],
        },
        startTime: {
            type: String,
            required: [true, 'Start time is required'],
        },
        endTime: {
            type: String,
            default: null,
        },
        customerDetails: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            nid: { type: String, required: true },
            drivingLicense: { type: String, required: true },
        },
        additationalFeatures: {
            childSeat: { type: Boolean, default: false },
            gps: { type: Boolean, default: false },
            mobileWifi: { type: Boolean, default: false },
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'ongoing', 'completed', 'cancelled'],
            default: 'pending',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Filter out deleted bookings by default
bookingSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

bookingSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Booking = model<IBooking>('Booking', bookingSchema);
