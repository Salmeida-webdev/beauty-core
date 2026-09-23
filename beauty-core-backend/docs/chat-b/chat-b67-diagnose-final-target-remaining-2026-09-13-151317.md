# Beauty Core - Chat B - B67 - Diagnostico lint restante final-target

- Inicio: 2026-09-13T15:13:17.1210278-03:00
- Fim: 2026-09-13T15:13:26.2711926-03:00
- Script: B67-v1
- Modo: somente leitura; o relatorio e o unico artefato criado.
- Pasta unica de relatorios do Chat B: `beauty-core-backend\docs\chat-b\`

## Objetivo

- Capturar os 25 diagnosticos restantes depois do B66.
- Separar callbacks `require-await` dos pontos dinamicos e de carregamento de modulo.
- Nao alterar o final-target nem executar testes, build ou workflow.

## Diagnosticos do ESLint

- Arquivo analisado: `test\unit\coverage-under-70-final-target.generated.spec.ts`
- Comando: ESLint direto com formato JSON, somente no final-target.
- ESLint exit code: 1
- Diagnosticos encontrados: 25
- Erros: 22
- Avisos: 3

### Regras encontradas

- `@typescript-eslint/require-await`; ocorrencias 7
- `@typescript-eslint/no-unsafe-return`; ocorrencias 6
- `@typescript-eslint/no-unsafe-assignment`; ocorrencias 3
- `@typescript-eslint/no-unsafe-argument`; ocorrencias 3
- `@typescript-eslint/no-unsafe-function-type`; ocorrencias 2
- `@typescript-eslint/no-require-imports`; ocorrencias 2
- `@typescript-eslint/no-unsafe-member-access`; ocorrencias 1
- `@typescript-eslint/no-unsafe-call`; ocorrencias 1

### Diagnosticos detalhados e contexto

- Linha 250, coluna 49; regra `@typescript-eslint/require-await`; severidade 2; mensagem: Async arrow function has no 'await' expression.
  - Contexto 248-252:
    - 248:     findMany: jest.fn(() => Promise.resolve(many())),
    - 249:     count: jest.fn(() => Promise.resolve(count())),
    - 250:     create: jest.fn(async (args?: DelegateArgs) => ({
    - 251:       ...item,
    - 252:       ...(args?.data ?? {}),
- Linha 255, coluna 49; regra `@typescript-eslint/require-await`; severidade 2; mensagem: Async arrow function has no 'await' expression.
  - Contexto 253-257:
    - 253:     })),
    - 254:     createMany: jest.fn(() => Promise.resolve({ count: count() })),
    - 255:     update: jest.fn(async (args?: DelegateArgs) => ({
    - 256:       ...item,
    - 257:       ...(args?.data ?? {}),
- Linha 262, coluna 49; regra `@typescript-eslint/require-await`; severidade 2; mensagem: Async arrow function has no 'await' expression.
  - Contexto 260-264:
    - 260:     delete: jest.fn(() => Promise.resolve(item)),
    - 261:     deleteMany: jest.fn(() => Promise.resolve({ count: count() })),
    - 262:     upsert: jest.fn(async (args?: DelegateArgs) => ({
    - 263:       ...item,
    - 264:       ...(args?.create ?? {}),
- Linha 267, coluna 33; regra `@typescript-eslint/require-await`; severidade 2; mensagem: Async arrow function has no 'await' expression.
  - Contexto 265-269:
    - 265:       ...(args?.update ?? {}),
    - 266:     })),
    - 267:     aggregate: jest.fn(async () => ({
    - 268:       _sum: {
    - 269:         valor: mode === 'empty' ? null : item.valor,
- Linha 338, coluna 41; regra `@typescript-eslint/require-await`; severidade 2; mensagem: Async arrow function has no 'await' expression.
  - Contexto 336-340:
    - 336: 
    - 337:       if (prop === '$queryRaw' || prop === '$runCommandRaw') {
    - 338:         target[prop] = jest.fn(async () => (mode === 'empty' ? [] : [item]));
    - 339:         return target[prop];
    - 340:       }
- Linha 343, coluna 41; regra `@typescript-eslint/require-await`; severidade 2; mensagem: Async arrow function has no 'await' expression.
  - Contexto 341-345:
    - 341: 
    - 342:       if (prop === '$executeRaw') {
    - 343:         target[prop] = jest.fn(async () => (mode === 'zero' ? 0 : 1));
    - 344:         return target[prop];
    - 345:       }
- Linha 376, coluna 11; regra `@typescript-eslint/no-unsafe-return`; severidade 2; mensagem: Unsafe return of a value of type `any`.
  - Contexto 374-378:
    - 374:           };
    - 375: 
    - 376:           return values[key] ?? fallback ?? 'test-value';
    - 377:         });
    - 378:         return target[prop];
- Linha 387, coluna 41; regra `@typescript-eslint/require-await`; severidade 2; mensagem: Async arrow function has no 'await' expression.
  - Contexto 385-389:
    - 385: 
    - 386:       if (prop === 'signAsync') {
    - 387:         target[prop] = jest.fn(async () =>
    - 388:           mode === 'invalid' ? '' : '[sensitive data omitted]
    - 389:         );
- Linha 666, coluna 26; regra `@typescript-eslint/no-unsafe-return`; severidade 2; mensagem: Unsafe return of a value of type `any`.
  - Contexto 664-668:
    - 664:                 },
    - 665:         }),
    - 666:       getResponse: () => createResponseLike(),
    - 667:     }),
    - 668:   };
- Linha 712, coluna 9; regra `@typescript-eslint/no-unsafe-assignment`; severidade 2; mensagem: Unsafe assignment of an `any` value.
  - Contexto 710-714:
    - 710:   });
    - 711: 
    - 712:   const res = createResponseLike();
    - 713:   const context = createExecutionContextLike();
    - 714: 
- Linha 839, coluna 60; regra `@typescript-eslint/no-unsafe-function-type`; severidade 2; mensagem: The `Function` type accepts any function-like value.
Prefer explicitly defining any function parameters and return type.
  - Contexto 837-841:
    - 837: }
    - 838: 
    - 839: function walkFunctions(value: any, seen = new Set<any>()): Function[] {
    - 840:   if (!value || seen.has(value)) return [];
    - 841:   seen.add(value);
- Linha 843, coluna 36; regra `@typescript-eslint/no-unsafe-return`; severidade 2; mensagem: Unsafe return of a value of type `any[]`.
  - Contexto 841-845:
    - 841:   seen.add(value);
    - 842: 
    - 843:   if (typeof value === 'function') return [value];
    - 844: 
    - 845:   if (typeof value !== 'object') return [];
- Linha 847, coluna 17; regra `@typescript-eslint/no-unsafe-function-type`; severidade 2; mensagem: The `Function` type accepts any function-like value.
Prefer explicitly defining any function parameters and return type.
  - Contexto 845-849:
    - 845:   if (typeof value !== 'object') return [];
    - 846: 
    - 847:   const result: Function[] = [];
    - 848: 
    - 849:   for (const key of Object.keys(value)) {
- Linha 849, coluna 33; regra `@typescript-eslint/no-unsafe-argument`; severidade 1; mensagem: Unsafe argument of type `any` assigned to a parameter of type `{}`.
  - Contexto 847-851:
    - 847:   const result: Function[] = [];
    - 848: 
    - 849:   for (const key of Object.keys(value)) {
    - 850:     try {
    - 851:       result.push(...walkFunctions(value[key], seen));
- Linha 851, coluna 42; regra `@typescript-eslint/no-unsafe-member-access`; severidade 2; mensagem: Unsafe member access [key] on an `any` value.
  - Contexto 849-853:
    - 849:   for (const key of Object.keys(value)) {
    - 850:     try {
    - 851:       result.push(...walkFunctions(value[key], seen));
    - 852:     } catch {
    - 853:       /* Intentionally ignore expected probe failures. */
- Linha 908, coluna 68; regra `@typescript-eslint/no-unsafe-return`; severidade 2; mensagem: Unsafe return of a value of type `any`.
  - Contexto 906-910:
    - 906:   for (const file of files) {
    - 907:     calls.push([createRequestLike(), file, jest.fn()]);
    - 908:     calls.push([createRequestLike(), file, jest.fn((error: any) => error)]);
    - 909:     calls.push([file]);
    - 910:   }
- Linha 914, coluna 34; regra `@typescript-eslint/no-unsafe-call`; severidade 2; mensagem: Unsafe call of an `any` typed value.
  - Contexto 912-916:
    - 912:   for (const args of calls) {
    - 913:     try {
    - 914:       await runWithTimeout(() => fn(...args), 700);
    - 915:     } catch {
    - 916:       /* Intentionally ignore expected probe failures. */
- Linha 914, coluna 34; regra `@typescript-eslint/no-unsafe-return`; severidade 2; mensagem: Unsafe return of a value of type `any`.
  - Contexto 912-916:
    - 912:   for (const args of calls) {
    - 913:     try {
    - 914:       await runWithTimeout(() => fn(...args), 700);
    - 915:     } catch {
    - 916:       /* Intentionally ignore expected probe failures. */
- Linha 946, coluna 15; regra `@typescript-eslint/no-unsafe-assignment`; severidade 2; mensagem: Unsafe assignment of an `any` value.
  - Contexto 944-948:
    - 944:     describe(modulePath, () => {
    - 945:       it('deve importar módulo alvo', () => {
    - 946:         const mod = require(modulePath);
    - 947:         expect(mod).toBeDefined();
    - 948:       });
- Linha 946, coluna 21; regra `@typescript-eslint/no-require-imports`; severidade 2; mensagem: A `require()` style import is forbidden.
  - Contexto 944-948:
    - 944:     describe(modulePath, () => {
    - 945:       it('deve importar módulo alvo', () => {
    - 946:         const mod = require(modulePath);
    - 947:         expect(mod).toBeDefined();
    - 948:       });
- Linha 952, coluna 17; regra `@typescript-eslint/no-unsafe-assignment`; severidade 2; mensagem: Unsafe assignment of an `any` value.
  - Contexto 950-954:
    - 950:       for (const mode of modes) {
    - 951:         it('deve exercitar alvo em modo ' + mode, async () => {
    - 952:           const mod = require(modulePath);
    - 953:           const values = Object.values(mod);
    - 954: 
- Linha 952, coluna 23; regra `@typescript-eslint/no-require-imports`; severidade 2; mensagem: A `require()` style import is forbidden.
  - Contexto 950-954:
    - 950:       for (const mode of modes) {
    - 951:         it('deve exercitar alvo em modo ' + mode, async () => {
    - 952:           const mod = require(modulePath);
    - 953:           const values = Object.values(mod);
    - 954: 
- Linha 953, coluna 40; regra `@typescript-eslint/no-unsafe-argument`; severidade 1; mensagem: Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> | { [s: string]: unknown; }`.
  - Contexto 951-955:
    - 951:         it('deve exercitar alvo em modo ' + mode, async () => {
    - 952:           const mod = require(modulePath);
    - 953:           const values = Object.values(mod);
    - 954: 
    - 955:           for (const exported of values) {
- Linha 985, coluna 31; regra `@typescript-eslint/no-unsafe-return`; severidade 2; mensagem: Unsafe return of a value of type error.
  - Contexto 983-987:
    - 983:                     try {
    - 984:                       await runWithTimeout(
    - 985:                         () => instance[method](...args),
    - 986:                         800,
    - 987:                       );
- Linha 985, coluna 48; regra `@typescript-eslint/no-unsafe-argument`; severidade 1; mensagem: Unsafe spread of an `any[]` array type.
  - Contexto 983-987:
    - 983:                     try {
    - 984:                       await runWithTimeout(
    - 985:                         () => instance[method](...args),
    - 986:                         800,
    - 987:                       );

## Operacoes nao executadas

- Nenhum arquivo foi alterado.
- Nenhum teste, build, E2E, migration ou workflow foi executado.
- Nenhum stage, commit, push, merge, tag, release ou deploy foi executado.
- Nenhum segredo ou valor de ambiente foi lido ou impresso.

## Classificacao final do B67

- `PASS_WITH_ATTENTION` - diagnosticos restantes registrados para correcao seletiva.

## Integridade

- Este relatorio foi gerado automaticamente pelo script B67.
- O script nao altera o projeto.

Status: PASS_WITH_ATTENTION
Relatorio salvo em: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\docs\chat-b\chat-b67-diagnose-final-target-remaining-2026-09-13-151317.md