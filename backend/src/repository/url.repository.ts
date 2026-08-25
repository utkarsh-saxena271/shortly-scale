import prisma from "../config/db.config.js";
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

export const getRedirectUrlFromDB = async (shortCode:string) => {
    const urlData = await prisma.url.findUnique({
        where:{
            shortCode
        }
    })
    return urlData
}