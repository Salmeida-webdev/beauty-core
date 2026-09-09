# Chat 03 - Bloco 04AC - Lint residual dos services criticos

- Arquivo analisado: `test/unit/services-critical.coverage.spec.ts`
- Erros: 36
- Warnings: 1
- Exit code bruto: 1

## Regras

- `@typescript-eslint/no-unsafe-return`: 13
- `@typescript-eslint/no-unsafe-assignment`: 10
- `@typescript-eslint/no-unsafe-member-access`: 6
- `@typescript-eslint/no-unsafe-call`: 5
- `@typescript-eslint/await-thenable`: 1
- `@typescript-eslint/no-unsafe-argument`: 1
- `@typescript-eslint/no-redundant-type-constituents`: 1

## Mensagens exatas

- line 22:9 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an error typed value.
- line 25:9 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an error typed value.
- line 55:7 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type error.
- line 55:14 [error] (@typescript-eslint/no-unsafe-call) Unsafe call of a type that could not be resolved.
- line 64:7 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type error.
- line 64:14 [error] (@typescript-eslint/no-unsafe-call) Unsafe call of a type that could not be resolved.
- line 264:15 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type ''any''.
- line 264:22 [error] (@typescript-eslint/no-unsafe-call) Unsafe call of an ''any'' typed value.
- line 271:13 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type ''any''.
- line 285:9 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type ''any''.
- line 290:3 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type ''any''.
- line 309:7 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type ''any''.
- line 351:3 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type ''any''.
- line 356:9 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type ''any''.
- line 356:23 [error] (@typescript-eslint/no-unsafe-member-access) Unsafe member access [prop] on an ''any'' value.
- line 360:14 [error] (@typescript-eslint/no-unsafe-member-access) Unsafe member access [prop] on an ''any'' value.
- line 366:51 [error] (@typescript-eslint/no-redundant-type-constituents) 'any' overrides all other types in this union type.
- line 376:22 [error] (@typescript-eslint/no-unsafe-member-access) Unsafe member access .name on an ''any'' value.
- line 391:9 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an ''any'' value.
- line 392:9 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an ''any'' value.
- line 394:36 [warning] (@typescript-eslint/no-unsafe-argument) Unsafe argument of type ''any'' assigned to a parameter of type ''number''.
- line 394:49 [error] (@typescript-eslint/no-unsafe-member-access) Unsafe member access .length on an ''any'' value.
- line 396:5 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type ''any''.
- line 399:3 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type ''any''.
- line 399:10 [error] (@typescript-eslint/no-unsafe-call) Unsafe construction of an ''any'' typed value.
- line 405:39 [error] (@typescript-eslint/no-unsafe-member-access) Unsafe member access [name] on an ''any'' value.
- line 498:3 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type ''Promise<any>''.
- line 508:15 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an ''any'' value.
- line 512:15 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an ''any'' value.
- line 518:15 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an ''any'' value.
- line 519:15 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an ''any'' value.
- line 526:15 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an ''any'' value.
- line 527:15 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an ''any'' value.
- line 535:13 [error] (@typescript-eslint/await-thenable) Unexpected ''await'' of a non-Promise (non-"Thenable") value.
- line 537:44 [error] (@typescript-eslint/no-unsafe-call) Unsafe call of an ''any'' typed value.
- line 537:44 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type ''any''.
- line 537:53 [error] (@typescript-eslint/no-unsafe-member-access) Unsafe member access [method] on an ''any'' value.

Nenhum codigo, migration, container, processo ou dado foi alterado por este diagnostico.