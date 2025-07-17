import "dotenv/config";
import { Redis } from "ioredis";

let redis: Redis;
 
export const connectRedis = async() => {

  redis = new Redis(process.env.REDIS_URL!);

  redis.on("ready", () => {
    console.log("Redis is connected!");
  });

  redis.on("error", (err: any) => {
    console.error("Redis error:", err);
  }); 
};

export { redis };
 