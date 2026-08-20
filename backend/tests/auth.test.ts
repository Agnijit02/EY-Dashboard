import { describe, expect, it } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('Authentication API', () => {
  it('should reject invalid login payload with 400 VALIDATION_ERROR', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'invalid-email-format',
        password: '123',
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('should reject empty login body with 400 VALIDATION_ERROR', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({});

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('should reject refresh without cookie or body with 401', async () => {
    const response = await request(app).post('/api/v1/auth/refresh').send({});

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe('REFRESH_TOKEN_REQUIRED');
  });
});
