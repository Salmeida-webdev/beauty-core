# BEAUTY CORE 1.0 - CHAT 04 - BLOCO 03 - AUDITORIA SEMANTICA HIGH

- Data/hora: 2026-09-09 14:21:30 -03:00
- Projeto: `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core`
- Branch: `main`
- HEAD local: `9374f86e05e522a501cbcec3bf14175cd46e3b47`
- HEAD esperado do Chat 03: `9374f86e05e522a501cbcec3bf14175cd46e3b47`
- Branch esperada: `main`
- origin/main consultado sem atualizar refs locais: `ba6baa2c6cc08ddbc8aa17bee638071880b12bd1`
- Relatorio fonte do Bloco 02: `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\docs\CHAT04_BLOCO02_RECONCILIACAO_261_CAMINHOS_20260909-135948.md`

> Este bloco e somente auditoria. Nenhum caminho foi stageado, removido, resetado, commitado, enviado ou publicado.
> A classificacao abaixo e uma triagem tecnica; a decisao de incluir qualquer caminho no release exige revisao/autorizacao explicita.

## 1. Gates quantitativos

| Gate | Esperado | Obtido | Resultado |
|---|---:|---:|---|
| Caminhos preservados | 261 | 261 | PASS |
| Caminhos HIGH do Bloco 02 | 85 | 85 | PASS |
| Untracked preservados | 2 | 2 | PASS |
| Staged preservados | 0 | 0 | PASS |
| git diff --check | exit 0 | 0 | PASS |
| git diff --cached --check | exit 0 | 0 | PASS |

## 2. Resumo da auditoria semantica

- Alvos auditados: **85** (`85` HIGH + `2` untracked esperados).
- Arquivos com sinais semanticos relevantes: **68**.
- Arquivos com sinal de possivel literal sensivel: **8**. Os valores nao foram impressos neste relatorio.
- Arquivos ausentes no working tree: **0**.
- Resultado desta auditoria: os candidatos continuam exigindo decisao manual de escopo; isso nao e aprovacao para commit/push.

## 3. Matriz dos alvos

| Tipo | Categoria | Status | Decisao candidata | Caminho | SHA-256 |
|---|---|---|---|---|---|
| HIGH | ENV_EXAMPLE |  M | REVIEW_ENV_CONTRACT_WITHOUT_SECRETS | beauty-core-backend/.env.dev.example | `131C5B0885879D0D4CFBA7FADCC58D268D57C4C42039CBB082E123B9770746EC` |
| HIGH | ENV_EXAMPLE |  M | REVIEW_ENV_CONTRACT_WITHOUT_SECRETS | beauty-core-backend/.env.example | `0A1C76118F68902BC8A9FC79F839A51E812BF06AE9BDDE1792E780D78DAD7F2C` |
| HIGH | ENV_EXAMPLE |  M | REVIEW_ENV_CONTRACT_WITHOUT_SECRETS | beauty-core-backend/.env.prod.example | `24B99960D699C2EEC035380CBE66B157C72F60FD4226350E9ECF3D717BB9FB9D` |
| HIGH | ENV_EXAMPLE |  M | REVIEW_ENV_CONTRACT_WITHOUT_SECRETS | beauty-core-backend/.env.production.example | `9C7C4883D96E599AF0707120DC8282D6869B28B79D6D478D4625FAAB46525C07` |
| HIGH | ENV_EXAMPLE |  M | REVIEW_ENV_CONTRACT_WITHOUT_SECRETS | beauty-core-backend/.env.staging.example | `C33553D62BB95F8B44AE0FB54B67574C6BD90894E904AAB072F67B2BA0116159` |
| HIGH | PRISMA_SCHEMA |  M | REVIEW_RUNTIME_OR_SCHEMA_IMPACT | beauty-core-backend/prisma/schema.prisma | `39ED45846507617518A633F55CF363CA7FA849E9E974F5E175D66C20185DF89B` |
| HIGH | CORE_INFRA |  M | REVIEW_RUNTIME_OR_SCHEMA_IMPACT | beauty-core-backend/src/app.module.ts | `135872BCAE3815925D347CBC98A52B90B5B7B3431C565069967D1E8A8E917ECE` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/common/filters/http-exception.filter.ts | `CA492592C252224AD6B0B2B15B613F9C5575B74A7DCD184682996F55D0A502B6` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/common/interceptors/audit-log.interceptor.ts | `6AA7E8455D3B0454A43FEA4F1913C6A14322E052DDF89221FDD7D358C1DFE3BF` |
| HIGH | CORE_INFRA |  M | REVIEW_RUNTIME_OR_SCHEMA_IMPACT | beauty-core-backend/src/common/metrics/guards/metrics-auth.guard.ts | `F0F73695E17C407FDB98C0C621B3716BE0052FAAA0B9392FA26C956AF05ED3A0` |
| HIGH | CORE_INFRA |  M | REVIEW_RUNTIME_OR_SCHEMA_IMPACT | beauty-core-backend/src/common/metrics/metrics.controller.ts | `D943F67135FDDCD7345A62E2F2827347B803008FAA6687D32F0CE54F32DE5877` |
| HIGH | CORE_INFRA |  M | REVIEW_RUNTIME_OR_SCHEMA_IMPACT | beauty-core-backend/src/common/metrics/metrics.module.ts | `337BF684DD7190489FCAC67E5840EA9D18ED9F00060EE2FA3E7162148905FC27` |
| HIGH | CORE_INFRA |  M | REVIEW_RUNTIME_OR_SCHEMA_IMPACT | beauty-core-backend/src/common/metrics/metrics.service.ts | `C5955D9BB1E8B2910903BBE74CDF2A24ABC0FAAEE432E519AB2A72C34A4FFE54` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/config/env.validation.ts | `5DAC6650C81EC8A7F2748A9F485F34D447E0C08D36A5EA1D084CF56F5AC10786` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/config/swagger.config.ts | `1566D89D65F9774125715F805B77A24833A7C09FB29BCC45662C6083B2703B58` |
| HIGH | CORE_INFRA |  M | REVIEW_RUNTIME_OR_SCHEMA_IMPACT | beauty-core-backend/src/database/prisma/prisma.module.ts | `0F3C00B776B61BE00A1FA7BE51EF977F597CDBFC8322CCE3397CFDD35A1FA4A2` |
| HIGH | CORE_INFRA |  M | REVIEW_RUNTIME_OR_SCHEMA_IMPACT | beauty-core-backend/src/database/prisma/prisma.service.ts | `7959EFB964BAAE1417E628C1ABDC2FE52000564057206D716D1D5515003BB16E` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/main.ts | `0385652D70F2B31AA67456A5AC5815FEF7079B5F9390D60D2753AA94EE25350B` |
| HIGH | META_WHATSAPP |  M | POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK | beauty-core-backend/src/modules/area-cliente/dto/enviar-portal-mensagem-whatsapp.dto.ts | `F34896380001DD5FE877FC6E38453D9899723FF66114BDDE6D755D045DE6B935` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/auditoria/auditoria.controller.ts | `BD932D2FB94DD684FD03EAE1551FF85B902E9CECB7A819B7DA068F5F73E61190` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/auditoria/auditoria.module.ts | `91E7B605C77A96CD4C5468A7EA7C08D9C864B56901904DF10403676EA32AD4C4` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/auditoria/auditoria.service.ts | `0FE399695B959BFB1771DD7032451026416EA7A51238D8A6DA1E88E72E599301` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/auditoria/dto/create-auditoria.dto.ts | `9C1251EF42A8A7F9F7E0C917182FF0E424149618B180A902F6DF1363119CC483` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/auditoria/dto/filtros-auditoria.dto.ts | `2A416E823F7BB734FBA6C26FE4DE5308DB5888537B552CBCD4317FC1AFDB3B1B` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/auth-cliente/auth-cliente-publico.controller.ts | `217307E40C296D532279AB7671CA69A72A5022B6BA0C4AE978AA6E289918EC33` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/auth-cliente/auth-cliente.controller.ts | `998066D5743AE1DC7B320279753A8189EE670DA1AE8170919716D3EAF8B2CBD6` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/auth-cliente/auth-cliente.module.ts | `5297F4E335D3EBF07A8360E1FB0C5FFEDC441E12B99AEEC6A51DBEA4096661F5` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/auth-cliente/auth-cliente.service.ts | `0ECA2C9115B3AD7B903766B93C9FF38A17F2D89D5D51F62874B6C33FBEE4C0EB` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/auth-cliente/dto/aceitar-termos.dto.ts | `6E60C127148391768FB1389CE60C8E7CCB4AAF829AB3C8E4C6B20DF5E8733B41` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/auth-cliente/dto/refresh-cliente-token.dto.ts | `1E15D8C1B530E539A289E15D61DD46EEED57B563AB52C71A89642CD86551AE9E` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/auth-cliente/dto/solicitar-codigo.dto.ts | `F25D1D651ACA25635E57351CB993C7D442E1717EDA126D59D239E8566CE30DFD` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/auth-cliente/dto/verificar-codigo.dto.ts | `F2741C34E2BB9196F5CE5EDACC2447884ED909616647C117D7FDE2D8828DD990` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/auth-cliente/guards/cliente-auth.guard.ts | `E88A4F193BAB7769EFBB6B4E225337D1725FB98D07863E63FBB76D5D5BA1E610` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/auth-cliente/strategies/cliente-jwt.strategy.ts | `B98E374709ED18CCEA7A800100EBA5DFF4F691BC436577DE107D7573F275D369` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/auth/auth.controller.ts | `F81AD37841C83612B3D9C13F37D8A9CAC31980EF64C8FF04DB92CDACCCBEC119` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/auth/auth.module.ts | `4B7F27B3C5CB698F1B11579B324B8FF3C485DBCDBC98AE5484415888A1C67A8C` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/auth/auth.service.ts | `5E7EABC6E22DD5DD353B148ACC2BD179834721A15B6973CB0F4928940745D437` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/auth/dto/login.dto.ts | `2C22B4E72AD9C2690029F40DB1E36310E7EFDD639C9A3AC97D70C4C0EBB9DE90` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/auth/dto/refresh-token.dto.ts | `75A2F45778CAA36AD8B6D126FD14458FDDA3F682983AD5AF2827C48521BEA539` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/auth/guards/jwt-auth.guard.ts | `86F01FC8F2C8DC7A5D29859DEE9467CCB4A7611FC82A79BEEE69FC71EFCE4308` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/auth/guards/roles.guard.ts | `657A4365F2A1978F94BDEE89ACE1D9060FA73696633E0766BD84003138A45460` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/auth/strategies/jwt.strategy.ts | `B44B60C9C193FF28E55CEDE868947DD61BA74F5CDB306B7791A46547CEF67D8B` |
| HIGH | META_WHATSAPP |  M | POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK | beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.controller.ts | `F0E59BE9DE129AD6F49C7F9B70D8600EB967A7121BBB4A12E69FED0E5A352279` |
| HIGH | META_WHATSAPP |  M | POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK | beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.module.ts | `8287245D4AB20C970EF2D283F80103E603B6377967DE4266E10F50B760E37240` |
| HIGH | META_WHATSAPP |  M | POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK | beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts | `07E642F96C0536CA7711FB7D3D06AEEB1C8C4C32FF3AACDC2637197B2A825441` |
| HIGH | META_WHATSAPP |  M | POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK | beauty-core-backend/src/modules/campanhas-whatsapp/dto/create-campanha-whatsapp.dto.ts | `F7BDE1330D623EA4D6B41B1364311862E1A42883ACC8DED8AC9CFF1E03B089BD` |
| HIGH | META_WHATSAPP |  M | POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK | beauty-core-backend/src/modules/campanhas-whatsapp/dto/update-campanha-whatsapp.dto.ts | `EB1D92042DA43BB902D554D56B2652ED6A33AA2B90B1BB08D13F27880C75D9D7` |
| HIGH | META_WHATSAPP |  M | POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK | beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.controller.ts | `BEA6005ED6DE9650DB9E919AB2D01BCEDA123F45DC1F23D21C151D5822673939` |
| HIGH | META_WHATSAPP |  M | POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK | beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.module.ts | `8AB1C9390080253E22FB19CFC092C3448A8028AD2740FEDAD3322D223B2E3F89` |
| HIGH | META_WHATSAPP |  M | POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK | beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts | `E58DF8C68BD5165FC211BBEE543EEDA80F1E777DDAB6DD974F1350EC68CDA55D` |
| HIGH | META_WHATSAPP |  M | POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK | beauty-core-backend/src/modules/configuracao-whatsapp/dto/create-configuracao-whatsapp.dto.ts | `4833514FF0C36CB03C739F1D0D09BE2A5CA773258073067DC4E8B39D22D52B13` |
| HIGH | META_WHATSAPP |  M | POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK | beauty-core-backend/src/modules/configuracao-whatsapp/dto/update-configuracao-whatsapp.dto.ts | `461C5F9726077B53D7AB7FE44C72A7EDDA4F1D11DB090AC7B79C9A7022FA0E3E` |
| HIGH | META_WHATSAPP |  M | POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK | beauty-core-backend/src/modules/templates-whatsapp/dto/create-template-whatsapp.dto.ts | `895475D41861401FF5D297FD7DCFA32E86DD2AB4E00B4F3BC885C059B9CBBD83` |
| HIGH | META_WHATSAPP |  M | POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK | beauty-core-backend/src/modules/templates-whatsapp/dto/update-template-whatsapp.dto.ts | `224A8A0300D074A733F657F6E3E00E84A559346857187232A07AEA2D1D25BC2A` |
| HIGH | META_WHATSAPP |  M | POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK | beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.controller.ts | `2AC82F3284789541359DCBE2A2FFE4B4613ADEC204F6D380090C365DF168AC40` |
| HIGH | META_WHATSAPP |  M | POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK | beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.module.ts | `7C6308A4B1C98B9909DA387BF330CDA16162138ED6A7E05F35384FF8987522C4` |
| HIGH | META_WHATSAPP |  M | POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK | beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.service.ts | `870389CEC10C2CD980567381830ECAAF922CAE8C37E77F6A49CCA8EF7066451A` |
| HIGH | TENANCY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/tenant-publico/public-tenant.controller.ts | `D64653C46C6E566BF82047F9BA869DC68BE2091C6A78CAB9BF8B2D7AA92A8711` |
| HIGH | TENANCY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/tenant-publico/tenant-publico.controller.ts | `64BFF59F431191AA71CEE0B681AB25B59566B341BE6E7C985012CC8C6185831C` |
| HIGH | TENANCY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/tenant-publico/tenant-publico.module.ts | `8C97907BD286048DB30509216A6028E43842D6632209CDB4119EA5285AD32E6D` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/modules/usuarios/policies/usuario-role.policy.ts | `08347731362FF870A2BD6D183030E3BC0B0860E74223A07135F589F0FAC3710D` |
| HIGH | META_WHATSAPP |  M | POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK | beauty-core-backend/src/queues/jobs/whatsapp.job.ts | `C8DE51C47FA88BA5B9F681E025D721C2842528C6B971AE3DE36BD1112B1D0F3D` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/shared/decorators/roles.decorator.ts | `82FF16CE8FB2BED6968D205E407E129B81DE1C0CB25560F601523A97B41115E0` |
| HIGH | TENANCY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/shared/tenant/index.ts | `B423999E1F5D7AAFA8294EBAED31FBECF1094E9AC56A508016B135B7728FE892` |
| HIGH | TENANCY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/shared/tenant/tenant-public.service.ts | `94F53F8F10E526F131F803CEA902BDB2895AA9FEEED3D41E64A00B49F86B11FB` |
| HIGH | TENANCY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/shared/tenant/tenant-validator.service.ts | `26A36C25B30EA6826D70355DB6C1B829FD01F5C94E4D1D02E38E0F50E377C6F7` |
| HIGH | TENANCY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/shared/tenant/tenant.module.ts | `A74AE1C8BA7DA546A7C9619C1C3EB600FBE7BF50240C15B02921BC6C202298F4` |
| HIGH | TENANCY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/src/shared/utils/get-empresa-id.ts | `0CDDDCC54FA3CD753A06DDB948DAEA4AF9AE2E432E619F1F140F441B4C5E27A5` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/test/e2e/auditoria.e2e-spec.ts | `48F0BFE5138A8CB8C4E0CBCD3A487E2A15483739BE14E7D08D8606B9509C0014` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/test/e2e/auth-admin.e2e-spec.ts | `4C5D055E1DF47C2D8BD8C5CD42C7DDC988A03FD936C6DCC708CC716F396DD291` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/test/e2e/auth-cliente.e2e-spec.ts | `C2D5D43FEEB2E5F5F4CB72367B1FB94039029FCC9D32AFA9D42FDF793823F747` |
| HIGH | TENANCY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/test/e2e/multiempresa.e2e-spec.ts | `27E66C2AE476686C248154C5C4DB27118BDAC4726A28C4CA49D0820E16AD6609` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/test/e2e/roles.e2e-spec.ts | `510236D36490A12E19CC87B86DDE584C142C7E349170DA6364F1E12BC9D5362A` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/test/e2e/swagger-validation.e2e-spec.ts | `622CAB6EAED9EF8C62C8AE7FE3254F652171AD6BA24D25AA4A7B4333FFA2D138` |
| HIGH | TENANCY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/test/e2e/tenant.e2e-spec.ts | `EA4CE84CF494BC1C580D47377F79BF6A478CAFC6E4FA9E7EE9F1FE3D267D4227` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/test/helpers/auth.helper.ts | `C3D90A18E9822B86DB451D54F08AEAC91604404BD7B6B41FF81E0C7EE531BC66` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/test/unit/auth-guards.coverage.spec.ts | `245163B4320D5145BFB05BC254021E0BDE5E6983C89E493402F35A13B98FCD2E` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/test/unit/env-validation-cors.spec.ts | `A2E41A552B137DF1F3B5AE6D40625DCA58D4D08B990075A9466A241646074D5E` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/test/unit/env-validation-required.spec.ts | `C725EF8C2C88A347631A03FCDC62160BCC497E73E7A2585967BC93D7D57B3867` |
| HIGH | TENANCY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/test/unit/tenant-services.coverage.spec.ts | `A624C56BA689D08D722B74871F1277744A731756A8B76B4E412602676BF9D312` |
| HIGH | TENANCY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/test/unit/tenant-validator.spec.ts | `F1B3EAF139FE0C03BCA139B03E964DB623647F2881927197BA195C0F6699A039` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/test/unit/usuario-role-policy.coverage.spec.ts | `4AB5521A671EC0C11B0092F9D652A8E68E6426526077C710450CC2DD10A61E98` |
| HIGH | AUTH_SECURITY |  M | REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION | beauty-core-backend/test/unit/usuario-role-policy.spec.ts | `0875F676D58E869D28FA86AFF97722B63C3063D33CBD0E1767F1B3D3772B298B` |
| HIGH | PRISMA_MIGRATION | ?? | UNTRACKED_REQUIRES_EXPLICIT_DECISION | beauty-core-backend/prisma/migrations/20260909150000_meta_whatsapp_webhook/migration.sql | `017C26C0A9B0DF3D4BBBF6482F0B20BFDD43AAF617515099267C9A87DEFFD493` |
| HIGH | META_WHATSAPP | ?? | UNTRACKED_REQUIRES_EXPLICIT_DECISION | beauty-core-backend/test/e2e/meta-whatsapp-webhook.e2e-spec.ts | `0E1D8B3621AC39FDD9A09340429967096B923AC8BCDBF68D9741E9FB797AAB9C` |

## 4. Detalhamento tecnico por alvo

### beauty-core-backend/.env.dev.example

- Tipo: `HIGH`
- Categoria: `ENV_EXAMPLE`
- Status Git: ` M`
- Tamanho: 1518 bytes
- SHA-256: `131C5B0885879D0D4CFBA7FADCC58D268D57C4C42039CBB082E123B9770746EC`
- Numstat: `warning: in the working copy of 'beauty-core-backend/.env.dev.example', LF will be replaced by CRLF the next time Git touches it; 5	1	beauty-core-backend/.env.dev.example`
- Decisao candidata: **REVIEW_ENV_CONTRACT_WITHOUT_SECRETS**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - POTENTIAL_SECRET_LITERAL (linha 6)
  - POTENTIAL_SECRET_LITERAL (linha 13)
  - POTENTIAL_SECRET_LITERAL (linha 16)
  - QUEUE_WORKER (linha 28)
  - QUEUE_WORKER (linha 29)
  - STORAGE_LGPD (linha 32)
  - AUTHORIZATION_BOUNDARY (linha 43)
  - AUTHORIZATION_BOUNDARY (linha 44)
  - AUTHORIZATION_BOUNDARY (linha 45)
  - STORAGE_LGPD (linha 47)
  - STORAGE_LGPD (linha 48)
  - STORAGE_LGPD (linha 49)
  - STORAGE_LGPD (linha 50)
  - STORAGE_LGPD (linha 51)
  - STORAGE_LGPD (linha 53)
  - STORAGE_LGPD (linha 54)
  - POTENTIAL_SECRET_LITERAL (linha 64)
  - POTENTIAL_SECRET_LITERAL (linha 71)
  - POTENTIAL_SECRET_LITERAL (linha 74)
  - QUEUE_WORKER (linha 86)
  - QUEUE_WORKER (linha 87)
  - STORAGE_LGPD (linha 90)
  - AUTHORIZATION_BOUNDARY (linha 101)
  - AUTHORIZATION_BOUNDARY (linha 102)
  - AUTHORIZATION_BOUNDARY (linha 103)
  - STORAGE_LGPD (linha 105)
  - STORAGE_LGPD (linha 106)
  - STORAGE_LGPD (linha 107)
  - STORAGE_LGPD (linha 108)
  - STORAGE_LGPD (linha 109)
  - STORAGE_LGPD (linha 111)
  - STORAGE_LGPD (linha 112)
  - META_AUTH_OR_WEBHOOK (linha 118)
- Preview redigido das linhas adicionadas ou iniciais:
  NODE_ENV=development

  # Meta WhatsApp Cloud API webhook (secrets via secret manager; values intentionally empty)
  META_WHATSAPP_APP_SECRET=
  META_WHATSAPP_VERIFY_TOKEN=

### beauty-core-backend/.env.example

- Tipo: `HIGH`
- Categoria: `ENV_EXAMPLE`
- Status Git: ` M`
- Tamanho: 4253 bytes
- SHA-256: `0A1C76118F68902BC8A9FC79F839A51E812BF06AE9BDDE1792E780D78DAD7F2C`
- Numstat: `warning: in the working copy of 'beauty-core-backend/.env.example', LF will be replaced by CRLF the next time Git touches it; 5	1	beauty-core-backend/.env.example`
- Decisao candidata: **REVIEW_ENV_CONTRACT_WITHOUT_SECRETS**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - QUEUE_WORKER (linha 46)
  - PUBLIC_ORIGIN_RISK (linha 49)
  - PUBLIC_ORIGIN_RISK (linha 53)
  - QUEUE_WORKER (linha 58)
  - QUEUE_WORKER (linha 60)
  - QUEUE_WORKER (linha 61)
  - QUEUE_WORKER (linha 63)
  - TENANCY_BOUNDARY (linha 64)
  - QUEUE_WORKER (linha 64)
  - STORAGE_LGPD (linha 67)
  - STORAGE_LGPD (linha 69)
  - STORAGE_LGPD (linha 70)
  - STORAGE_LGPD (linha 71)
  - STORAGE_LGPD (linha 98)
  - STORAGE_LGPD (linha 100)
  - STORAGE_LGPD (linha 101)
  - QUEUE_WORKER (linha 117)
  - QUEUE_WORKER (linha 118)
  - QUEUE_WORKER (linha 119)
  - QUEUE_WORKER (linha 120)
  - QUEUE_WORKER (linha 121)
  - QUEUE_WORKER (linha 122)
  - QUEUE_WORKER (linha 123)
  - QUEUE_WORKER (linha 124)
  - QUEUE_WORKER (linha 125)
  - QUEUE_WORKER (linha 126)
  - QUEUE_WORKER (linha 127)
  - QUEUE_WORKER (linha 128)
  - QUEUE_WORKER (linha 129)
  - AUTHORIZATION_BOUNDARY (linha 135)
  - AUTHORIZATION_BOUNDARY (linha 136)
  - AUTHORIZATION_BOUNDARY (linha 137)
  - STORAGE_LGPD (linha 144)
  - STORAGE_LGPD (linha 145)
  - STORAGE_LGPD (linha 146)
  - STORAGE_LGPD (linha 147)
  - STORAGE_LGPD (linha 148)
  - STORAGE_LGPD (linha 150)
  - STORAGE_LGPD (linha 151)
  - QUEUE_WORKER (linha 201)
  - PUBLIC_ORIGIN_RISK (linha 204)
  - PUBLIC_ORIGIN_RISK (linha 208)
  - QUEUE_WORKER (linha 213)
  - QUEUE_WORKER (linha 215)
  - QUEUE_WORKER (linha 216)
  - QUEUE_WORKER (linha 218)
  - TENANCY_BOUNDARY (linha 219)
  - QUEUE_WORKER (linha 219)
  - STORAGE_LGPD (linha 222)
  - STORAGE_LGPD (linha 224)
  - STORAGE_LGPD (linha 225)
  - STORAGE_LGPD (linha 226)
  - STORAGE_LGPD (linha 253)
  - STORAGE_LGPD (linha 255)
  - STORAGE_LGPD (linha 256)
  - QUEUE_WORKER (linha 272)
  - QUEUE_WORKER (linha 273)
  - QUEUE_WORKER (linha 274)
  - QUEUE_WORKER (linha 275)
  - QUEUE_WORKER (linha 276)
  - QUEUE_WORKER (linha 277)
  - QUEUE_WORKER (linha 278)
  - QUEUE_WORKER (linha 279)
  - QUEUE_WORKER (linha 280)
  - QUEUE_WORKER (linha 281)
  - QUEUE_WORKER (linha 282)
  - QUEUE_WORKER (linha 283)
  - QUEUE_WORKER (linha 284)
  - AUTHORIZATION_BOUNDARY (linha 290)
  - AUTHORIZATION_BOUNDARY (linha 291)
  - AUTHORIZATION_BOUNDARY (linha 292)
  - STORAGE_LGPD (linha 299)
  - STORAGE_LGPD (linha 300)
  - STORAGE_LGPD (linha 301)
  - STORAGE_LGPD (linha 302)
  - STORAGE_LGPD (linha 303)
  - STORAGE_LGPD (linha 305)
  - STORAGE_LGPD (linha 306)
  - META_AUTH_OR_WEBHOOK (linha 312)
- Preview redigido das linhas adicionadas ou iniciais:
  # =========================================================

  # Meta WhatsApp Cloud API webhook (secrets via secret manager; values intentionally empty)
  META_WHATSAPP_APP_SECRET=
  META_WHATSAPP_VERIFY_TOKEN=

### beauty-core-backend/.env.prod.example

- Tipo: `HIGH`
- Categoria: `ENV_EXAMPLE`
- Status Git: ` M`
- Tamanho: 1666 bytes
- SHA-256: `24B99960D699C2EEC035380CBE66B157C72F60FD4226350E9ECF3D717BB9FB9D`
- Numstat: `warning: in the working copy of 'beauty-core-backend/.env.prod.example', LF will be replaced by CRLF the next time Git touches it; 5	1	beauty-core-backend/.env.prod.example`
- Decisao candidata: **REVIEW_ENV_CONTRACT_WITHOUT_SECRETS**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - QUEUE_WORKER (linha 30)
  - QUEUE_WORKER (linha 31)
  - STORAGE_LGPD (linha 34)
  - AUTHORIZATION_BOUNDARY (linha 45)
  - AUTHORIZATION_BOUNDARY (linha 46)
  - AUTHORIZATION_BOUNDARY (linha 47)
  - STORAGE_LGPD (linha 49)
  - STORAGE_LGPD (linha 50)
  - STORAGE_LGPD (linha 51)
  - STORAGE_LGPD (linha 52)
  - STORAGE_LGPD (linha 53)
  - STORAGE_LGPD (linha 55)
  - STORAGE_LGPD (linha 56)
  - QUEUE_WORKER (linha 90)
  - QUEUE_WORKER (linha 91)
  - STORAGE_LGPD (linha 94)
  - AUTHORIZATION_BOUNDARY (linha 105)
  - AUTHORIZATION_BOUNDARY (linha 106)
  - AUTHORIZATION_BOUNDARY (linha 107)
  - STORAGE_LGPD (linha 109)
  - STORAGE_LGPD (linha 110)
  - STORAGE_LGPD (linha 111)
  - STORAGE_LGPD (linha 112)
  - STORAGE_LGPD (linha 113)
  - STORAGE_LGPD (linha 115)
  - STORAGE_LGPD (linha 116)
  - META_AUTH_OR_WEBHOOK (linha 122)
- Preview redigido das linhas adicionadas ou iniciais:
  NODE_ENV=production

  # Meta WhatsApp Cloud API webhook (secrets via secret manager; values intentionally empty)
  META_WHATSAPP_APP_SECRET=
  META_WHATSAPP_VERIFY_TOKEN=

### beauty-core-backend/.env.production.example

- Tipo: `HIGH`
- Categoria: `ENV_EXAMPLE`
- Status Git: ` M`
- Tamanho: 1717 bytes
- SHA-256: `9C7C4883D96E599AF0707120DC8282D6869B28B79D6D478D4625FAAB46525C07`
- Numstat: `warning: in the working copy of 'beauty-core-backend/.env.production.example', LF will be replaced by CRLF the next time Git touches it; 5	1	beauty-core-backend/.env.production.example`
- Decisao candidata: **REVIEW_ENV_CONTRACT_WITHOUT_SECRETS**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - STORAGE_LGPD (linha 26)
  - STORAGE_LGPD (linha 28)
  - STORAGE_LGPD (linha 29)
  - STORAGE_LGPD (linha 30)
  - STORAGE_LGPD (linha 31)
  - AUTHORIZATION_BOUNDARY (linha 36)
  - AUTHORIZATION_BOUNDARY (linha 37)
  - STORAGE_LGPD (linha 39)
  - STORAGE_LGPD (linha 40)
  - STORAGE_LGPD (linha 47)
  - STORAGE_LGPD (linha 48)
  - STORAGE_LGPD (linha 49)
  - STORAGE_LGPD (linha 50)
  - STORAGE_LGPD (linha 51)
  - STORAGE_LGPD (linha 53)
  - STORAGE_LGPD (linha 54)
  - STORAGE_LGPD (linha 84)
  - STORAGE_LGPD (linha 86)
  - STORAGE_LGPD (linha 87)
  - STORAGE_LGPD (linha 88)
  - STORAGE_LGPD (linha 89)
  - AUTHORIZATION_BOUNDARY (linha 94)
  - AUTHORIZATION_BOUNDARY (linha 95)
  - STORAGE_LGPD (linha 97)
  - STORAGE_LGPD (linha 98)
  - STORAGE_LGPD (linha 105)
  - STORAGE_LGPD (linha 106)
  - STORAGE_LGPD (linha 107)
  - STORAGE_LGPD (linha 108)
  - STORAGE_LGPD (linha 109)
  - STORAGE_LGPD (linha 111)
  - STORAGE_LGPD (linha 112)
  - META_AUTH_OR_WEBHOOK (linha 118)
- Preview redigido das linhas adicionadas ou iniciais:
  NODE_ENV=production

  # Meta WhatsApp Cloud API webhook (secrets via secret manager; values intentionally empty)
  META_WHATSAPP_APP_SECRET=
  META_WHATSAPP_VERIFY_TOKEN=

### beauty-core-backend/.env.staging.example

- Tipo: `HIGH`
- Categoria: `ENV_EXAMPLE`
- Status Git: ` M`
- Tamanho: 1807 bytes
- SHA-256: `C33553D62BB95F8B44AE0FB54B67574C6BD90894E904AAB072F67B2BA0116159`
- Numstat: `warning: in the working copy of 'beauty-core-backend/.env.staging.example', LF will be replaced by CRLF the next time Git touches it; 5	1	beauty-core-backend/.env.staging.example`
- Decisao candidata: **REVIEW_ENV_CONTRACT_WITHOUT_SECRETS**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - PUBLIC_ORIGIN_RISK (linha 28)
  - QUEUE_WORKER (linha 30)
  - QUEUE_WORKER (linha 31)
  - STORAGE_LGPD (linha 34)
  - AUTHORIZATION_BOUNDARY (linha 45)
  - AUTHORIZATION_BOUNDARY (linha 46)
  - AUTHORIZATION_BOUNDARY (linha 47)
  - STORAGE_LGPD (linha 53)
  - STORAGE_LGPD (linha 54)
  - STORAGE_LGPD (linha 55)
  - STORAGE_LGPD (linha 56)
  - STORAGE_LGPD (linha 57)
  - STORAGE_LGPD (linha 59)
  - STORAGE_LGPD (linha 60)
  - PUBLIC_ORIGIN_RISK (linha 92)
  - QUEUE_WORKER (linha 94)
  - QUEUE_WORKER (linha 95)
  - STORAGE_LGPD (linha 98)
  - AUTHORIZATION_BOUNDARY (linha 109)
  - AUTHORIZATION_BOUNDARY (linha 110)
  - AUTHORIZATION_BOUNDARY (linha 111)
  - STORAGE_LGPD (linha 117)
  - STORAGE_LGPD (linha 118)
  - STORAGE_LGPD (linha 119)
  - STORAGE_LGPD (linha 120)
  - STORAGE_LGPD (linha 121)
  - STORAGE_LGPD (linha 123)
  - STORAGE_LGPD (linha 124)
  - META_AUTH_OR_WEBHOOK (linha 130)
- Preview redigido das linhas adicionadas ou iniciais:
  NODE_ENV=production

  # Meta WhatsApp Cloud API webhook (secrets via secret manager; values intentionally empty)
  META_WHATSAPP_APP_SECRET=
  META_WHATSAPP_VERIFY_TOKEN=

### beauty-core-backend/prisma/schema.prisma

- Tipo: `HIGH`
- Categoria: `PRISMA_SCHEMA`
- Status Git: ` M`
- Tamanho: 30664 bytes
- SHA-256: `39ED45846507617518A633F55CF363CA7FA849E9E974F5E175D66C20185DF89B`
- Numstat: `warning: in the working copy of 'beauty-core-backend/prisma/schema.prisma', LF will be replaced by CRLF the next time Git touches it; 18	0	beauty-core-backend/prisma/schema.prisma`
- Decisao candidata: **REVIEW_RUNTIME_OR_SCHEMA_IMPACT**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - MOCK_OR_SIMULATION (linha 131)
  - TENANCY_BOUNDARY (linha 230)
  - STORAGE_LGPD (linha 236)
  - STORAGE_LGPD (linha 237)
  - STORAGE_LGPD (linha 243)
  - STORAGE_LGPD (linha 244)
  - STORAGE_LGPD (linha 271)
  - STORAGE_LGPD (linha 272)
  - STORAGE_LGPD (linha 273)
  - STORAGE_LGPD (linha 274)
  - STORAGE_LGPD (linha 275)
  - STORAGE_LGPD (linha 276)
  - STORAGE_LGPD (linha 277)
  - STORAGE_LGPD (linha 278)
  - STORAGE_LGPD (linha 281)
  - TENANCY_BOUNDARY (linha 348)
  - TENANCY_BOUNDARY (linha 361)
  - TENANCY_BOUNDARY (linha 365)
  - TENANCY_BOUNDARY (linha 366)
  - TENANCY_BOUNDARY (linha 367)
  - TENANCY_BOUNDARY (linha 368)
  - TENANCY_BOUNDARY (linha 369)
  - TENANCY_BOUNDARY (linha 375)
  - TENANCY_BOUNDARY (linha 392)
  - TENANCY_BOUNDARY (linha 405)
  - TENANCY_BOUNDARY (linha 410)
  - TENANCY_BOUNDARY (linha 411)
  - TENANCY_BOUNDARY (linha 412)
  - TENANCY_BOUNDARY (linha 413)
  - TENANCY_BOUNDARY (linha 414)
  - TENANCY_BOUNDARY (linha 415)
  - TENANCY_BOUNDARY (linha 421)
  - TENANCY_BOUNDARY (linha 443)
  - TENANCY_BOUNDARY (linha 461)
  - TENANCY_BOUNDARY (linha 462)
  - TENANCY_BOUNDARY (linha 467)
  - TENANCY_BOUNDARY (linha 468)
  - TENANCY_BOUNDARY (linha 469)
  - TENANCY_BOUNDARY (linha 470)
  - TENANCY_BOUNDARY (linha 471)
  - TENANCY_BOUNDARY (linha 472)
  - TENANCY_BOUNDARY (linha 473)
  - TENANCY_BOUNDARY (linha 479)
  - TENANCY_BOUNDARY (linha 492)
  - TENANCY_BOUNDARY (linha 495)
  - TENANCY_BOUNDARY (linha 498)
  - TENANCY_BOUNDARY (linha 499)
  - TENANCY_BOUNDARY (linha 500)
  - TENANCY_BOUNDARY (linha 501)
  - TENANCY_BOUNDARY (linha 502)
  - TENANCY_BOUNDARY (linha 503)
  - TENANCY_BOUNDARY (linha 509)
  - TENANCY_BOUNDARY (linha 525)
  - TENANCY_BOUNDARY (linha 534)
  - TENANCY_BOUNDARY (linha 541)
  - TENANCY_BOUNDARY (linha 542)
  - TENANCY_BOUNDARY (linha 543)
  - TENANCY_BOUNDARY (linha 544)
  - TENANCY_BOUNDARY (linha 545)
  - TENANCY_BOUNDARY (linha 546)
  - TENANCY_BOUNDARY (linha 547)
  - TENANCY_BOUNDARY (linha 548)
  - TENANCY_BOUNDARY (linha 549)
  - TENANCY_BOUNDARY (linha 550)
  - TENANCY_BOUNDARY (linha 551)
  - TENANCY_BOUNDARY (linha 557)
  - TENANCY_BOUNDARY (linha 574)
  - TENANCY_BOUNDARY (linha 578)
  - TENANCY_BOUNDARY (linha 579)
  - TENANCY_BOUNDARY (linha 580)
  - TENANCY_BOUNDARY (linha 581)
  - TENANCY_BOUNDARY (linha 582)
  - TENANCY_BOUNDARY (linha 583)
  - TENANCY_BOUNDARY (linha 589)
  - TENANCY_BOUNDARY (linha 611)
  - STORAGE_LGPD (linha 618)
  - STORAGE_LGPD (linha 619)
  - STORAGE_LGPD (linha 620)
  - TENANCY_BOUNDARY (linha 624)
  - TENANCY_BOUNDARY (linha 632)
  - TENANCY_BOUNDARY (linha 633)
  - TENANCY_BOUNDARY (linha 634)
  - TENANCY_BOUNDARY (linha 635)
  - TENANCY_BOUNDARY (linha 636)
  - TENANCY_BOUNDARY (linha 637)
  - TENANCY_BOUNDARY (linha 638)
  - TENANCY_BOUNDARY (linha 639)
  - TENANCY_BOUNDARY (linha 640)
  - TENANCY_BOUNDARY (linha 641)
  - TENANCY_BOUNDARY (linha 642)
  - TENANCY_BOUNDARY (linha 643)
  - TENANCY_BOUNDARY (linha 644)
  - STORAGE_LGPD (linha 644)
  - TENANCY_BOUNDARY (linha 645)
  - TENANCY_BOUNDARY (linha 652)
  - TENANCY_BOUNDARY (linha 660)
  - TENANCY_BOUNDARY (linha 662)
  - TENANCY_BOUNDARY (linha 663)
  - TENANCY_BOUNDARY (linha 665)
  - TENANCY_BOUNDARY (linha 666)
  - TENANCY_BOUNDARY (linha 667)
  - TENANCY_BOUNDARY (linha 674)
  - TENANCY_BOUNDARY (linha 685)
  - TENANCY_BOUNDARY (linha 687)
  - TENANCY_BOUNDARY (linha 691)
  - TENANCY_BOUNDARY (linha 692)
  - TENANCY_BOUNDARY (linha 693)
  - TENANCY_BOUNDARY (linha 694)
  - TENANCY_BOUNDARY (linha 700)
  - TENANCY_BOUNDARY (linha 720)
  - TENANCY_BOUNDARY (linha 722)
  - TENANCY_BOUNDARY (linha 723)
  - TENANCY_BOUNDARY (linha 724)
  - TENANCY_BOUNDARY (linha 725)
  - TENANCY_BOUNDARY (linha 726)
  - TENANCY_BOUNDARY (linha 727)
  - TENANCY_BOUNDARY (linha 728)
  - TENANCY_BOUNDARY (linha 729)
  - TENANCY_BOUNDARY (linha 730)
  - TENANCY_BOUNDARY (linha 736)
  - TENANCY_BOUNDARY (linha 751)
  - TENANCY_BOUNDARY (linha 754)
  - TENANCY_BOUNDARY (linha 755)
  - TENANCY_BOUNDARY (linha 756)
  - TENANCY_BOUNDARY (linha 757)
  - TENANCY_BOUNDARY (linha 758)
  - TENANCY_BOUNDARY (linha 759)
  - TENANCY_BOUNDARY (linha 765)
  - TENANCY_BOUNDARY (linha 781)
  - TENANCY_BOUNDARY (linha 785)
  - TENANCY_BOUNDARY (linha 790)
  - TENANCY_BOUNDARY (linha 791)
  - TENANCY_BOUNDARY (linha 792)
  - TENANCY_BOUNDARY (linha 793)
  - TENANCY_BOUNDARY (linha 794)
  - TENANCY_BOUNDARY (linha 795)
  - TENANCY_BOUNDARY (linha 796)
  - TENANCY_BOUNDARY (linha 797)
  - TENANCY_BOUNDARY (linha 798)
  - TENANCY_BOUNDARY (linha 804)
  - TENANCY_BOUNDARY (linha 817)
  - TENANCY_BOUNDARY (linha 819)
  - TENANCY_BOUNDARY (linha 822)
  - TENANCY_BOUNDARY (linha 823)
  - TENANCY_BOUNDARY (linha 824)
  - TENANCY_BOUNDARY (linha 825)
  - TENANCY_BOUNDARY (linha 831)
  - TENANCY_BOUNDARY (linha 842)
  - TENANCY_BOUNDARY (linha 844)
  - TENANCY_BOUNDARY (linha 845)
  - TENANCY_BOUNDARY (linha 847)
  - TENANCY_BOUNDARY (linha 848)
  - TENANCY_BOUNDARY (linha 849)
  - TENANCY_BOUNDARY (linha 855)
  - TENANCY_BOUNDARY (linha 886)
  - TENANCY_BOUNDARY (linha 888)
  - TENANCY_BOUNDARY (linha 889)
  - TENANCY_BOUNDARY (linha 895)
  - TENANCY_BOUNDARY (linha 905)
  - TENANCY_BOUNDARY (linha 909)
  - TENANCY_BOUNDARY (linha 911)
  - TENANCY_BOUNDARY (linha 912)
  - TENANCY_BOUNDARY (linha 913)
  - TENANCY_BOUNDARY (linha 914)
  - TENANCY_BOUNDARY (linha 920)
  - TENANCY_BOUNDARY (linha 942)
  - TENANCY_BOUNDARY (linha 950)
  - TENANCY_BOUNDARY (linha 957)
  - TENANCY_BOUNDARY (linha 958)
  - TENANCY_BOUNDARY (linha 959)
  - TENANCY_BOUNDARY (linha 960)
  - TENANCY_BOUNDARY (linha 961)
  - TENANCY_BOUNDARY (linha 962)
  - TENANCY_BOUNDARY (linha 963)
  - TENANCY_BOUNDARY (linha 964)
  - TENANCY_BOUNDARY (linha 965)
  - TENANCY_BOUNDARY (linha 966)
  - TENANCY_BOUNDARY (linha 967)
  - TENANCY_BOUNDARY (linha 973)
  - TENANCY_BOUNDARY (linha 988)
  - TENANCY_BOUNDARY (linha 994)
  - TENANCY_BOUNDARY (linha 998)
  - TENANCY_BOUNDARY (linha 999)
  - TENANCY_BOUNDARY (linha 1000)
  - TENANCY_BOUNDARY (linha 1001)
  - TENANCY_BOUNDARY (linha 1002)
  - TENANCY_BOUNDARY (linha 1003)
  - TENANCY_BOUNDARY (linha 1009)
  - TENANCY_BOUNDARY (linha 1025)
  - TENANCY_BOUNDARY (linha 1029)
  - TENANCY_BOUNDARY (linha 1035)
  - TENANCY_BOUNDARY (linha 1036)
  - TENANCY_BOUNDARY (linha 1037)
  - TENANCY_BOUNDARY (linha 1038)
  - TENANCY_BOUNDARY (linha 1039)
  - TENANCY_BOUNDARY (linha 1040)
  - TENANCY_BOUNDARY (linha 1041)
  - TENANCY_BOUNDARY (linha 1042)
  - TENANCY_BOUNDARY (linha 1043)
  - TENANCY_BOUNDARY (linha 1049)
  - TENANCY_BOUNDARY (linha 1061)
  - TENANCY_BOUNDARY (linha 1063)
  - TENANCY_BOUNDARY (linha 1068)
  - TENANCY_BOUNDARY (linha 1079)
  - TENANCY_BOUNDARY (linha 1081)
  - TENANCY_BOUNDARY (linha 1086)
  - TENANCY_BOUNDARY (linha 1096)
  - TENANCY_BOUNDARY (linha 1099)
  - TENANCY_BOUNDARY (linha 1102)
  - TENANCY_BOUNDARY (linha 1103)
  - TENANCY_BOUNDARY (linha 1104)
  - TENANCY_BOUNDARY (linha 1105)
  - TENANCY_BOUNDARY (linha 1106)
  - TENANCY_BOUNDARY (linha 1111)
  - TENANCY_BOUNDARY (linha 1125)
  - TENANCY_BOUNDARY (linha 1130)
  - TENANCY_BOUNDARY (linha 1137)
  - TENANCY_BOUNDARY (linha 1138)
  - TENANCY_BOUNDARY (linha 1139)
  - TENANCY_BOUNDARY (linha 1140)
  - TENANCY_BOUNDARY (linha 1141)
  - TENANCY_BOUNDARY (linha 1142)
  - TENANCY_BOUNDARY (linha 1143)
  - TENANCY_BOUNDARY (linha 1144)
  - TENANCY_BOUNDARY (linha 1145)
  - TENANCY_BOUNDARY (linha 1146)
  - TENANCY_BOUNDARY (linha 1151)
  - MOCK_OR_SIMULATION (linha 1156)
  - TENANCY_BOUNDARY (linha 1164)
  - TENANCY_BOUNDARY (linha 1166)
  - TENANCY_BOUNDARY (linha 1169)
  - TENANCY_BOUNDARY (linha 1170)
  - TENANCY_BOUNDARY (linha 1171)
  - TENANCY_BOUNDARY (linha 1172)
  - TENANCY_BOUNDARY (linha 1173)
  - TENANCY_BOUNDARY (linha 1179)
  - TENANCY_BOUNDARY (linha 1194)
  - TENANCY_BOUNDARY (linha 1196)
  - TENANCY_BOUNDARY (linha 1200)
  - TENANCY_BOUNDARY (linha 1201)
  - TENANCY_BOUNDARY (linha 1202)
  - TENANCY_BOUNDARY (linha 1203)
  - TENANCY_BOUNDARY (linha 1204)
  - TENANCY_BOUNDARY (linha 1210)
  - TENANCY_BOUNDARY (linha 1231)
  - TENANCY_BOUNDARY (linha 1233)
  - TENANCY_BOUNDARY (linha 1237)
  - TENANCY_BOUNDARY (linha 1238)
  - TENANCY_BOUNDARY (linha 1239)
  - TENANCY_BOUNDARY (linha 1240)
  - TENANCY_BOUNDARY (linha 1241)
  - TENANCY_BOUNDARY (linha 1242)
  - TENANCY_BOUNDARY (linha 1243)
  - TENANCY_BOUNDARY (linha 1249)
  - MOCK_OR_SIMULATION (linha 1258)
  - TENANCY_BOUNDARY (linha 1274)
  - TENANCY_BOUNDARY (linha 1278)
  - TENANCY_BOUNDARY (linha 1285)
  - TENANCY_BOUNDARY (linha 1286)
  - TENANCY_BOUNDARY (linha 1287)
  - TENANCY_BOUNDARY (linha 1288)
  - TENANCY_BOUNDARY (linha 1295)
  - AUTHORIZATION_BOUNDARY (linha 1300)
  - TENANCY_BOUNDARY (linha 1317)
  - TENANCY_BOUNDARY (linha 1321)
  - MOCK_OR_SIMULATION (linha 1470)
  - TENANCY_BOUNDARY (linha 1569)
  - STORAGE_LGPD (linha 1575)
  - STORAGE_LGPD (linha 1576)
  - STORAGE_LGPD (linha 1582)
  - STORAGE_LGPD (linha 1583)
  - STORAGE_LGPD (linha 1610)
  - STORAGE_LGPD (linha 1611)
  - STORAGE_LGPD (linha 1612)
  - STORAGE_LGPD (linha 1613)
  - STORAGE_LGPD (linha 1614)
  - STORAGE_LGPD (linha 1615)
  - STORAGE_LGPD (linha 1616)
  - STORAGE_LGPD (linha 1617)
  - STORAGE_LGPD (linha 1620)
  - TENANCY_BOUNDARY (linha 1687)
  - TENANCY_BOUNDARY (linha 1700)
  - TENANCY_BOUNDARY (linha 1704)
  - TENANCY_BOUNDARY (linha 1705)
  - TENANCY_BOUNDARY (linha 1706)
  - TENANCY_BOUNDARY (linha 1707)
  - TENANCY_BOUNDARY (linha 1708)
  - TENANCY_BOUNDARY (linha 1714)
  - TENANCY_BOUNDARY (linha 1731)
  - TENANCY_BOUNDARY (linha 1744)
  - TENANCY_BOUNDARY (linha 1749)
  - TENANCY_BOUNDARY (linha 1750)
  - TENANCY_BOUNDARY (linha 1751)
  - TENANCY_BOUNDARY (linha 1752)
  - TENANCY_BOUNDARY (linha 1753)
  - TENANCY_BOUNDARY (linha 1754)
  - TENANCY_BOUNDARY (linha 1760)
  - TENANCY_BOUNDARY (linha 1782)
  - TENANCY_BOUNDARY (linha 1800)
  - TENANCY_BOUNDARY (linha 1801)
  - TENANCY_BOUNDARY (linha 1806)
  - TENANCY_BOUNDARY (linha 1807)
  - TENANCY_BOUNDARY (linha 1808)
  - TENANCY_BOUNDARY (linha 1809)
  - TENANCY_BOUNDARY (linha 1810)
  - TENANCY_BOUNDARY (linha 1811)
  - TENANCY_BOUNDARY (linha 1812)
  - TENANCY_BOUNDARY (linha 1818)
  - TENANCY_BOUNDARY (linha 1831)
  - TENANCY_BOUNDARY (linha 1834)
  - TENANCY_BOUNDARY (linha 1837)
  - TENANCY_BOUNDARY (linha 1838)
  - TENANCY_BOUNDARY (linha 1839)
  - TENANCY_BOUNDARY (linha 1840)
  - TENANCY_BOUNDARY (linha 1841)
  - TENANCY_BOUNDARY (linha 1842)
  - TENANCY_BOUNDARY (linha 1848)
  - TENANCY_BOUNDARY (linha 1864)
  - TENANCY_BOUNDARY (linha 1873)
  - TENANCY_BOUNDARY (linha 1880)
  - TENANCY_BOUNDARY (linha 1881)
  - TENANCY_BOUNDARY (linha 1882)
  - TENANCY_BOUNDARY (linha 1883)
  - TENANCY_BOUNDARY (linha 1884)
  - TENANCY_BOUNDARY (linha 1885)
  - TENANCY_BOUNDARY (linha 1886)
  - TENANCY_BOUNDARY (linha 1887)
  - TENANCY_BOUNDARY (linha 1888)
  - TENANCY_BOUNDARY (linha 1889)
  - TENANCY_BOUNDARY (linha 1890)
  - TENANCY_BOUNDARY (linha 1896)
  - TENANCY_BOUNDARY (linha 1913)
  - TENANCY_BOUNDARY (linha 1917)
  - TENANCY_BOUNDARY (linha 1918)
  - TENANCY_BOUNDARY (linha 1919)
  - TENANCY_BOUNDARY (linha 1920)
  - TENANCY_BOUNDARY (linha 1921)
  - TENANCY_BOUNDARY (linha 1922)
  - TENANCY_BOUNDARY (linha 1928)
  - TENANCY_BOUNDARY (linha 1950)
  - STORAGE_LGPD (linha 1957)
  - STORAGE_LGPD (linha 1958)
  - STORAGE_LGPD (linha 1959)
  - TENANCY_BOUNDARY (linha 1963)
  - TENANCY_BOUNDARY (linha 1971)
  - TENANCY_BOUNDARY (linha 1972)
  - TENANCY_BOUNDARY (linha 1973)
  - TENANCY_BOUNDARY (linha 1974)
  - TENANCY_BOUNDARY (linha 1975)
  - TENANCY_BOUNDARY (linha 1976)
  - TENANCY_BOUNDARY (linha 1977)
  - TENANCY_BOUNDARY (linha 1978)
  - TENANCY_BOUNDARY (linha 1979)
  - TENANCY_BOUNDARY (linha 1980)
  - TENANCY_BOUNDARY (linha 1981)
  - TENANCY_BOUNDARY (linha 1982)
  - TENANCY_BOUNDARY (linha 1983)
  - STORAGE_LGPD (linha 1983)
  - TENANCY_BOUNDARY (linha 1984)
  - TENANCY_BOUNDARY (linha 1991)
  - TENANCY_BOUNDARY (linha 1999)
  - TENANCY_BOUNDARY (linha 2001)
  - TENANCY_BOUNDARY (linha 2002)
  - TENANCY_BOUNDARY (linha 2004)
  - TENANCY_BOUNDARY (linha 2005)
  - TENANCY_BOUNDARY (linha 2006)
  - TENANCY_BOUNDARY (linha 2013)
  - TENANCY_BOUNDARY (linha 2024)
  - TENANCY_BOUNDARY (linha 2026)
  - TENANCY_BOUNDARY (linha 2030)
  - TENANCY_BOUNDARY (linha 2031)
  - TENANCY_BOUNDARY (linha 2032)
  - TENANCY_BOUNDARY (linha 2033)
  - TENANCY_BOUNDARY (linha 2039)
  - TENANCY_BOUNDARY (linha 2059)
  - TENANCY_BOUNDARY (linha 2061)
  - TENANCY_BOUNDARY (linha 2062)
  - TENANCY_BOUNDARY (linha 2063)
  - TENANCY_BOUNDARY (linha 2064)
  - TENANCY_BOUNDARY (linha 2065)
  - TENANCY_BOUNDARY (linha 2066)
  - TENANCY_BOUNDARY (linha 2067)
  - TENANCY_BOUNDARY (linha 2068)
  - TENANCY_BOUNDARY (linha 2069)
  - TENANCY_BOUNDARY (linha 2075)
  - TENANCY_BOUNDARY (linha 2090)
  - TENANCY_BOUNDARY (linha 2093)
  - TENANCY_BOUNDARY (linha 2094)
  - TENANCY_BOUNDARY (linha 2095)
  - TENANCY_BOUNDARY (linha 2096)
  - TENANCY_BOUNDARY (linha 2097)
  - TENANCY_BOUNDARY (linha 2098)
  - TENANCY_BOUNDARY (linha 2104)
  - TENANCY_BOUNDARY (linha 2120)
  - TENANCY_BOUNDARY (linha 2124)
  - TENANCY_BOUNDARY (linha 2129)
  - TENANCY_BOUNDARY (linha 2130)
  - TENANCY_BOUNDARY (linha 2131)
  - TENANCY_BOUNDARY (linha 2132)
  - TENANCY_BOUNDARY (linha 2133)
  - TENANCY_BOUNDARY (linha 2134)
  - TENANCY_BOUNDARY (linha 2135)
  - TENANCY_BOUNDARY (linha 2136)
  - TENANCY_BOUNDARY (linha 2137)
  - TENANCY_BOUNDARY (linha 2143)
  - TENANCY_BOUNDARY (linha 2156)
  - TENANCY_BOUNDARY (linha 2158)
  - TENANCY_BOUNDARY (linha 2161)
  - TENANCY_BOUNDARY (linha 2162)
  - TENANCY_BOUNDARY (linha 2163)
  - TENANCY_BOUNDARY (linha 2164)
  - TENANCY_BOUNDARY (linha 2170)
  - TENANCY_BOUNDARY (linha 2181)
  - TENANCY_BOUNDARY (linha 2183)
  - TENANCY_BOUNDARY (linha 2184)
  - TENANCY_BOUNDARY (linha 2186)
  - TENANCY_BOUNDARY (linha 2187)
  - TENANCY_BOUNDARY (linha 2188)
  - TENANCY_BOUNDARY (linha 2194)
  - TENANCY_BOUNDARY (linha 2225)
  - TENANCY_BOUNDARY (linha 2227)
  - TENANCY_BOUNDARY (linha 2228)
  - TENANCY_BOUNDARY (linha 2234)
  - TENANCY_BOUNDARY (linha 2244)
  - TENANCY_BOUNDARY (linha 2248)
  - TENANCY_BOUNDARY (linha 2250)
  - TENANCY_BOUNDARY (linha 2251)
  - TENANCY_BOUNDARY (linha 2252)
  - TENANCY_BOUNDARY (linha 2253)
  - TENANCY_BOUNDARY (linha 2259)
  - TENANCY_BOUNDARY (linha 2281)
  - TENANCY_BOUNDARY (linha 2289)
  - TENANCY_BOUNDARY (linha 2296)
  - TENANCY_BOUNDARY (linha 2297)
  - TENANCY_BOUNDARY (linha 2298)
  - TENANCY_BOUNDARY (linha 2299)
  - TENANCY_BOUNDARY (linha 2300)
  - TENANCY_BOUNDARY (linha 2301)
  - TENANCY_BOUNDARY (linha 2302)
  - TENANCY_BOUNDARY (linha 2303)
  - TENANCY_BOUNDARY (linha 2304)
  - TENANCY_BOUNDARY (linha 2305)
  - TENANCY_BOUNDARY (linha 2306)
  - TENANCY_BOUNDARY (linha 2312)
  - TENANCY_BOUNDARY (linha 2327)
  - TENANCY_BOUNDARY (linha 2333)
  - TENANCY_BOUNDARY (linha 2337)
  - TENANCY_BOUNDARY (linha 2338)
  - TENANCY_BOUNDARY (linha 2339)
  - TENANCY_BOUNDARY (linha 2340)
  - TENANCY_BOUNDARY (linha 2341)
  - TENANCY_BOUNDARY (linha 2342)
  - TENANCY_BOUNDARY (linha 2348)
  - TENANCY_BOUNDARY (linha 2364)
  - TENANCY_BOUNDARY (linha 2368)
  - TENANCY_BOUNDARY (linha 2374)
  - TENANCY_BOUNDARY (linha 2375)
  - TENANCY_BOUNDARY (linha 2376)
  - TENANCY_BOUNDARY (linha 2377)
  - TENANCY_BOUNDARY (linha 2378)
  - TENANCY_BOUNDARY (linha 2379)
  - TENANCY_BOUNDARY (linha 2380)
  - TENANCY_BOUNDARY (linha 2381)
  - TENANCY_BOUNDARY (linha 2382)
  - TENANCY_BOUNDARY (linha 2388)
  - TENANCY_BOUNDARY (linha 2400)
  - TENANCY_BOUNDARY (linha 2402)
  - TENANCY_BOUNDARY (linha 2407)
  - TENANCY_BOUNDARY (linha 2418)
  - TENANCY_BOUNDARY (linha 2420)
  - TENANCY_BOUNDARY (linha 2425)
  - TENANCY_BOUNDARY (linha 2435)
  - TENANCY_BOUNDARY (linha 2438)
  - TENANCY_BOUNDARY (linha 2441)
  - TENANCY_BOUNDARY (linha 2442)
  - TENANCY_BOUNDARY (linha 2443)
  - TENANCY_BOUNDARY (linha 2444)
  - TENANCY_BOUNDARY (linha 2445)
  - TENANCY_BOUNDARY (linha 2450)
  - META_AUTH_OR_WEBHOOK (linha 2460)
  - TENANCY_BOUNDARY (linha 2467)
  - TENANCY_BOUNDARY (linha 2472)
  - TENANCY_BOUNDARY (linha 2479)
  - TENANCY_BOUNDARY (linha 2480)
  - TENANCY_BOUNDARY (linha 2481)
  - TENANCY_BOUNDARY (linha 2482)
  - TENANCY_BOUNDARY (linha 2483)
  - TENANCY_BOUNDARY (linha 2484)
  - TENANCY_BOUNDARY (linha 2485)
  - TENANCY_BOUNDARY (linha 2486)
  - TENANCY_BOUNDARY (linha 2487)
  - TENANCY_BOUNDARY (linha 2488)
  - META_AUTH_OR_WEBHOOK (linha 2492)
  - TENANCY_BOUNDARY (linha 2508)
  - MOCK_OR_SIMULATION (linha 2513)
  - TENANCY_BOUNDARY (linha 2521)
  - TENANCY_BOUNDARY (linha 2523)
  - TENANCY_BOUNDARY (linha 2526)
  - TENANCY_BOUNDARY (linha 2527)
  - TENANCY_BOUNDARY (linha 2528)
  - TENANCY_BOUNDARY (linha 2529)
  - TENANCY_BOUNDARY (linha 2530)
  - TENANCY_BOUNDARY (linha 2536)
  - TENANCY_BOUNDARY (linha 2551)
  - TENANCY_BOUNDARY (linha 2553)
  - TENANCY_BOUNDARY (linha 2557)
  - TENANCY_BOUNDARY (linha 2558)
  - TENANCY_BOUNDARY (linha 2559)
  - TENANCY_BOUNDARY (linha 2560)
  - TENANCY_BOUNDARY (linha 2561)
  - TENANCY_BOUNDARY (linha 2567)
  - TENANCY_BOUNDARY (linha 2588)
  - TENANCY_BOUNDARY (linha 2590)
  - TENANCY_BOUNDARY (linha 2594)
  - TENANCY_BOUNDARY (linha 2595)
  - TENANCY_BOUNDARY (linha 2596)
  - TENANCY_BOUNDARY (linha 2597)
  - TENANCY_BOUNDARY (linha 2598)
  - TENANCY_BOUNDARY (linha 2599)
  - TENANCY_BOUNDARY (linha 2600)
  - TENANCY_BOUNDARY (linha 2606)
  - MOCK_OR_SIMULATION (linha 2615)
  - TENANCY_BOUNDARY (linha 2631)
  - TENANCY_BOUNDARY (linha 2635)
  - TENANCY_BOUNDARY (linha 2642)
  - TENANCY_BOUNDARY (linha 2643)
  - TENANCY_BOUNDARY (linha 2644)
  - TENANCY_BOUNDARY (linha 2645)
  - TENANCY_BOUNDARY (linha 2652)
  - AUTHORIZATION_BOUNDARY (linha 2657)
  - TENANCY_BOUNDARY (linha 2674)
  - TENANCY_BOUNDARY (linha 2678)
- Preview redigido das linhas adicionadas ou iniciais:
    metaMessageId        String?
    metaStatus           String?
    metaStatusUpdatedAt  DateTime?

  model MetaWhatsappWebhookEvent {
    id          String    @id @default(uuid())
    eventKey    String    @unique
    messageId   String?

### beauty-core-backend/src/app.module.ts

- Tipo: `HIGH`
- Categoria: `CORE_INFRA`
- Status Git: ` M`
- Tamanho: 5516 bytes
- SHA-256: `135872BCAE3815925D347CBC98A52B90B5B7B3431C565069967D1E8A8E917ECE`
- Numstat: `0	4	beauty-core-backend/src/app.module.ts`
- Decisao candidata: **REVIEW_RUNTIME_OR_SCHEMA_IMPACT**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - STORAGE_LGPD (linha 1)
  - QUEUE_WORKER (linha 45)
  - TENANCY_BOUNDARY (linha 46)
  - QUEUE_WORKER (linha 49)
  - STORAGE_LGPD (linha 57)
  - STORAGE_LGPD (linha 61)
  - TENANCY_BOUNDARY (linha 116)
  - QUEUE_WORKER (linha 117)
  - QUEUE_WORKER (linha 120)
  - STORAGE_LGPD (linha 121)
  - STORAGE_LGPD (linha 145)
  - QUEUE_WORKER (linha 189)
  - TENANCY_BOUNDARY (linha 190)
  - QUEUE_WORKER (linha 193)
  - STORAGE_LGPD (linha 201)
  - STORAGE_LGPD (linha 205)
  - TENANCY_BOUNDARY (linha 260)
  - QUEUE_WORKER (linha 261)
  - QUEUE_WORKER (linha 264)
  - STORAGE_LGPD (linha 265)
- Preview: nenhuma linha adicionada capturada ou arquivo nao textual.

### beauty-core-backend/src/common/filters/http-exception.filter.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 3091 bytes
- SHA-256: `CA492592C252224AD6B0B2B15B613F9C5575B74A7DCD184682996F55D0A502B6`
- Numstat: `1	3	beauty-core-backend/src/common/filters/http-exception.filter.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais: nenhum dos padroes de triagem foi localizado.
- Preview redigido das linhas adicionadas ou iniciais:
        request.correlationId ?? responseCorrelationId ?? requestId;

### beauty-core-backend/src/common/interceptors/audit-log.interceptor.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 6725 bytes
- SHA-256: `6AA7E8455D3B0454A43FEA4F1913C6A14322E052DDF89221FDD7D358C1DFE3BF`
- Numstat: `7	22	beauty-core-backend/src/common/interceptors/audit-log.interceptor.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - MOCK_OR_SIMULATION (linha 49)
  - TENANCY_BOUNDARY (linha 53)
  - TENANCY_BOUNDARY (linha 76)
  - MOCK_OR_SIMULATION (linha 80)
  - TENANCY_BOUNDARY (linha 93)
  - MOCK_OR_SIMULATION (linha 93)
  - TENANCY_BOUNDARY (linha 94)
  - MOCK_OR_SIMULATION (linha 100)
  - TENANCY_BOUNDARY (linha 102)
  - MOCK_OR_SIMULATION (linha 106)
  - MOCK_OR_SIMULATION (linha 109)
  - TENANCY_BOUNDARY (linha 129)
  - MOCK_OR_SIMULATION (linha 129)
  - TENANCY_BOUNDARY (linha 130)
  - MOCK_OR_SIMULATION (linha 138)
  - TENANCY_BOUNDARY (linha 140)
  - MOCK_OR_SIMULATION (linha 144)
  - MOCK_OR_SIMULATION (linha 147)
  - MOCK_OR_SIMULATION (linha 170)
  - QUEUE_WORKER (linha 178)
  - MOCK_OR_SIMULATION (linha 180)
  - MOCK_OR_SIMULATION (linha 212)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 214)
  - STORAGE_LGPD (linha 251)
  - STORAGE_LGPD (linha 252)
  - MOCK_OR_SIMULATION (linha 255)
  - MOCK_OR_SIMULATION (linha 259)
  - MOCK_OR_SIMULATION (linha 263)
  - MOCK_OR_SIMULATION (linha 315)
  - TENANCY_BOUNDARY (linha 319)
  - TENANCY_BOUNDARY (linha 338)
  - MOCK_OR_SIMULATION (linha 342)
  - TENANCY_BOUNDARY (linha 355)
  - MOCK_OR_SIMULATION (linha 355)
  - TENANCY_BOUNDARY (linha 356)
  - MOCK_OR_SIMULATION (linha 362)
  - TENANCY_BOUNDARY (linha 364)
  - MOCK_OR_SIMULATION (linha 368)
  - MOCK_OR_SIMULATION (linha 371)
  - TENANCY_BOUNDARY (linha 391)
  - MOCK_OR_SIMULATION (linha 391)
  - TENANCY_BOUNDARY (linha 392)
  - MOCK_OR_SIMULATION (linha 400)
  - TENANCY_BOUNDARY (linha 402)
  - MOCK_OR_SIMULATION (linha 406)
  - MOCK_OR_SIMULATION (linha 409)
  - MOCK_OR_SIMULATION (linha 428)
  - QUEUE_WORKER (linha 435)
  - MOCK_OR_SIMULATION (linha 437)
  - MOCK_OR_SIMULATION (linha 468)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 468)
  - STORAGE_LGPD (linha 505)
  - STORAGE_LGPD (linha 506)
  - MOCK_OR_SIMULATION (linha 509)
  - MOCK_OR_SIMULATION (linha 513)
  - MOCK_OR_SIMULATION (linha 517)
- Preview redigido das linhas adicionadas ou iniciais:
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        ? (user?.clienteId ?? user?.sub ?? user?.id)
      const requestId = contextData?.requestId ?? request.requestId;
        contextData?.correlationId ?? request.correlationId ?? requestId;
              mensagem: error?.message ?? 'Falha durante requisi├º├úo HTTP.',
    private deveAuditar(rota: string, metodoHttp: string): boolean {
    private mapearAcao(metodoHttp: string, rota: string): any {

### beauty-core-backend/src/common/metrics/guards/metrics-auth.guard.ts

- Tipo: `HIGH`
- Categoria: `CORE_INFRA`
- Status Git: ` M`
- Tamanho: 1739 bytes
- SHA-256: `F0F73695E17C407FDB98C0C621B3716BE0052FAAA0B9392FA26C956AF05ED3A0`
- Numstat: `4	1	beauty-core-backend/src/common/metrics/guards/metrics-auth.guard.ts`
- Decisao candidata: **REVIEW_RUNTIME_OR_SCHEMA_IMPACT**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 28)
  - AUTHORIZATION_BOUNDARY (linha 31)
  - AUTHORIZATION_BOUNDARY (linha 32)
  - AUTHORIZATION_BOUNDARY (linha 87)
  - AUTHORIZATION_BOUNDARY (linha 90)
  - AUTHORIZATION_BOUNDARY (linha 91)
- Preview redigido das linhas adicionadas ou iniciais:
    private safeTokenEquals(
      receivedToken: string,
      expectedToken: string,
    ): boolean {

### beauty-core-backend/src/common/metrics/metrics.controller.ts

- Tipo: `HIGH`
- Categoria: `CORE_INFRA`
- Status Git: ` M`
- Tamanho: 5698 bytes
- SHA-256: `D943F67135FDDCD7345A62E2F2827347B803008FAA6687D32F0CE54F32DE5877`
- Numstat: `4	2	beauty-core-backend/src/common/metrics/metrics.controller.ts`
- Decisao candidata: **REVIEW_RUNTIME_OR_SCHEMA_IMPACT**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - QUEUE_WORKER (linha 41)
  - QUEUE_WORKER (linha 42)
  - QUEUE_WORKER (linha 44)
  - QUEUE_WORKER (linha 45)
  - QUEUE_WORKER (linha 83)
  - QUEUE_WORKER (linha 85)
  - QUEUE_WORKER (linha 87)
  - QUEUE_WORKER (linha 89)
  - QUEUE_WORKER (linha 91)
  - QUEUE_WORKER (linha 93)
  - QUEUE_WORKER (linha 100)
  - QUEUE_WORKER (linha 101)
  - QUEUE_WORKER (linha 170)
  - QUEUE_WORKER (linha 173)
  - QUEUE_WORKER (linha 175)
  - QUEUE_WORKER (linha 179)
  - QUEUE_WORKER (linha 239)
  - QUEUE_WORKER (linha 240)
  - QUEUE_WORKER (linha 242)
  - QUEUE_WORKER (linha 243)
  - QUEUE_WORKER (linha 281)
  - QUEUE_WORKER (linha 283)
  - QUEUE_WORKER (linha 285)
  - QUEUE_WORKER (linha 287)
  - QUEUE_WORKER (linha 289)
  - QUEUE_WORKER (linha 291)
  - QUEUE_WORKER (linha 298)
  - QUEUE_WORKER (linha 299)
  - QUEUE_WORKER (linha 368)
  - QUEUE_WORKER (linha 371)
  - QUEUE_WORKER (linha 373)
  - QUEUE_WORKER (linha 377)
- Preview redigido das linhas adicionadas ou iniciais:
      return value
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n');

### beauty-core-backend/src/common/metrics/metrics.module.ts

- Tipo: `HIGH`
- Categoria: `CORE_INFRA`
- Status Git: ` M`
- Tamanho: 531 bytes
- SHA-256: `337BF684DD7190489FCAC67E5840EA9D18ED9F00060EE2FA3E7162148905FC27`
- Numstat: `0	1	beauty-core-backend/src/common/metrics/metrics.module.ts`
- Decisao candidata: **REVIEW_RUNTIME_OR_SCHEMA_IMPACT**
- Sinais: nenhum dos padroes de triagem foi localizado.
- Preview: nenhuma linha adicionada capturada ou arquivo nao textual.

### beauty-core-backend/src/common/metrics/metrics.service.ts

- Tipo: `HIGH`
- Categoria: `CORE_INFRA`
- Status Git: ` M`
- Tamanho: 7327 bytes
- SHA-256: `C5955D9BB1E8B2910903BBE74CDF2A24ABC0FAAEE432E519AB2A72C34A4FFE54`
- Numstat: `23	30	beauty-core-backend/src/common/metrics/metrics.service.ts`
- Decisao candidata: **REVIEW_RUNTIME_OR_SCHEMA_IMPACT**
- Sinais: nenhum dos padroes de triagem foi localizado.
- Preview redigido das linhas adicionadas ou iniciais:
      0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10,
      lines.push(
        '# HELP beauty_core_app_info Beauty Core application information.',
      );
      lines.push(
        '# HELP beauty_core_http_requests_total Total HTTP requests received by the API.',
      );
      lines.push(

### beauty-core-backend/src/config/env.validation.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 2901 bytes
- SHA-256: `5DAC6650C81EC8A7F2748A9F485F34D447E0C08D36A5EA1D084CF56F5AC10786`
- Numstat: `1	1	beauty-core-backend/src/config/env.validation.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 8)
  - AUTHORIZATION_BOUNDARY (linha 68)
  - PUBLIC_ORIGIN_RISK (linha 105)
  - AUTHORIZATION_BOUNDARY (linha 121)
  - AUTHORIZATION_BOUNDARY (linha 181)
  - PUBLIC_ORIGIN_RISK (linha 218)
- Preview redigido das linhas adicionadas ou iniciais:
  }

### beauty-core-backend/src/config/swagger.config.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 841 bytes
- SHA-256: `1566D89D65F9774125715F805B77A24833A7C09FB29BCC45662C6083B2703B58`
- Numstat: `1	1	beauty-core-backend/src/config/swagger.config.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - PUBLIC_ORIGIN_RISK (linha 12)
  - AUTHORIZATION_BOUNDARY (linha 18)
  - PUBLIC_ORIGIN_RISK (linha 37)
  - AUTHORIZATION_BOUNDARY (linha 43)
- Preview redigido das linhas adicionadas ou iniciais:
  }

### beauty-core-backend/src/database/prisma/prisma.module.ts

- Tipo: `HIGH`
- Categoria: `CORE_INFRA`
- Status Git: ` M`
- Tamanho: 200 bytes
- SHA-256: `0F3C00B776B61BE00A1FA7BE51EF977F597CDBFC8322CCE3397CFDD35A1FA4A2`
- Numstat: `1	1	beauty-core-backend/src/database/prisma/prisma.module.ts`
- Decisao candidata: **REVIEW_RUNTIME_OR_SCHEMA_IMPACT**
- Sinais: nenhum dos padroes de triagem foi localizado.
- Preview redigido das linhas adicionadas ou iniciais:
  export class PrismaModule {}

### beauty-core-backend/src/database/prisma/prisma.service.ts

- Tipo: `HIGH`
- Categoria: `CORE_INFRA`
- Status Git: ` M`
- Tamanho: 370 bytes
- SHA-256: `7959EFB964BAAE1417E628C1ABDC2FE52000564057206D716D1D5515003BB16E`
- Numstat: `1	1	beauty-core-backend/src/database/prisma/prisma.service.ts`
- Decisao candidata: **REVIEW_RUNTIME_OR_SCHEMA_IMPACT**
- Sinais: nenhum dos padroes de triagem foi localizado.
- Preview redigido das linhas adicionadas ou iniciais:
  }

### beauty-core-backend/src/main.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 5199 bytes
- SHA-256: `0385652D70F2B31AA67456A5AC5815FEF7079B5F9390D60D2753AA94EE25350B`
- Numstat: `warning: in the working copy of 'beauty-core-backend/src/main.ts', LF will be replaced by CRLF the next time Git touches it; 7	10	beauty-core-backend/src/main.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 135)
  - AUTHORIZATION_BOUNDARY (linha 158)
  - STORAGE_LGPD (linha 169)
  - STORAGE_LGPD (linha 170)
  - PUBLIC_ORIGIN_RISK (linha 185)
  - STORAGE_LGPD (linha 190)
  - AUTHORIZATION_BOUNDARY (linha 330)
  - AUTHORIZATION_BOUNDARY (linha 353)
  - STORAGE_LGPD (linha 364)
  - STORAGE_LGPD (linha 365)
  - PUBLIC_ORIGIN_RISK (linha 380)
  - STORAGE_LGPD (linha 385)
- Preview redigido das linhas adicionadas ou iniciais:
      throw new Error('CORS_ORIGIN n├úo pode conter * em produ├º├úo.');
  function createRequestContextMiddleware(requestContext: RequestContextService) {
      const correlationId = getHeaderValue(req, 'x-correlation-id') ?? requestId;
    const app = await NestFactory.create(AppModule, {
      bufferLogs: true,
      rawBody: true,
    });

### beauty-core-backend/src/modules/area-cliente/dto/enviar-portal-mensagem-whatsapp.dto.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Tamanho: 323 bytes
- SHA-256: `F34896380001DD5FE877FC6E38453D9899723FF66114BDDE6D755D045DE6B935`
- Numstat: `2	2	beauty-core-backend/src/modules/area-cliente/dto/enviar-portal-mensagem-whatsapp.dto.ts`
- Decisao candidata: **POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK**
- Sinais: nenhum dos padroes de triagem foi localizado.
- Preview redigido das linhas adicionadas ou iniciais:
  import { TipoMensagemWhatsApp } from '@prisma/client';
  import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';

### beauty-core-backend/src/modules/auditoria/auditoria.controller.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 17803 bytes
- SHA-256: `BD932D2FB94DD684FD03EAE1551FF85B902E9CECB7A819B7DA068F5F73E61190`
- Numstat: `26	42	beauty-core-backend/src/modules/auditoria/auditoria.controller.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 25)
  - AUTHORIZATION_BOUNDARY (linha 26)
  - AUTHORIZATION_BOUNDARY (linha 35)
  - TENANCY_BOUNDARY (linha 109)
  - MOCK_OR_SIMULATION (linha 116)
  - PUBLIC_ORIGIN_RISK (linha 119)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 149)
  - TENANCY_BOUNDARY (linha 153)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 233)
  - TENANCY_BOUNDARY (linha 239)
  - PUBLIC_ORIGIN_RISK (linha 294)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 317)
  - TENANCY_BOUNDARY (linha 322)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 398)
  - TENANCY_BOUNDARY (linha 403)
  - QUEUE_WORKER (linha 413)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 474)
  - TENANCY_BOUNDARY (linha 479)
  - PUBLIC_ORIGIN_RISK (linha 531)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 551)
  - TENANCY_BOUNDARY (linha 556)
  - TENANCY_BOUNDARY (linha 566)
  - TENANCY_BOUNDARY (linha 579)
  - MOCK_OR_SIMULATION (linha 586)
  - PUBLIC_ORIGIN_RISK (linha 589)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 615)
  - TENANCY_BOUNDARY (linha 619)
  - AUTHORIZATION_BOUNDARY (linha 641)
  - AUTHORIZATION_BOUNDARY (linha 642)
  - AUTHORIZATION_BOUNDARY (linha 651)
  - TENANCY_BOUNDARY (linha 724)
  - MOCK_OR_SIMULATION (linha 731)
  - PUBLIC_ORIGIN_RISK (linha 734)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 764)
  - TENANCY_BOUNDARY (linha 765)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 844)
  - TENANCY_BOUNDARY (linha 850)
  - PUBLIC_ORIGIN_RISK (linha 905)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 929)
  - TENANCY_BOUNDARY (linha 934)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 1011)
  - TENANCY_BOUNDARY (linha 1016)
  - QUEUE_WORKER (linha 1026)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 1088)
  - TENANCY_BOUNDARY (linha 1093)
  - PUBLIC_ORIGIN_RISK (linha 1145)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 1166)
  - TENANCY_BOUNDARY (linha 1170)
  - TENANCY_BOUNDARY (linha 1177)
  - TENANCY_BOUNDARY (linha 1190)
  - MOCK_OR_SIMULATION (linha 1197)
  - PUBLIC_ORIGIN_RISK (linha 1200)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 1227)
  - TENANCY_BOUNDARY (linha 1228)
- Preview redigido das linhas adicionadas ou iniciais:
  import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
    constructor(private readonly auditoriaService: AuditoriaService) {}
      description:
        'Data inicial opcional para filtrar os registros de auditoria.',
      description:
        'Usu├írio sem permiss├úo. Permitido apenas para ADMIN e GERENTE.',
    findAll(@Req() req: any, @Query() filtros: FiltrosAuditoriaDto) {
      return this.auditoriaService.findAll(req.user.empresaId, filtros);

### beauty-core-backend/src/modules/auditoria/auditoria.module.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 424 bytes
- SHA-256: `91E7B605C77A96CD4C5468A7EA7C08D9C864B56901904DF10403676EA32AD4C4`
- Numstat: `5	13	beauty-core-backend/src/modules/auditoria/auditoria.module.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais: nenhum dos padroes de triagem foi localizado.
- Preview redigido das linhas adicionadas ou iniciais:
    imports: [PrismaModule],
    controllers: [AuditoriaController],
    providers: [AuditoriaService],
    exports: [AuditoriaService],
  export class AuditoriaModule {}

### beauty-core-backend/src/modules/auditoria/auditoria.service.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 21984 bytes
- SHA-256: `0FE399695B959BFB1771DD7032451026416EA7A51238D8A6DA1E88E72E599301`
- Numstat: `27	43	beauty-core-backend/src/modules/auditoria/auditoria.service.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 40)
  - AUTHORIZATION_BOUNDARY (linha 42)
  - AUTHORIZATION_BOUNDARY (linha 44)
  - AUTHORIZATION_BOUNDARY (linha 51)
  - QUEUE_WORKER (linha 67)
  - QUEUE_WORKER (linha 68)
  - QUEUE_WORKER (linha 85)
  - QUEUE_WORKER (linha 86)
  - QUEUE_WORKER (linha 87)
  - QUEUE_WORKER (linha 88)
  - QUEUE_WORKER (linha 89)
  - TENANCY_BOUNDARY (linha 106)
  - MOCK_OR_SIMULATION (linha 113)
  - STORAGE_LGPD (linha 219)
  - STORAGE_LGPD (linha 222)
  - STORAGE_LGPD (linha 226)
  - STORAGE_LGPD (linha 229)
  - QUEUE_WORKER (linha 243)
  - QUEUE_WORKER (linha 254)
  - TENANCY_BOUNDARY (linha 263)
  - TENANCY_BOUNDARY (linha 275)
  - TENANCY_BOUNDARY (linha 302)
  - TENANCY_BOUNDARY (linha 306)
  - TENANCY_BOUNDARY (linha 318)
  - TENANCY_BOUNDARY (linha 323)
  - TENANCY_BOUNDARY (linha 331)
  - TENANCY_BOUNDARY (linha 335)
  - TENANCY_BOUNDARY (linha 342)
  - TENANCY_BOUNDARY (linha 346)
  - TENANCY_BOUNDARY (linha 353)
  - TENANCY_BOUNDARY (linha 357)
  - TENANCY_BOUNDARY (linha 364)
  - TENANCY_BOUNDARY (linha 368)
  - TENANCY_BOUNDARY (linha 375)
  - TENANCY_BOUNDARY (linha 384)
  - QUEUE_WORKER (linha 452)
  - QUEUE_WORKER (linha 615)
  - QUEUE_WORKER (linha 616)
  - QUEUE_WORKER (linha 619)
  - QUEUE_WORKER (linha 620)
  - QUEUE_WORKER (linha 746)
  - QUEUE_WORKER (linha 752)
  - QUEUE_WORKER (linha 759)
  - QUEUE_WORKER (linha 770)
  - QUEUE_WORKER (linha 778)
  - QUEUE_WORKER (linha 779)
  - QUEUE_WORKER (linha 798)
  - QUEUE_WORKER (linha 814)
  - QUEUE_WORKER (linha 821)
  - QUEUE_WORKER (linha 823)
  - QUEUE_WORKER (linha 827)
  - QUEUE_WORKER (linha 828)
  - AUTHORIZATION_BOUNDARY (linha 930)
  - AUTHORIZATION_BOUNDARY (linha 932)
  - AUTHORIZATION_BOUNDARY (linha 934)
  - AUTHORIZATION_BOUNDARY (linha 941)
  - QUEUE_WORKER (linha 957)
  - QUEUE_WORKER (linha 958)
  - QUEUE_WORKER (linha 975)
  - QUEUE_WORKER (linha 976)
  - QUEUE_WORKER (linha 977)
  - QUEUE_WORKER (linha 978)
  - QUEUE_WORKER (linha 979)
  - TENANCY_BOUNDARY (linha 996)
  - MOCK_OR_SIMULATION (linha 1003)
  - STORAGE_LGPD (linha 1108)
  - STORAGE_LGPD (linha 1111)
  - STORAGE_LGPD (linha 1115)
  - STORAGE_LGPD (linha 1118)
  - QUEUE_WORKER (linha 1132)
  - QUEUE_WORKER (linha 1142)
  - TENANCY_BOUNDARY (linha 1150)
  - TENANCY_BOUNDARY (linha 1162)
  - TENANCY_BOUNDARY (linha 1189)
  - TENANCY_BOUNDARY (linha 1193)
  - TENANCY_BOUNDARY (linha 1205)
  - TENANCY_BOUNDARY (linha 1210)
  - TENANCY_BOUNDARY (linha 1218)
  - TENANCY_BOUNDARY (linha 1222)
  - TENANCY_BOUNDARY (linha 1229)
  - TENANCY_BOUNDARY (linha 1233)
  - TENANCY_BOUNDARY (linha 1240)
  - TENANCY_BOUNDARY (linha 1244)
  - TENANCY_BOUNDARY (linha 1251)
  - TENANCY_BOUNDARY (linha 1255)
  - TENANCY_BOUNDARY (linha 1262)
  - TENANCY_BOUNDARY (linha 1271)
  - QUEUE_WORKER (linha 1339)
  - QUEUE_WORKER (linha 1495)
  - QUEUE_WORKER (linha 1496)
  - QUEUE_WORKER (linha 1499)
  - QUEUE_WORKER (linha 1500)
  - QUEUE_WORKER (linha 1624)
  - QUEUE_WORKER (linha 1630)
  - QUEUE_WORKER (linha 1637)
  - QUEUE_WORKER (linha 1648)
  - QUEUE_WORKER (linha 1656)
  - QUEUE_WORKER (linha 1657)
  - QUEUE_WORKER (linha 1676)
  - QUEUE_WORKER (linha 1690)
  - QUEUE_WORKER (linha 1697)
  - QUEUE_WORKER (linha 1699)
  - QUEUE_WORKER (linha 1703)
  - QUEUE_WORKER (linha 1704)
- Preview redigido das linhas adicionadas ou iniciais:
        status: 'SUCESSO',
        status: 'FALHA',
        acao: 'LOGIN_ADMIN',
        status: data.status ?? 'SUCESSO',
        acao: 'LOGIN_CLIENTE',
        tipoUsuario: data.tipoUsuario ?? 'CLIENTE',
        status: data.status ?? 'SUCESSO',
        acao: 'CRIAR',

### beauty-core-backend/src/modules/auditoria/dto/create-auditoria.dto.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 1043 bytes
- SHA-256: `9C1251EF42A8A7F9F7E0C917182FF0E424149618B180A902F6DF1363119CC483`
- Numstat: `1	1	beauty-core-backend/src/modules/auditoria/dto/create-auditoria.dto.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 8)
  - MOCK_OR_SIMULATION (linha 15)
  - STORAGE_LGPD (linha 16)
  - MOCK_OR_SIMULATION (linha 24)
  - TENANCY_BOUNDARY (linha 51)
  - MOCK_OR_SIMULATION (linha 58)
  - STORAGE_LGPD (linha 59)
  - MOCK_OR_SIMULATION (linha 67)
- Preview redigido das linhas adicionadas ou iniciais:
  }

### beauty-core-backend/src/modules/auditoria/dto/filtros-auditoria.dto.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 4089 bytes
- SHA-256: `2A416E823F7BB734FBA6C26FE4DE5308DB5888537B552CBCD4317FC1AFDB3B1B`
- Numstat: `2	7	beauty-core-backend/src/modules/auditoria/dto/filtros-auditoria.dto.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - QUEUE_WORKER (linha 22)
  - PUBLIC_ORIGIN_RISK (linha 114)
  - QUEUE_WORKER (linha 162)
  - PUBLIC_ORIGIN_RISK (linha 254)
- Preview redigido das linhas adicionadas ou iniciais:
  import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
  }

### beauty-core-backend/src/modules/auth-cliente/auth-cliente-publico.controller.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 5835 bytes
- SHA-256: `217307E40C296D532279AB7671CA69A72A5022B6BA0C4AE978AA6E289918EC33`
- Numstat: `3	11	beauty-core-backend/src/modules/auth-cliente/auth-cliente-publico.controller.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 47)
  - TENANCY_BOUNDARY (linha 47)
  - TENANCY_BOUNDARY (linha 49)
  - TENANCY_BOUNDARY (linha 54)
  - AUTHORIZATION_BOUNDARY (linha 65)
  - TENANCY_BOUNDARY (linha 77)
  - TENANCY_BOUNDARY (linha 88)
  - TENANCY_BOUNDARY (linha 92)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 104)
  - MOCK_OR_SIMULATION (linha 118)
  - AUTHORIZATION_BOUNDARY (linha 131)
  - TENANCY_BOUNDARY (linha 131)
  - AUTHORIZATION_BOUNDARY (linha 133)
  - TENANCY_BOUNDARY (linha 133)
  - TENANCY_BOUNDARY (linha 138)
  - AUTHORIZATION_BOUNDARY (linha 141)
  - AUTHORIZATION_BOUNDARY (linha 153)
  - POTENTIAL_SECRET_LITERAL (linha 163)
  - TENANCY_BOUNDARY (linha 166)
  - TENANCY_BOUNDARY (linha 176)
  - TENANCY_BOUNDARY (linha 183)
  - TENANCY_BOUNDARY (linha 190)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 202)
  - MOCK_OR_SIMULATION (linha 216)
  - AUTHORIZATION_BOUNDARY (linha 259)
  - TENANCY_BOUNDARY (linha 259)
  - TENANCY_BOUNDARY (linha 261)
  - TENANCY_BOUNDARY (linha 266)
  - AUTHORIZATION_BOUNDARY (linha 277)
  - TENANCY_BOUNDARY (linha 289)
  - TENANCY_BOUNDARY (linha 300)
  - TENANCY_BOUNDARY (linha 304)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 316)
  - MOCK_OR_SIMULATION (linha 330)
  - AUTHORIZATION_BOUNDARY (linha 343)
  - TENANCY_BOUNDARY (linha 343)
  - AUTHORIZATION_BOUNDARY (linha 345)
  - TENANCY_BOUNDARY (linha 345)
  - TENANCY_BOUNDARY (linha 350)
  - AUTHORIZATION_BOUNDARY (linha 353)
  - AUTHORIZATION_BOUNDARY (linha 365)
  - POTENTIAL_SECRET_LITERAL (linha 375)
  - TENANCY_BOUNDARY (linha 378)
  - TENANCY_BOUNDARY (linha 388)
  - TENANCY_BOUNDARY (linha 395)
  - TENANCY_BOUNDARY (linha 402)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 414)
  - MOCK_OR_SIMULATION (linha 428)
- Preview redigido das linhas adicionadas ou iniciais:
  import { Body, Controller, Param, Post, Req } from '@nestjs/common';
    constructor(private readonly authClienteService: AuthClienteService) {}
  }

### beauty-core-backend/src/modules/auth-cliente/auth-cliente.controller.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 11120 bytes
- SHA-256: `998066D5743AE1DC7B320279753A8189EE670DA1AE8170919716D3EAF8B2CBD6`
- Numstat: `9	34	beauty-core-backend/src/modules/auth-cliente/auth-cliente.controller.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 38)
  - AUTHORIZATION_BOUNDARY (linha 55)
  - AUTHORIZATION_BOUNDARY (linha 57)
  - TENANCY_BOUNDARY (linha 57)
  - AUTHORIZATION_BOUNDARY (linha 69)
  - TENANCY_BOUNDARY (linha 93)
  - TENANCY_BOUNDARY (linha 109)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 121)
  - MOCK_OR_SIMULATION (linha 128)
  - AUTHORIZATION_BOUNDARY (linha 140)
  - AUTHORIZATION_BOUNDARY (linha 142)
  - AUTHORIZATION_BOUNDARY (linha 146)
  - AUTHORIZATION_BOUNDARY (linha 159)
  - POTENTIAL_SECRET_LITERAL (linha 181)
  - TENANCY_BOUNDARY (linha 184)
  - TENANCY_BOUNDARY (linha 194)
  - TENANCY_BOUNDARY (linha 209)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 221)
  - MOCK_OR_SIMULATION (linha 228)
  - AUTHORIZATION_BOUNDARY (linha 243)
  - AUTHORIZATION_BOUNDARY (linha 252)
  - AUTHORIZATION_BOUNDARY (linha 258)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 268)
  - AUTHORIZATION_BOUNDARY (linha 274)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 280)
  - AUTHORIZATION_BOUNDARY (linha 284)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 290)
  - AUTHORIZATION_BOUNDARY (linha 294)
  - TENANCY_BOUNDARY (linha 310)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 323)
  - TENANCY_BOUNDARY (linha 326)
  - AUTHORIZATION_BOUNDARY (linha 330)
  - TENANCY_BOUNDARY (linha 360)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 376)
  - TENANCY_BOUNDARY (linha 381)
  - MOCK_OR_SIMULATION (linha 387)
  - AUTHORIZATION_BOUNDARY (linha 422)
  - AUTHORIZATION_BOUNDARY (linha 437)
  - AUTHORIZATION_BOUNDARY (linha 439)
  - TENANCY_BOUNDARY (linha 439)
  - AUTHORIZATION_BOUNDARY (linha 451)
  - TENANCY_BOUNDARY (linha 474)
  - TENANCY_BOUNDARY (linha 490)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 501)
  - MOCK_OR_SIMULATION (linha 506)
  - AUTHORIZATION_BOUNDARY (linha 518)
  - AUTHORIZATION_BOUNDARY (linha 520)
  - AUTHORIZATION_BOUNDARY (linha 524)
  - AUTHORIZATION_BOUNDARY (linha 537)
  - POTENTIAL_SECRET_LITERAL (linha 558)
  - TENANCY_BOUNDARY (linha 561)
  - TENANCY_BOUNDARY (linha 571)
  - TENANCY_BOUNDARY (linha 586)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 597)
  - MOCK_OR_SIMULATION (linha 602)
  - AUTHORIZATION_BOUNDARY (linha 616)
  - AUTHORIZATION_BOUNDARY (linha 625)
  - AUTHORIZATION_BOUNDARY (linha 631)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 640)
  - AUTHORIZATION_BOUNDARY (linha 644)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 650)
  - AUTHORIZATION_BOUNDARY (linha 654)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 660)
  - AUTHORIZATION_BOUNDARY (linha 664)
  - TENANCY_BOUNDARY (linha 680)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 693)
  - TENANCY_BOUNDARY (linha 696)
  - AUTHORIZATION_BOUNDARY (linha 700)
  - TENANCY_BOUNDARY (linha 729)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 744)
  - TENANCY_BOUNDARY (linha 747)
  - MOCK_OR_SIMULATION (linha 753)
- Preview redigido das linhas adicionadas ou iniciais:
  import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
    constructor(private readonly authClienteService: AuthClienteService) {}
            description: 'Slug p├â┬║blico da empresa. Informe slug ou dom├â┬¡nio.',
    solicitarCodigo(@Req() req: any, @Body() dto: SolicitarCodigoDto) {
            description: 'Slug p├â┬║blico da empresa. Informe slug ou dom├â┬¡nio.',
    verificarCodigo(@Req() req: any, @Body() dto: VerificarCodigoDto) {
    logout(@Req() req: any, @Body() dto: LogoutClienteDto) {
            description: 'Confirma se o cliente aceitou os termos de uso.',

### beauty-core-backend/src/modules/auth-cliente/auth-cliente.module.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 1342 bytes
- SHA-256: `5297F4E335D3EBF07A8360E1FB0C5FFEDC441E12B99AEEC6A51DBEA4096661F5`
- Numstat: `4	12	beauty-core-backend/src/modules/auth-cliente/auth-cliente.module.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 8)
  - TENANCY_BOUNDARY (linha 21)
  - TENANCY_BOUNDARY (linha 58)
  - TENANCY_BOUNDARY (linha 71)
- Preview redigido das linhas adicionadas ou iniciais:
    controllers: [AuthClienteController, AuthClientePublicoController],
    providers: [AuthClienteService, ClienteJwtStrategy],
    exports: [AuthClienteService],
  export class AuthClienteModule {}

### beauty-core-backend/src/modules/auth-cliente/auth-cliente.service.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 28326 bytes
- SHA-256: `0ECA2C9115B3AD7B903766B93C9FF38A17F2D89D5D51F62874B6C33FBEE4C0EB`
- Numstat: `37	55	beauty-core-backend/src/modules/auth-cliente/auth-cliente.service.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 26)
  - MOCK_OR_SIMULATION (linha 38)
  - TENANCY_BOUNDARY (linha 41)
  - TENANCY_BOUNDARY (linha 54)
  - TENANCY_BOUNDARY (linha 64)
  - TENANCY_BOUNDARY (linha 69)
  - TENANCY_BOUNDARY (linha 91)
  - TENANCY_BOUNDARY (linha 103)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 110)
  - AUTHORIZATION_BOUNDARY (linha 119)
  - TENANCY_BOUNDARY (linha 122)
  - TENANCY_BOUNDARY (linha 131)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 138)
  - AUTHORIZATION_BOUNDARY (linha 146)
  - AUTHORIZATION_BOUNDARY (linha 147)
  - AUTHORIZATION_BOUNDARY (linha 150)
  - AUTHORIZATION_BOUNDARY (linha 156)
  - AUTHORIZATION_BOUNDARY (linha 157)
  - TENANCY_BOUNDARY (linha 169)
  - AUTHORIZATION_BOUNDARY (linha 172)
  - TENANCY_BOUNDARY (linha 173)
  - TENANCY_BOUNDARY (linha 180)
  - TENANCY_BOUNDARY (linha 184)
  - TENANCY_BOUNDARY (linha 199)
  - TENANCY_BOUNDARY (linha 215)
  - TENANCY_BOUNDARY (linha 227)
  - TENANCY_BOUNDARY (linha 228)
  - TENANCY_BOUNDARY (linha 233)
  - TENANCY_BOUNDARY (linha 239)
  - TENANCY_BOUNDARY (linha 250)
  - TENANCY_BOUNDARY (linha 254)
  - MOCK_OR_SIMULATION (linha 259)
  - TENANCY_BOUNDARY (linha 266)
  - TENANCY_BOUNDARY (linha 283)
  - TENANCY_BOUNDARY (linha 287)
  - MOCK_OR_SIMULATION (linha 293)
  - TENANCY_BOUNDARY (linha 300)
  - TENANCY_BOUNDARY (linha 315)
  - TENANCY_BOUNDARY (linha 328)
  - AUTHORIZATION_BOUNDARY (linha 334)
  - TENANCY_BOUNDARY (linha 339)
  - TENANCY_BOUNDARY (linha 351)
  - TENANCY_BOUNDARY (linha 355)
  - MOCK_OR_SIMULATION (linha 361)
  - TENANCY_BOUNDARY (linha 368)
  - TENANCY_BOUNDARY (linha 379)
  - TENANCY_BOUNDARY (linha 380)
  - TENANCY_BOUNDARY (linha 381)
  - TENANCY_BOUNDARY (linha 382)
  - TENANCY_BOUNDARY (linha 383)
  - TENANCY_BOUNDARY (linha 396)
  - TENANCY_BOUNDARY (linha 397)
  - TENANCY_BOUNDARY (linha 402)
  - TENANCY_BOUNDARY (linha 412)
  - TENANCY_BOUNDARY (linha 416)
  - MOCK_OR_SIMULATION (linha 421)
  - TENANCY_BOUNDARY (linha 428)
  - TENANCY_BOUNDARY (linha 443)
  - TENANCY_BOUNDARY (linha 447)
  - MOCK_OR_SIMULATION (linha 453)
  - TENANCY_BOUNDARY (linha 460)
  - TENANCY_BOUNDARY (linha 475)
  - TENANCY_BOUNDARY (linha 493)
  - TENANCY_BOUNDARY (linha 501)
  - TENANCY_BOUNDARY (linha 505)
  - MOCK_OR_SIMULATION (linha 511)
  - TENANCY_BOUNDARY (linha 517)
  - TENANCY_BOUNDARY (linha 532)
  - TENANCY_BOUNDARY (linha 545)
  - TENANCY_BOUNDARY (linha 549)
  - MOCK_OR_SIMULATION (linha 555)
  - TENANCY_BOUNDARY (linha 561)
  - TENANCY_BOUNDARY (linha 577)
  - TENANCY_BOUNDARY (linha 589)
  - TENANCY_BOUNDARY (linha 593)
  - MOCK_OR_SIMULATION (linha 599)
  - TENANCY_BOUNDARY (linha 606)
  - TENANCY_BOUNDARY (linha 617)
  - AUTHORIZATION_BOUNDARY (linha 621)
  - TENANCY_BOUNDARY (linha 633)
  - AUTHORIZATION_BOUNDARY (linha 636)
  - TENANCY_BOUNDARY (linha 653)
  - TENANCY_BOUNDARY (linha 657)
  - MOCK_OR_SIMULATION (linha 662)
  - TENANCY_BOUNDARY (linha 670)
  - POTENTIAL_SECRET_LITERAL (linha 679)
  - AUTHORIZATION_BOUNDARY (linha 680)
  - TENANCY_BOUNDARY (linha 684)
  - TENANCY_BOUNDARY (linha 685)
  - TENANCY_BOUNDARY (linha 686)
  - TENANCY_BOUNDARY (linha 687)
  - TENANCY_BOUNDARY (linha 688)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 695)
  - AUTHORIZATION_BOUNDARY (linha 698)
  - AUTHORIZATION_BOUNDARY (linha 704)
  - AUTHORIZATION_BOUNDARY (linha 708)
  - AUTHORIZATION_BOUNDARY (linha 712)
  - AUTHORIZATION_BOUNDARY (linha 735)
  - AUTHORIZATION_BOUNDARY (linha 736)
  - AUTHORIZATION_BOUNDARY (linha 751)
  - AUTHORIZATION_BOUNDARY (linha 764)
  - AUTHORIZATION_BOUNDARY (linha 772)
  - AUTHORIZATION_BOUNDARY (linha 774)
  - TENANCY_BOUNDARY (linha 781)
  - AUTHORIZATION_BOUNDARY (linha 786)
  - POTENTIAL_SECRET_LITERAL (linha 793)
  - AUTHORIZATION_BOUNDARY (linha 794)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 800)
  - AUTHORIZATION_BOUNDARY (linha 824)
  - AUTHORIZATION_BOUNDARY (linha 825)
  - AUTHORIZATION_BOUNDARY (linha 830)
  - TENANCY_BOUNDARY (linha 837)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 850)
  - TENANCY_BOUNDARY (linha 862)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 878)
  - TENANCY_BOUNDARY (linha 890)
  - TENANCY_BOUNDARY (linha 894)
  - TENANCY_BOUNDARY (linha 899)
  - TENANCY_BOUNDARY (linha 929)
  - TENANCY_BOUNDARY (linha 939)
  - TENANCY_BOUNDARY (linha 943)
  - MOCK_OR_SIMULATION (linha 949)
  - TENANCY_BOUNDARY (linha 967)
  - TENANCY_BOUNDARY (linha 982)
  - TENANCY_BOUNDARY (linha 986)
  - MOCK_OR_SIMULATION (linha 992)
  - TENANCY_BOUNDARY (linha 1008)
  - TENANCY_BOUNDARY (linha 1012)
  - MOCK_OR_SIMULATION (linha 1018)
  - TENANCY_BOUNDARY (linha 1027)
  - TENANCY_BOUNDARY (linha 1058)
  - MOCK_OR_SIMULATION (linha 1070)
  - TENANCY_BOUNDARY (linha 1073)
  - TENANCY_BOUNDARY (linha 1086)
  - TENANCY_BOUNDARY (linha 1096)
  - TENANCY_BOUNDARY (linha 1101)
  - TENANCY_BOUNDARY (linha 1122)
  - TENANCY_BOUNDARY (linha 1134)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 1141)
  - AUTHORIZATION_BOUNDARY (linha 1150)
  - TENANCY_BOUNDARY (linha 1153)
  - TENANCY_BOUNDARY (linha 1162)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 1171)
  - AUTHORIZATION_BOUNDARY (linha 1179)
  - AUTHORIZATION_BOUNDARY (linha 1180)
  - AUTHORIZATION_BOUNDARY (linha 1183)
  - AUTHORIZATION_BOUNDARY (linha 1189)
  - AUTHORIZATION_BOUNDARY (linha 1190)
  - TENANCY_BOUNDARY (linha 1202)
  - AUTHORIZATION_BOUNDARY (linha 1205)
  - TENANCY_BOUNDARY (linha 1206)
  - TENANCY_BOUNDARY (linha 1213)
  - TENANCY_BOUNDARY (linha 1217)
  - TENANCY_BOUNDARY (linha 1232)
  - TENANCY_BOUNDARY (linha 1246)
  - TENANCY_BOUNDARY (linha 1255)
  - TENANCY_BOUNDARY (linha 1256)
  - TENANCY_BOUNDARY (linha 1261)
  - TENANCY_BOUNDARY (linha 1267)
  - TENANCY_BOUNDARY (linha 1278)
  - TENANCY_BOUNDARY (linha 1282)
  - MOCK_OR_SIMULATION (linha 1287)
  - TENANCY_BOUNDARY (linha 1294)
  - TENANCY_BOUNDARY (linha 1309)
  - TENANCY_BOUNDARY (linha 1313)
  - MOCK_OR_SIMULATION (linha 1319)
  - TENANCY_BOUNDARY (linha 1325)
  - TENANCY_BOUNDARY (linha 1340)
  - TENANCY_BOUNDARY (linha 1353)
  - AUTHORIZATION_BOUNDARY (linha 1358)
  - TENANCY_BOUNDARY (linha 1362)
  - TENANCY_BOUNDARY (linha 1374)
  - TENANCY_BOUNDARY (linha 1378)
  - MOCK_OR_SIMULATION (linha 1384)
  - TENANCY_BOUNDARY (linha 1391)
  - TENANCY_BOUNDARY (linha 1402)
  - TENANCY_BOUNDARY (linha 1403)
  - TENANCY_BOUNDARY (linha 1404)
  - TENANCY_BOUNDARY (linha 1405)
  - TENANCY_BOUNDARY (linha 1406)
  - TENANCY_BOUNDARY (linha 1416)
  - TENANCY_BOUNDARY (linha 1417)
  - TENANCY_BOUNDARY (linha 1422)
  - TENANCY_BOUNDARY (linha 1432)
  - TENANCY_BOUNDARY (linha 1436)
  - MOCK_OR_SIMULATION (linha 1441)
  - TENANCY_BOUNDARY (linha 1448)
  - TENANCY_BOUNDARY (linha 1463)
  - TENANCY_BOUNDARY (linha 1467)
  - MOCK_OR_SIMULATION (linha 1473)
  - TENANCY_BOUNDARY (linha 1479)
  - TENANCY_BOUNDARY (linha 1494)
  - TENANCY_BOUNDARY (linha 1512)
  - TENANCY_BOUNDARY (linha 1520)
  - TENANCY_BOUNDARY (linha 1524)
  - MOCK_OR_SIMULATION (linha 1530)
  - TENANCY_BOUNDARY (linha 1536)
  - TENANCY_BOUNDARY (linha 1550)
  - TENANCY_BOUNDARY (linha 1563)
  - TENANCY_BOUNDARY (linha 1567)
  - MOCK_OR_SIMULATION (linha 1573)
  - TENANCY_BOUNDARY (linha 1579)
  - TENANCY_BOUNDARY (linha 1593)
  - TENANCY_BOUNDARY (linha 1605)
  - TENANCY_BOUNDARY (linha 1609)
  - MOCK_OR_SIMULATION (linha 1615)
  - TENANCY_BOUNDARY (linha 1621)
  - TENANCY_BOUNDARY (linha 1632)
  - AUTHORIZATION_BOUNDARY (linha 1636)
  - TENANCY_BOUNDARY (linha 1648)
  - AUTHORIZATION_BOUNDARY (linha 1651)
  - TENANCY_BOUNDARY (linha 1665)
  - TENANCY_BOUNDARY (linha 1669)
  - MOCK_OR_SIMULATION (linha 1674)
  - TENANCY_BOUNDARY (linha 1682)
  - POTENTIAL_SECRET_LITERAL (linha 1691)
  - AUTHORIZATION_BOUNDARY (linha 1692)
  - TENANCY_BOUNDARY (linha 1696)
  - TENANCY_BOUNDARY (linha 1697)
  - TENANCY_BOUNDARY (linha 1698)
  - TENANCY_BOUNDARY (linha 1699)
  - TENANCY_BOUNDARY (linha 1700)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 1707)
  - AUTHORIZATION_BOUNDARY (linha 1710)
  - AUTHORIZATION_BOUNDARY (linha 1716)
  - AUTHORIZATION_BOUNDARY (linha 1720)
  - AUTHORIZATION_BOUNDARY (linha 1724)
  - AUTHORIZATION_BOUNDARY (linha 1747)
  - AUTHORIZATION_BOUNDARY (linha 1748)
  - AUTHORIZATION_BOUNDARY (linha 1764)
  - AUTHORIZATION_BOUNDARY (linha 1780)
  - AUTHORIZATION_BOUNDARY (linha 1788)
  - AUTHORIZATION_BOUNDARY (linha 1790)
  - TENANCY_BOUNDARY (linha 1797)
  - AUTHORIZATION_BOUNDARY (linha 1802)
  - POTENTIAL_SECRET_LITERAL (linha 1809)
  - AUTHORIZATION_BOUNDARY (linha 1810)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 1816)
  - AUTHORIZATION_BOUNDARY (linha 1840)
  - AUTHORIZATION_BOUNDARY (linha 1841)
  - AUTHORIZATION_BOUNDARY (linha 1846)
  - TENANCY_BOUNDARY (linha 1853)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 1866)
  - TENANCY_BOUNDARY (linha 1878)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 1894)
  - TENANCY_BOUNDARY (linha 1905)
  - TENANCY_BOUNDARY (linha 1909)
  - TENANCY_BOUNDARY (linha 1914)
  - TENANCY_BOUNDARY (linha 1944)
  - TENANCY_BOUNDARY (linha 1954)
  - TENANCY_BOUNDARY (linha 1958)
  - MOCK_OR_SIMULATION (linha 1964)
  - TENANCY_BOUNDARY (linha 1979)
  - TENANCY_BOUNDARY (linha 1994)
  - TENANCY_BOUNDARY (linha 1998)
  - MOCK_OR_SIMULATION (linha 2004)
  - TENANCY_BOUNDARY (linha 2019)
  - TENANCY_BOUNDARY (linha 2023)
  - MOCK_OR_SIMULATION (linha 2029)
  - TENANCY_BOUNDARY (linha 2038)
- Preview redigido das linhas adicionadas ou iniciais:
  import {
    durationToDate,
    durationToSeconds,
  } from '../../shared/utils/duration.util';
        secret: this.configService.getOrThrow<string>(
          'JWT_CLIENT_REFRESH_SECRET',
        ),
        throw new BadRequestException('Informe o slug ou dom├â┬¡nio da empresa.');

### beauty-core-backend/src/modules/auth-cliente/dto/aceitar-termos.dto.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 431 bytes
- SHA-256: `6E60C127148391768FB1389CE60C8E7CCB4AAF829AB3C8E4C6B20DF5E8733B41`
- Numstat: `1	1	beauty-core-backend/src/modules/auth-cliente/dto/aceitar-termos.dto.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais: nenhum dos padroes de triagem foi localizado.
- Preview redigido das linhas adicionadas ou iniciais:
  }

### beauty-core-backend/src/modules/auth-cliente/dto/refresh-cliente-token.dto.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 382 bytes
- SHA-256: `1E15D8C1B530E539A289E15D61DD46EEED57B563AB52C71A89642CD86551AE9E`
- Numstat: `2	1	beauty-core-backend/src/modules/auth-cliente/dto/refresh-cliente-token.dto.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 7)
  - AUTHORIZATION_BOUNDARY (linha 11)
  - AUTHORIZATION_BOUNDARY (linha 20)
  - AUTHORIZATION_BOUNDARY (linha 24)
- Preview redigido das linhas adicionadas ou iniciais:
      description:
        'Refresh token Cliente recebido no login ou no refresh anterior.',

### beauty-core-backend/src/modules/auth-cliente/dto/solicitar-codigo.dto.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 1635 bytes
- SHA-256: `F25D1D651ACA25635E57351CB993C7D442E1717EDA126D59D239E8566CE30DFD`
- Numstat: `4	13	beauty-core-backend/src/modules/auth-cliente/dto/solicitar-codigo.dto.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 16)
  - TENANCY_BOUNDARY (linha 31)
  - TENANCY_BOUNDARY (linha 51)
  - AUTHORIZATION_BOUNDARY (linha 71)
  - TENANCY_BOUNDARY (linha 86)
  - TENANCY_BOUNDARY (linha 105)
- Preview redigido das linhas adicionadas ou iniciais:
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  import { IsOptional, IsString, Length, Matches } from 'class-validator';
      message: 'O slug deve conter apenas letras min├║sculas, n├║meros e h├¡fens.',
  }

### beauty-core-backend/src/modules/auth-cliente/dto/verificar-codigo.dto.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 2098 bytes
- SHA-256: `F2741C34E2BB9196F5CE5EDACC2447884ED909616647C117D7FDE2D8828DD990`
- Numstat: `2	10	beauty-core-backend/src/modules/auth-cliente/dto/verificar-codigo.dto.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 31)
  - AUTHORIZATION_BOUNDARY (linha 49)
  - TENANCY_BOUNDARY (linha 49)
  - AUTHORIZATION_BOUNDARY (linha 69)
  - TENANCY_BOUNDARY (linha 69)
  - AUTHORIZATION_BOUNDARY (linha 104)
  - AUTHORIZATION_BOUNDARY (linha 122)
  - TENANCY_BOUNDARY (linha 122)
  - AUTHORIZATION_BOUNDARY (linha 142)
  - TENANCY_BOUNDARY (linha 142)
- Preview redigido das linhas adicionadas ou iniciais:
  ´╗┐import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  import { IsOptional, IsString, Length, Matches } from 'class-validator';

### beauty-core-backend/src/modules/auth-cliente/guards/cliente-auth.guard.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 177 bytes
- SHA-256: `E88A4F193BAB7769EFBB6B4E225337D1725FB98D07863E63FBB76D5D5BA1E610`
- Numstat: `1	1	beauty-core-backend/src/modules/auth-cliente/guards/cliente-auth.guard.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 5)
  - AUTHORIZATION_BOUNDARY (linha 10)
- Preview redigido das linhas adicionadas ou iniciais:
  export class ClienteAuthGuard extends AuthGuard('cliente-jwt') {}

### beauty-core-backend/src/modules/auth-cliente/strategies/cliente-jwt.strategy.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 3800 bytes
- SHA-256: `B98E374709ED18CCEA7A800100EBA5DFF4F691BC436577DE107D7573F275D369`
- Numstat: `1	3	beauty-core-backend/src/modules/auth-cliente/strategies/cliente-jwt.strategy.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 15)
  - TENANCY_BOUNDARY (linha 54)
  - TENANCY_BOUNDARY (linha 66)
  - TENANCY_BOUNDARY (linha 101)
  - TENANCY_BOUNDARY (linha 127)
  - TENANCY_BOUNDARY (linha 157)
  - TENANCY_BOUNDARY (linha 194)
  - TENANCY_BOUNDARY (linha 206)
  - TENANCY_BOUNDARY (linha 241)
  - TENANCY_BOUNDARY (linha 267)
- Preview redigido das linhas adicionadas ou iniciais:
        secretOrKey: configService.getOrThrow<string>('JWT_CLIENT_SECRET'),

### beauty-core-backend/src/modules/auth/auth.controller.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 7309 bytes
- SHA-256: `F81AD37841C83612B3D9C13F37D8A9CAC31980EF64C8FF04DB92CDACCCBEC119`
- Numstat: `6	16	beauty-core-backend/src/modules/auth/auth.controller.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 30)
  - AUTHORIZATION_BOUNDARY (linha 31)
  - AUTHORIZATION_BOUNDARY (linha 57)
  - POTENTIAL_SECRET_LITERAL (linha 83)
  - AUTHORIZATION_BOUNDARY (linha 84)
  - TENANCY_BOUNDARY (linha 91)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 108)
  - MOCK_OR_SIMULATION (linha 114)
  - AUTHORIZATION_BOUNDARY (linha 128)
  - AUTHORIZATION_BOUNDARY (linha 131)
  - POTENTIAL_SECRET_LITERAL (linha 137)
  - AUTHORIZATION_BOUNDARY (linha 138)
  - AUTHORIZATION_BOUNDARY (linha 144)
  - AUTHORIZATION_BOUNDARY (linha 146)
  - AUTHORIZATION_BOUNDARY (linha 151)
  - AUTHORIZATION_BOUNDARY (linha 156)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 170)
  - AUTHORIZATION_BOUNDARY (linha 177)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 193)
  - AUTHORIZATION_BOUNDARY (linha 198)
  - PUBLIC_ORIGIN_RISK (linha 211)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 222)
  - AUTHORIZATION_BOUNDARY (linha 227)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 247)
  - AUTHORIZATION_BOUNDARY (linha 254)
  - TENANCY_BOUNDARY (linha 268)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 276)
  - AUTHORIZATION_BOUNDARY (linha 309)
  - AUTHORIZATION_BOUNDARY (linha 310)
  - AUTHORIZATION_BOUNDARY (linha 334)
  - POTENTIAL_SECRET_LITERAL (linha 360)
  - AUTHORIZATION_BOUNDARY (linha 361)
  - TENANCY_BOUNDARY (linha 368)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 384)
  - MOCK_OR_SIMULATION (linha 389)
  - AUTHORIZATION_BOUNDARY (linha 403)
  - AUTHORIZATION_BOUNDARY (linha 406)
  - POTENTIAL_SECRET_LITERAL (linha 412)
  - AUTHORIZATION_BOUNDARY (linha 413)
  - AUTHORIZATION_BOUNDARY (linha 419)
  - AUTHORIZATION_BOUNDARY (linha 421)
  - AUTHORIZATION_BOUNDARY (linha 426)
  - AUTHORIZATION_BOUNDARY (linha 431)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 444)
  - AUTHORIZATION_BOUNDARY (linha 449)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 465)
  - AUTHORIZATION_BOUNDARY (linha 470)
  - PUBLIC_ORIGIN_RISK (linha 483)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 494)
  - AUTHORIZATION_BOUNDARY (linha 499)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 518)
  - AUTHORIZATION_BOUNDARY (linha 523)
  - TENANCY_BOUNDARY (linha 537)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 545)
- Preview redigido das linhas adicionadas ou iniciais:
    constructor(private readonly authService: AuthService) {}
      description:
        'Muitas tentativas de login. Aguarde antes de tentar novamente.',
    async login(@Body() loginDto: LoginDto, @Req() req: any) {
    logout(@Req() req: any, @Body() dto: LogoutDto) {
    revogarSessao(@Req() req: any, @Param('sessaoId') sessaoId: string) {

### beauty-core-backend/src/modules/auth/auth.module.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 1071 bytes
- SHA-256: `4B7F27B3C5CB698F1B11579B324B8FF3C485DBCDBC98AE5484415888A1C67A8C`
- Numstat: `1	5	beauty-core-backend/src/modules/auth/auth.module.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 12)
  - AUTHORIZATION_BOUNDARY (linha 35)
  - AUTHORIZATION_BOUNDARY (linha 52)
  - AUTHORIZATION_BOUNDARY (linha 72)
- Preview redigido das linhas adicionadas ou iniciais:
    providers: [AuthService, JwtStrategy, RolesGuard],

### beauty-core-backend/src/modules/auth/auth.service.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 14735 bytes
- SHA-256: `5E7EABC6E22DD5DD353B148ACC2BD179834721A15B6973CB0F4928940745D437`
- Numstat: `21	15	beauty-core-backend/src/modules/auth/auth.service.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 30)
  - MOCK_OR_SIMULATION (linha 36)
  - TENANCY_BOUNDARY (linha 56)
  - TENANCY_BOUNDARY (linha 62)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 83)
  - TENANCY_BOUNDARY (linha 84)
  - TENANCY_BOUNDARY (linha 92)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 99)
  - AUTHORIZATION_BOUNDARY (linha 108)
  - TENANCY_BOUNDARY (linha 110)
  - TENANCY_BOUNDARY (linha 117)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 124)
  - TENANCY_BOUNDARY (linha 141)
  - MOCK_OR_SIMULATION (linha 147)
  - TENANCY_BOUNDARY (linha 165)
  - TENANCY_BOUNDARY (linha 169)
  - MOCK_OR_SIMULATION (linha 174)
  - TENANCY_BOUNDARY (linha 194)
  - TENANCY_BOUNDARY (linha 198)
  - MOCK_OR_SIMULATION (linha 203)
  - AUTHORIZATION_BOUNDARY (linha 219)
  - TENANCY_BOUNDARY (linha 228)
  - AUTHORIZATION_BOUNDARY (linha 231)
  - TENANCY_BOUNDARY (linha 254)
  - TENANCY_BOUNDARY (linha 258)
  - MOCK_OR_SIMULATION (linha 263)
  - POTENTIAL_SECRET_LITERAL (linha 282)
  - AUTHORIZATION_BOUNDARY (linha 283)
  - AUTHORIZATION_BOUNDARY (linha 292)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 293)
  - AUTHORIZATION_BOUNDARY (linha 296)
  - AUTHORIZATION_BOUNDARY (linha 300)
  - AUTHORIZATION_BOUNDARY (linha 304)
  - AUTHORIZATION_BOUNDARY (linha 308)
  - AUTHORIZATION_BOUNDARY (linha 331)
  - AUTHORIZATION_BOUNDARY (linha 332)
  - AUTHORIZATION_BOUNDARY (linha 347)
  - TENANCY_BOUNDARY (linha 356)
  - AUTHORIZATION_BOUNDARY (linha 360)
  - AUTHORIZATION_BOUNDARY (linha 368)
  - AUTHORIZATION_BOUNDARY (linha 370)
  - TENANCY_BOUNDARY (linha 377)
  - AUTHORIZATION_BOUNDARY (linha 383)
  - POTENTIAL_SECRET_LITERAL (linha 390)
  - AUTHORIZATION_BOUNDARY (linha 391)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 396)
  - AUTHORIZATION_BOUNDARY (linha 419)
  - AUTHORIZATION_BOUNDARY (linha 420)
  - AUTHORIZATION_BOUNDARY (linha 425)
  - TENANCY_BOUNDARY (linha 432)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 446)
  - TENANCY_BOUNDARY (linha 456)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 473)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 483)
  - TENANCY_BOUNDARY (linha 505)
  - AUTHORIZATION_BOUNDARY (linha 548)
  - MOCK_OR_SIMULATION (linha 554)
  - TENANCY_BOUNDARY (linha 574)
  - TENANCY_BOUNDARY (linha 580)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 601)
  - TENANCY_BOUNDARY (linha 602)
  - TENANCY_BOUNDARY (linha 612)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 619)
  - AUTHORIZATION_BOUNDARY (linha 628)
  - TENANCY_BOUNDARY (linha 631)
  - TENANCY_BOUNDARY (linha 640)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 647)
  - TENANCY_BOUNDARY (linha 664)
  - MOCK_OR_SIMULATION (linha 670)
  - TENANCY_BOUNDARY (linha 688)
  - TENANCY_BOUNDARY (linha 692)
  - MOCK_OR_SIMULATION (linha 697)
  - TENANCY_BOUNDARY (linha 717)
  - TENANCY_BOUNDARY (linha 721)
  - MOCK_OR_SIMULATION (linha 726)
  - AUTHORIZATION_BOUNDARY (linha 742)
  - TENANCY_BOUNDARY (linha 751)
  - AUTHORIZATION_BOUNDARY (linha 754)
  - TENANCY_BOUNDARY (linha 777)
  - TENANCY_BOUNDARY (linha 781)
  - MOCK_OR_SIMULATION (linha 786)
  - POTENTIAL_SECRET_LITERAL (linha 805)
  - AUTHORIZATION_BOUNDARY (linha 806)
  - AUTHORIZATION_BOUNDARY (linha 815)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 816)
  - AUTHORIZATION_BOUNDARY (linha 819)
  - AUTHORIZATION_BOUNDARY (linha 823)
  - AUTHORIZATION_BOUNDARY (linha 827)
  - AUTHORIZATION_BOUNDARY (linha 831)
  - AUTHORIZATION_BOUNDARY (linha 854)
  - AUTHORIZATION_BOUNDARY (linha 855)
  - AUTHORIZATION_BOUNDARY (linha 870)
  - TENANCY_BOUNDARY (linha 879)
  - AUTHORIZATION_BOUNDARY (linha 883)
  - AUTHORIZATION_BOUNDARY (linha 891)
  - AUTHORIZATION_BOUNDARY (linha 893)
  - TENANCY_BOUNDARY (linha 900)
  - AUTHORIZATION_BOUNDARY (linha 906)
  - POTENTIAL_SECRET_LITERAL (linha 913)
  - AUTHORIZATION_BOUNDARY (linha 914)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 919)
  - AUTHORIZATION_BOUNDARY (linha 942)
  - AUTHORIZATION_BOUNDARY (linha 943)
  - AUTHORIZATION_BOUNDARY (linha 948)
  - TENANCY_BOUNDARY (linha 955)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 969)
  - TENANCY_BOUNDARY (linha 980)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 997)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 1007)
  - TENANCY_BOUNDARY (linha 1029)
- Preview redigido das linhas adicionadas ou iniciais:
    private async gerarAccessTokenAdmin(
      usuario: {
        id: string;
        email: string;
        role: any;
        empresaId: string | null;
      },
      sessaoId: string,

### beauty-core-backend/src/modules/auth/dto/login.dto.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 602 bytes
- SHA-256: `2C22B4E72AD9C2690029F40DB1E36310E7EFDD639C9A3AC97D70C4C0EBB9DE90`
- Numstat: `1	1	beauty-core-backend/src/modules/auth/dto/login.dto.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais: nenhum dos padroes de triagem foi localizado.
- Preview redigido das linhas adicionadas ou iniciais:
  }

### beauty-core-backend/src/modules/auth/dto/refresh-token.dto.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 373 bytes
- SHA-256: `75A2F45778CAA36AD8B6D126FD14458FDDA3F682983AD5AF2827C48521BEA539`
- Numstat: `2	1	beauty-core-backend/src/modules/auth/dto/refresh-token.dto.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 4)
  - AUTHORIZATION_BOUNDARY (linha 7)
  - AUTHORIZATION_BOUNDARY (linha 11)
  - AUTHORIZATION_BOUNDARY (linha 16)
  - AUTHORIZATION_BOUNDARY (linha 20)
  - AUTHORIZATION_BOUNDARY (linha 24)
- Preview redigido das linhas adicionadas ou iniciais:
      description:
        'Refresh token Admin recebido no login ou no refresh anterior.',

### beauty-core-backend/src/modules/auth/guards/jwt-auth.guard.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 165 bytes
- SHA-256: `86F01FC8F2C8DC7A5D29859DEE9467CCB4A7611FC82A79BEEE69FC71EFCE4308`
- Numstat: `1	1	beauty-core-backend/src/modules/auth/guards/jwt-auth.guard.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 5)
  - AUTHORIZATION_BOUNDARY (linha 10)
- Preview redigido das linhas adicionadas ou iniciais:
  export class JwtAuthGuard extends AuthGuard('jwt') {}

### beauty-core-backend/src/modules/auth/guards/roles.guard.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 739 bytes
- SHA-256: `657A4365F2A1978F94BDEE89ACE1D9060FA73696633E0766BD84003138A45460`
- Numstat: `2	6	beauty-core-backend/src/modules/auth/guards/roles.guard.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 11)
  - AUTHORIZATION_BOUNDARY (linha 36)
- Preview redigido das linhas adicionadas ou iniciais:
  import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
  }

### beauty-core-backend/src/modules/auth/strategies/jwt.strategy.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 3851 bytes
- SHA-256: `B44B60C9C193FF28E55CEDE868947DD61BA74F5CDB306B7791A46547CEF67D8B`
- Numstat: `4	5	beauty-core-backend/src/modules/auth/strategies/jwt.strategy.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 14)
  - TENANCY_BOUNDARY (linha 57)
  - TENANCY_BOUNDARY (linha 91)
  - TENANCY_BOUNDARY (linha 102)
  - TENANCY_BOUNDARY (linha 118)
  - TENANCY_BOUNDARY (linha 137)
  - TENANCY_BOUNDARY (linha 162)
  - TENANCY_BOUNDARY (linha 207)
  - TENANCY_BOUNDARY (linha 238)
  - TENANCY_BOUNDARY (linha 249)
  - TENANCY_BOUNDARY (linha 265)
  - TENANCY_BOUNDARY (linha 284)
- Preview redigido das linhas adicionadas ou iniciais:
        throw new UnauthorizedException(
          'Token inv├ílido para ├írea administrativa.',
        );
      await this.sessoesService.validarSessaoAdminAtiva(payload.sid, usuario.id);

### beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.controller.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Tamanho: 9282 bytes
- SHA-256: `F0E59BE9DE129AD6F49C7F9B70D8600EB967A7121BBB4A12E69FED0E5A352279`
- Numstat: `29	43	beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.controller.ts`
- Decisao candidata: **POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 27)
  - AUTHORIZATION_BOUNDARY (linha 28)
  - TENANCY_BOUNDARY (linha 31)
  - AUTHORIZATION_BOUNDARY (linha 41)
  - MOCK_OR_SIMULATION (linha 52)
  - TENANCY_BOUNDARY (linha 63)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 85)
  - TENANCY_BOUNDARY (linha 89)
  - TENANCY_BOUNDARY (linha 107)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 126)
  - TENANCY_BOUNDARY (linha 128)
  - TENANCY_BOUNDARY (linha 137)
  - TENANCY_BOUNDARY (linha 150)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 175)
  - TENANCY_BOUNDARY (linha 179)
  - TENANCY_BOUNDARY (linha 206)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 231)
  - TENANCY_BOUNDARY (linha 236)
  - TENANCY_BOUNDARY (linha 260)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 280)
  - TENANCY_BOUNDARY (linha 284)
  - AUTHORIZATION_BOUNDARY (linha 315)
  - AUTHORIZATION_BOUNDARY (linha 316)
  - TENANCY_BOUNDARY (linha 319)
  - AUTHORIZATION_BOUNDARY (linha 329)
  - MOCK_OR_SIMULATION (linha 340)
  - TENANCY_BOUNDARY (linha 351)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 373)
  - TENANCY_BOUNDARY (linha 374)
  - TENANCY_BOUNDARY (linha 390)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 411)
  - TENANCY_BOUNDARY (linha 412)
  - TENANCY_BOUNDARY (linha 420)
  - TENANCY_BOUNDARY (linha 433)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 459)
  - TENANCY_BOUNDARY (linha 460)
  - TENANCY_BOUNDARY (linha 485)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 513)
  - TENANCY_BOUNDARY (linha 517)
  - TENANCY_BOUNDARY (linha 538)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 559)
  - TENANCY_BOUNDARY (linha 560)
- Preview redigido das linhas adicionadas ou iniciais:
      description:
        'Usu├írio sem permiss├úo. Permitido apenas para ADMIN e GERENTE.',
    create(@Req() req: any, @Body() dto: CreateCampanhaWhatsAppDto) {
      return this.campanhasWhatsappService.create(getEmpresaId(req), dto);
            descricao:
              'Campanha para clientes que n├úo agendam h├í mais de 30 dias.',
      description:
        'Usu├írio sem permiss├úo. Permitido apenas para ADMIN e GERENTE.',

### beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.module.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Tamanho: 718 bytes
- SHA-256: `8287245D4AB20C970EF2D283F80103E603B6377967DE4266E10F50B760E37240`
- Numstat: `8	19	beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.module.ts`
- Decisao candidata: **POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 4)
  - QUEUE_WORKER (linha 6)
  - TENANCY_BOUNDARY (linha 16)
  - QUEUE_WORKER (linha 17)
  - TENANCY_BOUNDARY (linha 37)
  - QUEUE_WORKER (linha 39)
  - TENANCY_BOUNDARY (linha 47)
  - QUEUE_WORKER (linha 47)
- Preview redigido das linhas adicionadas ou iniciais:
    imports: [PrismaModule, TenantModule, QueuesModule, AuditoriaModule],

    controllers: [CampanhasWhatsappController],

    providers: [CampanhasWhatsappService],

    exports: [CampanhasWhatsappService],
  export class CampanhasWhatsappModule {}

### beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Tamanho: 6620 bytes
- SHA-256: `07E642F96C0536CA7711FB7D3D06AEEB1C8C4C32FF3AACDC2637197B2A825441`
- Numstat: `57	104	beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts`
- Decisao candidata: **POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 13)
  - QUEUE_WORKER (linha 15)
  - QUEUE_WORKER (linha 28)
  - TENANCY_BOUNDARY (linha 30)
  - TENANCY_BOUNDARY (linha 34)
  - TENANCY_BOUNDARY (linha 39)
  - TENANCY_BOUNDARY (linha 47)
  - QUEUE_WORKER (linha 60)
  - TENANCY_BOUNDARY (linha 62)
  - TENANCY_BOUNDARY (linha 70)
  - TENANCY_BOUNDARY (linha 74)
  - QUEUE_WORKER (linha 84)
  - QUEUE_WORKER (linha 93)
  - TENANCY_BOUNDARY (linha 97)
  - TENANCY_BOUNDARY (linha 98)
  - TENANCY_BOUNDARY (linha 102)
  - TENANCY_BOUNDARY (linha 111)
  - TENANCY_BOUNDARY (linha 114)
  - TENANCY_BOUNDARY (linha 116)
  - TENANCY_BOUNDARY (linha 120)
  - TENANCY_BOUNDARY (linha 126)
  - TENANCY_BOUNDARY (linha 129)
  - TENANCY_BOUNDARY (linha 137)
  - TENANCY_BOUNDARY (linha 149)
  - TENANCY_BOUNDARY (linha 156)
  - TENANCY_BOUNDARY (linha 160)
  - TENANCY_BOUNDARY (linha 177)
  - TENANCY_BOUNDARY (linha 182)
  - TENANCY_BOUNDARY (linha 185)
  - TENANCY_BOUNDARY (linha 193)
  - TENANCY_BOUNDARY (linha 207)
  - TENANCY_BOUNDARY (linha 214)
  - TENANCY_BOUNDARY (linha 218)
  - TENANCY_BOUNDARY (linha 237)
  - TENANCY_BOUNDARY (linha 244)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 257)
  - TENANCY_BOUNDARY (linha 260)
  - TENANCY_BOUNDARY (linha 278)
  - QUEUE_WORKER (linha 280)
  - QUEUE_WORKER (linha 293)
  - TENANCY_BOUNDARY (linha 295)
  - TENANCY_BOUNDARY (linha 298)
  - TENANCY_BOUNDARY (linha 301)
  - TENANCY_BOUNDARY (linha 307)
  - QUEUE_WORKER (linha 319)
  - TENANCY_BOUNDARY (linha 321)
  - TENANCY_BOUNDARY (linha 329)
  - TENANCY_BOUNDARY (linha 333)
  - QUEUE_WORKER (linha 343)
  - QUEUE_WORKER (linha 352)
  - TENANCY_BOUNDARY (linha 356)
  - TENANCY_BOUNDARY (linha 357)
  - TENANCY_BOUNDARY (linha 361)
  - TENANCY_BOUNDARY (linha 369)
  - TENANCY_BOUNDARY (linha 370)
  - TENANCY_BOUNDARY (linha 372)
  - TENANCY_BOUNDARY (linha 375)
  - TENANCY_BOUNDARY (linha 378)
  - TENANCY_BOUNDARY (linha 380)
  - TENANCY_BOUNDARY (linha 385)
  - TENANCY_BOUNDARY (linha 394)
  - TENANCY_BOUNDARY (linha 399)
  - TENANCY_BOUNDARY (linha 403)
  - TENANCY_BOUNDARY (linha 419)
  - TENANCY_BOUNDARY (linha 422)
  - TENANCY_BOUNDARY (linha 424)
  - TENANCY_BOUNDARY (linha 429)
  - TENANCY_BOUNDARY (linha 440)
  - TENANCY_BOUNDARY (linha 445)
  - TENANCY_BOUNDARY (linha 449)
  - TENANCY_BOUNDARY (linha 467)
  - TENANCY_BOUNDARY (linha 471)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 482)
  - TENANCY_BOUNDARY (linha 485)
- Preview redigido das linhas adicionadas ou iniciais:
  import { Injectable, Logger, NotFoundException } from '@nestjs/common';
  import { StatusMensagemWhatsApp, TipoUsuarioAuditoria } from '@prisma/client';
    async create(empresaId: string, dto: CreateCampanhaWhatsAppDto) {
      const totalDestinatarios = dto.totalDestinatarios ?? 0;

      const campanha = await this.prisma.campanhaWhatsApp.create({
        data: {
          nome: dto.nome,

### beauty-core-backend/src/modules/campanhas-whatsapp/dto/create-campanha-whatsapp.dto.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Tamanho: 2059 bytes
- SHA-256: `F7BDE1330D623EA4D6B41B1364311862E1A42883ACC8DED8AC9CFF1E03B089BD`
- Numstat: `3	7	beauty-core-backend/src/modules/campanhas-whatsapp/dto/create-campanha-whatsapp.dto.ts`
- Decisao candidata: **POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK**
- Sinais: nenhum dos padroes de triagem foi localizado.
- Preview redigido das linhas adicionadas ou iniciais:
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
      description: 'Conte├║do da mensagem que ser├í usada na campanha de WhatsApp.',
  }

### beauty-core-backend/src/modules/campanhas-whatsapp/dto/update-campanha-whatsapp.dto.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Tamanho: 226 bytes
- SHA-256: `EB1D92042DA43BB902D554D56B2652ED6A33AA2B90B1BB08D13F27880C75D9D7`
- Numstat: `1	1	beauty-core-backend/src/modules/campanhas-whatsapp/dto/update-campanha-whatsapp.dto.ts`
- Decisao candidata: **POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK**
- Sinais: nenhum dos padroes de triagem foi localizado.
- Preview redigido das linhas adicionadas ou iniciais:
  ) {}

### beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.controller.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Tamanho: 6874 bytes
- SHA-256: `BEA6005ED6DE9650DB9E919AB2D01BCEDA123F45DC1F23D21C151D5822673939`
- Numstat: `6	20	beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.controller.ts`
- Decisao candidata: **POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 25)
  - AUTHORIZATION_BOUNDARY (linha 26)
  - AUTHORIZATION_BOUNDARY (linha 38)
  - TENANCY_BOUNDARY (linha 61)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 83)
  - TENANCY_BOUNDARY (linha 87)
  - TENANCY_BOUNDARY (linha 104)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 122)
  - TENANCY_BOUNDARY (linha 124)
  - TENANCY_BOUNDARY (linha 145)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 167)
  - TENANCY_BOUNDARY (linha 171)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 212)
  - TENANCY_BOUNDARY (linha 216)
  - AUTHORIZATION_BOUNDARY (linha 245)
  - AUTHORIZATION_BOUNDARY (linha 246)
  - AUTHORIZATION_BOUNDARY (linha 258)
  - TENANCY_BOUNDARY (linha 281)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 302)
  - TENANCY_BOUNDARY (linha 304)
  - TENANCY_BOUNDARY (linha 321)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 339)
  - TENANCY_BOUNDARY (linha 340)
  - TENANCY_BOUNDARY (linha 360)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 381)
  - TENANCY_BOUNDARY (linha 382)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 420)
  - TENANCY_BOUNDARY (linha 422)
- Preview redigido das linhas adicionadas ou iniciais:
    createOrUpdate(@Req() req: any, @Body() dto: CreateConfiguracaoWhatsAppDto) {
      return this.configuracaoWhatsappService.findOne(req.user.empresaId);
    update(@Req() req: any, @Body() dto: UpdateConfiguracaoWhatsAppDto) {
      return this.configuracaoWhatsappService.update(req.user.empresaId, dto);
    gerarLink(@Req() req: any, @Query('mensagem') mensagem?: string) {
  }

### beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.module.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Tamanho: 581 bytes
- SHA-256: `8AB1C9390080253E22FB19CFC092C3448A8028AD2740FEDAD3322D223B2E3F89`
- Numstat: `5	14	beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.module.ts`
- Decisao candidata: **POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 4)
  - TENANCY_BOUNDARY (linha 12)
  - TENANCY_BOUNDARY (linha 31)
  - TENANCY_BOUNDARY (linha 37)
- Preview redigido das linhas adicionadas ou iniciais:
    imports: [PrismaModule, TenantModule],
    controllers: [ConfiguracaoWhatsappController],
    providers: [ConfiguracaoWhatsappService],
    exports: [ConfiguracaoWhatsappService],
  export class ConfiguracaoWhatsappModule {}

### beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Tamanho: 3259 bytes
- SHA-256: `E58DF8C68BD5165FC211BBEE543EEDA80F1E777DDAB6DD974F1350EC68CDA55D`
- Numstat: `15	27	beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts`
- Decisao candidata: **POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 5)
  - TENANCY_BOUNDARY (linha 14)
  - TENANCY_BOUNDARY (linha 18)
  - TENANCY_BOUNDARY (linha 21)
  - TENANCY_BOUNDARY (linha 28)
  - TENANCY_BOUNDARY (linha 35)
  - TENANCY_BOUNDARY (linha 45)
  - TENANCY_BOUNDARY (linha 56)
  - TENANCY_BOUNDARY (linha 57)
  - TENANCY_BOUNDARY (linha 62)
  - TENANCY_BOUNDARY (linha 76)
  - TENANCY_BOUNDARY (linha 79)
  - TENANCY_BOUNDARY (linha 81)
  - TENANCY_BOUNDARY (linha 87)
  - TENANCY_BOUNDARY (linha 95)
  - TENANCY_BOUNDARY (linha 96)
  - TENANCY_BOUNDARY (linha 98)
  - TENANCY_BOUNDARY (linha 126)
  - TENANCY_BOUNDARY (linha 137)
  - TENANCY_BOUNDARY (linha 146)
  - TENANCY_BOUNDARY (linha 149)
  - TENANCY_BOUNDARY (linha 150)
  - TENANCY_BOUNDARY (linha 156)
  - TENANCY_BOUNDARY (linha 163)
  - TENANCY_BOUNDARY (linha 173)
  - TENANCY_BOUNDARY (linha 184)
  - TENANCY_BOUNDARY (linha 185)
  - TENANCY_BOUNDARY (linha 189)
  - TENANCY_BOUNDARY (linha 200)
  - TENANCY_BOUNDARY (linha 201)
  - TENANCY_BOUNDARY (linha 203)
  - TENANCY_BOUNDARY (linha 209)
  - TENANCY_BOUNDARY (linha 217)
  - TENANCY_BOUNDARY (linha 218)
  - TENANCY_BOUNDARY (linha 220)
  - TENANCY_BOUNDARY (linha 246)
- Preview redigido das linhas adicionadas ou iniciais:
    async createOrUpdate(empresaId: string, dto: CreateConfiguracaoWhatsAppDto) {
      const existente = await this.prisma.configuracaoWhatsApp.findUnique({
        where: {
          empresaId,
        },
      });
      const configuracao = await this.prisma.configuracaoWhatsApp.findUnique({
        where: {

### beauty-core-backend/src/modules/configuracao-whatsapp/dto/create-configuracao-whatsapp.dto.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Tamanho: 2253 bytes
- SHA-256: `4833514FF0C36CB03C739F1D0D09BE2A5CA773258073067DC4E8B39D22D52B13`
- Numstat: `3	10	beauty-core-backend/src/modules/configuracao-whatsapp/dto/create-configuracao-whatsapp.dto.ts`
- Decisao candidata: **POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK**
- Sinais: nenhum dos padroes de triagem foi localizado.
- Preview redigido das linhas adicionadas ou iniciais:
  import { ApiPropertyOptional } from '@nestjs/swagger';
  import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
  }

### beauty-core-backend/src/modules/configuracao-whatsapp/dto/update-configuracao-whatsapp.dto.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Tamanho: 242 bytes
- SHA-256: `461C5F9726077B53D7AB7FE44C72A7EDDA4F1D11DB090AC7B79C9A7022FA0E3E`
- Numstat: `1	1	beauty-core-backend/src/modules/configuracao-whatsapp/dto/update-configuracao-whatsapp.dto.ts`
- Decisao candidata: **POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK**
- Sinais: nenhum dos padroes de triagem foi localizado.
- Preview redigido das linhas adicionadas ou iniciais:
  ) {}

### beauty-core-backend/src/modules/templates-whatsapp/dto/create-template-whatsapp.dto.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Tamanho: 2311 bytes
- SHA-256: `895475D41861401FF5D297FD7DCFA32E86DD2AB4E00B4F3BC885C059B9CBBD83`
- Numstat: `2	7	beauty-core-backend/src/modules/templates-whatsapp/dto/create-template-whatsapp.dto.ts`
- Decisao candidata: **POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK**
- Sinais: nenhum dos padroes de triagem foi localizado.
- Preview redigido das linhas adicionadas ou iniciais:
  import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
  }

### beauty-core-backend/src/modules/templates-whatsapp/dto/update-template-whatsapp.dto.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Tamanho: 226 bytes
- SHA-256: `224A8A0300D074A733F657F6E3E00E84A559346857187232A07AEA2D1D25BC2A`
- Numstat: `1	1	beauty-core-backend/src/modules/templates-whatsapp/dto/update-template-whatsapp.dto.ts`
- Decisao candidata: **POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK**
- Sinais: nenhum dos padroes de triagem foi localizado.
- Preview redigido das linhas adicionadas ou iniciais:
  ) {}

### beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.controller.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Tamanho: 8887 bytes
- SHA-256: `2AC82F3284789541359DCBE2A2FFE4B4613ADEC204F6D380090C365DF168AC40`
- Numstat: `21	39	beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.controller.ts`
- Decisao candidata: **POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 27)
  - AUTHORIZATION_BOUNDARY (linha 28)
  - AUTHORIZATION_BOUNDARY (linha 39)
  - TENANCY_BOUNDARY (linha 62)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 83)
  - TENANCY_BOUNDARY (linha 87)
  - TENANCY_BOUNDARY (linha 105)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 123)
  - TENANCY_BOUNDARY (linha 125)
  - TENANCY_BOUNDARY (linha 134)
  - TENANCY_BOUNDARY (linha 147)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 172)
  - TENANCY_BOUNDARY (linha 176)
  - TENANCY_BOUNDARY (linha 204)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 229)
  - TENANCY_BOUNDARY (linha 234)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 278)
  - TENANCY_BOUNDARY (linha 282)
  - AUTHORIZATION_BOUNDARY (linha 313)
  - AUTHORIZATION_BOUNDARY (linha 314)
  - AUTHORIZATION_BOUNDARY (linha 325)
  - TENANCY_BOUNDARY (linha 348)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 369)
  - TENANCY_BOUNDARY (linha 370)
  - TENANCY_BOUNDARY (linha 386)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 405)
  - TENANCY_BOUNDARY (linha 406)
  - TENANCY_BOUNDARY (linha 414)
  - TENANCY_BOUNDARY (linha 427)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 452)
  - TENANCY_BOUNDARY (linha 453)
  - TENANCY_BOUNDARY (linha 479)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 506)
  - TENANCY_BOUNDARY (linha 510)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 551)
  - TENANCY_BOUNDARY (linha 552)
- Preview redigido das linhas adicionadas ou iniciais:
      description:
        'Usu├írio sem permiss├úo. Permitido apenas para ADMIN e GERENTE.',
    create(@Req() req: any, @Body() dto: CreateTemplateWhatsAppDto) {
      return this.templatesWhatsappService.create(req.user.empresaId, dto);
      description:
        'Usu├írio sem permiss├úo. Permitido apenas para ADMIN e GERENTE.',
      return this.templatesWhatsappService.findAll(req.user.empresaId);
      description:

### beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.module.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Tamanho: 557 bytes
- SHA-256: `7C6308A4B1C98B9909DA387BF330CDA16162138ED6A7E05F35384FF8987522C4`
- Numstat: `5	14	beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.module.ts`
- Decisao candidata: **POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 4)
  - TENANCY_BOUNDARY (linha 12)
  - TENANCY_BOUNDARY (linha 31)
  - TENANCY_BOUNDARY (linha 37)
- Preview redigido das linhas adicionadas ou iniciais:
    imports: [PrismaModule, TenantModule],
    controllers: [TemplatesWhatsappController],
    providers: [TemplatesWhatsappService],
    exports: [TemplatesWhatsappService],
  export class TemplatesWhatsappModule {}

### beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.service.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Tamanho: 4283 bytes
- SHA-256: `870389CEC10C2CD980567381830ECAAF922CAE8C37E77F6A49CCA8EF7066451A`
- Numstat: `16	29	beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.service.ts`
- Decisao candidata: **POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 8)
  - TENANCY_BOUNDARY (linha 17)
  - TENANCY_BOUNDARY (linha 20)
  - TENANCY_BOUNDARY (linha 21)
  - TENANCY_BOUNDARY (linha 26)
  - TENANCY_BOUNDARY (linha 40)
  - TENANCY_BOUNDARY (linha 49)
  - TENANCY_BOUNDARY (linha 50)
  - TENANCY_BOUNDARY (linha 54)
  - TENANCY_BOUNDARY (linha 63)
  - TENANCY_BOUNDARY (linha 64)
  - TENANCY_BOUNDARY (linha 68)
  - TENANCY_BOUNDARY (linha 72)
  - TENANCY_BOUNDARY (linha 75)
  - TENANCY_BOUNDARY (linha 83)
  - TENANCY_BOUNDARY (linha 102)
  - TENANCY_BOUNDARY (linha 117)
  - TENANCY_BOUNDARY (linha 120)
  - TENANCY_BOUNDARY (linha 121)
  - TENANCY_BOUNDARY (linha 123)
  - TENANCY_BOUNDARY (linha 128)
  - TENANCY_BOUNDARY (linha 141)
  - TENANCY_BOUNDARY (linha 147)
  - TENANCY_BOUNDARY (linha 150)
  - TENANCY_BOUNDARY (linha 155)
  - TENANCY_BOUNDARY (linha 168)
  - TENANCY_BOUNDARY (linha 174)
  - TENANCY_BOUNDARY (linha 192)
  - TENANCY_BOUNDARY (linha 201)
  - TENANCY_BOUNDARY (linha 204)
  - TENANCY_BOUNDARY (linha 205)
  - TENANCY_BOUNDARY (linha 209)
  - TENANCY_BOUNDARY (linha 223)
  - TENANCY_BOUNDARY (linha 232)
  - TENANCY_BOUNDARY (linha 233)
  - TENANCY_BOUNDARY (linha 237)
  - TENANCY_BOUNDARY (linha 246)
  - TENANCY_BOUNDARY (linha 247)
  - TENANCY_BOUNDARY (linha 250)
  - TENANCY_BOUNDARY (linha 251)
  - TENANCY_BOUNDARY (linha 253)
  - TENANCY_BOUNDARY (linha 259)
  - TENANCY_BOUNDARY (linha 279)
  - TENANCY_BOUNDARY (linha 294)
  - TENANCY_BOUNDARY (linha 297)
  - TENANCY_BOUNDARY (linha 298)
  - TENANCY_BOUNDARY (linha 300)
  - TENANCY_BOUNDARY (linha 305)
  - TENANCY_BOUNDARY (linha 317)
  - TENANCY_BOUNDARY (linha 320)
  - TENANCY_BOUNDARY (linha 321)
  - TENANCY_BOUNDARY (linha 326)
  - TENANCY_BOUNDARY (linha 339)
  - TENANCY_BOUNDARY (linha 345)
- Preview redigido das linhas adicionadas ou iniciais:
      const templateExistente = await this.prisma.templateWhatsApp.findFirst({
        where: {
          empresaId,
          nome: dto.nome,
          ativo: true,
        },
      });
    async update(empresaId: string, id: string, dto: UpdateTemplateWhatsAppDto) {

### beauty-core-backend/src/modules/tenant-publico/public-tenant.controller.ts

- Tipo: `HIGH`
- Categoria: `TENANCY`
- Status Git: ` M`
- Tamanho: 2060 bytes
- SHA-256: `D64653C46C6E566BF82047F9BA869DC68BE2091C6A78CAB9BF8B2D7AA92A8711`
- Numstat: `3	7	beauty-core-backend/src/modules/tenant-publico/public-tenant.controller.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 9)
  - TENANCY_BOUNDARY (linha 11)
  - TENANCY_BOUNDARY (linha 12)
  - TENANCY_BOUNDARY (linha 13)
  - TENANCY_BOUNDARY (linha 15)
  - TENANCY_BOUNDARY (linha 20)
  - TENANCY_BOUNDARY (linha 22)
  - TENANCY_BOUNDARY (linha 27)
  - TENANCY_BOUNDARY (linha 30)
  - TENANCY_BOUNDARY (linha 47)
  - TENANCY_BOUNDARY (linha 48)
  - TENANCY_BOUNDARY (linha 50)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 50)
  - TENANCY_BOUNDARY (linha 82)
  - TENANCY_BOUNDARY (linha 84)
  - TENANCY_BOUNDARY (linha 85)
  - TENANCY_BOUNDARY (linha 86)
  - TENANCY_BOUNDARY (linha 87)
  - TENANCY_BOUNDARY (linha 91)
  - TENANCY_BOUNDARY (linha 93)
  - TENANCY_BOUNDARY (linha 98)
  - TENANCY_BOUNDARY (linha 101)
  - TENANCY_BOUNDARY (linha 118)
  - TENANCY_BOUNDARY (linha 119)
  - TENANCY_BOUNDARY (linha 121)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 121)
- Preview redigido das linhas adicionadas ou iniciais:
    constructor(private readonly tenantPublicService: TenantPublicService) {}
            dados?.portalClienteAtivo ?? dados?.ativoPortal ?? true,
  }

### beauty-core-backend/src/modules/tenant-publico/tenant-publico.controller.ts

- Tipo: `HIGH`
- Categoria: `TENANCY`
- Status Git: ` M`
- Tamanho: 2001 bytes
- SHA-256: `64BFF59F431191AA71CEE0B681AB25B59566B341BE6E7C985012CC8C6185831C`
- Numstat: `3	10	beauty-core-backend/src/modules/tenant-publico/tenant-publico.controller.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 9)
  - TENANCY_BOUNDARY (linha 11)
  - TENANCY_BOUNDARY (linha 12)
  - TENANCY_BOUNDARY (linha 13)
  - TENANCY_BOUNDARY (linha 15)
  - TENANCY_BOUNDARY (linha 30)
  - TENANCY_BOUNDARY (linha 45)
  - TENANCY_BOUNDARY (linha 52)
  - TENANCY_BOUNDARY (linha 64)
  - TENANCY_BOUNDARY (linha 68)
  - TENANCY_BOUNDARY (linha 77)
  - TENANCY_BOUNDARY (linha 79)
  - TENANCY_BOUNDARY (linha 80)
  - TENANCY_BOUNDARY (linha 81)
  - TENANCY_BOUNDARY (linha 82)
  - TENANCY_BOUNDARY (linha 96)
  - TENANCY_BOUNDARY (linha 111)
  - TENANCY_BOUNDARY (linha 118)
  - TENANCY_BOUNDARY (linha 130)
  - TENANCY_BOUNDARY (linha 134)
- Preview redigido das linhas adicionadas ou iniciais:
  import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
    constructor(private readonly tenantPublicService: TenantPublicService) {}
  }

### beauty-core-backend/src/modules/tenant-publico/tenant-publico.module.ts

- Tipo: `HIGH`
- Categoria: `TENANCY`
- Status Git: ` M`
- Tamanho: 392 bytes
- SHA-256: `8C97907BD286048DB30509216A6028E43842D6632209CDB4119EA5285AD32E6D`
- Numstat: `3	8	beauty-core-backend/src/modules/tenant-publico/tenant-publico.module.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 3)
  - TENANCY_BOUNDARY (linha 5)
  - TENANCY_BOUNDARY (linha 6)
  - TENANCY_BOUNDARY (linha 10)
  - TENANCY_BOUNDARY (linha 14)
  - TENANCY_BOUNDARY (linha 15)
  - TENANCY_BOUNDARY (linha 18)
  - TENANCY_BOUNDARY (linha 21)
  - TENANCY_BOUNDARY (linha 23)
  - TENANCY_BOUNDARY (linha 24)
  - TENANCY_BOUNDARY (linha 27)
  - TENANCY_BOUNDARY (linha 29)
  - TENANCY_BOUNDARY (linha 31)
- Preview redigido das linhas adicionadas ou iniciais:
    imports: [TenantModule],
    controllers: [TenantPublicoController, PublicTenantController],
  export class TenantPublicoModule {}

### beauty-core-backend/src/modules/usuarios/policies/usuario-role.policy.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 5632 bytes
- SHA-256: `08347731362FF870A2BD6D183030E3BC0B0860E74223A07135F589F0FAC3710D`
- Numstat: `2	4	beauty-core-backend/src/modules/usuarios/policies/usuario-role.policy.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 163)
  - TENANCY_BOUNDARY (linha 171)
  - TENANCY_BOUNDARY (linha 180)
  - TENANCY_BOUNDARY (linha 192)
  - TENANCY_BOUNDARY (linha 201)
  - TENANCY_BOUNDARY (linha 203)
  - TENANCY_BOUNDARY (linha 370)
  - TENANCY_BOUNDARY (linha 378)
  - TENANCY_BOUNDARY (linha 387)
  - TENANCY_BOUNDARY (linha 399)
  - TENANCY_BOUNDARY (linha 408)
  - TENANCY_BOUNDARY (linha 410)
- Preview redigido das linhas adicionadas ou iniciais:
        throw new ForbiddenException('Usu├írio n├úo pode alterar a pr├│pria role.');
  }

### beauty-core-backend/src/queues/jobs/whatsapp.job.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Tamanho: 433 bytes
- SHA-256: `C8DE51C47FA88BA5B9F681E025D721C2842528C6B971AE3DE36BD1112B1D0F3D`
- Numstat: `1	1	beauty-core-backend/src/queues/jobs/whatsapp.job.ts`
- Decisao candidata: **POTENTIAL_CHAT04_META_SCOPE_REQUIRES_CONTRACT_CHECK**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 2)
  - TENANCY_BOUNDARY (linha 26)
- Preview redigido das linhas adicionadas ou iniciais:
  }

### beauty-core-backend/src/shared/decorators/roles.decorator.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 163 bytes
- SHA-256: `82FF16CE8FB2BED6968D205E407E129B81DE1C0CB25560F601523A97B41115E0`
- Numstat: `1	2	beauty-core-backend/src/shared/decorators/roles.decorator.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais: nenhum dos padroes de triagem foi localizado.
- Preview redigido das linhas adicionadas ou iniciais:
  export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

### beauty-core-backend/src/shared/tenant/index.ts

- Tipo: `HIGH`
- Categoria: `TENANCY`
- Status Git: ` M`
- Tamanho: 121 bytes
- SHA-256: `B423999E1F5D7AAFA8294EBAED31FBECF1094E9AC56A508016B135B7728FE892`
- Numstat: `1	1	beauty-core-backend/src/shared/tenant/index.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 1)
  - TENANCY_BOUNDARY (linha 2)
  - TENANCY_BOUNDARY (linha 3)
  - TENANCY_BOUNDARY (linha 4)
  - TENANCY_BOUNDARY (linha 5)
  - TENANCY_BOUNDARY (linha 6)
- Preview redigido das linhas adicionadas ou iniciais:
  export * from './tenant-public.service';

### beauty-core-backend/src/shared/tenant/tenant-public.service.ts

- Tipo: `HIGH`
- Categoria: `TENANCY`
- Status Git: ` M`
- Tamanho: 3179 bytes
- SHA-256: `94F53F8F10E526F131F803CEA902BDB2895AA9FEEED3D41E64A00B49F86B11FB`
- Numstat: `7	20	beauty-core-backend/src/shared/tenant/tenant-public.service.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 10)
  - TENANCY_BOUNDARY (linha 38)
  - TENANCY_BOUNDARY (linha 66)
  - TENANCY_BOUNDARY (linha 69)
  - TENANCY_BOUNDARY (linha 124)
  - TENANCY_BOUNDARY (linha 134)
  - TENANCY_BOUNDARY (linha 153)
  - TENANCY_BOUNDARY (linha 179)
  - TENANCY_BOUNDARY (linha 205)
  - TENANCY_BOUNDARY (linha 208)
  - TENANCY_BOUNDARY (linha 254)
  - TENANCY_BOUNDARY (linha 264)
- Preview redigido das linhas adicionadas ou iniciais:
        throw new NotFoundException('Empresa n├úo encontrada ou inativa.');
        throw new NotFoundException('Empresa n├úo encontrada ou inativa.');
    async resolverTenantPublico(params: { slug?: string; dominio?: string }) {
      throw new BadRequestException('Informe o slug ou dom├¡nio da empresa.');
        throw new BadRequestException('Dom├¡nio da empresa ├® obrigat├│rio.');
        throw new BadRequestException('Dom├¡nio da empresa ├® obrigat├│rio.');
  }

### beauty-core-backend/src/shared/tenant/tenant-validator.service.ts

- Tipo: `HIGH`
- Categoria: `TENANCY`
- Status Git: ` M`
- Tamanho: 8357 bytes
- SHA-256: `26A36C25B30EA6826D70355DB6C1B829FD01F5C94E4D1D02E38E0F50E377C6F7`
- Numstat: `17	21	beauty-core-backend/src/shared/tenant/tenant-validator.service.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 11)
  - TENANCY_BOUNDARY (linha 14)
  - TENANCY_BOUNDARY (linha 15)
  - TENANCY_BOUNDARY (linha 19)
  - TENANCY_BOUNDARY (linha 38)
  - TENANCY_BOUNDARY (linha 39)
  - TENANCY_BOUNDARY (linha 45)
  - TENANCY_BOUNDARY (linha 50)
  - TENANCY_BOUNDARY (linha 68)
  - TENANCY_BOUNDARY (linha 69)
  - TENANCY_BOUNDARY (linha 75)
  - TENANCY_BOUNDARY (linha 80)
  - TENANCY_BOUNDARY (linha 95)
  - TENANCY_BOUNDARY (linha 96)
  - TENANCY_BOUNDARY (linha 102)
  - TENANCY_BOUNDARY (linha 106)
  - TENANCY_BOUNDARY (linha 120)
  - TENANCY_BOUNDARY (linha 121)
  - TENANCY_BOUNDARY (linha 127)
  - TENANCY_BOUNDARY (linha 135)
  - TENANCY_BOUNDARY (linha 153)
  - TENANCY_BOUNDARY (linha 154)
  - TENANCY_BOUNDARY (linha 160)
  - TENANCY_BOUNDARY (linha 166)
  - TENANCY_BOUNDARY (linha 184)
  - TENANCY_BOUNDARY (linha 185)
  - TENANCY_BOUNDARY (linha 191)
  - TENANCY_BOUNDARY (linha 195)
  - TENANCY_BOUNDARY (linha 215)
  - TENANCY_BOUNDARY (linha 216)
  - TENANCY_BOUNDARY (linha 222)
  - TENANCY_BOUNDARY (linha 227)
  - TENANCY_BOUNDARY (linha 242)
  - TENANCY_BOUNDARY (linha 243)
  - TENANCY_BOUNDARY (linha 249)
  - TENANCY_BOUNDARY (linha 254)
  - TENANCY_BOUNDARY (linha 271)
  - TENANCY_BOUNDARY (linha 272)
  - TENANCY_BOUNDARY (linha 278)
  - TENANCY_BOUNDARY (linha 285)
  - TENANCY_BOUNDARY (linha 308)
  - TENANCY_BOUNDARY (linha 311)
  - TENANCY_BOUNDARY (linha 321)
  - TENANCY_BOUNDARY (linha 326)
  - TENANCY_BOUNDARY (linha 361)
  - TENANCY_BOUNDARY (linha 364)
  - TENANCY_BOUNDARY (linha 365)
  - TENANCY_BOUNDARY (linha 369)
  - TENANCY_BOUNDARY (linha 388)
  - TENANCY_BOUNDARY (linha 389)
  - TENANCY_BOUNDARY (linha 395)
  - TENANCY_BOUNDARY (linha 400)
  - TENANCY_BOUNDARY (linha 418)
  - TENANCY_BOUNDARY (linha 419)
  - TENANCY_BOUNDARY (linha 425)
  - TENANCY_BOUNDARY (linha 430)
  - TENANCY_BOUNDARY (linha 445)
  - TENANCY_BOUNDARY (linha 446)
  - TENANCY_BOUNDARY (linha 452)
  - TENANCY_BOUNDARY (linha 456)
  - TENANCY_BOUNDARY (linha 470)
  - TENANCY_BOUNDARY (linha 471)
  - TENANCY_BOUNDARY (linha 477)
  - TENANCY_BOUNDARY (linha 485)
  - TENANCY_BOUNDARY (linha 503)
  - TENANCY_BOUNDARY (linha 504)
  - TENANCY_BOUNDARY (linha 510)
  - TENANCY_BOUNDARY (linha 516)
  - TENANCY_BOUNDARY (linha 534)
  - TENANCY_BOUNDARY (linha 535)
  - TENANCY_BOUNDARY (linha 541)
  - TENANCY_BOUNDARY (linha 545)
  - TENANCY_BOUNDARY (linha 565)
  - TENANCY_BOUNDARY (linha 566)
  - TENANCY_BOUNDARY (linha 572)
  - TENANCY_BOUNDARY (linha 577)
  - TENANCY_BOUNDARY (linha 592)
  - TENANCY_BOUNDARY (linha 593)
  - TENANCY_BOUNDARY (linha 599)
  - TENANCY_BOUNDARY (linha 604)
  - TENANCY_BOUNDARY (linha 621)
  - TENANCY_BOUNDARY (linha 622)
  - TENANCY_BOUNDARY (linha 628)
  - TENANCY_BOUNDARY (linha 635)
  - TENANCY_BOUNDARY (linha 658)
  - TENANCY_BOUNDARY (linha 661)
  - TENANCY_BOUNDARY (linha 667)
  - TENANCY_BOUNDARY (linha 672)
- Preview redigido das linhas adicionadas ou iniciais:
      this.validarIdObrigatorio(categoriaFinanceiraId, 'categoriaFinanceiraId');

      const categoria = await this.prisma.categoriaFinanceira.findFirst({
        where: {
          id: categoriaFinanceiraId,
          empresaId,
          ativo: true,
        },

### beauty-core-backend/src/shared/tenant/tenant.module.ts

- Tipo: `HIGH`
- Categoria: `TENANCY`
- Status Git: ` M`
- Tamanho: 448 bytes
- SHA-256: `A74AE1C8BA7DA546A7C9619C1C3EB600FBE7BF50240C15B02921BC6C202298F4`
- Numstat: `4	12	beauty-core-backend/src/shared/tenant/tenant.module.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 5)
  - TENANCY_BOUNDARY (linha 6)
  - TENANCY_BOUNDARY (linha 14)
  - TENANCY_BOUNDARY (linha 15)
  - TENANCY_BOUNDARY (linha 19)
  - TENANCY_BOUNDARY (linha 20)
  - TENANCY_BOUNDARY (linha 23)
  - TENANCY_BOUNDARY (linha 28)
  - TENANCY_BOUNDARY (linha 29)
  - TENANCY_BOUNDARY (linha 34)
  - TENANCY_BOUNDARY (linha 36)
  - TENANCY_BOUNDARY (linha 38)
- Preview redigido das linhas adicionadas ou iniciais:
    imports: [PrismaModule],
    providers: [TenantValidatorService, TenantPublicService],
    exports: [TenantValidatorService, TenantPublicService],
  export class TenantModule {}

### beauty-core-backend/src/shared/utils/get-empresa-id.ts

- Tipo: `HIGH`
- Categoria: `TENANCY`
- Status Git: ` M`
- Tamanho: 282 bytes
- SHA-256: `0CDDDCC54FA3CD753A06DDB948DAEA4AF9AE2E432E619F1F140F441B4C5E27A5`
- Numstat: `1	1	beauty-core-backend/src/shared/utils/get-empresa-id.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 3)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 3)
  - TENANCY_BOUNDARY (linha 4)
  - TENANCY_BOUNDARY (linha 6)
  - TENANCY_BOUNDARY (linha 10)
  - TENANCY_BOUNDARY (linha 14)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 14)
  - TENANCY_BOUNDARY (linha 15)
  - TENANCY_BOUNDARY (linha 17)
  - TENANCY_BOUNDARY (linha 21)
- Preview redigido das linhas adicionadas ou iniciais:
  }

### beauty-core-backend/test/e2e/auditoria.e2e-spec.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 1242 bytes
- SHA-256: `48F0BFE5138A8CB8C4E0CBCD3A487E2A15483739BE14E7D08D8606B9509C0014`
- Numstat: `6	4	beauty-core-backend/test/e2e/auditoria.e2e-spec.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - DYNAMIC_TYPE_OR_UNSAFE (linha 22)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 26)
  - QUEUE_WORKER (linha 33)
  - QUEUE_WORKER (linha 37)
  - AUTHORIZATION_BOUNDARY (linha 38)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 71)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 75)
  - QUEUE_WORKER (linha 82)
  - QUEUE_WORKER (linha 86)
  - AUTHORIZATION_BOUNDARY (linha 87)
- Preview redigido das linhas adicionadas ou iniciais:
  import {
    bootstrapE2eTestApp,
    E2eContext,
    teardownE2eTestApp,
  } from '../setup-e2e';
        take: 5,

### beauty-core-backend/test/e2e/auth-admin.e2e-spec.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 2887 bytes
- SHA-256: `4C5D055E1DF47C2D8BD8C5CD42C7DDC988A03FD936C6DCC708CC716F396DD291`
- Numstat: `17	7	beauty-core-backend/test/e2e/auth-admin.e2e-spec.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 47)
  - AUTHORIZATION_BOUNDARY (linha 54)
  - AUTHORIZATION_BOUNDARY (linha 66)
  - AUTHORIZATION_BOUNDARY (linha 75)
  - AUTHORIZATION_BOUNDARY (linha 77)
  - AUTHORIZATION_BOUNDARY (linha 89)
  - AUTHORIZATION_BOUNDARY (linha 149)
  - AUTHORIZATION_BOUNDARY (linha 156)
  - AUTHORIZATION_BOUNDARY (linha 168)
  - AUTHORIZATION_BOUNDARY (linha 179)
  - AUTHORIZATION_BOUNDARY (linha 181)
  - AUTHORIZATION_BOUNDARY (linha 193)
- Preview redigido das linhas adicionadas ou iniciais:
  import {
    bootstrapE2eTestApp,
    E2eContext,
    teardownE2eTestApp,
  } from '../setup-e2e';
          senha: TEST_PASSWORD,
      expect(
        response.body.access_token ??

### beauty-core-backend/test/e2e/auth-cliente.e2e-spec.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 3736 bytes
- SHA-256: `C2D5D43FEEB2E5F5F4CB72367B1FB94039029FCC9D32AFA9D42FDF793823F747`
- Numstat: `39	14	beauty-core-backend/test/e2e/auth-cliente.e2e-spec.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 18)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 34)
  - TENANCY_BOUNDARY (linha 36)
  - AUTHORIZATION_BOUNDARY (linha 64)
  - AUTHORIZATION_BOUNDARY (linha 71)
  - AUTHORIZATION_BOUNDARY (linha 83)
  - AUTHORIZATION_BOUNDARY (linha 92)
  - AUTHORIZATION_BOUNDARY (linha 94)
  - AUTHORIZATION_BOUNDARY (linha 106)
  - AUTHORIZATION_BOUNDARY (linha 134)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 152)
  - TENANCY_BOUNDARY (linha 154)
  - AUTHORIZATION_BOUNDARY (linha 190)
  - AUTHORIZATION_BOUNDARY (linha 197)
  - AUTHORIZATION_BOUNDARY (linha 213)
  - AUTHORIZATION_BOUNDARY (linha 226)
  - AUTHORIZATION_BOUNDARY (linha 228)
  - AUTHORIZATION_BOUNDARY (linha 244)
- Preview redigido das linhas adicionadas ou iniciais:
  import {
    bootstrapE2eTestApp,
    E2eContext,
    teardownE2eTestApp,
  } from '../setup-e2e';
        .post(
          '/public/' + ctx.seed.empresaA.slug + '/auth-cliente/solicitar-codigo',
        )

### beauty-core-backend/test/e2e/multiempresa.e2e-spec.ts

- Tipo: `HIGH`
- Categoria: `TENANCY`
- Status Git: ` M`
- Tamanho: 2280 bytes
- SHA-256: `27E66C2AE476686C248154C5C4DB27118BDAC4726A28C4CA49D0820E16AD6609`
- Numstat: `17	11	beauty-core-backend/test/e2e/multiempresa.e2e-spec.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 8)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 21)
  - TENANCY_BOUNDARY (linha 23)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 32)
  - TENANCY_BOUNDARY (linha 34)
  - AUTHORIZATION_BOUNDARY (linha 55)
  - AUTHORIZATION_BOUNDARY (linha 64)
  - TENANCY_BOUNDARY (linha 85)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 98)
  - TENANCY_BOUNDARY (linha 100)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 109)
  - TENANCY_BOUNDARY (linha 111)
  - AUTHORIZATION_BOUNDARY (linha 133)
  - AUTHORIZATION_BOUNDARY (linha 142)
- Preview redigido das linhas adicionadas ou iniciais:
  import {
    bootstrapE2eTestApp,
    E2eContext,
    teardownE2eTestApp,
  } from '../setup-e2e';
          ativo: true,
        },
          aceitouTermos: true,

### beauty-core-backend/test/e2e/roles.e2e-spec.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 1247 bytes
- SHA-256: `510236D36490A12E19CC87B86DDE584C142C7E349170DA6364F1E12BC9D5362A`
- Numstat: `6	4	beauty-core-backend/test/e2e/roles.e2e-spec.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 33)
  - AUTHORIZATION_BOUNDARY (linha 77)
- Preview redigido das linhas adicionadas ou iniciais:
  import {
    bootstrapE2eTestApp,
    E2eContext,
    teardownE2eTestApp,
  } from '../setup-e2e';
      ['SUPER_ADMIN', TEST_EMAILS.superAdmin, [200]],

### beauty-core-backend/test/e2e/swagger-validation.e2e-spec.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 916 bytes
- SHA-256: `622CAB6EAED9EF8C62C8AE7FE3254F652171AD6BA24D25AA4A7B4333FFA2D138`
- Numstat: `6	4	beauty-core-backend/test/e2e/swagger-validation.e2e-spec.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais: nenhum dos padroes de triagem foi localizado.
- Preview redigido das linhas adicionadas ou iniciais:
  import {
    bootstrapE2eTestApp,
    E2eContext,
    teardownE2eTestApp,
  } from '../setup-e2e';
          campoInvasor: true,

### beauty-core-backend/test/e2e/tenant.e2e-spec.ts

- Tipo: `HIGH`
- Categoria: `TENANCY`
- Status Git: ` M`
- Tamanho: 1117 bytes
- SHA-256: `EA4CE84CF494BC1C580D47377F79BF6A478CAFC6E4FA9E7EE9F1FE3D267D4227`
- Numstat: `6	4	beauty-core-backend/test/e2e/tenant.e2e-spec.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 4)
  - TENANCY_BOUNDARY (linha 6)
  - TENANCY_BOUNDARY (linha 18)
  - TENANCY_BOUNDARY (linha 23)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 30)
  - TENANCY_BOUNDARY (linha 36)
  - TENANCY_BOUNDARY (linha 51)
  - TENANCY_BOUNDARY (linha 53)
  - TENANCY_BOUNDARY (linha 65)
  - TENANCY_BOUNDARY (linha 70)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 77)
  - TENANCY_BOUNDARY (linha 83)
- Preview redigido das linhas adicionadas ou iniciais:
  import {
    bootstrapE2eTestApp,
    E2eContext,
    teardownE2eTestApp,
  } from '../setup-e2e';
        data: { ativo: false },

### beauty-core-backend/test/helpers/auth.helper.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 3716 bytes
- SHA-256: `C3D90A18E9822B86DB451D54F08AEAC91604404BD7B6B41FF81E0C7EE531BC66`
- Numstat: `15	10	beauty-core-backend/test/helpers/auth.helper.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 9)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 11)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 21)
  - POTENTIAL_SECRET_LITERAL (linha 22)
  - AUTHORIZATION_BOUNDARY (linha 23)
  - AUTHORIZATION_BOUNDARY (linha 29)
  - AUTHORIZATION_BOUNDARY (linha 102)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 111)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 112)
  - AUTHORIZATION_BOUNDARY (linha 149)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 151)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 161)
  - POTENTIAL_SECRET_LITERAL (linha 162)
  - AUTHORIZATION_BOUNDARY (linha 163)
  - AUTHORIZATION_BOUNDARY (linha 169)
  - AUTHORIZATION_BOUNDARY (linha 247)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 256)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 257)
- Preview redigido das linhas adicionadas ou iniciais:
      raw: body,
    options?: { forceNew?: boolean },
      throw new Error(
        'Rate limit em /auth/login sem token em cache para ' + email,
      );
  export async function loginSuperAdmin(
    app: INestApplication,
    options?: { forceNew?: boolean },

### beauty-core-backend/test/unit/auth-guards.coverage.spec.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 1361 bytes
- SHA-256: `245163B4320D5145BFB05BC254021E0BDE5E6983C89E493402F35A13B98FCD2E`
- Numstat: `12	6	beauty-core-backend/test/unit/auth-guards.coverage.spec.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - AUTHORIZATION_BOUNDARY (linha 2)
  - AUTHORIZATION_BOUNDARY (linha 6)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 10)
  - AUTHORIZATION_BOUNDARY (linha 14)
  - AUTHORIZATION_BOUNDARY (linha 18)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 22)
  - AUTHORIZATION_BOUNDARY (linha 26)
  - AUTHORIZATION_BOUNDARY (linha 30)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 34)
  - AUTHORIZATION_BOUNDARY (linha 39)
  - AUTHORIZATION_BOUNDARY (linha 44)
  - AUTHORIZATION_BOUNDARY (linha 53)
  - AUTHORIZATION_BOUNDARY (linha 58)
  - AUTHORIZATION_BOUNDARY (linha 67)
  - AUTHORIZATION_BOUNDARY (linha 72)
- Preview redigido das linhas adicionadas ou iniciais:
      const GuardClass =
        mod.JwtAuthGuard ??
        Object.values(mod).find((value) => typeof value === 'function');
        new GuardClass();
      const GuardClass =
        mod.ClienteAuthGuard ??
        Object.values(mod).find((value) => typeof value === 'function');
        new GuardClass();

### beauty-core-backend/test/unit/env-validation-cors.spec.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 1256 bytes
- SHA-256: `A2E41A552B137DF1F3B5AE6D40625DCA58D4D08B990075A9466A241646074D5E`
- Numstat: `5	4	beauty-core-backend/test/unit/env-validation-cors.spec.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - PUBLIC_ORIGIN_RISK (linha 5)
  - AUTHORIZATION_BOUNDARY (linha 10)
  - PUBLIC_ORIGIN_RISK (linha 45)
  - AUTHORIZATION_BOUNDARY (linha 50)
- Preview redigido das linhas adicionadas ou iniciais:
        /CORS_ORIGIN/,
        /CORS_ORIGIN/,
        baseEnv({
          CORS_ORIGIN: 'https://app.exemplo.com,https://admin.exemplo.com',
        }),

### beauty-core-backend/test/unit/env-validation-required.spec.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 1944 bytes
- SHA-256: `C725EF8C2C88A347631A03FCDC62160BCC497E73E7A2585967BC93D7D57B3867`
- Numstat: `6	7	beauty-core-backend/test/unit/env-validation-required.spec.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - PUBLIC_ORIGIN_RISK (linha 5)
  - AUTHORIZATION_BOUNDARY (linha 10)
  - AUTHORIZATION_BOUNDARY (linha 20)
  - AUTHORIZATION_BOUNDARY (linha 21)
  - AUTHORIZATION_BOUNDARY (linha 22)
  - AUTHORIZATION_BOUNDARY (linha 26)
  - AUTHORIZATION_BOUNDARY (linha 27)
  - AUTHORIZATION_BOUNDARY (linha 28)
  - AUTHORIZATION_BOUNDARY (linha 59)
  - PUBLIC_ORIGIN_RISK (linha 69)
  - AUTHORIZATION_BOUNDARY (linha 74)
  - AUTHORIZATION_BOUNDARY (linha 84)
  - AUTHORIZATION_BOUNDARY (linha 85)
  - AUTHORIZATION_BOUNDARY (linha 86)
  - AUTHORIZATION_BOUNDARY (linha 90)
  - AUTHORIZATION_BOUNDARY (linha 91)
  - AUTHORIZATION_BOUNDARY (linha 92)
  - AUTHORIZATION_BOUNDARY (linha 123)
- Preview redigido das linhas adicionadas ou iniciais:
        /OTP_SECRET/,
        /OTP_SECRET/,
        /REDIS_PASSWORD/,
        /REDIS_PASSWORD/,
        /METRICS_TOKEN/,
        /METRICS_TOKEN/,

### beauty-core-backend/test/unit/tenant-services.coverage.spec.ts

- Tipo: `HIGH`
- Categoria: `TENANCY`
- Status Git: ` M`
- Tamanho: 1078 bytes
- SHA-256: `A624C56BA689D08D722B74871F1277744A731756A8B76B4E412602676BF9D312`
- Numstat: `1	1	beauty-core-backend/test/unit/tenant-services.coverage.spec.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 1)
  - TENANCY_BOUNDARY (linha 2)
  - TENANCY_BOUNDARY (linha 3)
  - TENANCY_BOUNDARY (linha 8)
  - MOCK_OR_SIMULATION (linha 8)
  - TENANCY_BOUNDARY (linha 9)
  - TENANCY_BOUNDARY (linha 13)
  - MOCK_OR_SIMULATION (linha 18)
  - MOCK_OR_SIMULATION (linha 34)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 34)
  - TENANCY_BOUNDARY (linha 38)
  - TENANCY_BOUNDARY (linha 39)
  - TENANCY_BOUNDARY (linha 40)
  - TENANCY_BOUNDARY (linha 45)
  - MOCK_OR_SIMULATION (linha 45)
  - TENANCY_BOUNDARY (linha 46)
  - TENANCY_BOUNDARY (linha 50)
  - MOCK_OR_SIMULATION (linha 55)
  - MOCK_OR_SIMULATION (linha 71)
- Preview redigido das linhas adicionadas ou iniciais:
        new ServiceClass(prismaMock);

### beauty-core-backend/test/unit/tenant-validator.spec.ts

- Tipo: `HIGH`
- Categoria: `TENANCY`
- Status Git: ` M`
- Tamanho: 4874 bytes
- SHA-256: `F1B3EAF139FE0C03BCA139B03E964DB623647F2881927197BA195C0F6699A039`
- Numstat: `4	4	beauty-core-backend/test/unit/tenant-validator.spec.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - TENANCY_BOUNDARY (linha 1)
  - TENANCY_BOUNDARY (linha 2)
  - TENANCY_BOUNDARY (linha 5)
  - MOCK_OR_SIMULATION (linha 8)
  - TENANCY_BOUNDARY (linha 60)
  - MOCK_OR_SIMULATION (linha 63)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 63)
  - TENANCY_BOUNDARY (linha 68)
  - MOCK_OR_SIMULATION (linha 68)
  - MOCK_OR_SIMULATION (linha 69)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 69)
  - MOCK_OR_SIMULATION (linha 78)
  - MOCK_OR_SIMULATION (linha 79)
  - TENANCY_BOUNDARY (linha 89)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 94)
  - MOCK_OR_SIMULATION (linha 95)
  - MOCK_OR_SIMULATION (linha 96)
  - MOCK_OR_SIMULATION (linha 97)
  - MOCK_OR_SIMULATION (linha 100)
  - MOCK_OR_SIMULATION (linha 101)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 103)
  - TENANCY_BOUNDARY (linha 119)
  - MOCK_OR_SIMULATION (linha 127)
  - MOCK_OR_SIMULATION (linha 133)
  - MOCK_OR_SIMULATION (linha 134)
  - TENANCY_BOUNDARY (linha 138)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 143)
  - MOCK_OR_SIMULATION (linha 144)
  - MOCK_OR_SIMULATION (linha 145)
  - MOCK_OR_SIMULATION (linha 146)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 149)
  - TENANCY_BOUNDARY (linha 160)
  - TENANCY_BOUNDARY (linha 166)
  - TENANCY_BOUNDARY (linha 167)
  - TENANCY_BOUNDARY (linha 170)
  - MOCK_OR_SIMULATION (linha 173)
  - TENANCY_BOUNDARY (linha 225)
  - MOCK_OR_SIMULATION (linha 228)
  - TENANCY_BOUNDARY (linha 233)
  - MOCK_OR_SIMULATION (linha 233)
  - MOCK_OR_SIMULATION (linha 234)
  - MOCK_OR_SIMULATION (linha 243)
  - MOCK_OR_SIMULATION (linha 244)
  - TENANCY_BOUNDARY (linha 254)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 259)
  - MOCK_OR_SIMULATION (linha 260)
  - MOCK_OR_SIMULATION (linha 261)
  - MOCK_OR_SIMULATION (linha 262)
  - MOCK_OR_SIMULATION (linha 265)
  - MOCK_OR_SIMULATION (linha 266)
  - TENANCY_BOUNDARY (linha 284)
  - MOCK_OR_SIMULATION (linha 292)
  - MOCK_OR_SIMULATION (linha 298)
  - MOCK_OR_SIMULATION (linha 299)
  - TENANCY_BOUNDARY (linha 303)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 308)
  - MOCK_OR_SIMULATION (linha 309)
  - MOCK_OR_SIMULATION (linha 310)
  - MOCK_OR_SIMULATION (linha 311)
  - TENANCY_BOUNDARY (linha 325)
- Preview redigido das linhas adicionadas ou iniciais:
      const service = new ServiceClass(createPrismaMock());
      const service = new ServiceClass(createPrismaMock());
      const service = new ServiceClass(prisma);
      const service = new ServiceClass(prisma);

### beauty-core-backend/test/unit/usuario-role-policy.coverage.spec.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 3366 bytes
- SHA-256: `4AB5521A671EC0C11B0092F9D652A8E68E6426526077C710450CC2DD10A61E98`
- Numstat: `12	4	beauty-core-backend/test/unit/usuario-role-policy.coverage.spec.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - DYNAMIC_TYPE_OR_UNSAFE (linha 4)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 8)
  - TENANCY_BOUNDARY (linha 71)
  - TENANCY_BOUNDARY (linha 72)
  - TENANCY_BOUNDARY (linha 75)
  - TENANCY_BOUNDARY (linha 76)
  - TENANCY_BOUNDARY (linha 79)
  - TENANCY_BOUNDARY (linha 80)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 104)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 108)
  - TENANCY_BOUNDARY (linha 179)
  - TENANCY_BOUNDARY (linha 180)
  - TENANCY_BOUNDARY (linha 183)
  - TENANCY_BOUNDARY (linha 184)
  - TENANCY_BOUNDARY (linha 187)
  - TENANCY_BOUNDARY (linha 188)
- Preview redigido das linhas adicionadas ou iniciais:
              callables.push([
                exportName + '.' + staticName,
                value[staticName].bind(value),
              ]);
            for (const methodName of Object.getOwnPropertyNames(
              Object.getPrototypeOf(instance),
            )) {
                callables.push([

### beauty-core-backend/test/unit/usuario-role-policy.spec.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Tamanho: 4264 bytes
- SHA-256: `0875F676D58E869D28FA86AFF97722B63C3063D33CBD0E1767F1B3D3772B298B`
- Numstat: `13	9	beauty-core-backend/test/unit/usuario-role-policy.spec.ts`
- Decisao candidata: **REVIEW_SECURITY_AND_MULTI_TENANT_REGRESSION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - DYNAMIC_TYPE_OR_UNSAFE (linha 4)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 8)
  - MOCK_OR_SIMULATION (linha 14)
  - MOCK_OR_SIMULATION (linha 25)
  - TENANCY_BOUNDARY (linha 72)
  - TENANCY_BOUNDARY (linha 73)
  - TENANCY_BOUNDARY (linha 76)
  - TENANCY_BOUNDARY (linha 77)
  - TENANCY_BOUNDARY (linha 80)
  - TENANCY_BOUNDARY (linha 81)
  - MOCK_OR_SIMULATION (linha 111)
  - MOCK_OR_SIMULATION (linha 116)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 138)
  - DYNAMIC_TYPE_OR_UNSAFE (linha 142)
  - MOCK_OR_SIMULATION (linha 148)
  - MOCK_OR_SIMULATION (linha 162)
  - TENANCY_BOUNDARY (linha 214)
  - TENANCY_BOUNDARY (linha 215)
  - TENANCY_BOUNDARY (linha 218)
  - TENANCY_BOUNDARY (linha 219)
  - TENANCY_BOUNDARY (linha 222)
  - TENANCY_BOUNDARY (linha 223)
  - MOCK_OR_SIMULATION (linha 249)
  - MOCK_OR_SIMULATION (linha 254)
- Preview redigido das linhas adicionadas ou iniciais:
              entries.push([
                exportName + '.' + staticName,
                staticValue.bind(value),
              ]);
            for (const methodName of Object.getOwnPropertyNames(
              Object.getPrototypeOf(instance),
            )) {
                entries.push([

### beauty-core-backend/prisma/migrations/20260909150000_meta_whatsapp_webhook/migration.sql

- Tipo: `HIGH`
- Categoria: `PRISMA_MIGRATION`
- Status Git: `??`
- Tamanho: 878 bytes
- SHA-256: `017C26C0A9B0DF3D4BBBF6482F0B20BFDD43AAF617515099267C9A87DEFFD493`
- Numstat: `untracked`
- Decisao candidata: **UNTRACKED_REQUIRES_EXPLICIT_DECISION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - META_AUTH_OR_WEBHOOK (linha 2)
  - META_AUTH_OR_WEBHOOK (linha 6)
  - META_AUTH_OR_WEBHOOK (linha 15)
  - META_AUTH_OR_WEBHOOK (linha 18)
  - META_AUTH_OR_WEBHOOK (linha 19)
  - META_AUTH_OR_WEBHOOK (linha 20)
- Preview redigido das linhas adicionadas ou iniciais:
  - ALTER TABLE "MensagemWhatsApp" ADD COLUMN "metaMessageId" TEXT;
  - ALTER TABLE "MensagemWhatsApp" ADD COLUMN "metaStatus" TEXT;
  - ALTER TABLE "MensagemWhatsApp" ADD COLUMN "metaStatusUpdatedAt" TIMESTAMP(3);
  - CREATE TABLE "MetaWhatsappWebhookEvent" (
  - "id" TEXT NOT NULL,
  - "eventKey" TEXT NOT NULL,

### beauty-core-backend/test/e2e/meta-whatsapp-webhook.e2e-spec.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: `??`
- Tamanho: 3306 bytes
- SHA-256: `0E1D8B3621AC39FDD9A09340429967096B923AC8BCDBF68D9741E9FB797AAB9C`
- Numstat: `untracked`
- Decisao candidata: **UNTRACKED_REQUIRES_EXPLICIT_DECISION**
- Sinais encontrados (somente nome e linha, sem valores sensiveis):
  - POTENTIAL_SECRET_LITERAL (linha 5)
  - POTENTIAL_SECRET_LITERAL (linha 6)
  - META_AUTH_OR_WEBHOOK (linha 14)
  - META_AUTH_OR_WEBHOOK (linha 27)
  - META_AUTH_OR_WEBHOOK (linha 31)
  - META_AUTH_OR_WEBHOOK (linha 36)
  - META_AUTH_OR_WEBHOOK (linha 40)
  - TENANCY_BOUNDARY (linha 48)
  - META_AUTH_OR_WEBHOOK (linha 52)
  - META_AUTH_OR_WEBHOOK (linha 54)
  - META_AUTH_OR_WEBHOOK (linha 61)
  - META_AUTH_OR_WEBHOOK (linha 85)
  - META_AUTH_OR_WEBHOOK (linha 87)
  - META_AUTH_OR_WEBHOOK (linha 94)
  - META_AUTH_OR_WEBHOOK (linha 96)
  - META_AUTH_OR_WEBHOOK (linha 109)
  - META_AUTH_OR_WEBHOOK (linha 111)
- Preview redigido das linhas adicionadas ou iniciais:
  - import request from 'supertest';
  - import { createHmac } from 'node:crypto';
  - process.env.META_WHATSAPP_APP_SECRET = '[REDACTED]';
  - process.env.META_WHATSAPP_VERIFY_TOKEN = '[REDACTED]';
  - import {
  - bootstrapE2eTestApp,

## 5. Pendencias encaminhadas para o proximo gate

1. Revisar cada decisao candidata com base no diff real, contrato existente, testes e escopo do Chat 04.
2. Separar explicitamente alteracoes intencionais do Chat 04, ruido legado e mudancas sem autorizacao de escopo.
3. Decidir o destino dos dois untracked: migration Meta/WhatsApp e teste E2E correspondente.
4. Confirmar que nenhum segredo, token, credencial ou dado real sera incorporado a commit, ZIP ou relatorio.
5. Somente apos a revisao e autorizacao preparar o bloco de sincronizacao, sem executar push neste bloco.

## 6. Resultado do gate

**PASS-SEMANTIC-AUDIT-REVIEW-REQUIRED**

A auditoria dos 85 caminhos HIGH e dos 2 untracked foi executada com as quantidades esperadas. A revisao semantica e a decisao de escopo continuam obrigatorias antes de qualquer stage, commit ou push.
