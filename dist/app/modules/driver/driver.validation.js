"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const driverZodValidation = zod_1.default.object({
    user: zod_1.default.string(),
    vehicleInfo: zod_1.default.string(),
});
const updateDriverZodValidation = zod_1.default.object({
    isOnline: zod_1.default.boolean().optional(),
    vehicleInfo: zod_1.default.string().optional(),
});
exports.DriverValidation = {
    driverZodValidation,
    updateDriverZodValidation,
};
