import { createHash } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { S3StorageService } from '../../src/modules/arquivos/storage/providers/s3-storage.service';

describe('Cloudflare R2 live integration', () => {
  it('faz round-trip real com checksum, isolamento de chave e limpeza', async () => {
    const requiredKeys = [
      'AWS_BUCKET',
      'AWS_REGION',
      'AWS_ENDPOINT',
      'AWS_ACCESS_KEY_ID',
      'AWS_SECRET_ACCESS_KEY',
      'SIGNED_URL_SECRET',
    ];
    const missingKeys = requiredKeys.filter((key) => !process.env[key]);
    if (missingKeys.length > 0) {
      throw new Error(
        `Variaveis ausentes para teste R2: ${missingKeys.join(', ')}`,
      );
    }

    const config = {
      get: (key: string) => process.env[key],
    } as unknown as ConfigService;
    const service = new S3StorageService(config);
    const content = Buffer.from(
      `Beauty Core R2 live integration ${Date.now()}`,
      'utf8',
    );
    const file = {
      fieldname: 'file',
      originalname: 'r2-integration.txt',
      encoding: '7bit',
      mimetype: 'text/plain',
      size: content.length,
      destination: '',
      filename: 'r2-integration.txt',
      path: '',
      buffer: content,
      stream: null as never,
    } as Express.Multer.File;
    const expectedChecksum = createHash('sha256').update(content).digest('hex');
    let caminhoRelativo = '';

    try {
      const upload = await service.upload({
        file,
        empresaId: 'integration-test-tenant',
        tipo: 'DOCUMENTO',
        visibilidade: 'PRIVADA' as never,
        subdiretorio: 'r2-live-test',
      });
      caminhoRelativo = upload.caminhoRelativo;

      expect(upload.caminhoRelativo).toMatch(
        /^uploads\/integration-test-tenant\/PRIVADA\/r2-live-test\//,
      );
      expect(upload.checksum).toBe(expectedChecksum);
      expect(upload.mimeType).toBe('text/plain');
      expect(upload.tamanhoBytes).toBe(content.length);
      await expect(service.exists(caminhoRelativo)).resolves.toBe(true);

      const readable = await service.download(caminhoRelativo);
      const chunks: Buffer[] = [];
      for await (const chunk of readable as unknown as AsyncIterable<
        Buffer | string
      >) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }
      expect(Buffer.concat(chunks)).toEqual(content);
    } finally {
      if (caminhoRelativo) {
        await service.delete(caminhoRelativo);
        await expect(service.exists(caminhoRelativo)).resolves.toBe(false);
      }
    }
  });
});
