import { Router } from "express";
import validate from "../middlewares/validate.middleware.js";
import { shortenUrlValidator } from "../validators/url.validators.js";
import { shortenUrlController } from "../controllers/url.controller.js";
import apiKeyAuthMiddleware from "../middlewares/apiKeyAuth.middleware.js";
import { apiKeyRateLimiter, ipRateLimiter } from "../config/rateLimiters.config.js";

const urlRouter = Router()


urlRouter.post('/shorten',apiKeyAuthMiddleware, ipRateLimiter, apiKeyRateLimiter, validate(shortenUrlValidator), shortenUrlController)

export default urlRouter