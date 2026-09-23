# Beauty Core — lote B165

- Data: 2026-09-22
- Arquivo tratado: `test/e2e/multiempresa.e2e-spec.ts`.
- Baseline: B164 — 10 erros e 6 avisos ESLint neste arquivo.
- Contratos lidos antes da edição: `test/setup-e2e.ts`, `test/helpers/auth.helper.ts`, `test/helpers/prisma.helper.ts`, `test/seeds/test-seed.ts`, `src/modules/clientes/clientes.controller.ts` e os modelos `Usuario`/`Cliente` do Prisma.
- Nenhum módulo de produção foi alterado.

## Correção semântica

- Substituído `require('supertest')` por import tipado.
- Removidos os acessos Prisma via `any`; foram usados os delegates tipados `usuario.create` e `cliente.create`.
- Removido campo inexistente `password` do contrato de `Usuario` e usado `Role.ADMIN`.
- Adicionada validação explícita dos IDs vindos do seed.
- Adaptação tipada da aplicação Nest para o contrato `INestApplication<Server>` usado pelo helper de autenticação.
- Preservado o comportamento multiempresa: Empresa A não acessa cliente de B, Empresa B acessa o próprio cliente e rotas administrativas exigem autenticação.

## Validação solicitada

| Etapa | Resultado |
|---|---|
| Prettier | PASS — exit 0 |
| ESLint isolado | PASS — exit 0; 0 erros e 0 avisos |

Jest/E2E não foram executados por solicitação.

## Integridade

- `git diff --check`: executado com sucesso.
- Não executados: stage, commit, push, migration, build, E2E ou deploy.
