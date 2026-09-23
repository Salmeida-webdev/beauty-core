# Correção de tipagem em auth.helper.ts

- Data: 2026-09-21 16:59:19 -03:00
- Arquivo de código alterado: ``test/helpers/auth.helper.ts`` (único).
- Diagnóstico base: ``docs/chat-b/chat-b149-auth-helper-eslint-detail-20260921.md``; 26 erros e 3 avisos.

## Alterações

- Supertest agora usa import default, permitido pelo ``esModuleInterop`` do tsconfig.
- As três funções recebem ``INestApplication<Server>`` com ``Server`` de ``node:net``, aceito pela assinatura ``App`` do Supertest.
- ``response.body`` é tratado como ``unknown``. Um type guard estreita objetos; tokens, refresh token, expiração e código OTP são validados antes de entrarem no retorno ou payload enviado.
- ``LoginResponse.raw`` passou a ``unknown``; refresh token e validade preservam a possibilidade de ``null`` observada em respostas JSON.
- O fallback consulta ``prisma.codigoAcessoCliente.findFirst`` pelo tipo gerado, sem cast.
- URLs, payloads, códigos de status esperados, cache, mensagens de rate limit e fluxos de autenticação foram mantidos.

## Validações

- Prettier: exit code 0; executado somente em ``test/helpers/auth.helper.ts``.
- ESLint: exit code 0, sem diagnósticos; executado somente em ``test/helpers/auth.helper.ts`` e sem ``--fix``.
- Jest: 15 suítes E2E que importam o helper; 14 passaram, 1 falhou. 58 testes passaram e 1 falhou (59 no total).
- A única falha foi ``test/e2e/whatsapp-queue-demo.e2e-spec.ts``: o banco de teste não contém ``ConfiguracaoWhatsApp.metaWabaId``; Prisma retornou ``P2022`` e a rota respondeu 500 onde a suíte espera 201. A falha ocorre na gravação de configuração WhatsApp após o login; não é causada pela tipagem do helper. Corrigi-la exigiria alinhar o schema do banco, fora do arquivo autorizado e incompatível com a proibição de migration nesta tarefa.
- O Jest também reportou colisão Haste entre ``package.json`` e ``.backup-chat39/package.json``; execução prosseguiu e produziu os resultados acima.

## Suítes executadas

- ``test/e2e/auditoria.e2e-spec.ts``
- ``test/e2e/auth-cliente.e2e-spec.ts``
- ``test/e2e/auth-admin.e2e-spec.ts``
- ``test/e2e/cliente-area.e2e-spec.ts``
- ``test/e2e/health.e2e-spec.ts``
- ``test/e2e/multiempresa.e2e-spec.ts``
- ``test/e2e/lgpd-runtime.e2e-spec.ts``
- ``test/e2e/queues.e2e-spec.ts``
- ``test/e2e/scheduler.e2e-spec.ts``
- ``test/e2e/roles.e2e-spec.ts``
- ``test/e2e/sessoes.e2e-spec.ts``
- ``test/e2e/super-admin.e2e-spec.ts``
- ``test/e2e/uploads-strict-roundtrip.e2e-spec.ts``
- ``test/e2e/uploads.e2e-spec.ts``
- ``test/e2e/whatsapp-queue-demo.e2e-spec.ts``

## Arquivos de código alterados

- ``test/helpers/auth.helper.ts``

## Git

Os resultados finais de ``git diff --check`` e ``git status --short`` foram coletados após gravar este relatório e aparecem abaixo.

```text
git diff --check (exit 0):
warning: in the working copy of 'beauty-core-backend/.env.example', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'beauty-core-backend/test/e2e/lgpd-runtime.e2e-spec.ts', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'beauty-core-backend/test/helpers/auth.helper.ts', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'beauty-core-backend/test/seeds/test-seed.ts', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'beauty-core-backend/test/unit/chat36-backup.coverage.spec.ts', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'beauty-core-backend/test/unit/chat36-lgpd.coverage.spec.ts', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'beauty-core-backend/test/unit/coverage-under-70-branch-matrix.generated.spec.ts', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'beauty-core-backend/test/unit/coverage-under-70-final-target.generated.spec.ts', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'beauty-core-backend/test/unit/coverage-under-70-targeted.generated.spec.ts', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'beauty-core-backend/test/unit/helpers/coverage-smoke.helper.ts', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'beauty-core-backend/test/unit/meta-whatsapp-worker-flow.spec.ts', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'beauty-core-backend/test/unit/tenant-validator.spec.ts', LF will be replaced by CRLF the next time Git touches it

git status --short:
 M .env.example
 M package-lock.json
 M package.json
 M prisma/schema.prisma
 M src/backup/backup.service.ts
 M src/modules/arquivos/arquivos.module.ts
 M src/modules/arquivos/storage/storage.factory.ts
 M src/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts
 M src/modules/configuracao-whatsapp/dto/create-configuracao-whatsapp.dto.ts
 M src/modules/mensagens-whatsapp/mensagens-whatsapp.service.ts
 M src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider.ts
 M test/e2e/lgpd-runtime.e2e-spec.ts
 M test/e2e/uploads.e2e-spec.ts
 M test/helpers/auth.helper.ts
 M test/seeds/test-seed.ts
 M test/unit/chat36-backup.coverage.spec.ts
 M test/unit/chat36-lgpd.coverage.spec.ts
 M test/unit/coverage-under-70-branch-matrix.generated.spec.ts
 M test/unit/coverage-under-70-final-target.generated.spec.ts
 M test/unit/coverage-under-70-targeted.generated.spec.ts
 M test/unit/helpers/coverage-smoke.helper.ts
 M test/unit/meta-whatsapp-worker-flow.spec.ts
 M test/unit/tenant-validator.spec.ts
?? docs/chat-a-bloco00-baseline-20260911-190953.md
?? docs/chat-a-bloco01-reconciliacao-meta-20260911-191539.md
?? docs/chat-a-bloco01-reconciliacao-meta-20260911-192225.md
?? docs/chat-a-meta/
?? docs/chat-a-storage/
?? docs/chat-b-baseline/
?? docs/chat-b-storage-backup/
?? docs/chat-b-whatsapp/
?? docs/chat-b/
?? docs/meta-whatsapp/
?? prisma/migrations/20260911150000_meta_whatsapp_tenant_connection/
?? scripts/backup/backup-external-upload.js
?? scripts/backup/backup-external-upload.sh
?? scripts/backup/redis-backup.sh
?? scripts/backup/redis-restore.sh
?? scripts/backup/validate-restore.sh
?? scripts/uploads/uploads-backup.sh
?? scripts/uploads/uploads-restore.sh
?? src/modules/arquivos/storage/providers/s3-storage.service.ts
?? test/integration/
?? test/unit/backup-external-upload.spec.ts
?? test/unit/s3-storage.service.spec.ts
?? ../beauty-core-ui/public/images/portal/states/source/portal-offline.webp
```
