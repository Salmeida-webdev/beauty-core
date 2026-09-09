# Chat 03 - Bloco 04B - Lint baseline versus diff

Projeto: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core
Auditoria somente leitura. Nenhum codigo foi alterado.

| Metrica | Valor |
|---|---:|
| Erros totais | 2241 |
| Warnings totais | 290 |
| Erros em linhas alteradas | 289 |
| Erros preexistentes | 1952 |
| Erros nos arquivos foco Chat 03 | 115 |
| Erros alterados nos arquivos foco Chat 03 | 46 |

## Arquivos com erros em linhas alteradas

- src/modules/analytics/analytics.service.ts: alterados=41, preexistentes=268, warnings=13
- test/e2e/uploads-strict-roundtrip.e2e-spec.ts: alterados=17, preexistentes=0, warnings=4
- src/modules/financeiro/financeiro.service.ts: alterados=16, preexistentes=182, warnings=2
- test/unit/coverage-under-70-targeted.generated.spec.ts: alterados=16, preexistentes=80, warnings=6
- test/unit/infrastructure-expanded.coverage.spec.ts: alterados=15, preexistentes=18, warnings=1
- test/unit/coverage-under-70-final-target.generated.spec.ts: alterados=10, preexistentes=86, warnings=4
- test/unit/chat36-lgpd.coverage.spec.ts: alterados=10, preexistentes=39, warnings=13
- test/unit/helpers/coverage-smoke.helper.ts: alterados=9, preexistentes=92, warnings=4
- src/modules/scheduler/scheduler.service.ts: alterados=9, preexistentes=9, warnings=0
- test/unit/auth-guards.coverage.spec.ts: alterados=9, preexistentes=6, warnings=3
- test/unit/tenant-validator.spec.ts: alterados=8, preexistentes=34, warnings=1
- test/e2e/whatsapp-queue-demo.e2e-spec.ts: alterados=8, preexistentes=0, warnings=4
- test/e2e/uploads.e2e-spec.ts: alterados=8, preexistentes=28, warnings=7
- src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider.ts: alterados=7, preexistentes=0, warnings=0
- src/queues/services/dead-letter-queue.service.ts: alterados=7, preexistentes=31, warnings=2
- test/e2e/auth-cliente.e2e-spec.ts: alterados=6, preexistentes=16, warnings=10
- src/common/interceptors/audit-log.interceptor.ts: alterados=5, preexistentes=26, warnings=0
- test/unit/micro-boost.coverage.spec.ts: alterados=5, preexistentes=22, warnings=3
- src/modules/templates-whatsapp/templates-whatsapp.controller.ts: alterados=5, preexistentes=0, warnings=5
- test/unit/services-critical.coverage.spec.ts: alterados=5, preexistentes=101, warnings=5

## Arquivos foco Chat 03

- src/modules/mensagens-whatsapp/mensagens-whatsapp.module.ts: alterados=0, preexistentes=0, warnings=0
- src/modules/mensagens-whatsapp/mensagens-whatsapp.service.ts: alterados=3, preexistentes=33, warnings=2
- src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider.ts: alterados=7, preexistentes=0, warnings=0
- src/queues/workers/whatsapp.worker.ts: alterados=0, preexistentes=8, warnings=0
- test/e2e/uploads.e2e-spec.ts: alterados=8, preexistentes=28, warnings=7
- test/e2e/uploads-strict-roundtrip.e2e-spec.ts: alterados=17, preexistentes=0, warnings=4
- test/e2e/whatsapp-queue-demo.e2e-spec.ts: alterados=8, preexistentes=0, warnings=4
- test/unit/meta-whatsapp-cloud.provider.spec.ts: alterados=3, preexistentes=0, warnings=0
- test/unit/storage-roundtrip.spec.ts: alterados=0, preexistentes=0, warnings=0

## Decisao

- Existem erros de lint em linhas alteradas dos arquivos foco; corrigir antes de novo gate.
- Erros em linhas preexistentes foram separados e nao classificados como introduzidos pelo Chat 03.
