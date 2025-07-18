import { Response } from "express";
import CourseModel from "../models/course.model.js";
import { catchAsyncErrors } from "../middleware/catchAsynErrors.js"
import { redis } from "../lib/redis.js";


export const createCourse=catchAsyncErrors(async(data:any,res:Response) => {
    
     const course = await CourseModel.create(data);

     await redis.set(`course:${course._id}`, JSON.stringify(course) as any, 'EX',3600)

     res.status(201).json({
        succes:true,
        course
     });

});