import request = require('supertest');

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';
import { bearer, loginSuperAdmin } from '../helpers/auth.helper';

describe('SUPER_ADMIN E2E', () => {
  let ctx: E2eContext;
  let token: string;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
    token = (await loginSuperAdmin(ctx.app)).access_token;
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('deve acessar empresas', async () => {
    await request(ctx.app.getHttpServer())
      .get('/empresas')
      .set('Authorization', bearer(token))
      .expect(200);
  });

  it('deve acessar usuários', async () => {
    await request(ctx.app.getHttpServer())
      .get('/usuarios')
      .set('Authorization', bearer(token))
      .expect(200);
  });

  it('deve acessar scheduler', async () => {
    await request(ctx.app.getHttpServer())
      .get('/scheduler/status')
      .set('Authorization', bearer(token))
      .expect(200);
  });

  it('deve acessar filas/health', async () => {
    await request(ctx.app.getHttpServer())
      .get('/health/queues')
      .set('Authorization', bearer(token))
      .expect(200);
  });
});
