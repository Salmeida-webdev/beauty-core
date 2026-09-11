import request = require('supertest');

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';
import { bearer, loginAdmin } from '../helpers/auth.helper';

describe('Sessões E2E', () => {
  let ctx: E2eContext;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('múltiplas sessões e logout-all', async () => {
    const sessao1 = await loginAdmin(ctx.app, undefined, undefined, {
      forceNew: true,
    });
    const sessao2 = await loginAdmin(ctx.app, undefined, undefined, {
      forceNew: true,
    });

    await request(ctx.app.getHttpServer())
      .post('/auth/logout-all')
      .set('Authorization', bearer(sessao2.access_token))
      .expect((res) => {
        expect([200, 201, 401, 429]).toContain(res.status);
      });

    if (sessao1.refresh_token) {
      await request(ctx.app.getHttpServer())
        .post('/auth/refresh')
        .send({
          refreshToken: sessao1.refresh_token,
        })
        .expect((res) => {
          expect([400, 401]).toContain(res.status);
        });
    }
  });

  it('refresh revogado por logout não deve funcionar', async () => {
    const login = await loginAdmin(ctx.app, undefined, undefined, {
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

    if (login.refresh_token) {
      await request(ctx.app.getHttpServer())
        .post('/auth/refresh')
        .send({
          refreshToken: login.refresh_token,
        })
        .expect((res) => {
          expect([400, 401]).toContain(res.status);
        });
    }
  });
});
