import redis from 'redis'
import envConfig from './env.config'

const client = redis.createClient({
    url:envConfig.REDIS_URL
})

client.on('error', err => console.log('Redis Client Error', err));
client.on('connect', ()=>console.log('redis connected'))


export default client;