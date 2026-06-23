import { validateEnv } from '../../src/config/env.validation';

function baseEnv(overrides: Record<string, unknown> = {}) {
  return {
    DATABASE_URL: 'postgresql://user:password@localhost:5432/db',
    JWT_SECRET: 'a'.repeat(32),
    JWT_CLIENT_SECRET: 'b'.repeat(32),
    JWT_REFRESH_SECRET: 'c'.repeat(32),
    JWT_CLIENT_REFRESH_SECRET: 'd'.repeat(32),
    OTP_SECRET: 'e'.repeat(32),
    NODE_ENV: 'production',
    CORS_ORIGIN: 'https://app.exemplo.com',
    REDIS_PASSWORD: 'f'.repeat(32),
    METRICS_TOKEN: 'g'.repeat(32),
    ...overrides,
  };
}

describe('Env validation CORS production', () => {
  it('deve rejeitar producao com CORS_ORIGIN=*', () => {
    expect(() => validateEnv(baseEnv({ CORS_ORIGIN: '*' }))).toThrow(
      /CORS_ORIGIN/
    );
  });

  it('deve rejeitar producao sem CORS_ORIGIN', () => {
    expect(() => validateEnv(baseEnv({ CORS_ORIGIN: '' }))).toThrow(
      /CORS_ORIGIN/
    );
  });

  it('deve aceitar producao com origens explicitas', () => {
    const result = validateEnv(
      baseEnv({ CORS_ORIGIN: 'https://app.exemplo.com,https://admin.exemplo.com' })
    );

    expect(result.CORS_ORIGIN).toContain('https://app.exemplo.com');
  });
});

