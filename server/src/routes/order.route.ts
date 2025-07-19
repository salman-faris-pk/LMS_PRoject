import express from "express"
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import { createOrder,GetAllOrders } from "../controllers/order.controller.js";
const orderRouter=express.Router();


orderRouter.post("/order-creation",isAuthenticated,createOrder);
orderRouter.get('/get-orders',isAuthenticated,authorizeRoles('admin'),GetAllOrders)


export default orderRouter;