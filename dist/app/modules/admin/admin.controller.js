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
exports.AdminController = void 0;
const admin_service_1 = require("./admin.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const sendResponse_1 = require("../../utils/sendResponse");
const catchAsync_1 = require("../../utils/catchAsync");
const getAllUsers = (0, catchAsync_1.catchAsync)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield admin_service_1.AdminServices.getAllUsers();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Users retrieved successfully',
        statusCode: http_status_codes_1.default.OK,
        data: users,
    });
}));
const getAllDrivers = (0, catchAsync_1.catchAsync)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const drivers = yield admin_service_1.AdminServices.getAllDriver();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Drivers retrieved successfully',
        statusCode: http_status_codes_1.default.OK,
        data: drivers,
    });
}));
const getAllRides = (0, catchAsync_1.catchAsync)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rides = yield admin_service_1.AdminServices.getAllRides();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Rides retrieved successfully',
        statusCode: http_status_codes_1.default.OK,
        data: rides,
    });
}));
const approveDriver = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield admin_service_1.AdminServices.approvedDriver(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Driver approved successfully',
        statusCode: http_status_codes_1.default.OK,
        data: driver,
    });
}));
const suspendDriver = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield admin_service_1.AdminServices.suspandDriver(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Driver suspended successfully',
        statusCode: http_status_codes_1.default.OK,
        data: driver,
    });
}));
exports.AdminController = {
    getAllUsers,
    getAllDrivers,
    getAllRides,
    approveDriver,
    suspendDriver,
};
