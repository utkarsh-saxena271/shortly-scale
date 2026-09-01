import { Router } from "express";
import urlRouter from "./url.routes.js";
import apiKeyRouter from "./apiKey.routes.js";


const mainRouter = Router()


mainRouter.use('/health',(req,res) => {
    res.send('running')
})

mainRouter.use('/url', urlRouter)
mainRouter.use('/apiKey', apiKeyRouter)



export default mainRouter