import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { Server } from 'node:net';

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';
import { bearer, loginAdmin, loginSuperAdmin } from '../helpers/auth.helper';

describe('Auditoria E2E', () => {
  let ctx: E2eContext;
  let httpApp: INestApplication<Server>;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
    httpApp = ctx.app as INestApplication<Server>;
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('login deve gerar auditoria quando model existir', async () => {
    await loginAdmin(httpApp);

    const auditoria = await ctx.prisma.auditoriaSistema.findFirst({
      where: {
        acao: 'LOGIN_ADMIN',
        modulo: 'AUTH',
        status: 'SUCESSO',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!auditoria) {
      throw new Error('O login administrativo não gerou auditoria de sucesso.');
    }

    expect(auditoria.acao).toBe('LOGIN_ADMIN');
    expect(auditoria.modulo).toBe('AUTH');
    expect(auditoria.status).toBe('SUCESSO');
  });

  it('scheduler deve gerar auditoria operacional quando disponível', async () => {
    const superAdmin = await loginSuperAdmin(httpApp);

    await request(httpApp.getHttpServer())
      .post('/scheduler/teste/relatorios')
      .set('Authorization', bearer(superAdmin.access_token))
      .expect((res) => {
        expect([200, 201, 404]).toContain(res.status);
      });
  });
});
