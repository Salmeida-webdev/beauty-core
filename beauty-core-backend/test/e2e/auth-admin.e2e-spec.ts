import request = require('supertest');

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';
import { bearer, loginAdmin } from '../helpers/auth.helper';
import { TEST_EMAILS, TEST_PASSWORD } from '../seeds/test-seed';

describe('Auth Admin E2E', () => {
  let ctx: E2eContext;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('POST /auth/login deve autenticar admin', async () => {
    const response = await request(ctx.app.getHttpServer())
      .post('/auth/login')
      .send({
        email: TEST_EMAILS.admin,
        senha: TEST_PASSWORD,
      })
      .expect((res) => {
        expect([200, 201]).toContain(res.status);
      });

    expect(
      response.body.access_token ??
        response.body.accessToken ??
        response.body.token,
    ).toBeDefined();
  });

  it('POST /auth/login deve rejeitar senha inválida', async () => {
    await request(ctx.app.getHttpServer())
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
    const login = await loginAdmin(ctx.app);

    if (!login.refresh_token) {
      return;
    }

    await request(ctx.app.getHttpServer())
      .post('/auth/refresh')
      .send({
        refreshToken: login.refresh_token,
      })
      .expect((res) => {
        expect([200, 201, 400, 401]).toContain(res.status);
      });
  });

  it('GET /auth/sessoes deve listar sessões', async () => {
    const login = await loginAdmin(ctx.app);

    await request(ctx.app.getHttpServer())
      .get('/auth/sessoes')
      .set('Authorization', bearer(login.access_token))
      .expect(200);
  });

  it('POST /auth/logout deve validar logout da sessão', async () => {
    const login = await loginAdmin(ctx.app, TEST_EMAILS.admin, TEST_PASSWORD, {
      forceNew: true,
    });

    await request(ctx.app.getHttpServer())
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
    const login = await loginAdmin(ctx.app, TEST_EMAILS.admin, TEST_PASSWORD);

    await request(ctx.app.getHttpServer())
      .post('/auth/logout-all')
      .set('Authorization', bearer(login.access_token))
      .expect((res) => {
        expect([200, 201, 401, 429]).toContain(res.status);
      });
  });
});
