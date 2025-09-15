"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const user_constant_1 = require("../user/user.constant");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
router.get('/users', (0, auth_1.auth)([user_constant_1.Role.ADMIN]), admin_controller_1.AdminController.getAllUsers);
router.get('/drivers', (0, auth_1.auth)([user_constant_1.Role.ADMIN]), admin_controller_1.AdminController.getAllDrivers);
router.get('/rides', (0, auth_1.auth)([user_constant_1.Role.ADMIN]), admin_controller_1.AdminController.getAllRides);
router.patch('/drivers/approve/:id', (0, auth_1.auth)([user_constant_1.Role.ADMIN]), admin_controller_1.AdminController.approveDriver);
router.patch('/drivers/suspend/:id', (0, auth_1.auth)([user_constant_1.Role.ADMIN]), admin_controller_1.AdminController.suspendDriver);
exports.AdminRoutes = router;
