"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const mongoose_1 = require("mongoose");
const carSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    isElectric: { type: Boolean, default: false },
    status: { type: String, enum: ['available', 'unavailable'], default: 'available' },
    features: { type: [String], default: [] },
    pricePerHour: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    images: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    year: { type: String, required: true },
    type: { type: String, required: true },
}, {
    timestamps: true
});
exports.Car = (0, mongoose_1.model)('Car', carSchema);
