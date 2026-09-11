import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ArquivoVisibilidade } from '@prisma/client';
import { createHash, createHmac, randomUUID } from 'crypto';
import { createReadStream, ReadStream } from 'fs';
import { access, mkdir, rename, writeFile } from 'fs/promises';
import { dirname, extname, resolve, sep } from 'path';
import {
  SignedUrlResult,
  StorageProvider,
  StorageUploadInput,
  StorageUploadResult,
} from './storage.interface';

interface SignedPayload {
  arquivoId: string;
  empresaId: string;
  exp: number;
}

@Injectable()
export class LocalStorageService implements StorageProvider {
  private readonly baseDir: string;

  constructor(private readonly config: ConfigService) {
    const uploadsDir = this.config.get<string>('UPLOADS_DIR') || 'uploads';
    this.baseDir = resolve(process.cwd(), uploadsDir);
  }

  async upload(input: StorageUploadInput): Promise<StorageUploadResult> {
    if (!input.file) {
      throw new BadRequestException('Arquivo não enviado.');
    }

    if (!input.file.buffer) {
      throw new BadRequestException(
        'Arquivo inválido. O storage enterprise exige memoryStorage.',
      );
    }

    const checksum = this.createChecksum(input.file.buffer);
    const extensao = this.getSafeExtension(input.file.originalname);

    const nomeArquivo = `${randomUUID()}${extensao}`;

    const raiz =
      input.visibilidade === ArquivoVisibilidade.PRIVADO ? 'private' : 'public';

    const subdiretorioSeguro = this.sanitizeFolder(
      input.subdiretorio || String(input.tipo).toLowerCase(),
    );

    const caminhoRelativo = [
      raiz,
      input.empresaId,
      subdiretorioSeguro,
      nomeArquivo,
    ].join('/');

    const caminhoAbsoluto = this.resolveSafePath(caminhoRelativo);

    await mkdir(dirname(caminhoAbsoluto), { recursive: true });
    await writeFile(caminhoAbsoluto, input.file.buffer);

    const url =
      input.visibilidade === ArquivoVisibilidade.PUBLICO
        ? `/uploads/public/${input.empresaId}/${subdiretorioSeguro}/${nomeArquivo}`
        : null;

    return {
      nomeArquivo,
      caminhoRelativo,
      caminhoAbsoluto,
      url,
      checksum,
      tamanhoBytes: input.file.size,
      mimeType: input.file.mimetype,
    };
  }

  async download(caminhoRelativo: string): Promise<ReadStream> {
    const caminhoAbsoluto = this.resolveSafePath(caminhoRelativo);

    const existe = await this.exists(caminhoRelativo);

    if (!existe) {
      throw new NotFoundException('Arquivo físico não encontrado.');
    }

    return createReadStream(caminhoAbsoluto);
  }

  async delete(caminhoRelativo: string): Promise<void> {
    const existe = await this.exists(caminhoRelativo);

    if (!existe) {
      return;
    }

    const origem = this.resolveSafePath(caminhoRelativo);

    const destinoRelativo = [
      'deleted',
      `${Date.now()}-${randomUUID()}-${caminhoRelativo.replace(/[\\/]/g, '-')}`,
    ].join('/');

    const destino = this.resolveSafePath(destinoRelativo);

    await mkdir(dirname(destino), { recursive: true });
    await rename(origem, destino);
  }

  async exists(caminhoRelativo: string): Promise<boolean> {
    try {
      await access(this.resolveSafePath(caminhoRelativo));
      return true;
    } catch {
      return false;
    }
  }

  async generateSignedUrl(
    arquivoId: string,
    empresaId: string,
    expiresInSeconds: number,
  ): Promise<SignedUrlResult> {
    await Promise.resolve();
    const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;

    const payload = Buffer.from(
      JSON.stringify({
        arquivoId,
        empresaId,
        exp,
      } satisfies SignedPayload),
    ).toString('base64url');

    const signature = this.sign(payload);

    return {
      url: `/arquivos/signed/${payload}.${signature}`,
      expiresIn: expiresInSeconds,
    };
  }

  gerarUrl(caminhoRelativo: string): string {
    if (!caminhoRelativo) {
      return '';
    }

    const normalized = caminhoRelativo.replace(/\\/g, '/').replace(/^\/+/, '');

    if (normalized.startsWith('uploads/public/')) {
      return `/${normalized}`;
    }

    if (normalized.startsWith('public/')) {
      return `/uploads/${normalized}`;
    }

    if (normalized.startsWith('uploads/')) {
      return `/${normalized}`;
    }

    return `/uploads/public/${normalized}`;
  }

  validateSignedToken(token: string): SignedPayload {
    const [payload, signature] = token.split('.');

    if (!payload || !signature) {
      throw new BadRequestException('URL assinada inválida.');
    }

    const expectedSignature = this.sign(payload);

    if (signature !== expectedSignature) {
      throw new BadRequestException('Assinatura inválida.');
    }

    let data: SignedPayload;

    try {
      data = JSON.parse(
        Buffer.from(payload, 'base64url').toString('utf8'),
      ) as SignedPayload;
    } catch {
      throw new BadRequestException('Payload da URL assinada inválido.');
    }

    if (!data.arquivoId || !data.empresaId || !data.exp) {
      throw new BadRequestException('Payload da URL assinada incompleto.');
    }

    if (data.exp < Math.floor(Date.now() / 1000)) {
      throw new BadRequestException('URL assinada expirada.');
    }

    return data;
  }

  private createChecksum(buffer: Buffer): string {
    return createHash('sha256').update(buffer).digest('hex');
  }

  private getSafeExtension(originalName: string): string {
    const extension = extname(originalName || '').toLowerCase();

    const blockedExtensions = [
      '.exe',
      '.dll',
      '.bat',
      '.cmd',
      '.sh',
      '.apk',
      '.jar',
      '.php',
      '.ps1',
      '.scr',
    ];

    if (!extension || blockedExtensions.includes(extension)) {
      throw new BadRequestException('Extensão de arquivo não permitida.');
    }

    return extension;
  }

  private sanitizeFolder(value: string): string {
    return String(value || 'arquivos')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9-_]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase();
  }

  private resolveSafePath(caminhoRelativo: string): string {
    if (!caminhoRelativo) {
      throw new BadRequestException('Caminho de arquivo não informado.');
    }

    if (caminhoRelativo.includes('..')) {
      throw new BadRequestException('Caminho de arquivo inválido.');
    }

    const normalizedRelative = caminhoRelativo.replace(/[\\/]+/g, sep);
    const resolved = resolve(this.baseDir, normalizedRelative);

    const baseWithSeparator = this.baseDir.endsWith(sep)
      ? this.baseDir
      : `${this.baseDir}${sep}`;

    if (resolved !== this.baseDir && !resolved.startsWith(baseWithSeparator)) {
      throw new BadRequestException('Caminho de arquivo fora do storage.');
    }

    return resolved;
  }

  private sign(payload: string): string {
    const secret =
      this.config.get<string>('SIGNED_URL_SECRET') ||
      this.config.get<string>('JWT_SECRET');

    if (!secret) {
      throw new InternalServerErrorException(
        'SIGNED_URL_SECRET ou JWT_SECRET não configurado.',
      );
    }

    return createHmac('sha256', secret).update(payload).digest('base64url');
  }
}
