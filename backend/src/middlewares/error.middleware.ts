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
  console.error(err);

  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err instanceof ApiError ? err.message : "Internal Server Error";
  const errors = err instanceof ApiError ? err.errors : [];

  const body: ErrorResponseBody = { success: false, message, errors };

  res.status(statusCode).json(body);
};

export default errorHandler;