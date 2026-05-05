"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerDuplicateError = void 0;
const handlerDuplicateError = (error) => {
    let statusCode = 400;
    let message = "Duplication Error";
    const field = Object.keys(error.keyValue)[0];
    const errorSources = [
        {
            path: '',
            message: `${field} is already exists`,
        },
    ];
    return {
        statusCode,
        message,
        errorSources
    };
};
exports.handlerDuplicateError = handlerDuplicateError;
