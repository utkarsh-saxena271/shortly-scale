import { getRedirectUrlFromDB } from "../repository/url.repository.js"
import ApiError from "../utils/apiError.util.js"
import { getCachedUrl, setCachedUrl } from "./cache.service.js"

export const redirectUrlService = async (shortCode : string) => {
    const url = await getCachedUrl(shortCode)
    // cache hit
    if(url){
        return url
    }

    // cache miss
    const redirectUrlFromDB = await getRedirectUrlFromDB(shortCode)

    if(!redirectUrlFromDB) throw new ApiError(404, 'Url not found')
    // set cache
    const cacheData = {
        shortCode,
        originalUrl:redirectUrlFromDB.originalUrl,
        ttlSeconds: 60 * 60
    }
    await setCachedUrl(cacheData)

    return redirectUrlFromDB.originalUrl
}