import type { ErrorRequestHandler } from 'express';
import { ApiError } from '../utils/ApiError';
import { logger } from '../config/logger';

export const errorMiddleware: ErrorRequestHandler = (error, req, res, _next) => {
  logger.error(
    {
      error,
      method: req.method,
      path: req.originalUrl,
    },
    'Request failed',
  );

  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
    });
    return;
  }

  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred.',
    },
  });
};
