# Chat 04 - Bloco 29 - Reconciliacao Lint Producao

Data da execucao: 2026-09-09 18:32:43 -03:00
- Projeto: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core
- Branch: main
- HEAD: 219dd066492ea23eadab10cb089957dd521cb816
- origin/main: 219dd066492ea23eadab10cb089957dd521cb816

## Arquivos reauditados

- src/queues/services/dead-letter-queue.service.ts
- src/lgpd/lgpd.service.ts
- src/common/interceptors/audit-log.interceptor.ts

## Preservacao

- Status preservado: 294
- Staged: 0
- Untracked: 37
- git diff --check: exit 0
- git diff --cached --check: exit 0
- Estado Git alterado: False

## Resultado seletivo

- ESLint exit code global: 1
- JSON interpretado: True
- Arquivos do grupo com findings: 3
- Erros do grupo: 99
- Warnings do grupo: 5
- Total do grupo: 104

- src/common/interceptors/audit-log.interceptor.ts:43:11 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:50:11 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:50:29 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .empresaId on an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:52:58 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .role on an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:54:11 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:54:53 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .sub on an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:54:66 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .id on an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:55:11 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:56:16 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .clienteId on an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:56:35 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .sub on an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:56:48 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .id on an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:57:15 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .clienteId on an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:69:7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:70:7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:71:7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:72:7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:72:19 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .role on an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:95:13 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:96:13 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:97:13 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:99:13 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:127:20 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .message on an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:133:13 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:134:13 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:135:13 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:137:13 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:147:15 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:147:34 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .status on an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:150:13 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:150:30 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .message on an `any` value.
- src/common/interceptors/audit-log.interceptor.ts:154:33 [@typescript-eslint/no-unsafe-return] Unsafe return of a value of type `any`.
- src/lgpd/lgpd.service.ts:117:11 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/lgpd/lgpd.service.ts:117:38 [@typescript-eslint/no-unsafe-call] Unsafe call of an `any` typed value.
- src/lgpd/lgpd.service.ts:117:59 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .cliente on an `any` value.
- src/lgpd/lgpd.service.ts:135:45 [@typescript-eslint/no-unsafe-argument] Unsafe argument of type `any` assigned to a parameter of type `Record<string, unknown>`.
- src/lgpd/lgpd.service.ts:212:11 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/lgpd/lgpd.service.ts:212:49 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .codigoAcessoCliente on an `any` value.
- src/lgpd/lgpd.service.ts:214:25 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .updateMany on an `any` value.
- src/lgpd/lgpd.service.ts:216:15 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/lgpd/lgpd.service.ts:216:30 [@typescript-eslint/no-unsafe-call] Unsafe call of an `any` typed value.
- src/lgpd/lgpd.service.ts:216:45 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .updateMany on an `any` value.
- src/lgpd/lgpd.service.ts:229:47 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .count on an `any` value.
- src/lgpd/lgpd.service.ts:252:11 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/lgpd/lgpd.service.ts:252:27 [@typescript-eslint/no-unsafe-call] Unsafe call of an `any` typed value.
- src/lgpd/lgpd.service.ts:252:48 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .cliente on an `any` value.
- src/lgpd/lgpd.service.ts:260:34 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .empresaId on an `any` value.
- src/lgpd/lgpd.service.ts:266:5 [@typescript-eslint/no-unsafe-return] Unsafe return of a value of type `any`.
- src/lgpd/lgpd.service.ts:273:11 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/lgpd/lgpd.service.ts:273:43 [@typescript-eslint/no-unsafe-member-access] Unsafe member access [modelName] on an `any` value.
- src/lgpd/lgpd.service.ts:275:38 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .findMany on an `any` value.
- src/lgpd/lgpd.service.ts:280:13 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/lgpd/lgpd.service.ts:280:26 [@typescript-eslint/no-unsafe-call] Unsafe call of an `any` typed value.
- src/lgpd/lgpd.service.ts:280:35 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .findMany on an `any` value.
- src/lgpd/lgpd.service.ts:286:32 [@typescript-eslint/no-unsafe-argument] Unsafe argument of type `any` assigned to a parameter of type `Record<string, unknown>[]`.
- src/lgpd/lgpd.service.ts:289:15 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/lgpd/lgpd.service.ts:289:28 [@typescript-eslint/no-unsafe-call] Unsafe call of an `any` typed value.
- src/lgpd/lgpd.service.ts:289:37 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .findMany on an `any` value.
- src/lgpd/lgpd.service.ts:294:34 [@typescript-eslint/no-unsafe-argument] Unsafe argument of type `any` assigned to a parameter of type `Record<string, unknown>[]`.
- src/lgpd/lgpd.service.ts:331:23 [@typescript-eslint/no-unused-vars] '_modelName' is defined but never used.
- src/lgpd/lgpd.service.ts:459:11 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/lgpd/lgpd.service.ts:459:43 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .auditoriaSistema on an `any` value.
- src/lgpd/lgpd.service.ts:461:38 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .create on an `any` value.
- src/lgpd/lgpd.service.ts:466:13 [@typescript-eslint/no-unsafe-call] Unsafe call of an `any` typed value.
- src/lgpd/lgpd.service.ts:466:22 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .create on an `any` value.
- src/queues/services/dead-letter-queue.service.ts:69:13 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/queues/services/dead-letter-queue.service.ts:71:26 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .registrarJob on an `any` value.
- src/queues/services/dead-letter-queue.service.ts:72:15 [@typescript-eslint/no-unsafe-call] Unsafe call of an `any` typed value.
- src/queues/services/dead-letter-queue.service.ts:72:23 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .registrarJob on an `any` value.
- src/queues/services/dead-letter-queue.service.ts:76:26 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .registrar on an `any` value.
- src/queues/services/dead-letter-queue.service.ts:77:15 [@typescript-eslint/no-unsafe-call] Unsafe call of an `any` typed value.
- src/queues/services/dead-letter-queue.service.ts:77:23 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .registrar on an `any` value.
- src/queues/services/dead-letter-queue.service.ts:81:26 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .criar on an `any` value.
- src/queues/services/dead-letter-queue.service.ts:82:15 [@typescript-eslint/no-unsafe-call] Unsafe call of an `any` typed value.
- src/queues/services/dead-letter-queue.service.ts:82:23 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .criar on an `any` value.
- src/queues/services/dead-letter-queue.service.ts:86:26 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .registrarAuditoria on an `any` value.
- src/queues/services/dead-letter-queue.service.ts:87:15 [@typescript-eslint/no-unsafe-call] Unsafe call of an `any` typed value.
- src/queues/services/dead-letter-queue.service.ts:87:23 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .registrarAuditoria on an `any` value.
- src/queues/services/dead-letter-queue.service.ts:119:7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/queues/services/dead-letter-queue.service.ts:138:7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/queues/services/dead-letter-queue.service.ts:138:28 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .empresaId on an `any` value.
- src/queues/services/dead-letter-queue.service.ts:139:7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/queues/services/dead-letter-queue.service.ts:139:28 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .usuarioId on an `any` value.
- src/queues/services/dead-letter-queue.service.ts:140:7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/queues/services/dead-letter-queue.service.ts:140:28 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .clienteId on an `any` value.
- src/queues/services/dead-letter-queue.service.ts:166:7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/queues/services/dead-letter-queue.service.ts:182:11 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/queues/services/dead-letter-queue.service.ts:184:45 [@typescript-eslint/no-unsafe-argument] Unsafe argument of type `any` assigned to a parameter of type `string`.
- src/queues/services/dead-letter-queue.service.ts:184:50 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .originalQueue on an `any` value.
- src/queues/services/dead-letter-queue.service.ts:185:39 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .originalJobId on an `any` value.
- src/queues/services/dead-letter-queue.service.ts:202:7 [@typescript-eslint/no-unsafe-argument] Unsafe argument of type `any` assigned to a parameter of type `string`.
- src/queues/services/dead-letter-queue.service.ts:202:12 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .originalName on an `any` value.
- src/queues/services/dead-letter-queue.service.ts:204:17 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .originalData on an `any` value.
- src/queues/services/dead-letter-queue.service.ts:205:9 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/queues/services/dead-letter-queue.service.ts:206:20 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .originalData on an `any` value.
- src/queues/services/dead-letter-queue.service.ts:218:7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/queues/services/dead-letter-queue.service.ts:218:23 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .originalData on an `any` value.
- src/queues/services/dead-letter-queue.service.ts:219:7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/queues/services/dead-letter-queue.service.ts:219:23 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .originalData on an `any` value.
- src/queues/services/dead-letter-queue.service.ts:220:7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/queues/services/dead-letter-queue.service.ts:220:23 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .originalData on an `any` value.
- src/queues/services/dead-letter-queue.service.ts:229:9 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/queues/services/dead-letter-queue.service.ts:229:29 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .originalQueue on an `any` value.
- src/queues/services/dead-letter-queue.service.ts:236:7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- src/queues/services/dead-letter-queue.service.ts:236:27 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .originalQueue on an `any` value.

**READY-FOR-PRODUCAO-GRUPO-CORRECTION**

- Nenhuma alteracao de codigo, dependencia ou estado Git foi executada.
