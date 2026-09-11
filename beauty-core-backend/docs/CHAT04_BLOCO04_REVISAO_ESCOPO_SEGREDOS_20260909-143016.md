# BEAUTY CORE 1.0 - CHAT 04 - BLOCO 04 - REVISAO DE ESCOPO E SEGREDOS

- Data/hora: 2026-09-09 14:30:16 -03:00
- Projeto: `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core`
- Branch: `main`
- HEAD: `9374f86e05e522a501cbcec3bf14175cd46e3b47`
- HEAD esperado do Chat 03: `9374f86e05e522a501cbcec3bf14175cd46e3b47`
- Relatorio fonte: `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\docs\CHAT04_BLOCO03_AUDITORIA_SEMANTICA_HIGH_20260909-142130.md`

> Auditoria somente leitura. Nenhum caminho foi stageado, removido, resetado, commitado, enviado ou publicado.
> Este documento nao autoriza commit/push e nao substitui revisao humana do escopo.

## 1. Gates

| Gate | Esperado | Obtido | Resultado |
|---|---:|---:|---|
| Caminhos preservados | 261 | 261 | PASS |
| Alvos importados do Bloco 03 | 85 | 85 | PASS |
| Untracked preservados | 2 | 2 | PASS |
| Staged preservados | 0 | 0 | PASS |
| git diff --check | exit 0 | 0 | PASS |
| git diff --cached --check | exit 0 | 0 | PASS |

## 2. Resumo da revisao

- Arquivos com referencia a chave sensivel nas linhas adicionadas: **11**.
- Arquivos com possivel literal real que exige verificacao/rotacao: **1**. Nenhum valor foi impresso.
- Arquivos com valor de teste/placeholder: **0**.
- Os sinais acima sao triagem automatica; a decisao final depende de confirmar se o valor e real, de teste ou apenas contrato vazio.

### Candidatos de escopo

| Classificacao candidata | Quantidade |
|---|---:|
| CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF | 17 |
| CHAT04_META_WEBHOOK_CANDIDATE_REQUIRES_EXPLICIT_APPROVAL | 2 |
| LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | 53 |
| REVIEW_ENV_CONTRACT_ONLY_NO_REAL_VALUES | 5 |
| RUNTIME_OR_SCHEMA_IMPACT_REQUIRES_LINKED_EVIDENCE | 8 |

## 3. Matriz de escopo, segredo e diff

| Tipo | Categoria | Status | Escopo candidato | Segredo | Caminho | SHA-256 |
|---|---|---|---|---|---|---|
| HIGH | ENV_EXAMPLE |  M | REVIEW_ENV_CONTRACT_ONLY_NO_REAL_VALUES | SENSITIVE_KEY_REFERENCE_WITHOUT_DETECTED_LITERAL | beauty-core-backend/.env.dev.example | `131C5B0885879D0D4CFBA7FADCC58D268D57C4C42039CBB082E123B9770746EC` |
| HIGH | ENV_EXAMPLE |  M | REVIEW_ENV_CONTRACT_ONLY_NO_REAL_VALUES | SENSITIVE_KEY_REFERENCE_WITHOUT_DETECTED_LITERAL | beauty-core-backend/.env.example | `0A1C76118F68902BC8A9FC79F839A51E812BF06AE9BDDE1792E780D78DAD7F2C` |
| HIGH | ENV_EXAMPLE |  M | REVIEW_ENV_CONTRACT_ONLY_NO_REAL_VALUES | SENSITIVE_KEY_REFERENCE_WITHOUT_DETECTED_LITERAL | beauty-core-backend/.env.prod.example | `24B99960D699C2EEC035380CBE66B157C72F60FD4226350E9ECF3D717BB9FB9D` |
| HIGH | ENV_EXAMPLE |  M | REVIEW_ENV_CONTRACT_ONLY_NO_REAL_VALUES | SENSITIVE_KEY_REFERENCE_WITHOUT_DETECTED_LITERAL | beauty-core-backend/.env.production.example | `9C7C4883D96E599AF0707120DC8282D6869B28B79D6D478D4625FAAB46525C07` |
| HIGH | ENV_EXAMPLE |  M | REVIEW_ENV_CONTRACT_ONLY_NO_REAL_VALUES | SENSITIVE_KEY_REFERENCE_WITHOUT_DETECTED_LITERAL | beauty-core-backend/.env.staging.example | `C33553D62BB95F8B44AE0FB54B67574C6BD90894E904AAB072F67B2BA0116159` |
| HIGH | PRISMA_SCHEMA |  M | RUNTIME_OR_SCHEMA_IMPACT_REQUIRES_LINKED_EVIDENCE | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/prisma/schema.prisma | `39ED45846507617518A633F55CF363CA7FA849E9E974F5E175D66C20185DF89B` |
| HIGH | CORE_INFRA |  M | RUNTIME_OR_SCHEMA_IMPACT_REQUIRES_LINKED_EVIDENCE | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/app.module.ts | `135872BCAE3815925D347CBC98A52B90B5B7B3431C565069967D1E8A8E917ECE` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/common/filters/http-exception.filter.ts | `CA492592C252224AD6B0B2B15B613F9C5575B74A7DCD184682996F55D0A502B6` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/common/interceptors/audit-log.interceptor.ts | `6AA7E8455D3B0454A43FEA4F1913C6A14322E052DDF89221FDD7D358C1DFE3BF` |
| HIGH | CORE_INFRA |  M | RUNTIME_OR_SCHEMA_IMPACT_REQUIRES_LINKED_EVIDENCE | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/common/metrics/guards/metrics-auth.guard.ts | `F0F73695E17C407FDB98C0C621B3716BE0052FAAA0B9392FA26C956AF05ED3A0` |
| HIGH | CORE_INFRA |  M | RUNTIME_OR_SCHEMA_IMPACT_REQUIRES_LINKED_EVIDENCE | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/common/metrics/metrics.controller.ts | `D943F67135FDDCD7345A62E2F2827347B803008FAA6687D32F0CE54F32DE5877` |
| HIGH | CORE_INFRA |  M | RUNTIME_OR_SCHEMA_IMPACT_REQUIRES_LINKED_EVIDENCE | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/common/metrics/metrics.module.ts | `337BF684DD7190489FCAC67E5840EA9D18ED9F00060EE2FA3E7162148905FC27` |
| HIGH | CORE_INFRA |  M | RUNTIME_OR_SCHEMA_IMPACT_REQUIRES_LINKED_EVIDENCE | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/common/metrics/metrics.service.ts | `C5955D9BB1E8B2910903BBE74CDF2A24ABC0FAAEE432E519AB2A72C34A4FFE54` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/config/env.validation.ts | `5DAC6650C81EC8A7F2748A9F485F34D447E0C08D36A5EA1D084CF56F5AC10786` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/config/swagger.config.ts | `1566D89D65F9774125715F805B77A24833A7C09FB29BCC45662C6083B2703B58` |
| HIGH | CORE_INFRA |  M | RUNTIME_OR_SCHEMA_IMPACT_REQUIRES_LINKED_EVIDENCE | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/database/prisma/prisma.module.ts | `0F3C00B776B61BE00A1FA7BE51EF977F597CDBFC8322CCE3397CFDD35A1FA4A2` |
| HIGH | CORE_INFRA |  M | RUNTIME_OR_SCHEMA_IMPACT_REQUIRES_LINKED_EVIDENCE | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/database/prisma/prisma.service.ts | `7959EFB964BAAE1417E628C1ABDC2FE52000564057206D716D1D5515003BB16E` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/main.ts | `0385652D70F2B31AA67456A5AC5815FEF7079B5F9390D60D2753AA94EE25350B` |
| HIGH | META_WHATSAPP |  M | CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/area-cliente/dto/enviar-portal-mensagem-whatsapp.dto.ts | `F34896380001DD5FE877FC6E38453D9899723FF66114BDDE6D755D045DE6B935` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/auditoria/auditoria.controller.ts | `BD932D2FB94DD684FD03EAE1551FF85B902E9CECB7A819B7DA068F5F73E61190` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/auditoria/auditoria.module.ts | `91E7B605C77A96CD4C5468A7EA7C08D9C864B56901904DF10403676EA32AD4C4` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/auditoria/auditoria.service.ts | `0FE399695B959BFB1771DD7032451026416EA7A51238D8A6DA1E88E72E599301` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/auditoria/dto/create-auditoria.dto.ts | `9C1251EF42A8A7F9F7E0C917182FF0E424149618B180A902F6DF1363119CC483` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/auditoria/dto/filtros-auditoria.dto.ts | `2A416E823F7BB734FBA6C26FE4DE5308DB5888537B552CBCD4317FC1AFDB3B1B` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/auth-cliente/auth-cliente-publico.controller.ts | `217307E40C296D532279AB7671CA69A72A5022B6BA0C4AE978AA6E289918EC33` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/auth-cliente/auth-cliente.controller.ts | `998066D5743AE1DC7B320279753A8189EE670DA1AE8170919716D3EAF8B2CBD6` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/auth-cliente/auth-cliente.module.ts | `5297F4E335D3EBF07A8360E1FB0C5FFEDC441E12B99AEEC6A51DBEA4096661F5` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | SENSITIVE_KEY_REFERENCE_WITHOUT_DETECTED_LITERAL | beauty-core-backend/src/modules/auth-cliente/auth-cliente.service.ts | `0ECA2C9115B3AD7B903766B93C9FF38A17F2D89D5D51F62874B6C33FBEE4C0EB` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/auth-cliente/dto/aceitar-termos.dto.ts | `6E60C127148391768FB1389CE60C8E7CCB4AAF829AB3C8E4C6B20DF5E8733B41` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/auth-cliente/dto/refresh-cliente-token.dto.ts | `1E15D8C1B530E539A289E15D61DD46EEED57B563AB52C71A89642CD86551AE9E` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/auth-cliente/dto/solicitar-codigo.dto.ts | `F25D1D651ACA25635E57351CB993C7D442E1717EDA126D59D239E8566CE30DFD` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/auth-cliente/dto/verificar-codigo.dto.ts | `F2741C34E2BB9196F5CE5EDACC2447884ED909616647C117D7FDE2D8828DD990` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/auth-cliente/guards/cliente-auth.guard.ts | `E88A4F193BAB7769EFBB6B4E225337D1725FB98D07863E63FBB76D5D5BA1E610` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/auth-cliente/strategies/cliente-jwt.strategy.ts | `B98E374709ED18CCEA7A800100EBA5DFF4F691BC436577DE107D7573F275D369` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/auth/auth.controller.ts | `F81AD37841C83612B3D9C13F37D8A9CAC31980EF64C8FF04DB92CDACCCBEC119` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/auth/auth.module.ts | `4B7F27B3C5CB698F1B11579B324B8FF3C485DBCDBC98AE5484415888A1C67A8C` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | SENSITIVE_KEY_REFERENCE_WITHOUT_DETECTED_LITERAL | beauty-core-backend/src/modules/auth/auth.service.ts | `5E7EABC6E22DD5DD353B148ACC2BD179834721A15B6973CB0F4928940745D437` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/auth/dto/login.dto.ts | `2C22B4E72AD9C2690029F40DB1E36310E7EFDD639C9A3AC97D70C4C0EBB9DE90` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/auth/dto/refresh-token.dto.ts | `75A2F45778CAA36AD8B6D126FD14458FDDA3F682983AD5AF2827C48521BEA539` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/auth/guards/jwt-auth.guard.ts | `86F01FC8F2C8DC7A5D29859DEE9467CCB4A7611FC82A79BEEE69FC71EFCE4308` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/auth/guards/roles.guard.ts | `657A4365F2A1978F94BDEE89ACE1D9060FA73696633E0766BD84003138A45460` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/auth/strategies/jwt.strategy.ts | `B44B60C9C193FF28E55CEDE868947DD61BA74F5CDB306B7791A46547CEF67D8B` |
| HIGH | META_WHATSAPP |  M | CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.controller.ts | `F0E59BE9DE129AD6F49C7F9B70D8600EB967A7121BBB4A12E69FED0E5A352279` |
| HIGH | META_WHATSAPP |  M | CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.module.ts | `8287245D4AB20C970EF2D283F80103E603B6377967DE4266E10F50B760E37240` |
| HIGH | META_WHATSAPP |  M | CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts | `07E642F96C0536CA7711FB7D3D06AEEB1C8C4C32FF3AACDC2637197B2A825441` |
| HIGH | META_WHATSAPP |  M | CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/campanhas-whatsapp/dto/create-campanha-whatsapp.dto.ts | `F7BDE1330D623EA4D6B41B1364311862E1A42883ACC8DED8AC9CFF1E03B089BD` |
| HIGH | META_WHATSAPP |  M | CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/campanhas-whatsapp/dto/update-campanha-whatsapp.dto.ts | `EB1D92042DA43BB902D554D56B2652ED6A33AA2B90B1BB08D13F27880C75D9D7` |
| HIGH | META_WHATSAPP |  M | CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.controller.ts | `BEA6005ED6DE9650DB9E919AB2D01BCEDA123F45DC1F23D21C151D5822673939` |
| HIGH | META_WHATSAPP |  M | CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.module.ts | `8AB1C9390080253E22FB19CFC092C3448A8028AD2740FEDAD3322D223B2E3F89` |
| HIGH | META_WHATSAPP |  M | CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts | `E58DF8C68BD5165FC211BBEE543EEDA80F1E777DDAB6DD974F1350EC68CDA55D` |
| HIGH | META_WHATSAPP |  M | CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/configuracao-whatsapp/dto/create-configuracao-whatsapp.dto.ts | `4833514FF0C36CB03C739F1D0D09BE2A5CA773258073067DC4E8B39D22D52B13` |
| HIGH | META_WHATSAPP |  M | CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/configuracao-whatsapp/dto/update-configuracao-whatsapp.dto.ts | `461C5F9726077B53D7AB7FE44C72A7EDDA4F1D11DB090AC7B79C9A7022FA0E3E` |
| HIGH | META_WHATSAPP |  M | CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/templates-whatsapp/dto/create-template-whatsapp.dto.ts | `895475D41861401FF5D297FD7DCFA32E86DD2AB4E00B4F3BC885C059B9CBBD83` |
| HIGH | META_WHATSAPP |  M | CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/templates-whatsapp/dto/update-template-whatsapp.dto.ts | `224A8A0300D074A733F657F6E3E00E84A559346857187232A07AEA2D1D25BC2A` |
| HIGH | META_WHATSAPP |  M | CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.controller.ts | `2AC82F3284789541359DCBE2A2FFE4B4613ADEC204F6D380090C365DF168AC40` |
| HIGH | META_WHATSAPP |  M | CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.module.ts | `7C6308A4B1C98B9909DA387BF330CDA16162138ED6A7E05F35384FF8987522C4` |
| HIGH | META_WHATSAPP |  M | CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.service.ts | `870389CEC10C2CD980567381830ECAAF922CAE8C37E77F6A49CCA8EF7066451A` |
| HIGH | TENANCY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/tenant-publico/public-tenant.controller.ts | `D64653C46C6E566BF82047F9BA869DC68BE2091C6A78CAB9BF8B2D7AA92A8711` |
| HIGH | TENANCY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/tenant-publico/tenant-publico.controller.ts | `64BFF59F431191AA71CEE0B681AB25B59566B341BE6E7C985012CC8C6185831C` |
| HIGH | TENANCY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/tenant-publico/tenant-publico.module.ts | `8C97907BD286048DB30509216A6028E43842D6632209CDB4119EA5285AD32E6D` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/modules/usuarios/policies/usuario-role.policy.ts | `08347731362FF870A2BD6D183030E3BC0B0860E74223A07135F589F0FAC3710D` |
| HIGH | META_WHATSAPP |  M | CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/queues/jobs/whatsapp.job.ts | `C8DE51C47FA88BA5B9F681E025D721C2842528C6B971AE3DE36BD1112B1D0F3D` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/shared/decorators/roles.decorator.ts | `82FF16CE8FB2BED6968D205E407E129B81DE1C0CB25560F601523A97B41115E0` |
| HIGH | TENANCY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/shared/tenant/index.ts | `B423999E1F5D7AAFA8294EBAED31FBECF1094E9AC56A508016B135B7728FE892` |
| HIGH | TENANCY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/shared/tenant/tenant-public.service.ts | `94F53F8F10E526F131F803CEA902BDB2895AA9FEEED3D41E64A00B49F86B11FB` |
| HIGH | TENANCY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/shared/tenant/tenant-validator.service.ts | `26A36C25B30EA6826D70355DB6C1B829FD01F5C94E4D1D02E38E0F50E377C6F7` |
| HIGH | TENANCY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/shared/tenant/tenant.module.ts | `A74AE1C8BA7DA546A7C9619C1C3EB600FBE7BF50240C15B02921BC6C202298F4` |
| HIGH | TENANCY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/src/shared/utils/get-empresa-id.ts | `0CDDDCC54FA3CD753A06DDB948DAEA4AF9AE2E432E619F1F140F441B4C5E27A5` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/test/e2e/auditoria.e2e-spec.ts | `48F0BFE5138A8CB8C4E0CBCD3A487E2A15483739BE14E7D08D8606B9509C0014` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | SENSITIVE_KEY_REFERENCE_WITHOUT_DETECTED_LITERAL | beauty-core-backend/test/e2e/auth-admin.e2e-spec.ts | `4C5D055E1DF47C2D8BD8C5CD42C7DDC988A03FD936C6DCC708CC716F396DD291` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/test/e2e/auth-cliente.e2e-spec.ts | `C2D5D43FEEB2E5F5F4CB72367B1FB94039029FCC9D32AFA9D42FDF793823F747` |
| HIGH | TENANCY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | SENSITIVE_KEY_REFERENCE_WITHOUT_DETECTED_LITERAL | beauty-core-backend/test/e2e/multiempresa.e2e-spec.ts | `27E66C2AE476686C248154C5C4DB27118BDAC4726A28C4CA49D0820E16AD6609` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/test/e2e/roles.e2e-spec.ts | `510236D36490A12E19CC87B86DDE584C142C7E349170DA6364F1E12BC9D5362A` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/test/e2e/swagger-validation.e2e-spec.ts | `622CAB6EAED9EF8C62C8AE7FE3254F652171AD6BA24D25AA4A7B4333FFA2D138` |
| HIGH | TENANCY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/test/e2e/tenant.e2e-spec.ts | `EA4CE84CF494BC1C580D47377F79BF6A478CAFC6E4FA9E7EE9F1FE3D267D4227` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/test/helpers/auth.helper.ts | `C3D90A18E9822B86DB451D54F08AEAC91604404BD7B6B41FF81E0C7EE531BC66` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/test/unit/auth-guards.coverage.spec.ts | `245163B4320D5145BFB05BC254021E0BDE5E6983C89E493402F35A13B98FCD2E` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/test/unit/env-validation-cors.spec.ts | `A2E41A552B137DF1F3B5AE6D40625DCA58D4D08B990075A9466A241646074D5E` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | SENSITIVE_KEY_REFERENCE_WITHOUT_DETECTED_LITERAL | beauty-core-backend/test/unit/env-validation-required.spec.ts | `C725EF8C2C88A347631A03FCDC62160BCC497E73E7A2585967BC93D7D57B3867` |
| HIGH | TENANCY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/test/unit/tenant-services.coverage.spec.ts | `A624C56BA689D08D722B74871F1277744A731756A8B76B4E412602676BF9D312` |
| HIGH | TENANCY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/test/unit/tenant-validator.spec.ts | `F1B3EAF139FE0C03BCA139B03E964DB623647F2881927197BA195C0F6699A039` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/test/unit/usuario-role-policy.coverage.spec.ts | `4AB5521A671EC0C11B0092F9D652A8E68E6426526077C710450CC2DD10A61E98` |
| HIGH | AUTH_SECURITY |  M | LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/test/unit/usuario-role-policy.spec.ts | `0875F676D58E869D28FA86AFF97722B63C3063D33CBD0E1767F1B3D3772B298B` |
| HIGH | PRISMA_MIGRATION | ?? | CHAT04_META_WEBHOOK_CANDIDATE_REQUIRES_EXPLICIT_APPROVAL | NO_SENSITIVE_KEY_IN_ADDED_LINES | beauty-core-backend/prisma/migrations/20260909150000_meta_whatsapp_webhook/migration.sql | `017C26C0A9B0DF3D4BBBF6482F0B20BFDD43AAF617515099267C9A87DEFFD493` |
| HIGH | META_WHATSAPP | ?? | CHAT04_META_WEBHOOK_CANDIDATE_REQUIRES_EXPLICIT_APPROVAL | POTENTIAL_LITERAL_REQUIRES_MANUAL_ROTATION_CHECK | beauty-core-backend/test/e2e/meta-whatsapp-webhook.e2e-spec.ts | `0E1D8B3621AC39FDD9A09340429967096B923AC8BCDBF68D9741E9FB797AAB9C` |

## 4. Detalhamento dos alvos

### beauty-core-backend/.env.dev.example

- Tipo: `HIGH`
- Categoria: `ENV_EXAMPLE`
- Status Git: ` M`
- Numstat: `5	1	beauty-core-backend/.env.dev.example`
- Escopo candidato: **REVIEW_ENV_CONTRACT_ONLY_NO_REAL_VALUES**
- Avaliacao de segredo: SENSITIVE_KEY_REFERENCE_WITHOUT_DETECTED_LITERAL
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY, QUEUE_WORKER
- Preview redigido das linhas adicionadas ou iniciais:
  - NODE_ENV=development
  - # Meta WhatsApp Cloud API webhook (secrets via secret manager; values intentionally empty)
  - META_WHATSAPP_APP_SECRET=
  - META_WHATSAPP_VERIFY_TOKEN=

### beauty-core-backend/.env.example

- Tipo: `HIGH`
- Categoria: `ENV_EXAMPLE`
- Status Git: ` M`
- Numstat: `5	1	beauty-core-backend/.env.example`
- Escopo candidato: **REVIEW_ENV_CONTRACT_ONLY_NO_REAL_VALUES**
- Avaliacao de segredo: SENSITIVE_KEY_REFERENCE_WITHOUT_DETECTED_LITERAL
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY, QUEUE_WORKER
- Preview redigido das linhas adicionadas ou iniciais:
  - # =========================================================
  - # Meta WhatsApp Cloud API webhook (secrets via secret manager; values intentionally empty)
  - META_WHATSAPP_APP_SECRET=
  - META_WHATSAPP_VERIFY_TOKEN=

### beauty-core-backend/.env.prod.example

- Tipo: `HIGH`
- Categoria: `ENV_EXAMPLE`
- Status Git: ` M`
- Numstat: `5	1	beauty-core-backend/.env.prod.example`
- Escopo candidato: **REVIEW_ENV_CONTRACT_ONLY_NO_REAL_VALUES**
- Avaliacao de segredo: SENSITIVE_KEY_REFERENCE_WITHOUT_DETECTED_LITERAL
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY, QUEUE_WORKER
- Preview redigido das linhas adicionadas ou iniciais:
  - NODE_ENV=production
  - # Meta WhatsApp Cloud API webhook (secrets via secret manager; values intentionally empty)
  - META_WHATSAPP_APP_SECRET=
  - META_WHATSAPP_VERIFY_TOKEN=

### beauty-core-backend/.env.production.example

- Tipo: `HIGH`
- Categoria: `ENV_EXAMPLE`
- Status Git: ` M`
- Numstat: `5	1	beauty-core-backend/.env.production.example`
- Escopo candidato: **REVIEW_ENV_CONTRACT_ONLY_NO_REAL_VALUES**
- Avaliacao de segredo: SENSITIVE_KEY_REFERENCE_WITHOUT_DETECTED_LITERAL
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY
- Preview redigido das linhas adicionadas ou iniciais:
  - NODE_ENV=production
  - # Meta WhatsApp Cloud API webhook (secrets via secret manager; values intentionally empty)
  - META_WHATSAPP_APP_SECRET=
  - META_WHATSAPP_VERIFY_TOKEN=

### beauty-core-backend/.env.staging.example

- Tipo: `HIGH`
- Categoria: `ENV_EXAMPLE`
- Status Git: ` M`
- Numstat: `5	1	beauty-core-backend/.env.staging.example`
- Escopo candidato: **REVIEW_ENV_CONTRACT_ONLY_NO_REAL_VALUES**
- Avaliacao de segredo: SENSITIVE_KEY_REFERENCE_WITHOUT_DETECTED_LITERAL
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY, QUEUE_WORKER
- Preview redigido das linhas adicionadas ou iniciais:
  - NODE_ENV=production
  - # Meta WhatsApp Cloud API webhook (secrets via secret manager; values intentionally empty)
  - META_WHATSAPP_APP_SECRET=
  - META_WHATSAPP_VERIFY_TOKEN=

### beauty-core-backend/prisma/schema.prisma

- Tipo: `HIGH`
- Categoria: `PRISMA_SCHEMA`
- Status Git: ` M`
- Numstat: `18	0	beauty-core-backend/prisma/schema.prisma`
- Escopo candidato: **RUNTIME_OR_SCHEMA_IMPACT_REQUIRES_LINKED_EVIDENCE**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY, SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - metaMessageId        String?
  - metaStatus           String?
  - metaStatusUpdatedAt  DateTime?
  - model MetaWhatsappWebhookEvent {
  - id          String    @id @default(uuid())
  - eventKey    String    @unique

### beauty-core-backend/src/app.module.ts

- Tipo: `HIGH`
- Categoria: `CORE_INFRA`
- Status Git: ` M`
- Numstat: `0	4	beauty-core-backend/src/app.module.ts`
- Escopo candidato: **RUNTIME_OR_SCHEMA_IMPACT_REQUIRES_LINKED_EVIDENCE**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY, QUEUE_WORKER, SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - [nenhuma linha capturada]

### beauty-core-backend/src/common/filters/http-exception.filter.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `1	3	beauty-core-backend/src/common/filters/http-exception.filter.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - request.correlationId ?? responseCorrelationId ?? requestId;

### beauty-core-backend/src/common/interceptors/audit-log.interceptor.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `7	22	beauty-core-backend/src/common/interceptors/audit-log.interceptor.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY, QUEUE_WORKER, E2E_TEST
- Preview redigido das linhas adicionadas ou iniciais:
  - intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
  - ? (user?.clienteId ?? user?.sub ?? user?.id)
  - const requestId = contextData?.requestId ?? request.requestId;
  - contextData?.correlationId ?? request.correlationId ?? requestId;
  - mensagem: error?.message ?? 'Falha durante requisi├º├úo HTTP.',
  - private deveAuditar(rota: string, metodoHttp: string): boolean {

### beauty-core-backend/src/common/metrics/guards/metrics-auth.guard.ts

- Tipo: `HIGH`
- Categoria: `CORE_INFRA`
- Status Git: ` M`
- Numstat: `4	1	beauty-core-backend/src/common/metrics/guards/metrics-auth.guard.ts`
- Escopo candidato: **RUNTIME_OR_SCHEMA_IMPACT_REQUIRES_LINKED_EVIDENCE**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY
- Preview redigido das linhas adicionadas ou iniciais:
  - private safeTokenEquals(
  - receivedToken: string,
  - expectedToken: string,
  - ): boolean {

### beauty-core-backend/src/common/metrics/metrics.controller.ts

- Tipo: `HIGH`
- Categoria: `CORE_INFRA`
- Status Git: ` M`
- Numstat: `4	2	beauty-core-backend/src/common/metrics/metrics.controller.ts`
- Escopo candidato: **RUNTIME_OR_SCHEMA_IMPACT_REQUIRES_LINKED_EVIDENCE**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY, QUEUE_WORKER
- Preview redigido das linhas adicionadas ou iniciais:
  - return value
  - .replace(/\\/g, '\\\\')
  - .replace(/"/g, '\\"')
  - .replace(/\n/g, '\\n');

### beauty-core-backend/src/common/metrics/metrics.module.ts

- Tipo: `HIGH`
- Categoria: `CORE_INFRA`
- Status Git: ` M`
- Numstat: `0	1	beauty-core-backend/src/common/metrics/metrics.module.ts`
- Escopo candidato: **RUNTIME_OR_SCHEMA_IMPACT_REQUIRES_LINKED_EVIDENCE**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: NO_TARGET_SIGNAL
- Preview redigido das linhas adicionadas ou iniciais:
  - [nenhuma linha capturada]

### beauty-core-backend/src/common/metrics/metrics.service.ts

- Tipo: `HIGH`
- Categoria: `CORE_INFRA`
- Status Git: ` M`
- Numstat: `23	30	beauty-core-backend/src/common/metrics/metrics.service.ts`
- Escopo candidato: **RUNTIME_OR_SCHEMA_IMPACT_REQUIRES_LINKED_EVIDENCE**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: E2E_TEST
- Preview redigido das linhas adicionadas ou iniciais:
  - 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10,
  - lines.push(
  - '# HELP beauty_core_app_info Beauty Core application information.',
  - );
  - lines.push(
  - '# HELP beauty_core_http_requests_total Total HTTP requests received by the API.',

### beauty-core-backend/src/config/env.validation.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `1	1	beauty-core-backend/src/config/env.validation.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY, E2E_TEST
- Preview redigido das linhas adicionadas ou iniciais:
  - }

### beauty-core-backend/src/config/swagger.config.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `1	1	beauty-core-backend/src/config/swagger.config.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY
- Preview redigido das linhas adicionadas ou iniciais:
  - }

### beauty-core-backend/src/database/prisma/prisma.module.ts

- Tipo: `HIGH`
- Categoria: `CORE_INFRA`
- Status Git: ` M`
- Numstat: `1	1	beauty-core-backend/src/database/prisma/prisma.module.ts`
- Escopo candidato: **RUNTIME_OR_SCHEMA_IMPACT_REQUIRES_LINKED_EVIDENCE**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - export class PrismaModule {}

### beauty-core-backend/src/database/prisma/prisma.service.ts

- Tipo: `HIGH`
- Categoria: `CORE_INFRA`
- Status Git: ` M`
- Numstat: `1	1	beauty-core-backend/src/database/prisma/prisma.service.ts`
- Escopo candidato: **RUNTIME_OR_SCHEMA_IMPACT_REQUIRES_LINKED_EVIDENCE**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: SCHEMA_MIGRATION, E2E_TEST
- Preview redigido das linhas adicionadas ou iniciais:
  - }

### beauty-core-backend/src/main.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `7	10	beauty-core-backend/src/main.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY, E2E_TEST
- Preview redigido das linhas adicionadas ou iniciais:
  - throw new Error('CORS_ORIGIN n├úo pode conter * em produ├º├úo.');
  - function createRequestContextMiddleware(requestContext: RequestContextService) {
  - const correlationId = getHeaderValue(req, 'x-correlation-id') ?? requestId;
  - const app = await NestFactory.create(AppModule, {
  - bufferLogs: true,
  - rawBody: true,

### beauty-core-backend/src/modules/area-cliente/dto/enviar-portal-mensagem-whatsapp.dto.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Numstat: `2	2	beauty-core-backend/src/modules/area-cliente/dto/enviar-portal-mensagem-whatsapp.dto.ts`
- Escopo candidato: **CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK, SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - import { TipoMensagemWhatsApp } from '@prisma/client';
  - import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';

### beauty-core-backend/src/modules/auditoria/auditoria.controller.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `26	42	beauty-core-backend/src/modules/auditoria/auditoria.controller.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY, QUEUE_WORKER
- Preview redigido das linhas adicionadas ou iniciais:
  - import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
  - constructor(private readonly auditoriaService: AuditoriaService) {}
  - description:
  - 'Data inicial opcional para filtrar os registros de auditoria.',
  - description:
  - 'Usu├írio sem permiss├úo. Permitido apenas para ADMIN e GERENTE.',

### beauty-core-backend/src/modules/auditoria/auditoria.module.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `5	13	beauty-core-backend/src/modules/auditoria/auditoria.module.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - imports: [PrismaModule],
  - controllers: [AuditoriaController],
  - providers: [AuditoriaService],
  - exports: [AuditoriaService],
  - export class AuditoriaModule {}

### beauty-core-backend/src/modules/auditoria/auditoria.service.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `27	43	beauty-core-backend/src/modules/auditoria/auditoria.service.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY, QUEUE_WORKER, SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - status: 'SUCESSO',
  - status: 'FALHA',
  - acao: 'LOGIN_ADMIN',
  - status: data.status ?? 'SUCESSO',
  - acao: 'LOGIN_CLIENTE',
  - tipoUsuario: data.tipoUsuario ?? 'CLIENTE',

### beauty-core-backend/src/modules/auditoria/dto/create-auditoria.dto.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `1	1	beauty-core-backend/src/modules/auditoria/dto/create-auditoria.dto.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY, SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - }

### beauty-core-backend/src/modules/auditoria/dto/filtros-auditoria.dto.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `2	7	beauty-core-backend/src/modules/auditoria/dto/filtros-auditoria.dto.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK, QUEUE_WORKER, SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
  - }

### beauty-core-backend/src/modules/auth-cliente/auth-cliente-publico.controller.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `3	11	beauty-core-backend/src/modules/auth-cliente/auth-cliente-publico.controller.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY
- Preview redigido das linhas adicionadas ou iniciais:
  - import { Body, Controller, Param, Post, Req } from '@nestjs/common';
  - constructor(private readonly authClienteService: AuthClienteService) {}
  - }

### beauty-core-backend/src/modules/auth-cliente/auth-cliente.controller.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `9	34	beauty-core-backend/src/modules/auth-cliente/auth-cliente.controller.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY
- Preview redigido das linhas adicionadas ou iniciais:
  - import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
  - constructor(private readonly authClienteService: AuthClienteService) {}
  - description: 'Slug p├â┬║blico da empresa. Informe slug ou dom├â┬¡nio.',
  - solicitarCodigo(@Req() req: any, @Body() dto: SolicitarCodigoDto) {
  - description: 'Slug p├â┬║blico da empresa. Informe slug ou dom├â┬¡nio.',
  - verificarCodigo(@Req() req: any, @Body() dto: VerificarCodigoDto) {

### beauty-core-backend/src/modules/auth-cliente/auth-cliente.module.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `4	12	beauty-core-backend/src/modules/auth-cliente/auth-cliente.module.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY, SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - controllers: [AuthClienteController, AuthClientePublicoController],
  - providers: [AuthClienteService, ClienteJwtStrategy],
  - exports: [AuthClienteService],
  - export class AuthClienteModule {}

### beauty-core-backend/src/modules/auth-cliente/auth-cliente.service.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `37	55	beauty-core-backend/src/modules/auth-cliente/auth-cliente.service.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: SENSITIVE_KEY_REFERENCE_WITHOUT_DETECTED_LITERAL
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY, SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - import {
  - durationToDate,
  - durationToSeconds,
  - } from '../../shared/utils/duration.util';
  - secret: this.configService.getOrThrow<string>(
  - 'JWT_CLIENT_REFRESH_SECRET',

### beauty-core-backend/src/modules/auth-cliente/dto/aceitar-termos.dto.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `1	1	beauty-core-backend/src/modules/auth-cliente/dto/aceitar-termos.dto.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: NO_TARGET_SIGNAL
- Preview redigido das linhas adicionadas ou iniciais:
  - }

### beauty-core-backend/src/modules/auth-cliente/dto/refresh-cliente-token.dto.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `2	1	beauty-core-backend/src/modules/auth-cliente/dto/refresh-cliente-token.dto.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: NO_TARGET_SIGNAL
- Preview redigido das linhas adicionadas ou iniciais:
  - description:
  - 'Refresh token Cliente recebido no login ou no refresh anterior.',

### beauty-core-backend/src/modules/auth-cliente/dto/solicitar-codigo.dto.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `4	13	beauty-core-backend/src/modules/auth-cliente/dto/solicitar-codigo.dto.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY
- Preview redigido das linhas adicionadas ou iniciais:
  - import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  - import { IsOptional, IsString, Length, Matches } from 'class-validator';
  - message: 'O slug deve conter apenas letras min├║sculas, n├║meros e h├¡fens.',
  - }

### beauty-core-backend/src/modules/auth-cliente/dto/verificar-codigo.dto.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `2	10	beauty-core-backend/src/modules/auth-cliente/dto/verificar-codigo.dto.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY
- Preview redigido das linhas adicionadas ou iniciais:
  - ´╗┐import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  - import { IsOptional, IsString, Length, Matches } from 'class-validator';

### beauty-core-backend/src/modules/auth-cliente/guards/cliente-auth.guard.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `1	1	beauty-core-backend/src/modules/auth-cliente/guards/cliente-auth.guard.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY
- Preview redigido das linhas adicionadas ou iniciais:
  - export class ClienteAuthGuard extends AuthGuard('cliente-jwt') {}

### beauty-core-backend/src/modules/auth-cliente/strategies/cliente-jwt.strategy.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `1	3	beauty-core-backend/src/modules/auth-cliente/strategies/cliente-jwt.strategy.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY, SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - secretOrKey: configService.getOrThrow<string>('JWT_CLIENT_SECRET'),

### beauty-core-backend/src/modules/auth/auth.controller.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `6	16	beauty-core-backend/src/modules/auth/auth.controller.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY
- Preview redigido das linhas adicionadas ou iniciais:
  - constructor(private readonly authService: AuthService) {}
  - description:
  - 'Muitas tentativas de login. Aguarde antes de tentar novamente.',
  - async login(@Body() loginDto: LoginDto, @Req() req: any) {
  - logout(@Req() req: any, @Body() dto: LogoutDto) {
  - revogarSessao(@Req() req: any, @Param('sessaoId') sessaoId: string) {

### beauty-core-backend/src/modules/auth/auth.module.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `1	5	beauty-core-backend/src/modules/auth/auth.module.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY, SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - providers: [AuthService, JwtStrategy, RolesGuard],

### beauty-core-backend/src/modules/auth/auth.service.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `21	15	beauty-core-backend/src/modules/auth/auth.service.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: SENSITIVE_KEY_REFERENCE_WITHOUT_DETECTED_LITERAL
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY, SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - private async gerarAccessTokenAdmin(
  - usuario: {
  - id: string;
  - email: string;
  - role: any;
  - empresaId: string | null;

### beauty-core-backend/src/modules/auth/dto/login.dto.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `1	1	beauty-core-backend/src/modules/auth/dto/login.dto.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: NO_TARGET_SIGNAL
- Preview redigido das linhas adicionadas ou iniciais:
  - }

### beauty-core-backend/src/modules/auth/dto/refresh-token.dto.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `2	1	beauty-core-backend/src/modules/auth/dto/refresh-token.dto.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: NO_TARGET_SIGNAL
- Preview redigido das linhas adicionadas ou iniciais:
  - description:
  - 'Refresh token Admin recebido no login ou no refresh anterior.',

### beauty-core-backend/src/modules/auth/guards/jwt-auth.guard.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `1	1	beauty-core-backend/src/modules/auth/guards/jwt-auth.guard.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY
- Preview redigido das linhas adicionadas ou iniciais:
  - export class JwtAuthGuard extends AuthGuard('jwt') {}

### beauty-core-backend/src/modules/auth/guards/roles.guard.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `2	6	beauty-core-backend/src/modules/auth/guards/roles.guard.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY
- Preview redigido das linhas adicionadas ou iniciais:
  - import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
  - }

### beauty-core-backend/src/modules/auth/strategies/jwt.strategy.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `4	5	beauty-core-backend/src/modules/auth/strategies/jwt.strategy.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY, SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - throw new UnauthorizedException(
  - 'Token inv├ílido para ├írea administrativa.',
  - );
  - await this.sessoesService.validarSessaoAdminAtiva(payload.sid, usuario.id);

### beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.controller.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Numstat: `29	43	beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.controller.ts`
- Escopo candidato: **CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY
- Preview redigido das linhas adicionadas ou iniciais:
  - description:
  - 'Usu├írio sem permiss├úo. Permitido apenas para ADMIN e GERENTE.',
  - create(@Req() req: any, @Body() dto: CreateCampanhaWhatsAppDto) {
  - return this.campanhasWhatsappService.create(getEmpresaId(req), dto);
  - descricao:
  - 'Campanha para clientes que n├úo agendam h├í mais de 30 dias.',

### beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.module.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Numstat: `8	19	beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.module.ts`
- Escopo candidato: **CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY, QUEUE_WORKER, SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - imports: [PrismaModule, TenantModule, QueuesModule, AuditoriaModule],
  - controllers: [CampanhasWhatsappController],
  - providers: [CampanhasWhatsappService],
  - exports: [CampanhasWhatsappService],
  - export class CampanhasWhatsappModule {}

### beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Numstat: `57	104	beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts`
- Escopo candidato: **CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY, QUEUE_WORKER, SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - import { Injectable, Logger, NotFoundException } from '@nestjs/common';
  - import { StatusMensagemWhatsApp, TipoUsuarioAuditoria } from '@prisma/client';
  - async create(empresaId: string, dto: CreateCampanhaWhatsAppDto) {
  - const totalDestinatarios = dto.totalDestinatarios ?? 0;
  - const campanha = await this.prisma.campanhaWhatsApp.create({
  - data: {

### beauty-core-backend/src/modules/campanhas-whatsapp/dto/create-campanha-whatsapp.dto.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Numstat: `3	7	beauty-core-backend/src/modules/campanhas-whatsapp/dto/create-campanha-whatsapp.dto.ts`
- Escopo candidato: **CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK, SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  - description: 'Conte├║do da mensagem que ser├í usada na campanha de WhatsApp.',
  - }

### beauty-core-backend/src/modules/campanhas-whatsapp/dto/update-campanha-whatsapp.dto.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Numstat: `1	1	beauty-core-backend/src/modules/campanhas-whatsapp/dto/update-campanha-whatsapp.dto.ts`
- Escopo candidato: **CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK
- Preview redigido das linhas adicionadas ou iniciais:
  - ) {}

### beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.controller.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Numstat: `6	20	beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.controller.ts`
- Escopo candidato: **CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY
- Preview redigido das linhas adicionadas ou iniciais:
  - createOrUpdate(@Req() req: any, @Body() dto: CreateConfiguracaoWhatsAppDto) {
  - return this.configuracaoWhatsappService.findOne(req.user.empresaId);
  - update(@Req() req: any, @Body() dto: UpdateConfiguracaoWhatsAppDto) {
  - return this.configuracaoWhatsappService.update(req.user.empresaId, dto);
  - gerarLink(@Req() req: any, @Query('mensagem') mensagem?: string) {
  - }

### beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.module.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Numstat: `5	14	beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.module.ts`
- Escopo candidato: **CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY, SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - imports: [PrismaModule, TenantModule],
  - controllers: [ConfiguracaoWhatsappController],
  - providers: [ConfiguracaoWhatsappService],
  - exports: [ConfiguracaoWhatsappService],
  - export class ConfiguracaoWhatsappModule {}

### beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Numstat: `15	27	beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts`
- Escopo candidato: **CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY, SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - async createOrUpdate(empresaId: string, dto: CreateConfiguracaoWhatsAppDto) {
  - const existente = await this.prisma.configuracaoWhatsApp.findUnique({
  - where: {
  - empresaId,
  - },
  - });

### beauty-core-backend/src/modules/configuracao-whatsapp/dto/create-configuracao-whatsapp.dto.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Numstat: `3	10	beauty-core-backend/src/modules/configuracao-whatsapp/dto/create-configuracao-whatsapp.dto.ts`
- Escopo candidato: **CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK, SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - import { ApiPropertyOptional } from '@nestjs/swagger';
  - import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
  - }

### beauty-core-backend/src/modules/configuracao-whatsapp/dto/update-configuracao-whatsapp.dto.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Numstat: `1	1	beauty-core-backend/src/modules/configuracao-whatsapp/dto/update-configuracao-whatsapp.dto.ts`
- Escopo candidato: **CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK
- Preview redigido das linhas adicionadas ou iniciais:
  - ) {}

### beauty-core-backend/src/modules/templates-whatsapp/dto/create-template-whatsapp.dto.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Numstat: `2	7	beauty-core-backend/src/modules/templates-whatsapp/dto/create-template-whatsapp.dto.ts`
- Escopo candidato: **CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK, SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
  - }

### beauty-core-backend/src/modules/templates-whatsapp/dto/update-template-whatsapp.dto.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Numstat: `1	1	beauty-core-backend/src/modules/templates-whatsapp/dto/update-template-whatsapp.dto.ts`
- Escopo candidato: **CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK
- Preview redigido das linhas adicionadas ou iniciais:
  - ) {}

### beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.controller.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Numstat: `21	39	beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.controller.ts`
- Escopo candidato: **CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY
- Preview redigido das linhas adicionadas ou iniciais:
  - description:
  - 'Usu├írio sem permiss├úo. Permitido apenas para ADMIN e GERENTE.',
  - create(@Req() req: any, @Body() dto: CreateTemplateWhatsAppDto) {
  - return this.templatesWhatsappService.create(req.user.empresaId, dto);
  - description:
  - 'Usu├írio sem permiss├úo. Permitido apenas para ADMIN e GERENTE.',

### beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.module.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Numstat: `5	14	beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.module.ts`
- Escopo candidato: **CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY, SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - imports: [PrismaModule, TenantModule],
  - controllers: [TemplatesWhatsappController],
  - providers: [TemplatesWhatsappService],
  - exports: [TemplatesWhatsappService],
  - export class TemplatesWhatsappModule {}

### beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.service.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Numstat: `16	29	beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.service.ts`
- Escopo candidato: **CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY, SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - const templateExistente = await this.prisma.templateWhatsApp.findFirst({
  - where: {
  - empresaId,
  - nome: dto.nome,
  - ativo: true,
  - },

### beauty-core-backend/src/modules/tenant-publico/public-tenant.controller.ts

- Tipo: `HIGH`
- Categoria: `TENANCY`
- Status Git: ` M`
- Numstat: `3	7	beauty-core-backend/src/modules/tenant-publico/public-tenant.controller.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY
- Preview redigido das linhas adicionadas ou iniciais:
  - constructor(private readonly tenantPublicService: TenantPublicService) {}
  - dados?.portalClienteAtivo ?? dados?.ativoPortal ?? true,
  - }

### beauty-core-backend/src/modules/tenant-publico/tenant-publico.controller.ts

- Tipo: `HIGH`
- Categoria: `TENANCY`
- Status Git: ` M`
- Numstat: `3	10	beauty-core-backend/src/modules/tenant-publico/tenant-publico.controller.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY
- Preview redigido das linhas adicionadas ou iniciais:
  - import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
  - constructor(private readonly tenantPublicService: TenantPublicService) {}
  - }

### beauty-core-backend/src/modules/tenant-publico/tenant-publico.module.ts

- Tipo: `HIGH`
- Categoria: `TENANCY`
- Status Git: ` M`
- Numstat: `3	8	beauty-core-backend/src/modules/tenant-publico/tenant-publico.module.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY
- Preview redigido das linhas adicionadas ou iniciais:
  - imports: [TenantModule],
  - controllers: [TenantPublicoController, PublicTenantController],
  - export class TenantPublicoModule {}

### beauty-core-backend/src/modules/usuarios/policies/usuario-role.policy.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `2	4	beauty-core-backend/src/modules/usuarios/policies/usuario-role.policy.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY, SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - throw new ForbiddenException('Usu├írio n├úo pode alterar a pr├│pria role.');
  - }

### beauty-core-backend/src/queues/jobs/whatsapp.job.ts

- Tipo: `HIGH`
- Categoria: `META_WHATSAPP`
- Status Git: ` M`
- Numstat: `1	1	beauty-core-backend/src/queues/jobs/whatsapp.job.ts`
- Escopo candidato: **CHAT04_META_SCOPE_CANDIDATE_REQUIRES_CONTRACT_AND_RUNTIME_PROOF**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY, QUEUE_WORKER
- Preview redigido das linhas adicionadas ou iniciais:
  - }

### beauty-core-backend/src/shared/decorators/roles.decorator.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `1	2	beauty-core-backend/src/shared/decorators/roles.decorator.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY
- Preview redigido das linhas adicionadas ou iniciais:
  - export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

### beauty-core-backend/src/shared/tenant/index.ts

- Tipo: `HIGH`
- Categoria: `TENANCY`
- Status Git: ` M`
- Numstat: `1	1	beauty-core-backend/src/shared/tenant/index.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY
- Preview redigido das linhas adicionadas ou iniciais:
  - export * from './tenant-public.service';

### beauty-core-backend/src/shared/tenant/tenant-public.service.ts

- Tipo: `HIGH`
- Categoria: `TENANCY`
- Status Git: ` M`
- Numstat: `7	20	beauty-core-backend/src/shared/tenant/tenant-public.service.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY, SCHEMA_MIGRATION, E2E_TEST
- Preview redigido das linhas adicionadas ou iniciais:
  - throw new NotFoundException('Empresa n├úo encontrada ou inativa.');
  - throw new NotFoundException('Empresa n├úo encontrada ou inativa.');
  - async resolverTenantPublico(params: { slug?: string; dominio?: string }) {
  - throw new BadRequestException('Informe o slug ou dom├¡nio da empresa.');
  - throw new BadRequestException('Dom├¡nio da empresa ├® obrigat├│rio.');
  - throw new BadRequestException('Dom├¡nio da empresa ├® obrigat├│rio.');

### beauty-core-backend/src/shared/tenant/tenant-validator.service.ts

- Tipo: `HIGH`
- Categoria: `TENANCY`
- Status Git: ` M`
- Numstat: `17	21	beauty-core-backend/src/shared/tenant/tenant-validator.service.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY, SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - this.validarIdObrigatorio(categoriaFinanceiraId, 'categoriaFinanceiraId');
  - const categoria = await this.prisma.categoriaFinanceira.findFirst({
  - where: {
  - id: categoriaFinanceiraId,
  - empresaId,
  - ativo: true,

### beauty-core-backend/src/shared/tenant/tenant.module.ts

- Tipo: `HIGH`
- Categoria: `TENANCY`
- Status Git: ` M`
- Numstat: `4	12	beauty-core-backend/src/shared/tenant/tenant.module.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY, SCHEMA_MIGRATION
- Preview redigido das linhas adicionadas ou iniciais:
  - imports: [PrismaModule],
  - providers: [TenantValidatorService, TenantPublicService],
  - exports: [TenantValidatorService, TenantPublicService],
  - export class TenantModule {}

### beauty-core-backend/src/shared/utils/get-empresa-id.ts

- Tipo: `HIGH`
- Categoria: `TENANCY`
- Status Git: ` M`
- Numstat: `1	1	beauty-core-backend/src/shared/utils/get-empresa-id.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY
- Preview redigido das linhas adicionadas ou iniciais:
  - }

### beauty-core-backend/test/e2e/auditoria.e2e-spec.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `6	4	beauty-core-backend/test/e2e/auditoria.e2e-spec.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY, QUEUE_WORKER, SCHEMA_MIGRATION, E2E_TEST
- Preview redigido das linhas adicionadas ou iniciais:
  - import {
  - bootstrapE2eTestApp,
  - E2eContext,
  - teardownE2eTestApp,
  - } from '../setup-e2e';
  - take: 5,

### beauty-core-backend/test/e2e/auth-admin.e2e-spec.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `17	7	beauty-core-backend/test/e2e/auth-admin.e2e-spec.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: SENSITIVE_KEY_REFERENCE_WITHOUT_DETECTED_LITERAL
- Sinais de contrato: AUTH_TENANCY, E2E_TEST
- Preview redigido das linhas adicionadas ou iniciais:
  - import {
  - bootstrapE2eTestApp,
  - E2eContext,
  - teardownE2eTestApp,
  - } from '../setup-e2e';
  - senha: TEST_PASSWORD,

### beauty-core-backend/test/e2e/auth-cliente.e2e-spec.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `39	14	beauty-core-backend/test/e2e/auth-cliente.e2e-spec.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY, SCHEMA_MIGRATION, E2E_TEST
- Preview redigido das linhas adicionadas ou iniciais:
  - import {
  - bootstrapE2eTestApp,
  - E2eContext,
  - teardownE2eTestApp,
  - } from '../setup-e2e';
  - .post(

### beauty-core-backend/test/e2e/multiempresa.e2e-spec.ts

- Tipo: `HIGH`
- Categoria: `TENANCY`
- Status Git: ` M`
- Numstat: `17	11	beauty-core-backend/test/e2e/multiempresa.e2e-spec.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: SENSITIVE_KEY_REFERENCE_WITHOUT_DETECTED_LITERAL
- Sinais de contrato: AUTH_TENANCY, SCHEMA_MIGRATION, E2E_TEST
- Preview redigido das linhas adicionadas ou iniciais:
  - import {
  - bootstrapE2eTestApp,
  - E2eContext,
  - teardownE2eTestApp,
  - } from '../setup-e2e';
  - ativo: true,

### beauty-core-backend/test/e2e/roles.e2e-spec.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `6	4	beauty-core-backend/test/e2e/roles.e2e-spec.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY, E2E_TEST
- Preview redigido das linhas adicionadas ou iniciais:
  - import {
  - bootstrapE2eTestApp,
  - E2eContext,
  - teardownE2eTestApp,
  - } from '../setup-e2e';
  - ['SUPER_ADMIN', TEST_EMAILS.superAdmin, [200]],

### beauty-core-backend/test/e2e/swagger-validation.e2e-spec.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `6	4	beauty-core-backend/test/e2e/swagger-validation.e2e-spec.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: E2E_TEST
- Preview redigido das linhas adicionadas ou iniciais:
  - import {
  - bootstrapE2eTestApp,
  - E2eContext,
  - teardownE2eTestApp,
  - } from '../setup-e2e';
  - campoInvasor: true,

### beauty-core-backend/test/e2e/tenant.e2e-spec.ts

- Tipo: `HIGH`
- Categoria: `TENANCY`
- Status Git: ` M`
- Numstat: `6	4	beauty-core-backend/test/e2e/tenant.e2e-spec.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY, SCHEMA_MIGRATION, E2E_TEST
- Preview redigido das linhas adicionadas ou iniciais:
  - import {
  - bootstrapE2eTestApp,
  - E2eContext,
  - teardownE2eTestApp,
  - } from '../setup-e2e';
  - data: { ativo: false },

### beauty-core-backend/test/helpers/auth.helper.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `15	10	beauty-core-backend/test/helpers/auth.helper.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: SCHEMA_MIGRATION, E2E_TEST
- Preview redigido das linhas adicionadas ou iniciais:
  - raw: body,
  - options?: { forceNew?: boolean },
  - throw new Error(
  - 'Rate limit em /auth/login sem token em cache para ' + email,
  - );
  - export async function loginSuperAdmin(

### beauty-core-backend/test/unit/auth-guards.coverage.spec.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `12	6	beauty-core-backend/test/unit/auth-guards.coverage.spec.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY, E2E_TEST
- Preview redigido das linhas adicionadas ou iniciais:
  - const GuardClass =
  - mod.JwtAuthGuard ??
  - Object.values(mod).find((value) => typeof value === 'function');
  - new GuardClass();
  - const GuardClass =
  - mod.ClienteAuthGuard ??

### beauty-core-backend/test/unit/env-validation-cors.spec.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `5	4	beauty-core-backend/test/unit/env-validation-cors.spec.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY, E2E_TEST
- Preview redigido das linhas adicionadas ou iniciais:
  - /CORS_ORIGIN/,
  - /CORS_ORIGIN/,
  - baseEnv({
  - CORS_ORIGIN: 'https://app.exemplo.com,https://admin.exemplo.com',
  - }),

### beauty-core-backend/test/unit/env-validation-required.spec.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `6	7	beauty-core-backend/test/unit/env-validation-required.spec.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: SENSITIVE_KEY_REFERENCE_WITHOUT_DETECTED_LITERAL
- Sinais de contrato: AUTH_TENANCY, E2E_TEST
- Preview redigido das linhas adicionadas ou iniciais:
  - /OTP_SECRET/,
  - /OTP_SECRET/,
  - /REDIS_PASSWORD/,
  - /REDIS_PASSWORD/,
  - /METRICS_TOKEN/,
  - /METRICS_TOKEN/,

### beauty-core-backend/test/unit/tenant-services.coverage.spec.ts

- Tipo: `HIGH`
- Categoria: `TENANCY`
- Status Git: ` M`
- Numstat: `1	1	beauty-core-backend/test/unit/tenant-services.coverage.spec.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY, SCHEMA_MIGRATION, E2E_TEST
- Preview redigido das linhas adicionadas ou iniciais:
  - new ServiceClass(prismaMock);

### beauty-core-backend/test/unit/tenant-validator.spec.ts

- Tipo: `HIGH`
- Categoria: `TENANCY`
- Status Git: ` M`
- Numstat: `4	4	beauty-core-backend/test/unit/tenant-validator.spec.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY, SCHEMA_MIGRATION, E2E_TEST
- Preview redigido das linhas adicionadas ou iniciais:
  - const service = new ServiceClass(createPrismaMock());
  - const service = new ServiceClass(createPrismaMock());
  - const service = new ServiceClass(prisma);
  - const service = new ServiceClass(prisma);

### beauty-core-backend/test/unit/usuario-role-policy.coverage.spec.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `12	4	beauty-core-backend/test/unit/usuario-role-policy.coverage.spec.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY, E2E_TEST
- Preview redigido das linhas adicionadas ou iniciais:
  - callables.push([
  - exportName + '.' + staticName,
  - value[staticName].bind(value),
  - ]);
  - for (const methodName of Object.getOwnPropertyNames(
  - Object.getPrototypeOf(instance),

### beauty-core-backend/test/unit/usuario-role-policy.spec.ts

- Tipo: `HIGH`
- Categoria: `AUTH_SECURITY`
- Status Git: ` M`
- Numstat: `13	9	beauty-core-backend/test/unit/usuario-role-policy.spec.ts`
- Escopo candidato: **LEGACY_OR_CHAT04_SECURITY_OVERLAP_REQUIRES_SCOPE_DECISION**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: AUTH_TENANCY, E2E_TEST
- Preview redigido das linhas adicionadas ou iniciais:
  - entries.push([
  - exportName + '.' + staticName,
  - staticValue.bind(value),
  - ]);
  - for (const methodName of Object.getOwnPropertyNames(
  - Object.getPrototypeOf(instance),

### beauty-core-backend/prisma/migrations/20260909150000_meta_whatsapp_webhook/migration.sql

- Tipo: `HIGH`
- Categoria: `PRISMA_MIGRATION`
- Status Git: `??`
- Numstat: `untracked`
- Escopo candidato: **CHAT04_META_WEBHOOK_CANDIDATE_REQUIRES_EXPLICIT_APPROVAL**
- Avaliacao de segredo: NO_SENSITIVE_KEY_IN_ADDED_LINES
- Sinais de contrato: META_WEBHOOK, SCHEMA_MIGRATION
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
- Numstat: `untracked`
- Escopo candidato: **CHAT04_META_WEBHOOK_CANDIDATE_REQUIRES_EXPLICIT_APPROVAL**
- Avaliacao de segredo: POTENTIAL_LITERAL_REQUIRES_MANUAL_ROTATION_CHECK
- Sinais de contrato: META_WEBHOOK, AUTH_TENANCY, SCHEMA_MIGRATION, E2E_TEST
- Preview redigido das linhas adicionadas ou iniciais:
  - import request from 'supertest';
  - import { createHmac } from 'node:crypto';
  - process.env.META_WHATSAPP_APP_SECRET = '[REDACTED]';
  - process.env.META_WHATSAPP_VERIFY_TOKEN = '[REDACTED]';
  - import {
  - bootstrapE2eTestApp,

## 5. VÃ­nculo dos dois untracked com schema e E2E

| Identificador | Presente na migration | Presente no schema |
|---|---|---|
| metaMessageId | SIM | SIM |
| metaStatus | SIM | SIM |
| metaStatusUpdatedAt | SIM | SIM |
| MetaWhatsappWebhookEvent | SIM | SIM |

- E2E untracked localizado: `beauty-core-backend/test/e2e/meta-whatsapp-webhook.e2e-spec.ts`
- E2E referencia Meta/webhook: SIM
- E2E usa valores de teste para variaveis Meta: SIM - somente confirmar que nao sao credenciais reais

## 6. Decisoes obrigatorias antes do proximo gate

1. Aprovar ou rejeitar explicitamente a entrada da migration Meta/WhatsApp e do E2E no escopo do Chat 04.
2. Confirmar que os valores Meta detectados em testes sao placeholders/credenciais de teste e que nenhum token real aparece nas linhas adicionadas.
3. Separar os arquivos de seguranÃ§a, tenancy e infraestrutura que pertencem ao Chat 04 daqueles que sao alteracoes herdadas ou fora do escopo.
4. Manter todos os caminhos nao aprovados preservados, sem reset, descarte ou exclusao.
5. Somente depois de uma autorizacao explÃ­cita preparar stage seletivo e preflight de sincronizacao; push, tag e deploy continuam bloqueados.

## 7. Resultado do gate

**PASS-SCOPE-SECRET-REVIEW-REQUIRED**

A revisao dirigida foi concluida com os quantitativos esperados. O resultado nao autoriza stage, commit, push ou deploy; as decisoes de escopo e credenciais continuam pendentes.
