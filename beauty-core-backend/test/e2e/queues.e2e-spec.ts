import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { Server } from 'node:net';

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';
import { bearer, loginSuperAdmin } from '../helpers/auth.helper';

describe('BullMQ / Queues E2E', () => {
  let ctx: E2eContext;
  let httpApp: INestApplication<Server>;
  let token: string;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
    httpApp = ctx.app as INestApplication<Server>;
    token = (await loginSuperAdmin(httpApp)).access_token;
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('GET /health/queues', async () => {
    await request(httpApp.getHttpServer())
      .get('/health/queues')
      .set('Authorization', bearer(token))
      .expect(200);
  });

  it('métricas de filas quando endpoint existir', async () => {
    await request(httpApp.getHttpServer())
      .get('/queues/metrics')
      .set('Authorization', bearer(token))
      .expect((res) => {
        expect([200, 404]).toContain(res.status);
      });
  });

  it('DLQ quando endpoint existir', async () => {
    await request(httpApp.getHttpServer())
      .get('/queues/dlq')
      .set('Authorization', bearer(token))
      .expect((res) => {
        expect([200, 404]).toContain(res.status);
      });
  });
});
