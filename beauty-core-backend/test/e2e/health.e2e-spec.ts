import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { Server } from 'node:net';

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';
import { bearer, loginAdmin } from '../helpers/auth.helper';

function asHttpApp(app: E2eContext['app']): INestApplication<Server> {
  return app as INestApplication<Server>;
}

describe('Health E2E', () => {
  let ctx: E2eContext;
  let httpApp: INestApplication<Server>;
  let adminToken: string;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
    httpApp = asHttpApp(ctx.app);
    adminToken = (await loginAdmin(httpApp)).access_token;
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('deve manter /health/live publico', async () => {
    await request(httpApp.getHttpServer()).get('/health/live').expect(200);
  });

  it('deve manter /health/ready publico', async () => {
    await request(httpApp.getHttpServer())
      .get('/health/ready')
      .expect((res) => {
        expect([200, 503]).toContain(res.status);
      });
  });

  it('deve manter /health publico', async () => {
    await request(httpApp.getHttpServer()).get('/health').expect(200);
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
      await request(httpApp.getHttpServer()).get(endpoint).expect(401);
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
      await request(httpApp.getHttpServer())
        .get(endpoint)
        .set('Authorization', bearer(adminToken))
        .expect((res) => {
          expect([200, 503]).toContain(res.status);
        });
    }
  });
});
