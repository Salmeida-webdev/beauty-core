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

describe('Env validation required production secrets', () => {
  it('deve exigir OTP_SECRET', () => {
    expect(() => validateEnv(baseEnv({ OTP_SECRET: '' }))).toThrow(
      /OTP_SECRET/
    );
  });

  it('deve exigir OTP_SECRET com minimo de 32 caracteres', () => {
    expect(() => validateEnv(baseEnv({ OTP_SECRET: 'curto' }))).toThrow(
      /OTP_SECRET/
    );
  });

  it('deve exigir REDIS_PASSWORD em producao', () => {
    expect(() => validateEnv(baseEnv({ REDIS_PASSWORD: '' }))).toThrow(
      /REDIS_PASSWORD/
    );
  });

  it('deve exigir REDIS_PASSWORD forte em producao', () => {
    expect(() => validateEnv(baseEnv({ REDIS_PASSWORD: 'curto' }))).toThrow(
      /REDIS_PASSWORD/
    );
  });

  it('deve exigir METRICS_TOKEN em producao', () => {
    expect(() => validateEnv(baseEnv({ METRICS_TOKEN: '' }))).toThrow(
      /METRICS_TOKEN/
    );
  });

  it('deve exigir METRICS_TOKEN forte em producao', () => {
    expect(() => validateEnv(baseEnv({ METRICS_TOKEN: 'curto' }))).toThrow(
      /METRICS_TOKEN/
    );
  });

  it('deve aceitar ambiente de producao completo', () => {
    const result = validateEnv(baseEnv());

    expect(result.OTP_SECRET).toHaveLength(32);
    expect(result.REDIS_PASSWORD).toHaveLength(32);
    expect(result.METRICS_TOKEN).toHaveLength(32);
  });
});

