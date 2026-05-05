"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    car: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Car ID is required'],
        ref: 'Car',
    },
    driver: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
// Filter out deleted bookings by default
bookingSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
bookingSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
