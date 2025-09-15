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
exports.AdminServices = void 0;
const AppError_1 = require("../../errorHalpers/AppError");
const driver_model_1 = require("../driver/driver.model");
const ride_model_1 = require("../ride/ride.model");
const user_model_1 = require("../user/user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find({});
    return users;
});
const getAllRides = () => __awaiter(void 0, void 0, void 0, function* () {
    const rides = yield ride_model_1.Ride.find({});
    return rides;
});
const getAllDriver = () => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield driver_model_1.Driver.find({});
    return driver;
});
const approvedDriver = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield driver_model_1.Driver.findById(id);
    if (!driver) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, 'Driver not found');
    }
    const updatedDriver = yield driver_model_1.Driver.findByIdAndUpdate(id, { approved: true }, { new: true });
    return updatedDriver;
});
const suspandDriver = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield driver_model_1.Driver.findById(id);
    if (!driver) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, 'Driver not found');
    }
    const updatedDriver = yield driver_model_1.Driver.findByIdAndUpdate(id, { approved: false }, { new: true });
    return updatedDriver;
});
exports.AdminServices = {
    getAllUsers,
    getAllRides,
    getAllDriver,
    approvedDriver,
    suspandDriver,
};
