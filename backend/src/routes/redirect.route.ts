import { Router } from "express";
import { redirectUrlController } from "../controllers/redirect.controller.js";
import { ipRateLimiter } from "../config/rateLimiters.config.js";

const redirectRouter = Router()

redirectRouter.get('/:shortCode', ipRateLimiter, redirectUrlController)

export default redirectRouter;