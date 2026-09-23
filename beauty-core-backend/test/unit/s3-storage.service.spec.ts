import { createHash } from 'crypto';
import { Readable } from 'stream';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import type {
  DeleteObjectCommandInput,
  GetObjectCommandInput,
  HeadObjectCommandInput,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { ArquivoVisibilidade, TipoArquivo } from '@prisma/client';
import { S3StorageService } from '../../src/modules/arquivos/storage/providers/s3-storage.service';

type CommandEnvelope<T> = { input: T };
type JsonRecord = Record<string, unknown>;

const mockSend: jest.MockedFunction<(command: unknown) => Promise<unknown>> =
  jest.fn();

function parseJsonRecord(value: string): JsonRecord {
  const parsed: unknown = JSON.parse(value);

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error('Payload assinado inválido.');
  }

  return parsed as JsonRecord;
}

jest.mock('@aws-sdk/client-s3', () => ({
  S3Client: jest.fn().mockImplementation(() => ({ send: mockSend })),
  DeleteObjectCommand: jest.fn(
    (
      input: DeleteObjectCommandInput,
    ): CommandEnvelope<DeleteObjectCommandInput> => ({
      input,
    }),
  ),
  GetObjectCommand: jest.fn(
    (input: GetObjectCommandInput): CommandEnvelope<GetObjectCommandInput> => ({
      input,
    }),
  ),
  HeadObjectCommand: jest.fn(
    (
      input: HeadObjectCommandInput,
    ): CommandEnvelope<HeadObjectCommandInput> => ({
      input,
    }),
  ),
  PutObjectCommand: jest.fn(
    (input: PutObjectCommandInput): CommandEnvelope<PutObjectCommandInput> => ({
      input,
    }),
  ),
}));

describe('S3StorageService', () => {
  const configValues: Record<string, string> = {
    AWS_BUCKET: 'beauty-core-private-test',
    AWS_REGION: 'us-east-1',
    AWS_FORCE_PATH_STYLE: 'false',
    SIGNED_URL_SECRET: 'unit-test-only-secret',
    PUBLIC_BASE_URL: 'https://demo.example.test',
  };

  const createService = (
    values: Record<string, string> = configValues,
  ): S3StorageService => new S3StorageService(new ConfigService(values));

  const createFile = (content: string): Express.Multer.File => {
    const buffer = Buffer.from(content, 'utf8');

    return {
      fieldname: 'file',
      originalname: 'foto.png',
      encoding: '7bit',
      mimetype: 'image/png',
      size: buffer.length,
      destination: '',
      filename: 'foto.png',
      path: '',
      buffer,
      stream: Readable.from([]),
    };
  };

  beforeEach(() => {
    mockSend.mockReset();
    jest.clearAllMocks();
  });

  it('faz upload privado com chave por empresa, checksum, MIME e tamanho', async () => {
    mockSend.mockResolvedValueOnce({});
    const service = createService();
    const file = createFile('conteudo controlado');

    const result = await service.upload({
      file,
      empresaId: 'empresa-123',
      tipo: TipoArquivo.IMAGEM_SERVICO,
      visibilidade: ArquivoVisibilidade.PUBLICO,
      subdiretorio: 'avatars',
    });

    const expectedChecksum = createHash('sha256')
      .update(file.buffer)
      .digest('hex');
    expect(result.checksum).toBe(expectedChecksum);
    expect(result.url).toBeNull();
    expect(result.caminhoRelativo).toMatch(
      /^uploads\/empresa-123\/PUBLICO\/avatars\/[0-9a-f-]+\.png$/,
    );
    expect(PutObjectCommand).toHaveBeenCalledTimes(1);
    expect(PutObjectCommand).toHaveBeenCalledWith(
      expect.objectContaining({
        Bucket: 'beauty-core-private-test',
        Key: result.caminhoRelativo,
        Body: file.buffer,
        ContentType: 'image/png',
        ContentLength: file.size,
        Metadata: { checksum: expectedChecksum },
      }),
    );
    expect(S3Client).toHaveBeenCalledWith(
      expect.objectContaining({ region: 'us-east-1', forcePathStyle: false }),
    );
  });

  it('faz download e delete usando a chave privada normalizada', async () => {
    const stream = Readable.from(['conteudo']);
    mockSend.mockResolvedValueOnce({ Body: stream });
    const service = createService();

    const downloaded = await service.download(
      'uploads/empresa-123/PUBLICO/avatars/foto.png',
    );
    expect(downloaded).toBe(stream);
    expect(GetObjectCommand).toHaveBeenCalledWith({
      Bucket: 'beauty-core-private-test',
      Key: 'uploads/empresa-123/PUBLICO/avatars/foto.png',
    });

    mockSend.mockResolvedValueOnce({});
    await service.delete('uploads/empresa-123/PUBLICO/avatars/foto.png');
    expect(DeleteObjectCommand).toHaveBeenCalledWith({
      Bucket: 'beauty-core-private-test',
      Key: 'uploads/empresa-123/PUBLICO/avatars/foto.png',
    });
  });

  it('diferencia objeto existente, inexistente e erro de bucket', async () => {
    const service = createService();
    mockSend.mockResolvedValueOnce({});
    await expect(
      service.exists('uploads/empresa-123/PUBLICO/a.png'),
    ).resolves.toBe(true);
    expect(HeadObjectCommand).toHaveBeenCalledWith({
      Bucket: 'beauty-core-private-test',
      Key: 'uploads/empresa-123/PUBLICO/a.png',
    });

    mockSend.mockRejectedValueOnce({ $metadata: { httpStatusCode: 404 } });
    await expect(
      service.exists('uploads/empresa-123/PUBLICO/missing.png'),
    ).resolves.toBe(false);

    const bucketError = { $metadata: { httpStatusCode: 500 } };
    mockSend.mockRejectedValueOnce(bucketError);
    await expect(
      service.exists('uploads/empresa-123/PUBLICO/error.png'),
    ).rejects.toEqual(bucketError);
  });

  it('rejeita chaves inseguras antes de chamar o bucket', async () => {
    const service = createService();

    await expect(
      service.exists('../outra-empresa/segredo.png'),
    ).rejects.toThrow('Chave de storage invalida');
    await expect(service.download('/arquivo-absoluto.png')).rejects.toThrow(
      'Chave de storage invalida',
    );
    await expect(service.delete('')).rejects.toThrow(
      'Chave de storage invalida',
    );
    expect(mockSend).not.toHaveBeenCalled();
  });

  it('gera URL assinada da aplicacao com empresa, arquivo e expiracao limitada', async () => {
    const service = createService();
    const result = await service.generateSignedUrl(
      'arquivo-1',
      'empresa-1',
      7200,
    );
    const relativeUrl = result.url.replace('https://demo.example.test', '');
    const token = relativeUrl.split('/').pop();

    if (!token) {
      throw new Error('URL assinada sem token.');
    }

    const [encodedPayload, signature] = token.split('.');

    if (!encodedPayload || !signature) {
      throw new Error('Token assinado inválido.');
    }

    const payload = parseJsonRecord(
      Buffer.from(encodedPayload, 'base64url').toString('utf8'),
    );

    expect(result.url).toMatch(
      /^https:\/\/demo\.example\.test\/arquivos\/signed\//,
    );
    expect(result.expiresIn).toBe(3600);
    expect(payload).toEqual(
      expect.objectContaining({
        arquivoId: 'arquivo-1',
        empresaId: 'empresa-1',
      }),
    );
    expect(signature).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(result.url).not.toContain('AWS_SECRET_ACCESS_KEY');
  });

  it('falha de forma fechada quando faltam bucket ou segredo de assinatura', () => {
    const missingBucket = { ...configValues, AWS_BUCKET: '' };
    expect(() => createService(missingBucket)).toThrow('AWS_BUCKET');

    const missingSecret = {
      ...configValues,
      SIGNED_URL_SECRET: '',
      JWT_SECRET: '',
    };
    expect(() => createService(missingSecret)).toThrow(
      'SIGNED_URL_SECRET ou JWT_SECRET',
    );
  });
});
