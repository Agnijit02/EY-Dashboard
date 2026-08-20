import type { RequestHandler } from 'express';
import { ApiError } from '../utils/ApiError';
import { verifyAccessToken } from '../utils/jwt';

export const authenticate: RequestHandler = (req, _res, next) => {
  const authHeader = req.header('authorization');

  if (!authHeader?.startsWith('Bearer ')) {
    next(new ApiError(401, 'Authentication required', 'AUTHENTICATION_REQUIRED'));
    return;
  }

  const token = authHeader.substring(7).trim();

  try {
    const payload = verifyAccessToken(token);

    if (payload.type !== 'access') {
      next(new ApiError(401, 'Invalid token type', 'INVALID_ACCESS_TOKEN'));
      return;
    }

    req.user = {
      id: payload.sub,
      role: payload.role,
    };

    next();
  } catch {
    next(new ApiError(401, 'Invalid or expired access token', 'INVALID_ACCESS_TOKEN'));
  }
};
