import "dotenv/config"
import express,{Application,NextFunction,Request,Response} from "express"
export const app:Application=express();
import cors from "cors"
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { ErrorMiddleware } from "./middleware/error.js";
import userRouter from "./routes/user.route.js"



app.use(express.json({limit: "50mb"}));
app.use(cookieParser());
app.use(helmet({
    contentSecurityPolicy:false,
    crossOriginEmbedderPolicy: false,
}));

app.use(cors({
    origin: process.env.ORIGIN
}));


app.use("/api/v1",userRouter)


app.use(ErrorMiddleware);

app.get("/test", (req:Request,res:Response,next:NextFunction)=> {
    res.send("hello world")
});

