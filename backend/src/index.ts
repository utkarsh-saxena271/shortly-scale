import express from 'express'
import client from './config/redis.config'
import envConfig from './config/env.config';

import mainRouter from './routes/main.routes';
import redirectRouter from './routes/redirect.route';



const app = express();
const PORT = envConfig.PORT 

app.use(express.json())

app.use('/api', mainRouter)
app.use('/', redirectRouter)


const main = async () => {
    try {
        await client.connect()
        app.listen(PORT, () => {
            console.log(`Server is running on PORT : ${PORT}`)
        })
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

main()