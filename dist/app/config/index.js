"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log('PORT =', process.env.PORT); // Check if undefined
console.log('MONGO_URL =', process.env.MONGO_URL); // Check if undefined
const loadVars = () => {
    const vars = ['PORT', 'MONGO_URL', 'NODE_ENV', 'JWT_SECRET'];
    vars.forEach((envVar) => {
        if (!process.env[envVar]) {
            throw new Error(`Environment variable ${envVar} is not defined`);
        }
    });
    return {
        PORT: process.env.PORT,
        MONGO_URL: process.env.MONGO_URL,
        NODE_ENV: process.env.NODE_ENV,
        JWT_SECRET: process.env.JWT_SECRET,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL
    };
};
exports.envConfig = loadVars();
