import { Router } from "express";
import { redirectUrlController } from "../controllers/redirect.controller.js";
import rateLimiter from "../middlewares/rateLimiter.middleware.js";

const redirectRouter = Router()

redirectRouter.get('/:shortCode', rateLimiter, redirectUrlController)

export default redirectRouter;