# Inventário ESLint dos testes ativos — B170

- Data: 2026-09-22
- Baseline: B168 (`chat-b168-backend-active-tests-eslint-inventory-20260922.md`).
- Escopo: exatamente os 70 arquivos `.ts` ativos sob `test/`.
- ESLint: sem `--fix`, sem cache, heap de 6144 MB, saída JSON.
- Nenhum código foi alterado.

## Integridade da coleta

| Métrica | Resultado |
|---|---:|
| CANDIDATES | 70 |
| RESULTS | 70 |
| UNIQUE_PATHS | 70 |
| PATH_SETS_EQUAL | `True` |
| Somente `.ts` | `True` |
| Exit code | 1, devido a diagnósticos |

Os caminhos foram enumerados em `test/`, excluindo `node_modules`, `coverage` e `dist`, e enviados individualmente ao ESLint. Nenhum `.js` ou `.cjs` foi analisado.

## Comparação com B168

| Métrica | B168 | B170 | Variação |
|---|---:|---:|---:|
| Erros | 57 | 50 | -7 |
| Avisos | 76 | 75 | -1 |

## Próximo arquivo prioritário

`test/unit/s3-storage.service.spec.ts` — 7 erros e 0 avisos.

## Arquivos com mais erros

| Arquivo | Erros | Avisos |
|---|---:|---:|
| `test/unit/s3-storage.service.spec.ts` | 7 | 0 |
| `test/e2e/auditoria.e2e-spec.ts` | 6 | 3 |
| `test/unit/agendamentos-concurrency.spec.ts` | 6 | 0 |
| `test/e2e/auth-admin.e2e-spec.ts` | 4 | 10 |
| `test/e2e/tenant.e2e-spec.ts` | 4 | 2 |
| `test/e2e/meta-whatsapp-webhook.e2e-spec.ts` | 3 | 5 |
| `test/unit/analytics-performance-limits.spec.ts` | 3 | 2 |

## Restrições

- Não executados: E2E, stage, commit, push, migration, build ou deploy.
