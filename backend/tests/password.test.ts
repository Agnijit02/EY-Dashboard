import { describe, expect, it } from 'vitest';
import { comparePassword, hashPassword } from '../src/utils/password';

describe('Password Hashing Utility', () => {
  it('should hash a password and verify comparison', async () => {
    const rawPassword = 'SecurePassword123!';
    const hash = await hashPassword(rawPassword);

    expect(typeof hash).toBe('string');
    expect(hash.startsWith('$2b$12$')).toBe(true);

    const isMatch = await comparePassword(rawPassword, hash);
    expect(isMatch).toBe(true);

    const isWrong = await comparePassword('WrongPassword123!', hash);
    expect(isWrong).toBe(false);
  });
});
