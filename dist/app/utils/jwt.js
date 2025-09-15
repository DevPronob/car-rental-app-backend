"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload, secrect) => {
    const token = jsonwebtoken_1.default.sign(payload, secrect, {
        expiresIn: '1d',
    });
    return token;
};
exports.generateToken = generateToken;
const verifyToken = (token, secrect) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secrect);
        return decoded;
    }
    catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
};
exports.verifyToken = verifyToken;
