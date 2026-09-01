import crypto from 'crypto'
import { insertApiKeyToDB } from '../repository/apiKey.repository.js'
interface Tier{
    tier : 'FREE' | 'PRO'
}

export const generateApiKeyService = async (data:Tier) => {
    const rawApiKey = `sk_${crypto.randomBytes(32).toString('hex')}`
    const hashedApiKey = crypto.createHash('sha256').update(rawApiKey).digest('hex')

    const apiKey = await insertApiKeyToDB({hashedKey:hashedApiKey, tier:data.tier})

    return {
        id: apiKey.id,
        apiKey : rawApiKey,
        tier:apiKey.tier,
        createdAt: apiKey.createdAt
    }
}