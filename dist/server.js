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
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./app/config"));
const seed_1 = require("./app/utils/seed"); // 👈 Import seed function
let server;
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    if (server) {
        server.close(() => {
            console.error('Server closed due to unhandled rejection');
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.db_url);
            console.log('Connected to MongoDB');
            // Auto-seed data for the user
            console.log('🌱 Starting auto-seeding...');
            yield (0, seed_1.seedData)();
            console.log('✅ Auto-seeding completed');
            server = app_1.default.listen(config_1.default.port, () => {
                console.log(`🚀 Application is running on port ${config_1.default.port}`);
            });
        }
        catch (error) {
            console.log('server error', error);
        }
    });
}
main();
process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
        server.close(() => {
            console.log('Server closed due to SIGTERM');
            process.exit(0);
        });
    }
    else {
        process.exit(0);
    }
});
process.on('SIGINT', () => {
    console.log('SIGINT received');
    if (server) {
        server.close(() => {
            console.log('Server closed due to SIGINT');
            process.exit(0);
        });
    }
    else {
        process.exit(0);
    }
});
