function normalizeErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return [error.message, error.stack].filter(Boolean).join(' ');
  }

  if (typeof error === 'string') {
    return error;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

function isExpectedBullMqRedisTeardownNoise(error: unknown): boolean {
  const message = normalizeErrorMessage(error);

  const hasKnownRedisNoise =
    message.includes('ECONNRESET') ||
    message.includes('read ECONNRESET') ||
    message.includes('Connection is closed') ||
    message.includes('Connection is closed.') ||
    message.includes('ERR_UNHANDLED_ERROR');

  const looksLikeBullMqOrRedis =
    message.includes('bullmq') ||
    message.includes('ioredis') ||
    message.includes('RedisConnection') ||
    message.includes('queue-base') ||
    message.includes('worker.js');

  return hasKnownRedisNoise && looksLikeBullMqOrRedis;
}

const originalConsoleError = console.error;

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
    const message = args.map(normalizeErrorMessage).join(' ');

    if (isExpectedBullMqRedisTeardownNoise(message)) {
      return;
    }

    originalConsoleError(...args);
  });

  process.on('uncaughtException', (error) => {
    if (isExpectedBullMqRedisTeardownNoise(error)) {
      return;
    }

    throw error;
  });

  process.on('unhandledRejection', (reason) => {
    if (isExpectedBullMqRedisTeardownNoise(reason)) {
      return;
    }

    throw reason;
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});
