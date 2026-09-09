import { ConfigService } from '@nestjs/config';
import { ArquivoVisibilidade, TipoArquivo } from '@prisma/client';
import { createHash } from 'crypto';
import { mkdtemp, rm } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';

import { LocalStorageService } from '../../src/modules/arquivos/storage/local-storage.service';

async function readStream(stream: NodeJS.ReadableStream): Promise<Buffer> {
  const chunks: Buffer[] = [];

  for await (const chunk of stream as AsyncIterable<Buffer | string>) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return Buffer.concat(chunks);
}

describe('LocalStorageService real round-trip', () => {
  let fixtureRoot: string;
  let storage: LocalStorageService;

  beforeEach(async () => {
    fixtureRoot = await mkdtemp(join(tmpdir(), 'beauty-core-storage-'));
    storage = new LocalStorageService(
      new ConfigService({
        UPLOADS_DIR: fixtureRoot,
      }),
    );
  });

  afterEach(async () => {
    await rm(fixtureRoot, { recursive: true, force: true });
  });

  it('faz upload, localiza, baixa, compara checksum e remove o fixture', async () => {
    const empresaId = 'empresa-roundtrip';
    const content = Buffer.from(
      'Beauty Core Chat 03 storage round-trip\n',
      'utf8',
    );

    const uploaded = await storage.upload({
      empresaId,
      tipo: TipoArquivo.OUTRO,
      visibilidade: ArquivoVisibilidade.PRIVADO,
      subdiretorio: 'fixtures-chat03',
      file: {
        fieldname: 'file',
        originalname: 'roundtrip.txt',
        encoding: '7bit',
        mimetype: 'text/plain',
        size: content.length,
        destination: '',
        filename: 'roundtrip.txt',
        path: '',
        buffer: content,
        stream: undefined as never,
      },
    });

    expect(uploaded.caminhoRelativo).toContain(`private/${empresaId}/`);
    expect(uploaded.tamanhoBytes).toBe(content.length);
    expect(uploaded.checksum).toBe(
      createHash('sha256').update(content).digest('hex'),
    );
    await expect(storage.exists(uploaded.caminhoRelativo)).resolves.toBe(true);

    const downloaded = await readStream(
      await storage.download(uploaded.caminhoRelativo),
    );

    expect(downloaded.equals(content)).toBe(true);
    expect(createHash('sha256').update(downloaded).digest('hex')).toBe(
      uploaded.checksum,
    );

    await storage.delete(uploaded.caminhoRelativo);
    await expect(storage.exists(uploaded.caminhoRelativo)).resolves.toBe(false);
  });

  it('rejeita extensÃ£o bloqueada e path traversal', async () => {
    const content = Buffer.from('fixture', 'utf8');

    await expect(
      storage.upload({
        empresaId: 'empresa-roundtrip',
        tipo: TipoArquivo.OUTRO,
        visibilidade: ArquivoVisibilidade.PRIVADO,
        file: {
          fieldname: 'file',
          originalname: 'malicioso.ps1',
          encoding: '7bit',
          mimetype: 'application/octet-stream',
          size: content.length,
          destination: '',
          filename: 'malicioso.ps1',
          path: '',
          buffer: content,
          stream: undefined as never,
        },
      }),
    ).rejects.toThrow(/Extens/);

    await expect(storage.download('../fora-do-storage.txt')).rejects.toThrow(
      /Caminho de arquivo/,
    );
  });
});
