import request = require('supertest');

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';

describe('Metrics E2E', () => {
  let ctx: E2eContext;
  const metricsToken = 'test-metrics-token-12345678901234567890';
  let originalMetricsToken: string | undefined;
  let originalMetricsPublic: string | undefined;

  beforeAll(async () => {
    originalMetricsToken = process.env.METRICS_TOKEN;
    originalMetricsPublic = process.env.METRICS_PUBLIC;

    process.env.METRICS_TOKEN = metricsToken;
    delete process.env.METRICS_PUBLIC;

    ctx = await bootstrapE2eTestApp();
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);

    if (originalMetricsToken === undefined) {
      delete process.env.METRICS_TOKEN;
    } else {
      process.env.METRICS_TOKEN = originalMetricsToken;
    }

    if (originalMetricsPublic === undefined) {
      delete process.env.METRICS_PUBLIC;
    } else {
      process.env.METRICS_PUBLIC = originalMetricsPublic;
    }
  });

  it('deve bloquear /metrics sem token', async () => {
    await request(ctx.app.getHttpServer()).get('/metrics').expect(401);
  });

  it('deve bloquear /metrics com token invalido', async () => {
    await request(ctx.app.getHttpServer())
      .get('/metrics')
      .set('x-metrics-token', 'token-invalido')
      .expect(401);
  });

  it('deve permitir /metrics com x-metrics-token valido', async () => {
    const response = await request(ctx.app.getHttpServer())
      .get('/metrics')
      .set('x-metrics-token', metricsToken)
      .expect(200);

    expect(response.text).toContain('beauty_core_app_info');
  });

  it('deve permitir /metrics com Bearer token valido', async () => {
    const response = await request(ctx.app.getHttpServer())
      .get('/metrics')
      .set('Authorization', 'Bearer ' + metricsToken)
      .expect(200);

    expect(response.text).toContain('beauty_core_app_info');
  });
});
