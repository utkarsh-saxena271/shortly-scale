import { Router } from "express";
import urlRouter from "./url.routes";


const mainRouter = Router()


mainRouter.use('/health',(req,res) => {
    res.send('running')
})

mainRouter.use('/url', urlRouter)



export default mainRouter