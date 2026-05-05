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
const mongoose_1 = __importDefault(require("mongoose"));
const booking_model_1 = require("../src/app/modules/Booking/booking.model");
const user_model_1 = require("../src/app/modules/User/user.model");
const config_1 = __importDefault(require("../src/app/config"));
const checkData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.default.db_url);
        console.log("Connected to DB");
        const users = yield user_model_1.User.find({});
        console.log("Users:");
        users.forEach(u => {
            console.log(`User: ID=${u._id}, Email=${u.email}, Role=${u.role}`);
        });
        const bookings = yield booking_model_1.Booking.find({}).populate('driver');
        console.log("\nBookings:");
        bookings.forEach((b, index) => {
            const driverId = b.driver ? b.driver._id : 'None';
            const driverEmail = b.driver ? b.driver.email : 'None';
            console.log(`Booking ${index + 1}: ID=${b._id}, DriverID=${driverId}, DriverEmail=${driverEmail}, Status=${b.status}`);
        });
        yield mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error("Error:", error);
    }
});
checkData();
