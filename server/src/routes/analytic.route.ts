import express from "express"
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import { getOrderAnalytic, getUserAnalytic,getCourseAnalytic } from "../controllers/analytic.controller.js";
const analyticRouter=express.Router();



analyticRouter.get('/get-users-analytics',isAuthenticated,authorizeRoles('admin'),getUserAnalytic);
analyticRouter.get('/get-course-analytics',isAuthenticated,authorizeRoles('admin'),getCourseAnalytic);
analyticRouter.get('/get-order-analytics',isAuthenticated,authorizeRoles('admin'),getOrderAnalytic);



export default getUserAnalytic;