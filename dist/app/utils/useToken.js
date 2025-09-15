"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useToken = void 0;
const jwt_1 = require("./jwt");
const config_1 = require("../config");
const useToken = (payload) => {
    const userData = {
        _id: payload._id,
        name: payload.name,
        email: payload.email,
        role: payload.role,
        isBlocked: payload.isBlocked,
    };
    const accessToken = (0, jwt_1.generateToken)(userData, config_1.envConfig.JWT_SECRET);
    const refreshToken = (0, jwt_1.generateToken)(userData, config_1.envConfig.JWT_SECRET);
    return {
        accessToken,
        refreshToken: refreshToken,
    };
};
exports.useToken = useToken;
