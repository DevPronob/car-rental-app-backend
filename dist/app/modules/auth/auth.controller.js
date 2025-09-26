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
exports.AuthControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const auth_service_1 = require("./auth.service");
const setCookie_1 = require("../../utils/setCookie");
const passport_1 = __importDefault(require("passport"));
const AppError_1 = require("../../errorHalpers/AppError");
const useToken_1 = require("../../utils/useToken");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const registerUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_service_1.AuthServices.registerUser(req.body);
    if (user) {
        (0, setCookie_1.setAuthCookie)(res, user);
    }
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'User registered successfully',
        statusCode: 201,
        data: user,
    });
}));
const loginUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate("local", (error, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            // ❌❌❌❌❌
            // throw new AppError(401, "Some error")
            // next(err)
            // return new AppError(401, err)
            // ✅✅✅✅
            // return next(err)
            // console.log("from err");
            return next(new AppError_1.AppError(401, error));
        }
        if (!user) {
            return next(new AppError_1.AppError(404, info.message));
        }
        const userToken = yield (0, useToken_1.useToken)(user);
        (0, setCookie_1.setAuthCookie)(res, userToken);
        const { password } = user, rest = __rest(user, ["password"]);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: 'User login successfully',
            statusCode: 200,
            data: rest,
        });
    }))(req, res, next);
}));
const logout = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
    });
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'User logged out successfully',
        statusCode: 200,
        data: null,
    });
}));
const googleCallback = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let redirectTo = req.query.state ? req.query.state : "";
    if (redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1);
    }
    // /booking => booking , => "/" => ""
    const user = req.user;
    if (!user) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "User Not Found");
    }
    const tokenInfo = (0, useToken_1.useToken)(user);
    (0, setCookie_1.setAuthCookie)(res, tokenInfo);
    // sendResponse(res, {
    //     success: true,
    //     statusCode: httpStatus.OK,
    //     message: "Password Changed Successfully",
    //     data: null,
    // })
    res.redirect(`https://rent-sharing-system.vercel.app/${redirectTo}`);
}));
exports.AuthControllers = {
    registerUser,
    loginUser,
    logout,
    googleCallback
};
