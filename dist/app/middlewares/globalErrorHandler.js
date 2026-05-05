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
exports.globalErrorHandler = void 0;
const config_1 = __importDefault(require("../config"));
const handlerDuplicateError_1 = require("../errors/handlerDuplicateError");
const AppErrror_1 = require("../errors/AppErrror");
const globalErrorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];
    if (err.code === 11000) {
        const simplifiedError = yield (0, handlerDuplicateError_1.handlerDuplicateError)(err);
        statusCode = simplifiedError.statusCode,
            message = simplifiedError.message,
            errorSources = simplifiedError.errorSources;
    }
    if (err instanceof AppErrror_1.AppError) {
        statusCode = err.statusCode,
            message = err.message,
            errorSources = [{
                    path: "",
                    message: err.message
                }];
    }
    if (err instanceof Error) {
        statusCode = 500,
            message = err.message,
            errorSources = [{
                    path: "",
                    message: err.message
                }];
    }
    res.status(statusCode).json({ success: false,
        message,
        errorSources,
        err,
        stack: config_1.default.node_env === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null, });
});
exports.globalErrorHandler = globalErrorHandler;
