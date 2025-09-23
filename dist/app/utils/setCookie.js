"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookie = void 0;
const setAuthCookie = (res, tokenInfo) => {
    const cookieOptions = {
        httpOnly: true,
        secure: true, // ✅ required on Vercel (HTTPS only)
        sameSite: "none", // ✅ allow cross-origin frontend <-> backend
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };
    if (tokenInfo.accessToken) {
        res.cookie("accessToken", tokenInfo.accessToken, cookieOptions);
    }
    if (tokenInfo.refreshToken) {
        res.cookie("refreshToken", tokenInfo.refreshToken, cookieOptions);
    }
};
exports.setAuthCookie = setAuthCookie;
