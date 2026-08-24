import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.util";
import { shortenUrlService } from "../services/url.services";
import ApiResponse from "../utils/apiResponse.util";

export const shortenUrlController = asyncHandler(async (req:Request, res:Response) => {
    const {originalUrl} = req.body
    const data = await shortenUrlService(originalUrl)

    return res.status(201).json(
        new ApiResponse(201, data, 'Url shortened successfully')
    )
})