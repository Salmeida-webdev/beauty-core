import request = require('supertest');

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';
import { bearer, loginClientePublico } from '../helpers/auth.helper';

describe('Cliente Area E2E', () => {
  let ctx: E2eContext;
  let token: string;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
    token = (
      await loginClientePublico(ctx.app, ctx.seed.empresaA.slug, ctx.prisma)
    ).access_token;
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it.each([
    '/cliente-area/me',
    '/cliente-area/me/dashboard',
    '/cliente-area/me/agendamentos',
    '/cliente-area/me/fidelidade',
    '/cliente-area/me/pacotes',
    '/cliente-area/me/notificacoes',
  ])('GET %s', async (route) => {
    await request(ctx.app.getHttpServer())
      .get(route)
      .set('Authorization', bearer(token))
      .expect(200);
  });

  it('sem token deve retornar 401', async () => {
    await request(ctx.app.getHttpServer()).get('/cliente-area/me').expect(401);
  });
});
