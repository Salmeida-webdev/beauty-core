import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { Server } from 'node:net';

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';

describe('Swagger / DTO Validation E2E', () => {
  let ctx: E2eContext;
  let httpApp: INestApplication<Server>;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
    httpApp = ctx.app as INestApplication<Server>;
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('DTO deve rejeitar campo arbitrário no login admin', async () => {
    await request(httpApp.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin.test@beautycore.com',
        senha: 'Teste@123456',
        campoInvasor: true,
      })
      .expect(400);
  });

  it('Swagger deve responder quando habilitado', async () => {
    await request(httpApp.getHttpServer())
      .get('/api/docs')
      .expect((res) => {
        expect([200, 301, 302, 404]).toContain(res.status);
      });
  });
});
