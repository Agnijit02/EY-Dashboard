import type { RequestHandler } from 'express';
import type { UserRole } from '@prisma/client';
import { ApiError } from '../utils/ApiError';

export function authorize(...allowedRoles: UserRole[]): RequestHandler {
  return (req, _res, next) => {
    if (!req.user) {
      next(new ApiError(401, 'Authentication required', 'AUTHENTICATION_REQUIRED'));
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      next(
        new ApiError(
          403,
          `Forbidden: Action requires one of the following roles: [${allowedRoles.join(', ')}]`,
          'INSUFFICIENT_PERMISSIONS',
        ),
      );
      return;
    }

    next();
  };
}
