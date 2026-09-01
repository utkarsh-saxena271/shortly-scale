import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.util.js";
import { generateApiKeyService } from "../services/apiKey.service.js";
import ApiResponse from "../utils/apiResponse.util.js";

export const generateApiKeyController = asyncHandler(async (req:Request, res:Response) => {
    const {tier} = req.body
    const apiKey = await generateApiKeyService({tier})

    return res.status(201).json(
        new ApiResponse(201, apiKey, 'Api key generated successfully')
    )
})