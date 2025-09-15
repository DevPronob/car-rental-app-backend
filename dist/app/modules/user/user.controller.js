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
exports.UserControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const user_service_1 = require("./user.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const getAllUsers = (0, catchAsync_1.catchAsync)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_service_1.UserServices.getAllUsers();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Users retrieved successfully",
        statusCode: http_status_codes_1.default.OK,
        data: users,
    });
}));
const getUserById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.getUserById(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "User retrieved successfully",
        statusCode: http_status_codes_1.default.OK,
        data: result,
    });
}));
const updateUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.UserServices.updateUser(req.params.id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "User updated successfully",
        statusCode: http_status_codes_1.default.OK,
        data: user,
    });
}));
const deleteUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_service_1.UserServices.deleteUser(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "User deleted successfully",
        statusCode: http_status_codes_1.default.NO_CONTENT,
        data: null,
    });
}));
const blockUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blocked = yield user_service_1.UserServices.blockUser(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "User blocked successfully",
        statusCode: http_status_codes_1.default.OK,
        data: blocked,
    });
}));
const unBlockUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const unblocked = yield user_service_1.UserServices.unBlockUser(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "User unblocked successfully",
        statusCode: http_status_codes_1.default.OK,
        data: unblocked,
    });
}));
const getMe = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    console.log(userId, "userId");
    const user = yield user_service_1.UserServices.getMe(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "User retrieved successfully",
        statusCode: http_status_codes_1.default.OK,
        data: user,
    });
}));
const updateProfile = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const user = yield user_service_1.UserServices.updateProfile(userId, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "User profile updated successfully",
        statusCode: http_status_codes_1.default.OK,
        data: user,
    });
}));
const adminUpdateProfile = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const user = yield user_service_1.UserServices.adminUpdateProfile(userId, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Admin profile updated successfully",
        statusCode: http_status_codes_1.default.OK,
        data: user,
    });
}));
exports.UserControllers = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    blockUser,
    unBlockUser,
    getMe,
    updateProfile,
    adminUpdateProfile,
};
