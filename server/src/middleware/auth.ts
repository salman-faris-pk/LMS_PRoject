import { Request,Response,NextFunction} from "express"
import { catchAsyncErrors } from "./catchAsynErrors.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../lib/redis.js";

export const isAuthenticated=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) => {
         const access_token= req.cookies.access_Token;

         if(!access_token){
            return next(new ErrorHandler('Please login to access this resource',400))
         };

         const decoded = jwt.verify(access_token,process.env.ACCESS_TOKEN!) as JwtPayload;
           
         if(!decoded){
            return next(new ErrorHandler('Please login to access this resource',400))
         };
         
         const user= await redis.get(decoded.id);

         if(!user){
            return next(new ErrorHandler("user not found",400));
         };

         req.user= JSON.parse(user);

         next();
           
});


export const authorizeRoles =(...roles:string[]) => {
   return (req:Request,res:Response,next:NextFunction)=> {
          if(!roles.includes(req.user?.role || '')){     //if role not includes in authorized users role then shows this error
            return next(new ErrorHandler(`Role: ${req.user?.role} is not allowed to access this resource`,403))
          };

        //if the role includes in authorized users role then it calls next()     
          next();
   }
};