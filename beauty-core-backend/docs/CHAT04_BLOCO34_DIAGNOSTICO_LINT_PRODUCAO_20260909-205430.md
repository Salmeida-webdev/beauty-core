# Chat 04 - Bloco 34 - Diagnostico Lint de Producao V5

Data: 2026-09-09 20:54:30 -03:00
- Projeto: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core
- Branch: main
- HEAD: 219dd066492ea23eadab10cb089957dd521cb816
- origin/main: 219dd066492ea23eadab10cb089957dd521cb816
- Status preservado: 311
- Staged antes/depois: 0/0

## Coleta

- Arquivos src candidatos: 280
- Tamanho dos lotes: 8
- Total de lotes: 35
- Lotes com falha: 0
- Exit code maximo: 1

## Findings de producao

- Arquivos com findings: 64
- Erros: 467
- Warnings: 100
- Total: 567

## Top arquivos

- src/queues/services/dead-letter-queue.service.ts: 32 findings (32 erros, 0 warnings)
- src/common/utils/audit-request.util.ts: 26 findings (26 erros, 0 warnings)
- src/lgpd/lgpd.service.ts: 25 findings (25 erros, 0 warnings)
- src/queues/services/queues.service.ts: 24 findings (24 erros, 0 warnings)
- src/common/metrics/interceptors/http-metrics.interceptor.ts: 22 findings (22 erros, 0 warnings)
- src/common/interceptors/audit-log.interceptor.ts: 22 findings (22 erros, 0 warnings)
- src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts: 22 findings (22 erros, 0 warnings)
- src/modules/tenant-publico/public-tenant.controller.ts: 20 findings (20 erros, 0 warnings)
- src/modules/pacotes/pacotes.service.ts: 19 findings (19 erros, 0 warnings)
- src/modules/scheduler/scheduler.service.ts: 18 findings (18 erros, 0 warnings)
- src/modules/auth-cliente/auth-cliente.controller.ts: 16 findings (9 erros, 7 warnings)
- src/modules/fidelidade/fidelidade.controller.ts: 16 findings (8 erros, 8 warnings)
- src/modules/notificacoes/notificacoes.controller.ts: 14 findings (7 erros, 7 warnings)
- src/modules/auditoria/auditoria.controller.ts: 14 findings (7 erros, 7 warnings)
- src/backup/backup.service.ts: 13 findings (13 erros, 0 warnings)
- src/common/metrics/middleware/metrics.middleware.ts: 12 findings (12 erros, 0 warnings)
- src/modules/cupons/cupons.controller.ts: 12 findings (6 erros, 6 warnings)
- src/modules/arquivos/arquivos.controller.ts: 12 findings (8 erros, 4 warnings)
- src/modules/beneficios/beneficios.controller.ts: 10 findings (5 erros, 5 warnings)
- src/modules/categorias-financeiras/categorias-financeiras.controller.ts: 10 findings (5 erros, 5 warnings)
- src/modules/auth/auth.controller.ts: 10 findings (6 erros, 4 warnings)
- src/modules/templates-whatsapp/templates-whatsapp.controller.ts: 10 findings (5 erros, 5 warnings)
- src/modules/unidades/unidades.controller.ts: 10 findings (5 erros, 5 warnings)
- src/modules/niveis-fidelidade/niveis-fidelidade.controller.ts: 10 findings (5 erros, 5 warnings)
- src/modules/servicos/servicos.controller.ts: 10 findings (5 erros, 5 warnings)

## Top regras

- @typescript-eslint/no-unsafe-member-access: 199
- @typescript-eslint/no-unsafe-argument: 99
- @typescript-eslint/no-unsafe-assignment: 79
- prettier/prettier: 74
- @typescript-eslint/no-unsafe-return: 34
- @typescript-eslint/no-unused-vars: 24
- @typescript-eslint/no-base-to-string: 18
- @typescript-eslint/no-misused-promises: 15
- @typescript-eslint/no-unsafe-call: 12
- @typescript-eslint/require-await: 5
- @typescript-eslint/no-redundant-type-constituents: 4
- no-sparse-arrays: 2
- @typescript-eslint/no-floating-promises: 1
- @typescript-eslint/no-unnecessary-type-assertion: 1

## Gate: READY-FOR-NEXT-SELECTIVE-LINT-GROUP

Nenhuma alteracao de codigo, dependencia ou estado Git foi executada.
