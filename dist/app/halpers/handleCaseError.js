"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const handleCastError = (error) => {
    console.log(error);
    const statusCode = 400;
    const message = 'Invalid MongoDB ObjectID. Please provide a valid id';
    return {
        statusCode,
        message,
    };
};
exports.handleCastError = handleCastError;
