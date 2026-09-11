import * as fs from 'fs';

process.env.NODE_ENV = 'test';

function loadEnvTest() {
  if (!fs.existsSync('.env.test')) {
    return;
  }

  const lines = fs.readFileSync('.env.test', 'utf8').split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const index = trimmed.indexOf('=');

    if (index === -1) {
      continue;
    }

    const key = trimmed.slice(0, index).trim();
    const value = trimmed
      .slice(index + 1)
      .trim()
      .replace(/^["']|["']$/g, '');

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvTest();

const testDatabaseUrl = process.env.DATABASE_URL_TEST;

if (!testDatabaseUrl) {
  throw new Error('DATABASE_URL_TEST é obrigatório para executar testes.');
}

if (!/beauty_core_test|_test/i.test(testDatabaseUrl)) {
  throw new Error(
    'DATABASE_URL_TEST inseguro. Use um banco exclusivo de teste.',
  );
}

process.env.DATABASE_URL = testDatabaseUrl;

process.env.SCHEDULER_ENABLED = process.env.SCHEDULER_ENABLED ?? 'false';
process.env.SWAGGER_ENABLED = process.env.SWAGGER_ENABLED ?? 'true';
process.env.JWT_SECRET =
  process.env.JWT_SECRET ?? 'test-admin-jwt-secret-with-more-than-32-chars';
process.env.JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET ??
  'test-admin-refresh-secret-with-more-than-32-chars';
process.env.JWT_CLIENT_SECRET =
  process.env.JWT_CLIENT_SECRET ??
  'test-client-jwt-secret-with-more-than-32-chars';
process.env.JWT_CLIENT_REFRESH_SECRET =
  process.env.JWT_CLIENT_REFRESH_SECRET ??
  'test-client-refresh-secret-with-more-than-32-chars';
