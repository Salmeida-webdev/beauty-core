import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { Server } from 'node:net';

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';
import { bearer, loginClientePublico } from '../helpers/auth.helper';
import { TEST_CLIENTE } from '../seeds/test-seed';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readOptionalString(
  value: Record<string, unknown>,
  property: string,
): string | undefined {
  const propertyValue = value[property];
  return typeof propertyValue === 'string' ? propertyValue : undefined;
}

function getHttpApp(context: E2eContext): INestApplication<Server> {
  return context.app as INestApplication<Server>;
}

function getEmpresaSeed(context: E2eContext): { id: string; slug: string } {
  const { id, slug } = context.seed.empresaA;

  if (typeof id !== 'string' || typeof slug !== 'string') {
    throw new Error('A seed da empresa A não contém id e slug válidos.');
  }

  return { id, slug };
}

describe('Auth Cliente E2E', () => {
  let ctx: E2eContext;
  let refreshedTokens:
    | { accessToken: string; refreshToken: string }
    | undefined;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('POST /public/:slug/auth-cliente/solicitar-codigo deve salvar OTP seguro sem plaintext', async () => {
    const empresa = getEmpresaSeed(ctx);
    const response = await request(getHttpApp(ctx).getHttpServer())
      .post(`/public/${empresa.slug}/auth-cliente/solicitar-codigo`)
      .send({
        telefone: TEST_CLIENTE.telefone,
      })
      .expect(201);

    const responseBody = isRecord(response.body) ? response.body : {};
    const codigoDesenvolvimento = [
      'codigoDesenvolvimento',
      'codigo',
      'devCode',
      'code',
    ]
      .map((property) => readOptionalString(responseBody, property))
      .find((value) => value !== undefined);

    const registro = await ctx.prisma.codigoAcessoCliente.findFirst({
      where: {
        empresaId: empresa.id,
        telefone: TEST_CLIENTE.telefone,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!registro) {
      throw new Error('O OTP solicitado não foi persistido.');
    }

    expect(registro.codigo).toBe('HASHED');

    if (typeof registro.codigoHash !== 'string') {
      throw new Error('O hash do OTP não foi persistido como texto.');
    }

    expect(registro.codigoHash).toMatch(/^[a-f0-9]{64}$/);

    if (codigoDesenvolvimento !== undefined) {
      expect(registro.codigo).not.toBe(codigoDesenvolvimento);
      expect(registro.codigoHash).not.toBe(codigoDesenvolvimento);
    }
  });

  it('POST /public/:slug/auth-cliente/verificar-codigo autentica e retorna token', async () => {
    const empresa = getEmpresaSeed(ctx);
    const login = await loginClientePublico(
      getHttpApp(ctx),
      empresa.slug,
      ctx.prisma,
    );

    expect(login.access_token).toEqual(expect.any(String));
    expect(login.access_token.length).toBeGreaterThan(0);
  });

  it('POST /auth-cliente/refresh rotaciona os tokens da sessão', async () => {
    const empresa = getEmpresaSeed(ctx);
    const login = await loginClientePublico(
      getHttpApp(ctx),
      empresa.slug,
      ctx.prisma,
    );

    if (typeof login.refresh_token !== 'string') {
      throw new Error('O login do cliente não retornou refresh token.');
    }

    const response = await request(getHttpApp(ctx).getHttpServer())
      .post('/auth-cliente/refresh')
      .send({
        refreshToken: login.refresh_token,
      })
      .expect(201);
    const responseBody = isRecord(response.body) ? response.body : {};
    const accessToken = readOptionalString(responseBody, 'access_token');
    const refreshToken = readOptionalString(responseBody, 'refresh_token');

    if (!accessToken || !refreshToken) {
      throw new Error('A resposta de refresh não retornou os novos tokens.');
    }

    expect(accessToken.length).toBeGreaterThan(0);
    expect(refreshToken).not.toBe(login.refresh_token);
    refreshedTokens = { accessToken, refreshToken };
  });

  it('GET /auth-cliente/sessoes lista a sessão autenticada', async () => {
    if (!refreshedTokens) {
      throw new Error('O teste de refresh não produziu tokens para a sessão.');
    }

    const response = await request(getHttpApp(ctx).getHttpServer())
      .get('/auth-cliente/sessoes')
      .set('Authorization', bearer(refreshedTokens.accessToken))
      .expect(200);
    const responseBody: unknown = response.body;

    expect(Array.isArray(responseBody)).toBe(true);
    if (!Array.isArray(responseBody)) {
      throw new Error('A resposta de sessões não é uma lista.');
    }
    expect(responseBody.length).toBeGreaterThan(0);
  });

  it('POST /auth-cliente/logout revoga a sessão atual', async () => {
    const empresa = getEmpresaSeed(ctx);
    const login = await loginClientePublico(
      getHttpApp(ctx),
      empresa.slug,
      ctx.prisma,
    );

    if (!refreshedTokens) {
      throw new Error('O teste de refresh não produziu tokens para logout.');
    }

    const response = await request(getHttpApp(ctx).getHttpServer())
      .post('/auth-cliente/logout')
      .set('Authorization', bearer(login.access_token))
      .send({
        refreshToken: refreshedTokens.refreshToken,
      })
      .expect(201);
    const responseBody = isRecord(response.body) ? response.body : {};

    expect(readOptionalString(responseBody, 'message')).toBe(
      'Logout realizado com sucesso.',
    );
  });

  it('POST /auth-cliente/logout-all revoga as sessões do cliente', async () => {
    const empresa = getEmpresaSeed(ctx);
    const login = await loginClientePublico(
      getHttpApp(ctx),
      empresa.slug,
      ctx.prisma,
      { forceNew: true },
    );

    const response = await request(getHttpApp(ctx).getHttpServer())
      .post('/auth-cliente/logout-all')
      .set('Authorization', bearer(login.access_token))
      .expect(201);
    const responseBody = isRecord(response.body) ? response.body : {};
    const totalRevogadas = responseBody.totalRevogadas;

    expect(typeof totalRevogadas).toBe('number');
    if (typeof totalRevogadas !== 'number') {
      throw new Error(
        'A resposta de logout-all não informou sessões revogadas.',
      );
    }
    expect(totalRevogadas).toBeGreaterThan(0);
  });
});
