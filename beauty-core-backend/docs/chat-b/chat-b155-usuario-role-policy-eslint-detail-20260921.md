# Diagnostico ESLint detalhado - usuario-role-policy.spec.ts

- Data: 2026-09-21
- Referencia: `docs/chat-b/chat-b154-backend-active-tests-eslint-inventory-20260921.md`; inventario registra 19 erros e 7 avisos.
- ESLint executado somente no arquivo: `node --max-old-space-size=4096 node_modules/eslint/bin/eslint.js test/unit/usuario-role-policy.spec.ts --format json --no-cache`. JSON contem um resultado para o arquivo solicitado.
- Resultado: exit code 1; 19 erros, 7 avisos; 26 diagnosticos totais; sem erros fatais.
- O spec completo (138 linhas) foi lido; nenhum arquivo de codigo foi alterado e `--fix` nao foi usado.

## Contagem por regra

| Regra | Erros | Avisos |
|---|---:|---:|
| `@typescript-eslint/await-thenable` | 1 | 0 |
| `@typescript-eslint/no-require-imports` | 1 | 0 |
| `@typescript-eslint/no-unsafe-argument` | 0 | 7 |
| `@typescript-eslint/no-unsafe-assignment` | 5 | 0 |
| `@typescript-eslint/no-unsafe-call` | 4 | 0 |
| `@typescript-eslint/no-unsafe-function-type` | 4 | 0 |
| `@typescript-eslint/no-unsafe-member-access` | 4 | 0 |

## Diagnosticos completos, com contexto

### 1. erro - linha 2, coluna 9

- Regra: `@typescript-eslint/no-unsafe-assignment`
- Mensagem: Unsafe assignment of an `any` value.
- Contexto (linha do diagnostico marcada com `>`):

```text
    1: describe('UsuarioRolePolicy Unit', () => {
>   2:   const mod = require('../../src/modules/usuarios/policies/usuario-role.policy');
    3: 
```

### 2. erro - linha 2, coluna 15

- Regra: `@typescript-eslint/no-require-imports`
- Mensagem: A `require()` style import is forbidden.
- Contexto (linha do diagnostico marcada com `>`):

```text
    1: describe('UsuarioRolePolicy Unit', () => {
>   2:   const mod = require('../../src/modules/usuarios/policies/usuario-role.policy');
    3: 
```

### 3. erro - linha 4, coluna 66

- Regra: `@typescript-eslint/no-unsafe-function-type`
- Mensagem: The `Function` type accepts any function-like value. Prefer explicitly defining any function parameters and return type.
- Contexto (linha do diagnostico marcada com `>`):

```text
    3: 
>   4:   function getCallableEntries(targetModule: any): Array<[string, Function]> {
    5:     const entries: Array<[string, Function]> = [];
```

### 4. erro - linha 5, coluna 35

- Regra: `@typescript-eslint/no-unsafe-function-type`
- Mensagem: The `Function` type accepts any function-like value. Prefer explicitly defining any function parameters and return type.
- Contexto (linha do diagnostico marcada com `>`):

```text
    4:   function getCallableEntries(targetModule: any): Array<[string, Function]> {
>   5:     const entries: Array<[string, Function]> = [];
    6: 
```

### 5. aviso - linha 7, coluna 62

- Regra: `@typescript-eslint/no-unsafe-argument`
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`.
- Contexto (linha do diagnostico marcada com `>`):

```text
    6: 
>   7:     for (const [exportName, exportedValue] of Object.entries(targetModule)) {
    8:       const value: any = exportedValue;
```

### 6. aviso - linha 12, coluna 22

- Regra: `@typescript-eslint/no-unsafe-argument`
- Mensagem: Unsafe argument of type `[string, any]` assigned to a parameter of type `[string, Function]`.
- Contexto (linha do diagnostico marcada com `>`):

```text
   11:         // Função exportada diretamente
>  12:         entries.push([exportName, value]);
   13: 
```

### 7. erro - linha 18, coluna 17

- Regra: `@typescript-eslint/no-unsafe-assignment`
- Mensagem: Unsafe assignment of an `any` value.
- Contexto (linha do diagnostico marcada com `>`):

```text
   17: 
>  18:           const staticValue = value[staticName];
   19: 
```

### 8. erro - linha 18, coluna 37

- Regra: `@typescript-eslint/no-unsafe-member-access`
- Mensagem: Unsafe member access [staticName] on an `any` value.
- Contexto (linha do diagnostico marcada com `>`):

```text
   17: 
>  18:           const staticValue = value[staticName];
   19: 
```

### 9. aviso - linha 21, coluna 26

- Regra: `@typescript-eslint/no-unsafe-argument`
- Mensagem: Unsafe argument of type `[string, any]` assigned to a parameter of type `[string, Function]`.
- Contexto (linha do diagnostico marcada com `>`):

```text
   20:           if (typeof staticValue === 'function') {
>  21:             entries.push([
   22:               exportName + '.' + staticName,
   23:               staticValue.bind(value),
   24:             ]);
   25:           }
```

### 10. erro - linha 23, coluna 15

- Regra: `@typescript-eslint/no-unsafe-call`
- Mensagem: Unsafe call of an `any` typed value.
- Contexto (linha do diagnostico marcada com `>`):

```text
   22:               exportName + '.' + staticName,
>  23:               staticValue.bind(value),
   24:             ]);
```

### 11. erro - linha 23, coluna 27

- Regra: `@typescript-eslint/no-unsafe-member-access`
- Mensagem: Unsafe member access .bind on an `any` value.
- Contexto (linha do diagnostico marcada com `>`):

```text
   22:               exportName + '.' + staticName,
>  23:               staticValue.bind(value),
   24:             ]);
```

### 12. erro - linha 30, coluna 17

- Regra: `@typescript-eslint/no-unsafe-assignment`
- Mensagem: Unsafe assignment of an `any` value.
- Contexto (linha do diagnostico marcada com `>`):

```text
   29:         try {
>  30:           const instance = new value();
   31: 
```

### 13. erro - linha 30, coluna 28

- Regra: `@typescript-eslint/no-unsafe-call`
- Mensagem: Unsafe construction of an `any` typed value.
- Contexto (linha do diagnostico marcada com `>`):

```text
   29:         try {
>  30:           const instance = new value();
   31: 
```

### 14. erro - linha 37, coluna 19

- Regra: `@typescript-eslint/no-unsafe-assignment`
- Mensagem: Unsafe assignment of an `any` value.
- Contexto (linha do diagnostico marcada com `>`):

```text
   36: 
>  37:             const method = instance[methodName];
   38: 
```

### 15. erro - linha 37, coluna 37

- Regra: `@typescript-eslint/no-unsafe-member-access`
- Mensagem: Unsafe member access [methodName] on an `any` value.
- Contexto (linha do diagnostico marcada com `>`):

```text
   36: 
>  37:             const method = instance[methodName];
   38: 
```

### 16. aviso - linha 40, coluna 28

- Regra: `@typescript-eslint/no-unsafe-argument`
- Mensagem: Unsafe argument of type `[string, any]` assigned to a parameter of type `[string, Function]`.
- Contexto (linha do diagnostico marcada com `>`):

```text
   39:             if (typeof method === 'function') {
>  40:               entries.push([
   41:                 exportName + '#' + methodName,
   42:                 method.bind(instance),
   43:               ]);
   44:             }
```

### 17. erro - linha 42, coluna 17

- Regra: `@typescript-eslint/no-unsafe-call`
- Mensagem: Unsafe call of an `any` typed value.
- Contexto (linha do diagnostico marcada com `>`):

```text
   41:                 exportName + '#' + methodName,
>  42:                 method.bind(instance),
   43:               ]);
```

### 18. erro - linha 42, coluna 24

- Regra: `@typescript-eslint/no-unsafe-member-access`
- Mensagem: Unsafe member access .bind on an `any` value.
- Contexto (linha do diagnostico marcada com `>`):

```text
   41:                 exportName + '#' + methodName,
>  42:                 method.bind(instance),
   43:               ]);
```

### 19. aviso - linha 52, coluna 59

- Regra: `@typescript-eslint/no-unsafe-argument`
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`.
- Contexto (linha do diagnostico marcada com `>`):

```text
   51:       if (value && typeof value === 'object') {
>  52:         for (const [methodName, method] of Object.entries(value)) {
   53:           if (typeof method === 'function') {
```

### 20. aviso - linha 54, coluna 26

- Regra: `@typescript-eslint/no-unsafe-argument`
- Mensagem: Unsafe argument of type `[string, any]` assigned to a parameter of type `[string, Function]`.
- Contexto (linha do diagnostico marcada com `>`):

```text
   53:           if (typeof method === 'function') {
>  54:             entries.push([exportName + '.' + methodName, method.bind(value)]);
   55:           }
```

### 21. erro - linha 60, coluna 36

- Regra: `@typescript-eslint/no-unsafe-function-type`
- Mensagem: The `Function` type accepts any function-like value. Prefer explicitly defining any function parameters and return type.
- Contexto (linha do diagnostico marcada com `>`):

```text
   59: 
>  60:     const unique = new Map<string, Function>();
   61: 
```

### 22. erro - linha 69, coluna 32

- Regra: `@typescript-eslint/no-unsafe-function-type`
- Mensagem: The `Function` type accepts any function-like value. Prefer explicitly defining any function parameters and return type.
- Contexto (linha do diagnostico marcada com `>`):

```text
   68: 
>  69:   function exercitarFuncao(fn: Function) {
   70:     const cenarios = [
```

### 23. erro - linha 97, coluna 15

- Regra: `@typescript-eslint/no-unsafe-assignment`
- Mensagem: Unsafe assignment of an `any` value.
- Contexto (linha do diagnostico marcada com `>`):

```text
   96:         const normalizedArgs = Array.isArray(args) ? args : [args];
>  97:         const result = fn(...normalizedArgs);
   98: 
```

### 24. erro - linha 97, coluna 24

- Regra: `@typescript-eslint/no-unsafe-call`
- Mensagem: Unsafe call of a `Function` typed value.
- Contexto (linha do diagnostico marcada com `>`):

```text
   96:         const normalizedArgs = Array.isArray(args) ? args : [args];
>  97:         const result = fn(...normalizedArgs);
   98: 
```

### 25. aviso - linha 112, coluna 24

- Regra: `@typescript-eslint/no-unsafe-argument`
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `{}`.
- Contexto (linha do diagnostico marcada com `>`):

```text
  111:     expect(mod).toBeDefined();
> 112:     expect(Object.keys(mod).length).toBeGreaterThan(0);
  113:   });
```

### 26. erro - linha 131, coluna 7

- Regra: `@typescript-eslint/await-thenable`
- Mensagem: Unexpected `await` of a non-Promise (non-"Thenable") value.
- Contexto (linha do diagnostico marcada com `>`):

```text
  130:     for (const [, fn] of callables) {
> 131:       await expect(async () => {
  132:         await exercitarFuncao(fn);
  133:       }).not.toThrow();
  134:     }
```

## Tipos, modulo de producao e contratos verificados

- O spec importa via `require` apenas `src/modules/usuarios/policies/usuario-role.policy.ts`, que exporta a classe `UsuarioRolePolicy`; seus metodos sao estaticos e possuem assinaturas concretas. A policy importa `Role` de `@prisma/client` e lanca `ForbiddenException` do NestJS.
- `Role` e o enum Prisma declarado em `prisma/schema.prisma`: `SUPER_ADMIN`, `ADMIN`, `GERENTE`, `RECEPCAO`, `PROFISSIONAL`, `CLIENTE`. O tipo gerado em `node_modules/.prisma/client/index.d.ts` confirma enum string literal; os papeis em string usados no spec coincidem no runtime, mas nao estao verificados pelo TypeScript por causa do `any`/`Function`.
- Contratos publicos: `canCreateUser`/`canManageUser` recebem duas `Role` e retornam boolean; `canUpdateUserRole` recebe tres `Role` e retorna boolean; `canManageEmpresa`/`canAccessEmpresasModule` recebem `Role` e retornam boolean. Os metodos `assert*` recebem esses papeis/IDs e retornam `void` ou lancam `ForbiddenException`; as validacoes de empresa aceitam `empresaId?: string | null`.
- `UsuariosService` usa os asserts da policy antes de criar/alterar/inativar usuarios. A policy e pura: nao usa PrismaService/delegate nem acesso a banco. Este spec nao define mocks; usa introspeccao de objetos, instancia a classe dinamicamente e produz argumentos sinteticos.
- Testes encontrados: `test/unit/usuario-role-policy.coverage.spec.ts` repete o padrao de introspeccao e engole excecoes; nao oferece uma verificacao independente dos resultados. `test/unit/modules/usuarios/usuarios-role-filter.spec.ts` testa filtro de roles/queries de usuarios, nao os resultados diretos da policy.

## Origem dos diagnosticos

| Linhas | Origem | Avaliacao |
|---|---|---|
| 2 | Import CommonJS proibido e atribuicao insegura | `require()` retorna `any`; causa ambos os erros e remove a verificacao estatica do export conhecido.
| 4-5, 60, 69 | Tipos `any` e `Function` | Descoberta generica das exportacoes perde as assinaturas dos metodos; os tipos amplos sao a causa direta do lint.
| 7, 12, 18, 21, 23, 30, 37, 40, 42, 52, 54 | Enumeracao/introspeccao dinamica | `Object.entries`, indexacao por nome, construcao dinamica e `.bind` operam em valores `any`. As mensagens de `no-unsafe-argument` sao avisos nesses pontos; unsafe assignment/member access/call/new sao erros nos outros.
| 69-101 | Invocacao com lista generica de cenarios | Os cenarios misturam papeis, objetos de usuario e aridades diferentes, embora cada metodo tenha contrato especifico. Excecoes sync sao ignoradas; para retorno Promise, a rejeicao tambem e convertida para `undefined`.
| 112 | `Object.keys` sobre modulo `any` | Aviso propagado pelo import inseguro; a verificacao so confirma que a exportacao tem uma chave.
| 131 | `await` de matcher sincrono | `.not.toThrow()` nao e Promise; o `await` nao aguarda a funcao async entregue ao matcher. O callback pode iniciar, mas excecoes/rejeicoes dentro do exercitador sao capturadas e nao verificadas.

## Tipagem versus riscos semanticos

- **Problemas de tipagem/lint:** a regra `no-require-imports` e real; o `any` proveniente do `require` torna inseguros `Object.entries`, indexacao, `.bind`, construcao e `Object.keys`. O uso de `Function` e realmente amplo demais para conferir argumentos e retorno. Os 7 avisos de `no-unsafe-argument` acompanham os mesmos valores dinamicos.
- **Possivel falsa seguranca semantica:** os dois primeiros testes apenas garantem que o objeto existe/tem chaves ou que uma lista reflexiva tem entradas; nao testam autorizacao. O terceiro percorre funcoes com argumentos heterogeneos e nao asserta retorno nem excecao. Seus `catch` internos classificam qualquer erro real como esperado e a rejeicao Promise e suprimida. `await expect(async () => ...).not.toThrow()` e uma assercao inadequada para callback async e nao verifica conclusao/rejeicao.
- A policy nao possui funcoes async; portanto `result instanceof Promise` e um ramo sem contrato real e nao justifica a logica de Promise no teste. A chamada direta a classe exportada como se fosse funcao tambem e um alvo dinamico sem utilidade para cobertura.
- Nao ha delegates Prisma nem mocks a corrigir neste spec. O unico elemento Prisma usado no contrato de producao e o enum `Role`; excecoes esperadas sao `ForbiddenException`. O maior risco nao e comportamento quebrado pela tipagem, mas testes que passam sem demonstrar as regras de autorizacao.

## Correcao minima e segura para o proximo bloco

Importar estaticamente `UsuarioRolePolicy` e `Role`; remover `getCallableEntries`, `exercitarFuncao`, `any`, `Function`, matriz generica de argumentos e catches. Substituir por chamadas diretas e assertions por contrato: combinacoes permitidas/proibidas das funcoes `can*`; `toThrow(ForbiddenException)` para os `assert*` negados; sucesso para asserts permitidos; e casos de mesma identidade, CLIENTE/SUPER_ADMIN e ausencia/presenca de empresa para as validacoes especificas. Assim se mantem cobertura dos metodos sem silenciar excecoes reais. Nenhuma correcao foi aplicada nesta etapa.
