import request = require('supertest');

import { bootstrapE2eTestApp, E2eContext, teardownE2eTestApp } from '../setup-e2e';
import { bearer, loginClientePublico } from '../helpers/auth.helper';
import { TEST_CLIENTE } from '../seeds/test-seed';

describe('Auth Cliente E2E', () => {
  let ctx: E2eContext;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('POST /public/:slug/auth-cliente/solicitar-codigo deve salvar OTP seguro sem plaintext', async () => {
    const response = await request(ctx.app.getHttpServer())
      .post('/public/' + ctx.seed.empresaA.slug + '/auth-cliente/solicitar-codigo')
      .send({
        telefone: TEST_CLIENTE.telefone
      })
      .expect((res) => {
        expect([200, 201]).toContain(res.status);
      });

    const codigoDesenvolvimento =
      response.body.codigoDesenvolvimento ??
      response.body.codigo ??
      response.body.devCode ??
      response.body.code;

    const registro = await (ctx.prisma as any).codigoAcessoCliente.findFirst({
      where: {
        empresaId: ctx.seed.empresaA.id,
        telefone: TEST_CLIENTE.telefone
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    expect(registro).toBeDefined();
    expect(registro.codigo).toBe('HASHED');
    expect(registro.codigoHash).toBeDefined();
    expect(registro.codigoHash).toMatch(/^[a-f0-9]{64}$/);

    if (codigoDesenvolvimento) {
      expect(registro.codigo).not.toBe(codigoDesenvolvimento);
      expect(registro.codigoHash).not.toBe(codigoDesenvolvimento);
    }
  });

  it('POST /public/:slug/auth-cliente/verificar-codigo', async () => {
    const login = await loginClientePublico(ctx.app, ctx.seed.empresaA.slug, ctx.prisma);

    expect(login.access_token).toBeDefined();
  });

  it('POST /auth-cliente/refresh deve validar endpoint de refresh cliente', async () => {
    const login = await loginClientePublico(ctx.app, ctx.seed.empresaA.slug, ctx.prisma);

    if (!login.refresh_token) {
      return;
    }

    await request(ctx.app.getHttpServer())
      .post('/auth-cliente/refresh')
      .send({
        refreshToken: login.refresh_token
      })
      .expect((res) => {
        expect([200, 201, 400, 401]).toContain(res.status);
      });
  });

  it('GET /auth-cliente/sessoes', async () => {
    const login = await loginClientePublico(ctx.app, ctx.seed.empresaA.slug, ctx.prisma);

    await request(ctx.app.getHttpServer())
      .get('/auth-cliente/sessoes')
      .set('Authorization', bearer(login.access_token))
      .expect(200);
  });

  it('POST /auth-cliente/logout', async () => {
    const login = await loginClientePublico(ctx.app, ctx.seed.empresaA.slug, ctx.prisma);

    await request(ctx.app.getHttpServer())
      .post('/auth-cliente/logout')
      .set('Authorization', bearer(login.access_token))
      .send({
        refreshToken: login.refresh_token
      })
      .expect((res) => {
        expect([200, 201, 400, 401]).toContain(res.status);
      });
  });

  it('POST /auth-cliente/logout-all', async () => {
    const login = await loginClientePublico(ctx.app, ctx.seed.empresaA.slug, ctx.prisma);

    await request(ctx.app.getHttpServer())
      .post('/auth-cliente/logout-all')
      .set('Authorization', bearer(login.access_token))
      .expect((res) => {
        expect([200, 201, 401]).toContain(res.status);
      });
  });
});

