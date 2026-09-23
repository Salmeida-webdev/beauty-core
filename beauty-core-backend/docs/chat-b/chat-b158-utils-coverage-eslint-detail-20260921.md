# Diagnostico ESLint detalhado - utils.coverage.spec.ts

- Data: 2026-09-21
- Referencia: `docs/chat-b/chat-b157-backend-active-tests-eslint-inventory-20260921.md` (18 erros, 8 avisos).
- Comando: `node --max-old-space-size=4096 node_modules/eslint/bin/eslint.js test/unit/utils.coverage.spec.ts --format json --no-cache`. O JSON retornou somente este arquivo.
- Resultado ESLint: exit code 1; 18 erros, 8 avisos, 26 diagnosticos; sem erros fatais.
- Spec completo lido: 124 linhas. Nenhum codigo foi alterado; `--fix` nao foi usado.

## Contagem por regra

| Regra | Erros | Avisos |
|---|---:|---:|
| `@typescript-eslint/no-require-imports` | 4 | 0 |
| `@typescript-eslint/no-unsafe-argument` | 0 | 8 |
| `@typescript-eslint/no-unsafe-assignment` | 5 | 0 |
| `@typescript-eslint/no-unsafe-call` | 8 | 0 |
| `@typescript-eslint/no-unused-vars` | 1 | 0 |

## Diagnosticos completos com contexto

### 1. erro - linha 3, coluna 11

- Regra: `@typescript-eslint/no-unsafe-assignment`
- Mensagem: Unsafe assignment of an `any` value.
- Contexto (linha diagnosticada marcada com `>`):

```text
    2:   describe('duration.util', () => {
>   3:     const mod = require('../../src/shared/utils/duration.util');
    4: 
```

### 2. erro - linha 3, coluna 17

- Regra: `@typescript-eslint/no-require-imports`
- Mensagem: A `require()` style import is forbidden.
- Contexto (linha diagnosticada marcada com `>`):

```text
    2:   describe('duration.util', () => {
>   3:     const mod = require('../../src/shared/utils/duration.util');
    4: 
```

### 3. aviso - linha 7, coluna 26

- Regra: `@typescript-eslint/no-unsafe-argument`
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `{}`.
- Contexto (linha diagnosticada marcada com `>`):

```text
    6:       expect(mod).toBeDefined();
>   7:       expect(Object.keys(mod).length).toBeGreaterThan(0);
    8:     });
```

### 4. erro - linha 11, coluna 19

- Regra: `@typescript-eslint/no-unused-vars`
- Mensagem: 'name' is assigned a value but never used.
- Contexto (linha diagnosticada marcada com `>`):

```text
   10:     it('deve executar funções exportadas com entradas seguras quando possível', () => {
>  11:       for (const [name, value] of Object.entries(mod)) {
   12:         if (typeof value !== 'function') continue;
```

### 5. aviso - linha 11, coluna 50

- Regra: `@typescript-eslint/no-unsafe-argument`
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`.
- Contexto (linha diagnosticada marcada com `>`):

```text
   10:     it('deve executar funções exportadas com entradas seguras quando possível', () => {
>  11:       for (const [name, value] of Object.entries(mod)) {
   12:         if (typeof value !== 'function') continue;
```

### 6. erro - linha 16, coluna 14

- Regra: `@typescript-eslint/no-unsafe-call`
- Mensagem: Unsafe call of an `any` typed value.
- Contexto (linha diagnosticada marcada com `>`):

```text
   15:           try {
>  16:             (value as any)(60);
   17:           } catch {
```

### 7. erro - linha 19, coluna 16

- Regra: `@typescript-eslint/no-unsafe-call`
- Mensagem: Unsafe call of an `any` typed value.
- Contexto (linha diagnosticada marcada com `>`):

```text
   18:             try {
>  19:               (value as any)('60');
   20:             } catch {
```

### 8. erro - linha 22, coluna 18

- Regra: `@typescript-eslint/no-unsafe-call`
- Mensagem: Unsafe call of an `any` typed value.
- Contexto (linha diagnosticada marcada com `>`):

```text
   21:               try {
>  22:                 (value as any)(new Date(), new Date());
   23:               } catch {
```

### 9. erro - linha 34, coluna 11

- Regra: `@typescript-eslint/no-unsafe-assignment`
- Mensagem: Unsafe assignment of an `any` value.
- Contexto (linha diagnosticada marcada com `>`):

```text
   33:   describe('pagination.util', () => {
>  34:     const mod = require('../../src/shared/utils/pagination.util');
   35: 
```

### 10. erro - linha 34, coluna 17

- Regra: `@typescript-eslint/no-require-imports`
- Mensagem: A `require()` style import is forbidden.
- Contexto (linha diagnosticada marcada com `>`):

```text
   33:   describe('pagination.util', () => {
>  34:     const mod = require('../../src/shared/utils/pagination.util');
   35: 
```

### 11. aviso - linha 38, coluna 26

- Regra: `@typescript-eslint/no-unsafe-argument`
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `{}`.
- Contexto (linha diagnosticada marcada com `>`):

```text
   37:       expect(mod).toBeDefined();
>  38:       expect(Object.keys(mod).length).toBeGreaterThan(0);
   39:     });
```

### 12. aviso - linha 42, coluna 46

- Regra: `@typescript-eslint/no-unsafe-argument`
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`.
- Contexto (linha diagnosticada marcada com `>`):

```text
   41:     it('deve executar funções exportadas com parâmetros comuns quando possível', () => {
>  42:       for (const [, value] of Object.entries(mod)) {
   43:         if (typeof value !== 'function') continue;
```

### 13. erro - linha 47, coluna 14

- Regra: `@typescript-eslint/no-unsafe-call`
- Mensagem: Unsafe call of an `any` typed value.
- Contexto (linha diagnosticada marcada com `>`):

```text
   46:           try {
>  47:             (value as any)({ page: 1, limit: 10 });
   48:           } catch {
```

### 14. erro - linha 50, coluna 16

- Regra: `@typescript-eslint/no-unsafe-call`
- Mensagem: Unsafe call of an `any` typed value.
- Contexto (linha diagnosticada marcada com `>`):

```text
   49:             try {
>  50:               (value as any)(1, 10);
   51:             } catch {
```

### 15. erro - linha 61, coluna 11

- Regra: `@typescript-eslint/no-unsafe-assignment`
- Mensagem: Unsafe assignment of an `any` value.
- Contexto (linha diagnosticada marcada com `>`):

```text
   60:   describe('get-empresa-id.util', () => {
>  61:     const mod = require('../../src/shared/utils/get-empresa-id');
   62: 
```

### 16. erro - linha 61, coluna 17

- Regra: `@typescript-eslint/no-require-imports`
- Mensagem: A `require()` style import is forbidden.
- Contexto (linha diagnosticada marcada com `>`):

```text
   60:   describe('get-empresa-id.util', () => {
>  61:     const mod = require('../../src/shared/utils/get-empresa-id');
   62: 
```

### 17. aviso - linha 65, coluna 26

- Regra: `@typescript-eslint/no-unsafe-argument`
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `{}`.
- Contexto (linha diagnosticada marcada com `>`):

```text
   64:       expect(mod).toBeDefined();
>  65:       expect(Object.keys(mod).length).toBeGreaterThan(0);
   66:     });
```

### 18. aviso - linha 69, coluna 46

- Regra: `@typescript-eslint/no-unsafe-argument`
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`.
- Contexto (linha diagnosticada marcada com `>`):

```text
   68:     it('deve lidar com request contendo empresaId em user', () => {
>  69:       for (const [, value] of Object.entries(mod)) {
   70:         if (typeof value !== 'function') continue;
```

### 19. erro - linha 74, coluna 19

- Regra: `@typescript-eslint/no-unsafe-assignment`
- Mensagem: Unsafe assignment of an `any` value.
- Contexto (linha diagnosticada marcada com `>`):

```text
   73:           try {
>  74:             const result = (value as any)({
   75:               user: {
   76:                 empresaId: 'empresa-test-id',
   77:               },
   78:             });
   79: 
```

### 20. erro - linha 74, coluna 29

- Regra: `@typescript-eslint/no-unsafe-call`
- Mensagem: Unsafe call of an `any` typed value.
- Contexto (linha diagnosticada marcada com `>`):

```text
   73:           try {
>  74:             const result = (value as any)({
   75:               user: {
```

### 21. erro - linha 92, coluna 11

- Regra: `@typescript-eslint/no-unsafe-assignment`
- Mensagem: Unsafe assignment of an `any` value.
- Contexto (linha diagnosticada marcada com `>`):

```text
   91:   describe('device.util', () => {
>  92:     const mod = require('../../src/shared/utils/device.util');
   93: 
```

### 22. erro - linha 92, coluna 17

- Regra: `@typescript-eslint/no-require-imports`
- Mensagem: A `require()` style import is forbidden.
- Contexto (linha diagnosticada marcada com `>`):

```text
   91:   describe('device.util', () => {
>  92:     const mod = require('../../src/shared/utils/device.util');
   93: 
```

### 23. aviso - linha 96, coluna 26

- Regra: `@typescript-eslint/no-unsafe-argument`
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `{}`.
- Contexto (linha diagnosticada marcada com `>`):

```text
   95:       expect(mod).toBeDefined();
>  96:       expect(Object.keys(mod).length).toBeGreaterThan(0);
   97:     });
```

### 24. aviso - linha 100, coluna 46

- Regra: `@typescript-eslint/no-unsafe-argument`
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`.
- Contexto (linha diagnosticada marcada com `>`):

```text
   99:     it('deve processar user-agent comum quando possível', () => {
> 100:       for (const [, value] of Object.entries(mod)) {
  101:         if (typeof value !== 'function') continue;
```

### 25. erro - linha 105, coluna 14

- Regra: `@typescript-eslint/no-unsafe-call`
- Mensagem: Unsafe call of an `any` typed value.
- Contexto (linha diagnosticada marcada com `>`):

```text
  104:           try {
> 105:             (value as any)(
  106:               'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
```

### 26. erro - linha 110, coluna 16

- Regra: `@typescript-eslint/no-unsafe-call`
- Mensagem: Unsafe call of an `any` typed value.
- Contexto (linha diagnosticada marcada com `>`):

```text
  109:             try {
> 110:               (value as any)({
  111:                 headers: {
```

## Modulos, tipos e contratos reais

- `duration.util.ts` exporta `durationToSeconds(value: string): number`, aceitando somente duracoes no formato numero + `s`, `m`, `h` ou `d`, e `durationToDate(value: string): Date`, que usa a primeira funcao. Entrada invalida lanca `Error`.
- `pagination.util.ts` exporta constantes numericas e `getPaginationParams(query: PaginationDto)`, que le `page`/`limit` e retorna page, limit, skip e take; `buildPaginatedResponse<T>(data: T[], total: number, page: number, limit: number)`, que devolve `data` e metadados de paginacao. `PaginationDto` tem defaults page=1/limit=20 e decoradores de validacao (page/limit positivos; limit maximo 100).
- `get-empresa-id.ts` exporta `getEmpresaId(req)`, com request estrutural contendo `user?.empresaId`; retorna o ID ou lanca Nest `UnauthorizedException` quando ausente. Os campos alternativos do tipo nao sao usados pela implementacao atual.
- `device.util.ts` exporta `getRequestIp(req: express.Request): string | null`, que le `x-forwarded-for` (string ou lista) e depois `req.ip`/socket, e `parseUserAgent(userAgent?: string | null)`, que aceita somente texto opcional e devolve dispositivo, sistema operacional, navegador e userAgent.
- O spec nao importa estaticamente os modulos: cada um e carregado por `require()` dentro de seu bloco `describe`; depois usa `Object.keys`/`Object.entries` e invoca qualquer export que seja funcao. Nao ha mock, delegate Prisma ou acesso a banco. As chamadas dinamicas nao preservam a relacao entre export e assinatura.
- A busca nos testes tambem encontrou assertions por comportamento desses utilitarios no `test/unit/micro-boost.coverage.spec.ts` (B153): valores de tenant e paginacao, resultado de user-agent, IP via requisicao Express real e conversoes/rejeicao de duracoes. Isso demonstra que ja ha cobertura focada em parte substancial desses contratos fora deste spec.

## Origem e classificacao dos diagnosticos

| Linhas | Origem | Tipo |
|---|---|---|
| 3, 34, 61, 92 | Quatro `require()` e atribuicoes dos modulos | `no-require-imports` e unsafe assignment: diagnosticos de lint reais; `require` retorna `any`.
| 7, 11, 38, 42, 65, 69, 96, 100 | `Object.keys`/`Object.entries` com modulo `any` | Oito avisos `no-unsafe-argument` propagados pela tipagem insegura do import; `name` da linha 11 tambem nao e usado.
| 16, 19, 22, 47, 50, 74, 105, 110 | Chamada de valores de `Object.entries` apos casts `as any` | Oito erros `no-unsafe-call`; os casts afirmam `any` e eliminam verificacao da assinatura.
| 74 | Atribuicao do retorno de chamada dinamica | Um dos cinco `no-unsafe-assignment`; o retorno e `any` e nao tem contrato preservado.

## Riscos semanticos separados do lint

- Os `catch` nao estao vazios sintaticamente (incluem comentarios e tentativas alternativas), mas capturam indiscriminadamente erros de contrato e erros reais. Assim uma falha da funcao chamada nao reprova o teste.
- As assertions `expect(mod).toBeDefined()` e `Object.keys(mod).length > 0` apenas verificam exportacao/chaves, nao o resultado funcional. Em `getEmpresaId`, `if (result !== undefined) expect(result).toBeDefined()` e tautologica e nao compara o ID esperado; se a funcao lancar, o catch engole o erro.
- `expect(() => { try { chamada } catch { ... } }).not.toThrow()` valida que o wrapper que captura excecoes nao lanca, e nao que a chamada produziu resultado correto. As variantes tentam argumentos de outros contratos: numeros/datas para funcoes de duracao, `(object)` ou `(number, number)` para ambas as funcoes de paginacao, string ou request parcial para exports de device. `getRequestIp` espera `Request` Express completa; `parseUserAgent` espera string.
- O teste de duration pode esconder a rejeicao de formatos invalidos esperada pela implementacao. O de paginacao pode chamar uma funcao com parametros incompatíveis, capturar o erro e ainda passar. O de device mistura duas assinaturas distintas. A importacao fora dos callbacks tambem significa que um erro ao carregar o modulo falha a suite; os catches internos nao tratam carregamento.
- Parte dos comportamentos ja e coberta de forma direta pelo spec B153; este arquivo nao adiciona assertions observaveis que provem os mesmos resultados. O problema semantico principal e cobertura nominal/tautologica, nao um mock defeituoso.

## Correcao minima e segura para o proximo bloco

Trocar os quatro `require()` por imports nomeados e remover enumeracao/introspeccao e os casts `any`. Chamar diretamente cada export com sua assinatura: strings validas/invalidas para duracao; `PaginationDto` para `getPaginationParams` e array/total/page/limit para resposta; request com `user.empresaId` e um caso sem ID esperando `UnauthorizedException`; string/null para `parseUserAgent` e uma `express.Request` real ou fixture tipada para `getRequestIp`. Fazer assertions nos valores concretos ou na excecao esperada e retirar os catches que ocultam falhas. Como o B153 ja cobre a maioria desses comportamentos, a mudanca deve evitar duplicar casos sem valor e pode reduzir este spec aos contratos ainda nao verificados diretamente.

Nenhuma correcao foi aplicada nesta etapa.
