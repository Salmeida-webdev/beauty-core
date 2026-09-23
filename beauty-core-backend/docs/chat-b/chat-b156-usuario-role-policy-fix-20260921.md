# Correcao de usuario-role-policy.spec.ts

Data: 2026-09-21
Referencia de diagnostico: `docs/chat-b/chat-b155-usuario-role-policy-eslint-detail-20260921.md`.

## Alteracao de codigo

Arquivo de codigo alterado: `test/unit/usuario-role-policy.spec.ts` (somente).

O spec importa estaticamente `UsuarioRolePolicy`, `Role` de `@prisma/client` e `ForbiddenException`. Foram removidos `require()`, `any`, `Function`, introspeccao de exports, cenarios de argumentos heterogeneos, chamadas reflexivas e catches que ocultavam falhas. Nenhum arquivo de producao foi alterado; nao ha delegates Prisma nem mocks nesse teste.

Os testes fazem chamadas diretas a todos os 14 metodos publicos estaticos da policy:

- `canCreateUser` e `assertCanCreateUser`: permissoes de SUPER_ADMIN, ADMIN e GERENTE; rejeicao de CLIENTE, autoescalacao e papeis superiores.
- `canManageUser` e `assertCanManageUser`: hierarquia de administracao; rejeicao de CLIENTE, pares e superiores conforme permitido pela matriz.
- `canUpdateUserRole` e `assertCanUpdateUserRole`: verificacao das permissoes sobre o papel atual e o papel novo, com atualizacao permitida e elevacao proibida.
- `assertCannotChangeOwnRole`: mesmo usuario sem mudanca, outro usuario, ausencia de novo papel e tentativa de alterar a propria role.
- `canManageEmpresa`/`assertCanManageEmpresa` e `canAccessEmpresasModule`/`assertCanAccessEmpresasModule`: acesso exclusivo de SUPER_ADMIN.
- `assertAdminUserHasEmpresa`: exigencia de tenant para roles administrativas e excecoes definidas para SUPER_ADMIN/CLIENTE.
- `assertTargetRoleHasValidEmpresa`: SUPER_ADMIN global, role administrativa com empresa, role administrativa sem empresa e bloqueio de CLIENTE.
- `assertSuperAdminHasNoEmpresa`: SUPER_ADMIN sem empresa, SUPER_ADMIN vinculado (proibido) e role ADMIN vinculada.

Todos os cenarios proibidos verificam `ForbiddenException`; os permitidos verificam booleanos ou conclusao sem excecao. A policy nao contem metodos assincronos, portanto as assertions sao sincronas e nao usam `await` ou Promise matcher.

## Validacoes

1. Prettier executado somente em `test/unit/usuario-role-policy.spec.ts`: passou; segunda execucao informou arquivo inalterado.
2. ESLint executado somente nesse spec, formato JSON e sem `--fix`: 0 erros, 0 avisos.
3. Jest executado somente nesse spec: 1 suite passou; 11 testes passaram; 0 falhas.
4. Os testes chamam os metodos reais importados de `UsuarioRolePolicy`, verificando resultados, excecoes e regras de cargo/empresa.
5. `git diff --check`: resultado registrado apos a execucao.
6. `git status --short`: executado ao final para conferencia do workspace.

Nao foram executados stage, commit, push, migration ou deploy.