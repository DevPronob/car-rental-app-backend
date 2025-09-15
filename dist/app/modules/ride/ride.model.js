"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ride = void 0;
const mongoose_1 = require("mongoose");
const rideSchema = new mongoose_1.Schema({
    rider: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    driver: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
exports.Ride = (0, mongoose_1.model)('Ride', rideSchema);
