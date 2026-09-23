import * as bcrypt from 'bcrypt';
import { INestApplication } from '@nestjs/common';
import { Role } from '@prisma/client';
import request from 'supertest';
import type { Server } from 'node:net';

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';
import { bearer, loginAdmin } from '../helpers/auth.helper';
import { TEST_PASSWORD } from '../seeds/test-seed';

function getHttpApp(app: E2eContext['app']): INestApplication<Server> {
  return app as INestApplication<Server>;
}

function getSeedString(
  record: Record<string, unknown>,
  fieldName: string,
): string {
  const value = record[fieldName];

  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Seed inválido: ${fieldName} não é uma string.`);
  }

  return value;
}

describe('Multiempresa E2E', () => {
  let ctx: E2eContext;
  let httpApp: INestApplication<Server>;
  let tokenEmpresaA: string;
  let tokenEmpresaB: string;
  let clienteEmpresaBId: string;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
    httpApp = getHttpApp(ctx.app);

    tokenEmpresaA = (await loginAdmin(httpApp)).access_token;

    const senhaHash = await bcrypt.hash(TEST_PASSWORD, 10);
    const empresaBId = getSeedString(ctx.seed.empresaB, 'id');

    const adminB = await ctx.prisma.usuario.create({
      data: {
        empresaId: empresaBId,
        nome: 'Admin Empresa B',
        email: 'admin.b.test@beautycore.com',
        senha: senhaHash,
        role: Role.ADMIN,
        ativo: true,
      },
    });

    const clienteB = await ctx.prisma.cliente.create({
      data: {
        empresaId: empresaBId,
        nome: 'Cliente Empresa B',
        telefone: '83999990009',
        email: 'cliente.b.test@beautycore.com',
        ativo: true,
        ativoPortal: true,
        aceitouTermos: true,
      },
    });

    clienteEmpresaBId = clienteB.id;
    tokenEmpresaB = (await loginAdmin(httpApp, adminB.email, TEST_PASSWORD))
      .access_token;
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('Empresa A não deve acessar cliente da Empresa B', async () => {
    await request(httpApp.getHttpServer())
      .get('/clientes/' + clienteEmpresaBId)
      .set('Authorization', bearer(tokenEmpresaA))
      .expect((res) => {
        expect([403, 404]).toContain(res.status);
      });
  });

  it('Empresa B deve acessar seu próprio cliente', async () => {
    await request(httpApp.getHttpServer())
      .get('/clientes/' + clienteEmpresaBId)
      .set('Authorization', bearer(tokenEmpresaB))
      .expect(200);
  });

  it.each(['/agendamentos', '/arquivos', '/clientes-pacotes', '/notificacoes'])(
    '%s exige autenticação',
    async (route) => {
      await request(httpApp.getHttpServer()).get(route).expect(401);
    },
  );
});
