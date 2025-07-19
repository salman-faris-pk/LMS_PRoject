import { NextFunction,Response} from "express";
import { catchAsyncErrors } from "../middleware/catchAsynErrors.js";
import OrderModel from "../models/order.model.js";


export const newOrder=catchAsyncErrors(async(data:any,res:Response,next:NextFunction) => {
    const order=await OrderModel.create(data);
      res.status(201).json({
            success: true,
            order: order
        });
});

export const getAllOrderService = async(res:Response) => {
    const orders=await OrderModel.find().sort({createdAt: -1});

    res.status(201).json({
      success:true,
      orders
    });
};