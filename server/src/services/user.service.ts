import { NextFunction, Response } from "express";
import userModel from "../models/user.model.js";
import { redis } from "../lib/redis.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const getUserById = async (id: string,res: Response,next: NextFunction) => {

  const userJson = await redis.get(id);
  if (userJson) {
    const user = JSON.parse(userJson);
    return res.status(200).json({
      success: true,
      user,
    });
  }
  const user = await userModel.findById(id);
  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  };

  await redis.set(id, JSON.stringify(user) as any);

  return res.status(200).json({
    success: true,
    user,
  });
  
};
