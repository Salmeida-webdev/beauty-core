import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { TEST_CLIENTE, TEST_EMAILS, TEST_PASSWORD } from '../seeds/test-seed';

export type LoginResponse = {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  raw: any;
};

const loginCache = new Map<string, LoginResponse>();
const clienteLoginCache = new Map<string, LoginResponse>();

export function bearer(token: string) {
  return 'Bearer ' + token;
}

function normalizeLogin(body: any): LoginResponse {
  const accessToken = body.access_token ?? body.accessToken ?? body.token;
  const refreshToken = body.refresh_token ?? body.refreshToken;

  expect(accessToken).toBeDefined();

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: body.expires_in ?? body.expiresIn,
    raw: body,
  };
}

export async function loginAdmin(
  app: INestApplication,
  email = TEST_EMAILS.admin,
  senha = TEST_PASSWORD,
  options?: { forceNew?: boolean },
): Promise<LoginResponse> {
  const cacheKey = email;

  if (!options?.forceNew && loginCache.has(cacheKey)) {
    return loginCache.get(cacheKey)!;
  }

  const response = await request(app.getHttpServer())
    .post('/auth/login')
    .send({ email, senha })
    .expect((res) => {
      expect([200, 201, 429]).toContain(res.status);
    });

  if (response.status === 429) {
    const cached = loginCache.get(cacheKey);

    if (cached) {
      return cached;
    }

    throw new Error(
      'Rate limit em /auth/login sem token em cache para ' + email,
    );
  }

  const login = normalizeLogin(response.body);
  loginCache.set(cacheKey, login);

  return login;
}

export async function loginSuperAdmin(
  app: INestApplication,
  options?: { forceNew?: boolean },
) {
  return loginAdmin(app, TEST_EMAILS.superAdmin, TEST_PASSWORD, options);
}

export async function loginClientePublico(
  app: INestApplication,
  slug: string,
  prisma?: PrismaClient,
  options?: { forceNew?: boolean },
): Promise<LoginResponse> {
  const cacheKey = slug + ':' + TEST_CLIENTE.telefone;

  if (!options?.forceNew && clienteLoginCache.has(cacheKey)) {
    return clienteLoginCache.get(cacheKey)!;
  }

  const solicitar = await request(app.getHttpServer())
    .post('/public/' + slug + '/auth-cliente/solicitar-codigo')
    .send({
      telefone: TEST_CLIENTE.telefone,
    })
    .expect((res) => {
      expect([200, 201, 429]).toContain(res.status);
    });

  if (solicitar.status === 429) {
    const cached = clienteLoginCache.get(cacheKey);

    if (cached) {
      return cached;
    }

    throw new Error('Rate limit em OTP cliente sem token em cache.');
  }

  let codigo =
    solicitar.body.codigoDesenvolvimento ??
    solicitar.body.codigo ??
    solicitar.body.devCode ??
    solicitar.body.code;

  if (!codigo && prisma && (prisma as any).codigoAcessoCliente) {
    const row = await (prisma as any).codigoAcessoCliente.findFirst({
      where: {
        telefone: TEST_CLIENTE.telefone,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    codigo = row?.codigo;
  }

  expect(codigo).toBeDefined();

  const verificar = await request(app.getHttpServer())
    .post('/public/' + slug + '/auth-cliente/verificar-codigo')
    .send({
      telefone: TEST_CLIENTE.telefone,
      codigo,
    })
    .expect((res) => {
      expect([200, 201]).toContain(res.status);
    });

  const login = normalizeLogin(verificar.body);
  clienteLoginCache.set(cacheKey, login);

  return login;
}
