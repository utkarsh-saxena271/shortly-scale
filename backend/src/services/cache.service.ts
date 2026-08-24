import client from "../config/redis.config"

interface SetUrl {
    shortCode: string,
    originalUrl: string,
    ttlSeconds: number
}
const cacheKey = (shortCode:string) => `url:cache:${shortCode}`

export const setCachedUrl = async (data: SetUrl) => {
    try {
        await client.set(cacheKey(data.shortCode), data.originalUrl,{
            'EX':data.ttlSeconds
        })
    } catch (error) {
        console.error(error)
    }   
}
export const getCachedUrl = async (shortCode:string) => {
    try {
        const res = await client.get(cacheKey(shortCode))
        return res
    } catch (error) {
        console.error(error)
        return null
    }   
}