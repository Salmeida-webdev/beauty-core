# Beauty Core - Chat A - Bloco 01 - Reconciliacao Meta

- **Status:** PASS
- **Inicio:** 2026-09-11T19:22:25.3102267-03:00
- **Termino:** 2026-09-11T19:22:42.7871767-03:00
- **Projeto:** `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core`
- **Raiz Git:** `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core`
- **Relatorio:** `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\docs\chat-a-bloco01-reconciliacao-meta-20260911-192225.md`

## Objetivo

Ler os contratos e implementacoes locais de Meta/WhatsApp, comparar o estado local com origin/main, separar alteracoes aproveitaveis, duplicadas, incompletas e fora do escopo e validar Prisma/build.

## Limites preservados

- Nenhuma correcao automatica de codigo foi aplicada sem evidencia semantica comprovada.
- Nenhum callback definitivo, Verify Token, App Secret, token comercial ou envio real foi configurado.
- Nenhum stage, commit, push, merge, tag, release, deploy ou migration foi executado.
- Exclusoes e alteracoes pre-existentes fora do escopo foram apenas lidas e preservadas.

## Baseline e comandos

### Raiz Git
ExitCode: 0
```text
C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core
```

### Branch atual
ExitCode: 0
```text
main
```

### HEAD atual
ExitCode: 0
```text
7da979412362ba5abc7ff2d03f26a2fd2cdd9dcd
```

### Comparacao commit local com origin/main
ExitCode: 0
(sem saida)

### Nomes alterados no working tree relacionados a Meta e WhatsApp
ExitCode: 0
```text
M	beauty-core-backend/prisma/schema.prisma
M	beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts
M	beauty-core-backend/src/modules/configuracao-whatsapp/dto/create-configuracao-whatsapp.dto.ts
M	beauty-core-backend/src/modules/mensagens-whatsapp/mensagens-whatsapp.service.ts
M	beauty-core-backend/src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider.ts
warning: in the working copy of 'beauty-core-backend/src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider.ts', LF will be replaced by CRLF the next time Git touches it
```

### Diff local nao staged relacionado a Meta e WhatsApp
ExitCode: 0
```text
warning: in the working copy of 'beauty-core-backend/src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider.ts', LF will be replaced by CRLF the next time Git touches it
diff --git a/beauty-core-backend/prisma/schema.prisma b/beauty-core-backend/prisma/schema.prisma
index b0278c7..adb6b9c 100644
--- a/beauty-core-backend/prisma/schema.prisma
+++ b/beauty-core-backend/prisma/schema.prisma
@@ -136,6 +136,7 @@ enum CanalWhatsApp {
   API_OFICIAL
   PROVEDOR_EXTERNO
   MODO_DEMONSTRACAO
+  META_CLOUD_API
 }
 
 enum TipoEventoSistema {
@@ -1072,6 +1073,10 @@ model ConfiguracaoWhatsApp {
   mensagemSaudacao     String?
   mensagemAusencia     String?
   usarModoDemonstracao Boolean       @default(true)
+  metaWabaId          String?
+  metaPhoneNumberId   String?
+  metaAccessTokenRef  String?
+  metaApiVersion      String?
 
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
@@ -1079,6 +1084,7 @@ model ConfiguracaoWhatsApp {
   empresa Empresa @relation(fields: [empresaId], references: [id])
 
   @@index([empresaId])
+  @@index([metaPhoneNumberId])
 }
 
 model TemplateWhatsApp {
@@ -1354,4 +1360,3 @@ enum TipoArmazenamento {
   S3
   CLOUDINARY
 }
-
diff --git a/beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts b/beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts
index e2ee07a..947d4de 100644
--- a/beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts
+++ b/beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts
@@ -42,6 +42,10 @@ export class ConfiguracaoWhatsappService {
         ativo: dto.ativo ?? true,
         canal: dto.canal ?? CanalWhatsApp.MODO_DEMONSTRACAO,
         numeroWhatsApp: dto.numeroWhatsApp,
+      metaWabaId: dto.metaWabaId,
+      metaPhoneNumberId: dto.metaPhoneNumberId,
+      metaAccessTokenRef: dto.metaAccessTokenRef,
+      metaApiVersion: dto.metaApiVersion,
         mensagemSaudacao: dto.mensagemSaudacao,
         mensagemAusencia: dto.mensagemAusencia,
         usarModoDemonstracao: dto.usarModoDemonstracao ?? true,
diff --git a/beauty-core-backend/src/modules/configuracao-whatsapp/dto/create-configuracao-whatsapp.dto.ts b/beauty-core-backend/src/modules/configuracao-whatsapp/dto/create-configuracao-whatsapp.dto.ts
index cfc0844..ff4d861 100644
--- a/beauty-core-backend/src/modules/configuracao-whatsapp/dto/create-configuracao-whatsapp.dto.ts
+++ b/beauty-core-backend/src/modules/configuracao-whatsapp/dto/create-configuracao-whatsapp.dto.ts
@@ -72,4 +72,20 @@ export class CreateConfiguracaoWhatsAppDto {
     message: 'O campo usarModoDemonstracao deve ser verdadeiro ou falso.',
   })
   usarModoDemonstracao?: boolean;
+
+  @IsOptional()
+  @IsString()
+  metaWabaId?: string;
+
+  @IsOptional()
+  @IsString()
+  metaPhoneNumberId?: string;
+
+  @IsOptional()
+  @IsString()
+  metaAccessTokenRef?: string;
+
+  @IsOptional()
+  @IsString()
+  metaApiVersion?: string;
 }
diff --git a/beauty-core-backend/src/modules/mensagens-whatsapp/mensagens-whatsapp.service.ts b/beauty-core-backend/src/modules/mensagens-whatsapp/mensagens-whatsapp.service.ts
index b97e566..068953b 100644
--- a/beauty-core-backend/src/modules/mensagens-whatsapp/mensagens-whatsapp.service.ts
+++ b/beauty-core-backend/src/modules/mensagens-whatsapp/mensagens-whatsapp.service.ts
@@ -122,7 +122,8 @@ export class MensagensWhatsappService {
       const resultado = await this.metaWhatsappProvider.enviarTexto(
         destinatario,
         mensagem,
-      );
+      { phoneNumberId: configuracao.metaPhoneNumberId ?? undefined },
+    );
 
       return this.prisma.mensagemWhatsApp.update({
         where: { id: mensagemId },
diff --git a/beauty-core-backend/src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider.ts b/beauty-core-backend/src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider.ts
index 6568633..64b3cda 100644
--- a/beauty-core-backend/src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider.ts
+++ b/beauty-core-backend/src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider.ts
@@ -33,6 +33,10 @@ function stringifyLintValue(value: unknown): string {
 import { Injectable } from '@nestjs/common';
 import { ConfigService } from '@nestjs/config';
 
+export type MetaWhatsappSendOptions = {
+  phoneNumberId?: string;
+};
+
 type MetaWhatsappPayload = {
   messages?: Array<{ id?: unknown }>;
   error?: { message?: unknown; type?: unknown };
@@ -60,11 +64,12 @@ export class MetaWhatsappCloudProvider {
   async enviarTexto(
     destinatario: string,
     mensagem: string,
+    options?: MetaWhatsappSendOptions,
   ): Promise<MetaWhatsappSendResult> {
     const token=[REDACTED]
       .get<string>('META_WHATSAPP_ACCESS_TOKEN')
       ?.trim();
-    const phoneNumberId = this.configService
+    const phoneNumberId = options?.phoneNumberId?.trim() || this.configService
       .get<string>('META_WHATSAPP_PHONE_NUMBER_ID')
       ?.trim();
     const apiVersion = this.configService
```

### Diff staged relacionado a Meta e WhatsApp
ExitCode: 0
(sem saida)

### Status completo preservado para conferencia
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
?? beauty-core-backend/docs/meta-whatsapp/
?? beauty-core-backend/prisma/migrations/20260911150000_meta_whatsapp_tenant_connection/
?? beauty-core-ui/public/images/portal/states/source/portal-offline.webp
```

### Prisma validate somente leitura
ExitCode: 0
```text
Loaded Prisma config from prisma.config.ts.
System.Management.Automation.RemoteException
Prisma config detected, skipping environment variable loading.
Prisma schema loaded from prisma\schema.prisma
The schema at prisma\schema.prisma is valid ­ƒÜÇ
```

### Build do backend
ExitCode: 0
```text

> beauty-core-backend@0.0.1 build
> nest build

```

## Arquivos esperados lidos

- `beauty-core-backend/prisma/migrations/20260909150000_meta_whatsapp_webhook/migration.sql` | bytes=878 | linhas=19 | sha256=017C26C0A9B0DF3D4BBBF6482F0B20BFDD43AAF617515099267C9A87DEFFD493 | Meta=11, WhatsApp=11, webhook=8
- `beauty-core-backend/prisma/migrations/20260911150000_meta_whatsapp_tenant_connection/migration.sql` | bytes=360 | linhas=10 | sha256=9152B8EA04722357CAEE36B3615BC581DE23F9733B71ED2C6595E60DE3D2D35F | Meta=7, WhatsApp=4, token=1
- `beauty-core-backend/prisma/schema.prisma` | bytes=30851 | linhas=1363 | sha256=A1411D88E74A773C7ECD4AF95C7B0B02834D5D1EDA85E7C8382D72B35D8BF5E4 | empresaId=243, tenant=1, Meta=11, WhatsApp=34, webhook=1, provider=2, token=2
- `beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.controller.ts` | bytes=7233 | linhas=227 | sha256=1D1B353FD6F9B95BA63517B1E39BE5E905F9D310597B634537C8A81C0A279E10 | empresaId=8, WhatsApp=39, token=4
- `beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.module.ts` | bytes=581 | linhas=19 | sha256=8AB1C9390080253E22FB19CFC092C3448A8028AD2740FEDAD3322D223B2E3F89 | tenant=3, WhatsApp=8, provider=1
- `beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts` | bytes=3437 | linhas=125 | sha256=4E0C673D6516D6238C84EA18884B6D7A680F0551DE05F0C31BD283239A94682F | empresaId=16, tenant=8, Meta=8, WhatsApp=21, token=2
- `beauty-core-backend/src/modules/configuracao-whatsapp/dto/create-configuracao-whatsapp.dto.ts` | bytes=2504 | linhas=92 | sha256=F2664FBB060D3D61FCA0FC520125DAD4BD839F46ECE65A59F90044F9C58DC6A8 | Meta=4, WhatsApp=15, token=1
- `beauty-core-backend/src/modules/configuracao-whatsapp/dto/update-configuracao-whatsapp.dto.ts` | bytes=242 | linhas=8 | sha256=461C5F9726077B53D7AB7FE44C72A7EDDA4F1D11DB090AC7B79C9A7022FA0E3E | WhatsApp=4
- `beauty-core-backend/src/modules/mensagens-whatsapp/dto/create-mensagem-whatsapp.dto.ts` | bytes=2646 | linhas=96 | sha256=4473F513578711774B0E03DBEB4FD7919BFAAC79FE9C5432C304A71A6DD56762 | WhatsApp=14
- `beauty-core-backend/src/modules/mensagens-whatsapp/dto/enviar-mensagem-whatsapp.dto.ts` | bytes=253 | linhas=7 | sha256=2C7C0B1B89F8C4B340142B70107908C4C2045A8FD86831444DEF19E1B3EC6781 | WhatsApp=5
- `beauty-core-backend/src/modules/mensagens-whatsapp/mensagens-whatsapp.controller.ts` | bytes=10064 | linhas=332 | sha256=0FC72D6E780EA9C295B7D5A58E390A4709B30B0166F6E9C44AA108DF4A7FE75B | empresaId=12, Meta=3, WhatsApp=51, token=5
- `beauty-core-backend/src/modules/mensagens-whatsapp/mensagens-whatsapp.module.ts` | bytes=973 | linhas=28 | sha256=90850C4FE6EA0E71E2AE9AB21BAD04CA8F0F9F02787B65F457F76247DAC43267 | tenant=3, Meta=9, WhatsApp=17, webhook=6, provider=5
- `beauty-core-backend/src/modules/mensagens-whatsapp/mensagens-whatsapp.service.ts` | bytes=21875 | linhas=777 | sha256=E6892C28A36289407CA4D389A671CA11B4515D074C0D13217D75FEB3F47344EF | empresaId=75, tenant=12, Meta=15, WhatsApp=96, provider=8
- `beauty-core-backend/src/modules/mensagens-whatsapp/meta-whatsapp-webhook.controller.ts` | bytes=1421 | linhas=51 | sha256=4BDA39AC77969D45E7367518514FF15C83BF22EDAF42C6437B03CD066267570D | Meta=9, WhatsApp=8, webhook=13, token=3
- `beauty-core-backend/src/modules/mensagens-whatsapp/meta-whatsapp-webhook.service.ts` | bytes=7388 | linhas=243 | sha256=AE30998191F812BE8DF380688ACA75A9A2E554159066E82AC89F439FA8AF56CE | empresaId=2, Meta=31, WhatsApp=32, webhook=15, provider=1, token=3, secret=4
- `beauty-core-backend/src/modules/mensagens-whatsapp/meta-whatsapp-webhook.types.ts` | bytes=369 | linhas=19 | sha256=13211826F8CD9928F11D825E32419E1713CA4D29140E077A2EFC26B2C00049E6 | Meta=4, WhatsApp=4, webhook=2
- `beauty-core-backend/src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider.ts` | bytes=5316 | linhas=189 | sha256=30ABFE0521EC471B19396DAAF185C6159003B55BCDBC72008F320E736AD793D9 | Meta=26, WhatsApp=29, provider=9, token=4
- `beauty-core-backend/src/queues/jobs/whatsapp.job.ts` | bytes=433 | linhas=25 | sha256=C8DE51C47FA88BA5B9F681E025D721C2842528C6B971AE3DE36BD1112B1D0F3D | empresaId=1, Meta=1, WhatsApp=3
- `beauty-core-backend/src/queues/workers/whatsapp.worker.ts` | bytes=10076 | linhas=332 | sha256=CAE5B1C4C97590148F9914EF04FC5D3010E56434A04A965E569E2496388B5A94 | empresaId=24, Meta=42, WhatsApp=43, worker=19

## Arquivos esperados ausentes

Nenhum arquivo esperado esta ausente.

## Classificacao preliminar baseada em caminho

### Candidatos aproveitaveis

Arquivos locais relacionados a Meta/WhatsApp que exigem leitura semantica e podem ser aproveitados, sujeitos ao contrato do backend:
- `beauty-core-backend/docs/chat03-block02-whatsapp-meta.md`
- `beauty-core-backend/docs/chat03-block04ap-meta-provider-worker-hardening.md`
- `beauty-core-backend/docs/chat03-block04aq-meta-worker-current-shape.md`
- `beauty-core-backend/docs/chat03-block04ar-meta-worker-flow-test.md`
- `beauty-core-backend/docs/chat-a-bloco01-reconciliacao-meta-20260911-191539.md`
- `beauty-core-backend/docs/meta-whatsapp/audits/META_BLOCO00_BASELINE_20260911_135451.md`
- `beauty-core-backend/docs/meta-whatsapp/audits/META_BLOCO01A_CONTRATO_20260911_140002.md`
- `beauty-core-backend/docs/meta-whatsapp/audits/META_BLOCO01B_LEITURA_CONTRATOS_20260911_140251.md`
- `beauty-core-backend/docs/meta-whatsapp/audits/META_BLOCO01C_IMPLEMENTACAO_20260911_140702.md`
- `beauty-core-backend/docs/meta-whatsapp/audits/META_BLOCO01D_VALIDACAO_20260911_140940.md`
- `beauty-core-backend/docs/meta-whatsapp/audits/META_BLOCO01E_REPARO_SCHEMA_20260911_141714.md`
- `beauty-core-backend/docs/meta-whatsapp/audits/META_BLOCO01F_SERVICE_20260911_142003.md`
- `beauty-core-backend/docs/meta-whatsapp/audits/META_BLOCO01G_PRISMA_BUILD_20260911_142215.md`
- `beauty-core-backend/docs/meta-whatsapp/audits/META_BLOCO02A_PROVIDER_20260911_143026.md`
- `beauty-core-backend/docs/meta-whatsapp/audits/META_BLOCO02B_PROVIDER_TENANT_20260911_143414.md`
- `beauty-core-backend/docs/meta-whatsapp/audits/META_BLOCO02C_REPARO_20260911_143618.md`
- `beauty-core-backend/docs/meta-whatsapp/audits/META_BLOCO02E_VALIDACAO_20260911_144127.md`
- `beauty-core-backend/prisma/migrations/20260909150000_meta_whatsapp_webhook/migration.sql`
- `beauty-core-backend/prisma/migrations/20260911150000_meta_whatsapp_tenant_connection/migration.sql`
- `beauty-core-backend/src/modules/analytics/dto/whatsapp-analytics.dto.ts`
- `beauty-core-backend/src/modules/area-cliente/dto/enviar-portal-mensagem-whatsapp.dto.ts`
- `beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.controller.ts`
- `beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.module.ts`
- `beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts`
- `beauty-core-backend/src/modules/campanhas-whatsapp/dto/create-campanha-whatsapp.dto.ts`
- `beauty-core-backend/src/modules/campanhas-whatsapp/dto/update-campanha-whatsapp.dto.ts`
- `beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.controller.ts`
- `beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.module.ts`
- `beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts`
- `beauty-core-backend/src/modules/configuracao-whatsapp/dto/create-configuracao-whatsapp.dto.ts`
- `beauty-core-backend/src/modules/configuracao-whatsapp/dto/update-configuracao-whatsapp.dto.ts`
- `beauty-core-backend/src/modules/mensagens-whatsapp/dto/create-mensagem-whatsapp.dto.ts`
- `beauty-core-backend/src/modules/mensagens-whatsapp/dto/enviar-mensagem-whatsapp.dto.ts`
- `beauty-core-backend/src/modules/mensagens-whatsapp/mensagens-whatsapp.controller.ts`
- `beauty-core-backend/src/modules/mensagens-whatsapp/mensagens-whatsapp.module.ts`
- `beauty-core-backend/src/modules/mensagens-whatsapp/mensagens-whatsapp.service.ts`
- `beauty-core-backend/src/modules/mensagens-whatsapp/meta-whatsapp-webhook.controller.ts`
- `beauty-core-backend/src/modules/mensagens-whatsapp/meta-whatsapp-webhook.service.ts`
- `beauty-core-backend/src/modules/mensagens-whatsapp/meta-whatsapp-webhook.types.ts`
- `beauty-core-backend/src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider.ts`
- `beauty-core-backend/src/modules/templates-whatsapp/dto/create-template-whatsapp.dto.ts`
- `beauty-core-backend/src/modules/templates-whatsapp/dto/update-template-whatsapp.dto.ts`
- `beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.controller.ts`
- `beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.module.ts`
- `beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.service.ts`
- `beauty-core-backend/src/queues/jobs/whatsapp.job.ts`
- `beauty-core-backend/src/queues/workers/whatsapp.worker.ts`
- `beauty-core-backend/test/chat12-whatsapp.http`
- `beauty-core-backend/test/e2e/meta-whatsapp-webhook.e2e-spec.ts`
- `beauty-core-backend/test/e2e/whatsapp-queue-demo.e2e-spec.ts`
- `beauty-core-backend/test/unit/meta-whatsapp-cloud.provider.spec.ts`
- `beauty-core-backend/test/unit/meta-whatsapp-cloud-provider-retry.spec.ts`
- `beauty-core-backend/test/unit/meta-whatsapp-worker-flow.spec.ts`
- `beauty-core-ui/docs/chat63-portal-notifications-files-whatsapp-audit.md`
- `beauty-core-ui/docs/chat65-block11-whatsapp-send-gate.md`
- `beauty-core-ui/public/images/empty-states/beauty-core-whatsapp-empty.webp`
- `beauty-core-ui/public/images/empty-states/beauty-core-whatsapp-empty-source.png`
- `beauty-core-ui/src/app/(dashboard)/whatsapp/page.tsx`
- `beauty-core-ui/src/features/portal/components/portal-whatsapp-compose.tsx`
- `beauty-core-ui/src/features/whatsapp/campaigns/campanha-whatsapp-form.tsx`
- `beauty-core-ui/src/features/whatsapp/chat54-foundations.test.ts`
- `beauty-core-ui/src/features/whatsapp/components/campanhas-whatsapp-list.test.tsx`
- `beauty-core-ui/src/features/whatsapp/components/campanhas-whatsapp-list.tsx`
- `beauty-core-ui/src/features/whatsapp/components/campanhas-whatsapp-section.tsx`
- `beauty-core-ui/src/features/whatsapp/components/campanha-whatsapp-form-dialog.tsx`
- `beauty-core-ui/src/features/whatsapp/components/mensagens-whatsapp-list.test.tsx`
- `beauty-core-ui/src/features/whatsapp/components/mensagens-whatsapp-list.tsx`
- `beauty-core-ui/src/features/whatsapp/components/mensagens-whatsapp-section.tsx`
- `beauty-core-ui/src/features/whatsapp/components/templates-whatsapp-list.test.tsx`
- `beauty-core-ui/src/features/whatsapp/components/templates-whatsapp-list.tsx`
- `beauty-core-ui/src/features/whatsapp/components/templates-whatsapp-section.tsx`
- `beauty-core-ui/src/features/whatsapp/components/template-whatsapp-form-dialog.tsx`
- `beauty-core-ui/src/features/whatsapp/components/whatsapp-view.tsx`
- `beauty-core-ui/src/features/whatsapp/messages/mensagem-whatsapp-form.tsx`
- `beauty-core-ui/src/features/whatsapp/permissions/whatsapp.permissions.ts`
- `beauty-core-ui/src/features/whatsapp/queries/whatsapp-keys.ts`
- `beauty-core-ui/src/features/whatsapp/queries/whatsapp-query-options.ts`
- `beauty-core-ui/src/features/whatsapp/schemas/campanha-whatsapp-schema.test.ts`
- `beauty-core-ui/src/features/whatsapp/schemas/mensagem-whatsapp-schema.test.ts`
- `beauty-core-ui/src/features/whatsapp/schemas/template-whatsapp-schema.test.ts`
- `beauty-core-ui/src/features/whatsapp/schemas/whatsapp.schemas.ts`
- `beauty-core-ui/src/features/whatsapp/services/whatsapp-api.ts`
- `beauty-core-ui/src/features/whatsapp/services/whatsapp-campaigns-api.test.ts`
- `beauty-core-ui/src/features/whatsapp/services/whatsapp-messages-api.test.ts`
- `beauty-core-ui/src/features/whatsapp/services/whatsapp-templates-api.test.ts`
- `beauty-core-ui/src/features/whatsapp/templates/template-whatsapp-form.tsx`
- `beauty-core-ui/src/features/whatsapp/types/whatsapp.types.ts`
- `beauty-core-ui/src/features/whatsapp/utils/whatsapp-formatters.ts`
- `beauty-core-ui/src/features/whatsapp/utils/whatsapp-status.ts`

### Possivelmente duplicados ou ja presentes no commit base

A comparacao origin/main..HEAD foi registrada acima. Nenhum arquivo foi descartado ou sobrescrito; a classificacao definitiva depende do diff e dos contratos.

### Possivelmente incompletos

A presenca dos arquivos esperados foi confirmada; isso nao prova completude funcional.

### Fora do escopo ou pre-existente

O baseline registrou numerosas exclusoes locais em beauty-core-backend/docs, incluindo documentos CHAT04 e chat03. Elas permanecem intocadas e nao fazem parte de uma correcao automatica deste bloco.

## Decisao para continuidade

Usar o diff e os resultados de Prisma/build para decidir eventual correcao minima e seletiva. Nao iniciar storage/upload/download enquanto a reconciliacao Meta/WhatsApp nao estiver documentada.
