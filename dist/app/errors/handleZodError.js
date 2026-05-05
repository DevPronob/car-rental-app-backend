"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const statusCode = 400;
    const errorSources = err === null || err === void 0 ? void 0 : err.issues.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue.message
        };
    });
    return {
        errorSources,
        statusCode,
        message: 'Zod Validation Error'
    };
};
exports.default = handleZodError;
