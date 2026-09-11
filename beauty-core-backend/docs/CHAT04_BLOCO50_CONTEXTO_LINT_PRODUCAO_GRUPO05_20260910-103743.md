# Chat 04 - Bloco 50 - Contexto Lint Producao Grupo 05

Data: 2026-09-10 10:37:43 -03:00
- Projeto: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core
- Branch: main
- HEAD: 219dd066492ea23eadab10cb089957dd521cb816
- origin/main: 219dd066492ea23eadab10cb089957dd521cb816
- Status antes/depois: 327/327
- Staged antes/depois: 0/0
- Falhas de coleta: 0
- Findings: 71
- Erros: 41
- Warnings: 30

## Alvos

System.Object[]

## Findings detalhados

### src/modules/fidelidade/fidelidade.controller.ts:81:42
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
79:   })
80:   create(@Req() req: any, @Body() dto: CreateFidelidadeDto) {
81:     return this.fidelidadeService.create(req.user.empresaId, dto);
82:   }
83:
```

### src/modules/fidelidade/fidelidade.controller.ts:81:46
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
79:   })
80:   create(@Req() req: any, @Body() dto: CreateFidelidadeDto) {
81:     return this.fidelidadeService.create(req.user.empresaId, dto);
82:   }
83:
```

### src/modules/fidelidade/fidelidade.controller.ts:124:41
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
122:   })
123:   saldo(@Req() req: any, @Param('id', ParseUUIDPipe) clienteId: string) {
124:     return this.fidelidadeService.saldo(req.user.empresaId, clienteId);
125:   }
126:
```

### src/modules/fidelidade/fidelidade.controller.ts:124:45
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
122:   })
123:   saldo(@Req() req: any, @Param('id', ParseUUIDPipe) clienteId: string) {
124:     return this.fidelidadeService.saldo(req.user.empresaId, clienteId);
125:   }
126:
```

### src/modules/fidelidade/fidelidade.controller.ts:165:51
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
163:   })
164:   adicionarPontos(@Req() req: any, @Body() dto: AdicionarPontosDto) {
165:     return this.fidelidadeService.adicionarPontos(req.user.empresaId, dto);
166:   }
167:
```

### src/modules/fidelidade/fidelidade.controller.ts:165:55
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
163:   })
164:   adicionarPontos(@Req() req: any, @Body() dto: AdicionarPontosDto) {
165:     return this.fidelidadeService.adicionarPontos(req.user.empresaId, dto);
166:   }
167:
```

### src/modules/fidelidade/fidelidade.controller.ts:207:50
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
205:   })
206:   resgatarPontos(@Req() req: any, @Body() dto: ResgatarPontosDto) {
207:     return this.fidelidadeService.resgatarPontos(req.user.empresaId, dto);
208:   }
209:
```

### src/modules/fidelidade/fidelidade.controller.ts:207:54
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
205:   })
206:   resgatarPontos(@Req() req: any, @Body() dto: ResgatarPontosDto) {
207:     return this.fidelidadeService.resgatarPontos(req.user.empresaId, dto);
208:   }
209:
```

### src/modules/fidelidade/fidelidade.controller.ts:255:45
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
253:     @Param('clienteId', ParseUUIDPipe) clienteId: string,
254:   ) {
255:     return this.fidelidadeService.historico(req.user.empresaId, clienteId);
256:   }
257:
```

### src/modules/fidelidade/fidelidade.controller.ts:255:49
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
253:     @Param('clienteId', ParseUUIDPipe) clienteId: string,
254:   ) {
255:     return this.fidelidadeService.historico(req.user.empresaId, clienteId);
256:   }
257:
```

### src/modules/fidelidade/fidelidade.controller.ts:298:51
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
296:   })
297:   pontuarPorValor(@Req() req: any, @Body() dto: PontuarPorValorDto) {
298:     return this.fidelidadeService.pontuarPorValor(req.user.empresaId, dto);
299:   }
300:
```

### src/modules/fidelidade/fidelidade.controller.ts:298:55
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
296:   })
297:   pontuarPorValor(@Req() req: any, @Body() dto: PontuarPorValorDto) {
298:     return this.fidelidadeService.pontuarPorValor(req.user.empresaId, dto);
299:   }
300:
```

### src/modules/fidelidade/fidelidade.controller.ts:347:7
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
345:   ) {
346:     return this.fidelidadeService.beneficioDisponivel(
347:       req.user.empresaId,
348:       clienteId,
349:     );
```

### src/modules/fidelidade/fidelidade.controller.ts:347:11
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
345:   ) {
346:     return this.fidelidadeService.beneficioDisponivel(
347:       req.user.empresaId,
348:       clienteId,
349:     );
```

### src/modules/fidelidade/fidelidade.controller.ts:398:46
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
396:     @Param('clienteId', ParseUUIDPipe) clienteId: string,
397:   ) {
398:     return this.fidelidadeService.nivelAtual(req.user.empresaId, clienteId);
399:   }
400: }
```

### src/modules/fidelidade/fidelidade.controller.ts:398:50
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
396:     @Param('clienteId', ParseUUIDPipe) clienteId: string,
397:   ) {
398:     return this.fidelidadeService.nivelAtual(req.user.empresaId, clienteId);
399:   }
400: }
```

### src/modules/auditoria/auditoria.controller.ts:142:42
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
140:   })
141:   findAll(@Req() req: any, @Query() filtros: FiltrosAuditoriaDto) {
142:     return this.auditoriaService.findAll(req.user.empresaId, filtros);
143:   }
144:
```

### src/modules/auditoria/auditoria.controller.ts:142:46
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
140:   })
141:   findAll(@Req() req: any, @Query() filtros: FiltrosAuditoriaDto) {
142:     return this.auditoriaService.findAll(req.user.empresaId, filtros);
143:   }
144:
```

### src/modules/auditoria/auditoria.controller.ts:227:7
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
225:   ) {
226:     return this.auditoriaService.findByRecurso(
227:       req.user.empresaId,
228:       recurso,
229:       recursoId,
```

### src/modules/auditoria/auditoria.controller.ts:227:11
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
225:   ) {
226:     return this.auditoriaService.findByRecurso(
227:       req.user.empresaId,
228:       recurso,
229:       recursoId,
```

### src/modules/auditoria/auditoria.controller.ts:311:7
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
309:   ) {
310:     return this.auditoriaService.findByUsuario(
311:       req.user.empresaId,
312:       usuarioId,
313:       filtros,
```

### src/modules/auditoria/auditoria.controller.ts:311:11
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
309:   ) {
310:     return this.auditoriaService.findByUsuario(
311:       req.user.empresaId,
312:       usuarioId,
313:       filtros,
```

### src/modules/auditoria/auditoria.controller.ts:393:7
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
391:   ) {
392:     return this.auditoriaService.findByCliente(
393:       req.user.empresaId,
394:       clienteId,
395:       filtros,
```

### src/modules/auditoria/auditoria.controller.ts:393:11
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
391:   ) {
392:     return this.auditoriaService.findByCliente(
393:       req.user.empresaId,
394:       clienteId,
395:       filtros,
```

### src/modules/auditoria/auditoria.controller.ts:470:7
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
468:   ) {
469:     return this.auditoriaService.findByModulo(
470:       req.user.empresaId,
471:       modulo,
472:       filtros,
```

### src/modules/auditoria/auditoria.controller.ts:470:11
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
468:   ) {
469:     return this.auditoriaService.findByModulo(
470:       req.user.empresaId,
471:       modulo,
472:       filtros,
```

### src/modules/auditoria/auditoria.controller.ts:547:45
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
545:     @Query() filtros: FiltrosAuditoriaDto,
546:   ) {
547:     return this.auditoriaService.findByAcao(req.user.empresaId, acao, filtros);
548:   }
549:
```

### src/modules/auditoria/auditoria.controller.ts:547:49
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
545:     @Query() filtros: FiltrosAuditoriaDto,
546:   ) {
547:     return this.auditoriaService.findByAcao(req.user.empresaId, acao, filtros);
548:   }
549:
```

### src/modules/auditoria/auditoria.controller.ts:605:42
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
603:   })
604:   findOne(@Req() req: any, @Param('id') id: string) {
605:     return this.auditoriaService.findOne(req.user.empresaId, id);
606:   }
607: }
```

### src/modules/auditoria/auditoria.controller.ts:605:46
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
603:   })
604:   findOne(@Req() req: any, @Param('id') id: string) {
605:     return this.auditoriaService.findOne(req.user.empresaId, id);
606:   }
607: }
```

### src/modules/notificacoes/notificacoes.controller.ts:141:7
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
139:     return this.notificacoesService.findAll(
140:       getEmpresaId(req),
141:       req.user.sub,
142:       query,
143:     );
```

### src/modules/notificacoes/notificacoes.controller.ts:141:11
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
139:     return this.notificacoesService.findAll(
140:       getEmpresaId(req),
141:       req.user.sub,
142:       query,
143:     );
```

### src/modules/notificacoes/notificacoes.controller.ts:198:7
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
196:     return this.notificacoesService.findNaoLidas(
197:       getEmpresaId(req),
198:       req.user.sub,
199:       query,
200:     );
```

### src/modules/notificacoes/notificacoes.controller.ts:198:11
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
196:     return this.notificacoesService.findNaoLidas(
197:       getEmpresaId(req),
198:       req.user.sub,
199:       query,
200:     );
```

### src/modules/notificacoes/notificacoes.controller.ts:236:63
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
234:   })
235:   resumo(@Req() req: any) {
236:     return this.notificacoesService.resumo(getEmpresaId(req), req.user.sub);
237:   }
238:
```

### src/modules/notificacoes/notificacoes.controller.ts:236:67
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
234:   })
235:   resumo(@Req() req: any) {
236:     return this.notificacoesService.resumo(getEmpresaId(req), req.user.sub);
237:   }
238:
```

### src/modules/notificacoes/notificacoes.controller.ts:286:7
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
284:     return this.notificacoesService.findOne(
285:       getEmpresaId(req),
286:       req.user.sub,
287:       id,
288:     );
```

### src/modules/notificacoes/notificacoes.controller.ts:286:11
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
284:     return this.notificacoesService.findOne(
285:       getEmpresaId(req),
286:       req.user.sub,
287:       id,
288:     );
```

### src/modules/notificacoes/notificacoes.controller.ts:330:7
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
328:     return this.notificacoesService.marcarComoLida(
329:       getEmpresaId(req),
330:       req.user.sub,
331:       id,
332:     );
```

### src/modules/notificacoes/notificacoes.controller.ts:330:11
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
328:     return this.notificacoesService.marcarComoLida(
329:       getEmpresaId(req),
330:       req.user.sub,
331:       id,
332:     );
```

### src/modules/notificacoes/notificacoes.controller.ts:374:7
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
372:     return this.notificacoesService.arquivar(
373:       getEmpresaId(req),
374:       req.user.sub,
375:       id,
376:     );
```

### src/modules/notificacoes/notificacoes.controller.ts:374:11
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
372:     return this.notificacoesService.arquivar(
373:       getEmpresaId(req),
374:       req.user.sub,
375:       id,
376:     );
```

### src/modules/notificacoes/notificacoes.controller.ts:415:63
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
413:   })
414:   remove(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
415:     return this.notificacoesService.remove(getEmpresaId(req), req.user.sub, id);
416:   }
417: }
```

### src/modules/notificacoes/notificacoes.controller.ts:415:67
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
413:   })
414:   remove(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
415:     return this.notificacoesService.remove(getEmpresaId(req), req.user.sub, id);
416:   }
417: }
```

### src/modules/auth/auth.controller.ts:107:24
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AuditRequest`.
```text
105:   async login(@Body() loginDto: LoginDto, @Req() req: any) {
106:     return this.authService.login(loginDto, {
107:       ip: getRequestIp(req),
108:       userAgent: getRequestUserAgent(req),
109:       rota: getRequestRoute(req),
```

### src/modules/auth/auth.controller.ts:108:38
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AuditRequest`.
```text
106:     return this.authService.login(loginDto, {
107:       ip: getRequestIp(req),
108:       userAgent: getRequestUserAgent(req),
109:       rota: getRequestRoute(req),
110:       metodoHttp: getRequestMethod(req),
```

### src/modules/auth/auth.controller.ts:109:29
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AuditRequest`.
```text
107:       ip: getRequestIp(req),
108:       userAgent: getRequestUserAgent(req),
109:       rota: getRequestRoute(req),
110:       metodoHttp: getRequestMethod(req),
111:     });
```

### src/modules/auth/auth.controller.ts:110:36
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AuditRequest`.
```text
108:       userAgent: getRequestUserAgent(req),
109:       rota: getRequestRoute(req),
110:       metodoHttp: getRequestMethod(req),
111:     });
112:   }
```

### src/modules/auth/auth.controller.ts:166:36
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AdminAuthenticatedUser`.
```text
164:   })
165:   logout(@Req() req: any, @Body() dto: LogoutDto) {
166:     return this.authService.logout(req.user, dto);
167:   }
168:
```

### src/modules/auth/auth.controller.ts:166:40
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
164:   })
165:   logout(@Req() req: any, @Body() dto: LogoutDto) {
166:     return this.authService.logout(req.user, dto);
167:   }
168:
```

### src/modules/auth/auth.controller.ts:187:39
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AdminAuthenticatedUser`.
```text
185:   })
186:   logoutAll(@Req() req: any) {
187:     return this.authService.logoutAll(req.user);
188:   }
189:
```

### src/modules/auth/auth.controller.ts:187:43
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
185:   })
186:   logoutAll(@Req() req: any) {
187:     return this.authService.logoutAll(req.user);
188:   }
189:
```

### src/modules/auth/auth.controller.ts:216:43
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AdminAuthenticatedUser`.
```text
214:   })
215:   sessoes(@Req() req: any) {
216:     return this.authService.listarSessoes(req.user);
217:   }
218:
```

### src/modules/auth/auth.controller.ts:216:47
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
214:   })
215:   sessoes(@Req() req: any) {
216:     return this.authService.listarSessoes(req.user);
217:   }
218:
```

### src/modules/auth/auth.controller.ts:240:53
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AdminAuthenticatedUser`.
```text
238:   })
239:   revogarSessao(@Req() req: any, @Param('sessaoId') sessaoId: string) {
240:     return this.authService.revogarSessaoEspecifica(req.user, sessaoId);
241:   }
242:
```

### src/modules/auth/auth.controller.ts:240:57
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
238:   })
239:   revogarSessao(@Req() req: any, @Param('sessaoId') sessaoId: string) {
240:     return this.authService.revogarSessaoEspecifica(req.user, sessaoId);
241:   }
242:
```

### src/modules/auth/auth.controller.ts:267:5
- Regra: @typescript-eslint/no-unsafe-return
- Severidade: 2
- Mensagem: Unsafe return of a value of type `any`.
```text
265:   })
266:   perfil(@Req() req: any) {
267:     return req.user;
268:   }
269: }
```

### src/modules/auth/auth.controller.ts:267:16
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
265:   })
266:   perfil(@Req() req: any) {
267:     return req.user;
268:   }
269: }
```

### src/backup/backup.service.ts:128:11
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
126:     const cutoff = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
127:     let deletedCount = 0;
128:     const delegate = (this.prisma as any).sessao;
129:
130:     if (delegate?.deleteMany) {
```

### src/backup/backup.service.ts:128:43
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .sessao on an `any` value.
```text
126:     const cutoff = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
127:     let deletedCount = 0;
128:     const delegate = (this.prisma as any).sessao;
129:
130:     if (delegate?.deleteMany) {
```

### src/backup/backup.service.ts:130:19
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .deleteMany on an `any` value.
```text
128:     const delegate = (this.prisma as any).sessao;
129:
130:     if (delegate?.deleteMany) {
131:       const result = await delegate.deleteMany({
132:         where: {
```

### src/backup/backup.service.ts:131:13
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
129:
130:     if (delegate?.deleteMany) {
131:       const result = await delegate.deleteMany({
132:         where: {
133:           OR: [
```

### src/backup/backup.service.ts:131:28
- Regra: @typescript-eslint/no-unsafe-call
- Severidade: 2
- Mensagem: Unsafe call of an `any` typed value.
```text
129:
130:     if (delegate?.deleteMany) {
131:       const result = await delegate.deleteMany({
132:         where: {
133:           OR: [
```

### src/backup/backup.service.ts:131:37
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .deleteMany on an `any` value.
```text
129:
130:     if (delegate?.deleteMany) {
131:       const result = await delegate.deleteMany({
132:         where: {
133:           OR: [
```

### src/backup/backup.service.ts:140:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
138:       });
139:
140:       deletedCount = result?.count ?? 0;
141:     }
142:
```

### src/backup/backup.service.ts:140:30
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .count on an `any` value.
```text
138:       });
139:
140:       deletedCount = result?.count ?? 0;
141:     }
142:
```

### src/backup/backup.service.ts:354:13
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
352:   ) {
353:     try {
354:       const delegate = (this.prisma as any).auditoriaSistema;
355:
356:       if (!delegate?.create) {
```

### src/backup/backup.service.ts:354:45
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .auditoriaSistema on an `any` value.
```text
352:   ) {
353:     try {
354:       const delegate = (this.prisma as any).auditoriaSistema;
355:
356:       if (!delegate?.create) {
```

### src/backup/backup.service.ts:356:22
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .create on an `any` value.
```text
354:       const delegate = (this.prisma as any).auditoriaSistema;
355:
356:       if (!delegate?.create) {
357:         return;
358:       }
```

### src/backup/backup.service.ts:360:13
- Regra: @typescript-eslint/no-unsafe-call
- Severidade: 2
- Mensagem: Unsafe call of an `any` typed value.
```text
358:       }
359:
360:       await delegate.create({
361:         data: {
362:           empresaId: null,
```

### src/backup/backup.service.ts:360:22
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .create on an `any` value.
```text
358:       }
359:
360:       await delegate.create({
361:         data: {
362:           empresaId: null,
```

## Gate: READY-FOR-TYPED-CORRECTION-GRUPO05

Nenhuma alteracao de codigo, dependencia ou estado Git foi executada.