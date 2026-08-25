import type { Request, Response, NextFunction } from "express";
import client from "../config/redis.config.js";
import ApiError from "../utils/apiError.util.js";

const WINDOW_MS = 60 * 1000;   // 60 second window
const MAX_REQUESTS = 20;        // 20 requests per window per IP

const rateLimiter = async (req: Request, _res: Response, next: NextFunction) => {
    try {
        const key = `ratelimit:${req.ip}`;
        const now = Date.now();
        const windowStart = now - WINDOW_MS;

        const uniqueMember = `${now}-${Math.random()}`;

        const results = await client
            .multi()
            .zRemRangeByScore(key, 0, windowStart)   // drop old entries
            .zAdd(key, { score: now, value: uniqueMember }) // record this request
            .zCard(key)                               // count requests in window
            .pExpire(key, WINDOW_MS)                  // auto-cleanup if idle
            .exec();

        const count = Number(results[2]);

        if (count > MAX_REQUESTS) {
            throw new ApiError(429, "Too many requests, please try again later");
        }

        next();
    } catch (error) {
        if (error instanceof ApiError) {
            return next(error); // real rate-limit rejection, propagate
        }
        console.error("Rate limiter error:", error);
        next(); // fail open — Redis down shouldn't block all traffic
    }
};

export default rateLimiter;