# Chat 04 - Bloco 56 - Contexto Lint Producao Grupo 07

Data: 2026-09-10 11:46:56 -03:00
- Projeto: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core
- Branch: main
- HEAD: 219dd066492ea23eadab10cb089957dd521cb816
- origin/main: 219dd066492ea23eadab10cb089957dd521cb816
- Status antes/depois: 336/336
- Staged antes/depois: 0/0
- Falhas de coleta: 0
- Findings: 48
- Erros: 20
- Warnings: 28

## Alvos

System.Object[]

## Findings detalhados

### src/modules/templates-whatsapp/templates-whatsapp.controller.ts:84:49
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
82:   })
83:   create(@Req() req: any, @Body() dto: CreateTemplateWhatsAppDto) {
84:     return this.templatesWhatsappService.create(req.user.empresaId, dto);
85:   }
86:
```

### src/modules/templates-whatsapp/templates-whatsapp.controller.ts:84:53
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
82:   })
83:   create(@Req() req: any, @Body() dto: CreateTemplateWhatsAppDto) {
84:     return this.templatesWhatsappService.create(req.user.empresaId, dto);
85:   }
86:
```

### src/modules/templates-whatsapp/templates-whatsapp.controller.ts:120:50
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
118:   })
119:   findAll(@Req() req: any) {
120:     return this.templatesWhatsappService.findAll(req.user.empresaId);
121:   }
122:
```

### src/modules/templates-whatsapp/templates-whatsapp.controller.ts:120:54
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
118:   })
119:   findAll(@Req() req: any) {
120:     return this.templatesWhatsappService.findAll(req.user.empresaId);
121:   }
122:
```

### src/modules/templates-whatsapp/templates-whatsapp.controller.ts:167:50
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
165:   })
166:   findOne(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
167:     return this.templatesWhatsappService.findOne(req.user.empresaId, id);
168:   }
169:
```

### src/modules/templates-whatsapp/templates-whatsapp.controller.ts:167:54
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
165:   })
166:   findOne(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
167:     return this.templatesWhatsappService.findOne(req.user.empresaId, id);
168:   }
169:
```

### src/modules/templates-whatsapp/templates-whatsapp.controller.ts:224:49
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
222:     @Body() dto: UpdateTemplateWhatsAppDto,
223:   ) {
224:     return this.templatesWhatsappService.update(req.user.empresaId, id, dto);
225:   }
226:
```

### src/modules/templates-whatsapp/templates-whatsapp.controller.ts:224:53
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
222:     @Body() dto: UpdateTemplateWhatsAppDto,
223:   ) {
224:     return this.templatesWhatsappService.update(req.user.empresaId, id, dto);
225:   }
226:
```

### src/modules/templates-whatsapp/templates-whatsapp.controller.ts:266:51
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
264:   })
265:   inativar(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
266:     return this.templatesWhatsappService.inativar(req.user.empresaId, id);
267:   }
268: }
```

### src/modules/templates-whatsapp/templates-whatsapp.controller.ts:266:55
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
264:   })
265:   inativar(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
266:     return this.templatesWhatsappService.inativar(req.user.empresaId, id);
267:   }
268: }
```

### src/modules/unidades/unidades.controller.ts:81:58
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
79:   })
80:   create(@Body() createUnidadeDto: CreateUnidadeDto, @Request() req: any) {
81:     return this.unidadesService.create(createUnidadeDto, req.user.empresaId);
82:   }
83:
```

### src/modules/unidades/unidades.controller.ts:81:62
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
79:   })
80:   create(@Body() createUnidadeDto: CreateUnidadeDto, @Request() req: any) {
81:     return this.unidadesService.create(createUnidadeDto, req.user.empresaId);
82:   }
83:
```

### src/modules/unidades/unidades.controller.ts:118:41
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
116:   })
117:   findAll(@Request() req: any) {
118:     return this.unidadesService.findAll(req.user.empresaId);
119:   }
120:
```

### src/modules/unidades/unidades.controller.ts:118:45
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
116:   })
117:   findAll(@Request() req: any) {
118:     return this.unidadesService.findAll(req.user.empresaId);
119:   }
120:
```

### src/modules/unidades/unidades.controller.ts:165:45
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
163:   })
164:   findOne(@Param('id', ParseUUIDPipe) id: string, @Request() req: any) {
165:     return this.unidadesService.findOne(id, req.user.empresaId);
166:   }
167:
```

### src/modules/unidades/unidades.controller.ts:165:49
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
163:   })
164:   findOne(@Param('id', ParseUUIDPipe) id: string, @Request() req: any) {
165:     return this.unidadesService.findOne(id, req.user.empresaId);
166:   }
167:
```

### src/modules/unidades/unidades.controller.ts:224:7
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
222:       id,
223:       updateUnidadeDto,
224:       req.user.empresaId,
225:     );
226:   }
```

### src/modules/unidades/unidades.controller.ts:224:11
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
222:       id,
223:       updateUnidadeDto,
224:       req.user.empresaId,
225:     );
226:   }
```

### src/modules/unidades/unidades.controller.ts:266:46
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
264:   })
265:   inativar(@Param('id', ParseUUIDPipe) id: string, @Request() req: any) {
266:     return this.unidadesService.inativar(id, req.user.empresaId);
267:   }
268: }
```

### src/modules/unidades/unidades.controller.ts:266:50
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
264:   })
265:   inativar(@Param('id', ParseUUIDPipe) id: string, @Request() req: any) {
266:     return this.unidadesService.inativar(id, req.user.empresaId);
267:   }
268: }
```

### src/modules/niveis-fidelidade/niveis-fidelidade.controller.ts:82:48
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
80:   })
81:   create(@Req() req: any, @Body() dto: CreateNivelFidelidadeDto) {
82:     return this.niveisFidelidadeService.create(req.user.empresaId, dto);
83:   }
84:
```

### src/modules/niveis-fidelidade/niveis-fidelidade.controller.ts:82:52
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
80:   })
81:   create(@Req() req: any, @Body() dto: CreateNivelFidelidadeDto) {
82:     return this.niveisFidelidadeService.create(req.user.empresaId, dto);
83:   }
84:
```

### src/modules/niveis-fidelidade/niveis-fidelidade.controller.ts:117:49
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
115:   })
116:   findAll(@Req() req: any) {
117:     return this.niveisFidelidadeService.findAll(req.user.empresaId);
118:   }
119:
```

### src/modules/niveis-fidelidade/niveis-fidelidade.controller.ts:117:53
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
115:   })
116:   findAll(@Req() req: any) {
117:     return this.niveisFidelidadeService.findAll(req.user.empresaId);
118:   }
119:
```

### src/modules/niveis-fidelidade/niveis-fidelidade.controller.ts:163:49
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
161:   })
162:   findOne(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
163:     return this.niveisFidelidadeService.findOne(req.user.empresaId, id);
164:   }
165:
```

### src/modules/niveis-fidelidade/niveis-fidelidade.controller.ts:163:53
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
161:   })
162:   findOne(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
163:     return this.niveisFidelidadeService.findOne(req.user.empresaId, id);
164:   }
165:
```

### src/modules/niveis-fidelidade/niveis-fidelidade.controller.ts:220:48
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
218:     @Body() dto: UpdateNivelFidelidadeDto,
219:   ) {
220:     return this.niveisFidelidadeService.update(req.user.empresaId, id, dto);
221:   }
222:
```

### src/modules/niveis-fidelidade/niveis-fidelidade.controller.ts:220:52
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
218:     @Body() dto: UpdateNivelFidelidadeDto,
219:   ) {
220:     return this.niveisFidelidadeService.update(req.user.empresaId, id, dto);
221:   }
222:
```

### src/modules/niveis-fidelidade/niveis-fidelidade.controller.ts:260:48
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
258:   })
259:   remove(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
260:     return this.niveisFidelidadeService.remove(req.user.empresaId, id);
261:   }
262: }
```

### src/modules/niveis-fidelidade/niveis-fidelidade.controller.ts:260:52
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
258:   })
259:   remove(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
260:     return this.niveisFidelidadeService.remove(req.user.empresaId, id);
261:   }
262: }
```

### src/modules/servicos/servicos.controller.ts:80:58
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
78:   })
79:   create(@Body() createServicoDto: CreateServicoDto, @Request() req: any) {
80:     return this.servicosService.create(createServicoDto, req.user.empresaId);
81:   }
82:
```

### src/modules/servicos/servicos.controller.ts:80:62
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
78:   })
79:   create(@Body() createServicoDto: CreateServicoDto, @Request() req: any) {
80:     return this.servicosService.create(createServicoDto, req.user.empresaId);
81:   }
82:
```

### src/modules/servicos/servicos.controller.ts:116:41
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
114:   })
115:   findAll(@Request() req: any) {
116:     return this.servicosService.findAll(req.user.empresaId);
117:   }
118:
```

### src/modules/servicos/servicos.controller.ts:116:45
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
114:   })
115:   findAll(@Request() req: any) {
116:     return this.servicosService.findAll(req.user.empresaId);
117:   }
118:
```

### src/modules/servicos/servicos.controller.ts:162:45
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
160:   })
161:   findOne(@Param('id', ParseUUIDPipe) id: string, @Request() req: any) {
162:     return this.servicosService.findOne(id, req.user.empresaId);
163:   }
164:
```

### src/modules/servicos/servicos.controller.ts:162:49
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
160:   })
161:   findOne(@Param('id', ParseUUIDPipe) id: string, @Request() req: any) {
162:     return this.servicosService.findOne(id, req.user.empresaId);
163:   }
164:
```

### src/modules/servicos/servicos.controller.ts:220:7
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
218:       id,
219:       updateServicoDto,
220:       req.user.empresaId,
221:     );
222:   }
```

### src/modules/servicos/servicos.controller.ts:220:11
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
218:       id,
219:       updateServicoDto,
220:       req.user.empresaId,
221:     );
222:   }
```

### src/modules/servicos/servicos.controller.ts:262:46
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
260:   })
261:   inativar(@Param('id', ParseUUIDPipe) id: string, @Request() req: any) {
262:     return this.servicosService.inativar(id, req.user.empresaId);
263:   }
264: }
```

### src/modules/servicos/servicos.controller.ts:262:50
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
260:   })
261:   inativar(@Param('id', ParseUUIDPipe) id: string, @Request() req: any) {
262:     return this.servicosService.inativar(id, req.user.empresaId);
263:   }
264: }
```

### src/modules/auth-cliente/auth-cliente-publico.controller.ts:107:26
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AuditRequest`.
```text
105:       },
106:       {
107:         ip: getRequestIp(req),
108:         userAgent: getRequestUserAgent(req),
109:         rota: getRequestRoute(req),
```

### src/modules/auth-cliente/auth-cliente-publico.controller.ts:108:40
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AuditRequest`.
```text
106:       {
107:         ip: getRequestIp(req),
108:         userAgent: getRequestUserAgent(req),
109:         rota: getRequestRoute(req),
110:         metodoHttp: getRequestMethod(req),
```

### src/modules/auth-cliente/auth-cliente-publico.controller.ts:109:31
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AuditRequest`.
```text
107:         ip: getRequestIp(req),
108:         userAgent: getRequestUserAgent(req),
109:         rota: getRequestRoute(req),
110:         metodoHttp: getRequestMethod(req),
111:       },
```

### src/modules/auth-cliente/auth-cliente-publico.controller.ts:110:38
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AuditRequest`.
```text
108:         userAgent: getRequestUserAgent(req),
109:         rota: getRequestRoute(req),
110:         metodoHttp: getRequestMethod(req),
111:       },
112:     );
```

### src/modules/auth-cliente/auth-cliente-publico.controller.ts:205:26
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AuditRequest`.
```text
203:       },
204:       {
205:         ip: getRequestIp(req),
206:         userAgent: getRequestUserAgent(req),
207:         rota: getRequestRoute(req),
```

### src/modules/auth-cliente/auth-cliente-publico.controller.ts:206:40
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AuditRequest`.
```text
204:       {
205:         ip: getRequestIp(req),
206:         userAgent: getRequestUserAgent(req),
207:         rota: getRequestRoute(req),
208:         metodoHttp: getRequestMethod(req),
```

### src/modules/auth-cliente/auth-cliente-publico.controller.ts:207:31
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AuditRequest`.
```text
205:         ip: getRequestIp(req),
206:         userAgent: getRequestUserAgent(req),
207:         rota: getRequestRoute(req),
208:         metodoHttp: getRequestMethod(req),
209:       },
```

### src/modules/auth-cliente/auth-cliente-publico.controller.ts:208:38
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AuditRequest`.
```text
206:         userAgent: getRequestUserAgent(req),
207:         rota: getRequestRoute(req),
208:         metodoHttp: getRequestMethod(req),
209:       },
210:     );
```

## Gate: READY-FOR-TYPED-CORRECTION-GRUPO07

Nenhuma alteracao de codigo, dependencia ou estado Git foi executada.