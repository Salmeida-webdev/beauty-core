import request = require('supertest');

import { bootstrapE2eTestApp, E2eContext, teardownE2eTestApp } from '../setup-e2e';
import { bearer, loginAdmin } from '../helpers/auth.helper';

describe('Health E2E', () => {
  let ctx: E2eContext;
  let adminToken: string;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
    adminToken = (await loginAdmin(ctx.app)).access_token;
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('deve manter /health/live publico', async () => {
    await request(ctx.app.getHttpServer()).get('/health/live').expect(200);
  });

  it('deve manter /health/ready publico', async () => {
    await request(ctx.app.getHttpServer())
      .get('/health/ready')
      .expect((res) => {
        expect([200, 503]).toContain(res.status);
      });
  });

  it('deve manter /health publico', async () => {
    await request(ctx.app.getHttpServer()).get('/health').expect(200);
  });

  it('deve bloquear health detalhado sem autenticação', async () => {
    const endpoints = [
      '/health/database',
      '/health/redis',
      '/health/summary',
      '/health/queues',
      '/health/full',
    ];

    for (const endpoint of endpoints) {
      await request(ctx.app.getHttpServer()).get(endpoint).expect(401);
    }
  });

  it('deve permitir health detalhado com JWT Admin', async () => {
    const endpoints = [
      '/health/database',
      '/health/redis',
      '/health/summary',
      '/health/queues',
      '/health/full',
    ];

    for (const endpoint of endpoints) {
      await request(ctx.app.getHttpServer())
        .get(endpoint)
        .set('Authorization', bearer(adminToken))
        .expect((res) => {
          expect([200, 503]).toContain(res.status);
        });
    }
  });
});
