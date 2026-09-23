import { ReadStream } from 'fs';
import { createHash, createHmac, randomUUID } from 'crypto';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SignedUrlResult,
  StorageProvider,
  StorageUploadInput,
  StorageUploadResult,
} from '../storage.interface';

type SignedPayload = {
  arquivoId: string;
  empresaId: string;
  exp: number;
};

@Injectable()
export class S3StorageService implements StorageProvider {
  private readonly client: S3Client;
  private readonly bucket: string;
  private readonly signedUrlSecret: string;
  private readonly publicBaseUrl: string;

  constructor(private readonly config: ConfigService) {
    this.bucket = this.config.get<string>('AWS_BUCKET')?.trim() || '';
    if (!this.bucket) {
      throw new Error('AWS_BUCKET nao configurado para o provider S3.');
    }

    this.signedUrlSecret =
      this.config.get<string>('SIGNED_URL_SECRET')?.trim() ||
      this.config.get<string>('JWT_SECRET')?.trim() ||
      '';
    if (!this.signedUrlSecret) {
      throw new Error('SIGNED_URL_SECRET ou JWT_SECRET nao configurado.');
    }

    this.publicBaseUrl =
      this.config.get<string>('PUBLIC_BASE_URL')?.trim()?.replace(/\/$/, '') ||
      '';

    const accessKeyId = this.config.get<string>('AWS_ACCESS_KEY_ID')?.trim();
    const secretAccessKey = this.config
      .get<string>('AWS_SECRET_ACCESS_KEY')
      ?.trim();
    const endpoint = this.config.get<string>('AWS_ENDPOINT')?.trim();
    const forcePathStyle =
      this.config.get<string>('AWS_FORCE_PATH_STYLE')?.toLowerCase() === 'true';

    this.client = new S3Client({
      region: this.config.get<string>('AWS_REGION')?.trim() || 'us-east-1',
      ...(endpoint ? { endpoint } : {}),
      forcePathStyle,
      ...(accessKeyId && secretAccessKey
        ? { credentials: { accessKeyId, secretAccessKey } }
        : {}),
    });
  }

  async upload(input: StorageUploadInput): Promise<StorageUploadResult> {
    const nomeArquivo = `${randomUUID()}${this.safeExtension(input.file.originalname)}`;
    const caminhoRelativo = this.buildKey(input, nomeArquivo);
    const checksum = createHash('sha256')
      .update(input.file.buffer)
      .digest('hex');

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: caminhoRelativo,
        Body: input.file.buffer,
        ContentType: input.file.mimetype,
        ContentLength: input.file.size,
        Metadata: { checksum },
      }),
    );

    return {
      nomeArquivo,
      caminhoRelativo,
      caminhoAbsoluto: `s3://${this.bucket}/${caminhoRelativo}`,
      url: null,
      checksum,
      tamanhoBytes: input.file.size,
      mimeType: input.file.mimetype,
    };
  }

  async download(caminhoRelativo: string): Promise<ReadStream> {
    const result = await this.client.send(
      new GetObjectCommand({
        Bucket: this.bucket,
        Key: this.normalizeKey(caminhoRelativo),
      }),
    );
    if (!result.Body) {
      throw new Error('Objeto S3 retornou sem corpo.');
    }
    return result.Body as unknown as ReadStream;
  }

  async delete(caminhoRelativo: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: this.normalizeKey(caminhoRelativo),
      }),
    );
  }

  async exists(caminhoRelativo: string): Promise<boolean> {
    try {
      await this.client.send(
        new HeadObjectCommand({
          Bucket: this.bucket,
          Key: this.normalizeKey(caminhoRelativo),
        }),
      );
      return true;
    } catch (error) {
      const statusCode = (error as { $metadata?: { httpStatusCode?: number } })
        .$metadata?.httpStatusCode;
      if (statusCode === 404) return false;
      throw error;
    }
  }

  generateSignedUrl(
    arquivoId: string,
    empresaId: string,
    expiresInSeconds: number,
  ): Promise<SignedUrlResult> {
    const expiresIn = Math.max(1, Math.min(expiresInSeconds, 3600));
    const payload: SignedPayload = {
      arquivoId,
      empresaId,
      exp: Math.floor(Date.now() / 1000) + expiresIn,
    };
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
      'base64url',
    );
    const signature = createHmac('sha256', this.signedUrlSecret)
      .update(encodedPayload)
      .digest('base64url');
    const relativeUrl = `/arquivos/signed/${encodedPayload}.${signature}`;

    return Promise.resolve({
      url: this.publicBaseUrl
        ? `${this.publicBaseUrl}${relativeUrl}`
        : relativeUrl,
      expiresIn,
    });
  }

  private buildKey(input: StorageUploadInput, nomeArquivo: string): string {
    const empresaId = this.normalizeSegment(input.empresaId);
    const visibilidade = this.normalizeSegment(String(input.visibilidade));
    const subdiretorio = input.subdiretorio
      ? this.normalizeSegment(input.subdiretorio)
      : 'geral';
    return `uploads/${empresaId}/${visibilidade}/${subdiretorio}/${nomeArquivo}`;
  }

  private safeExtension(originalName: string): string {
    const match = originalName.match(/\.[A-Za-z0-9]{1,10}$/);
    return match ? match[0].toLowerCase() : '';
  }

  private normalizeSegment(value: string): string {
    const normalized = value.trim().replace(/\\/g, '/');
    if (
      !normalized ||
      normalized.startsWith('/') ||
      normalized.includes('..')
    ) {
      throw new Error('Segmento de storage invalido.');
    }
    return normalized
      .split('/')
      .filter(Boolean)
      .map((segment) => segment.replace(/[^A-Za-z0-9._-]/g, '_'))
      .join('/');
  }

  private normalizeKey(value: string): string {
    const normalized = value.trim().replace(/\\/g, '/');
    if (
      !normalized ||
      normalized.startsWith('/') ||
      normalized.includes('..')
    ) {
      throw new Error('Chave de storage invalida.');
    }
    return normalized;
  }
}
