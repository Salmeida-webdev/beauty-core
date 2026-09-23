# Beauty Core - Chat A - Bloco 02C - Freeze do contrato de storage

- **Status:** PASS
- **Inicio:** 2026-09-11T19:43:53.7296814-03:00
- **Termino:** 2026-09-11T19:43:54.6049671-03:00
- **Projeto:** `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core`
- **Raiz Git:** `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core`
- **Relatorio:** `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\docs\chat-a-storage\chat-a-bloco02c-freeze-storage-contract-20260911-194353.md`

## Objetivo

Registrar as assinaturas e o wiring exatos antes da implementacao do provider S3-compatible.

## Regras preservadas

- Somente leitura do codigo e dos metadados.
- Nenhuma dependencia instalada ou modificada.
- Nenhum arquivo de codigo alterado.
- Nenhuma migration, stage, commit, push, merge, tag, release ou deploy.
- Nenhum segredo ou credencial exibido.

## Checks

- **PASS** - StorageProvider existe: interface
- **PASS** - LocalStorageService existe: provider local
- **PASS** - Factory existe: factory
- **PASS** - Modulo existe: Nest module
- **PASS** - Download usa StorageFactory: download
- **PASS** - Factory contem ramo S3: ramo S3
- **ATTENTION** - SDK ainda ausente ou presente: client-s3 ausente
- **ATTENTION** - Lockfile ainda ausente ou presente: client-s3 nao localizado no lockfile

## Comandos executados

### Raiz Git
ExitCode: 0
```text
C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core
```

### Branch e HEAD
ExitCode: 0
```text
main
7da979412362ba5abc7ff2d03f26a2fd2cdd9dcd
```

### Status local preservado
ExitCode: 0
```text
## main...origin/main
 M beauty-core-backend/prisma/schema.prisma
 M beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts
 M beauty-core-backend/src/modules/configuracao-whatsapp/dto/create-configuracao-whatsapp.dto.ts
 M beauty-core-backend/src/modules/mensagens-whatsapp/mensagens-whatsapp.service.ts
 M beauty-core-backend/src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider.ts
?? beauty-core-backend/docs/chat-a-bloco00-baseline-20260911-190953.md
?? beauty-core-backend/docs/chat-a-bloco01-reconciliacao-meta-20260911-191539.md
?? beauty-core-backend/docs/chat-a-bloco01-reconciliacao-meta-20260911-192225.md
?? beauty-core-backend/docs/chat-a-meta/
?? beauty-core-backend/docs/chat-a-storage/
?? beauty-core-backend/docs/meta-whatsapp/
?? beauty-core-backend/prisma/migrations/20260911150000_meta_whatsapp_tenant_connection/
?? beauty-core-ui/public/images/portal/states/source/portal-offline.webp
```

### Diff check no contrato de storage
ExitCode: 0
(sem saida)

### Node e npm disponiveis
ExitCode: 0
```text
v22.17.1
10.9.2
```

### beauty-core-backend/src/modules/arquivos/storage/storage.interface.ts
```text
import { ReadStream } from 'fs';
import { ArquivoVisibilidade, TipoArquivo } from '@prisma/client';

export interface StorageUploadInput {
  file: Express.Multer.File;
  empresaId: string;
  tipo: TipoArquivo;
  visibilidade: ArquivoVisibilidade;
  subdiretorio?: string;
}

export interface StorageUploadResult {
  nomeArquivo: string;
  caminhoRelativo: string;
  caminhoAbsoluto: string;
  url: string | null;
  checksum: string;
  tamanhoBytes: number;
  mimeType: string;
}

export interface SignedUrlResult {
  url: string;
  expiresIn: number;
}

export interface StorageProvider {
  upload(input: StorageUploadInput): Promise<StorageUploadResult>;

  download(caminhoRelativo: string): Promise<ReadStream>;

  delete(caminhoRelativo: string): Promise<void>;

  exists(caminhoRelativo: string): Promise<boolean>;

  generateSignedUrl(
    arquivoId: string,
    empresaId: string,
    expiresInSeconds: number,
  ): Promise<SignedUrlResult>;
}
```

### beauty-core-backend/src/modules/arquivos/storage/storage.factory.ts
```text
import { Injectable, NotImplementedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TipoArmazenamento } from '@prisma/client';
import { LocalStorageService } from './local-storage.service';
import { StorageProvider } from './storage.interface';

@Injectable()
export class StorageFactory {
  constructor(
    private readonly config: ConfigService,
    private readonly localStorage: LocalStorageService,
  ) {}

  getProvider(): StorageProvider {
    const provider = this.getTipoArmazenamento();

    switch (provider) {
      case TipoArmazenamento.LOCAL:
        return this.localStorage;

      case TipoArmazenamento.S3:
        throw new NotImplementedException(
          'Provider S3 preparado, mas ainda não implementado.',
        );

      case TipoArmazenamento.CLOUDINARY:
        throw new NotImplementedException(
          'Provider Cloudinary preparado, mas ainda não implementado.',
        );

      default:
        return this.localStorage;
    }
  }

  getTipoArmazenamento(): TipoArmazenamento {
    const provider =
      this.config.get<string>('STORAGE_PROVIDER') || TipoArmazenamento.LOCAL;

    if (
      provider === TipoArmazenamento.LOCAL ||
      provider === TipoArmazenamento.S3 ||
      provider === TipoArmazenamento.CLOUDINARY
    ) {
      return provider;
    }

    return TipoArmazenamento.LOCAL;
  }
}
```

### beauty-core-backend/src/modules/arquivos/arquivos.module.ts
```text
import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { ArquivosController } from './arquivos.controller';
import { ArquivosService } from './arquivos.service';

import { LocalStorageService } from './storage/local-storage.service';

import { AuditoriaModule } from '../auditoria/auditoria.module';
import { StorageFactory } from './storage/storage.factory';
import { ArquivosDownloadController } from './arquivos-download.controller';
import { ArquivosDownloadService } from './arquivos-download.service';
import { ArquivoAccessPolicyService } from './arquivo-access-policy.service';
import { ArquivosCleanupService } from './arquivos-cleanup.service';

@Module({
  imports: [PrismaModule, TenantModule, AuditoriaModule],

  controllers: [ArquivosController, ArquivosDownloadController],

  providers: [
    ArquivosService,
    LocalStorageService,
    StorageFactory,
    ArquivosDownloadService,
    ArquivoAccessPolicyService,
    ArquivosCleanupService,
  ],

  exports: [ArquivosDownloadService, ArquivosService, ArquivosCleanupService],
})
export class ArquivosModule {}
```

### beauty-core-backend/src/modules/arquivos/arquivos-download.service.ts
```text
import { LocalStorageService } from './storage/local-storage.service';
import { StorageFactory } from './storage/storage.factory';
  empresaId?: string;
interface DownloadResult {
export class ArquivosDownloadService {
    private readonly storageFactory: StorageFactory,
    private readonly localStorage: LocalStorageService,
  async downloadProtegido(
  ): Promise<DownloadResult> {
    if (!user?.empresaId) {
        empresaId: user.empresaId,
    await this.incrementarDownload(arquivo.id, arquivo.empresaId);
      acao: 'DOWNLOAD_ARQUIVO',
      origem: 'download_protegido',
      mensagem: 'Download protegido de arquivo realizado com sucesso.',
    if (!user?.empresaId) {
        empresaId: user.empresaId,
    const storage = this.storageFactory.getProvider();
    const signedUrl = await storage.generateSignedUrl(
      arquivo.empresaId,
  async downloadPorSignedToken(token=[REDACTED] Promise<DownloadResult> {
    const payload = this.localStorage.validateSignedToken(token);
        empresaId: payload.empresaId,
    await this.incrementarDownload(arquivo.id, arquivo.empresaId);
      acao: 'DOWNLOAD_ARQUIVO',
      origem: 'download_signed_url',
      mensagem: 'Download por URL assinada realizado com sucesso.',
    const storage = this.storageFactory.getProvider();
    const existe = await storage.exists(arquivo.caminho);
    return storage.download(arquivo.caminho);
  private async incrementarDownload(id: string, empresaId: string) {
        empresaId,
        downloadCount: {
        ultimoDownloadEm: new Date(),
      empresaId: params.arquivo.empresaId,
```

### beauty-core-backend/src/modules/arquivos/storage/local-storage.service.ts
```text
import {
import { ConfigService } from '@nestjs/config';
import { ArquivoVisibilidade } from '@prisma/client';
import { createHash, createHmac, randomUUID } from 'crypto';
import { createReadStream, ReadStream } from 'fs';
import { access, mkdir, rename, writeFile } from 'fs/promises';
import { dirname, extname, resolve, sep } from 'path';
import {
  SignedUrlResult,
  StorageUploadInput,
  StorageUploadResult,
interface SignedPayload {
  empresaId: string;
export class LocalStorageService implements StorageProvider {
    const uploadsDir = this.config.get<string>('UPLOADS_DIR') || 'uploads';
    this.baseDir = resolve(process.cwd(), uploadsDir);
  async upload(input: StorageUploadInput): Promise<StorageUploadResult> {
    const checksum = this.createChecksum(input.file.buffer);
      input.empresaId,
    const caminhoAbsoluto = this.resolveSafePath(caminhoRelativo);
        ? `/uploads/public/${input.empresaId}/${subdiretorioSeguro}/${nomeArquivo}`
      checksum,
  async download(caminhoRelativo: string): Promise<ReadStream> {
    const caminhoAbsoluto = this.resolveSafePath(caminhoRelativo);
    const existe = await this.exists(caminhoRelativo);
  async delete(caminhoRelativo: string): Promise<void> {
    const existe = await this.exists(caminhoRelativo);
    const origem = this.resolveSafePath(caminhoRelativo);
    const destino = this.resolveSafePath(destinoRelativo);
  async exists(caminhoRelativo: string): Promise<boolean> {
      await access(this.resolveSafePath(caminhoRelativo));
  async generateSignedUrl(
    empresaId: string,
  ): Promise<SignedUrlResult> {
        empresaId,
      } satisfies SignedPayload),
      url: `/arquivos/signed/${payload}.${signature}`,
    if (normalized.startsWith('uploads/public/')) {
      return `/uploads/${normalized}`;
    if (normalized.startsWith('uploads/')) {
    return `/uploads/public/${normalized}`;
  validateSignedToken(token=[REDACTED] SignedPayload {
    let data: SignedPayload;
      ) as SignedPayload;
    if (!data.arquivoId || !data.empresaId || !data.exp) {
  private createChecksum(buffer: Buffer): string {
  private resolveSafePath(caminhoRelativo: string): string {
      this.config.get<string>('SIGNED_URL_SECRET') ||
        'SIGNED_URL_SECRET ou JWT_SECRET não configurado.',
```

## Decisao para implementacao

Usar exatamente as assinaturas registradas acima. A implementacao seguinte podera adicionar dependencias AWS de forma seletiva, criar o provider S3, conectar a factory e atualizar somente o exemplo de ambiente e os testes necessarios.
