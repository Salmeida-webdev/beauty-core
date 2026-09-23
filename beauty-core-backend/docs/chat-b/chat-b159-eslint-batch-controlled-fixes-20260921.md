# Relatório consolidado ESLint e correções em lote B159

- Data: 2026-09-21
- Base de comparação: `chat-b157-backend-active-tests-eslint-inventory-20260921.md`; diagnóstico semântico de `utils.coverage.spec.ts`: B158.
- Escopo: quatro specs do lote e todos os arquivos TypeScript sob `test/`; excluídos `node_modules`, `coverage` e `dist`.
- ESLint global: JSON, `--no-cache`, heap 6144 MB, sem `--fix`. Candidatos: 70; resultados individuais: 70; caminhos absolutos únicos: 70; conjuntos idênticos: PASS.

## Arquivos corrigidos

| Arquivo | Resultado | Alteração semântica principal |
|---|---|---|
| `test/unit/utils.coverage.spec.ts` | Prettier PASS; ESLint 0/0; Jest 7/7 PASS | Testes diretos dos contratos de duração, paginação, tenant, agente e IP; respostas e exceções verificadas. |
| `test/e2e/auth-cliente.e2e-spec.ts` | Prettier PASS; ESLint 0/0; Jest 6/6 PASS | OTP validado contra o delegate Prisma; refresh verifica tokens rotacionados; sessões, logout e logout-all verificam respostas e efeitos reais. |
| `test/e2e/uploads.e2e-spec.ts` | Prettier PASS; ESLint 0/0; Jest 4/4 PASS | Upload/download admin aprovado, cliente negado, URL assinada verificada; tenant cruzado e PDF inválido confirmados sem persistência. |
| `test/unit/area-cliente-privacy.spec.ts` | Prettier PASS; ESLint 0/0; Jest 2/2 PASS | Mapeadores reais chamados com enums Prisma; DTOs completos validam campos presentes e dados internos ausentes. |

Nenhum módulo de produção foi alterado. Os adaptadores de servidor e estreitamentos de `unknown` mantêm a tipagem local dos specs sem modificar `setup-e2e.ts` ou helpers compartilhados.

## Triagem dos candidatos seguintes do B157

- `usuario-role-policy.coverage.spec.ts` (16 erros): varredura reflexiva redundante com os testes diretos da policy corrigidos no B156.
- `auth-guards.coverage.spec.ts` (15 erros): apenas descobre/importa e instancia guards, sem exercitar autorização; os fluxos de E2E cobrem autenticação.
- `infrastructure-expanded.coverage.spec.ts` (14 erros): varredura genérica de exports que engole falhas, com assertion sem valor comportamental.
- `queue-utils.spec.ts` (14 erros): varredura de cobertura duplicada por `queues-utils.coverage.spec.ts`.
- Esses candidatos foram excluídos após leitura; para o quarto slot foram priorizados os testes funcionais de uploads e privacidade da área do cliente.

## Totais e variação contra B157

| Medida | B157 antes | B159 depois | Variação |
|---|---:|---:|---:|
| Erros | 204 | 145 | -59 |
| Avisos | 129 | 103 | -26 |
| Arquivos com diagnósticos | 37 | 33 | -4 |
| Arquivos sem diagnósticos | 33 | 37 | +4 |

## Variação por regra

| Regra | Antes E | Depois E | Δ E | Antes A | Depois A | Δ A |
|---|---:|---:|---:|---:|---:|---:|
| @typescript-eslint/await-thenable | 1 | 1 | 0 | 0 | 0 | 0 |
| @typescript-eslint/no-require-imports | 33 | 28 | -5 | 0 | 0 | 0 |
| @typescript-eslint/no-unsafe-argument | 0 | 0 | 0 | 129 | 103 | -26 |
| @typescript-eslint/no-unsafe-assignment | 53 | 39 | -14 | 0 | 0 | 0 |
| @typescript-eslint/no-unsafe-call | 37 | 25 | -12 | 0 | 0 | 0 |
| @typescript-eslint/no-unsafe-function-type | 3 | 3 | 0 | 0 | 0 | 0 |
| @typescript-eslint/no-unsafe-member-access | 59 | 33 | -26 | 0 | 0 | 0 |
| @typescript-eslint/no-unsafe-return | 3 | 3 | 0 | 0 | 0 | 0 |
| @typescript-eslint/no-unused-vars | 3 | 2 | -1 | 0 | 0 | 0 |
| @typescript-eslint/restrict-plus-operands | 2 | 1 | -1 | 0 | 0 | 0 |
| @typescript-eslint/unbound-method | 4 | 4 | 0 | 0 | 0 | 0 |
| no-empty | 6 | 6 | 0 | 0 | 0 | 0 |

## Consolidado por arquivo

| Arquivo | Erros | Avisos | Contagem por regra (E/A) |
|---|---:|---:|---|
| test/app.e2e-spec.ts | 0 | 0 | — |
| test/e2e/auditoria.e2e-spec.ts | 6 | 3 | `@typescript-eslint/no-require-imports` 1/0; `@typescript-eslint/no-unsafe-argument` 0/3; `@typescript-eslint/no-unsafe-assignment` 1/0; `@typescript-eslint/no-unsafe-call` 1/0; `@typescript-eslint/no-unsafe-member-access` 3/0 |
| test/e2e/auth-admin.e2e-spec.ts | 4 | 10 | `@typescript-eslint/no-require-imports` 1/0; `@typescript-eslint/no-unsafe-argument` 0/10; `@typescript-eslint/no-unsafe-member-access` 3/0 |
| test/e2e/auth-cliente.e2e-spec.ts | 0 | 0 | — |
| test/e2e/cliente-area.e2e-spec.ts | 1 | 3 | `@typescript-eslint/no-require-imports` 1/0; `@typescript-eslint/no-unsafe-argument` 0/3 |
| test/e2e/health.e2e-spec.ts | 1 | 6 | `@typescript-eslint/no-require-imports` 1/0; `@typescript-eslint/no-unsafe-argument` 0/6 |
| test/e2e/lgpd-runtime.e2e-spec.ts | 0 | 4 | `@typescript-eslint/no-unsafe-argument` 0/4 |
| test/e2e/meta-whatsapp-webhook.e2e-spec.ts | 3 | 5 | `@typescript-eslint/no-unsafe-argument` 0/5; `@typescript-eslint/no-unsafe-member-access` 3/0 |
| test/e2e/metrics.e2e-spec.ts | 1 | 4 | `@typescript-eslint/no-require-imports` 1/0; `@typescript-eslint/no-unsafe-argument` 0/4 |
| test/e2e/multiempresa.e2e-spec.ts | 10 | 6 | `@typescript-eslint/no-require-imports` 1/0; `@typescript-eslint/no-unsafe-argument` 0/6; `@typescript-eslint/no-unsafe-assignment` 3/0; `@typescript-eslint/no-unsafe-call` 2/0; `@typescript-eslint/no-unsafe-member-access` 4/0 |
| test/e2e/queues.e2e-spec.ts | 1 | 4 | `@typescript-eslint/no-require-imports` 1/0; `@typescript-eslint/no-unsafe-argument` 0/4 |
| test/e2e/refresh-throttle.e2e-spec.ts | 1 | 2 | `@typescript-eslint/no-require-imports` 1/0; `@typescript-eslint/no-unsafe-argument` 0/2 |
| test/e2e/roles.e2e-spec.ts | 1 | 3 | `@typescript-eslint/no-require-imports` 1/0; `@typescript-eslint/no-unsafe-argument` 0/3 |
| test/e2e/scheduler.e2e-spec.ts | 1 | 3 | `@typescript-eslint/no-require-imports` 1/0; `@typescript-eslint/no-unsafe-argument` 0/3 |
| test/e2e/sessoes.e2e-spec.ts | 1 | 7 | `@typescript-eslint/no-require-imports` 1/0; `@typescript-eslint/no-unsafe-argument` 0/7 |
| test/e2e/super-admin.e2e-spec.ts | 1 | 5 | `@typescript-eslint/no-require-imports` 1/0; `@typescript-eslint/no-unsafe-argument` 0/5 |
| test/e2e/swagger-validation.e2e-spec.ts | 1 | 2 | `@typescript-eslint/no-require-imports` 1/0; `@typescript-eslint/no-unsafe-argument` 0/2 |
| test/e2e/tenant.e2e-spec.ts | 4 | 2 | `@typescript-eslint/no-require-imports` 1/0; `@typescript-eslint/no-unsafe-argument` 0/2; `@typescript-eslint/no-unsafe-call` 1/0; `@typescript-eslint/no-unsafe-member-access` 1/0; `@typescript-eslint/restrict-plus-operands` 1/0 |
| test/e2e/uploads.e2e-spec.ts | 0 | 0 | — |
| test/e2e/uploads-strict-roundtrip.e2e-spec.ts | 0 | 1 | `@typescript-eslint/no-unsafe-argument` 0/1 |
| test/e2e/whatsapp-queue-demo.e2e-spec.ts | 0 | 1 | `@typescript-eslint/no-unsafe-argument` 0/1 |
| test/env-test.guard.ts | 0 | 0 | — |
| test/helpers/auth.helper.ts | 0 | 0 | — |
| test/helpers/prisma.helper.ts | 0 | 0 | — |
| test/helpers/queue.helper.ts | 0 | 0 | — |
| test/helpers/tenant.helper.ts | 7 | 1 | `@typescript-eslint/no-require-imports` 1/0; `@typescript-eslint/no-unsafe-argument` 0/1; `@typescript-eslint/no-unsafe-assignment` 1/0; `@typescript-eslint/no-unsafe-member-access` 4/0; `@typescript-eslint/no-unsafe-return` 1/0 |
| test/helpers/upload.helper.ts | 0 | 0 | — |
| test/integration/r2-storage.live.spec.ts | 0 | 0 | — |
| test/jest-e2e.setup.ts | 0 | 0 | — |
| test/seeds/test-seed.ts | 0 | 0 | — |
| test/setup-e2e.ts | 0 | 0 | — |
| test/unit/agendamentos-concurrency.spec.ts | 6 | 0 | `@typescript-eslint/no-unsafe-assignment` 1/0; `@typescript-eslint/no-unsafe-call` 2/0; `@typescript-eslint/no-unsafe-member-access` 3/0 |
| test/unit/agendamentos-options.spec.ts | 0 | 0 | — |
| test/unit/agendamentos-query.dto.spec.ts | 0 | 0 | — |
| test/unit/analytics-performance-limits.spec.ts | 3 | 2 | `@typescript-eslint/no-unsafe-argument` 0/2; `@typescript-eslint/no-unsafe-member-access` 3/0 |
| test/unit/area-cliente-privacy.spec.ts | 0 | 0 | — |
| test/unit/auth-guards.coverage.spec.ts | 15 | 3 | `@typescript-eslint/no-require-imports` 3/0; `@typescript-eslint/no-unsafe-argument` 0/3; `@typescript-eslint/no-unsafe-assignment` 6/0; `@typescript-eslint/no-unsafe-call` 3/0; `@typescript-eslint/no-unsafe-member-access` 3/0 |
| test/unit/backup-external-upload.spec.ts | 1 | 0 | `@typescript-eslint/no-require-imports` 1/0 |
| test/unit/chat03-bullmq-retention.spec.ts | 1 | 0 | `@typescript-eslint/unbound-method` 1/0 |
| test/unit/chat03-retention-runtime.spec.ts | 0 | 0 | — |
| test/unit/chat36-backup.coverage.spec.ts | 0 | 0 | — |
| test/unit/chat36-lgpd.coverage.spec.ts | 0 | 0 | — |
| test/unit/cliente-area-compatibility.spec.ts | 3 | 0 | `@typescript-eslint/unbound-method` 3/0 |
| test/unit/clientes-pacotes-concurrency.spec.ts | 1 | 8 | `@typescript-eslint/no-unsafe-argument` 0/8; `@typescript-eslint/no-unsafe-assignment` 1/0 |
| test/unit/controllers-expanded.coverage.spec.ts | 0 | 0 | — |
| test/unit/coverage-under-70-branch-matrix.generated.spec.ts | 0 | 0 | — |
| test/unit/coverage-under-70-final-target.generated.spec.ts | 0 | 0 | — |
| test/unit/coverage-under-70-targeted.generated.spec.ts | 0 | 0 | — |
| test/unit/env-validation-cors.spec.ts | 0 | 0 | — |
| test/unit/env-validation-required.spec.ts | 0 | 0 | — |
| test/unit/financeiro-list-movimentacoes-query.dto.spec.ts | 0 | 0 | — |
| test/unit/helpers/coverage-smoke.helper.ts | 0 | 0 | — |
| test/unit/infrastructure-expanded.coverage.spec.ts | 14 | 1 | `@typescript-eslint/no-require-imports` 2/0; `@typescript-eslint/no-unsafe-argument` 0/1; `@typescript-eslint/no-unsafe-assignment` 2/0; `@typescript-eslint/no-unsafe-call` 3/0; `@typescript-eslint/no-unsafe-member-access` 1/0; `no-empty` 6/0 |
| test/unit/meta-whatsapp-cloud.provider.spec.ts | 0 | 0 | — |
| test/unit/meta-whatsapp-cloud-provider-retry.spec.ts | 0 | 0 | — |
| test/unit/meta-whatsapp-worker-flow.spec.ts | 1 | 0 | `@typescript-eslint/no-unsafe-assignment` 1/0 |
| test/unit/micro-boost.coverage.spec.ts | 0 | 0 | — |
| test/unit/modules/usuarios/usuarios-role-filter.spec.ts | 0 | 0 | — |
| test/unit/modules-services-expanded.coverage.spec.ts | 0 | 0 | — |
| test/unit/queues-utils.coverage.spec.ts | 12 | 4 | `@typescript-eslint/no-require-imports` 2/0; `@typescript-eslint/no-unsafe-argument` 0/4; `@typescript-eslint/no-unsafe-assignment` 6/0; `@typescript-eslint/no-unsafe-call` 4/0 |
| test/unit/queue-utils.spec.ts | 14 | 4 | `@typescript-eslint/no-require-imports` 2/0; `@typescript-eslint/no-unsafe-argument` 0/4; `@typescript-eslint/no-unsafe-assignment` 6/0; `@typescript-eslint/no-unsafe-call` 4/0; `@typescript-eslint/no-unused-vars` 2/0 |
| test/unit/s3-storage.service.spec.ts | 7 | 0 | `@typescript-eslint/no-unsafe-assignment` 5/0; `@typescript-eslint/no-unsafe-return` 2/0 |
| test/unit/sanity.spec.ts | 0 | 0 | — |
| test/unit/services-critical.coverage.spec.ts | 0 | 0 | — |
| test/unit/storage-roundtrip.spec.ts | 0 | 0 | — |
| test/unit/tenant-services.coverage.spec.ts | 7 | 2 | `@typescript-eslint/no-require-imports` 2/0; `@typescript-eslint/no-unsafe-argument` 0/2; `@typescript-eslint/no-unsafe-assignment` 3/0; `@typescript-eslint/no-unsafe-call` 1/0; `@typescript-eslint/no-unsafe-member-access` 1/0 |
| test/unit/tenant-validator.spec.ts | 0 | 0 | — |
| test/unit/usuario-role-policy.coverage.spec.ts | 16 | 7 | `@typescript-eslint/await-thenable` 1/0; `@typescript-eslint/no-require-imports` 1/0; `@typescript-eslint/no-unsafe-argument` 0/7; `@typescript-eslint/no-unsafe-assignment` 3/0; `@typescript-eslint/no-unsafe-call` 4/0; `@typescript-eslint/no-unsafe-function-type` 3/0; `@typescript-eslint/no-unsafe-member-access` 4/0 |
| test/unit/usuario-role-policy.spec.ts | 0 | 0 | — |
| test/unit/utils.coverage.spec.ts | 0 | 0 | — |

## Validação global

- ESLint: 70/70 arquivos processados com caminhos correspondentes; 145 erros e 103 avisos. Os quatro arquivos corrigidos retornaram zero diagnósticos no processamento global.
- Jest unitário global: 38 suites passaram; 1.509 testes passaram; exit code 0.
- Jest isolado: utilitários 7/7; autenticação cliente E2E 6/6; uploads E2E 4/4; privacidade da área do cliente 2/2.
- `git diff --check`: conferido após a gravação do relatório; `git status --short`: apenas conferência.
- Não houve stage, commit, push, migration, deploy, `--fix` ou reversão de alterações locais.
