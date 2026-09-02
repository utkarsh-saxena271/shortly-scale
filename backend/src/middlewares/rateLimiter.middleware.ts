import type { Request, Response, NextFunction } from "express";
import client from "../config/redis.config.js";
import ApiError from "../utils/apiError.util.js";

interface RateLimiterConfig {
    windowMs: number;
    keyPrefix: string;
    getKey: (req: Request) => string;
    getLimit: (req: Request) => number;
}

const rateLimiter = (config: RateLimiterConfig) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        try {
            const identifier = config.getKey(req);
            const key = `ratelimit:${config.keyPrefix}:${identifier}`;
            const limit = config.getLimit(req);

            const now = Date.now();
            const windowStart = now - config.windowMs;
            const uniqueMember = `${now}-${Math.random()}`;

            const results = await client
                .multi()
                .zRemRangeByScore(key, 0, windowStart)
                .zAdd(key, { score: now, value: uniqueMember })
                .zCard(key)
                .pExpire(key, config.windowMs)
                .exec();

            const count = Number(results[2]);

            if (count > limit) {
                throw new ApiError(429, "Too many requests, please try again later");
            }

            next();
        } catch (error) {
            if (error instanceof ApiError) {
                return next(error);
            }
            console.error("Rate limiter error:", error);
            next();
        }
    };
};

export default rateLimiter;