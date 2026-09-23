# B173 — Correção de `auditoria.e2e-spec.ts`

- Data: 2026-09-22
- Baseline ESLint: B172
- Arquivo tratado: `test/e2e/auditoria.e2e-spec.ts`

## Leitura dos contratos

Foram lidos integralmente o teste, `test/setup-e2e.ts`, `test/helpers/auth.helper.ts`, o modelo Prisma `AuditoriaSistema`, `AuditoriaService`, `AuditoriaController`, `AuthService` e o fluxo do scheduler utilizado pelo endpoint.

## Correções semânticas

- Substituído `import = require` por importação tipada de `supertest`.
- Adaptado explicitamente o `INestApplication` do contexto ao contrato HTTP usado pelos helpers e pelo SuperTest.
- Removido o acesso dinâmico via `any`; a consulta usa o delegate Prisma `auditoriaSistema` real.
- A verificação de login agora procura uma auditoria recente com `acao=LOGIN_ADMIN`, `modulo=AUTH` e `status=SUCESSO`, falhando com mensagem explícita se o registro não existir.
- Removida a asserção tautológica sobre tamanho de coleção e mantidas as verificações dos campos semânticos da auditoria.
- Preservado o cenário do scheduler e sua aceitação explícita de `200`, `201` ou `404`.

## Validações

- Prettier isolado: executado, arquivo inalterado após formatação.
- ESLint isolado, sem `--fix` e sem cache: executado no arquivo-alvo, sem diagnósticos emitidos.
- E2E: não executado, conforme solicitado.
- Jest: não executado.
- Não executados: stage, commit, push, migration, build ou deploy.

## Comparação com B172

| Métrica | B172 | B173 | Variação |
|---|---:|---:|---:|
| Erros no arquivo | 6 | 0 | -6 |
| Avisos no arquivo | 3 | 0 | -3 |

