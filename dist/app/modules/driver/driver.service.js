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
exports.DriverService = exports.rejectRequest = exports.createDriver = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const AppError_1 = require("../../errorHalpers/AppError");
const ride_model_1 = require("../ride/ride.model");
const user_constant_1 = require("../user/user.constant");
const user_model_1 = require("../user/user.model");
const driver_model_1 = require("./driver.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const mongoose_1 = require("mongoose");
const createDriver = (payload, rider) => __awaiter(void 0, void 0, void 0, function* () {
    const data = Object.assign(Object.assign({}, payload), { user: rider });
    const driver = yield driver_model_1.Driver.create(data);
    yield user_model_1.User.findByIdAndUpdate(rider, { role: 'DRIVER' }, { new: true });
    return driver;
});
exports.createDriver = createDriver;
const rejectRequest = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isDriverExist = yield user_model_1.User.findOne({ _id: payload.user });
    if (!isDriverExist || isDriverExist.role !== user_constant_1.Role.DRIVER) {
        throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, 'Driver does not exist');
    }
    if (isDriverExist.isBlocked) {
        throw new AppError_1.AppError(http_status_codes_1.default.FORBIDDEN, 'Driver is blocked');
    }
    const driver = yield driver_model_1.Driver.create(payload);
    return driver;
});
exports.rejectRequest = rejectRequest;
const updateDriverStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield driver_model_1.Driver.findById(id);
    if (!driver) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, 'Driver not found');
    }
    const updatedDriver = yield driver_model_1.Driver.findByIdAndUpdate(id, { status: status }, { new: true });
    return updatedDriver;
});
const getDriverById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, 'id in service');
    const driver = yield driver_model_1.Driver.findOne({ user: id }).populate('user');
    if (!driver) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, 'Driver not found');
    }
    return driver;
});
const getAllDrivers = () => __awaiter(void 0, void 0, void 0, function* () {
    const drivers = yield driver_model_1.Driver.find({}).populate("user", "-password");
    return drivers;
});
const approveDriver = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, 'id in service');
    const driver = yield driver_model_1.Driver.findById(id);
    if (!driver) {
        throw new AppError_1.AppError(404, 'Driver not found');
    }
    driver.approved = true;
    driver.suspended = false;
    yield driver.save();
    return driver;
});
const suspendDriver = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield driver_model_1.Driver.findById(id);
    if (!driver) {
        throw new AppError_1.AppError(404, 'Driver not found');
    }
    driver.suspended = true;
    driver.isOnline = false;
    yield driver.save();
    return driver;
});
const getEarning = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.Types.ObjectId(id);
    // Aggregate earnings grouped by month
    const earningsByMonth = yield ride_model_1.Ride.aggregate([
        { $match: { driver: objectId, status: "completed" } }, // only completed rides
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                monthlyEarnings: { $sum: "$fare" }, // adjust field if you store differently
                totalRides: { $sum: 1 },
            },
        },
        {
            $project: {
                year: "$_id.year",
                month: "$_id.month",
                monthlyEarnings: 1,
                totalRides: 1,
                _id: 0,
            },
        },
        { $sort: { year: 1, month: 1 } },
    ]);
    // Calculate total earnings
    const totalEarnings = earningsByMonth.reduce((sum, item) => sum + item.monthlyEarnings, 0);
    return {
        totalEarnings,
        earningsByMonth,
    };
});
const updateAvivility = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const driverData = yield driver_model_1.Driver.findOne({ user: id });
    if (!driverData) {
        throw new AppError_1.AppError(404, "Driver not found");
    }
    const updatedDriver = yield driver_model_1.Driver.findOneAndUpdate({ user: id }, { isOnline: !driverData.isOnline }, { new: true });
    if (!updatedDriver) {
        throw new AppError_1.AppError(404, "Driver not found");
    }
    return updatedDriver;
});
const updateDriver = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    console.log(payload, "payload");
    // Find driver by userId
    const driver = yield driver_model_1.Driver.findOne({ user: userId });
    if (!driver) {
        throw new AppError_1.AppError(404, "Driver not found");
    }
    console.log(driver, "driver");
    const userData = {};
    const driverData = {};
    console.log(userData, "userData");
    console.log(driverData, "driverData");
    // Map payload fields
    if ((_a = payload.name) === null || _a === void 0 ? void 0 : _a.trim())
        userData.name = payload.name;
    if ((_b = payload.email) === null || _b === void 0 ? void 0 : _b.trim())
        userData.email = payload.email;
    if ((_c = payload.phone) === null || _c === void 0 ? void 0 : _c.trim())
        userData.phone = payload.phone;
    if ((_d = payload.plate) === null || _d === void 0 ? void 0 : _d.trim())
        driverData.plate = payload.plate;
    if ((_e = payload.model) === null || _e === void 0 ? void 0 : _e.trim())
        driverData.model = payload.model;
    if ((_f = payload.color) === null || _f === void 0 ? void 0 : _f.trim())
        driverData.color = payload.color;
    if (payload.capacity !== undefined && payload.capacity !== null)
        driverData.capacity = payload.capacity;
    // Update User
    if (Object.keys(userData).length > 0) {
        yield user_model_1.User.findByIdAndUpdate(driver.user, userData, {
            new: true,
            runValidators: true,
        });
    }
    // Update Driver
    let updatedDriver = driver;
    if (Object.keys(driverData).length > 0) {
        updatedDriver = yield driver_model_1.Driver.findOneAndUpdate({ user: userId }, { vehicleInfo: driverData }, {
            new: true,
            runValidators: true,
        }).populate("user", "-password");
    }
    return updatedDriver;
});
exports.DriverService = {
    createDriver: exports.createDriver,
    approveDriver,
    suspendDriver,
    updateDriverStatus,
    updateDriver,
    getDriverById,
    getAllDrivers,
    getEarning,
    updateAvivility
};
