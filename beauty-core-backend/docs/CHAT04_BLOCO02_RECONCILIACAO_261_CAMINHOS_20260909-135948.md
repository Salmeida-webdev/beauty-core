# BEAUTY CORE 1.0 - CHAT 04 - BLOCO 02 - RECONCILIACAO DOS 261 CAMINHOS

- Data/hora: 2026-09-09 13:59:48 -03:00
- Branch: main
- HEAD: 9374f86e05e522a501cbcec3bf14175cd46e3b47
- origin/main: ba6baa2c6cc08ddbc8aa17bee638071880b12bd1
- Status total antes do relatorio: 262
- Artefatos CHAT04 excluidos da baseline: 1
- Conjunto preservado reconciliado: 261
- Tracked: 259
- Untracked: 2
- Staged: 0

> Este bloco nao modifica, descarta, stageia ou commita nenhum dos caminhos preservados.
> O objetivo e produzir inventario, classificacao de risco e snapshot criptografico antes da revisao de conteudo.

## Gates quantitativos

- Baseline 261: **PASS**
- Tracked 259: **PASS**
- Untracked 2: **PASS**
- Staged 0: **PASS**
- git diff --check: **PASS**

## Artefatos do Chat 04 excluidos da baseline

- ?? beauty-core-backend/docs/CHAT04_BLOCO01_BASELINE_FINAL_20260909-135604.md

## Resumo por categoria

| Categoria | Quantidade |
|---|---:|
| BUSINESS_MODULE | 114 |
| AUTH_SECURITY | 41 |
| TEST | 27 |
| QUEUE_SCHEDULER | 20 |
| META_WHATSAPP | 18 |
| STORAGE_BACKUP_LGPD | 14 |
| TENANCY | 12 |
| CORE_INFRA | 7 |
| ENV_EXAMPLE | 5 |
| PRISMA_MIGRATION | 1 |
| PRISMA_SCHEMA | 1 |
| OTHER | 1 |

## Resumo por risco

| Risco | Quantidade |
|---|---:|
| MEDIUM | 149 |
| HIGH | 85 |
| EVIDENCE | 27 |

## Untracked preservados

- beauty-core-backend/prisma/migrations/20260909150000_meta_whatsapp_webhook/migration.sql
- beauty-core-backend/test/e2e/meta-whatsapp-webhook.e2e-spec.ts

## Caminhos HIGH

- [ENV_EXAMPLE] beauty-core-backend/.env.dev.example
- [ENV_EXAMPLE] beauty-core-backend/.env.example
- [ENV_EXAMPLE] beauty-core-backend/.env.prod.example
- [ENV_EXAMPLE] beauty-core-backend/.env.production.example
- [ENV_EXAMPLE] beauty-core-backend/.env.staging.example
- [PRISMA_SCHEMA] beauty-core-backend/prisma/schema.prisma
- [CORE_INFRA] beauty-core-backend/src/app.module.ts
- [AUTH_SECURITY] beauty-core-backend/src/common/filters/http-exception.filter.ts
- [AUTH_SECURITY] beauty-core-backend/src/common/interceptors/audit-log.interceptor.ts
- [CORE_INFRA] beauty-core-backend/src/common/metrics/guards/metrics-auth.guard.ts
- [CORE_INFRA] beauty-core-backend/src/common/metrics/metrics.controller.ts
- [CORE_INFRA] beauty-core-backend/src/common/metrics/metrics.module.ts
- [CORE_INFRA] beauty-core-backend/src/common/metrics/metrics.service.ts
- [AUTH_SECURITY] beauty-core-backend/src/config/env.validation.ts
- [AUTH_SECURITY] beauty-core-backend/src/config/swagger.config.ts
- [CORE_INFRA] beauty-core-backend/src/database/prisma/prisma.module.ts
- [CORE_INFRA] beauty-core-backend/src/database/prisma/prisma.service.ts
- [AUTH_SECURITY] beauty-core-backend/src/main.ts
- [META_WHATSAPP] beauty-core-backend/src/modules/area-cliente/dto/enviar-portal-mensagem-whatsapp.dto.ts
- [AUTH_SECURITY] beauty-core-backend/src/modules/auditoria/auditoria.controller.ts
- [AUTH_SECURITY] beauty-core-backend/src/modules/auditoria/auditoria.module.ts
- [AUTH_SECURITY] beauty-core-backend/src/modules/auditoria/auditoria.service.ts
- [AUTH_SECURITY] beauty-core-backend/src/modules/auditoria/dto/create-auditoria.dto.ts
- [AUTH_SECURITY] beauty-core-backend/src/modules/auditoria/dto/filtros-auditoria.dto.ts
- [AUTH_SECURITY] beauty-core-backend/src/modules/auth-cliente/auth-cliente-publico.controller.ts
- [AUTH_SECURITY] beauty-core-backend/src/modules/auth-cliente/auth-cliente.controller.ts
- [AUTH_SECURITY] beauty-core-backend/src/modules/auth-cliente/auth-cliente.module.ts
- [AUTH_SECURITY] beauty-core-backend/src/modules/auth-cliente/auth-cliente.service.ts
- [AUTH_SECURITY] beauty-core-backend/src/modules/auth-cliente/dto/aceitar-termos.dto.ts
- [AUTH_SECURITY] beauty-core-backend/src/modules/auth-cliente/dto/refresh-cliente-token.dto.ts
- [AUTH_SECURITY] beauty-core-backend/src/modules/auth-cliente/dto/solicitar-codigo.dto.ts
- [AUTH_SECURITY] beauty-core-backend/src/modules/auth-cliente/dto/verificar-codigo.dto.ts
- [AUTH_SECURITY] beauty-core-backend/src/modules/auth-cliente/guards/cliente-auth.guard.ts
- [AUTH_SECURITY] beauty-core-backend/src/modules/auth-cliente/strategies/cliente-jwt.strategy.ts
- [AUTH_SECURITY] beauty-core-backend/src/modules/auth/auth.controller.ts
- [AUTH_SECURITY] beauty-core-backend/src/modules/auth/auth.module.ts
- [AUTH_SECURITY] beauty-core-backend/src/modules/auth/auth.service.ts
- [AUTH_SECURITY] beauty-core-backend/src/modules/auth/dto/login.dto.ts
- [AUTH_SECURITY] beauty-core-backend/src/modules/auth/dto/refresh-token.dto.ts
- [AUTH_SECURITY] beauty-core-backend/src/modules/auth/guards/jwt-auth.guard.ts
- [AUTH_SECURITY] beauty-core-backend/src/modules/auth/guards/roles.guard.ts
- [AUTH_SECURITY] beauty-core-backend/src/modules/auth/strategies/jwt.strategy.ts
- [META_WHATSAPP] beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.controller.ts
- [META_WHATSAPP] beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.module.ts
- [META_WHATSAPP] beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts
- [META_WHATSAPP] beauty-core-backend/src/modules/campanhas-whatsapp/dto/create-campanha-whatsapp.dto.ts
- [META_WHATSAPP] beauty-core-backend/src/modules/campanhas-whatsapp/dto/update-campanha-whatsapp.dto.ts
- [META_WHATSAPP] beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.controller.ts
- [META_WHATSAPP] beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.module.ts
- [META_WHATSAPP] beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts
- [META_WHATSAPP] beauty-core-backend/src/modules/configuracao-whatsapp/dto/create-configuracao-whatsapp.dto.ts
- [META_WHATSAPP] beauty-core-backend/src/modules/configuracao-whatsapp/dto/update-configuracao-whatsapp.dto.ts
- [META_WHATSAPP] beauty-core-backend/src/modules/templates-whatsapp/dto/create-template-whatsapp.dto.ts
- [META_WHATSAPP] beauty-core-backend/src/modules/templates-whatsapp/dto/update-template-whatsapp.dto.ts
- [META_WHATSAPP] beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.controller.ts
- [META_WHATSAPP] beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.module.ts
- [META_WHATSAPP] beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.service.ts
- [TENANCY] beauty-core-backend/src/modules/tenant-publico/public-tenant.controller.ts
- [TENANCY] beauty-core-backend/src/modules/tenant-publico/tenant-publico.controller.ts
- [TENANCY] beauty-core-backend/src/modules/tenant-publico/tenant-publico.module.ts
- [AUTH_SECURITY] beauty-core-backend/src/modules/usuarios/policies/usuario-role.policy.ts
- [META_WHATSAPP] beauty-core-backend/src/queues/jobs/whatsapp.job.ts
- [AUTH_SECURITY] beauty-core-backend/src/shared/decorators/roles.decorator.ts
- [TENANCY] beauty-core-backend/src/shared/tenant/index.ts
- [TENANCY] beauty-core-backend/src/shared/tenant/tenant-public.service.ts
- [TENANCY] beauty-core-backend/src/shared/tenant/tenant-validator.service.ts
- [TENANCY] beauty-core-backend/src/shared/tenant/tenant.module.ts
- [TENANCY] beauty-core-backend/src/shared/utils/get-empresa-id.ts
- [AUTH_SECURITY] beauty-core-backend/test/e2e/auditoria.e2e-spec.ts
- [AUTH_SECURITY] beauty-core-backend/test/e2e/auth-admin.e2e-spec.ts
- [AUTH_SECURITY] beauty-core-backend/test/e2e/auth-cliente.e2e-spec.ts
- [TENANCY] beauty-core-backend/test/e2e/multiempresa.e2e-spec.ts
- [AUTH_SECURITY] beauty-core-backend/test/e2e/roles.e2e-spec.ts
- [AUTH_SECURITY] beauty-core-backend/test/e2e/swagger-validation.e2e-spec.ts
- [TENANCY] beauty-core-backend/test/e2e/tenant.e2e-spec.ts
- [AUTH_SECURITY] beauty-core-backend/test/helpers/auth.helper.ts
- [AUTH_SECURITY] beauty-core-backend/test/unit/auth-guards.coverage.spec.ts
- [AUTH_SECURITY] beauty-core-backend/test/unit/env-validation-cors.spec.ts
- [AUTH_SECURITY] beauty-core-backend/test/unit/env-validation-required.spec.ts
- [TENANCY] beauty-core-backend/test/unit/tenant-services.coverage.spec.ts
- [TENANCY] beauty-core-backend/test/unit/tenant-validator.spec.ts
- [AUTH_SECURITY] beauty-core-backend/test/unit/usuario-role-policy.coverage.spec.ts
- [AUTH_SECURITY] beauty-core-backend/test/unit/usuario-role-policy.spec.ts
- [PRISMA_MIGRATION] beauty-core-backend/prisma/migrations/20260909150000_meta_whatsapp_webhook/migration.sql
- [META_WHATSAPP] beauty-core-backend/test/e2e/meta-whatsapp-webhook.e2e-spec.ts

## Inventario completo

| Status | Categoria | Risco | + | - | Bytes | SHA256 | Caminho |
|---|---|---|---:|---:|---:|---|---|
|  M | AUTH_SECURITY | HIGH | 1 | 3 | 3091 | CA492592C252224AD6B0B2B15B613F9C5575B74A7DCD184682996F55D0A502B6 | beauty-core-backend/src/common/filters/http-exception.filter.ts |
|  M | AUTH_SECURITY | HIGH | 7 | 22 | 6725 | 6AA7E8455D3B0454A43FEA4F1913C6A14322E052DDF89221FDD7D358C1DFE3BF | beauty-core-backend/src/common/interceptors/audit-log.interceptor.ts |
|  M | AUTH_SECURITY | HIGH | 1 | 1 | 2901 | 5DAC6650C81EC8A7F2748A9F485F34D447E0C08D36A5EA1D084CF56F5AC10786 | beauty-core-backend/src/config/env.validation.ts |
|  M | AUTH_SECURITY | HIGH | 1 | 1 | 841 | 1566D89D65F9774125715F805B77A24833A7C09FB29BCC45662C6083B2703B58 | beauty-core-backend/src/config/swagger.config.ts |
|  M | AUTH_SECURITY | HIGH | 7 | 10 | 5199 | 0385652D70F2B31AA67456A5AC5815FEF7079B5F9390D60D2753AA94EE25350B | beauty-core-backend/src/main.ts |
|  M | AUTH_SECURITY | HIGH | 26 | 42 | 17803 | BD932D2FB94DD684FD03EAE1551FF85B902E9CECB7A819B7DA068F5F73E61190 | beauty-core-backend/src/modules/auditoria/auditoria.controller.ts |
|  M | AUTH_SECURITY | HIGH | 5 | 13 | 424 | 91E7B605C77A96CD4C5468A7EA7C08D9C864B56901904DF10403676EA32AD4C4 | beauty-core-backend/src/modules/auditoria/auditoria.module.ts |
|  M | AUTH_SECURITY | HIGH | 27 | 43 | 21984 | 0FE399695B959BFB1771DD7032451026416EA7A51238D8A6DA1E88E72E599301 | beauty-core-backend/src/modules/auditoria/auditoria.service.ts |
|  M | AUTH_SECURITY | HIGH | 1 | 1 | 1043 | 9C1251EF42A8A7F9F7E0C917182FF0E424149618B180A902F6DF1363119CC483 | beauty-core-backend/src/modules/auditoria/dto/create-auditoria.dto.ts |
|  M | AUTH_SECURITY | HIGH | 2 | 7 | 4089 | 2A416E823F7BB734FBA6C26FE4DE5308DB5888537B552CBCD4317FC1AFDB3B1B | beauty-core-backend/src/modules/auditoria/dto/filtros-auditoria.dto.ts |
|  M | AUTH_SECURITY | HIGH | 6 | 16 | 7309 | F81AD37841C83612B3D9C13F37D8A9CAC31980EF64C8FF04DB92CDACCCBEC119 | beauty-core-backend/src/modules/auth/auth.controller.ts |
|  M | AUTH_SECURITY | HIGH | 1 | 5 | 1071 | 4B7F27B3C5CB698F1B11579B324B8FF3C485DBCDBC98AE5484415888A1C67A8C | beauty-core-backend/src/modules/auth/auth.module.ts |
|  M | AUTH_SECURITY | HIGH | 21 | 15 | 14735 | 5E7EABC6E22DD5DD353B148ACC2BD179834721A15B6973CB0F4928940745D437 | beauty-core-backend/src/modules/auth/auth.service.ts |
|  M | AUTH_SECURITY | HIGH | 1 | 1 | 602 | 2C22B4E72AD9C2690029F40DB1E36310E7EFDD639C9A3AC97D70C4C0EBB9DE90 | beauty-core-backend/src/modules/auth/dto/login.dto.ts |
|  M | AUTH_SECURITY | HIGH | 2 | 1 | 373 | 75A2F45778CAA36AD8B6D126FD14458FDDA3F682983AD5AF2827C48521BEA539 | beauty-core-backend/src/modules/auth/dto/refresh-token.dto.ts |
|  M | AUTH_SECURITY | HIGH | 1 | 1 | 165 | 86F01FC8F2C8DC7A5D29859DEE9467CCB4A7611FC82A79BEEE69FC71EFCE4308 | beauty-core-backend/src/modules/auth/guards/jwt-auth.guard.ts |
|  M | AUTH_SECURITY | HIGH | 2 | 6 | 739 | 657A4365F2A1978F94BDEE89ACE1D9060FA73696633E0766BD84003138A45460 | beauty-core-backend/src/modules/auth/guards/roles.guard.ts |
|  M | AUTH_SECURITY | HIGH | 4 | 5 | 3851 | B44B60C9C193FF28E55CEDE868947DD61BA74F5CDB306B7791A46547CEF67D8B | beauty-core-backend/src/modules/auth/strategies/jwt.strategy.ts |
|  M | AUTH_SECURITY | HIGH | 9 | 34 | 11120 | 998066D5743AE1DC7B320279753A8189EE670DA1AE8170919716D3EAF8B2CBD6 | beauty-core-backend/src/modules/auth-cliente/auth-cliente.controller.ts |
|  M | AUTH_SECURITY | HIGH | 4 | 12 | 1342 | 5297F4E335D3EBF07A8360E1FB0C5FFEDC441E12B99AEEC6A51DBEA4096661F5 | beauty-core-backend/src/modules/auth-cliente/auth-cliente.module.ts |
|  M | AUTH_SECURITY | HIGH | 37 | 55 | 28326 | 0ECA2C9115B3AD7B903766B93C9FF38A17F2D89D5D51F62874B6C33FBEE4C0EB | beauty-core-backend/src/modules/auth-cliente/auth-cliente.service.ts |
|  M | AUTH_SECURITY | HIGH | 3 | 11 | 5835 | 217307E40C296D532279AB7671CA69A72A5022B6BA0C4AE978AA6E289918EC33 | beauty-core-backend/src/modules/auth-cliente/auth-cliente-publico.controller.ts |
|  M | AUTH_SECURITY | HIGH | 1 | 1 | 431 | 6E60C127148391768FB1389CE60C8E7CCB4AAF829AB3C8E4C6B20DF5E8733B41 | beauty-core-backend/src/modules/auth-cliente/dto/aceitar-termos.dto.ts |
|  M | AUTH_SECURITY | HIGH | 2 | 1 | 382 | 1E15D8C1B530E539A289E15D61DD46EEED57B563AB52C71A89642CD86551AE9E | beauty-core-backend/src/modules/auth-cliente/dto/refresh-cliente-token.dto.ts |
|  M | AUTH_SECURITY | HIGH | 4 | 13 | 1635 | F25D1D651ACA25635E57351CB993C7D442E1717EDA126D59D239E8566CE30DFD | beauty-core-backend/src/modules/auth-cliente/dto/solicitar-codigo.dto.ts |
|  M | AUTH_SECURITY | HIGH | 2 | 10 | 2098 | F2741C34E2BB9196F5CE5EDACC2447884ED909616647C117D7FDE2D8828DD990 | beauty-core-backend/src/modules/auth-cliente/dto/verificar-codigo.dto.ts |
|  M | AUTH_SECURITY | HIGH | 1 | 1 | 177 | E88A4F193BAB7769EFBB6B4E225337D1725FB98D07863E63FBB76D5D5BA1E610 | beauty-core-backend/src/modules/auth-cliente/guards/cliente-auth.guard.ts |
|  M | AUTH_SECURITY | HIGH | 1 | 3 | 3800 | B98E374709ED18CCEA7A800100EBA5DFF4F691BC436577DE107D7573F275D369 | beauty-core-backend/src/modules/auth-cliente/strategies/cliente-jwt.strategy.ts |
|  M | AUTH_SECURITY | HIGH | 2 | 4 | 5632 | 08347731362FF870A2BD6D183030E3BC0B0860E74223A07135F589F0FAC3710D | beauty-core-backend/src/modules/usuarios/policies/usuario-role.policy.ts |
|  M | AUTH_SECURITY | HIGH | 1 | 2 | 163 | 82FF16CE8FB2BED6968D205E407E129B81DE1C0CB25560F601523A97B41115E0 | beauty-core-backend/src/shared/decorators/roles.decorator.ts |
|  M | AUTH_SECURITY | HIGH | 6 | 4 | 1242 | 48F0BFE5138A8CB8C4E0CBCD3A487E2A15483739BE14E7D08D8606B9509C0014 | beauty-core-backend/test/e2e/auditoria.e2e-spec.ts |
|  M | AUTH_SECURITY | HIGH | 17 | 7 | 2887 | 4C5D055E1DF47C2D8BD8C5CD42C7DDC988A03FD936C6DCC708CC716F396DD291 | beauty-core-backend/test/e2e/auth-admin.e2e-spec.ts |
|  M | AUTH_SECURITY | HIGH | 39 | 14 | 3736 | C2D5D43FEEB2E5F5F4CB72367B1FB94039029FCC9D32AFA9D42FDF793823F747 | beauty-core-backend/test/e2e/auth-cliente.e2e-spec.ts |
|  M | AUTH_SECURITY | HIGH | 6 | 4 | 1247 | 510236D36490A12E19CC87B86DDE584C142C7E349170DA6364F1E12BC9D5362A | beauty-core-backend/test/e2e/roles.e2e-spec.ts |
|  M | AUTH_SECURITY | HIGH | 6 | 4 | 916 | 622CAB6EAED9EF8C62C8AE7FE3254F652171AD6BA24D25AA4A7B4333FFA2D138 | beauty-core-backend/test/e2e/swagger-validation.e2e-spec.ts |
|  M | AUTH_SECURITY | HIGH | 15 | 10 | 3716 | C3D90A18E9822B86DB451D54F08AEAC91604404BD7B6B41FF81E0C7EE531BC66 | beauty-core-backend/test/helpers/auth.helper.ts |
|  M | AUTH_SECURITY | HIGH | 12 | 6 | 1361 | 245163B4320D5145BFB05BC254021E0BDE5E6983C89E493402F35A13B98FCD2E | beauty-core-backend/test/unit/auth-guards.coverage.spec.ts |
|  M | AUTH_SECURITY | HIGH | 5 | 4 | 1256 | A2E41A552B137DF1F3B5AE6D40625DCA58D4D08B990075A9466A241646074D5E | beauty-core-backend/test/unit/env-validation-cors.spec.ts |
|  M | AUTH_SECURITY | HIGH | 6 | 7 | 1944 | C725EF8C2C88A347631A03FCDC62160BCC497E73E7A2585967BC93D7D57B3867 | beauty-core-backend/test/unit/env-validation-required.spec.ts |
|  M | AUTH_SECURITY | HIGH | 12 | 4 | 3366 | 4AB5521A671EC0C11B0092F9D652A8E68E6426526077C710450CC2DD10A61E98 | beauty-core-backend/test/unit/usuario-role-policy.coverage.spec.ts |
|  M | AUTH_SECURITY | HIGH | 13 | 9 | 4264 | 0875F676D58E869D28FA86AFF97722B63C3063D33CBD0E1767F1B3D3772B298B | beauty-core-backend/test/unit/usuario-role-policy.spec.ts |
|  M | BUSINESS_MODULE | MEDIUM | 8 | 28 | 11549 | 0B467E9AC63FAA98056694E8533C7441AB98FB8D8CDA192B369763633E9ECCDD | beauty-core-backend/src/modules/agendamentos/agendamentos.controller.ts |
|  M | BUSINESS_MODULE | MEDIUM | 2 | 7 | 687 | 383AB793F4BBF8E41F0C740F4D2AEFA0C0DE8622EFBF6CDA05A668EC81D08EBC | beauty-core-backend/src/modules/agendamentos/agendamentos.module.ts |
|  M | BUSINESS_MODULE | MEDIUM | 86 | 160 | 24490 | A5C7377D4573904D19899851853BBDF2389622E976EB5ED4DBEA62763A087B63 | beauty-core-backend/src/modules/agendamentos/agendamentos.service.ts |
|  M | BUSINESS_MODULE | MEDIUM | 18 | 17 | 2990 | C112125DAA7CE6589ADEF362493BC7E6A3493869C4117DD43DDB52DE6D195E50 | beauty-core-backend/src/modules/agendamentos/dto/create-agendamento.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 8 | 1 | 723 | 094369F4448103124A03DA66405F94B6756F48C45938ABB418A39EA0E2D40059 | beauty-core-backend/src/modules/agendamentos/dto/update-agendamento.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 26 | 20 | 16683 | CFBDDAB51FDBF7801AB84F92322694FFA0DB76A4AA0EF5184AB1939EE7511BCF | beauty-core-backend/src/modules/analytics/analytics.controller.ts |
|  M | BUSINESS_MODULE | MEDIUM | 5 | 14 | 491 | 95ADA1E898BB353ECDA449C25AE264B61616841C8BCE52BC67B160E8241307FF | beauty-core-backend/src/modules/analytics/analytics.module.ts |
|  M | BUSINESS_MODULE | MEDIUM | 21 | 68 | 15785 | 21FED07B948B435345C974D19D848B19EA0FF9807DB7A0152772861841D0B2E2 | beauty-core-backend/src/modules/area-cliente/area-cliente.controller.ts |
|  M | BUSINESS_MODULE | MEDIUM | 6 | 12 | 945 | 75F883DAD19E3F11AB0F003BBC5535AA0B335F451EA8702DF5BD8B559113CDBC | beauty-core-backend/src/modules/area-cliente/area-cliente.module.ts |
|  M | BUSINESS_MODULE | MEDIUM | 257 | 309 | 34054 | 8905E9A330C15BEC62A3C121625292A5F6B8AAA00E8AF9D8FAB11B1EF08A8B11 | beauty-core-backend/src/modules/area-cliente/area-cliente.service.ts |
|  M | BUSINESS_MODULE | MEDIUM | 1 | 4 | 697 | 3F4A399E7D1B694D5B33E648DB9A491BF455C5ABBCA177A737B6F48D3F1E50B0 | beauty-core-backend/src/modules/area-cliente/dto/create-portal-agendamento.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 13 | 7 | 1848 | EDC830E6688C7AF237C7D765717E29F891D6D701D27439DBB1F744A3F3135E60 | beauty-core-backend/src/modules/area-cliente/dto/update-perfil-cliente.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 1 | 1 | 139 | 8809686EEE0F7AAE056EF13EAF17EC03F59CEA7FAAB8A427E01174EF42E09D3C | beauty-core-backend/src/modules/area-cliente/types/cliente-auth-user.type.ts |
|  M | BUSINESS_MODULE | MEDIUM | 17 | 30 | 5280 | FAAFDAAE8231B2B2C4340A6F2BB5FA6FD64F02509A50908F4543A2F195F38145 | beauty-core-backend/src/modules/automacoes/automacoes.controller.ts |
|  M | BUSINESS_MODULE | MEDIUM | 4 | 10 | 767 | 05ECF817B2DCE46978A7B14526C313CA972CAFCCE5951F675EE36C1A2C51C863 | beauty-core-backend/src/modules/automacoes/automacoes.module.ts |
|  M | BUSINESS_MODULE | MEDIUM | 51 | 91 | 9028 | BDBE3DE594512BC4D0E04A0AB745FB1930BE168917C61369E620B88BE13F20B9 | beauty-core-backend/src/modules/automacoes/automacoes.service.ts |
|  M | BUSINESS_MODULE | MEDIUM | 4 | 9 | 3274 | 9B93B101B5C06986D4D8F48EB7451955F4CF65500CE10EF1CCD254652C67CE25 | beauty-core-backend/src/modules/automacoes/dto/processar-evento.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 1 | 1 | 822 | 94D8B6B63DC06FE94A34A51CF5E0B67AB5E870D8418688DB7547794477A53C43 | beauty-core-backend/src/modules/automacoes/eventos/tipo-evento-sistema.enum.ts |
|  M | BUSINESS_MODULE | MEDIUM | 11 | 13 | 8275 | 3EB631F2CCB186696562F0E5BFEEC8165B4CB7A74271AE7A232464816CB1ADC5 | beauty-core-backend/src/modules/beneficios/beneficios.controller.ts |
|  M | BUSINESS_MODULE | MEDIUM | 5 | 14 | 499 | 3474C5610C4A7E62ACB3D869D1C6775C8A6104279B43402335B4A2A87B9B831C | beauty-core-backend/src/modules/beneficios/beneficios.module.ts |
|  M | BUSINESS_MODULE | MEDIUM | 14 | 28 | 4075 | 63713D992E98548C28EB06CB4FF265007B5F3D5FF8B58C84B3300A73C163311E | beauty-core-backend/src/modules/beneficios/beneficios.service.ts |
|  M | BUSINESS_MODULE | MEDIUM | 3 | 7 | 1466 | EEA7F3148728F824D0617908F5EC52381ADA5647AC3F34A00414A9BCC77A2D52 | beauty-core-backend/src/modules/beneficios/dto/create-beneficio.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 2 | 4 | 1538 | D4743E4863FE60507AB2EB37CC6E69EC76CA4B5FF56FEE971D891F4DF7016642 | beauty-core-backend/src/modules/beneficios/dto/update-beneficio.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 22 | 22 | 8701 | 5AE45C1D5BD5AC5FAC289D5729F56B1D99250B54E51860321605FE3BD9138ED2 | beauty-core-backend/src/modules/categorias-financeiras/categorias-financeiras.controller.ts |
|  M | BUSINESS_MODULE | MEDIUM | 1 | 1 | 472 | FFE32F7E09AC142EE0AE58C77E8A1583DFA16B9DEAF9D01D17A563DE562F1EE1 | beauty-core-backend/src/modules/categorias-financeiras/categorias-financeiras.module.ts |
|  M | BUSINESS_MODULE | MEDIUM | 13 | 31 | 1684 | 0323B87D75306477F6A8CC15741FABD07807D06F33BD6AC808E614BEA2F22691 | beauty-core-backend/src/modules/categorias-financeiras/categorias-financeiras.service.ts |
|  M | BUSINESS_MODULE | MEDIUM | 2 | 6 | 1051 | A4A95F85702224D573A7BAE0AF6BCD37FA09221074F1BA44A2915A9EBAEE3962 | beauty-core-backend/src/modules/categorias-financeiras/dto/create-categoria-financeira.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 1 | 1 | 238 | 6E72A2AF08E2416CE72D4BE2AF7F3FDC8EB3DA3A5F39935B92397D9ACDBF16F3 | beauty-core-backend/src/modules/categorias-financeiras/dto/update-categoria-financeira.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 15 | 16 | 5062 | 97A7D96432EF6CC9CC0B969E033C6D3920629FD7018A6C73748FEABA8D7455AD | beauty-core-backend/src/modules/cliente-area/cliente-area.controller.ts |
|  M | BUSINESS_MODULE | MEDIUM | 4 | 1 | 5432 | 8F8619FA19256AB8236B273186E620B3B249C104DD67A3771305635F78144BAC | beauty-core-backend/src/modules/cliente-area/cliente-area.service.ts |
|  M | BUSINESS_MODULE | MEDIUM | 12 | 39 | 10218 | 8A0A15F61586F17BB61FF94ED41EE1D7B5D7E0A9DE94D05CA7AA3A6466B8C0BA | beauty-core-backend/src/modules/clientes/clientes.controller.ts |
|  M | BUSINESS_MODULE | MEDIUM | 2 | 7 | 655 | F549CAB51FE1B653D9DC9769140CF8046A3F1C307A649724D6577AB281FDB008 | beauty-core-backend/src/modules/clientes/clientes.module.ts |
|  M | BUSINESS_MODULE | MEDIUM | 5 | 11 | 10593 | 9541D23CF9BF1804DE451F06B72606083362FC516684ACCB5F3DA020F2F87273 | beauty-core-backend/src/modules/clientes/clientes.service.ts |
|  M | BUSINESS_MODULE | MEDIUM | 14 | 11 | 2789 | 0A78B692006E54196A5D277CCB2C8F3401CF3C8A379B4289471CB3F3B937292D | beauty-core-backend/src/modules/clientes/dto/create-cliente.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 14 | 10 | 2864 | D0CDB7B960F0270B0727D6D9F4380CBDAFEBE9525A602685B9058248939B48BC | beauty-core-backend/src/modules/clientes/dto/update-cliente.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 10 | 29 | 9403 | BCE4A9E5BA457CCC64BF12E93093A319518DF5FBE54DA7BC32A3446C87CFA2B2 | beauty-core-backend/src/modules/clientes-pacotes/clientes-pacotes.controller.ts |
|  M | BUSINESS_MODULE | MEDIUM | 2 | 7 | 713 | F2B88633B110239882B1374ED414D49CEA48AA2622DC1477ABB76190CE569F05 | beauty-core-backend/src/modules/clientes-pacotes/clientes-pacotes.module.ts |
|  M | BUSINESS_MODULE | MEDIUM | 14 | 42 | 16745 | 40025178759EB5F05527A83E839FB5D8EE17E2585ADF949E0D5F3EF8AFE1C587 | beauty-core-backend/src/modules/clientes-pacotes/clientes-pacotes.service.ts |
|  M | BUSINESS_MODULE | MEDIUM | 1 | 1 | 754 | 1C78C5A0D6653BF17B1C135B01EE16A3376950206F71D4FC25883597754CB907 | beauty-core-backend/src/modules/clientes-pacotes/dto/create-cliente-pacote.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 18 | 36 | 6966 | 2E63CAB6A5D2AB7C688AC4B8842FAF68FD9BA88620AA8BB534A558259180FCD1 | beauty-core-backend/src/modules/comissoes/comissoes.controller.ts |
|  M | BUSINESS_MODULE | MEDIUM | 2 | 7 | 663 | 348F1DAC3B385481844A4D195AA816E646C01FD7AA24607491E5BFA447D1723F | beauty-core-backend/src/modules/comissoes/comissoes.module.ts |
|  M | BUSINESS_MODULE | MEDIUM | 25 | 31 | 7993 | 921B753FB3AB7B436D33E0882FCBCCB404E33E82E3C60CAD9379D6F360425ECB | beauty-core-backend/src/modules/comissoes/comissoes.service.ts |
|  M | BUSINESS_MODULE | MEDIUM | 14 | 13 | 1644 | 7D4D6CBEBEC736900FBC5AE2E95A04AD1B14BAF788733706700125870380EA46 | beauty-core-backend/src/modules/comissoes/dto/create-comissao.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 6 | 13 | 5446 | BC2B5FAC00F41A47F5D78812DF0BA29F61FFD582826E3E0B257748050516CD59 | beauty-core-backend/src/modules/configuracao-fidelidade/configuracao-fidelidade.controller.ts |
|  M | BUSINESS_MODULE | MEDIUM | 5 | 14 | 597 | DBCFC45A6404A387DCF7EC62557BB0E6554A7006A8CEE56FEB1CEF3FDFCAAACF | beauty-core-backend/src/modules/configuracao-fidelidade/configuracao-fidelidade.module.ts |
|  M | BUSINESS_MODULE | MEDIUM | 1 | 1 | 1622 | 6CA4A3F8A5070338EB3DF989516257A6D2BC7ED345730B104D3AF3BE0139D50E | beauty-core-backend/src/modules/configuracao-fidelidade/configuracao-fidelidade.service.ts |
|  M | BUSINESS_MODULE | MEDIUM | 3 | 11 | 2268 | CC25DC91197A1A98980FF16BA5135E2DD81CAF9068A991C0C49AA6F177DDEB6B | beauty-core-backend/src/modules/configuracao-fidelidade/dto/create-configuracao-fidelidade.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 1 | 1 | 250 | 238AF869455C155765054294D064CDFCA82F4AF3E7BBF981B2A1663EF2A85158 | beauty-core-backend/src/modules/configuracao-fidelidade/dto/update-configuracao-fidelidade.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 13 | 24 | 5801 | 197163A25B1AABE425691038B6068F0B3BA6B9E4C6D746B04E257687B15FA948 | beauty-core-backend/src/modules/configuracoes-notificacao/configuracoes-notificacao.controller.ts |
|  M | BUSINESS_MODULE | MEDIUM | 5 | 14 | 613 | 5168E034767A25A5B5A56F5BE72EE3FA9A3F04C0AFB767A065BA033AD8FDAE9C | beauty-core-backend/src/modules/configuracoes-notificacao/configuracoes-notificacao.module.ts |
|  M | BUSINESS_MODULE | MEDIUM | 17 | 26 | 2275 | 16BC49CC2AF4022CB4642C0C4809E5796981CD043D3BD58132E2021A96D09B69 | beauty-core-backend/src/modules/configuracoes-notificacao/configuracoes-notificacao.service.ts |
|  M | BUSINESS_MODULE | MEDIUM | 2 | 5 | 2088 | 7FAEB4FAEBCA4E5881888625FF3CD0D7CA2A24C6C4CD007385B1A3030E2793B5 | beauty-core-backend/src/modules/configuracoes-notificacao/dto/create-configuracao-notificacao.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 2 | 5 | 2100 | 7BBEFC266B4707824FC824FC7A0D5E60D005BBE79889292FE542A6DB10CEEA09 | beauty-core-backend/src/modules/configuracoes-notificacao/dto/update-configuracao-notificacao.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 5 | 18 | 1892 | 8114A7FCFD9290776002F774306290F2632CA8E10B62D31BA028880EC17C7950 | beauty-core-backend/src/modules/cupons/cupons.controller.ts |
|  M | BUSINESS_MODULE | MEDIUM | 5 | 14 | 467 | FDF58FCB624B575952C9CC904D5B4ABE72D1BB59C3C681A06B46FBA0363BD309 | beauty-core-backend/src/modules/cupons/cupons.module.ts |
|  M | BUSINESS_MODULE | MEDIUM | 4 | 10 | 6009 | 5019CB8B184485CFDFEB15B7FEC27AC04B4D572F1E4FCB3690639F9369D7728A | beauty-core-backend/src/modules/cupons/cupons.service.ts |
|  M | BUSINESS_MODULE | MEDIUM | 20 | 14 | 3474 | 0BD289485573C47C712C36EA4F542EBDAAC1B28D43120DEC8CCDCDE79D5F65E9 | beauty-core-backend/src/modules/cupons/dto/create-cupom.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 20 | 13 | 3633 | 5B49B65A4DFE1BFBD400F1C52B487EFF23EE154E4A0588A9093BAB68B45BDEBA | beauty-core-backend/src/modules/cupons/dto/update-cupom.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 2 | 6 | 637 | 5DC367EAD74FBFF5D122A252D91B347A24B048DA13BEC494A4D21A5399A4DAA9 | beauty-core-backend/src/modules/cupons/dto/validar-cupom.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 7 | 4 | 3025 | BDCB8BF730C47FFB24B522BBF18D2BE3C4F5723B09A130C430D6DAEB1AC41F53 | beauty-core-backend/src/modules/empresas/dto/create-empresa.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 7 | 4 | 3127 | 6613F8D61066D68206E4F2C17F2ED80C34FF2C9FCCBB2A89E817227004FB8C81 | beauty-core-backend/src/modules/empresas/dto/update-empresa.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 8 | 12 | 8163 | B931127CC7363FE71D2C5F646569BC22554990B30590F5B116FAE21BDC4233BE | beauty-core-backend/src/modules/empresas/empresas.controller.ts |
|  M | BUSINESS_MODULE | MEDIUM | 1 | 1 | 406 | F5A0A0724FA710FE75B1C20FE94EDE253615F3E42E3892383F028185711681EA | beauty-core-backend/src/modules/empresas/empresas.module.ts |
|  M | BUSINESS_MODULE | MEDIUM | 5 | 2 | 3574 | C19E0382548D8B548C4221DD526D0C1FE0803F06168BC306EF16479D7A2EAC8A | beauty-core-backend/src/modules/empresas/empresas.service.ts |
|  M | BUSINESS_MODULE | MEDIUM | 2 | 8 | 1243 | 98EF0F38339E7675F1F8E4B75CACE372E7ADFB56BCFFD9872B1A82114BD582E4 | beauty-core-backend/src/modules/fidelidade/dto/adicionar-pontos.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 1 | 1 | 458 | 785E71EF69A5D0E39895B5451A7F6529F89DAA81B1370A00876E2550F66451C4 | beauty-core-backend/src/modules/fidelidade/dto/create-fidelidade.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 8 | 11 | 1338 | E9142EFABDF00A909F0B9BE4BAECD03C1C945EB01E3F935CFAEF49B4FFAF3492 | beauty-core-backend/src/modules/fidelidade/dto/pontuar-por-valor.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 2 | 8 | 1246 | 71BA9832CBADB6408B05EE2682B0A6C60EB3E8A4B04F6E39FB9093F55E190864 | beauty-core-backend/src/modules/fidelidade/dto/resgatar-pontos.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 16 | 26 | 13362 | 16D4F983537EEA81AB6F3C5F118048AF64D8ECEC7293F79A1056F794577D1059 | beauty-core-backend/src/modules/fidelidade/fidelidade.controller.ts |
|  M | BUSINESS_MODULE | MEDIUM | 5 | 15 | 588 | F2CCBB5AFD3E35A403084821D5EFE093360BB2B929E30E5FC141BF0EB26D8490 | beauty-core-backend/src/modules/fidelidade/fidelidade.module.ts |
|  M | BUSINESS_MODULE | MEDIUM | 29 | 39 | 14726 | 1B68FB9EBCA0B1AC238D3C029D004DC37C82AF11A6BBAD02BF632EE72C4328A5 | beauty-core-backend/src/modules/fidelidade/fidelidade.service.ts |
|  M | BUSINESS_MODULE | MEDIUM | 9 | 12 | 3638 | 678D93045022C2895A5A570CC77A010BA5D7E0E77A225D4C9C9DCD245D5FDB51 | beauty-core-backend/src/modules/financeiro/dto/create-movimentacao.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 1 | 1 | 597 | FD06C86456263321C7FB700BE321FAF4D19BEAB88FD0B60463B50B2FDC50470A | beauty-core-backend/src/modules/financeiro/dto/registrar-pagamento.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 1 | 3 | 202 | 30A1485D8E7268190BBB7B956EC3FEBB52DE62EA122CFD636CD695268C386002 | beauty-core-backend/src/modules/financeiro/dto/update-movimentacao.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 2 | 7 | 671 | F695F118CBEEBEDC3AECC0EB14310822AA3CBAFC1AED010794043265AFDA4047 | beauty-core-backend/src/modules/financeiro/financeiro.module.ts |
|  M | BUSINESS_MODULE | MEDIUM | 0 | 1 | 1030 | 5B1AE71E1B1AE1D14387C7E8EC729528099206F581AB1164B7686D9591B1FFE1 | beauty-core-backend/src/modules/health/enterprise-health.controller.ts |
|  M | BUSINESS_MODULE | MEDIUM | 2 | 9 | 7819 | F23897ECECA8976921BD6C14E91C9177B5191F3166E986CED25A2941B797C49A | beauty-core-backend/src/modules/health/enterprise-health.service.ts |
|  M | BUSINESS_MODULE | MEDIUM | 1 | 12 | 3414 | EFD079F5A57B89C6BD2628B7CCBA17D32772BDA8716D45583704BFFD1B7FEAAE | beauty-core-backend/src/modules/health/health.controller.ts |
|  M | BUSINESS_MODULE | MEDIUM | 0 | 1 | 658 | 7FB21D6D5782DC98FC148444C06DF444F8AB40CD7205BD742F2121BA4DBE7226 | beauty-core-backend/src/modules/health/health.module.ts |
|  M | BUSINESS_MODULE | MEDIUM | 26 | 31 | 3913 | DAFC05AE1BE754B7493DFC236227647D0AF316AE534408CD98F8C9F06FC9CF41 | beauty-core-backend/src/modules/health/health.service.ts |
|  M | BUSINESS_MODULE | MEDIUM | 3 | 10 | 1047 | A5346EFC3BE99A6347840063429D92821D632348F00B06C4B18FC30E39112F6A | beauty-core-backend/src/modules/niveis-fidelidade/dto/create-nivel-fidelidade.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 2 | 6 | 1115 | 77C1DFD84D25C108086ACEA46E2CD03478F6AEE1AB566A525D8BF19145B2BCFE | beauty-core-backend/src/modules/niveis-fidelidade/dto/update-nivel-fidelidade.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 14 | 18 | 8572 | C6AD2382B9A0D196D89A99C37C9C532C0EF9E9DD33949F43AAC8B125E80DB570 | beauty-core-backend/src/modules/niveis-fidelidade/niveis-fidelidade.controller.ts |
|  M | BUSINESS_MODULE | MEDIUM | 5 | 14 | 549 | CF4DF6CDB91CD7C9180E2C6E1CACF7ADB307AF925AC2C0BCBF7C02CDE8F2D19E | beauty-core-backend/src/modules/niveis-fidelidade/niveis-fidelidade.module.ts |
|  M | BUSINESS_MODULE | MEDIUM | 21 | 37 | 4670 | 0E676A7CC87D6BADAFAFB10E1FBD38C48E00EE738C6205B018D790808A5B7456 | beauty-core-backend/src/modules/niveis-fidelidade/niveis-fidelidade.service.ts |
|  M | BUSINESS_MODULE | MEDIUM | 2 | 3 | 2121 | 96D159877C378952F119F0D836897A9915C90C011F543B79CEB1D252C66D5AA3 | beauty-core-backend/src/modules/notificacoes/dto/create-notificacao.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 4 | 12 | 1615 | FB5583CB5DD1EA2B8BA81FD324E1E3346EF7CAAD57305961DB3EC8BD0E5DC5CD | beauty-core-backend/src/modules/notificacoes/dto/update-notificacao.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 12 | 45 | 12664 | C314637160B10C1DF2C460892DA8959C4B722AF3BD15A20318BE396C52F2A084 | beauty-core-backend/src/modules/notificacoes/notificacoes.controller.ts |
|  M | BUSINESS_MODULE | MEDIUM | 5 | 14 | 515 | 77B51BCAA22D589C8E509FEA4B0D7CDE8F5619FBBAD280AC40BEAF35D98A99B0 | beauty-core-backend/src/modules/notificacoes/notificacoes.module.ts |
|  M | BUSINESS_MODULE | MEDIUM | 101 | 198 | 9023 | DB50A9B512C50DAFBEC7CA2A0A9DD2B723F48A4122B9502194CAB885F1FCF5EF | beauty-core-backend/src/modules/notificacoes/notificacoes.service.ts |
|  M | BUSINESS_MODULE | MEDIUM | 10 | 12 | 2347 | AFD6D7816D6690D965C9F834BDE53CB5730D639A8722A14232A6EA57477C4EAC | beauty-core-backend/src/modules/pacotes/dto/create-pacote.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 8 | 6 | 2446 | B9B8F81712564CC4BC8711F76C5A8665DFA232FA190C80AC0888BAC45AFDF23A | beauty-core-backend/src/modules/pacotes/dto/update-pacote.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 18 | 28 | 8323 | DBA9A001D118FE0DA016AD2F2776DD6C3BDED66F2FF0997D28857ECFB9E2A399 | beauty-core-backend/src/modules/pacotes/pacotes.controller.ts |
|  M | BUSINESS_MODULE | MEDIUM | 2 | 7 | 647 | F0B9D0894EBE51BAB3B432EE6A2BC50A1C0AFD4160B1E5BE70481EB5323FB26E | beauty-core-backend/src/modules/pacotes/pacotes.module.ts |
|  M | BUSINESS_MODULE | MEDIUM | 1 | 1 | 7525 | C95FE18DA32A54E3A898EF269FB61887B3F5A14DF81E5F5EC854537116E905D0 | beauty-core-backend/src/modules/pacotes/pacotes.service.ts |
|  M | BUSINESS_MODULE | MEDIUM | 17 | 14 | 1766 | D593DAE03C5CF28C5EF86901604AD223F372060B380AE2EBB61C82B4BC127E7A | beauty-core-backend/src/modules/servicos/dto/create-servico.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 14 | 9 | 2591 | DFF8EB897CE09B3AAA2BB138DC40602C27033A7E0B23F242A30E57BD6FD73DF7 | beauty-core-backend/src/modules/servicos/dto/update-servico.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 18 | 44 | 8357 | DDA66A72BE01D361106E93DAC5DA87CB531BC5801D4EFB2A81EC14E4C6BEFCFC | beauty-core-backend/src/modules/servicos/servicos.controller.ts |
|  M | BUSINESS_MODULE | MEDIUM | 4 | 11 | 450 | 2CE2121211965BC62497F7E48D8DF58A34506CA7452860214E6076647039C72A | beauty-core-backend/src/modules/servicos/servicos.module.ts |
|  M | BUSINESS_MODULE | MEDIUM | 5 | 17 | 3399 | 7B27A697F6FA89E9AD964252FB64F2D4EF4419006C93A476FB98D69401EFDDB0 | beauty-core-backend/src/modules/servicos/servicos.service.ts |
|  M | BUSINESS_MODULE | MEDIUM | 8 | 8 | 2104 | F503B7F61C1E8FE71A4D96210DB3C38FDC9B1D3270A3EB3968F2D1B9E18E4556 | beauty-core-backend/src/modules/unidades/dto/create-unidade.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 7 | 4 | 2097 | 0FFF2D804A8AF46F4E1BE0B323D0623AC16F9CD4154381F97FC65CFCA1DDC8E8 | beauty-core-backend/src/modules/unidades/dto/update-unidade.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 20 | 34 | 8308 | F66CD6F6EC4D0DFB3083AAB7971C35F50B1565489A725E49878E0101BF8D8EEC | beauty-core-backend/src/modules/unidades/unidades.controller.ts |
|  M | BUSINESS_MODULE | MEDIUM | 4 | 11 | 450 | DC59A44D384D8CD6783B8572BAFAC52F8DC2283C5DF62871E684AA315C297650 | beauty-core-backend/src/modules/unidades/unidades.module.ts |
|  M | BUSINESS_MODULE | MEDIUM | 10 | 33 | 3063 | 0784E4DD9A0B18160C03DA8D33BD8720F7AC5D5A0ACE8BACACA154244A0CA1DA | beauty-core-backend/src/modules/unidades/unidades.service.ts |
|  M | BUSINESS_MODULE | MEDIUM | 1 | 1 | 2477 | 7674C84371BDD41E8876ADA72ABB33A5D002BA0DA6C0C21D549437F7CFF4AB0F | beauty-core-backend/src/modules/usuarios/dto/create-usuario.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 1 | 1 | 2606 | 507B2D62D0EBE43CD4BB201BE71E3D50DC21AEC074864384090A42E0B800FF4E | beauty-core-backend/src/modules/usuarios/dto/update-usuario.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 2 | 5 | 501 | 19E1E0B35A604AA616579932402A54C00F5147C14C60635DE4BBB3C0C74B0ABF | beauty-core-backend/src/modules/usuarios/usuarios.module.ts |
|  M | BUSINESS_MODULE | MEDIUM | 2 | 9 | 558 | 62F3ED6708A02D003205E14CC02637416B535B074FDA1238A18F3A8F0DDF8CC8 | beauty-core-backend/src/shared/dto/pagination.dto.ts |
|  M | BUSINESS_MODULE | MEDIUM | 1 | 1 | 95 | 9D628D82811C8ED8D07F8C16192E33D6FF14F4D247377ECC5C4DC11F1D56E3D7 | beauty-core-backend/src/shared/enums/plano-empresa.enum.ts |
|  M | BUSINESS_MODULE | MEDIUM | 1 | 1 | 158 | 839A1A463CDE162F8EFBC63680076661473032DE43DC0375EB2C51463E7D0124 | beauty-core-backend/src/shared/enums/role.enum.ts |
|  M | BUSINESS_MODULE | MEDIUM | 1 | 1 | 381 | 8F401B7A0AA72FC87D0FE59475B7DA6AF9043BF4564C9C372A1C2A5232696F24 | beauty-core-backend/src/shared/enums/role-mapper.ts |
|  M | BUSINESS_MODULE | MEDIUM | 1 | 1 | 204 | F34F03EA6CCD697D3EF8A628154ACC09B6E34247339667238F2F4FEEC3337123 | beauty-core-backend/src/shared/enums/status-agendamento.enum.ts |
|  M | BUSINESS_MODULE | MEDIUM | 9 | 7 | 1024 | AD04AF0060230F8996746C726AC3BA3EB7B2A843D99E56FB1FB1568988495E44 | beauty-core-backend/src/shared/utils/pagination.util.ts |
|  M | CORE_INFRA | HIGH | 0 | 4 | 5516 | 135872BCAE3815925D347CBC98A52B90B5B7B3431C565069967D1E8A8E917ECE | beauty-core-backend/src/app.module.ts |
|  M | CORE_INFRA | HIGH | 4 | 1 | 1739 | F0F73695E17C407FDB98C0C621B3716BE0052FAAA0B9392FA26C956AF05ED3A0 | beauty-core-backend/src/common/metrics/guards/metrics-auth.guard.ts |
|  M | CORE_INFRA | HIGH | 4 | 2 | 5698 | D943F67135FDDCD7345A62E2F2827347B803008FAA6687D32F0CE54F32DE5877 | beauty-core-backend/src/common/metrics/metrics.controller.ts |
|  M | CORE_INFRA | HIGH | 0 | 1 | 531 | 337BF684DD7190489FCAC67E5840EA9D18ED9F00060EE2FA3E7162148905FC27 | beauty-core-backend/src/common/metrics/metrics.module.ts |
|  M | CORE_INFRA | HIGH | 23 | 30 | 7327 | C5955D9BB1E8B2910903BBE74CDF2A24ABC0FAAEE432E519AB2A72C34A4FFE54 | beauty-core-backend/src/common/metrics/metrics.service.ts |
|  M | CORE_INFRA | HIGH | 1 | 1 | 200 | 0F3C00B776B61BE00A1FA7BE51EF977F597CDBFC8322CCE3397CFDD35A1FA4A2 | beauty-core-backend/src/database/prisma/prisma.module.ts |
|  M | CORE_INFRA | HIGH | 1 | 1 | 370 | 7959EFB964BAAE1417E628C1ABDC2FE52000564057206D716D1D5515003BB16E | beauty-core-backend/src/database/prisma/prisma.service.ts |
|  M | ENV_EXAMPLE | HIGH | 5 | 1 | 1518 | 131C5B0885879D0D4CFBA7FADCC58D268D57C4C42039CBB082E123B9770746EC | beauty-core-backend/.env.dev.example |
|  M | ENV_EXAMPLE | HIGH | 5 | 1 | 4253 | 0A1C76118F68902BC8A9FC79F839A51E812BF06AE9BDDE1792E780D78DAD7F2C | beauty-core-backend/.env.example |
|  M | ENV_EXAMPLE | HIGH | 5 | 1 | 1666 | 24B99960D699C2EEC035380CBE66B157C72F60FD4226350E9ECF3D717BB9FB9D | beauty-core-backend/.env.prod.example |
|  M | ENV_EXAMPLE | HIGH | 5 | 1 | 1717 | 9C7C4883D96E599AF0707120DC8282D6869B28B79D6D478D4625FAAB46525C07 | beauty-core-backend/.env.production.example |
|  M | ENV_EXAMPLE | HIGH | 5 | 1 | 1807 | C33553D62BB95F8B44AE0FB54B67574C6BD90894E904AAB072F67B2BA0116159 | beauty-core-backend/.env.staging.example |
|  M | META_WHATSAPP | HIGH | 2 | 2 | 323 | F34896380001DD5FE877FC6E38453D9899723FF66114BDDE6D755D045DE6B935 | beauty-core-backend/src/modules/area-cliente/dto/enviar-portal-mensagem-whatsapp.dto.ts |
|  M | META_WHATSAPP | HIGH | 29 | 43 | 9282 | F0E59BE9DE129AD6F49C7F9B70D8600EB967A7121BBB4A12E69FED0E5A352279 | beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.controller.ts |
|  M | META_WHATSAPP | HIGH | 8 | 19 | 718 | 8287245D4AB20C970EF2D283F80103E603B6377967DE4266E10F50B760E37240 | beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.module.ts |
|  M | META_WHATSAPP | HIGH | 57 | 104 | 6620 | 07E642F96C0536CA7711FB7D3D06AEEB1C8C4C32FF3AACDC2637197B2A825441 | beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts |
|  M | META_WHATSAPP | HIGH | 3 | 7 | 2059 | F7BDE1330D623EA4D6B41B1364311862E1A42883ACC8DED8AC9CFF1E03B089BD | beauty-core-backend/src/modules/campanhas-whatsapp/dto/create-campanha-whatsapp.dto.ts |
|  M | META_WHATSAPP | HIGH | 1 | 1 | 226 | EB1D92042DA43BB902D554D56B2652ED6A33AA2B90B1BB08D13F27880C75D9D7 | beauty-core-backend/src/modules/campanhas-whatsapp/dto/update-campanha-whatsapp.dto.ts |
|  M | META_WHATSAPP | HIGH | 6 | 20 | 6874 | BEA6005ED6DE9650DB9E919AB2D01BCEDA123F45DC1F23D21C151D5822673939 | beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.controller.ts |
|  M | META_WHATSAPP | HIGH | 5 | 14 | 581 | 8AB1C9390080253E22FB19CFC092C3448A8028AD2740FEDAD3322D223B2E3F89 | beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.module.ts |
|  M | META_WHATSAPP | HIGH | 15 | 27 | 3259 | E58DF8C68BD5165FC211BBEE543EEDA80F1E777DDAB6DD974F1350EC68CDA55D | beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts |
|  M | META_WHATSAPP | HIGH | 3 | 10 | 2253 | 4833514FF0C36CB03C739F1D0D09BE2A5CA773258073067DC4E8B39D22D52B13 | beauty-core-backend/src/modules/configuracao-whatsapp/dto/create-configuracao-whatsapp.dto.ts |
|  M | META_WHATSAPP | HIGH | 1 | 1 | 242 | 461C5F9726077B53D7AB7FE44C72A7EDDA4F1D11DB090AC7B79C9A7022FA0E3E | beauty-core-backend/src/modules/configuracao-whatsapp/dto/update-configuracao-whatsapp.dto.ts |
|  M | META_WHATSAPP | HIGH | 2 | 7 | 2311 | 895475D41861401FF5D297FD7DCFA32E86DD2AB4E00B4F3BC885C059B9CBBD83 | beauty-core-backend/src/modules/templates-whatsapp/dto/create-template-whatsapp.dto.ts |
|  M | META_WHATSAPP | HIGH | 1 | 1 | 226 | 224A8A0300D074A733F657F6E3E00E84A559346857187232A07AEA2D1D25BC2A | beauty-core-backend/src/modules/templates-whatsapp/dto/update-template-whatsapp.dto.ts |
|  M | META_WHATSAPP | HIGH | 21 | 39 | 8887 | 2AC82F3284789541359DCBE2A2FFE4B4613ADEC204F6D380090C365DF168AC40 | beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.controller.ts |
|  M | META_WHATSAPP | HIGH | 5 | 14 | 557 | 7C6308A4B1C98B9909DA387BF330CDA16162138ED6A7E05F35384FF8987522C4 | beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.module.ts |
|  M | META_WHATSAPP | HIGH | 16 | 29 | 4283 | 870389CEC10C2CD980567381830ECAAF922CAE8C37E77F6A49CCA8EF7066451A | beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.service.ts |
|  M | META_WHATSAPP | HIGH | 1 | 1 | 433 | C8DE51C47FA88BA5B9F681E025D721C2842528C6B971AE3DE36BD1112B1D0F3D | beauty-core-backend/src/queues/jobs/whatsapp.job.ts |
| ?? | META_WHATSAPP | HIGH |  |  | 3306 | 0E1D8B3621AC39FDD9A09340429967096B923AC8BCDBF68D9741E9FB797AAB9C | beauty-core-backend/test/e2e/meta-whatsapp-webhook.e2e-spec.ts |
|  M | OTHER | MEDIUM | 3 | 9 | 1882 | 394AC5B209CF790E1C914D93C5595E6DEF1BD5CBAA27FA90DA972249C398BCCF | beauty-core-backend/src/common/utils/audit-request.util.ts |
| ?? | PRISMA_MIGRATION | HIGH |  |  | 878 | 017C26C0A9B0DF3D4BBBF6482F0B20BFDD43AAF617515099267C9A87DEFFD493 | beauty-core-backend/prisma/migrations/20260909150000_meta_whatsapp_webhook/migration.sql |
|  M | PRISMA_SCHEMA | HIGH | 18 | 0 | 30664 | 39ED45846507617518A633F55CF363CA7FA849E9E974F5E175D66C20185DF89B | beauty-core-backend/prisma/schema.prisma |
|  M | QUEUE_SCHEDULER | MEDIUM | 1 | 1 | 650 | 6F4C7B954AEAAE21DC125DCC417FAA0B01E2A6D5424B2F69270ED09541FAA016 | beauty-core-backend/src/modules/scheduler/constants/scheduler-times.ts |
|  M | QUEUE_SCHEDULER | MEDIUM | 25 | 22 | 7563 | DDA60B8E074CD05391B4A5732C2A33CB56B5B89C67CDC89FA161E9E1754BBFD6 | beauty-core-backend/src/modules/scheduler/scheduler.controller.ts |
|  M | QUEUE_SCHEDULER | MEDIUM | 1 | 1 | 760 | F811B3A168E2E875013A5DFD2CAC2DDEE9CEDC49B2309C4B83FD9D77671A2897 | beauty-core-backend/src/modules/scheduler/scheduler.module.ts |
|  M | QUEUE_SCHEDULER | MEDIUM | 112 | 156 | 12865 | 740A2726340FE152897DAF6502EB26CCDFBB781F489426EC135C0627C11C44CE | beauty-core-backend/src/modules/scheduler/scheduler.service.ts |
|  M | QUEUE_SCHEDULER | MEDIUM | 3 | 1 | 7022 | BDC07A70A3BA4366FBB15073AA8FA93FD2241A7EA67A96C86A123652F1835426 | beauty-core-backend/src/modules/sessoes/sessoes.service.ts |
|  M | QUEUE_SCHEDULER | MEDIUM | 2 | 5 | 322 | CB124D29FB2C847FA5E5E1B3C50D7D28EE4C8BFD192223890CD886B14B5FCE80 | beauty-core-backend/src/queues/jobs/aniversarios.job.ts |
|  M | QUEUE_SCHEDULER | MEDIUM | 1 | 1 | 238 | 0184186DAB315D2C794AE415B4227EBA87D3A16B75856E2F742ABBEAA2F41E12 | beauty-core-backend/src/queues/jobs/campanhas.job.ts |
|  M | QUEUE_SCHEDULER | MEDIUM | 1 | 1 | 237 | 1611172C9404E766099AF19A90935D241B790870A9DECE92F5338A4E8C827B8B | beauty-core-backend/src/queues/jobs/notificacoes.job.ts |
|  M | QUEUE_SCHEDULER | MEDIUM | 1 | 1 | 242 | BE53C72FDA73D9F0FE6EE92DC1768617A5490949D63684AAEEAD4E412ED7E3BE | beauty-core-backend/src/queues/jobs/relatorios.job.ts |
|  M | QUEUE_SCHEDULER | MEDIUM | 0 | 1 | 1763 | 3F396291DC2A92EDA1CA021C04A5A433E863218CE71A7799B173760BD814C4E7 | beauty-core-backend/src/queues/queues.controller.ts |
|  M | QUEUE_SCHEDULER | MEDIUM | 5 | 9 | 6664 | C549369AE5D4DBF013EDD6574B25CFAB2011E0E49BEEB9931C6F0001FB087A20 | beauty-core-backend/src/queues/services/dead-letter-queue.service.ts |
|  M | QUEUE_SCHEDULER | MEDIUM | 1 | 1 | 2267 | F2D6B2449250061F4E7C35EF6720C31241C195E788C11D1A33B9269B460DE317 | beauty-core-backend/src/queues/services/queue-shutdown.service.ts |
|  M | QUEUE_SCHEDULER | MEDIUM | 4 | 16 | 1176 | 1A06AEDB7EF7AD8A1032812BB92A4A06539AB9381EA2CED8E33EFEF8992CBC4C | beauty-core-backend/src/queues/utils/queue-job-id.util.ts |
|  M | QUEUE_SCHEDULER | MEDIUM | 1 | 2 | 1626 | AF264FEB8E8083ADC2C54D1B3482FA17C397A37E264D42F66BA0749EA0AC9DFD | beauty-core-backend/src/queues/utils/queue-trace.util.ts |
|  M | QUEUE_SCHEDULER | MEDIUM | 76 | 111 | 5402 | 6868B0CABBDE982CF90D69D9F5B857B6716E44085FF182797B8BBD2D305158AA | beauty-core-backend/src/queues/workers/aniversarios.worker.ts |
|  M | QUEUE_SCHEDULER | MEDIUM | 24 | 41 | 5302 | 1904CD967EB2E762A07607E822A4820966AD053C35E8B83543823152FC49C695 | beauty-core-backend/src/queues/workers/campanhas.worker.ts |
|  M | QUEUE_SCHEDULER | MEDIUM | 40 | 60 | 10303 | DB01572A9A394E151334E0B06E6BFEDEC68A66F84EBFF088A79FA6DBA4AF8C39 | beauty-core-backend/src/queues/workers/notificacoes.worker.ts |
|  M | QUEUE_SCHEDULER | MEDIUM | 22 | 28 | 5285 | 6E2629E85F99F6ED29273F5880538EAEDFCE6FEC1F02BAA6BB58FD294A1135F4 | beauty-core-backend/src/queues/workers/relatorios.worker.ts |
|  M | QUEUE_SCHEDULER | MEDIUM | 6 | 4 | 1067 | AC8A8267E93584791C2955275894A1FA068B61E25DBCDB6FA59117770B175D0F | beauty-core-backend/test/e2e/scheduler.e2e-spec.ts |
|  M | QUEUE_SCHEDULER | MEDIUM | 17 | 7 | 1982 | C1A5D0F12DE6E48946DCA9B9BE603415705CC7784F719B167151323143CDADB2 | beauty-core-backend/test/e2e/sessoes.e2e-spec.ts |
|  M | STORAGE_BACKUP_LGPD | MEDIUM | 57 | 45 | 2052 | AED7474F3E93C79A3AEB99AD4C7E68318DC8FE9CEB01F66677FEE7D7ECABF539 | beauty-core-backend/src/backup/backup.controller.ts |
|  M | STORAGE_BACKUP_LGPD | MEDIUM | 6 | 3 | 2477 | 128391DBA54521FD679B1B940465945F11C360537C3C0B8A981D2D26B11D17FA | beauty-core-backend/src/lgpd/dto/lgpd-cliente-export-response.dto.ts |
|  M | STORAGE_BACKUP_LGPD | MEDIUM | 1 | 8 | 2083 | FC2439401E2E54F3816F9EF0DD651DEEF74D4949DEFE746761A5C6E2F448B169 | beauty-core-backend/src/lgpd/lgpd.controller.ts |
|  M | STORAGE_BACKUP_LGPD | MEDIUM | 19 | 13 | 13442 | 5154D6C69B5722A673B9200E6FB58E59D2405F75111204784EBEC4B5F09D57F6 | beauty-core-backend/src/lgpd/lgpd.service.ts |
|  M | STORAGE_BACKUP_LGPD | MEDIUM | 3 | 1 | 1648 | DFA62FFEABEA6B09EA034C523C7A57479657D47B78B9737A8544AB27989D8A1C | beauty-core-backend/src/modules/arquivos/arquivo-access-policy.service.ts |
|  M | STORAGE_BACKUP_LGPD | MEDIUM | 40 | 90 | 24540 | 451C04C51D22F6CA5EEDBEAF28487CCCEDB8B4684816DEB3C7576A565F52C64A | beauty-core-backend/src/modules/arquivos/arquivos.controller.ts |
|  M | STORAGE_BACKUP_LGPD | MEDIUM | 3 | 14 | 1232 | 218A50D318DC9AA552FA1349D2869F381A443D2448B149B87183AD1FC941A24C | beauty-core-backend/src/modules/arquivos/arquivos.module.ts |
|  M | STORAGE_BACKUP_LGPD | MEDIUM | 23 | 50 | 21127 | 0D9D64EBB81E9E6AF44A594C158C581D5698C2CA27D78C5DB6E957CEB120C1F1 | beauty-core-backend/src/modules/arquivos/arquivos.service.ts |
|  M | STORAGE_BACKUP_LGPD | MEDIUM | 11 | 7 | 6080 | A3542B5EE271B7D414723F3C416D195E41117D731606AB9D46F2D37B2D3C2CA1 | beauty-core-backend/src/modules/arquivos/arquivos-download.service.ts |
|  M | STORAGE_BACKUP_LGPD | MEDIUM | 3 | 14 | 7591 | F75E92B3B87AEBB5A71F1D7960F0D679408E229D2D687180A260B8619FF77A80 | beauty-core-backend/src/modules/arquivos/storage/local-storage.service.ts |
|  M | STORAGE_BACKUP_LGPD | MEDIUM | 4 | 1 | 4626 | A7C5A6D54F0CB4B6A1E9D1E0213BC015168F3E106EABF5876E5C7C608B32BA9A | beauty-core-backend/src/modules/arquivos/storage/multer.config.ts |
|  M | STORAGE_BACKUP_LGPD | MEDIUM | 3 | 5 | 947 | 94DEF9D7A87D4F32EAC639E55852073FE053C867F0571B7DEEE72B63D7513DF7 | beauty-core-backend/test/helpers/upload.helper.ts |
|  M | STORAGE_BACKUP_LGPD | MEDIUM | 19 | 7 | 6308 | CB9D56566A5C0E89A6A485911C6C508FD6C9DF6DE31DF52CECAC4D5FB4DDDAE9 | beauty-core-backend/test/unit/chat36-backup.coverage.spec.ts |
|  M | STORAGE_BACKUP_LGPD | MEDIUM | 50 | 24 | 10513 | 0A57F7BF91CF75AE3486C5CBF2C6F9AFB7006FFFC344AF20E9391F0B34B63B12 | beauty-core-backend/test/unit/chat36-lgpd.coverage.spec.ts |
|  M | TENANCY | HIGH | 3 | 7 | 2060 | D64653C46C6E566BF82047F9BA869DC68BE2091C6A78CAB9BF8B2D7AA92A8711 | beauty-core-backend/src/modules/tenant-publico/public-tenant.controller.ts |
|  M | TENANCY | HIGH | 3 | 10 | 2001 | 64BFF59F431191AA71CEE0B681AB25B59566B341BE6E7C985012CC8C6185831C | beauty-core-backend/src/modules/tenant-publico/tenant-publico.controller.ts |
|  M | TENANCY | HIGH | 3 | 8 | 392 | 8C97907BD286048DB30509216A6028E43842D6632209CDB4119EA5285AD32E6D | beauty-core-backend/src/modules/tenant-publico/tenant-publico.module.ts |
|  M | TENANCY | HIGH | 1 | 1 | 121 | B423999E1F5D7AAFA8294EBAED31FBECF1094E9AC56A508016B135B7728FE892 | beauty-core-backend/src/shared/tenant/index.ts |
|  M | TENANCY | HIGH | 4 | 12 | 448 | A74AE1C8BA7DA546A7C9619C1C3EB600FBE7BF50240C15B02921BC6C202298F4 | beauty-core-backend/src/shared/tenant/tenant.module.ts |
|  M | TENANCY | HIGH | 7 | 20 | 3179 | 94F53F8F10E526F131F803CEA902BDB2895AA9FEEED3D41E64A00B49F86B11FB | beauty-core-backend/src/shared/tenant/tenant-public.service.ts |
|  M | TENANCY | HIGH | 17 | 21 | 8357 | 26A36C25B30EA6826D70355DB6C1B829FD01F5C94E4D1D02E38E0F50E377C6F7 | beauty-core-backend/src/shared/tenant/tenant-validator.service.ts |
|  M | TENANCY | HIGH | 1 | 1 | 282 | 0CDDDCC54FA3CD753A06DDB948DAEA4AF9AE2E432E619F1F140F441B4C5E27A5 | beauty-core-backend/src/shared/utils/get-empresa-id.ts |
|  M | TENANCY | HIGH | 17 | 11 | 2280 | 27E66C2AE476686C248154C5C4DB27118BDAC4726A28C4CA49D0820E16AD6609 | beauty-core-backend/test/e2e/multiempresa.e2e-spec.ts |
|  M | TENANCY | HIGH | 6 | 4 | 1117 | EA4CE84CF494BC1C580D47377F79BF6A478CAFC6E4FA9E7EE9F1FE3D267D4227 | beauty-core-backend/test/e2e/tenant.e2e-spec.ts |
|  M | TENANCY | HIGH | 1 | 1 | 1078 | A624C56BA689D08D722B74871F1277744A731756A8B76B4E412602676BF9D312 | beauty-core-backend/test/unit/tenant-services.coverage.spec.ts |
|  M | TENANCY | HIGH | 4 | 4 | 4874 | F1B3EAF139FE0C03BCA139B03E964DB623647F2881927197BA195C0F6699A039 | beauty-core-backend/test/unit/tenant-validator.spec.ts |
|  M | TEST | EVIDENCE | 3 | 1 | 589 | 1CDF224FD08810C5CE9231B5B2F017144986D964530CDD4ECD7B001D5DCAB0C8 | beauty-core-backend/src/modules/clientes-pacotes/clientes-pacotes.controller.spec.ts |
|  M | TEST | EVIDENCE | 3 | 1 | 596 | 8CCC37772DBE3C4F37932C11136A69F55B2982E864E65346553A63D4E999BAAC | beauty-core-backend/src/modules/niveis-fidelidade/niveis-fidelidade.controller.spec.ts |
|  M | TEST | EVIDENCE | 0 | 2 | 757 | CD4025C5BC786374239E8DBF55D6F53DEF37CF185B009BAEFD8B98190A5CB601 | beauty-core-backend/test/app.e2e-spec.ts |
|  M | TEST | EVIDENCE | 10 | 6 | 1095 | B04004F52F65B3081DF9C1EB5A343548C10359035C247BF439017F95CD5ED4A7 | beauty-core-backend/test/e2e/cliente-area.e2e-spec.ts |
|  M | TEST | EVIDENCE | 5 | 1 | 1864 | 4F5C9E4D81EA36C9432B0F491E6FA1150567B33009DA41E763D2FF1987773616 | beauty-core-backend/test/e2e/health.e2e-spec.ts |
|  M | TEST | EVIDENCE | 5 | 2 | 2012 | D1C2C36231344B80C84DB30A99B20290DD11C278191A3BB74310E613E97E15D2 | beauty-core-backend/test/e2e/metrics.e2e-spec.ts |
|  M | TEST | EVIDENCE | 5 | 3 | 1244 | B949B6B1A42B63A8DC313AC2EB68FC1917536288E2E755C9EB186BBBD3C7D90E | beauty-core-backend/test/e2e/queues.e2e-spec.ts |
|  M | TEST | EVIDENCE | 11 | 4 | 1619 | 7B7510A0722AF71E3296C9880728955219C9091B926EF3B6937F4E41EE8BD767 | beauty-core-backend/test/e2e/refresh-throttle.e2e-spec.ts |
|  M | TEST | EVIDENCE | 5 | 3 | 1276 | E9E4730FE27BC851F4470390BCF19844AFA67BCD2EA4DF56C49F6E9738BECB0E | beauty-core-backend/test/e2e/super-admin.e2e-spec.ts |
|  M | TEST | EVIDENCE | 18 | 8 | 1721 | D269ABE2E1A95F068FDE21B6EBCE8169BE984C990EF6ECF15E79AB5EA72F43FC | beauty-core-backend/test/env-test.guard.ts |
|  M | TEST | EVIDENCE | 10 | 8 | 1233 | 055F88458ADD0E6ADA83A2E073B571FF357FF8B5BAF718D5D7750774E4F6766E | beauty-core-backend/test/helpers/prisma.helper.ts |
|  M | TEST | EVIDENCE | 1 | 3 | 608 | BAF9ACE661773D3E93B56865E119EAF6C55D83EC94D1CCB7793EBFFE9F6360B2 | beauty-core-backend/test/helpers/queue.helper.ts |
|  M | TEST | EVIDENCE | 37 | 23 | 6809 | F43792DFCC88E8570F788149611D8CEC78B62BF2B85E872FDCF23018502E284B | beauty-core-backend/test/seeds/test-seed.ts |
|  M | TEST | EVIDENCE | 10 | 14 | 1157 | 8EC01C351E178BD9525AF5C2BE40C76E20938F3031CF9646F91DB45DE5BF8670 | beauty-core-backend/test/setup-e2e.ts |
|  M | TEST | EVIDENCE | 3 | 3 | 2020 | C0E9A9875463E59BAF3AFE301DB14EF3C9CE82F00FC6498CA7A6C377F35D7E42 | beauty-core-backend/test/unit/agendamentos-concurrency.spec.ts |
|  M | TEST | EVIDENCE | 1 | 1 | 2798 | B2FD68795B67F8D945DF42C0D73782C86B9118DFE4611D37AED25ADB2EFD5CB8 | beauty-core-backend/test/unit/analytics-performance-limits.spec.ts |
|  M | TEST | EVIDENCE | 10 | 8 | 2381 | 68624A279AA6B35C68199CBECC8086AC5915400E2081B15DC1498A593C9ED283 | beauty-core-backend/test/unit/area-cliente-privacy.spec.ts |
|  M | TEST | EVIDENCE | 2 | 7 | 1649 | EB1B987A43BA6CC78DEDDB3FBD2D725F8B4C91AD99076F21FDE7E1772C51C879 | beauty-core-backend/test/unit/cliente-area-compatibility.spec.ts |
|  M | TEST | EVIDENCE | 15 | 8 | 3212 | CB0B959E30F6E6061669915E0B067F8268B8D8813A0FD5A695B5E3811800A9B0 | beauty-core-backend/test/unit/clientes-pacotes-concurrency.spec.ts |
|  M | TEST | EVIDENCE | 68 | 20 | 23510 | A6F8FAD652E9B0C9236008F9678CF547071313B08C83576802F8FF23A8D1E9D4 | beauty-core-backend/test/unit/coverage-under-70-branch-matrix.generated.spec.ts |
|  M | TEST | EVIDENCE | 93 | 21 | 28834 | 9A026F47B36FFEAE4474E658B1FA8120EC4D1DC8DDCE8280A70D6D1E9826751B | beauty-core-backend/test/unit/coverage-under-70-final-target.generated.spec.ts |
|  M | TEST | EVIDENCE | 50 | 11 | 15602 | FAF7F77B638EB890F6944F57DA8D8C0C94F89C4E214766BF9E443DAF5C1A3E30 | beauty-core-backend/test/unit/coverage-under-70-targeted.generated.spec.ts |
|  M | TEST | EVIDENCE | 79 | 20 | 23221 | F34DA49C8EA112B7F4B8B948A526B6A3E4938C4A1EAF8E20242407E2EE3CC6D7 | beauty-core-backend/test/unit/helpers/coverage-smoke.helper.ts |
|  M | TEST | EVIDENCE | 62 | 31 | 5166 | F33B01ACEC4512C5538B42F2448C31DD3548236E0EFA94AC7A65DFC52080274F | beauty-core-backend/test/unit/infrastructure-expanded.coverage.spec.ts |
|  M | TEST | EVIDENCE | 14 | 9 | 3219 | 9E1E9B64536BE916B4DAE41D4695BF782387A9075EB25D390BB071BB9E5D9F0A | beauty-core-backend/test/unit/micro-boost.coverage.spec.ts |
|  M | TEST | EVIDENCE | 13 | 10 | 1536 | A4D91E2F3C012566071132A0B2D57193588229730DFB84A6FE03E231D1BF18D6 | beauty-core-backend/test/unit/modules-services-expanded.coverage.spec.ts |
|  M | TEST | EVIDENCE | 3 | 3 | 403 | 483408169F6002977FF3ACC867876FF90D1051B484ABBE1EB1533DF64753F141 | beauty-core-backend/test/unit/sanity.spec.ts |

## git diff --check

~~~text
warning: in the working copy of 'beauty-core-backend/.env.dev.example', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'beauty-core-backend/.env.example', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'beauty-core-backend/.env.prod.example', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'beauty-core-backend/.env.production.example', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'beauty-core-backend/.env.staging.example', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'beauty-core-backend/prisma/schema.prisma', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'beauty-core-backend/src/main.ts', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'beauty-core-backend/test/setup-e2e.ts', LF will be replaced by CRLF the next time Git touches it
~~~

## Resultado do gate

**PASS-RECONCILED**

- Os 261 caminhos foram preservados, classificados e inventariados sem mutacao.
- PASS-RECONCILED nao significa aprovacao para commit; o conteudo HIGH ainda exige auditoria dirigida.

## Proximo gate

Auditar semanticamente os caminhos HIGH e os 2 untracked, separar alteracoes intencionais de ruido/formatacao e decidir quais mudancas pertencem ao Chat 04 antes de qualquer git add, commit ou push.
