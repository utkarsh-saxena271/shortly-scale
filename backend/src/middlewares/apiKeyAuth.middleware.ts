import type { NextFunction, Request, Response } from "express";
import crypto from 'crypto'
import asyncHandler from "../utils/asyncHandler.util.js";
import ApiError from "../utils/apiError.util.js";
import { findApiKeyByHash } from "../repository/apiKey.repository.js";

const apiKeyAuthMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const authHeaders = req.headers['x-api-key'];

    if (!authHeaders || typeof authHeaders !== 'string') {
    throw new ApiError(401, "Unauthorized")
}

    const token = authHeaders
    if (!token) {
        throw new ApiError(401, "Unauthorized")
    }
    const hashedKey = crypto.createHash('sha256').update(token).digest('hex')
    const apiKeyRecord = await findApiKeyByHash(hashedKey)

    if(!apiKeyRecord){
        throw new ApiError(401, 'Wrong API key')
    }
    req.apiKeyId = apiKeyRecord.id
    req.apiKeyTier = apiKeyRecord.tier
    next()
})

export default apiKeyAuthMiddleware