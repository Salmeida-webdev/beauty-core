# Beauty Core - Chat A - Bloco 01B - Auditoria semantica Meta

- **Status:** PASS_WITH_ATTENTION
- **Inicio:** 2026-09-11T19:28:20.9417327-03:00
- **Termino:** 2026-09-11T19:28:21.4181955-03:00
- **Projeto:** `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core`
- **Raiz Git:** `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core`
- **Relatorio:** `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\docs\chat-a-meta\chat-a-bloco01b-auditoria-semantica-20260911-192820.md`

## Objetivo

Confirmar semanticamente a coerencia entre schema, migration, DTO, service, provider, tenant, webhook, worker e testes antes do storage.

## Regras preservadas

- Nenhum arquivo de codigo foi alterado.
- Nenhuma migration foi executada.
- Nenhum stage, commit, push, merge, tag, release ou deploy foi executado.
- Nenhuma configuracao ou envio real da Meta foi ativado.
- Nenhuma exclusao pre-existente foi restaurada ou apagada.

## Verificacoes estaticas

- **PASS** - Enum META_CLOUD_API no schema: schema contem META_CLOUD_API
- **PASS** - Campos Meta na configuracao: schema deve conter os quatro campos Meta
- **PASS** - Indice metaPhoneNumberId: indice por phone number id
- **PASS** - DTO declara os quatro campos Meta: DTO e schema precisam estar alinhados
- **PASS** - Service mapeia os quatro campos Meta: service deve persistir os campos do DTO
- **PASS** - Mensagem envia phoneNumberId por configuracao: mensagens devem usar a configuracao do tenant
- **PASS** - Provider aceita opcao phoneNumberId: provider deve aceitar contexto especifico da empresa
- **PASS** - Provider usa token global como fallback: fallback global deve continuar fail-closed
- **ATTENTION** - Versao Meta por configuracao: metaApiVersion existe no schema, mas nao foi localizada no provider
- **ATTENTION** - Referencia de segredo por configuracao: metaAccessTokenRef existe no schema, mas nao foi localizada no provider
- **PASS** - Webhook presente: controller e service do webhook
- **PASS** - Worker e job presentes: fila e worker WhatsApp
- **PASS** - Isolamento empresaId na configuracao: deve haver escopo explicito por empresa

## Comandos executados

### Raiz Git
ExitCode: 0
```text
C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core
```

### Branch atual e HEAD
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
?? beauty-core-backend/docs/meta-whatsapp/
?? beauty-core-backend/prisma/migrations/20260911150000_meta_whatsapp_tenant_connection/
?? beauty-core-ui/public/images/portal/states/source/portal-offline.webp
```

### Verificacao diff check no escopo Meta
ExitCode: 0
```text
warning: in the working copy of 'beauty-core-backend/src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider.ts', LF will be replaced by CRLF the next time Git touches it
```

### EOL do provider
ExitCode: 0
```text
i/lf    w/mixed attr/                 	beauty-core-backend/src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider.ts
```

## Evidencias de contratos

### beauty-core-backend/prisma/schema.prisma
```text
linha 139: META_CLOUD_API
linha 349: empresaId String
linha 362: empresa      Empresa       @relation(fields: [empresaId], references: [id])
linha 366: @@index([empresaId])
linha 367: @@index([empresaId, ativa])
linha 368: @@index([empresaId, nome])
linha 369: @@index([empresaId, createdAt])
linha 370: @@index([empresaId, updatedAt])
linha 376: empresaId String?
linha 393: empresa      Empresa?      @relation(fields: [empresaId], references: [id])
linha 406: @@index([empresaId])
linha 411: @@index([empresaId, ativo])
linha 412: @@index([empresaId, role])
linha 413: @@index([empresaId, email])
linha 414: @@index([empresaId, ultimoLogin])
linha 415: @@index([empresaId, createdAt])
linha 416: @@index([empresaId, updatedAt])
linha 422: empresaId String
linha 444: empresa             Empresa              @relation(fields: [empresaId], references: [id])
linha 462: @@unique([empresaId, telefone])
```

### beauty-core-backend/src/modules/configuracao-whatsapp/dto/create-configuracao-whatsapp.dto.ts
```text
linha 5: import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
linha 13: @IsOptional()
linha 25: @IsOptional()
linha 36: @IsOptional()
linha 37: @IsString({
linha 47: @IsOptional()
linha 48: @IsString({
linha 59: @IsOptional()
linha 60: @IsString({
linha 70: @IsOptional()
linha 76: @IsOptional()
linha 77: @IsString()
linha 78: metaWabaId?: string;
linha 80: @IsOptional()
linha 81: @IsString()
linha 82: metaPhoneNumberId?: string;
linha 84: @IsOptional()
linha 85: @IsString()
linha 86: metaAccessTokenRef?: string;
linha 88: @IsOptional()
```

### beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts
```text
linha 17: async createOrUpdate(empresaId: string, dto: CreateConfiguracaoWhatsAppDto) {
linha 18: await this.tenantValidator.validarEmpresaAtiva(empresaId);
linha 24: empresaId,
linha 31: empresaId,
linha 41: empresaId,
linha 45: metaWabaId: dto.metaWabaId,
linha 46: metaPhoneNumberId: dto.metaPhoneNumberId,
linha 47: metaAccessTokenRef: dto.metaAccessTokenRef,
linha 48: metaApiVersion: dto.metaApiVersion,
linha 56: async findOne(empresaId: string) {
linha 57: await this.tenantValidator.validarEmpresaAtiva(empresaId);
linha 61: empresaId,
linha 72: async update(empresaId: string, dto: UpdateConfiguracaoWhatsAppDto) {
linha 73: await this.tenantValidator.validarEmpresaAtiva(empresaId);
linha 75: await this.findOne(empresaId);
linha 81: empresaId,
linha 89: async gerarLink(empresaId: string, mensagem?: string) {
linha 90: await this.tenantValidator.validarEmpresaAtiva(empresaId);
linha 92: const configuracao = await this.findOne(empresaId);
linha 118: delete dados.empresaId;
```

### beauty-core-backend/src/modules/mensagens-whatsapp/mensagens-whatsapp.service.ts
```text
linha 40: empresaId: string;
linha 67: empresaId: string,
linha 73: where: { id: mensagemId, empresaId },
linha 90: const configuracao = await this.prisma.configuracaoWhatsApp.findUnique({
linha 91: where: { empresaId },
linha 94: if (!configuracao?.ativo) {
linha 96: empresaId,
linha 102: if (configuracao.usarModoDemonstracao) {
linha 113: if (configuracao.canal !== CanalWhatsApp.API_OFICIAL) {
linha 115: empresaId,
linha 117: `Canal WhatsApp nao suportado para envio real: ${configuracao.canal}.`,
linha 122: const resultado = await this.metaWhatsappProvider.enviarTexto(
linha 125: { phoneNumberId: configuracao.metaPhoneNumberId ?? undefined },
linha 141: await this.marcarFalhaDeEnvio(empresaId, mensagemId, detalhe);
linha 145: return this.buscarMensagemOuFalhar(empresaId, mensagemId);
linha 149: async create(empresaId: string, dto: CreateMensagemWhatsAppDto) {
linha 152: await this.tenantValidator.validarEmpresaAtiva(empresaId);
linha 153: await this.validarRelacionamentos(empresaId, dto);
linha 157: empresaId,
linha 172: `[WHATSAPP] mensagem criada empresaId=${empresaId} mensagemId=${mensagem.id} status=SUCESSO tempoMs=${tempoMs}`,
```

### beauty-core-backend/src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider.ts
```text
linha 36: export type MetaWhatsappSendOptions = {
linha 37: phoneNumberId?: string;
linha 67: options?: MetaWhatsappSendOptions,
linha 70: .get<string>('META_WHATSAPP_ACCESS_TOKEN')
linha 72: const phoneNumberId = options?.phoneNumberId?.trim() || this.configService
linha 73: .get<string>('META_WHATSAPP_PHONE_NUMBER_ID')
linha 76: .get<string>('META_WHATSAPP_API_VERSION')
linha 79: if (!token || !phoneNumberId || !apiVersion) {
linha 103: const endpoint = `${graphBaseUrl}/${apiVersion}/${encodeURIComponent(phoneNumberId)}/messages`;
```

### beauty-core-backend/src/modules/mensagens-whatsapp/meta-whatsapp-webhook.controller.ts
```text
linha 4: Get,
linha 7: Post,
linha 14: import { MetaWhatsappWebhookService } from './meta-whatsapp-webhook.service';
linha 15: import { MetaWhatsappWebhookPayload } from './meta-whatsapp-webhook.types';
linha 19: @Controller('webhooks/meta/whatsapp')
linha 20: export class MetaWhatsappWebhookController {
linha 21: constructor(private readonly webhookService: MetaWhatsappWebhookService) {}
linha 23: @Get()
linha 27: @Query('hub.verify_token') verifyToken=[REDACTED] | undefined,
linha 30: return this.webhookService.verificarChallenge(mode, verifyToken, challenge);
linha 33: @Post()
linha 36: const signature = request.get('x-hub-signature-256');
linha 37: if (!this.webhookService.validarAssinatura(request.rawBody, signature)) {
linha 42: throw new ForbiddenException('Corpo bruto do webhook indisponivel.');
linha 45: return this.webhookService.receber(
linha 46: request.body as MetaWhatsappWebhookPayload,
```

### beauty-core-backend/src/modules/mensagens-whatsapp/meta-whatsapp-webhook.service.ts
```text
linha 3: import { StatusMensagemWhatsApp } from '@prisma/client';
linha 9: MetaWhatsappStatus,
linha 10: MetaWhatsappWebhookPayload,
linha 11: MetaWhatsappWebhookResult,
linha 12: } from './meta-whatsapp-webhook.types';
linha 24: export class MetaWhatsappWebhookService {
linha 25: private readonly logger = new Logger(MetaWhatsappWebhookService.name);
linha 35: verifyToken=[REDACTED] | undefined,
linha 39: .get<string>('META_WHATSAPP_VERIFY_TOKEN')
linha 45: verifyToken !== expected ||
linha 48: throw new ForbiddenException('Challenge Meta invalido.');
linha 58: const secret=[REDACTED]
linha 59: .get<string>('META_WHATSAPP_APP_SECRET')
linha 61: if (!secret || !rawBody || !signature?.startsWith('sha256=')) {
linha 66: 'sha256=' + createHmac('sha256', secret).update(rawBody).digest('hex'),
linha 76: payload: MetaWhatsappWebhookPayload,
linha 78: ): Promise<MetaWhatsappWebhookResult> {
linha 92: const event = await this.prisma.metaWhatsappWebhookEvent.create({
linha 118: payload: MetaWhatsappWebhookPayload,
linha 119: ): MetaWhatsappStatus[] {
```

### beauty-core-backend/src/queues/workers/whatsapp.worker.ts
```text
linha 3: getQueueTraceMetadata,
linha 15: import { WHATSAPP_QUEUE } from '../constants/queue-names';
linha 16: import { WhatsappJob } from '../jobs/whatsapp.job';
linha 18: import { MensagensWhatsappService } from '../../modules/mensagens-whatsapp/mensagens-whatsapp.service';
linha 23: export class WhatsappWorker implements OnModuleInit, OnModuleDestroy {
linha 24: private readonly logger = new Logger(WhatsappWorker.name);
linha 25: private worker?: Worker<WhatsappJob>;
linha 29: private readonly mensagensWhatsappService: MensagensWhatsappService,
linha 35: this.worker = new Worker<WhatsappJob>(
linha 36: WHATSAPP_QUEUE,
linha 37: async (job: Job<WhatsappJob>) => this.processar(job),
linha 48: this.configService.get('QUEUE_CONCURRENCY_WHATSAPP', 10),
linha 58: sourceQueue: WHATSAPP_QUEUE,
linha 68: `[BULLMQ] job concluido queue=${WHATSAPP_QUEUE} jobId=${job.id} ${formatQueueTrace(job)} empresaId=${job.data.empresaId}`,
linha 72: empresaId: job.data.empresaId,
linha 80: metadata: {
linha 81: ...getQueueTraceMetadata(job),
linha 82: queue: WHATSAPP_QUEUE,
linha 83: worker: WhatsappWorker.name,
linha 85: status: 'completed',
```

## Migrations Meta encontradas

- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\prisma\migrations\20260909150000_meta_whatsapp_webhook\migration.sql`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\prisma\migrations\20260911150000_meta_whatsapp_tenant_connection\migration.sql`

## Testes e evidencias relacionadas encontradas

- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\chat12-whatsapp.http`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\e2e\meta-whatsapp-webhook.e2e-spec.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\e2e\whatsapp-queue-demo.e2e-spec.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\meta-whatsapp-cloud-provider-retry.spec.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\meta-whatsapp-cloud.provider.spec.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\meta-whatsapp-worker-flow.spec.ts`

## Decisao tecnica pendente

O provider deve manter token e versao globais como fallback fail-closed ou resolver metaAccessTokenRef/metaApiVersion por empresa? A resposta precisa ser definida antes da implementacao de storage e antes da Meta real. Nenhuma alteracao foi aplicada automaticamente.

## Proximo gate

Se os ATTENTION forem aceitos como desenho intencional e nao houver FAIL, o Chat A pode seguir para o Bloco 02 de storage persistente. Se houver FAIL, preparar correcao minima e seletiva e revalidar.
