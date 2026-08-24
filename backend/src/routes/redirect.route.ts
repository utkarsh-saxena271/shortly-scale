import { Router } from "express";

const redirectRouter = Router()

redirectRouter.get('/:code')

export default redirectRouter;