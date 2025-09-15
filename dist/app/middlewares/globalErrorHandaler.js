"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const AppError_1 = require("../errorHalpers/AppError");
const handleCaseError_1 = require("../halpers/handleCaseError");
const handleDuplicateError_1 = require("../halpers/handleDuplicateError");
const handleValidationError_1 = require("../halpers/handleValidationError");
const config_1 = require("../config");
const handleZodError_1 = require("../halpers/handleZodError");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler = (err, req, res, next) => {
    // if (envConfig.NODE_ENV === 'development') {
    //   console.log('🔥 Global Error Caught:', err);
    // }
    let statusCode = 500;
    let message = 'Something went wrong';
    let errorSources = [];
    if (err.name === 'CastError') {
        const simplifiedError = (0, handleCaseError_1.handleCastError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    else if (err.code === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.handleDuplicateError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    else if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.handleZodError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSource;
    }
    else if (err.name === 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.handleValidationError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSourses;
    }
    else if (err instanceof AppError_1.AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        error: config_1.envConfig.NODE_ENV === 'development' ? err : undefined,
        stack: config_1.envConfig.NODE_ENV === 'development' ? err.stack : undefined,
    });
};
exports.default = globalErrorHandler;
