# Chat 04 - Bloco 47 - Contexto Lint Producao Grupo 04

Data: 2026-09-10 10:09:42 -03:00
- Projeto: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core
- Branch: main
- HEAD: 219dd066492ea23eadab10cb089957dd521cb816
- origin/main: 219dd066492ea23eadab10cb089957dd521cb816
- Status antes/depois: 322/322
- Staged antes/depois: 0/0
- Falhas de coleta: 0
- Findings: 107
- Erros: 88
- Warnings: 19

## Alvos

System.Object[]

## Findings detalhados

### src/modules/auth-cliente/auth-cliente.controller.ts:112:24
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AuditRequest`.
```text
110:   solicitarCodigo(@Req() req: any, @Body() dto: SolicitarCodigoDto) {
111:     return this.authClienteService.solicitarCodigo(dto, {
112:       ip: getRequestIp(req),
113:       userAgent: getRequestUserAgent(req),
114:       rota: getRequestRoute(req),
```

### src/modules/auth-cliente/auth-cliente.controller.ts:113:38
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AuditRequest`.
```text
111:     return this.authClienteService.solicitarCodigo(dto, {
112:       ip: getRequestIp(req),
113:       userAgent: getRequestUserAgent(req),
114:       rota: getRequestRoute(req),
115:       metodoHttp: getRequestMethod(req),
```

### src/modules/auth-cliente/auth-cliente.controller.ts:114:29
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AuditRequest`.
```text
112:       ip: getRequestIp(req),
113:       userAgent: getRequestUserAgent(req),
114:       rota: getRequestRoute(req),
115:       metodoHttp: getRequestMethod(req),
116:     });
```

### src/modules/auth-cliente/auth-cliente.controller.ts:115:36
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AuditRequest`.
```text
113:       userAgent: getRequestUserAgent(req),
114:       rota: getRequestRoute(req),
115:       metodoHttp: getRequestMethod(req),
116:     });
117:   }
```

### src/modules/auth-cliente/auth-cliente.controller.ts:208:24
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AuditRequest`.
```text
206:   verificarCodigo(@Req() req: any, @Body() dto: VerificarCodigoDto) {
207:     return this.authClienteService.verificarCodigo(dto, {
208:       ip: getRequestIp(req),
209:       userAgent: getRequestUserAgent(req),
210:       rota: getRequestRoute(req),
```

### src/modules/auth-cliente/auth-cliente.controller.ts:209:38
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AuditRequest`.
```text
207:     return this.authClienteService.verificarCodigo(dto, {
208:       ip: getRequestIp(req),
209:       userAgent: getRequestUserAgent(req),
210:       rota: getRequestRoute(req),
211:       metodoHttp: getRequestMethod(req),
```

### src/modules/auth-cliente/auth-cliente.controller.ts:210:29
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AuditRequest`.
```text
208:       ip: getRequestIp(req),
209:       userAgent: getRequestUserAgent(req),
210:       rota: getRequestRoute(req),
211:       metodoHttp: getRequestMethod(req),
212:     });
```

### src/modules/auth-cliente/auth-cliente.controller.ts:211:36
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AuditRequest`.
```text
209:       userAgent: getRequestUserAgent(req),
210:       rota: getRequestRoute(req),
211:       metodoHttp: getRequestMethod(req),
212:     });
213:   }
```

### src/modules/auth-cliente/auth-cliente.controller.ts:250:50
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `ClienteAuthenticatedUser`.
```text
248:   })
249:   logout(@Req() req: any, @Body() dto: LogoutClienteDto) {
250:     return this.authClienteService.logoutCliente(req.user, dto);
251:   }
252:
```

### src/modules/auth-cliente/auth-cliente.controller.ts:250:54
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
248:   })
249:   logout(@Req() req: any, @Body() dto: LogoutClienteDto) {
250:     return this.authClienteService.logoutCliente(req.user, dto);
251:   }
252:
```

### src/modules/auth-cliente/auth-cliente.controller.ts:260:53
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `ClienteAuthenticatedUser`.
```text
258:   })
259:   logoutAll(@Req() req: any) {
260:     return this.authClienteService.logoutAllCliente(req.user);
261:   }
262:
```

### src/modules/auth-cliente/auth-cliente.controller.ts:260:57
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
258:   })
259:   logoutAll(@Req() req: any) {
260:     return this.authClienteService.logoutAllCliente(req.user);
261:   }
262:
```

### src/modules/auth-cliente/auth-cliente.controller.ts:270:57
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `ClienteAuthenticatedUser`.
```text
268:   })
269:   sessoes(@Req() req: any) {
270:     return this.authClienteService.listarSessoesCliente(req.user);
271:   }
272:
```

### src/modules/auth-cliente/auth-cliente.controller.ts:270:61
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
268:   })
269:   sessoes(@Req() req: any) {
270:     return this.authClienteService.listarSessoesCliente(req.user);
271:   }
272:
```

### src/modules/auth-cliente/auth-cliente.controller.ts:304:7
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
302:   me(@Req() req: any) {
303:     return this.authClienteService.me(
304:       req.user.clienteId ?? req.user.sub,
305:       req.user.empresaId,
306:     );
```

### src/modules/auth-cliente/auth-cliente.controller.ts:304:11
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
302:   me(@Req() req: any) {
303:     return this.authClienteService.me(
304:       req.user.clienteId ?? req.user.sub,
305:       req.user.empresaId,
306:     );
```

### src/modules/auth-cliente/auth-cliente.controller.ts:304:33
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
302:   me(@Req() req: any) {
303:     return this.authClienteService.me(
304:       req.user.clienteId ?? req.user.sub,
305:       req.user.empresaId,
306:     );
```

### src/modules/auth-cliente/auth-cliente.controller.ts:305:7
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
303:     return this.authClienteService.me(
304:       req.user.clienteId ?? req.user.sub,
305:       req.user.empresaId,
306:     );
307:   }
```

### src/modules/auth-cliente/auth-cliente.controller.ts:305:11
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
303:     return this.authClienteService.me(
304:       req.user.clienteId ?? req.user.sub,
305:       req.user.empresaId,
306:     );
307:   }
```

### src/modules/auth-cliente/auth-cliente.controller.ts:355:7
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
353:   aceitarTermos(@Req() req: any, @Body() dto: AceitarTermosDto) {
354:     return this.authClienteService.aceitarTermos(
355:       req.user.clienteId ?? req.user.sub,
356:       req.user.empresaId,
357:       dto,
```

### src/modules/auth-cliente/auth-cliente.controller.ts:355:11
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
353:   aceitarTermos(@Req() req: any, @Body() dto: AceitarTermosDto) {
354:     return this.authClienteService.aceitarTermos(
355:       req.user.clienteId ?? req.user.sub,
356:       req.user.empresaId,
357:       dto,
```

### src/modules/auth-cliente/auth-cliente.controller.ts:355:33
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
353:   aceitarTermos(@Req() req: any, @Body() dto: AceitarTermosDto) {
354:     return this.authClienteService.aceitarTermos(
355:       req.user.clienteId ?? req.user.sub,
356:       req.user.empresaId,
357:       dto,
```

### src/modules/auth-cliente/auth-cliente.controller.ts:356:7
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
354:     return this.authClienteService.aceitarTermos(
355:       req.user.clienteId ?? req.user.sub,
356:       req.user.empresaId,
357:       dto,
358:       {
```

### src/modules/auth-cliente/auth-cliente.controller.ts:356:11
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
354:     return this.authClienteService.aceitarTermos(
355:       req.user.clienteId ?? req.user.sub,
356:       req.user.empresaId,
357:       dto,
358:       {
```

### src/modules/auth-cliente/auth-cliente.controller.ts:359:26
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AuditRequest`.
```text
357:       dto,
358:       {
359:         ip: getRequestIp(req),
360:         userAgent: getRequestUserAgent(req),
361:         rota: getRequestRoute(req),
```

### src/modules/auth-cliente/auth-cliente.controller.ts:360:40
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AuditRequest`.
```text
358:       {
359:         ip: getRequestIp(req),
360:         userAgent: getRequestUserAgent(req),
361:         rota: getRequestRoute(req),
362:         metodoHttp: getRequestMethod(req),
```

### src/modules/auth-cliente/auth-cliente.controller.ts:361:31
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AuditRequest`.
```text
359:         ip: getRequestIp(req),
360:         userAgent: getRequestUserAgent(req),
361:         rota: getRequestRoute(req),
362:         metodoHttp: getRequestMethod(req),
363:       },
```

### src/modules/auth-cliente/auth-cliente.controller.ts:362:38
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `AuditRequest`.
```text
360:         userAgent: getRequestUserAgent(req),
361:         rota: getRequestRoute(req),
362:         metodoHttp: getRequestMethod(req),
363:       },
364:     );
```

### src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts:212:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
210:   private montarDadosAuditoria(campanha: any) {
211:     return {
212:       id: campanha.id,
213:       empresaId: campanha.empresaId,
214:       nome: campanha.nome,
```

### src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts:212:20
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .id on an `any` value.
```text
210:   private montarDadosAuditoria(campanha: any) {
211:     return {
212:       id: campanha.id,
213:       empresaId: campanha.empresaId,
214:       nome: campanha.nome,
```

### src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts:213:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
211:     return {
212:       id: campanha.id,
213:       empresaId: campanha.empresaId,
214:       nome: campanha.nome,
215:       descricao: campanha.descricao,
```

### src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts:213:27
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .empresaId on an `any` value.
```text
211:     return {
212:       id: campanha.id,
213:       empresaId: campanha.empresaId,
214:       nome: campanha.nome,
215:       descricao: campanha.descricao,
```

### src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts:214:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
212:       id: campanha.id,
213:       empresaId: campanha.empresaId,
214:       nome: campanha.nome,
215:       descricao: campanha.descricao,
216:       tipo: campanha.tipo,
```

### src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts:214:22
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .nome on an `any` value.
```text
212:       id: campanha.id,
213:       empresaId: campanha.empresaId,
214:       nome: campanha.nome,
215:       descricao: campanha.descricao,
216:       tipo: campanha.tipo,
```

### src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts:215:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
213:       empresaId: campanha.empresaId,
214:       nome: campanha.nome,
215:       descricao: campanha.descricao,
216:       tipo: campanha.tipo,
217:       status: campanha.status,
```

### src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts:215:27
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .descricao on an `any` value.
```text
213:       empresaId: campanha.empresaId,
214:       nome: campanha.nome,
215:       descricao: campanha.descricao,
216:       tipo: campanha.tipo,
217:       status: campanha.status,
```

### src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts:216:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
214:       nome: campanha.nome,
215:       descricao: campanha.descricao,
216:       tipo: campanha.tipo,
217:       status: campanha.status,
218:       totalDestinatarios: campanha.totalDestinatarios,
```

### src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts:216:22
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .tipo on an `any` value.
```text
214:       nome: campanha.nome,
215:       descricao: campanha.descricao,
216:       tipo: campanha.tipo,
217:       status: campanha.status,
218:       totalDestinatarios: campanha.totalDestinatarios,
```

### src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts:217:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
215:       descricao: campanha.descricao,
216:       tipo: campanha.tipo,
217:       status: campanha.status,
218:       totalDestinatarios: campanha.totalDestinatarios,
219:       totalEnviadas: campanha.totalEnviadas,
```

### src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts:217:24
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .status on an `any` value.
```text
215:       descricao: campanha.descricao,
216:       tipo: campanha.tipo,
217:       status: campanha.status,
218:       totalDestinatarios: campanha.totalDestinatarios,
219:       totalEnviadas: campanha.totalEnviadas,
```

### src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts:218:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
216:       tipo: campanha.tipo,
217:       status: campanha.status,
218:       totalDestinatarios: campanha.totalDestinatarios,
219:       totalEnviadas: campanha.totalEnviadas,
220:       totalFalhas: campanha.totalFalhas,
```

### src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts:218:36
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .totalDestinatarios on an `any` value.
```text
216:       tipo: campanha.tipo,
217:       status: campanha.status,
218:       totalDestinatarios: campanha.totalDestinatarios,
219:       totalEnviadas: campanha.totalEnviadas,
220:       totalFalhas: campanha.totalFalhas,
```

### src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts:219:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
217:       status: campanha.status,
218:       totalDestinatarios: campanha.totalDestinatarios,
219:       totalEnviadas: campanha.totalEnviadas,
220:       totalFalhas: campanha.totalFalhas,
221:       createdAt: campanha.createdAt,
```

### src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts:219:31
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .totalEnviadas on an `any` value.
```text
217:       status: campanha.status,
218:       totalDestinatarios: campanha.totalDestinatarios,
219:       totalEnviadas: campanha.totalEnviadas,
220:       totalFalhas: campanha.totalFalhas,
221:       createdAt: campanha.createdAt,
```

### src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts:220:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
218:       totalDestinatarios: campanha.totalDestinatarios,
219:       totalEnviadas: campanha.totalEnviadas,
220:       totalFalhas: campanha.totalFalhas,
221:       createdAt: campanha.createdAt,
222:       updatedAt: campanha.updatedAt,
```

### src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts:220:29
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .totalFalhas on an `any` value.
```text
218:       totalDestinatarios: campanha.totalDestinatarios,
219:       totalEnviadas: campanha.totalEnviadas,
220:       totalFalhas: campanha.totalFalhas,
221:       createdAt: campanha.createdAt,
222:       updatedAt: campanha.updatedAt,
```

### src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts:221:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
219:       totalEnviadas: campanha.totalEnviadas,
220:       totalFalhas: campanha.totalFalhas,
221:       createdAt: campanha.createdAt,
222:       updatedAt: campanha.updatedAt,
223:     };
```

### src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts:221:27
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .createdAt on an `any` value.
```text
219:       totalEnviadas: campanha.totalEnviadas,
220:       totalFalhas: campanha.totalFalhas,
221:       createdAt: campanha.createdAt,
222:       updatedAt: campanha.updatedAt,
223:     };
```

### src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts:222:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
220:       totalFalhas: campanha.totalFalhas,
221:       createdAt: campanha.createdAt,
222:       updatedAt: campanha.updatedAt,
223:     };
224:   }
```

### src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts:222:27
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .updatedAt on an `any` value.
```text
220:       totalFalhas: campanha.totalFalhas,
221:       createdAt: campanha.createdAt,
222:       updatedAt: campanha.updatedAt,
223:     };
224:   }
```

### src/modules/tenant-publico/public-tenant.controller.ts:48:11
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
46:     const tenant = await this.tenantPublicService.resolverPorSlug(slug);
47:
48:     const dados = tenant as any;
49:
50:     return {
```

### src/modules/tenant-publico/public-tenant.controller.ts:52:9
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
50:     return {
51:       data: {
52:         nome: dados?.nome ?? null,
53:         slug: dados?.slug ?? slug,
54:         logo: dados?.logo ?? null,
```

### src/modules/tenant-publico/public-tenant.controller.ts:52:22
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .nome on an `any` value.
```text
50:     return {
51:       data: {
52:         nome: dados?.nome ?? null,
53:         slug: dados?.slug ?? slug,
54:         logo: dados?.logo ?? null,
```

### src/modules/tenant-publico/public-tenant.controller.ts:53:9
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
51:       data: {
52:         nome: dados?.nome ?? null,
53:         slug: dados?.slug ?? slug,
54:         logo: dados?.logo ?? null,
55:         corPrimaria: dados?.corPrimaria ?? null,
```

### src/modules/tenant-publico/public-tenant.controller.ts:53:22
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .slug on an `any` value.
```text
51:       data: {
52:         nome: dados?.nome ?? null,
53:         slug: dados?.slug ?? slug,
54:         logo: dados?.logo ?? null,
55:         corPrimaria: dados?.corPrimaria ?? null,
```

### src/modules/tenant-publico/public-tenant.controller.ts:54:9
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
52:         nome: dados?.nome ?? null,
53:         slug: dados?.slug ?? slug,
54:         logo: dados?.logo ?? null,
55:         corPrimaria: dados?.corPrimaria ?? null,
56:         corSecundaria: dados?.corSecundaria ?? null,
```

### src/modules/tenant-publico/public-tenant.controller.ts:54:22
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .logo on an `any` value.
```text
52:         nome: dados?.nome ?? null,
53:         slug: dados?.slug ?? slug,
54:         logo: dados?.logo ?? null,
55:         corPrimaria: dados?.corPrimaria ?? null,
56:         corSecundaria: dados?.corSecundaria ?? null,
```

### src/modules/tenant-publico/public-tenant.controller.ts:55:9
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
53:         slug: dados?.slug ?? slug,
54:         logo: dados?.logo ?? null,
55:         corPrimaria: dados?.corPrimaria ?? null,
56:         corSecundaria: dados?.corSecundaria ?? null,
57:         dominio: dados?.dominio ?? null,
```

### src/modules/tenant-publico/public-tenant.controller.ts:55:29
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .corPrimaria on an `any` value.
```text
53:         slug: dados?.slug ?? slug,
54:         logo: dados?.logo ?? null,
55:         corPrimaria: dados?.corPrimaria ?? null,
56:         corSecundaria: dados?.corSecundaria ?? null,
57:         dominio: dados?.dominio ?? null,
```

### src/modules/tenant-publico/public-tenant.controller.ts:56:9
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
54:         logo: dados?.logo ?? null,
55:         corPrimaria: dados?.corPrimaria ?? null,
56:         corSecundaria: dados?.corSecundaria ?? null,
57:         dominio: dados?.dominio ?? null,
58:         whatsapp:
```

### src/modules/tenant-publico/public-tenant.controller.ts:56:31
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .corSecundaria on an `any` value.
```text
54:         logo: dados?.logo ?? null,
55:         corPrimaria: dados?.corPrimaria ?? null,
56:         corSecundaria: dados?.corSecundaria ?? null,
57:         dominio: dados?.dominio ?? null,
58:         whatsapp:
```

### src/modules/tenant-publico/public-tenant.controller.ts:57:9
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
55:         corPrimaria: dados?.corPrimaria ?? null,
56:         corSecundaria: dados?.corSecundaria ?? null,
57:         dominio: dados?.dominio ?? null,
58:         whatsapp:
59:           dados?.whatsapp ??
```

### src/modules/tenant-publico/public-tenant.controller.ts:57:25
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .dominio on an `any` value.
```text
55:         corPrimaria: dados?.corPrimaria ?? null,
56:         corSecundaria: dados?.corSecundaria ?? null,
57:         dominio: dados?.dominio ?? null,
58:         whatsapp:
59:           dados?.whatsapp ??
```

### src/modules/tenant-publico/public-tenant.controller.ts:58:9
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
56:         corSecundaria: dados?.corSecundaria ?? null,
57:         dominio: dados?.dominio ?? null,
58:         whatsapp:
59:           dados?.whatsapp ??
60:           dados?.telefone ??
```

### src/modules/tenant-publico/public-tenant.controller.ts:59:18
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .whatsapp on an `any` value.
```text
57:         dominio: dados?.dominio ?? null,
58:         whatsapp:
59:           dados?.whatsapp ??
60:           dados?.telefone ??
61:           dados?.configuracaoWhatsApp?.numeroWhatsApp ??
```

### src/modules/tenant-publico/public-tenant.controller.ts:60:18
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .telefone on an `any` value.
```text
58:         whatsapp:
59:           dados?.whatsapp ??
60:           dados?.telefone ??
61:           dados?.configuracaoWhatsApp?.numeroWhatsApp ??
62:           null,
```

### src/modules/tenant-publico/public-tenant.controller.ts:61:18
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .configuracaoWhatsApp on an `any` value.
```text
59:           dados?.whatsapp ??
60:           dados?.telefone ??
61:           dados?.configuracaoWhatsApp?.numeroWhatsApp ??
62:           null,
63:         portalClienteAtivo:
```

### src/modules/tenant-publico/public-tenant.controller.ts:63:9
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
61:           dados?.configuracaoWhatsApp?.numeroWhatsApp ??
62:           null,
63:         portalClienteAtivo:
64:           dados?.portalClienteAtivo ?? dados?.ativoPortal ?? true,
65:       },
```

### src/modules/tenant-publico/public-tenant.controller.ts:64:18
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .portalClienteAtivo on an `any` value.
```text
62:           null,
63:         portalClienteAtivo:
64:           dados?.portalClienteAtivo ?? dados?.ativoPortal ?? true,
65:       },
66:       meta: {},
```

### src/modules/tenant-publico/public-tenant.controller.ts:64:47
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .ativoPortal on an `any` value.
```text
62:           null,
63:         portalClienteAtivo:
64:           dados?.portalClienteAtivo ?? dados?.ativoPortal ?? true,
65:       },
66:       meta: {},
```

### src/modules/pacotes/pacotes.service.ts:269:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
267:   private montarDadosAuditoria(pacote: any) {
268:     return {
269:       id: pacote.id,
270:       empresaId: pacote.empresaId,
271:       nome: pacote.nome,
```

### src/modules/pacotes/pacotes.service.ts:269:18
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .id on an `any` value.
```text
267:   private montarDadosAuditoria(pacote: any) {
268:     return {
269:       id: pacote.id,
270:       empresaId: pacote.empresaId,
271:       nome: pacote.nome,
```

### src/modules/pacotes/pacotes.service.ts:270:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
268:     return {
269:       id: pacote.id,
270:       empresaId: pacote.empresaId,
271:       nome: pacote.nome,
272:       descricao: pacote.descricao,
```

### src/modules/pacotes/pacotes.service.ts:270:25
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .empresaId on an `any` value.
```text
268:     return {
269:       id: pacote.id,
270:       empresaId: pacote.empresaId,
271:       nome: pacote.nome,
272:       descricao: pacote.descricao,
```

### src/modules/pacotes/pacotes.service.ts:271:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
269:       id: pacote.id,
270:       empresaId: pacote.empresaId,
271:       nome: pacote.nome,
272:       descricao: pacote.descricao,
273:       valor: Number(pacote.valor),
```

### src/modules/pacotes/pacotes.service.ts:271:20
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .nome on an `any` value.
```text
269:       id: pacote.id,
270:       empresaId: pacote.empresaId,
271:       nome: pacote.nome,
272:       descricao: pacote.descricao,
273:       valor: Number(pacote.valor),
```

### src/modules/pacotes/pacotes.service.ts:272:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
270:       empresaId: pacote.empresaId,
271:       nome: pacote.nome,
272:       descricao: pacote.descricao,
273:       valor: Number(pacote.valor),
274:       quantidadeSessoes: pacote.quantidadeSessoes,
```

### src/modules/pacotes/pacotes.service.ts:272:25
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .descricao on an `any` value.
```text
270:       empresaId: pacote.empresaId,
271:       nome: pacote.nome,
272:       descricao: pacote.descricao,
273:       valor: Number(pacote.valor),
274:       quantidadeSessoes: pacote.quantidadeSessoes,
```

### src/modules/pacotes/pacotes.service.ts:273:28
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .valor on an `any` value.
```text
271:       nome: pacote.nome,
272:       descricao: pacote.descricao,
273:       valor: Number(pacote.valor),
274:       quantidadeSessoes: pacote.quantidadeSessoes,
275:       validadeDias: pacote.validadeDias,
```

### src/modules/pacotes/pacotes.service.ts:274:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
272:       descricao: pacote.descricao,
273:       valor: Number(pacote.valor),
274:       quantidadeSessoes: pacote.quantidadeSessoes,
275:       validadeDias: pacote.validadeDias,
276:       ativo: pacote.ativo,
```

### src/modules/pacotes/pacotes.service.ts:274:33
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .quantidadeSessoes on an `any` value.
```text
272:       descricao: pacote.descricao,
273:       valor: Number(pacote.valor),
274:       quantidadeSessoes: pacote.quantidadeSessoes,
275:       validadeDias: pacote.validadeDias,
276:       ativo: pacote.ativo,
```

### src/modules/pacotes/pacotes.service.ts:275:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
273:       valor: Number(pacote.valor),
274:       quantidadeSessoes: pacote.quantidadeSessoes,
275:       validadeDias: pacote.validadeDias,
276:       ativo: pacote.ativo,
277:       createdAt: pacote.createdAt,
```

### src/modules/pacotes/pacotes.service.ts:275:28
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .validadeDias on an `any` value.
```text
273:       valor: Number(pacote.valor),
274:       quantidadeSessoes: pacote.quantidadeSessoes,
275:       validadeDias: pacote.validadeDias,
276:       ativo: pacote.ativo,
277:       createdAt: pacote.createdAt,
```

### src/modules/pacotes/pacotes.service.ts:276:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
274:       quantidadeSessoes: pacote.quantidadeSessoes,
275:       validadeDias: pacote.validadeDias,
276:       ativo: pacote.ativo,
277:       createdAt: pacote.createdAt,
278:       updatedAt: pacote.updatedAt,
```

### src/modules/pacotes/pacotes.service.ts:276:21
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .ativo on an `any` value.
```text
274:       quantidadeSessoes: pacote.quantidadeSessoes,
275:       validadeDias: pacote.validadeDias,
276:       ativo: pacote.ativo,
277:       createdAt: pacote.createdAt,
278:       updatedAt: pacote.updatedAt,
```

### src/modules/pacotes/pacotes.service.ts:277:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
275:       validadeDias: pacote.validadeDias,
276:       ativo: pacote.ativo,
277:       createdAt: pacote.createdAt,
278:       updatedAt: pacote.updatedAt,
279:     };
```

### src/modules/pacotes/pacotes.service.ts:277:25
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .createdAt on an `any` value.
```text
275:       validadeDias: pacote.validadeDias,
276:       ativo: pacote.ativo,
277:       createdAt: pacote.createdAt,
278:       updatedAt: pacote.updatedAt,
279:     };
```

### src/modules/pacotes/pacotes.service.ts:278:7
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
276:       ativo: pacote.ativo,
277:       createdAt: pacote.createdAt,
278:       updatedAt: pacote.updatedAt,
279:     };
280:   }
```

### src/modules/pacotes/pacotes.service.ts:278:25
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .updatedAt on an `any` value.
```text
276:       ativo: pacote.ativo,
277:       createdAt: pacote.createdAt,
278:       updatedAt: pacote.updatedAt,
279:     };
280:   }
```

### src/modules/scheduler/scheduler.service.ts:5:3
- Regra: @typescript-eslint/no-unused-vars
- Severidade: 2
- Mensagem: 'AcaoAuditoria' is defined but never used.
```text
3: import { Cron } from '@nestjs/schedule';
4: import {
5:   AcaoAuditoria,
6:   StatusAuditoria,
7:   TipoUsuarioAuditoria,
```

### src/modules/scheduler/scheduler.service.ts:6:3
- Regra: @typescript-eslint/no-unused-vars
- Severidade: 2
- Mensagem: 'StatusAuditoria' is defined but never used.
```text
4: import {
5:   AcaoAuditoria,
6:   StatusAuditoria,
7:   TipoUsuarioAuditoria,
8: } from '@prisma/client';
```

### src/modules/scheduler/scheduler.service.ts:7:3
- Regra: @typescript-eslint/no-unused-vars
- Severidade: 2
- Mensagem: 'TipoUsuarioAuditoria' is defined but never used.
```text
5:   AcaoAuditoria,
6:   StatusAuditoria,
7:   TipoUsuarioAuditoria,
8: } from '@prisma/client';
9: import { QueuesService } from '../../queues/services/queues.service';
```

### src/modules/scheduler/scheduler.service.ts:301:62
- Regra: @typescript-eslint/require-await
- Severidade: 2
- Mensagem: Async arrow function has no 'await' expression.
```text
299:   })
300:   async processarLimpezaAuditoriaAntiga() {
301:     return this.executarRotina('limpeza_auditoria', async () => {
302:       this.logger.warn(
303:         '[SCHEDULER] limpeza de auditoria apenas registrada; nenhuma auditoria crÃ­tica serÃ¡ apagada.',
```

### src/modules/scheduler/scheduler.service.ts:369:9
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
367:     return {
368:       scheduler: {
369:         enabled:
370:           typeof (this as any).isEnabled === 'function'
371:             ? (this as any).isEnabled()
```

### src/modules/scheduler/scheduler.service.ts:370:32
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .isEnabled on an `any` value.
```text
368:       scheduler: {
369:         enabled:
370:           typeof (this as any).isEnabled === 'function'
371:             ? (this as any).isEnabled()
372:             : true,
```

### src/modules/scheduler/scheduler.service.ts:371:15
- Regra: @typescript-eslint/no-unsafe-call
- Severidade: 2
- Mensagem: Unsafe call of an `any` typed value.
```text
369:         enabled:
370:           typeof (this as any).isEnabled === 'function'
371:             ? (this as any).isEnabled()
372:             : true,
373:         timezone:
```

### src/modules/scheduler/scheduler.service.ts:371:29
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .isEnabled on an `any` value.
```text
369:         enabled:
370:           typeof (this as any).isEnabled === 'function'
371:             ? (this as any).isEnabled()
372:             : true,
373:         timezone:
```

### src/modules/scheduler/scheduler.service.ts:373:9
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
371:             ? (this as any).isEnabled()
372:             : true,
373:         timezone:
374:           typeof (this as any).getTimezone === 'function'
375:             ? (this as any).getTimezone()
```

### src/modules/scheduler/scheduler.service.ts:374:32
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .getTimezone on an `any` value.
```text
372:             : true,
373:         timezone:
374:           typeof (this as any).getTimezone === 'function'
375:             ? (this as any).getTimezone()
376:             : (process.env.SCHEDULER_TIMEZONE ?? 'America/Sao_Paulo'),
```

### src/modules/scheduler/scheduler.service.ts:375:15
- Regra: @typescript-eslint/no-unsafe-call
- Severidade: 2
- Mensagem: Unsafe call of an `any` typed value.
```text
373:         timezone:
374:           typeof (this as any).getTimezone === 'function'
375:             ? (this as any).getTimezone()
376:             : (process.env.SCHEDULER_TIMEZONE ?? 'America/Sao_Paulo'),
377:       },
```

### src/modules/scheduler/scheduler.service.ts:375:29
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .getTimezone on an `any` value.
```text
373:         timezone:
374:           typeof (this as any).getTimezone === 'function'
375:             ? (this as any).getTimezone()
376:             : (process.env.SCHEDULER_TIMEZONE ?? 'America/Sao_Paulo'),
377:       },
```

### src/modules/scheduler/scheduler.service.ts:407:11
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
405:       for (const [name, queue] of Object.entries(queues) as [string, any][]) {
406:         result[name] = {
407:           completed: await queue.clean(completedGraceMs, limit, 'completed'),
408:           failed: await queue.clean(failedGraceMs, limit, 'failed'),
409:         };
```

### src/modules/scheduler/scheduler.service.ts:407:28
- Regra: @typescript-eslint/no-unsafe-call
- Severidade: 2
- Mensagem: Unsafe call of an `any` typed value.
```text
405:       for (const [name, queue] of Object.entries(queues) as [string, any][]) {
406:         result[name] = {
407:           completed: await queue.clean(completedGraceMs, limit, 'completed'),
408:           failed: await queue.clean(failedGraceMs, limit, 'failed'),
409:         };
```

### src/modules/scheduler/scheduler.service.ts:407:34
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .clean on an `any` value.
```text
405:       for (const [name, queue] of Object.entries(queues) as [string, any][]) {
406:         result[name] = {
407:           completed: await queue.clean(completedGraceMs, limit, 'completed'),
408:           failed: await queue.clean(failedGraceMs, limit, 'failed'),
409:         };
```

### src/modules/scheduler/scheduler.service.ts:408:11
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
406:         result[name] = {
407:           completed: await queue.clean(completedGraceMs, limit, 'completed'),
408:           failed: await queue.clean(failedGraceMs, limit, 'failed'),
409:         };
410:       }
```

### src/modules/scheduler/scheduler.service.ts:408:25
- Regra: @typescript-eslint/no-unsafe-call
- Severidade: 2
- Mensagem: Unsafe call of an `any` typed value.
```text
406:         result[name] = {
407:           completed: await queue.clean(completedGraceMs, limit, 'completed'),
408:           failed: await queue.clean(failedGraceMs, limit, 'failed'),
409:         };
410:       }
```

### src/modules/scheduler/scheduler.service.ts:408:31
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .clean on an `any` value.
```text
406:         result[name] = {
407:           completed: await queue.clean(completedGraceMs, limit, 'completed'),
408:           failed: await queue.clean(failedGraceMs, limit, 'failed'),
409:         };
410:       }
```

## Gate: READY-FOR-TYPED-CORRECTION-GRUPO04

Nenhuma alteracao de codigo, dependencia ou estado Git foi executada.