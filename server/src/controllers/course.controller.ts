import { NextFunction,Request,Response } from "express"
import { catchAsyncErrors } from "../middleware/catchAsynErrors.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import { v2 as cloudinary } from "cloudinary"
import { createCourse, getAllCoursesService } from "../services/course.service.js";
import CourseModel from "../models/course.model.js";
import { redis } from "../lib/redis.js";
import mongoose from "mongoose";
import sendMail from "../lib/sendMail.js";
import NotificationModel from "../models/notification.model.js";



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


export const editCourse=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) => {
  try {
      const data=req.body;
      const courseId=req.params.id;
      const thumbnail=data.thumbnail;

      if(thumbnail){
        await cloudinary.uploader.destroy(thumbnail.public_id);
         
          const myCloud=await cloudinary.uploader.upload(thumbnail,{
                folder:"courses"
            });

            data.thumbnail={
                public_id:myCloud.public_id,
                url:myCloud.secure_url,
            }

      };

      const course = await CourseModel.findByIdAndUpdate(courseId,{
        $set: data },
        {new: true}
       );

       await redis.del(`Course:${courseId}`)
       await redis.del("AllCourses");

       res.status(201).json({
        success:true,
        course
       });

    
  } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
   }
});


//get single course --- everyone can access
export const getSingleCourse=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) => {
    try {
        const courseId=req.params.id;
        const CourseData=await redis.get(`Course:${courseId}`);
        if(CourseData){
            const course= JSON.parse(CourseData);
            res.status(200).json({
                success:true,
                course
            })
        }else{
        
         const course=await CourseModel.findById(courseId).select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links")

         res.status(200).json({
                success:true,
                course
          });
        }

    } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
    }
});



//everyone can access
export const getAllCourse =catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) => {
  try {

    const cachedCourses = await redis.get("AllCourses");

     if (cachedCourses) {
      const courses = JSON.parse(cachedCourses);
      return res.status(200).json({
        success: true,
        courses
      });

    }else{

    const courses=await CourseModel.find().select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links")

    await redis.set("AllCourses", JSON.stringify(courses), "EX", 3600); 

    res.status(200).json({
     success:true,
     courses
    });

    }
       
  } catch (error:any) {
    return next(new ErrorHandler(error.message,500))
  }
});


//get course content--- for valid user only
export const getCourseByUser=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) => {
   try {
       const userCourseList=req.user?.courses;
       const courseId=req.params.id;

       const courseExist=userCourseList?.find((course:any) => course._id.toString() === courseId);

       if(!courseExist){
          return next(new ErrorHandler('Your not eligible to access this course',404))
       };

    
       const course=await CourseModel.findById(courseId);
       const content=course?.courseData;

       res.status(200).json({
         success:true,
         content
       });

   } catch (error:any) {
    return next(new ErrorHandler(error.message,500))
   }
});



//course question

interface IAddQuestionData{
    question:string;
    courseId:string;
    contentId: string;
};

//onlu user can--
export const addQuestion = catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) => {
    try {
        const {contentId:coursedataID,courseId,question}=req.body as IAddQuestionData;

        if(!coursedataID || !courseId || !question){
            return next(new ErrorHandler("Missing required field",400))
        };

        const course=await CourseModel.findById(courseId);

        if(!mongoose.Types.ObjectId.isValid(coursedataID)){
            return next(new ErrorHandler("Invalid content id",400))
        };

        const courseContent= course?.courseData?.find((item:any) => item._id.equals(coursedataID));
        if(!courseContent){
            return next(new ErrorHandler("Invalid content id",400))
        };

        const newQuestion:any={
            user:req.user,
            question,
            questionReplies:[]
        };

        courseContent.questions.push(newQuestion);

         await NotificationModel.create({
            user: req.user?._id,
            title:'New Question recieved!',
            message:`You have a new question from ${courseContent?.title}`
        });

        await course?.save();

        res.status(200).json({
            success:true,
            course
        });

    } catch (error:any) {
       return next(new ErrorHandler(error.message,500))
    }
});


//add answer the question

interface IAddAsnwersData{
 answer:string;
 courseId:string;
 contentId:string;
 questionId:string;
};
export const Addanswer = catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) => {
   try {
      const {answer,contentId:coursedataID,courseId,questionId}=req.body as IAddAsnwersData;
        if(!answer || !coursedataID || !courseId || !questionId){
            return next(new ErrorHandler("Missing required field",400))
        };
         
        const course=await CourseModel.findById(courseId);

        if(!mongoose.Types.ObjectId.isValid(coursedataID)){
            return next(new ErrorHandler("Invalid content id",400))
        };

        const courseContent= course?.courseData?.find((item:any) => item._id.equals(coursedataID));
        if(!courseContent){
            return next(new ErrorHandler("Invalid content id",400))
        };

        const question =courseContent?.questions?.find((item:any) => item._id.equals(questionId));

        if(!question){
            return next(new ErrorHandler("Invalid question id",400));
        };

        const newAnswer:any ={
            user:req.user,
            answer
        };

        question.questionReplies?.push(newAnswer);

        await course?.save();

        if(req.user?._id === question.user._id){  //if user replies/answer to admins answer, then notification 
            await NotificationModel.create({
            user: req.user?._id,
            title:'New Question reply recieved!',
            message:`You have a new question reply from ${courseContent?.title}`
            });
             
        }else{
            //new answer/reply by admin to user then send a mail
            const data={
                name: question.user.name,
                title: courseContent.title
            };

            try {
                sendMail({
                    email:question.user?.email,
                    subject:"Question Relpy from E-Learn Course",
                    template:"question-reply.ejs",
                    data
                })
                
            } catch (error:any) {
                return next(new ErrorHandler(error.message,500))
            }
        };

        res.status(200).json({
          success:true,
          course
        });

   } catch (error:any) {
       return next(new ErrorHandler(error.message,500))
   }
});


//add review
interface IAddReviewData{
    review:string;
    rating: number;
    userId: string;
};
export const AddReview= catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) => {
  try {

    const userCourseList=req.user?.courses;
    const courseId=req.params.id;

    const courseExist=userCourseList?.some((course:any) => course._id.toString === courseId?.toString());
    if(!courseExist){
    return next(new ErrorHandler('You are not eligible to access this course',404));
    };
    
    const course= await CourseModel.findById(courseId);
    const {rating,review,userId}=req.body as IAddReviewData;
   

    const reviewData:any={
        user: req.user,
        comment:review,
        rating,
    };

    course?.reviews.push(reviewData);

    let avg=0;

    course?.reviews.forEach((rev:any) => {
        avg+= rev.rating;  // here avg is sum all rating values
    });

    if(course){
        course.ratings = avg / course.reviews.length;
    }

    await course?.save();

      //create a notification
         NotificationModel.create({
            user: req.user?._id,
            title:'New Review Received!',
            message:`${req.user?.name} has given a review on ${course?.name}`
            });

       res.status(200).json({
         success:true,
         course
       });

    
  } catch (error:any) {
    return next(new ErrorHandler(error.message,500));
  }
});

interface IReplyReviewdata{
    comment:string;
    courseId: string;
    reviewId: string;
}

export const addReplyToReview=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) => {
   try {
    const {comment,courseId,reviewId}=req.body as IReplyReviewdata;

    const course=await CourseModel.findById(courseId);
    if(!course){
     return next(new ErrorHandler("Course nor found",404));
    };

    const review=course?.reviews?.find((rev:any) => rev._id.toString() === reviewId);
     if(!review){
     return next(new ErrorHandler("review nor found",404));
    };

    const replyData:any={
        user:req.user,
        comment
    };
    if(!review.commentReplies){
        review.commentReplies=[];
    };
    
     review?.commentReplies?.push(replyData);
    await course.save();

     res.status(200).json({
       success:true,
       course
    });
    
   } catch (error:any) {
     return next(new ErrorHandler(error.message,500));
   }
});

export const GetAllCourses=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction)=>{
   try {
     getAllCoursesService(res);
   } catch (error:any) {
      return next(new ErrorHandler(error.message, 400)) 
      
   }
});



export const deletCourse=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction)=>{
   try {
      const { id }=req.params;
      const course=await CourseModel.findById(id);
      if(!course){
        return next(new ErrorHandler('course not found',404))
      };

      await course.deleteOne({id});
      await redis.del(`Course:${id}`)   

       return res.status(200).json({
        success: true,
         message:"course deleted successfully"
         });
   } catch (error:any) {
      return next(new ErrorHandler(error.message, 400)) 
      
   }
})