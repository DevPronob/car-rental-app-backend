"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (error) => {
    const errorSourses = [];
    const errors = Object.values(error.errors);
    errors.forEach((errorObject) => errorSourses.push({
        path: errorObject.path,
        message: errorObject.message,
    }));
    return {
        statusCode: 400,
        message: 'Validation Error',
        errorSourses,
    };
};
exports.handleValidationError = handleValidationError;
