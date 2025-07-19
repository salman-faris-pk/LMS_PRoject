import {NextFunction,Response,Request} from "express"
import {catchAsyncErrors} from "../middleware/catchAsynErrors.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import OrderModel,{ IOrder } from "../models/order.model.js";
import userModel from "../models/user.model.js";
import CourseModel from "../models/course.model.js";
import { getAllOrderService, newOrder } from "../services/order.service.js";
import sendMail from "../lib/sendMail.js";
import NotificationModel from "../models/notification.model.js";





export const createOrder=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const {courseId,payment_info}=req.body as IOrder;

        const user= await userModel.findById(req.user?.id);

        const courseExistsInuser =user?.courses.some((course:any) =>  course._id.toString() === courseId);

        if(!courseExistsInuser){
            return next(new ErrorHandler("You have already purchase this course",400))
        };

        const course=await CourseModel.findById(courseId);
        if(!course){
            return next(new ErrorHandler("course not found",404))
        };

        const data:any={
            courseId:course._id,
            userId: user?._id,
            payment_info
        };
       

         const mailData={
            order: {
                _id: (course._id as string).slice(0,6),
                name: course.name,
                price: course.price,
                date:new Date().toLocaleDateString('en-Us',{year:'numeric' , month:'long', day:'numeric'})
            }
         };

         try {
            if(user){
               await sendMail({
                email: user?.email,
                subject:"Order confirmation",
                template:"order.confirmation.ejs",
                data: mailData
               })
            }
         } catch (error:any) {
            return next(new ErrorHandler(error.message,500))
         };

         user?.courses.push({ courseId: course._id as string });

        await user?.save();

          await NotificationModel.create({
            user: user?._id,
            title:'New Order',
            message:`You have a new  Order from ${course?.name}`
        });


        course.purchased ? course.purchased += 1 : course.purchased;

        await course.save();

         newOrder(data,res,next);
         
    } catch (error:any) {
        return next(new ErrorHandler(error.message,500));
    }
});

export const GetAllOrders=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction)=>{
   try {
     getAllOrderService(res);
   } catch (error:any) {
      return next(new ErrorHandler(error.message, 400)) 
      
   }
});

