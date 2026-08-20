import { describe, expect, it } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('Projects API Security', () => {
  it('should reject unauthenticated GET /api/v1/projects with 401', async () => {
    const response = await request(app).get('/api/v1/projects');

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe('AUTHENTICATION_REQUIRED');
  });

  it('should reject invalid Bearer token with 401', async () => {
    const response = await request(app)
      .get('/api/v1/projects')
      .set('Authorization', 'Bearer invalid-token-123');

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe('INVALID_ACCESS_TOKEN');
  });

  it('should reject unauthenticated POST /api/v1/projects with 401', async () => {
    const response = await request(app).post('/api/v1/projects').send({
      name: 'Project Test',
      code: 'PRJ-TEST',
      clientId: 'cli-1',
    });

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe('AUTHENTICATION_REQUIRED');
  });
});
