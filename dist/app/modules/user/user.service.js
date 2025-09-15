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
exports.UserServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const AppError_1 = require("../../errorHalpers/AppError");
const user_model_1 = require("./user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, 'User not found');
    }
    return user;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find({});
    return users;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return user;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByIdAndDelete(id);
    if (!user) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, 'User not found');
    }
    return null;
});
const blockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const blockedUser = yield user_model_1.User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
    return blockedUser;
});
const unBlockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const blockedUser = yield user_model_1.User.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });
    return blockedUser;
});
const getMe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, "id");
    const user = yield user_model_1.User.findOne({ _id: id });
    console.log(user, "user");
    return user;
});
const updateProfile = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload, "payload");
    const updatedData = {};
    if (payload.name && payload.name.trim() !== "") {
        updatedData.name = payload.name;
    }
    if (payload.phone && payload.phone.trim() !== "") {
        updatedData.phone = payload.phone;
    }
    if (payload.password && payload.password.trim() !== "") {
        const hashPassword = yield bcryptjs_1.default.hash(payload.password, 10);
        updatedData.password = hashPassword;
    }
    const updatedProfile = yield user_model_1.User.findByIdAndUpdate(id, updatedData, { new: true });
    return updatedProfile;
});
const adminUpdateProfile = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload, "payload");
    const updatedData = {};
    if (payload.name && payload.name.trim() !== "") {
        updatedData.name = payload.name;
    }
    if (payload.phone && payload.phone.trim() !== "") {
        updatedData.phone = payload.phone;
    }
    if (payload.password && payload.password.trim() !== "") {
        const hashPassword = yield bcryptjs_1.default.hash(payload.password, 10);
        updatedData.password = hashPassword;
    }
    const updatedProfile = yield user_model_1.User.findByIdAndUpdate(id, updatedData, { new: true });
    return updatedProfile;
});
exports.UserServices = {
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
    blockUser,
    unBlockUser,
    updateProfile,
    getMe,
    adminUpdateProfile
};
