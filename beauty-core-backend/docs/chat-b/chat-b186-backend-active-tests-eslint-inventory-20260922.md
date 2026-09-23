# Inventário ESLint dos testes ativos — B186

- Data: 2026-09-22
- Baselines: B184 (inventário global) e B185 (correção de `cliente-area-compatibility.spec.ts`).
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

## Comparação com B184 e B185

| Métrica | B184 | B185* | B186 | Variação acumulada B186−B184 |
|---|---:|---:|---:|---:|
| Erros | 17 | 14 | 14 | -3 |
| Avisos | 53 | 53 | 53 | 0 |

\* B185 foi uma correção isolada de `cliente-area-compatibility.spec.ts`, que tinha 3 erros e 0 avisos no B184; o B186 confirma globalmente o resultado.

## Próximo arquivo prioritário

`test/unit/clientes-pacotes-concurrency.spec.ts` — 1 erro e 8 avisos.

## Arquivos prioritários por quantidade de erros e avisos

| Arquivo | Erros | Avisos |
|---|---:|---:|
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
| `test/e2e/lgpd-runtime.e2e-spec.ts` | 0 | 4 |

## Restrições observadas

- Nenhum arquivo de código foi alterado.
- Não executados: E2E, Jest, stage, commit, push, migration, build ou deploy.

