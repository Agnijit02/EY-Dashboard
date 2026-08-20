import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';
import { ApiError } from '../utils/ApiError';

export function validateBody(schema: ZodType): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      next(
        new ApiError(
          400,
          'Validation failed',
          'VALIDATION_ERROR',
          result.error.flatten().fieldErrors,
        ),
      );
      return;
    }

    req.body = result.data;
    next();
  };
}

export function validateQuery(schema: ZodType): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      next(
        new ApiError(
          400,
          'Invalid query parameters',
          'QUERY_VALIDATION_ERROR',
          result.error.flatten().fieldErrors,
        ),
      );
      return;
    }

    req.query = result.data as any;
    next();
  };
}
