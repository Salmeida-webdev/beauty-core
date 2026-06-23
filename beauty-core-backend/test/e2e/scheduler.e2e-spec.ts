import request = require('supertest');

import { bootstrapE2eTestApp, E2eContext, teardownE2eTestApp } from '../setup-e2e';
import { bearer, loginSuperAdmin } from '../helpers/auth.helper';

describe('Scheduler E2E', () => {
  let ctx: E2eContext;
  let token: string;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
    token = (await loginSuperAdmin(ctx.app)).access_token;
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('GET /scheduler/status', async () => {
    await request(ctx.app.getHttpServer())
      .get('/scheduler/status')
      .set('Authorization', bearer(token))
      .expect(200);
  });

  it.each([
    '/scheduler/teste/aniversarios',
    '/scheduler/teste/campanhas',
    '/scheduler/teste/relatorios'
  ])('POST %s', async (route) => {
    await request(ctx.app.getHttpServer())
      .post(route)
      .set('Authorization', bearer(token))
      .expect((res) => {
        expect([200, 201, 404]).toContain(res.status);
      });
  });
});


