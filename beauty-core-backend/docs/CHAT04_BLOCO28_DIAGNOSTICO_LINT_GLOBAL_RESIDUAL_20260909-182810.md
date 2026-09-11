# Chat 04 - Bloco 28 - Diagnostico Lint Global Residual

Data da execucao: 2026-09-09 18:28:32 -03:00
- Projeto: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core
- Branch: main
- HEAD: 219dd066492ea23eadab10cb089957dd521cb816
- origin/main: 219dd066492ea23eadab10cb089957dd521cb816

## Preservacao

- Status preservado: 293
- Staged: 0
- Untracked: 36
- git diff --check: exit 0
- git diff --cached --check: exit 0
- Estado Git alterado pelo lint: False

## Resultado global

- ESLint exit code: 1
- JSON interpretado: True
- Arquivos analisados: 347
- Arquivos com findings: 110
- Erros: 1367
- Warnings: 264
- Total: 1631

## Distribuicao por classificacao

- PRODUCTION_SOURCE: 592
- GENERATED_OR_REPORT: 544
- TEST_OR_HELPER: 495

## Top regras

- @typescript-eslint/no-unsafe-member-access: 474
- @typescript-eslint/no-unsafe-assignment: 286
- @typescript-eslint/no-unsafe-argument: 263
- @typescript-eslint/no-unsafe-return: 171
- @typescript-eslint/no-unsafe-call: 132
- @typescript-eslint/require-await: 131
- @typescript-eslint/no-require-imports: 53
- @typescript-eslint/no-unused-vars: 32
- no-empty: 23
- @typescript-eslint/no-base-to-string: 18
- @typescript-eslint/no-misused-promises: 15
- prettier/prettier: 12
- @typescript-eslint/no-unsafe-function-type: 9
- @typescript-eslint/unbound-method: 4
- @typescript-eslint/await-thenable: 3
- no-sparse-arrays: 2
- @typescript-eslint/no-unnecessary-type-assertion: 2
- @typescript-eslint/no-floating-promises: 1

## Top arquivos

- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/coverage-under-70-branch-matrix.generated.spec.ts: 109
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/helpers/coverage-smoke.helper.ts: 105
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/coverage-under-70-targeted.generated.spec.ts: 102
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/coverage-under-70-final-target.generated.spec.ts: 100
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/chat36-lgpd.coverage.spec.ts: 62
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/seeds/test-seed.ts: 50
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/tenant-validator.spec.ts: 43
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/queues/services/dead-letter-queue.service.ts: 40
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/infrastructure-expanded.coverage.spec.ts: 34
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/lgpd/lgpd.service.ts: 33
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/e2e/auth-cliente.e2e-spec.ts: 32
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/e2e/uploads.e2e-spec.ts: 31
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/common/interceptors/audit-log.interceptor.ts: 31
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/micro-boost.coverage.spec.ts: 30
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/helpers/auth.helper.ts: 29
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/utils.coverage.spec.ts: 26
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/common/utils/audit-request.util.ts: 26
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/usuario-role-policy.spec.ts: 26
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/queues/services/queues.service.ts: 24
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/usuario-role-policy.coverage.spec.ts: 23
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts: 22
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/common/metrics/interceptors/http-metrics.interceptor.ts: 22
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/tenant-publico/public-tenant.controller.ts: 20
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/pacotes/pacotes.service.ts: 19
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/e2e/multiempresa.e2e-spec.ts: 18
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/scheduler/scheduler.service.ts: 18
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/queue-utils.spec.ts: 18
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/auth-guards.coverage.spec.ts: 18
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/queues-utils.coverage.spec.ts: 16
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/auth-cliente/auth-cliente.controller.ts: 16
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/fidelidade/fidelidade.controller.ts: 16
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/notificacoes/notificacoes.controller.ts: 14
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/auditoria/auditoria.controller.ts: 14
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/chat36-backup.coverage.spec.ts: 13
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/area-cliente-privacy.spec.ts: 13
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/backup/backup.service.ts: 13
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/e2e/meta-whatsapp-webhook.e2e-spec.ts: 12
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/e2e/lgpd-runtime.e2e-spec.ts: 12
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/cupons/cupons.controller.ts: 12
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/common/metrics/middleware/metrics.middleware.ts: 12
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/arquivos/arquivos.controller.ts: 12
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/niveis-fidelidade/niveis-fidelidade.controller.ts: 10
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.controller.ts: 10
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/auth/auth.controller.ts: 10
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/e2e/auth-admin.e2e-spec.ts: 10
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/unidades/unidades.controller.ts: 10
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/e2e/tenant.e2e-spec.ts: 10
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/categorias-financeiras/categorias-financeiras.controller.ts: 10
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/servicos/servicos.controller.ts: 10
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/beneficios/beneficios.controller.ts: 10
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/clientes-pacotes-concurrency.spec.ts: 9
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/tenant-services.coverage.spec.ts: 9
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/automacoes/automacoes.controller.ts: 8
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/helpers/tenant.helper.ts: 8
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/queues/workers/whatsapp.worker.ts: 8
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/queues/workers/notificacoes.worker.ts: 8
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.controller.ts: 8
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/common/metrics/guards/metrics-auth.guard.ts: 7
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/e2e/auditoria.e2e-spec.ts: 7
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/queues/workers/campanhas.worker.ts: 6
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/queues/workers/aniversarios.worker.ts: 6
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/queues/workers/relatorios.worker.ts: 6
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/config/env.validation.ts: 6
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/configuracoes-notificacao/configuracoes-notificacao.controller.ts: 6
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/e2e/health.e2e-spec.ts: 6
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/configuracao-fidelidade/configuracao-fidelidade.controller.ts: 6
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/agendamentos-concurrency.spec.ts: 6
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/clientes/clientes.service.ts: 6
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/empresas/dto/create-empresa.dto.ts: 6
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/empresas/dto/update-empresa.dto.ts: 6
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/e2e/metrics.e2e-spec.ts: 5
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/analytics-performance-limits.spec.ts: 5
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/e2e/sessoes.e2e-spec.ts: 5
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/auth/guards/roles.guard.ts: 5
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/e2e/super-admin.e2e-spec.ts: 5
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/meta-whatsapp-worker-flow.spec.ts: 5
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/e2e/cliente-area.e2e-spec.ts: 5
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/area-cliente/area-cliente.controller.ts: 4
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/usuarios/dto/create-usuario.dto.ts: 4
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/arquivos/arquivos-download.controller.ts: 4
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/auditoria/auditoria.service.ts: 4
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/e2e/queues.e2e-spec.ts: 4
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/health/enterprise-health.controller.ts: 4
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/usuarios/dto/update-usuario.dto.ts: 4
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/queues/queues.module.ts: 3
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/shared/utils/get-empresa-id.ts: 3
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/arquivos/storage/local-storage.service.ts: 3
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/arquivos/storage/multer.config.ts: 3
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/notificacoes/notificacoes.service.ts: 3
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/e2e/scheduler.e2e-spec.ts: 3
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/e2e/refresh-throttle.e2e-spec.ts: 3
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/e2e/roles.e2e-spec.ts: 3
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/cliente-area-compatibility.spec.ts: 3
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/e2e/swagger-validation.e2e-spec.ts: 3
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/queues/services/queue-metrics.service.ts: 3
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider.ts: 2
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/health/enterprise-health.service.ts: 2
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/health/health.service.ts: 2
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/lgpd/lgpd.controller.ts: 2
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/cliente-area/cliente-area.service.ts: 2
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/configuracao-fidelidade/configuracao-fidelidade.service.ts: 2
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/scheduler/scheduler.controller.ts: 1
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/main.ts: 1
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/chat03-bullmq-retention.spec.ts: 1
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/arquivos/arquivos-download.service.ts: 1
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/controllers-expanded.coverage.spec.ts: 1
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/common/logger/structured-logger.service.ts: 1
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/modules-services-expanded.coverage.spec.ts: 1
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/health/health.module.ts: 1
- C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/common/metrics/metrics.controller.ts: 1

**READY-FOR-RESIDUAL-LINT-GROUPING**

- Nenhuma alteracao de codigo, dependencia ou estado Git foi executada.
