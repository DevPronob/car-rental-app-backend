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
const user_model_1 = require("../src/app/modules/User/user.model");
const booking_model_1 = require("../src/app/modules/Booking/booking.model");
const config_1 = __importDefault(require("../src/app/config"));
const fixData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.default.db_url);
        console.log("Connected to DB");
        // 1. Update pronobroy3601@gmail.com to be a driver
        const user = yield user_model_1.User.findOneAndUpdate({ email: "pronobroy3601@gmail.com" }, { role: "driver" }, { new: true });
        if (user) {
            console.log(`Updated user ${user.email} to role: ${user.role}`);
        }
        else {
            console.log("User pronobroy3601@gmail.com not found");
        }
        // 2. Fix bookings assigned to None but marked as completed (optional, for consistency)
        const unassignedCompleted = yield booking_model_1.Booking.updateMany({ driver: null, status: 'completed' }, { status: 'pending' } // or whatever makes sense
        );
        console.log(`Fixed ${unassignedCompleted.modifiedCount} unassigned completed bookings`);
        yield mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error("Error:", error);
    }
});
fixData();
