import { Response } from "express";
import CourseModel from "../models/course.model.js";
import { catchAsyncErrors } from "../middleware/catchAsynErrors.js"
import { redis } from "../lib/redis.js";


export const createCourse=catchAsyncErrors(async(data:any,res:Response) => {
    
     const course = await CourseModel.create(data);

     await redis.del("AllCourses");

     res.status(201).json({
        succes:true,
        course
     });

});


export const getAllCoursesService=async(res:Response) =>{
       const courses=await CourseModel.find().sort({createdAt: -1});

    res.status(201).json({
      success:true,
      courses
    });
};