# Chat 03 - Bloco 04AF - Lint final dos services criticos

- Arquivo analisado: `test/unit/services-critical.coverage.spec.ts`
- Erros: 9
- Warnings: 0
- Exit code bruto: 1

## Regras

- `@typescript-eslint/no-unsafe-assignment`: 3
- `@typescript-eslint/no-unsafe-call`: 2
- `@typescript-eslint/no-unsafe-return`: 2
- `@typescript-eslint/require-await`: 1
- `@typescript-eslint/no-unnecessary-type-assertion`: 1

## Mensagens exatas

- line 22:9 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an error typed value.
- line 25:9 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an error typed value.
- line 55:7 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type error.
- line 55:14 [error] (@typescript-eslint/no-unsafe-call) Unsafe call of a type that could not be resolved.
- line 64:7 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type error.
- line 64:14 [error] (@typescript-eslint/no-unsafe-call) Unsafe call of a type that could not be resolved.
- line 283:13 [error] (@typescript-eslint/no-unnecessary-type-assertion) This assertion is unnecessary since the receiver accepts the original type of the expression.
- line 409:9 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an ''any'' value.
- line 548:86 [error] (@typescript-eslint/require-await) Async arrow function has no 'await' expression.

Nenhum codigo, migration, container, processo ou dado foi alterado por este diagnostico.