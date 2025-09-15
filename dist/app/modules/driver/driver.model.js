"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
const mongoose_1 = require("mongoose");
const driverSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
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
}, {
    timestamps: true,
});
exports.Driver = (0, mongoose_1.model)('Driver', driverSchema);
