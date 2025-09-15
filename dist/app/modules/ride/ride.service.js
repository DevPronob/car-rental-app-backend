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
exports.RideService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const AppError_1 = require("../../errorHalpers/AppError");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const ride_model_1 = require("./ride.model");
const user_model_1 = require("../user/user.model");
const calculateFare_1 = require("../../utils/calculateFare");
const driver_model_1 = require("../driver/driver.model");
const mongoose_1 = require("mongoose");
const requestRide = (payload, rider) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    console.log(payload.destinationLocation, rider, 'payload in service');
    const isRiderExist = yield user_model_1.User.findOne({ _id: rider, role: 'RIDER' });
    console.log(rider, payload);
    if (!isRiderExist) {
        throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, 'Rider does not exist');
    }
    if (isRiderExist.isBlocked) {
        throw new AppError_1.AppError(http_status_codes_1.default.FORBIDDEN, 'Driver or Rider is blocked');
    }
    if (((_a = payload.destinationLocation) === null || _a === void 0 ? void 0 : _a.lat) === undefined ||
        ((_b = payload.destinationLocation) === null || _b === void 0 ? void 0 : _b.lng) === undefined) {
        throw new AppError_1.AppError(http_status_codes_1.default.BAD_GATEWAY, "Please Insert Your Destination");
    }
    if (((_c = payload.pickupLocation) === null || _c === void 0 ? void 0 : _c.lat) === undefined ||
        ((_d = payload.pickupLocation) === null || _d === void 0 ? void 0 : _d.lng) === undefined) {
        throw new AppError_1.AppError(http_status_codes_1.default.BAD_GATEWAY, "Please Insert Your Pickup Location");
    }
    const distance = (0, calculateFare_1.calculateDistance)((_e = payload.pickupLocation) === null || _e === void 0 ? void 0 : _e.lat, payload.pickupLocation.lng, payload.destinationLocation.lat, payload.destinationLocation.lng);
    const estimatedFare = (0, calculateFare_1.calculateFare)(distance);
    console.log('Requesting ride with payload:', estimatedFare, "here");
    const data = Object.assign(Object.assign({}, payload), { rider: rider, fare: estimatedFare });
    const ride = yield ride_model_1.Ride.create(data);
    return ride;
});
const cancelRide = (rideId) => __awaiter(void 0, void 0, void 0, function* () {
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride)
        throw new AppError_1.AppError(404, 'Ride not found');
    if (ride.status !== 'requested') {
        throw new AppError_1.AppError(400, 'You can only cancel before acceptance');
    }
    const now = new Date();
    const diff = (now.getTime() - ride.createdAt.getTime()) / (1000 * 60);
    if (diff > 5) {
        throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, 'Cancel time window expired');
    }
    ride.status = 'cancelled';
    ride.canceledAt = new Date();
    yield ride.save();
    return ride;
});
const updateRideStatus = (rideId, newStatus) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(newStatus);
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride)
        throw new AppError_1.AppError(404, 'Ride not found');
    if (ride.status === 'completed') {
        throw new AppError_1.AppError(400, 'Ride is already completed');
    }
    ride.status = newStatus;
    //  "requested",
    //       "accepted",
    //       "picked_up",
    //       "in_transit",
    //       "completed",
    //       "cancelled",
    if (newStatus === 'picked_up') {
        ride.pickedUpAt = new Date();
    }
    if (newStatus === 'completed') {
        ride.completedAt = new Date();
        console.log(ride);
        if (ride.driver) {
            console.log(ride, 'ride');
            const driver = yield driver_model_1.Driver.findOne({ user: ride.driver });
            if (!driver)
                throw new AppError_1.AppError(404, 'Driver not found');
            driver.earnings += ride.fare || 0;
            yield driver.save();
        }
    }
    yield ride.save();
    return ride;
});
const getRideById = (rideId) => __awaiter(void 0, void 0, void 0, function* () {
    return ride_model_1.Ride.findById(rideId).populate('rider').populate('driver');
});
const getRidesByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return ride_model_1.Ride.find({ rider: userId })
        .sort({ requestedAt: -1 })
        .populate('rider')
        .populate('driver');
});
const getRidesByDriver = (driverId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, riderId, search, startDate, endDate, page = 1, limit = 20, } = query;
    console.log(query, "query");
    const filter = {};
    if (status)
        filter.status = status;
    // Filter by driver/rider
    if (riderId)
        filter.rider = riderId;
    // Search pickup or destination
    if (search) {
        filter.$or = [
            { "pickupLocation.address": { $regex: search, $options: "i" } },
            { "destinationLocation.address": { $regex: search, $options: "i" } },
        ];
    }
    if (startDate || endDate) {
        filter.createdAt = {};
        if (startDate)
            filter.createdAt.$gte = new Date(startDate);
        if (endDate)
            filter.createdAt.$lte = new Date(endDate);
    }
    const skip = (Number(page) - 1) * Number(limit);
    // Fetch rides
    const rides = yield ride_model_1.Ride.find(Object.assign(Object.assign({}, filter), { driver: driverId }))
        .populate("rider", "name email")
        .populate("driver", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));
    const total = yield ride_model_1.Ride.countDocuments(filter);
    return { rides, total, page: Number(page), limit: Number(limit) };
});
const getAllRides = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, driverId, riderId, search, startDate, endDate, page = 1, limit = 20, } = query;
    console.log(query, "query");
    const filter = {};
    if (status)
        filter.status = status;
    // Filter by driver/rider
    if (driverId)
        filter.driver = driverId;
    if (riderId)
        filter.rider = riderId;
    // Search pickup or destination
    if (search) {
        filter.$or = [
            { "pickupLocation.address": { $regex: search, $options: "i" } },
            { "destinationLocation.address": { $regex: search, $options: "i" } },
        ];
    }
    if (startDate || endDate) {
        filter.createdAt = {};
        if (startDate)
            filter.createdAt.$gte = new Date(startDate);
        if (endDate)
            filter.createdAt.$lte = new Date(endDate);
    }
    const skip = (Number(page) - 1) * Number(limit);
    // Fetch rides
    const rides = yield ride_model_1.Ride.find(filter)
        .populate("rider", "name email")
        .populate("driver", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));
    const total = yield ride_model_1.Ride.countDocuments(filter);
    return { rides, total, page: Number(page), limit: Number(limit) };
});
const acceptByDriver = (rideId, driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, 'Ride not found');
    }
    const driver = yield driver_model_1.Driver.findById(driverId);
    if ((driver === null || driver === void 0 ? void 0 : driver.isOnline) === false) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, 'Cant Assign You Are Offline');
    }
    const isDriverOnRide = yield ride_model_1.Ride.findOne({
        driver: driverId
    });
    if ((isDriverOnRide === null || isDriverOnRide === void 0 ? void 0 : isDriverOnRide.status) !== "completed" && (isDriverOnRide === null || isDriverOnRide === void 0 ? void 0 : isDriverOnRide.status) !== "cancelled" && isDriverOnRide) {
        throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, 'You are already on a ride');
    }
    ride.status = 'accepted';
    ride.driver = new mongoose_1.Types.ObjectId(driverId);
    ride.requestedAt = new Date();
    yield ride.save();
    return ride;
});
const completeRide = (rideId) => __awaiter(void 0, void 0, void 0, function* () {
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, 'Ride not found');
    }
    ride.status = 'completed';
    ride.fare = ride.fare || 0;
    ride.completedAt = new Date();
    yield ride.save();
    return ride;
});
const getRiderHistory = (riderId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, startDate, endDate, page = 1, limit = 20, } = query;
    const filter = {};
    if (status) {
        filter.status = status;
    }
    if (startDate || endDate) {
        filter.createdAt = {};
        if (startDate)
            filter.createdAt.$gte = new Date(startDate);
        if (endDate)
            filter.createdAt.$lte = new Date(endDate);
    }
    const skip = (Number(page) - 1) * Number(limit);
    const riderHistory = yield ride_model_1.Ride.find({ rider: riderId }).skip(skip).populate("rider").populate("rider");
    console.log(riderHistory);
    return riderHistory;
});
const getDriverHistory = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ride_model_1.Ride.find({ driver: driverId }).sort({ createdAt: -1 });
});
const getActiveRide = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const activeRide = yield ride_model_1.Ride.findOne({ driver: driverId, status: { $nin: ["completed", "canceled"] } }).populate("rider", "name email")
        .populate("driver", "name email");
    return activeRide;
});
const rideAnalytics = () => __awaiter(void 0, void 0, void 0, function* () {
    const rideByMonth = yield ride_model_1.Ride.aggregate([
        { $match: { status: "accepted" } },
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                monthlyRides: { $sum: 1 },
            },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
        {
            $group: {
                _id: null,
                monthlyData: {
                    $push: {
                        year: "$_id.year",
                        month: "$_id.month",
                        monthlyRides: "$monthlyRides",
                    },
                },
                totalRides: { $sum: "$monthlyRides" },
            },
        },
        {
            $project: {
                _id: 0,
                monthlyData: 1,
                totalRides: 1,
            },
        },
    ]);
    return rideByMonth;
});
const activeRide = (rider) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(rider, "riderrr");
    const activeRide = yield ride_model_1.Ride.findOne({ rider: rider, status: { $nin: ["completed", "canceled"] } });
    console.log(activeRide, "activeRide");
    return activeRide;
});
exports.RideService = {
    requestRide,
    cancelRide,
    getRiderHistory,
    getDriverHistory,
    updateRideStatus,
    getRideById,
    getRidesByUser,
    getRidesByDriver,
    getAllRides,
    acceptByDriver,
    completeRide,
    getActiveRide,
    rideAnalytics,
    activeRide
};
