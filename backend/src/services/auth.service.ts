import { ApiError } from '../utils/ApiError';
import { comparePassword } from '../utils/password';
import { createAccessToken, createRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { hashToken } from '../utils/tokenHash';
import * as userRepository from '../repositories/user.repository';

export async function login(email: string, password: string) {
  const user = await userRepository.findUserByEmail(email);

  if (!user || !user.isActive) {
    throw new ApiError(401, 'Invalid email or password', 'INVALID_CREDENTIALS');
  }

  const valid = await comparePassword(password, user.passwordHash);
  if (!valid) {
    throw new ApiError(401, 'Invalid email or password', 'INVALID_CREDENTIALS');
  }

  await userRepository.updateLastLogin(user.id);

  const accessToken = createAccessToken(user.id, user.role);
  const refreshToken = createRefreshToken(user.id);

  await userRepository.createRefreshToken({
    tokenHash: hashToken(refreshToken),
    userId: user.id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

export async function refreshToken(rawRefreshToken: string) {
  if (!rawRefreshToken) {
    throw new ApiError(401, 'Refresh token required', 'REFRESH_TOKEN_REQUIRED');
  }

  let payload;
  try {
    payload = verifyRefreshToken(rawRefreshToken);
  } catch {
    throw new ApiError(401, 'Invalid or expired refresh token', 'INVALID_REFRESH_TOKEN');
  }

  const hashed = hashToken(rawRefreshToken);
  const storedToken = await userRepository.findRefreshToken(hashed);

  if (!storedToken) {
    throw new ApiError(401, 'Refresh token not found', 'INVALID_REFRESH_TOKEN');
  }

  if (storedToken.revokedAt || storedToken.expiresAt < new Date()) {
    // If token was already revoked, possible token theft attempt -> revoke all user sessions
    await userRepository.revokeAllUserTokens(payload.sub);
    throw new ApiError(401, 'Refresh token has been revoked or expired', 'TOKEN_REVOKED');
  }

  // Token rotation: Revoke current refresh token and issue new token pair
  await userRepository.revokeRefreshToken(storedToken.id);

  const user = storedToken.user;
  if (!user || !user.isActive) {
    throw new ApiError(401, 'User account is inactive', 'USER_INACTIVE');
  }

  const newAccessToken = createAccessToken(user.id, user.role);
  const newRefreshToken = createRefreshToken(user.id);

  await userRepository.createRefreshToken({
    tokenHash: hashToken(newRefreshToken),
    userId: user.id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

export async function logout(rawRefreshToken?: string) {
  if (rawRefreshToken) {
    const hashed = hashToken(rawRefreshToken);
    const storedToken = await userRepository.findRefreshToken(hashed);
    if (storedToken && !storedToken.revokedAt) {
      await userRepository.revokeRefreshToken(storedToken.id);
    }
  }
}

export async function getCurrentUser(userId: string) {
  const user = await userRepository.findUserById(userId);
  if (!user || !user.isActive) {
    throw new ApiError(404, 'User not found or inactive', 'USER_NOT_FOUND');
  }
  return user;
}
