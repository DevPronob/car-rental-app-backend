"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateError = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const handleDuplicateError = (error) => {
    const statusCode = 500;
    const match = error.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    return {
        statusCode,
        message: `${extractedMessage} already exists`,
    };
};
exports.handleDuplicateError = handleDuplicateError;
