# Inventário ESLint dos testes ativos — B184

- Data: 2026-09-22
- Baselines: B182 (inventário global) e B183 (correção de `analytics-performance-limits.spec.ts`).
- Escopo: exatamente os 70 arquivos `.ts` ativos sob `test/`.
- ESLint: sem `--fix`, sem cache, heap de 6144 MB, saída JSON.

## Integridade da coleta

| Métrica | Resultado |
|---|---:|
| CANDIDATES | 70 |
| RESULTS | 70 |
| UNIQUE_PATHS | 70 |
| PATH_SETS_EQUAL | `True` |
| Somente `.ts` | `True` |
| Exit code | 1, devido a diagnósticos |

Os arquivos foram enumerados recursivamente em `test/`, excluindo `node_modules`, `coverage` e `dist`, e enviados individualmente ao ESLint. Nenhum `.js` ou `.cjs` foi analisado.

## Comparação com B182 e B183

| Métrica | B182 | B183* | B184 | Variação acumulada B184−B182 |
|---|---:|---:|---:|---:|
| Erros | 20 | 17 | 17 | -3 |
| Avisos | 55 | 53 | 53 | -2 |

\* B183 foi uma correção isolada de `analytics-performance-limits.spec.ts`, que tinha 3 erros e 2 avisos no B182; o B184 confirma globalmente o resultado.

## Próximo arquivo prioritário

`test/unit/cliente-area-compatibility.spec.ts` — 3 erros e 0 avisos.

## Arquivos prioritários por quantidade de erros

| Arquivo | Erros | Avisos |
|---|---:|---:|
| `test/unit/cliente-area-compatibility.spec.ts` | 3 | 0 |
| `test/unit/clientes-pacotes-concurrency.spec.ts` | 1 | 8 |
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

## Restrições observadas

- Nenhum arquivo de código foi alterado.
- Não executados: E2E, Jest, stage, commit, push, migration, build ou deploy.

