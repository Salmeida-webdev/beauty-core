import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { Server } from 'node:net';

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord | undefined {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return undefined;
  }

  return value as JsonRecord;
}

function readSlug(value: unknown): string | undefined {
  const record = asRecord(value);
  const data = asRecord(record?.data);
  const empresa = asRecord(record?.empresa);
  const nestedEmpresa = asRecord(data?.empresa);
  const candidates = [
    record?.slug,
    data?.slug,
    empresa?.slug,
    nestedEmpresa?.slug,
  ];

  return candidates.find(
    (candidate): candidate is string => typeof candidate === 'string',
  );
}

function asHttpServer<T extends Server>(app: INestApplication<T>): T {
  return app.getHttpServer();
}

export async function expectTenantOk<T extends Server>(
  app: INestApplication<T>,
  slug: string,
): Promise<JsonRecord> {
  const response = await request(asHttpServer(app))
    .get('/public/tenant/' + slug)
    .expect(200);
  const body = asRecord(response.body);

  if (!body) {
    throw new Error('Resposta do tenant público não é um objeto JSON.');
  }

  expect(readSlug(body)).toBe(slug);

  return body;
}
