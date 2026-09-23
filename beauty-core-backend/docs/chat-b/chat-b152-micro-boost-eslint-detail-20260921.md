# ESLint diagnosis - micro-boost.coverage.spec.ts

- Date: 2026-09-21
- Reference: `docs/chat-b/chat-b151-backend-active-tests-eslint-inventory-20260921.md` (21 errors, 3 warnings).
- Command: `node --max-old-space-size=4096 node_modules/eslint/bin/eslint.js test/unit/micro-boost.coverage.spec.ts --format json --no-cache`. Exactly this file was processed; JSON output was validated.
- Result: ESLint exit code 1; 21 errors, 3 warnings; no fatal errors; zero automatically fixable diagnostics. `no-empty` includes suggestions to add comments.
- The entire spec was read before analysis. No code file was changed and `--fix` was not used.

## Counts by rule

| Rule | Errors | Warnings |
|---|---:|---:|
| `@typescript-eslint/no-unsafe-assignment` | 5 | 0 |
| `@typescript-eslint/no-require-imports` | 3 | 0 |
| `@typescript-eslint/no-unsafe-argument` | 0 | 3 |
| `@typescript-eslint/no-unsafe-call` | 6 | 0 |
| `no-empty` | 4 | 0 |
| `@typescript-eslint/no-unsafe-member-access` | 3 | 0 |

## All diagnostics with source context

### 1. error - line 14, column 13

- Rule: `@typescript-eslint/no-unsafe-assignment`
- Message: Unsafe assignment of an `any` value.
- Context (diagnostic line marked with `>`):

```text
   13:     try {
>  14:       const mod = require('../../src/config/swagger.config');
   15: 
```

### 2. error - line 14, column 19

- Rule: `@typescript-eslint/no-require-imports`
- Message: A `require()` style import is forbidden.
- Context (diagnostic line marked with `>`):

```text
   13:     try {
>  14:       const mod = require('../../src/config/swagger.config');
   15: 
```

### 3. warning - line 16, column 41

- Rule: `@typescript-eslint/no-unsafe-argument`
- Message: Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`.
- Context (diagnostic line marked with `>`):

```text
   15: 
>  16:       for (const value of Object.values(mod)) {
   17:         if (typeof value === 'function') {
```

### 4. error - line 19, column 40

- Rule: `@typescript-eslint/no-unsafe-call`
- Message: Unsafe call of a `Function` typed value.
- Context (diagnostic line marked with `>`):

```text
   18:           try {
>  19:             await runWithTimeout(() => value());
   20:           } catch {}
```

### 5. error - line 20, column 19

- Rule: `no-empty`
- Message: Empty block statement.
- Context (diagnostic line marked with `>`):

```text
   19:             await runWithTimeout(() => value());
>  20:           } catch {}
   21:         }
```

### 6. error - line 32, column 13

- Rule: `@typescript-eslint/no-unsafe-assignment`
- Message: Unsafe assignment of an `any` value.
- Context (diagnostic line marked with `>`):

```text
   31:     try {
>  32:       const mod = require('../../src/common/filters/http-exception.filter');
   33:       const FilterClass =
```

### 7. error - line 32, column 19

- Rule: `@typescript-eslint/no-require-imports`
- Message: A `require()` style import is forbidden.
- Context (diagnostic line marked with `>`):

```text
   31:     try {
>  32:       const mod = require('../../src/common/filters/http-exception.filter');
   33:       const FilterClass =
```

### 8. error - line 33, column 13

- Rule: `@typescript-eslint/no-unsafe-assignment`
- Message: Unsafe assignment of an `any` value.
- Context (diagnostic line marked with `>`):

```text
   32:       const mod = require('../../src/common/filters/http-exception.filter');
>  33:       const FilterClass =
   34:         mod.HttpExceptionFilter ??
   35:         Object.values(mod).find((value: any) => typeof value === 'function');
   36: 
```

### 9. error - line 34, column 13

- Rule: `@typescript-eslint/no-unsafe-member-access`
- Message: Unsafe member access .HttpExceptionFilter on an `any` value.
- Context (diagnostic line marked with `>`):

```text
   33:       const FilterClass =
>  34:         mod.HttpExceptionFilter ??
   35:         Object.values(mod).find((value: any) => typeof value === 'function');
```

### 10. warning - line 35, column 23

- Rule: `@typescript-eslint/no-unsafe-argument`
- Message: Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`.
- Context (diagnostic line marked with `>`):

```text
   34:         mod.HttpExceptionFilter ??
>  35:         Object.values(mod).find((value: any) => typeof value === 'function');
   36: 
```

### 11. error - line 38, column 15

- Rule: `@typescript-eslint/no-unsafe-assignment`
- Message: Unsafe assignment of an `any` value.
- Context (diagnostic line marked with `>`):

```text
   37:       if (typeof FilterClass === 'function') {
>  38:         const instance: any = new FilterClass();
   39: 
```

### 12. error - line 38, column 31

- Rule: `@typescript-eslint/no-unsafe-call`
- Message: Unsafe construction of an `any` typed value.
- Context (diagnostic line marked with `>`):

```text
   37:       if (typeof FilterClass === 'function') {
>  38:         const instance: any = new FilterClass();
   39: 
```

### 13. error - line 40, column 29

- Rule: `@typescript-eslint/no-unsafe-member-access`
- Message: Unsafe member access .catch on an `any` value.
- Context (diagnostic line marked with `>`):

```text
   39: 
>  40:         if (typeof instance.catch === 'function') {
   41:           const host = {
```

### 14. error - line 54, column 13

- Rule: `@typescript-eslint/no-unsafe-call`
- Message: Unsafe call of an `any` typed value.
- Context (diagnostic line marked with `>`):

```text
   53:           await runWithTimeout(() =>
>  54:             instance.catch(new Error('Erro controlado'), host),
   55:           );
```

### 15. error - line 54, column 22

- Rule: `@typescript-eslint/no-unsafe-member-access`
- Message: Unsafe member access .catch on an `any` value.
- Context (diagnostic line marked with `>`):

```text
   53:           await runWithTimeout(() =>
>  54:             instance.catch(new Error('Erro controlado'), host),
   55:           );
```

### 16. error - line 77, column 15

- Rule: `@typescript-eslint/no-unsafe-assignment`
- Message: Unsafe assignment of an `any` value.
- Context (diagnostic line marked with `>`):

```text
   76:       try {
>  77:         const mod = require(modulePath);
   78: 
```

### 17. error - line 77, column 21

- Rule: `@typescript-eslint/no-require-imports`
- Message: A `require()` style import is forbidden.
- Context (diagnostic line marked with `>`):

```text
   76:       try {
>  77:         const mod = require(modulePath);
   78: 
```

### 18. warning - line 79, column 43

- Rule: `@typescript-eslint/no-unsafe-argument`
- Message: Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`.
- Context (diagnostic line marked with `>`):

```text
   78: 
>  79:         for (const value of Object.values(mod)) {
   80:           if (typeof value === 'function') {
```

### 19. error - line 83, column 17

- Rule: `@typescript-eslint/no-unsafe-call`
- Message: Unsafe call of a `Function` typed value.
- Context (diagnostic line marked with `>`):

```text
   82:               await runWithTimeout(() =>
>  83:                 value(createRequestLike(), 'ADMIN', 'GERENTE'),
   84:               );
```

### 20. error - line 85, column 21

- Rule: `no-empty`
- Message: Empty block statement.
- Context (diagnostic line marked with `>`):

```text
   84:               );
>  85:             } catch {}
   86: 
```

### 21. error - line 88, column 42

- Rule: `@typescript-eslint/no-unsafe-call`
- Message: Unsafe call of a `Function` typed value.
- Context (diagnostic line marked with `>`):

```text
   87:             try {
>  88:               await runWithTimeout(() => value('ADMIN'));
   89:             } catch {}
```

### 22. error - line 89, column 21

- Rule: `no-empty`
- Message: Empty block statement.
- Context (diagnostic line marked with `>`):

```text
   88:               await runWithTimeout(() => value('ADMIN'));
>  89:             } catch {}
   90: 
```

### 23. error - line 92, column 42

- Rule: `@typescript-eslint/no-unsafe-call`
- Message: Unsafe call of a `Function` typed value.
- Context (diagnostic line marked with `>`):

```text
   91:             try {
>  92:               await runWithTimeout(() => value(1000));
   93:             } catch {}
```

### 24. error - line 93, column 21

- Rule: `no-empty`
- Message: Empty block statement.
- Context (diagnostic line marked with `>`):

```text
   92:               await runWithTimeout(() => value(1000));
>  93:             } catch {}
   94:           }
```

## Diagnostic source classification

| Lines | Source | Analysis |
|---|---|---|
| 14-19 | Dynamic import and dynamic function calls | `require()` yields `any`, which propagates through `Object.values`. Checking `typeof value === 'function'` does not make a value typed as `Function` safely callable. The real Swagger export is the known zero-argument `createSwaggerConfig()` function. |
| 32-40 | Dynamic import, class, and filter | The module remains `any`; `Object.values(mod).find((value: any)...)` explicitly introduces `any`; the instance and `.catch` have no class contract. Real `HttpExceptionFilter.catch` expects `(exception: unknown, host: ArgumentsHost)` and an Express response with `getHeader`, `setHeader`, `status`, and `json`. |
| 35, 44-49 | HTTP mock typing and contract | The dynamically located value is not narrowed to a typed class. `createRequestLike` and `createResponseLike` are generic helper mocks. The response helper has no `getHeader`, which the filter calls, and the literal host is not declared as `ArgumentsHost`. |
| 54 | Dynamic filter invocation | `instance.catch` is accessed and called as `any`; the instance came from a dynamically discovered class and has no `HttpExceptionFilter` type. |
| 77-93 | Dynamic imports, calls, and empty catches | `require(modulePath)` returns `any`; `Object.values` receives that `any` (warning at line 79), and arbitrary export functions are called with three unrelated argument sets (lines 83, 88, 92). Empty catches suppress invocation errors; the outer catch converts import or execution failures into tautological assertions. |

## Existing tests and real contracts checked

- `src/config/swagger.config.ts` exports `createSwaggerConfig(): Document`; this file has no other known executable export to enumerate.
- `src/common/filters/http-exception.filter.ts` exports `HttpExceptionFilter`, implementing Nest `ExceptionFilter`. It gets an Express `Response` and `Request` from `ArgumentsHost`, reads response headers, then writes status and JSON. The current response helper has `status/json/setHeader`, but lacks `getHeader`; the test catches and ignores this failure, so it does not establish that the filter handled the exception.
- `test/unit/utils.coverage.spec.ts` already covers `durationToSeconds`, `durationToDate`, `getPaginationParams`, `buildPaginatedResponse`, `getEmpresaId`, `getRequestIp`, and `parseUserAgent`. Those tests themselves use `require`/unsafe casts, but they do make some behavior-specific calls. In this spec, `mapRole(role: string)`, `getEmpresaId(req)`, `getRequestIp(req: Request)`, `parseUserAgent(userAgent?)`, pagination helpers, and duration helpers have distinct signatures that the generic argument sets do not honor. Valid duration strings include forms such as `60s` or `1m`.
- `Roles(...roles: string[])` returns a metadata decorator. Calling it with a request and extra roles does not test authorization behavior or assert metadata.
- `createExecutionContextLike()` supplies only basic structural methods (`switchToHttp`, `getHandler`, `getClass`). The final test checks only that their results are defined; it does not validate a complete Nest interface contract.
- There are no Prisma delegates, dynamic function declarations, or Supertest responses involved. The relevant HTTP contract is the hand-built Nest `ArgumentsHost` and Express response mock used by the filter test.

## Lint issues versus semantic risks

- **Lint findings are real:** the active rule forbids `require()`, and the resulting `any` types trigger unsafe assignments, member access, and arguments. Calls through values typed `Function` are not signature-checked. The four empty catch blocks trigger `no-empty`. These are not merely mock typing false positives.
- **Independent semantic risks:** `catch { expect(true).toBe(true) }` lets import, construction, or invocation fail and still pass. Inner empty catches suppress call failures. `expect(mod).toBeDefined()` after loading a module is weak evidence. The filter response mock is incompatible with the actual contract and no status/body assertions are made. Arbitrary inputs are not aligned to the exports, so the named behavior may never be exercised.
- The ExecutionContext check is only a limited structural smoke check; defined return values do not prove that the mock satisfies the full Nest interfaces.

## Minimal safe correction for the next block

1. Replace known `require()` calls with static imports of the actual exports (`createSwaggerConfig`, `HttpExceptionFilter`, `Roles`, `mapRole`, and the selected utilities), eliminating `any` and generic export enumeration.
2. Call each selected function with inputs matching its signature and assert concrete return values or effects. For the filter, provide a typed `ArgumentsHost`/response double satisfying the methods used and assert status/body.
3. Keep exception handling only where an exception is expected and assert that exception; remove catches that suppress the behavior under test. This addresses lint while keeping the test meaningful.

The next correction should remain limited to `test/unit/micro-boost.coverage.spec.ts`. This report is diagnostic only; no code correction was made.
