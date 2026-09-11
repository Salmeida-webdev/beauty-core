import request = require('supertest');

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';
import { bearer, loginAdmin } from '../helpers/auth.helper';
import { TEST_EMAILS, TEST_PASSWORD } from '../seeds/test-seed';

describe('Roles E2E', () => {
  let ctx: E2eContext;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('sem token deve retornar 401', async () => {
    await request(ctx.app.getHttpServer()).get('/usuarios').expect(401);
  });

  it.each([
    ['ADMIN', TEST_EMAILS.admin, [200]],
    ['GERENTE', TEST_EMAILS.gerente, [200, 403]],
    ['RECEPCAO', TEST_EMAILS.recepcao, [403]],
    ['PROFISSIONAL', TEST_EMAILS.profissional, [403]],
    ['SUPER_ADMIN', TEST_EMAILS.superAdmin, [200]],
  ])('%s em GET /usuarios', async (_role, email, expectedStatuses) => {
    const login = await loginAdmin(ctx.app, email, TEST_PASSWORD);

    await request(ctx.app.getHttpServer())
      .get('/usuarios')
      .set('Authorization', bearer(login.access_token))
      .expect((res) => {
        expect(expectedStatuses).toContain(res.status);
      });
  });
});
