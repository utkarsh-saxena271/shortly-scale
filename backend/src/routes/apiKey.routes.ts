import { Router } from "express";
import validate from "../middlewares/validate.middleware.js";
import { generateApiKeySchema } from "../validators/apiKey.validator.js";
import { generateApiKeyController } from "../controllers/apiKey.controller.js";
import { ipRateLimiter } from "../config/rateLimiters.config.js";

const apiKeyRouter = Router()

apiKeyRouter.post('/generate',ipRateLimiter, validate(generateApiKeySchema), generateApiKeyController)


export default apiKeyRouter