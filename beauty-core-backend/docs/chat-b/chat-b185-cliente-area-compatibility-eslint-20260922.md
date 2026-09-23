# B185 — Correção de `cliente-area-compatibility.spec.ts`

- Data: 2026-09-22
- Baseline: B184
- Arquivo tratado exclusivamente: `test/unit/cliente-area-compatibility.spec.ts`

## Contratos analisados

Foram lidos integralmente o teste, `ClienteAreaService`, `AreaClienteService`, os controllers das áreas `/cliente-area` e `/area-cliente`, os tipos de autenticação/tenant usados pelo facade, `ClienteAreaQueryDto` e os contratos de delegação de perfil e dashboard.

## Diagnósticos do baseline

O B184 registrava 3 erros `@typescript-eslint/unbound-method` nas asserções diretas sobre métodos do double canônico.

## Correções semânticas

- Criadas referências nomeadas e tipadas para os mocks de `perfil` e `dashboard`, usadas nas asserções sem extrair métodos não vinculados.
- Removido `as never` dos retornos mockados.
- Modelados os retornos necessários dos contratos (`perfil.id` e `dashboard.perfil.id`) e os argumentos de empresa/cliente.
- Mantida a adaptação explícita do double aos serviços reais, sem alterar produção.
- Preservadas as garantias de envelope `{ data, meta }`, delegação com `empresaId`/`clienteId` e rejeição quando falta identidade JWT ou tenant.
- Não foram usados `any`, `Function`, `eslint-disable`, casts indiscriminados, assertions tautológicas ou catches silenciosos.

## Validações executadas

| Validação | Resultado |
|---|---|
| Prettier no arquivo | Aprovado |
| ESLint isolado, sem `--fix` e sem cache | 0 erros, 0 avisos |
| Jest unitário isolado | 1 suíte aprovada, 3 testes aprovados |
| `git diff --check` no arquivo | Aprovado |
| E2E | Não executado |

## Comparação

| Métrica | B184 | B185 | Variação |
|---|---:|---:|---:|
| Erros no arquivo | 3 | 0 | -3 |
| Avisos no arquivo | 0 | 0 | 0 |

Não executados: stage, commit, push, migration, build ou deploy.

