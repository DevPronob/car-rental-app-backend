"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const notFound_1 = require("./app/middlewares/notFound");
const routes_1 = require("./app/routes");
const app = (0, express_1.default)();
// ✅ CORS FIRST (very important)
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // allow requests with no origin (like Postman)
        if (!origin)
            return callback(null, true);
        if (origin.includes('localhost') ||
            origin.includes('vercel.app')) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
// ✅ Handle preflight requests
app.options('/{*splat}', (0, cors_1.default)());
// ✅ Body parser
app.use(express_1.default.json());
// ✅ Routes
app.use('/api/v1', routes_1.router);
// ✅ Test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// ✅ Error handlers (keep LAST)
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.notFound);
exports.default = app;
