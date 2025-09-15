"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const user_constant_1 = require("./user.constant");
const createUserSchemaValidation = zod_1.default.object({
    name: zod_1.default
        .string()
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .max(50, { message: 'Name cannot exceed 50 characters.' }),
    email: zod_1.default
        .string()
        .min(5, { message: 'Email must be at least 5 characters long.' })
        .max(100, { message: 'Email cannot exceed 100 characters.' }),
    password: zod_1.default
        .string()
        .min(8, { message: 'Password must be at least 8 characters long.' }),
    isBlocked: zod_1.default.boolean().optional().default(false),
    role: zod_1.default.enum(Object.values(user_constant_1.Role)).default('RIDER'),
});
const loginSchemaValidation = zod_1.default.object({
    email: zod_1.default
        .string()
        .min(5, { message: 'Email must be at least 5 characters long.' })
        .max(100, { message: 'Email cannot exceed 100 characters.' }),
    password: zod_1.default
        .string()
        .min(8, { message: 'Password must be at least 8 characters long.' }),
});
exports.UserValidation = {
    createUserSchemaValidation,
    loginSchemaValidation,
};
