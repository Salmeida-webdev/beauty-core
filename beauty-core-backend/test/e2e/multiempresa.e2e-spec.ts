import * as bcrypt from 'bcrypt';
import request = require('supertest');

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';
import { bearer, loginAdmin } from '../helpers/auth.helper';
import { TEST_PASSWORD } from '../seeds/test-seed';

describe('Multiempresa E2E', () => {
  let ctx: E2eContext;
  let tokenEmpresaA: string;
  let tokenEmpresaB: string;
  let clienteEmpresaBId: string;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();

    tokenEmpresaA = (await loginAdmin(ctx.app)).access_token;

    const senhaHash = await bcrypt.hash(TEST_PASSWORD, 10);

    const adminB = await (ctx.prisma as any).usuario.create({
      data: {
        empresaId: ctx.seed.empresaB.id,
        nome: 'Admin Empresa B',
        email: 'admin.b.test@beautycore.com',
        senha: senhaHash,
        role: 'ADMIN',
        ativo: true,
      },
    });

    const clienteB = await (ctx.prisma as any).cliente.create({
      data: {
        empresaId: ctx.seed.empresaB.id,
        nome: 'Cliente Empresa B',
        telefone: '83999990009',
        email: 'cliente.b.test@beautycore.com',
        ativo: true,
        ativoPortal: true,
        aceitouTermos: true,
      },
    });

    clienteEmpresaBId = clienteB.id;
    tokenEmpresaB = (await loginAdmin(ctx.app, adminB.email, TEST_PASSWORD))
      .access_token;
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('Empresa A não deve acessar cliente da Empresa B', async () => {
    await request(ctx.app.getHttpServer())
      .get('/clientes/' + clienteEmpresaBId)
      .set('Authorization', bearer(tokenEmpresaA))
      .expect((res) => {
        expect([403, 404]).toContain(res.status);
      });
  });

  it('Empresa B deve acessar seu próprio cliente', async () => {
    await request(ctx.app.getHttpServer())
      .get('/clientes/' + clienteEmpresaBId)
      .set('Authorization', bearer(tokenEmpresaB))
      .expect(200);
  });

  it.each(['/agendamentos', '/arquivos', '/clientes-pacotes', '/notificacoes'])(
    '%s exige autenticação',
    async (route) => {
      await request(ctx.app.getHttpServer()).get(route).expect(401);
    },
  );
});
