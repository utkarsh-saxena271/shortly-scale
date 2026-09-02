import rateLimiter from "../middlewares/rateLimiter.middleware.js";
import type { Request } from "express";

const TIER_LIMITS: Record<'FREE' | 'PRO', number> = {
    FREE: 20,
    PRO: 200,
};

export const ipRateLimiter = rateLimiter({
    windowMs: 60_000,
    keyPrefix: 'ip',
    getKey: (req: Request) => req.ip ?? 'unknown',
    getLimit: () => 20,
});

export const apiKeyRateLimiter = rateLimiter({
    windowMs: 60_000,
    keyPrefix: 'apikey',
    getKey: (req: Request) => req.apiKeyId ?? 'unknown',
    getLimit: (req: Request) => TIER_LIMITS[req.apiKeyTier ?? 'FREE'],
});