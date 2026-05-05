"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const AppErrror_1 = require("../../errors/AppErrror");
const user_model_1 = require("../User/user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../../utils/jwt");
const config_1 = __importDefault(require("../../config"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let isUserExists = yield user_model_1.User.findOne({ email: payload.email }).select("+password");
    // Auto-create driver if it doesn't exist (for development convenience)
    if (!isUserExists && payload.email === 'driver@carrental.com') {
        const hashedPassword = yield bcryptjs_1.default.hash("password123", 12);
        isUserExists = yield user_model_1.User.create({
            name: "Professional Driver",
            email: "driver@carrental.com",
            password: hashedPassword,
            role: "driver",
            status: "ACTIVE",
            phone: "5556667777"
        });
    }
    // Auto-create admin if it doesn't exist
    if (!isUserExists && payload.email === 'admin@carrental.com') {
        const hashedPassword = yield bcryptjs_1.default.hash("password123", 12);
        isUserExists = yield user_model_1.User.create({
            name: "Master Admin",
            email: "admin@carrental.com",
            password: hashedPassword,
            role: "admin",
            status: "ACTIVE",
            phone: "1112223333"
        });
    }
    if (!isUserExists) {
        throw new AppErrror_1.AppError(http_status_codes_1.default.NOT_FOUND, "User Does Not Exist");
    }
    if (isUserExists.status !== "ACTIVE") {
        throw new AppErrror_1.AppError(http_status_codes_1.default.FORBIDDEN, "User Is Not Active");
    }
    const isPasswordMatched = yield bcryptjs_1.default.compare(payload.password, isUserExists.password);
    if (!isPasswordMatched) {
        throw new AppErrror_1.AppError(http_status_codes_1.default.UNAUTHORIZED, "Password Not Matched");
    }
    const jwtPayload = {
        _id: isUserExists._id,
        email: isUserExists.email,
        role: isUserExists.role
    };
    const accessToken = (0, jwt_1.generateToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const user = isUserExists.toObject();
    delete user.password;
    return {
        user,
        accessToken
    };
});
exports.AuthServices = {
    loginUser
};
