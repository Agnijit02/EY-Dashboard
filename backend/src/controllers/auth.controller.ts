import type { CookieOptions, Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { createAuditLog } from '../services/audit.service';
import { env } from '../config/env';

const REFRESH_COOKIE_NAME = 'refreshToken';

const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/api/v1/auth',
};

export async function login(req: Request, res: Response) {
  const result = await authService.login(req.body.email, req.body.password);

  void createAuditLog({
    userId: result.user.id,
    action: 'LOGIN',
    entity: 'AUTH',
    metadata: { email: result.user.email, role: result.user.role },
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
  });

  res.cookie(REFRESH_COOKIE_NAME, result.refreshToken, COOKIE_OPTIONS);

  res.json({
    success: true,
    data: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
}

export async function refresh(req: Request, res: Response) {
  const rawToken = req.cookies?.[REFRESH_COOKIE_NAME] || req.body?.refreshToken;

  const result = await authService.refreshToken(rawToken);

  res.cookie(REFRESH_COOKIE_NAME, result.refreshToken, COOKIE_OPTIONS);

  res.json({
    success: true,
    data: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
}

export async function logout(req: Request, res: Response) {
  const rawToken = req.cookies?.[REFRESH_COOKIE_NAME] || req.body?.refreshToken;

  await authService.logout(rawToken);

  void createAuditLog({
    userId: req.user?.id,
    action: 'LOGOUT',
    entity: 'AUTH',
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
  });

  res.clearCookie(REFRESH_COOKIE_NAME, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/api/v1/auth',
  });

  res.json({
    success: true,
    message: 'Logged out successfully',
  });
}

export async function getMe(req: Request, res: Response) {
  const user = await authService.getCurrentUser(req.user!.id);

  res.json({
    success: true,
    data: user,
  });
}
