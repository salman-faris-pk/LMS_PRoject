import express from "express"
import { isAuthenticated,authorizeRoles } from "../middleware/auth.js";
import { uploadCourse } from "../controllers/course.controller.js";
const courseRouter=express.Router();


courseRouter.post("/create-course",isAuthenticated,authorizeRoles('admin'),uploadCourse)


export default courseRouter;

