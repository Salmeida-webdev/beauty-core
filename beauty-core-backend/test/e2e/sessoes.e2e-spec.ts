import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { Server } from 'node:net';

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';
import { bearer, loginAdmin } from '../helpers/auth.helper';
import type { LoginResponse } from '../helpers/auth.helper';

function asHttpApp(app: E2eContext['app']): INestApplication<Server> {
  return app as INestApplication<Server>;
}

function requireRefreshToken(login: LoginResponse): string {
  if (!login.refresh_token) {
    throw new Error('O login administrativo deve retornar um refresh token.');
  }

  return login.refresh_token;
}

describe('Sessões E2E', () => {
  let ctx: E2eContext;
  let httpApp: INestApplication<Server>;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
    httpApp = asHttpApp(ctx.app);
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('múltiplas sessões e logout-all', async () => {
    const sessao1 = await loginAdmin(httpApp, undefined, undefined, {
      forceNew: true,
    });
    const sessao2 = await loginAdmin(httpApp, undefined, undefined, {
      forceNew: true,
    });
    const refreshTokenSessao1 = requireRefreshToken(sessao1);

    await request(httpApp.getHttpServer())
      .post('/auth/logout-all')
      .set('Authorization', bearer(sessao2.access_token))
      .expect((res) => {
        expect([200, 201, 401, 429]).toContain(res.status);
      });

    await request(httpApp.getHttpServer())
      .post('/auth/refresh')
      .send({
        refreshToken: refreshTokenSessao1,
      })
      .expect((res) => {
        expect([400, 401]).toContain(res.status);
      });
  });

  it('refresh revogado por logout não deve funcionar', async () => {
    const login = await loginAdmin(httpApp, undefined, undefined, {
      forceNew: true,
    });
    const refreshToken = requireRefreshToken(login);

    await request(httpApp.getHttpServer())
      .post('/auth/logout')
      .set('Authorization', bearer(login.access_token))
      .send({
        refreshToken,
      })
      .expect((res) => {
        expect([200, 201, 400, 401]).toContain(res.status);
      });

    await request(httpApp.getHttpServer())
      .post('/auth/refresh')
      .send({
        refreshToken,
      })
      .expect((res) => {
        expect([400, 401]).toContain(res.status);
      });
  });
});
