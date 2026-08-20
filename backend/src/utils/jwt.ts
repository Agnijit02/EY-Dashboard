import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';
import type { UserRole } from '@prisma/client';

export interface AccessTokenPayload {
  sub: string;
  role: UserRole;
  type: 'access';
}

export interface RefreshTokenPayload {
  sub: string;
  type: 'refresh';
}

export function createAccessToken(userId: string, role: UserRole): string {
  const options: SignOptions = {
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN as any,
  };
  return jwt.sign(
    {
      sub: userId,
      role,
      type: 'access',
    },
    env.JWT_ACCESS_SECRET,
    options,
  );
}

export function createRefreshToken(userId: string): string {
  const options: SignOptions = {
    expiresIn: env.REFRESH_TOKEN_EXPIRES_IN as any,
  };
  return jwt.sign(
    {
      sub: userId,
      type: 'refresh',
    },
    env.JWT_REFRESH_SECRET,
    options,
  );
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload;
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as RefreshTokenPayload;
}
