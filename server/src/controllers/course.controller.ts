import { NextFunction,Request,Response } from "express"
import { catchAsyncErrors } from "../middleware/catchAsynErrors.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import { v2 as cloudinary } from "cloudinary"
import { createCourse } from "../services/course.service.js";




export const uploadCourse=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) => {
     try {
        const data=req.body;
        const thumbnail=data.thumbnail;
        if(thumbnail){
            const myCloud=await cloudinary.uploader.upload(thumbnail,{
                folder:"courses"
            });

            data.thumbnail={
                public_id:myCloud.public_id,
                url:myCloud.secure_url,
            }
        };

         createCourse(data,res,next);

     } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
     }
});
