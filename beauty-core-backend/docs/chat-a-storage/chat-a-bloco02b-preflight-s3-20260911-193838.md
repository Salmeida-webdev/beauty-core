# Beauty Core - Chat A - Bloco 02B - Preflight S3-compatible

- **Status:** PASS_WITH_ATTENTION
- **Inicio:** 2026-09-11T19:38:38.0124612-03:00
- **Termino:** 2026-09-11T19:38:38.3461757-03:00
- **Projeto:** `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core`
- **Raiz Git:** `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core`
- **Relatorio:** `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\docs\chat-a-storage\chat-a-bloco02b-preflight-s3-20260911-193838.md`

## Objetivo

Confirmar os contratos e dependencias necessarios antes de implementar o provider S3-compatible privado.

## Regras preservadas

- Nenhum arquivo de codigo foi alterado.
- Nenhuma dependencia foi instalada ou modificada.
- Nenhuma migration, stage, commit, push, merge, tag, release ou deploy foi executado.
- Nenhum bucket, credencial ou segredo foi criado ou exibido.

## Checks

- **PASS** - Interface StorageProvider presente: contrato base
- **PASS** - Factory S3 atualmente nao implementada: a factory deve ser substituida com provider real
- **PASS** - Metodos do contrato identificados: assinaturas necessarias para S3
- **PASS** - Local provider preservado: fallback local
- **PASS** - Modulo de arquivos presente: wiring NestJS
- **PASS** - Download usa storage factory: download deve aceitar provider persistente
- **ATTENTION** - AWS SDK S3 no package.json: dependencia client-s3
- **ATTENTION** - Presigner no package.json: dependencia s3-request-presigner
- **ATTENTION** - Lockfile acompanha dependencias: package-lock precisa ser atualizado de forma seletiva
- **ATTENTION** - Variaveis S3 no exemplo: nenhum segredo deve ser incluido

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

### Diff check no storage
ExitCode: 0
(sem saida)

### Dependencias AWS no lockfile
ExitCode: 0
(sem saida)

## Evidencias da interface e wiring

### beauty-core-backend/src/modules/arquivos/storage/storage.interface.ts
```text
linha 4: export interface StorageUploadInput {
linha 12: export interface StorageUploadResult {
linha 22: export interface SignedUrlResult {
linha 27: export interface StorageProvider {
linha 28: upload(input: StorageUploadInput): Promise<StorageUploadResult>;
linha 30: download(caminhoRelativo: string): Promise<ReadStream>;
linha 34: exists(caminhoRelativo: string): Promise<boolean>;
linha 36: generateSignedUrl(
```

### beauty-core-backend/src/modules/arquivos/storage/storage.factory.ts
```text
linha 3: import { TipoArmazenamento } from '@prisma/client';
linha 4: import { LocalStorageService } from './local-storage.service';
linha 5: import { StorageProvider } from './storage.interface';
linha 8: export class StorageFactory {
linha 11: private readonly localStorage: LocalStorageService,
linha 14: getProvider(): StorageProvider {
linha 15: const provider = this.getTipoArmazenamento();
linha 17: switch (provider) {
linha 18: case TipoArmazenamento.LOCAL:
linha 19: return this.localStorage;
linha 21: case TipoArmazenamento.S3:
linha 22: throw new NotImplementedException(
linha 23: 'Provider S3 preparado, mas ainda não implementado.',
linha 26: case TipoArmazenamento.CLOUDINARY:
linha 27: throw new NotImplementedException(
linha 28: 'Provider Cloudinary preparado, mas ainda não implementado.',
linha 32: return this.localStorage;
linha 36: getTipoArmazenamento(): TipoArmazenamento {
linha 37: const provider =
linha 38: this.config.get<string>('STORAGE_PROVIDER') || TipoArmazenamento.LOCAL;
linha 41: provider === TipoArmazenamento.LOCAL ||
linha 42: provider === TipoArmazenamento.S3 ||
linha 43: provider === TipoArmazenamento.CLOUDINARY
linha 45: return provider;
linha 48: return TipoArmazenamento.LOCAL;
```

### beauty-core-backend/src/modules/arquivos/arquivos.module.ts
```text
linha 9: import { LocalStorageService } from './storage/local-storage.service';
linha 12: import { StorageFactory } from './storage/storage.factory';
linha 19: imports: [PrismaModule, TenantModule, AuditoriaModule],
linha 23: providers: [
linha 25: LocalStorageService,
linha 26: StorageFactory,
```

### beauty-core-backend/src/modules/arquivos/arquivos-download.service.ts
```text
linha 16: import { LocalStorageService } from './storage/local-storage.service';
linha 17: import { StorageFactory } from './storage/storage.factory';
linha 25: empresaId?: string;
linha 29: interface DownloadResult {
linha 35: export class ArquivosDownloadService {
linha 38: private readonly storageFactory: StorageFactory,
linha 39: private readonly localStorage: LocalStorageService,
linha 44: async downloadProtegido(
linha 47: ): Promise<DownloadResult> {
linha 48: if (!user?.empresaId) {
linha 55: empresaId: user.empresaId,
linha 68: await this.incrementarDownload(arquivo.id, arquivo.empresaId);
linha 73: acao: 'DOWNLOAD_ARQUIVO',
linha 74: origem: 'download_protegido',
linha 75: mensagem: 'Download protegido de arquivo realizado com sucesso.',
linha 85: if (!user?.empresaId) {
linha 92: empresaId: user.empresaId,
linha 105: const storage = this.storageFactory.getProvider();
linha 107: const signedUrl = await storage.generateSignedUrl(
linha 109: arquivo.empresaId,
linha 124: async downloadPorSignedToken(token=[REDACTED] Promise<DownloadResult> {
linha 125: const payload = this.localStorage.validateSignedToken(token);
linha 130: empresaId: payload.empresaId,
linha 141: await this.incrementarDownload(arquivo.id, arquivo.empresaId);
linha 145: acao: 'DOWNLOAD_ARQUIVO',
linha 146: origem: 'download_signed_url',
linha 147: mensagem: 'Download por URL assinada realizado com sucesso.',
linha 161: const storage = this.storageFactory.getProvider();
linha 163: const existe = await storage.exists(arquivo.caminho);
linha 169: return storage.download(arquivo.caminho);
```

### beauty-core-backend/package.json
```text
linha 16: "test": "jest --config ./jest.config.js --runInBand",
linha 17: "test:watch": "jest --config ./jest.config.js --watch",
linha 18: "test:cov": "jest --config ./jest.config.js --coverage --runInBand",
linha 19: "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
linha 20: "test:e2e": "jest --config ./test/jest-e2e.js --runInBand",
linha 30: "test:e2e:watch": "jest --config ./test/jest-e2e.js --watch --runInBand",
linha 31: "test:e2e:cov": "jest --config ./test/jest-e2e.coverage.js --runInBand",
linha 32: "test:all:cov": "jest --config ./test/jest-all-json.coverage.js --runInBand",
linha 73: "dependencies": {
linha 75: "@nestjs/config": "^4.0.4",
linha 97: "devDependencies": {
linha 106: "@types/multer": "^2.1.0",
linha 112: "eslint-config-prettier": "^10.0.1",
linha 122: "tsconfig-paths": "^4.2.0",
linha 128: "multer": "2.3.0",
linha 133: "cosmiconfig": {
```

### beauty-core-backend/.env.example
```text
linha 67: # Uploads
linha 69: UPLOADS_DIR=uploads
linha 70: MAX_IMAGE_UPLOAD_MB=5
linha 71: MAX_PDF_UPLOAD_MB=10
linha 96: # Chat 31 Ã¯Â¿Â½ Storage
linha 97: STORAGE_PROVIDER=LOCAL
linha 98: UPLOADS_DIR=uploads
linha 100: UPLOAD_MAX_IMAGE_MB=5
linha 101: UPLOAD_MAX_DOCUMENT_MB=10
linha 106: # Future S3 Provider
linha 109: AWS_BUCKET=
linha 110: AWS_REGION=
```

## Arquivos de storage

- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\storage\local-storage.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\storage\multer.config.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\storage\storage.factory.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\storage\storage.interface.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\storage\providers\.gitkeep`

## Gate para implementacao

A implementacao deve adicionar o provider S3-compatible somente depois de confirmar as assinaturas do contrato, o wiring do modulo e a estrategia seletiva para package.json/package-lock.json. O provider deve usar bucket privado, chave por empresa, checksum, limites, MIME, URL assinada com expiracao e bloqueio cross-tenant.
