# Beauty Core 1.0 - Chat 64
# Portal Cliente - Auditoria Final de Release

## Bloco 01/15 - Auditoria-mae

Este documento e a fonte de verdade dos Blocos 02-15.

## Baseline Git

- Branch: chat32-bullmq-enterprise
- HEAD: c3867d5362e138aae559253de27968ae15bace14
- Subject: feat(portal): add client notifications foundation

## Status inicial
``	ext
?? beauty-core-ui/docs/chat62-allowed-implementation-plan.md ?? beauty-core-ui/docs/chat62-bookings-implementation-gate.md ?? beauty-core-ui/docs/chat62-final-audit.md ?? beauty-core-ui/docs/chat62-foundation-validation.md ?? beauty-core-ui/docs/chat62-loyalty-benefits-packages-implementation-gate.md ?? beauty-core-ui/docs/chat62-portal-auth-routing-navigation-audit.md ?? beauty-core-ui/docs/chat62-portal-bookings-contracts-audit.md ?? beauty-core-ui/docs/chat62-portal-bookings-loyalty-benefits-packages-audit.md ?? beauty-core-ui/docs/chat62-portal-component-architecture-audit.md ?? beauty-core-ui/docs/chat62-portal-domain-contract-validation.md ?? beauty-core-ui/docs/chat62-portal-performance-assets-audit.md ?? beauty-core-ui/docs/chat62-portal-query-service-cache-audit.md ?? beauty-core-ui/docs/chat62-portal-state-architecture-audit.md ?? beauty-core-ui/docs/chat62-portal-testing-strategy-audit.md ?? beauty-core-ui/docs/chat62-portal-visual-responsive-a11y-audit.md ?? beauty-core-ui/docs/chat64-portal-final-release-audit.md
``

## Documentacao Chat 62

Documentos chat62-* encontrados e preservados:
- chat62-allowed-implementation-plan.md
- chat62-bookings-implementation-gate.md
- chat62-final-audit.md
- chat62-foundation-validation.md
- chat62-loyalty-benefits-packages-implementation-gate.md
- chat62-portal-auth-routing-navigation-audit.md
- chat62-portal-bookings-contracts-audit.md
- chat62-portal-bookings-loyalty-benefits-packages-audit.md
- chat62-portal-component-architecture-audit.md
- chat62-portal-domain-contract-validation.md
- chat62-portal-performance-assets-audit.md
- chat62-portal-query-service-cache-audit.md
- chat62-portal-state-architecture-audit.md
- chat62-portal-testing-strategy-audit.md
- chat62-portal-visual-responsive-a11y-audit.md

Esses documentos nao serao misturados ao commit funcional do Chat 64.

## Contrato WhatsApp read-only

Contrato oficial:

GET /area-cliente/me/mensagens-whatsapp

Evidencias encontradas:
``	ext
beauty-core-ui\src\features\chat54\chat54-cross-integration.test.ts:189: "/mensagens-whatsapp",
beauty-core-ui\src\features\chat54\chat54-cross-integration.test.ts:229: "src/features/whatsapp/components/mensagens-whatsapp-section.tsx",
beauty-core-ui\src\features\chat54\chat54-cross-integration.test.ts:273: "src/features/whatsapp/components/mensagens-whatsapp-section.tsx",
beauty-core-ui\src\features\chat54\chat54-cross-integration.test.ts:382: "src/features/whatsapp/components/mensagens-whatsapp-list.tsx",
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-list.test.tsx:15: } from "./mensagens-whatsapp-list";
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:41: } from "./mensagens-whatsapp-list";
beauty-core-ui\src\features\whatsapp\components\whatsapp-view.tsx:8: } from "./mensagens-whatsapp-section";
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:41: mensagens: "/mensagens-whatsapp",
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:103: "/mensagens-whatsapp",
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:132: "/mensagens-whatsapp/mensagem-1",
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:160: "/mensagens-whatsapp",
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:189: "/mensagens-whatsapp/enviar",
beauty-core-backend\src\app.module.ts:33: import { MensagensWhatsappModule } from './modules/mensagens-whatsapp/mensagens-whatsapp.module';
beauty-core-backend\src\common\interceptors\audit-log.interceptor.ts:200: if (partes[0] === 'mensagens-whatsapp') {
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:394: @Get('me/mensagens-whatsapp')
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:150: @Get('me/mensagens-whatsapp')
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:36: import { MensagensWhatsappService } from './mensagens-whatsapp.service';
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:45: @Controller('mensagens-whatsapp')
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.module.ts:8: import { MensagensWhatsappController } from './mensagens-whatsapp.controller';
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.module.ts:9: import { MensagensWhatsappService } from './mensagens-whatsapp.service';
beauty-core-backend\src\queues\queues.module.ts:11: import { MensagensWhatsappModule } from '../modules/mensagens-whatsapp/mensagens-whatsapp.module';
beauty-core-backend\src\queues\workers\whatsapp.worker.ts:19: import { MensagensWhatsappService } from '../../modules/mensagens-whatsapp/mensagens-whatsapp.service';

``

## Auditoria PWA

- Manifest: a validar no Bloco 05.
- Metadata: a validar no Bloco 05.
- Icons: inventario abaixo.
- Service Worker: a validar no Bloco 06.
- Cache privado de API: nao permitido por padrao.
- Offline shell: a validar no Bloco 07.

## Assets localizados
- PASS: beauty-core-ui\public\images\portal\pwa\portal-app-icon.png
- PASS: beauty-core-ui\public\images\portal\pwa\portal-pwa-splash.webp
- PASS: beauty-core-ui\public\images\portal\pwa\source\portal-app-icon-source.png
- PASS: beauty-core-ui\public\images\portal\pwa\source\portal-pwa-splash-source.png
- PASS: beauty-core-ui\public\images\portal\states\portal-empty-state.webp
- PASS: beauty-core-ui\public\images\portal\states\portal-offline.webp
- PASS: beauty-core-ui\public\images\portal\states\source\portal-empty-state-source.png
- PASS: beauty-core-ui\public\images\portal\states\source\portal-offline-source.png

## Performance

- LCP das rotas principais: a medir no Bloco 08.
- portal-empty-state.webp: warning herdado a validar.
- next/image, priority, loading, sizes, width e height: a auditar.
- Bundle e client boundaries: a auditar no Bloco 09.

## Seguranca e privacidade

- clienteId e empresaId nao podem ser arbitrarios.
- Tenant isolation e ownership devem ser comprovados.
- Tokens e PII nao devem aparecer em logs.
- Service Worker nao deve cachear respostas privadas, 401 ou 403.
- Validar redirect seguro, XSS, URLs perigosas e armazenamento privado.

## Acessibilidade e responsividade

- Auditar teclado, foco, skip link, landmarks, headings, aria-current, aria-live, labels, touch targets, reduced motion, alt text e contraste.
- Viewports oficiais: 360x800, 390x844, 768x1024, 1366x768, 1440x900 e 1920x1080.
- Validar overflow horizontal, navegacao quebrada, conteudo cortado, botoes inacessiveis e modais fora da viewport.

## Inventario inicial de testes
- e2e\chat45-design-system.spec.ts
- e2e\chat47-auth-flow.spec.ts
- e2e\chat48-dashboard.spec.ts
- e2e\chat49-clientes.spec.ts
- e2e\chat50-management-mutations.spec.ts
- e2e\chat50-management.spec.ts
- e2e\chat51-agenda.spec.ts
- e2e\chat52-financeiro.spec.ts
- e2e\chat53-fidelidade-pacotes.spec.ts
- e2e\chat54-comunicacoes.spec.ts
- e2e\chat55-arquivos-configuracoes.spec.ts
- e2e\foundation.smoke.spec.ts
- e2e\portal-foundation.spec.ts
- node_modules\@adobe\css-tools\src\utils\stringSearch.test.ts
- node_modules\@modelcontextprotocol\sdk\node_modules\json-schema-traverse\spec\index.spec.js
- node_modules\@radix-ui\react-alert-dialog\src\alert-dialog.test.tsx
- node_modules\@radix-ui\react-one-time-password-field\src\one-time-password-field.test.tsx
- node_modules\@radix-ui\react-password-toggle-field\src\password-toggle-field.test.tsx
- node_modules\@testing-library\jest-dom\types\__tests__\bun\bun-custom-expect-types.test.ts
- node_modules\@testing-library\jest-dom\types\__tests__\bun\bun-types.test.ts
- node_modules\@testing-library\jest-dom\types\__tests__\jest\jest-custom-expect-types.test.ts
- node_modules\@testing-library\jest-dom\types\__tests__\jest\jest-types.test.ts
- node_modules\@testing-library\jest-dom\types\__tests__\jest-globals\jest-globals-custom-expect-types.test.ts
- node_modules\@testing-library\jest-dom\types\__tests__\jest-globals\jest-globals-types.test.ts
- node_modules\@testing-library\jest-dom\types\__tests__\vitest\vitest-custom-expect-types.test.ts
- node_modules\@testing-library\jest-dom\types\__tests__\vitest\vitest-types.test.ts
- node_modules\ajv-formats\node_modules\json-schema-traverse\spec\index.spec.js
- node_modules\conf\node_modules\json-schema-traverse\spec\index.spec.js
- node_modules\fast-uri\test\ajv.test.js
- node_modules\fast-uri\test\component-safe-serialization.test.js
- node_modules\fast-uri\test\equal.test.js
- node_modules\fast-uri\test\ipv6-canonical.test.js
- node_modules\fast-uri\test\ipv6-validation.test.js
- node_modules\fast-uri\test\malformed-percent.test.js
- node_modules\fast-uri\test\malformed-urn.test.js
- node_modules\fast-uri\test\parse.test.js
- node_modules\fast-uri\test\query-fragment-normalization.test.js
- node_modules\fast-uri\test\reserved-path-normalization.test.js
- node_modules\fast-uri\test\resolve.test.js
- node_modules\fast-uri\test\rfc-3986.test.js
- node_modules\fast-uri\test\scheme-validation.test.js
- node_modules\fast-uri\test\security-normalization.test.js
- node_modules\fast-uri\test\security.test.js
- node_modules\fast-uri\test\serialize.test.js
- node_modules\fast-uri\test\uri-js-compatibility.test.js
- node_modules\fast-uri\test\uri-js.test.js
- node_modules\fast-uri\test\urn-full-input.test.js
- node_modules\fast-uri\test\util.test.js
- node_modules\fast-uri\test\websocket-query-preservation.test.js
- node_modules\gensync\test\index.test.js
- node_modules\json-schema-traverse\spec\index.spec.js
- node_modules\next\dist\diagnostics\build-diagnostics.test.js
- node_modules\next\dist\telemetry\post-telemetry-payload.test.js
- node_modules\next\dist\telemetry\events\build.test.js
- node_modules\next\dist\telemetry\events\mcp-telemetry.test.js
- node_modules\next\dist\trace\trace.test.js
- node_modules\next\dist\trace\report\index.test.js
- node_modules\shadcn\node_modules\tsconfig-paths\lib\__tests__\config-loader.test.js
- node_modules\shadcn\node_modules\tsconfig-paths\lib\__tests__\filesystem.test.js
- node_modules\shadcn\node_modules\tsconfig-paths\lib\__tests__\mapping-entry.test.js
- node_modules\shadcn\node_modules\tsconfig-paths\lib\__tests__\match-path-async.test.js
- node_modules\shadcn\node_modules\tsconfig-paths\lib\__tests__\match-path-sync.test.js
- node_modules\shadcn\node_modules\tsconfig-paths\lib\__tests__\try-path.test.js
- node_modules\shadcn\node_modules\tsconfig-paths\lib\__tests__\tsconfig-loader.test.js
- node_modules\shadcn\node_modules\tsconfig-paths\src\__tests__\config-loader.test.ts
- node_modules\shadcn\node_modules\tsconfig-paths\src\__tests__\filesystem.test.ts
- node_modules\shadcn\node_modules\tsconfig-paths\src\__tests__\mapping-entry.test.ts
- node_modules\shadcn\node_modules\tsconfig-paths\src\__tests__\match-path-async.test.ts
- node_modules\shadcn\node_modules\tsconfig-paths\src\__tests__\match-path-sync.test.ts
- node_modules\shadcn\node_modules\tsconfig-paths\src\__tests__\try-path.test.ts
- node_modules\shadcn\node_modules\tsconfig-paths\src\__tests__\tsconfig-loader.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\all-errors.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\anyunknown.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\array.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\async-parsing.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\async-refinements.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\base.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\bigint.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\branded.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\catch.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\coerce.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\complex.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\custom.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\date.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\deepmasking.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\default.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\description.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\discriminated-unions.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\enum.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\error.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\firstparty.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\firstpartyschematypes.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\function.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\generics.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\instanceof.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\intersection.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\language-server.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\literal.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\map.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\masking.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\mocker.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\nan.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\nativeEnum.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\nullable.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\number.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\object-augmentation.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\object-in-es5-env.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\object.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\optional.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\parser.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\parseUtil.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\partials.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\pickomit.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\pipeline.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\preprocess.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\primitive.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\promise.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\readonly.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\record.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\recursive.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\refine.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\safeparse.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\set.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\standard-schema.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\string.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\transformer.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\tuple.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\unions.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\validations.test.ts
- node_modules\shadcn\node_modules\zod\src\v3\tests\void.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\anyunknown.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\array.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\assignability.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\async-parsing.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\async-refinements.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\base.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\bigint.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\brand.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\catch.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\coalesce.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\coerce.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\continuability.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\custom.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\date.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\datetime.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\default.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\description.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\discriminated-unions.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\enum.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\error-utils.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\error.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\file.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\firstparty.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\function.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\generics.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\index.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\instanceof.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\intersection.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\json.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\lazy.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\literal.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\map.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\nan.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\nested-refine.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\nonoptional.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\nullable.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\number.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\object.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\optional.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\partial.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\pickomit.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\pipe.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\prefault.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\preprocess.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\primitive.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\promise.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\prototypes.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\readonly.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\record.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\recursive-types.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\refine.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\registries.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\set.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\standard-schema.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\string-formats.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\string.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\stringbool.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\template-literal.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\to-json-schema.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\transform.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\tuple.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\union.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\validations.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\classic\tests\void.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\core\tests\index.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\core\tests\locales\be.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\core\tests\locales\en.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\core\tests\locales\ru.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\core\tests\locales\tr.test.ts
- node_modules\shadcn\node_modules\zod\src\v4\mini\tests\assignability.test.ts

## Gates obrigatorios posteriores

- Unit gate do Portal: pendente.
- Integration gate: pendente.
- E2E nos seis viewports: pendente.
- repeat-each=2: pendente.
- Vitest global e coverage: pendente.
- ESLint, TypeScript e build: pendente.
- Playwright global e npm audit: pendente.
- Backend Jest, Prisma validate, Nest build e npm audit: pendente.

## Matriz completa dos Blocos 02-15

| BLOCO | OBJETIVO | ARQUIVOS PROVAVEIS | CONTRATOS | TESTES | RISCOS | DEPENDENCIAS | CRITERIO DE APROVACAO |
|---|---|---|---|---|---|---|---|
| 02 | WhatsApp read-only contracts/service/query | features/portal | GET mensagens WhatsApp | focados | shape incorreto | contrato real | query aprovada |
| 03 | Pagina, routing e navegacao | app/portal/features | GET mensagens WhatsApp | rota/pagina/a11y | chat bidirecional ficticio | Bloco 02 | tela read-only aprovada |
| 04 | Notificacoes, mutation e cache | notifications/query | GET/PATCH notifications | integracao | cache inconsistente | Blocos 02-03 | lista/unread sincronizados |
| 05 | Manifest, metadata e icons | app/public | manifest | metadata | PWA cosmetico | assets | installability aprovada |
| 06 | Service Worker e cache seguro | public/SW | assets publicos | SW | cache de PII | Bloco 05 | nenhum cache privado indevido |
| 07 | Offline e update UX | hooks/components | estado local | offline | sync inexistente | Bloco 06 | offline seguro |
| 08 | LCP, imagens e assets | components/public | nenhum novo | testes/build parcial | layout shift | auditoria real | warnings resolvidos |
| 09 | Bundle, queries e network | query/components | contratos existentes | focados | refatoracao arriscada | Blocos 02-08 | problemas comprovados tratados |
| 10 | Seguranca e privacidade | auth/routing/SW | ownership/tenant | seguranca | vazamento entre clientes | anteriores | isolamento comprovado |
| 11 | A11y, UX e responsividade | Portal completo | nenhum novo | seis viewports | overflow/foco | anteriores | viewports aprovados |
| 12 | Unit gate completo | testes Portal | todos contratos | Vitest Portal | falhas acumuladas | Blocos 02-11 | UNIT PASS |
| 13 | Integracao transversal | auth/tenant/query/cache | integracoes reais | integration | sessao/cache | Bloco 12 | INTEGRATION PASS |
| 14 | E2E final | e2e Portal | fluxos reais | seis viewports repeat-each=2 | instabilidade | Bloco 13 | E2E PASS |
| 15 | Quality gate, release e commit | docs/stage/commit | frontend/backend | global/coverage/audit | release falso | Bloco 14 | commit local aprovado |

## Decisao do Bloco 01

- Baseline: PASS.
- Documentacao Chat 62: PRESERVADA.
- Implementacao funcional: NAO REALIZADA.
- Backend alterado: NAO.
- Push: NAO EXECUTADO.
- Tag: NAO CRIADA.
- Deploy: NAO EXECUTADO.
- Bloco 01: APROVADO PARA AVANCAR.

Proximo passo: executar exclusivamente o BLOCO 02/15.

## Revalidacao tecnica do contrato WhatsApp

Arquivos-alvo consultados:
- beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts
- beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts
- beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-list.tsx
- beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx
- beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts
- beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts
- beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts
- beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts

Evidencias encontradas:
``text
whatsapp-api.ts:18: whatsappMensagemSendFormSchema,
whatsapp-api.ts:21: whatsappSendResultSchema,
whatsapp-api.ts:26: type WhatsappMensagemSendFormValues,
whatsapp-api.ts:35: WhatsappSendResult,
whatsapp-api.ts:41: mensagens: "/mensagens-whatsapp",
whatsapp-api.ts:128: page: parsed.page,
whatsapp-api.ts:129: limit: parsed.limit,
whatsapp-api.ts:191: export async function sendWhatsappMessage(
whatsapp-api.ts:192: values: WhatsappMensagemSendFormValues,
whatsapp-api.ts:193: ): Promise<WhatsappSendResult> {
whatsapp-api.ts:195: whatsappMensagemSendFormSchema.parse(
whatsapp-api.ts:201: `${whatsappApiPaths.mensagens}/enviar`,
whatsapp-api.ts:205: return whatsappSendResultSchema.parse(
whatsapp-messages-api.test.ts:50: sendWhatsappMessage,
whatsapp-messages-api.test.ts:55: empresaId: "empresa-interna",
whatsapp-messages-api.test.ts:56: clienteId: null,
whatsapp-messages-api.test.ts:62: status: "PENDENTE",
whatsapp-messages-api.test.ts:69: cliente: null,
whatsapp-messages-api.test.ts:86: page: 1,
whatsapp-messages-api.test.ts:87: limit: 20,
whatsapp-messages-api.test.ts:89: totalPages: 1,
whatsapp-messages-api.test.ts:95: page: 1,
whatsapp-messages-api.test.ts:96: limit: 20,
whatsapp-messages-api.test.ts:97: search: "cliente",
whatsapp-messages-api.test.ts:103: "/mensagens-whatsapp",
whatsapp-messages-api.test.ts:106: page: 1,
whatsapp-messages-api.test.ts:107: limit: 20,
whatsapp-messages-api.test.ts:108: search: "cliente",
whatsapp-messages-api.test.ts:116: it("busca detalhe e remove empresaId", async () => {
whatsapp-messages-api.test.ts:132: "/mensagens-whatsapp/mensagem-1",
whatsapp-messages-api.test.ts:136: "empresaId",
whatsapp-messages-api.test.ts:144: it("registra mensagem sem empresaId", async () => {
whatsapp-messages-api.test.ts:160: "/mensagens-whatsapp",
whatsapp-messages-api.test.ts:165: "empresaId",
whatsapp-messages-api.test.ts:182: await sendWhatsappMessage({
whatsapp-messages-api.test.ts:189: "/mensagens-whatsapp/enviar",
whatsapp-messages-api.test.ts:219: sendWhatsappMessage({
mensagens-whatsapp-list.tsx:50: Cliente
mensagens-whatsapp-list.tsx:56: Status
mensagens-whatsapp-list.tsx:81: {mensagem.cliente?.nome ??
mensagens-whatsapp-list.tsx:94: mensagem.status,
mensagens-whatsapp-section.tsx:17: canSendWhatsAppMessage,
mensagens-whatsapp-section.tsx:26: WhatsappMensagemSendFormValues,
mensagens-whatsapp-section.tsx:30: sendWhatsappMessage,
mensagens-whatsapp-section.tsx:34: WhatsappSendResult,
mensagens-whatsapp-section.tsx:41: } from "./mensagens-whatsapp-list";
mensagens-whatsapp-section.tsx:59: canSendWhatsAppMessage(role);
mensagens-whatsapp-section.tsx:63: const [page, setPage] =
mensagens-whatsapp-section.tsx:75: const [lastSend, setLastSend] =
mensagens-whatsapp-section.tsx:76: useState<WhatsappSendResult | null>(
mensagens-whatsapp-section.tsx:81: page,
mensagens-whatsapp-section.tsx:82: limit: 20,
mensagens-whatsapp-section.tsx:103: const sendMutation = useMutation({
mensagens-whatsapp-section.tsx:105: mutationFn: sendWhatsappMessage,
mensagens-whatsapp-section.tsx:108: setLastSend(result);
mensagens-whatsapp-section.tsx:113: setPage(1);
mensagens-whatsapp-section.tsx:122: async function handleSend(
mensagens-whatsapp-section.tsx:123: values: WhatsappMensagemSendFormValues,
mensagens-whatsapp-section.tsx:125: setLastSend(null);
mensagens-whatsapp-section.tsx:128: await sendMutation.mutateAsync(
mensagens-whatsapp-section.tsx:141: setPage(1);
mensagens-whatsapp-section.tsx:169: Enviar mensagem
mensagens-whatsapp-section.tsx:178: {sendMutation.isError && (
mensagens-whatsapp-section.tsx:184: sendMutation.error,
mensagens-whatsapp-section.tsx:189: {lastSend && (
mensagens-whatsapp-section.tsx:192: role="status"
mensagens-whatsapp-section.tsx:203: sendMutation.isPending
mensagens-whatsapp-section.tsx:205: onSubmit={handleSend}
mensagens-whatsapp-section.tsx:217: pela empresa autenticada.
mensagens-whatsapp-section.tsx:232: placeholder="Buscar por destinatário, mensagem ou cliente"
mensagens-whatsapp-section.tsx:251: setPage(1);
mensagens-whatsapp-section.tsx:262: role="status"
mensagens-whatsapp-section.tsx:302: Página {meta?.page ?? 1} de{" "}
mensagens-whatsapp-section.tsx:304: meta?.totalPages ?? 0,
mensagens-whatsapp-section.tsx:317: meta.page <= 1
mensagens-whatsapp-section.tsx:320: setPage(
mensagens-whatsapp-section.tsx:338: meta.page >=
mensagens-whatsapp-section.tsx:339: meta.totalPages
mensagens-whatsapp-section.tsx:342: setPage(
area-cliente.controller.ts:29: import { ClienteAuthGuard } from '../auth-cliente/guards/cliente-auth.guard';
area-cliente.controller.ts:31: import { AreaClienteService } from './area-cliente.service';
area-cliente.controller.ts:32: import { UpdatePerfilClienteDto } from './dto/update-perfil-cliente.dto';
area-cliente.controller.ts:33: import { ClienteAuthUser } from './types/cliente-auth-user.type';
area-cliente.controller.ts:35: type ClienteRequest = {
area-cliente.controller.ts:36: user: ClienteAuthUser;
area-cliente.controller.ts:39: @ApiTags('Área Cliente')
area-cliente.controller.ts:41: @UseGuards(ClienteAuthGuard)
area-cliente.controller.ts:42: @Controller('area-cliente')
area-cliente.controller.ts:43: export class AreaClienteController {
area-cliente.controller.ts:45: private readonly areaClienteService: AreaClienteService,
area-cliente.controller.ts:48: private getClienteAutenticado(req: ClienteRequest) {
area-cliente.controller.ts:50: clienteId: req.user.clienteId ?? req.user.sub,
area-cliente.controller.ts:51: empresaId: req.user.empresaId,
area-cliente.controller.ts:55: @Get('me/perfil')
area-cliente.controller.ts:59: 'Retorna o perfil do cliente final autenticado pelo JWT Cliente. O clienteId é obtido diretamente do token, sem exposição na URL.',
area-cliente.controller.ts:62: description: 'Perfil do cliente autenticado retornado com sucesso.',
area-cliente.controller.ts:65: description: 'Token Cliente ausente, inválido ou expirado.',
area-cliente.controller.ts:68: description: 'Portal do cliente desativado.',
area-cliente.controller.ts:71: description: 'Cliente não encontrado no tenant autenticado.',
area-cliente.controller.ts:73: perfil(@Req() req: ClienteRequest) {
area-cliente.controller.ts:74: const { empresaId, clienteId } = this.getClienteAutenticado(req);
area-cliente.controller.ts:76: return this.areaClienteService.perfil(empresaId, clienteId);
area-cliente.controller.ts:83: 'Atualiza parcialmente o perfil do cliente final autenticado. Não permite alterar telefone nem observações internas.',
area-cliente.controller.ts:86: type: UpdatePerfilClienteDto,
area-cliente.controller.ts:88: 'Dados permitidos para atualização pelo cliente autenticado.',
area-cliente.controller.ts:97: description: 'Token Cliente ausente, inválido ou expirado.',
area-cliente.controller.ts:100: description: 'Portal do cliente desativado.',
area-cliente.controller.ts:103: description: 'Cliente não encontrado no tenant autenticado.',
area-cliente.controller.ts:106: @Req() req: ClienteRequest,
area-cliente.controller.ts:107: @Body() dto: UpdatePerfilClienteDto,
area-cliente.controller.ts:109: const { empresaId, clienteId } = this.getClienteAutenticado(req);
area-cliente.controller.ts:111: return this.areaClienteService.updatePerfil(
area-cliente.controller.ts:112: empresaId,
area-cliente.controller.ts:113: clienteId,
area-cliente.controller.ts:118: @Get('me/agendamentos')
area-cliente.controller.ts:122: 'Lista os agendamentos do cliente autenticado, com paginação e filtro opcional por status.',
area-cliente.controller.ts:125: name: 'status',
area-cliente.controller.ts:132: name: 'page',
area-cliente.controller.ts:137: name: 'limit',
area-cliente.controller.ts:145: description: 'Token Cliente ausente, inválido ou expirado.',
area-cliente.controller.ts:148: @Req() req: ClienteRequest,
area-cliente.controller.ts:150: @Query('status') status?: string,
area-cliente.controller.ts:152: const { empresaId, clienteId } = this.getClienteAutenticado(req);
area-cliente.controller.ts:154: return this.areaClienteService.agendamentos(
area-cliente.controller.ts:155: empresaId,
area-cliente.controller.ts:156: clienteId,
area-cliente.controller.ts:157: status,
area-cliente.controller.ts:162: @Get('me/proximos-agendamentos')
area-cliente.controller.ts:166: 'Retorna os próximos agendamentos futuros do cliente autenticado.',
area-cliente.controller.ts:171: proximosAgendamentos(@Req() req: ClienteRequest) {
area-cliente.controller.ts:172: const { empresaId, clienteId } = this.getClienteAutenticado(req);
area-cliente.controller.ts:174: return this.areaClienteService.proximosAgendamentos(
area-cliente.controller.ts:175: empresaId,
area-cliente.controller.ts:176: clienteId,
area-cliente.controller.ts:180: @Get('me/ultimo-agendamento')
area-cliente.controller.ts:184: 'Retorna o último agendamento passado do cliente autenticado.',
area-cliente.controller.ts:189: ultimoAgendamento(@Req() req: ClienteRequest) {
area-cliente.controller.ts:190: const { empresaId, clienteId } = this.getClienteAutenticado(req);
area-cliente.controller.ts:192: return this.areaClienteService.ultimoAgendamento(
area-cliente.controller.ts:193: empresaId,
area-cliente.controller.ts:194: clienteId,
area-cliente.controller.ts:198: @Get('me/fidelidade')
area-cliente.controller.ts:202: 'Retorna saldo, nível atual, próximo nível e benefícios disponíveis do cliente autenticado.',
area-cliente.controller.ts:207: fidelidade(@Req() req: ClienteRequest) {
area-cliente.controller.ts:208: const { empresaId, clienteId } = this.getClienteAutenticado(req);
area-cliente.controller.ts:210: return this.areaClienteService.fidelidade(empresaId, clienteId);
area-cliente.controller.ts:213: @Get('me/pontos')
area-cliente.controller.ts:217: 'Lista o histórico de pontos de fidelidade do cliente autenticado.',
area-cliente.controller.ts:220: name: 'page',
area-cliente.controller.ts:225: name: 'limit',
area-cliente.controller.ts:233: @Req() req: ClienteRequest,
area-cliente.controller.ts:236: const { empresaId, clienteId } = this.getClienteAutenticado(req);
area-cliente.controller.ts:238: return this.areaClienteService.pontos(
area-cliente.controller.ts:239: empresaId,
area-cliente.controller.ts:240: clienteId,
area-cliente.controller.ts:245: @Get('me/beneficios')
area-cliente.controller.ts:249: 'Retorna benefícios disponíveis e liberados para o cliente autenticado conforme seu saldo de pontos.',
area-cliente.controller.ts:254: beneficios(@Req() req: ClienteRequest) {
area-cliente.controller.ts:255: const { empresaId, clienteId } = this.getClienteAutenticado(req);
area-cliente.controller.ts:257: return this.areaClienteService.beneficios(empresaId, clienteId);
area-cliente.controller.ts:260: @Get('me/pacotes')
area-cliente.controller.ts:264: 'Lista os pacotes vinculados ao cliente autenticado, separados por status.',
area-cliente.controller.ts:269: pacotes(@Req() req: ClienteRequest) {
area-cliente.controller.ts:270: const { empresaId, clienteId } = this.getClienteAutenticado(req);
area-cliente.controller.ts:272: return this.areaClienteService.pacotes(empresaId, clienteId);
area-cliente.controller.ts:275: @Get('me/pacotes/:pacoteId')
area-cliente.controller.ts:279: 'Retorna os detalhes de um pacote específico pertencente ao cliente autenticado.',
area-cliente.controller.ts:283: description: 'ID do pacote do cliente.',
area-cliente.controller.ts:294: description: 'Pacote não encontrado para o cliente autenticado.',
area-cliente.controller.ts:297: @Req() req: ClienteRequest,
area-cliente.controller.ts:300: const { empresaId, clienteId } = this.getClienteAutenticado(req);
area-cliente.controller.ts:302: return this.areaClienteService.pacoteDetalhes(
area-cliente.controller.ts:303: empresaId,
area-cliente.controller.ts:304: clienteId,
area-cliente.controller.ts:309: @Get('me/notificacoes')
area-cliente.controller.ts:313: 'Lista as notificações vinculadas ao cliente autenticado, com paginação.',
area-cliente.controller.ts:316: name: 'page',
area-cliente.controller.ts:321: name: 'limit',
area-cliente.controller.ts:329: @Req() req: ClienteRequest,
area-cliente.controller.ts:332: const { empresaId, clienteId } = this.getClienteAutenticado(req);
area-cliente.controller.ts:334: return this.areaClienteService.notificacoes(
area-cliente.controller.ts:335: empresaId,
area-cliente.controller.ts:336: clienteId,
area-cliente.controller.ts:341: @Get('me/notificacoes/nao-lidas')
area-cliente.controller.ts:345: 'Retorna as notificações não lidas do cliente autenticado.',
area-cliente.controller.ts:350: notificacoesNaoLidas(@Req() req: ClienteRequest) {
area-cliente.controller.ts:351: const { empresaId, clienteId } = this.getClienteAutenticado(req);
area-cliente.controller.ts:353: return this.areaClienteService.notificacoesNaoLidas(
area-cliente.controller.ts:354: empresaId,
area-cliente.controller.ts:355: clienteId,
area-cliente.controller.ts:363: 'Marca uma notificação específica do cliente autenticado como lida.',
area-cliente.controller.ts:379: 'Notificação não encontrada para o cliente autenticado.',
area-cliente.controller.ts:382: @Req() req: ClienteRequest,
area-cliente.controller.ts:385: const { empresaId, clienteId } = this.getClienteAutenticado(req);
area-cliente.controller.ts:387: return this.areaClienteService.marcarNotificacaoComoLida(
area-cliente.controller.ts:388: empresaId,
area-cliente.controller.ts:389: clienteId,
area-cliente.controller.ts:394: @Get('me/mensagens-whatsapp')
area-cliente.controller.ts:398: 'Lista as mensagens de WhatsApp vinculadas ao cliente autenticado, com paginação.',
area-cliente.controller.ts:401: name: 'page',
area-cliente.controller.ts:406: name: 'limit',
area-cliente.controller.ts:414: @Req() req: ClienteRequest,
area-cliente.controller.ts:417: const { empresaId, clienteId } = this.getClienteAutenticado(req);
area-cliente.controller.ts:419: return this.areaClienteService.mensagensWhatsapp(
area-cliente.controller.ts:420: empresaId,
area-cliente.controller.ts:421: clienteId,
area-cliente.controller.ts:426: @Get('me/dashboard')
area-cliente.controller.ts:430: 'Retorna dados consolidados do cliente autenticado para dashboard do portal/app.',
area-cliente.controller.ts:435: dashboard(@Req() req: ClienteRequest) {
area-cliente.controller.ts:436: const { empresaId, clienteId } = this.getClienteAutenticado(req);
area-cliente.controller.ts:438: return this.areaClienteService.dashboard(empresaId, clienteId);
area-cliente.controller.ts:441: @Get('me/historico')
area-cliente.controller.ts:445: 'Retorna histórico consolidado do cliente autenticado, reunindo agendamentos, pontos, pacotes, notificações e comunicações.',
area-cliente.controller.ts:450: historico(@Req() req: ClienteRequest) {
area-cliente.controller.ts:451: const { empresaId, clienteId } = this.getClienteAutenticado(req);
area-cliente.controller.ts:453: return this.areaClienteService.historico(empresaId, clienteId);
cliente-area.controller.ts:13: import { ClienteAuthGuard } from '../auth-cliente/guards/cliente-auth.guard';
cliente-area.controller.ts:14: import { ClienteAreaService } from './cliente-area.service';
cliente-area.controller.ts:15: import { ClienteAreaQueryDto } from './dto/cliente-area-query.dto';
cliente-area.controller.ts:17: type ClienteAuthUser = {
cliente-area.controller.ts:19: clienteId?: string;
cliente-area.controller.ts:20: empresaId: string;
cliente-area.controller.ts:22: role?: 'CLIENTE';
cliente-area.controller.ts:25: type ClienteRequest = Request & {
cliente-area.controller.ts:26: user: ClienteAuthUser;
cliente-area.controller.ts:29: @ApiTags('Cliente Area')
cliente-area.controller.ts:30: @ApiBearerAuth('JWT Cliente')
cliente-area.controller.ts:31: @UseGuards(ClienteAuthGuard)
cliente-area.controller.ts:32: @Controller('cliente-area')
cliente-area.controller.ts:33: export class ClienteAreaController {
cliente-area.controller.ts:34: constructor(private readonly clienteAreaService: ClienteAreaService) {}
cliente-area.controller.ts:36: private getAuth(req: ClienteRequest) {
cliente-area.controller.ts:37: const clienteId = req.user.clienteId ?? req.user.sub;
cliente-area.controller.ts:40: clienteId,
cliente-area.controller.ts:41: empresaId: req.user.empresaId,
cliente-area.controller.ts:45: @Get('me')
cliente-area.controller.ts:46: @ApiOperation({ summary: 'Retorna o perfil público do cliente logado.' })
cliente-area.controller.ts:47: me(@Req() req: ClienteRequest) {
cliente-area.controller.ts:48: return this.clienteAreaService.me(this.getAuth(req));
cliente-area.controller.ts:51: @Get('me/dashboard')
cliente-area.controller.ts:52: @ApiOperation({ summary: 'Retorna o dashboard mobile do cliente logado.' })
cliente-area.controller.ts:53: dashboard(@Req() req: ClienteRequest) {
cliente-area.controller.ts:54: return this.clienteAreaService.dashboard(this.getAuth(req));
cliente-area.controller.ts:57: @Get('me/agendamentos')
cliente-area.controller.ts:58: @ApiOperation({ summary: 'Lista os agendamentos do cliente logado.' })
cliente-area.controller.ts:60: @Req() req: ClienteRequest,
cliente-area.controller.ts:61: @Query() query: ClienteAreaQueryDto,
cliente-area.controller.ts:63: return this.clienteAreaService.agendamentos(this.getAuth(req), query);
cliente-area.controller.ts:66: @Get('me/proximos-agendamentos')
cliente-area.controller.ts:67: @ApiOperation({ summary: 'Lista os próximos agendamentos do cliente logado.' })
cliente-area.controller.ts:69: @Req() req: ClienteRequest,
cliente-area.controller.ts:70: @Query() query: ClienteAreaQueryDto,
cliente-area.controller.ts:72: return this.clienteAreaService.proximosAgendamentos(
cliente-area.controller.ts:78: @Get('me/ultimo-agendamento')
cliente-area.controller.ts:79: @ApiOperation({ summary: 'Retorna o último agendamento do cliente logado.' })
cliente-area.controller.ts:80: ultimoAgendamento(@Req() req: ClienteRequest) {
cliente-area.controller.ts:81: return this.clienteAreaService.ultimoAgendamento(this.getAuth(req));
cliente-area.controller.ts:84: @Get('me/fidelidade')
cliente-area.controller.ts:85: @ApiOperation({ summary: 'Retorna o resumo de fidelidade do cliente logado.' })
cliente-area.controller.ts:86: fidelidade(@Req() req: ClienteRequest) {
cliente-area.controller.ts:87: return this.clienteAreaService.fidelidade(this.getAuth(req));
cliente-area.controller.ts:90: @Get('me/pontos')
cliente-area.controller.ts:91: @ApiOperation({ summary: 'Lista o histórico de pontos do cliente logado.' })
cliente-area.controller.ts:93: @Req() req: ClienteRequest,
cliente-area.controller.ts:94: @Query() query: ClienteAreaQueryDto,
cliente-area.controller.ts:96: return this.clienteAreaService.pontos(this.getAuth(req), query);
cliente-area.controller.ts:99: @Get('me/beneficios')
cliente-area.controller.ts:100: @ApiOperation({ summary: 'Lista os benefícios disponíveis para o cliente.' })
cliente-area.controller.ts:101: beneficios(@Req() req: ClienteRequest) {
cliente-area.controller.ts:102: return this.clienteAreaService.beneficios(this.getAuth(req));
cliente-area.controller.ts:105: @Get('me/pacotes')
cliente-area.controller.ts:106: @ApiOperation({ summary: 'Lista os pacotes do cliente separados por status.' })
cliente-area.controller.ts:107: pacotes(@Req() req: ClienteRequest) {
cliente-area.controller.ts:108: return this.clienteAreaService.pacotes(this.getAuth(req));
cliente-area.controller.ts:111: @Get('me/pacotes/:pacoteId')
cliente-area.controller.ts:112: @ApiOperation({ summary: 'Retorna os detalhes de um pacote do cliente.' })
cliente-area.controller.ts:114: @Req() req: ClienteRequest,
cliente-area.controller.ts:117: return this.clienteAreaService.pacoteDetalhes(
cliente-area.controller.ts:123: @Get('me/notificacoes')
cliente-area.controller.ts:124: @ApiOperation({ summary: 'Lista as notificações do cliente logado.' })
cliente-area.controller.ts:126: @Req() req: ClienteRequest,
cliente-area.controller.ts:127: @Query() query: ClienteAreaQueryDto,
cliente-area.controller.ts:129: return this.clienteAreaService.notificacoes(this.getAuth(req), query);
cliente-area.controller.ts:132: @Get('me/notificacoes/nao-lidas')
cliente-area.controller.ts:133: @ApiOperation({ summary: 'Lista as notificações não lidas do cliente.' })
cliente-area.controller.ts:134: notificacoesNaoLidas(@Req() req: ClienteRequest) {
cliente-area.controller.ts:135: return this.clienteAreaService.notificacoesNaoLidas(this.getAuth(req));
cliente-area.controller.ts:139: @ApiOperation({ summary: 'Marca uma notificação do cliente como lida.' })
cliente-area.controller.ts:141: @Req() req: ClienteRequest,
cliente-area.controller.ts:144: return this.clienteAreaService.marcarNotificacaoComoLida(
cliente-area.controller.ts:150: @Get('me/mensagens-whatsapp')
cliente-area.controller.ts:151: @ApiOperation({ summary: 'Lista o histórico de mensagens WhatsApp do cliente.' })
cliente-area.controller.ts:153: @Req() req: ClienteRequest,
cliente-area.controller.ts:154: @Query() query: ClienteAreaQueryDto,
cliente-area.controller.ts:156: return this.clienteAreaService.mensagensWhatsapp(this.getAuth(req), query);
cliente-area.controller.ts:159: @Get('me/historico')
cliente-area.controller.ts:160: @ApiOperation({ summary: 'Retorna o histórico consolidado do cliente.' })
cliente-area.controller.ts:162: @Req() req: ClienteRequest,
cliente-area.controller.ts:163: @Query() query: ClienteAreaQueryDto,
cliente-area.controller.ts:165: return this.clienteAreaService.historico(this.getAuth(req), query);
mensagens-whatsapp.controller.ts:34: import { getEmpresaId } from '../../shared/utils/get-empresa-id';
mensagens-whatsapp.controller.ts:36: import { MensagensWhatsappService } from './mensagens-whatsapp.service';
mensagens-whatsapp.controller.ts:40: import { EnviarMensagemWhatsAppDto } from './dto/enviar-mensagem-whatsapp.dto';
mensagens-whatsapp.controller.ts:45: @Controller('mensagens-whatsapp')
mensagens-whatsapp.controller.ts:52: @Post()
mensagens-whatsapp.controller.ts:57: 'Cria uma mensagem de WhatsApp no contexto da empresa autenticada. Endpoint usado para registrar mensagens manuais, histórico de comunicação e preparação para envio.',
mensagens-whatsapp.controller.ts:68: empresaId: '550e8400-e29b-41d4-a716-446655440000',
mensagens-whatsapp.controller.ts:69: clienteId: '550e8400-e29b-41d4-a716-446655440000',
mensagens-whatsapp.controller.ts:73: status: 'PENDENTE',
mensagens-whatsapp.controller.ts:95: getEmpresaId(req),
mensagens-whatsapp.controller.ts:100: @Post('enviar')
mensagens-whatsapp.controller.ts:103: summary: 'Enviar mensagem de WhatsApp',
mensagens-whatsapp.controller.ts:108: type: EnviarMensagemWhatsAppDto,
mensagens-whatsapp.controller.ts:136: async enviar(
mensagens-whatsapp.controller.ts:138: @Body() dto: EnviarMensagemWhatsAppDto,
mensagens-whatsapp.controller.ts:140: const empresaId = getEmpresaId(req);
mensagens-whatsapp.controller.ts:142: const mensagem = await this.mensagensWhatsappService.enviar(
mensagens-whatsapp.controller.ts:143: empresaId,
mensagens-whatsapp.controller.ts:148: empresaId,
mensagens-whatsapp.controller.ts:167: @Get()
mensagens-whatsapp.controller.ts:172: 'Lista as mensagens de WhatsApp da empresa autenticada com suporte a paginação. Endpoint usado para histórico de comunicações, acompanhamento de status e auditoria operacional.',
mensagens-whatsapp.controller.ts:175: name: 'page',
mensagens-whatsapp.controller.ts:181: name: 'limit',
mensagens-whatsapp.controller.ts:196: status: 'ENVIADA',
mensagens-whatsapp.controller.ts:202: page: 1,
mensagens-whatsapp.controller.ts:203: limit: 10,
mensagens-whatsapp.controller.ts:205: totalPages: 1,
mensagens-whatsapp.controller.ts:222: getEmpresaId(req),
mensagens-whatsapp.controller.ts:227: @Get(':id')
mensagens-whatsapp.controller.ts:232: 'Busca uma mensagem de WhatsApp específica pelo ID, respeitando o isolamento multiempresa da empresa autenticada.',
mensagens-whatsapp.controller.ts:245: empresaId: '550e8400-e29b-41d4-a716-446655440000',
mensagens-whatsapp.controller.ts:246: clienteId: '550e8400-e29b-41d4-a716-446655440000',
mensagens-whatsapp.controller.ts:250: status: 'ENVIADA',
mensagens-whatsapp.controller.ts:272: 'Mensagem de WhatsApp não encontrada para a empresa autenticada.',
mensagens-whatsapp.controller.ts:279: getEmpresaId(req),
mensagens-whatsapp.controller.ts:289: 'Cancela uma mensagem de WhatsApp da empresa autenticada, preservando o registro para histórico, rastreabilidade e auditoria.',
mensagens-whatsapp.controller.ts:302: status: 'CANCELADA',
mensagens-whatsapp.controller.ts:319: 'Mensagem de WhatsApp não encontrada para a empresa autenticada.',
mensagens-whatsapp.controller.ts:326: getEmpresaId(req),
mensagens-whatsapp.service.ts:9: StatusMensagemWhatsApp,
mensagens-whatsapp.service.ts:16: import { TenantValidatorService } from '../../shared/tenant';
mensagens-whatsapp.service.ts:25: import { EnviarMensagemWhatsAppDto } from './dto/enviar-mensagem-whatsapp.dto';
mensagens-whatsapp.service.ts:28: clienteId?: string;
mensagens-whatsapp.service.ts:40: private readonly tenantValidator: TenantValidatorService,
mensagens-whatsapp.service.ts:44: empresaId: string,
mensagens-whatsapp.service.ts:49: await this.tenantValidator.validarEmpresaAtiva(empresaId);
mensagens-whatsapp.service.ts:50: await this.validarRelacionamentos(empresaId, dto);
mensagens-whatsapp.service.ts:54: empresaId,
mensagens-whatsapp.service.ts:55: clienteId: dto.clienteId,
mensagens-whatsapp.service.ts:61: status: StatusMensagemWhatsApp.PENDENTE,
mensagens-whatsapp.service.ts:69: `[WHATSAPP] mensagem criada empresaId=${empresaId} mensagemId=${mensagem.id} status=SUCESSO tempoMs=${tempoMs}`,
mensagens-whatsapp.service.ts:73: empresaId,
mensagens-whatsapp.service.ts:74: clienteId: mensagem.clienteId ?? undefined,
mensagens-whatsapp.service.ts:90: async enviar(
mensagens-whatsapp.service.ts:91: empresaId: string,
mensagens-whatsapp.service.ts:92: dto: EnviarMensagemWhatsAppDto,
mensagens-whatsapp.service.ts:96: await this.tenantValidator.validarEmpresaAtiva(empresaId);
mensagens-whatsapp.service.ts:100: where: { empresaId },
mensagens-whatsapp.service.ts:105: 'Configure o WhatsApp antes de enviar mensagens.',
mensagens-whatsapp.service.ts:111: 'WhatsApp está desativado para esta empresa.',
mensagens-whatsapp.service.ts:115: await this.validarRelacionamentos(empresaId, dto);
mensagens-whatsapp.service.ts:117: const status = configuracao.usarModoDemonstracao
mensagens-whatsapp.service.ts:118: ? StatusMensagemWhatsApp.SIMULADA
mensagens-whatsapp.service.ts:119: : StatusMensagemWhatsApp.PENDENTE;
mensagens-whatsapp.service.ts:123: empresaId,
mensagens-whatsapp.service.ts:124: clienteId: dto.clienteId,
mensagens-whatsapp.service.ts:130: status,
mensagens-whatsapp.service.ts:132: status === StatusMensagemWhatsApp.SIMULADA
mensagens-whatsapp.service.ts:142: `[WHATSAPP] mensagem enviada empresaId=${empresaId} mensagemId=${mensagem.id} status=${mensagem.status} tempoMs=${tempoMs}`,
mensagens-whatsapp.service.ts:146: empresaId,
mensagens-whatsapp.service.ts:147: clienteId: mensagem.clienteId ?? undefined,
mensagens-whatsapp.service.ts:157: acaoOperacional: 'ENVIAR_WHATSAPP',
mensagens-whatsapp.service.ts:160: status === StatusMensagemWhatsApp.SIMULADA
mensagens-whatsapp.service.ts:169: empresaId: string,
mensagens-whatsapp.service.ts:172: await this.tenantValidator.validarEmpresaAtiva(empresaId);
mensagens-whatsapp.service.ts:174: await this.validarFiltrosRelacionados(empresaId, {
mensagens-whatsapp.service.ts:175: clienteId: query['clienteId'],
mensagens-whatsapp.service.ts:180: const { page, limit, skip, take } =
mensagens-whatsapp.service.ts:187: 'status',
mensagens-whatsapp.service.ts:200: empresaId,
mensagens-whatsapp.service.ts:222: page,
mensagens-whatsapp.service.ts:223: limit,
mensagens-whatsapp.service.ts:227: async findOne(empresaId: string, id: string) {
mensagens-whatsapp.service.ts:228: await this.tenantValidator.validarEmpresaAtiva(empresaId);
mensagens-whatsapp.service.ts:230: return this.buscarMensagemOuFalhar(empresaId, id);
mensagens-whatsapp.service.ts:233: async cancelar(empresaId: string, id: string) {
mensagens-whatsapp.service.ts:236: await this.tenantValidator.validarEmpresaAtiva(empresaId);
mensagens-whatsapp.service.ts:239: empresaId,
mensagens-whatsapp.service.ts:247: empresaId,
mensagens-whatsapp.service.ts:250: status: StatusMensagemWhatsApp.CANCELADA,
mensagens-whatsapp.service.ts:261: empresaId,
mensagens-whatsapp.service.ts:268: `[WHATSAPP] mensagem cancelada empresaId=${empresaId} mensagemId=${mensagemCancelada.id} status=SUCESSO tempoMs=${tempoMs}`,
mensagens-whatsapp.service.ts:272: empresaId,
mensagens-whatsapp.service.ts:273: clienteId: mensagemCancelada.clienteId ?? undefined,
mensagens-whatsapp.service.ts:283: statusAnterior: mensagemAntes.status,
mensagens-whatsapp.service.ts:284: statusAtual: mensagemCancelada.status,
mensagens-whatsapp.service.ts:293: empresaId: string,
mensagens-whatsapp.service.ts:298: empresaId,
mensagens-whatsapp.service.ts:306: empresaId: string,
mensagens-whatsapp.service.ts:311: empresaId,
mensagens-whatsapp.service.ts:319: empresaId: string,
mensagens-whatsapp.service.ts:324: empresaId,
mensagens-whatsapp.service.ts:332: empresaId: string,
mensagens-whatsapp.service.ts:337: empresaId,
mensagens-whatsapp.service.ts:345: empresaId: string,
mensagens-whatsapp.service.ts:350: empresaId,
mensagens-whatsapp.service.ts:358: empresaId: string,
mensagens-whatsapp.service.ts:363: empresaId,
mensagens-whatsapp.service.ts:371: empresaId: string,
mensagens-whatsapp.service.ts:378: await this.tenantValidator.validarEmpresaAtiva(empresaId);
mensagens-whatsapp.service.ts:382: where: { empresaId },
mensagens-whatsapp.service.ts:385: const status =
mensagens-whatsapp.service.ts:387: ? StatusMensagemWhatsApp.CANCELADA
mensagens-whatsapp.service.ts:389: ? StatusMensagemWhatsApp.SIMULADA
mensagens-whatsapp.service.ts:390: : StatusMensagemWhatsApp.PENDENTE;
mensagens-whatsapp.service.ts:395: empresaId,
mensagens-whatsapp.service.ts:399: status,
mensagens-whatsapp.service.ts:415: `[WHATSAPP] mensagem automática criada empresaId=${empresaId} mensagemId=${mensagemCriada.id} tipo=${tipo} status=${mensagemCriada.status} tempoMs=${tempoMs}`,
mensagens-whatsapp.service.ts:419: empresaId,
mensagens-whatsapp.service.ts:441: empresaId: string,
mensagens-whatsapp.service.ts:444: | EnviarMensagemWhatsAppDto,
mensagens-whatsapp.service.ts:446: await this.validarFiltrosRelacionados(empresaId, {
mensagens-whatsapp.service.ts:447: clienteId: dto.clienteId,
mensagens-whatsapp.service.ts:454: empresaId: string,
mensagens-whatsapp.service.ts:459: if (filtros.clienteId) {
mensagens-whatsapp.service.ts:461: this.tenantValidator.validarCliente(
mensagens-whatsapp.service.ts:462: empresaId,
mensagens-whatsapp.service.ts:463: filtros.clienteId,
mensagens-whatsapp.service.ts:470: this.tenantValidator.validarUsuario(
mensagens-whatsapp.service.ts:471: empresaId,
mensagens-whatsapp.service.ts:480: empresaId,
mensagens-whatsapp.service.ts:490: empresaId: string,
mensagens-whatsapp.service.ts:497: empresaId,
mensagens-whatsapp.service.ts:501: empresaId: true,
mensagens-whatsapp.service.ts:511: 'Template WhatsApp não encontrado nesta empresa.',
mensagens-whatsapp.service.ts:519: empresaId: string,
mensagens-whatsapp.service.ts:526: empresaId,
mensagens-whatsapp.service.ts:541: empresaId: string,
mensagens-whatsapp.service.ts:552: const status = query['status'] as
mensagens-whatsapp.service.ts:553: | StatusMensagemWhatsApp
mensagens-whatsapp.service.ts:561: empresaId,
mensagens-whatsapp.service.ts:562: ...(status ? { status } : {}),
mensagens-whatsapp.service.ts:564: ...(query['clienteId']
mensagens-whatsapp.service.ts:565: ? { clienteId: query['clienteId'] }
mensagens-whatsapp.service.ts:597: cliente: {
mensagens-whatsapp.service.ts:613: empresaId: mensagem.empresaId,
mensagens-whatsapp.service.ts:614: clienteId: mensagem.clienteId,
mensagens-whatsapp.service.ts:615: clienteNome: mensagem.cliente?.nome,
mensagens-whatsapp.service.ts:622: status: mensagem.status,
mensagens-whatsapp.service.ts:632: cliente: {
mensagens-whatsapp.service.ts:659: cliente: {
``

Conclusao: o GET /area-cliente/me/mensagens-whatsapp esta comprovado. Qualquer POST, enviar ou composer permanece bloqueado ate existir contrato seguro, autenticacao, ownership e tenant comprovados.

Validacoes posteriores: DTO, response, ownership, tenant, ordenacao, paginacao, timestamps, status e cache privado do Service Worker.

## Decisao corrigida do Bloco 01

- Baseline Git: PASS.
- Documentacao Chat 62: PRESERVADA.
- Dossie Chat 64: CRIADO E ATUALIZADO.
- Implementacao funcional: NAO REALIZADA.
- Backend alterado: NAO.
- Bloco 01: APROVADO.
- Push, tag e deploy: NAO EXECUTADOS.

Proximo passo: BLOCO 02/15.

## Bloco 02/15 - Auditoria do contrato WhatsApp

- Endpoint Portal Cliente: GET /area-cliente/me/mensagens-whatsapp.
- Endpoint GET localizado: SIM.
- Referencias POST/envio no dominio WhatsApp: SIM - nao absorvidas automaticamente.
- Status do contrato: GET_ENDPOINT_CONFIRMED_SHAPE_REQUIRES_REVIEW.
- Implementacao de envio: NAO REALIZADA.
- Composer: NAO CRIADO.
- Recipient arbitrario: NAO CRIADO.
- Mutation de envio: NAO CRIADA.

### Evidencias de rotas

`	ext
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:55: @Get('me/perfil')
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:118: @Get('me/agendamentos')
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:162: @Get('me/proximos-agendamentos')
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:180: @Get('me/ultimo-agendamento')
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:198: @Get('me/fidelidade')
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:213: @Get('me/pontos')
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:245: @Get('me/beneficios')
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:260: @Get('me/pacotes')
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:275: @Get('me/pacotes/:pacoteId')
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:309: @Get('me/notificacoes')
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:341: @Get('me/notificacoes/nao-lidas')
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:394: @Get('me/mensagens-whatsapp')
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:426: @Get('me/dashboard')
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:441: @Get('me/historico')
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:45: @Get('me')
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:51: @Get('me/dashboard')
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:57: @Get('me/agendamentos')
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:66: @Get('me/proximos-agendamentos')
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:78: @Get('me/ultimo-agendamento')
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:84: @Get('me/fidelidade')
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:90: @Get('me/pontos')
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:99: @Get('me/beneficios')
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:105: @Get('me/pacotes')
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:111: @Get('me/pacotes/:pacoteId')
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:123: @Get('me/notificacoes')
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:132: @Get('me/notificacoes/nao-lidas')
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:150: @Get('me/mensagens-whatsapp')
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:159: @Get('me/historico')
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:36: import { MensagensWhatsappService } from './mensagens-whatsapp.service';
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:40: import { EnviarMensagemWhatsAppDto } from './dto/enviar-mensagem-whatsapp.dto';
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:45: @Controller('mensagens-whatsapp')
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:52: @Post()
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:100: @Post('enviar')
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:103: summary: 'Enviar mensagem de WhatsApp',
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:108: type: EnviarMensagemWhatsAppDto,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:136: async enviar(
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:138: @Body() dto: EnviarMensagemWhatsAppDto,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:142: const mensagem = await this.mensagensWhatsappService.enviar(
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:167: @Get()
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:227: @Get(':id')
`",
    ",


`	ext
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:27: import { PaginationDto } from '../../shared/dto/pagination.dto';
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:32: import { UpdatePerfilClienteDto } from './dto/update-perfil-cliente.dto';
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:49: return {
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:50: clienteId: req.user.clienteId ?? req.user.sub,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:51: empresaId: req.user.empresaId,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:59: 'Retorna o perfil do cliente final autenticado pelo JWT Cliente. O clienteId é obtido diretamente do token, sem exposição na URL.',
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:71: description: 'Cliente não encontrado no tenant autenticado.',
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:74: const { empresaId, clienteId } = this.getClienteAutenticado(req);
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:76: return this.areaClienteService.perfil(empresaId, clienteId);
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:86: type: UpdatePerfilClienteDto,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:103: description: 'Cliente não encontrado no tenant autenticado.',
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:107: @Body() dto: UpdatePerfilClienteDto,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:109: const { empresaId, clienteId } = this.getClienteAutenticado(req);
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:111: return this.areaClienteService.updatePerfil(
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:112: empresaId,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:113: clienteId,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:114: dto,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:122: 'Lista os agendamentos do cliente autenticado, com paginação e filtro opcional por status.',
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:125: name: 'status',
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:132: name: 'page',
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:137: name: 'limit',
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:149: @Query() query: PaginationDto,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:150: @Query('status') status?: string,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:152: const { empresaId, clienteId } = this.getClienteAutenticado(req);
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:154: return this.areaClienteService.agendamentos(
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:155: empresaId,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:156: clienteId,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:157: status,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:172: const { empresaId, clienteId } = this.getClienteAutenticado(req);
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:174: return this.areaClienteService.proximosAgendamentos(
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:175: empresaId,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:176: clienteId,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:190: const { empresaId, clienteId } = this.getClienteAutenticado(req);
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:192: return this.areaClienteService.ultimoAgendamento(
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:193: empresaId,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:194: clienteId,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:208: const { empresaId, clienteId } = this.getClienteAutenticado(req);
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:210: return this.areaClienteService.fidelidade(empresaId, clienteId);
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:220: name: 'page',
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:225: name: 'limit',
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:234: @Query() query: PaginationDto,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:236: const { empresaId, clienteId } = this.getClienteAutenticado(req);
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:238: return this.areaClienteService.pontos(
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:239: empresaId,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:240: clienteId,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:255: const { empresaId, clienteId } = this.getClienteAutenticado(req);
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:257: return this.areaClienteService.beneficios(empresaId, clienteId);
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:264: 'Lista os pacotes vinculados ao cliente autenticado, separados por status.',
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:270: const { empresaId, clienteId } = this.getClienteAutenticado(req);
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:272: return this.areaClienteService.pacotes(empresaId, clienteId);
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:300: const { empresaId, clienteId } = this.getClienteAutenticado(req);
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:302: return this.areaClienteService.pacoteDetalhes(
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:303: empresaId,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:304: clienteId,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:316: name: 'page',
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:321: name: 'limit',
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:330: @Query() query: PaginationDto,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:332: const { empresaId, clienteId } = this.getClienteAutenticado(req);
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:334: return this.areaClienteService.notificacoes(
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:335: empresaId,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:336: clienteId,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:351: const { empresaId, clienteId } = this.getClienteAutenticado(req);
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:353: return this.areaClienteService.notificacoesNaoLidas(
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:354: empresaId,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:355: clienteId,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:385: const { empresaId, clienteId } = this.getClienteAutenticado(req);
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:387: return this.areaClienteService.marcarNotificacaoComoLida(
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:388: empresaId,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:389: clienteId,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:394: @Get('me/mensagens-whatsapp')
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:401: name: 'page',
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:406: name: 'limit',
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:415: @Query() query: PaginationDto,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:417: const { empresaId, clienteId } = this.getClienteAutenticado(req);
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:419: return this.areaClienteService.mensagensWhatsapp(
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:420: empresaId,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:421: clienteId,
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:436: const { empresaId, clienteId } = this.getClienteAutenticado(req);
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:438: return this.areaClienteService.dashboard(empresaId, clienteId);
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:451: const { empresaId, clienteId } = this.getClienteAutenticado(req);
beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts:453: return this.areaClienteService.historico(empresaId, clienteId);
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:15: import { ClienteAreaQueryDto } from './dto/cliente-area-query.dto';
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:19: clienteId?: string;
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:20: empresaId: string;
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:37: const clienteId = req.user.clienteId ?? req.user.sub;
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:39: return {
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:40: clienteId,
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:41: empresaId: req.user.empresaId,
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:48: return this.clienteAreaService.me(this.getAuth(req));
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:54: return this.clienteAreaService.dashboard(this.getAuth(req));
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:61: @Query() query: ClienteAreaQueryDto,
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:63: return this.clienteAreaService.agendamentos(this.getAuth(req), query);
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:70: @Query() query: ClienteAreaQueryDto,
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:72: return this.clienteAreaService.proximosAgendamentos(
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:81: return this.clienteAreaService.ultimoAgendamento(this.getAuth(req));
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:87: return this.clienteAreaService.fidelidade(this.getAuth(req));
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:94: @Query() query: ClienteAreaQueryDto,
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:96: return this.clienteAreaService.pontos(this.getAuth(req), query);
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:102: return this.clienteAreaService.beneficios(this.getAuth(req));
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:106: @ApiOperation({ summary: 'Lista os pacotes do cliente separados por status.' })
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:108: return this.clienteAreaService.pacotes(this.getAuth(req));
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:117: return this.clienteAreaService.pacoteDetalhes(
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:127: @Query() query: ClienteAreaQueryDto,
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:129: return this.clienteAreaService.notificacoes(this.getAuth(req), query);
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:135: return this.clienteAreaService.notificacoesNaoLidas(this.getAuth(req));
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:144: return this.clienteAreaService.marcarNotificacaoComoLida(
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:150: @Get('me/mensagens-whatsapp')
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:154: @Query() query: ClienteAreaQueryDto,
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:156: return this.clienteAreaService.mensagensWhatsapp(this.getAuth(req), query);
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:163: @Query() query: ClienteAreaQueryDto,
beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts:165: return this.clienteAreaService.historico(this.getAuth(req), query);
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:33: import { PaginationDto } from '../../shared/dto/pagination.dto';
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:34: import { getEmpresaId } from '../../shared/utils/get-empresa-id';
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:36: import { MensagensWhatsappService } from './mensagens-whatsapp.service';
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:39: import { CreateMensagemWhatsAppDto } from './dto/create-mensagem-whatsapp.dto';
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:40: import { EnviarMensagemWhatsAppDto } from './dto/enviar-mensagem-whatsapp.dto';
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:45: @Controller('mensagens-whatsapp')
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:60: type: CreateMensagemWhatsAppDto,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:68: empresaId: '550e8400-e29b-41d4-a716-446655440000',
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:69: clienteId: '550e8400-e29b-41d4-a716-446655440000',
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:73: status: 'PENDENTE',
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:75: createdAt: '2026-06-14T10:00:00.000Z',
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:76: updatedAt: '2026-06-14T10:00:00.000Z',
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:92: @Body() dto: CreateMensagemWhatsAppDto,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:94: return this.mensagensWhatsappService.create(
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:95: getEmpresaId(req),
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:96: dto,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:108: type: EnviarMensagemWhatsAppDto,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:138: @Body() dto: EnviarMensagemWhatsAppDto,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:140: const empresaId = getEmpresaId(req);
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:143: empresaId,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:144: dto,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:148: empresaId,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:149: telefone: dto.destinatario,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:150: mensagem: dto.mensagem,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:157: return {
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:172: 'Lista as mensagens de WhatsApp da empresa autenticada com suporte a paginação. Endpoint usado para histórico de comunicações, acompanhamento de status e auditoria operacional.',
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:175: name: 'page',
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:181: name: 'limit',
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:196: status: 'ENVIADA',
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:198: createdAt: '2026-06-14T10:00:00.000Z',
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:202: page: 1,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:203: limit: 10,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:205: totalPages: 1,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:219: @Query() query: PaginationDto,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:221: return this.mensagensWhatsappService.findAll(
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:222: getEmpresaId(req),
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:245: empresaId: '550e8400-e29b-41d4-a716-446655440000',
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:246: clienteId: '550e8400-e29b-41d4-a716-446655440000',
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:250: status: 'ENVIADA',
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:255: createdAt: '2026-06-14T10:00:00.000Z',
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:256: updatedAt: '2026-06-14T10:01:00.000Z',
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:278: return this.mensagensWhatsappService.findOne(
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:279: getEmpresaId(req),
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:302: status: 'CANCELADA',
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:303: updatedAt: '2026-06-14T11:00:00.000Z',
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:325: return this.mensagensWhatsappService.cancelar(
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts:326: getEmpresaId(req),
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:9: StatusMensagemWhatsApp,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:15: import { PaginationDto } from '../../shared/dto/pagination.dto';
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:16: import { TenantValidatorService } from '../../shared/tenant';
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:24: import { CreateMensagemWhatsAppDto } from './dto/create-mensagem-whatsapp.dto';
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:25: import { EnviarMensagemWhatsAppDto } from './dto/enviar-mensagem-whatsapp.dto';
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:28: clienteId?: string;
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:40: private readonly tenantValidator: TenantValidatorService,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:44: empresaId: string,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:45: dto: CreateMensagemWhatsAppDto,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:49: await this.tenantValidator.validarEmpresaAtiva(empresaId);
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:50: await this.validarRelacionamentos(empresaId, dto);
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:54: empresaId,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:55: clienteId: dto.clienteId,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:56: usuarioId: dto.usuarioId,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:57: templateId: dto.templateId,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:58: tipo: dto.tipo,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:59: destinatario: dto.destinatario,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:60: mensagem: dto.mensagem,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:61: status: StatusMensagemWhatsApp.PENDENTE,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:69: `[WHATSAPP] mensagem criada empresaId=${empresaId} mensagemId=${mensagem.id} status=SUCESSO tempoMs=${tempoMs}`,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:73: empresaId,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:74: clienteId: mensagem.clienteId ?? undefined,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:87: return mensagem;
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:91: empresaId: string,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:92: dto: EnviarMensagemWhatsAppDto,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:96: await this.tenantValidator.validarEmpresaAtiva(empresaId);
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:99: await this.prisma.configuracaoWhatsApp.findUnique({
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:100: where: { empresaId },
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:115: await this.validarRelacionamentos(empresaId, dto);
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:117: const status = configuracao.usarModoDemonstracao
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:118: ? StatusMensagemWhatsApp.SIMULADA
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:119: : StatusMensagemWhatsApp.PENDENTE;
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:123: empresaId,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:124: clienteId: dto.clienteId,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:125: usuarioId: dto.usuarioId,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:126: templateId: dto.templateId,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:127: tipo: dto.tipo,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:128: destinatario: dto.destinatario,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:129: mensagem: dto.mensagem,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:130: status,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:132: status === StatusMensagemWhatsApp.SIMULADA
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:142: `[WHATSAPP] mensagem enviada empresaId=${empresaId} mensagemId=${mensagem.id} status=${mensagem.status} tempoMs=${tempoMs}`,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:146: empresaId,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:147: clienteId: mensagem.clienteId ?? undefined,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:160: status === StatusMensagemWhatsApp.SIMULADA
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:165: return mensagem;
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:169: empresaId: string,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:170: query: PaginationDto,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:172: await this.tenantValidator.validarEmpresaAtiva(empresaId);
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:174: await this.validarFiltrosRelacionados(empresaId, {
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:175: clienteId: query['clienteId'],
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:180: const { page, limit, skip, take } =
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:183: const orderByPermitidos = [
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:184: 'createdAt',
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:185: 'updatedAt',
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:187: 'status',
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:192: const orderBy: keyof Prisma.MensagemWhatsAppOrderByWithRelationInput =
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:193: orderByPermitidos.includes(query.orderBy ?? '')
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:194: ? (query.orderBy as keyof Prisma.MensagemWhatsAppOrderByWithRelationInput)
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:195: : 'createdAt';
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:200: empresaId,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:205: this.prisma.mensagemWhatsApp.findMany({
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:209: orderBy: {
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:210: [orderBy]: orderDirection,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:219: return buildPaginatedResponse(
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:222: page,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:223: limit,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:227: async findOne(empresaId: string, id: string) {
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:228: await this.tenantValidator.validarEmpresaAtiva(empresaId);
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:230: return this.buscarMensagemOuFalhar(empresaId, id);
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:233: async cancelar(empresaId: string, id: string) {
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:236: await this.tenantValidator.validarEmpresaAtiva(empresaId);
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:239: empresaId,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:247: empresaId,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:250: status: StatusMensagemWhatsApp.CANCELADA,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:261: empresaId,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:268: `[WHATSAPP] mensagem cancelada empresaId=${empresaId} mensagemId=${mensagemCancelada.id} status=SUCESSO tempoMs=${tempoMs}`,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:272: empresaId,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:273: clienteId: mensagemCancelada.clienteId ?? undefined,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:283: statusAnterior: mensagemAntes.status,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:284: statusAtual: mensagemCancelada.status,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:289: return mensagemCancelada;
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:293: empresaId: string,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:297: return this.prepararMensagemAutomatica(
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:298: empresaId,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:306: empresaId: string,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:310: return this.prepararMensagemAutomatica(
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:311: empresaId,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:319: empresaId: string,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:323: return this.prepararMensagemAutomatica(
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:324: empresaId,
beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts:332: empresaId: string,
`",
    ",


`	ext
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:1: // Chat 54 — Blocos 05–08 — WhatsApp API
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:4: getApiClient,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:5: } from "@/services/api/api-client";
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:8: campanhaWhatsappCreateResultSchema,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:9: campanhaWhatsappFormSchema,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:10: campanhaWhatsappResumoSchema,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:11: campanhaWhatsappUpdateSchema,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:12: campanhasWhatsappSchema,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:13: templateWhatsappFormSchema,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:14: templateWhatsappSchema,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:15: templatesWhatsappSchema,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:16: whatsappMensagemPayloadSchema,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:17: whatsappMensagemSchema,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:18: whatsappMensagemSendFormSchema,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:19: whatsappMessagesListParamsSchema,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:20: whatsappMessagesListResponseSchema,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:21: whatsappSendResultSchema,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:22: type CampanhaWhatsappFormValues,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:23: type CampanhaWhatsappUpdateValues,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:24: type TemplateWhatsappFormValues,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:25: type WhatsappMensagemPayload,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:26: type WhatsappMensagemSendFormValues,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:27: } from "../schemas/whatsapp.schemas";
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:29: CampanhaWhatsappCreateResult,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:30: CampanhaWhatsappResumo,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:31: TemplateWhatsapp,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:32: WhatsappMensagemResumo,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:33: WhatsappMessagesListParams,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:34: WhatsappMessagesListResponse,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:35: WhatsappSendResult,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:36: } from "../types/whatsapp.types";
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:38: export const whatsappApiPaths = {
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:39: configuracao: "/configuracao-whatsapp",
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:40: templates: "/templates-whatsapp",
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:41: mensagens: "/mensagens-whatsapp",
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:42: campanhas: "/campanhas-whatsapp",
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:45: export async function listTemplatesWhatsapp(): Promise<
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:46: TemplateWhatsapp[]
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:49: await getApiClient().get<unknown>(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:50: whatsappApiPaths.templates,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:53: return templatesWhatsappSchema.parse(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:58: export async function getTemplateWhatsapp(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:60: ): Promise<TemplateWhatsapp> {
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:62: await getApiClient().get<unknown>(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:63: `${whatsappApiPaths.templates}/${encodeURIComponent(id)}`,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:66: return templateWhatsappSchema.parse(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:71: export async function createTemplateWhatsapp(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:72: values: TemplateWhatsappFormValues,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:73: ): Promise<TemplateWhatsapp> {
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:75: templateWhatsappFormSchema.parse(values);
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:78: await getApiClient().post<unknown>(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:79: whatsappApiPaths.templates,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:83: return templateWhatsappSchema.parse(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:88: export async function updateTemplateWhatsapp(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:90: values: TemplateWhatsappFormValues,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:91: ): Promise<TemplateWhatsapp> {
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:93: templateWhatsappFormSchema.parse(values);
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:96: await getApiClient().patch<unknown>(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:97: `${whatsappApiPaths.templates}/${encodeURIComponent(id)}`,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:101: return templateWhatsappSchema.parse(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:106: export async function inactivateTemplateWhatsapp(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:108: ): Promise<TemplateWhatsapp> {
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:110: await getApiClient().patch<unknown>(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:111: `${whatsappApiPaths.templates}/${encodeURIComponent(id)}/inativar`,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:114: return templateWhatsappSchema.parse(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:119: function buildWhatsappMessagesParams(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:120: params: WhatsappMessagesListParams = {},
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:123: whatsappMessagesListParamsSchema.parse(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:140: export async function listWhatsappMessages(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:141: params: WhatsappMessagesListParams = {},
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:142: ): Promise<WhatsappMessagesListResponse> {
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:144: await getApiClient().get<unknown>(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:145: whatsappApiPaths.mensagens,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:148: buildWhatsappMessagesParams(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:154: return whatsappMessagesListResponseSchema.parse(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:159: export async function getWhatsappMessage(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:161: ): Promise<WhatsappMensagemResumo> {
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:163: await getApiClient().get<unknown>(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:164: `${whatsappApiPaths.mensagens}/${encodeURIComponent(id)}`,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:167: return whatsappMensagemSchema.parse(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:172: export async function createWhatsappMessage(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:173: values: WhatsappMensagemPayload,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:174: ): Promise<WhatsappMensagemResumo> {
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:176: whatsappMensagemPayloadSchema.parse(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:181: await getApiClient().post<unknown>(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:182: whatsappApiPaths.mensagens,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:186: return whatsappMensagemSchema.parse(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:191: export async function sendWhatsappMessage(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:192: values: WhatsappMensagemSendFormValues,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:193: ): Promise<WhatsappSendResult> {
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:195: whatsappMensagemSendFormSchema.parse(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:200: await getApiClient().post<unknown>(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:201: `${whatsappApiPaths.mensagens}/enviar`,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:205: return whatsappSendResultSchema.parse(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:210: export async function listWhatsappCampaigns(): Promise<
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:211: CampanhaWhatsappResumo[]
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:214: await getApiClient().get<unknown>(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:215: whatsappApiPaths.campanhas,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:218: return campanhasWhatsappSchema.parse(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:223: export async function getWhatsappCampaign(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:225: ): Promise<CampanhaWhatsappResumo> {
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:227: await getApiClient().get<unknown>(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:228: `${whatsappApiPaths.campanhas}/${encodeURIComponent(id)}`,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:231: return campanhaWhatsappResumoSchema.parse(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:236: export async function createWhatsappCampaign(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:237: values: CampanhaWhatsappFormValues,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:238: ): Promise<CampanhaWhatsappCreateResult> {
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:240: campanhaWhatsappFormSchema.parse(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:245: await getApiClient().post<unknown>(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:246: whatsappApiPaths.campanhas,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:250: return campanhaWhatsappCreateResultSchema.parse(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:255: export async function updateWhatsappCampaign(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:257: values: CampanhaWhatsappUpdateValues,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:258: ): Promise<CampanhaWhatsappResumo> {
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:260: campanhaWhatsappUpdateSchema.parse(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:265: await getApiClient().patch<unknown>(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:266: `${whatsappApiPaths.campanhas}/${encodeURIComponent(id)}`,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:270: return campanhaWhatsappResumoSchema.parse(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:274: export async function cancelWhatsappCampaign(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:276: ): Promise<CampanhaWhatsappResumo> {
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:278: await getApiClient().patch<unknown>(
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:279: `${whatsappApiPaths.campanhas}/${encodeURIComponent(id)}/cancelar`,
beauty-core-ui\src\features\whatsapp\services\whatsapp-api.ts:282: return campanhaWhatsappResumoSchema.parse(
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:9: type ApiResponse = Promise<{
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:13: type ApiGet = (
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:16: ) => ApiResponse;
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:18: type ApiPost = (
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:21: ) => ApiResponse;
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:23: const apiGet = vi.hoisted(
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:24: () => vi.fn<ApiGet>(),
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:27: const apiPost = vi.hoisted(
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:28: () => vi.fn<ApiPost>(),
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:31: const apiPatch = vi.hoisted(
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:36: "@/services/api/api-client",
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:38: getApiClient: () => ({
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:39: get: apiGet,
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:40: post: apiPost,
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:41: patch: apiPatch,
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:47: createWhatsappMessage,
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:48: getWhatsappMessage,
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:49: listWhatsappMessages,
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:50: sendWhatsappMessage,
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:51: } from "./whatsapp-api";
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:55: empresaId: "empresa-interna",
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:56: clienteId: null,
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:62: status: "PENDENTE",
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:74: describe("Chat 54 — Mensagens WhatsApp API", () => {
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:76: apiGet.mockReset();
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:77: apiPost.mockReset();
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:78: apiPatch.mockReset();
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:82: apiGet.mockResolvedValue({
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:94: await listWhatsappMessages({
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:102: expect(apiGet).toHaveBeenCalledWith(
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:103: "/mensagens-whatsapp",
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:116: it("busca detalhe e remove empresaId", async () => {
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:117: apiGet.mockResolvedValue({
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:127: await getWhatsappMessage(
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:131: expect(apiGet).toHaveBeenCalledWith(
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:132: "/mensagens-whatsapp/mensagem-1",
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:136: "empresaId",
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:144: it("registra mensagem sem empresaId", async () => {
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:145: apiPost.mockResolvedValue({
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:155: await createWhatsappMessage(
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:159: expect(apiPost).toHaveBeenCalledWith(
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:160: "/mensagens-whatsapp",
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:165: "empresaId",
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:170: apiPost.mockResolvedValue({
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:174: whatsappGerado: true,
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:177: queue: "whatsapp",
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:182: await sendWhatsappMessage({
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:188: expect(apiPost).toHaveBeenCalledWith(
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:189: "/mensagens-whatsapp/enviar",
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:200: whatsappGerado: true,
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:203: queue: "whatsapp",
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:208: expect(apiPatch).not.toHaveBeenCalled();
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:212: apiPost.mockResolvedValue({
beauty-core-ui\src\features\whatsapp\services\whatsapp-messages-api.test.ts:219: sendWhatsappMessage({
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-list.tsx:4: WhatsappMensagemResumo,
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-list.tsx:5: } from "../types/whatsapp.types";
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-list.tsx:7: formatWhatsappDateTime,
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-list.tsx:8: formatWhatsappEnumLabel,
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-list.tsx:9: } from "../utils/whatsapp-formatters";
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-list.tsx:11: interface MensagensWhatsappListProps {
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-list.tsx:12: mensagens: readonly WhatsappMensagemResumo[];
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-list.tsx:23: export function MensagensWhatsappList({
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-list.tsx:24: mensagens,
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-list.tsx:25: }: MensagensWhatsappListProps) {
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-list.tsx:26: if (mensagens.length === 0) {
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-list.tsx:56: Status
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-list.tsx:68: {mensagens.map(
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-list.tsx:86: {formatWhatsappEnumLabel(
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-list.tsx:93: {formatWhatsappEnumLabel(
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-list.tsx:94: mensagem.status,
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-list.tsx:104: {formatWhatsappDateTime(
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:8: useMutation,
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:9: useQuery,
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:10: useQueryClient,
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:11: } from "@tanstack/react-query";
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:17: canSendWhatsAppMessage,
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:18: } from "../permissions/whatsapp.permissions";
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:20: whatsappKeys,
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:21: } from "../queries/whatsapp-keys";
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:23: whatsappQueryOptions,
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:24: } from "../queries/whatsapp-query-options";
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:26: WhatsappMensagemSendFormValues,
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:27: } from "../schemas/whatsapp.schemas";
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:29: listWhatsappMessages,
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:30: sendWhatsappMessage,
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:31: } from "../services/whatsapp-api";
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:33: WhatsappMessagesListParams,
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:34: WhatsappSendResult,
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:35: } from "../types/whatsapp.types";
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:37: MensagemWhatsappForm,
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:38: } from "../messages/mensagem-whatsapp-form";
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:40: MensagensWhatsappList,
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:41: } from "./mensagens-whatsapp-list";
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:43: interface MensagensWhatsappSectionProps {
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:47: function getErrorMessage(
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:55: export function MensagensWhatsappSection({
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:57: }: MensagensWhatsappSectionProps) {
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:59: canSendWhatsAppMessage(role);
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:61: const queryClient = useQueryClient();
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:75: const [lastSend, setLastSend] =
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:76: useState<WhatsappSendResult | null>(
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:80: const params: WhatsappMessagesListParams = {
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:92: const query = useQuery(
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:93: whatsappQueryOptions.mensagensList(
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:96: listWhatsappMessages(
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:103: const sendMutation = useMutation({
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:105: mutationFn: sendWhatsappMessage,
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:108: setLastSend(result);
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:115: await queryClient.invalidateQueries({
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:116: queryKey:
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:117: whatsappKeys.mensagens(),
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:122: async function handleSend(
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:123: values: WhatsappMensagemSendFormValues,
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:125: setLastSend(null);
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:128: await sendMutation.mutateAsync(
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:132: // O estado da mutation mantém o erro.
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:151: Mensagens WhatsApp
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:162: const meta = query.data?.meta;
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:169: Enviar mensagem
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:178: {sendMutation.isError && (
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:183: {getErrorMessage(
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:184: sendMutation.error,
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:189: {lastSend && (
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:192: role="status"
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:200: <MensagemWhatsappForm
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:203: sendMutation.isPending
beauty-core-ui\src\features\whatsapp\components\mensagens-whatsapp-section.tsx:205: onSubmit={handleSend}
`",
    ",


O Portal somente podera consumir o endpoint read-only depois da confirmacao do DTO, response, autenticacao, ownership, tenant, ordenacao, paginacao, timestamps e status.

Qualquer referencia administrativa a POST/envio permanece fora do escopo do Portal Cliente.

O Bloco 02 nao deve inventar shape, adapter ou query enquanto a evidencia do contrato nao estiver consolidada.


## Bloco 02/15 - Evidencia final do contrato e padroes

- O endpoint GET /area-cliente/me/mensagens-whatsapp foi localizado nos controllers area-cliente e cliente-area.
- O cliente autenticado fornece clienteId e empresaId a partir do contexto JWT.
- PaginationDto/ClienteAreaQueryDto e o metodo mensagensWhatsapp devem ser usados como autoridade do formato.
- O service administrativo whatsapp-api.ts possui POST e envio; ele nao deve ser reutilizado diretamente pelo Portal Cliente.
- Nenhuma mutation de envio foi criada neste bloco.
- Nenhuma alteracao backend foi realizada.

A implementacao do adapter/query do Portal sera feita somente conforme o formato confirmado nos trechos acima.


## Correcao operacional do Bloco 02

- A primeira tentativa executou npm na raiz do repositorio, onde nao existe package.json.
- O package.json correto pertence a beauty-core-ui.
- Os testes focados devem ser executados a partir de beauty-core-ui.
- Nenhuma implementacao foi criada nesta etapa.
- O formato exato do item WhatsApp sera definido somente pelos trechos reais do backend.
- O service administrativo com POST/enviar permanece fora do Portal Cliente.


## Correcao do Bloco 02 - TypeScript

- Falha inicial: parametros page e limit foram inferidos como obrigatorios.
- Correcao: PortalWhatsappMessagesParams passou a usar z.input.
- Motivo: defaults do schema devem permanecer opcionais na entrada.
- Testes focados: PASS.
- TypeScript: PASS.
- Mutation/envio no Portal: AUSENTE.
- Backend alterado: NAO.

Status atualizado do Bloco 02: PASS.
Proximo passo: Bloco 03/15 - pagina, routing e navegacao.

## Correcao do Bloco 03 - regressao de navegacao

- Falha encontrada: teste de navegacao ainda esperava a lista anterior de rotas.
- Correcao aplicada: teste atualizado para incluir Inicio, Perfil, Notificacoes, Historico e Mensagens.
- Testes focados: PASS.
- TypeScript: PASS.
- Rota /portal/mensagens: PASS.
- PortalPrivateRoute: PASS.
- Historico read-only: PASS.
- Mutation/envio: AUSENTE.
- Backend alterado: NAO.

Status do Bloco 03: PASS.
Proximo passo: Bloco 04/15 - notificacoes, cache e integracao.

## Correcao critica do Bloco 04 - familia real de cache

- Falha encontrada: o teste revelou que notificacoes usam a familia portal/private/notifications.
- Problema corrigido: mutation invalidava portal/notifications, que nao correspondia a chave real.
- Invalidacao atual: portal/private/notifications.
- Query de mensagens permanece separada em portal/messages.
- Teste de fronteira atualizado conforme as chaves reais.
- Testes focados: PASS.
- TypeScript: PASS.
- Backend alterado: NAO.

Status do Bloco 04: PASS apos correcao de cache.
Proximo passo: Bloco 05/15 - PWA, manifest, metadata e icons.

## Bloco 05/15 - PWA, manifest, metadata e icons

- Manifest Next.js criado em src/app/manifest.ts.
- name e short_name definidos.
- start_url restrito a /portal.
- scope restrito a /portal/.
- display standalone configurado.
- background_color e theme_color definidos.
- Master 1024x1024 preservado.
- Derivacao 192x192 criada.
- Derivacao 512x512 criada.
- Derivacao maskable 512x512 criada sem redesenhar o simbolo.
- Testes de manifest aprovados.
- TypeScript aprovado.
- Service Worker ainda pendente para o Bloco 06.
- Installability completa ainda sera validada apos Service Worker.
- Backend alterado: NAO.

Status do Bloco 05: PASS.
Proximo passo: Bloco 06/15 - Service Worker e estrategia de cache.

## Correcao do Bloco 06 - escopo do Service Worker

- Falha encontrada: o teste procurava o escopo no arquivo public/sw.js.
- Correcao aplicada: o escopo foi validado no arquivo de registro do Service Worker.
- public/sw.js restringe o tratamento a /portal/.
- portal-service-worker-registration.tsx registra o SW com scope /portal/.
- Testes estruturais: PASS.
- TypeScript: PASS.
- Tokens, sessao, tenant e PII: nao armazenados.
- Cache privado de API: nao implementado.

Status do Bloco 06: PASS apos correcao do teste.
Proximo passo: Bloco 07/15 - offline UX e update UX.

## Bloco 07/15 - Offline UX e update UX

- Hook reativo online/offline criado.
- Indicador offline acessivel integrado ao PortalShell.
- Pagina de mensagens atualizada para status reativo.
- Retry permanece disponivel para consultas privadas.
- Update check periodico do Service Worker configurado.
- Nenhuma fila offline criada.
- Nenhum background sync criado.
- Nenhuma mutation foi prometida para sincronizacao posterior.
- Testes focados: PASS.
- TypeScript: PASS.
- Backend alterado: NAO.

Status do Bloco 07: PASS.
Proximo passo: Bloco 08/15 - performance, LCP, assets e imagens.

## Bloco 08/15 - Performance, LCP, assets e imagens

- Warning herdado do portal-empty-state.webp investigado.
- Proporcao do PortalStatePanel corrigida de 320x220 para 320x320.
- width explicito preservado.
- height proporcional preservado.
- sizes responsivo preservado.
- priority nao utilizado indiscriminadamente.
- next/image e PortalAssetImage auditados.
- Runtime assets presentes.
- Sources preservados fora do runtime.
- Layout shift por proporcao incorreta tratado.
- Teste de performance dos assets: PASS.
- Testes focados: PASS.
- TypeScript: PASS.
- Backend alterado: NAO.

Status do Bloco 08: PASS.
Proximo passo: Bloco 09/15 - bundle, queries, network e cache.

## Bloco 09/15 - Bundle, queries, network e cache

- Política de cache de notificações padronizada.
- staleTime configurado.
- gcTime configurado.
- retry limitado a uma tentativa.
- refetchOnWindowFocus desativado.
- Polling não utilizado em mensagens ou notificações.
- Famílias portal/private/notifications e portal/messages mantidas separadas.
- Client boundaries inventariados.
- Chamadas de rede e query references auditadas.
- Imports potencialmente pesados auditados.
- Duplicação de GET de mensagens não encontrada.
- Teste de política de queries: PASS.
- Testes focados: PASS.
- TypeScript: PASS.
- Backend alterado: NAO.

Status do Bloco 09: PASS.
Proximo passo: Bloco 10/15 - seguranca e privacidade final.

## Bloco 10/15 - Seguranca e privacidade final

- Arquivos funcionais do Portal inventariados.
- Sinks XSS e APIs perigosas auditados.
- Endpoint de mensagens mantido fixo.
- clienteId, empresaId e tenantId não são aceitos como parâmetros frontend.
- Paginação usa schema estrito e limite máximo.
- Destinatário WhatsApp mascarado na UI.
- IDs internos não são exibidos.
- Service Worker não armazena tokens, sessão ou PII.
- APIs privadas permanecem fora do cache.
- Redirect seguro preservado.
- Composer e envio permanecem ausentes.
- Teste estrutural de segurança: PASS.
- Regressão focada: PASS.
- TypeScript: PASS.
- Backend alterado: NAO.

Status do Bloco 10: PASS.
Proximo passo: Bloco 11/15 - A11y, responsividade, UX e hardening pre-release.

## Correcao do Bloco 11 - regressao da navegacao

- Falha encontrada: teste esperava seis links.
- Causa: cinco rotas oficiais sao renderizadas em menu desktop e menu mobile.
- Correcao aplicada: expectativa atualizada para dez links.
- Rotas confirmadas: Portal, Perfil, Notificacoes, Historico e Mensagens.
- Regressao focada: PASS.
- TypeScript: PASS.
- E2E real dos seis viewports permanece reservado ao Bloco 14.
- Backend alterado: NAO.

Status do Bloco 11: PASS apos correcao.
Proximo passo: Bloco 12/15 - suite unitaria completa do Portal Cliente.

## Correcao do Bloco 12 - execucao da suite no Windows

- Falha inicial causada pelo envio de multiplos caminhos como um unico argumento ao Vitest.
- Correcao aplicada: execucao por diretorios usando src/features/portal e src/app/portal.
- Testes unitarios encontrados: 48.
- node_modules excluido.
- E2E excluido.
- Suite unitaria completa do Portal: PASS.
- TypeScript: PASS.
- Backend alterado: NAO.

Status do Bloco 12: PASS apos correcao de execucao.
Proximo passo: Bloco 13/15 - integracao transversal completa.

## Correcao do Bloco 13 - verificacao do query gate

- O verificador inicial procurava literais 401 e 403 diretamente no arquivo.
- A arquitetura centraliza esses status em funcoes do query gate.
- handlePortalAccessError e usePortalAccessErrorHandler confirmados.
- Testes oficiais do query gate cobrem os fluxos de acesso.
- Auth, sessao, tenant, notificacoes e mensagens integrados.
- Cache privado de notificacoes validado.
- Mensagens permanecem read-only.
- PWA e offline integrados ao PortalShell.
- Integration gate: PASS.
- TypeScript: PASS.
- Backend alterado: NAO.

Status do Bloco 13: PASS apos correcao.
Proximo passo: Bloco 14/15 - E2E final do Portal Cliente.

## Bloco 14/15 - E2E final do Portal Cliente

- Playwright localizado e configurado.
- Specs relacionados ao Portal inventariados.
- Testes listados pelo Playwright.
- E2E do Portal executado com repeat-each=2.
- Fluxos cobertos conforme os specs existentes do Portal.
- Validacao final de console.error, pageerror e overflow depende das assercoes dos specs executados.
- E2E global permanece reservado ao Bloco 15.
- Build global, coverage global e npm audit permanecem reservados ao Bloco 15.
- Push, tag e deploy: NAO EXECUTADOS.

Status do Bloco 14: PASS.
Proximo passo: Bloco 15/15 - quality gate global, auditoria final, stage e commit.

## CHAT 64 — BLOCO 14/15 — PRIORITY E LCP CORRIGIDOS

- PortalAssetImage não aplica loading="lazy" por padrão.
- Imagens com priority não recebem loading conflitante.
- Estados acima da dobra utilizam loading="eager".
- Testes focados aprovados.
- TypeScript aprovado.
- E2E do Portal aprovado em seis viewports com repetição.
- Nenhum backend, push, tag ou deploy alterado.
