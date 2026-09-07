import request = require('supertest');

import { bootstrapE2eTestApp, E2eContext, teardownE2eTestApp } from '../setup-e2e';
import { expectTenantOk } from '../helpers/tenant.helper';

describe('Tenant E2E', () => {
  let ctx: E2eContext;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('slug válido', async () => {
    await expectTenantOk(ctx.app, ctx.seed.empresaA.slug);
  });

  it('slug inválido', async () => {
    await request(ctx.app.getHttpServer())
      .get('/public/tenant/slug-inexistente')
      .expect((res) => {
        expect([400, 404]).toContain(res.status);
      });
  });

  it('empresa inativa', async () => {
    await (ctx.prisma as any).empresa.update({
      where: { id: ctx.seed.empresaB.id },
      data: { ativo: false }
    });

    await request(ctx.app.getHttpServer())
      .get('/public/tenant/' + ctx.seed.empresaB.slug)
      .expect((res) => {
        expect([400, 403, 404]).toContain(res.status);
      });
  });
});


