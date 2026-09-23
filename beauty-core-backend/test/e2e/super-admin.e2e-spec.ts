import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { Server } from 'node:net';

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';
import { bearer, loginSuperAdmin } from '../helpers/auth.helper';

describe('SUPER_ADMIN E2E', () => {
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

  it('deve acessar empresas', async () => {
    await request(httpApp.getHttpServer())
      .get('/empresas')
      .set('Authorization', bearer(token))
      .expect(200);
  });

  it('deve acessar usuários', async () => {
    await request(httpApp.getHttpServer())
      .get('/usuarios')
      .set('Authorization', bearer(token))
      .expect(200);
  });

  it('deve acessar scheduler', async () => {
    await request(httpApp.getHttpServer())
      .get('/scheduler/status')
      .set('Authorization', bearer(token))
      .expect(200);
  });

  it('deve acessar filas/health', async () => {
    await request(httpApp.getHttpServer())
      .get('/health/queues')
      .set('Authorization', bearer(token))
      .expect(200);
  });
});
