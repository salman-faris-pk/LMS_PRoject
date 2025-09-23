import "dotenv/config";
import { Response } from "express";
import { IUser } from "../models/user.model.js";
import { redis } from "../lib/redis.js";

interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

const accessTokenExpires = parseInt(
  process.env.ACCESS_TOKEN_EXPIRES || "300",
  10
);
const refreshTokenExpires = parseInt(
  process.env.REFRESH_TOKEN_EXPIRES || "1200",
  10
);

export const accessTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + accessTokenExpires * 60 * 60 * 1000),
  maxAge: accessTokenExpires * 60 * 60 * 1000,
  httpOnly: true,
  // sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

export const refreshTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + refreshTokenExpires * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpires * 24 * 60 * 60 * 1000,
  httpOnly: true,
  // sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};



export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();
   
  const userObj = user.toObject?.() || { ...user };
  delete (userObj as any).password;

  redis.set(user._id, JSON.stringify(userObj) as any); 

  res.status(statusCode)
    .cookie("access_Token", accessToken, accessTokenOptions)
    .cookie("refresh_Token", refreshToken, refreshTokenOptions)
    .json({ success: true, user:userObj, accessToken });
    
};





