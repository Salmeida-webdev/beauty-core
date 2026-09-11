# Chat 04 - Bloco 63 - Contexto Lint Producao Grupo 09

Data: 2026-09-10 14:52:45 -03:00
- Projeto: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core
- Branch: main
- HEAD: 219dd066492ea23eadab10cb089957dd521cb816
- origin/main: 219dd066492ea23eadab10cb089957dd521cb816
- Status antes/depois: 345/345
- Staged antes/depois: 0/0
- Falhas de coleta: 0
- Findings: 30
- Erros: 27
- Warnings: 3

## Alvos

System.Object[]

## Findings detalhados

### src/modules/clientes/clientes.service.ts:236:9
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an error typed value.
```text
234:         telefone: clienteAntes.telefone,
235:         email: clienteAntes.email,
236:         foto: clienteAntes['foto'],
237:         dataNascimento: clienteAntes['dataNascimento'],
238:         observacoes: clienteAntes['observacoes'],
```

### src/modules/clientes/clientes.service.ts:237:9
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an error typed value.
```text
235:         email: clienteAntes.email,
236:         foto: clienteAntes['foto'],
237:         dataNascimento: clienteAntes['dataNascimento'],
238:         observacoes: clienteAntes['observacoes'],
239:         ativo: clienteAntes.ativo,
```

### src/modules/clientes/clientes.service.ts:238:9
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an error typed value.
```text
236:         foto: clienteAntes['foto'],
237:         dataNascimento: clienteAntes['dataNascimento'],
238:         observacoes: clienteAntes['observacoes'],
239:         ativo: clienteAntes.ativo,
240:       },
```

### src/modules/clientes/clientes.service.ts:245:9
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an error typed value.
```text
243:         telefone: clienteDepois.telefone,
244:         email: clienteDepois.email,
245:         foto: clienteDepois['foto'],
246:         dataNascimento: clienteDepois['dataNascimento'],
247:         observacoes: clienteDepois['observacoes'],
```

### src/modules/clientes/clientes.service.ts:246:9
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an error typed value.
```text
244:         email: clienteDepois.email,
245:         foto: clienteDepois['foto'],
246:         dataNascimento: clienteDepois['dataNascimento'],
247:         observacoes: clienteDepois['observacoes'],
248:         ativo: clienteDepois.ativo,
```

### src/modules/clientes/clientes.service.ts:247:9
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an error typed value.
```text
245:         foto: clienteDepois['foto'],
246:         dataNascimento: clienteDepois['dataNascimento'],
247:         observacoes: clienteDepois['observacoes'],
248:         ativo: clienteDepois.ativo,
249:       },
```

### src/modules/empresas/dto/update-empresa.dto.ts:25:30
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of a value of type `any`.
```text
23:   @MinLength(2)
24:   @MaxLength(120)
25:   @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
26:   nome?: string;
27:
```

### src/modules/empresas/dto/update-empresa.dto.ts:42:5
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of a value of type `any`.
```text
40:   })
41:   @Transform(({ value }) =>
42:     typeof value === 'string' ? value.trim().toLowerCase() : value,
43:   )
44:   slug?: string;
```

### src/modules/empresas/dto/update-empresa.dto.ts:53:30
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of a value of type `any`.
```text
51:   @IsString()
52:   @Length(8, 20)
53:   @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
54:   telefone?: string;
55:
```

### src/modules/empresas/dto/update-empresa.dto.ts:64:5
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of a value of type `any`.
```text
62:   @MaxLength(120)
63:   @Transform(({ value }) =>
64:     typeof value === 'string' ? value.trim().toLowerCase() : value,
65:   )
66:   email?: string;
```

### src/modules/empresas/dto/update-empresa.dto.ts:75:30
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of a value of type `any`.
```text
73:   @IsString()
74:   @MaxLength(500)
75:   @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
76:   logo?: string;
77:
```

### src/modules/empresas/dto/update-empresa.dto.ts:97:5
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of a value of type `any`.
```text
95:   })
96:   @Transform(({ value }) =>
97:     typeof value === 'string'
98:       ? value
99:           .trim()
```

### src/modules/empresas/dto/create-empresa.dto.ts:24:30
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of a value of type `any`.
```text
22:   @MinLength(2)
23:   @MaxLength(120)
24:   @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
25:   nome: string;
26:
```

### src/modules/empresas/dto/create-empresa.dto.ts:40:5
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of a value of type `any`.
```text
38:   })
39:   @Transform(({ value }) =>
40:     typeof value === 'string' ? value.trim().toLowerCase() : value,
41:   )
42:   slug: string;
```

### src/modules/empresas/dto/create-empresa.dto.ts:51:30
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of a value of type `any`.
```text
49:   @IsString()
50:   @Length(8, 20)
51:   @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
52:   telefone?: string;
53:
```

### src/modules/empresas/dto/create-empresa.dto.ts:62:5
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of a value of type `any`.
```text
60:   @MaxLength(120)
61:   @Transform(({ value }) =>
62:     typeof value === 'string' ? value.trim().toLowerCase() : value,
63:   )
64:   email?: string;
```

### src/modules/empresas/dto/create-empresa.dto.ts:73:30
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of a value of type `any`.
```text
71:   @IsString()
72:   @MaxLength(500)
73:   @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
74:   logo?: string;
75:
```

### src/modules/empresas/dto/create-empresa.dto.ts:95:5
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of a value of type `any`.
```text
93:   })
94:   @Transform(({ value }) =>
95:     typeof value === 'string'
96:       ? value
97:           .trim()
```

### src/modules/configuracao-fidelidade/configuracao-fidelidade.controller.ts:80:32
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
78:   })
79:   create(@Req() req: any, @Body() dto: CreateConfiguracaoFidelidadeDto) {
80:     return this.service.create(req.user.empresaId, dto);
81:   }
82:
```

### src/modules/configuracao-fidelidade/configuracao-fidelidade.controller.ts:80:36
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
78:   })
79:   create(@Req() req: any, @Body() dto: CreateConfiguracaoFidelidadeDto) {
80:     return this.service.create(req.user.empresaId, dto);
81:   }
82:
```

### src/modules/configuracao-fidelidade/configuracao-fidelidade.controller.ts:118:33
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
116:   })
117:   findOne(@Req() req: any) {
118:     return this.service.findOne(req.user.empresaId);
119:   }
120:
```

### src/modules/configuracao-fidelidade/configuracao-fidelidade.controller.ts:118:37
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
116:   })
117:   findOne(@Req() req: any) {
118:     return this.service.findOne(req.user.empresaId);
119:   }
120:
```

### src/modules/configuracao-fidelidade/configuracao-fidelidade.controller.ts:163:32
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
161:   })
162:   update(@Req() req: any, @Body() dto: UpdateConfiguracaoFidelidadeDto) {
163:     return this.service.update(req.user.empresaId, dto);
164:   }
165: }
```

### src/modules/configuracao-fidelidade/configuracao-fidelidade.controller.ts:163:36
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
161:   })
162:   update(@Req() req: any, @Body() dto: UpdateConfiguracaoFidelidadeDto) {
163:     return this.service.update(req.user.empresaId, dto);
164:   }
165: }
```

### src/queues/workers/aniversarios.worker.ts:13:3
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

### src/queues/workers/aniversarios.worker.ts:14:3
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

### src/queues/workers/aniversarios.worker.ts:15:3
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

### src/queues/workers/aniversarios.worker.ts:59:30
- Regra: @typescript-eslint/no-misused-promises
- Severidade: 2
- Mensagem: Promise returned in function argument where a void return was expected.
```text
57:     );
58:
59:     this.worker.on('failed', async (job, error) => {
60:       if (!job) return;
61:
```

### src/queues/workers/aniversarios.worker.ts:69:33
- Regra: @typescript-eslint/no-misused-promises
- Severidade: 2
- Mensagem: Promise returned in function argument where a void return was expected.
```text
67:     });
68:
69:     this.worker.on('completed', async (job) => {
70:       this.logger.log(
71:         `[BULLMQ] job concluido queue=${ANIVERSARIOS_QUEUE} jobId=${job.id} ${formatQueueTrace(job)} empresaId=${job.data.empresaId}`,
```

### src/queues/workers/aniversarios.worker.ts:105:30
- Regra: @typescript-eslint/no-misused-promises
- Severidade: 2
- Mensagem: Promise returned in function argument where a void return was expected.
```text
103:     });
104:
105:     this.worker.on('failed', async (job, error) => {
106:       this.logger.error(
107:         `[BULLMQ] job falhou queue=${ANIVERSARIOS_QUEUE} jobId=${
```

## Gate: READY-FOR-TYPED-CORRECTION-GRUPO09

Nenhuma alteracao de codigo, dependencia ou estado Git foi executada.