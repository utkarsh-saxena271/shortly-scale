import prisma from "../config/db.config.js"

interface APICreate {
    hashedKey : string,
    tier : 'FREE' | 'PRO'
}

export const insertApiKeyToDB = async (data:APICreate) => {
    const {hashedKey, tier} = data
    const apiKey = await prisma.apiKey.create({
        data:{
            hashedKey,
            tier
        }
    })

    return apiKey;
}

export const findApiKeyByHash = async (hashedKey:string) => {
    const apiKey = await prisma.apiKey.findUnique({
        where:{
            hashedKey
        }
    })

    return apiKey;
}