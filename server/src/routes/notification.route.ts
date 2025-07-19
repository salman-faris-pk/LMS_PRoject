import express from "express";
import { isAuthenticated,authorizeRoles } from "../middleware/auth.js";
import { getNotification,updateNotification } from "../controllers/notification.controller.js";
const notificationRouter=express.Router();


notificationRouter.get("/get-all-notifications",isAuthenticated,authorizeRoles('admin'),getNotification);
notificationRouter.put("/update-notification/:id",isAuthenticated,authorizeRoles('admin'),updateNotification);

    

export default notificationRouter;