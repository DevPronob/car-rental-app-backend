import { Response } from "express";

export interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
}

export const setAuthCookie = (res: Response, tokenInfo: AuthTokens) => {
  const cookieOptions = {
    httpOnly: true,
    secure: true,         // ✅ required on Vercel (HTTPS only)
    sameSite: "none" as const, // ✅ allow cross-origin frontend <-> backend
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  if (tokenInfo.accessToken) {
    res.cookie("accessToken", tokenInfo.accessToken, cookieOptions);
  }

  if (tokenInfo.refreshToken) {
    res.cookie("refreshToken", tokenInfo.refreshToken, cookieOptions);
  }
};
