import prisma from "../config/db.config";
import envConfig from "../config/env.config";
interface ShortenInsert {
    id: bigint,
    originalUrl: string,
    shortCode: string
}

export const insertShortCodeToDB = async (data:ShortenInsert) => {
    const {id, originalUrl, shortCode} = data
    const urlData = await prisma.url.create({
        data: {
            id, originalUrl, shortCode
        }
    })
    return urlData
} 