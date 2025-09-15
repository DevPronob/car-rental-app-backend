"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const rideCreateZodSchema = zod_1.default.object({
    rider: zod_1.default.string(),
    driver: zod_1.default.string().optional(),
    pickupLocation: zod_1.default.object({
        lat: zod_1.default.number(),
        lng: zod_1.default.number(),
        address: zod_1.default.string(),
    }),
    destinationLocation: zod_1.default.object({
        lat: zod_1.default.number(),
        lng: zod_1.default.number(),
        address: zod_1.default.string(),
    }),
    fare: zod_1.default.number().optional(),
});
const updateRideZodSchema = zod_1.default.object({
    rider: zod_1.default.string().optional(),
    driver: zod_1.default.string().optional(),
    pickupLocation: zod_1.default.object({
        lat: zod_1.default.number().optional(),
        lng: zod_1.default.number().optional(),
        address: zod_1.default.string().optional(),
    }),
    destinationLocation: zod_1.default.object({
        lat: zod_1.default.number().optional(),
        lng: zod_1.default.number().optional(),
        address: zod_1.default.string().optional(),
    }),
    fare: zod_1.default.number().optional(),
});
exports.RideValidation = {
    rideCreateZodSchema,
    updateRideZodSchema,
};
