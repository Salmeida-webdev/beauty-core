# Inventário ESLint dos testes ativos — B178

- Data: 2026-09-22
- Baselines: B176 (inventário global) e B177 (correção de `auth-admin.e2e-spec.ts`).
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

## Comparação com B176 e B177

| Métrica | B176 | B177 | B178 | Variação B178−B176 |
|---|---:|---:|---:|---:|
| Erros | 31 | 27* | 27 | -4 |
| Avisos | 72 | 62* | 62 | -10 |

\* B177 foi uma correção isolada do arquivo `auth-admin.e2e-spec.ts`, que tinha 4 erros e 10 avisos no B176; não houve inventário global no B177. O B178 confirma globalmente esse resultado.

## Próximo arquivo prioritário

`test/e2e/tenant.e2e-spec.ts` — 4 erros e 2 avisos.

## Arquivos prioritários por quantidade de erros

| Arquivo | Erros | Avisos |
|---|---:|---:|
| `test/e2e/tenant.e2e-spec.ts` | 4 | 2 |
| `test/e2e/meta-whatsapp-webhook.e2e-spec.ts` | 3 | 5 |
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

## Restrições observadas

- Nenhum arquivo de código foi alterado.
- Não executados: E2E, Jest, stage, commit, push, migration, build ou deploy.

