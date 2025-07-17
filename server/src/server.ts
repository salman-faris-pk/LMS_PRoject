import "dotenv/config"
import { app } from "./app.js"
import connectDB from "./lib/db.js";
import { connectRedis } from "./lib/redis.js";
import { v2 as cloudinary } from "cloudinary"



cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
});


app.listen(process.env.PORT, ()=>{
   console.log(`Server connected with port ${process.env.PORT}`);
   initServices();
});    

async function initServices() {
  try {
   await connectDB();
   await connectRedis();
  } catch (err) {
    process.exit(1);
  }
}