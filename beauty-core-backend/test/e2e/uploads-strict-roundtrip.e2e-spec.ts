import request from 'supertest';
import { createHash } from 'crypto';
import { promises as fs } from 'fs';
import { resolve } from 'path';
import type { Response } from 'superagent';

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';
import { bearer, loginAdmin } from '../helpers/auth.helper';
import { createTempUploadFile } from '../helpers/upload.helper';

type UploadBody = {
  id: string;
  caminho: string;
  checksum: string;
  tamanhoBytes: number;
  visibilidade: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function requiredString(record: Record<string, unknown>, key: string): string {
  const value = record[key];
  if (typeof value !== 'string' || !value) {
    throw new Error('Campo de upload ausente: ' + key);
  }
  return value;
}

function requiredNumber(record: Record<string, unknown>, key: string): number {
  const value = record[key];
  if (typeof value !== 'number') {
    throw new Error('Campo numerico de upload ausente: ' + key);
  }
  return value;
}

function parseUploadBody(value: unknown): UploadBody {
  if (!isRecord(value)) {
    throw new Error('Resposta de upload invalida.');
  }
  return {
    id: requiredString(value, 'id'),
    caminho: requiredString(value, 'caminho'),
    checksum: requiredString(value, 'checksum'),
    tamanhoBytes: requiredNumber(value, 'tamanhoBytes'),
    visibilidade: requiredString(value, 'visibilidade'),
  };
}

function parseDownloadedBody(value: unknown): Buffer {
  if (!Buffer.isBuffer(value)) {
    throw new Error('Resposta de download nao e Buffer.');
  }
  return value;
}

function requestApp(app: unknown) {
  const application = app as {
    getHttpServer: () => Parameters<typeof request>[0];
  };
  return request(application.getHttpServer());
}

function binaryParser(
  res: Response,
  callback: (error: Error | null, body?: Buffer) => void,
) {
  const chunks: Buffer[] = [];
  res.on('data', (chunk: Buffer) => chunks.push(Buffer.from(chunk)));
  res.on('end', () => callback(null, Buffer.concat(chunks)));
  res.on('error', (error: Error) => callback(error));
}

describe('Uploads strict HTTP round-trip E2E', () => {
  let ctx: E2eContext;
  let adminToken: string;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
    adminToken = (await loginAdmin(ctx.app)).access_token;
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('faz upload, baixa o mesmo conteudo, compara checksum e remove o fixture', async () => {
    const content = Buffer.from(
      '%PDF-1.4\nBeauty Core strict round-trip fixture\n',
      'utf8',
    );
    const expectedChecksum = createHash('sha256').update(content).digest('hex');
    const file = createTempUploadFile({
      filename: 'strict-roundtrip.pdf',
      content,
    });

    let arquivoId: string | undefined;
    let caminho: string | undefined;

    try {
      const upload = await requestApp(ctx.app)
        .post('/arquivos/private/documentos')
        .set('Authorization', bearer(adminToken))
        .attach('file', file.filePath)
        .expect(201);
      const uploadBody = parseUploadBody(upload.body as unknown);

      arquivoId = uploadBody.id;
      caminho = uploadBody.caminho;

      expect(arquivoId).toEqual(expect.any(String));
      expect(caminho).toEqual(expect.any(String));
      expect(uploadBody.checksum).toBe(expectedChecksum);
      expect(uploadBody.tamanhoBytes).toBe(content.length);
      expect(uploadBody.visibilidade).toBe('PRIVADO');

      const download = await requestApp(ctx.app)
        .get('/arquivos/' + arquivoId + '/download')
        .set('Authorization', bearer(adminToken))
        .buffer(true)
        .parse(binaryParser)
        .expect(200);
      const downloadedBody = parseDownloadedBody(download.body as unknown);

      expect(downloadedBody.equals(content)).toBe(true);
      expect(createHash('sha256').update(downloadedBody).digest('hex')).toBe(
        uploadBody.checksum,
      );
    } finally {
      if (arquivoId) {
        await requestApp(ctx.app)
          .delete('/arquivos/' + arquivoId)
          .set('Authorization', bearer(adminToken))
          .expect(200);
      }

      if (caminho) {
        const uploadsDir = process.env.UPLOADS_DIR || 'uploads';
        await fs.rm(resolve(process.cwd(), uploadsDir, caminho), {
          force: true,
        });
      }

      file.cleanup();
    }
  });
});
