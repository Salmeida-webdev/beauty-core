import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import type { Server } from 'node:net';

import { TEST_CLIENTE, TEST_EMAILS, TEST_PASSWORD } from '../seeds/test-seed';

export type LoginResponse = {
  access_token: string;
  refresh_token?: string | null;
  expires_in?: number | null;
  raw: unknown;
};

const loginCache = new Map<string, LoginResponse>();
const clienteLoginCache = new Map<string, LoginResponse>();

export function bearer(token: string) {
  return 'Bearer ' + token;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeLogin(body: unknown): LoginResponse {
  const payload = isRecord(body) ? body : {};
  const accessToken =
    payload.access_token ?? payload.accessToken ?? payload.token;
  const refreshToken = payload.refresh_token ?? payload.refreshToken;
  const expiresIn = payload.expires_in ?? payload.expiresIn;

  expect(accessToken).toBeDefined();

  if (typeof accessToken !== 'string') {
    throw new Error('Resposta de autenticação sem token de acesso válido.');
  }

  if (
    refreshToken !== undefined &&
    refreshToken !== null &&
    typeof refreshToken !== 'string'
  ) {
    throw new Error('Resposta de autenticação com refresh token inválido.');
  }

  if (
    expiresIn !== undefined &&
    expiresIn !== null &&
    typeof expiresIn !== 'number'
  ) {
    throw new Error('Resposta de autenticação com validade inválida.');
  }

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: expiresIn,
    raw: body,
  };
}

export async function loginAdmin(
  app: INestApplication<Server>,
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
  app: INestApplication<Server>,
  options?: { forceNew?: boolean },
) {
  return loginAdmin(app, TEST_EMAILS.superAdmin, TEST_PASSWORD, options);
}

export async function loginClientePublico(
  app: INestApplication<Server>,
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

  const solicitarBody = isRecord(solicitar.body) ? solicitar.body : {};
  let codigo: unknown =
    solicitarBody.codigoDesenvolvimento ??
    solicitarBody.codigo ??
    solicitarBody.devCode ??
    solicitarBody.code;

  if (!codigo && prisma) {
    const row = await prisma.codigoAcessoCliente.findFirst({
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

  if (typeof codigo !== 'string') {
    throw new Error('Código de autenticação do cliente inválido.');
  }

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
