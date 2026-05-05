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
const user_model_1 = require("./src/app/modules/User/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createDriver = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.DB_URL);
        const existingDriver = yield user_model_1.User.findOne({ email: 'driver@carrental.com' });
        if (existingDriver) {
            console.log('Driver already exists');
            yield mongoose_1.default.disconnect();
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash("password123", 12);
        yield user_model_1.User.create({
            name: "Professional Driver",
            email: "driver@carrental.com",
            password: hashedPassword,
            role: "driver",
            phone: "5556667777",
            address: "789 Driver Blvd, Speed City",
            status: "ACTIVE"
        });
        console.log('Driver created successfully!');
        console.log('Email: driver@carrental.com');
        console.log('Password: password123');
        yield mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error:', error);
    }
});
createDriver();
