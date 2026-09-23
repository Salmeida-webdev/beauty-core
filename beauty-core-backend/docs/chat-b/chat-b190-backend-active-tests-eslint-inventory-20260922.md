# B190 — Inventário ESLint dos 70 arquivos TypeScript ativos

- Data: 2026-09-22
- Escopo: arquivos `.ts` ativos sob `test/`.
- Exclusões: `node_modules`, `coverage` e `dist`.
- ESLint: formato JSON, sem `--fix`, sem cache, heap de 6144 MB.
- Nenhum arquivo de código foi alterado.

## Integridade da coleta

| Métrica | Resultado |
| --- | ---: |
| CANDIDATES | 70 |
| RESULTS | 70 |
| UNIQUE_PATHS | 70 |
| PATH_SETS_EQUAL | `True` |
| ONLY_TS | `True` |
| Exit code do ESLint | 1, devido aos diagnósticos encontrados |

Os 70 candidatos foram enumerados recursivamente em `test/` e enviados ao ESLint. A coleta não incluiu arquivos `.js` ou `.cjs`.

## Totais e comparação com B188

| Métrica | B188 | B190 | Variação B190−B188 |
| --- | ---: | ---: | ---: |
| Erros | 13 | 12 | -1 |
| Avisos | 45 | 38 | -7 |

## Arquivos com diagnósticos

Total: 15.

| Arquivo | Erros | Avisos |
| --- | ---: | ---: |
| `test/e2e/cliente-area.e2e-spec.ts` | 1 | 3 |
| `test/e2e/health.e2e-spec.ts` | 1 | 6 |
| `test/e2e/lgpd-runtime.e2e-spec.ts` | 0 | 4 |
| `test/e2e/metrics.e2e-spec.ts` | 1 | 4 |
| `test/e2e/queues.e2e-spec.ts` | 1 | 4 |
| `test/e2e/refresh-throttle.e2e-spec.ts` | 1 | 2 |
| `test/e2e/roles.e2e-spec.ts` | 1 | 3 |
| `test/e2e/scheduler.e2e-spec.ts` | 1 | 3 |
| `test/e2e/super-admin.e2e-spec.ts` | 1 | 5 |
| `test/e2e/swagger-validation.e2e-spec.ts` | 1 | 2 |
| `test/e2e/uploads-strict-roundtrip.e2e-spec.ts` | 0 | 1 |
| `test/e2e/whatsapp-queue-demo.e2e-spec.ts` | 0 | 1 |
| `test/unit/backup-external-upload.spec.ts` | 1 | 0 |
| `test/unit/chat03-bullmq-retention.spec.ts` | 1 | 0 |
| `test/unit/meta-whatsapp-worker-flow.spec.ts` | 1 | 0 |

## Arquivos sem diagnósticos

Total: 55.

`test/app.e2e-spec.ts`, `test/e2e/auditoria.e2e-spec.ts`, `test/e2e/auth-admin.e2e-spec.ts`, `test/e2e/auth-cliente.e2e-spec.ts`, `test/e2e/meta-whatsapp-webhook.e2e-spec.ts`, `test/e2e/multiempresa.e2e-spec.ts`, `test/e2e/sessoes.e2e-spec.ts`, `test/e2e/tenant.e2e-spec.ts`, `test/e2e/uploads.e2e-spec.ts`, `test/env-test.guard.ts`, `test/helpers/auth.helper.ts`, `test/helpers/prisma.helper.ts`, `test/helpers/queue.helper.ts`, `test/helpers/tenant.helper.ts`, `test/helpers/upload.helper.ts`, `test/integration/r2-storage.live.spec.ts`, `test/jest-e2e.setup.ts`, `test/seeds/test-seed.ts`, `test/setup-e2e.ts`, `test/unit/agendamentos-concurrency.spec.ts`, `test/unit/agendamentos-options.spec.ts`, `test/unit/agendamentos-query.dto.spec.ts`, `test/unit/analytics-performance-limits.spec.ts`, `test/unit/area-cliente-privacy.spec.ts`, `test/unit/auth-guards.coverage.spec.ts`, `test/unit/chat03-retention-runtime.spec.ts`, `test/unit/chat36-backup.coverage.spec.ts`, `test/unit/chat36-lgpd.coverage.spec.ts`, `test/unit/cliente-area-compatibility.spec.ts`, `test/unit/clientes-pacotes-concurrency.spec.ts`, `test/unit/controllers-expanded.coverage.spec.ts`, `test/unit/coverage-under-70-branch-matrix.generated.spec.ts`, `test/unit/coverage-under-70-final-target.generated.spec.ts`, `test/unit/coverage-under-70-targeted.generated.spec.ts`, `test/unit/env-validation-cors.spec.ts`, `test/unit/env-validation-required.spec.ts`, `test/unit/financeiro-list-movimentacoes-query.dto.spec.ts`, `test/unit/helpers/coverage-smoke.helper.ts`, `test/unit/infrastructure-expanded.coverage.spec.ts`, `test/unit/meta-whatsapp-cloud-provider-retry.spec.ts`, `test/unit/meta-whatsapp-cloud.provider.spec.ts`, `test/unit/micro-boost.coverage.spec.ts`, `test/unit/modules-services-expanded.coverage.spec.ts`, `test/unit/modules/usuarios/usuarios-role-filter.spec.ts`, `test/unit/queue-utils.spec.ts`, `test/unit/queues-utils.coverage.spec.ts`, `test/unit/s3-storage.service.spec.ts`, `test/unit/sanity.spec.ts`, `test/unit/services-critical.coverage.spec.ts`, `test/unit/storage-roundtrip.spec.ts`, `test/unit/tenant-services.coverage.spec.ts`, `test/unit/tenant-validator.spec.ts`, `test/unit/usuario-role-policy.coverage.spec.ts`, `test/unit/usuario-role-policy.spec.ts`, `test/unit/utils.coverage.spec.ts`.

## Resultados individuais

| Arquivo | Erros | Avisos |
| --- | ---: | ---: |
| `test/app.e2e-spec.ts` | 0 | 0 |
| `test/e2e/auditoria.e2e-spec.ts` | 0 | 0 |
| `test/e2e/auth-admin.e2e-spec.ts` | 0 | 0 |
| `test/e2e/auth-cliente.e2e-spec.ts` | 0 | 0 |
| `test/e2e/cliente-area.e2e-spec.ts` | 1 | 3 |
| `test/e2e/health.e2e-spec.ts` | 1 | 6 |
| `test/e2e/lgpd-runtime.e2e-spec.ts` | 0 | 4 |
| `test/e2e/meta-whatsapp-webhook.e2e-spec.ts` | 0 | 0 |
| `test/e2e/metrics.e2e-spec.ts` | 1 | 4 |
| `test/e2e/multiempresa.e2e-spec.ts` | 0 | 0 |
| `test/e2e/queues.e2e-spec.ts` | 1 | 4 |
| `test/e2e/refresh-throttle.e2e-spec.ts` | 1 | 2 |
| `test/e2e/roles.e2e-spec.ts` | 1 | 3 |
| `test/e2e/scheduler.e2e-spec.ts` | 1 | 3 |
| `test/e2e/sessoes.e2e-spec.ts` | 0 | 0 |
| `test/e2e/super-admin.e2e-spec.ts` | 1 | 5 |
| `test/e2e/swagger-validation.e2e-spec.ts` | 1 | 2 |
| `test/e2e/tenant.e2e-spec.ts` | 0 | 0 |
| `test/e2e/uploads-strict-roundtrip.e2e-spec.ts` | 0 | 1 |
| `test/e2e/uploads.e2e-spec.ts` | 0 | 0 |
| `test/e2e/whatsapp-queue-demo.e2e-spec.ts` | 0 | 1 |
| `test/env-test.guard.ts` | 0 | 0 |
| `test/helpers/auth.helper.ts` | 0 | 0 |
| `test/helpers/prisma.helper.ts` | 0 | 0 |
| `test/helpers/queue.helper.ts` | 0 | 0 |
| `test/helpers/tenant.helper.ts` | 0 | 0 |
| `test/helpers/upload.helper.ts` | 0 | 0 |
| `test/integration/r2-storage.live.spec.ts` | 0 | 0 |
| `test/jest-e2e.setup.ts` | 0 | 0 |
| `test/seeds/test-seed.ts` | 0 | 0 |
| `test/setup-e2e.ts` | 0 | 0 |
| `test/unit/agendamentos-concurrency.spec.ts` | 0 | 0 |
| `test/unit/agendamentos-options.spec.ts` | 0 | 0 |
| `test/unit/agendamentos-query.dto.spec.ts` | 0 | 0 |
| `test/unit/analytics-performance-limits.spec.ts` | 0 | 0 |
| `test/unit/area-cliente-privacy.spec.ts` | 0 | 0 |
| `test/unit/auth-guards.coverage.spec.ts` | 0 | 0 |
| `test/unit/backup-external-upload.spec.ts` | 1 | 0 |
| `test/unit/chat03-bullmq-retention.spec.ts` | 1 | 0 |
| `test/unit/chat03-retention-runtime.spec.ts` | 0 | 0 |
| `test/unit/chat36-backup.coverage.spec.ts` | 0 | 0 |
| `test/unit/chat36-lgpd.coverage.spec.ts` | 0 | 0 |
| `test/unit/cliente-area-compatibility.spec.ts` | 0 | 0 |
| `test/unit/clientes-pacotes-concurrency.spec.ts` | 0 | 0 |
| `test/unit/controllers-expanded.coverage.spec.ts` | 0 | 0 |
| `test/unit/coverage-under-70-branch-matrix.generated.spec.ts` | 0 | 0 |
| `test/unit/coverage-under-70-final-target.generated.spec.ts` | 0 | 0 |
| `test/unit/coverage-under-70-targeted.generated.spec.ts` | 0 | 0 |
| `test/unit/env-validation-cors.spec.ts` | 0 | 0 |
| `test/unit/env-validation-required.spec.ts` | 0 | 0 |
| `test/unit/financeiro-list-movimentacoes-query.dto.spec.ts` | 0 | 0 |
| `test/unit/helpers/coverage-smoke.helper.ts` | 0 | 0 |
| `test/unit/infrastructure-expanded.coverage.spec.ts` | 0 | 0 |
| `test/unit/meta-whatsapp-cloud-provider-retry.spec.ts` | 0 | 0 |
| `test/unit/meta-whatsapp-cloud.provider.spec.ts` | 0 | 0 |
| `test/unit/meta-whatsapp-worker-flow.spec.ts` | 1 | 0 |
| `test/unit/micro-boost.coverage.spec.ts` | 0 | 0 |
| `test/unit/modules-services-expanded.coverage.spec.ts` | 0 | 0 |
| `test/unit/modules/usuarios/usuarios-role-filter.spec.ts` | 0 | 0 |
| `test/unit/queue-utils.spec.ts` | 0 | 0 |
| `test/unit/queues-utils.coverage.spec.ts` | 0 | 0 |
| `test/unit/s3-storage.service.spec.ts` | 0 | 0 |
| `test/unit/sanity.spec.ts` | 0 | 0 |
| `test/unit/services-critical.coverage.spec.ts` | 0 | 0 |
| `test/unit/storage-roundtrip.spec.ts` | 0 | 0 |
| `test/unit/tenant-services.coverage.spec.ts` | 0 | 0 |
| `test/unit/tenant-validator.spec.ts` | 0 | 0 |
| `test/unit/usuario-role-policy.coverage.spec.ts` | 0 | 0 |
| `test/unit/usuario-role-policy.spec.ts` | 0 | 0 |
| `test/unit/utils.coverage.spec.ts` | 0 | 0 |

## Próximo arquivo prioritário

`test/e2e/health.e2e-spec.ts` — 1 erro e 6 avisos.

## Restrições

Não foram executados Jest, E2E, stage, commit, push, migration, build ou deploy.
