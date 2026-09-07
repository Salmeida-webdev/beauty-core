export function validateEnv(config: Record<string, unknown>) {
  const requiredEnvs = [
    'DATABASE_URL',
    'JWT_SECRET',
    'JWT_CLIENT_SECRET',
    'JWT_REFRESH_SECRET',
    'JWT_CLIENT_REFRESH_SECRET',
    'OTP_SECRET',
    'NODE_ENV',
  ];

  for (const env of requiredEnvs) {
    if (!config[env]) {
      throw new Error(`Variavel de ambiente obrigatoria ausente: ${env}`);
    }
  }

  const nodeEnv = String(config.NODE_ENV ?? 'development');
  const isProduction = nodeEnv === 'production';
  const minSecretLength = 32;

  if (isProduction) {
    const corsOrigin = String(config.CORS_ORIGIN ?? '').trim();

    if (
      !corsOrigin ||
      corsOrigin === '*' ||
      corsOrigin
        .split(',')
        .map((origin) => origin.trim())
        .includes('*')
    ) {
      throw new Error(
        'CORS_ORIGIN deve conter apenas origens explicitas em producao.',
      );
    }

    const redisPassword = String(config.REDIS_PASSWORD ?? '').trim();

    if (!redisPassword) {
      throw new Error('REDIS_PASSWORD deve ser configurado em producao.');
    }

    if (redisPassword.length < minSecretLength) {
      throw new Error(
        `REDIS_PASSWORD deve ter pelo menos ${minSecretLength} caracteres em producao.`,
      );
    }

    const metricsToken = String(config.METRICS_TOKEN ?? '').trim();

    if (!metricsToken) {
      throw new Error('METRICS_TOKEN deve ser configurado em producao.');
    }

    if (metricsToken.length < minSecretLength) {
      throw new Error(
        `METRICS_TOKEN deve ter pelo menos ${minSecretLength} caracteres em producao.`,
      );
    }
  }

  const secretEnvs = [
    'JWT_SECRET',
    'JWT_CLIENT_SECRET',
    'JWT_REFRESH_SECRET',
    'JWT_CLIENT_REFRESH_SECRET',
    'OTP_SECRET',
  ];

  for (const env of secretEnvs) {
    const value = String(config[env] ?? '');

    if (value.length < minSecretLength) {
      throw new Error(
        `Variavel de ambiente ${env} deve ter pelo menos ${minSecretLength} caracteres.`,
      );
    }
  }

  const durationRegex = /^\d+[smhd]$/;

  const durationEnvs = [
    'JWT_EXPIRES_IN',
    'JWT_CLIENT_EXPIRES_IN',
    'JWT_REFRESH_EXPIRES_IN',
    'JWT_CLIENT_REFRESH_EXPIRES_IN',
  ];

  config.JWT_EXPIRES_IN ??= '8h';
  config.JWT_CLIENT_EXPIRES_IN ??= '7d';
  config.JWT_REFRESH_EXPIRES_IN ??= '30d';
  config.JWT_CLIENT_REFRESH_EXPIRES_IN ??= '30d';

  for (const env of durationEnvs) {
    const value = String(config[env] ?? '');

    if (!durationRegex.test(value)) {
      throw new Error(
        `Variavel de ambiente ${env} possui formato invalido. Use exemplos como 15m, 8h ou 30d.`,
      );
    }
  }

  config.REDIS_HOST ??= 'localhost';
  config.REDIS_PORT ??= '6379';

  if (!isProduction) {
    config.REDIS_PASSWORD ??= '';
  }

  return config;
}