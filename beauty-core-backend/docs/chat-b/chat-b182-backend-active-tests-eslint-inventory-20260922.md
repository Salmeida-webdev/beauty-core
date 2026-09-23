# Inventário ESLint dos testes ativos — B182

- Data: 2026-09-22
- Baselines: B180 (inventário global) e B181 (correção de `meta-whatsapp-webhook.e2e-spec.ts`).
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

## Comparação com B180 e B181

| Métrica | B180 | B181* | B182 | Variação acumulada B182−B180 |
|---|---:|---:|---:|---:|
| Erros | 23 | 20 | 20 | -3 |
| Avisos | 60 | 55 | 55 | -5 |

\* B181 foi uma correção isolada de `meta-whatsapp-webhook.e2e-spec.ts`, que tinha 3 erros e 5 avisos no B180; o B182 confirma globalmente o resultado.

## Próximo arquivo prioritário

`test/unit/analytics-performance-limits.spec.ts` — 3 erros e 2 avisos.

Empate seguinte por erros: `test/unit/cliente-area-compatibility.spec.ts` — 3 erros e 0 avisos.

## Arquivos prioritários por quantidade de erros

| Arquivo | Erros | Avisos |
|---|---:|---:|
| `test/unit/analytics-performance-limits.spec.ts` | 3 | 2 |
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

## Restrições observadas

- Nenhum arquivo de código foi alterado.
- Não executados: E2E, Jest, stage, commit, push, migration, build ou deploy.

