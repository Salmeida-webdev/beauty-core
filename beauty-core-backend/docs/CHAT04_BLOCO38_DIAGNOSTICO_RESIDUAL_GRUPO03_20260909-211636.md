# Chat 04 - Bloco 38 - Diagnostico Residual Grupo 03

Data: 2026-09-09 21:16:36 -03:00
- Projeto: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core
- Branch: main
- HEAD: 219dd066492ea23eadab10cb089957dd521cb816
- origin/main: 219dd066492ea23eadab10cb089957dd521cb816
- Status antes/depois: 317/317
- Staged antes/depois: 0/0

## ESLint residual

### src/queues/services/dead-letter-queue.service.ts - exit 1
```text

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\queues\services\dead-letter-queue.service.ts
  91:5  error  Unsafe return of type `Queue<any, any, string, any, any, string>` from function with return type `Queue<JobData, any, string, JobData, any, string>`  @typescript-eslint/no-unsafe-return

Ô£û 1 problem (1 error, 0 warnings)



```

### src/queues/services/queues.service.ts - exit 1
```text

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\queues\services\queues.service.ts
  160:5  error  Unsafe return of a value of type `any`  @typescript-eslint/no-unsafe-return

Ô£û 1 problem (1 error, 0 warnings)



```

### src/common/metrics/interceptors/http-metrics.interceptor.ts - exit 1
```text

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\common\metrics\interceptors\http-metrics.interceptor.ts
  110:5  error  Unsafe return of a value of type error  @typescript-eslint/no-unsafe-return

Ô£û 1 problem (1 error, 0 warnings)



```


## Build TypeScript

- Exit code: 1
```text

node:internal/modules/cjs/loader:1404
  throw err;
  ^

Error: Cannot find module 'C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\node_modules\npm\bin\npm-prefix.js'
    at Function._resolveFilename (node:internal/modules/cjs/loader:1401:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1057:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1062:22)
    at Function._load (node:internal/modules/cjs/loader:1211:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:235:24)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)
    at node:internal/main/run_main_module:36:49 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v22.17.1
node:internal/modules/cjs/loader:1404
  throw err;
  ^

Error: Cannot find module 'C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\node_modules\npm\bin\npm-cli.js'
    at Function._resolveFilename (node:internal/modules/cjs/loader:1401:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1057:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1062:22)
    at Function._load (node:internal/modules/cjs/loader:1211:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:235:24)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)
    at node:internal/main/run_main_module:36:49 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v22.17.1

```

## Gate: NO-GO-GRUPO03-RESIDUAL-DIAGNOSTIC

Nenhuma alteracao de codigo, dependencia ou estado Git foi executada.
