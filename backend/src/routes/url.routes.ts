import { Router } from "express";
import validate from "../middlewares/validate.middleware";
import { shortenUrlValidator } from "../validators/url.validators";
import { shortenUrlController } from "../controllers/url.controllers";

const urlRouter = Router()


urlRouter.post('/shorten', validate(shortenUrlValidator), shortenUrlController)

export default urlRouter