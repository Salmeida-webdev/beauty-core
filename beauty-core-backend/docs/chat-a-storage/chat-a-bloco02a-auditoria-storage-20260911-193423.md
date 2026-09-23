# Beauty Core - Chat A - Bloco 02A - Auditoria de storage

- **Status:** PASS_WITH_ATTENTION
- **Inicio:** 2026-09-11T19:34:23.3065791-03:00
- **Termino:** 2026-09-11T19:34:23.7108560-03:00
- **Projeto:** `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core`
- **Raiz Git:** `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core`
- **Relatorio:** `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\docs\chat-a-storage\chat-a-bloco02a-auditoria-storage-20260911-193423.md`

## Objetivo

Auditar o storage atual antes de qualquer implementacao persistente: LocalStorageService, contrato, factory, upload, download, isolamento por empresa, checksum, limites, MIME, remocao, testes e provider S3-compatible.

## Regras preservadas

- Nenhum arquivo de codigo foi alterado.
- Nenhuma dependencia foi instalada.
- Nenhuma migration, stage, commit, push, merge, tag, release ou deploy foi executado.
- Nenhum bucket, credencial ou segredo foi criado ou exibido.

## Checks do contrato

- **PASS** - LocalStorageService presente: servico local de armazenamento
- **PASS** - Contrato de storage presente: interface de storage
- **PASS** - Factory de storage presente: selecao do provider
- **PASS** - Upload privado presente: controller ou DTO de upload
- **PASS** - Download privado presente: controller e service de download
- **PASS** - Isolamento por empresa no storage: a chave e o acesso devem carregar empresaId
- **PASS** - Checksum existente: integridade de arquivo
- **PASS** - Limite e MIME no upload: limites e tipos aceitos
- **PASS** - Remocao segura: remocao controlada
- **ATTENTION** - S3-compatible ja implementado: provider persistente ainda precisa ser confirmado
- **PASS** - URL assinada: download privado sem bucket publico
- **PASS** - Restart e single-node documentados: risco do local storage

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
?? beauty-core-backend/docs/meta-whatsapp/
?? beauty-core-backend/prisma/migrations/20260911150000_meta_whatsapp_tenant_connection/
?? beauty-core-ui/public/images/portal/states/source/portal-offline.webp
```

### Diff check no escopo storage
ExitCode: 0
(sem saida)

## Evidencias do storage

### beauty-core-backend/src/modules/arquivos/storage/local-storage.service.ts
```text
linha 9: import { createHash, createHmac, randomUUID } from 'crypto';
linha 11: import { access, mkdir, rename, writeFile } from 'fs/promises';
linha 12: import { dirname, extname, resolve, sep } from 'path';
linha 16: StorageUploadInput,
linha 17: StorageUploadResult,
linha 22: empresaId: string;
linha 27: export class LocalStorageService implements StorageProvider {
linha 31: const uploadsDir = this.config.get<string>('UPLOADS_DIR') || 'uploads';
linha 32: this.baseDir = resolve(process.cwd(), uploadsDir);
linha 35: async upload(input: StorageUploadInput): Promise<StorageUploadResult> {
linha 46: const checksum = this.createChecksum(input.file.buffer);
linha 60: input.empresaId,
linha 65: const caminhoAbsoluto = this.resolveSafePath(caminhoRelativo);
linha 67: await mkdir(dirname(caminhoAbsoluto), { recursive: true });
linha 72: ? `/uploads/public/${input.empresaId}/${subdiretorioSeguro}/${nomeArquivo}`
linha 80: checksum,
linha 86: async download(caminhoRelativo: string): Promise<ReadStream> {
linha 87: const caminhoAbsoluto = this.resolveSafePath(caminhoRelativo);
linha 105: const origem = this.resolveSafePath(caminhoRelativo);
linha 112: const destino = this.resolveSafePath(destinoRelativo);
linha 114: await mkdir(dirname(destino), { recursive: true });
linha 120: await access(this.resolveSafePath(caminhoRelativo));
linha 129: empresaId: string,
linha 138: empresaId,
linha 158: if (normalized.startsWith('uploads/public/')) {
```

### beauty-core-backend/src/modules/arquivos/storage/storage.interface.ts
```text
linha 4: export interface StorageUploadInput {
linha 12: export interface StorageUploadResult {
linha 17: checksum: string;
linha 27: export interface StorageProvider {
linha 28: upload(input: StorageUploadInput): Promise<StorageUploadResult>;
linha 30: download(caminhoRelativo: string): Promise<ReadStream>;
```

### beauty-core-backend/src/modules/arquivos/storage/storage.factory.ts
```text
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
linha 23: 'Provider S3 preparado, mas ainda não implementado.',
linha 28: 'Provider Cloudinary preparado, mas ainda não implementado.',
linha 32: return this.localStorage;
linha 37: const provider =
linha 38: this.config.get<string>('STORAGE_PROVIDER') || TipoArmazenamento.LOCAL;
linha 41: provider === TipoArmazenamento.LOCAL ||
linha 42: provider === TipoArmazenamento.S3 ||
linha 43: provider === TipoArmazenamento.CLOUDINARY
linha 45: return provider;
linha 48: return TipoArmazenamento.LOCAL;
```

### beauty-core-backend/src/modules/arquivos/storage/multer.config.ts
```text
linha 1: import type { FileFilterCallback } from 'multer';
linha 45: function getFileSizeLimit(pasta: string) {
linha 68: if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
linha 75: !DOCUMENT_MIME_TYPES.includes(file.mimetype)
linha 87: !IMAGE_MIME_TYPES.includes(file.mimetype)
linha 116: fileFilter: (
linha 119: callback: FileFilterCallback,
linha 129: limits: {
linha 130: fileSize: getFileSizeLimit(pasta),
linha 148: export const chat31AllowedMimeTypes = [
linha 159: fileFilter: (
linha 164: callback: FileFilterCallback,
linha 177: if (!chat31AllowedMimeTypes.includes(file.mimetype)) {
```

### beauty-core-backend/src/modules/arquivos/arquivos-upload.controller.ts
```text
arquivo ausente
```

### beauty-core-backend/src/modules/arquivos/arquivos-download.controller.ts
```text
linha 7: StreamableFile,
linha 19: import { ArquivosDownloadService } from './arquivos-download.service';
linha 21: type AuthenticatedFileUser = {
linha 22: empresaId: string;
linha 26: type AuthenticatedFileRequest = {
linha 27: user: AuthenticatedFileUser;
linha 30: @ApiTags('Arquivos')
linha 31: @Controller('arquivos')
linha 32: export class ArquivosDownloadController {
linha 34: private readonly arquivosDownloadService: ArquivosDownloadService,
linha 39: summary: 'Download por URL assinada',
linha 41: 'Realiza download por URL temporária assinada. Não exige JWT, mas exige token assinado válido e não expirado.',
linha 48: description: 'Stream do arquivo.',
linha 50: async downloadPorSignedToken(@Param('token') token=[REDACTED] {
linha 51: const { arquivo, stream } =
linha 52: await this.arquivosDownloadService.downloadPorSignedToken(token);
linha 54: return new StreamableFile(stream, {
linha 55: type: arquivo.mimeType || 'application/octet-stream',
linha 56: disposition: `attachment; filename="${encodeURIComponent(
linha 57: arquivo.nomeOriginal,
linha 62: @Get(':id/download')
linha 66: summary: 'Download protegido de arquivo',
linha 68: 'Realiza download após validar autenticação, empresa e permissão do usuário ou cliente.',
linha 76: description: 'Stream do arquivo.',
linha 78: async downloadProtegido(
```

### beauty-core-backend/src/modules/arquivos/arquivos-download.service.ts
```text
linha 25: empresaId?: string;
linha 29: interface DownloadResult {
linha 35: export class ArquivosDownloadService {
linha 44: async downloadProtegido(
linha 47: ): Promise<DownloadResult> {
linha 48: if (!user?.empresaId) {
linha 55: empresaId: user.empresaId,
linha 68: await this.incrementarDownload(arquivo.id, arquivo.empresaId);
linha 73: acao: 'DOWNLOAD_ARQUIVO',
linha 74: origem: 'download_protegido',
linha 75: mensagem: 'Download protegido de arquivo realizado com sucesso.',
linha 84: async gerarSignedUrl(id: string, user: AuthenticatedFileUser) {
linha 85: if (!user?.empresaId) {
linha 92: empresaId: user.empresaId,
linha 103: const expiresIn = Number(process.env.SIGNED_URL_EXPIRATION || 300);
linha 107: const signedUrl = await storage.generateSignedUrl(
linha 109: arquivo.empresaId,
linha 117: origem: 'signed_url',
linha 121: return signedUrl;
linha 124: async downloadPorSignedToken(token=[REDACTED] Promise<DownloadResult> {
linha 125: const payload = this.localStorage.validateSignedToken(token);
linha 130: empresaId: payload.empresaId,
linha 141: await this.incrementarDownload(arquivo.id, arquivo.empresaId);
linha 145: acao: 'DOWNLOAD_ARQUIVO',
linha 146: origem: 'download_signed_url',
```

### beauty-core-backend/src/modules/arquivos/dto/upload-documento-privado.dto.ts
```text
linha 2: import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
linha 4: export class UploadDocumentoPrivadoDto {
linha 7: description: 'ID do cliente vinculado ao documento, quando aplicável.',
linha 9: @IsOptional()
linha 10: @IsUUID()
linha 15: description: 'Observação interna sobre o documento.',
linha 17: @IsOptional()
linha 18: @IsString()
```

## Arquivos de storage encontrados

- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\arquivo-access-policy.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\arquivos-cleanup.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\arquivos-download.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\arquivos-download.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\arquivos.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\arquivos.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\arquivos.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\dto\upload-documento-privado.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\guards\jwt-or-cliente-auth.guard.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\storage\local-storage.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\storage\multer.config.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\storage\storage.factory.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\storage\storage.interface.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\storage\providers\.gitkeep`

## Testes de storage encontrados

- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\chat31-storage.http`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\testes-arquivos.http`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\e2e\uploads-strict-roundtrip.e2e-spec.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\e2e\uploads.e2e-spec.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\files\download-chat31.pdf`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\files\signed-download-chat31.pdf`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\helpers\upload.helper.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\storage-roundtrip.spec.ts`

## Decisao para o Bloco 02B

Com base neste relatorio, decidir entre completar o provider S3-compatible privado ou documentar formalmente o LocalStorage como single-node para demonstracao. A implementacao seguinte deve preservar empresaId, checksum, limites, MIME, remocao segura, URL assinada e bloqueio cross-tenant.
