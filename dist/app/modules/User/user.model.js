"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_constant_1 = require("./user.constant");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: 0
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'driver'],
        default: 'user'
    },
    phone: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: Object.values(user_constant_1.UserStatus),
        default: user_constant_1.UserStatus.ACTIVE
    },
    isDriverRequested: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
    versionKey: false
});
exports.User = (0, mongoose_1.model)('User', userSchema);
