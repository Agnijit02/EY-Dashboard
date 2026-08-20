import { describe, expect, it } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import { createAccessToken } from '../src/utils/jwt';

describe('RBAC Authorization Middleware', () => {
  const viewerToken = createAccessToken('usr-viewer-1', 'VIEWER');
  const managerToken = createAccessToken('usr-manager-1', 'MANAGER');

  it('should reject VIEWER from deleting projects with 403 INSUFFICIENT_PERMISSIONS', async () => {
    const response = await request(app)
      .delete('/api/v1/projects/prj-123')
      .set('Authorization', `Bearer ${viewerToken}`);

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe('INSUFFICIENT_PERMISSIONS');
  });

  it('should reject MANAGER from deleting projects with 403 (ADMIN only)', async () => {
    const response = await request(app)
      .delete('/api/v1/projects/prj-123')
      .set('Authorization', `Bearer ${managerToken}`);

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe('INSUFFICIENT_PERMISSIONS');
  });

  it('should reject VIEWER from creating clients with 403', async () => {
    const response = await request(app)
      .post('/api/v1/clients')
      .set('Authorization', `Bearer ${viewerToken}`)
      .send({
        name: 'New Client',
      });

    expect(response.status).toBe(403);
    expect(response.body.error.code).toBe('INSUFFICIENT_PERMISSIONS');
  });
});
