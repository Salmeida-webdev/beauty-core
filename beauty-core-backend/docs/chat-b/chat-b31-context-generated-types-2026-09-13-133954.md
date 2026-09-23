# Beauty Core - Chat B - B31 - Diagnosticos de tipos dos testes gerados

- Inicio: 2026-09-13T13:39:54.8196938-03:00
- Fim: 2026-09-13T13:40:27.9633768-03:00
- Script: B31-v1
- Modo: somente leitura; o relatorio e o unico artefato criado.
- Pasta unica de relatorios do Chat B: `beauty-core-backend\docs\chat-b\`

## Objetivo

- Separar os 270 diagnosticos restantes por arquivo e regra.
- Registrar linhas afetadas para escolher correcoes tipadas e pequenas.
- Nao remover `async` sem verificar contrato, nao desabilitar regras e nao alterar arquivos.

## Resumo por arquivo

- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts`: total 93; erros 88; avisos 5
  - `@typescript-eslint/no-unsafe-return`: 31
  - `@typescript-eslint/require-await`: 28
  - `@typescript-eslint/no-unsafe-member-access`: 14
  - `@typescript-eslint/no-unsafe-assignment`: 7
  - `@typescript-eslint/no-unsafe-argument`: 5
  - `@typescript-eslint/no-unsafe-call`: 5
  - `@typescript-eslint/no-require-imports`: 2
  - `@typescript-eslint/no-unused-vars`: 1
- `test\unit\coverage-under-70-final-target.generated.spec.ts`: total 91; erros 87; avisos 4
  - `@typescript-eslint/no-unsafe-return`: 32
  - `@typescript-eslint/require-await`: 28
  - `@typescript-eslint/no-unsafe-member-access`: 11
  - `@typescript-eslint/no-unsafe-call`: 5
  - `@typescript-eslint/no-unsafe-argument`: 4
  - `@typescript-eslint/no-unsafe-assignment`: 4
  - `@typescript-eslint/no-unused-vars`: 3
  - `@typescript-eslint/no-require-imports`: 2
  - `@typescript-eslint/no-unsafe-function-type`: 2
- `test\unit\coverage-under-70-targeted.generated.spec.ts`: total 86; erros 81; avisos 5
  - `@typescript-eslint/no-unsafe-return`: 29
  - `@typescript-eslint/require-await`: 26
  - `@typescript-eslint/no-unsafe-member-access`: 13
  - `@typescript-eslint/no-unsafe-assignment`: 6
  - `@typescript-eslint/no-unsafe-argument`: 5
  - `@typescript-eslint/no-unsafe-call`: 5
  - `@typescript-eslint/no-require-imports`: 2

## Linhas de require-await

- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 190, coluna 34: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 194, coluna 41: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 199, coluna 33: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 203, coluna 40: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 208, coluna 32: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 212, coluna 29: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 216, coluna 40: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 220, coluna 34: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 224, coluna 40: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 228, coluna 34: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 232, coluna 30: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 236, coluna 34: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 240, coluna 40: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 244, coluna 33: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 271, coluna 31: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 315, coluna 38: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 320, coluna 38: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 325, coluna 38: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 367, coluna 38: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 374, coluna 38: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 393, coluna 38: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 432, coluna 38: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 573, coluna 38: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 574, coluna 27: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 575, coluna 36: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 576, coluna 39: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 641, coluna 18: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 644, coluna 18: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 223, coluna 34: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 224, coluna 41: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 229, coluna 33: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 230, coluna 40: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 235, coluna 32: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 236, coluna 29: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 237, coluna 40: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 238, coluna 34: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 239, coluna 40: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 240, coluna 34: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 241, coluna 30: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 242, coluna 34: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 243, coluna 40: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 248, coluna 33: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 270, coluna 31: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 312, coluna 41: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 317, coluna 41: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 322, coluna 41: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 366, coluna 41: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 373, coluna 41: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 393, coluna 41: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 433, coluna 41: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 598, coluna 38: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 599, coluna 27: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 600, coluna 36: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 601, coluna 39: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 738, coluna 25: Async arrow function 'ok' has no 'await' expression.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 739, coluna 27: Async arrow function 'fail' has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 114, coluna 34: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 115, coluna 41: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 116, coluna 33: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 117, coluna 40: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 118, coluna 32: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 119, coluna 29: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 120, coluna 40: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 124, coluna 34: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 125, coluna 40: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 129, coluna 34: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 130, coluna 30: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 131, coluna 34: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 132, coluna 40: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 137, coluna 33: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 144, coluna 31: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 183, coluna 38: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 188, coluna 38: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 193, coluna 38: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 226, coluna 38: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 235, coluna 38: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 271, coluna 38: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 395, coluna 38: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 396, coluna 27: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 397, coluna 36: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 398, coluna 39: Async arrow function has no 'await' expression.
- `test\unit\coverage-under-70-targeted.generated.spec.ts` linha 411, coluna 29: Async arrow function 'callback' has no 'await' expression.

## Primeiros diagnosticos de tipagem

- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 34, coluna 7; regra `@typescript-eslint/no-unsafe-assignment`; Unsafe assignment of an `any` value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 35, coluna 54; regra `@typescript-eslint/no-unsafe-member-access`; Unsafe member access .targets on an `any` value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 218, coluna 7; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 218, coluna 37; regra `@typescript-eslint/no-unsafe-member-access`; Unsafe member access .data on an `any` value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 226, coluna 7; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 226, coluna 37; regra `@typescript-eslint/no-unsafe-member-access`; Unsafe member access .data on an `any` value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 242, coluna 7; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 242, coluna 37; regra `@typescript-eslint/no-unsafe-member-access`; Unsafe member access .create on an `any` value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 242, coluna 62; regra `@typescript-eslint/no-unsafe-member-access`; Unsafe member access .update on an `any` value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 302, coluna 24; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 307, coluna 44; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 307, coluna 51; regra `@typescript-eslint/no-unsafe-call`; Unsafe call of an `any` typed value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 309, coluna 11; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 311, coluna 9; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 316, coluna 9; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 321, coluna 9; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 326, coluna 9; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 355, coluna 11; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 358, coluna 9; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 363, coluna 9; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 370, coluna 9; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 384, coluna 9; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 394, coluna 9; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 438, coluna 9; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 443, coluna 9; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 455, coluna 9; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 463, coluna 9; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 470, coluna 7; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 474, coluna 3; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 478, coluna 18; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 514, coluna 7; regra `@typescript-eslint/no-unsafe-assignment`; Unsafe assignment of an `any` value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 514, coluna 16; regra `@typescript-eslint/no-unsafe-member-access`; Unsafe member access [name] on an `any` value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 521, coluna 14; regra `@typescript-eslint/no-unsafe-member-access`; Unsafe member access .logger on an `any` value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 532, coluna 3; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 536, coluna 46; regra `@typescript-eslint/no-unsafe-argument`; Unsafe argument of type `any` assigned to a parameter of type `number`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 536, coluna 55; regra `@typescript-eslint/no-unsafe-member-access`; Unsafe member access .length on an `any` value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 537, coluna 5; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 541, coluna 5; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 541, coluna 26; regra `@typescript-eslint/no-unsafe-call`; Unsafe construction of an `any` typed value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 544, coluna 7; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 544, coluna 28; regra `@typescript-eslint/no-unsafe-call`; Unsafe construction of an `any` typed value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 556, coluna 39; regra `@typescript-eslint/no-unsafe-member-access`; Unsafe member access [name] on an `any` value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 580, coluna 25; regra `@typescript-eslint/no-unsafe-assignment`; Unsafe assignment of an `any` value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 593, coluna 26; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 633, coluna 9; regra `@typescript-eslint/no-unsafe-assignment`; Unsafe assignment of an `any` value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 787, coluna 68; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 792, coluna 34; regra `@typescript-eslint/no-unsafe-call`; Unsafe call of an `any` typed value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 792, coluna 34; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 802, coluna 20; regra `@typescript-eslint/no-unsafe-member-access`; Unsafe member access .length on an `any` value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 820, coluna 14; regra `@typescript-eslint/no-unsafe-argument`; Unsafe argument of type `any` assigned to a parameter of type `string | number | Function | FunctionLike`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 820, coluna 21; regra `@typescript-eslint/no-unsafe-member-access`; Unsafe member access .relativePath on an `any` value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 822, coluna 15; regra `@typescript-eslint/no-unsafe-assignment`; Unsafe assignment of an `any` value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 822, coluna 29; regra `@typescript-eslint/no-unsafe-argument`; Unsafe argument of type `any` assigned to a parameter of type `string`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 822, coluna 36; regra `@typescript-eslint/no-unsafe-member-access`; Unsafe member access .requirePath on an `any` value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 828, coluna 17; regra `@typescript-eslint/no-unsafe-assignment`; Unsafe assignment of an `any` value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 828, coluna 31; regra `@typescript-eslint/no-unsafe-argument`; Unsafe argument of type `any` assigned to a parameter of type `string`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 828, coluna 38; regra `@typescript-eslint/no-unsafe-member-access`; Unsafe member access .requirePath on an `any` value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 829, coluna 48; regra `@typescript-eslint/no-unsafe-argument`; Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> | { [s: string]: unknown; }`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 845, coluna 21; regra `@typescript-eslint/no-unsafe-assignment`; Unsafe assignment of an `any` value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 863, coluna 48; regra `@typescript-eslint/no-unsafe-call`; Unsafe call of an `any` typed value.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 863, coluna 48; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts` linha 863, coluna 57; regra `@typescript-eslint/no-unsafe-member-access`; Unsafe member access [method] on an `any` value.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 237, coluna 44; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 237, coluna 65; regra `@typescript-eslint/no-unsafe-member-access`; Unsafe member access .data on an `any` value.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 239, coluna 44; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 239, coluna 65; regra `@typescript-eslint/no-unsafe-member-access`; Unsafe member access .data on an `any` value.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 243, coluna 44; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 245, coluna 17; regra `@typescript-eslint/no-unsafe-member-access`; Unsafe member access .create on an `any` value.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 246, coluna 17; regra `@typescript-eslint/no-unsafe-member-access`; Unsafe member access .update on an `any` value.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 299, coluna 27; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 304, coluna 44; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 304, coluna 51; regra `@typescript-eslint/no-unsafe-call`; Unsafe call of an `any` typed value.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 306, coluna 11; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 308, coluna 9; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 313, coluna 9; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 318, coluna 9; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 323, coluna 9; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 355, coluna 11; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 357, coluna 9; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- `test\unit\coverage-under-70-final-target.generated.spec.ts` linha 362, coluna 9; regra `@typescript-eslint/no-unsafe-return`; Unsafe return of a value of type `any`.
- ... 98 diagnosticos de tipagem adicionais nao listados.

## Operacoes nao executadas

- Nenhum arquivo foi alterado.
- Nenhum teste, build, E2E, migration ou workflow foi executado.
- Nenhum stage, commit, push, merge, tag, release ou deploy foi executado.
- Nenhum segredo ou valor de ambiente foi lido ou impresso.

## Classificacao final do B31

- `PASS_WITH_ATTENTION` - diagnosticos separados por arquivo e regra; proxima alteracao deve ser seletiva.

## Integridade

- Este relatorio foi gerado automaticamente pelo script B31.
- O script nao altera o projeto.