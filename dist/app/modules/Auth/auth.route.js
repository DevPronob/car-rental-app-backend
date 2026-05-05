"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post('/signin', auth_controller_1.AuthControllers.loginUser);
router.post('/signup', auth_controller_1.AuthControllers.signUpUser);
router.post('/driver-signup', auth_controller_1.AuthControllers.signUpDriver);
exports.AuthRoutes = router;
