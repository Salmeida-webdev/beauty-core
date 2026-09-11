import request = require('supertest');

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';

describe('Refresh Throttle E2E', () => {
  let ctx: E2eContext;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('deve aplicar throttle especifico no refresh Admin', async () => {
    const statuses: number[] = [];

    for (let i = 0; i < 11; i++) {
      const response = await request(ctx.app.getHttpServer())
        .post('/auth/refresh')
        .send({
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aXBvIjoiYWRtaW5fcmVmcmVzaCIsInNpZCI6InRlc3QifQ.invalidsignature',
        });

      statuses.push(response.status);
    }

    expect(
      statuses.slice(0, 10).every((status) => [400, 401].includes(status)),
    ).toBe(true);
    expect(statuses[10]).toBe(429);
  });

  it('deve aplicar throttle especifico no refresh Cliente', async () => {
    const statuses: number[] = [];

    for (let i = 0; i < 11; i++) {
      const response = await request(ctx.app.getHttpServer())
        .post('/auth-cliente/refresh')
        .send({
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aXBvIjoiY2xpZW50ZV9yZWZyZXNoIiwic2lkIjoidGVzdCJ9.invalidsignature',
        });

      statuses.push(response.status);
    }

    expect(
      statuses.slice(0, 10).every((status) => [400, 401].includes(status)),
    ).toBe(true);
    expect(statuses[10]).toBe(429);
  });
});
