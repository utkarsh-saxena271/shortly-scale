import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.util.js";
import { redirectUrlService } from "../services/redirect.service.js";
import ApiError from "../utils/apiError.util.js";

export const redirectUrlController = asyncHandler(async(req:Request, res:Response) => {
    const {shortCode} = req.params;
    if(!shortCode || typeof shortCode !== 'string'){
        throw new ApiError(400, 'shortCode is required')
    }
    const originalUrl = await redirectUrlService(shortCode)

    res.redirect(302, originalUrl);
})