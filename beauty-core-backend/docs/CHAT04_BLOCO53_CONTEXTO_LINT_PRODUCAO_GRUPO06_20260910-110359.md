# Chat 04 - Bloco 53 - Contexto Lint Producao Grupo 06

Data: 2026-09-10 11:03:59 -03:00
- Projeto: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core
- Branch: main
- HEAD: 219dd066492ea23eadab10cb089957dd521cb816
- origin/main: 219dd066492ea23eadab10cb089957dd521cb816
- Status antes/depois: 331/331
- Staged antes/depois: 0/0
- Falhas de coleta: 0
- Findings: 56
- Erros: 36
- Warnings: 20

## Alvos

System.Object[]

## Findings detalhados

### src/common/metrics/middleware/metrics.middleware.ts:12:5
- Regra: @typescript-eslint/no-unsafe-call
- Severidade: 2
- Mensagem: Unsafe call of an `any` typed value.
```text
10:     const startedAt = process.hrtime.bigint();
11:
12:     response.on('finish', () => {
13:       const durationMs =
14:         Number(process.hrtime.bigint() - startedAt) / 1_000_000;
```

### src/common/metrics/middleware/metrics.middleware.ts:12:14
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .on on an `any` value.
```text
10:     const startedAt = process.hrtime.bigint();
11:
12:     response.on('finish', () => {
13:       const durationMs =
14:         Number(process.hrtime.bigint() - startedAt) / 1_000_000;
```

### src/common/metrics/middleware/metrics.middleware.ts:17:9
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
15:
16:       this.metricsService.observeHttpRequest({
17:         method: request?.method ?? 'UNKNOWN',
18:         route: this.resolveRoute(request),
19:         statusCode: Number(response?.statusCode ?? 0),
```

### src/common/metrics/middleware/metrics.middleware.ts:17:26
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .method on an `any` value.
```text
15:
16:       this.metricsService.observeHttpRequest({
17:         method: request?.method ?? 'UNKNOWN',
18:         route: this.resolveRoute(request),
19:         statusCode: Number(response?.statusCode ?? 0),
```

### src/common/metrics/middleware/metrics.middleware.ts:19:38
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .statusCode on an `any` value.
```text
17:         method: request?.method ?? 'UNKNOWN',
18:         route: this.resolveRoute(request),
19:         statusCode: Number(response?.statusCode ?? 0),
20:         durationMs,
21:       });
```

### src/common/metrics/middleware/metrics.middleware.ts:28:11
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
26:
27:   private resolveRoute(request: any): string {
28:     const baseUrl = request?.baseUrl ?? '';
29:     const routePath = request?.route?.path;
30:
```

### src/common/metrics/middleware/metrics.middleware.ts:28:30
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .baseUrl on an `any` value.
```text
26:
27:   private resolveRoute(request: any): string {
28:     const baseUrl = request?.baseUrl ?? '';
29:     const routePath = request?.route?.path;
30:
```

### src/common/metrics/middleware/metrics.middleware.ts:29:11
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
27:   private resolveRoute(request: any): string {
28:     const baseUrl = request?.baseUrl ?? '';
29:     const routePath = request?.route?.path;
30:
31:     if (routePath) {
```

### src/common/metrics/middleware/metrics.middleware.ts:29:32
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .route on an `any` value.
```text
27:   private resolveRoute(request: any): string {
28:     const baseUrl = request?.baseUrl ?? '';
29:     const routePath = request?.route?.path;
30:
31:     if (routePath) {
```

### src/common/metrics/middleware/metrics.middleware.ts:35:41
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .originalUrl on an `any` value.
```text
33:     }
34:
35:     const originalUrl = String(request?.originalUrl ?? request?.url ?? '');
36:     const path = String(request?.path ?? originalUrl ?? 'unknown');
37:
```

### src/common/metrics/middleware/metrics.middleware.ts:35:65
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .url on an `any` value.
```text
33:     }
34:
35:     const originalUrl = String(request?.originalUrl ?? request?.url ?? '');
36:     const path = String(request?.path ?? originalUrl ?? 'unknown');
37:
```

### src/common/metrics/middleware/metrics.middleware.ts:36:34
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .path on an `any` value.
```text
34:
35:     const originalUrl = String(request?.originalUrl ?? request?.url ?? '');
36:     const path = String(request?.path ?? originalUrl ?? 'unknown');
37:
38:     return path.replace(/\?.*$/, '') || 'unknown';
```

### src/modules/arquivos/arquivos.controller.ts:242:7
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `{ sub?: string | undefined; id?: string | undefined; role: Role; empresaId: string; }`.
```text
240:       usuarioId,
241:       file,
242:       req.user,
243:     );
244:   }
```

### src/modules/arquivos/arquivos.controller.ts:242:11
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
240:       usuarioId,
241:       file,
242:       req.user,
243:     );
244:   }
```

### src/modules/arquivos/arquivos.controller.ts:313:7
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `{ sub?: string | undefined; id?: string | undefined; role: Role; empresaId: string; }`.
```text
311:       usuarioId,
312:       file,
313:       req.user,
314:     );
315:   }
```

### src/modules/arquivos/arquivos.controller.ts:313:11
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
311:       usuarioId,
312:       file,
313:       req.user,
314:     );
315:   }
```

### src/modules/arquivos/arquivos.controller.ts:804:11
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
802:     @Body() dto: UploadDocumentoPrivadoDto,
803:   ) {
804:     const empresaId = req.user.empresaId;
805:     const usuarioId = req.user.sub || req.user.id || req.user.usuarioId;
806:
```

### src/modules/arquivos/arquivos.controller.ts:804:27
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
802:     @Body() dto: UploadDocumentoPrivadoDto,
803:   ) {
804:     const empresaId = req.user.empresaId;
805:     const usuarioId = req.user.sub || req.user.id || req.user.usuarioId;
806:
```

### src/modules/arquivos/arquivos.controller.ts:805:11
- Regra: @typescript-eslint/no-unsafe-assignment
- Severidade: 2
- Mensagem: Unsafe assignment of an `any` value.
```text
803:   ) {
804:     const empresaId = req.user.empresaId;
805:     const usuarioId = req.user.sub || req.user.id || req.user.usuarioId;
806:
807:     return this.arquivosService.uploadPrivadoDocumento(
```

### src/modules/arquivos/arquivos.controller.ts:805:27
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
803:   ) {
804:     const empresaId = req.user.empresaId;
805:     const usuarioId = req.user.sub || req.user.id || req.user.usuarioId;
806:
807:     return this.arquivosService.uploadPrivadoDocumento(
```

### src/modules/arquivos/arquivos.controller.ts:805:43
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
803:   ) {
804:     const empresaId = req.user.empresaId;
805:     const usuarioId = req.user.sub || req.user.id || req.user.usuarioId;
806:
807:     return this.arquivosService.uploadPrivadoDocumento(
```

### src/modules/arquivos/arquivos.controller.ts:805:58
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
803:   ) {
804:     const empresaId = req.user.empresaId;
805:     const usuarioId = req.user.sub || req.user.id || req.user.usuarioId;
806:
807:     return this.arquivosService.uploadPrivadoDocumento(
```

### src/modules/arquivos/arquivos.controller.ts:808:7
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
806:
807:     return this.arquivosService.uploadPrivadoDocumento(
808:       empresaId,
809:       usuarioId,
810:       file,
```

### src/modules/arquivos/arquivos.controller.ts:809:7
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
807:     return this.arquivosService.uploadPrivadoDocumento(
808:       empresaId,
809:       usuarioId,
810:       file,
811:       dto,
```

### src/modules/cupons/cupons.controller.ts:32:38
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
30:   @Roles('ADMIN', 'GERENTE')
31:   create(@Req() req, @Body() dto: CreateCupomDto) {
32:     return this.cuponsService.create(req.user.empresaId, dto);
33:   }
34:
```

### src/modules/cupons/cupons.controller.ts:32:42
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
30:   @Roles('ADMIN', 'GERENTE')
31:   create(@Req() req, @Body() dto: CreateCupomDto) {
32:     return this.cuponsService.create(req.user.empresaId, dto);
33:   }
34:
```

### src/modules/cupons/cupons.controller.ts:38:39
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
36:   @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
37:   findAll(@Req() req) {
38:     return this.cuponsService.findAll(req.user.empresaId);
39:   }
40:
```

### src/modules/cupons/cupons.controller.ts:38:43
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
36:   @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
37:   findAll(@Req() req) {
38:     return this.cuponsService.findAll(req.user.empresaId);
39:   }
40:
```

### src/modules/cupons/cupons.controller.ts:44:39
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
42:   @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
43:   findOne(@Req() req, @Param('id', ParseUUIDPipe) id: string) {
44:     return this.cuponsService.findOne(req.user.empresaId, id);
45:   }
46:
```

### src/modules/cupons/cupons.controller.ts:44:43
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
42:   @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
43:   findOne(@Req() req, @Param('id', ParseUUIDPipe) id: string) {
44:     return this.cuponsService.findOne(req.user.empresaId, id);
45:   }
46:
```

### src/modules/cupons/cupons.controller.ts:54:38
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
52:     @Body() dto: UpdateCupomDto,
53:   ) {
54:     return this.cuponsService.update(req.user.empresaId, id, dto);
55:   }
56:
```

### src/modules/cupons/cupons.controller.ts:54:42
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
52:     @Body() dto: UpdateCupomDto,
53:   ) {
54:     return this.cuponsService.update(req.user.empresaId, id, dto);
55:   }
56:
```

### src/modules/cupons/cupons.controller.ts:60:40
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
58:   @Roles('ADMIN', 'GERENTE')
59:   inativar(@Req() req, @Param('id', ParseUUIDPipe) id: string) {
60:     return this.cuponsService.inativar(req.user.empresaId, id);
61:   }
62:
```

### src/modules/cupons/cupons.controller.ts:60:44
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
58:   @Roles('ADMIN', 'GERENTE')
59:   inativar(@Req() req, @Param('id', ParseUUIDPipe) id: string) {
60:     return this.cuponsService.inativar(req.user.empresaId, id);
61:   }
62:
```

### src/modules/cupons/cupons.controller.ts:66:39
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
64:   @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
65:   validar(@Req() req, @Body() dto: ValidarCupomDto) {
66:     return this.cuponsService.validar(req.user.empresaId, dto);
67:   }
68: }
```

### src/modules/cupons/cupons.controller.ts:66:43
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
64:   @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
65:   validar(@Req() req, @Body() dto: ValidarCupomDto) {
66:     return this.cuponsService.validar(req.user.empresaId, dto);
67:   }
68: }
```

### src/modules/categorias-financeiras/categorias-financeiras.controller.ts:81:53
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
79:   })
80:   create(@Req() req: any, @Body() dto: CreateCategoriaFinanceiraDto) {
81:     return this.categoriasFinanceirasService.create(req.user.empresaId, dto);
82:   }
83:
```

### src/modules/categorias-financeiras/categorias-financeiras.controller.ts:81:57
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
79:   })
80:   create(@Req() req: any, @Body() dto: CreateCategoriaFinanceiraDto) {
81:     return this.categoriasFinanceirasService.create(req.user.empresaId, dto);
82:   }
83:
```

### src/modules/categorias-financeiras/categorias-financeiras.controller.ts:115:54
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
113:   })
114:   findAll(@Req() req: any) {
115:     return this.categoriasFinanceirasService.findAll(req.user.empresaId);
116:   }
117:
```

### src/modules/categorias-financeiras/categorias-financeiras.controller.ts:115:58
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
113:   })
114:   findAll(@Req() req: any) {
115:     return this.categoriasFinanceirasService.findAll(req.user.empresaId);
116:   }
117:
```

### src/modules/categorias-financeiras/categorias-financeiras.controller.ts:160:54
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
158:   })
159:   findOne(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
160:     return this.categoriasFinanceirasService.findOne(req.user.empresaId, id);
161:   }
162:
```

### src/modules/categorias-financeiras/categorias-financeiras.controller.ts:160:58
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
158:   })
159:   findOne(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
160:     return this.categoriasFinanceirasService.findOne(req.user.empresaId, id);
161:   }
162:
```

### src/modules/categorias-financeiras/categorias-financeiras.controller.ts:215:7
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
213:   ) {
214:     return this.categoriasFinanceirasService.update(
215:       req.user.empresaId,
216:       id,
217:       dto,
```

### src/modules/categorias-financeiras/categorias-financeiras.controller.ts:215:11
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
213:   ) {
214:     return this.categoriasFinanceirasService.update(
215:       req.user.empresaId,
216:       id,
217:       dto,
```

### src/modules/categorias-financeiras/categorias-financeiras.controller.ts:263:55
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
261:   })
262:   inativar(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
263:     return this.categoriasFinanceirasService.inativar(req.user.empresaId, id);
264:   }
265: }
```

### src/modules/categorias-financeiras/categorias-financeiras.controller.ts:263:59
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
261:   })
262:   inativar(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
263:     return this.categoriasFinanceirasService.inativar(req.user.empresaId, id);
264:   }
265: }
```

### src/modules/beneficios/beneficios.controller.ts:79:42
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
77:   })
78:   create(@Req() req: any, @Body() dto: CreateBeneficioDto) {
79:     return this.beneficiosService.create(req.user.empresaId, dto);
80:   }
81:
```

### src/modules/beneficios/beneficios.controller.ts:79:46
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
77:   })
78:   create(@Req() req: any, @Body() dto: CreateBeneficioDto) {
79:     return this.beneficiosService.create(req.user.empresaId, dto);
80:   }
81:
```

### src/modules/beneficios/beneficios.controller.ts:114:43
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
112:   })
113:   findAll(@Req() req: any) {
114:     return this.beneficiosService.findAll(req.user.empresaId);
115:   }
116:
```

### src/modules/beneficios/beneficios.controller.ts:114:47
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
112:   })
113:   findAll(@Req() req: any) {
114:     return this.beneficiosService.findAll(req.user.empresaId);
115:   }
116:
```

### src/modules/beneficios/beneficios.controller.ts:159:43
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
157:   })
158:   findOne(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
159:     return this.beneficiosService.findOne(req.user.empresaId, id);
160:   }
161:
```

### src/modules/beneficios/beneficios.controller.ts:159:47
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
157:   })
158:   findOne(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
159:     return this.beneficiosService.findOne(req.user.empresaId, id);
160:   }
161:
```

### src/modules/beneficios/beneficios.controller.ts:213:42
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
211:     @Body() dto: UpdateBeneficioDto,
212:   ) {
213:     return this.beneficiosService.update(req.user.empresaId, id, dto);
214:   }
215:
```

### src/modules/beneficios/beneficios.controller.ts:213:46
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
211:     @Body() dto: UpdateBeneficioDto,
212:   ) {
213:     return this.beneficiosService.update(req.user.empresaId, id, dto);
214:   }
215:
```

### src/modules/beneficios/beneficios.controller.ts:258:44
- Regra: @typescript-eslint/no-unsafe-argument
- Severidade: 1
- Mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
```text
256:   })
257:   inativar(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
258:     return this.beneficiosService.inativar(req.user.empresaId, id);
259:   }
260: }
```

### src/modules/beneficios/beneficios.controller.ts:258:48
- Regra: @typescript-eslint/no-unsafe-member-access
- Severidade: 2
- Mensagem: Unsafe member access .user on an `any` value.
```text
256:   })
257:   inativar(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
258:     return this.beneficiosService.inativar(req.user.empresaId, id);
259:   }
260: }
```

## Gate: READY-FOR-TYPED-CORRECTION-GRUPO06

Nenhuma alteracao de codigo, dependencia ou estado Git foi executada.