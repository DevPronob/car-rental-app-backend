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
exports.BookingServices = void 0;
const booking_model_1 = require("./booking.model");
const car_model_1 = require("../Car/car.model");
const AppErrror_1 = require("../../errors/AppErrror");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createBookingInDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield car_model_1.Car.findById(payload.car);
    if (!car) {
        throw new AppErrror_1.AppError(http_status_codes_1.default.NOT_FOUND, 'Car not found');
    }
    if (car.status !== 'available') {
        throw new AppErrror_1.AppError(http_status_codes_1.default.BAD_REQUEST, 'Car is not available for booking');
    }
    // Create booking
    const result = yield booking_model_1.Booking.create(payload);
    // Update car status to unavailable (optional, depending on business logic)
    // await Car.findByIdAndUpdate(payload.car, { status: 'unavailable' });
    return result;
});
const getAllBookingsFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find(query).populate('car');
    return result;
});
const getMyBookingsFromDb = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find({ email }).populate('car');
    return result;
});
const getDriverBookingsFromDb = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find({ driver: driverId }).populate('car').populate('driver');
    return result;
});
const getUnassignedBookingsFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find({
        driver: null,
        status: { $in: ['pending', 'confirmed'] }
    }).populate('car');
    return result;
});
const claimBookingInDb = (bookingId, driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findByIdAndUpdate(bookingId, { driver: driverId }, { new: true });
    return result;
});
const updateBookingInDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteBookingFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
exports.BookingServices = {
    createBookingInDb,
    getAllBookingsFromDb,
    getMyBookingsFromDb,
    getDriverBookingsFromDb,
    getUnassignedBookingsFromDb,
    claimBookingInDb,
    updateBookingInDb,
    deleteBookingFromDb,
};
