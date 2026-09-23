# Beauty Core - Chat B - B73 - Diagnostico lint restante final-target

- Inicio: 2026-09-13T15:39:40.2976851-03:00
- Script: B73-v1
- Modo: somente leitura; o relatorio e o unico artefato criado.
- Pasta unica de relatorios do Chat B: `beauty-core-backend\docs\chat-b\`

## Objetivo

- Capturar os diagnosticos restantes do ESLint depois do B72.
- Consolidar regras, linhas e contexto curto para a proxima correcao seletiva.
- Nao alterar o final-target nem executar Prettier, Jest, build ou workflow.

## Diagnosticos do ESLint

- ESLint exit code: 1
- Diagnosticos analisados: 24
- Erros: 21
- Avisos: 3

## Regras predominantes

- `@typescript-eslint/no-unsafe-return`; ocorrencias 6
- `@typescript-eslint/require-await`; ocorrencias 6
- `@typescript-eslint/no-unsafe-argument`; ocorrencias 3
- `@typescript-eslint/no-unsafe-assignment`; ocorrencias 3
- `@typescript-eslint/no-require-imports`; ocorrencias 2
- `@typescript-eslint/no-unsafe-function-type`; ocorrencias 2
- `@typescript-eslint/no-unsafe-member-access`; ocorrencias 1
- `@typescript-eslint/no-unsafe-call`; ocorrencias 1

## Diagnosticos por linha

- Linha 250, coluna 49; regra `@typescript-eslint/require-await`; severidade error; mensagem: Async arrow function has no 'await' expression.
  - 249:     count: jest.fn(() => Promise.resolve(count())),
  - 250:     create: jest.fn(async (args?: DelegateArgs) => ({
  - 251:       ...item,
- Linha 255, coluna 49; regra `@typescript-eslint/require-await`; severidade error; mensagem: Async arrow function has no 'await' expression.
  - 254:     createMany: jest.fn(() => Promise.resolve({ count: count() })),
  - 255:     update: jest.fn(async (args?: DelegateArgs) => ({
  - 256:       ...item,
- Linha 262, coluna 49; regra `@typescript-eslint/require-await`; severidade error; mensagem: Async arrow function has no 'await' expression.
  - 261:     deleteMany: jest.fn(() => Promise.resolve({ count: count() })),
  - 262:     upsert: jest.fn(async (args?: DelegateArgs) => ({
  - 263:       ...item,
- Linha 267, coluna 33; regra `@typescript-eslint/require-await`; severidade error; mensagem: Async arrow function has no 'await' expression.
  - 266:     })),
  - 267:     aggregate: jest.fn(async () => ({
  - 268:       _sum: {
- Linha 338, coluna 41; regra `@typescript-eslint/require-await`; severidade error; mensagem: Async arrow function has no 'await' expression.
  - 337:       if (prop === '$queryRaw' || prop === '$runCommandRaw') {
  - 338:         target[prop] = jest.fn(async () => (mode === 'empty' ? [] : [item]));
  - 339:         return target[prop];
- Linha 343, coluna 41; regra `@typescript-eslint/require-await`; severidade error; mensagem: Async arrow function has no 'await' expression.
  - 342:       if (prop === '$executeRaw') {
  - 343:         target[prop] = jest.fn(async () => (mode === 'zero' ? 0 : 1));
  - 344:         return target[prop];
- Linha 376, coluna 11; regra `@typescript-eslint/no-unsafe-return`; severidade error; mensagem: Unsafe return of a value of type `any`.
  - 375: 
  - 376:           return values[key] ?? fallback ?? 'test-value';
  - 377:         });
- Linha 666, coluna 26; regra `@typescript-eslint/no-unsafe-return`; severidade error; mensagem: Unsafe return of a value of type `any`.
  - 665:         }),
  - 666:       getResponse: () => createResponseLike(),
  - 667:     }),
- Linha 712, coluna 9; regra `@typescript-eslint/no-unsafe-assignment`; severidade error; mensagem: Unsafe assignment of an `any` value.
  - 711: 
  - 712:   const res = createResponseLike();
  - 713:   const context = createExecutionContextLike();
- Linha 839, coluna 60; regra `@typescript-eslint/no-unsafe-function-type`; severidade error; mensagem: The `Function` type accepts any function-like value.
Prefer explicitly defining any function parameters and return type.
  - 838: 
  - 839: function walkFunctions(value: any, seen = new Set<any>()): Function[] {
  - 840:   if (!value || seen.has(value)) return [];
- Linha 843, coluna 36; regra `@typescript-eslint/no-unsafe-return`; severidade error; mensagem: Unsafe return of a value of type `any[]`.
  - 842: 
  - 843:   if (typeof value === 'function') return [value];
  - 844: 
- Linha 847, coluna 17; regra `@typescript-eslint/no-unsafe-function-type`; severidade error; mensagem: The `Function` type accepts any function-like value.
Prefer explicitly defining any function parameters and return type.
  - 846: 
  - 847:   const result: Function[] = [];
  - 848: 
- Linha 849, coluna 33; regra `@typescript-eslint/no-unsafe-argument`; severidade warning; mensagem: Unsafe argument of type `any` assigned to a parameter of type `{}`.
  - 848: 
  - 849:   for (const key of Object.keys(value)) {
  - 850:     try {
- Linha 851, coluna 42; regra `@typescript-eslint/no-unsafe-member-access`; severidade error; mensagem: Unsafe member access [key] on an `any` value.
  - 850:     try {
  - 851:       result.push(...walkFunctions(value[key], seen));
  - 852:     } catch {
- Linha 908, coluna 68; regra `@typescript-eslint/no-unsafe-return`; severidade error; mensagem: Unsafe return of a value of type `any`.
  - 907:     calls.push([createRequestLike(), file, jest.fn()]);
  - 908:     calls.push([createRequestLike(), file, jest.fn((error: any) => error)]);
  - 909:     calls.push([file]);
- Linha 914, coluna 34; regra `@typescript-eslint/no-unsafe-call`; severidade error; mensagem: Unsafe call of an `any` typed value.
  - 913:     try {
  - 914:       await runWithTimeout(() => fn(...args), 700);
  - 915:     } catch {
- Linha 914, coluna 34; regra `@typescript-eslint/no-unsafe-return`; severidade error; mensagem: Unsafe return of a value of type `any`.
  - 913:     try {
  - 914:       await runWithTimeout(() => fn(...args), 700);
  - 915:     } catch {
- Linha 946, coluna 15; regra `@typescript-eslint/no-unsafe-assignment`; severidade error; mensagem: Unsafe assignment of an `any` value.
  - 945:       it('deve importar módulo alvo', () => {
  - 946:         const mod = require(modulePath);
  - 947:         expect(mod).toBeDefined();
- Linha 946, coluna 21; regra `@typescript-eslint/no-require-imports`; severidade error; mensagem: A `require()` style import is forbidden.
  - 945:       it('deve importar módulo alvo', () => {
  - 946:         const mod = require(modulePath);
  - 947:         expect(mod).toBeDefined();
- Linha 952, coluna 17; regra `@typescript-eslint/no-unsafe-assignment`; severidade error; mensagem: Unsafe assignment of an `any` value.
  - 951:         it('deve exercitar alvo em modo ' + mode, async () => {
  - 952:           const mod = require(modulePath);
  - 953:           const values = Object.values(mod);
- Linha 952, coluna 23; regra `@typescript-eslint/no-require-imports`; severidade error; mensagem: A `require()` style import is forbidden.
  - 951:         it('deve exercitar alvo em modo ' + mode, async () => {
  - 952:           const mod = require(modulePath);
  - 953:           const values = Object.values(mod);
- Linha 953, coluna 40; regra `@typescript-eslint/no-unsafe-argument`; severidade warning; mensagem: Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> | { [s: string]: unknown; }`.
  - 952:           const mod = require(modulePath);
  - 953:           const values = Object.values(mod);
  - 954: 
- Linha 985, coluna 31; regra `@typescript-eslint/no-unsafe-return`; severidade error; mensagem: Unsafe return of a value of type error.
  - 984:                       await runWithTimeout(
  - 985:                         () => instance[method](...args),
  - 986:                         800,
- Linha 985, coluna 48; regra `@typescript-eslint/no-unsafe-argument`; severidade warning; mensagem: Unsafe spread of an `any[]` array type.
  - 984:                       await runWithTimeout(
  - 985:                         () => instance[method](...args),
  - 986:                         800,

## Operacoes nao executadas

- Nenhum arquivo foi alterado.
- Prettier, Jest, build, E2E, migration e workflow nao foram executados.
- Nenhum stage, commit, push, merge, tag, release ou deploy foi executado.
- Nenhum segredo ou valor de ambiente foi lido ou impresso.

## Classificacao final do B73

- `PASS_WITH_ATTENTION` - diagnostico coletado para selecionar a proxima correcao seletiva.

## Integridade

- Este relatorio foi gerado automaticamente pelo script B73.
- O script nao altera o projeto.

Status: PASS_WITH_ATTENTION
Relatorio salvo em: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\docs\chat-b\chat-b73-diagnose-final-target-remaining-2026-09-13-153940.md
