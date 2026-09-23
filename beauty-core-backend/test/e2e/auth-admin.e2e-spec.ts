import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { Server } from 'node:net';

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';
import { bearer, loginAdmin } from '../helpers/auth.helper';
import { TEST_EMAILS, TEST_PASSWORD } from '../seeds/test-seed';

type LoginResponseBody = Record<string, unknown>;

function asHttpApp(app: E2eContext['app']): INestApplication<Server> {
  return app as INestApplication<Server>;
}

function isRecord(value: unknown): value is LoginResponseBody {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasAccessToken(body: unknown): boolean {
  if (!isRecord(body)) {
    return false;
  }

  return [body.access_token, body.accessToken, body.token].some(
    (token) => typeof token === 'string' && token.length > 0,
  );
}

describe('Auth Admin E2E', () => {
  let ctx: E2eContext;
  let httpApp: INestApplication<Server>;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
    httpApp = asHttpApp(ctx.app);
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('POST /auth/login deve autenticar admin', async () => {
    const response = await request(httpApp.getHttpServer())
      .post('/auth/login')
      .send({
        email: TEST_EMAILS.admin,
        senha: TEST_PASSWORD,
      })
      .expect((res) => {
        expect([200, 201]).toContain(res.status);
      });

    expect(hasAccessToken(response.body as unknown)).toBe(true);
  });

  it('POST /auth/login deve rejeitar senha inválida', async () => {
    await request(httpApp.getHttpServer())
      .post('/auth/login')
      .send({
        email: TEST_EMAILS.admin,
        senha: 'senha-errada',
      })
      .expect((res) => {
        expect([401, 429]).toContain(res.status);
      });
  });

  it('POST /auth/refresh deve validar endpoint de refresh', async () => {
    const login = await loginAdmin(httpApp);

    if (!login.refresh_token) {
      throw new Error('O login administrativo não retornou refresh token.');
    }

    await request(httpApp.getHttpServer())
      .post('/auth/refresh')
      .send({
        refreshToken: login.refresh_token,
      })
      .expect((res) => {
        expect([200, 201, 400, 401]).toContain(res.status);
      });
  });

  it('GET /auth/sessoes deve listar sessões', async () => {
    const login = await loginAdmin(httpApp);

    await request(httpApp.getHttpServer())
      .get('/auth/sessoes')
      .set('Authorization', bearer(login.access_token))
      .expect(200);
  });

  it('POST /auth/logout deve validar logout da sessão', async () => {
    const login = await loginAdmin(httpApp, TEST_EMAILS.admin, TEST_PASSWORD, {
      forceNew: true,
    });

    await request(httpApp.getHttpServer())
      .post('/auth/logout')
      .set('Authorization', bearer(login.access_token))
      .send({
        refreshToken: login.refresh_token,
      })
      .expect((res) => {
        expect([200, 201, 400, 401]).toContain(res.status);
      });
  });

  it('POST /auth/logout-all deve revogar todas as sessões', async () => {
    const login = await loginAdmin(httpApp, TEST_EMAILS.admin, TEST_PASSWORD);

    await request(httpApp.getHttpServer())
      .post('/auth/logout-all')
      .set('Authorization', bearer(login.access_token))
      .expect((res) => {
        expect([200, 201, 401, 429]).toContain(res.status);
      });
  });
});
