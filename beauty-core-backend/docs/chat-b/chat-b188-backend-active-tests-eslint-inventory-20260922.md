# Inventário ESLint dos testes ativos — B188

- Data: 2026-09-22
- Baseline global: B186 (`chat-b186-backend-active-tests-eslint-inventory-20260922.md`).
- Alteração isolada considerada: B187 (`clientes-pacotes-concurrency.spec.ts`).
- Escopo: exatamente os 70 arquivos `.ts` ativos sob `test/`.
- ESLint: JSON, sem `--fix`, sem cache, heap de 6144 MB.

## Integridade da coleta

| Métrica | Resultado |
|---|---:|
| CANDIDATES | 70 |
| RESULTS | 70 |
| UNIQUE_PATHS | 70 |
| PATH_SETS_EQUAL | `True` |
| Somente `.ts` | `True` |
| Exit code | 1, devido a diagnósticos |

Os candidatos foram enumerados recursivamente em `test/`, excluindo `node_modules`, `coverage` e `dist`, e enviados individualmente ao ESLint. Nenhum `.js` ou `.cjs` foi analisado.

## Comparação com B186 e B187

| Métrica | B186 | B187* | B188 | Variação acumulada B188−B186 |
|---|---:|---:|---:|---:|
| Erros | 14 | 13 | 13 | -1 |
| Avisos | 53 | 45 | 45 | -8 |

\* B187 foi uma correção isolada de `clientes-pacotes-concurrency.spec.ts`, que tinha 1 erro e 8 avisos no B186; o B188 confirma globalmente o resultado.

## Próximo arquivo prioritário

`test/e2e/sessoes.e2e-spec.ts` — 1 erro e 7 avisos.

## Arquivos prioritários por quantidade de erros e avisos

| Arquivo | Erros | Avisos |
|---|---:|---:|
| `test/e2e/sessoes.e2e-spec.ts` | 1 | 7 |
| `test/e2e/health.e2e-spec.ts` | 1 | 6 |
| `test/e2e/super-admin.e2e-spec.ts` | 1 | 5 |
| `test/e2e/metrics.e2e-spec.ts` | 1 | 4 |
| `test/e2e/queues.e2e-spec.ts` | 1 | 4 |
| `test/e2e/cliente-area.e2e-spec.ts` | 1 | 3 |
| `test/e2e/roles.e2e-spec.ts` | 1 | 3 |
| `test/e2e/scheduler.e2e-spec.ts` | 1 | 3 |
| `test/e2e/refresh-throttle.e2e-spec.ts` | 1 | 2 |
| `test/e2e/swagger-validation.e2e-spec.ts` | 1 | 2 |
| `test/unit/backup-external-upload.spec.ts` | 1 | 0 |
| `test/unit/chat03-bullmq-retention.spec.ts` | 1 | 0 |
| `test/unit/meta-whatsapp-worker-flow.spec.ts` | 1 | 0 |
| `test/e2e/lgpd-runtime.e2e-spec.ts` | 0 | 4 |
| `test/e2e/uploads-strict-roundtrip.e2e-spec.ts` | 0 | 1 |

## Restrições observadas

- Nenhum arquivo de código foi alterado.
- Não executados: Jest, E2E, stage, commit, push, migration, build ou deploy.

