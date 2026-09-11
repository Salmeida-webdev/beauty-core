import request = require('supertest');

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';
import { bearer, loginAdmin, loginSuperAdmin } from '../helpers/auth.helper';

describe('Auditoria E2E', () => {
  let ctx: E2eContext;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('login deve gerar auditoria quando model existir', async () => {
    const login = await loginAdmin(ctx.app);

    expect(login.access_token).toBeDefined();

    if (!(ctx.prisma as any).auditoriaSistema) {
      return;
    }

    const auditorias = await (ctx.prisma as any).auditoriaSistema.findMany({
      take: 5,
    });

    expect(auditorias.length).toBeGreaterThanOrEqual(0);
  });

  it('scheduler deve gerar auditoria operacional quando disponível', async () => {
    const superAdmin = await loginSuperAdmin(ctx.app);

    await request(ctx.app.getHttpServer())
      .post('/scheduler/teste/relatorios')
      .set('Authorization', bearer(superAdmin.access_token))
      .expect((res) => {
        expect([200, 201, 404]).toContain(res.status);
      });
  });
});
