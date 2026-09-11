# Chat 04 - Bloco 60 - Contexto Lint Producao Grupo 08

Data: 2026-09-10 12:29:01 -03:00
- Projeto: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core
- Branch: main
- HEAD: 219dd066492ea23eadab10cb089957dd521cb816
- origin/main: 219dd066492ea23eadab10cb089957dd521cb816
- Status antes/depois: 340/340
- Staged antes/depois: 0/0
- Falhas de coleta: 0
- Findings: 39
- Erros: 31
- Warnings: 8

## Alvos

System.Object[]

## Findings detalhados

### src/modules/automacoes/automacoes.controller.ts:71:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
69:     return this.automacoesService.processarEvento({
70:       ...dto,
71:       empresaId: req.user.empresaId,
72:     });
73:   }
```

### src/modules/automacoes/automacoes.controller.ts:71:22
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
69:     return this.automacoesService.processarEvento({
70:       ...dto,
71:       empresaId: req.user.empresaId,
72:     });
73:   }
```

### src/modules/automacoes/automacoes.controller.ts:99:53
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
97:   })
98:   testarAniversario(@Req() req: any) {
99:     return this.automacoesService.testarAniversario(req.user.empresaId);
100:   }
101:
```

### src/modules/automacoes/automacoes.controller.ts:99:57
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
97:   })
98:   testarAniversario(@Req() req: any) {
99:     return this.automacoesService.testarAniversario(req.user.empresaId);
100:   }
101:
```

### src/modules/automacoes/automacoes.controller.ts:126:51
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
124:   })
125:   testarRelatorio(@Req() req: any) {
126:     return this.automacoesService.testarRelatorio(req.user.empresaId);
127:   }
128:
```

### src/modules/automacoes/automacoes.controller.ts:126:55
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
124:   })
125:   testarRelatorio(@Req() req: any) {
126:     return this.automacoesService.testarRelatorio(req.user.empresaId);
127:   }
128:
```

### src/modules/automacoes/automacoes.controller.ts:158:49
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
156:   })
157:   listarEventos(@Req() req: any) {
158:     return this.automacoesService.listarEventos(req.user.empresaId);
159:   }
160: }
```

### src/modules/automacoes/automacoes.controller.ts:158:53
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
156:   })
157:   listarEventos(@Req() req: any) {
158:     return this.automacoesService.listarEventos(req.user.empresaId);
159:   }
160: }
```

### src/queues/workers/notificacoes.worker.ts:13:3
- Regra: @typescript-eslint/no-unused-vars
- Severidade: 2
- Mensagem: 'AcaoAuditoria' is defined but never used.
```text
11: import { ConfigService } from '@nestjs/config';
12: import {
13:   AcaoAuditoria,
14:   StatusAuditoria,
15:   TipoNotificacao,
```

### src/queues/workers/notificacoes.worker.ts:14:3
- Regra: @typescript-eslint/no-unused-vars
- Severidade: 2
- Mensagem: 'StatusAuditoria' is defined but never used.
```text
12: import {
13:   AcaoAuditoria,
14:   StatusAuditoria,
15:   TipoNotificacao,
16:   TipoUsuarioAuditoria,
```

### src/queues/workers/notificacoes.worker.ts:16:3
- Regra: @typescript-eslint/no-unused-vars
- Severidade: 2
- Mensagem: 'TipoUsuarioAuditoria' is defined but never used.
```text
14:   StatusAuditoria,
15:   TipoNotificacao,
16:   TipoUsuarioAuditoria,
17: } from '@prisma/client';
18: import { Job, Worker } from 'bullmq';
```

### src/queues/workers/notificacoes.worker.ts:61:30
- Regra: @typescript-eslint/no-misused-promises
- Severidade: 2
- Mensagem: Promise returned in function argument where a void return was expected.
```text
59:     );
60:
61:     this.worker.on('failed', async (job, error) => {
62:       if (!job) return;
63:
```

### src/queues/workers/notificacoes.worker.ts:71:33
- Regra: @typescript-eslint/no-misused-promises
- Severidade: 2
- Mensagem: Promise returned in function argument where a void return was expected.
```text
69:     });
70:
71:     this.worker.on('completed', async (job) => {
72:       this.logger.log(
73:         `[BULLMQ] job concluido queue=${NOTIFICACOES_QUEUE} jobId=${job.id} ${formatQueueTrace(job)} empresaId=${job.data.empresaId}`,
```

### src/queues/workers/notificacoes.worker.ts:98:30
- Regra: @typescript-eslint/no-misused-promises
- Severidade: 2
- Mensagem: Promise returned in function argument where a void return was expected.
```text
96:     });
97:
98:     this.worker.on('failed', async (job, error) => {
99:       this.logger.error(
100:         `[BULLMQ] job falhou queue=${NOTIFICACOES_QUEUE} jobId=${
```

### src/queues/workers/notificacoes.worker.ts:281:27
- Regra: @typescript-eslint/no-base-to-string
- Severidade: 2
- Mensagem: 'metadataSegura.origem ?? ''' will use Object's default stringification format ('[object Object]') when stringified.
```text
279:     const metadataSegura = this.normalizarMetadata(metadata);
280:
281:     const origem = String(metadataSegura.origem ?? '').toLowerCase();
282:     const rotina = String(metadataSegura.rotina ?? '').toLowerCase();
283:     const tipoNormalizado = String(job.data.tipo ?? '').toUpperCase();
```

### src/queues/workers/notificacoes.worker.ts:282:27
- Regra: @typescript-eslint/no-base-to-string
- Severidade: 2
- Mensagem: 'metadataSegura.rotina ?? ''' will use Object's default stringification format ('[object Object]') when stringified.
```text
280:
281:     const origem = String(metadataSegura.origem ?? '').toLowerCase();
282:     const rotina = String(metadataSegura.rotina ?? '').toLowerCase();
283:     const tipoNormalizado = String(job.data.tipo ?? '').toUpperCase();
284:
```

### src/queues/workers/whatsapp.worker.ts:13:3
- Regra: @typescript-eslint/no-unused-vars
- Severidade: 2
- Mensagem: 'AcaoAuditoria' is defined but never used.
```text
11: import { ConfigService } from '@nestjs/config';
12: import {
13:   AcaoAuditoria,
14:   StatusAuditoria,
15:   TipoUsuarioAuditoria,
```

### src/queues/workers/whatsapp.worker.ts:14:3
- Regra: @typescript-eslint/no-unused-vars
- Severidade: 2
- Mensagem: 'StatusAuditoria' is defined but never used.
```text
12: import {
13:   AcaoAuditoria,
14:   StatusAuditoria,
15:   TipoUsuarioAuditoria,
16: } from '@prisma/client';
```

### src/queues/workers/whatsapp.worker.ts:15:3
- Regra: @typescript-eslint/no-unused-vars
- Severidade: 2
- Mensagem: 'TipoUsuarioAuditoria' is defined but never used.
```text
13:   AcaoAuditoria,
14:   StatusAuditoria,
15:   TipoUsuarioAuditoria,
16: } from '@prisma/client';
17: import { Job, Worker } from 'bullmq';
```

### src/queues/workers/whatsapp.worker.ts:57:30
- Regra: @typescript-eslint/no-misused-promises
- Severidade: 2
- Mensagem: Promise returned in function argument where a void return was expected.
```text
55:     );
56:
57:     this.worker.on('failed', async (job, error) => {
58:       if (!job) return;
59:
```

### src/queues/workers/whatsapp.worker.ts:67:33
- Regra: @typescript-eslint/no-misused-promises
- Severidade: 2
- Mensagem: Promise returned in function argument where a void return was expected.
```text
65:     });
66:
67:     this.worker.on('completed', async (job) => {
68:       this.logger.log(
69:         `[BULLMQ] job concluido queue=${WHATSAPP_QUEUE} jobId=${job.id} ${formatQueueTrace(job)} empresaId=${job.data.empresaId}`,
```

### src/queues/workers/whatsapp.worker.ts:94:30
- Regra: @typescript-eslint/no-misused-promises
- Severidade: 2
- Mensagem: Promise returned in function argument where a void return was expected.
```text
92:     });
93:
94:     this.worker.on('failed', async (job, error) => {
95:       this.logger.error(
96:         `[BULLMQ] job falhou queue=${WHATSAPP_QUEUE} jobId=${
```

### src/queues/workers/whatsapp.worker.ts:274:27
- Regra: @typescript-eslint/no-base-to-string
- Severidade: 2
- Mensagem: 'metadataSegura.origem ?? ''' will use Object's default stringification format ('[object Object]') when stringified.
```text
272:     const metadataSegura = this.normalizarMetadata(metadata);
273:
274:     const origem = String(metadataSegura.origem ?? '').toLowerCase();
275:     const rotina = String(metadataSegura.rotina ?? '').toLowerCase();
276:
```

### src/queues/workers/whatsapp.worker.ts:275:27
- Regra: @typescript-eslint/no-base-to-string
- Severidade: 2
- Mensagem: 'metadataSegura.rotina ?? ''' will use Object's default stringification format ('[object Object]') when stringified.
```text
273:
274:     const origem = String(metadataSegura.origem ?? '').toLowerCase();
275:     const rotina = String(metadataSegura.rotina ?? '').toLowerCase();
276:
277:     const tipoNormalizado = String(tipo ?? '').toUpperCase();
```

### src/modules/configuracao-whatsapp/configuracao-whatsapp.controller.ts:84:7
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
82:   createOrUpdate(@Req() req: any, @Body() dto: CreateConfiguracaoWhatsAppDto) {
83:     return this.configuracaoWhatsappService.createOrUpdate(
84:       req.user.empresaId,
85:       dto,
86:     );
```

### src/modules/configuracao-whatsapp/configuracao-whatsapp.controller.ts:84:11
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
82:   createOrUpdate(@Req() req: any, @Body() dto: CreateConfiguracaoWhatsAppDto) {
83:     return this.configuracaoWhatsappService.createOrUpdate(
84:       req.user.empresaId,
85:       dto,
86:     );
```

### src/modules/configuracao-whatsapp/configuracao-whatsapp.controller.ts:120:53
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
118:   })
119:   findOne(@Req() req: any) {
120:     return this.configuracaoWhatsappService.findOne(req.user.empresaId);
121:   }
122:
```

### src/modules/configuracao-whatsapp/configuracao-whatsapp.controller.ts:120:57
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
118:   })
119:   findOne(@Req() req: any) {
120:     return this.configuracaoWhatsappService.findOne(req.user.empresaId);
121:   }
122:
```

### src/modules/configuracao-whatsapp/configuracao-whatsapp.controller.ts:162:52
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
160:   })
161:   update(@Req() req: any, @Body() dto: UpdateConfiguracaoWhatsAppDto) {
162:     return this.configuracaoWhatsappService.update(req.user.empresaId, dto);
163:   }
164:
```

### src/modules/configuracao-whatsapp/configuracao-whatsapp.controller.ts:162:56
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
160:   })
161:   update(@Req() req: any, @Body() dto: UpdateConfiguracaoWhatsAppDto) {
162:     return this.configuracaoWhatsappService.update(req.user.empresaId, dto);
163:   }
164:
```

### src/modules/configuracao-whatsapp/configuracao-whatsapp.controller.ts:202:7
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
200:   gerarLink(@Req() req: any, @Query('mensagem') mensagem?: string) {
201:     return this.configuracaoWhatsappService.gerarLink(
202:       req.user.empresaId,
203:       mensagem,
204:     );
```

### src/modules/configuracao-whatsapp/configuracao-whatsapp.controller.ts:202:11
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
200:   gerarLink(@Req() req: any, @Query('mensagem') mensagem?: string) {
201:     return this.configuracaoWhatsappService.gerarLink(
202:       req.user.empresaId,
203:       mensagem,
204:     );
```

### src/common/metrics/guards/metrics-auth.guard.ts:12:11
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
10: export class MetricsAuthGuard implements CanActivate {
11:   canActivate(context: ExecutionContext): boolean {
12:     const request = context.switchToHttp().getRequest();
13:
14:     const nodeEnv = process.env.NODE_ENV || 'development';
```

### src/common/metrics/guards/metrics-auth.guard.ts:27:11
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
25:     }
26:
27:     const headerToken = request.headers?.['x-metrics-token'];
28:     const authorization = request.headers?.authorization;
29:
```

### src/common/metrics/guards/metrics-auth.guard.ts:27:33
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .headers on an `any` value.
```text
25:     }
26:
27:     const headerToken = request.headers?.['x-metrics-token'];
28:     const authorization = request.headers?.authorization;
29:
```

### src/common/metrics/guards/metrics-auth.guard.ts:28:11
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
26:
27:     const headerToken = request.headers?.['x-metrics-token'];
28:     const authorization = request.headers?.authorization;
29:
30:     const bearerToken =
```

### src/common/metrics/guards/metrics-auth.guard.ts:28:35
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .headers on an `any` value.
```text
26:
27:     const headerToken = request.headers?.['x-metrics-token'];
28:     const authorization = request.headers?.authorization;
29:
30:     const bearerToken =
```

### src/common/metrics/guards/metrics-auth.guard.ts:35:11
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
33:         : undefined;
34:
35:     const receivedToken =
36:       typeof headerToken === 'string'
37:         ? headerToken
```

### src/common/metrics/guards/metrics-auth.guard.ts:42:49
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
40:           : bearerToken;
41:
42:     if (!receivedToken || !this.safeTokenEquals(receivedToken, expectedToken)) {
43:       throw new UnauthorizedException('Token de metricas invalido.');
44:     }
```

## Gate: READY-FOR-TYPED-CORRECTION-GRUPO08

Nenhuma alteracao de codigo, dependencia ou estado Git foi executada.