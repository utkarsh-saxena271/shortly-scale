import { Router } from "express";
import validate from "../middlewares/validate.middleware.js";
import { shortenUrlValidator } from "../validators/url.validators.js";
import { shortenUrlController } from "../controllers/url.controller.js";
import rateLimiter from "../middlewares/rateLimiter.middleware.js";

const urlRouter = Router()


urlRouter.post('/shorten', rateLimiter, validate(shortenUrlValidator), shortenUrlController)

export default urlRouter