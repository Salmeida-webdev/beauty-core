# Beauty Core - Chat B - B138 - Gate global backend

- Inicio: 2026-09-15T15:40:55.4203810-03:00
- Fim: 2026-09-15T15:41:46.8974231-03:00
- Script: B138-terminal-v1
- Modo: somente validacao; nenhum arquivo foi alterado.

## ESLint global

- Exit code: 1
```text

> beauty-core-backend@0.0.1 lint
> eslint "{src,apps,libs,test}/**/*.ts" --fix


C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\e2e\auditoria.e2e-spec.ts
   1:18  error    A `require()` style import is forbidden                              @typescript-eslint/no-require-imports
  26:30  error    Unsafe member access .auditoriaSistema on an `any` value             @typescript-eslint/no-unsafe-member-access
  30:11  error    Unsafe assignment of an `any` value                                  @typescript-eslint/no-unsafe-assignment
  30:30  error    Unsafe call of an `any` typed value                                  @typescript-eslint/no-unsafe-call
  30:50  error    Unsafe member access .auditoriaSistema on an `any` value             @typescript-eslint/no-unsafe-member-access
  34:23  error    Unsafe member access .length on an `any` value                       @typescript-eslint/no-unsafe-member-access
  40:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\e2e\auth-admin.e2e-spec.ts
   1:18  error    A `require()` style import is forbidden                              @typescript-eslint/no-require-imports
  23:36  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  34:21  error    Unsafe member access .access_token on an `any` value                 @typescript-eslint/no-unsafe-member-access
  35:23  error    Unsafe member access .accessToken on an `any` value                  @typescript-eslint/no-unsafe-member-access
  36:23  error    Unsafe member access .token on an `any` value                        @typescript-eslint/no-unsafe-member-access
  41:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  59:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  72:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  83:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  97:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\e2e\auth-cliente.e2e-spec.ts
    1:18  error    A `require()` style import is forbidden                                                                                                                                    @typescript-eslint/no-require-imports
   23:36  warning  Unsafe argument of type `any` assigned to a parameter of type `App`                                                                                                        @typescript-eslint/no-unsafe-argument
   25:22  error    Invalid operand for a '+' operation. Operands must each be a number or string, allowing a string + any of: `any`, `boolean`, `null`, `RegExp`, `undefined`. Got `unknown`  @typescript-eslint/restrict-plus-operands
   34:11  error    Unsafe assignment of an `any` value                                                                                                                                        @typescript-eslint/no-unsafe-assignment
   35:21  error    Unsafe member access .codigoDesenvolvimento on an `any` value                                                                                                              @typescript-eslint/no-unsafe-member-access
   36:21  error    Unsafe member access .codigo on an `any` value                                                                                                                             @typescript-eslint/no-unsafe-member-access
   37:21  error    Unsafe member access .devCode on an `any` value                                                                                                                            @typescript-eslint/no-unsafe-member-access
   38:21  error    Unsafe member access .code on an `any` value                                                                                                                               @typescript-eslint/no-unsafe-member-access
   40:11  error    Unsafe assignment of an `any` value                                                                                                                                        @typescript-eslint/no-unsafe-assignment
   40:28  error    Unsafe call of an `any` typed value                                                                                                                                        @typescript-eslint/no-unsafe-call
   40:48  error    Unsafe member access .codigoAcessoCliente on an `any` value                                                                                                                @typescript-eslint/no-unsafe-member-access
   51:21  error    Unsafe member access .codigo on an `any` value                                                                                                                             @typescript-eslint/no-unsafe-member-access
   52:21  error    Unsafe member access .codigoHash on an `any` value                                                                                                                         @typescript-eslint/no-unsafe-member-access
   53:21  error    Unsafe member access .codigoHash on an `any` value                                                                                                                         @typescript-eslint/no-unsafe-member-access
   56:23  error    Unsafe member access .codigo on an `any` value                                                                                                                             @typescript-eslint/no-unsafe-member-access
   57:23  error    Unsafe member access .codigoHash on an `any` value                                                                                                                         @typescript-eslint/no-unsafe-member-access
   82:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`                                                                                                        @typescript-eslint/no-unsafe-argument
   99:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`                                                                                                        @typescript-eslint/no-unsafe-argument
  112:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`                                                                                                        @typescript-eslint/no-unsafe-argument
  130:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`                                                                                                        @typescript-eslint/no-unsafe-argument

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\e2e\cliente-area.e2e-spec.ts
   1:18  error    A `require()` style import is forbidden                              @typescript-eslint/no-require-imports
  33:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  40:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\e2e\health.e2e-spec.ts
   1:18  error    A `require()` style import is forbidden                              @typescript-eslint/no-require-imports
  24:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  28:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  36:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  49:21  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  63:21  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\e2e\lgpd-runtime.e2e-spec.ts
   75:36  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
   91:36  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  112:39  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\e2e\meta-whatsapp-webhook.e2e-spec.ts
   25:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
   34:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
   83:33  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
   89:23  error    Unsafe member access .received on an `any` value                     @typescript-eslint/no-unsafe-member-access
   90:23  error    Unsafe member access .duplicates on an `any` value                   @typescript-eslint/no-unsafe-member-access
   92:37  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
   98:27  error    Unsafe member access .duplicates on an `any` value                   @typescript-eslint/no-unsafe-member-access
  107:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\e2e\metrics.e2e-spec.ts
   1:18  error    A `require()` style import is forbidden                              @typescript-eslint/no-require-imports
  42:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  46:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  53:36  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  62:36  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\e2e\multiempresa.e2e-spec.ts
   2:18  error    A `require()` style import is forbidden                                 @typescript-eslint/no-require-imports
  25:11  error    Unsafe assignment of an `any` value                                     @typescript-eslint/no-unsafe-assignment
  25:26  error    Unsafe call of an `any` typed value                                     @typescript-eslint/no-unsafe-call
  25:46  error    Unsafe member access .usuario on an `any` value                         @typescript-eslint/no-unsafe-member-access
  36:11  error    Unsafe assignment of an `any` value                                     @typescript-eslint/no-unsafe-assignment
  36:28  error    Unsafe call of an `any` typed value                                     @typescript-eslint/no-unsafe-call
  36:48  error    Unsafe member access .cliente on an `any` value                         @typescript-eslint/no-unsafe-member-access
  48:5   error    Unsafe assignment of an `any` value                                     @typescript-eslint/no-unsafe-assignment
  48:34  error    Unsafe member access .id on an `any` value                              @typescript-eslint/no-unsafe-member-access
  49:48  warning  Unsafe argument of type `any` assigned to a parameter of type `string`  @typescript-eslint/no-unsafe-argument
  49:55  error    Unsafe member access .email on an `any` value                           @typescript-eslint/no-unsafe-member-access
  58:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`     @typescript-eslint/no-unsafe-argument
  67:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`     @typescript-eslint/no-unsafe-argument
  76:21  warning  Unsafe argument of type `any` assigned to a parameter of type `App`     @typescript-eslint/no-unsafe-argument

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\e2e\queues.e2e-spec.ts
   1:18  error    A `require()` style import is forbidden                              @typescript-eslint/no-require-imports
  24:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  31:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  40:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\e2e\refresh-throttle.e2e-spec.ts
   1:18  error    A `require()` style import is forbidden                              @typescript-eslint/no-require-imports
  24:38  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  44:38  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\e2e\roles.e2e-spec.ts
   1:18  error    A `require()` style import is forbidden                              @typescript-eslint/no-require-imports
  23:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  35:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\e2e\scheduler.e2e-spec.ts
   1:18  error    A `require()` style import is forbidden                              @typescript-eslint/no-require-imports
  24:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  35:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\e2e\sessoes.e2e-spec.ts
   1:18  error    A `require()` style import is forbidden                              @typescript-eslint/no-require-imports
  29:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  37:21  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  53:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  64:21  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\e2e\super-admin.e2e-spec.ts
   1:18  error    A `require()` style import is forbidden                              @typescript-eslint/no-require-imports
  24:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  31:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  38:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  45:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\e2e\swagger-validation.e2e-spec.ts
   1:18  error    A `require()` style import is forbidden                              @typescript-eslint/no-require-imports
  21:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  32:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\e2e\tenant.e2e-spec.ts
   1:18  error    A `require()` style import is forbidden                                                                                                                                    @typescript-eslint/no-require-imports
  26:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`                                                                                                        @typescript-eslint/no-unsafe-argument
  34:11  error    Unsafe call of an `any` typed value                                                                                                                                        @typescript-eslint/no-unsafe-call
  34:31  error    Unsafe member access .empresa on an `any` value                                                                                                                            @typescript-eslint/no-unsafe-member-access
  39:19  warning  Unsafe argument of type `any` assigned to a parameter of type `App`                                                                                                        @typescript-eslint/no-unsafe-argument
  40:32  error    Invalid operand for a '+' operation. Operands must each be a number or string, allowing a string + any of: `any`, `boolean`, `null`, `RegExp`, `undefined`. Got `unknown`  @typescript-eslint/restrict-plus-operands

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\e2e\uploads.e2e-spec.ts
   51:21  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
   67:36  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
   79:13  error    Unsafe assignment of an `any` value                                  @typescript-eslint/no-unsafe-assignment
   79:37  error    Unsafe member access .id on an `any` value                           @typescript-eslint/no-unsafe-member-access
   79:55  error    Unsafe member access .arquivo on an `any` value                      @typescript-eslint/no-unsafe-member-access
   83:21  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
   90:21  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  112:24  error    Unsafe member access .id on an `any` value                           @typescript-eslint/no-unsafe-member-access
  113:24  error    Unsafe member access .createdAt on an `any` value                    @typescript-eslint/no-unsafe-member-access
  114:24  error    Unsafe member access .updatedAt on an `any` value                    @typescript-eslint/no-unsafe-member-access
  128:7   error    Unsafe assignment of an `any` value                                  @typescript-eslint/no-unsafe-assignment
  140:24  error    Unsafe member access .id on an `any` value                           @typescript-eslint/no-unsafe-member-access
  141:24  error    Unsafe member access .createdAt on an `any` value                    @typescript-eslint/no-unsafe-member-access
  142:24  error    Unsafe member access .updatedAt on an `any` value                    @typescript-eslint/no-unsafe-member-access
  143:24  error    Unsafe member access .ultimoAcessoEm on an `any` value               @typescript-eslint/no-unsafe-member-access
  145:17  error    Unsafe member access .empresaId on an `any` value                    @typescript-eslint/no-unsafe-member-access
  157:7   error    Unsafe assignment of an `any` value                                  @typescript-eslint/no-unsafe-assignment
  177:21  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  213:21  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\helpers\auth.helper.ts
    1:18  error    A `require()` style import is forbidden                              @typescript-eslint/no-require-imports
   22:9   error    Unsafe assignment of an `any` value                                  @typescript-eslint/no-unsafe-assignment
   22:28  error    Unsafe member access .access_token on an `any` value                 @typescript-eslint/no-unsafe-member-access
   22:49  error    Unsafe member access .accessToken on an `any` value                  @typescript-eslint/no-unsafe-member-access
   22:69  error    Unsafe member access .token on an `any` value                        @typescript-eslint/no-unsafe-member-access
   23:9   error    Unsafe assignment of an `any` value                                  @typescript-eslint/no-unsafe-assignment
   23:29  error    Unsafe member access .refresh_token on an `any` value                @typescript-eslint/no-unsafe-member-access
   23:51  error    Unsafe member access .refreshToken on an `any` value                 @typescript-eslint/no-unsafe-member-access
   28:5   error    Unsafe assignment of an `any` value                                  @typescript-eslint/no-unsafe-assignment
   29:5   error    Unsafe assignment of an `any` value                                  @typescript-eslint/no-unsafe-assignment
   30:5   error    Unsafe assignment of an `any` value                                  @typescript-eslint/no-unsafe-assignment
   30:22  error    Unsafe member access .expires_in on an `any` value                   @typescript-eslint/no-unsafe-member-access
   30:41  error    Unsafe member access .expiresIn on an `any` value                    @typescript-eslint/no-unsafe-member-access
   31:5   error    Unsafe assignment of an `any` value                                  @typescript-eslint/no-unsafe-assignment
   47:34  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
   91:35  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  110:7   error    Unsafe assignment of an `any` value                                  @typescript-eslint/no-unsafe-assignment
  111:20  error    Unsafe member access .codigoDesenvolvimento on an `any` value        @typescript-eslint/no-unsafe-member-access
  112:20  error    Unsafe member access .codigo on an `any` value                       @typescript-eslint/no-unsafe-member-access
  113:20  error    Unsafe member access .devCode on an `any` value                      @typescript-eslint/no-unsafe-member-access
  114:20  error    Unsafe member access .code on an `any` value                         @typescript-eslint/no-unsafe-member-access
  116:44  error    Unsafe member access .codigoAcessoCliente on an `any` value          @typescript-eslint/no-unsafe-member-access
  117:11  error    Unsafe assignment of an `any` value                                  @typescript-eslint/no-unsafe-assignment
  117:23  error    Unsafe call of an `any` typed value                                  @typescript-eslint/no-unsafe-call
  117:39  error    Unsafe member access .codigoAcessoCliente on an `any` value          @typescript-eslint/no-unsafe-member-access
  126:5   error    Unsafe assignment of an `any` value                                  @typescript-eslint/no-unsafe-assignment
  126:19  error    Unsafe member access .codigo on an `any` value                       @typescript-eslint/no-unsafe-member-access
  131:35  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
  135:7   error    Unsafe assignment of an `any` value                                  @typescript-eslint/no-unsafe-assignment

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\helpers\tenant.helper.ts
   1:18  error    A `require()` style import is forbidden                              @typescript-eslint/no-require-imports
   5:34  warning  Unsafe argument of type `any` assigned to a parameter of type `App`  @typescript-eslint/no-unsafe-argument
   9:9   error    Unsafe assignment of an `any` value                                  @typescript-eslint/no-unsafe-assignment
  10:19  error    Unsafe member access .slug on an `any` value                         @typescript-eslint/no-unsafe-member-access
  11:19  error    Unsafe member access .data on an `any` value                         @typescript-eslint/no-unsafe-member-access
  12:19  error    Unsafe member access .empresa on an `any` value                      @typescript-eslint/no-unsafe-member-access
  13:19  error    Unsafe member access .data on an `any` value                         @typescript-eslint/no-unsafe-member-access
  17:3   error    Unsafe return of a value of type `any`                               @typescript-eslint/no-unsafe-return

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\agendamentos-concurrency.spec.ts
  17:7   error  Unsafe call of an `any` typed value                               @typescript-eslint/no-unsafe-call
  17:24  error  Unsafe member access .assertNoScheduleConflict on an `any` value  @typescript-eslint/no-unsafe-member-access
  27:9   error  Unsafe assignment of an `any` value                               @typescript-eslint/no-unsafe-assignment
  48:7   error  Unsafe call of an `any` typed value                               @typescript-eslint/no-unsafe-call
  48:24  error  Unsafe member access .assertNoScheduleConflict on an `any` value  @typescript-eslint/no-unsafe-member-access
  57:46  error  Unsafe member access [0] on an `any` value                        @typescript-eslint/no-unsafe-member-access

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\analytics-performance-limits.spec.ts
  53:36  warning  Unsafe argument of type `any` assigned to a parameter of type `PrismaService`           @typescript-eslint/no-unsafe-argument
  53:44  warning  Unsafe argument of type `any` assigned to a parameter of type `TenantValidatorService`  @typescript-eslint/no-unsafe-argument
  75:19  error    Unsafe member access .clientePacote on an `any` value                                   @typescript-eslint/no-unsafe-member-access
  85:19  error    Unsafe member access .fidelidade on an `any` value                                      @typescript-eslint/no-unsafe-member-access
  95:19  error    Unsafe member access .eventoSistema on an `any` value                                   @typescript-eslint/no-unsafe-member-access

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\area-cliente-privacy.spec.ts
   4:9   error  Unsafe assignment of an `any` value                              @typescript-eslint/no-unsafe-assignment
   7:11  error  Unsafe assignment of an `any` value                              @typescript-eslint/no-unsafe-assignment
   7:20  error  Unsafe call of an `any` typed value                              @typescript-eslint/no-unsafe-call
   7:28  error  Unsafe member access .toPortalAppointment on an `any` value      @typescript-eslint/no-unsafe-member-access
  33:19  error  Unsafe member access .servico on an `any` value                  @typescript-eslint/no-unsafe-member-access
  34:19  error  Unsafe member access .profissional on an `any` value             @typescript-eslint/no-unsafe-member-access
  35:19  error  Unsafe member access .unidade on an `any` value                  @typescript-eslint/no-unsafe-member-access
  39:11  error  Unsafe assignment of an `any` value                              @typescript-eslint/no-unsafe-assignment
  39:19  error  Unsafe call of an `any` typed value                              @typescript-eslint/no-unsafe-call
  39:27  error  Unsafe member access .toPortalPointMovement on an `any` value    @typescript-eslint/no-unsafe-member-access
  48:11  error  Unsafe assignment of an `any` value                              @typescript-eslint/no-unsafe-assignment
  48:21  error  Unsafe call of an `any` typed value                              @typescript-eslint/no-unsafe-call
  48:29  error  Unsafe member access .toPortalWhatsappMessage on an `any` value  @typescript-eslint/no-unsafe-member-access

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\auth-guards.coverage.spec.ts
   3:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   3:17  error    A `require()` style import is forbidden                                                                         @typescript-eslint/no-require-imports
   6:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   7:11  error    Unsafe member access .JwtAuthGuard on an `any` value                                                            @typescript-eslint/no-unsafe-member-access
   8:21  warning  Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`  @typescript-eslint/no-unsafe-argument
  12:7   error    Unsafe construction of an `any` typed value                                                                     @typescript-eslint/no-unsafe-call
  17:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  17:17  error    A `require()` style import is forbidden                                                                         @typescript-eslint/no-require-imports
  20:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  21:11  error    Unsafe member access .ClienteAuthGuard on an `any` value                                                        @typescript-eslint/no-unsafe-member-access
  22:21  warning  Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`  @typescript-eslint/no-unsafe-argument
  26:7   error    Unsafe construction of an `any` typed value                                                                     @typescript-eslint/no-unsafe-call
  31:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  31:17  error    A `require()` style import is forbidden                                                                         @typescript-eslint/no-require-imports
  34:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  35:11  error    Unsafe member access .JwtOrClienteAuthGuard on an `any` value                                                   @typescript-eslint/no-unsafe-member-access
  36:21  warning  Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`  @typescript-eslint/no-unsafe-argument
  40:7   error    Unsafe construction of an `any` typed value                                                                     @typescript-eslint/no-unsafe-call

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\backup-external-upload.spec.ts
  7:16  error  A `require()` style import is forbidden  @typescript-eslint/no-require-imports

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\chat03-bullmq-retention.spec.ts
  73:12  error  A method that is not declared with `this: void` may cause unintentional scoping of `this` when separated from its object.
Consider using an arrow function or explicitly `.bind()`ing the method to avoid calling the method with an unintended `this` value. 
If a function does not access `this`, it can be annotated with `this: void`  @typescript-eslint/unbound-method

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\cliente-area-compatibility.spec.ts
  28:12  error  A method that is not declared with `this: void` may cause unintentional scoping of `this` when separated from its object.
Consider using an arrow function or explicitly `.bind()`ing the method to avoid calling the method with an unintended `this` value. 
If a function does not access `this`, it can be annotated with `this: void`  @typescript-eslint/unbound-method
  37:12  error  A method that is not declared with `this: void` may cause unintentional scoping of `this` when separated from its object.
Consider using an arrow function or explicitly `.bind()`ing the method to avoid calling the method with an unintended `this` value. 
If a function does not access `this`, it can be annotated with `this: void`  @typescript-eslint/unbound-method
  42:12  error  A method that is not declared with `this: void` may cause unintentional scoping of `this` when separated from its object.
Consider using an arrow function or explicitly `.bind()`ing the method to avoid calling the method with an unintended `this` value. 
If a function does not access `this`, it can be annotated with `this: void`  @typescript-eslint/unbound-method

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\clientes-pacotes-concurrency.spec.ts
  48:7  warning  Unsafe argument of type `any` assigned to a parameter of type `PrismaService`           @typescript-eslint/no-unsafe-argument
  49:7  warning  Unsafe argument of type `any` assigned to a parameter of type `AutomacoesService`       @typescript-eslint/no-unsafe-argument
  50:7  warning  Unsafe argument of type `any` assigned to a parameter of type `AuditoriaService`        @typescript-eslint/no-unsafe-argument
  51:7  warning  Unsafe argument of type `any` assigned to a parameter of type `TenantValidatorService`  @typescript-eslint/no-unsafe-argument
  61:9  error    Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  92:7  warning  Unsafe argument of type `any` assigned to a parameter of type `PrismaService`           @typescript-eslint/no-unsafe-argument
  93:7  warning  Unsafe argument of type `any` assigned to a parameter of type `AutomacoesService`       @typescript-eslint/no-unsafe-argument
  94:7  warning  Unsafe argument of type `any` assigned to a parameter of type `AuditoriaService`        @typescript-eslint/no-unsafe-argument
  95:7  warning  Unsafe argument of type `any` assigned to a parameter of type `TenantValidatorService`  @typescript-eslint/no-unsafe-argument

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\infrastructure-expanded.coverage.spec.ts
   55:15  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   55:21  error    A `require()` style import is forbidden                                                                         @typescript-eslint/no-require-imports
   60:15  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   60:21  error    A `require()` style import is forbidden                                                                         @typescript-eslint/no-require-imports
   61:46  warning  Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`  @typescript-eslint/no-unsafe-argument
   68:45  error    Unsafe member access .name on an `any` value                                                                    @typescript-eslint/no-unsafe-member-access
   90:25  error    Empty block statement                                                                                           no-empty
  106:25  error    Empty block statement                                                                                           no-empty
  123:25  error    Empty block statement                                                                                           no-empty
  134:15  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  142:19  error    Empty block statement                                                                                           no-empty
  145:40  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  146:19  error    Empty block statement                                                                                           no-empty
  149:40  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  150:19  error    Empty block statement                                                                                           no-empty

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\meta-whatsapp-worker-flow.spec.ts
  90:9  error  Unsafe assignment of an `any` value  @typescript-eslint/no-unsafe-assignment

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\micro-boost.coverage.spec.ts
  14:13  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  14:19  error    A `require()` style import is forbidden                                                                         @typescript-eslint/no-require-imports
  16:41  warning  Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`  @typescript-eslint/no-unsafe-argument
  19:40  error    Unsafe call of a `Function` typed value                                                                         @typescript-eslint/no-unsafe-call
  20:19  error    Empty block statement                                                                                           no-empty
  32:13  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  32:19  error    A `require()` style import is forbidden                                                                         @typescript-eslint/no-require-imports
  33:13  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  34:13  error    Unsafe member access .HttpExceptionFilter on an `any` value                                                     @typescript-eslint/no-unsafe-member-access
  35:23  warning  Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`  @typescript-eslint/no-unsafe-argument
  38:15  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  38:31  error    Unsafe construction of an `any` typed value                                                                     @typescript-eslint/no-unsafe-call
  40:29  error    Unsafe member access .catch on an `any` value                                                                   @typescript-eslint/no-unsafe-member-access
  54:13  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  54:22  error    Unsafe member access .catch on an `any` value                                                                   @typescript-eslint/no-unsafe-member-access
  77:15  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  77:21  error    A `require()` style import is forbidden                                                                         @typescript-eslint/no-require-imports
  79:43  warning  Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`  @typescript-eslint/no-unsafe-argument
  83:17  error    Unsafe call of a `Function` typed value                                                                         @typescript-eslint/no-unsafe-call
  85:21  error    Empty block statement                                                                                           no-empty
  88:42  error    Unsafe call of a `Function` typed value                                                                         @typescript-eslint/no-unsafe-call
  89:21  error    Empty block statement                                                                                           no-empty
  92:42  error    Unsafe call of a `Function` typed value                                                                         @typescript-eslint/no-unsafe-call
  93:21  error    Empty block statement                                                                                           no-empty

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\queue-utils.spec.ts
   3:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   3:17  error    A `require()` style import is forbidden                                                                         @typescript-eslint/no-require-imports
   7:26  warning  Unsafe argument of type `any` assigned to a parameter of type `{}`                                              @typescript-eslint/no-unsafe-argument
  11:19  error    'name' is assigned a value but never used                                                                       @typescript-eslint/no-unused-vars
  11:47  warning  Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> | { [s: string]: unknown; }`  @typescript-eslint/no-unsafe-argument
  16:19  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  16:29  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  29:21  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  29:31  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  51:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  51:17  error    A `require()` style import is forbidden                                                                         @typescript-eslint/no-require-imports
  55:26  warning  Unsafe argument of type `any` assigned to a parameter of type `{}`                                              @typescript-eslint/no-unsafe-argument
  59:19  error    'name' is assigned a value but never used                                                                       @typescript-eslint/no-unused-vars
  59:47  warning  Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> | { [s: string]: unknown; }`  @typescript-eslint/no-unsafe-argument
  64:19  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  64:29  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  70:21  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  70:31  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\queues-utils.coverage.spec.ts
   3:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   3:17  error    A `require()` style import is forbidden                                                                         @typescript-eslint/no-require-imports
   7:26  warning  Unsafe argument of type `any` assigned to a parameter of type `{}`                                              @typescript-eslint/no-unsafe-argument
  11:46  warning  Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> | { [s: string]: unknown; }`  @typescript-eslint/no-unsafe-argument
  16:19  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  16:29  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  27:21  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  27:31  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  47:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  47:17  error    A `require()` style import is forbidden                                                                         @typescript-eslint/no-require-imports
  51:26  warning  Unsafe argument of type `any` assigned to a parameter of type `{}`                                              @typescript-eslint/no-unsafe-argument
  55:46  warning  Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> | { [s: string]: unknown; }`  @typescript-eslint/no-unsafe-argument
  60:19  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  60:29  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  66:21  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  66:31  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\s3-storage.service.spec.ts
   16:67  error  Unsafe assignment of an `any` value     @typescript-eslint/no-unsafe-assignment
   17:64  error  Unsafe assignment of an `any` value     @typescript-eslint/no-unsafe-assignment
   18:65  error  Unsafe assignment of an `any` value     @typescript-eslint/no-unsafe-assignment
   19:64  error  Unsafe assignment of an `any` value     @typescript-eslint/no-unsafe-assignment
  167:11  error  Unsafe assignment of an `any` value     @typescript-eslint/no-unsafe-assignment
  191:29  error  Unsafe return of a value of type error  @typescript-eslint/no-unsafe-return
  202:29  error  Unsafe return of a value of type error  @typescript-eslint/no-unsafe-return

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\tenant-services.coverage.spec.ts
   3:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   3:17  error    A `require()` style import is forbidden                                                                         @typescript-eslint/no-require-imports
   5:24  warning  Unsafe argument of type `any` assigned to a parameter of type `{}`                                              @typescript-eslint/no-unsafe-argument
   9:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   9:17  error    A `require()` style import is forbidden                                                                         @typescript-eslint/no-require-imports
  12:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  13:11  error    Unsafe member access .TenantValidatorService on an `any` value                                                  @typescript-eslint/no-unsafe-member-access
  14:21  warning  Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`  @typescript-eslint/no-unsafe-argument
  34:7   error    Unsafe construction of an `any` typed value                                                                     @typescript-eslint/no-unsafe-call

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\tenant-validator.spec.ts
    2:9   error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
    2:15  error    A `require()` style import is forbidden                                                                         @typescript-eslint/no-require-imports
    4:9   error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
    5:9   error    Unsafe member access .TenantValidatorService on an `any` value                                                  @typescript-eslint/no-unsafe-member-access
    6:19  warning  Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`  @typescript-eslint/no-unsafe-argument
   63:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   63:21  error    Unsafe construction of an `any` typed value                                                                     @typescript-eslint/no-unsafe-call
   69:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   69:21  error    Unsafe construction of an `any` typed value                                                                     @typescript-eslint/no-unsafe-call
   73:40  error    Unsafe member access [name] on an `any` value                                                                   @typescript-eslint/no-unsafe-member-access
   95:20  error    Unsafe member access .findUnique on an `any` value                                                              @typescript-eslint/no-unsafe-member-access
   95:32  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   95:41  error    Unsafe member access .findUnique on an `any` value                                                              @typescript-eslint/no-unsafe-member-access
   96:20  error    Unsafe member access .findFirst on an `any` value                                                               @typescript-eslint/no-unsafe-member-access
   96:31  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   96:40  error    Unsafe member access .findFirst on an `any` value                                                               @typescript-eslint/no-unsafe-member-access
   97:20  error    Unsafe member access .findMany on an `any` value                                                                @typescript-eslint/no-unsafe-member-access
   97:30  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   97:39  error    Unsafe member access .findMany on an `any` value                                                                @typescript-eslint/no-unsafe-member-access
  103:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  103:21  error    Unsafe construction of an `any` typed value                                                                     @typescript-eslint/no-unsafe-call
  107:40  error    Unsafe member access [name] on an `any` value                                                                   @typescript-eslint/no-unsafe-member-access
  111:15  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  111:30  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  111:38  error    Unsafe member access [method] on an `any` value                                                                 @typescript-eslint/no-unsafe-member-access
  117:17  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  117:32  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  117:40  error    Unsafe member access [method] on an `any` value                                                                 @typescript-eslint/no-unsafe-member-access
  144:20  error    Unsafe member access .findUnique on an `any` value                                                              @typescript-eslint/no-unsafe-member-access
  144:32  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  144:41  error    Unsafe member access .findUnique on an `any` value                                                              @typescript-eslint/no-unsafe-member-access
  145:20  error    Unsafe member access .findFirst on an `any` value                                                               @typescript-eslint/no-unsafe-member-access
  145:31  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  145:40  error    Unsafe member access .findFirst on an `any` value                                                               @typescript-eslint/no-unsafe-member-access
  146:20  error    Unsafe member access .findMany on an `any` value                                                                @typescript-eslint/no-unsafe-member-access
  146:30  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  146:39  error    Unsafe member access .findMany on an `any` value                                                                @typescript-eslint/no-unsafe-member-access
  149:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  149:21  error    Unsafe construction of an `any` typed value                                                                     @typescript-eslint/no-unsafe-call
  153:40  error    Unsafe member access [name] on an `any` value                                                                   @typescript-eslint/no-unsafe-member-access
  156:7   error    Unexpected `await` of a non-Promise (non-"Thenable") value                                                      @typescript-eslint/await-thenable
  158:17  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  158:25  error    Unsafe member access [method] on an `any` value                                                                 @typescript-eslint/no-unsafe-member-access

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\usuario-role-policy.coverage.spec.ts
   2:9   error    Unsafe assignment of an `any` value                                                                                      @typescript-eslint/no-unsafe-assignment
   2:15  error    A `require()` style import is forbidden                                                                                  @typescript-eslint/no-require-imports
   4:64  error    The `Function` type accepts any function-like value.
Prefer explicitly defining any function parameters and return type  @typescript-eslint/no-unsafe-function-type
   5:37  error    The `Function` type accepts any function-like value.
Prefer explicitly defining any function parameters and return type  @typescript-eslint/no-unsafe-function-type
   7:62  warning  Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> | { [s: string]: unknown; }`           @typescript-eslint/no-unsafe-argument
  11:24  warning  Unsafe argument of type `[string, any]` assigned to a parameter of type `[string, Function]`                             @typescript-eslint/no-unsafe-argument
  16:28  error    Unsafe member access [staticName] on an `any` value                                                                      @typescript-eslint/no-unsafe-member-access
  17:28  warning  Unsafe argument of type `[string, any]` assigned to a parameter of type `[string, Function]`                             @typescript-eslint/no-unsafe-argument
  19:15  error    Unsafe call of an `any` typed value                                                                                      @typescript-eslint/no-unsafe-call
  19:21  error    Unsafe member access [staticName] on an `any` value                                                                      @typescript-eslint/no-unsafe-member-access
  25:17  error    Unsafe assignment of an `any` value                                                                                      @typescript-eslint/no-unsafe-assignment
  25:28  error    Unsafe construction of an `any` typed value                                                                              @typescript-eslint/no-unsafe-call
  32:33  error    Unsafe member access [methodName] on an `any` value                                                                      @typescript-eslint/no-unsafe-member-access
  33:30  warning  Unsafe argument of type `[string, any]` assigned to a parameter of type `[string, Function]`                             @typescript-eslint/no-unsafe-argument
  35:17  error    Unsafe call of an `any` typed value                                                                                      @typescript-eslint/no-unsafe-call
  35:26  error    Unsafe member access [methodName] on an `any` value                                                                      @typescript-eslint/no-unsafe-member-access
  45:59  warning  Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> | { [s: string]: unknown; }`           @typescript-eslint/no-unsafe-argument
  47:28  warning  Unsafe argument of type `[string, any]` assigned to a parameter of type `[string, Function]`                             @typescript-eslint/no-unsafe-argument
  53:36  error    The `Function` type accepts any function-like value.
Prefer explicitly defining any function parameters and return type  @typescript-eslint/no-unsafe-function-type
  64:24  warning  Unsafe argument of type `any` assigned to a parameter of type `{}`                                                       @typescript-eslint/no-unsafe-argument
  71:7   error    Unexpected `await` of a non-Promise (non-"Thenable") value                                                               @typescript-eslint/await-thenable
  94:19  error    Unsafe assignment of an `any` value                                                                                      @typescript-eslint/no-unsafe-assignment
  94:28  error    Unsafe call of a `Function` typed value                                                                                  @typescript-eslint/no-unsafe-call

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\usuario-role-policy.spec.ts
    2:9   error    Unsafe assignment of an `any` value                                                                                      @typescript-eslint/no-unsafe-assignment
    2:15  error    A `require()` style import is forbidden                                                                                  @typescript-eslint/no-require-imports
    4:66  error    The `Function` type accepts any function-like value.
Prefer explicitly defining any function parameters and return type  @typescript-eslint/no-unsafe-function-type
    5:35  error    The `Function` type accepts any function-like value.
Prefer explicitly defining any function parameters and return type  @typescript-eslint/no-unsafe-function-type
    7:62  warning  Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> | { [s: string]: unknown; }`           @typescript-eslint/no-unsafe-argument
   12:22  warning  Unsafe argument of type `[string, any]` assigned to a parameter of type `[string, Function]`                             @typescript-eslint/no-unsafe-argument
   18:17  error    Unsafe assignment of an `any` value                                                                                      @typescript-eslint/no-unsafe-assignment
   18:37  error    Unsafe member access [staticName] on an `any` value                                                                      @typescript-eslint/no-unsafe-member-access
   21:26  warning  Unsafe argument of type `[string, any]` assigned to a parameter of type `[string, Function]`                             @typescript-eslint/no-unsafe-argument
   23:15  error    Unsafe call of an `any` typed value                                                                                      @typescript-eslint/no-unsafe-call
   23:27  error    Unsafe member access .bind on an `any` value                                                                             @typescript-eslint/no-unsafe-member-access
   30:17  error    Unsafe assignment of an `any` value                                                                                      @typescript-eslint/no-unsafe-assignment
   30:28  error    Unsafe construction of an `any` typed value                                                                              @typescript-eslint/no-unsafe-call
   37:19  error    Unsafe assignment of an `any` value                                                                                      @typescript-eslint/no-unsafe-assignment
   37:37  error    Unsafe member access [methodName] on an `any` value                                                                      @typescript-eslint/no-unsafe-member-access
   40:28  warning  Unsafe argument of type `[string, any]` assigned to a parameter of type `[string, Function]`                             @typescript-eslint/no-unsafe-argument
   42:17  error    Unsafe call of an `any` typed value                                                                                      @typescript-eslint/no-unsafe-call
   42:24  error    Unsafe member access .bind on an `any` value                                                                             @typescript-eslint/no-unsafe-member-access
   52:59  warning  Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> | { [s: string]: unknown; }`           @typescript-eslint/no-unsafe-argument
   54:26  warning  Unsafe argument of type `[string, any]` assigned to a parameter of type `[string, Function]`                             @typescript-eslint/no-unsafe-argument
   60:36  error    The `Function` type accepts any function-like value.
Prefer explicitly defining any function parameters and return type  @typescript-eslint/no-unsafe-function-type
   69:32  error    The `Function` type accepts any function-like value.
Prefer explicitly defining any function parameters and return type  @typescript-eslint/no-unsafe-function-type
   97:15  error    Unsafe assignment of an `any` value                                                                                      @typescript-eslint/no-unsafe-assignment
   97:24  error    Unsafe call of a `Function` typed value                                                                                  @typescript-eslint/no-unsafe-call
  112:24  warning  Unsafe argument of type `any` assigned to a parameter of type `{}`                                                       @typescript-eslint/no-unsafe-argument
  131:7   error    Unexpected `await` of a non-Promise (non-"Thenable") value                                                               @typescript-eslint/await-thenable

C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\utils.coverage.spec.ts
    3:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
    3:17  error    A `require()` style import is forbidden                                                                         @typescript-eslint/no-require-imports
    7:26  warning  Unsafe argument of type `any` assigned to a parameter of type `{}`                                              @typescript-eslint/no-unsafe-argument
   11:19  error    'name' is assigned a value but never used                                                                       @typescript-eslint/no-unused-vars
   11:50  warning  Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> | { [s: string]: unknown; }`  @typescript-eslint/no-unsafe-argument
   16:14  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   19:16  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   22:18  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   34:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   34:17  error    A `require()` style import is forbidden                                                                         @typescript-eslint/no-require-imports
   38:26  warning  Unsafe argument of type `any` assigned to a parameter of type `{}`                                              @typescript-eslint/no-unsafe-argument
   42:46  warning  Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> | { [s: string]: unknown; }`  @typescript-eslint/no-unsafe-argument
   47:14  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   50:16  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   61:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   61:17  error    A `require()` style import is forbidden                                                                         @typescript-eslint/no-require-imports
   65:26  warning  Unsafe argument of type `any` assigned to a parameter of type `{}`                                              @typescript-eslint/no-unsafe-argument
   69:46  warning  Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> | { [s: string]: unknown; }`  @typescript-eslint/no-unsafe-argument
   74:19  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   74:29  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   92:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   92:17  error    A `require()` style import is forbidden                                                                         @typescript-eslint/no-require-imports
   96:26  warning  Unsafe argument of type `any` assigned to a parameter of type `{}`                                              @typescript-eslint/no-unsafe-argument
  100:46  warning  Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> | { [s: string]: unknown; }`  @typescript-eslint/no-unsafe-argument
  105:14  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  110:16  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call

Ô£û 428 problems (312 errors, 116 warnings)

```

## Jest unitario global

- Exit code: 0
```text

> beauty-core-backend@0.0.1 test
> jest --config ./jest.config.js --runInBand

PASS test/unit/coverage-under-70-branch-matrix.generated.spec.ts (8.325 s)
PASS test/unit/coverage-under-70-final-target.generated.spec.ts
[31m[Nest] 16132  - [39m15/09/2026, 15:41:36 [31m  ERROR[39m [38;5;3m[AuditoriaService] [39m[31m[AUDITORIA] falha ao registrar auditoria: Cannot read properties of undefined (reading 'empresaId')[39m
PASS test/unit/modules-services-expanded.coverage.spec.ts
PASS test/unit/coverage-under-70-targeted.generated.spec.ts
PASS test/unit/controllers-expanded.coverage.spec.ts
PASS test/unit/services-critical.coverage.spec.ts
PASS test/unit/infrastructure-expanded.coverage.spec.ts
  ÔùÅ Console
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.156Z","level":"info","service":"beauty-core-api","environment":"test","context":null,"message":null,"requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.173Z","level":"info","service":"beauty-core-api","environment":"test","context":null,"message":"00000000-0000-4000-8000-000000000101","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.173Z","level":"info","service":"beauty-core-api","environment":"test","context":null,"message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.173Z","level":"info","service":"beauty-core-api","environment":"test","context":"00000000-0000-4000-8000-000000000101","message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.174Z","level":"info","service":"beauty-core-api","environment":"test","context":"00000000-0000-4000-8000-000000000001","message":"00000000-0000-4000-8000-000000000101","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.174Z","level":"info","service":"beauty-core-api","environment":"test","context":{"page":1,"limit":10},"message":"00000000-0000-4000-8000-000000000101","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.174Z","level":"info","service":"beauty-core-api","environment":"test","context":"00000000-0000-4000-8000-000000000101","message":{"page":1,"limit":10},"requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.174Z","level":"info","service":"beauty-core-api","environment":"test","context":{"nome":"Teste Automatizado","titulo":"Teste Automatizado","descricao":"Descri├º├úo teste","observacoes":"Observa├º├úo teste","telefone":"83999999999","email":"teste@beautycore.local","senha":"Teste@123456","senhaAtual":"Teste@123456","novaSenha":"Teste@654321","role":"GERENTE","status":"ATIVO","tipo":"RECEITA","canal":"SISTEMA","prioridade":"NORMAL","valor":100,"preco":100,"quantidade":1,"pontos":10,"sessoes":5,"clienteId":"00000000-0000-4000-8000-000000000001","usuarioId":"00000000-0000-4000-8000-000000000001","profissionalId":"00000000-0000-4000-8000-000000000001","servicoId":"00000000-0000-4000-8000-000000000001","unidadeId":"00000000-0000-4000-8000-000000000001","pacoteId":"00000000-0000-4000-8000-000000000001","clientePacoteId":"00000000-0000-4000-8000-000000000001","categoriaId":"00000000-0000-4000-8000-000000000001","agendamentoId":"00000000-0000-4000-8000-000000000001","arquivoId":"00000000-0000-4000-8000-000000000001","mensagemId":"00000000-0000-4000-8000-000000000001","dataHoraInicio":"2026-09-15T19:41:42.156Z","dataHoraFim":"2026-09-15T20:41:42.156Z","dataInicio":"2026-09-14T18:41:42.156Z","dataFim":"2026-09-16T18:41:42.156Z","dataVencimento":"2026-10-15T18:41:42.156Z","ativo":true},"message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.174Z","level":"info","service":"beauty-core-api","environment":"test","context":"00000000-0000-4000-8000-000000000101","message":{"nome":"Teste Automatizado","titulo":"Teste Automatizado","descricao":"Descri├º├úo teste","observacoes":"Observa├º├úo teste","telefone":"83999999999","email":"teste@beautycore.local","senha":"Teste@123456","senhaAtual":"Teste@123456","novaSenha":"Teste@654321","role":"GERENTE","status":"ATIVO","tipo":"RECEITA","canal":"SISTEMA","prioridade":"NORMAL","valor":100,"preco":100,"quantidade":1,"pontos":10,"sessoes":5,"clienteId":"00000000-0000-4000-8000-000000000001","usuarioId":"00000000-0000-4000-8000-000000000001","profissionalId":"00000000-0000-4000-8000-000000000001","servicoId":"00000000-0000-4000-8000-000000000001","unidadeId":"00000000-0000-4000-8000-000000000001","pacoteId":"00000000-0000-4000-8000-000000000001","clientePacoteId":"00000000-0000-4000-8000-000000000001","categoriaId":"00000000-0000-4000-8000-000000000001","agendamentoId":"00000000-0000-4000-8000-000000000001","arquivoId":"00000000-0000-4000-8000-000000000001","mensagemId":"00000000-0000-4000-8000-000000000001","dataHoraInicio":"2026-09-15T19:41:42.156Z","dataHoraFim":"2026-09-15T20:41:42.156Z","dataInicio":"2026-09-14T18:41:42.156Z","dataFim":"2026-09-16T18:41:42.156Z","dataVencimento":"2026-10-15T18:41:42.156Z","ativo":true},"requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.174Z","level":"info","service":"beauty-core-api","environment":"test","context":{"nome":"Teste Automatizado","titulo":"Teste Automatizado","descricao":"Descri├º├úo teste","observacoes":"Observa├º├úo teste","telefone":"83999999999","email":"teste@beautycore.local","senha":"Teste@123456","senhaAtual":"Teste@123456","novaSenha":"Teste@654321","role":"GERENTE","status":"ATIVO","tipo":"RECEITA","canal":"SISTEMA","prioridade":"NORMAL","valor":100,"preco":100,"quantidade":1,"pontos":10,"sessoes":5,"clienteId":"00000000-0000-4000-8000-000000000001","usuarioId":"00000000-0000-4000-8000-000000000001","profissionalId":"00000000-0000-4000-8000-000000000001","servicoId":"00000000-0000-4000-8000-000000000001","unidadeId":"00000000-0000-4000-8000-000000000001","pacoteId":"00000000-0000-4000-8000-000000000001","clientePacoteId":"00000000-0000-4000-8000-000000000001","categoriaId":"00000000-0000-4000-8000-000000000001","agendamentoId":"00000000-0000-4000-8000-000000000001","arquivoId":"00000000-0000-4000-8000-000000000001","mensagemId":"00000000-0000-4000-8000-000000000001","dataHoraInicio":"2026-09-15T19:41:42.156Z","dataHoraFim":"2026-09-15T20:41:42.156Z","dataInicio":"2026-09-14T18:41:42.156Z","dataFim":"2026-09-16T18:41:42.156Z","dataVencimento":"2026-10-15T18:41:42.156Z","ativo":true},"message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.error
      {"timestamp":"2026-09-15T18:41:42.175Z","level":"error","service":"beauty-core-api","environment":"test","context":null,"message":null,"requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
    [0m [90m 114 |[39m
     [90m 115 |[39m     [36mif[39m (level [33m===[39m [32m'error'[39m [33m||[39m level [33m===[39m [32m'fatal'[39m) {
    [31m[1m>[22m[39m[90m 116 |[39m       console[33m.[39merror(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 117 |[39m       [36mreturn[39m[33m;[39m
     [90m 118 |[39m     }
     [90m 119 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:116:15)
      at StructuredLoggerService.error (src/common/logger/structured-logger.service.ts:62:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.error
      {"timestamp":"2026-09-15T18:41:42.175Z","level":"error","service":"beauty-core-api","environment":"test","context":null,"message":"00000000-0000-4000-8000-000000000101","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
    [0m [90m 114 |[39m
     [90m 115 |[39m     [36mif[39m (level [33m===[39m [32m'error'[39m [33m||[39m level [33m===[39m [32m'fatal'[39m) {
    [31m[1m>[22m[39m[90m 116 |[39m       console[33m.[39merror(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 117 |[39m       [36mreturn[39m[33m;[39m
     [90m 118 |[39m     }
     [90m 119 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:116:15)
      at StructuredLoggerService.error (src/common/logger/structured-logger.service.ts:62:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.error
      {"timestamp":"2026-09-15T18:41:42.175Z","level":"error","service":"beauty-core-api","environment":"test","context":null,"message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
    [0m [90m 114 |[39m
     [90m 115 |[39m     [36mif[39m (level [33m===[39m [32m'error'[39m [33m||[39m level [33m===[39m [32m'fatal'[39m) {
    [31m[1m>[22m[39m[90m 116 |[39m       console[33m.[39merror(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 117 |[39m       [36mreturn[39m[33m;[39m
     [90m 118 |[39m     }
     [90m 119 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:116:15)
      at StructuredLoggerService.error (src/common/logger/structured-logger.service.ts:62:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.error
      {"timestamp":"2026-09-15T18:41:42.175Z","level":"error","service":"beauty-core-api","environment":"test","context":null,"message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132,"trace":"00000000-0000-4000-8000-000000000101"}
System.Management.Automation.RemoteException
    [0m [90m 114 |[39m
     [90m 115 |[39m     [36mif[39m (level [33m===[39m [32m'error'[39m [33m||[39m level [33m===[39m [32m'fatal'[39m) {
    [31m[1m>[22m[39m[90m 116 |[39m       console[33m.[39merror(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 117 |[39m       [36mreturn[39m[33m;[39m
     [90m 118 |[39m     }
     [90m 119 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:116:15)
      at StructuredLoggerService.error (src/common/logger/structured-logger.service.ts:62:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.error
      {"timestamp":"2026-09-15T18:41:42.175Z","level":"error","service":"beauty-core-api","environment":"test","context":null,"message":"00000000-0000-4000-8000-000000000101","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132,"trace":"00000000-0000-4000-8000-000000000001"}
System.Management.Automation.RemoteException
    [0m [90m 114 |[39m
     [90m 115 |[39m     [36mif[39m (level [33m===[39m [32m'error'[39m [33m||[39m level [33m===[39m [32m'fatal'[39m) {
    [31m[1m>[22m[39m[90m 116 |[39m       console[33m.[39merror(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 117 |[39m       [36mreturn[39m[33m;[39m
     [90m 118 |[39m     }
     [90m 119 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:116:15)
      at StructuredLoggerService.error (src/common/logger/structured-logger.service.ts:62:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.error
      {"timestamp":"2026-09-15T18:41:42.175Z","level":"error","service":"beauty-core-api","environment":"test","context":null,"message":"00000000-0000-4000-8000-000000000101","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132,"trace":{"page":1,"limit":10}}
System.Management.Automation.RemoteException
    [0m [90m 114 |[39m
     [90m 115 |[39m     [36mif[39m (level [33m===[39m [32m'error'[39m [33m||[39m level [33m===[39m [32m'fatal'[39m) {
    [31m[1m>[22m[39m[90m 116 |[39m       console[33m.[39merror(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 117 |[39m       [36mreturn[39m[33m;[39m
     [90m 118 |[39m     }
     [90m 119 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:116:15)
      at StructuredLoggerService.error (src/common/logger/structured-logger.service.ts:62:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.error
      {"timestamp":"2026-09-15T18:41:42.175Z","level":"error","service":"beauty-core-api","environment":"test","context":null,"message":{"page":1,"limit":10},"requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132,"trace":"00000000-0000-4000-8000-000000000101"}
System.Management.Automation.RemoteException
    [0m [90m 114 |[39m
     [90m 115 |[39m     [36mif[39m (level [33m===[39m [32m'error'[39m [33m||[39m level [33m===[39m [32m'fatal'[39m) {
    [31m[1m>[22m[39m[90m 116 |[39m       console[33m.[39merror(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 117 |[39m       [36mreturn[39m[33m;[39m
     [90m 118 |[39m     }
     [90m 119 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:116:15)
      at StructuredLoggerService.error (src/common/logger/structured-logger.service.ts:62:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.error
      {"timestamp":"2026-09-15T18:41:42.176Z","level":"error","service":"beauty-core-api","environment":"test","context":null,"message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132,"trace":{"nome":"Teste Automatizado","titulo":"Teste Automatizado","descricao":"Descri├º├úo teste","observacoes":"Observa├º├úo teste","telefone":"83999999999","email":"teste@beautycore.local","senha":"Teste@123456","senhaAtual":"Teste@123456","novaSenha":"Teste@654321","role":"GERENTE","status":"ATIVO","tipo":"RECEITA","canal":"SISTEMA","prioridade":"NORMAL","valor":100,"preco":100,"quantidade":1,"pontos":10,"sessoes":5,"clienteId":"00000000-0000-4000-8000-000000000001","usuarioId":"00000000-0000-4000-8000-000000000001","profissionalId":"00000000-0000-4000-8000-000000000001","servicoId":"00000000-0000-4000-8000-000000000001","unidadeId":"00000000-0000-4000-8000-000000000001","pacoteId":"00000000-0000-4000-8000-000000000001","clientePacoteId":"00000000-0000-4000-8000-000000000001","categoriaId":"00000000-0000-4000-8000-000000000001","agendamentoId":"00000000-0000-4000-8000-000000000001","arquivoId":"00000000-0000-4000-8000-000000000001","mensagemId":"00000000-0000-4000-8000-000000000001","dataHoraInicio":"2026-09-15T19:41:42.156Z","dataHoraFim":"2026-09-15T20:41:42.156Z","dataInicio":"2026-09-14T18:41:42.156Z","dataFim":"2026-09-16T18:41:42.156Z","dataVencimento":"2026-10-15T18:41:42.156Z","ativo":true}}
System.Management.Automation.RemoteException
    [0m [90m 114 |[39m
     [90m 115 |[39m     [36mif[39m (level [33m===[39m [32m'error'[39m [33m||[39m level [33m===[39m [32m'fatal'[39m) {
    [31m[1m>[22m[39m[90m 116 |[39m       console[33m.[39merror(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 117 |[39m       [36mreturn[39m[33m;[39m
     [90m 118 |[39m     }
     [90m 119 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:116:15)
      at StructuredLoggerService.error (src/common/logger/structured-logger.service.ts:62:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.error
      {"timestamp":"2026-09-15T18:41:42.176Z","level":"error","service":"beauty-core-api","environment":"test","context":null,"message":{"nome":"Teste Automatizado","titulo":"Teste Automatizado","descricao":"Descri├º├úo teste","observacoes":"Observa├º├úo teste","telefone":"83999999999","email":"teste@beautycore.local","senha":"Teste@123456","senhaAtual":"Teste@123456","novaSenha":"Teste@654321","role":"GERENTE","status":"ATIVO","tipo":"RECEITA","canal":"SISTEMA","prioridade":"NORMAL","valor":100,"preco":100,"quantidade":1,"pontos":10,"sessoes":5,"clienteId":"00000000-0000-4000-8000-000000000001","usuarioId":"00000000-0000-4000-8000-000000000001","profissionalId":"00000000-0000-4000-8000-000000000001","servicoId":"00000000-0000-4000-8000-000000000001","unidadeId":"00000000-0000-4000-8000-000000000001","pacoteId":"00000000-0000-4000-8000-000000000001","clientePacoteId":"00000000-0000-4000-8000-000000000001","categoriaId":"00000000-0000-4000-8000-000000000001","agendamentoId":"00000000-0000-4000-8000-000000000001","arquivoId":"00000000-0000-4000-8000-000000000001","mensagemId":"00000000-0000-4000-8000-000000000001","dataHoraInicio":"2026-09-15T19:41:42.156Z","dataHoraFim":"2026-09-15T20:41:42.156Z","dataInicio":"2026-09-14T18:41:42.156Z","dataFim":"2026-09-16T18:41:42.156Z","dataVencimento":"2026-10-15T18:41:42.156Z","ativo":true},"requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132,"trace":"00000000-0000-4000-8000-000000000101"}
System.Management.Automation.RemoteException
    [0m [90m 114 |[39m
     [90m 115 |[39m     [36mif[39m (level [33m===[39m [32m'error'[39m [33m||[39m level [33m===[39m [32m'fatal'[39m) {
    [31m[1m>[22m[39m[90m 116 |[39m       console[33m.[39merror(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 117 |[39m       [36mreturn[39m[33m;[39m
     [90m 118 |[39m     }
     [90m 119 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:116:15)
      at StructuredLoggerService.error (src/common/logger/structured-logger.service.ts:62:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.error
      {"timestamp":"2026-09-15T18:41:42.176Z","level":"error","service":"beauty-core-api","environment":"test","context":"00000000-0000-4000-8000-000000000101","message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132,"trace":{"nome":"Teste Automatizado","titulo":"Teste Automatizado","descricao":"Descri├º├úo teste","observacoes":"Observa├º├úo teste","telefone":"83999999999","email":"teste@beautycore.local","senha":"Teste@123456","senhaAtual":"Teste@123456","novaSenha":"Teste@654321","role":"GERENTE","status":"ATIVO","tipo":"RECEITA","canal":"SISTEMA","prioridade":"NORMAL","valor":100,"preco":100,"quantidade":1,"pontos":10,"sessoes":5,"clienteId":"00000000-0000-4000-8000-000000000001","usuarioId":"00000000-0000-4000-8000-000000000001","profissionalId":"00000000-0000-4000-8000-000000000001","servicoId":"00000000-0000-4000-8000-000000000001","unidadeId":"00000000-0000-4000-8000-000000000001","pacoteId":"00000000-0000-4000-8000-000000000001","clientePacoteId":"00000000-0000-4000-8000-000000000001","categoriaId":"00000000-0000-4000-8000-000000000001","agendamentoId":"00000000-0000-4000-8000-000000000001","arquivoId":"00000000-0000-4000-8000-000000000001","mensagemId":"00000000-0000-4000-8000-000000000001","dataHoraInicio":"2026-09-15T19:41:42.156Z","dataHoraFim":"2026-09-15T20:41:42.156Z","dataInicio":"2026-09-14T18:41:42.156Z","dataFim":"2026-09-16T18:41:42.156Z","dataVencimento":"2026-10-15T18:41:42.156Z","ativo":true}}
System.Management.Automation.RemoteException
    [0m [90m 114 |[39m
     [90m 115 |[39m     [36mif[39m (level [33m===[39m [32m'error'[39m [33m||[39m level [33m===[39m [32m'fatal'[39m) {
    [31m[1m>[22m[39m[90m 116 |[39m       console[33m.[39merror(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 117 |[39m       [36mreturn[39m[33m;[39m
     [90m 118 |[39m     }
     [90m 119 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:116:15)
      at StructuredLoggerService.error (src/common/logger/structured-logger.service.ts:62:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.warn
      {"timestamp":"2026-09-15T18:41:42.176Z","level":"warn","service":"beauty-core-api","environment":"test","context":null,"message":null,"requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
    [0m [90m 119 |[39m
     [90m 120 |[39m     [36mif[39m (level [33m===[39m [32m'warn'[39m) {
    [31m[1m>[22m[39m[90m 121 |[39m       console[33m.[39mwarn(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 122 |[39m       [36mreturn[39m[33m;[39m
     [90m 123 |[39m     }
     [90m 124 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:121:15)
      at StructuredLoggerService.warn (src/common/logger/structured-logger.service.ts:66:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.warn
      {"timestamp":"2026-09-15T18:41:42.176Z","level":"warn","service":"beauty-core-api","environment":"test","context":null,"message":"00000000-0000-4000-8000-000000000101","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
    [0m [90m 119 |[39m
     [90m 120 |[39m     [36mif[39m (level [33m===[39m [32m'warn'[39m) {
    [31m[1m>[22m[39m[90m 121 |[39m       console[33m.[39mwarn(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 122 |[39m       [36mreturn[39m[33m;[39m
     [90m 123 |[39m     }
     [90m 124 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:121:15)
      at StructuredLoggerService.warn (src/common/logger/structured-logger.service.ts:66:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.warn
      {"timestamp":"2026-09-15T18:41:42.176Z","level":"warn","service":"beauty-core-api","environment":"test","context":null,"message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
    [0m [90m 119 |[39m
     [90m 120 |[39m     [36mif[39m (level [33m===[39m [32m'warn'[39m) {
    [31m[1m>[22m[39m[90m 121 |[39m       console[33m.[39mwarn(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 122 |[39m       [36mreturn[39m[33m;[39m
     [90m 123 |[39m     }
     [90m 124 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:121:15)
      at StructuredLoggerService.warn (src/common/logger/structured-logger.service.ts:66:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.warn
      {"timestamp":"2026-09-15T18:41:42.176Z","level":"warn","service":"beauty-core-api","environment":"test","context":"00000000-0000-4000-8000-000000000101","message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
    [0m [90m 119 |[39m
     [90m 120 |[39m     [36mif[39m (level [33m===[39m [32m'warn'[39m) {
    [31m[1m>[22m[39m[90m 121 |[39m       console[33m.[39mwarn(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 122 |[39m       [36mreturn[39m[33m;[39m
     [90m 123 |[39m     }
     [90m 124 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:121:15)
      at StructuredLoggerService.warn (src/common/logger/structured-logger.service.ts:66:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.warn
      {"timestamp":"2026-09-15T18:41:42.177Z","level":"warn","service":"beauty-core-api","environment":"test","context":"00000000-0000-4000-8000-000000000001","message":"00000000-0000-4000-8000-000000000101","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
    [0m [90m 119 |[39m
     [90m 120 |[39m     [36mif[39m (level [33m===[39m [32m'warn'[39m) {
    [31m[1m>[22m[39m[90m 121 |[39m       console[33m.[39mwarn(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 122 |[39m       [36mreturn[39m[33m;[39m
     [90m 123 |[39m     }
     [90m 124 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:121:15)
      at StructuredLoggerService.warn (src/common/logger/structured-logger.service.ts:66:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.warn
      {"timestamp":"2026-09-15T18:41:42.177Z","level":"warn","service":"beauty-core-api","environment":"test","context":{"page":1,"limit":10},"message":"00000000-0000-4000-8000-000000000101","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
    [0m [90m 119 |[39m
     [90m 120 |[39m     [36mif[39m (level [33m===[39m [32m'warn'[39m) {
    [31m[1m>[22m[39m[90m 121 |[39m       console[33m.[39mwarn(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 122 |[39m       [36mreturn[39m[33m;[39m
     [90m 123 |[39m     }
     [90m 124 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:121:15)
      at StructuredLoggerService.warn (src/common/logger/structured-logger.service.ts:66:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.warn
      {"timestamp":"2026-09-15T18:41:42.177Z","level":"warn","service":"beauty-core-api","environment":"test","context":"00000000-0000-4000-8000-000000000101","message":{"page":1,"limit":10},"requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
    [0m [90m 119 |[39m
     [90m 120 |[39m     [36mif[39m (level [33m===[39m [32m'warn'[39m) {
    [31m[1m>[22m[39m[90m 121 |[39m       console[33m.[39mwarn(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 122 |[39m       [36mreturn[39m[33m;[39m
     [90m 123 |[39m     }
     [90m 124 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:121:15)
      at StructuredLoggerService.warn (src/common/logger/structured-logger.service.ts:66:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.warn
      {"timestamp":"2026-09-15T18:41:42.177Z","level":"warn","service":"beauty-core-api","environment":"test","context":{"nome":"Teste Automatizado","titulo":"Teste Automatizado","descricao":"Descri├º├úo teste","observacoes":"Observa├º├úo teste","telefone":"83999999999","email":"teste@beautycore.local","senha":"Teste@123456","senhaAtual":"Teste@123456","novaSenha":"Teste@654321","role":"GERENTE","status":"ATIVO","tipo":"RECEITA","canal":"SISTEMA","prioridade":"NORMAL","valor":100,"preco":100,"quantidade":1,"pontos":10,"sessoes":5,"clienteId":"00000000-0000-4000-8000-000000000001","usuarioId":"00000000-0000-4000-8000-000000000001","profissionalId":"00000000-0000-4000-8000-000000000001","servicoId":"00000000-0000-4000-8000-000000000001","unidadeId":"00000000-0000-4000-8000-000000000001","pacoteId":"00000000-0000-4000-8000-000000000001","clientePacoteId":"00000000-0000-4000-8000-000000000001","categoriaId":"00000000-0000-4000-8000-000000000001","agendamentoId":"00000000-0000-4000-8000-000000000001","arquivoId":"00000000-0000-4000-8000-000000000001","mensagemId":"00000000-0000-4000-8000-000000000001","dataHoraInicio":"2026-09-15T19:41:42.156Z","dataHoraFim":"2026-09-15T20:41:42.156Z","dataInicio":"2026-09-14T18:41:42.156Z","dataFim":"2026-09-16T18:41:42.156Z","dataVencimento":"2026-10-15T18:41:42.156Z","ativo":true},"message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
    [0m [90m 119 |[39m
     [90m 120 |[39m     [36mif[39m (level [33m===[39m [32m'warn'[39m) {
    [31m[1m>[22m[39m[90m 121 |[39m       console[33m.[39mwarn(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 122 |[39m       [36mreturn[39m[33m;[39m
     [90m 123 |[39m     }
     [90m 124 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:121:15)
      at StructuredLoggerService.warn (src/common/logger/structured-logger.service.ts:66:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.warn
      {"timestamp":"2026-09-15T18:41:42.177Z","level":"warn","service":"beauty-core-api","environment":"test","context":"00000000-0000-4000-8000-000000000101","message":{"nome":"Teste Automatizado","titulo":"Teste Automatizado","descricao":"Descri├º├úo teste","observacoes":"Observa├º├úo teste","telefone":"83999999999","email":"teste@beautycore.local","senha":"Teste@123456","senhaAtual":"Teste@123456","novaSenha":"Teste@654321","role":"GERENTE","status":"ATIVO","tipo":"RECEITA","canal":"SISTEMA","prioridade":"NORMAL","valor":100,"preco":100,"quantidade":1,"pontos":10,"sessoes":5,"clienteId":"00000000-0000-4000-8000-000000000001","usuarioId":"00000000-0000-4000-8000-000000000001","profissionalId":"00000000-0000-4000-8000-000000000001","servicoId":"00000000-0000-4000-8000-000000000001","unidadeId":"00000000-0000-4000-8000-000000000001","pacoteId":"00000000-0000-4000-8000-000000000001","clientePacoteId":"00000000-0000-4000-8000-000000000001","categoriaId":"00000000-0000-4000-8000-000000000001","agendamentoId":"00000000-0000-4000-8000-000000000001","arquivoId":"00000000-0000-4000-8000-000000000001","mensagemId":"00000000-0000-4000-8000-000000000001","dataHoraInicio":"2026-09-15T19:41:42.156Z","dataHoraFim":"2026-09-15T20:41:42.156Z","dataInicio":"2026-09-14T18:41:42.156Z","dataFim":"2026-09-16T18:41:42.156Z","dataVencimento":"2026-10-15T18:41:42.156Z","ativo":true},"requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
    [0m [90m 119 |[39m
     [90m 120 |[39m     [36mif[39m (level [33m===[39m [32m'warn'[39m) {
    [31m[1m>[22m[39m[90m 121 |[39m       console[33m.[39mwarn(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 122 |[39m       [36mreturn[39m[33m;[39m
     [90m 123 |[39m     }
     [90m 124 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:121:15)
      at StructuredLoggerService.warn (src/common/logger/structured-logger.service.ts:66:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.warn
      {"timestamp":"2026-09-15T18:41:42.177Z","level":"warn","service":"beauty-core-api","environment":"test","context":{"nome":"Teste Automatizado","titulo":"Teste Automatizado","descricao":"Descri├º├úo teste","observacoes":"Observa├º├úo teste","telefone":"83999999999","email":"teste@beautycore.local","senha":"Teste@123456","senhaAtual":"Teste@123456","novaSenha":"Teste@654321","role":"GERENTE","status":"ATIVO","tipo":"RECEITA","canal":"SISTEMA","prioridade":"NORMAL","valor":100,"preco":100,"quantidade":1,"pontos":10,"sessoes":5,"clienteId":"00000000-0000-4000-8000-000000000001","usuarioId":"00000000-0000-4000-8000-000000000001","profissionalId":"00000000-0000-4000-8000-000000000001","servicoId":"00000000-0000-4000-8000-000000000001","unidadeId":"00000000-0000-4000-8000-000000000001","pacoteId":"00000000-0000-4000-8000-000000000001","clientePacoteId":"00000000-0000-4000-8000-000000000001","categoriaId":"00000000-0000-4000-8000-000000000001","agendamentoId":"00000000-0000-4000-8000-000000000001","arquivoId":"00000000-0000-4000-8000-000000000001","mensagemId":"00000000-0000-4000-8000-000000000001","dataHoraInicio":"2026-09-15T19:41:42.156Z","dataHoraFim":"2026-09-15T20:41:42.156Z","dataInicio":"2026-09-14T18:41:42.156Z","dataFim":"2026-09-16T18:41:42.156Z","dataVencimento":"2026-10-15T18:41:42.156Z","ativo":true},"message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
    [0m [90m 119 |[39m
     [90m 120 |[39m     [36mif[39m (level [33m===[39m [32m'warn'[39m) {
    [31m[1m>[22m[39m[90m 121 |[39m       console[33m.[39mwarn(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 122 |[39m       [36mreturn[39m[33m;[39m
     [90m 123 |[39m     }
     [90m 124 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:121:15)
      at StructuredLoggerService.warn (src/common/logger/structured-logger.service.ts:66:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.177Z","level":"debug","service":"beauty-core-api","environment":"test","context":null,"message":null,"requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.177Z","level":"debug","service":"beauty-core-api","environment":"test","context":null,"message":"00000000-0000-4000-8000-000000000101","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.178Z","level":"debug","service":"beauty-core-api","environment":"test","context":null,"message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.178Z","level":"debug","service":"beauty-core-api","environment":"test","context":"00000000-0000-4000-8000-000000000101","message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.178Z","level":"debug","service":"beauty-core-api","environment":"test","context":"00000000-0000-4000-8000-000000000001","message":"00000000-0000-4000-8000-000000000101","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.178Z","level":"debug","service":"beauty-core-api","environment":"test","context":{"page":1,"limit":10},"message":"00000000-0000-4000-8000-000000000101","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.178Z","level":"debug","service":"beauty-core-api","environment":"test","context":"00000000-0000-4000-8000-000000000101","message":{"page":1,"limit":10},"requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.178Z","level":"debug","service":"beauty-core-api","environment":"test","context":{"nome":"Teste Automatizado","titulo":"Teste Automatizado","descricao":"Descri├º├úo teste","observacoes":"Observa├º├úo teste","telefone":"83999999999","email":"teste@beautycore.local","senha":"Teste@123456","senhaAtual":"Teste@123456","novaSenha":"Teste@654321","role":"GERENTE","status":"ATIVO","tipo":"RECEITA","canal":"SISTEMA","prioridade":"NORMAL","valor":100,"preco":100,"quantidade":1,"pontos":10,"sessoes":5,"clienteId":"00000000-0000-4000-8000-000000000001","usuarioId":"00000000-0000-4000-8000-000000000001","profissionalId":"00000000-0000-4000-8000-000000000001","servicoId":"00000000-0000-4000-8000-000000000001","unidadeId":"00000000-0000-4000-8000-000000000001","pacoteId":"00000000-0000-4000-8000-000000000001","clientePacoteId":"00000000-0000-4000-8000-000000000001","categoriaId":"00000000-0000-4000-8000-000000000001","agendamentoId":"00000000-0000-4000-8000-000000000001","arquivoId":"00000000-0000-4000-8000-000000000001","mensagemId":"00000000-0000-4000-8000-000000000001","dataHoraInicio":"2026-09-15T19:41:42.156Z","dataHoraFim":"2026-09-15T20:41:42.156Z","dataInicio":"2026-09-14T18:41:42.156Z","dataFim":"2026-09-16T18:41:42.156Z","dataVencimento":"2026-10-15T18:41:42.156Z","ativo":true},"message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.182Z","level":"debug","service":"beauty-core-api","environment":"test","context":"00000000-0000-4000-8000-000000000101","message":{"nome":"Teste Automatizado","titulo":"Teste Automatizado","descricao":"Descri├º├úo teste","observacoes":"Observa├º├úo teste","telefone":"83999999999","email":"teste@beautycore.local","senha":"Teste@123456","senhaAtual":"Teste@123456","novaSenha":"Teste@654321","role":"GERENTE","status":"ATIVO","tipo":"RECEITA","canal":"SISTEMA","prioridade":"NORMAL","valor":100,"preco":100,"quantidade":1,"pontos":10,"sessoes":5,"clienteId":"00000000-0000-4000-8000-000000000001","usuarioId":"00000000-0000-4000-8000-000000000001","profissionalId":"00000000-0000-4000-8000-000000000001","servicoId":"00000000-0000-4000-8000-000000000001","unidadeId":"00000000-0000-4000-8000-000000000001","pacoteId":"00000000-0000-4000-8000-000000000001","clientePacoteId":"00000000-0000-4000-8000-000000000001","categoriaId":"00000000-0000-4000-8000-000000000001","agendamentoId":"00000000-0000-4000-8000-000000000001","arquivoId":"00000000-0000-4000-8000-000000000001","mensagemId":"00000000-0000-4000-8000-000000000001","dataHoraInicio":"2026-09-15T19:41:42.156Z","dataHoraFim":"2026-09-15T20:41:42.156Z","dataInicio":"2026-09-14T18:41:42.156Z","dataFim":"2026-09-16T18:41:42.156Z","dataVencimento":"2026-10-15T18:41:42.156Z","ativo":true},"requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.182Z","level":"debug","service":"beauty-core-api","environment":"test","context":{"nome":"Teste Automatizado","titulo":"Teste Automatizado","descricao":"Descri├º├úo teste","observacoes":"Observa├º├úo teste","telefone":"83999999999","email":"teste@beautycore.local","senha":"Teste@123456","senhaAtual":"Teste@123456","novaSenha":"Teste@654321","role":"GERENTE","status":"ATIVO","tipo":"RECEITA","canal":"SISTEMA","prioridade":"NORMAL","valor":100,"preco":100,"quantidade":1,"pontos":10,"sessoes":5,"clienteId":"00000000-0000-4000-8000-000000000001","usuarioId":"00000000-0000-4000-8000-000000000001","profissionalId":"00000000-0000-4000-8000-000000000001","servicoId":"00000000-0000-4000-8000-000000000001","unidadeId":"00000000-0000-4000-8000-000000000001","pacoteId":"00000000-0000-4000-8000-000000000001","clientePacoteId":"00000000-0000-4000-8000-000000000001","categoriaId":"00000000-0000-4000-8000-000000000001","agendamentoId":"00000000-0000-4000-8000-000000000001","arquivoId":"00000000-0000-4000-8000-000000000001","mensagemId":"00000000-0000-4000-8000-000000000001","dataHoraInicio":"2026-09-15T19:41:42.156Z","dataHoraFim":"2026-09-15T20:41:42.156Z","dataInicio":"2026-09-14T18:41:42.156Z","dataFim":"2026-09-16T18:41:42.156Z","dataVencimento":"2026-10-15T18:41:42.156Z","ativo":true},"message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.183Z","level":"verbose","service":"beauty-core-api","environment":"test","context":null,"message":null,"requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.183Z","level":"verbose","service":"beauty-core-api","environment":"test","context":null,"message":"00000000-0000-4000-8000-000000000101","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.183Z","level":"verbose","service":"beauty-core-api","environment":"test","context":null,"message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.183Z","level":"verbose","service":"beauty-core-api","environment":"test","context":"00000000-0000-4000-8000-000000000101","message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.183Z","level":"verbose","service":"beauty-core-api","environment":"test","context":"00000000-0000-4000-8000-000000000001","message":"00000000-0000-4000-8000-000000000101","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.183Z","level":"verbose","service":"beauty-core-api","environment":"test","context":{"page":1,"limit":10},"message":"00000000-0000-4000-8000-000000000101","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.183Z","level":"verbose","service":"beauty-core-api","environment":"test","context":"00000000-0000-4000-8000-000000000101","message":{"page":1,"limit":10},"requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.183Z","level":"verbose","service":"beauty-core-api","environment":"test","context":{"nome":"Teste Automatizado","titulo":"Teste Automatizado","descricao":"Descri├º├úo teste","observacoes":"Observa├º├úo teste","telefone":"83999999999","email":"teste@beautycore.local","senha":"Teste@123456","senhaAtual":"Teste@123456","novaSenha":"Teste@654321","role":"GERENTE","status":"ATIVO","tipo":"RECEITA","canal":"SISTEMA","prioridade":"NORMAL","valor":100,"preco":100,"quantidade":1,"pontos":10,"sessoes":5,"clienteId":"00000000-0000-4000-8000-000000000001","usuarioId":"00000000-0000-4000-8000-000000000001","profissionalId":"00000000-0000-4000-8000-000000000001","servicoId":"00000000-0000-4000-8000-000000000001","unidadeId":"00000000-0000-4000-8000-000000000001","pacoteId":"00000000-0000-4000-8000-000000000001","clientePacoteId":"00000000-0000-4000-8000-000000000001","categoriaId":"00000000-0000-4000-8000-000000000001","agendamentoId":"00000000-0000-4000-8000-000000000001","arquivoId":"00000000-0000-4000-8000-000000000001","mensagemId":"00000000-0000-4000-8000-000000000001","dataHoraInicio":"2026-09-15T19:41:42.156Z","dataHoraFim":"2026-09-15T20:41:42.156Z","dataInicio":"2026-09-14T18:41:42.156Z","dataFim":"2026-09-16T18:41:42.156Z","dataVencimento":"2026-10-15T18:41:42.156Z","ativo":true},"message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.184Z","level":"verbose","service":"beauty-core-api","environment":"test","context":"00000000-0000-4000-8000-000000000101","message":{"nome":"Teste Automatizado","titulo":"Teste Automatizado","descricao":"Descri├º├úo teste","observacoes":"Observa├º├úo teste","telefone":"83999999999","email":"teste@beautycore.local","senha":"Teste@123456","senhaAtual":"Teste@123456","novaSenha":"Teste@654321","role":"GERENTE","status":"ATIVO","tipo":"RECEITA","canal":"SISTEMA","prioridade":"NORMAL","valor":100,"preco":100,"quantidade":1,"pontos":10,"sessoes":5,"clienteId":"00000000-0000-4000-8000-000000000001","usuarioId":"00000000-0000-4000-8000-000000000001","profissionalId":"00000000-0000-4000-8000-000000000001","servicoId":"00000000-0000-4000-8000-000000000001","unidadeId":"00000000-0000-4000-8000-000000000001","pacoteId":"00000000-0000-4000-8000-000000000001","clientePacoteId":"00000000-0000-4000-8000-000000000001","categoriaId":"00000000-0000-4000-8000-000000000001","agendamentoId":"00000000-0000-4000-8000-000000000001","arquivoId":"00000000-0000-4000-8000-000000000001","mensagemId":"00000000-0000-4000-8000-000000000001","dataHoraInicio":"2026-09-15T19:41:42.156Z","dataHoraFim":"2026-09-15T20:41:42.156Z","dataInicio":"2026-09-14T18:41:42.156Z","dataFim":"2026-09-16T18:41:42.156Z","dataVencimento":"2026-10-15T18:41:42.156Z","ativo":true},"requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.184Z","level":"verbose","service":"beauty-core-api","environment":"test","context":{"nome":"Teste Automatizado","titulo":"Teste Automatizado","descricao":"Descri├º├úo teste","observacoes":"Observa├º├úo teste","telefone":"83999999999","email":"teste@beautycore.local","senha":"Teste@123456","senhaAtual":"Teste@123456","novaSenha":"Teste@654321","role":"GERENTE","status":"ATIVO","tipo":"RECEITA","canal":"SISTEMA","prioridade":"NORMAL","valor":100,"preco":100,"quantidade":1,"pontos":10,"sessoes":5,"clienteId":"00000000-0000-4000-8000-000000000001","usuarioId":"00000000-0000-4000-8000-000000000001","profissionalId":"00000000-0000-4000-8000-000000000001","servicoId":"00000000-0000-4000-8000-000000000001","unidadeId":"00000000-0000-4000-8000-000000000001","pacoteId":"00000000-0000-4000-8000-000000000001","clientePacoteId":"00000000-0000-4000-8000-000000000001","categoriaId":"00000000-0000-4000-8000-000000000001","agendamentoId":"00000000-0000-4000-8000-000000000001","arquivoId":"00000000-0000-4000-8000-000000000001","mensagemId":"00000000-0000-4000-8000-000000000001","dataHoraInicio":"2026-09-15T19:41:42.156Z","dataHoraFim":"2026-09-15T20:41:42.156Z","dataInicio":"2026-09-14T18:41:42.156Z","dataFim":"2026-09-16T18:41:42.156Z","dataVencimento":"2026-10-15T18:41:42.156Z","ativo":true},"message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.error
      {"timestamp":"2026-09-15T18:41:42.184Z","level":"fatal","service":"beauty-core-api","environment":"test","context":null,"message":null,"requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
    [0m [90m 114 |[39m
     [90m 115 |[39m     [36mif[39m (level [33m===[39m [32m'error'[39m [33m||[39m level [33m===[39m [32m'fatal'[39m) {
    [31m[1m>[22m[39m[90m 116 |[39m       console[33m.[39merror(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 117 |[39m       [36mreturn[39m[33m;[39m
     [90m 118 |[39m     }
     [90m 119 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:116:15)
      at StructuredLoggerService.fatal (src/common/logger/structured-logger.service.ts:78:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.error
      {"timestamp":"2026-09-15T18:41:42.184Z","level":"fatal","service":"beauty-core-api","environment":"test","context":null,"message":"00000000-0000-4000-8000-000000000101","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
    [0m [90m 114 |[39m
     [90m 115 |[39m     [36mif[39m (level [33m===[39m [32m'error'[39m [33m||[39m level [33m===[39m [32m'fatal'[39m) {
    [31m[1m>[22m[39m[90m 116 |[39m       console[33m.[39merror(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 117 |[39m       [36mreturn[39m[33m;[39m
     [90m 118 |[39m     }
     [90m 119 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:116:15)
      at StructuredLoggerService.fatal (src/common/logger/structured-logger.service.ts:78:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.error
      {"timestamp":"2026-09-15T18:41:42.184Z","level":"fatal","service":"beauty-core-api","environment":"test","context":null,"message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
    [0m [90m 114 |[39m
     [90m 115 |[39m     [36mif[39m (level [33m===[39m [32m'error'[39m [33m||[39m level [33m===[39m [32m'fatal'[39m) {
    [31m[1m>[22m[39m[90m 116 |[39m       console[33m.[39merror(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 117 |[39m       [36mreturn[39m[33m;[39m
     [90m 118 |[39m     }
     [90m 119 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:116:15)
      at StructuredLoggerService.fatal (src/common/logger/structured-logger.service.ts:78:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.error
      {"timestamp":"2026-09-15T18:41:42.184Z","level":"fatal","service":"beauty-core-api","environment":"test","context":"00000000-0000-4000-8000-000000000101","message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
    [0m [90m 114 |[39m
     [90m 115 |[39m     [36mif[39m (level [33m===[39m [32m'error'[39m [33m||[39m level [33m===[39m [32m'fatal'[39m) {
    [31m[1m>[22m[39m[90m 116 |[39m       console[33m.[39merror(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 117 |[39m       [36mreturn[39m[33m;[39m
     [90m 118 |[39m     }
     [90m 119 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:116:15)
      at StructuredLoggerService.fatal (src/common/logger/structured-logger.service.ts:78:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.error
      {"timestamp":"2026-09-15T18:41:42.184Z","level":"fatal","service":"beauty-core-api","environment":"test","context":"00000000-0000-4000-8000-000000000001","message":"00000000-0000-4000-8000-000000000101","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
    [0m [90m 114 |[39m
     [90m 115 |[39m     [36mif[39m (level [33m===[39m [32m'error'[39m [33m||[39m level [33m===[39m [32m'fatal'[39m) {
    [31m[1m>[22m[39m[90m 116 |[39m       console[33m.[39merror(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 117 |[39m       [36mreturn[39m[33m;[39m
     [90m 118 |[39m     }
     [90m 119 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:116:15)
      at StructuredLoggerService.fatal (src/common/logger/structured-logger.service.ts:78:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.error
      {"timestamp":"2026-09-15T18:41:42.184Z","level":"fatal","service":"beauty-core-api","environment":"test","context":{"page":1,"limit":10},"message":"00000000-0000-4000-8000-000000000101","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
    [0m [90m 114 |[39m
     [90m 115 |[39m     [36mif[39m (level [33m===[39m [32m'error'[39m [33m||[39m level [33m===[39m [32m'fatal'[39m) {
    [31m[1m>[22m[39m[90m 116 |[39m       console[33m.[39merror(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 117 |[39m       [36mreturn[39m[33m;[39m
     [90m 118 |[39m     }
     [90m 119 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:116:15)
      at StructuredLoggerService.fatal (src/common/logger/structured-logger.service.ts:78:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.error
      {"timestamp":"2026-09-15T18:41:42.185Z","level":"fatal","service":"beauty-core-api","environment":"test","context":"00000000-0000-4000-8000-000000000101","message":{"page":1,"limit":10},"requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
    [0m [90m 114 |[39m
     [90m 115 |[39m     [36mif[39m (level [33m===[39m [32m'error'[39m [33m||[39m level [33m===[39m [32m'fatal'[39m) {
    [31m[1m>[22m[39m[90m 116 |[39m       console[33m.[39merror(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 117 |[39m       [36mreturn[39m[33m;[39m
     [90m 118 |[39m     }
     [90m 119 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:116:15)
      at StructuredLoggerService.fatal (src/common/logger/structured-logger.service.ts:78:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.error
      {"timestamp":"2026-09-15T18:41:42.185Z","level":"fatal","service":"beauty-core-api","environment":"test","context":{"nome":"Teste Automatizado","titulo":"Teste Automatizado","descricao":"Descri├º├úo teste","observacoes":"Observa├º├úo teste","telefone":"83999999999","email":"teste@beautycore.local","senha":"Teste@123456","senhaAtual":"Teste@123456","novaSenha":"Teste@654321","role":"GERENTE","status":"ATIVO","tipo":"RECEITA","canal":"SISTEMA","prioridade":"NORMAL","valor":100,"preco":100,"quantidade":1,"pontos":10,"sessoes":5,"clienteId":"00000000-0000-4000-8000-000000000001","usuarioId":"00000000-0000-4000-8000-000000000001","profissionalId":"00000000-0000-4000-8000-000000000001","servicoId":"00000000-0000-4000-8000-000000000001","unidadeId":"00000000-0000-4000-8000-000000000001","pacoteId":"00000000-0000-4000-8000-000000000001","clientePacoteId":"00000000-0000-4000-8000-000000000001","categoriaId":"00000000-0000-4000-8000-000000000001","agendamentoId":"00000000-0000-4000-8000-000000000001","arquivoId":"00000000-0000-4000-8000-000000000001","mensagemId":"00000000-0000-4000-8000-000000000001","dataHoraInicio":"2026-09-15T19:41:42.156Z","dataHoraFim":"2026-09-15T20:41:42.156Z","dataInicio":"2026-09-14T18:41:42.156Z","dataFim":"2026-09-16T18:41:42.156Z","dataVencimento":"2026-10-15T18:41:42.156Z","ativo":true},"message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
    [0m [90m 114 |[39m
     [90m 115 |[39m     [36mif[39m (level [33m===[39m [32m'error'[39m [33m||[39m level [33m===[39m [32m'fatal'[39m) {
    [31m[1m>[22m[39m[90m 116 |[39m       console[33m.[39merror(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 117 |[39m       [36mreturn[39m[33m;[39m
     [90m 118 |[39m     }
     [90m 119 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:116:15)
      at StructuredLoggerService.fatal (src/common/logger/structured-logger.service.ts:78:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.error
      {"timestamp":"2026-09-15T18:41:42.185Z","level":"fatal","service":"beauty-core-api","environment":"test","context":"00000000-0000-4000-8000-000000000101","message":{"nome":"Teste Automatizado","titulo":"Teste Automatizado","descricao":"Descri├º├úo teste","observacoes":"Observa├º├úo teste","telefone":"83999999999","email":"teste@beautycore.local","senha":"Teste@123456","senhaAtual":"Teste@123456","novaSenha":"Teste@654321","role":"GERENTE","status":"ATIVO","tipo":"RECEITA","canal":"SISTEMA","prioridade":"NORMAL","valor":100,"preco":100,"quantidade":1,"pontos":10,"sessoes":5,"clienteId":"00000000-0000-4000-8000-000000000001","usuarioId":"00000000-0000-4000-8000-000000000001","profissionalId":"00000000-0000-4000-8000-000000000001","servicoId":"00000000-0000-4000-8000-000000000001","unidadeId":"00000000-0000-4000-8000-000000000001","pacoteId":"00000000-0000-4000-8000-000000000001","clientePacoteId":"00000000-0000-4000-8000-000000000001","categoriaId":"00000000-0000-4000-8000-000000000001","agendamentoId":"00000000-0000-4000-8000-000000000001","arquivoId":"00000000-0000-4000-8000-000000000001","mensagemId":"00000000-0000-4000-8000-000000000001","dataHoraInicio":"2026-09-15T19:41:42.156Z","dataHoraFim":"2026-09-15T20:41:42.156Z","dataInicio":"2026-09-14T18:41:42.156Z","dataFim":"2026-09-16T18:41:42.156Z","dataVencimento":"2026-10-15T18:41:42.156Z","ativo":true},"requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
    [0m [90m 114 |[39m
     [90m 115 |[39m     [36mif[39m (level [33m===[39m [32m'error'[39m [33m||[39m level [33m===[39m [32m'fatal'[39m) {
    [31m[1m>[22m[39m[90m 116 |[39m       console[33m.[39merror(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 117 |[39m       [36mreturn[39m[33m;[39m
     [90m 118 |[39m     }
     [90m 119 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:116:15)
      at StructuredLoggerService.fatal (src/common/logger/structured-logger.service.ts:78:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.error
      {"timestamp":"2026-09-15T18:41:42.185Z","level":"fatal","service":"beauty-core-api","environment":"test","context":{"nome":"Teste Automatizado","titulo":"Teste Automatizado","descricao":"Descri├º├úo teste","observacoes":"Observa├º├úo teste","telefone":"83999999999","email":"teste@beautycore.local","senha":"Teste@123456","senhaAtual":"Teste@123456","novaSenha":"Teste@654321","role":"GERENTE","status":"ATIVO","tipo":"RECEITA","canal":"SISTEMA","prioridade":"NORMAL","valor":100,"preco":100,"quantidade":1,"pontos":10,"sessoes":5,"clienteId":"00000000-0000-4000-8000-000000000001","usuarioId":"00000000-0000-4000-8000-000000000001","profissionalId":"00000000-0000-4000-8000-000000000001","servicoId":"00000000-0000-4000-8000-000000000001","unidadeId":"00000000-0000-4000-8000-000000000001","pacoteId":"00000000-0000-4000-8000-000000000001","clientePacoteId":"00000000-0000-4000-8000-000000000001","categoriaId":"00000000-0000-4000-8000-000000000001","agendamentoId":"00000000-0000-4000-8000-000000000001","arquivoId":"00000000-0000-4000-8000-000000000001","mensagemId":"00000000-0000-4000-8000-000000000001","dataHoraInicio":"2026-09-15T19:41:42.156Z","dataHoraFim":"2026-09-15T20:41:42.156Z","dataInicio":"2026-09-14T18:41:42.156Z","dataFim":"2026-09-16T18:41:42.156Z","dataVencimento":"2026-10-15T18:41:42.156Z","ativo":true},"message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
    [0m [90m 114 |[39m
     [90m 115 |[39m     [36mif[39m (level [33m===[39m [32m'error'[39m [33m||[39m level [33m===[39m [32m'fatal'[39m) {
    [31m[1m>[22m[39m[90m 116 |[39m       console[33m.[39merror(line)[33m;[39m
     [90m     |[39m               [31m[1m^[22m[39m
     [90m 117 |[39m       [36mreturn[39m[33m;[39m
     [90m 118 |[39m     }
     [90m 119 |[39m[0m
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:116:15)
      at StructuredLoggerService.fatal (src/common/logger/structured-logger.service.ts:78:10)
      at test/unit/helpers/coverage-smoke.helper.ts:1089:48
      at runWithTimeout (test/unit/helpers/coverage-smoke.helper.ts:1035:12)
      at exerciseInstance (test/unit/helpers/coverage-smoke.helper.ts:1088:9)
      at Object.<anonymous> (test/unit/infrastructure-expanded.coverage.spec.ts:126:15)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.185Z","service":"beauty-core-api","environment":"test","context":null,"message":null,"requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.185Z","level":"00000000-0000-4000-8000-000000000101","service":"beauty-core-api","environment":"test","context":null,"message":null,"requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.185Z","level":"00000000-0000-4000-8000-000000000001","service":"beauty-core-api","environment":"test","context":null,"message":null,"requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.185Z","level":"00000000-0000-4000-8000-000000000001","service":"beauty-core-api","environment":"test","context":null,"message":"00000000-0000-4000-8000-000000000101","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.186Z","level":"00000000-0000-4000-8000-000000000101","service":"beauty-core-api","environment":"test","context":null,"message":"00000000-0000-4000-8000-000000000001","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.186Z","level":"00000000-0000-4000-8000-000000000101","service":"beauty-core-api","environment":"test","context":null,"message":{"page":1,"limit":10},"requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.186Z","level":{"page":1,"limit":10},"service":"beauty-core-api","environment":"test","context":null,"message":"00000000-0000-4000-8000-000000000101","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.186Z","level":"00000000-0000-4000-8000-000000000001","service":"beauty-core-api","environment":"test","context":null,"message":{"nome":"Teste Automatizado","titulo":"Teste Automatizado","descricao":"Descri├º├úo teste","observacoes":"Observa├º├úo teste","telefone":"83999999999","email":"teste@beautycore.local","senha":"Teste@123456","senhaAtual":"Teste@123456","novaSenha":"Teste@654321","role":"GERENTE","status":"ATIVO","tipo":"RECEITA","canal":"SISTEMA","prioridade":"NORMAL","valor":100,"preco":100,"quantidade":1,"pontos":10,"sessoes":5,"clienteId":"00000000-0000-4000-8000-000000000001","usuarioId":"00000000-0000-4000-8000-000000000001","profissionalId":"00000000-0000-4000-8000-000000000001","servicoId":"00000000-0000-4000-8000-000000000001","unidadeId":"00000000-0000-4000-8000-000000000001","pacoteId":"00000000-0000-4000-8000-000000000001","clientePacoteId":"00000000-0000-4000-8000-000000000001","categoriaId":"00000000-0000-4000-8000-000000000001","agendamentoId":"00000000-0000-4000-8000-000000000001","arquivoId":"00000000-0000-4000-8000-000000000001","mensagemId":"00000000-0000-4000-8000-000000000001","dataHoraInicio":"2026-09-15T19:41:42.156Z","dataHoraFim":"2026-09-15T20:41:42.156Z","dataInicio":"2026-09-14T18:41:42.156Z","dataFim":"2026-09-16T18:41:42.156Z","dataVencimento":"2026-10-15T18:41:42.156Z","ativo":true},"requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.186Z","level":{"nome":"Teste Automatizado","titulo":"Teste Automatizado","descricao":"Descri├º├úo teste","observacoes":"Observa├º├úo teste","telefone":"83999999999","email":"teste@beautycore.local","senha":"Teste@123456","senhaAtual":"Teste@123456","novaSenha":"Teste@654321","role":"GERENTE","status":"ATIVO","tipo":"RECEITA","canal":"SISTEMA","prioridade":"NORMAL","valor":100,"preco":100,"quantidade":1,"pontos":10,"sessoes":5,"clienteId":"00000000-0000-4000-8000-000000000001","usuarioId":"00000000-0000-4000-8000-000000000001","profissionalId":"00000000-0000-4000-8000-000000000001","servicoId":"00000000-0000-4000-8000-000000000001","unidadeId":"00000000-0000-4000-8000-000000000001","pacoteId":"00000000-0000-4000-8000-000000000001","clientePacoteId":"00000000-0000-4000-8000-000000000001","categoriaId":"00000000-0000-4000-8000-000000000001","agendamentoId":"00000000-0000-4000-8000-000000000001","arquivoId":"00000000-0000-4000-8000-000000000001","mensagemId":"00000000-0000-4000-8000-000000000001","dataHoraInicio":"2026-09-15T19:41:42.156Z","dataHoraFim":"2026-09-15T20:41:42.156Z","dataInicio":"2026-09-14T18:41:42.156Z","dataFim":"2026-09-16T18:41:42.156Z","dataVencimento":"2026-10-15T18:41:42.156Z","ativo":true},"service":"beauty-core-api","environment":"test","context":null,"message":"00000000-0000-4000-8000-000000000101","requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
    console.log
      {"timestamp":"2026-09-15T18:41:42.186Z","level":"00000000-0000-4000-8000-000000000001","service":"beauty-core-api","environment":"test","context":"00000000-0000-4000-8000-000000000101","message":{"nome":"Teste Automatizado","titulo":"Teste Automatizado","descricao":"Descri├º├úo teste","observacoes":"Observa├º├úo teste","telefone":"83999999999","email":"teste@beautycore.local","senha":"Teste@123456","senhaAtual":"Teste@123456","novaSenha":"Teste@654321","role":"GERENTE","status":"ATIVO","tipo":"RECEITA","canal":"SISTEMA","prioridade":"NORMAL","valor":100,"preco":100,"quantidade":1,"pontos":10,"sessoes":5,"clienteId":"00000000-0000-4000-8000-000000000001","usuarioId":"00000000-0000-4000-8000-000000000001","profissionalId":"00000000-0000-4000-8000-000000000001","servicoId":"00000000-0000-4000-8000-000000000001","unidadeId":"00000000-0000-4000-8000-000000000001","pacoteId":"00000000-0000-4000-8000-000000000001","clientePacoteId":"00000000-0000-4000-8000-000000000001","categoriaId":"00000000-0000-4000-8000-000000000001","agendamentoId":"00000000-0000-4000-8000-000000000001","arquivoId":"00000000-0000-4000-8000-000000000001","mensagemId":"00000000-0000-4000-8000-000000000001","dataHoraInicio":"2026-09-15T19:41:42.156Z","dataHoraFim":"2026-09-15T20:41:42.156Z","dataInicio":"2026-09-14T18:41:42.156Z","dataFim":"2026-09-16T18:41:42.156Z","dataVencimento":"2026-10-15T18:41:42.156Z","ativo":true},"requestId":null,"correlationId":null,"empresaId":null,"usuarioId":null,"clienteId":null,"role":null,"method":null,"route":null,"ip":null,"userAgent":null,"pid":16132}
System.Management.Automation.RemoteException
      at StructuredLoggerService.write (src/common/logger/structured-logger.service.ts:125:13)
System.Management.Automation.RemoteException
PASS test/unit/modules/usuarios/usuarios-role-filter.spec.ts
PASS test/unit/financeiro-list-movimentacoes-query.dto.spec.ts
PASS test/unit/chat36-backup.coverage.spec.ts
PASS test/unit/agendamentos-query.dto.spec.ts
PASS test/unit/chat03-retention-runtime.spec.ts
PASS test/unit/cliente-area-compatibility.spec.ts
PASS test/unit/chat03-bullmq-retention.spec.ts
PASS test/unit/clientes-pacotes-concurrency.spec.ts
[32m[Nest] 16132  - [39m15/09/2026, 15:41:44 [32m    LOG[39m [38;5;3m[ClientesPacotesService] [39m[32m[CLIENTES_PACOTES] sess├úo utilizada empresaId=empresa-1 clientePacoteId=cliente-pacote-1 clienteId=cliente-1 status=SUCESSO tempoMs=0[39m
PASS test/unit/chat36-lgpd.coverage.spec.ts
PASS test/unit/meta-whatsapp-worker-flow.spec.ts
PASS test/unit/micro-boost.coverage.spec.ts
PASS test/unit/agendamentos-options.spec.ts
PASS test/unit/area-cliente-privacy.spec.ts
PASS test/unit/agendamentos-concurrency.spec.ts
PASS test/unit/storage-roundtrip.spec.ts
PASS test/unit/meta-whatsapp-cloud.provider.spec.ts
PASS test/unit/s3-storage.service.spec.ts
PASS test/unit/analytics-performance-limits.spec.ts
PASS test/unit/meta-whatsapp-cloud-provider-retry.spec.ts
PASS test/unit/tenant-validator.spec.ts
PASS test/unit/usuario-role-policy.coverage.spec.ts
PASS test/unit/utils.coverage.spec.ts
PASS test/unit/usuario-role-policy.spec.ts
PASS test/unit/tenant-services.coverage.spec.ts
PASS test/unit/auth-guards.coverage.spec.ts
PASS test/unit/backup-external-upload.spec.ts
PASS test/unit/env-validation-required.spec.ts
PASS test/unit/env-validation-cors.spec.ts
PASS test/unit/queue-utils.spec.ts
PASS test/unit/queues-utils.coverage.spec.ts
PASS test/unit/sanity.spec.ts
System.Management.Automation.RemoteException
Test Suites: 38 passed, 38 total
Tests:       1498 passed, 1498 total
Snapshots:   0 total
Time:        24.28 s, estimated 25 s
Ran all test suites.
```

## Operacoes nao executadas

- Nenhum arquivo de codigo foi alterado.
- Nenhum --fix, build, E2E, migration, workflow ou operacao Git foi executado.

Status: BLOCKED
