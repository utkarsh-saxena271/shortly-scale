import envConfig from "../config/env.config"
import { insertShortCodeToDB } from "../repository/url.repository"
import { encodeUrl } from "../utils/base62.util"
import { getNextId } from "./idPool.service"

export const shortenUrlService = async(originalUrl:string) => {
    const id = await getNextId()
    const shortCode = encodeUrl(id)

    const urlData = await insertShortCodeToDB({id, originalUrl, shortCode})

    return {
        shortUrl: `${envConfig.BASE_URL}/${urlData.shortCode}`,
        shortCode: urlData.shortCode,
        originalUrl: urlData.originalUrl,
        createdAt: urlData.createdAt,
    }
}