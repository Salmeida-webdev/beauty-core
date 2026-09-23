# Inventário ESLint dos testes ativos — B168

- Data: 2026-09-22
- Baseline: B166 (`chat-b166-backend-active-tests-eslint-inventory-20260922.md`).
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

## Comparação com B166

| Métrica | B166 | B168 | Variação |
|---|---:|---:|---:|
| Erros | 64 | 57 | -7 |
| Avisos | 78 | 76 | -2 |

## Próximo arquivo prioritário

`test/helpers/tenant.helper.ts` — 7 erros e 1 aviso.

Segundo colocado: `test/unit/s3-storage.service.spec.ts` — 7 erros e 0 avisos.

## Arquivos com mais erros

| Arquivo | Erros | Avisos |
|---|---:|---:|
| `test/helpers/tenant.helper.ts` | 7 | 1 |
| `test/unit/s3-storage.service.spec.ts` | 7 | 0 |
| `test/e2e/auditoria.e2e-spec.ts` | 6 | 3 |
| `test/unit/agendamentos-concurrency.spec.ts` | 6 | 0 |
| `test/e2e/auth-admin.e2e-spec.ts` | 4 | 10 |
| `test/e2e/tenant.e2e-spec.ts` | 4 | 2 |
| `test/e2e/meta-whatsapp-webhook.e2e-spec.ts` | 3 | 5 |

## Restrições

- Não executados: E2E, stage, commit, push, migration, build ou deploy.
