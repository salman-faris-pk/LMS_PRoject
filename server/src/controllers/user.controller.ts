import "dotenv/config"
import userModel, { IUser } from "../models/user.model.js";
import {Request,Response,NextFunction} from "express"
import ErrorHandler from "../utils/ErrorHandler.js";
import { catchAsyncErrors } from "../middleware/catchAsynErrors.js"
import sendMail from "../lib/sendMail.js";
import { createActivationToken } from "../utils/GenerateActivationCode.js";
import jwt, { JwtPayload } from "jsonwebtoken"
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/SendTokens.js";
import { redis } from "../lib/redis.js";
import { getAllUsersService, getUserById, updateRoleservice } from "../services/user.service.js";
import { v2 as cloudinary } from "cloudinary"


interface IRegisterationBody{
    name: string;
    email: string;
    password: string;
    avatar?:string;
};


export const registrationUser = catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) => {
     try {
        const {name,email,password}=req.body;

        const isEmailExist = await userModel.findOne({email});
        if(isEmailExist){
            return new ErrorHandler('Email already exist',400)
        };

        const user:IRegisterationBody={
            name,
            email,
            password
        };

        const { activationcode,token }=createActivationToken(user);
      
        const data = {user: {name:user.name}, activationcode};
              
       try {
          await sendMail({
            email: user.email,
            subject: "Activate your account",
            template: "activation-mail.ejs",
            data,
          });

          res.status(201).json({
            success: true,
            message:`Please check your email: ${user.email} to activate your account`,
            activationToken: token
          })
       } catch (error:any) {
          return  next(new ErrorHandler(error.message, 400))
       };

     } catch (error:any) {
        return next(new ErrorHandler(error.message,400))
     }
});



interface IActivationRequest{
   activation_token: string;
   activation_code: string;
};

export const activateUser=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) => {
      try {
         const { activation_code,activation_token }=req.body as IActivationRequest;
          
         const {user,activationcode}= jwt.verify(
            activation_token, 
            process.env.ACTIVATION_SECRET as string
         )as {user: IUser,  activationcode: string};


          if(activationcode !== activation_code){
            return next(new ErrorHandler("Invalid activation code",400))
          };

          const {name,email,password}=user;
           
          const existEmail=await userModel.findOne({email}); 
           if(existEmail){
            return next(new ErrorHandler("email already exists,Try another!",400))
          };

          await userModel.create({
              name,
              email,
              password
          });
          
          res.status(201).json({
            success:true
          });
          
      } catch (error:any) {
         return next(new ErrorHandler(error.message, 400))
      }
});



interface ILoginRequest{
   email: string;
   password: string;
};


export const loginUser=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) => {
     try {
      const {email,password}=req.body as ILoginRequest;

      if(!email || !password){
         return next(new ErrorHandler("Please enter email and password",400))
      };

      const user= await userModel.findOne({email}).select('+password');
      if(!user){
         return next(new ErrorHandler("Invalid email and password",400))
      };

      const isPassowordMatch= await user.comparePassword(password);
      if(!isPassowordMatch){
         return next(new ErrorHandler("Invalid email and password",400))
      };
       
       sendToken(user,200,res);

     } catch (error:any) {
      return next(new ErrorHandler(error.message, 400))
     }
});

export const logoutUser=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) => {
   try {
      res.cookie("access_Token","", {maxAge: 1});
      res.cookie("refresh_Token","", {maxAge: 1});
       
      const userId=req.user?._id || ""; 
      await redis.del(userId)
      
      res.status(200).json({
         success:true,
         message: 'Logout succesfull'
      });

      
   } catch (error:any) {
      return next(new ErrorHandler(error.message, 400))
   }
});



//update accesstoken with refreshToken and generate new both tokens
export const updateAccessToken =catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) => {

   try {
       const refresh_token=req.cookies.refresh_Token as string;

       if(!refresh_token){
         return next(new ErrorHandler('could not find refresh token,please login again',400))
       };

       const decoded=jwt.verify(refresh_token,process.env.REFRESH_TOKEN!) as JwtPayload;

       if(!decoded){
         return next(new ErrorHandler('refresh token expires,please login again',400))
       };

       const session=await redis.get(decoded.id as string);

       if(!session){
         return next(new ErrorHandler('please login again,refresh token expires',400))
       };

       const user=JSON.parse(session);

       const accessToken= jwt.sign({id: user._id}, process.env.ACCESS_TOKEN! , {
         expiresIn: '5m'
       });
       const refreshToken= jwt.sign({id: user._id}, process.env.REFRESH_TOKEN! , {
         expiresIn: '5d'
       });
        
         req.user=user;

        res.cookie('access_Token',accessToken,accessTokenOptions)
        res.cookie('refresh_Token',refreshToken,refreshTokenOptions)

        res.status(200).json({
          success:true,
          accessToken
        });

   } catch (error:any) {
      return next(new ErrorHandler(error.message, 400))
   }

});


export const getUserInfo= catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) => {
    try {
      const userId=req.user?._id || "";
      await getUserById(userId,res,next)
      
    } catch (error:any) {
      return next(new ErrorHandler(error.message, 400))
    }
});



interface IsocialAuthBody{
   email:string;
   name:string;
   avatar:string;
};

export const socialAuth =catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) => {
    try {
      const {email,name,avatar}=req.body as IsocialAuthBody;
      const user=await userModel.findOne({email});

      if(!user){
         const newUser=await userModel.create({
            name,email,avatar
         });
         sendToken(newUser,200,res)
      }else{
         sendToken(user,200,res)
      };

    } catch (error:any) {
      return next(new ErrorHandler(error.message, 400))
    }
});



interface IUpdateUserInfo{
   name?:string;
   email?: string;
};

export const UpdateUserInfo =catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) => {
    try {
      const {email,name}=req.body as IUpdateUserInfo;

      const userId=req.user?._id || "";
      const user=await userModel.findById(userId);
      if(!user){
       return next(new ErrorHandler("user not found", 400))
      };

      if(email && user){
        const isEmailExist=await userModel.findOne({email});
         if(isEmailExist){
            return next(new ErrorHandler("You entered your existing email. Try another.", 400))
         };

         user.email=email;
      };

      if(name && user){
         user.name= name;
      };

      await user?.save();

      await redis.set(userId, JSON.stringify(user));

      res.status(201).json({
         success:true,
         user
      });
      
    } catch (error:any) {
      return next(new ErrorHandler(error.message, 400))
    }
});



interface IUpdatePassword{
   oldpassword:string;
   newpassword: string;
};

export const UpdatePassword=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) => {
   try {
      const userId=req.user?._id || "";
      const {oldpassword,newpassword}=req.body as IUpdatePassword;

      if(!oldpassword || !newpassword){
          return next(new ErrorHandler('Please enter old and new passwords',400))
      };

      const user=await userModel.findById(userId).select("+password");
      
      if(user?.password === undefined){
          return next(new ErrorHandler('Invalid user',400))
      };

      const isPasswordMatch=await user?.comparePassword(oldpassword);
      if(!isPasswordMatch){
          return next(new ErrorHandler('Invalid old password',400))
      };

      user.password=newpassword;

      await user.save();

      await redis.set(userId, JSON.stringify(user))

      res.status(201).json({
         success:true,
         user
      });
      
   } catch (error:any) {
      return next(new ErrorHandler(error.message, 400)) 
   }
});



interface IupdateProfile{
   avatar:string;
};

export const updateProfieleAvatar = catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) => {
    try {
      const { avatar }=req.body as IupdateProfile;
      
      const userId=req.user?._id || "";

      const user=await userModel.findById(userId);

      if(!user){
        return next(new ErrorHandler('User not found',404))
      };

      if(avatar && user){

         if(user?.avatar?.public_id){
          //if alreadya pic, then delete the old image and then upload new one
         await cloudinary.uploader.destroy(user?.avatar?.public_id)

          const Mycloud=await cloudinary.uploader.upload(avatar, {
            folder:'avatars',
            widthL:150
         });

         user.avatar ={
            public_id:Mycloud.public_id,
            url: Mycloud.secure_url
         };

         
      }else{
         // If no existing profile picture, just upload the new one
         const Mycloud=await cloudinary.uploader.upload(avatar, {
            folder:'avatars',
            widthL:150
         });

          user.avatar ={
            public_id:Mycloud.public_id,
            url: Mycloud.secure_url
         };

      };

   };

         await user.save();
         
         await redis.set(userId,JSON.stringify(user));

         res.status(200).json({
            success:true,
            user
         });

    } catch (error:any) {
      return next(new ErrorHandler(error.message, 400)) 
    }
});


export const GetAllUsers=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction)=>{
   try {

       getAllUsersService(res)
   } catch (error:any) {
      return next(new ErrorHandler(error.message, 400)) 
      
   }
});

//by admin
export const updateUserRoles=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction)=>{
   try {
      const {id,role}=req.body;
      updateRoleservice(res,id,role)
   } catch (error:any) {
      return next(new ErrorHandler(error.message, 400)) 
      
   }
});

export const deletUser=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction)=>{
   try {
      const { id }=req.params ;
      const user=await userModel.findById(id);
      if(!user){
        return next(new ErrorHandler('User not found',404))
      };

      await user.deleteOne({id});

      await redis.del(id as string);

       return res.status(200).json({
        success: true,
         message:"user deleted successfully"
         });
   } catch (error:any) {
      return next(new ErrorHandler(error.message, 400)) 
      
   }
})