import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { Server } from 'node:net';

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';
import { expectTenantOk } from '../helpers/tenant.helper';

function asHttpApp(app: E2eContext['app']): INestApplication<Server> {
  return app as INestApplication<Server>;
}

function readSeedString(
  record: Record<string, unknown>,
  field: string,
): string {
  const value = record[field];

  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Fixture de tenant sem ${field} válido.`);
  }

  return value;
}

describe('Tenant E2E', () => {
  let ctx: E2eContext;
  let httpApp: INestApplication<Server>;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
    httpApp = asHttpApp(ctx.app);
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('slug válido', async () => {
    const empresaASlug = readSeedString(ctx.seed.empresaA, 'slug');

    await expectTenantOk(httpApp, empresaASlug);
  });

  it('slug inválido', async () => {
    await request(httpApp.getHttpServer())
      .get('/public/tenant/slug-inexistente')
      .expect((res) => {
        expect([400, 404]).toContain(res.status);
      });
  });

  it('empresa inativa', async () => {
    const empresaBId = readSeedString(ctx.seed.empresaB, 'id');
    const empresaBSlug = readSeedString(ctx.seed.empresaB, 'slug');

    await ctx.prisma.empresa.update({
      where: { id: empresaBId },
      data: { ativo: false },
    });

    await request(httpApp.getHttpServer())
      .get('/public/tenant/' + empresaBSlug)
      .expect((res) => {
        expect([400, 403, 404]).toContain(res.status);
      });
  });
});
