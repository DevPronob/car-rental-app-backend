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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarServices = void 0;
const car_model_1 = require("./car.model");
const booking_model_1 = require("../Booking/booking.model");
const AppErrror_1 = require("../../errors/AppErrror");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createCarIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.create(payload);
    return result;
});
const getAllCarsFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, minPrice, maxPrice } = query, filters = __rest(query, ["searchTerm", "minPrice", "maxPrice"]);
    const queryObject = { isDeleted: false };
    if (searchTerm) {
        queryObject.$or = [
            { name: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } },
        ];
    }
    const min = Number(minPrice);
    const max = Number(maxPrice);
    if (!isNaN(min) || !isNaN(max)) {
        queryObject.pricePerHour = {};
        if (!isNaN(min))
            queryObject.pricePerHour.$gte = min;
        if (!isNaN(max))
            queryObject.pricePerHour.$lte = max;
    }
    Object.keys(filters).forEach((key) => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
            queryObject[key] = filters[key];
        }
    });
    return yield car_model_1.Car.find(queryObject);
});
const getSingleCarFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.findById(id);
    return result;
});
const updateCarInDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteCarFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
const returnCarInDb = (bookingId, endTime) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.Booking.findById(bookingId).populate('car');
    if (!booking) {
        throw new AppErrror_1.AppError(http_status_codes_1.default.NOT_FOUND, 'Booking not found');
    }
    const car = booking.car;
    const startTime = booking.startTime;
    // Simple time calculation (assuming same day for now as per requirements)
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    const durationHours = Math.max(0, (endH + endM / 60) - (startH + startM / 60));
    let totalCost = durationHours * ((car === null || car === void 0 ? void 0 : car.pricePerHour) || 0);
    // Ensure totalCost is a valid number
    if (isNaN(totalCost)) {
        totalCost = booking.costWithFeature || 0;
    }
    // Update booking
    const updatedBooking = yield booking_model_1.Booking.findByIdAndUpdate(bookingId, {
        endTime,
        costWithFeature: totalCost,
        status: 'completed'
    }, { new: true, runValidators: false });
    // Update car status if car exists
    if (car && car._id) {
        yield car_model_1.Car.findByIdAndUpdate(car._id, { status: 'available' });
    }
    return updatedBooking;
});
exports.CarServices = {
    createCarIntoDb,
    getAllCarsFromDb,
    getSingleCarFromDb,
    updateCarInDb,
    deleteCarFromDb,
    returnCarInDb
};
