import express from 'express'
import client from './config/redis.config.js'
import envConfig from './config/env.config.js';

import mainRouter from './routes/main.routes.js';
import redirectRouter from './routes/redirect.route.js';
import errorHandler from './middlewares/error.middleware.js';



const app = express();
const PORT = envConfig.PORT 

app.use(express.json())

app.use('/api', mainRouter)
app.use('/', redirectRouter)


app.use(errorHandler)

const main = async () => {
    try {
        await client.connect()
        await client.set('idpool:counter', '238328', { NX: true });
        app.listen(PORT, () => {
            console.log(`Server is running on PORT : ${PORT}`)
        })
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

main()