import envConfig from "../config/env.config.js"
import { insertShortCodeToDB } from "../repository/url.repository.js"
import { encodeUrl } from "../utils/base62.util.js"
import { scramble } from "../utils/scramble.util.js"
import { getNextId } from "./idPool.service.js"

export const shortenUrlService = async(originalUrl:string) => {
    const id = await getNextId()
    const scrambledId = scramble(id);
    const shortCode = encodeUrl(scrambledId)

    const urlData = await insertShortCodeToDB({id, originalUrl, shortCode})

    return {
        shortUrl: `${envConfig.BASE_URL}/${urlData.shortCode}`,
        shortCode: urlData.shortCode,
        originalUrl: urlData.originalUrl,
        createdAt: urlData.createdAt,
    }
}