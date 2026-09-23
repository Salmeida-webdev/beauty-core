# Inventário ESLint dos testes ativos — B174

- Data: 2026-09-22
- Baseline: B172 (`chat-b172-backend-active-tests-eslint-inventory-20260922.md`)
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

Os candidatos foram enumerados recursivamente em `test/`, excluindo `node_modules`, `coverage` e `dist`, e enviados individualmente ao ESLint. Nenhum `.js` ou `.cjs` foi analisado.

## Comparação com B172

| Métrica | B172 | B174 | Variação |
|---|---:|---:|---:|
| Erros | 43 | 37 | -6 |
| Avisos | 75 | 72 | -3 |

## Próximo arquivo prioritário

`test/unit/agendamentos-concurrency.spec.ts` — 6 erros e 0 avisos.

## Arquivos com mais erros

| Arquivo | Erros | Avisos |
|---|---:|---:|
| `test/unit/agendamentos-concurrency.spec.ts` | 6 | 0 |
| `test/e2e/auth-admin.e2e-spec.ts` | 4 | 10 |
| `test/e2e/tenant.e2e-spec.ts` | 4 | 2 |
| `test/e2e/meta-whatsapp-webhook.e2e-spec.ts` | 3 | 5 |
| `test/unit/analytics-performance-limits.spec.ts` | 3 | 2 |
| `test/unit/cliente-area-compatibility.spec.ts` | 3 | 0 |
| `test/unit/clientes-pacotes-concurrency.spec.ts` | 1 | 8 |
| `test/e2e/sessoes.e2e-spec.ts` | 1 | 7 |
| `test/e2e/health.e2e-spec.ts` | 1 | 6 |
| `test/e2e/super-admin.e2e-spec.ts` | 1 | 5 |

## Restrições observadas

- Nenhum código de produção ou teste foi alterado.
- Não executados: E2E, Jest, stage, commit, push, migration, build ou deploy.

