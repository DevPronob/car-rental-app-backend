"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const handleCastError = (error) => {
    const errorSources = [
        {
            path: (error === null || error === void 0 ? void 0 : error.path) || '',
            message: error.message,
        },
    ];
    return {
        statusCode: 400,
        message: 'Cast Error',
        errorSources,
    };
};
exports.handleCastError = handleCastError;
