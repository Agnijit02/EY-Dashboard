import { describe, expect, it } from 'vitest';
import { createAccessToken, createRefreshToken, verifyAccessToken, verifyRefreshToken } from '../src/utils/jwt';

describe('JWT Utility', () => {
  const userId = 'usr-test-123';

  it('should generate and verify a valid access token', () => {
    const token = createAccessToken(userId, 'ADMIN');
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(20);

    const payload = verifyAccessToken(token);
    expect(payload.sub).toBe(userId);
    expect(payload.role).toBe('ADMIN');
    expect(payload.type).toBe('access');
  });

  it('should generate and verify a valid refresh token', () => {
    const token = createRefreshToken(userId);
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(20);

    const payload = verifyRefreshToken(token);
    expect(payload.sub).toBe(userId);
    expect(payload.type).toBe('refresh');
  });

  it('should reject invalid or malformed tokens', () => {
    expect(() => verifyAccessToken('invalid.token.here')).toThrow();
    expect(() => verifyRefreshToken('invalid.token.here')).toThrow();
  });
});
