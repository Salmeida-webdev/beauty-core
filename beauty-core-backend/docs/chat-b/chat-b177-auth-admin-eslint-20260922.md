# B177 — Correção de `auth-admin.e2e-spec.ts`

- Data: 2026-09-22
- Baseline: B176
- Arquivo tratado exclusivamente: `test/e2e/auth-admin.e2e-spec.ts`

## Contratos analisados

Foram lidos integralmente o teste, `test/setup-e2e.ts`, `test/helpers/auth.helper.ts`, `test/seeds/test-seed.ts`, `AuthController`, `AuthService` e os contratos dos endpoints `/auth/login`, `/auth/refresh`, `/auth/sessoes`, `/auth/logout` e `/auth/logout-all`.

## Diagnósticos do baseline

O B176 registrava 4 erros e 10 avisos:

- 1 `@typescript-eslint/no-require-imports`.
- 3 `@typescript-eslint/no-unsafe-member-access` em `response.body`.
- 5 `@typescript-eslint/no-unsafe-argument` relacionados aos corpos HTTP.
- 5 `@typescript-eslint/no-unsafe-argument` relacionados ao `INestApplication<any>` de `E2eContext.app` e aos helpers.

## Correções semânticas

- Substituído `import = require('supertest')` por importação tipada.
- Criado adaptador explícito para o contrato `INestApplication<Server>` exigido pelos helpers e pelo SuperTest.
- Adicionadas guarda de registro e validação de token para tratar `response.body` como `unknown`, sem acesso inseguro.
- Preservados os cenários reais de login válido, senha inválida, refresh, listagem de sessões, logout e logout-all.
- Ausência de `refresh_token` agora causa falha explícita do cenário, em vez de retorno silencioso.
- Não foram usados `any`, `Function`, `eslint-disable`, casts indiscriminados, assertions tautológicas ou catches silenciosos.

## Validações executadas

| Validação | Resultado |
|---|---|
| Prettier no arquivo | Aprovado |
| ESLint isolado, sem `--fix` e sem cache | 0 erros, 0 avisos |
| `git diff --check` no arquivo | Aprovado |
| E2E | Não executado |
| Jest | Não executado |

## Comparação

| Métrica | B176 | B177 | Variação |
|---|---:|---:|---:|
| Erros no arquivo | 4 | 0 | -4 |
| Avisos no arquivo | 10 | 0 | -10 |

Não executados: stage, commit, push, migration, build ou deploy.

