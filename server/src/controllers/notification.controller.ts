import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsynErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import NotificationModel from "../models/notification.model.js";
import cron from "node-cron"



export const getNotification=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const notifications=await NotificationModel.find().sort({createdAt: -1});

        res.status(201).json({
            success:true,
            notifications
        })

    } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
    }
});


export const updateNotification=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const notification=await NotificationModel.findById(req.params.id);
        if(!notification){
        return next(new ErrorHandler("notification not found",404))
        }else{
            notification.status ? notification.status = 'read' : notification?.status;
        };

        await notification.save();

        const notifications=await NotificationModel.find().sort({createdAt: -1});

         res.status(201).json({
            success:true,
            notifications
        });

        
    } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
    }
});


//delet-notification by cron

cron.schedule("0 0 0 * * *", async() => {
   const fourteenDays= new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
   await NotificationModel.deleteMany({status: 'read', createdAt: {$lt: fourteenDays}});
   console.log("Deleted all read message");
});