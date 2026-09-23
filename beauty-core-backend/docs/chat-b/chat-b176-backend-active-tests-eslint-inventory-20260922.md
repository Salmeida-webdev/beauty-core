# Inventário ESLint dos testes ativos — B176

- Data: 2026-09-22
- Baselines: B174 (inventário global) e B175 (correção de `agendamentos-concurrency.spec.ts`).
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

## Comparação

| Métrica | B174 | B176 | Variação B176−B174 |
|---|---:|---:|---:|
| Erros | 37 | 31 | -6 |
| Avisos | 72 | 72 | 0 |

O B175 eliminou os 6 erros do arquivo `test/unit/agendamentos-concurrency.spec.ts`; os avisos globais permaneceram inalterados.

## Próximo arquivo prioritário

`test/e2e/auth-admin.e2e-spec.ts` — 4 erros e 10 avisos.

## Arquivos com mais erros

| Arquivo | Erros | Avisos |
|---|---:|---:|
| `test/e2e/auth-admin.e2e-spec.ts` | 4 | 10 |
| `test/e2e/tenant.e2e-spec.ts` | 4 | 2 |
| `test/e2e/meta-whatsapp-webhook.e2e-spec.ts` | 3 | 5 |
| `test/unit/analytics-performance-limits.spec.ts` | 3 | 2 |
| `test/unit/cliente-area-compatibility.spec.ts` | 3 | 0 |
| `test/unit/clientes-pacotes-concurrency.spec.ts` | 1 | 8 |
| `test/e2e/sessoes.e2e-spec.ts` | 1 | 7 |
| `test/e2e/health.e2e-spec.ts` | 1 | 6 |
| `test/e2e/super-admin.e2e-spec.ts` | 1 | 5 |
| `test/e2e/metrics.e2e-spec.ts` | 1 | 4 |

## Restrições observadas

- Nenhum código foi alterado.
- Não executados: E2E, Jest, stage, commit, push, migration, build ou deploy.

