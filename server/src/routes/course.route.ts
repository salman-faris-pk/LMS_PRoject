import express from "express"
import { isAuthenticated,authorizeRoles } from "../middleware/auth.js";
import { uploadCourse,editCourse, getSingleCourse, getAllCourse, getCourseByUser, addQuestion, Addanswer, AddReview, addReplyToReview } from "../controllers/course.controller.js";
const courseRouter=express.Router();



courseRouter.post("/create-course",isAuthenticated,authorizeRoles('admin'),uploadCourse)
courseRouter.put("/edit-course/:id",isAuthenticated,authorizeRoles('admin'),editCourse)
courseRouter.get('/get-course/:id',getSingleCourse)
courseRouter.get('/get-all-courses',getAllCourse)
courseRouter.get('/get-coursce-content/:id',isAuthenticated,getCourseByUser)
courseRouter.put('/add-question',isAuthenticated,addQuestion)
courseRouter.put('/add-answer',isAuthenticated,Addanswer)
courseRouter.put('/add-review/:id',isAuthenticated,AddReview)
courseRouter.put('/add-review',isAuthenticated,authorizeRoles('admin'),addReplyToReview)






export default courseRouter;

