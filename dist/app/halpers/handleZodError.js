"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const handleZodError = (error) => {
    const statusCode = 400;
    const errorSource = error.issues.map((issue) => {
        return {
            path: issue.path.map(String).join(' | '),
            message: issue.message,
        };
    });
    return {
        statusCode: statusCode,
        message: 'Zod validation Error',
        errorSource,
    };
};
exports.handleZodError = handleZodError;
