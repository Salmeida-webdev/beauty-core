# Chat 04 - Bloco 35 - Contexto Lint Producao Grupo 03

Data: 2026-09-09 21:00:48 -03:00
- Projeto: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core
- Branch: main
- HEAD: 219dd066492ea23eadab10cb089957dd521cb816
- origin/main: 219dd066492ea23eadab10cb089957dd521cb816
- Status preservado: 312
- Staged antes/depois: 0/0

## Alvos autorizados para diagnostico

- src/queues/services/dead-letter-queue.service.ts
- src/common/utils/audit-request.util.ts
- src/lgpd/lgpd.service.ts
- src/queues/services/queues.service.ts
- src/common/metrics/interceptors/http-metrics.interceptor.ts

## Resultado

- Falhas de coleta: 0
- Findings: 129
- Erros: 129
- Warnings: 0

## Findings por arquivo

- src/common/metrics/interceptors/http-metrics.interceptor.ts: 22 findings (22 erros, 0 warnings)
- src/common/utils/audit-request.util.ts: 26 findings (26 erros, 0 warnings)
- src/lgpd/lgpd.service.ts: 25 findings (25 erros, 0 warnings)
- src/queues/services/dead-letter-queue.service.ts: 32 findings (32 erros, 0 warnings)
- src/queues/services/queues.service.ts: 24 findings (24 erros, 0 warnings)

## Findings detalhados

### src/common/metrics/interceptors/http-metrics.interceptor.ts:23:11
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
- Contexto:
```text
21:     const startedAt = process.hrtime.bigint();
22:     const httpContext = context.switchToHttp();
23:     const request = httpContext.getRequest();
24:
25:     return next.handle().pipe(
```

### src/common/metrics/interceptors/http-metrics.interceptor.ts:32:33
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of a value of type `any`.
- Contexto:
```text
30:         this.record(context, request, startedAt, error);
31:
32:         return throwError(() => error);
33:       }),
34:     );
```

### src/common/metrics/interceptors/http-metrics.interceptor.ts:44:11
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
- Contexto:
```text
42:   ): void {
43:     const httpContext = context.switchToHttp();
44:     const response = httpContext.getResponse();
45:
46:     const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
```

### src/common/metrics/interceptors/http-metrics.interceptor.ts:51:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
- Contexto:
```text
49:
50:     this.metricsService.observeHttpRequest({
51:       method: request?.method ?? 'UNKNOWN',
52:       route,
53:       statusCode,
```

### src/common/metrics/interceptors/http-metrics.interceptor.ts:51:24
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .method on an `any` value.
- Contexto:
```text
49:
50:     this.metricsService.observeHttpRequest({
51:       method: request?.method ?? 'UNKNOWN',
52:       route,
53:       statusCode,
```

### src/common/metrics/interceptors/http-metrics.interceptor.ts:60:24
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .getStatus on an `any` value.
- Contexto:
```text
58:   private resolveStatusCode(response: any, error?: any): number {
59:     if (error) {
60:       if (typeof error.getStatus === 'function') {
61:         return Number(error.getStatus());
62:       }
```

### src/common/metrics/interceptors/http-metrics.interceptor.ts:61:23
- Regra: @typescript-eslint/no-unsafe-call
- Severidade: 2
- Mensagem: Unsafe call of an `any` typed value.
- Contexto:
```text
59:     if (error) {
60:       if (typeof error.getStatus === 'function') {
61:         return Number(error.getStatus());
62:       }
63:
```

### src/common/metrics/interceptors/http-metrics.interceptor.ts:61:29
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .getStatus on an `any` value.
- Contexto:
```text
59:     if (error) {
60:       if (typeof error.getStatus === 'function') {
61:         return Number(error.getStatus());
62:       }
63:
```

### src/common/metrics/interceptors/http-metrics.interceptor.ts:64:24
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .status on an `any` value.
- Contexto:
```text
62:       }
63:
64:       if (typeof error.status === 'number') {
65:         return error.status;
66:       }
```

### src/common/metrics/interceptors/http-metrics.interceptor.ts:65:9
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of a value of type `any`.
- Contexto:
```text
63:
64:       if (typeof error.status === 'number') {
65:         return error.status;
66:       }
67:
```

### src/common/metrics/interceptors/http-metrics.interceptor.ts:65:22
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .status on an `any` value.
- Contexto:
```text
63:
64:       if (typeof error.status === 'number') {
65:         return error.status;
66:       }
67:
```

### src/common/metrics/interceptors/http-metrics.interceptor.ts:68:24
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .statusCode on an `any` value.
- Contexto:
```text
66:       }
67:
68:       if (typeof error.statusCode === 'number') {
69:         return error.statusCode;
70:       }
```

### src/common/metrics/interceptors/http-metrics.interceptor.ts:69:9
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of a value of type `any`.
- Contexto:
```text
67:
68:       if (typeof error.statusCode === 'number') {
69:         return error.statusCode;
70:       }
71:
```

### src/common/metrics/interceptors/http-metrics.interceptor.ts:69:22
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .statusCode on an `any` value.
- Contexto:
```text
67:
68:       if (typeof error.statusCode === 'number') {
69:         return error.statusCode;
70:       }
71:
```

### src/common/metrics/interceptors/http-metrics.interceptor.ts:75:29
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .statusCode on an `any` value.
- Contexto:
```text
73:     }
74:
75:     return Number(response?.statusCode ?? 200);
76:   }
77:
```

### src/common/metrics/interceptors/http-metrics.interceptor.ts:79:11
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
- Contexto:
```text
77:
78:   private resolveRoute(request: any): string {
79:     const baseUrl = request?.baseUrl ?? '';
80:     const routePath = request?.route?.path;
81:
```

### src/common/metrics/interceptors/http-metrics.interceptor.ts:79:30
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .baseUrl on an `any` value.
- Contexto:
```text
77:
78:   private resolveRoute(request: any): string {
79:     const baseUrl = request?.baseUrl ?? '';
80:     const routePath = request?.route?.path;
81:
```

### src/common/metrics/interceptors/http-metrics.interceptor.ts:80:11
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
- Contexto:
```text
78:   private resolveRoute(request: any): string {
79:     const baseUrl = request?.baseUrl ?? '';
80:     const routePath = request?.route?.path;
81:
82:     if (routePath) {
```

### src/common/metrics/interceptors/http-metrics.interceptor.ts:80:32
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .route on an `any` value.
- Contexto:
```text
78:   private resolveRoute(request: any): string {
79:     const baseUrl = request?.baseUrl ?? '';
80:     const routePath = request?.route?.path;
81:
82:     if (routePath) {
```

### src/common/metrics/interceptors/http-metrics.interceptor.ts:86:5
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of a value of type `any`.
- Contexto:
```text
84:     }
85:
86:     return request?.path ?? request?.url ?? 'unknown';
87:   }
88: }
```

### src/common/metrics/interceptors/http-metrics.interceptor.ts:86:21
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .path on an `any` value.
- Contexto:
```text
84:     }
85:
86:     return request?.path ?? request?.url ?? 'unknown';
87:   }
88: }
```

### src/common/metrics/interceptors/http-metrics.interceptor.ts:86:38
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .url on an `any` value.
- Contexto:
```text
84:     }
85:
86:     return request?.path ?? request?.url ?? 'unknown';
87:   }
88: }
```

### src/common/utils/audit-request.util.ts:4:9
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
- Contexto:
```text
2:
3: export function getRequestIp(req: any): string | undefined {
4:   const forwardedFor = req.headers?.['x-forwarded-for'];
5:   const realIp = req.headers?.['x-real-ip'];
6:
```

### src/common/utils/audit-request.util.ts:4:28
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .headers on an `any` value.
- Contexto:
```text
2:
3: export function getRequestIp(req: any): string | undefined {
4:   const forwardedFor = req.headers?.['x-forwarded-for'];
5:   const realIp = req.headers?.['x-real-ip'];
6:
```

### src/common/utils/audit-request.util.ts:5:9
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
- Contexto:
```text
3: export function getRequestIp(req: any): string | undefined {
4:   const forwardedFor = req.headers?.['x-forwarded-for'];
5:   const realIp = req.headers?.['x-real-ip'];
6:
7:   if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
```

### src/common/utils/audit-request.util.ts:5:22
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .headers on an `any` value.
- Contexto:
```text
3: export function getRequestIp(req: any): string | undefined {
4:   const forwardedFor = req.headers?.['x-forwarded-for'];
5:   const realIp = req.headers?.['x-real-ip'];
6:
7:   if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
```

### src/common/utils/audit-request.util.ts:12:5
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of a value of type `any`.
- Contexto:
```text
10:
11:   if (Array.isArray(forwardedFor) && forwardedFor.length > 0) {
12:     return forwardedFor[0];
13:   }
14:
```

### src/common/utils/audit-request.util.ts:19:3
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of a value of type `any`.
- Contexto:
```text
17:   }
18:
19:   return req.ip || req.socket?.remoteAddress || req.connection?.remoteAddress;
20: }
21:
```

### src/common/utils/audit-request.util.ts:19:14
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .ip on an `any` value.
- Contexto:
```text
17:   }
18:
19:   return req.ip || req.socket?.remoteAddress || req.connection?.remoteAddress;
20: }
21:
```

### src/common/utils/audit-request.util.ts:19:24
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .socket on an `any` value.
- Contexto:
```text
17:   }
18:
19:   return req.ip || req.socket?.remoteAddress || req.connection?.remoteAddress;
20: }
21:
```

### src/common/utils/audit-request.util.ts:19:53
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .connection on an `any` value.
- Contexto:
```text
17:   }
18:
19:   return req.ip || req.socket?.remoteAddress || req.connection?.remoteAddress;
20: }
21:
```

### src/common/utils/audit-request.util.ts:23:3
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of a value of type `any`.
- Contexto:
```text
21:
22: export function getRequestUserAgent(req: any): string | undefined {
23:   return req.headers?.['user-agent'];
24: }
25:
```

### src/common/utils/audit-request.util.ts:23:14
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .headers on an `any` value.
- Contexto:
```text
21:
22: export function getRequestUserAgent(req: any): string | undefined {
23:   return req.headers?.['user-agent'];
24: }
25:
```

### src/common/utils/audit-request.util.ts:27:3
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of a value of type `any`.
- Contexto:
```text
25:
26: export function getRequestRoute(req: any): string {
27:   return req.originalUrl || req.url || '';
28: }
29:
```

### src/common/utils/audit-request.util.ts:27:14
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .originalUrl on an `any` value.
- Contexto:
```text
25:
26: export function getRequestRoute(req: any): string {
27:   return req.originalUrl || req.url || '';
28: }
29:
```

### src/common/utils/audit-request.util.ts:27:33
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .url on an `any` value.
- Contexto:
```text
25:
26: export function getRequestRoute(req: any): string {
27:   return req.originalUrl || req.url || '';
28: }
29:
```

### src/common/utils/audit-request.util.ts:31:21
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .method on an `any` value.
- Contexto:
```text
29:
30: export function getRequestMethod(req: any): string {
31:   return String(req.method || '').toUpperCase();
32: }
33:
```

### src/common/utils/audit-request.util.ts:35:3
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of a value of type `any`.
- Contexto:
```text
33:
34: export function getRequestUser(req: any) {
35:   return req.user || null;
36: }
37:
```

### src/common/utils/audit-request.util.ts:35:14
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
- Contexto:
```text
33:
34: export function getRequestUser(req: any) {
35:   return req.user || null;
36: }
37:
```

### src/common/utils/audit-request.util.ts:45:12
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .role on an `any` value.
- Contexto:
```text
43:   }
44:
45:   if (user.role === 'CLIENTE') {
46:     return TipoUsuarioAuditoria.CLIENTE;
47:   }
```

### src/common/utils/audit-request.util.ts:49:12
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .tipoUsuario on an `any` value.
- Contexto:
```text
47:   }
48:
49:   if (user.tipoUsuario === 'CLIENTE') {
50:     return TipoUsuarioAuditoria.CLIENTE;
51:   }
```

### src/common/utils/audit-request.util.ts:53:12
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .clienteId on an `any` value.
- Contexto:
```text
51:   }
52:
53:   if (user.clienteId && !user.usuarioId) {
54:     return TipoUsuarioAuditoria.CLIENTE;
55:   }
```

### src/common/utils/audit-request.util.ts:53:31
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .usuarioId on an `any` value.
- Contexto:
```text
51:   }
52:
53:   if (user.clienteId && !user.usuarioId) {
54:     return TipoUsuarioAuditoria.CLIENTE;
55:   }
```

### src/common/utils/audit-request.util.ts:57:12
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .role on an `any` value.
- Contexto:
```text
55:   }
56:
57:   if (user.role === 'ADMIN') {
58:     return TipoUsuarioAuditoria.ADMIN;
59:   }
```

### src/common/utils/audit-request.util.ts:61:12
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .role on an `any` value.
- Contexto:
```text
59:   }
60:
61:   if (user.role === 'GERENTE') {
62:     return TipoUsuarioAuditoria.GERENTE;
63:   }
```

### src/common/utils/audit-request.util.ts:65:12
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .role on an `any` value.
- Contexto:
```text
63:   }
64:
65:   if (user.role === 'RECEPCAO') {
66:     return TipoUsuarioAuditoria.RECEPCAO;
67:   }
```

### src/common/utils/audit-request.util.ts:69:12
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .role on an `any` value.
- Contexto:
```text
67:   }
68:
69:   if (user.role === 'PROFISSIONAL') {
70:     return TipoUsuarioAuditoria.PROFISSIONAL;
71:   }
```

### src/common/utils/audit-request.util.ts:73:12
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .tipoUsuario on an `any` value.
- Contexto:
```text
71:   }
72:
73:   if (user.tipoUsuario === 'SISTEMA') {
74:     return TipoUsuarioAuditoria.SISTEMA;
75:   }
```

### src/lgpd/lgpd.service.ts:23:52
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
21: };
22:
23: type LgpdClientRecord = Record<string, unknown> & {
24:   empresaId?: string | null;
25: };
```

### src/lgpd/lgpd.service.ts:24:29
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
22:
23: type LgpdClientRecord = Record<string, unknown> & {
24:   empresaId?: string | null;
25: };
26:
```

### src/lgpd/lgpd.service.ts:25:3
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
23: type LgpdClientRecord = Record<string, unknown> & {
24:   empresaId?: string | null;
25: };
26:
27: type LgpdModelDelegate = {
```

### src/lgpd/lgpd.service.ts:26:1
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
24:   empresaId?: string | null;
25: };
26:
27: type LgpdModelDelegate = {
28:   findMany: (args: Record<string, unknown>) => Promise<Record<string, unknown>[]>;
```

### src/lgpd/lgpd.service.ts:27:27
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
25: };
26:
27: type LgpdModelDelegate = {
28:   findMany: (args: Record<string, unknown>) => Promise<Record<string, unknown>[]>;
29:   updateMany?: (args: Record<string, unknown>) => Promise<{ count: number }>;
```

### src/lgpd/lgpd.service.ts:28:14
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Replace `args:·Record<string,·unknown>)·=>·Promise<Record<string,·unknown>[]>;` with `␍⏎····args:·Record<string,·unknown>,␍⏎··)·=>·Promise<Record<string,·unknown>[]>;␍`
- Contexto:
```text
26:
27: type LgpdModelDelegate = {
28:   findMany: (args: Record<string, unknown>) => Promise<Record<string, unknown>[]>;
29:   updateMany?: (args: Record<string, unknown>) => Promise<{ count: number }>;
30:   create?: (args: Record<string, unknown>) => Promise<unknown>;
```

### src/lgpd/lgpd.service.ts:29:78
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
27: type LgpdModelDelegate = {
28:   findMany: (args: Record<string, unknown>) => Promise<Record<string, unknown>[]>;
29:   updateMany?: (args: Record<string, unknown>) => Promise<{ count: number }>;
30:   create?: (args: Record<string, unknown>) => Promise<unknown>;
31: };
```

### src/lgpd/lgpd.service.ts:30:64
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
28:   findMany: (args: Record<string, unknown>) => Promise<Record<string, unknown>[]>;
29:   updateMany?: (args: Record<string, unknown>) => Promise<{ count: number }>;
30:   create?: (args: Record<string, unknown>) => Promise<unknown>;
31: };
32:
```

### src/lgpd/lgpd.service.ts:31:3
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
29:   updateMany?: (args: Record<string, unknown>) => Promise<{ count: number }>;
30:   create?: (args: Record<string, unknown>) => Promise<unknown>;
31: };
32:
33: type LgpdClientDelegate = LgpdModelDelegate & {
```

### src/lgpd/lgpd.service.ts:32:1
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
30:   create?: (args: Record<string, unknown>) => Promise<unknown>;
31: };
32:
33: type LgpdClientDelegate = LgpdModelDelegate & {
34:   update: (args: Record<string, unknown>) => Promise<LgpdClientRecord>;
```

### src/lgpd/lgpd.service.ts:33:48
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
31: };
32:
33: type LgpdClientDelegate = LgpdModelDelegate & {
34:   update: (args: Record<string, unknown>) => Promise<LgpdClientRecord>;
35:   findFirst: (args: Record<string, unknown>) => Promise<LgpdClientRecord | null>;
```

### src/lgpd/lgpd.service.ts:34:72
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
32:
33: type LgpdClientDelegate = LgpdModelDelegate & {
34:   update: (args: Record<string, unknown>) => Promise<LgpdClientRecord>;
35:   findFirst: (args: Record<string, unknown>) => Promise<LgpdClientRecord | null>;
36: };
```

### src/lgpd/lgpd.service.ts:35:15
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Replace `args:·Record<string,·unknown>)·=>·Promise<LgpdClientRecord·|·null>;` with `␍⏎····args:·Record<string,·unknown>,␍⏎··)·=>·Promise<LgpdClientRecord·|·null>;␍`
- Contexto:
```text
33: type LgpdClientDelegate = LgpdModelDelegate & {
34:   update: (args: Record<string, unknown>) => Promise<LgpdClientRecord>;
35:   findFirst: (args: Record<string, unknown>) => Promise<LgpdClientRecord | null>;
36: };
37:
```

### src/lgpd/lgpd.service.ts:36:3
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
34:   update: (args: Record<string, unknown>) => Promise<LgpdClientRecord>;
35:   findFirst: (args: Record<string, unknown>) => Promise<LgpdClientRecord | null>;
36: };
37:
38: type LgpdPrismaClient = {
```

### src/lgpd/lgpd.service.ts:37:1
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
35:   findFirst: (args: Record<string, unknown>) => Promise<LgpdClientRecord | null>;
36: };
37:
38: type LgpdPrismaClient = {
39:   cliente: LgpdClientDelegate;
```

### src/lgpd/lgpd.service.ts:38:26
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
36: };
37:
38: type LgpdPrismaClient = {
39:   cliente: LgpdClientDelegate;
40:   codigoAcessoCliente?: LgpdModelDelegate;
```

### src/lgpd/lgpd.service.ts:39:31
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
37:
38: type LgpdPrismaClient = {
39:   cliente: LgpdClientDelegate;
40:   codigoAcessoCliente?: LgpdModelDelegate;
41:   auditoriaSistema?: LgpdModelDelegate;
```

### src/lgpd/lgpd.service.ts:40:43
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
38: type LgpdPrismaClient = {
39:   cliente: LgpdClientDelegate;
40:   codigoAcessoCliente?: LgpdModelDelegate;
41:   auditoriaSistema?: LgpdModelDelegate;
42:   [modelName: string]: LgpdClientDelegate | LgpdModelDelegate | undefined;
```

### src/lgpd/lgpd.service.ts:41:40
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
39:   cliente: LgpdClientDelegate;
40:   codigoAcessoCliente?: LgpdModelDelegate;
41:   auditoriaSistema?: LgpdModelDelegate;
42:   [modelName: string]: LgpdClientDelegate | LgpdModelDelegate | undefined;
43: };
```

### src/lgpd/lgpd.service.ts:42:75
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
40:   codigoAcessoCliente?: LgpdModelDelegate;
41:   auditoriaSistema?: LgpdModelDelegate;
42:   [modelName: string]: LgpdClientDelegate | LgpdModelDelegate | undefined;
43: };
44: @Injectable()
```

### src/lgpd/lgpd.service.ts:43:3
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
41:   auditoriaSistema?: LgpdModelDelegate;
42:   [modelName: string]: LgpdClientDelegate | LgpdModelDelegate | undefined;
43: };
44: @Injectable()
45: export class LgpdService {
```

### src/lgpd/lgpd.service.ts:138:39
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Replace `this.prisma·as·unknown·as·LgpdPrismaClient` with `␍⏎······this.prisma·as·unknown·as·LgpdPrismaClient␍⏎····`
- Contexto:
```text
136:     }
137:
138:     const clienteAnonimizado = await (this.prisma as unknown as LgpdPrismaClient).cliente.update({
139:       where: { id: clienteId },
140:       data,
```

### src/lgpd/lgpd.service.ts:233:72
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍⏎······`
- Contexto:
```text
231:     const updates: Record<string, unknown> = {};
232:
233:     const codigoDelegate = (this.prisma as unknown as LgpdPrismaClient).codigoAcessoCliente;
234:
235:     if (codigoDelegate?.updateMany) {
```

### src/lgpd/lgpd.service.ts:273:28
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Replace `this.prisma·as·unknown·as·LgpdPrismaClient` with `␍⏎······this.prisma·as·unknown·as·LgpdPrismaClient␍⏎····`
- Contexto:
```text
271:         };
272:
273:     const cliente = await (this.prisma as unknown as LgpdPrismaClient).cliente.findFirst({
274:       where,
275:     });
```

### src/lgpd/lgpd.service.ts:480:66
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍⏎······`
- Contexto:
```text
478:     mensagem: string;
479:   }) {
480:     const delegate = (this.prisma as unknown as LgpdPrismaClient).auditoriaSistema;
481:
482:     if (!delegate || typeof delegate.create !== 'function') {
```

### src/queues/services/dead-letter-queue.service.ts:22:17
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
20: import { getEnterpriseJobOptions } from '../utils/queue-options.util';
21:
22: type JobData = {
23:   [key: string]: unknown;
24:   empresaId?: string;
```

### src/queues/services/dead-letter-queue.service.ts:23:26
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
21:
22: type JobData = {
23:   [key: string]: unknown;
24:   empresaId?: string;
25:   usuarioId?: string;
```

### src/queues/services/dead-letter-queue.service.ts:24:22
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
22: type JobData = {
23:   [key: string]: unknown;
24:   empresaId?: string;
25:   usuarioId?: string;
26:   clienteId?: string;
```

### src/queues/services/dead-letter-queue.service.ts:25:22
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
23:   [key: string]: unknown;
24:   empresaId?: string;
25:   usuarioId?: string;
26:   clienteId?: string;
27:   metadata?: Record<string, unknown>;
```

### src/queues/services/dead-letter-queue.service.ts:26:22
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
24:   empresaId?: string;
25:   usuarioId?: string;
26:   clienteId?: string;
27:   metadata?: Record<string, unknown>;
28: };
```

### src/queues/services/dead-letter-queue.service.ts:27:38
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
25:   usuarioId?: string;
26:   clienteId?: string;
27:   metadata?: Record<string, unknown>;
28: };
29:
```

### src/queues/services/dead-letter-queue.service.ts:28:3
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
26:   clienteId?: string;
27:   metadata?: Record<string, unknown>;
28: };
29:
30: type DeadLetterJobData = JobData & {
```

### src/queues/services/dead-letter-queue.service.ts:29:1
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
27:   metadata?: Record<string, unknown>;
28: };
29:
30: type DeadLetterJobData = JobData & {
31:   originalQueue: string;
```

### src/queues/services/dead-letter-queue.service.ts:30:37
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
28: };
29:
30: type DeadLetterJobData = JobData & {
31:   originalQueue: string;
32:   originalJobId: string;
```

### src/queues/services/dead-letter-queue.service.ts:31:25
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
29:
30: type DeadLetterJobData = JobData & {
31:   originalQueue: string;
32:   originalJobId: string;
33:   originalName: string;
```

### src/queues/services/dead-letter-queue.service.ts:32:25
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
30: type DeadLetterJobData = JobData & {
31:   originalQueue: string;
32:   originalJobId: string;
33:   originalName: string;
34:   originalData: JobData;
```

### src/queues/services/dead-letter-queue.service.ts:33:24
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
31:   originalQueue: string;
32:   originalJobId: string;
33:   originalName: string;
34:   originalData: JobData;
35:   originalOpts?: unknown;
```

### src/queues/services/dead-letter-queue.service.ts:34:25
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
32:   originalJobId: string;
33:   originalName: string;
34:   originalData: JobData;
35:   originalOpts?: unknown;
36:   failedReason: string;
```

### src/queues/services/dead-letter-queue.service.ts:35:26
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
33:   originalName: string;
34:   originalData: JobData;
35:   originalOpts?: unknown;
36:   failedReason: string;
37:   stacktrace?: string[];
```

### src/queues/services/dead-letter-queue.service.ts:36:24
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
34:   originalData: JobData;
35:   originalOpts?: unknown;
36:   failedReason: string;
37:   stacktrace?: string[];
38:   attemptsMade: number;
```

### src/queues/services/dead-letter-queue.service.ts:37:25
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
35:   originalOpts?: unknown;
36:   failedReason: string;
37:   stacktrace?: string[];
38:   attemptsMade: number;
39:   movedToDlqAt: string;
```

### src/queues/services/dead-letter-queue.service.ts:38:24
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
36:   failedReason: string;
37:   stacktrace?: string[];
38:   attemptsMade: number;
39:   movedToDlqAt: string;
40: };
```

### src/queues/services/dead-letter-queue.service.ts:39:24
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
37:   stacktrace?: string[];
38:   attemptsMade: number;
39:   movedToDlqAt: string;
40: };
41:
```

### src/queues/services/dead-letter-queue.service.ts:40:3
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
38:   attemptsMade: number;
39:   movedToDlqAt: string;
40: };
41:
42: type AuditoriaCompat = {
```

### src/queues/services/dead-letter-queue.service.ts:41:1
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
39:   movedToDlqAt: string;
40: };
41:
42: type AuditoriaCompat = {
43:   registrarJob?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
```

### src/queues/services/dead-letter-queue.service.ts:42:25
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
40: };
41:
42: type AuditoriaCompat = {
43:   registrarJob?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
44:   registrar?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
```

### src/queues/services/dead-letter-queue.service.ts:43:19
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Replace `payload:·Record<string,·unknown>)·=>·Promise<unknown>·|·unknown;` with `␍⏎····payload:·Record<string,·unknown>,␍⏎··)·=>·Promise<unknown>·|·unknown;␍`
- Contexto:
```text
41:
42: type AuditoriaCompat = {
43:   registrarJob?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
44:   registrar?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
45:   criar?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
```

### src/queues/services/dead-letter-queue.service.ts:43:75
- Regra: @typescript-eslint/no-redundant-type-constituents
- Severidade: 2
- Mensagem: 'unknown' overrides all other types in this union type.
- Contexto:
```text
41:
42: type AuditoriaCompat = {
43:   registrarJob?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
44:   registrar?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
45:   criar?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
```

### src/queues/services/dead-letter-queue.service.ts:44:72
- Regra: @typescript-eslint/no-redundant-type-constituents
- Severidade: 2
- Mensagem: 'unknown' overrides all other types in this union type.
- Contexto:
```text
42: type AuditoriaCompat = {
43:   registrarJob?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
44:   registrar?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
45:   criar?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
46:   registrarAuditoria?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
```

### src/queues/services/dead-letter-queue.service.ts:44:80
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
42: type AuditoriaCompat = {
43:   registrarJob?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
44:   registrar?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
45:   criar?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
46:   registrarAuditoria?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
```

### src/queues/services/dead-letter-queue.service.ts:45:68
- Regra: @typescript-eslint/no-redundant-type-constituents
- Severidade: 2
- Mensagem: 'unknown' overrides all other types in this union type.
- Contexto:
```text
43:   registrarJob?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
44:   registrar?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
45:   criar?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
46:   registrarAuditoria?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
47: };
```

### src/queues/services/dead-letter-queue.service.ts:45:76
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
43:   registrarJob?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
44:   registrar?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
45:   criar?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
46:   registrarAuditoria?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
47: };
```

### src/queues/services/dead-letter-queue.service.ts:46:25
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Replace `payload:·Record<string,·unknown>)·=>·Promise<unknown>·|·unknown;` with `␍⏎····payload:·Record<string,·unknown>,␍⏎··)·=>·Promise<unknown>·|·unknown;␍`
- Contexto:
```text
44:   registrar?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
45:   criar?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
46:   registrarAuditoria?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
47: };
48:
```

### src/queues/services/dead-letter-queue.service.ts:46:81
- Regra: @typescript-eslint/no-redundant-type-constituents
- Severidade: 2
- Mensagem: 'unknown' overrides all other types in this union type.
- Contexto:
```text
44:   registrar?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
45:   criar?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
46:   registrarAuditoria?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
47: };
48:
```

### src/queues/services/dead-letter-queue.service.ts:47:3
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Insert `␍`
- Contexto:
```text
45:   criar?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
46:   registrarAuditoria?: (payload: Record<string, unknown>) => Promise<unknown> | unknown;
47: };
48:
49: @Injectable()
```

### src/queues/services/dead-letter-queue.service.ts:91:5
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of type `Queue<any, any, string, any, any, string>` from function with return type `Queue<JobData, any, string, JobData, any, string>`.
- Contexto:
```text
89:     }
90:
91:     return queue;
92:   }
93:
```

### src/queues/services/dead-letter-queue.service.ts:125:46
- Regra: prettier/prettier
- Severidade: 2
- Mensagem: Replace `·sourceQueue:·string;·job:·Job<T>;·error:·Error` with `␍⏎····sourceQueue:·string;␍⏎····job:·Job<T>;␍⏎····error:·Error;␍⏎·`
- Contexto:
```text
123:   }
124:
125:   async moveToDlq<T extends object>(params: { sourceQueue: string; job: Job<T>; error: Error }) {
126:     const { sourceQueue, job, error } = params;
127:
```

### src/queues/services/queues.service.ts:119:5
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of a value of type `any`.
- Contexto:
```text
117:
118:   private getReferenciaId(data: QueueJobPayload): string | null {
119:     return (
120:       data.referenciaId ??
121:       data.notificacaoId ??
```

### src/queues/services/queues.service.ts:129:22
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .referenciaId on an `any` value.
- Contexto:
```text
127:       data.relatorioId ??
128:       data.pacoteId ??
129:       data.metadata?.referenciaId ??
130:       data.metadata?.rotina ??
131:       data.dataReferencia ??
```

### src/queues/services/queues.service.ts:130:22
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .rotina on an `any` value.
- Contexto:
```text
128:       data.pacoteId ??
129:       data.metadata?.referenciaId ??
130:       data.metadata?.rotina ??
131:       data.dataReferencia ??
132:       null
```

### src/queues/services/queues.service.ts:137:5
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of a value of type `any`.
- Contexto:
```text
135:
136:   private getDataReferencia(data: QueueJobPayload): string | null {
137:     return (
138:       data.dataReferencia ??
139:       data.data ??
```

### src/queues/services/queues.service.ts:141:22
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .dataReferencia on an `any` value.
- Contexto:
```text
139:       data.data ??
140:       data.competencia ??
141:       data.metadata?.dataReferencia ??
142:       null
143:     );
```

### src/queues/services/queues.service.ts:151:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
- Contexto:
```text
149:   ): string {
150:     return createQueueJobId({
151:       empresaId: data.empresaId,
152:       tipo: data.tipo ?? fallbackTipo,
153:       referenciaId: this.getReferenciaId(data),
```

### src/queues/services/queues.service.ts:152:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
- Contexto:
```text
150:     return createQueueJobId({
151:       empresaId: data.empresaId,
152:       tipo: data.tipo ?? fallbackTipo,
153:       referenciaId: this.getReferenciaId(data),
154:       dataReferencia: this.getDataReferencia(data),
```

### src/queues/services/queues.service.ts:155:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
- Contexto:
```text
153:       referenciaId: this.getReferenciaId(data),
154:       dataReferencia: this.getDataReferencia(data),
155:       extra: data.metadata?.extra,
156:     });
157:   }
```

### src/queues/services/queues.service.ts:155:29
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .extra on an `any` value.
- Contexto:
```text
153:       referenciaId: this.getReferenciaId(data),
154:       dataReferencia: this.getDataReferencia(data),
155:       extra: data.metadata?.extra,
156:     });
157:   }
```

### src/queues/services/queues.service.ts:277:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
- Contexto:
```text
275:     return this.adicionarNotificacao({
276:       ...this.normalizarData(data),
277:       empresaId: data?.empresaId ?? 'SCHEDULER_GLOBAL',
278:       referenciaId:
279:         data?.referenciaId ??
```

### src/queues/services/queues.service.ts:278:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
- Contexto:
```text
276:       ...this.normalizarData(data),
277:       empresaId: data?.empresaId ?? 'SCHEDULER_GLOBAL',
278:       referenciaId:
279:         data?.referenciaId ??
280:         data?.metadata?.rotina ??
```

### src/queues/services/queues.service.ts:280:25
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .rotina on an `any` value.
- Contexto:
```text
278:       referenciaId:
279:         data?.referenciaId ??
280:         data?.metadata?.rotina ??
281:         data?.tipo ??
282:         'NOTIFICACAO_SCHEDULER',
```

### src/queues/services/queues.service.ts:289:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
- Contexto:
```text
287:     return this.adicionarWhatsapp({
288:       ...this.normalizarData(data),
289:       empresaId: data?.empresaId ?? 'SCHEDULER_GLOBAL',
290:       referenciaId:
291:         data?.referenciaId ??
```

### src/queues/services/queues.service.ts:290:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
- Contexto:
```text
288:       ...this.normalizarData(data),
289:       empresaId: data?.empresaId ?? 'SCHEDULER_GLOBAL',
290:       referenciaId:
291:         data?.referenciaId ??
292:         data?.metadata?.rotina ??
```

### src/queues/services/queues.service.ts:292:25
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .rotina on an `any` value.
- Contexto:
```text
290:       referenciaId:
291:         data?.referenciaId ??
292:         data?.metadata?.rotina ??
293:         data?.tipo ??
294:         'WHATSAPP_SCHEDULER',
```

### src/queues/services/queues.service.ts:301:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
- Contexto:
```text
299:     return this.adicionarCampanha({
300:       ...this.normalizarData(data),
301:       empresaId: data?.empresaId ?? 'SCHEDULER_GLOBAL',
302:       referenciaId:
303:         data?.referenciaId ??
```

### src/queues/services/queues.service.ts:302:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
- Contexto:
```text
300:       ...this.normalizarData(data),
301:       empresaId: data?.empresaId ?? 'SCHEDULER_GLOBAL',
302:       referenciaId:
303:         data?.referenciaId ??
304:         data?.metadata?.rotina ??
```

### src/queues/services/queues.service.ts:304:25
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .rotina on an `any` value.
- Contexto:
```text
302:       referenciaId:
303:         data?.referenciaId ??
304:         data?.metadata?.rotina ??
305:         data?.campanhaId ??
306:         data?.tipo ??
```

### src/queues/services/queues.service.ts:314:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
- Contexto:
```text
312:     return this.adicionarAniversario({
313:       ...this.normalizarData(data),
314:       empresaId: data?.empresaId ?? 'SCHEDULER_GLOBAL',
315:       referenciaId:
316:         data?.referenciaId ??
```

### src/queues/services/queues.service.ts:315:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
- Contexto:
```text
313:       ...this.normalizarData(data),
314:       empresaId: data?.empresaId ?? 'SCHEDULER_GLOBAL',
315:       referenciaId:
316:         data?.referenciaId ??
317:         data?.metadata?.rotina ??
```

### src/queues/services/queues.service.ts:317:25
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .rotina on an `any` value.
- Contexto:
```text
315:       referenciaId:
316:         data?.referenciaId ??
317:         data?.metadata?.rotina ??
318:         data?.clienteId ??
319:         data?.tipo ??
```

### src/queues/services/queues.service.ts:327:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
- Contexto:
```text
325:     return this.adicionarRelatorio({
326:       ...this.normalizarData(data),
327:       empresaId: data?.empresaId ?? 'SCHEDULER_GLOBAL',
328:       referenciaId:
329:         data?.referenciaId ??
```

### src/queues/services/queues.service.ts:328:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
- Contexto:
```text
326:       ...this.normalizarData(data),
327:       empresaId: data?.empresaId ?? 'SCHEDULER_GLOBAL',
328:       referenciaId:
329:         data?.referenciaId ??
330:         data?.metadata?.rotina ??
```

### src/queues/services/queues.service.ts:330:25
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .rotina on an `any` value.
- Contexto:
```text
328:       referenciaId:
329:         data?.referenciaId ??
330:         data?.metadata?.rotina ??
331:         data?.tipo ??
332:         'RELATORIO_SCHEDULER',
```


## Gate: READY-FOR-TYPED-CORRECTION-GRUPO03

Nenhuma alteracao de codigo, dependencia ou estado Git foi executada.
