import { describe, expect, it } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('Health API', () => {
  it('should return 200 and healthy service payload', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.status).toBe('healthy');
    expect(response.body.data.service).toBe('ey-enterprise-api');
    expect(typeof response.body.data.timestamp).toBe('string');
  });

  it('should attach x-request-id header to response', async () => {
    const response = await request(app).get('/health');

    expect(response.headers['x-request-id']).toBeDefined();
    expect(typeof response.headers['x-request-id']).toBe('string');
  });
});
