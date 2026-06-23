export async function wait(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function waitForCondition(
  predicate: () => Promise<boolean>,
  options?: {
    timeoutMs?: number;
    intervalMs?: number;
  }
) {
  const timeoutMs = options?.timeoutMs ?? 10000;
  const intervalMs = options?.intervalMs ?? 250;
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    if (await predicate()) {
      return;
    }

    await wait(intervalMs);
  }

  throw new Error('Timeout aguardando condição assíncrona.');
}


