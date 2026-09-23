import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { Server } from 'node:net';

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';
import { bearer, loginClientePublico } from '../helpers/auth.helper';

describe('Cliente Area E2E', () => {
  let ctx: E2eContext;
  let httpApp: INestApplication<Server>;
  let token: string;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
    httpApp = ctx.app as INestApplication<Server>;
    const slug = ctx.seed.empresaA.slug;
    if (typeof slug !== 'string') {
      throw new Error('Empresa de teste sem slug válido.');
    }
    token = (await loginClientePublico(httpApp, slug, ctx.prisma)).access_token;
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
    await request(httpApp.getHttpServer())
      .get(route)
      .set('Authorization', bearer(token))
      .expect(200);
  });

  it('sem token deve retornar 401', async () => {
    await request(httpApp.getHttpServer()).get('/cliente-area/me').expect(401);
  });
});
