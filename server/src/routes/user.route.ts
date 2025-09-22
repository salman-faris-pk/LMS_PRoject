import express from "express"
import { registrationUser,activateUser,updateUserRoles,loginUser,GetAllUsers,logoutUser, updateAccessToken, getUserInfo, socialAuth,UpdateUserInfo, UpdatePassword, updateProfieleAvatar, deletUser } from "../controllers/user.controller.js"
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
const userRouter=express.Router();


userRouter.post("/registration", registrationUser)
userRouter.post('/activate-user',activateUser)
userRouter.post('/login',loginUser)
userRouter.get('/logout',isAuthenticated,logoutUser)
userRouter.get('/refresh-token',updateAccessToken)
userRouter.get('/me',isAuthenticated,getUserInfo)
userRouter.post('/social-auth',socialAuth)
userRouter.put('/update-user-info',isAuthenticated,UpdateUserInfo)
userRouter.put('/update-user-password',isAuthenticated,UpdatePassword)
userRouter.put("/update-user-avatar",isAuthenticated,updateProfieleAvatar)
userRouter.get('/get-users',isAuthenticated,authorizeRoles('admin'),GetAllUsers)
userRouter.put("/update-user-role",isAuthenticated,authorizeRoles('admin'),updateUserRoles)
userRouter.delete("/delete-user/:id",isAuthenticated,authorizeRoles('admin'),deletUser)


export default userRouter;