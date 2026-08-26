import type { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError.util.js";

interface ErrorResponseBody {
  success: false;
  message: string;
  errors: any[];
}

const errorHandler = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;

  // Only log full errors for unexpected server-side failures.
  // 4xx (rate limit, validation, not found) are expected outcomes, not bugs — don't spam logs with their stack traces.
  if (statusCode >= 500) {
    console.error(err);
  }

  const message = err instanceof ApiError ? err.message : "Internal Server Error";
  const errors = err instanceof ApiError ? err.errors : [];

  const body: ErrorResponseBody = { success: false, message, errors };

  res.status(statusCode).json(body);
};

export default errorHandler;