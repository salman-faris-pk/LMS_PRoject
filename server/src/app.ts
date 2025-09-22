import "dotenv/config"
import express,{Application,NextFunction,Request,Response} from "express"
export const app:Application=express();
import cors from "cors"
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { ErrorMiddleware } from "./middleware/error.js";
import userRouter from "./routes/user.route.js"
import courseRouter from "./routes/course.route.js";
import orderRouter from "./routes/order.route.js";
import notificationRouter from "./routes/notification.route.js";
import { getUserAnalytic } from "./controllers/analytic.controller.js";
import layoutRouter from "./routes/layout.route.js";



app.use(express.json({limit: "50mb"}));
app.use(cookieParser());
app.use(helmet({
    contentSecurityPolicy:false,
    crossOriginEmbedderPolicy: false,
}));

app.use(cors({
    origin:"http://localhost:4017",
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


app.use("/api/v1",userRouter,courseRouter,orderRouter,notificationRouter,getUserAnalytic,layoutRouter)


app.get("/test", (req:Request,res:Response,next:NextFunction)=> {
    res.send("hello world")
});


app.use(ErrorMiddleware);


