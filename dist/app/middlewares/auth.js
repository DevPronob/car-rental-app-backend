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
const http_status_codes_1 = require("http-status-codes");
const AppErrror_1 = require("../errors/AppErrror");
const catchAsync_1 = require("../utils/catchAsync");
const jwt_1 = require("../utils/jwt");
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/User/user.model");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        let token = req.headers.authorization;
        if (!token) {
            throw new AppErrror_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You are not authorized!');
        }
        if (token.startsWith('Bearer ')) {
            token = token.split(' ')[1];
        }
        let decoded;
        try {
            decoded = (0, jwt_1.verifyToken)(token, config_1.default.jwt_access_secret);
        }
        catch (_a) {
            throw new AppErrror_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Invalid token');
        }
        const userId = decoded._id || decoded.id;
        const user = yield user_model_1.User.findById(userId);
        if (!user) {
            throw new AppErrror_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
        }
        if (user.status !== 'ACTIVE') {
            throw new AppErrror_1.AppError(http_status_codes_1.StatusCodes.FORBIDDEN, 'User is blocked');
        }
        if (requiredRoles.length && !requiredRoles.includes(user.role)) {
            throw new AppErrror_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Not authorized');
        }
        req.user = user;
        next();
    }));
};
exports.default = auth;
