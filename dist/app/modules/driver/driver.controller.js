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
exports.DriverControllers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const driver_service_1 = require("./driver.service");
const createDriver = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rider = req.user;
    console.log(rider);
    const driver = yield driver_service_1.DriverService.createDriver(req.body, rider._id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: 'Driver Created Successfully',
        data: driver,
    });
}));
const getDriverById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield driver_service_1.DriverService.getDriverById(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Driver Rectrive Successfully',
        data: driver,
    });
}));
const getAllDrivers = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const drivers = yield driver_service_1.DriverService.getAllDrivers();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Driver Rectrived Successfully',
        data: drivers,
    });
}));
const updateDriverStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedDriver = yield driver_service_1.DriverService.updateDriverStatus(req.params.id, req.body.status);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Driver status updated successfully',
        data: updatedDriver,
    });
}));
const approveDriver = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id, 'id');
    if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid MongoDB ObjectID" });
    }
    const result = yield driver_service_1.DriverService.approveDriver(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Driver approved successfully',
        data: result,
    });
}));
const suspendDriver = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield driver_service_1.DriverService.suspendDriver(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Driver suspended successfully',
        data: result,
    });
}));
const getEarinings = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log(user);
    const driver = yield driver_service_1.DriverService.getEarning(user._id.toString());
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: 'Driver Earning Rectrive Successfully',
        data: driver,
    });
}));
const updateAvailablity = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    console.log(userId, req.body, "body");
    const result = yield driver_service_1.DriverService.updateAvivility(userId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Driver online status changed',
        data: result,
    });
}));
const updateDriver = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log(user, "user");
    console.log(user);
    const driver = yield driver_service_1.DriverService.updateDriver(user._id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Driver Updated Successfully',
        data: driver,
    });
}));
exports.DriverControllers = {
    createDriver,
    getDriverById,
    getAllDrivers,
    updateDriverStatus,
    updateDriver,
    approveDriver,
    suspendDriver,
    getEarinings,
    updateAvailablity
};
