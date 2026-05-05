"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const registerValidationSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty({ message: 'Name is required' }),
    email: zod_1.z.string().email('Invalid email format'),
    role: zod_1.z.enum(['admin', 'user']).default('user'),
    password: zod_1.z.string()
        .min(3, { message: "Password must be at least 3 characters" }),
    phone: zod_1.z.string(),
    address: zod_1.z.string().optional(),
    status: zod_1.z.enum(['active', 'blocked']).default('active'),
});
const loginValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string()
        .min(3, { message: "Password must be at least 3 characters" }),
});
exports.UserValidation = {
    registerValidationSchema,
    loginValidationSchema
};
