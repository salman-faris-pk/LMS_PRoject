import {Request,Response,NextFunction } from "express";
import { catchAsyncErrors } from "../middleware/catchAsynErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { generateLast12MonthsData } from "../utils/analytic.generator.js";
import userModel from "../models/user.model.js";
import CourseModel from "../models/course.model.js";
import OrderModel from "../models/order.model.js";




export const getUserAnalytic=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const usersData= await generateLast12MonthsData(userModel);

        res.status(200).json({
         success:true,
         usersData
        });
        
    } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
    }
});


export const getCourseAnalytic=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const courseData= await generateLast12MonthsData(CourseModel);

        res.status(200).json({
         success:true,
         courseData
        });
        
    } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
    }
});

export const getOrderAnalytic=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const orderData= await generateLast12MonthsData(OrderModel);

        res.status(200).json({
         success:true,
         orderData
        });
        
    } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
    }
});