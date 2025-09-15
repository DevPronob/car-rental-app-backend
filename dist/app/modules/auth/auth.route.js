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
exports.AuthRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_validation_1 = require("../user/user.validation");
const auth_controller_1 = require("./auth.controller");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.post('/register', (0, validateRequest_1.validateRequest)(user_validation_1.UserValidation.createUserSchemaValidation), auth_controller_1.AuthControllers.registerUser);
router.get("/google", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const redirect = req.query.redirect || "/";
    passport_1.default.authenticate("google", { scope: ["profile", "email"], state: redirect })(req, res, next);
}));
router.get('/google/callback', passport_1.default.authenticate("google", { failureRedirect: "/login" }), auth_controller_1.AuthControllers.googleCallback);
router.post('/login', (0, validateRequest_1.validateRequest)(user_validation_1.UserValidation.loginSchemaValidation), auth_controller_1.AuthControllers.loginUser);
router.post('/logout', auth_controller_1.AuthControllers.logout);
exports.AuthRoutes = router;
