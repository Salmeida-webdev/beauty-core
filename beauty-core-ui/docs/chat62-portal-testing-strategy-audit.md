# Beauty Core 1.0 — Chat 62
## BLOCO 10/15 — Auditoria da Estratégia de Testes

- Data: 2026-09-05 23:15:14 -03:00
- Branch: chat32-bullmq-enterprise
- HEAD: b9913a7c007e03929ac893ef01e1a849f04394fe
- Backend alterado: NÃO

## 1. Objetivo

Mapear a infraestrutura de testes existente e definir a cobertura mínima necessária para implementar os domínios do Chat 62 com segurança.

Nenhum teste novo foi criado neste bloco.

## 2. Testes unitários e de componentes

Quantidade: 296

- `src\app\portal\portal-private-routing.test.tsx`
- `src\app\portal\portal-routing.test.tsx`
- `src\components\forms\form-foundation.test.tsx`
- `src\components\layout\admin-shell-boundary.test.tsx`
- `src\components\layout\admin-sidebar.test.tsx`
- `src\components\layout\page-header.test.tsx`
- `src\components\states\feedback-states.test.tsx`
- `src\components\ui\status-badge.test.tsx`
- `src\config\admin-navigation.chat53.test.ts`
- `src\config\admin-navigation.chat55.test.ts`
- `src\config\admin-navigation.test.ts`
- `src\constants\roles.test.ts`
- `src\features\agendamentos\agendamentos-cache-hardening.test.ts`
- `src\features\agendamentos\agendamentos-contract-hardening.test.ts`
- `src\features\agendamentos\agendamentos-foundation.test.ts`
- `src\features\agendamentos\agendamentos-navigation.test.ts`
- `src\features\agendamentos\agendamentos-permissions-hardening.test.ts`
- `src\features\agendamentos\agendamentos-url-hardening.test.ts`
- `src\features\agendamentos\chat51-agenda-flow.integration.test.ts`
- `src\features\agendamentos\components\agenda-calendar.test.tsx`
- `src\features\agendamentos\components\agenda-calendar-accessibility.test.tsx`
- `src\features\agendamentos\components\agenda-calendar-toolbar.test.tsx`
- `src\features\agendamentos\components\agenda-detail-openers.test.tsx`
- `src\features\agendamentos\components\agenda-list.test.tsx`
- `src\features\agendamentos\components\agendamento-create-dialog.integration.test.tsx`
- `src\features\agendamentos\components\agendamento-detail-dialog.integration.test.tsx`
- `src\features\agendamentos\components\agendamento-status-actions.test.tsx`
- `src\features\agendamentos\components\agenda-option-picker.test.tsx`
- `src\features\agendamentos\components\agenda-status-badge.test.tsx`
- `src\features\agendamentos\components\agenda-visual-audit.test.ts`
- `src\features\agendamentos\forms\agendamento-create-form.schema.test.ts`
- `src\features\agendamentos\forms\agendamento-create-form.test.tsx`
- `src\features\agendamentos\forms\agendamento-create-payload.test.ts`
- `src\features\agendamentos\forms\agendamento-edit-payload.test.ts`
- `src\features\agendamentos\queries\agendamentos-query-options.test.ts`
- `src\features\agendamentos\services\agendamentos-api.test.ts`
- `src\features\agendamentos\services\agendamentos-create-api.test.ts`
- `src\features\agendamentos\services\agendamentos-options-api.test.ts`
- `src\features\agendamentos\services\agendamentos-status-api.test.ts`
- `src\features\agendamentos\services\agendamentos-update-api.test.ts`
- `src\features\agendamentos\utils\agenda-calendar.test.ts`
- `src\features\agendamentos\utils\agenda-filters.test.ts`
- `src\features\arquivos\arquivos-foundations.test.ts`
- `src\features\arquivos\components\arquivo-remove-dialog.test.tsx`
- `src\features\arquivos\components\arquivos-actions.test.tsx`
- `src\features\arquivos\components\arquivos-filters.test.tsx`
- `src\features\arquivos\components\arquivos-list.test.tsx`
- `src\features\arquivos\components\arquivos-view.integration.test.tsx`
- `src\features\arquivos\components\arquivo-upload-dialog.test.tsx`
- `src\features\arquivos\queries\arquivos-query-options.test.ts`
- `src\features\arquivos\services\arquivos-api.test.ts`
- `src\features\arquivos\utils\arquivo-relations.test.ts`
- `src\features\arquivos\utils\arquivos-action-error.test.ts`
- `src\features\arquivos\utils\arquivos-api-error.test.ts`
- `src\features\arquivos\utils\arquivos-download.test.ts`
- `src\features\arquivos\utils\arquivos-list-url.test.ts`
- `src\features\arquivos\utils\arquivos-pagination.test.ts`
- `src\features\arquivos\utils\arquivos-query-access.test.ts`
- `src\features\arquivos\utils\arquivo-tipo.test.ts`
- `src\features\auth\components\admin-login-boundary.test.tsx`
- `src\features\auth\navigation\admin-login-navigation-state.test.ts`
- `src\features\auth\navigation\admin-return-to.test.ts`
- `src\features\auth\permissions\admin-permissions.test.ts`
- `src\features\auth\schemas\login.schema.test.ts`
- `src\features\auth\services\auth-session.test.ts`
- `src\features\automacoes\chat54-foundations.test.ts`
- `src\features\automacoes\forms\automacao-evento-form.test.tsx`
- `src\features\automacoes\schemas\automacoes-operacionais-schema.test.ts`
- `src\features\automacoes\services\automacoes-operacionais-api.test.ts`
- `src\features\chat50\chat50-cross-module.integration.test.ts`
- `src\features\chat50\chat50-ui-hardening.test.ts`
- `src\features\chat54\chat54-cross-integration.test.ts`
- `src\features\chat56\admin-sessions-query-gating.test.ts`
- `src\features\clientes\components\cliente-form-dialog.integration.test.tsx`
- `src\features\clientes\components\cliente-lgpd-actions.integration.test.tsx`
- `src\features\clientes\components\cliente-profile-extras.integration.test.tsx`
- `src\features\clientes\components\cliente-profile-view.integration.test.tsx`
- `src\features\clientes\components\clientes-view.integration.test.tsx`
- `src\features\clientes\forms\cliente-form.schema.test.ts`
- `src\features\clientes\forms\cliente-form.test.tsx`
- `src\features\clientes\forms\cliente-form-error.test.ts`
- `src\features\clientes\forms\cliente-payload.test.ts`
- `src\features\clientes\hooks\use-debounced-value.test.tsx`
- `src\features\clientes\permissions\clientes-permissions.test.ts`
- `src\features\clientes\queries\cliente-profile-keys.test.ts`
- `src\features\clientes\queries\cliente-profile-query-options.test.ts`
- `src\features\clientes\queries\clientes-keys.test.ts`
- `src\features\clientes\queries\clientes-query-options.test.ts`
- `src\features\clientes\schemas\cliente-profile-extras.schemas.test.ts`
- `src\features\clientes\schemas\clientes.schemas.test.ts`
- `src\features\clientes\services\cliente-profile-actions-api.test.ts`
- `src\features\clientes\services\cliente-profile-extras-api.test.ts`
- `src\features\clientes\services\clientes-api.test.ts`
- `src\features\clientes\services\clientes-lgpd-api.test.ts`
- `src\features\clientes\utils\clientes-list-url.test.ts`
- `src\features\configuracoes\chat55-transversal.integration.test.tsx`
- `src\features\configuracoes\components\branding-capabilities-card.test.tsx`
- `src\features\configuracoes\components\branding-logo-upload-card.test.tsx`
- `src\features\configuracoes\components\branding-preview-a11y.test.tsx`
- `src\features\configuracoes\components\branding-preview-card.test.tsx`
- `src\features\configuracoes\components\configuracoes-gerais-card.test.tsx`
- `src\features\configuracoes\components\configuracoes-navigation-card.test.tsx`
- `src\features\configuracoes\components\configuracoes-readonly-notice.test.tsx`
- `src\features\configuracoes\configuracoes-foundations.test.ts`
- `src\features\configuracoes\permissions\chat55-rbac.test.ts`
- `src\features\configuracoes\services\configuracoes-api.test.ts`
- `src\features\configuracoes\utils\configuracoes-branding.test.ts`
- `src\features\configuracoes\utils\configuracoes-gerais.test.ts`
- `src\features\configuracoes\utils\configuracoes-logo.test.ts`
- `src\features\configuracoes\utils\tenant-runtime-branding.test.ts`
- `src\features\dashboard\components\clients-overview.test.tsx`
- `src\features\dashboard\components\dashboard-accessibility.test.tsx`
- `src\features\dashboard\components\dashboard-filters.test.tsx`
- `src\features\dashboard\components\dashboard-kpi-grid.test.tsx`
- `src\features\dashboard\components\dashboard-section-states.test.tsx`
- `src\features\dashboard\components\dashboard-summary-states.test.tsx`
- `src\features\dashboard\components\dashboard-view.integration.test.tsx`
- `src\features\dashboard\components\engagement-overview.test.tsx`
- `src\features\dashboard\components\rankings-overview.test.tsx`
- `src\features\dashboard\permissions\dashboard-permissions.test.ts`
- `src\features\dashboard\queries\dashboard-keys.test.ts`
- `src\features\dashboard\queries\dashboard-query-options.test.ts`
- `src\features\dashboard\queries\dashboard-query-policy.test.ts`
- `src\features\dashboard\schemas\dashboard.schemas.test.ts`
- `src\features\dashboard\services\dashboard-api.test.ts`
- `src\features\dashboard\utils\dashboard-chart-data.test.ts`
- `src\features\dashboard\utils\dashboard-distributions.test.ts`
- `src\features\dashboard\utils\dashboard-error-reference.test.ts`
- `src\features\dashboard\utils\dashboard-formatters.test.ts`
- `src\features\dashboard\utils\dashboard-periods.test.ts`
- `src\features\dashboard\utils\dashboard-period-url.test.ts`
- `src\features\dashboard\utils\dashboard-summary.test.ts`
- `src\features\fidelidade\beneficios\beneficio-form.schema.test.ts`
- `src\features\fidelidade\beneficios\beneficios-api.test.ts`
- `src\features\fidelidade\beneficios\beneficios-view.test.tsx`
- `src\features\fidelidade\chat53-transversal.integration.test.ts`
- `src\features\fidelidade\chat53-ux-hardening.test.ts`
- `src\features\fidelidade\components\fidelidade-operacional-view.test.tsx`
- `src\features\fidelidade\components\fidelidade-programa-view.test.tsx`
- `src\features\fidelidade\cupons\cupom-form.schema.test.ts`
- `src\features\fidelidade\cupons\cupons-api.test.ts`
- `src\features\fidelidade\cupons\cupons-view.test.tsx`
- `src\features\fidelidade\forms\configuracao-fidelidade-form.schema.test.ts`
- `src\features\fidelidade\forms\nivel-fidelidade-form.schema.test.ts`
- `src\features\fidelidade\operacoes\fidelidade-operacoes.schema.test.ts`
- `src\features\fidelidade\operacoes\fidelidade-operacoes-api.test.ts`
- `src\features\fidelidade\operacoes\fidelidade-operacoes-view.test.tsx`
- `src\features\fidelidade\permissions\fidelidade-permissions.test.ts`
- `src\features\fidelidade\queries\fidelidade-query-keys.test.ts`
- `src\features\fidelidade\schemas\fidelidade.schemas.test.ts`
- `src\features\fidelidade\services\fidelidade-api.test.ts`
- `src\features\fidelidade\services\fidelidade-programa-api.test.ts`
- `src\features\fidelidade\utils\fidelidade-formatters.test.ts`
- `src\features\fidelidade\utils\fidelidade-historico-formatters.test.ts`
- `src\features\financeiro\chat52-financeiro-flow.integration.test.ts`
- `src\features\financeiro\components\cancelar-movimentacao-dialog.test.tsx`
- `src\features\financeiro\components\categoria-financeira-form.test.tsx`
- `src\features\financeiro\components\comissao-form.test.tsx`
- `src\features\financeiro\components\comissoes-list.test.tsx`
- `src\features\financeiro\components\financeiro-operacional-cards.test.tsx`
- `src\features\financeiro\components\financeiro-view.test.tsx`
- `src\features\financeiro\components\movimentacao-financeira-form.test.tsx`
- `src\features\financeiro\components\movimentacoes-financeiras-filters.test.tsx`
- `src\features\financeiro\components\movimentacoes-financeiras-list.test.tsx`
- `src\features\financeiro\components\pagamento-movimentacao-form.test.tsx`
- `src\features\financeiro\financeiro-navigation.test.ts`
- `src\features\financeiro\financeiro-ux-hardening.test.ts`
- `src\features\financeiro\forms\categoria-financeira-form.schema.test.ts`
- `src\features\financeiro\forms\categoria-financeira-payload.test.ts`
- `src\features\financeiro\forms\comissao-form.schema.test.ts`
- `src\features\financeiro\forms\comissao-payload.test.ts`
- `src\features\financeiro\forms\movimentacao-financeira-form.schema.test.ts`
- `src\features\financeiro\forms\movimentacao-financeira-payload.test.ts`
- `src\features\financeiro\forms\pagamento-movimentacao-form.schema.test.ts`
- `src\features\financeiro\permissions\financeiro-module-access.test.ts`
- `src\features\financeiro\permissions\financeiro-permissions.test.ts`
- `src\features\financeiro\queries\categorias-financeiras-query-options.test.ts`
- `src\features\financeiro\queries\comissoes-query-options.test.ts`
- `src\features\financeiro\queries\financeiro-keys.test.ts`
- `src\features\financeiro\queries\financeiro-query-options.test.ts`
- `src\features\financeiro\queries\movimentacoes-financeiras-query-options.test.ts`
- `src\features\financeiro\queries\relatorios-financeiros-query-options.test.ts`
- `src\features\financeiro\schemas\categorias-financeiras.schemas.test.ts`
- `src\features\financeiro\schemas\comissoes.schemas.test.ts`
- `src\features\financeiro\schemas\financeiro.schemas.test.ts`
- `src\features\financeiro\schemas\movimentacoes-financeiras.schemas.test.ts`
- `src\features\financeiro\schemas\relatorios-financeiros.schemas.test.ts`
- `src\features\financeiro\services\categorias-financeiras-api.test.ts`
- `src\features\financeiro\services\comissoes-api.test.ts`
- `src\features\financeiro\services\financeiro-api.test.ts`
- `src\features\financeiro\services\movimentacoes-financeiras-api.test.ts`
- `src\features\financeiro\services\relatorios-financeiros-api.test.ts`
- `src\features\financeiro\testing\financeiro-ordering-contract.test.ts`
- `src\features\financeiro\utils\comissao-actions.test.ts`
- `src\features\financeiro\utils\comissao-input.test.ts`
- `src\features\financeiro\utils\financeiro-formatters.test.ts`
- `src\features\financeiro\utils\financeiro-query.test.ts`
- `src\features\financeiro\utils\movimentacao-financeira-actions.test.ts`
- `src\features\financeiro\utils\movimentacao-financeira-formatters.test.ts`
- `src\features\financeiro\utils\movimentacoes-list-url.test.ts`
- `src\features\financeiro\utils\movimentacoes-pagination.test.ts`
- `src\features\financeiro\utils\relatorios-financeiros-periodo.test.ts`
- `src\features\notificacoes\chat54-foundations.test.ts`
- `src\features\notificacoes\components\notificacoes-list.test.tsx`
- `src\features\notificacoes\schemas\notificacoes-history-schema.test.ts`
- `src\features\notificacoes\schemas\notificacoes-settings-schema.test.ts`
- `src\features\notificacoes\services\notificacoes-history-api.test.ts`
- `src\features\notificacoes\services\notificacoes-settings-api.test.ts`
- `src\features\notificacoes\settings\notificacoes-settings-form.test.tsx`
- `src\features\pacotes\catalogo\pacote-form.schema.test.ts`
- `src\features\pacotes\catalogo\pacotes-catalogo-api.test.ts`
- `src\features\pacotes\catalogo\pacotes-catalogo-view.test.tsx`
- `src\features\pacotes\clientes-pacotes\cliente-pacote-form.schema.test.ts`
- `src\features\pacotes\clientes-pacotes\clientes-pacotes-api.test.ts`
- `src\features\pacotes\clientes-pacotes\clientes-pacotes-permissions.test.ts`
- `src\features\pacotes\clientes-pacotes\clientes-pacotes-url-state.test.ts`
- `src\features\pacotes\clientes-pacotes\clientes-pacotes-view.test.tsx`
- `src\features\pacotes\permissions\pacotes-permissions.test.ts`
- `src\features\pacotes\queries\pacotes-query-keys.test.ts`
- `src\features\pacotes\schemas\pacotes.schemas.test.ts`
- `src\features\pacotes\services\pacotes-api.test.ts`
- `src\features\pacotes\utils\pacotes-formatters.test.ts`
- `src\features\portal\assets\portal-assets.test.ts`
- `src\features\portal\auth\portal-auth-api.test.ts`
- `src\features\portal\auth\portal-auth-cache.test.ts`
- `src\features\portal\auth\portal-auth-context.test.tsx`
- `src\features\portal\auth\portal-auth-context-session.test.tsx`
- `src\features\portal\auth\portal-auth-errors.test.ts`
- `src\features\portal\auth\portal-auth-route-orchestrator.test.tsx`
- `src\features\portal\auth\portal-auth-routing.test.ts`
- `src\features\portal\auth\portal-auth-session.test.ts`
- `src\features\portal\auth\portal-otp-request.test.tsx`
- `src\features\portal\auth\portal-otp-verification.test.tsx`
- `src\features\portal\auth\portal-private-route.test.tsx`
- `src\features\portal\components\portal-asset-image.test.tsx`
- `src\features\portal\components\portal-branding.test.tsx`
- `src\features\portal\components\portal-dashboard-data-boundary.test.tsx`
- `src\features\portal\components\portal-navigation.test.tsx`
- `src\features\portal\components\portal-page-container.test.tsx`
- `src\features\portal\components\portal-responsive-a11y.test.tsx`
- `src\features\portal\components\portal-shell.test.tsx`
- `src\features\portal\errors\portal-resource-errors.test.ts`
- `src\features\portal\navigation\portal-navigation.test.ts`
- `src\features\portal\pages\portal-authenticated-surface.test.tsx`
- `src\features\portal\pages\portal-auth-ux.test.tsx`
- `src\features\portal\pages\portal-first-access-experience.test.tsx`
- `src\features\portal\pages\portal-first-access-page.test.tsx`
- `src\features\portal\pages\portal-terms-consent.test.tsx`
- `src\features\portal\portal-foundation.integration.test.tsx`
- `src\features\portal\query\portal-client-query-keys.test.ts`
- `src\features\portal\query\portal-dashboard-data.test.ts`
- `src\features\portal\query\portal-dashboard-query-options.test.ts`
- `src\features\portal\query\portal-query.test.ts`
- `src\features\portal\query\portal-query-gate.test.tsx`
- `src\features\portal\security\portal-safe-return-to.test.ts`
- `src\features\portal\services\portal-client-api.test.ts`
- `src\features\portal\states\portal-state-views.test.tsx`
- `src\features\profissionais\components\profissionais-view.integration.test.tsx`
- `src\features\profissionais\components\profissional-form-dialog.integration.test.tsx`
- `src\features\profissionais\profissionais-foundation.test.ts`
- `src\features\profissionais\profissionais-navigation.test.ts`
- `src\features\profissionais\utils\profissionais-formatters.test.ts`
- `src\features\profissionais\utils\profissionais-list-url.test.ts`
- `src\features\servicos\forms\servico-form.schema.test.ts`
- `src\features\servicos\forms\servico-form.test.tsx`
- `src\features\servicos\forms\servico-payload.test.ts`
- `src\features\servicos\servicos-foundation.test.ts`
- `src\features\servicos\utils\servicos-formatters.test.ts`
- `src\features\tenant\schemas\tenant.schema.test.ts`
- `src\features\unidades\forms\unidade-form.schema.test.ts`
- `src\features\unidades\forms\unidade-form.test.tsx`
- `src\features\unidades\forms\unidade-payload.test.ts`
- `src\features\unidades\unidades-foundation.test.ts`
- `src\features\unidades\utils\unidades-formatters.test.ts`
- `src\features\usuarios\components\usuario-form-dialog.integration.test.tsx`
- `src\features\usuarios\components\usuarios-view.integration.test.tsx`
- `src\features\usuarios\forms\usuario-form.schema.test.ts`
- `src\features\usuarios\forms\usuario-form.test.tsx`
- `src\features\usuarios\forms\usuario-payload.test.ts`
- `src\features\usuarios\usuarios-foundation.test.ts`
- `src\features\usuarios\utils\usuarios-formatters.test.ts`
- `src\features\usuarios\utils\usuarios-list-url.test.ts`
- `src\features\whatsapp\chat54-foundations.test.ts`
- `src\features\whatsapp\components\campanhas-whatsapp-list.test.tsx`
- `src\features\whatsapp\components\mensagens-whatsapp-list.test.tsx`
- `src\features\whatsapp\components\templates-whatsapp-list.test.tsx`
- `src\features\whatsapp\schemas\campanha-whatsapp-schema.test.ts`
- `src\features\whatsapp\schemas\mensagem-whatsapp-schema.test.ts`
- `src\features\whatsapp\schemas\template-whatsapp-schema.test.ts`
- `src\features\whatsapp\services\whatsapp-campaigns-api.test.ts`
- `src\features\whatsapp\services\whatsapp-messages-api.test.ts`
- `src\features\whatsapp\services\whatsapp-templates-api.test.ts`
- `src\providers\tenant-provider.chat55.test.tsx`
- `src\services\auth\access-events.test.ts`
- `src\stores\auth-store.test.ts`
- `src\stores\ui-store.test.ts`

## 3. Testes E2E

Quantidade: 20

- `e2e\chat45-design-system.spec.ts`
- `e2e\chat47-auth-flow.spec.ts`
- `e2e\chat48-dashboard.spec.ts`
- `e2e\chat49-clientes.spec.ts`
- `e2e\chat50-management.spec.ts`
- `e2e\chat50-management-mutations.spec.ts`
- `e2e\chat51-agenda.spec.ts`
- `e2e\chat52-financeiro.spec.ts`
- `e2e\chat53-fidelidade-pacotes.spec.ts`
- `e2e\chat54-comunicacoes.spec.ts`
- `e2e\chat55-arquivos-configuracoes.spec.ts`
- `e2e\fixtures\chat48-dashboard.fixture.ts`
- `e2e\fixtures\chat49-clientes.fixture.ts`
- `e2e\fixtures\chat50-management.fixture.ts`
- `e2e\fixtures\chat51-agenda.fixture.ts`
- `e2e\fixtures\chat52-financeiro.fixture.ts`
- `e2e\fixtures\chat53-fidelidade-pacotes.fixture.ts`
- `e2e\fixtures\chat54-comunicacoes.fixture.ts`
- `e2e\foundation.smoke.spec.ts`
- `e2e\portal-foundation.spec.ts`

## 4. Assertions e cenários atuais

Quantidade: 2009

``text
beauty-core-ui/e2e/chat45-design-system.spec.ts:27:test.describe("Chat 45 ÔÇö Design System desktop", () => {
beauty-core-ui/e2e/chat45-design-system.spec.ts:35:  test("renderiza o shell t├®cnico sem erros de runtime", async ({
beauty-core-ui/e2e/chat45-design-system.spec.ts:40:    await page.goto("/design-system");
beauty-core-ui/e2e/chat45-design-system.spec.ts:42:    await expect(
beauty-core-ui/e2e/chat45-design-system.spec.ts:43:      page.getByTestId("design-system-page"),
beauty-core-ui/e2e/chat45-design-system.spec.ts:44:    ).toBeVisible();
beauty-core-ui/e2e/chat45-design-system.spec.ts:46:    await expect(
beauty-core-ui/e2e/chat45-design-system.spec.ts:47:      page.getByRole("heading", {
beauty-core-ui/e2e/chat45-design-system.spec.ts:51:    ).toBeVisible();
beauty-core-ui/e2e/chat45-design-system.spec.ts:53:    await expect(
beauty-core-ui/e2e/chat45-design-system.spec.ts:54:      page.getByLabel(
beauty-core-ui/e2e/chat45-design-system.spec.ts:57:    ).toBeVisible();
beauty-core-ui/e2e/chat45-design-system.spec.ts:59:    await expect(
beauty-core-ui/e2e/chat45-design-system.spec.ts:60:      page.getByRole("complementary", {
beauty-core-ui/e2e/chat45-design-system.spec.ts:63:    ).toBeVisible();
beauty-core-ui/e2e/chat45-design-system.spec.ts:65:    await expect(
beauty-core-ui/e2e/chat45-design-system.spec.ts:66:      page.getByText(
beauty-core-ui/e2e/chat45-design-system.spec.ts:69:    ).toBeVisible();
beauty-core-ui/e2e/chat45-design-system.spec.ts:71:    expect(runtimeErrors.consoleErrors).toEqual([]);
beauty-core-ui/e2e/chat45-design-system.spec.ts:72:    expect(runtimeErrors.pageErrors).toEqual([]);
beauty-core-ui/e2e/chat45-design-system.spec.ts:75:  test("recolhe e expande a sidebar desktop", async ({
beauty-core-ui/e2e/chat45-design-system.spec.ts:78:    await page.goto("/design-system");
beauty-core-ui/e2e/chat45-design-system.spec.ts:80:    const sidebar = page.getByRole(
beauty-core-ui/e2e/chat45-design-system.spec.ts:87:    await expect(sidebar).toHaveAttribute(
beauty-core-ui/e2e/chat45-design-system.spec.ts:92:    await page.getByRole("button", {
beauty-core-ui/e2e/chat45-design-system.spec.ts:96:    await expect(sidebar).toHaveAttribute(
beauty-core-ui/e2e/chat45-design-system.spec.ts:101:    await page.getByRole("button", {
beauty-core-ui/e2e/chat45-design-system.spec.ts:105:    await expect(sidebar).toHaveAttribute(
beauty-core-ui/e2e/chat45-design-system.spec.ts:111:  test("alterna entre temas claro e escuro", async ({
beauty-core-ui/e2e/chat45-design-system.spec.ts:114:    await page.goto("/design-system");
beauty-core-ui/e2e/chat45-design-system.spec.ts:116:    const themeButton = page.getByRole(
beauty-core-ui/e2e/chat45-design-system.spec.ts:123:    await expect(themeButton).toBeEnabled();
beauty-core-ui/e2e/chat45-design-system.spec.ts:138:      .not.toBe(initialClass);
beauty-core-ui/e2e/chat45-design-system.spec.ts:140:    await expect(
beauty-core-ui/e2e/chat45-design-system.spec.ts:141:      page.getByRole("button", {
beauty-core-ui/e2e/chat45-design-system.spec.ts:144:    ).toBeVisible();
beauty-core-ui/e2e/chat45-design-system.spec.ts:147:  test("abre dialog, confirma├º├úo e drawer", async ({
beauty-core-ui/e2e/chat45-design-system.spec.ts:150:    await page.goto("/design-system");
beauty-core-ui/e2e/chat45-design-system.spec.ts:152:    await page.getByRole("button", {
beauty-core-ui/e2e/chat45-design-system.spec.ts:156:    await expect(
beauty-core-ui/e2e/chat45-design-system.spec.ts:157:      page.getByRole("dialog", {
beauty-core-ui/e2e/chat45-design-system.spec.ts:160:    ).toBeVisible();
beauty-core-ui/e2e/chat45-design-system.spec.ts:164:    await expect(
beauty-core-ui/e2e/chat45-design-system.spec.ts:165:      page.getByRole("dialog", {
beauty-core-ui/e2e/chat45-design-system.spec.ts:168:    ).not.toBeVisible();
beauty-core-ui/e2e/chat45-design-system.spec.ts:170:    await page.getByRole("button", {
beauty-core-ui/e2e/chat45-design-system.spec.ts:174:    await expect(
beauty-core-ui/e2e/chat45-design-system.spec.ts:175:      page.getByRole("alertdialog", {
beauty-core-ui/e2e/chat45-design-system.spec.ts:178:    ).toBeVisible();
beauty-core-ui/e2e/chat45-design-system.spec.ts:180:    await page.getByRole("button", {
beauty-core-ui/e2e/chat45-design-system.spec.ts:184:    await expect(
beauty-core-ui/e2e/chat45-design-system.spec.ts:185:      page.getByRole("alertdialog", {
beauty-core-ui/e2e/chat45-design-system.spec.ts:188:    ).not.toBeVisible();
beauty-core-ui/e2e/chat45-design-system.spec.ts:190:    await page.getByRole("button", {
beauty-core-ui/e2e/chat45-design-system.spec.ts:194:    await expect(
beauty-core-ui/e2e/chat45-design-system.spec.ts:195:      page.getByRole("dialog", {
beauty-core-ui/e2e/chat45-design-system.spec.ts:198:    ).toBeVisible();
beauty-core-ui/e2e/chat45-design-system.spec.ts:202:    await expect(
beauty-core-ui/e2e/chat45-design-system.spec.ts:203:      page.getByRole("dialog", {
beauty-core-ui/e2e/chat45-design-system.spec.ts:206:    ).not.toBeVisible();
beauty-core-ui/e2e/chat45-design-system.spec.ts:210:test.describe("Chat 45 ÔÇö Design System mobile", () => {
beauty-core-ui/e2e/chat45-design-system.spec.ts:218:  test("usa drawer mobile e n├úo gera overflow global", async ({
beauty-core-ui/e2e/chat45-design-system.spec.ts:223:    await page.goto("/design-system");
beauty-core-ui/e2e/chat45-design-system.spec.ts:225:    await expect(
beauty-core-ui/e2e/chat45-design-system.spec.ts:226:      page.getByTestId("design-system-page"),
beauty-core-ui/e2e/chat45-design-system.spec.ts:227:    ).toBeVisible();
beauty-core-ui/e2e/chat45-design-system.spec.ts:229:    await expect(
beauty-core-ui/e2e/chat45-design-system.spec.ts:230:      page.getByRole("button", {
beauty-core-ui/e2e/chat45-design-system.spec.ts:233:    ).toBeVisible();
beauty-core-ui/e2e/chat45-design-system.spec.ts:235:    await expect(
beauty-core-ui/e2e/chat45-design-system.spec.ts:236:      page.getByRole("complementary", {
beauty-core-ui/e2e/chat45-design-system.spec.ts:239:    ).toBeHidden();
beauty-core-ui/e2e/chat45-design-system.spec.ts:241:    await page.getByRole("button", {
beauty-core-ui/e2e/chat45-design-system.spec.ts:245:    await expect(
beauty-core-ui/e2e/chat45-design-system.spec.ts:246:      page.getByLabel(
beauty-core-ui/e2e/chat45-design-system.spec.ts:249:    ).toBeVisible();
beauty-core-ui/e2e/chat45-design-system.spec.ts:251:    await expect(
beauty-core-ui/e2e/chat45-design-system.spec.ts:252:      page.getByText(
beauty-core-ui/e2e/chat45-design-system.spec.ts:268:    await expect(
beauty-core-ui/e2e/chat45-design-system.spec.ts:277:    await expect(
beauty-core-ui/e2e/chat45-design-system.spec.ts:278:      page.getByLabel(
beauty-core-ui/e2e/chat45-design-system.spec.ts:281:    ).not.toBeVisible();
beauty-core-ui/e2e/chat45-design-system.spec.ts:290:    expect(
beauty-core-ui/e2e/chat45-design-system.spec.ts:292:    ).toBeLessThanOrEqual(
beauty-core-ui/e2e/chat45-design-system.spec.ts:296:    expect(runtimeErrors.consoleErrors).toEqual([]);
beauty-core-ui/e2e/chat45-design-system.spec.ts:297:    expect(runtimeErrors.pageErrors).toEqual([]);
beauty-core-ui/e2e/chat45-design-system.spec.ts:300:  test("mant├®m tabela contida em regi├úo com scroll horizontal", async ({
beauty-core-ui/e2e/chat45-design-system.spec.ts:303:    await page.goto("/design-system");
beauty-core-ui/e2e/chat45-design-system.spec.ts:305:    const tableRegion = page.getByRole(
beauty-core-ui/e2e/chat45-design-system.spec.ts:312:    await expect(tableRegion).toBeVisible();
beauty-core-ui/e2e/chat45-design-system.spec.ts:319:    expect(
beauty-core-ui/e2e/chat45-design-system.spec.ts:321:    ).toContain(overflowX);
beauty-core-ui/e2e/chat45-design-system.spec.ts:332:    expect(
beauty-core-ui/e2e/chat45-design-system.spec.ts:334:    ).toBeLessThanOrEqual(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:69:      await route.fulfill({
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:87:      await route.fulfill({
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:101:      await route.fulfill({
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:116:      await route.fulfill({
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:144:  expect(hasOverflow).toBe(false);
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:147:test.describe(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:150:    test(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:158:        await page.goto(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:162:        await expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:163:          page.getByRole("heading", {
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:166:        ).toBeVisible();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:169:          page.getByRole("region", {
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:174:        await expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:176:        ).toBeVisible();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:178:        await expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:179:          page.getByRole("status"),
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:180:        ).toContainText(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:194:        await expect(email)
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:195:          .toBeVisible();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:197:        await expect(password)
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:198:          .toBeVisible();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:200:        await expect(email)
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:205:        await expect(password)
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:215:        await expect(submit)
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:216:          .toBeVisible();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:218:        await expect(submit)
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:229:        await expect(password)
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:230:          .toBeFocused();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:237:        await expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:239:        ).toBeHidden();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:241:        await expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:242:          page.getByRole("heading", {
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:245:        ).toBeVisible();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:253:    test(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:256:        await page.goto(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:260:        await expect(page).toHaveURL(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:264:        await expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:265:          page.getByRole("heading", {
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:268:        ).toBeVisible();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:272:    test(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:279:        await page.goto(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:283:        await expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:284:          page.getByRole("heading", {
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:287:        ).toBeVisible();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:289:        await expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:290:          page.getByLabel(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:293:        ).toBeVisible();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:295:        await expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:296:          page.getByRole("button", {
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:300:        ).toBeVisible();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:304:    test(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:307:        await page.goto(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:311:        await expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:312:          page.getByLabel(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:315:        ).toBeVisible();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:317:        await expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:318:          page.getByText(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:321:        ).toBeVisible();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:323:        await expect(page)
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:330:    test(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:340:            await route.fulfill({
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:353:        await page.goto(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:357:        await expect(page).toHaveURL(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:361:        await expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:362:          page.getByTestId(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:365:        ).toBeVisible();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:367:        await expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:368:          page.getByRole("heading", {
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:372:        ).toBeVisible();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:374:        await expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:375:          page.getByRole("button", {
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:379:        ).toBeVisible();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:383:    test(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:399:              route.request().method() !==
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:402:              await route.fallback();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:407:            await route.fulfill({
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:423:                route.request().url(),
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:429:                  .split("/")
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:440:            await route.fulfill({
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:452:        await page.goto(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:456:        await expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:457:          page.getByTestId(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:460:        ).toBeVisible();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:462:        await expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:463:          page.getByText(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:466:        ).toBeVisible();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:468:        await expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:469:          page.getByTestId(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:472:        ).toBeVisible();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:474:        await expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:475:          page.getByTestId(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:478:        ).toBeVisible();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:481:          page.getByRole(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:498:        await expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:499:          page.getByTestId(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:502:        ).toBeHidden();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:504:        await expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:505:          page.getByText(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:508:        ).toBeVisible();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:515:        await expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:516:          page.getByTestId(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:519:        ).toBeVisible();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:527:    test(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:537:            await route.fulfill({
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:551:            await route.fulfill({
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:563:        await page.goto(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:581:        await expect(page)
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:586:        await expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:587:          page.getByRole("heading", {
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:590:        ).toBeVisible();
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:594:    test(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:601:        await page.goto(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:619:        await expect(page)
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:624:        expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:626:        ).not.toContain(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:632:    test(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:639:        await page.goto(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:657:        await expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:658:          page.getByRole("note"),
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:659:        ).toContainText(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:670:        await expect(page)
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:675:        expect(
beauty-core-ui/e2e/chat47-auth-flow.spec.ts:677:        ).not.toContain(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:48:      await route.fulfill({
beauty-core-ui/e2e/chat48-dashboard.spec.ts:63:      await route.fulfill({
beauty-core-ui/e2e/chat48-dashboard.spec.ts:74:      await route.fulfill({
beauty-core-ui/e2e/chat48-dashboard.spec.ts:87:      await route.fulfill({
beauty-core-ui/e2e/chat48-dashboard.spec.ts:99:async function waitForAnalytics(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:111:    .toBe(ENDPOINTS.length);
beauty-core-ui/e2e/chat48-dashboard.spec.ts:145:    expect(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:147:    ).toBeGreaterThan(0);
beauty-core-ui/e2e/chat48-dashboard.spec.ts:150:  expect(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:152:  ).toEqual([]);
beauty-core-ui/e2e/chat48-dashboard.spec.ts:154:  expect(runtime.pageErrors).toEqual([]);
beauty-core-ui/e2e/chat48-dashboard.spec.ts:157:test.describe(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:160:    test(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:171:        await page.goto("/dashboard");
beauty-core-ui/e2e/chat48-dashboard.spec.ts:173:        await expect(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:174:          page.getByRole("heading", {
beauty-core-ui/e2e/chat48-dashboard.spec.ts:177:        ).toBeVisible();
beauty-core-ui/e2e/chat48-dashboard.spec.ts:179:        await waitForAnalytics(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:184:          page.getByRole("region", {
beauty-core-ui/e2e/chat48-dashboard.spec.ts:188:        await expect(summary).toBeVisible();
beauty-core-ui/e2e/chat48-dashboard.spec.ts:200:          await expect(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:204:          ).toBeVisible();
beauty-core-ui/e2e/chat48-dashboard.spec.ts:207:        await expect(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:208:          page.getByText(/8\.400,00/).first(),
beauty-core-ui/e2e/chat48-dashboard.spec.ts:209:        ).toBeVisible();
beauty-core-ui/e2e/chat48-dashboard.spec.ts:215:    test(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:226:        await page.goto(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:230:        await expect(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:231:          page.getByRole("heading", {
beauty-core-ui/e2e/chat48-dashboard.spec.ts:234:        ).toBeVisible();
beauty-core-ui/e2e/chat48-dashboard.spec.ts:236:        await waitForAnalytics(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:241:          page.getByRole("combobox", {
beauty-core-ui/e2e/chat48-dashboard.spec.ts:245:        await expect(periodSelect).toHaveText(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:263:        expect(dashboardRequest).toBeDefined();
beauty-core-ui/e2e/chat48-dashboard.spec.ts:264:        expect(financialRequest).toBeDefined();
beauty-core-ui/e2e/chat48-dashboard.spec.ts:266:        expect(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:268:        ).toBeTruthy();
beauty-core-ui/e2e/chat48-dashboard.spec.ts:270:        expect(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:272:        ).toBeTruthy();
beauty-core-ui/e2e/chat48-dashboard.spec.ts:274:        expect(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:276:        ).toEqual(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:284:    test(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:295:        await page.goto("/dashboard");
beauty-core-ui/e2e/chat48-dashboard.spec.ts:297:        await expect(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:298:          page.getByRole("heading", {
beauty-core-ui/e2e/chat48-dashboard.spec.ts:301:        ).toBeVisible();
beauty-core-ui/e2e/chat48-dashboard.spec.ts:303:        await waitForAnalytics(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:315:        await page.getByRole("button", {
beauty-core-ui/e2e/chat48-dashboard.spec.ts:323:          .toBeGreaterThanOrEqual(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:334:          .toBeGreaterThanOrEqual(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:342:    test(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:357:        await page.goto("/dashboard");
beauty-core-ui/e2e/chat48-dashboard.spec.ts:359:        await expect(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:360:          page.getByRole("heading", {
beauty-core-ui/e2e/chat48-dashboard.spec.ts:363:        ).toBeVisible();
beauty-core-ui/e2e/chat48-dashboard.spec.ts:372:          .toBeGreaterThanOrEqual(1);
beauty-core-ui/e2e/chat48-dashboard.spec.ts:379:        await expect(retryButton).toBeVisible({
beauty-core-ui/e2e/chat48-dashboard.spec.ts:394:          .toBeGreaterThanOrEqual(2);
beauty-core-ui/e2e/chat48-dashboard.spec.ts:396:        await expect(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:397:          page.getByRole("region", {
beauty-core-ui/e2e/chat48-dashboard.spec.ts:400:        ).toBeVisible();
beauty-core-ui/e2e/chat48-dashboard.spec.ts:402:        await expect(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:411:    test(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:426:        await page.goto("/dashboard");
beauty-core-ui/e2e/chat48-dashboard.spec.ts:428:        await expect(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:429:          page.getByRole("heading", {
beauty-core-ui/e2e/chat48-dashboard.spec.ts:432:        ).toBeVisible();
beauty-core-ui/e2e/chat48-dashboard.spec.ts:434:        await waitForAnalytics(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:453:        await expect(retryButton).toBeVisible({
beauty-core-ui/e2e/chat48-dashboard.spec.ts:468:          .toBeGreaterThanOrEqual(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:479:          .toBe(dashboardBefore);
beauty-core-ui/e2e/chat48-dashboard.spec.ts:481:        await expect(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:490:    test(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:506:        await page.goto("/dashboard");
beauty-core-ui/e2e/chat48-dashboard.spec.ts:508:        await expect(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:509:          page.getByRole("heading", {
beauty-core-ui/e2e/chat48-dashboard.spec.ts:512:        ).toBeVisible();
beauty-core-ui/e2e/chat48-dashboard.spec.ts:514:        await waitForAnalytics(
beauty-core-ui/e2e/chat48-dashboard.spec.ts:529:        expect(hasOverflow).toBe(false);
beauty-core-ui/e2e/chat49-clientes.spec.ts:51:    expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:53:    ).toBeGreaterThan(0);
beauty-core-ui/e2e/chat49-clientes.spec.ts:56:  expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:58:  ).toEqual([]);
beauty-core-ui/e2e/chat49-clientes.spec.ts:60:  expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:62:  ).toEqual([]);
beauty-core-ui/e2e/chat49-clientes.spec.ts:79:  expect(hasOverflow).toBe(false);
beauty-core-ui/e2e/chat49-clientes.spec.ts:87:    page.getByText(
beauty-core-ui/e2e/chat49-clientes.spec.ts:118:    .toBe(true);
beauty-core-ui/e2e/chat49-clientes.spec.ts:121:async function waitForProfileRequests(
beauty-core-ui/e2e/chat49-clientes.spec.ts:135:    .toBe(
beauty-core-ui/e2e/chat49-clientes.spec.ts:164:test.describe(
beauty-core-ui/e2e/chat49-clientes.spec.ts:167:    test(
beauty-core-ui/e2e/chat49-clientes.spec.ts:177:        await page.goto(
beauty-core-ui/e2e/chat49-clientes.spec.ts:181:        await expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:182:          page.getByRole(
beauty-core-ui/e2e/chat49-clientes.spec.ts:188:        ).toBeVisible();
beauty-core-ui/e2e/chat49-clientes.spec.ts:209:          .toBe(true);
beauty-core-ui/e2e/chat49-clientes.spec.ts:223:        expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:232:        await expect(page).toHaveURL(
beauty-core-ui/e2e/chat49-clientes.spec.ts:240:    test(
beauty-core-ui/e2e/chat49-clientes.spec.ts:250:        await page.goto(
beauty-core-ui/e2e/chat49-clientes.spec.ts:254:        await expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:255:          page.getByRole(
beauty-core-ui/e2e/chat49-clientes.spec.ts:261:        ).toBeVisible();
beauty-core-ui/e2e/chat49-clientes.spec.ts:263:        await waitForProfileRequests(
beauty-core-ui/e2e/chat49-clientes.spec.ts:267:        await expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:268:          page.getByText(
beauty-core-ui/e2e/chat49-clientes.spec.ts:274:        ).toBeVisible();
beauty-core-ui/e2e/chat49-clientes.spec.ts:276:        await expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:277:          page.getByText(
beauty-core-ui/e2e/chat49-clientes.spec.ts:283:        ).toBeVisible();
beauty-core-ui/e2e/chat49-clientes.spec.ts:285:        await expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:286:          page.getByText(
beauty-core-ui/e2e/chat49-clientes.spec.ts:292:        ).toBeVisible();
beauty-core-ui/e2e/chat49-clientes.spec.ts:294:        await expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:295:          page.getByText(
beauty-core-ui/e2e/chat49-clientes.spec.ts:301:        ).toBeVisible();
beauty-core-ui/e2e/chat49-clientes.spec.ts:308:        await expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:315:        await expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:326:    test(
beauty-core-ui/e2e/chat49-clientes.spec.ts:342:        await page.goto("/clientes");
beauty-core-ui/e2e/chat49-clientes.spec.ts:345:          page.getByRole(
beauty-core-ui/e2e/chat49-clientes.spec.ts:353:        await expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:355:        ).toBeVisible();
beauty-core-ui/e2e/chat49-clientes.spec.ts:373:          .toBeGreaterThan(
beauty-core-ui/e2e/chat49-clientes.spec.ts:392:    test(
beauty-core-ui/e2e/chat49-clientes.spec.ts:403:        await page.goto(
beauty-core-ui/e2e/chat49-clientes.spec.ts:407:        await expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:408:          page.getByRole(
beauty-core-ui/e2e/chat49-clientes.spec.ts:414:        ).toBeVisible();
beauty-core-ui/e2e/chat49-clientes.spec.ts:416:        await waitForProfileRequests(
beauty-core-ui/e2e/chat49-clientes.spec.ts:420:        await expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:421:          page.getByRole(
beauty-core-ui/e2e/chat49-clientes.spec.ts:428:        ).toBeVisible();
beauty-core-ui/e2e/chat49-clientes.spec.ts:430:        await expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:431:          page.getByLabel(
beauty-core-ui/e2e/chat49-clientes.spec.ts:436:        await expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:437:          page.getByRole(
beauty-core-ui/e2e/chat49-clientes.spec.ts:445:        await expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:446:          page.getByRole(
beauty-core-ui/e2e/chat49-clientes.spec.ts:459:    test(
beauty-core-ui/e2e/chat49-clientes.spec.ts:469:        await page.goto(
beauty-core-ui/e2e/chat49-clientes.spec.ts:473:        await expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:474:          page.getByRole(
beauty-core-ui/e2e/chat49-clientes.spec.ts:480:        ).toBeVisible();
beauty-core-ui/e2e/chat49-clientes.spec.ts:482:        await waitForProfileRequests(
beauty-core-ui/e2e/chat49-clientes.spec.ts:486:        await page.getByRole(
beauty-core-ui/e2e/chat49-clientes.spec.ts:501:          .toBe(1);
beauty-core-ui/e2e/chat49-clientes.spec.ts:503:        await expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:504:          page.getByText(
beauty-core-ui/e2e/chat49-clientes.spec.ts:510:        ).toBeVisible();
beauty-core-ui/e2e/chat49-clientes.spec.ts:512:        await page.getByRole(
beauty-core-ui/e2e/chat49-clientes.spec.ts:521:          page.getByRole(
beauty-core-ui/e2e/chat49-clientes.spec.ts:525:        await expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:527:        ).toContainText(
beauty-core-ui/e2e/chat49-clientes.spec.ts:531:        expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:536:        ).toBe(0);
beauty-core-ui/e2e/chat49-clientes.spec.ts:538:        await page.getByRole(
beauty-core-ui/e2e/chat49-clientes.spec.ts:554:          .toBe(1);
beauty-core-ui/e2e/chat49-clientes.spec.ts:556:        await expect(page).toHaveURL(
beauty-core-ui/e2e/chat49-clientes.spec.ts:560:        await expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:561:          page.getByRole(
beauty-core-ui/e2e/chat49-clientes.spec.ts:567:        ).toBeVisible();
beauty-core-ui/e2e/chat49-clientes.spec.ts:573:    test(
beauty-core-ui/e2e/chat49-clientes.spec.ts:588:        await page.goto("/clientes");
beauty-core-ui/e2e/chat49-clientes.spec.ts:590:        await expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:591:          page.getByRole(
beauty-core-ui/e2e/chat49-clientes.spec.ts:597:        ).toBeVisible();
beauty-core-ui/e2e/chat49-clientes.spec.ts:608:        await page.goto(
beauty-core-ui/e2e/chat49-clientes.spec.ts:612:        await expect(
beauty-core-ui/e2e/chat49-clientes.spec.ts:613:          page.getByRole(
beauty-core-ui/e2e/chat49-clientes.spec.ts:619:        ).toBeVisible();
beauty-core-ui/e2e/chat49-clientes.spec.ts:621:        await waitForProfileRequests(
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:14:  waitForChat50Request,
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:28:  waitFor: (
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:43:  const raw = route.request().postData();
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:53:  await route.fulfill({
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:64:    const request = route.request();
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:69:      await route.fallback();
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:77:      await route.fallback();
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:207:    await route.fallback();
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:213:    waitFor: async (method, path) => {
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:229:        .toBe(true);
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:260:test.describe("Chat 50 ÔÇö mutations administrativas", () => {
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:261:  test("edita Servi├ºo com PATCH do contrato real", async ({ page }) => {
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:264:    await page.goto("/servicos");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:266:    await waitForChat50Request(reads, "/servicos");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:277:    const dialog = page.getByRole("dialog");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:279:    await expect(dialog).toBeVisible();
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:289:    const mutation = await mutations.waitFor(
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:294:    expect(mutation.body).toEqual(
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:303:  test("inativa Servi├ºo no endpoint dedicado", async ({ page }) => {
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:306:    await page.goto("/servicos");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:308:    await waitForChat50Request(reads, "/servicos");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:319:    const alert = page.getByRole("alertdialog");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:321:    await expect(alert).toBeVisible();
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:330:    await expect(confirm).toBeVisible();
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:334:    const mutation = await mutations.waitFor(
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:339:    expect(mutation.body).toBeNull();
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:344:  test("edita Unidade sem inventar cidade estado ou CEP", async ({ page }) => {
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:347:    await page.goto("/unidades");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:349:    await waitForChat50Request(reads, "/unidades");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:360:    const dialog = page.getByRole("dialog");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:362:    await expect(dialog).toBeVisible();
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:372:    const mutation = await mutations.waitFor(
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:377:    expect(mutation.body).toEqual(
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:385:    expect(payload).not.toHaveProperty("cidade");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:387:    expect(payload).not.toHaveProperty("estado");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:389:    expect(payload).not.toHaveProperty("cep");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:394:  test("inativa Unidade no endpoint dedicado", async ({ page }) => {
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:397:    await page.goto("/unidades");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:399:    await waitForChat50Request(reads, "/unidades");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:410:    const alert = page.getByRole("alertdialog");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:412:    await expect(alert).toBeVisible();
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:421:    await expect(confirm).toBeVisible();
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:425:    const mutation = await mutations.waitFor(
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:430:    expect(mutation.body).toBeNull();
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:435:  test("ADMIN cria usu├írio sem empresaId arbitr├írio", async ({ page }) => {
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:438:    await page.goto("/usuarios");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:440:    await waitForChat50Request(
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:452:    const dialog = page.getByRole("dialog");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:454:    await expect(dialog).toBeVisible();
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:468:    const mutation = await mutations.waitFor("POST", "/usuarios");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:470:    expect(mutation.body).toEqual({
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:483:  test("self edit n├úo envia role nem senha vazia", async ({ page }) => {
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:486:    await page.goto("/usuarios");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:488:    await waitForChat50Request(
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:496:    const row = page.getByRole("row").filter({
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:500:    await expect(row).toBeVisible();
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:508:    const dialog = page.getByRole("dialog");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:510:    await expect(dialog).toBeVisible();
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:512:    await expect(dialog.getByLabel(/^Perfil/)).toBeDisabled();
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:522:    const mutation = await mutations.waitFor(
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:529:    expect(payload.nome).toBe("Administrador Atualizado E2E");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:531:    expect(payload.email).toBe("admin@beautycore.test");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:533:    expect(payload).not.toHaveProperty("role");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:535:    expect(payload).not.toHaveProperty("senha");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:537:    expect(payload).not.toHaveProperty("empresaId");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:542:  test("cadastro em Profissionais for├ºa role PROFISSIONAL", async ({
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:547:    await page.goto("/profissionais");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:549:    await waitForChat50Request(
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:561:    const dialog = page.getByRole("dialog");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:563:    await expect(dialog).toBeVisible();
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:565:    await expect(dialog.getByLabel(/^Perfil/)).toBeDisabled();
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:567:    await expect(dialog.getByLabel(/^Perfil/)).toHaveValue("Profissional");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:583:    const mutation = await mutations.waitFor("POST", "/usuarios");
beauty-core-ui/e2e/chat50-management-mutations.spec.ts:585:    expect(mutation.body).toEqual({
beauty-core-ui/e2e/chat50-management.spec.ts:10:  waitForChat50Request,
beauty-core-ui/e2e/chat50-management.spec.ts:27:test.describe("Chat 50 ÔÇö gest├úo operacional", () => {
beauty-core-ui/e2e/chat50-management.spec.ts:28:  test("ADMIN acessa Servi├ºos com dados e a├º├Áes de gest├úo", async ({
beauty-core-ui/e2e/chat50-management.spec.ts:33:    await page.goto("/servicos");
beauty-core-ui/e2e/chat50-management.spec.ts:35:    await expect(
beauty-core-ui/e2e/chat50-management.spec.ts:36:      page.getByRole("heading", {
beauty-core-ui/e2e/chat50-management.spec.ts:40:    ).toBeVisible();
beauty-core-ui/e2e/chat50-management.spec.ts:42:    await waitForChat50Request(controller, "/servicos");
beauty-core-ui/e2e/chat50-management.spec.ts:46:    await expect(
beauty-core-ui/e2e/chat50-management.spec.ts:47:      page.getByRole("button", {
beauty-core-ui/e2e/chat50-management.spec.ts:50:    ).toBeVisible();
beauty-core-ui/e2e/chat50-management.spec.ts:52:    expect(controller.callsTo("/servicos")).toBeGreaterThan(0);
beauty-core-ui/e2e/chat50-management.spec.ts:57:  test("RECEPCAO acessa Servi├ºos somente para leitura", async ({ page }) => {
beauty-core-ui/e2e/chat50-management.spec.ts:60:    await page.goto("/servicos");
beauty-core-ui/e2e/chat50-management.spec.ts:62:    await waitForChat50Request(controller, "/servicos");
beauty-core-ui/e2e/chat50-management.spec.ts:66:    await expect(
beauty-core-ui/e2e/chat50-management.spec.ts:67:      page.getByRole("button", {
beauty-core-ui/e2e/chat50-management.spec.ts:72:    await expect(
beauty-core-ui/e2e/chat50-management.spec.ts:73:      page.getByRole("button", {
beauty-core-ui/e2e/chat50-management.spec.ts:78:    await expect(
beauty-core-ui/e2e/chat50-management.spec.ts:79:      page.getByRole("button", {
beauty-core-ui/e2e/chat50-management.spec.ts:87:  test("ADMIN acessa Unidades com dados reais", async ({ page }) => {
beauty-core-ui/e2e/chat50-management.spec.ts:90:    await page.goto("/unidades");
beauty-core-ui/e2e/chat50-management.spec.ts:92:    await expect(
beauty-core-ui/e2e/chat50-management.spec.ts:93:      page.getByRole("heading", {
beauty-core-ui/e2e/chat50-management.spec.ts:97:    ).toBeVisible();
beauty-core-ui/e2e/chat50-management.spec.ts:99:    await waitForChat50Request(controller, "/unidades");
beauty-core-ui/e2e/chat50-management.spec.ts:106:  test("ADMIN acessa Usu├írios com pagina├º├úo server-side e self identificado", async ({
beauty-core-ui/e2e/chat50-management.spec.ts:111:    await page.goto("/usuarios");
beauty-core-ui/e2e/chat50-management.spec.ts:113:    await expect(
beauty-core-ui/e2e/chat50-management.spec.ts:114:      page.getByRole("heading", {
beauty-core-ui/e2e/chat50-management.spec.ts:118:    ).toBeVisible();
beauty-core-ui/e2e/chat50-management.spec.ts:120:    const request = await waitForChat50Request(
beauty-core-ui/e2e/chat50-management.spec.ts:132:    expect(request.searchParams).toMatchObject({
beauty-core-ui/e2e/chat50-management.spec.ts:142:  test("Profissionais envia obrigatoriamente role PROFISSIONAL", async ({
beauty-core-ui/e2e/chat50-management.spec.ts:147:    await page.goto("/profissionais");
beauty-core-ui/e2e/chat50-management.spec.ts:149:    await expect(
beauty-core-ui/e2e/chat50-management.spec.ts:150:      page.getByRole("heading", {
beauty-core-ui/e2e/chat50-management.spec.ts:154:    ).toBeVisible();
beauty-core-ui/e2e/chat50-management.spec.ts:156:    const request = await waitForChat50Request(
beauty-core-ui/e2e/chat50-management.spec.ts:162:    expect(request.searchParams.role).toBe("PROFISSIONAL");
beauty-core-ui/e2e/chat50-management.spec.ts:169:  test("RECEPCAO n├úo acessa gest├úo de Usu├írios nem dispara listagem", async ({
beauty-core-ui/e2e/chat50-management.spec.ts:174:    await page.goto("/usuarios");
beauty-core-ui/e2e/chat50-management.spec.ts:176:    await expect(
beauty-core-ui/e2e/chat50-management.spec.ts:177:      page.getByText(
beauty-core-ui/e2e/chat50-management.spec.ts:180:    ).toBeVisible();
beauty-core-ui/e2e/chat50-management.spec.ts:186:      .toBe(0);
beauty-core-ui/e2e/chat50-management.spec.ts:191:  test("quatro m├│dulos n├úo geram overflow horizontal no mobile", async ({
beauty-core-ui/e2e/chat50-management.spec.ts:201:    await page.goto("/servicos");
beauty-core-ui/e2e/chat50-management.spec.ts:203:    await waitForChat50Request(controller, "/servicos");
beauty-core-ui/e2e/chat50-management.spec.ts:209:    await page.goto("/unidades");
beauty-core-ui/e2e/chat50-management.spec.ts:211:    await waitForChat50Request(controller, "/unidades");
beauty-core-ui/e2e/chat50-management.spec.ts:217:    await page.goto("/usuarios");
beauty-core-ui/e2e/chat50-management.spec.ts:219:    await waitForChat50Request(
beauty-core-ui/e2e/chat50-management.spec.ts:229:    await page.goto("/profissionais");
beauty-core-ui/e2e/chat50-management.spec.ts:231:    await waitForChat50Request(
beauty-core-ui/e2e/chat51-agenda.spec.ts:28:  expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:30:  ).toEqual([]);
beauty-core-ui/e2e/chat51-agenda.spec.ts:32:  expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:34:  ).toEqual([]);
beauty-core-ui/e2e/chat51-agenda.spec.ts:37:test.describe(
beauty-core-ui/e2e/chat51-agenda.spec.ts:44:      test(
beauty-core-ui/e2e/chat51-agenda.spec.ts:62:          await page.goto(
beauty-core-ui/e2e/chat51-agenda.spec.ts:66:          await expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:67:            page.getByTestId(
beauty-core-ui/e2e/chat51-agenda.spec.ts:70:          ).toBeVisible();
beauty-core-ui/e2e/chat51-agenda.spec.ts:72:          await expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:73:            page.getByRole(
beauty-core-ui/e2e/chat51-agenda.spec.ts:80:          ).toBeVisible();
beauty-core-ui/e2e/chat51-agenda.spec.ts:82:          await expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:91:          ).toBeVisible();
beauty-core-ui/e2e/chat51-agenda.spec.ts:102:          ).toBeGreaterThan(0);
beauty-core-ui/e2e/chat51-agenda.spec.ts:111:    test(
beauty-core-ui/e2e/chat51-agenda.spec.ts:138:        await page.goto(url);
beauty-core-ui/e2e/chat51-agenda.spec.ts:140:        await expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:141:          page.getByTestId(
beauty-core-ui/e2e/chat51-agenda.spec.ts:144:        ).toBeVisible();
beauty-core-ui/e2e/chat51-agenda.spec.ts:146:        await expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:152:        await expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:177:        }).toBe(true);
beauty-core-ui/e2e/chat51-agenda.spec.ts:185:    test(
beauty-core-ui/e2e/chat51-agenda.spec.ts:202:        await page.goto(
beauty-core-ui/e2e/chat51-agenda.spec.ts:206:        await expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:207:          page.getByTestId(
beauty-core-ui/e2e/chat51-agenda.spec.ts:210:        ).toBeVisible();
beauty-core-ui/e2e/chat51-agenda.spec.ts:221:        await expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:227:        await expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:228:          page.getByTestId(
beauty-core-ui/e2e/chat51-agenda.spec.ts:231:        ).toBeVisible();
beauty-core-ui/e2e/chat51-agenda.spec.ts:239:    test(
beauty-core-ui/e2e/chat51-agenda.spec.ts:261:        await page.goto(
beauty-core-ui/e2e/chat51-agenda.spec.ts:275:        await expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:276:          page.getByRole(
beauty-core-ui/e2e/chat51-agenda.spec.ts:283:        ).toBeVisible();
beauty-core-ui/e2e/chat51-agenda.spec.ts:285:        await expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:293:        ).toBeVisible();
beauty-core-ui/e2e/chat51-agenda.spec.ts:305:        await expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:306:          page.getByRole(
beauty-core-ui/e2e/chat51-agenda.spec.ts:313:        ).toBeVisible();
beauty-core-ui/e2e/chat51-agenda.spec.ts:339:        }).toBe(true);
beauty-core-ui/e2e/chat51-agenda.spec.ts:341:        await expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:342:          page.getByRole(
beauty-core-ui/e2e/chat51-agenda.spec.ts:348:        ).toBeVisible();
beauty-core-ui/e2e/chat51-agenda.spec.ts:350:        expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:352:        ).toBe(
beauty-core-ui/e2e/chat51-agenda.spec.ts:362:    test(
beauty-core-ui/e2e/chat51-agenda.spec.ts:384:        await page.goto(
beauty-core-ui/e2e/chat51-agenda.spec.ts:408:        await expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:409:          page.getByRole(
beauty-core-ui/e2e/chat51-agenda.spec.ts:416:        ).toBeVisible();
beauty-core-ui/e2e/chat51-agenda.spec.ts:418:        expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:425:        ).toBe(false);
beauty-core-ui/e2e/chat51-agenda.spec.ts:445:        ).toBe(true);
beauty-core-ui/e2e/chat51-agenda.spec.ts:447:        expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:449:        ).toBe(
beauty-core-ui/e2e/chat51-agenda.spec.ts:453:        await expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:454:          page.getByRole(
beauty-core-ui/e2e/chat51-agenda.spec.ts:460:        ).toBeVisible();
beauty-core-ui/e2e/chat51-agenda.spec.ts:468:    test(
beauty-core-ui/e2e/chat51-agenda.spec.ts:481:        await page.goto(
beauty-core-ui/e2e/chat51-agenda.spec.ts:485:        await expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:486:          page.getByRole(
beauty-core-ui/e2e/chat51-agenda.spec.ts:493:        ).toBeVisible();
beauty-core-ui/e2e/chat51-agenda.spec.ts:495:        await expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:496:          page.getByRole(
beauty-core-ui/e2e/chat51-agenda.spec.ts:505:        await expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:506:          page.getByTestId(
beauty-core-ui/e2e/chat51-agenda.spec.ts:511:        await expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:512:          page.getByRole(
beauty-core-ui/e2e/chat51-agenda.spec.ts:521:        expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:528:        ).toEqual([]);
beauty-core-ui/e2e/chat51-agenda.spec.ts:532:    test(
beauty-core-ui/e2e/chat51-agenda.spec.ts:579:          await page.goto(
beauty-core-ui/e2e/chat51-agenda.spec.ts:583:          await expect(
beauty-core-ui/e2e/chat51-agenda.spec.ts:584:            page.getByTestId(
beauty-core-ui/e2e/chat51-agenda.spec.ts:587:          ).toBeVisible();
beauty-core-ui/e2e/chat51-agenda.spec.ts:594:          ).toBe(false);
beauty-core-ui/e2e/chat52-financeiro.spec.ts:18:  expect(runtime.pageErrors).toEqual([]);
beauty-core-ui/e2e/chat52-financeiro.spec.ts:20:  expect(runtime.consoleErrors).toEqual([]);
beauty-core-ui/e2e/chat52-financeiro.spec.ts:24:  await page.goto("/financeiro");
beauty-core-ui/e2e/chat52-financeiro.spec.ts:26:  await expect(
beauty-core-ui/e2e/chat52-financeiro.spec.ts:27:    page.getByRole("heading", {
beauty-core-ui/e2e/chat52-financeiro.spec.ts:31:  ).toBeVisible();
beauty-core-ui/e2e/chat52-financeiro.spec.ts:54:test.describe("Chat 52 ÔÇö Financeiro E2E", () => {
beauty-core-ui/e2e/chat52-financeiro.spec.ts:56:    test(`${role} acessa o Financeiro tenant`, async ({ page }) => {
beauty-core-ui/e2e/chat52-financeiro.spec.ts:63:        .toBe(true);
beauty-core-ui/e2e/chat52-financeiro.spec.ts:69:        .toBe(true);
beauty-core-ui/e2e/chat52-financeiro.spec.ts:73:        .toBe(true);
beauty-core-ui/e2e/chat52-financeiro.spec.ts:84:    test(`${role} n├úo monta APIs tenant do Financeiro`, async ({ page }) => {
beauty-core-ui/e2e/chat52-financeiro.spec.ts:87:      await page.goto("/financeiro");
beauty-core-ui/e2e/chat52-financeiro.spec.ts:89:      await page.waitForTimeout(700);
beauty-core-ui/e2e/chat52-financeiro.spec.ts:99:      expect(financeRequests).toEqual([]);
beauty-core-ui/e2e/chat52-financeiro.spec.ts:105:  test("URL state envia filtros suportados ao backend sem per├¡odo fict├¡cio", async ({
beauty-core-ui/e2e/chat52-financeiro.spec.ts:129:    await page.goto(`/financeiro?${query.toString()}`);
beauty-core-ui/e2e/chat52-financeiro.spec.ts:131:    await expect(
beauty-core-ui/e2e/chat52-financeiro.spec.ts:132:      page.getByRole("heading", {
beauty-core-ui/e2e/chat52-financeiro.spec.ts:136:    ).toBeVisible();
beauty-core-ui/e2e/chat52-financeiro.spec.ts:148:      .toContain("status=PENDENTE");
beauty-core-ui/e2e/chat52-financeiro.spec.ts:156:    expect(request).toBeDefined();
beauty-core-ui/e2e/chat52-financeiro.spec.ts:160:    expect(params.get("categoriaId")).toBe(CHAT52_IDS.categoria);
beauty-core-ui/e2e/chat52-financeiro.spec.ts:162:    expect(params.get("clienteId")).toBe(CHAT52_IDS.cliente);
beauty-core-ui/e2e/chat52-financeiro.spec.ts:164:    expect(params.get("agendamentoId")).toBe(CHAT52_IDS.agendamento);
beauty-core-ui/e2e/chat52-financeiro.spec.ts:166:    expect(params.get("tipo")).toBe("RECEITA");
beauty-core-ui/e2e/chat52-financeiro.spec.ts:168:    expect(params.get("status")).toBe("PENDENTE");
beauty-core-ui/e2e/chat52-financeiro.spec.ts:170:    expect(params.get("orderBy")).toBe("dataMovimentacao");
beauty-core-ui/e2e/chat52-financeiro.spec.ts:172:    expect(params.get("orderDirection")).toBe("desc");
beauty-core-ui/e2e/chat52-financeiro.spec.ts:174:    expect(params.has("dataInicio")).toBe(false);
beauty-core-ui/e2e/chat52-financeiro.spec.ts:176:    expect(params.has("dataFim")).toBe(false);
beauty-core-ui/e2e/chat52-financeiro.spec.ts:181:  test("pagamento usa PATCH dedicado com somente formaPagamento", async ({
beauty-core-ui/e2e/chat52-financeiro.spec.ts:188:    await expect(page.getByText("Receita E2E pendente")).toBeVisible();
beauty-core-ui/e2e/chat52-financeiro.spec.ts:194:    await expect(pendingCard).toBeVisible();
beauty-core-ui/e2e/chat52-financeiro.spec.ts:202:    const dialog = page.getByRole("dialog").last();
beauty-core-ui/e2e/chat52-financeiro.spec.ts:204:    await expect(dialog).toBeVisible();
beauty-core-ui/e2e/chat52-financeiro.spec.ts:214:      .toEqual({
beauty-core-ui/e2e/chat52-financeiro.spec.ts:220:    expect(
beauty-core-ui/e2e/chat52-financeiro.spec.ts:222:    ).toEqual(["formaPagamento"]);
beauty-core-ui/e2e/chat52-financeiro.spec.ts:224:    expect(
beauty-core-ui/e2e/chat52-financeiro.spec.ts:226:    ).toBe(false);
beauty-core-ui/e2e/chat52-financeiro.spec.ts:231:  test("cancelamento de movimenta├º├úo paga n├úo simula estorno externo", async ({
beauty-core-ui/e2e/chat52-financeiro.spec.ts:242:    await expect(paidCard).toBeVisible();
beauty-core-ui/e2e/chat52-financeiro.spec.ts:256:    await expect(dialog).toBeVisible();
beauty-core-ui/e2e/chat52-financeiro.spec.ts:258:    await expect(dialog).toContainText(/n├úo representa estorno externo/i);
beauty-core-ui/e2e/chat52-financeiro.spec.ts:271:      .toBe(true);
beauty-core-ui/e2e/chat52-financeiro.spec.ts:273:    expect(lastRequest(runtime, "PATCH", pathname)?.body).toBeNull();
beauty-core-ui/e2e/chat52-financeiro.spec.ts:275:    expect(
beauty-core-ui/e2e/chat52-financeiro.spec.ts:277:    ).toBe(false);
beauty-core-ui/e2e/chat52-financeiro.spec.ts:282:  test("comiss├úo ├® paga somente pela rota dedicada", async ({ page }) => {
beauty-core-ui/e2e/chat52-financeiro.spec.ts:299:    await expect(dialog).toBeVisible();
beauty-core-ui/e2e/chat52-financeiro.spec.ts:312:      .toBe(true);
beauty-core-ui/e2e/chat52-financeiro.spec.ts:314:    expect(lastRequest(runtime, "PATCH", pathname)?.body).toBeNull();
beauty-core-ui/e2e/chat52-financeiro.spec.ts:319:  test("relat├│rios usam quatro endpoints operacionais sem analytics duplicado", async ({
beauty-core-ui/e2e/chat52-financeiro.spec.ts:334:        .toBe(true);
beauty-core-ui/e2e/chat52-financeiro.spec.ts:337:    expect(
beauty-core-ui/e2e/chat52-financeiro.spec.ts:339:    ).toBeUndefined();
beauty-core-ui/e2e/chat52-financeiro.spec.ts:341:    expect(
beauty-core-ui/e2e/chat52-financeiro.spec.ts:343:    ).toBe(false);
beauty-core-ui/e2e/chat52-financeiro.spec.ts:345:    expect(
beauty-core-ui/e2e/chat52-financeiro.spec.ts:347:    ).toBe(false);
beauty-core-ui/e2e/chat52-financeiro.spec.ts:352:  test("Financeiro n├úo possui overflow global nos seis viewports oficiais", async ({
beauty-core-ui/e2e/chat52-financeiro.spec.ts:389:      await expect.poll(() => hasNoHorizontalOverflow(page)).toBe(true);
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:59:  expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:61:  ).toBe(false);
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:67:  expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:69:  ).toEqual([]);
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:72:test.describe(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:75:    test(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:86:        await page.goto(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:98:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:108:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:110:        await page.goto(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:122:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:124:        await expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:125:          page.getByText(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:128:        ).toBeVisible();
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:136:    test(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:147:        await page.goto(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:159:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:161:        await page.goto(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:173:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:175:        await expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:176:          page.getByText(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:179:        ).toBeVisible();
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:187:    test(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:198:        await page.goto(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:210:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:212:        expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:217:        ).toBe(0);
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:219:        await page.goto(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:223:        await expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:224:          page.getByText(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:227:        ).toBeVisible();
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:229:        expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:234:        ).toBe(0);
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:242:    test(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:253:        await page.goto(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:265:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:267:        expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:272:        ).toBe(0);
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:274:        await page.goto(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:278:        await expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:279:          page.getByRole(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:286:        ).toBeVisible();
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:288:        expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:293:        ).toBe(0);
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:301:    test(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:312:        await page.goto(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:316:        await page.waitForTimeout(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:320:        await page.goto(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:324:        await page.waitForTimeout(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:328:        expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:330:        ).toBe(0);
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:338:    test(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:349:        await page.goto(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:353:        await expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:354:          page.getByText(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:357:        ).toBeVisible();
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:359:        await expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:360:          page.getByText(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:363:        ).toBeVisible();
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:365:        await expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:366:          page.getByRole(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:386:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:394:    test(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:405:        await page.goto(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:414:        await expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:416:        ).toBeVisible();
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:441:          .toEqual({
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:455:    test(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:472:        await page.goto(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:476:        await expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:477:          page.getByRole(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:484:        ).toBeVisible();
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:502:        await expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:503:          page.getByRole(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:510:        ).toBeVisible();
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:530:          .toBe(1);
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:538:        expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:540:        ).toBeNull();
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:550:          .toBeGreaterThan(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:554:        expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:558:        ).toBe(2);
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:560:        expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:564:        ).toBe(3);
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:572:    test(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:589:        await page.goto(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:593:        await expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:594:          page.getByRole(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:601:        ).toBeVisible();
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:619:        await expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:620:          page.getByRole(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:627:        ).toBeVisible();
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:647:          .toBe(1);
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:655:        expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:657:        ).toBeNull();
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:667:          .toBeGreaterThan(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:671:        expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:675:        ).toBe(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:685:    test(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:702:        await page.goto(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:714:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:724:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:726:        await expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:727:          page.getByText(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:730:        ).toBeVisible();
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:732:        await expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:733:          page.getByText(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:736:        ).toBeVisible();
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:744:    test(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:770:              await page.goto(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:782:                .toBeGreaterThan(0);
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:788:              await page.goto(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:792:              await expect(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:793:                page.getByText(
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:796:              ).toBeVisible();
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:14:  expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:16:  ).toEqual([]);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:18:  expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:20:  ).toEqual([]);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:31:  await expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:32:    page.getByRole(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:39:  ).toBeVisible();
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:75:test.describe(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:78:    test(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:89:        await page.goto(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:98:        await expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:108:        ).toBeVisible();
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:110:        await expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:111:          page.getByRole(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:118:        ).toBeVisible();
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:120:        await expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:121:          page.getByRole(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:128:        ).toBeVisible();
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:130:        await expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:131:          page.getByText(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:137:        ).toBeVisible();
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:147:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:157:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:167:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:169:        await page.goto(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:186:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:196:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:206:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:208:        await page.goto(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:217:        await expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:218:          page.getByText(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:224:        ).toBeVisible();
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:234:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:242:    test(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:253:        await page.goto(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:270:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:280:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:282:        await page.goto(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:299:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:301:        await page.goto(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:318:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:326:    test(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:337:        await page.goto(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:354:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:356:        expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:361:        ).toBe(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:363:        expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:368:        ).toBe(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:370:        await expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:371:          page.getByRole(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:381:        await page.goto(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:398:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:400:        expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:405:        ).toBe(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:407:        await page.goto(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:411:        await expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:412:          page.getByText(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:415:        ).toBeVisible();
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:417:        expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:422:        ).toBe(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:430:    test(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:441:        await page.goto(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:458:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:460:        expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:465:        ).toBe(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:467:        await page.goto(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:471:        await expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:472:          page.getByText(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:475:        ).toBeVisible();
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:477:        expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:481:        ).toBe(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:483:        expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:487:        ).toBe(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:489:        expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:493:        ).toBe(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:495:        await page.goto(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:499:        await expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:500:          page.getByText(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:503:        ).toBeVisible();
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:505:        expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:509:        ).toBe(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:517:    test(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:528:        await page.goto(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:532:        await expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:533:          page.getByText(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:536:        ).toBeVisible();
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:538:        await page.goto(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:542:        await expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:543:          page.getByText(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:546:        ).toBeVisible();
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:548:        await page.goto(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:552:        await expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:553:          page.getByText(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:556:        ).toBeVisible();
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:558:        expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:560:        ).toEqual([]);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:568:    test(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:579:        await page.goto(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:593:        await expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:595:        ).toBeVisible();
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:639:          .toBe(1);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:650:        expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:652:        ).toBeDefined();
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:654:        expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:656:        ).toEqual(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:667:        expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:679:    test(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:690:        await page.goto(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:702:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:711:        await expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:713:        ).toBeVisible();
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:735:          .toBe(1);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:746:        expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:748:        ).toBeDefined();
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:750:        expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:756:        await expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:757:          page.getByText(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:763:        ).toBeVisible();
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:771:    test(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:782:        await page.goto(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:799:          .toBeGreaterThan(0);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:802:          page.getByRole(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:810:        await expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:818:        await expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:819:          page.getByText(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:825:        ).toBeVisible();
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:845:          .toBe(1);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:847:        expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:849:        ).toEqual([]);
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:861:      test(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:903:            await page.goto(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:904:              route.path,
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:909:              route.heading,
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:926:            expect(
beauty-core-ui/e2e/chat54-comunicacoes.spec.ts:928:            ).toBeLessThanOrEqual(
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:71:  await route.fulfill({
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:149:    const request = route.request();
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:156:      await route.continue();
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:161:      await route.continue();
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:215:    await route.continue();
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:238:  expect(hasOverflow).toBe(false);
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:242:  await page.waitForFunction(() => {
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:256:  expect(denied).toBe(true);
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:259:test.describe("Chat 55 ÔÇö Arquivos + Configura├º├Áes E2E", () => {
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:260:  test("ADMIN acessa Arquivos, recebe lista paginada e navegacao dispon├¡vel", async ({
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:269:    await page.goto("/arquivos");
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:271:    await expect(
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:272:      page.getByRole("heading", {
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:275:    ).toBeVisible();
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:277:    await expect(
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:278:      page.getByText("contrato-e2e.pdf", {
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:281:    ).toBeVisible();
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:283:    await expect(page.locator('a[href="/arquivos"]').first()).toBeVisible();
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:285:    await expect(
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:287:    ).toBeVisible();
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:289:    await expect.poll(() => tracker.gets.length).toBe(1);
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:293:    expect(requestUrl.pathname).toBe("/arquivos");
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:295:    expect(requestUrl.searchParams.get("page")).toBe("1");
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:297:    expect(requestUrl.searchParams.get("limit")).toBe("10");
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:299:    expect(requestUrl.searchParams.has("empresaId")).toBe(false);
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:301:    expect(runtimeErrors).toEqual([]);
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:304:  test("GERENTE possui acesso de gestao a Arquivos", async ({ page }) => {
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:309:    await page.goto("/arquivos");
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:311:    await expect(
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:312:      page.getByText("contrato-e2e.pdf", {
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:315:    ).toBeVisible();
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:317:    await expect.poll(() => tracker.gets.length).toBe(1);
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:320:  test("tipo LOGO_EMPRESA usa endpoint server-side dedicado e preserva paginacao", async ({
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:327:    await page.goto("/arquivos?tipo=LOGO_EMPRESA&page=2");
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:329:    await expect(
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:330:      page.getByText("logo-e2e.png", {
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:333:    ).toBeVisible();
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:335:    await expect.poll(() => tracker.gets.length).toBe(1);
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:339:    expect(requestUrl.pathname).toBe("/arquivos/tipo/LOGO_EMPRESA");
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:341:    expect(requestUrl.searchParams.get("page")).toBe("2");
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:343:    expect(requestUrl.searchParams.get("limit")).toBe("10");
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:345:    expect(requestUrl.searchParams.has("search")).toBe(false);
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:347:    expect(requestUrl.searchParams.has("clienteId")).toBe(false);
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:349:    expect(requestUrl.searchParams.has("empresaId")).toBe(false);
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:352:  test("Configuracoes conecta Branding e Arquivos sem mutation geral de Empresa", async ({
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:357:    await page.goto("/configuracoes");
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:359:    await expect(
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:360:      page.getByRole("heading", {
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:363:    ).toBeVisible();
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:365:    await expect(
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:367:    ).toBeVisible();
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:369:    await expect(
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:371:    ).toBeVisible();
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:373:    await expect(
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:374:      page.getByRole("button", {
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:380:  test("Branding envia logo por multipart sem empresaId e atualiza preview", async ({
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:389:    await page.goto("/configuracoes/branding");
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:391:    await expect(page.getByText("Identidade efetiva")).toBeVisible();
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:393:    const input = page.getByLabel("Arquivo da logo");
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:395:    await expect(input).toBeVisible();
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:403:    const submit = page.getByRole("button", {
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:407:    await expect(submit).toBeEnabled();
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:411:    await expect(
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:412:      page.getByText("Logo personalizada configurada"),
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:413:    ).toBeVisible();
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:415:    await expect.poll(() => tracker.posts.length).toBe(1);
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:419:    expect(new URL(post?.url ?? "").pathname).toBe("/arquivos/logo");
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:421:    expect(post?.contentType).toContain("multipart/form-data");
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:423:    expect(post?.contentType).not.toContain("application/json");
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:425:    expect(post?.body).toContain('name="file"');
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:427:    expect(post?.body).not.toContain("empresaId");
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:429:    expect(runtimeErrors).toEqual([]);
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:432:  test("RECEPCAO nao executa GET da gestao de Arquivos", async ({ page }) => {
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:437:    await page.goto("/arquivos");
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:441:    await page.waitForTimeout(150);
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:443:    expect(tracker.gets).toEqual([]);
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:446:  test("RECEPCAO nao acessa Configuracoes do tenant", async ({ page }) => {
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:449:    await page.goto("/configuracoes");
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:453:    await expect(page.locator('a[href="/configuracoes/branding"]')).toHaveCount(
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:458:  test("SUPER_ADMIN nao herda Configuracoes tenant automaticamente", async ({
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:463:    await page.goto("/configuracoes");
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:496:    test(`responsividade ${viewport.width}x${viewport.height} mant├®m Arquivos e Branding sem overflow global`, async ({
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:505:      await page.goto("/arquivos");
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:507:      await expect(
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:508:        page.getByRole("heading", {
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:512:      ).toBeVisible();
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:516:      await page.goto("/configuracoes/branding");
beauty-core-ui/e2e/chat55-arquivos-configuracoes.spec.ts:518:      await expect(page.getByText("Identidade efetiva")).toBeVisible();
beauty-core-ui/e2e/fixtures/chat48-dashboard.fixture.ts:139:      const request = route.request();
beauty-core-ui/e2e/fixtures/chat48-dashboard.fixture.ts:146:        await route.fallback();
beauty-core-ui/e2e/fixtures/chat48-dashboard.fixture.ts:178:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat48-dashboard.fixture.ts:198:      await route.fulfill({
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:445:      await route.fulfill({
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:463:      await route.fulfill({
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:483:      await route.fulfill({
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:497:      await route.fulfill({
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:549:      const request = route.request();
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:567:        await route.fallback();
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:585:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:605:      await route.fulfill({
beauty-core-ui/e2e/fixtures/chat50-management.fixture.ts:128:  await route.fulfill({
beauty-core-ui/e2e/fixtures/chat50-management.fixture.ts:192:  expect(
beauty-core-ui/e2e/fixtures/chat50-management.fixture.ts:195:  ).toEqual([]);
beauty-core-ui/e2e/fixtures/chat50-management.fixture.ts:197:  expect(
beauty-core-ui/e2e/fixtures/chat50-management.fixture.ts:200:  ).toEqual([]);
beauty-core-ui/e2e/fixtures/chat50-management.fixture.ts:217:    .toBe(true);
beauty-core-ui/e2e/fixtures/chat50-management.fixture.ts:224:  const matches = page.getByText(text, {
beauty-core-ui/e2e/fixtures/chat50-management.fixture.ts:251:    .toBe(true);
beauty-core-ui/e2e/fixtures/chat50-management.fixture.ts:254:export async function waitForChat50Request(
beauty-core-ui/e2e/fixtures/chat50-management.fixture.ts:271:    .toBe(true);
beauty-core-ui/e2e/fixtures/chat50-management.fixture.ts:319:    const request = route.request();
beauty-core-ui/e2e/fixtures/chat50-management.fixture.ts:324:      await route.fallback();
beauty-core-ui/e2e/fixtures/chat50-management.fixture.ts:330:      await route.fallback();
beauty-core-ui/e2e/fixtures/chat50-management.fixture.ts:392:    await route.fallback();
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:86:      await route.fulfill({
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:104:      await route.fulfill({
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:237:        route.request();
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:262:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:280:      await route.fallback();
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:288:        route.request();
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:299:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:311:      await route.fallback();
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:319:        route.request();
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:331:        await route.fallback();
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:370:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:387:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:418:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:447:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:480:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:502:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:516:      await route.fulfill({
beauty-core-ui/e2e/fixtures/chat52-financeiro.fixture.ts:124:  await route.fulfill({
beauty-core-ui/e2e/fixtures/chat52-financeiro.fixture.ts:229:    const url = new URL(route.request().url());
beauty-core-ui/e2e/fixtures/chat52-financeiro.fixture.ts:256:    const request = route.request();
beauty-core-ui/e2e/fixtures/chat52-financeiro.fixture.ts:275:    const request = route.request();
beauty-core-ui/e2e/fixtures/chat52-financeiro.fixture.ts:278:      await route.fallback();
beauty-core-ui/e2e/fixtures/chat52-financeiro.fixture.ts:286:      await route.fallback();
beauty-core-ui/e2e/fixtures/chat52-financeiro.fixture.ts:441:    const request = route.request();
beauty-core-ui/e2e/fixtures/chat52-financeiro.fixture.ts:446:      await route.fallback();
beauty-core-ui/e2e/fixtures/chat52-financeiro.fixture.ts:509:    record(runtime, route.request());
beauty-core-ui/e2e/fixtures/chat52-financeiro.fixture.ts:519:    record(runtime, route.request());
beauty-core-ui/e2e/fixtures/chat52-financeiro.fixture.ts:531:    record(runtime, route.request());
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:249:        route.request();
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:266:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:289:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:311:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:336:        await route.continue();
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:354:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:373:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:389:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:405:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:421:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:449:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:468:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:487:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:506:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:550:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:579:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:598:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:635:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:673:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:707:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:732:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:766:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:800:        await route.fulfill({
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:820:      await route.fulfill({
beauty-core-ui/e2e/fixtures/chat54-comunicacoes.fixture.ts:70:  await route.fulfill({
beauty-core-ui/e2e/fixtures/chat54-comunicacoes.fixture.ts:160:      const request = route.request();
beauty-core-ui/e2e/fixtures/chat54-comunicacoes.fixture.ts:174:        await route.continue();
beauty-core-ui/e2e/fixtures/chat54-comunicacoes.fixture.ts:212:        await route.continue();
beauty-core-ui/e2e/foundation.smoke.spec.ts:6:test(
beauty-core-ui/e2e/foundation.smoke.spec.ts:9:    await page.goto("/");
beauty-core-ui/e2e/foundation.smoke.spec.ts:11:    await expect(page).toHaveURL(
beauty-core-ui/e2e/foundation.smoke.spec.ts:15:    await expect(
beauty-core-ui/e2e/foundation.smoke.spec.ts:16:      page.getByRole("heading", {
beauty-core-ui/e2e/foundation.smoke.spec.ts:19:    ).toBeVisible();
beauty-core-ui/e2e/portal-foundation.spec.ts:13:  test(`Portal foundation em ${viewport.name}`, async ({ page }) => {
beauty-core-ui/e2e/portal-foundation.spec.ts:32:    await page.goto("/portal", {
beauty-core-ui/e2e/portal-foundation.spec.ts:36:    await expect(
beauty-core-ui/e2e/portal-foundation.spec.ts:37:      page.getByRole("heading", {
beauty-core-ui/e2e/portal-foundation.spec.ts:40:    ).toBeVisible();
beauty-core-ui/e2e/portal-foundation.spec.ts:42:    await expect(page.getByRole("banner")).toBeVisible();
beauty-core-ui/e2e/portal-foundation.spec.ts:43:    await expect(page.getByRole("main")).toBeVisible();
beauty-core-ui/e2e/portal-foundation.spec.ts:44:    await expect(page.getByRole("contentinfo")).toBeVisible();
beauty-core-ui/e2e/portal-foundation.spec.ts:45:    await expect(page.getByLabel("Beauty Core")).toBeVisible();
beauty-core-ui/e2e/portal-foundation.spec.ts:47:    const skipLink = page.getByRole("link", {
beauty-core-ui/e2e/portal-foundation.spec.ts:51:    await expect(skipLink).toHaveAttribute("href", "#portal-main");
beauty-core-ui/e2e/portal-foundation.spec.ts:54:    await expect(skipLink).toBeFocused();
beauty-core-ui/e2e/portal-foundation.spec.ts:62:    expect(overflow.body).toBe(true);
beauty-core-ui/e2e/portal-foundation.spec.ts:63:    expect(overflow.document).toBe(true);
beauty-core-ui/e2e/portal-foundation.spec.ts:77:    expect(unsafeLinks).toEqual([]);
beauty-core-ui/e2e/portal-foundation.spec.ts:78:    expect(consoleErrors).toEqual([]);
beauty-core-ui/e2e/portal-foundation.spec.ts:79:    expect(pageErrors).toEqual([]);
beauty-core-ui/e2e/portal-foundation.spec.ts:83:test("Portal e Admin permanecem isolados", async ({ page }) => {
beauty-core-ui/e2e/portal-foundation.spec.ts:84:  await page.goto("/portal", {
beauty-core-ui/e2e/portal-foundation.spec.ts:88:  await expect(
beauty-core-ui/e2e/portal-foundation.spec.ts:89:    page.getByRole("heading", {
beauty-core-ui/e2e/portal-foundation.spec.ts:92:  ).toBeVisible();
beauty-core-ui/e2e/portal-foundation.spec.ts:94:  await page.goto("/admin", {
beauty-core-ui/e2e/portal-foundation.spec.ts:98:  expect(page.url()).not.toContain("/portal");
beauty-core-ui/e2e/portal-foundation.spec.ts:99:  await expect(
beauty-core-ui/e2e/portal-foundation.spec.ts:100:    page.getByRole("heading", {
beauty-core-ui/e2e/portal-foundation.spec.ts:103:  ).not.toBeVisible();
beauty-core-ui/e2e/portal-foundation.spec.ts:106:test("returnTo malicioso nao altera a origem da pagina", async ({ page }) => {
beauty-core-ui/e2e/portal-foundation.spec.ts:107:  await page.goto(
beauty-core-ui/e2e/portal-foundation.spec.ts:116:  expect(currentUrl.pathname).toBe("/portal");
beauty-core-ui/e2e/portal-foundation.spec.ts:117:  expect(currentUrl.hostname).not.toBe("evil.example");
beauty-core-ui/e2e/portal-foundation.spec.ts:119:  await expect(
beauty-core-ui/e2e/portal-foundation.spec.ts:120:    page.getByRole("heading", {
beauty-core-ui/e2e/portal-foundation.spec.ts:123:  ).toBeVisible();
beauty-core-ui/e2e/portal-foundation.spec.ts:126:test("raiz neutra nao antecipa telas privadas ou de negocio", async ({
beauty-core-ui/e2e/portal-foundation.spec.ts:129:  await page.goto("/portal", {
beauty-core-ui/e2e/portal-foundation.spec.ts:145:    await expect(
beauty-core-ui/e2e/portal-foundation.spec.ts:146:      page.getByRole("heading", { name: heading }),
beauty-core-ui/e2e/portal-foundation.spec.ts:147:    ).not.toBeVisible();
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:19:describe("Portal private App Router routes", () => {
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:20:  it("keeps Perfil and Historico under the shared private route boundary", () => {
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:21:    render(
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:28:    expect(screen.getByRole("heading", { name: "Perfil" })).toBeInTheDocument();
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:29:    expect(screen.getByRole("heading", { name: "Historico" })).toBeInTheDocument();
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:30:    expect(screen.getAllByTestId("private-boundary")).toHaveLength(2);
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:33:  it("does not declare an administrative route in the Portal surface", () => {
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:34:    expect(
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:38:    ).toBe(false);
beauty-core-ui/src/app/portal/portal-routing.test.tsx:18:describe("Portal routing foundation", () => {
beauty-core-ui/src/app/portal/portal-routing.test.tsx:19:  it("renders the OTP request route inside the anonymous Portal auth state", () => {
beauty-core-ui/src/app/portal/portal-routing.test.tsx:20:    render(
beauty-core-ui/src/app/portal/portal-routing.test.tsx:33:    expect(
beauty-core-ui/src/app/portal/portal-routing.test.tsx:34:      screen.getByRole("heading", { name: portalHeading }),
beauty-core-ui/src/app/portal/portal-routing.test.tsx:35:    ).toBeInTheDocument();
beauty-core-ui/src/app/portal/portal-routing.test.tsx:37:    expect(screen.getByText(portalDescription)).toBeInTheDocument();
beauty-core-ui/src/app/portal/portal-routing.test.tsx:39:    expect(
beauty-core-ui/src/app/portal/portal-routing.test.tsx:40:      screen.getByRole("form", {
beauty-core-ui/src/app/portal/portal-routing.test.tsx:43:    ).toBeInTheDocument();
beauty-core-ui/src/app/portal/portal-routing.test.tsx:45:    expect(
beauty-core-ui/src/app/portal/portal-routing.test.tsx:46:      screen.getByLabelText("Telefone com DDD"),
beauty-core-ui/src/app/portal/portal-routing.test.tsx:47:    ).toBeInTheDocument();
beauty-core-ui/src/features/portal/assets/portal-assets.test.ts:22:describe("portal asset registry", () => {
beauty-core-ui/src/features/portal/assets/portal-assets.test.ts:23:  it("contains the 25 approved runtime assets", () => {
beauty-core-ui/src/features/portal/assets/portal-assets.test.ts:26:    expect(assets).toHaveLength(25);
beauty-core-ui/src/features/portal/assets/portal-assets.test.ts:27:    expect(new Set(assets.map((asset) => asset.src)).size).toBe(25);
beauty-core-ui/src/features/portal/assets/portal-assets.test.ts:30:  it("references only runtime paths from the public Portal directory", () => {
beauty-core-ui/src/features/portal/assets/portal-assets.test.ts:34:      expect(asset.src).toMatch(/^\/images\/portal\//);
beauty-core-ui/src/features/portal/assets/portal-assets.test.ts:35:      expect(asset.src).not.toMatch(/source/i);
beauty-core-ui/src/features/portal/assets/portal-assets.test.ts:36:      expect(asset.src).toMatch(/\.(webp|png)$/);
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:30:describe("portalAuthApi", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:31:  it("solicita OTP pela rota p├║blica tenant-aware sem enviar empresaId", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:53:    expect(mocks.publicClient.post).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:60:    expect(
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:62:    ).not.toContain("empresaId");
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:65:  it("verifica OTP pela mesma rota p├║blica e preserva somente os campos contratuais", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:94:    expect(mocks.publicClient.post).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:102:    expect(result.access_token).toBe("access-token");
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:103:    expect(result.refresh_token).toBe("refresh-token");
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:104:    expect(result.primeiroAcesso).toBe(true);
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:107:  it("usa o contrato real de refresh com refreshToken no body", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:119:    expect(mocks.publicClient.post).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:127:  it("usa o contrato real de logout da sess├úo atual", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:138:    expect(mocks.apiClient.post).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:146:  it("usa logout-all sem inventar payload", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:155:    expect(mocks.apiClient.post).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:160:  it("consulta me e aceita termos pelos endpoints privados reais", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:190:    expect(mocks.apiClient.get).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:194:    expect(mocks.apiClient.post).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:202:  it("mant├®m a chave de auth sem empresaId arbitr├írio", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:203:    expect(portalAuthQueryKeys.me()).toEqual([
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:209:    expect(
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:211:    ).not.toContain("empresaId");
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:6:describe("clearPortalPrivateQueries", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:7:  it("removes Portal private queries and preserves unrelated cache", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:16:    expect(
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:18:    ).toBeUndefined();
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:19:    expect(
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:21:    ).toBeUndefined();
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:22:    expect(
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:24:    ).toEqual({ ready: true });
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:27:  it("is safe when the Portal cache is already empty", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:30:    expect(() => {
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:35:  it("does not remove queries from another namespace", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:42:    expect(
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:44:    ).toEqual({ total: 1 });
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:47:  it("does not depend on token values or browser storage", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:56:    expect(
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:58:    ).toBeUndefined();
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:5:  waitFor,
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:69:describe("PortalAuthProvider ÔÇö ciclo real de sess├úo", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:70:  it("restaura e publica a identidade do cliente", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:73:    render(
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:79:    screen.getByRole("button", {
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:83:    await waitFor(() => {
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:84:      expect(screen.getByTestId("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:89:    expect(screen.getByTestId("identity")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:94:  it("marca anonymous quando n├úo existe sess├úo restaur├ível", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:97:    render(
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:103:    screen.getByRole("button", {
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:107:    await waitFor(() => {
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:108:      expect(screen.getByTestId("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:114:  it("executa logout e limpa o estado do provider", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:119:    render(
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:130:    screen.getByRole("button", {
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:134:    await waitFor(() => {
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:135:      expect(screen.getByTestId("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:140:    expect(mocks.clearPortalSession).toHaveBeenCalled();
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:143:  it("n├úo restaura automaticamente sem restoreOnMount", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:146:    render(
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:152:    expect(screen.getByTestId("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:156:    expect(mocks.restorePortalSession).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:159:  it("restaura automaticamente quando restoreOnMount est├í habilitado", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:163:    render(
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:169:    await waitFor(() => {
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:170:      expect(screen.getByTestId("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:175:    expect(mocks.restorePortalSession).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:1:import { cleanup, fireEvent, render, screen } from "@testing-library/react";
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:57:describe("PortalAuthProvider", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:58:  it("starts without assuming a client session", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:59:    render(
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:65:    expect(screen.getByTestId("status")).toHaveTextContent("unknown");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:66:    expect(screen.getByTestId("private-query")).toHaveTextContent("false");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:67:    expect(screen.getByTestId("identity")).toBeEmptyDOMElement();
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:70:  it("supports the client authentication state transitions", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:71:    render(
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:77:    fireEvent.click(screen.getByRole("button", { name: "restaurar" }));
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:78:    expect(screen.getByTestId("status")).toHaveTextContent("restoring");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:80:    fireEvent.click(screen.getByRole("button", { name: "autenticar" }));
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:81:    expect(screen.getByTestId("status")).toHaveTextContent("authenticated");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:82:    expect(screen.getByTestId("private-query")).toHaveTextContent("true");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:83:    expect(screen.getByTestId("identity")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:87:    fireEvent.click(screen.getByRole("button", { name: "negar" }));
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:88:    expect(screen.getByTestId("status")).toHaveTextContent("denied");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:89:    expect(screen.getByTestId("private-query")).toHaveTextContent("false");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:90:    expect(screen.getByTestId("identity")).toBeEmptyDOMElement();
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:92:    fireEvent.click(screen.getByRole("button", { name: "limpar" }));
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:93:    expect(screen.getByTestId("status")).toHaveTextContent("anonymous");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:97:describe("PortalAuthBoundary", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:98:  it("exposes only the surface allowed by the current state", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:104:    render(
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:116:    expect(screen.getByText("superficie anonima")).toBeInTheDocument();
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:117:    expect(screen.queryByText("conteudo privado")).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:121:    render(
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:135:    expect(screen.getByText("conteudo privado")).toBeInTheDocument();
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:136:    expect(screen.queryByText("superficie anonima")).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:7:describe("normalizePortalAuthError", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:25:      expect(
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:34:  it("classifica falha sem resposta como network", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:40:    expect(
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:48:  it("n├úo exp├Áe payload bruto ou PII na mensagem normalizada", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:63:    expect(result.message).not.toContain("83999999999");
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:64:    expect(result.message).not.toContain("cliente-secreto");
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:65:    expect(result.message).not.toContain("token-secreto");
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:5:  waitFor,
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:65:  return render(
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:96:describe("PortalAuthRouteOrchestrator", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:97:  it("routes a first-access client before exposing the regular surface", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:100:    await waitFor(() => {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:101:      expect(navigation.replace).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:106:    expect(
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:107:      screen.queryByText("superf├¡cie autorizada"),
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:108:    ).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:111:  it("keeps a normal client outside the first-access route", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:117:    await waitFor(() => {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:118:      expect(navigation.replace).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:124:  it("restores the decision from the real me contract after reload", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:129:    await waitFor(() => {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:130:      expect(meMock).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:131:      expect(navigation.replace).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:137:  it("does not expose content when the auth profile cannot be verified", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:142:    await waitFor(() => {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:143:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:148:    expect(
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:149:      screen.queryByText("superf├¡cie autorizada"),
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:150:    ).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:10:describe("Portal first-access routing", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:11:  it("builds a safe first-access href", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:12:    expect(
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:14:    ).toBe(
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:19:  it("falls back safely when returnTo is external", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:20:    expect(
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:22:    ).toBe(
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:27:  it("does not allow first access to be bypassed by returnTo", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:28:    expect(
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:34:    ).toBe(
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:39:  it("returns a normal user from the first-access route", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:40:    expect(
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:46:    ).toBe("/portal/historico");
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:49:  it("honors a safe returnTo after anonymous login", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:50:    expect(
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:56:    ).toBe("/portal/perfil");
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:59:  it("does not redirect a normal user from the regular Portal route", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:60:    expect(
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:66:    ).toBeNull();
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:68:    expect(
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:72:    ).toBe("/portal");
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:97:describe("portal-auth-session", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:98:  it("n├úo restaura quando n├úo existem tokens", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:99:    expect(await restorePortalSession()).toBeNull();
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:100:    expect(mocks.me).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:103:  it("inicia sess├úo usando identidade real e expira├º├úo do JWT", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:106:    expect(identity).toEqual({
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:112:    expect(mocks.setTokens).toHaveBeenCalledWith({
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:119:  it("renova sess├úo quando existe somente refresh token", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:140:    expect(mocks.refresh).toHaveBeenCalledWith({
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:144:    expect(mocks.me).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:145:    expect(identity).toEqual({
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:151:    expect(mocks.setTokens).toHaveBeenCalledWith({
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:158:  it("limpa a sess├úo local quando o logout atual falha", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:162:    await expect(logoutPortalSession()).rejects.toThrow(
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:166:    expect(mocks.clearTokens).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:169:  it("executa logout-all e limpa a sess├úo local", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:176:    expect(mocks.logoutAll).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:177:    expect(mocks.clearTokens).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:180:  it("permite verificar e limpar a exist├¬ncia de sess├úo", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:183:    expect(hasPortalSession()).toBe(true);
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:187:    expect(mocks.clearTokens).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:44:  const parts = accessToken.split(".");
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:3:  fireEvent,
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:6:  waitFor,
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:57:  return render(
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:72:describe("PortalOtpRequestForm", () => {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:73:  it("normalizes formatted phone numbers according to the backend contract", () => {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:74:    expect(normalizePortalPhone("(83) 99999-9999")).toBe(
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:77:    expect(validatePortalPhone("83999999999")).toBeNull();
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:78:    expect(validatePortalPhone("123")).toBe(
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:83:  it("blocks submission when the phone is invalid", () => {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:86:    fireEvent.change(screen.getByLabelText("Telefone com DDD"), {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:90:    fireEvent.submit(
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:91:      screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:96:    expect(
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:97:      screen.getByRole("alert"),
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:100:    expect(requestOtpMock).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:103:  it("sends only the tenant slug and normalized phone to the public adapter", async () => {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:108:    fireEvent.change(screen.getByLabelText("Telefone com DDD"), {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:112:    fireEvent.submit(
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:113:      screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:118:    await waitFor(() => {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:119:      expect(requestOtpMock).toHaveBeenCalledWith({
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:125:    expect(requestOtpMock.mock.calls[0][0]).not.toHaveProperty(
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:129:    await waitFor(() => {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:130:      expect(screen.getByRole("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:136:  it("prevents double submit while the request is pending", async () => {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:147:    fireEvent.change(screen.getByLabelText("Telefone com DDD"), {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:151:    const form = screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:155:    fireEvent.submit(form);
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:156:    fireEvent.submit(form);
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:158:    expect(requestOtpMock).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:159:    expect(screen.getByRole("button")).toBeDisabled();
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:163:    await waitFor(() => {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:164:      expect(screen.getByRole("status")).toBeInTheDocument();
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:168:  it("maps rate limiting to a safe user-facing message", async () => {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:177:    fireEvent.change(screen.getByLabelText("Telefone com DDD"), {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:181:    fireEvent.submit(
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:182:      screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:187:    await waitFor(() => {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:188:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:78:  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:3:  fireEvent,
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:6:  waitFor,
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:96:  return render(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:128:describe("PortalOtpVerificationForm", () => {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:129:  it("supports numeric filtering, paste and one-time-code autofill", () => {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:132:    const input = screen.getByLabelText("C├│digo de acesso");
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:134:    expect(input).toHaveAttribute("autoComplete", "one-time-code");
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:135:    expect(input).toHaveAttribute("inputMode", "numeric");
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:136:    expect(input).toHaveAttribute("maxLength", "6");
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:138:    fireEvent.change(input, {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:144:    expect(input).toHaveValue("123456");
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:145:    expect(normalizePortalOtpCode("12a 345678")).toBe("123456");
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:146:    expect(validatePortalOtpCode("12345")).toBe(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:151:  it("blocks verification when the code is incomplete", () => {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:154:    fireEvent.change(screen.getByLabelText("C├│digo de acesso"), {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:158:    fireEvent.submit(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:159:      screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:164:    expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:168:    expect(verifyOtpMock).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:171:  it("verifies the real contract and restores the authenticated session", async () => {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:176:    fireEvent.change(screen.getByLabelText("C├│digo de acesso"), {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:180:    fireEvent.submit(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:181:      screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:186:    await waitFor(() => {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:187:      expect(verifyOtpMock).toHaveBeenCalledWith({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:194:    expect(startPortalSessionMock).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:198:    await waitFor(() => {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:199:      expect(restoreSessionMock).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:200:      expect(screen.getByRole("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:206:  it("prevents double verification while the request is pending", async () => {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:217:    fireEvent.change(screen.getByLabelText("C├│digo de acesso"), {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:221:    const form = screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:225:    fireEvent.submit(form);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:226:    fireEvent.submit(form);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:228:    expect(verifyOtpMock).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:229:    expect(screen.getByRole("button", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:231:    })).toBeDisabled();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:235:    await waitFor(() => {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:236:      expect(screen.getByRole("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:242:  it("shows a safe message for invalid or expired codes", async () => {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:251:    fireEvent.change(screen.getByLabelText("C├│digo de acesso"), {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:255:    fireEvent.submit(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:256:      screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:261:    await waitFor(() => {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:262:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:268:  it("resends through the public tenant-aware endpoint without cooldown invention", async () => {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:273:    fireEvent.click(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:274:      screen.getByRole("button", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:279:    await waitFor(() => {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:280:      expect(requestOtpMock).toHaveBeenCalledWith({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:286:    expect(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:287:      screen.getByRole("status"),
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:290:    expect(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:291:      screen.getByRole("button", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:294:    ).not.toBeDisabled();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:297:  it("handles resend rate limiting and unavailable access safely", async () => {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:306:    fireEvent.click(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:307:      screen.getByRole("button", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:312:    await waitFor(() => {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:313:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:329:    fireEvent.change(screen.getByLabelText("C├│digo de acesso"), {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:333:    fireEvent.submit(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:334:      screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:339:    await waitFor(() => {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:340:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:6:  waitFor,
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:43:describe("PortalPrivateRoute", () => {
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:44:  it("does not expose private content to an anonymous client", async () => {
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:50:    render(
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:56:    expect(screen.queryByText("conteudo privado")).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:57:    await waitFor(() => {
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:58:      expect(mocks.router.replace).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:64:  it("waits for auth restoration without fetching a private resource", () => {
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:70:    render(
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:76:    expect(screen.getByRole("status")).toBeInTheDocument();
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:77:    expect(screen.queryByText("conteudo privado")).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:78:    expect(mocks.router.replace).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:81:  it("exposes the children only after authentication", () => {
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:91:    render(
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:97:    expect(screen.getByText("conteudo privado")).toBeInTheDocument();
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:98:    expect(mocks.router.replace).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:101:  it("keeps an administrative path outside the Portal returnTo namespace", async () => {
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:108:    render(
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:114:    await waitFor(() => {
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:115:      expect(mocks.router.replace).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:8:describe("PortalAssetImage", () => {
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:9:  it("renders an approved runtime asset with its accessible alternative", () => {
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:10:    render(
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:20:    const image = screen.getByAltText("Visual principal do Portal");
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:23:    expect(src).toBeTruthy();
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:24:    expect(decodeURIComponent(src ?? "")).toContain(
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:29:  it("renders decorative assets with an empty alternative", () => {
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:30:    render(
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:41:    expect(screen.getByAltText("")).toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:44:describe("PortalBranding", () => {
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:45:  it("uses the real TenantProvider fallback branding", () => {
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:46:    render(
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:52:    expect(screen.getByLabelText("Studio Aurora")).toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:53:    expect(screen.getByText("Studio Aurora")).toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:56:  it("renders the tenant logo when the real logoUrl exists", () => {
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:57:    render(
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:63:    expect(screen.getByAltText("")).toHaveAttribute(
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:7:  waitFor,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:101:  return render(
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:123:describe("portal dashboard data foundation", () => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:124:  it("shows an authenticated query in its initial fetching state", () => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:129:    expect(screen.getByTestId("dashboard-query")).toHaveTextContent(
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:134:  it("does not fetch the private dashboard for an anonymous client", () => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:139:    expect(screen.getByTestId("dashboard-query")).toHaveTextContent(
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:142:    expect(mocks.getPortalDashboard).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:145:  it("loads the mapped dashboard once for an authenticated client", async () => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:150:    await waitFor(() => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:151:      expect(screen.getByTestId("dashboard-query")).toHaveTextContent(
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:156:    expect(mocks.getPortalDashboard).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:157:    expect(mocks.getPortalDashboard).toHaveBeenCalledWith();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:173:      await waitFor(() => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:174:        expect(screen.getByTestId("dashboard-query")).toHaveTextContent(
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:179:      expect(mocks.getPortalDashboard).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:183:  it("renders the safe view model and never exposes raw fields", async () => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:188:    await waitFor(() => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:189:      expect(screen.getByTestId("dashboard-view")).toHaveTextContent(
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:194:    expect(screen.queryByText("empresa-real")).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:195:    expect(screen.queryByText("83999999999")).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:198:  it("renders an honest empty state without inventing KPIs", async () => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:209:    await waitFor(() => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:210:      expect(
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:211:        screen.getByRole("heading", {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:214:      ).toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:217:    expect(screen.queryByText(/pontos|saldo|total/i)).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:220:  it("renders a safe server error state with retry", async () => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:228:    await waitFor(() => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:229:      expect(
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:230:        screen.getByRole("heading", {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:233:      ).toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:236:    expect(
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:237:      screen.getByRole("button", { name: "Tentar novamente" }),
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:238:    ).toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:241:  it("keeps the anonymous surface out of the private dashboard", () => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:246:    expect(
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:247:      screen.getByRole("heading", {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:250:    ).toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:251:    expect(screen.queryByTestId("dashboard-view")).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:252:    expect(mocks.getPortalDashboard).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:19:describe("PortalNavigation", () => {
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:20:  it("renders the approved Portal routes by default", () => {
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:21:    render(<PortalNavigation activePath="/portal/perfil" />);
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:23:    expect(screen.getAllByRole("link")).toHaveLength(6);
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:24:    expect(screen.getAllByRole("link", { name: "Inicio" })).toHaveLength(2);
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:25:    expect(screen.getAllByRole("link", { name: "Perfil" })).toHaveLength(2);
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:26:    expect(screen.getAllByRole("link", { name: "Historico" })).toHaveLength(2);
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:28:    expect(
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:29:      screen.getAllByRole("link", { name: "Perfil" }).every(
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:32:    ).toBe(true);
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:33:    expect(
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:34:      screen.getAllByRole("link", { name: "Inicio" }).every(
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:37:    ).toBe(true);
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:40:  it("does not render links when no enabled route is supplied", () => {
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:41:    render(<PortalNavigation items={[]} />);
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:43:    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:44:    expect(screen.queryByRole("link")).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:47:  it("renders safe routes with aria-current on the active route", () => {
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:48:    render(
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:58:    const links = screen.getAllByRole("link", { name: "Historico" });
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:60:    expect(links).toHaveLength(2);
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:61:    expect(
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:65:    ).toBe(true);
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:68:  it("rejects external and administrative routes", () => {
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:69:    render(
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:88:    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:89:    expect(screen.queryByRole("link")).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx:6:describe("PortalPageContainer", () => {
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx:7:  it("renders children inside the shared Card primitive", () => {
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx:8:    render(
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx:14:    expect(
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx:15:      screen.getByRole("heading", { name: "Foundation do portal" }),
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx:16:    ).toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:13:describe("Portal responsive and accessibility foundation", () => {
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:14:  it("exposes landmarks and a keyboard skip link", () => {
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:15:    render(
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:23:    expect(screen.getByRole("banner")).toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:24:    expect(screen.getByRole("main")).toHaveAttribute(
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:28:    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:30:    const skipLink = screen.getByRole("link", {
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:34:    expect(skipLink).toHaveAttribute("href", "#portal-main");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:35:    expect(skipLink).toHaveClass("focus:not-sr-only");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:36:    expect(skipLink).toHaveClass("focus-visible:outline-none");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:39:  it("keeps the shell within responsive content bounds", () => {
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:40:    render(
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:48:    const main = screen.getByRole("main");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:50:    expect(main).toHaveClass("w-full");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:51:    expect(main).toHaveClass("max-w-6xl");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:52:    expect(main).toHaveClass("px-4");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:53:    expect(main).toHaveClass("sm:px-6");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:54:    expect(main).toHaveClass("lg:px-8");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:55:    expect(main).toHaveClass("flex-1");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:58:  it("keeps state actions keyboard accessible and motion-aware", () => {
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:61:    render(
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:72:    const button = screen.getByRole("button", {
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:76:    expect(button).toHaveClass("min-h-11");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:77:    expect(button).toHaveClass("focus-visible:outline-none");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:78:    expect(button).toHaveClass("focus-visible:ring-2");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:79:    expect(button).toHaveClass("motion-reduce:transition-none");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:82:  it("keeps transversal panels usable on narrow screens", () => {
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:83:    render(
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:90:    const panel = screen.getByRole("heading", {
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:94:    expect(panel).toHaveClass("w-full");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:95:    expect(panel).toHaveClass("max-w-xl");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:96:    expect(panel).toHaveClass("px-5");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:97:    expect(panel).toHaveClass("sm:px-8");
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:22:describe("PortalShell", () => {
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:23:  it("renders shell landmarks with real tenant branding", () => {
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:24:    render(
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:32:    expect(screen.getByRole("banner")).toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:33:    expect(screen.getByRole("main")).toHaveAttribute("id", "portal-main");
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:34:    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:36:    expect(
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:37:      screen.getByLabelText(DEFAULT_TENANT.name),
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:40:    expect(
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:41:      screen.getByRole("link", {
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:13:describe("portal resource errors", () => {
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:31:      expect(result).toMatchObject({
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:38:  it("identifica somente 401 e 403 como perda de acesso", () => {
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:39:    expect(
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:44:    ).toBe(true);
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:45:    expect(
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:50:    ).toBe(true);
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:51:    expect(
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:56:    ).toBe(false);
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:57:    expect(
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:62:    ).toBe(404);
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:65:  it("nao replica payload bruto ou PII na mensagem", () => {
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:77:    expect(result.message).not.toContain("cliente-secreto");
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:78:    expect(result.message).not.toContain("83999999999");
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:13:describe("portal navigation utilities", () => {
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:14:  it("accepts only routes inside the Portal namespace", () => {
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:15:    expect(isSafePortalHref("/portal")).toBe(true);
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:16:    expect(isSafePortalHref("/portal/historico")).toBe(true);
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:17:    expect(isSafePortalHref("/admin")).toBe(false);
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:18:    expect(isSafePortalHref("https://externo.example")).toBe(false);
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:19:    expect(isSafePortalHref("//externo.example")).toBe(false);
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:22:  it("exposes exactly the approved Portal routes", () => {
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:23:    expect(portalNavigationItems).toEqual([
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:28:    expect(portalNavigationItems.every((item) => isSafePortalHref(item.href))).toBe(true);
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:29:    expect(portalNavigationItems.some((item) => item.href === "/admin")).toBe(false);
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:32:  it("calculates the active route without false positives", () => {
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:33:    expect(isPortalNavigationItemActive("/portal", "/portal")).toBe(true);
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:34:    expect(isPortalNavigationItemActive("/portal", "/portal/historico"))
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:35:      .toBe(false);
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:36:    expect(
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:41:    ).toBe(true);
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:26:  return render(
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:41:describe("Portal authentication UX", () => {
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:42:  it("renders the anonymous OTP experience with the official asset", () => {
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:45:    expect(
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:46:      screen.getByRole("heading", {
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:49:    ).toBeInTheDocument();
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:51:    expect(
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:52:      screen.getByText(
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:55:    ).toBeInTheDocument();
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:57:    expect(screen.getByLabelText("Telefone com DDD")).toHaveAttribute(
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:68:    expect(surface).toHaveAttribute(
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:72:    expect(surface).toHaveClass("w-full");
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:73:    expect(surface).toHaveClass("max-w-6xl");
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:74:    expect(surface).toHaveClass("pb-[calc(1rem+env(safe-area-inset-bottom))]");
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:78:    expect(image).not.toBeNull();
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:79:    expect(imageSourceFrom(image)).toContain(
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:84:  it("renders tenant-aware copy while preserving the real fallback provider", () => {
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:97:    expect(screen.getByLabelText("Studio Aurora")).toBeInTheDocument();
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:98:    expect(
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:99:      screen.getByText("Acesso seguro ├á ├írea de Studio Aurora."),
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:100:    ).toBeInTheDocument();
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:103:  it("uses accessible official states for restoring and denied access", () => {
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:109:    expect(screen.getByRole("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:124:    expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:127:    expect(deniedState).toHaveAttribute(
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:134:    expect(deniedImage).not.toBeNull();
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:135:    expect(imageSourceFrom(deniedImage)).toContain(
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:3:  fireEvent,
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:6:  waitFor,
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:57:    ...render(
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:93:describe("PortalAuthenticatedSurface", () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:94:  it("exposes only the neutral authenticated Portal surface", () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:97:    expect(
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:98:      screen.getByRole("heading", { name: "Acesso autenticado" }),
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:99:    ).toBeInTheDocument();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:100:    expect(screen.getByText("Portal protegido")).toBeInTheDocument();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:101:    expect(screen.queryByText("dashboard real")).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:104:  it("logs out the current client session and cleans private state", async () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:111:    fireEvent.click(screen.getByRole("button", { name: "Sair" }));
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:113:    await waitFor(() => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:114:      expect(api.logout).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:115:      expect(navigation.replace).toHaveBeenCalledWith("/portal");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:116:      expect(screen.getByTestId("auth-status")).toHaveTextContent("anonymous");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:119:    expect(
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:121:    ).toBeUndefined();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:122:    expect(api.logoutAll).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:125:  it("logs out all client sessions and cleans private state", async () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:132:    fireEvent.click(
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:133:      screen.getByRole("button", { name: "Encerrar todas as sess├Áes" }),
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:136:    await waitFor(() => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:137:      expect(api.logoutAll).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:138:      expect(navigation.replace).toHaveBeenCalledWith("/portal");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:139:      expect(screen.getByTestId("auth-status")).toHaveTextContent("anonymous");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:142:    expect(
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:144:    ).toBeUndefined();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:145:    expect(api.logout).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:148:  it("protects logout actions against double submit", async () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:158:    const button = screen.getByRole("button", { name: "Sair" });
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:160:    fireEvent.click(button);
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:161:    fireEvent.click(button);
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:163:    expect(api.logout).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:164:    expect(button).toBeDisabled();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:168:    await waitFor(() => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:169:      expect(navigation.replace).toHaveBeenCalledWith("/portal");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:173:  it("cleans the local session even when the server logout fails", async () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:182:    fireEvent.click(screen.getByRole("button", { name: "Sair" }));
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:184:    await waitFor(() => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:185:      expect(screen.getByTestId("auth-status")).toHaveTextContent("anonymous");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:186:      expect(navigation.replace).toHaveBeenCalledWith("/portal");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:187:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:192:    expect(
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:194:    ).toBeUndefined();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:195:    expect(screen.getByRole("alert")).not.toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:1:import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:13:  return render(
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:20:describe("PortalFirstAccessExperience", () => {
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:21:  it("uses the official asset and does not expose a complete profile form", () => {
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:24:    expect(
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:25:      screen.getByRole("img", { name: "Ilustra├º├úo do primeiro acesso" }),
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:26:    ).toBeInTheDocument();
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:27:    expect(screen.getByRole("checkbox")).toBeInTheDocument();
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:28:    expect(
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:29:      screen.getByRole("button", { name: "Concluir primeiro acesso" }),
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:30:    ).toBeInTheDocument();
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:31:    expect(screen.queryByLabelText(/nome completo/i)).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:32:    expect(screen.queryByLabelText(/data de nascimento/i)).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:35:  it("requires the real mandatory acceptance before submitting", () => {
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:40:    fireEvent.click(
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:41:      screen.getByRole("button", { name: "Concluir primeiro acesso" }),
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:44:    expect(onComplete).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:45:    expect(
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:46:      screen.getByRole("alert"),
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:50:  it("protects the operation against double submit and shows success", async () => {
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:59:    fireEvent.click(screen.getByRole("checkbox"));
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:60:    const button = screen.getByRole("button", {
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:64:    fireEvent.click(button);
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:65:    fireEvent.click(button);
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:67:    expect(onComplete).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:68:    expect(button).toBeDisabled();
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:72:    await waitFor(() => {
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:73:      expect(
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:74:        screen.getByRole("status"),
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:79:  it("exposes a safe error without leaking the backend response", async () => {
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:85:    fireEvent.click(screen.getByRole("checkbox"));
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:86:    fireEvent.click(
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:87:      screen.getByRole("button", { name: "Concluir primeiro acesso" }),
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:90:    await waitFor(() => {
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:91:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:95:    expect(screen.getByRole("alert")).not.toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:5:  waitFor,
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:81:describe("PortalFirstAccessPage", () => {
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:82:  it("keeps the required first-access route for a first-access client", async () => {
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:85:    render(
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:91:    await waitFor(() => {
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:92:      expect(
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:93:        screen.getByRole("heading", {
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:96:      ).toBeInTheDocument();
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:99:    expect(navigation.replace).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:102:  it("returns a normal client to a safe Portal destination", async () => {
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:106:    render(
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:112:    await waitFor(() => {
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:113:      expect(navigation.replace).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:119:  it("sends an anonymous client back to the Portal entry", async () => {
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:125:    render(
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:131:    await waitFor(() => {
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:132:      expect(navigation.replace).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:137:    expect(meMock).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:140:  it("shows a safe error when the profile cannot be loaded", async () => {
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:143:    render(
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:149:    await waitFor(() => {
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:150:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:1:import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:13:  return render(
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:20:describe("PortalTermsConsent", () => {
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:21:  it("renders the official terms asset and the mandatory acceptance", () => {
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:24:    const image = screen.getByRole("img", {
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:28:    expect(decodeURIComponent(image.getAttribute("src") ?? "")).toContain(
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:31:    expect(
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:32:      screen.getByRole("heading", {
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:35:    ).toBeInTheDocument();
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:36:    expect(screen.getByRole("checkbox")).toBeRequired();
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:37:    expect(screen.getByRole("button", { name: "Aceitar e continuar" })).toBeInTheDocument();
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:40:  it("does not call the operation without explicit acceptance", () => {
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:45:    fireEvent.click(screen.getByRole("button", { name: "Aceitar e continuar" }));
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:47:    expect(onAccept).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:48:    expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:53:  it("persists acceptance once and exposes success feedback", async () => {
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:62:    fireEvent.click(screen.getByRole("checkbox"));
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:64:    const button = screen.getByRole("button", {
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:68:    fireEvent.click(button);
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:69:    fireEvent.click(button);
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:71:    expect(onAccept).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:72:    expect(button).toBeDisabled();
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:76:    await waitFor(() => {
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:77:      expect(screen.getByRole("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:83:  it("shows a safe error without exposing the backend response", async () => {
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:89:    fireEvent.click(screen.getByRole("checkbox"));
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:90:    fireEvent.click(
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:91:      screen.getByRole("button", { name: "Aceitar e continuar" }),
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:94:    await waitFor(() => {
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:95:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:100:    expect(screen.getByRole("alert")).not.toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:30:  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:5:  waitFor,
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:72:describe("Portal foundation integrations", () => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:73:  it("composes the real route with PortalAuthProvider, PortalShell and Tenant", () => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:74:    render(
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:82:    expect(screen.getByRole("banner")).toBeInTheDocument();
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:83:    expect(screen.getByRole("main")).toBeInTheDocument();
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:84:    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:86:    expect(
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:87:      screen.getByRole("heading", {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:90:    ).toBeInTheDocument();
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:92:    expect(screen.getByLabelText("Beauty Core")).toBeInTheDocument();
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:95:  it("connects authenticated client state to private query gating and boundaries", () => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:96:    render(
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:108:    expect(screen.getByTestId("auth-query-state")).toHaveTextContent(
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:112:    expect(
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:113:      screen.getByText("conteudo privado autorizado"),
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:114:    ).toBeInTheDocument();
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:116:    expect(
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:117:      screen.queryByText("superficie anonima"),
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:118:    ).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:121:  it("connects an API access rejection to auth cleanup and cache removal", async () => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:129:    render(
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:143:    await waitFor(() => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:144:      expect(screen.getByTestId("auth-query-state")).toHaveTextContent(
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:149:    expect(queryClient.getQueryData(privateKey)).toBeUndefined();
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:152:  it("connects Portal states to approved runtime assets", () => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:153:    render(
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:161:    const image = screen.getByAltText("Ilustracao de sucesso");
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:164:    expect(source).toContain(portalAssets.states.success.src);
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:167:  it("keeps returnTo inside the Portal namespace", () => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:168:    expect(
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:170:    ).toBe("/portal/historico");
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:172:    expect(
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:174:    ).toBe("/portal");
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:177:  it("does not expose private content during the anonymous route foundation", () => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:178:    render(
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:195:    expect(screen.getByText("acesso do cliente futuro")).toBeInTheDocument();
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:196:    expect(
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:197:      screen.queryByText("dados privados do cliente"),
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:198:    ).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:201:  it("preserves the low-level 401 and 403 transition contract", () => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:205:    expect(
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:209:    ).toBe(true);
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:211:    expect(
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:215:    ).toBe(true);
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:217:    expect(transitions).toEqual(["anonymous", "denied"]);
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:220:  it("keeps the empty state available for future resource integrations", () => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:221:    render(
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:228:    expect(
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:229:      screen.getByRole("heading", { name: "Lista vazia" }),
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:230:    ).toBeInTheDocument();
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:232:    expect(
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:233:      screen.getByRole("heading", { name: "Lista vazia" })
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:11:describe("portalClientQueryKeys", () => {
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:12:  it("usa somente o namespace privado da foundation", () => {
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:13:    expect(portalClientQueryKeys.all()).toEqual([
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:17:    expect(portalClientQueryKeys.dashboard()).toEqual([
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:22:    expect(portalClientQueryKeys.profile()).toEqual([
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:27:    expect(portalClientQueryKeys.history()).toEqual([
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:34:  it("nao inclui identidade ou tenant arbitrario nas keys", () => {
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:41:    expect(serialized).not.toContain("clienteId");
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:42:    expect(serialized).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:43:    expect(serialized).not.toContain("sid");
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:46:  it("mantem recursos separados para invalidacao focalizada", () => {
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:47:    expect(
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:49:    ).not.toEqual(portalClientQueryKeys.profile());
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:50:    expect(
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:52:    ).not.toEqual(portalClientQueryKeys.history());
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:33:describe("portal dashboard data mapping", () => {
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:34:  it("projects only the safe dashboard view model", () => {
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:37:    expect(result).toEqual({
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:54:    expect(JSON.stringify(result)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:55:    expect(JSON.stringify(result)).not.toContain("preco");
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:56:    expect(JSON.stringify(result)).not.toContain("observacoes");
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:59:  it("classifica dashboard sem atendimentos como vazio", () => {
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:68:    expect(isPortalDashboardEmpty(empty)).toBe(true);
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:69:    expect(isPortalDashboardEmpty(mapPortalDashboardToViewModel(dashboard))).toBe(false);
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:8:describe("portalDashboardQueryOptions", () => {
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:9:  it("mantem o dashboard privado e desabilitado sem autenticacao", () => {
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:12:    expect(options.queryKey).toEqual([
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:17:    expect(options.enabled).toBe(false);
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:18:    expect(options.retry).toBe(false);
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:19:    expect(options.refetchOnWindowFocus).toBe(false);
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:20:    expect(options.staleTime).toBe(PORTAL_DASHBOARD_STALE_TIME);
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:21:    expect(JSON.stringify(options.queryKey)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:24:  it("habilita uma unica query privada para o cliente autenticado", () => {
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:27:    expect(options.enabled).toBe(true);
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:28:    expect(options.queryKey).toEqual([
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:36:describe("usePortalQueryGate", () => {
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:37:  it("blocks private queries until the client is authenticated", () => {
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:43:    render(
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:49:    expect(screen.getByTestId("query-gate")).toHaveTextContent(
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:55:    render(
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:66:    expect(screen.getByTestId("query-gate")).toHaveTextContent(
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:71:  it("allows public queries after the auth surface settles", () => {
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:72:    render(
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:80:    expect(screen.getByTestId("query-gate")).toHaveTextContent(
beauty-core-ui/src/features/portal/query/portal-query.test.ts:13:describe("Portal query foundation", () => {
beauty-core-ui/src/features/portal/query/portal-query.test.ts:14:  it("creates stable public and private namespaces without tenant selection", () => {
beauty-core-ui/src/features/portal/query/portal-query.test.ts:18:    expect(publicKey).toEqual(["portal", "public", "tenant"]);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:19:    expect(privateKey).toEqual([
beauty-core-ui/src/features/portal/query/portal-query.test.ts:25:    expect(JSON.stringify(publicKey)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:26:    expect(JSON.stringify(privateKey)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:29:  it("gates private queries exclusively for authenticated clients", () => {
beauty-core-ui/src/features/portal/query/portal-query.test.ts:30:    expect(portalQueryEnabled("unknown", true)).toBe(false);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:31:    expect(portalQueryEnabled("restoring", true)).toBe(false);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:32:    expect(portalQueryEnabled("anonymous", true)).toBe(false);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:33:    expect(portalQueryEnabled("denied", true)).toBe(false);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:34:    expect(portalQueryEnabled("authenticated", true)).toBe(true);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:37:  it("keeps public queries available only after restoration settles", () => {
beauty-core-ui/src/features/portal/query/portal-query.test.ts:38:    expect(portalQueryEnabled("unknown", false)).toBe(false);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:39:    expect(portalQueryEnabled("restoring", false)).toBe(false);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:40:    expect(portalQueryEnabled("anonymous", false)).toBe(true);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:41:    expect(portalQueryEnabled("authenticated", false)).toBe(true);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:42:    expect(portalQueryEnabled("denied", false)).toBe(true);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:45:  it("cleans private cache while preserving public cache", () => {
beauty-core-ui/src/features/portal/query/portal-query.test.ts:55:    expect(queryClient.getQueryData(privateKey)).toBeUndefined();
beauty-core-ui/src/features/portal/query/portal-query.test.ts:56:    expect(queryClient.getQueryData(publicKey)).toEqual({ public: true });
beauty-core-ui/src/features/portal/query/portal-query.test.ts:59:  it("maps 401 and 403 to safe auth transitions", () => {
beauty-core-ui/src/features/portal/query/portal-query.test.ts:60:    expect(portalAccessTransitionFromStatus(401)).toBe("anonymous");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:61:    expect(portalAccessTransitionFromStatus(403)).toBe("denied");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:62:    expect(portalAccessTransitionFromStatus(500)).toBeNull();
beauty-core-ui/src/features/portal/query/portal-query.test.ts:65:  it("cleans private cache when access is rejected", () => {
beauty-core-ui/src/features/portal/query/portal-query.test.ts:78:    expect(handled).toBe(true);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:79:    expect(transitions).toEqual(["anonymous"]);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:80:    expect(queryClient.getQueryData(privateKey)).toBeUndefined();
beauty-core-ui/src/features/portal/query/portal-query.test.ts:83:  it("does not intercept unrelated server errors", () => {
beauty-core-ui/src/features/portal/query/portal-query.test.ts:87:    expect(
beauty-core-ui/src/features/portal/query/portal-query.test.ts:89:    ).toBe(false);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:91:    expect(onTransition).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:8:describe("Portal safe returnTo", () => {
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:9:  it("accepts only internal Portal paths", () => {
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:10:    expect(isSafePortalReturnTo("/portal")).toBe(true);
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:11:    expect(isSafePortalReturnTo("/portal/historico")).toBe(true);
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:12:    expect(isSafePortalReturnTo("/portal/perfil")).toBe(true);
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:15:  it("rejects external, administrative and protocol-based destinations", () => {
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:28:      expect(isSafePortalReturnTo(value)).toBe(false);
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:29:      expect(sanitizePortalReturnTo(value)).toBe("/portal");
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:33:  it("rejects query strings, fragments and encoded traversal", () => {
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:34:    expect(
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:36:    ).toBe("/portal");
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:38:    expect(
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:40:    ).toBe("/portal");
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:42:    expect(
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:44:    ).toBe("/portal");
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:47:  it("supports a safe internal fallback", () => {
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:48:    expect(
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:50:    ).toBe("/portal/historico");
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:52:    expect(
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:54:    ).toBe("/portal");
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:57:  it("does not expose arbitrary values in the result", () => {
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:63:    expect(result).toBe("/portal");
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:64:    expect(result).not.toContain("evil.example");
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:65:    expect(result).not.toContain("secret");
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:66:    expect(result).not.toContain("clienteId");
beauty-core-ui/src/features/portal/security/portal-safe-return-to.ts:5:function resolveSafePortalPath(
beauty-core-ui/src/features/portal/security/portal-safe-return-to.ts:17:    CONTROL_CHARACTERS.test(candidate) ||
beauty-core-ui/src/features/portal/security/portal-safe-return-to.ts:18:    /\s/.test(candidate) ||
beauty-core-ui/src/features/portal/security/portal-safe-return-to.ts:25:    /^[a-z][a-z\d+.-]*:/i.test(candidate)
beauty-core-ui/src/features/portal/security/portal-safe-return-to.ts:60:  return resolveSafePortalPath(value) !== null;
beauty-core-ui/src/features/portal/security/portal-safe-return-to.ts:68:    resolveSafePortalPath(value) ??
beauty-core-ui/src/features/portal/security/portal-safe-return-to.ts:69:    resolveSafePortalPath(fallback) ??
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:83:describe("portalClientApi", () => {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:88:  it("consulta perfil pela rota canonica e retorna somente a allowlist publica", async () => {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:95:    expect(mocks.apiClient.get).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:98:    expect(result).toEqual({
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:105:    expect(JSON.stringify(result)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:106:    expect(JSON.stringify(result)).not.toContain("ultimoAcessoPortal");
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:109:  it("consulta dashboard sem query e remove subobjetos fora da allowlist", async () => {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:134:    expect(mocks.apiClient.get).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:137:    expect(result).toEqual({
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:160:    expect(JSON.stringify(result)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:161:    expect(JSON.stringify(result)).not.toContain("preco");
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:164:  it("consulta historico sem query e descarta dados crus e descricao interna", async () => {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:193:    expect(mocks.apiClient.get).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:196:    expect(result).toEqual([
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:210:    expect(JSON.stringify(result)).not.toContain("cliente-secreto");
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:211:    expect(JSON.stringify(result)).not.toContain("mensagem privada");
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:214:  it("atualiza apenas campos permitidos e normaliza o email", async () => {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:224:    expect(mocks.apiClient.patch).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:231:    expect(
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:233:    ).not.toContain("foto");
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:234:    expect(
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:236:    ).not.toContain("empresaId");
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:239:  it("recusa payload vazio e campos nao pertencentes ao DTO", async () => {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:240:    await expect(
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:242:    ).rejects.toThrow();
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:244:    await expect(
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:248:    ).rejects.toThrow();
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:250:    expect(mocks.apiClient.patch).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:253:  it("falha com resposta de perfil que nao atende ao contrato", async () => {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:260:    await expect(
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:262:    ).rejects.toThrow();
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:3:  fireEvent,
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:22:describe("Portal transversal state views", () => {
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:23:  it("renders all approved transversal states with semantic content", () => {
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:24:    render(
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:58:    expect(
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:59:      screen.getByRole("heading", { name: "Carregando conteudo" }),
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:60:    ).toBeInTheDocument();
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:62:    expect(
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:63:      screen.getByRole("heading", { name: "Nenhum item encontrado" }),
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:64:    ).toBeInTheDocument();
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:66:    expect(
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:67:      screen.getByRole("heading", { name: "Nao foi possivel carregar" }),
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:68:    ).toBeInTheDocument();
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:70:    expect(
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:71:      screen.getByRole("heading", { name: "Conexao indisponivel" }),
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:72:    ).toBeInTheDocument();
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:74:    expect(
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:75:      screen.getByRole("heading", { name: "Operacao concluida" }),
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:76:    ).toBeInTheDocument();
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:78:    expect(
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:79:      screen.getByRole("heading", { name: "Acesso indisponivel" }),
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:80:    ).toBeInTheDocument();
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:82:    expect(
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:87:  it("supports an optional accessible action", () => {
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:90:    render(
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:101:    fireEvent.click(
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:102:      screen.getByRole("button", { name: "Tentar novamente" }),
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:105:    expect(onAction).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:108:  it("uses an empty alternative when the illustration is decorative", () => {
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:109:    const { container } = render(
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:116:    expect(container.querySelector("img")).toHaveAttribute("alt", "");
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:119:  it("supports a meaningful alternative when supplied", () => {
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:120:    render(
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:128:    expect(
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:129:      screen.getByAltText("Ilustracao de sucesso"),
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:130:    ).toBeInTheDocument();
``

## 5. Scripts de qualidade

- `build: next build`
- `lint: eslint --max-warnings=0`
- `test: vitest run`
- `test:watch: vitest`
- `test:coverage: vitest run --coverage`
- `test:e2e: playwright test`
- `test:e2e:ui: playwright test --ui`
- `typecheck: tsc --noEmit`
- `validate: npm run test:coverage && npm run lint && npm run typecheck && npm run build && npm run test:e2e && npm audit`

## 6. Domínios já representados em testes

Quantidade de ocorrências: 3882

``text
beauty-core-backend/src/modules/clientes-pacotes/clientes-pacotes.controller.spec.ts:2:import { ClientesPacotesController } from './clientes-pacotes.controller';
beauty-core-backend/src/modules/clientes-pacotes/clientes-pacotes.controller.spec.ts:4:describe('ClientesPacotesController', () => {
beauty-core-backend/src/modules/clientes-pacotes/clientes-pacotes.controller.spec.ts:5:  let controller: ClientesPacotesController;
beauty-core-backend/src/modules/clientes-pacotes/clientes-pacotes.controller.spec.ts:9:      controllers: [ClientesPacotesController],
beauty-core-backend/src/modules/clientes-pacotes/clientes-pacotes.controller.spec.ts:12:    controller = module.get<ClientesPacotesController>(ClientesPacotesController);
beauty-core-backend/src/modules/clientes-pacotes/clientes-pacotes.service.spec.ts:2:import { ClientesPacotesService } from './clientes-pacotes.service';
beauty-core-backend/src/modules/clientes-pacotes/clientes-pacotes.service.spec.ts:4:describe('ClientesPacotesService', () => {
beauty-core-backend/src/modules/clientes-pacotes/clientes-pacotes.service.spec.ts:5:  let service: ClientesPacotesService;
beauty-core-backend/src/modules/clientes-pacotes/clientes-pacotes.service.spec.ts:9:      providers: [ClientesPacotesService],
beauty-core-backend/src/modules/clientes-pacotes/clientes-pacotes.service.spec.ts:12:    service = module.get<ClientesPacotesService>(ClientesPacotesService);
beauty-core-backend/src/modules/fidelidade/fidelidade.controller.spec.ts:2:import { FidelidadeController } from './fidelidade.controller';
beauty-core-backend/src/modules/fidelidade/fidelidade.controller.spec.ts:4:describe('FidelidadeController', () => {
beauty-core-backend/src/modules/fidelidade/fidelidade.controller.spec.ts:5:  let controller: FidelidadeController;
beauty-core-backend/src/modules/fidelidade/fidelidade.controller.spec.ts:9:      controllers: [FidelidadeController],
beauty-core-backend/src/modules/fidelidade/fidelidade.controller.spec.ts:12:    controller = module.get<FidelidadeController>(FidelidadeController);
beauty-core-backend/src/modules/niveis-fidelidade/niveis-fidelidade.controller.spec.ts:2:import { NiveisFidelidadeController } from './niveis-fidelidade.controller';
beauty-core-backend/src/modules/niveis-fidelidade/niveis-fidelidade.controller.spec.ts:4:describe('NiveisFidelidadeController', () => {
beauty-core-backend/src/modules/niveis-fidelidade/niveis-fidelidade.controller.spec.ts:5:  let controller: NiveisFidelidadeController;
beauty-core-backend/src/modules/niveis-fidelidade/niveis-fidelidade.controller.spec.ts:9:      controllers: [NiveisFidelidadeController],
beauty-core-backend/src/modules/niveis-fidelidade/niveis-fidelidade.controller.spec.ts:12:    controller = module.get<NiveisFidelidadeController>(NiveisFidelidadeController);
beauty-core-backend/src/modules/niveis-fidelidade/niveis-fidelidade.service.spec.ts:2:import { NiveisFidelidadeService } from './niveis-fidelidade.service';
beauty-core-backend/src/modules/niveis-fidelidade/niveis-fidelidade.service.spec.ts:4:describe('NiveisFidelidadeService', () => {
beauty-core-backend/src/modules/niveis-fidelidade/niveis-fidelidade.service.spec.ts:5:  let service: NiveisFidelidadeService;
beauty-core-backend/src/modules/niveis-fidelidade/niveis-fidelidade.service.spec.ts:9:      providers: [NiveisFidelidadeService],
beauty-core-backend/src/modules/niveis-fidelidade/niveis-fidelidade.service.spec.ts:12:    service = module.get<NiveisFidelidadeService>(NiveisFidelidadeService);
beauty-core-backend/src/modules/pacotes/pacotes.controller.spec.ts:2:import { PacotesController } from './pacotes.controller';
beauty-core-backend/src/modules/pacotes/pacotes.controller.spec.ts:4:describe('PacotesController', () => {
beauty-core-backend/src/modules/pacotes/pacotes.controller.spec.ts:5:  let controller: PacotesController;
beauty-core-backend/src/modules/pacotes/pacotes.controller.spec.ts:9:      controllers: [PacotesController],
beauty-core-backend/src/modules/pacotes/pacotes.controller.spec.ts:12:    controller = module.get<PacotesController>(PacotesController);
beauty-core-backend/src/modules/pacotes/pacotes.service.spec.ts:2:import { PacotesService } from './pacotes.service';
beauty-core-backend/src/modules/pacotes/pacotes.service.spec.ts:4:describe('PacotesService', () => {
beauty-core-backend/src/modules/pacotes/pacotes.service.spec.ts:5:  let service: PacotesService;
beauty-core-backend/src/modules/pacotes/pacotes.service.spec.ts:9:      providers: [PacotesService],
beauty-core-backend/src/modules/pacotes/pacotes.service.spec.ts:12:    service = module.get<PacotesService>(PacotesService);
beauty-core-backend/test/unit/agendamentos-options.spec.ts:1:import { AgendamentosService } from '../../src/modules/agendamentos/agendamentos.service';
beauty-core-backend/test/unit/agendamentos-options.spec.ts:3:describe('AgendamentosService - opcoes seguras da agenda', () => {
beauty-core-backend/test/unit/agendamentos-options.spec.ts:6:      AgendamentosService.prototype,
beauty-core-backend/test/unit/agendamentos-options.spec.ts:7:    ) as AgendamentosService;
beauty-core-backend/test/unit/agendamentos-query.dto.spec.ts:1:import { StatusAgendamento } from '@prisma/client';
beauty-core-backend/test/unit/agendamentos-query.dto.spec.ts:4:import { ListAgendamentosQueryDto } from '../../src/modules/agendamentos/dto/list-agendamentos-query.dto';
beauty-core-backend/test/unit/agendamentos-query.dto.spec.ts:6:describe('ListAgendamentosQueryDto', () => {
beauty-core-backend/test/unit/agendamentos-query.dto.spec.ts:10:    const dto = Object.assign(new ListAgendamentosQueryDto(), {
beauty-core-backend/test/unit/agendamentos-query.dto.spec.ts:13:      status: StatusAgendamento.CONFIRMADO,
beauty-core-backend/test/unit/agendamentos-query.dto.spec.ts:26:    const dto = Object.assign(new ListAgendamentosQueryDto(), {
beauty-core-backend/test/unit/agendamentos-query.dto.spec.ts:27:      status: 'AGENDADO',
beauty-core-backend/test/unit/agendamentos-query.dto.spec.ts:36:    const dto = Object.assign(new ListAgendamentosQueryDto(), {
beauty-core-backend/test/unit/agendamentos-query.dto.spec.ts:46:    const dto = Object.assign(new ListAgendamentosQueryDto(), {
beauty-core-backend/test/unit/analytics-performance-limits.spec.ts:22:      clientePacote: {
beauty-core-backend/test/unit/analytics-performance-limits.spec.ts:26:      fidelidade: {
beauty-core-backend/test/unit/analytics-performance-limits.spec.ts:31:            saldoPontos: 0,
beauty-core-backend/test/unit/analytics-performance-limits.spec.ts:72:  it('deve aplicar ANALYTICS_SCAN_LIMIT em analytics de pacotes', async () => {
beauty-core-backend/test/unit/analytics-performance-limits.spec.ts:73:    await service.pacotes('empresa-1');
beauty-core-backend/test/unit/analytics-performance-limits.spec.ts:75:    expect(prisma.clientePacote.findMany).toHaveBeenCalledWith(
beauty-core-backend/test/unit/analytics-performance-limits.spec.ts:82:  it('deve aplicar ANALYTICS_TOP_LIMIT em ranking de fidelidade', async () => {
beauty-core-backend/test/unit/analytics-performance-limits.spec.ts:83:    await service.fidelidade('empresa-1');
beauty-core-backend/test/unit/analytics-performance-limits.spec.ts:85:    expect(prisma.fidelidade.findMany).toHaveBeenCalledWith(
beauty-core-backend/test/unit/chat36-backup.coverage.spec.ts:102:  it('deve delegar execucoes agendadas para os metodos principais', () => {
beauty-core-backend/test/unit/chat36-backup.coverage.spec.ts:103:    expect(JSON.stringify(service.executarBackupPostgresAgendado())).toContain('backup_postgres_diario');
beauty-core-backend/test/unit/chat36-backup.coverage.spec.ts:104:    expect(JSON.stringify(service.executarBackupUploadsAgendado())).toContain('backup_uploads_diario');
beauty-core-backend/test/unit/chat36-backup.coverage.spec.ts:105:    expect(JSON.stringify(service.executarBackupCompletoAgendado())).toContain('backup_semanal_completo');
beauty-core-backend/test/unit/chat36-lgpd.coverage.spec.ts:34:      agendamento: {
beauty-core-backend/test/unit/chat36-lgpd.coverage.spec.ts:35:        findMany: jest.fn().mockResolvedValue([{ id: 'agendamento-1' }]),
beauty-core-backend/test/unit/chat36-lgpd.coverage.spec.ts:43:      fidelidade: {
beauty-core-backend/test/unit/chat36-lgpd.coverage.spec.ts:44:        findMany: jest.fn().mockResolvedValue([{ id: 'fidelidade-1' }]),
beauty-core-backend/test/unit/chat36-lgpd.coverage.spec.ts:46:      clientePacote: {
beauty-core-backend/test/unit/chat36-lgpd.coverage.spec.ts:47:        findMany: jest.fn().mockResolvedValue([{ id: 'cliente-pacote-1' }]),
beauty-core-backend/test/unit/chat36-lgpd.coverage.spec.ts:49:      sessaoPacote: {
beauty-core-backend/test/unit/chat36-lgpd.coverage.spec.ts:50:        findMany: jest.fn().mockResolvedValue([{ id: 'sessao-pacote-1' }]),
beauty-core-backend/test/unit/chat36-lgpd.coverage.spec.ts:110:    expect(result.agendamentos).toHaveLength(1);
beauty-core-backend/test/unit/chat36-lgpd.coverage.spec.ts:113:    expect(result.pontos.fidelidade.fidelidade).toHaveLength(1);
beauty-core-backend/test/unit/chat36-lgpd.coverage.spec.ts:114:    expect(result.pacotes.clientePacotes).toHaveLength(1);
beauty-core-backend/test/unit/chat36-lgpd.coverage.spec.ts:115:    expect(result.pacotes.sessoesPacote).toHaveLength(1);
beauty-core-backend/test/unit/chat36-lgpd.coverage.spec.ts:153:    prisma.agendamento.findMany
beauty-core-backend/test/unit/chat36-lgpd.coverage.spec.ts:155:      .mockResolvedValueOnce([{ id: 'agendamento-fallback' }]);
beauty-core-backend/test/unit/chat36-lgpd.coverage.spec.ts:159:    expect(result.agendamentos).toEqual([{ id: 'agendamento-fallback' }]);
beauty-core-backend/test/unit/chat36-lgpd.coverage.spec.ts:160:    expect(prisma.agendamento.findMany).toHaveBeenCalledTimes(2);
beauty-core-backend/test/unit/coverage-under-70-branch-matrix.generated.spec.ts:67:    pacoteId: UUID_A,
beauty-core-backend/test/unit/coverage-under-70-branch-matrix.generated.spec.ts:69:    agendamentoId: UUID_A,
beauty-core-backend/test/unit/coverage-under-70-branch-matrix.generated.spec.ts:93:    saldoPontos: 100,
beauty-core-backend/test/unit/coverage-under-70-branch-matrix.generated.spec.ts:149:    pacote: {
beauty-core-backend/test/unit/coverage-under-70-branch-matrix.generated.spec.ts:152:      nome: 'Pacote Branch',
beauty-core-backend/test/unit/coverage-under-70-branch-matrix.generated.spec.ts:247:          saldoPontos: mode === 'empty' ? null : 100,
beauty-core-backend/test/unit/coverage-under-70-branch-matrix.generated.spec.ts:483:    'fidelidadeService',
beauty-core-backend/test/unit/coverage-under-70-branch-matrix.generated.spec.ts:547:            tipo: 'LEMBRETE_AGENDAMENTO',
beauty-core-backend/test/unit/coverage-under-70-final-target.generated.spec.ts:59:  '../../src/modules/fidelidade/fidelidade.service',
beauty-core-backend/test/unit/coverage-under-70-final-target.generated.spec.ts:89:    pacoteId: UUID_A,
beauty-core-backend/test/unit/coverage-under-70-final-target.generated.spec.ts:91:    agendamentoId: UUID_A,
beauty-core-backend/test/unit/coverage-under-70-final-target.generated.spec.ts:118:    saldoPontos: mode === 'zero' ? 0 : 100,
beauty-core-backend/test/unit/coverage-under-70-final-target.generated.spec.ts:188:    pacote: {
beauty-core-backend/test/unit/coverage-under-70-final-target.generated.spec.ts:191:      nome: 'Pacote Final',
beauty-core-backend/test/unit/coverage-under-70-final-target.generated.spec.ts:497:    'fidelidadeService',
beauty-core-backend/test/unit/coverage-under-70-final-target.generated.spec.ts:564:            tipo: 'LEMBRETE_AGENDAMENTO',
beauty-core-backend/test/unit/coverage-under-70-targeted.generated.spec.ts:31:    pacoteId: '00000000-0000-4000-8000-000000000001',
beauty-core-backend/test/unit/coverage-under-70-targeted.generated.spec.ts:33:    agendamentoId: '00000000-0000-4000-8000-000000000001',
beauty-core-backend/test/unit/coverage-under-70-targeted.generated.spec.ts:48:    saldoPontos: 100,
beauty-core-backend/test/unit/coverage-under-70-targeted.generated.spec.ts:93:    pacote: {
beauty-core-backend/test/unit/coverage-under-70-targeted.generated.spec.ts:95:      nome: 'Pacote Target',
beauty-core-backend/test/unit/coverage-under-70-targeted.generated.spec.ts:122:      _sum: { valor: 100, pontos: 10, saldoPontos: 100, quantidade: 1 },
beauty-core-backend/test/unit/coverage-under-70-targeted.generated.spec.ts:304:    'fidelidadeService',
beauty-core-backend/test/unit/financeiro-list-movimentacoes-query.dto.spec.ts:16:      agendamentoId: uuid,
beauty-core-backend/test/unit/financeiro-list-movimentacoes-query.dto.spec.ts:33:      agendamentoId: uuid,
beauty-core-backend/test/unit/services-critical.coverage.spec.ts:14:    '[AgendamentosService]',
beauty-core-backend/test/unit/services-critical.coverage.spec.ts:15:    '[ClientesPacotesService]',
beauty-core-backend/test/unit/services-critical.coverage.spec.ts:19:    '[AGENDAMENTOS]',
beauty-core-backend/test/unit/services-critical.coverage.spec.ts:20:    '[CLIENTES_PACOTES]',
beauty-core-backend/test/unit/services-critical.coverage.spec.ts:104:    label: 'AgendamentosService',
beauty-core-backend/test/unit/services-critical.coverage.spec.ts:105:    path: '../../src/modules/agendamentos/agendamentos.service',
beauty-core-backend/test/unit/services-critical.coverage.spec.ts:106:    exportName: 'AgendamentosService',
beauty-core-backend/test/unit/services-critical.coverage.spec.ts:109:    label: 'FidelidadeService',
beauty-core-backend/test/unit/services-critical.coverage.spec.ts:110:    path: '../../src/modules/fidelidade/fidelidade.service',
beauty-core-backend/test/unit/services-critical.coverage.spec.ts:111:    exportName: 'FidelidadeService',
beauty-core-backend/test/unit/services-critical.coverage.spec.ts:129:    label: 'ClientesPacotesService',
beauty-core-backend/test/unit/services-critical.coverage.spec.ts:130:    path: '../../src/modules/clientes-pacotes/clientes-pacotes.service',
beauty-core-backend/test/unit/services-critical.coverage.spec.ts:131:    exportName: 'ClientesPacotesService',
beauty-core-backend/test/unit/services-critical.coverage.spec.ts:169:    pacoteId: UUID_A,
beauty-core-backend/test/unit/services-critical.coverage.spec.ts:409:    pacoteId: UUID_A,
beauty-core-backend/test/unit/tenant-validator.spec.ts:25:      agendamento: {
beauty-core-backend/test/unit/tenant-validator.spec.ts:41:      pacote: {
beauty-core-backend/test/unit/tenant-validator.spec.ts:45:      clientePacote: {
beauty-core-ui/e2e/chat45-design-system.spec.ts:308:        name: "Agendamentos demonstrativos",
beauty-core-ui/e2e/chat48-dashboard.spec.ts:23:  "/analytics/agendamentos",
beauty-core-ui/e2e/chat48-dashboard.spec.ts:28:  "/analytics/fidelidade",
beauty-core-ui/e2e/chat48-dashboard.spec.ts:29:  "/analytics/pacotes",
beauty-core-ui/e2e/chat48-dashboard.spec.ts:194:            "Saldo",
beauty-core-ui/e2e/chat48-dashboard.spec.ts:196:            "Agendamentos",
beauty-core-ui/e2e/chat49-clientes.spec.ts:296:            "Pacote Facial",
beauty-core-ui/e2e/chat51-agenda.spec.ts:7:  AGENDA_E2E_DATE,
beauty-core-ui/e2e/chat51-agenda.spec.ts:8:  AGENDA_E2E_IDS,
beauty-core-ui/e2e/chat51-agenda.spec.ts:10:  installAgendaAuthenticatedRole,
beauty-core-ui/e2e/chat51-agenda.spec.ts:11:  mockAgendaApi,
beauty-core-ui/e2e/chat51-agenda.spec.ts:12:  monitorAgendaRuntime,
beauty-core-ui/e2e/chat51-agenda.spec.ts:13:  type AgendaE2ERole,
beauty-core-ui/e2e/chat51-agenda.spec.ts:14:} from "./fixtures/chat51-agenda.fixture";
beauty-core-ui/e2e/chat51-agenda.spec.ts:21:] as const satisfies readonly AgendaE2ERole[];
beauty-core-ui/e2e/chat51-agenda.spec.ts:25:    typeof monitorAgendaRuntime
beauty-core-ui/e2e/chat51-agenda.spec.ts:38:  "Chat 51 ├óÔé¼ÔÇØ Agenda E2E",
beauty-core-ui/e2e/chat51-agenda.spec.ts:45:        `${role} acessa a Agenda tenant`,
beauty-core-ui/e2e/chat51-agenda.spec.ts:48:            monitorAgendaRuntime(
beauty-core-ui/e2e/chat51-agenda.spec.ts:53:            await mockAgendaApi(
beauty-core-ui/e2e/chat51-agenda.spec.ts:57:          await installAgendaAuthenticatedRole(
beauty-core-ui/e2e/chat51-agenda.spec.ts:63:            `/agenda?view=week&date=${AGENDA_E2E_DATE}`,
beauty-core-ui/e2e/chat51-agenda.spec.ts:68:              "agenda-calendar",
beauty-core-ui/e2e/chat51-agenda.spec.ts:77:                  "Novo agendamento",
beauty-core-ui/e2e/chat51-agenda.spec.ts:85:                "agenda-calendar-event",
beauty-core-ui/e2e/chat51-agenda.spec.ts:88:                "Maria Agenda E2E",
beauty-core-ui/e2e/chat51-agenda.spec.ts:100:                    "/agendamentos",
beauty-core-ui/e2e/chat51-agenda.spec.ts:115:          monitorAgendaRuntime(
beauty-core-ui/e2e/chat51-agenda.spec.ts:120:          await mockAgendaApi(
beauty-core-ui/e2e/chat51-agenda.spec.ts:128:        await installAgendaAuthenticatedRole(
beauty-core-ui/e2e/chat51-agenda.spec.ts:134:          `/agenda?view=list&date=${AGENDA_E2E_DATE}` +
beauty-core-ui/e2e/chat51-agenda.spec.ts:136:          `&clienteId=${AGENDA_E2E_IDS.cliente}`;
beauty-core-ui/e2e/chat51-agenda.spec.ts:142:            "agenda-list",
beauty-core-ui/e2e/chat51-agenda.spec.ts:165:                  "/agendamentos" &&
beauty-core-ui/e2e/chat51-agenda.spec.ts:171:                  AGENDA_E2E_IDS.cliente,
beauty-core-ui/e2e/chat51-agenda.spec.ts:189:          monitorAgendaRuntime(
beauty-core-ui/e2e/chat51-agenda.spec.ts:193:        await mockAgendaApi(
beauty-core-ui/e2e/chat51-agenda.spec.ts:197:        await installAgendaAuthenticatedRole(
beauty-core-ui/e2e/chat51-agenda.spec.ts:203:          `/agenda?view=week&date=${AGENDA_E2E_DATE}`,
beauty-core-ui/e2e/chat51-agenda.spec.ts:208:            "agenda-calendar",
beauty-core-ui/e2e/chat51-agenda.spec.ts:229:            "agenda-list",
beauty-core-ui/e2e/chat51-agenda.spec.ts:243:          monitorAgendaRuntime(
beauty-core-ui/e2e/chat51-agenda.spec.ts:248:          await mockAgendaApi(
beauty-core-ui/e2e/chat51-agenda.spec.ts:256:        await installAgendaAuthenticatedRole(
beauty-core-ui/e2e/chat51-agenda.spec.ts:262:          `/agenda?view=list&date=${AGENDA_E2E_DATE}`,
beauty-core-ui/e2e/chat51-agenda.spec.ts:280:                "Detalhes do agendamento",
beauty-core-ui/e2e/chat51-agenda.spec.ts:288:              "Detalhes do agendamento",
beauty-core-ui/e2e/chat51-agenda.spec.ts:331:                `/agendamentos/${AGENDA_E2E_IDS.agendamento}` &&
beauty-core-ui/e2e/chat51-agenda.spec.ts:366:          monitorAgendaRuntime(
beauty-core-ui/e2e/chat51-agenda.spec.ts:371:          await mockAgendaApi(
beauty-core-ui/e2e/chat51-agenda.spec.ts:379:        await installAgendaAuthenticatedRole(
beauty-core-ui/e2e/chat51-agenda.spec.ts:385:          `/agenda?view=list&date=${AGENDA_E2E_DATE}`,
beauty-core-ui/e2e/chat51-agenda.spec.ts:403:                "Cancelar agendamento",
beauty-core-ui/e2e/chat51-agenda.spec.ts:443:                `/agendamentos/${AGENDA_E2E_IDS.agendamento}/cancelar`,
beauty-core-ui/e2e/chat51-agenda.spec.ts:458:              "Agendamento cancelado.",
beauty-core-ui/e2e/chat51-agenda.spec.ts:469:      "SUPER_ADMIN nao recebe Agenda tenant nem dispara consulta",
beauty-core-ui/e2e/chat51-agenda.spec.ts:472:          await mockAgendaApi(
beauty-core-ui/e2e/chat51-agenda.spec.ts:476:        await installAgendaAuthenticatedRole(
beauty-core-ui/e2e/chat51-agenda.spec.ts:482:          `/agenda?view=week&date=${AGENDA_E2E_DATE}`,
beauty-core-ui/e2e/chat51-agenda.spec.ts:500:                "Agenda",
beauty-core-ui/e2e/chat51-agenda.spec.ts:507:            "agenda-calendar",
beauty-core-ui/e2e/chat51-agenda.spec.ts:516:                "Novo agendamento",
beauty-core-ui/e2e/chat51-agenda.spec.ts:525:                "/agendamentos",
beauty-core-ui/e2e/chat51-agenda.spec.ts:533:      "Agenda nao possui overflow horizontal nas resolucoes alvo",
beauty-core-ui/e2e/chat51-agenda.spec.ts:535:        await mockAgendaApi(
beauty-core-ui/e2e/chat51-agenda.spec.ts:539:        await installAgendaAuthenticatedRole(
beauty-core-ui/e2e/chat51-agenda.spec.ts:580:            `/agenda?view=week&date=${AGENDA_E2E_DATE}`,
beauty-core-ui/e2e/chat51-agenda.spec.ts:585:              "agenda-calendar",
beauty-core-ui/e2e/chat52-financeiro.spec.ts:118:      agendamentoId: CHAT52_IDS.agendamento,
beauty-core-ui/e2e/chat52-financeiro.spec.ts:164:    expect(params.get("agendamentoId")).toBe(CHAT52_IDS.agendamento);
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:10:} from "./fixtures/chat53-fidelidade-pacotes.fixture";
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:73:  "Chat53 ÔÇö Fidelidade + Pacotes E2E",
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:76:      "ADMIN acessa Fidelidade e Pacotes com superf├¡cies administrativas reais",
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:87:          `/fidelidade?clienteId=${CHAT53_IDS.cliente}`,
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:94:                "/configuracao-fidelidade",
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:104:                `/fidelidade/cliente/${CHAT53_IDS.cliente}`,
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:111:          `/pacotes?clienteId=${CHAT53_IDS.cliente}`,
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:118:                "/pacotes",
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:148:          `/fidelidade?clienteId=${CHAT53_IDS.cliente}`,
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:155:                "/configuracao-fidelidade",
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:162:          `/pacotes?clienteId=${CHAT53_IDS.cliente}`,
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:169:                "/pacotes",
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:177:            "Pacote Premium E2E",
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:199:          `/fidelidade?clienteId=${CHAT53_IDS.cliente}`,
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:206:                `/fidelidade/cliente/${CHAT53_IDS.cliente}`,
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:214:            "/configuracao-fidelidade",
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:220:          `/pacotes?clienteId=${CHAT53_IDS.cliente}`,
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:231:            "/pacotes",
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:243:      "PROFISSIONAL possui leitura e consumo operacional sem cat├ílogo ou configura├º├úo",
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:254:          `/fidelidade?clienteId=${CHAT53_IDS.cliente}`,
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:261:                `/fidelidade/historico/${CHAT53_IDS.cliente}`,
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:269:            "/configuracao-fidelidade",
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:275:          `/pacotes?clienteId=${CHAT53_IDS.cliente}`,
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:290:            "/pacotes",
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:302:      "SUPER_ADMIN n├úo dispara APIs tenant de Fidelidade ou Pacotes",
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:313:          "/fidelidade",
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:321:          "/pacotes",
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:339:      "clienteId restaura cliente e preserva navega├º├úo Pacotes para Fidelidade",
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:350:          `/pacotes?clienteId=${CHAT53_IDS.cliente}`,
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:370:                "Abrir fidelidade deste cliente",
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:375:          `/fidelidade?clienteId=${CHAT53_IDS.cliente}`,
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:406:          `/pacotes?clienteId=${CHAT53_IDS.cliente}`,
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:411:            "#clientes-pacotes-status",
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:456:      "consumo confirma 1 sess├úo, usa PATCH dedicado sem body e rel├¬ estado",
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:467:          `/clientes-pacotes/cliente/${CHAT53_IDS.cliente}`;
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:469:        const consumePath =
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:470:          `/clientes-pacotes/${CHAT53_IDS.clientePacote}/usar-sessao`;
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:473:          `/pacotes?clienteId=${CHAT53_IDS.cliente}`,
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:526:                consumePath,
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:532:        const consumeCall =
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:534:            consumePath,
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:539:          consumeCall?.body,
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:556:            .getClientePacote()
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:562:            .getClientePacote()
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:584:          `/clientes-pacotes/cliente/${CHAT53_IDS.cliente}`;
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:587:          `/clientes-pacotes/${CHAT53_IDS.clientePacote}/cancelar`;
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:590:          `/pacotes?clienteId=${CHAT53_IDS.cliente}`,
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:598:                "Cancelar pacote",
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:614:                "Cancelar pacote",
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:673:            .getClientePacote()
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:686:      "Fidelidade l├¬ saldo e hist├│rico autoritativos do cliente",
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:696:        const saldoPath =
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:697:          `/fidelidade/cliente/${CHAT53_IDS.cliente}`;
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:700:          `/fidelidade/historico/${CHAT53_IDS.cliente}`;
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:703:          `/fidelidade?clienteId=${CHAT53_IDS.cliente}`,
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:710:                saldoPath,
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:728:            "B├┤nus de fidelidade E2E",
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:745:      "Fidelidade e Pacotes n├úo apresentam overflow horizontal nas seis viewports oficiais",
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:771:                `/fidelidade?clienteId=${CHAT53_IDS.cliente}`,
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:778:                      `/fidelidade/cliente/${CHAT53_IDS.cliente}`,
beauty-core-ui/e2e/chat53-fidelidade-pacotes.spec.ts:789:                `/pacotes?clienteId=${CHAT53_IDS.cliente}`,
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:49:const FIDELIDADE_ID =
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:58:const CLIENTE_PACOTE_ID =
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:61:const PACOTE_ID =
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:100:export const FIDELIDADE_SALDO_FIXTURE = {
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:101:  id: FIDELIDADE_ID,
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:104:  saldoPontos: 850,
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:111:export const FIDELIDADE_HISTORICO_FIXTURE = [
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:124:export const FIDELIDADE_BENEFICIO_FIXTURE = {
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:126:  saldoPontos: 850,
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:133:export const FIDELIDADE_NIVEL_FIXTURE = {
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:135:  saldoPontos: 850,
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:150:export const CLIENTES_PACOTES_FIXTURE = [
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:152:    id: CLIENTE_PACOTE_ID,
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:155:    pacoteId: PACOTE_ID,
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:168:    pacote: {
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:169:      id: PACOTE_ID,
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:171:      nome: "Pacote Facial",
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:192:  agendamentos: [],
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:194:  pacotes: {},
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:216:  `/fidelidade/cliente/${CLIENTE_ID}`,
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:217:  `/fidelidade/historico/${CLIENTE_ID}`,
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:218:  `/fidelidade/beneficio-disponivel/${CLIENTE_ID}`,
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:219:  `/fidelidade/nivel-atual/${CLIENTE_ID}`,
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:220:  `/clientes-pacotes/cliente/${CLIENTE_ID}`,
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:348:      `/fidelidade/cliente/${CLIENTE_ID}`
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:350:    return FIDELIDADE_SALDO_FIXTURE;
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:355:      `/fidelidade/historico/${CLIENTE_ID}`
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:357:    return FIDELIDADE_HISTORICO_FIXTURE;
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:362:      `/fidelidade/beneficio-disponivel/${CLIENTE_ID}`
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:364:    return FIDELIDADE_BENEFICIO_FIXTURE;
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:369:      `/fidelidade/nivel-atual/${CLIENTE_ID}`
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:371:    return FIDELIDADE_NIVEL_FIXTURE;
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:376:      `/clientes-pacotes/cliente/${CLIENTE_ID}`
beauty-core-ui/e2e/fixtures/chat49-clientes.fixture.ts:378:    return CLIENTES_PACOTES_FIXTURE;
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:5:export type AgendaE2ERole =
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:12:export type AgendaE2EStatus =
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:20:export type AgendaRequestRecord = {
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:30:export type AgendaRuntimeErrors = {
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:35:export const AGENDA_E2E_DATE =
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:38:export const AGENDA_E2E_IDS = {
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:39:  agendamento:
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:56:  role: AgendaE2ERole,
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:72:export async function installAgendaAuthenticatedRole(
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:74:  role: AgendaE2ERole,
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:117:  status: AgendaE2EStatus,
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:121:      AGENDA_E2E_IDS.agendamento,
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:124:      AGENDA_E2E_IDS.cliente,
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:127:      AGENDA_E2E_IDS.profissional,
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:130:      AGENDA_E2E_IDS.servico,
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:133:      AGENDA_E2E_IDS.unidade,
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:142:      "Cliente prefere atendimento no horario agendado.",
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:154:        AGENDA_E2E_IDS.cliente,
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:156:        "Maria Agenda E2E",
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:163:        AGENDA_E2E_IDS.profissional,
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:170:        AGENDA_E2E_IDS.servico,
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:180:        AGENDA_E2E_IDS.unidade,
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:188:  status: AgendaE2EStatus,
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:213:export async function mockAgendaApi(
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:216:    initialStatus?: AgendaE2EStatus;
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:220:    AgendaRequestRecord[] = [];
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:223:    AgendaE2EStatus =
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:228:   * AgendaRelatedSelectors reutiliza os contratos reais
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:316:    "**/agendamentos**",
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:328:          "/agendamentos",
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:367:          "/agendamentos/opcoes/profissionais" &&
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:384:          "/agendamentos/opcoes/unidades" &&
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:401:          "/agendamentos" &&
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:444:          `/agendamentos/${AGENDA_E2E_IDS.agendamento}` &&
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:463:          `/agendamentos/${AGENDA_E2E_IDS.agendamento}` &&
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:469:                status?: AgendaE2EStatus;
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:496:          `/agendamentos/${AGENDA_E2E_IDS.agendamento}/cancelar` &&
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:536:export function monitorAgendaRuntime(
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:538:): AgendaRuntimeErrors {
beauty-core-ui/e2e/fixtures/chat51-agenda.fixture.ts:540:    AgendaRuntimeErrors = {
beauty-core-ui/e2e/fixtures/chat52-financeiro.fixture.ts:30:  agendamento: "55555555-5555-4555-8555-555555555555",
beauty-core-ui/e2e/fixtures/chat52-financeiro.fixture.ts:55:const agendamento = {
beauty-core-ui/e2e/fixtures/chat52-financeiro.fixture.ts:56:  id: CHAT52_IDS.agendamento,
beauty-core-ui/e2e/fixtures/chat52-financeiro.fixture.ts:71:    agendamentoId: CHAT52_IDS.agendamento,
beauty-core-ui/e2e/fixtures/chat52-financeiro.fixture.ts:83:    agendamento,
beauty-core-ui/e2e/fixtures/chat52-financeiro.fixture.ts:108:  agendamentoId: CHAT52_IDS.agendamento,
beauty-core-ui/e2e/fixtures/chat52-financeiro.fixture.ts:116:  agendamento,
beauty-core-ui/e2e/fixtures/chat52-financeiro.fixture.ts:297:        saldo: 750,
beauty-core-ui/e2e/fixtures/chat52-financeiro.fixture.ts:310:        saldo: 750,
beauty-core-ui/e2e/fixtures/chat52-financeiro.fixture.ts:514:      saldo: 0,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:22:  fidelidade:
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:28:  pacote:
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:31:  clientePacote:
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:60:const PACOTE = {
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:61:  id: CHAT53_IDS.pacote,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:63:  nome: "Pacote Premium E2E",
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:65:    "Pacote controlado pelo E2E do Chat53.",
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:74:const PACOTE_RESUMO = {
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:75:  id: PACOTE.id,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:76:  nome: PACOTE.nome,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:77:  descricao: PACOTE.descricao,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:79:    PACOTE.quantidadeSessoes,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:81:    PACOTE.validadeDias,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:82:  ativo: PACOTE.ativo,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:85:const CONFIGURACAO_FIDELIDADE = {
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:89:  fidelidadeAtiva: true,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:113:type ClientePacoteState = {
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:117:  pacoteId: string;
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:130:  pacote: typeof PACOTE_RESUMO;
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:133:function createClientePacoteState():
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:134:  ClientePacoteState {
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:137:      CHAT53_IDS.clientePacote,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:145:    pacoteId:
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:146:      CHAT53_IDS.pacote,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:163:    pacote:
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:164:      PACOTE_RESUMO,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:194:      "/configuracao-fidelidade" ||
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:196:      "/niveis-fidelidade",
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:205:      "/fidelidade",
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:213:      "/pacotes" ||
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:215:      "/pacotes/",
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:218:      "/clientes-pacotes" ||
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:220:      "/clientes-pacotes/",
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:235:  let clientePacoteState =
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:236:    createClientePacoteState();
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:352:          "/configuracao-fidelidade"
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:361:              CONFIGURACAO_FIDELIDADE,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:371:          "/niveis-fidelidade"
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:466:          "/pacotes"
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:475:              PACOTE,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:485:          `/clientes-pacotes/cliente/${CHAT53_IDS.cliente}`
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:494:              clientePacoteState,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:504:          "/clientes-pacotes"
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:513:              clientePacoteState,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:523:          `/clientes-pacotes/${CHAT53_IDS.clientePacote}/usar-sessao`
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:526:          clientePacoteState
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:530:        clientePacoteState = {
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:531:          ...clientePacoteState,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:534:            clientePacoteState
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:557:              clientePacoteState,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:567:          `/clientes-pacotes/${CHAT53_IDS.clientePacote}/cancelar`
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:569:        clientePacoteState = {
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:570:          ...clientePacoteState,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:586:              clientePacoteState,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:596:          `/fidelidade/cliente/${CHAT53_IDS.cliente}`
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:606:                CHAT53_IDS.fidelidade,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:614:              saldoPontos: 120,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:633:          `/fidelidade/historico/${CHAT53_IDS.cliente}`
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:657:                  "B├┤nus de fidelidade E2E",
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:671:          `/fidelidade/beneficio-disponivel/${CHAT53_IDS.cliente}`
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:683:              saldoPontos: 120,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:705:          `/fidelidade/nivel-atual/${CHAT53_IDS.cliente}`
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:717:              saldoPontos: 120,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:730:          "/fidelidade/adicionar-pontos"
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:740:                CHAT53_IDS.fidelidade,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:748:              saldoPontos: 130,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:764:          "/fidelidade/resgatar-pontos"
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:774:                CHAT53_IDS.fidelidade,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:782:              saldoPontos: 110,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:798:          "/fidelidade/pontuar-por-valor"
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:808:              saldoAtual: 130,
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:876:    getClientePacote():
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:877:      ClientePacoteState {
beauty-core-ui/e2e/fixtures/chat53-fidelidade-pacotes.fixture.ts:879:        ...clientePacoteState,
beauty-core-ui/e2e/fixtures/chat54-comunicacoes.fixture.ts:111:    notificarAgendamentos: true,
beauty-core-ui/e2e/fixtures/chat54-comunicacoes.fixture.ts:113:    notificarFidelidade: true,
beauty-core-ui/e2e/fixtures/chat54-comunicacoes.fixture.ts:114:    notificarPacotes: true,
beauty-core-ui/e2e/portal-foundation.spec.ts:137:    "Agendamentos",
beauty-core-ui/e2e/portal-foundation.spec.ts:138:    "Fidelidade",
beauty-core-ui/e2e/portal-foundation.spec.ts:140:    "Pacotes",
beauty-core-ui/src/app/(dashboard)/agenda/page.tsx:4:import { AgendaView } from "@/features/agendamentos/components/agenda-view";
beauty-core-ui/src/app/(dashboard)/agenda/page.tsx:6:export default function AgendaPage() {
beauty-core-ui/src/app/(dashboard)/agenda/page.tsx:15:      <AgendaView />
beauty-core-ui/src/app/(dashboard)/design-system/page.tsx:112:            label="Agenda do dia"
beauty-core-ui/src/app/(dashboard)/fidelidade/page.tsx:5:import { FidelidadeOperacionalView } from "@/features/fidelidade/components/fidelidade-operacional-view";
beauty-core-ui/src/app/(dashboard)/fidelidade/page.tsx:7:export default function FidelidadePage() {
beauty-core-ui/src/app/(dashboard)/fidelidade/page.tsx:11:    <FidelidadeOperacionalView
beauty-core-ui/src/app/(dashboard)/pacotes/page.tsx:1:import { ClientesPacotesView } from "@/features/pacotes/clientes-pacotes/clientes-pacotes-view";
beauty-core-ui/src/app/(dashboard)/pacotes/page.tsx:2:import { PacotesCatalogoView } from "@/features/pacotes/catalogo/pacotes-catalogo-view";
beauty-core-ui/src/app/(dashboard)/pacotes/page.tsx:4:export default function PacotesPage() {
beauty-core-ui/src/app/(dashboard)/pacotes/page.tsx:7:      <PacotesCatalogoView />
beauty-core-ui/src/app/(dashboard)/pacotes/page.tsx:8:      <ClientesPacotesView />
beauty-core-ui/src/components/layout/admin-shell-boundary.tsx:14:  consumePendingAdminIntentionalLogout,
beauty-core-ui/src/components/layout/admin-shell-boundary.tsx:15:  consumePendingAdminLoginReason,
beauty-core-ui/src/components/layout/admin-shell-boundary.tsx:59:      consumePendingAdminIntentionalLogout();
beauty-core-ui/src/components/layout/admin-shell-boundary.tsx:87:      consumePendingAdminLoginReason();
beauty-core-ui/src/components/layout/page-header.test.tsx:41:        title="Agenda"
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:86:      <ResponsiveTableRegion label="Agendamentos demonstrativos">
beauty-core-ui/src/config/admin-navigation.chat53.test.ts:60:  it("libera Fidelidade e Pacotes", () => {
beauty-core-ui/src/config/admin-navigation.chat53.test.ts:63:        "loyalty",
beauty-core-ui/src/config/admin-navigation.chat53.test.ts:69:        "packages",
beauty-core-ui/src/config/admin-navigation.chat53.test.ts:87:        "loyalty",
beauty-core-ui/src/config/admin-navigation.chat53.test.ts:91:        "packages",
beauty-core-ui/src/config/admin-navigation.chat53.test.ts:103:      "loyalty",
beauty-core-ui/src/config/admin-navigation.chat53.test.ts:107:      "packages",
beauty-core-ui/src/config/admin-navigation.test.ts:184:      "loyalty",
beauty-core-ui/src/config/admin-navigation.test.ts:185:      "packages",
beauty-core-ui/src/config/admin-navigation.ts:12:  Package,
beauty-core-ui/src/config/admin-navigation.ts:135:        label: "Agenda",
beauty-core-ui/src/config/admin-navigation.ts:136:        href: "/agenda",
beauty-core-ui/src/config/admin-navigation.ts:186:        id: "loyalty",
beauty-core-ui/src/config/admin-navigation.ts:187:        label: "Fidelidade",
beauty-core-ui/src/config/admin-navigation.ts:188:        href: "/fidelidade",
beauty-core-ui/src/config/admin-navigation.ts:194:        id: "packages",
beauty-core-ui/src/config/admin-navigation.ts:195:        label: "Pacotes",
beauty-core-ui/src/config/admin-navigation.ts:196:        href: "/pacotes",
beauty-core-ui/src/config/admin-navigation.ts:197:        icon: Package,
beauty-core-ui/src/features/agendamentos/agendamentos-cache-hardening.test.ts:23:  "src/features/agendamentos/queries/agendamentos-keys.ts",
beauty-core-ui/src/features/agendamentos/agendamentos-cache-hardening.test.ts:27:  "src/features/agendamentos/queries/agendamentos-query-options.ts",
beauty-core-ui/src/features/agendamentos/agendamentos-cache-hardening.test.ts:31:  "src/features/agendamentos/components/agendamento-create-dialog.tsx",
beauty-core-ui/src/features/agendamentos/agendamentos-cache-hardening.test.ts:35:  "src/features/agendamentos/components/agendamento-detail-dialog.tsx",
beauty-core-ui/src/features/agendamentos/agendamentos-cache-hardening.test.ts:39:  "src/features/agendamentos/components/agendamento-status-actions.tsx",
beauty-core-ui/src/features/agendamentos/agendamentos-cache-hardening.test.ts:42:describe("Agendamentos cache hardening", () => {
beauty-core-ui/src/features/agendamentos/agendamentos-cache-hardening.test.ts:47:      'all: ["agendamentos"]',
beauty-core-ui/src/features/agendamentos/agendamentos-cache-hardening.test.ts:89:  it("create invalida raiz de Agendamentos", () => {
beauty-core-ui/src/features/agendamentos/agendamentos-cache-hardening.test.ts:99:      "agendamentosKeys.all",
beauty-core-ui/src/features/agendamentos/agendamentos-cache-hardening.test.ts:125:      "agendamentosKeys.all",
beauty-core-ui/src/features/agendamentos/agendamentos-cache-hardening.test.ts:151:      "agendamentosKeys.all",
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:8:  agendaViewSchema,
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:9:  agendamentoStatusSchema,
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:10:} from "@/features/agendamentos/schemas/agendamentos-schemas";
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:11:import { agendamentosListParamsSchema } from "@/features/agendamentos/schemas/agendamentos-api.schemas";
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:12:import { buildAgendamentosRequestParams } from "@/features/agendamentos/services/agendamentos-api";
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:14:  AGENDA_VIEWS,
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:15:  AGENDAMENTO_STATUSES,
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:16:} from "@/features/agendamentos/types/agendamentos-types";
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:17:import { getAgendamentoStatusMeta } from "@/features/agendamentos/utils/agendamentos-status";
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:19:  agendamentoCreateFormSchema,
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:20:  EMPTY_AGENDAMENTO_CREATE_FORM_VALUES,
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:21:} from "@/features/agendamentos/forms/agendamento-create-form.schema";
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:22:import { toCreateAgendamentoPayload } from "@/features/agendamentos/forms/agendamento-create-payload";
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:38:describe("Agendamentos contract hardening", () => {
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:41:      AGENDAMENTO_STATUSES,
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:52:      agendamentoStatusSchema.safeParse(
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:53:        "AGENDADO",
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:60:      AGENDA_VIEWS,
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:68:      agendaViewSchema.safeParse(
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:84:      AGENDAMENTO_STATUSES.map(
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:87:            getAgendamentoStatusMeta(
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:108:      AGENDAMENTO_STATUSES.length,
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:114:      agendamentosListParamsSchema.parse(
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:128:      agendamentosListParamsSchema.safeParse({
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:136:      buildAgendamentosRequestParams({
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:183:      agendamentoCreateFormSchema.safeParse(
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:184:        EMPTY_AGENDAMENTO_CREATE_FORM_VALUES,
beauty-core-ui/src/features/agendamentos/agendamentos-contract-hardening.test.ts:191:      toCreateAgendamentoPayload({
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:5:  canCancelAppointment,
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:6:  canChangeAppointmentStatus,
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:7:  canCreateAppointment,
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:8:  canEditAppointment,
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:9:  canRescheduleAppointment,
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:10:} from "@/features/agendamentos/permissions/agendamentos-permissions";
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:11:import { agendamentosKeys } from "@/features/agendamentos/queries/agendamentos-keys";
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:13:  AGENDAMENTO_STATUSES,
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:14:  AGENDA_VIEWS,
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:15:} from "@/features/agendamentos/types/agendamentos-types";
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:18:  getAgendaRange,
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:19:  parseAgendaDateKey,
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:20:  shiftAgendaDate,
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:21:} from "@/features/agendamentos/utils/agendamentos-date";
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:23:  buildAgendaSearchParams,
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:24:  parseAgendaUrlState,
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:25:} from "@/features/agendamentos/utils/agenda-url";
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:26:import { getAgendamentoStatusMeta } from "@/features/agendamentos/utils/agendamentos-status";
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:28:describe("fundacoes de Agendamentos", () => {
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:30:    expect(AGENDAMENTO_STATUSES).toEqual([
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:41:    expect(AGENDA_VIEWS).toEqual([
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:56:      expect(canCreateAppointment(role)).toBe(true);
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:57:      expect(canEditAppointment(role)).toBe(true);
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:58:      expect(canRescheduleAppointment(role)).toBe(true);
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:59:      expect(canCancelAppointment(role)).toBe(true);
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:60:      expect(canChangeAppointmentStatus(role)).toBe(true);
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:68:      getAgendamentoStatusMeta("CONFIRMADO"),
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:75:      getAgendamentoStatusMeta("CANCELADO"),
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:84:      parseAgendaDateKey("2026-08-29"),
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:88:      parseAgendaDateKey("2026-02-31"),
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:92:      parseAgendaDateKey("29/08/2026"),
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:98:      shiftAgendaDate(
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:106:      shiftAgendaDate(
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:115:    const range = getAgendaRange(
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:142:      parseAgendaUrlState(
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:157:      "view=month&date=2026-02-31&status=AGENDADO",
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:161:      parseAgendaUrlState(
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:177:    const params = buildAgendaSearchParams({
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:194:      agendamentosKeys.list({
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:198:      "agendamentos",
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:206:      agendamentosKeys.detail("abc"),
beauty-core-ui/src/features/agendamentos/agendamentos-foundation.test.ts:208:      "agendamentos",
beauty-core-ui/src/features/agendamentos/agendamentos-navigation.test.ts:24:describe("Agenda - navegacao", () => {
beauty-core-ui/src/features/agendamentos/agendamentos-navigation.test.ts:25:  it("disponibiliza Agenda para as quatro roles do controller", () => {
beauty-core-ui/src/features/agendamentos/agendamentos-navigation.test.ts:32:      const agenda = flattenItems(
beauty-core-ui/src/features/agendamentos/agendamentos-navigation.test.ts:39:      expect(agenda?.href).toBe(
beauty-core-ui/src/features/agendamentos/agendamentos-navigation.test.ts:40:        "/agenda",
beauty-core-ui/src/features/agendamentos/agendamentos-navigation.test.ts:43:      expect(agenda?.state).toBe(
beauty-core-ui/src/features/agendamentos/agendamentos-navigation.test.ts:49:  it("nao expoe Agenda tenant ao SUPER_ADMIN", () => {
beauty-core-ui/src/features/agendamentos/agendamentos-navigation.test.ts:50:    const agenda = flattenItems(
beauty-core-ui/src/features/agendamentos/agendamentos-navigation.test.ts:59:    expect(agenda).toBeUndefined();
beauty-core-ui/src/features/agendamentos/agendamentos-permissions-hardening.test.ts:9:  canCancelAppointment,
beauty-core-ui/src/features/agendamentos/agendamentos-permissions-hardening.test.ts:10:  canChangeAppointmentStatus,
beauty-core-ui/src/features/agendamentos/agendamentos-permissions-hardening.test.ts:11:  canCreateAppointment,
beauty-core-ui/src/features/agendamentos/agendamentos-permissions-hardening.test.ts:12:  canEditAppointment,
beauty-core-ui/src/features/agendamentos/agendamentos-permissions-hardening.test.ts:13:  canRescheduleAppointment,
beauty-core-ui/src/features/agendamentos/agendamentos-permissions-hardening.test.ts:14:} from "@/features/agendamentos/permissions/agendamentos-permissions";
beauty-core-ui/src/features/agendamentos/agendamentos-permissions-hardening.test.ts:16:const agendaRoles = [
beauty-core-ui/src/features/agendamentos/agendamentos-permissions-hardening.test.ts:29:describe("Agendamentos permissions hardening", () => {
beauty-core-ui/src/features/agendamentos/agendamentos-permissions-hardening.test.ts:30:  it.each(agendaRoles)(
beauty-core-ui/src/features/agendamentos/agendamentos-permissions-hardening.test.ts:38:        canCreateAppointment(role),
beauty-core-ui/src/features/agendamentos/agendamentos-permissions-hardening.test.ts:42:        canEditAppointment(role),
beauty-core-ui/src/features/agendamentos/agendamentos-permissions-hardening.test.ts:46:        canRescheduleAppointment(role),
beauty-core-ui/src/features/agendamentos/agendamentos-permissions-hardening.test.ts:50:        canCancelAppointment(role),
beauty-core-ui/src/features/agendamentos/agendamentos-permissions-hardening.test.ts:54:        canChangeAppointmentStatus(
beauty-core-ui/src/features/agendamentos/agendamentos-permissions-hardening.test.ts:69:        canCreateAppointment(role),
beauty-core-ui/src/features/agendamentos/agendamentos-permissions-hardening.test.ts:73:        canEditAppointment(role),
beauty-core-ui/src/features/agendamentos/agendamentos-permissions-hardening.test.ts:77:        canRescheduleAppointment(role),
beauty-core-ui/src/features/agendamentos/agendamentos-permissions-hardening.test.ts:81:        canCancelAppointment(role),
beauty-core-ui/src/features/agendamentos/agendamentos-permissions-hardening.test.ts:85:        canChangeAppointmentStatus(
beauty-core-ui/src/features/agendamentos/agendamentos-url-hardening.test.ts:8:  buildAgendaSearchParams,
beauty-core-ui/src/features/agendamentos/agendamentos-url-hardening.test.ts:9:  parseAgendaUrlState,
beauty-core-ui/src/features/agendamentos/agendamentos-url-hardening.test.ts:10:} from "@/features/agendamentos/utils/agenda-url";
beauty-core-ui/src/features/agendamentos/agendamentos-url-hardening.test.ts:26:describe("Agenda URL hardening", () => {
beauty-core-ui/src/features/agendamentos/agendamentos-url-hardening.test.ts:44:      buildAgendaSearchParams(
beauty-core-ui/src/features/agendamentos/agendamentos-url-hardening.test.ts:49:      parseAgendaUrlState(
beauty-core-ui/src/features/agendamentos/agendamentos-url-hardening.test.ts:71:      parseAgendaUrlState(
beauty-core-ui/src/features/agendamentos/agendamentos-url-hardening.test.ts:92:        status: "AGENDADO",
beauty-core-ui/src/features/agendamentos/agendamentos-url-hardening.test.ts:96:      parseAgendaUrlState(
beauty-core-ui/src/features/agendamentos/agendamentos-url-hardening.test.ts:114:      buildAgendaSearchParams({
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:23:  "src/features/agendamentos/components/agenda-view.tsx",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:27:  "src/features/agendamentos/components/agenda-filters.tsx",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:31:  "src/features/agendamentos/components/agendamento-create-dialog.tsx",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:35:  "src/features/agendamentos/components/agendamento-detail-dialog.tsx",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:39:  "src/features/agendamentos/components/agendamento-status-actions.tsx",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:43:  "src/features/agendamentos/forms/agendamento-create-payload.ts",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:47:  "src/features/agendamentos/forms/agendamento-edit-payload.ts",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:51:  "src/features/agendamentos/hooks/use-agenda-url-state.ts",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:55:  "src/features/agendamentos/queries/agendamentos-query-options.ts",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:59:  "src/features/agendamentos/services/agendamentos-api.ts",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:63:  "src/features/agendamentos/permissions/agendamentos-permissions.ts",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:66:describe("Chat 51 Agenda flow integration", () => {
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:69:      "useAgendaUrlState",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:73:      "agendaUrlStateToFilters",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:77:      "buildAgendaOperationalQuery",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:85:      "agendamentosQueryOptions.calendar",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:89:      "agendamentosQueryOptions.list",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:93:      "AgendaRelatedSelectors",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:101:      "buildAgendaSearchParams",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:105:      "parseAgendaUrlState",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:111:      "AgendaCalendar",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:115:      "AgendaList",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:141:      "AgendamentoCreateDialog",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:145:      "canCreateAppointment",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:149:      "agendamentosApi.create",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:157:      "agendamentosKeys.all",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:173:      '"/agendamentos"',
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:183:      "AgendamentoDetailDialog",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:187:      "selectedAgendamentoId",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:191:      "canEditAppointment",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:195:      "agendamentosQueryOptions.detail",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:199:      "agendamentosApi.update",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:211:      "toUpdateAgendamentoPayload",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:219:      "`/agendamentos/${agendamentoId}`",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:225:      "canChangeAppointmentStatus",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:229:      "canCancelAppointment",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:233:      "agendamentosApi.changeStatus",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:237:      "agendamentosApi.cancel",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:249:      "changeAgendamentoStatus",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:253:      "cancelAgendamento",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:257:      "`/agendamentos/${agendamentoId}/cancelar`",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:275:      "canCreateAppointment",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:276:      "canEditAppointment",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:277:      "canRescheduleAppointment",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:278:      "canCancelAppointment",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:279:      "canChangeAppointmentStatus",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:289:      "agendamentosKeys.all",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:293:      "agendamentosKeys.all",
beauty-core-ui/src/features/agendamentos/chat51-agenda-flow.integration.test.ts:297:      "agendamentosKeys.all",
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-accessibility.test.tsx:15:import { AgendaCalendar } from "@/features/agendamentos/components/agenda-calendar";
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-accessibility.test.tsx:21:describe("AgendaCalendar visual e acessibilidade", () => {
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-accessibility.test.tsx:30:      <AgendaCalendar
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-accessibility.test.tsx:48:            "Calendario de agendamentos",
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-accessibility.test.tsx:56:      <AgendaCalendar
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-accessibility.test.tsx:74:            "Calendario de agendamentos",
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-empty.tsx:3:type AgendaCalendarEmptyProps = {
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-empty.tsx:7:export function AgendaCalendarEmpty({
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-empty.tsx:9:}: AgendaCalendarEmptyProps) {
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-empty.tsx:12:      data-testid="agenda-calendar-empty"
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-empty.tsx:16:        src="/images/empty-states/beauty-core-agendamentos-empty.webp"
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-empty.tsx:27:            : "Nenhum agendamento neste periodo"}
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-empty.tsx:32:            ? "Altere os filtros para consultar outros agendamentos."
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-empty.tsx:33:            : "Quando houver agendamentos neste periodo, eles aparecerao aqui."}
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-event.tsx:9:import { AgendaStatusBadge } from "@/features/agendamentos/components/agenda-status-badge";
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-event.tsx:10:import type { AgendamentoListItem } from "@/features/agendamentos/types/agendamentos-api.types";
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-event.tsx:12:  buildAgendaEventAccessibleName,
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-event.tsx:13:  formatAgendaEventTime,
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-event.tsx:14:} from "@/features/agendamentos/utils/agenda-calendar";
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-event.tsx:16:type AgendaCalendarEventProps = {
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-event.tsx:17:  item: AgendamentoListItem;
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-event.tsx:19:    item: AgendamentoListItem,
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-event.tsx:23:function AgendaCalendarEventComponent({
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-event.tsx:26:}: AgendaCalendarEventProps) {
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-event.tsx:28:    formatAgendaEventTime(
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-event.tsx:33:    formatAgendaEventTime(
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-event.tsx:39:      aria-label={buildAgendaEventAccessibleName(
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-event.tsx:42:      data-testid="agenda-calendar-event"
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-event.tsx:58:        <AgendaStatusBadge
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-event.tsx:112:          aria-label={`Ver detalhes do agendamento de ${item.cliente.nome}`}
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-event.tsx:124:export const AgendaCalendarEvent =
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-event.tsx:126:    AgendaCalendarEventComponent,
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-event.tsx:129:AgendaCalendarEvent.displayName =
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-event.tsx:130:  "AgendaCalendarEvent";
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-toolbar.test.tsx:15:import { AgendaCalendarToolbar } from "@/features/agendamentos/components/agenda-calendar-toolbar";
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-toolbar.test.tsx:21:describe("AgendaCalendarToolbar", () => {
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-toolbar.test.tsx:26:      <AgendaCalendarToolbar
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-toolbar.test.tsx:57:      <AgendaCalendarToolbar
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-toolbar.tsx:8:import type { AgendaView } from "@/features/agendamentos/types/agendamentos-types";
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-toolbar.tsx:10:type AgendaCalendarToolbarProps = {
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-toolbar.tsx:11:  mode: AgendaView;
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-toolbar.tsx:15:    mode: AgendaView,
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-toolbar.tsx:22:export function AgendaCalendarToolbar({
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-toolbar.tsx:30:}: AgendaCalendarToolbarProps) {
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-toolbar.tsx:71:            ? "Atualizando agenda..."
beauty-core-ui/src/features/agendamentos/components/agenda-calendar-toolbar.tsx:79:          aria-label="Visualizacao da agenda"
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.test.tsx:15:import { AgendaCalendar } from "@/features/agendamentos/components/agenda-calendar";
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.test.tsx:16:import type { AgendamentoListItem } from "@/features/agendamentos/types/agendamentos-api.types";
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.test.tsx:18:const item: AgendamentoListItem = {
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.test.tsx:68:describe("AgendaCalendar", () => {
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.test.tsx:71:      <AgendaCalendar
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.test.tsx:110:      <AgendaCalendar
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.test.tsx:154:      <AgendaCalendar
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.test.tsx:219:      <AgendaCalendar
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.test.tsx:234:        "agenda-calendar-empty",
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.test.tsx:240:        "Nenhum agendamento neste periodo",
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.test.tsx:247:      <AgendaCalendar
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.test.tsx:267:      "101 agendamentos",
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:8:import type { AgendamentoListItem } from "@/features/agendamentos/types/agendamentos-api.types";
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:9:import type { AgendaView } from "@/features/agendamentos/types/agendamentos-types";
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:10:import { AgendaCalendarEmpty } from "@/features/agendamentos/components/agenda-calendar-empty";
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:11:import { AgendaCalendarEvent } from "@/features/agendamentos/components/agenda-calendar-event";
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:12:import { AgendaCalendarToolbar } from "@/features/agendamentos/components/agenda-calendar-toolbar";
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:14:  agendaDateKey,
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:15:  formatAgendaDayHeading,
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:16:  formatAgendaPeriodLabel,
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:17:  getAgendaCalendarDays,
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:18:  groupAgendaEventsByDate,
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:19:  type AgendaCalendarMode,
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:20:} from "@/features/agendamentos/utils/agenda-calendar";
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:22:type AgendaCalendarProps = {
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:24:  mode: AgendaCalendarMode;
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:25:  items: readonly AgendamentoListItem[];
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:30:    mode: AgendaView,
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:36:    item: AgendamentoListItem,
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:40:export function AgendaCalendar({
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:52:}: AgendaCalendarProps) {
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:55:      getAgendaCalendarDays(
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:67:      groupAgendaEventsByDate(
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:77:      formatAgendaPeriodLabel(
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:95:      aria-label="Calendario de agendamentos"
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:97:      data-testid="agenda-calendar"
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:100:      <AgendaCalendarToolbar
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:115:          O periodo possui {total} agendamentos. Esta visualizacao carregou os primeiros {items.length} registros do contrato paginado atual.
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:120:        <AgendaCalendarEmpty
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:133:              agendaDateKey(day);
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:147:                aria-labelledby={`agenda-day-${key}`}
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:159:                      id={`agenda-day-${key}`}
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:167:                      {formatAgendaDayHeading(
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:182:                      ? "agendamento"
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:183:                      : "agendamentos"}
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:190:                      Sem agendamentos
beauty-core-ui/src/features/agendamentos/components/agenda-calendar.tsx:194:                      <AgendaCalendarEvent
beauty-core-ui/src/features/agendamentos/components/agenda-detail-openers.test.tsx:15:import { AgendaCalendarEvent } from "@/features/agendamentos/components/agenda-calendar-event";
beauty-core-ui/src/features/agendamentos/components/agenda-detail-openers.test.tsx:16:import { AgendaList } from "@/features/agendamentos/components/agenda-list";
beauty-core-ui/src/features/agendamentos/components/agenda-detail-openers.test.tsx:17:import type { AgendamentoListItem } from "@/features/agendamentos/types/agendamentos-api.types";
beauty-core-ui/src/features/agendamentos/components/agenda-detail-openers.test.tsx:19:const item: AgendamentoListItem = {
beauty-core-ui/src/features/agendamentos/components/agenda-detail-openers.test.tsx:74:describe("agenda detail openers", () => {
beauty-core-ui/src/features/agendamentos/components/agenda-detail-openers.test.tsx:80:      <AgendaCalendarEvent
beauty-core-ui/src/features/agendamentos/components/agenda-detail-openers.test.tsx:91:            "Ver detalhes do agendamento de Maria",
beauty-core-ui/src/features/agendamentos/components/agenda-detail-openers.test.tsx:108:      <AgendaList
beauty-core-ui/src/features/agendamentos/components/agenda-filters.tsx:13:import { AgendaRelatedSelectors } from "@/features/agendamentos/components/agenda-related-selectors";
beauty-core-ui/src/features/agendamentos/components/agenda-filters.tsx:14:import { agendamentoStatusSchema } from "@/features/agendamentos/schemas/agendamentos-schemas";
beauty-core-ui/src/features/agendamentos/components/agenda-filters.tsx:15:import type { AgendaUrlState } from "@/features/agendamentos/types/agendamentos-types";
beauty-core-ui/src/features/agendamentos/components/agenda-filters.tsx:17:  agendaUrlStateToFilters,
beauty-core-ui/src/features/agendamentos/components/agenda-filters.tsx:18:  getAgendaActiveFilterCount,
beauty-core-ui/src/features/agendamentos/components/agenda-filters.tsx:19:} from "@/features/agendamentos/utils/agenda-filters";
beauty-core-ui/src/features/agendamentos/components/agenda-filters.tsx:20:import { formatAgendaStatusLabel } from "@/features/agendamentos/utils/agenda-calendar";
beauty-core-ui/src/features/agendamentos/components/agenda-filters.tsx:22:type AgendaFiltersProps = {
beauty-core-ui/src/features/agendamentos/components/agenda-filters.tsx:23:  state: AgendaUrlState;
beauty-core-ui/src/features/agendamentos/components/agenda-filters.tsx:25:    patch: Partial<AgendaUrlState>,
beauty-core-ui/src/features/agendamentos/components/agenda-filters.tsx:29:export function AgendaFilters({
beauty-core-ui/src/features/agendamentos/components/agenda-filters.tsx:32:}: AgendaFiltersProps) {
beauty-core-ui/src/features/agendamentos/components/agenda-filters.tsx:34:    agendaUrlStateToFilters(state);
beauty-core-ui/src/features/agendamentos/components/agenda-filters.tsx:37:    getAgendaActiveFilterCount(
beauty-core-ui/src/features/agendamentos/components/agenda-filters.tsx:43:      data-testid="agenda-filters"
beauty-core-ui/src/features/agendamentos/components/agenda-filters.tsx:87:          htmlFor="agenda-status-filter"
beauty-core-ui/src/features/agendamentos/components/agenda-filters.tsx:102:                  : agendamentoStatusSchema.parse(
beauty-core-ui/src/features/agendamentos/components/agenda-filters.tsx:109:            id="agenda-status-filter"
beauty-core-ui/src/features/agendamentos/components/agenda-filters.tsx:120:            {agendamentoStatusSchema.options.map(
beauty-core-ui/src/features/agendamentos/components/agenda-filters.tsx:126:                  {formatAgendaStatusLabel(
beauty-core-ui/src/features/agendamentos/components/agenda-filters.tsx:136:      <AgendaRelatedSelectors
beauty-core-ui/src/features/agendamentos/components/agenda-filters.tsx:147:          } as Partial<AgendaUrlState>);
beauty-core-ui/src/features/agendamentos/components/agenda-list.test.tsx:15:import { AgendaList } from "@/features/agendamentos/components/agenda-list";
beauty-core-ui/src/features/agendamentos/components/agenda-list.test.tsx:16:import type { AgendamentoListItem } from "@/features/agendamentos/types/agendamentos-api.types";
beauty-core-ui/src/features/agendamentos/components/agenda-list.test.tsx:18:const item: AgendamentoListItem = {
beauty-core-ui/src/features/agendamentos/components/agenda-list.test.tsx:68:describe("AgendaList", () => {
beauty-core-ui/src/features/agendamentos/components/agenda-list.test.tsx:71:      <AgendaList
beauty-core-ui/src/features/agendamentos/components/agenda-list.test.tsx:110:      <AgendaList
beauty-core-ui/src/features/agendamentos/components/agenda-list.test.tsx:140:      <AgendaList
beauty-core-ui/src/features/agendamentos/components/agenda-list.test.tsx:166:      <AgendaList
beauty-core-ui/src/features/agendamentos/components/agenda-list.test.tsx:182:        "Nenhum agendamento na lista",
beauty-core-ui/src/features/agendamentos/components/agenda-list.tsx:8:import { AgendaStatusBadge } from "@/features/agendamentos/components/agenda-status-badge";
beauty-core-ui/src/features/agendamentos/components/agenda-list.tsx:10:  AgendamentoListItem,
beauty-core-ui/src/features/agendamentos/components/agenda-list.tsx:11:  AgendamentosPaginationMeta,
beauty-core-ui/src/features/agendamentos/components/agenda-list.tsx:12:} from "@/features/agendamentos/types/agendamentos-api.types";
beauty-core-ui/src/features/agendamentos/components/agenda-list.tsx:14:  buildAgendaEventAccessibleName,
beauty-core-ui/src/features/agendamentos/components/agenda-list.tsx:15:  formatAgendaDayHeading,
beauty-core-ui/src/features/agendamentos/components/agenda-list.tsx:16:  formatAgendaEventTime,
beauty-core-ui/src/features/agendamentos/components/agenda-list.tsx:17:} from "@/features/agendamentos/utils/agenda-calendar";
beauty-core-ui/src/features/agendamentos/components/agenda-list.tsx:19:type AgendaListProps = {
beauty-core-ui/src/features/agendamentos/components/agenda-list.tsx:20:  items: readonly AgendamentoListItem[];
beauty-core-ui/src/features/agendamentos/components/agenda-list.tsx:21:  meta: AgendamentosPaginationMeta;
beauty-core-ui/src/features/agendamentos/components/agenda-list.tsx:26:    item: AgendamentoListItem,
beauty-core-ui/src/features/agendamentos/components/agenda-list.tsx:30:export function AgendaList({
beauty-core-ui/src/features/agendamentos/components/agenda-list.tsx:37:}: AgendaListProps) {
beauty-core-ui/src/features/agendamentos/components/agenda-list.tsx:40:      data-testid="agenda-list"
beauty-core-ui/src/features/agendamentos/components/agenda-list.tsx:46:            Agendamentos do periodo
beauty-core-ui/src/features/agendamentos/components/agenda-list.tsx:52:              ? "agendamento encontrado"
beauty-core-ui/src/features/agendamentos/components/agenda-list.tsx:53:              : "agendamentos encontrados"}
beauty-core-ui/src/features/agendamentos/components/agenda-list.tsx:70:            Nenhum agendamento na lista
beauty-core-ui/src/features/agendamentos/components/agenda-list.tsx:83:              aria-label={buildAgendaEventAccessibleName(
beauty-core-ui/src/features/agendamentos/components/agenda-list.tsx:90:                  {formatAgendaDayHeading(
beauty-core-ui/src/features/agendamentos/components/agenda-list.tsx:103:                  {formatAgendaEventTime(
beauty-core-ui/src/features/agendamentos/components/agenda-list.tsx:107:                  {formatAgendaEventTime(
beauty-core-ui/src/features/agendamentos/components/agenda-list.tsx:143:              <AgendaStatusBadge
beauty-core-ui/src/features/agendamentos/components/agenda-option-picker.test.tsx:15:import { AgendaOptionPicker } from "@/features/agendamentos/components/agenda-option-picker";
beauty-core-ui/src/features/agendamentos/components/agenda-option-picker.test.tsx:21:describe("AgendaOptionPicker", () => {
beauty-core-ui/src/features/agendamentos/components/agenda-option-picker.test.tsx:27:      <AgendaOptionPicker
beauty-core-ui/src/features/agendamentos/components/agenda-option-picker.test.tsx:90:      <AgendaOptionPicker
beauty-core-ui/src/features/agendamentos/components/agenda-option-picker.test.tsx:125:      <AgendaOptionPicker
beauty-core-ui/src/features/agendamentos/components/agenda-option-picker.test.tsx:151:      <AgendaOptionPicker
beauty-core-ui/src/features/agendamentos/components/agenda-option-picker.tsx:7:import type { AgendaOption } from "@/features/agendamentos/types/agendamentos-options.types";
beauty-core-ui/src/features/agendamentos/components/agenda-option-picker.tsx:9:type AgendaOptionPickerProps = {
beauty-core-ui/src/features/agendamentos/components/agenda-option-picker.tsx:13:  options: AgendaOption[];
beauty-core-ui/src/features/agendamentos/components/agenda-option-picker.tsx:26:export function AgendaOptionPicker({
beauty-core-ui/src/features/agendamentos/components/agenda-option-picker.tsx:41:}: AgendaOptionPickerProps) {
beauty-core-ui/src/features/agendamentos/components/agenda-related-selectors.tsx:6:import { AgendaOptionPicker } from "@/features/agendamentos/components/agenda-option-picker";
beauty-core-ui/src/features/agendamentos/components/agenda-related-selectors.tsx:7:import { agendamentosOptionsQueryOptions } from "@/features/agendamentos/queries/agendamentos-options-query-options";
beauty-core-ui/src/features/agendamentos/components/agenda-related-selectors.tsx:9:  AgendaRelatedField,
beauty-core-ui/src/features/agendamentos/components/agenda-related-selectors.tsx:10:  AgendaRelatedValues,
beauty-core-ui/src/features/agendamentos/components/agenda-related-selectors.tsx:11:} from "@/features/agendamentos/types/agendamentos-options.types";
beauty-core-ui/src/features/agendamentos/components/agenda-related-selectors.tsx:14:type AgendaRelatedSelectorsProps = {
beauty-core-ui/src/features/agendamentos/components/agenda-related-selectors.tsx:15:  values: AgendaRelatedValues;
beauty-core-ui/src/features/agendamentos/components/agenda-related-selectors.tsx:17:    field: AgendaRelatedField,
beauty-core-ui/src/features/agendamentos/components/agenda-related-selectors.tsx:23:export function AgendaRelatedSelectors({
beauty-core-ui/src/features/agendamentos/components/agenda-related-selectors.tsx:27:}: AgendaRelatedSelectorsProps) {
beauty-core-ui/src/features/agendamentos/components/agenda-related-selectors.tsx:58:    agendamentosOptionsQueryOptions.clientes(
beauty-core-ui/src/features/agendamentos/components/agenda-related-selectors.tsx:64:    agendamentosOptionsQueryOptions.servicos(),
beauty-core-ui/src/features/agendamentos/components/agenda-related-selectors.tsx:68:    agendamentosOptionsQueryOptions.profissionais(
beauty-core-ui/src/features/agendamentos/components/agenda-related-selectors.tsx:74:    agendamentosOptionsQueryOptions.unidades(
beauty-core-ui/src/features/agendamentos/components/agenda-related-selectors.tsx:102:      <AgendaOptionPicker
beauty-core-ui/src/features/agendamentos/components/agenda-related-selectors.tsx:103:        id="agenda-cliente"
beauty-core-ui/src/features/agendamentos/components/agenda-related-selectors.tsx:127:      <AgendaOptionPicker
beauty-core-ui/src/features/agendamentos/components/agenda-related-selectors.tsx:128:        id="agenda-servico"
beauty-core-ui/src/features/agendamentos/components/agenda-related-selectors.tsx:152:      <AgendaOptionPicker
beauty-core-ui/src/features/agendamentos/components/agenda-related-selectors.tsx:153:        id="agenda-profissional"
beauty-core-ui/src/features/agendamentos/components/agenda-related-selectors.tsx:188:      <AgendaOptionPicker
beauty-core-ui/src/features/agendamentos/components/agenda-related-selectors.tsx:189:        id="agenda-unidade"
beauty-core-ui/src/features/agendamentos/components/agenda-status-badge.test.tsx:13:import { AgendaStatusBadge } from "@/features/agendamentos/components/agenda-status-badge";
beauty-core-ui/src/features/agendamentos/components/agenda-status-badge.test.tsx:19:describe("AgendaStatusBadge", () => {
beauty-core-ui/src/features/agendamentos/components/agenda-status-badge.test.tsx:52:        <AgendaStatusBadge
beauty-core-ui/src/features/agendamentos/components/agenda-status-badge.tsx:2:import type { AgendamentoStatus } from "@/features/agendamentos/types/agendamentos-types";
beauty-core-ui/src/features/agendamentos/components/agenda-status-badge.tsx:3:import { getAgendamentoStatusMeta } from "@/features/agendamentos/utils/agendamentos-status";
beauty-core-ui/src/features/agendamentos/components/agenda-status-badge.tsx:5:type AgendaStatusBadgeProps = {
beauty-core-ui/src/features/agendamentos/components/agenda-status-badge.tsx:6:  status: AgendamentoStatus;
beauty-core-ui/src/features/agendamentos/components/agenda-status-badge.tsx:10:export function AgendaStatusBadge({
beauty-core-ui/src/features/agendamentos/components/agenda-status-badge.tsx:13:}: AgendaStatusBadgeProps) {
beauty-core-ui/src/features/agendamentos/components/agenda-status-badge.tsx:15:    getAgendamentoStatusMeta(
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:17:import { AgendaCalendar } from "@/features/agendamentos/components/agenda-calendar";
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:18:import { AgendamentoCreateDialog } from "@/features/agendamentos/components/agendamento-create-dialog";
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:19:import { AgendamentoDetailDialog } from "@/features/agendamentos/components/agendamento-detail-dialog";
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:20:import { AgendaCalendarToolbar } from "@/features/agendamentos/components/agenda-calendar-toolbar";
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:21:import { AgendaFilters } from "@/features/agendamentos/components/agenda-filters";
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:22:import { AgendaList } from "@/features/agendamentos/components/agenda-list";
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:23:import { useAgendaUrlState } from "@/features/agendamentos/hooks/use-agenda-url-state";
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:26:  canCancelAppointment,
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:27:  canChangeAppointmentStatus,
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:28:  canCreateAppointment,
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:29:  canEditAppointment,
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:30:} from "@/features/agendamentos/permissions/agendamentos-permissions";
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:31:import { agendamentosQueryOptions } from "@/features/agendamentos/queries/agendamentos-query-options";
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:33:  agendaUrlStateToFilters,
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:34:  buildAgendaOperationalQuery,
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:35:  hasAgendaOperationalFilters,
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:36:} from "@/features/agendamentos/utils/agenda-filters";
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:38:  formatAgendaPeriodLabel,
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:39:  shiftAgendaCalendarDate,
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:40:  type AgendaCalendarMode,
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:41:} from "@/features/agendamentos/utils/agenda-calendar";
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:42:import { getAgendaRange } from "@/features/agendamentos/utils/agendamentos-date";
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:43:import { getDefaultAgendaDate } from "@/features/agendamentos/utils/agenda-url";
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:46:export function AgendaView() {
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:58:  } = useAgendaUrlState();
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:66:    selectedAgendamentoId,
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:67:    setSelectedAgendamentoId,
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:75:  const rangeMode: AgendaCalendarMode =
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:88:    canCreateAppointment(
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:95:    canEditAppointment(
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:102:    canChangeAppointmentStatus(
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:109:    canCancelAppointment(
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:116:        agendaUrlStateToFilters(
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:125:        buildAgendaOperationalQuery(
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:134:        getAgendaRange(
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:145:    agendamentosQueryOptions.calendar(
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:154:    agendamentosQueryOptions.list(
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:181:        ? "Agenda operacional da empresa"
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:183:          ? "1 agendamento no periodo"
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:184:          : `${total} agendamentos no periodo`;
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:198:        shiftAgendaCalendarDate(
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:209:        shiftAgendaCalendarDate(
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:220:        getDefaultAgendaDate(),
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:225:    formatAgendaPeriodLabel(
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:233:      data-testid="agenda-page"
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:237:        title="Agenda"
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:238:        description="Calendario e lista operacionais conectados aos agendamentos reais da empresa."
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:246:        <PermissionState description="Seu perfil nao possui permissao para acessar a Agenda desta empresa." />
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:251:              <AgendamentoCreateDialog />
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:255:          <AgendaFilters
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:268:                <AgendaCalendarToolbar
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:303:                      description="Os agendamentos do periodo nao puderam ser carregados."
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:310:                  <AgendaList
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:336:                      setSelectedAgendamentoId(
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:348:                description="Visualize os agendamentos reais por dia ou semana. Periodo, visualizacao e filtros ficam registrados na URL."
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:358:                      title="Nao foi possivel carregar a Agenda"
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:359:                      description="Os agendamentos do periodo nao puderam ser carregados. Tente novamente."
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:366:                  <AgendaCalendar
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:381:                    filtered={hasAgendaOperationalFilters(
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:404:                      setSelectedAgendamentoId(
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:432:                  <AgendaList
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:458:                      setSelectedAgendamentoId(
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:470:      <AgendamentoDetailDialog
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:471:        agendamentoId={
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:472:          selectedAgendamentoId
beauty-core-ui/src/features/agendamentos/components/agenda-view.tsx:480:          setSelectedAgendamentoId(
beauty-core-ui/src/features/agendamentos/components/agenda-visual-audit.test.ts:10:  "agenda-calendar.tsx",
beauty-core-ui/src/features/agendamentos/components/agenda-visual-audit.test.ts:11:  "agenda-calendar-event.tsx",
beauty-core-ui/src/features/agendamentos/components/agenda-visual-audit.test.ts:12:  "agenda-calendar-toolbar.tsx",
beauty-core-ui/src/features/agendamentos/components/agenda-visual-audit.test.ts:13:  "agenda-filters.tsx",
beauty-core-ui/src/features/agendamentos/components/agenda-visual-audit.test.ts:14:  "agenda-list.tsx",
beauty-core-ui/src/features/agendamentos/components/agenda-visual-audit.test.ts:15:  "agenda-status-badge.tsx",
beauty-core-ui/src/features/agendamentos/components/agenda-visual-audit.test.ts:16:  "agendamento-detail-dialog.tsx",
beauty-core-ui/src/features/agendamentos/components/agenda-visual-audit.test.ts:17:  "agendamento-status-actions.tsx",
beauty-core-ui/src/features/agendamentos/components/agenda-visual-audit.test.ts:28:      "agendamentos",
beauty-core-ui/src/features/agendamentos/components/agenda-visual-audit.test.ts:36:describe("Agenda visual audit", () => {
beauty-core-ui/src/features/agendamentos/components/agenda-visual-audit.test.ts:80:        "agenda-calendar-event.tsx",
beauty-core-ui/src/features/agendamentos/components/agenda-visual-audit.test.ts:90:        "agenda-status-badge.tsx",
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:21:import { AgendamentoCreateDialog } from "@/features/agendamentos/components/agendamento-create-dialog";
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:22:import type { AgendamentoCreateFormValues } from "@/features/agendamentos/forms/agendamento-create-form.schema";
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:23:import { agendamentosKeys } from "@/features/agendamentos/queries/agendamentos-keys";
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:24:import { agendamentosApi } from "@/features/agendamentos/services/agendamentos-api";
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:28:  "@/features/agendamentos/services/agendamentos-api",
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:30:    agendamentosApi: {
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:44:  "@/features/agendamentos/forms/agendamento-create-form",
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:46:    AgendamentoCreateForm: ({
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:52:        values: AgendamentoCreateFormValues,
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:87:          Enviar agendamento
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:119:      <AgendamentoCreateDialog />
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:137:describe("AgendamentoCreateDialog", () => {
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:138:  it("cria e invalida o cache de Agendamentos", async () => {
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:140:      agendamentosApi.create,
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:173:            "Novo agendamento",
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:183:            "Novo agendamento",
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:193:            "Enviar agendamento",
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:200:        agendamentosApi.create,
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:211:          agendamentosKeys.all,
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:221:              "Novo agendamento",
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:230:      agendamentosApi.create,
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:240:        "Nao foi possivel criar o agendamento.",
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:242:        "Nao foi possivel criar o agendamento.",
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:258:            "Novo agendamento",
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:268:            "Enviar agendamento",
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:278:      "Nao foi possivel criar o agendamento.",
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx:286:            "Novo agendamento",
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.tsx:21:import { AgendamentoCreateForm } from "@/features/agendamentos/forms/agendamento-create-form";
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.tsx:23:  EMPTY_AGENDAMENTO_CREATE_FORM_VALUES,
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.tsx:24:  type AgendamentoCreateFormValues,
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.tsx:25:} from "@/features/agendamentos/forms/agendamento-create-form.schema";
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.tsx:26:import { toCreateAgendamentoPayload } from "@/features/agendamentos/forms/agendamento-create-payload";
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.tsx:27:import { agendamentosKeys } from "@/features/agendamentos/queries/agendamentos-keys";
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.tsx:28:import { agendamentosApi } from "@/features/agendamentos/services/agendamentos-api";
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.tsx:31:export function AgendamentoCreateDialog() {
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.tsx:49:      values: AgendamentoCreateFormValues,
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.tsx:51:      agendamentosApi.create(
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.tsx:52:        toCreateAgendamentoPayload(
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.tsx:64:          agendamentosKeys.all,
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.tsx:117:          Novo agendamento
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.tsx:124:            Novo agendamento
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.tsx:128:            Cadastre um agendamento usando somente os campos suportados pelo backend.
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.tsx:132:        <AgendamentoCreateForm
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.tsx:139:            EMPTY_AGENDAMENTO_CREATE_FORM_VALUES
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:21:import { AgendamentoDetailDialog } from "@/features/agendamentos/components/agendamento-detail-dialog";
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:22:import type { AgendamentoEditFormValues } from "@/features/agendamentos/forms/agendamento-edit-payload";
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:23:import { agendamentosKeys } from "@/features/agendamentos/queries/agendamentos-keys";
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:24:import { agendamentosApi } from "@/features/agendamentos/services/agendamentos-api";
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:87:  "@/features/agendamentos/services/agendamentos-api",
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:89:    agendamentosApi: {
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:104:  "@/features/agendamentos/components/agendamento-status-actions",
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:106:    AgendamentoStatusActions: ({
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:128:  "@/features/agendamentos/forms/agendamento-edit-form",
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:130:    AgendamentoEditForm: ({
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:135:        values: AgendamentoEditFormValues,
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:196:      <AgendamentoDetailDialog
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:197:        agendamentoId={id}
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:220:describe("AgendamentoDetailDialog", () => {
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:223:      agendamentosApi.detail,
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:249:  it("edita e invalida todo cache de agendamentos", async () => {
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:251:      agendamentosApi.detail,
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:257:      agendamentosApi.update,
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:275:            "Editar agendamento",
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:291:        agendamentosApi.update,
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:302:          agendamentosKeys.all,
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:309:      agendamentosApi.detail,
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:325:            "Editar agendamento",
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:333:      agendamentosApi.detail,
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:343:        "Agendamento nao encontrado.",
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:345:        "Agendamento nao encontrado.",
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx:357:        "Agendamento nao encontrado",
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:19:import { AgendaStatusBadge } from "@/features/agendamentos/components/agenda-status-badge";
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:27:import { AgendamentoStatusActions } from "@/features/agendamentos/components/agendamento-status-actions";
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:28:import { AgendamentoEditForm } from "@/features/agendamentos/forms/agendamento-edit-form";
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:30:  agendamentoToEditFormValues,
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:31:  toUpdateAgendamentoPayload,
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:32:  type AgendamentoEditFormValues,
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:33:} from "@/features/agendamentos/forms/agendamento-edit-payload";
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:34:import { agendamentosKeys } from "@/features/agendamentos/queries/agendamentos-keys";
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:35:import { agendamentosQueryOptions } from "@/features/agendamentos/queries/agendamentos-query-options";
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:36:import { agendamentosApi } from "@/features/agendamentos/services/agendamentos-api";
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:37:import type { AgendamentoDetail } from "@/features/agendamentos/types/agendamentos-api.types";
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:40:type AgendamentoDetailDialogProps = {
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:41:  agendamentoId: string | null;
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:78:  detail: AgendamentoDetail,
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:113:export function AgendamentoDetailDialog({
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:114:  agendamentoId,
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:119:}: AgendamentoDetailDialogProps) {
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:136:    agendamentosQueryOptions.detail(
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:137:      agendamentoId ?? "",
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:138:      Boolean(agendamentoId),
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:144:      values: AgendamentoEditFormValues,
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:146:      if (!agendamentoId) {
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:148:          "Agendamento sem identificador.",
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:152:      return agendamentosApi.update(
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:153:        agendamentoId,
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:154:        toUpdateAgendamentoPayload(
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:169:        agendamentosKeys.detail(
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:177:          agendamentosKeys.all,
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:210:          ? agendamentoToEditFormValues(
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:245:        agendamentoId,
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:257:              ? "Editar agendamento"
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:258:              : "Detalhes do agendamento"}
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:264:              : "Dados atuais carregados diretamente do agendamento."}
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:278:                ? "Agendamento nao encontrado"
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:279:                : "Nao foi possivel carregar o agendamento"
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:294:            <AgendamentoEditForm
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:375:                    <AgendaStatusBadge
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:404:              <AgendamentoStatusActions
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:438:                    Editar agendamento
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:9:import { AgendaOptionPicker } from "@/features/agendamentos/components/agenda-option-picker";
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:11:  AgendaOption,
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:12:  AgendaRelatedField,
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:13:  AgendaRelatedValues,
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:14:} from "@/features/agendamentos/types/agendamentos-options.types";
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:15:import { agendamentosKeys } from "@/features/agendamentos/queries/agendamentos-keys";
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:16:import { agendamentosOptionsApi } from "@/features/agendamentos/services/agendamentos-options-api";
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:21:    AgendaRelatedField,
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:22:    AgendaOption
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:26:type AgendamentoEditRelatedSelectorsProps = {
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:27:  values: AgendaRelatedValues;
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:31:    field: AgendaRelatedField,
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:37:  options: readonly AgendaOption[],
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:39:    | AgendaOption
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:41:): AgendaOption[] {
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:58:export function AgendamentoEditRelatedSelectors({
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:63:}: AgendamentoEditRelatedSelectorsProps) {
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:104:      ...agendamentosKeys.all,
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:111:      agendamentosOptionsApi.clientes(
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:122:      ...agendamentosKeys.all,
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:128:      agendamentosOptionsApi.servicos(),
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:137:      ...agendamentosKeys.all,
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:144:      agendamentosOptionsApi.profissionais(
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:155:      ...agendamentosKeys.all,
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:162:      agendamentosOptionsApi.unidades(
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:201:      <AgendaOptionPicker
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:202:        id="edit-agendamento-cliente"
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:240:      <AgendaOptionPicker
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:241:        id="edit-agendamento-servico"
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:279:      <AgendaOptionPicker
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:280:        id="edit-agendamento-profissional"
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:321:      <AgendaOptionPicker
beauty-core-ui/src/features/agendamentos/components/agendamento-edit-related-selectors.tsx:322:        id="edit-agendamento-unidade"
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.test.tsx:22:  AgendamentoStatusActions,
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.test.tsx:24:} from "@/features/agendamentos/components/agendamento-status-actions";
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.test.tsx:25:import { agendamentosKeys } from "@/features/agendamentos/queries/agendamentos-keys";
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.test.tsx:26:import { agendamentosApi } from "@/features/agendamentos/services/agendamentos-api";
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.test.tsx:27:import type { AgendamentoDetail } from "@/features/agendamentos/types/agendamentos-api.types";
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.test.tsx:30:const detail: AgendamentoDetail = {
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.test.tsx:86:  "@/features/agendamentos/services/agendamentos-api",
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.test.tsx:88:    agendamentosApi: {
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.test.tsx:108:    data?: AgendamentoDetail;
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.test.tsx:135:      <AgendamentoStatusActions
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.test.tsx:166:describe("AgendamentoStatusActions", () => {
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.test.tsx:187:      agendamentosApi.changeStatus,
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.test.tsx:227:        agendamentosApi.changeStatus,
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.test.tsx:239:          agendamentosKeys.all,
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.test.tsx:246:      agendamentosApi.cancel,
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.test.tsx:264:            "Cancelar agendamento",
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.test.tsx:270:      agendamentosApi.cancel,
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.test.tsx:295:        agendamentosApi.cancel,
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.test.tsx:306:          agendamentosKeys.all,
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.test.tsx:320:        <AgendamentoStatusActions
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.test.tsx:337:      agendamentosApi.changeStatus,
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:23:import { agendamentosKeys } from "@/features/agendamentos/queries/agendamentos-keys";
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:24:import { agendamentosApi } from "@/features/agendamentos/services/agendamentos-api";
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:25:import type { AgendamentoDetail } from "@/features/agendamentos/types/agendamentos-api.types";
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:27:  AGENDAMENTO_STATUSES,
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:28:  type AgendamentoStatus,
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:29:} from "@/features/agendamentos/types/agendamentos-types";
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:30:import { formatAgendaStatusLabel } from "@/features/agendamentos/utils/agenda-calendar";
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:34:  AGENDAMENTO_STATUSES.filter(
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:38:      AgendamentoStatus,
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:44:type AgendamentoStatusActionsProps = {
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:45:  detail: AgendamentoDetail;
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:50:export function AgendamentoStatusActions({
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:54:}: AgendamentoStatusActionsProps) {
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:62:    AgendamentoStatus | null
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:85:    updated: AgendamentoDetail,
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:88:      agendamentosKeys.detail(
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:96:        agendamentosKeys.all,
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:103:        status: AgendamentoStatus,
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:105:        agendamentosApi.changeStatus(
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:123:          `Status alterado para ${formatAgendaStatusLabel(
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:145:        agendamentosApi.cancel(
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:162:          "Agendamento cancelado.",
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:192:      aria-labelledby="agendamento-status-actions-title"
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:197:          id="agendamento-status-actions-title"
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:200:          Status do agendamento
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:206:            {formatAgendaStatusLabel(
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:271:                    {formatAgendaStatusLabel(
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:309:              ? "Agendamento cancelado"
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:310:              : "Cancelar agendamento"}
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:342:                ? `O status sera alterado de ${formatAgendaStatusLabel(
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:344:                  )} para ${formatAgendaStatusLabel(
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:389:              O agendamento sera marcado como cancelado, mas o registro permanecera preservado para historico, auditoria e rastreabilidade.
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:395:              Manter agendamento
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.schema.test.ts:8:  agendamentoCreateFormSchema,
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.schema.test.ts:9:  EMPTY_AGENDAMENTO_CREATE_FORM_VALUES,
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.schema.test.ts:10:} from "@/features/agendamentos/forms/agendamento-create-form.schema";
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.schema.test.ts:41:describe("agendamento create form schema", () => {
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.schema.test.ts:44:      agendamentoCreateFormSchema.safeParse(
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.schema.test.ts:45:        EMPTY_AGENDAMENTO_CREATE_FORM_VALUES,
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.schema.test.ts:52:      agendamentoCreateFormSchema.parse(
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.schema.test.ts:62:      agendamentoCreateFormSchema.safeParse({
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.schema.test.ts:72:      agendamentoCreateFormSchema.safeParse({
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.schema.ts:27:export const agendamentoCreateFormSchema =
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.schema.ts:60:export type AgendamentoCreateFormValues =
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.schema.ts:62:    typeof agendamentoCreateFormSchema
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.schema.ts:65:export const EMPTY_AGENDAMENTO_CREATE_FORM_VALUES: AgendamentoCreateFormValues =
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.test.tsx:15:import { AgendamentoCreateForm } from "@/features/agendamentos/forms/agendamento-create-form";
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.test.tsx:16:import { EMPTY_AGENDAMENTO_CREATE_FORM_VALUES } from "@/features/agendamentos/forms/agendamento-create-form.schema";
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.test.tsx:30:  "@/features/agendamentos/components/agenda-related-selectors",
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.test.tsx:32:    AgendaRelatedSelectors: ({
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.test.tsx:107:describe("AgendamentoCreateForm", () => {
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.test.tsx:112:      <AgendamentoCreateForm
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.test.tsx:114:          EMPTY_AGENDAMENTO_CREATE_FORM_VALUES
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.test.tsx:127:            "Criar agendamento",
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.test.tsx:147:      <AgendamentoCreateForm
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.test.tsx:149:          EMPTY_AGENDAMENTO_CREATE_FORM_VALUES
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.test.tsx:214:            "Criar agendamento",
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.test.tsx:251:      <AgendamentoCreateForm
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.test.tsx:253:          EMPTY_AGENDAMENTO_CREATE_FORM_VALUES
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.test.tsx:288:      <AgendamentoCreateForm
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.test.tsx:290:          EMPTY_AGENDAMENTO_CREATE_FORM_VALUES
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.test.tsx:293:        serverError="Nao foi possivel criar o agendamento."
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.test.tsx:304:      "Nao foi possivel criar o agendamento.",
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.tsx:26:import { AgendaRelatedSelectors } from "@/features/agendamentos/components/agenda-related-selectors";
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.tsx:28:  agendamentoCreateFormSchema,
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.tsx:29:  type AgendamentoCreateFormValues,
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.tsx:30:} from "@/features/agendamentos/forms/agendamento-create-form.schema";
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.tsx:32:type AgendamentoCreateFormProps = {
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.tsx:33:  initialValues: AgendamentoCreateFormValues;
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.tsx:38:    values: AgendamentoCreateFormValues,
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.tsx:42:export function AgendamentoCreateForm({
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.tsx:48:}: AgendamentoCreateFormProps) {
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.tsx:50:    useForm<AgendamentoCreateFormValues>(
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.tsx:53:          agendamentoCreateFormSchema,
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.tsx:91:        title="Dados do agendamento"
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.tsx:92:        description="Informe os dados exigidos pelo contrato real de Agendamentos."
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.tsx:108:              <AgendaRelatedSelectors
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.tsx:138:            id="agendamento-inicio"
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.tsx:148:              id="agendamento-inicio"
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.tsx:161:            id="agendamento-fim"
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.tsx:171:              id="agendamento-fim"
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.tsx:184:            id="agendamento-observacoes"
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.tsx:194:              id="agendamento-observacoes"
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-form.tsx:226:            Criar agendamento
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-payload.test.ts:7:import { toCreateAgendamentoPayload } from "@/features/agendamentos/forms/agendamento-create-payload";
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-payload.test.ts:28:describe("create agendamento payload", () => {
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-payload.test.ts:31:      toCreateAgendamentoPayload(
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-payload.test.ts:58:      toCreateAgendamentoPayload({
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-payload.test.ts:70:      toCreateAgendamentoPayload(
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-payload.test.ts:85:      toCreateAgendamentoPayload(
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-payload.ts:2:  agendamentoCreateFormSchema,
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-payload.ts:3:  type AgendamentoCreateFormValues,
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-payload.ts:4:} from "@/features/agendamentos/forms/agendamento-create-form.schema";
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-payload.ts:5:import type { CreateAgendamentoPayload } from "@/features/agendamentos/types/agendamentos-api.types";
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-payload.ts:7:export function toCreateAgendamentoPayload(
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-payload.ts:8:  values: AgendamentoCreateFormValues,
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-payload.ts:9:): CreateAgendamentoPayload {
beauty-core-ui/src/features/agendamentos/forms/agendamento-create-payload.ts:11:    agendamentoCreateFormSchema.parse(
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-form.tsx:22:import { AgendamentoEditRelatedSelectors } from "@/features/agendamentos/components/agendamento-edit-related-selectors";
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-form.tsx:23:import { agendamentoCreateFormSchema } from "@/features/agendamentos/forms/agendamento-create-form.schema";
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-form.tsx:24:import type { AgendamentoEditFormValues } from "@/features/agendamentos/forms/agendamento-edit-payload";
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-form.tsx:26:  AgendaOption,
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-form.tsx:27:  AgendaRelatedField,
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-form.tsx:28:} from "@/features/agendamentos/types/agendamentos-options.types";
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-form.tsx:32:    AgendaRelatedField,
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-form.tsx:33:    AgendaOption
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-form.tsx:37:type AgendamentoEditFormProps = {
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-form.tsx:38:  initialValues: AgendamentoEditFormValues;
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-form.tsx:44:    values: AgendamentoEditFormValues,
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-form.tsx:48:export function AgendamentoEditForm({
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-form.tsx:55:}: AgendamentoEditFormProps) {
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-form.tsx:57:    useForm<AgendamentoEditFormValues>({
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-form.tsx:59:        agendamentoCreateFormSchema,
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-form.tsx:98:        title="Editar agendamento"
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-form.tsx:115:              <AgendamentoEditRelatedSelectors
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-form.tsx:144:            id="edit-agendamento-inicio"
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-form.tsx:153:              id="edit-agendamento-inicio"
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-form.tsx:166:            id="edit-agendamento-fim"
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-form.tsx:175:              id="edit-agendamento-fim"
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-form.tsx:188:            id="edit-agendamento-observacoes"
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-form.tsx:198:              id="edit-agendamento-observacoes"
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.test.ts:9:  agendamentoToEditFormValues,
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.test.ts:10:  toUpdateAgendamentoPayload,
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.test.ts:11:} from "@/features/agendamentos/forms/agendamento-edit-payload";
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.test.ts:12:import type { AgendamentoDetail } from "@/features/agendamentos/types/agendamentos-api.types";
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.test.ts:14:const detail: AgendamentoDetail = {
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.test.ts:69:describe("agendamento edit payload", () => {
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.test.ts:72:      agendamentoToEditFormValues(
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.test.ts:96:      agendamentoToEditFormValues(
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.test.ts:101:      toUpdateAgendamentoPayload(
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.test.ts:129:      agendamentoToEditFormValues(
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.test.ts:134:      toUpdateAgendamentoPayload({
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.test.ts:146:      toUpdateAgendamentoPayload(
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.test.ts:147:        agendamentoToEditFormValues(
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.ts:4:  agendamentoCreateFormSchema,
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.ts:5:  type AgendamentoCreateFormValues,
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.ts:6:} from "@/features/agendamentos/forms/agendamento-create-form.schema";
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.ts:8:  AgendamentoDetail,
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.ts:9:  UpdateAgendamentoPayload,
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.ts:10:} from "@/features/agendamentos/types/agendamentos-api.types";
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.ts:12:export type AgendamentoEditFormValues =
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.ts:13:  AgendamentoCreateFormValues;
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.ts:15:export function agendamentoToEditFormValues(
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.ts:16:  agendamento: AgendamentoDetail,
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.ts:17:): AgendamentoEditFormValues {
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.ts:21:        agendamento.clienteId,
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.ts:23:        agendamento.profissionalId,
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.ts:25:        agendamento.servicoId,
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.ts:27:        agendamento.unidadeId,
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.ts:32:        agendamento.dataHoraInicio,
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.ts:39:        agendamento.dataHoraFim,
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.ts:45:      agendamento.observacoes ?? "",
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.ts:49:export function toUpdateAgendamentoPayload(
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.ts:50:  values: AgendamentoEditFormValues,
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.ts:51:): UpdateAgendamentoPayload {
beauty-core-ui/src/features/agendamentos/forms/agendamento-edit-payload.ts:53:    agendamentoCreateFormSchema.parse(
beauty-core-ui/src/features/agendamentos/hooks/use-agenda-url-state.ts:13:import type { AgendaUrlState } from "@/features/agendamentos/types/agendamentos-types";
beauty-core-ui/src/features/agendamentos/hooks/use-agenda-url-state.ts:15:  buildAgendaSearchParams,
beauty-core-ui/src/features/agendamentos/hooks/use-agenda-url-state.ts:16:  parseAgendaUrlState,
beauty-core-ui/src/features/agendamentos/hooks/use-agenda-url-state.ts:17:} from "@/features/agendamentos/utils/agenda-url";
beauty-core-ui/src/features/agendamentos/hooks/use-agenda-url-state.ts:19:export function useAgendaUrlState() {
beauty-core-ui/src/features/agendamentos/hooks/use-agenda-url-state.ts:26:      parseAgendaUrlState(
beauty-core-ui/src/features/agendamentos/hooks/use-agenda-url-state.ts:33:    (nextState: AgendaUrlState) => {
beauty-core-ui/src/features/agendamentos/hooks/use-agenda-url-state.ts:35:        buildAgendaSearchParams(
beauty-core-ui/src/features/agendamentos/hooks/use-agenda-url-state.ts:56:      patch: Partial<AgendaUrlState>,
beauty-core-ui/src/features/agendamentos/permissions/agendamentos-permissions.ts:3:const AGENDA_OPERATION_ROLES = [
beauty-core-ui/src/features/agendamentos/permissions/agendamentos-permissions.ts:10:function hasAgendaOperationRole(
beauty-core-ui/src/features/agendamentos/permissions/agendamentos-permissions.ts:17:  return AGENDA_OPERATION_ROLES.some(
beauty-core-ui/src/features/agendamentos/permissions/agendamentos-permissions.ts:25:  return hasAgendaOperationRole(role);
beauty-core-ui/src/features/agendamentos/permissions/agendamentos-permissions.ts:28:export function canCreateAppointment(
beauty-core-ui/src/features/agendamentos/permissions/agendamentos-permissions.ts:31:  return hasAgendaOperationRole(role);
beauty-core-ui/src/features/agendamentos/permissions/agendamentos-permissions.ts:34:export function canEditAppointment(
beauty-core-ui/src/features/agendamentos/permissions/agendamentos-permissions.ts:37:  return hasAgendaOperationRole(role);
beauty-core-ui/src/features/agendamentos/permissions/agendamentos-permissions.ts:40:export function canRescheduleAppointment(
beauty-core-ui/src/features/agendamentos/permissions/agendamentos-permissions.ts:43:  return hasAgendaOperationRole(role);
beauty-core-ui/src/features/agendamentos/permissions/agendamentos-permissions.ts:46:export function canCancelAppointment(
beauty-core-ui/src/features/agendamentos/permissions/agendamentos-permissions.ts:49:  return hasAgendaOperationRole(role);
beauty-core-ui/src/features/agendamentos/permissions/agendamentos-permissions.ts:52:export function canChangeAppointmentStatus(
beauty-core-ui/src/features/agendamentos/permissions/agendamentos-permissions.ts:55:  return hasAgendaOperationRole(role);
beauty-core-ui/src/features/agendamentos/queries/agendamentos-keys.ts:1:import type { AgendaQueryFilters } from "@/features/agendamentos/types/agendamentos-types";
beauty-core-ui/src/features/agendamentos/queries/agendamentos-keys.ts:3:export const agendamentosKeys = {
beauty-core-ui/src/features/agendamentos/queries/agendamentos-keys.ts:4:  all: ["agendamentos"] as const,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-keys.ts:6:  lists: () => [...agendamentosKeys.all, "list"] as const,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-keys.ts:8:  list: (filters: AgendaQueryFilters) =>
beauty-core-ui/src/features/agendamentos/queries/agendamentos-keys.ts:9:    [...agendamentosKeys.lists(), filters] as const,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-keys.ts:11:  calendars: () => [...agendamentosKeys.all, "calendar"] as const,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-keys.ts:14:    range: Pick<AgendaQueryFilters, "dataInicio" | "dataFim">,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-keys.ts:16:      AgendaQueryFilters,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-keys.ts:20:    [...agendamentosKeys.calendars(), range, filters] as const,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-keys.ts:22:  details: () => [...agendamentosKeys.all, "detail"] as const,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-keys.ts:25:    [...agendamentosKeys.details(), id] as const,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-options-query-options.ts:3:import { agendamentosKeys } from "@/features/agendamentos/queries/agendamentos-keys";
beauty-core-ui/src/features/agendamentos/queries/agendamentos-options-query-options.ts:5:  getAgendaClienteOptions,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-options-query-options.ts:6:  getAgendaProfissionalOptions,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-options-query-options.ts:7:  getAgendaServicoOptions,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-options-query-options.ts:8:  getAgendaUnidadeOptions,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-options-query-options.ts:9:} from "@/features/agendamentos/services/agendamentos-options-api";
beauty-core-ui/src/features/agendamentos/queries/agendamentos-options-query-options.ts:11:export const AGENDA_OPTIONS_STALE_TIME =
beauty-core-ui/src/features/agendamentos/queries/agendamentos-options-query-options.ts:14:export const agendamentosOptionsQueryOptions = {
beauty-core-ui/src/features/agendamentos/queries/agendamentos-options-query-options.ts:18:        ...agendamentosKeys.all,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-options-query-options.ts:24:        getAgendaClienteOptions(search),
beauty-core-ui/src/features/agendamentos/queries/agendamentos-options-query-options.ts:25:      staleTime: AGENDA_OPTIONS_STALE_TIME,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-options-query-options.ts:31:        ...agendamentosKeys.all,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-options-query-options.ts:35:      queryFn: getAgendaServicoOptions,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-options-query-options.ts:36:      staleTime: AGENDA_OPTIONS_STALE_TIME,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-options-query-options.ts:42:        ...agendamentosKeys.all,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-options-query-options.ts:48:        getAgendaProfissionalOptions(search),
beauty-core-ui/src/features/agendamentos/queries/agendamentos-options-query-options.ts:49:      staleTime: AGENDA_OPTIONS_STALE_TIME,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-options-query-options.ts:55:        ...agendamentosKeys.all,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-options-query-options.ts:61:        getAgendaUnidadeOptions(search),
beauty-core-ui/src/features/agendamentos/queries/agendamentos-options-query-options.ts:62:      staleTime: AGENDA_OPTIONS_STALE_TIME,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.test.ts:8:  AGENDAMENTOS_STALE_TIME,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.test.ts:9:  agendamentosQueryOptions,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.test.ts:10:} from "@/features/agendamentos/queries/agendamentos-query-options";
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.test.ts:11:import { agendamentosKeys } from "@/features/agendamentos/queries/agendamentos-keys";
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.test.ts:13:describe("agendamentos query options", () => {
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.test.ts:20:      agendamentosQueryOptions.list(
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.test.ts:26:      agendamentosKeys.list(filters),
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.test.ts:33:      AGENDAMENTOS_STALE_TIME.list,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.test.ts:51:      agendamentosQueryOptions.calendar(
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.test.ts:58:      agendamentosKeys.calendar(
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.test.ts:68:      AGENDAMENTOS_STALE_TIME.calendar,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.test.ts:74:      agendamentosQueryOptions.detail(
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.test.ts:88:      AGENDAMENTOS_STALE_TIME.detail,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.ts:6:import { agendamentosKeys } from "@/features/agendamentos/queries/agendamentos-keys";
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.ts:7:import { agendamentosApi } from "@/features/agendamentos/services/agendamentos-api";
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.ts:9:  AgendaQueryFilters,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.ts:10:} from "@/features/agendamentos/types/agendamentos-types";
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.ts:12:export const AGENDAMENTOS_STALE_TIME = {
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.ts:19:  AgendaQueryFilters,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.ts:24:  AgendaQueryFilters,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.ts:28:export const agendamentosQueryOptions = {
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.ts:30:    filters: AgendaQueryFilters,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.ts:35:        agendamentosKeys.list(filters),
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.ts:37:        agendamentosApi.list(filters),
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.ts:40:        AGENDAMENTOS_STALE_TIME.list,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.ts:50:    const requestFilters: AgendaQueryFilters = {
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.ts:61:        agendamentosKeys.calendar(
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.ts:66:        agendamentosApi.list(
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.ts:71:        AGENDAMENTOS_STALE_TIME.calendar,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.ts:78:    agendamentoId: string,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.ts:83:        agendamentosKeys.detail(
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.ts:84:          agendamentoId,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.ts:87:        agendamentosApi.detail(
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.ts:88:          agendamentoId,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.ts:92:        agendamentoId.length > 0,
beauty-core-ui/src/features/agendamentos/queries/agendamentos-query-options.ts:94:        AGENDAMENTOS_STALE_TIME.detail,
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:3:import { agendamentoStatusSchema } from "@/features/agendamentos/schemas/agendamentos-schemas";
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:5:const agendaOrderBySchema = z.enum([
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:13:const agendaOrderDirectionSchema = z.enum([
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:18:export const agendamentosListParamsSchema =
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:34:      agendaOrderBySchema.default(
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:39:      agendaOrderDirectionSchema.default(
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:54:      agendamentoStatusSchema.optional(),
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:66:export const agendamentoListClienteSchema =
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:75:export const agendamentoListProfissionalSchema =
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:81:export const agendamentoListServicoSchema =
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:94:export const agendamentoListUnidadeSchema =
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:100:export const agendamentoListItemSchema =
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:117:      agendamentoStatusSchema,
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:125:      agendamentoListClienteSchema,
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:127:      agendamentoListProfissionalSchema,
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:129:      agendamentoListServicoSchema,
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:131:      agendamentoListUnidadeSchema,
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:134:export const agendamentoDetailSchema =
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:135:  agendamentoListItemSchema.extend({
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:137:      agendamentoListClienteSchema.extend(
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:146:      agendamentoListProfissionalSchema.extend(
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:155:export const agendamentosPaginationMetaSchema =
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:178:export const agendamentosListResponseSchema =
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:181:      agendamentoListItemSchema,
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:184:      agendamentosPaginationMetaSchema,
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:187:export const agendamentoMutationResultSchema =
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-api.schemas.ts:204:      agendamentoStatusSchema,
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-options.schemas.ts:3:export const agendaLookupOptionSchema = z.object({
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-options.schemas.ts:8:export const agendaLookupOptionsSchema = z.array(
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-options.schemas.ts:9:  agendaLookupOptionSchema,
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-schemas.ts:4:  AGENDAMENTO_STATUSES,
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-schemas.ts:5:  AGENDA_VIEWS,
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-schemas.ts:6:} from "@/features/agendamentos/types/agendamentos-types";
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-schemas.ts:8:export const agendamentoStatusSchema = z.enum(AGENDAMENTO_STATUSES);
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-schemas.ts:10:export const agendaViewSchema = z.enum(AGENDA_VIEWS);
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-schemas.ts:12:export const agendaDateKeySchema = z
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-schemas.ts:14:  .regex(/^\d{4}-\d{2}-\d{2}$/, "Data da agenda inv\u00e1lida.");
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-schemas.ts:16:export const agendaUrlStateSchema = z.object({
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-schemas.ts:17:  view: agendaViewSchema,
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-schemas.ts:18:  date: agendaDateKeySchema,
beauty-core-ui/src/features/agendamentos/schemas/agendamentos-schemas.ts:19:  status: agendamentoStatusSchema.optional(),
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.test.ts:10:  buildAgendamentosRequestParams,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.test.ts:11:  getAgendamentoById,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.test.ts:12:  getAgendamentos,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.test.ts:13:} from "@/features/agendamentos/services/agendamentos-api";
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.test.ts:30:  agendamento:
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.test.ts:43:  id: ids.agendamento,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.test.ts:79:describe("agendamentos api", () => {
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.test.ts:92:      buildAgendamentosRequestParams({
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.test.ts:124:  it("lista agendamentos pelo endpoint real", async () => {
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.test.ts:140:      await getAgendamentos();
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.test.ts:143:      "/agendamentos",
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.test.ts:182:      await getAgendamentoById(
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.test.ts:183:        ids.agendamento,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.test.ts:187:      `/agendamentos/${ids.agendamento}`,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.test.ts:191:      ids.agendamento,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:2:  agendamentoDetailSchema,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:3:  agendamentoMutationResultSchema,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:4:  agendamentosListParamsSchema,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:5:  agendamentosListResponseSchema,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:6:} from "@/features/agendamentos/schemas/agendamentos-api.schemas";
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:8:  AgendamentoDetail,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:9:  AgendamentoMutationResult,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:10:  AgendamentosListParams,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:11:  AgendamentosListResponse,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:12:  CreateAgendamentoPayload,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:13:  UpdateAgendamentoPayload,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:14:} from "@/features/agendamentos/types/agendamentos-api.types";
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:15:import type { AgendamentoStatus } from "@/features/agendamentos/types/agendamentos-types";
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:18:export function buildAgendamentosRequestParams(
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:19:  params: AgendamentosListParams = {},
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:22:    agendamentosListParamsSchema.parse(
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:83:export async function getAgendamentos(
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:84:  params: AgendamentosListParams = {},
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:85:): Promise<AgendamentosListResponse> {
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:88:      "/agendamentos",
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:91:          buildAgendamentosRequestParams(
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:97:  return agendamentosListResponseSchema.parse(
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:102:export async function getAgendamentoById(
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:103:  agendamentoId: string,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:104:): Promise<AgendamentoDetail> {
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:107:      `/agendamentos/${agendamentoId}`,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:110:  return agendamentoDetailSchema.parse(
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:115:export async function createAgendamento(
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:116:  payload: CreateAgendamentoPayload,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:117:): Promise<AgendamentoMutationResult> {
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:120:      "/agendamentos",
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:124:  return agendamentoMutationResultSchema.parse(
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:129:export async function updateAgendamento(
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:130:  agendamentoId: string,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:131:  payload: UpdateAgendamentoPayload,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:132:): Promise<AgendamentoDetail> {
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:135:      `/agendamentos/${agendamentoId}`,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:139:  return agendamentoDetailSchema.parse(
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:144:export async function changeAgendamentoStatus(
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:145:  agendamentoId: string,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:146:  status: AgendamentoStatus,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:147:): Promise<AgendamentoDetail> {
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:148:  return updateAgendamento(
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:149:    agendamentoId,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:156:export async function cancelAgendamento(
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:157:  agendamentoId: string,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:158:): Promise<AgendamentoDetail> {
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:161:      `/agendamentos/${agendamentoId}/cancelar`,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:164:  return agendamentoDetailSchema.parse(
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:169:export const agendamentosApi = {
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:170:  list: getAgendamentos,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:171:  detail: getAgendamentoById,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:172:  create: createAgendamento,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:173:  update: updateAgendamento,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:175:    changeAgendamentoStatus,
beauty-core-ui/src/features/agendamentos/services/agendamentos-api.ts:176:  cancel: cancelAgendamento,
beauty-core-ui/src/features/agendamentos/services/agendamentos-create-api.test.ts:9:import { createAgendamento } from "@/features/agendamentos/services/agendamentos-api";
beauty-core-ui/src/features/agendamentos/services/agendamentos-create-api.test.ts:50:describe("agendamentos create api", () => {
beauty-core-ui/src/features/agendamentos/services/agendamentos-create-api.test.ts:51:  it("usa POST /agendamentos com payload sem empresa", async () => {
beauty-core-ui/src/features/agendamentos/services/agendamentos-create-api.test.ts:69:      await createAgendamento(
beauty-core-ui/src/features/agendamentos/services/agendamentos-create-api.test.ts:76:      "/agendamentos",
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.test.ts:10:  getAgendaClienteOptions,
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.test.ts:11:  getAgendaProfissionalOptions,
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.test.ts:12:  getAgendaServicoOptions,
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.test.ts:13:  getAgendaUnidadeOptions,
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.test.ts:14:} from "@/features/agendamentos/services/agendamentos-options-api";
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.test.ts:43:describe("agendamentos options api", () => {
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.test.ts:71:      await getAgendaClienteOptions(
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.test.ts:109:      await getAgendaServicoOptions(),
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.test.ts:130:      await getAgendaProfissionalOptions(
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.test.ts:137:      "/agendamentos/opcoes/profissionais",
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.test.ts:164:      await getAgendaUnidadeOptions("");
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.test.ts:169:      "/agendamentos/opcoes/unidades",
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.ts:1:import { agendaLookupOptionsSchema } from "@/features/agendamentos/schemas/agendamentos-options.schemas";
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.ts:2:import type { AgendaOption } from "@/features/agendamentos/types/agendamentos-options.types";
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.ts:11:export async function getAgendaClienteOptions(
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.ts:13:): Promise<AgendaOption[]> {
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.ts:38:export async function getAgendaServicoOptions(): Promise<
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.ts:39:  AgendaOption[]
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.ts:52:export async function getAgendaProfissionalOptions(
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.ts:54:): Promise<AgendaOption[]> {
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.ts:59:      "/agendamentos/opcoes/profissionais",
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.ts:70:    agendaLookupOptionsSchema.parse(
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.ts:80:export async function getAgendaUnidadeOptions(
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.ts:82:): Promise<AgendaOption[]> {
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.ts:87:      "/agendamentos/opcoes/unidades",
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.ts:98:    agendaLookupOptionsSchema.parse(
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.ts:108:export const agendamentosOptionsApi = {
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.ts:109:  clientes: getAgendaClienteOptions,
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.ts:110:  servicos: getAgendaServicoOptions,
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.ts:111:  profissionais: getAgendaProfissionalOptions,
beauty-core-ui/src/features/agendamentos/services/agendamentos-options-api.ts:112:  unidades: getAgendaUnidadeOptions,
beauty-core-ui/src/features/agendamentos/services/agendamentos-status-api.test.ts:10:  cancelAgendamento,
beauty-core-ui/src/features/agendamentos/services/agendamentos-status-api.test.ts:11:  changeAgendamentoStatus,
beauty-core-ui/src/features/agendamentos/services/agendamentos-status-api.test.ts:12:} from "@/features/agendamentos/services/agendamentos-api";
beauty-core-ui/src/features/agendamentos/services/agendamentos-status-api.test.ts:97:describe("agendamentos status api", () => {
beauty-core-ui/src/features/agendamentos/services/agendamentos-status-api.test.ts:98:  it("altera status via PATCH /agendamentos/:id", async () => {
beauty-core-ui/src/features/agendamentos/services/agendamentos-status-api.test.ts:104:      await changeAgendamentoStatus(
beauty-core-ui/src/features/agendamentos/services/agendamentos-status-api.test.ts:112:      `/agendamentos/${id}`,
beauty-core-ui/src/features/agendamentos/services/agendamentos-status-api.test.ts:140:      await cancelAgendamento(
beauty-core-ui/src/features/agendamentos/services/agendamentos-status-api.test.ts:147:      `/agendamentos/${id}/cancelar`,
beauty-core-ui/src/features/agendamentos/services/agendamentos-update-api.test.ts:9:import { updateAgendamento } from "@/features/agendamentos/services/agendamentos-api";
beauty-core-ui/src/features/agendamentos/services/agendamentos-update-api.test.ts:55:describe("agendamentos update api", () => {
beauty-core-ui/src/features/agendamentos/services/agendamentos-update-api.test.ts:56:  it("usa PATCH /agendamentos/:id sem empresaId e sem status", async () => {
beauty-core-ui/src/features/agendamentos/services/agendamentos-update-api.test.ts:103:      await updateAgendamento(
beauty-core-ui/src/features/agendamentos/services/agendamentos-update-api.test.ts:111:      `/agendamentos/${id}`,
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:2:  AgendaQueryFilters,
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:3:  AgendamentoStatus,
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:4:} from "@/features/agendamentos/types/agendamentos-types";
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:6:export type AgendamentoListCliente = {
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:12:export type AgendamentoListProfissional = {
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:17:export type AgendamentoListServico = {
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:24:export type AgendamentoListUnidade = {
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:29:export type AgendamentoListItem = {
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:38:  status: AgendamentoStatus;
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:41:  cliente: AgendamentoListCliente;
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:42:  profissional: AgendamentoListProfissional;
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:43:  servico: AgendamentoListServico;
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:44:  unidade: AgendamentoListUnidade;
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:47:export type AgendamentoDetail = Omit<
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:48:  AgendamentoListItem,
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:51:  cliente: AgendamentoListCliente & {
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:55:  profissional: AgendamentoListProfissional & {
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:60:export type AgendamentosPaginationMeta = {
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:67:export type AgendamentosListResponse = {
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:68:  data: AgendamentoListItem[];
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:69:  meta: AgendamentosPaginationMeta;
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:72:export type AgendamentosListParams =
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:73:  AgendaQueryFilters;
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:75:export type CreateAgendamentoPayload = {
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:83:  status?: AgendamentoStatus;
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:86:export type UpdateAgendamentoPayload =
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:87:  Partial<CreateAgendamentoPayload>;
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:89:export type AgendamentoMutationResult = {
beauty-core-ui/src/features/agendamentos/types/agendamentos-api.types.ts:98:  status: AgendamentoStatus;
beauty-core-ui/src/features/agendamentos/types/agendamentos-options.types.ts:1:export type AgendaOption = {
beauty-core-ui/src/features/agendamentos/types/agendamentos-options.types.ts:7:export type AgendaRelatedField =
beauty-core-ui/src/features/agendamentos/types/agendamentos-options.types.ts:13:export type AgendaRelatedValues = Partial<
beauty-core-ui/src/features/agendamentos/types/agendamentos-options.types.ts:14:  Record<AgendaRelatedField, string>
beauty-core-ui/src/features/agendamentos/types/agendamentos-types.ts:1:export const AGENDAMENTO_STATUSES = [
beauty-core-ui/src/features/agendamentos/types/agendamentos-types.ts:10:export type AgendamentoStatus = (typeof AGENDAMENTO_STATUSES)[number];
beauty-core-ui/src/features/agendamentos/types/agendamentos-types.ts:12:export const AGENDA_VIEWS = ["day", "week", "list"] as const;
beauty-core-ui/src/features/agendamentos/types/agendamentos-types.ts:14:export type AgendaView = (typeof AGENDA_VIEWS)[number];
beauty-core-ui/src/features/agendamentos/types/agendamentos-types.ts:16:export type AgendaOrderBy =
beauty-core-ui/src/features/agendamentos/types/agendamentos-types.ts:23:export type AgendaOrderDirection = "asc" | "desc";
beauty-core-ui/src/features/agendamentos/types/agendamentos-types.ts:25:export type AgendaQueryFilters = {
beauty-core-ui/src/features/agendamentos/types/agendamentos-types.ts:28:  orderBy?: AgendaOrderBy;
beauty-core-ui/src/features/agendamentos/types/agendamentos-types.ts:29:  orderDirection?: AgendaOrderDirection;
beauty-core-ui/src/features/agendamentos/types/agendamentos-types.ts:32:  status?: AgendamentoStatus;
beauty-core-ui/src/features/agendamentos/types/agendamentos-types.ts:39:export type AgendaUrlState = {
beauty-core-ui/src/features/agendamentos/types/agendamentos-types.ts:40:  view: AgendaView;
beauty-core-ui/src/features/agendamentos/types/agendamentos-types.ts:42:  status?: AgendamentoStatus;
beauty-core-ui/src/features/agendamentos/types/agendamentos-types.ts:49:export type AgendamentoResumo = {
beauty-core-ui/src/features/agendamentos/types/agendamentos-types.ts:57:  status: AgendamentoStatus;
beauty-core-ui/src/features/agendamentos/types/agendamentos-types.ts:63:export type AgendamentoCliente = {
beauty-core-ui/src/features/agendamentos/types/agendamentos-types.ts:70:export type AgendamentoProfissional = {
beauty-core-ui/src/features/agendamentos/types/agendamentos-types.ts:76:export type AgendamentoServico = {
beauty-core-ui/src/features/agendamentos/types/agendamentos-types.ts:83:export type AgendamentoUnidade = {
beauty-core-ui/src/features/agendamentos/types/agendamentos-types.ts:88:export type AgendamentoDetalhe = AgendamentoResumo & {
beauty-core-ui/src/features/agendamentos/types/agendamentos-types.ts:89:  cliente?: AgendamentoCliente | null;
beauty-core-ui/src/features/agendamentos/types/agendamentos-types.ts:90:  profissional?: AgendamentoProfissional | null;
beauty-core-ui/src/features/agendamentos/types/agendamentos-types.ts:91:  servico?: AgendamentoServico | null;
beauty-core-ui/src/features/agendamentos/types/agendamentos-types.ts:92:  unidade?: AgendamentoUnidade | null;
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.test.ts:7:import type { AgendamentoListItem } from "@/features/agendamentos/types/agendamentos-api.types";
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.test.ts:9:  buildAgendaEventAccessibleName,
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.test.ts:10:  getAgendaCalendarDays,
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.test.ts:11:  groupAgendaEventsByDate,
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.test.ts:12:  shiftAgendaCalendarDate,
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.test.ts:13:} from "@/features/agendamentos/utils/agenda-calendar";
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.test.ts:15:function appointment(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.test.ts:18:): AgendamentoListItem {
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.test.ts:65:describe("agenda calendar utils", () => {
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.test.ts:68:      getAgendaCalendarDays(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.test.ts:80:      getAgendaCalendarDays(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.test.ts:96:      shiftAgendaCalendarDate(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.test.ts:108:      shiftAgendaCalendarDate(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.test.ts:120:      appointment(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.test.ts:126:      appointment(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.test.ts:132:      groupAgendaEventsByDate([
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.test.ts:153:      appointment(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.test.ts:159:      buildAgendaEventAccessibleName(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:10:import type { AgendamentoListItem } from "@/features/agendamentos/types/agendamentos-api.types";
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:12:export type AgendaCalendarMode =
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:16:export const AGENDA_CALENDAR_MODES = [
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:19:] as const satisfies readonly AgendaCalendarMode[];
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:21:export function agendaDateKey(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:30:export function parseAgendaCalendarDate(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:36:export function getAgendaCalendarDays(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:38:  mode: AgendaCalendarMode,
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:41:    parseAgendaCalendarDate(dateKey);
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:68:export function shiftAgendaCalendarDate(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:70:  mode: AgendaCalendarMode,
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:74:    parseAgendaCalendarDate(dateKey);
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:87:  return agendaDateKey(shifted);
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:90:export function formatAgendaPeriodLabel(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:92:  mode: AgendaCalendarMode,
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:95:    getAgendaCalendarDays(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:152:export function formatAgendaDayHeading(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:164:export function formatAgendaEventTime(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:173:export function agendaEventDateKey(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:174:  item: AgendamentoListItem,
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:176:  return agendaDateKey(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:183:export function sortAgendaEvents(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:184:  items: readonly AgendamentoListItem[],
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:185:): AgendamentoListItem[] {
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:202:export function groupAgendaEventsByDate(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:203:  items: readonly AgendamentoListItem[],
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:206:  AgendamentoListItem[]
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:211:      AgendamentoListItem[]
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:214:  for (const item of sortAgendaEvents(items)) {
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:216:      agendaEventDateKey(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:234:export function formatAgendaStatusLabel(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:235:  status: AgendamentoListItem["status"],
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:253:export function buildAgendaEventAccessibleName(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:254:  item: AgendamentoListItem,
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:257:    formatAgendaEventTime(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:262:    formatAgendaEventTime(
beauty-core-ui/src/features/agendamentos/utils/agenda-calendar.ts:272:    formatAgendaStatusLabel(
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.test.ts:8:  buildAgendaOperationalQuery,
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.test.ts:9:  getAgendaActiveFilterCount,
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.test.ts:10:  hasAgendaOperationalFilters,
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.test.ts:11:} from "@/features/agendamentos/utils/agenda-filters";
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.test.ts:13:  buildAgendaSearchParams,
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.test.ts:14:  parseAgendaUrlState,
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.test.ts:15:} from "@/features/agendamentos/utils/agenda-url";
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.test.ts:28:describe("agenda filters e URL state", () => {
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.test.ts:31:      getAgendaActiveFilterCount({
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.test.ts:44:      hasAgendaOperationalFilters({
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.test.ts:57:      buildAgendaOperationalQuery({
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.test.ts:81:      buildAgendaSearchParams({
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.test.ts:93:      parseAgendaUrlState(
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.ts:2:  AgendaQueryFilters,
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.ts:3:  AgendaUrlState,
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.ts:4:} from "@/features/agendamentos/types/agendamentos-types";
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.ts:6:export type AgendaOperationalFilters = Pick<
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.ts:7:  AgendaUrlState,
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.ts:15:export function agendaUrlStateToFilters(
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.ts:16:  state: AgendaUrlState,
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.ts:17:): AgendaOperationalFilters {
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.ts:27:export function getAgendaActiveFilterCount(
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.ts:28:  filters: AgendaOperationalFilters,
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.ts:39:export function hasAgendaOperationalFilters(
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.ts:40:  filters: AgendaOperationalFilters,
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.ts:42:  return getAgendaActiveFilterCount(filters) > 0;
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.ts:45:export function buildAgendaOperationalQuery(
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.ts:46:  filters: AgendaOperationalFilters,
beauty-core-ui/src/features/agendamentos/utils/agenda-filters.ts:47:): AgendaQueryFilters {
beauty-core-ui/src/features/agendamentos/utils/agenda-url.ts:2:  agendaViewSchema,
beauty-core-ui/src/features/agendamentos/utils/agenda-url.ts:3:  agendamentoStatusSchema,
beauty-core-ui/src/features/agendamentos/utils/agenda-url.ts:4:} from "@/features/agendamentos/schemas/agendamentos-schemas";
beauty-core-ui/src/features/agendamentos/utils/agenda-url.ts:6:  AgendaUrlState,
beauty-core-ui/src/features/agendamentos/utils/agenda-url.ts:7:  AgendaView,
beauty-core-ui/src/features/agendamentos/utils/agenda-url.ts:8:} from "@/features/agendamentos/types/agendamentos-types";
beauty-core-ui/src/features/agendamentos/utils/agenda-url.ts:10:  formatAgendaDateKey,
beauty-core-ui/src/features/agendamentos/utils/agenda-url.ts:11:  parseAgendaDateKey,
beauty-core-ui/src/features/agendamentos/utils/agenda-url.ts:12:} from "@/features/agendamentos/utils/agendamentos-date";
beauty-core-ui/src/features/agendamentos/utils/agenda-url.ts:33:export function getDefaultAgendaDate(): string {
beauty-core-ui/src/features/agendamentos/utils/agenda-url.ts:34:  return formatAgendaDateKey(new Date());
beauty-core-ui/src/features/agendamentos/utils/agenda-url.ts:37:export function parseAgendaUrlState(
beauty-core-ui/src/features/agendamentos/utils/agenda-url.ts:39:  fallbackDate = getDefaultAgendaDate(),
beauty-core-ui/src/features/agendamentos/utils/agenda-url.ts:40:): AgendaUrlState {
beauty-core-ui/src/features/agendamentos/utils/agenda-url.ts:42:  const parsedView = agendaViewSchema.safeParse(rawView);
beauty-core-ui/src/features/agendamentos/utils/agenda-url.ts:44:  const view: AgendaView =
beauty-core-ui/src/features/agendamentos/utils/agenda-url.ts:52:    rawDate && parseAgendaDateKey(rawDate)
beauty-core-ui/src/features/agendamentos/utils/agenda-url.ts:58:    agendamentoStatusSchema.safeParse(rawStatus);
beauty-core-ui/src/features/agendamentos/utils/agenda-url.ts:86:export function buildAgendaSearchParams(
beauty-core-ui/src/features/agendamentos/utils/agenda-url.ts:87:  state: AgendaUrlState,
beauty-core-ui/src/features/agendamentos/utils/agendamentos-date.ts:15:import type { AgendaView } from "@/features/agendamentos/types/agendamentos-types";
beauty-core-ui/src/features/agendamentos/utils/agendamentos-date.ts:19:export function formatAgendaDateKey(date: Date): string {
beauty-core-ui/src/features/agendamentos/utils/agendamentos-date.ts:23:export function parseAgendaDateKey(value: string): Date | null {
beauty-core-ui/src/features/agendamentos/utils/agendamentos-date.ts:34:  if (formatAgendaDateKey(parsed) !== value) {
beauty-core-ui/src/features/agendamentos/utils/agendamentos-date.ts:41:export function formatAppointmentDate(value: string): string {
beauty-core-ui/src/features/agendamentos/utils/agendamentos-date.ts:51:export function formatAppointmentTime(value: string): string {
beauty-core-ui/src/features/agendamentos/utils/agendamentos-date.ts:55:export function formatAppointmentRange(
beauty-core-ui/src/features/agendamentos/utils/agendamentos-date.ts:59:  return `${formatAppointmentTime(start)}-${formatAppointmentTime(end)}`;
beauty-core-ui/src/features/agendamentos/utils/agendamentos-date.ts:77:export function getAgendaRange(
beauty-core-ui/src/features/agendamentos/utils/agendamentos-date.ts:79:  view: AgendaView,
beauty-core-ui/src/features/agendamentos/utils/agendamentos-date.ts:84:  const selectedDate = parseAgendaDateKey(dateKey);
beauty-core-ui/src/features/agendamentos/utils/agendamentos-date.ts:87:    throw new Error("Data da agenda inv\u00e1lida.");
beauty-core-ui/src/features/agendamentos/utils/agendamentos-date.ts:108:export function shiftAgendaDate(
beauty-core-ui/src/features/agendamentos/utils/agendamentos-date.ts:110:  view: AgendaView,
beauty-core-ui/src/features/agendamentos/utils/agendamentos-date.ts:113:  const selectedDate = parseAgendaDateKey(dateKey);
beauty-core-ui/src/features/agendamentos/utils/agendamentos-date.ts:116:    throw new Error("Data da agenda inv\u00e1lida.");
beauty-core-ui/src/features/agendamentos/utils/agendamentos-date.ts:124:  return formatAgendaDateKey(shifted);
beauty-core-ui/src/features/agendamentos/utils/agendamentos-status.ts:1:import type { AgendamentoStatus } from "@/features/agendamentos/types/agendamentos-types";
beauty-core-ui/src/features/agendamentos/utils/agendamentos-status.ts:3:export type AgendamentoStatusTone =
beauty-core-ui/src/features/agendamentos/utils/agendamentos-status.ts:10:type AgendamentoStatusMeta = {
beauty-core-ui/src/features/agendamentos/utils/agendamentos-status.ts:12:  tone: AgendamentoStatusTone;
beauty-core-ui/src/features/agendamentos/utils/agendamentos-status.ts:15:export const AGENDAMENTO_STATUS_META: Record<
beauty-core-ui/src/features/agendamentos/utils/agendamentos-status.ts:16:  AgendamentoStatus,
beauty-core-ui/src/features/agendamentos/utils/agendamentos-status.ts:17:  AgendamentoStatusMeta
beauty-core-ui/src/features/agendamentos/utils/agendamentos-status.ts:45:export function getAgendamentoStatusMeta(
beauty-core-ui/src/features/agendamentos/utils/agendamentos-status.ts:46:  status: AgendamentoStatus,
beauty-core-ui/src/features/agendamentos/utils/agendamentos-status.ts:47:): AgendamentoStatusMeta {
beauty-core-ui/src/features/agendamentos/utils/agendamentos-status.ts:48:  return AGENDAMENTO_STATUS_META[status];
beauty-core-ui/src/features/auth/navigation/admin-login-navigation-state.test.ts:9:  consumePendingAdminIntentionalLogout,
beauty-core-ui/src/features/auth/navigation/admin-login-navigation-state.test.ts:10:  consumePendingAdminLoginReason,
beauty-core-ui/src/features/auth/navigation/admin-login-navigation-state.test.ts:16:  consumePendingAdminIntentionalLogout();
beauty-core-ui/src/features/auth/navigation/admin-login-navigation-state.test.ts:17:  consumePendingAdminLoginReason();
beauty-core-ui/src/features/auth/navigation/admin-login-navigation-state.test.ts:27:      consumePendingAdminLoginReason(),
beauty-core-ui/src/features/auth/navigation/admin-login-navigation-state.test.ts:31:      consumePendingAdminLoginReason(),
beauty-core-ui/src/features/auth/navigation/admin-login-navigation-state.test.ts:39:      consumePendingAdminIntentionalLogout(),
beauty-core-ui/src/features/auth/navigation/admin-login-navigation-state.test.ts:43:      consumePendingAdminIntentionalLogout(),
beauty-core-ui/src/features/auth/navigation/admin-login-navigation-state.test.ts:55:      consumePendingAdminLoginReason(),
beauty-core-ui/src/features/auth/navigation/admin-login-navigation-state.test.ts:67:      consumePendingAdminLoginReason(),
beauty-core-ui/src/features/auth/navigation/admin-login-navigation-state.test.ts:71:      consumePendingAdminIntentionalLogout(),
beauty-core-ui/src/features/auth/navigation/admin-login-navigation-state.ts:20:export function consumePendingAdminLoginReason():
beauty-core-ui/src/features/auth/navigation/admin-login-navigation-state.ts:36:export function consumePendingAdminIntentionalLogout():
beauty-core-ui/src/features/auth/navigation/admin-return-to.test.ts:16:        "/agenda?view=week#segunda",
beauty-core-ui/src/features/auth/navigation/admin-return-to.test.ts:19:      "/agenda?view=week#segunda",
beauty-core-ui/src/features/auth/navigation/admin-return-to.test.ts:76:        "/agenda?view=week",
beauty-core-ui/src/features/auth/navigation/admin-return-to.test.ts:79:      "/login?returnTo=%2Fagenda%3Fview%3Dweek",
beauty-core-ui/src/features/automacoes/chat54-foundations.test.ts:35:  "AGENDAMENTO_CRIADO",
beauty-core-ui/src/features/automacoes/chat54-foundations.test.ts:36:  "AGENDAMENTO_CONFIRMADO",
beauty-core-ui/src/features/automacoes/chat54-foundations.test.ts:37:  "AGENDAMENTO_CANCELADO",
beauty-core-ui/src/features/automacoes/chat54-foundations.test.ts:38:  "AGENDAMENTO_CONCLUIDO",
beauty-core-ui/src/features/automacoes/chat54-foundations.test.ts:43:  "PACOTE_CRIADO",
beauty-core-ui/src/features/automacoes/chat54-foundations.test.ts:44:  "PACOTE_FINALIZADO",
beauty-core-ui/src/features/automacoes/chat54-foundations.test.ts:45:  "PACOTE_VENCIDO",
beauty-core-ui/src/features/automacoes/chat54-foundations.test.ts:80:        tipo: "AGENDAMENTO_CRIADO",
beauty-core-ui/src/features/automacoes/chat54-foundations.test.ts:81:        modulo: "agendamentos",
beauty-core-ui/src/features/automacoes/chat54-foundations.test.ts:95:        tipo: "AGENDAMENTO_CRIADO",
beauty-core-ui/src/features/automacoes/chat54-foundations.test.ts:96:        modulo: "agendamentos",
beauty-core-ui/src/features/automacoes/chat54-foundations.test.ts:104:        tipo: "AGENDAMENTO_CRIADO",
beauty-core-ui/src/features/automacoes/chat54-foundations.test.ts:105:        modulo: "agendamentos",
beauty-core-ui/src/features/automacoes/chat54-foundations.test.ts:116:        tipo: "AGENDAMENTO_CRIADO",
beauty-core-ui/src/features/automacoes/chat54-foundations.test.ts:117:        modulo: "agendamentos",
beauty-core-ui/src/features/automacoes/types/automacoes.types.ts:4:  "AGENDAMENTO_CRIADO",
beauty-core-ui/src/features/automacoes/types/automacoes.types.ts:5:  "AGENDAMENTO_CONFIRMADO",
beauty-core-ui/src/features/automacoes/types/automacoes.types.ts:6:  "AGENDAMENTO_CANCELADO",
beauty-core-ui/src/features/automacoes/types/automacoes.types.ts:7:  "AGENDAMENTO_CONCLUIDO",
beauty-core-ui/src/features/automacoes/types/automacoes.types.ts:12:  "PACOTE_CRIADO",
beauty-core-ui/src/features/automacoes/types/automacoes.types.ts:13:  "PACOTE_FINALIZADO",
beauty-core-ui/src/features/automacoes/types/automacoes.types.ts:14:  "PACOTE_VENCIDO",
beauty-core-ui/src/features/clientes/components/cliente-lgpd-actions.integration.test.tsx:110:  agendamentos: [],
beauty-core-ui/src/features/clientes/components/cliente-lgpd-actions.integration.test.tsx:112:  pacotes: {},
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:56:    `/fidelidade/cliente/${clienteId}`
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:65:        saldoPontos: 850,
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:76:    `/fidelidade/historico/${clienteId}`
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:99:    `/fidelidade/beneficio-disponivel/${clienteId}`
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:104:        saldoPontos: 850,
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:115:    `/fidelidade/nivel-atual/${clienteId}`
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:120:        saldoPontos: 850,
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:141:    `/clientes-pacotes/cliente/${clienteId}`
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:151:          pacoteId:
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:169:          pacote: {
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:175:              "Pacote Facial",
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:253:      "renderiza fidelidade, nivel, beneficio, historico e pacotes reais",
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:283:            "Pacote Facial",
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:300:            `/fidelidade/cliente/${clienteId}`,
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:301:            `/fidelidade/historico/${clienteId}`,
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:302:            `/fidelidade/beneficio-disponivel/${clienteId}`,
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:303:            `/fidelidade/nivel-atual/${clienteId}`,
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:304:            `/clientes-pacotes/cliente/${clienteId}`,
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:311:      "mostra empty states independentes para historico e pacotes",
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:317:                `/fidelidade/historico/${clienteId}` ||
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:319:                `/clientes-pacotes/cliente/${clienteId}`
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:342:            "Nenhum pacote vinculado",
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:349:      "permite retry somente da secao de pacotes",
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:351:        let pacoteAttempts = 0;
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:357:              `/clientes-pacotes/cliente/${clienteId}`
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:359:              pacoteAttempts += 1;
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:362:                pacoteAttempts === 1
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:366:                    "Falha nos pacotes",
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:385:                "N├úo foi poss├¡vel carregar os pacotes",
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:402:            "Pacote Facial",
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.integration.test.tsx:407:          pacoteAttempts,
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:9:  PackageCheck,
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:28:  clienteFidelidadeBeneficioQueryOptions,
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:29:  clienteFidelidadeHistoricoQueryOptions,
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:30:  clienteFidelidadeNivelQueryOptions,
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:31:  clienteFidelidadeSaldoQueryOptions,
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:32:  clientePacotesQueryOptions,
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:35:  StatusClientePacote,
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:202:function pacoteTone(
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:203:  status: StatusClientePacote,
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:224:function pacoteStatusLabel(
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:225:  status: StatusClientePacote,
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:255:  const saldoQuery = useQuery(
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:256:    clienteFidelidadeSaldoQueryOptions(
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:263:    clienteFidelidadeBeneficioQueryOptions(
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:270:    clienteFidelidadeNivelQueryOptions(
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:277:    clienteFidelidadeHistoricoQueryOptions(
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:283:  const pacotesQuery = useQuery(
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:284:    clientePacotesQueryOptions(
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:293:        title="Fidelidade"
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:294:        description="Saldo, n├¡vel e benef├¡cios calculados pelo programa de fidelidade da empresa."
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:298:            {saldoQuery.isPending ? (
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:300:            ) : saldoQuery.isError ? (
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:302:                saldoQuery.error,
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:305:                  title="Fidelidade ainda n├úo iniciada"
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:306:                  description="Este cliente ainda n├úo possui um cadastro de fidelidade dispon├¡vel."
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:310:                  title="N├úo foi poss├¡vel carregar o saldo"
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:313:                      saldoQuery.error,
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:317:                    void saldoQuery.refetch();
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:323:                label="Saldo atual"
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:325:                  saldoQuery.data
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:326:                    .saldoPontos,
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:328:                description="Pontos atualmente dispon├¡veis no cadastro de fidelidade."
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:382:                description="O saldo atual ainda n├úo corresponde a um n├¡vel de fidelidade cadastrado."
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:392:                title="Benef├¡cio indispon├¡vel"
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:426:        title="Hist├│rico de fidelidade"
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:499:        title="Pacotes"
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:500:        description="Pacotes vinculados ao cliente e controle atual das sess├Áes."
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:502:        {pacotesQuery.isPending ? (
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:504:        ) : pacotesQuery.isError ? (
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:506:            title="N├úo foi poss├¡vel carregar os pacotes"
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:509:                pacotesQuery.error,
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:513:              void pacotesQuery.refetch();
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:516:        ) : pacotesQuery.data
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:519:            title="Nenhum pacote vinculado"
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:520:            description="Este cliente ainda n├úo possui pacotes registrados."
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:524:            {pacotesQuery.data.map(
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:525:              (clientePacote) => (
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:528:                    clientePacote.id
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:535:                        <PackageCheck
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:542:                            clientePacote
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:543:                              .pacote.nome
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:548:                      {clientePacote
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:549:                        .pacote
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:553:                            clientePacote
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:554:                              .pacote
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:562:                      tone={pacoteTone(
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:563:                        clientePacote.status,
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:566:                      {pacoteStatusLabel(
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:567:                        clientePacote.status,
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:580:                          clientePacote
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:593:                          clientePacote
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:606:                          clientePacote
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:621:                          clientePacote
beauty-core-ui/src/features/clientes/components/cliente-profile-extras.tsx:634:                          clientePacote
beauty-core-ui/src/features/clientes/queries/cliente-profile-keys.test.ts:18:      "isola fidelidade por cliente",
beauty-core-ui/src/features/clientes/queries/cliente-profile-keys.test.ts:21:          clienteProfileKeys.saldo(
beauty-core-ui/src/features/clientes/queries/cliente-profile-keys.test.ts:28:          "fidelidade",
beauty-core-ui/src/features/clientes/queries/cliente-profile-keys.test.ts:29:          "saldo",
beauty-core-ui/src/features/clientes/queries/cliente-profile-keys.test.ts:35:      "isola pacotes por cliente",
beauty-core-ui/src/features/clientes/queries/cliente-profile-keys.test.ts:38:          clienteProfileKeys.pacotes(
beauty-core-ui/src/features/clientes/queries/cliente-profile-keys.test.ts:45:          "pacotes",
beauty-core-ui/src/features/clientes/queries/cliente-profile-keys.ts:15:  fidelidade: (
beauty-core-ui/src/features/clientes/queries/cliente-profile-keys.ts:22:      "fidelidade",
beauty-core-ui/src/features/clientes/queries/cliente-profile-keys.ts:25:  saldo: (
beauty-core-ui/src/features/clientes/queries/cliente-profile-keys.ts:29:      ...clienteProfileKeys.fidelidade(
beauty-core-ui/src/features/clientes/queries/cliente-profile-keys.ts:32:      "saldo",
beauty-core-ui/src/features/clientes/queries/cliente-profile-keys.ts:39:      ...clienteProfileKeys.fidelidade(
beauty-core-ui/src/features/clientes/queries/cliente-profile-keys.ts:49:      ...clienteProfileKeys.fidelidade(
beauty-core-ui/src/features/clientes/queries/cliente-profile-keys.ts:59:      ...clienteProfileKeys.fidelidade(
beauty-core-ui/src/features/clientes/queries/cliente-profile-keys.ts:65:  pacotes: (
beauty-core-ui/src/features/clientes/queries/cliente-profile-keys.ts:72:      "pacotes",
beauty-core-ui/src/features/clientes/queries/cliente-profile-query-options.test.ts:8:  clienteFidelidadeBeneficioQueryOptions,
beauty-core-ui/src/features/clientes/queries/cliente-profile-query-options.test.ts:9:  clienteFidelidadeHistoricoQueryOptions,
beauty-core-ui/src/features/clientes/queries/cliente-profile-query-options.test.ts:10:  clienteFidelidadeNivelQueryOptions,
beauty-core-ui/src/features/clientes/queries/cliente-profile-query-options.test.ts:11:  clienteFidelidadeSaldoQueryOptions,
beauty-core-ui/src/features/clientes/queries/cliente-profile-query-options.test.ts:12:  clientePacotesQueryOptions,
beauty-core-ui/src/features/clientes/queries/cliente-profile-query-options.test.ts:25:          clienteFidelidadeSaldoQueryOptions(
beauty-core-ui/src/features/clientes/queries/cliente-profile-query-options.test.ts:28:          clienteFidelidadeHistoricoQueryOptions(
beauty-core-ui/src/features/clientes/queries/cliente-profile-query-options.test.ts:31:          clienteFidelidadeBeneficioQueryOptions(
beauty-core-ui/src/features/clientes/queries/cliente-profile-query-options.test.ts:34:          clienteFidelidadeNivelQueryOptions(
beauty-core-ui/src/features/clientes/queries/cliente-profile-query-options.test.ts:37:          clientePacotesQueryOptions(
beauty-core-ui/src/features/clientes/queries/cliente-profile-query-options.test.ts:57:          clientePacotesQueryOptions(
beauty-core-ui/src/features/clientes/queries/cliente-profile-query-options.ts:15:export function clienteFidelidadeSaldoQueryOptions(
beauty-core-ui/src/features/clientes/queries/cliente-profile-query-options.ts:21:      clienteProfileKeys.saldo(
beauty-core-ui/src/features/clientes/queries/cliente-profile-query-options.ts:25:      clienteProfileExtrasApi.saldo(
beauty-core-ui/src/features/clientes/queries/cliente-profile-query-options.ts:36:export function clienteFidelidadeHistoricoQueryOptions(
beauty-core-ui/src/features/clientes/queries/cliente-profile-query-options.ts:57:export function clienteFidelidadeBeneficioQueryOptions(
beauty-core-ui/src/features/clientes/queries/cliente-profile-query-options.ts:78:export function clienteFidelidadeNivelQueryOptions(
beauty-core-ui/src/features/clientes/queries/cliente-profile-query-options.ts:99:export function clientePacotesQueryOptions(
beauty-core-ui/src/features/clientes/queries/cliente-profile-query-options.ts:105:      clienteProfileKeys.pacotes(
beauty-core-ui/src/features/clientes/queries/cliente-profile-query-options.ts:109:      clienteProfileExtrasApi.pacotes(
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts:8:  clientePacoteSchema,
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts:9:  fidelidadeBeneficioSchema,
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts:10:  fidelidadeHistoricoSchema,
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts:11:  fidelidadeNivelAtualSchema,
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts:12:  fidelidadeSaldoSchema,
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts:22:      "valida saldo real por saldoPontos",
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts:25:          fidelidadeSaldoSchema.parse({
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts:31:            saldoPontos: 250,
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts:39:          saldoPontos: 250,
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts:48:          fidelidadeHistoricoSchema.parse([
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts:71:          fidelidadeBeneficioSchema.parse({
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts:73:            saldoPontos: 250,
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts:82:          saldoPontos: 250,
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts:96:          fidelidadeNivelAtualSchema.parse({
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts:98:            saldoPontos: 20,
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts:109:          fidelidadeNivelAtualSchema.parse({
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts:111:            saldoPontos: 850,
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts:139:      "valida pacote real com relacao pacote",
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts:142:          clientePacoteSchema.parse({
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts:148:            pacoteId:
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts:168:            pacote: {
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts:174:                "Pacote Facial",
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts:194:          parsed.pacote.nome,
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts:196:          "Pacote Facial",
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.ts:10:export const fidelidadeSaldoSchema =
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.ts:13:    saldoPontos: z
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.ts:32:export const fidelidadeHistoricoSchema =
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.ts:37:export const fidelidadeBeneficioSchema =
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.ts:40:    saldoPontos: z
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.ts:55:export const nivelFidelidadeSchema =
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.ts:67:export const fidelidadeNivelAtualSchema =
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.ts:70:    saldoPontos: z
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.ts:74:      nivelFidelidadeSchema.nullable(),
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.ts:77:export const statusClientePacoteSchema =
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.ts:85:export const pacoteResumoSchema =
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.ts:102:export const clientePacoteSchema =
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.ts:106:    pacoteId: uuidSchema,
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.ts:121:      statusClientePacoteSchema,
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.ts:126:    pacote:
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.ts:127:      pacoteResumoSchema,
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.ts:130:export const clientesPacotesSchema =
beauty-core-ui/src/features/clientes/schemas/cliente-profile-extras.schemas.ts:132:    clientePacoteSchema,
beauty-core-ui/src/features/clientes/schemas/clientes-lgpd.schemas.ts:9:    agendamentos: z.array(z.unknown()),
beauty-core-ui/src/features/clientes/schemas/clientes-lgpd.schemas.ts:11:    pacotes: z.record(z.string(), z.unknown()),
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.test.ts:10:  getClienteFidelidadeBeneficio,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.test.ts:11:  getClienteFidelidadeHistorico,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.test.ts:12:  getClienteFidelidadeNivel,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.test.ts:13:  getClienteFidelidadeSaldo,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.test.ts:14:  getClientePacotes,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.test.ts:49:      "consulta saldo pelo endpoint real",
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.test.ts:54:            saldoPontos: 250,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.test.ts:58:        await getClienteFidelidadeSaldo(
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.test.ts:65:          `/fidelidade/cliente/${clienteId}`,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.test.ts:77:        await getClienteFidelidadeHistorico(
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.test.ts:84:          `/fidelidade/historico/${clienteId}`,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.test.ts:95:            saldoPontos: 250,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.test.ts:104:        await getClienteFidelidadeBeneficio(
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.test.ts:111:          `/fidelidade/beneficio-disponivel/${clienteId}`,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.test.ts:122:            saldoPontos: 250,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.test.ts:127:        await getClienteFidelidadeNivel(
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.test.ts:134:          `/fidelidade/nivel-atual/${clienteId}`,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.test.ts:140:      "consulta somente pacotes do cliente",
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.test.ts:146:        await getClientePacotes(
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.test.ts:153:          `/clientes-pacotes/cliente/${clienteId}`,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.test.ts:165:        await getClientePacotes(
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:2:  clientesPacotesSchema,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:3:  fidelidadeBeneficioSchema,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:4:  fidelidadeHistoricoSchema,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:5:  fidelidadeNivelAtualSchema,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:6:  fidelidadeSaldoSchema,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:9:  ClientePacote,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:10:  FidelidadeBeneficio,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:11:  FidelidadeHistorico,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:12:  FidelidadeNivelAtual,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:13:  FidelidadeSaldo,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:19:export async function getClienteFidelidadeSaldo(
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:21:): Promise<FidelidadeSaldo> {
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:24:      `/fidelidade/cliente/${clienteId}`,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:27:  return fidelidadeSaldoSchema.parse(
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:32:export async function getClienteFidelidadeHistorico(
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:34:): Promise<FidelidadeHistorico> {
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:37:      `/fidelidade/historico/${clienteId}`,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:40:  return fidelidadeHistoricoSchema.parse(
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:45:export async function getClienteFidelidadeBeneficio(
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:47:): Promise<FidelidadeBeneficio> {
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:50:      `/fidelidade/beneficio-disponivel/${clienteId}`,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:53:  return fidelidadeBeneficioSchema.parse(
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:58:export async function getClienteFidelidadeNivel(
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:60:): Promise<FidelidadeNivelAtual> {
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:63:      `/fidelidade/nivel-atual/${clienteId}`,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:66:  return fidelidadeNivelAtualSchema.parse(
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:71:export async function getClientePacotes(
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:73:): Promise<ClientePacote[]> {
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:76:      `/clientes-pacotes/cliente/${clienteId}`,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:79:  return clientesPacotesSchema.parse(
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:85:  saldo:
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:86:    getClienteFidelidadeSaldo,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:88:    getClienteFidelidadeHistorico,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:90:    getClienteFidelidadeBeneficio,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:92:    getClienteFidelidadeNivel,
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:93:  pacotes:
beauty-core-ui/src/features/clientes/services/cliente-profile-extras-api.ts:94:    getClientePacotes,
beauty-core-ui/src/features/clientes/services/clientes-lgpd-api.test.ts:56:  agendamentos: [],
beauty-core-ui/src/features/clientes/services/clientes-lgpd-api.test.ts:58:  pacotes: {},
beauty-core-ui/src/features/clientes/types/cliente-profile-extras.types.ts:6:  clientePacoteSchema,
beauty-core-ui/src/features/clientes/types/cliente-profile-extras.types.ts:7:  fidelidadeBeneficioSchema,
beauty-core-ui/src/features/clientes/types/cliente-profile-extras.types.ts:8:  fidelidadeHistoricoSchema,
beauty-core-ui/src/features/clientes/types/cliente-profile-extras.types.ts:9:  fidelidadeNivelAtualSchema,
beauty-core-ui/src/features/clientes/types/cliente-profile-extras.types.ts:10:  fidelidadeSaldoSchema,
beauty-core-ui/src/features/clientes/types/cliente-profile-extras.types.ts:11:  nivelFidelidadeSchema,
beauty-core-ui/src/features/clientes/types/cliente-profile-extras.types.ts:12:  statusClientePacoteSchema,
beauty-core-ui/src/features/clientes/types/cliente-profile-extras.types.ts:15:export type FidelidadeSaldo =
beauty-core-ui/src/features/clientes/types/cliente-profile-extras.types.ts:17:    typeof fidelidadeSaldoSchema
beauty-core-ui/src/features/clientes/types/cliente-profile-extras.types.ts:20:export type FidelidadeHistorico =
beauty-core-ui/src/features/clientes/types/cliente-profile-extras.types.ts:22:    typeof fidelidadeHistoricoSchema
beauty-core-ui/src/features/clientes/types/cliente-profile-extras.types.ts:25:export type FidelidadeBeneficio =
beauty-core-ui/src/features/clientes/types/cliente-profile-extras.types.ts:27:    typeof fidelidadeBeneficioSchema
beauty-core-ui/src/features/clientes/types/cliente-profile-extras.types.ts:30:export type NivelFidelidade =
beauty-core-ui/src/features/clientes/types/cliente-profile-extras.types.ts:32:    typeof nivelFidelidadeSchema
beauty-core-ui/src/features/clientes/types/cliente-profile-extras.types.ts:35:export type FidelidadeNivelAtual =
beauty-core-ui/src/features/clientes/types/cliente-profile-extras.types.ts:37:    typeof fidelidadeNivelAtualSchema
beauty-core-ui/src/features/clientes/types/cliente-profile-extras.types.ts:40:export type StatusClientePacote =
beauty-core-ui/src/features/clientes/types/cliente-profile-extras.types.ts:42:    typeof statusClientePacoteSchema
beauty-core-ui/src/features/clientes/types/cliente-profile-extras.types.ts:45:export type ClientePacote =
beauty-core-ui/src/features/clientes/types/cliente-profile-extras.types.ts:47:    typeof clientePacoteSchema
beauty-core-ui/src/features/dashboard/components/appointments-overview.tsx:21:  AppointmentsAnalytics,
beauty-core-ui/src/features/dashboard/components/appointments-overview.tsx:28:const AppointmentsChart = dynamic(
beauty-core-ui/src/features/dashboard/components/appointments-overview.tsx:31:      "@/features/dashboard/components/charts/appointments-chart"
beauty-core-ui/src/features/dashboard/components/appointments-overview.tsx:34:        module.AppointmentsChart,
beauty-core-ui/src/features/dashboard/components/appointments-overview.tsx:43:type AppointmentsOverviewProps = {
beauty-core-ui/src/features/dashboard/components/appointments-overview.tsx:44:  data?: AppointmentsAnalytics;
beauty-core-ui/src/features/dashboard/components/appointments-overview.tsx:51:export function AppointmentsOverview({
beauty-core-ui/src/features/dashboard/components/appointments-overview.tsx:57:}: AppointmentsOverviewProps) {
beauty-core-ui/src/features/dashboard/components/appointments-overview.tsx:61:      title="Agendamentos"
beauty-core-ui/src/features/dashboard/components/appointments-overview.tsx:66:          label="Carregando agendamentos"
beauty-core-ui/src/features/dashboard/components/appointments-overview.tsx:70:          title="N├úo foi poss├¡vel carregar os agendamentos"
beauty-core-ui/src/features/dashboard/components/appointments-overview.tsx:76:          title="Sem agendamentos no per├¡odo"
beauty-core-ui/src/features/dashboard/components/appointments-overview.tsx:92:                <AppointmentsChart
beauty-core-ui/src/features/dashboard/components/charts/appointments-chart.tsx:15:  AppointmentsAnalytics,
beauty-core-ui/src/features/dashboard/components/charts/appointments-chart.tsx:18:  buildAppointmentStatusData,
beauty-core-ui/src/features/dashboard/components/charts/appointments-chart.tsx:24:type AppointmentsChartProps = {
beauty-core-ui/src/features/dashboard/components/charts/appointments-chart.tsx:25:  data: AppointmentsAnalytics;
beauty-core-ui/src/features/dashboard/components/charts/appointments-chart.tsx:28:export function AppointmentsChart({
beauty-core-ui/src/features/dashboard/components/charts/appointments-chart.tsx:30:}: AppointmentsChartProps) {
beauty-core-ui/src/features/dashboard/components/charts/appointments-chart.tsx:32:    buildAppointmentStatusData(data);
beauty-core-ui/src/features/dashboard/components/charts/appointments-chart.tsx:38:      aria-label="Distribui├º├úo dos agendamentos por status"
beauty-core-ui/src/features/dashboard/components/charts/appointments-chart.tsx:110:              "Agendamentos",
beauty-core-ui/src/features/dashboard/components/charts/appointments-chart.tsx:117:            name="Agendamentos"
beauty-core-ui/src/features/dashboard/components/charts/financial-chart.tsx:39:      aria-label="Compara├º├úo entre receitas, despesas e saldo no per├¡odo selecionado"
beauty-core-ui/src/features/dashboard/components/charts/financial-chart.tsx:44:        Saldo: {formatCurrency(data.saldo)}.
beauty-core-ui/src/features/dashboard/components/charts/financial-chart.tsx:136:            dataKey="saldo"
beauty-core-ui/src/features/dashboard/components/charts/financial-chart.tsx:138:            name="Saldo"
beauty-core-ui/src/features/dashboard/components/dashboard-filters.test.tsx:50:        /Clientes, fidelidade e pacotes/,
beauty-core-ui/src/features/dashboard/components/dashboard-filters.tsx:109:            Clientes, fidelidade e pacotes mostram o estado atual da opera├º├úo.
beauty-core-ui/src/features/dashboard/components/dashboard-kpi-grid.test.tsx:29:    agendamentos: {
beauty-core-ui/src/features/dashboard/components/dashboard-kpi-grid.test.tsx:30:      totalAgendamentos: 32,
beauty-core-ui/src/features/dashboard/components/dashboard-kpi-grid.test.tsx:39:      saldo: 950.5,
beauty-core-ui/src/features/dashboard/components/dashboard-kpi-grid.test.tsx:42:    fidelidade: {
beauty-core-ui/src/features/dashboard/components/dashboard-kpi-grid.test.tsx:47:    pacotes: {
beauty-core-ui/src/features/dashboard/components/dashboard-kpi-grid.test.tsx:48:      pacotesAtivos: 5,
beauty-core-ui/src/features/dashboard/components/dashboard-kpi-grid.test.tsx:49:      pacotesFinalizados: 2,
beauty-core-ui/src/features/dashboard/components/dashboard-kpi-grid.test.tsx:50:      pacotesVencidos: 1,
beauty-core-ui/src/features/dashboard/components/dashboard-kpi-grid.test.tsx:69:      "Saldo",
beauty-core-ui/src/features/dashboard/components/dashboard-kpi-grid.test.tsx:71:      "Agendamentos",
beauty-core-ui/src/features/dashboard/components/dashboard-kpi-grid.tsx:58:          label="Saldo"
beauty-core-ui/src/features/dashboard/components/dashboard-kpi-grid.tsx:60:            summary.financeiro.saldo,
beauty-core-ui/src/features/dashboard/components/dashboard-kpi-grid.tsx:76:          label="Agendamentos"
beauty-core-ui/src/features/dashboard/components/dashboard-kpi-grid.tsx:78:            summary.agendamentos
beauty-core-ui/src/features/dashboard/components/dashboard-kpi-grid.tsx:79:              .totalAgendamentos,
beauty-core-ui/src/features/dashboard/components/dashboard-view.integration.test.tsx:280:            "Saldo",
beauty-core-ui/src/features/dashboard/components/dashboard-view.integration.test.tsx:282:            "Agendamentos",
beauty-core-ui/src/features/dashboard/components/dashboard-view.tsx:10:  AppointmentsOverview,
beauty-core-ui/src/features/dashboard/components/dashboard-view.tsx:11:} from "@/features/dashboard/components/appointments-overview";
beauty-core-ui/src/features/dashboard/components/dashboard-view.tsx:95:    analytics.appointments.dataUpdatedAt,
beauty-core-ui/src/features/dashboard/components/dashboard-view.tsx:100:    analytics.loyalty.dataUpdatedAt,
beauty-core-ui/src/features/dashboard/components/dashboard-view.tsx:101:    analytics.packages.dataUpdatedAt,
beauty-core-ui/src/features/dashboard/components/dashboard-view.tsx:201:              <AppointmentsOverview
beauty-core-ui/src/features/dashboard/components/dashboard-view.tsx:203:                  analytics.appointments
beauty-core-ui/src/features/dashboard/components/dashboard-view.tsx:207:                  analytics.appointments
beauty-core-ui/src/features/dashboard/components/dashboard-view.tsx:211:                  analytics.appointments
beauty-core-ui/src/features/dashboard/components/dashboard-view.tsx:215:                  analytics.appointments
beauty-core-ui/src/features/dashboard/components/dashboard-view.tsx:219:                  void analytics.appointments.refetch();
beauty-core-ui/src/features/dashboard/components/dashboard-view.tsx:286:                loyalty={{
beauty-core-ui/src/features/dashboard/components/dashboard-view.tsx:288:                    analytics.loyalty.data,
beauty-core-ui/src/features/dashboard/components/dashboard-view.tsx:290:                    analytics.loyalty.isPending,
beauty-core-ui/src/features/dashboard/components/dashboard-view.tsx:292:                    analytics.loyalty.isError,
beauty-core-ui/src/features/dashboard/components/dashboard-view.tsx:294:                    analytics.loyalty.isFetching,
beauty-core-ui/src/features/dashboard/components/dashboard-view.tsx:296:                    void analytics.loyalty.refetch();
beauty-core-ui/src/features/dashboard/components/dashboard-view.tsx:299:                packages={{
beauty-core-ui/src/features/dashboard/components/dashboard-view.tsx:301:                    analytics.packages.data,
beauty-core-ui/src/features/dashboard/components/dashboard-view.tsx:303:                    analytics.packages.isPending,
beauty-core-ui/src/features/dashboard/components/dashboard-view.tsx:305:                    analytics.packages.isError,
beauty-core-ui/src/features/dashboard/components/dashboard-view.tsx:307:                    analytics.packages.isFetching,
beauty-core-ui/src/features/dashboard/components/dashboard-view.tsx:309:                    void analytics.packages.refetch();
beauty-core-ui/src/features/dashboard/components/engagement-overview.test.tsx:31:  it("exibe fidelidade e pacotes sem dados privados", () => {
beauty-core-ui/src/features/dashboard/components/engagement-overview.test.tsx:34:        loyalty={{
beauty-core-ui/src/features/dashboard/components/engagement-overview.test.tsx:50:        packages={{
beauty-core-ui/src/features/dashboard/components/engagement-overview.test.tsx:53:            pacotesVendidos: 4,
beauty-core-ui/src/features/dashboard/components/engagement-overview.test.tsx:54:            pacotesAtivos: 3,
beauty-core-ui/src/features/dashboard/components/engagement-overview.test.tsx:55:            pacotesFinalizados: 1,
beauty-core-ui/src/features/dashboard/components/engagement-overview.test.tsx:56:            pacotesVencidos: 0,
beauty-core-ui/src/features/dashboard/components/engagement-overview.test.tsx:107:              AGENDAMENTO_CRIADO: 3,
beauty-core-ui/src/features/dashboard/components/engagement-overview.test.tsx:110:              AGENDA: 3,
beauty-core-ui/src/features/dashboard/components/engagement-overview.test.tsx:132:        "Agendamento Criado",
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:23:  LoyaltyAnalytics,
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:25:  PackagesAnalytics,
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:173:  loyalty: DashboardPanelState<LoyaltyAnalytics>;
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:174:  packages: DashboardPanelState<PackagesAnalytics>;
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:178:  loyalty,
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:179:  packages,
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:181:  const loyaltyEmpty =
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:182:    loyalty.data !== undefined &&
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:183:    loyalty.data.clientesComPontos === 0 &&
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:184:    loyalty.data.pontosDistribuidos === 0 &&
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:185:    loyalty.data.pontosResgatados === 0 &&
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:186:    loyalty.data.beneficiosLiberados === 0 &&
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:187:    loyalty.data.topClientes.length === 0;
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:189:  const packagesEmpty =
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:190:    packages.data !== undefined &&
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:191:    packages.data.pacotesVendidos === 0 &&
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:192:    packages.data.pacotesAtivos === 0 &&
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:193:    packages.data.pacotesFinalizados === 0 &&
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:194:    packages.data.pacotesVencidos === 0 &&
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:195:    packages.data.receitaGerada === 0;
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:200:      title="Fidelidade e pacotes"
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:205:          title="Programa de fidelidade"
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:206:          description="Pontos, benef├¡cios e clientes participantes."
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:207:          emptyMessage="O programa de fidelidade ainda n├úo possui movimenta├º├Áes."
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:208:          isPending={loyalty.isPending}
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:209:          isError={loyalty.isError}
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:210:          isFetching={loyalty.isFetching}
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:211:          isEmpty={loyaltyEmpty}
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:212:          onRetry={loyalty.onRetry}
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:214:          {loyalty.data && (
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:223:                        loyalty.data
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:232:                        loyalty.data
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:241:                        loyalty.data
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:247:                      "Benef├¡cios liberados",
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:250:                        loyalty.data
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:257:              {loyalty.data.topClientes
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:265:                    {loyalty.data.topClientes
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:295:          title="Pacotes"
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:297:          emptyMessage="Nenhum pacote possui movimenta├º├úo registrada."
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:298:          isPending={packages.isPending}
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:299:          isError={packages.isError}
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:300:          isFetching={packages.isFetching}
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:301:          isEmpty={packagesEmpty}
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:302:          onRetry={packages.onRetry}
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:304:          {packages.data && (
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:309:                    "Pacotes vendidos",
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:312:                      packages.data
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:313:                        .pacotesVendidos,
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:318:                    "Pacotes ativos",
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:321:                      packages.data
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:322:                        .pacotesAtivos,
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:330:                      packages.data
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:331:                        .pacotesFinalizados,
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:339:                      packages.data
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:340:                        .pacotesVencidos,
beauty-core-ui/src/features/dashboard/components/engagement-overview.tsx:348:                      packages.data
beauty-core-ui/src/features/dashboard/components/rankings-overview.test.tsx:70:              agendamentos: 30,
beauty-core-ui/src/features/dashboard/components/rankings-overview.tsx:224:            item.agendamentos,
beauty-core-ui/src/features/dashboard/components/rankings-overview.tsx:225:          )} agendamentos`,
beauty-core-ui/src/features/dashboard/components/rankings-overview.tsx:263:          description="Agendamentos e receita por unidade."
beauty-core-ui/src/features/dashboard/hooks/use-dashboard-analytics.ts:36:  const appointments = useQuery(
beauty-core-ui/src/features/dashboard/hooks/use-dashboard-analytics.ts:37:    dashboardQueryOptions.appointments(
beauty-core-ui/src/features/dashboard/hooks/use-dashboard-analytics.ts:71:  const loyalty = useQuery(
beauty-core-ui/src/features/dashboard/hooks/use-dashboard-analytics.ts:72:    dashboardQueryOptions.loyalty(
beauty-core-ui/src/features/dashboard/hooks/use-dashboard-analytics.ts:77:  const packages = useQuery(
beauty-core-ui/src/features/dashboard/hooks/use-dashboard-analytics.ts:78:    dashboardQueryOptions.packages(
beauty-core-ui/src/features/dashboard/hooks/use-dashboard-analytics.ts:107:    appointments,
beauty-core-ui/src/features/dashboard/hooks/use-dashboard-analytics.ts:112:    loyalty,
beauty-core-ui/src/features/dashboard/hooks/use-dashboard-analytics.ts:113:    packages,
beauty-core-ui/src/features/dashboard/queries/dashboard-keys.test.ts:48:      dashboardKeys.loyalty(),
beauty-core-ui/src/features/dashboard/queries/dashboard-keys.test.ts:52:      "loyalty",
beauty-core-ui/src/features/dashboard/queries/dashboard-keys.ts:33:  appointments: (filters: DashboardFilters) =>
beauty-core-ui/src/features/dashboard/queries/dashboard-keys.ts:36:      "appointments",
beauty-core-ui/src/features/dashboard/queries/dashboard-keys.ts:68:  loyalty: () =>
beauty-core-ui/src/features/dashboard/queries/dashboard-keys.ts:71:      "loyalty",
beauty-core-ui/src/features/dashboard/queries/dashboard-keys.ts:74:  packages: () =>
beauty-core-ui/src/features/dashboard/queries/dashboard-keys.ts:77:      "packages",
beauty-core-ui/src/features/dashboard/queries/dashboard-query-options.ts:52:  appointments: (
beauty-core-ui/src/features/dashboard/queries/dashboard-query-options.ts:58:        dashboardKeys.appointments(
beauty-core-ui/src/features/dashboard/queries/dashboard-query-options.ts:62:        dashboardApi.appointments(
beauty-core-ui/src/features/dashboard/queries/dashboard-query-options.ts:150:  loyalty: (enabled: boolean) =>
beauty-core-ui/src/features/dashboard/queries/dashboard-query-options.ts:153:        dashboardKeys.loyalty(),
beauty-core-ui/src/features/dashboard/queries/dashboard-query-options.ts:155:        dashboardApi.loyalty,
beauty-core-ui/src/features/dashboard/queries/dashboard-query-options.ts:163:  packages: (enabled: boolean) =>
beauty-core-ui/src/features/dashboard/queries/dashboard-query-options.ts:166:        dashboardKeys.packages(),
beauty-core-ui/src/features/dashboard/queries/dashboard-query-options.ts:168:        dashboardApi.packages,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.test.ts:4:  appointmentsAnalyticsSchema,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.test.ts:9:  loyaltyAnalyticsSchema,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.test.ts:42:      agendamentos: {
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.test.ts:43:        totalAgendamentos: 0,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.test.ts:52:        saldo: 0,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.test.ts:55:      fidelidade: {
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.test.ts:60:      pacotes: {
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.test.ts:61:        pacotesAtivos: 0,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.test.ts:62:        pacotesFinalizados: 0,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.test.ts:63:        pacotesVencidos: 0,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.test.ts:81:      saldo: 0,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.test.ts:95:      appointmentsAnalyticsSchema.parse({
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.test.ts:110:        saldo: 0,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.test.ts:139:      loyaltyAnalyticsSchema.parse({
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.test.ts:173:        AGENDAMENTO: 2,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.test.ts:176:        agenda: 2,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.test.ts:190:      AGENDAMENTO: 2,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.test.ts:193:      agenda: 2,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:41:const dashboardAppointmentsSummarySchema = z.object({
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:42:  totalAgendamentos: nonNegativeIntegerSchema,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:52:  saldo: finiteNumberSchema,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:56:const dashboardLoyaltySummarySchema = z.object({
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:62:const dashboardPackagesSummarySchema = z.object({
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:63:  pacotesAtivos: nonNegativeIntegerSchema,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:64:  pacotesFinalizados: nonNegativeIntegerSchema,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:65:  pacotesVencidos: nonNegativeIntegerSchema,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:76:  agendamentos: dashboardAppointmentsSummarySchema,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:78:  fidelidade: dashboardLoyaltySummarySchema,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:79:  pacotes: dashboardPackagesSummarySchema,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:92:export const appointmentsAnalyticsSchema = z.object({
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:105:  saldo: finiteNumberSchema,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:139:  agendamentos: nonNegativeIntegerSchema,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:147:const loyaltyClientRankingSchema = z.object({
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:153:export const loyaltyAnalyticsSchema = z.object({
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:158:  topClientes: z.array(loyaltyClientRankingSchema),
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:161:export const packagesAnalyticsSchema = z.object({
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:162:  pacotesVendidos: nonNegativeIntegerSchema,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:163:  pacotesAtivos: nonNegativeIntegerSchema,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:164:  pacotesFinalizados: nonNegativeIntegerSchema,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:165:  pacotesVencidos: nonNegativeIntegerSchema,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:199:  agendamentos: appointmentsAnalyticsSchema,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:204:  fidelidade: loyaltyAnalyticsSchema,
beauty-core-ui/src/features/dashboard/schemas/dashboard.schemas.ts:205:  pacotes: packagesAnalyticsSchema,
beauty-core-ui/src/features/dashboard/services/dashboard-api.test.ts:38:      agendamentos: {
beauty-core-ui/src/features/dashboard/services/dashboard-api.test.ts:39:        totalAgendamentos: 20,
beauty-core-ui/src/features/dashboard/services/dashboard-api.test.ts:48:        saldo: 700,
beauty-core-ui/src/features/dashboard/services/dashboard-api.test.ts:51:      fidelidade: {
beauty-core-ui/src/features/dashboard/services/dashboard-api.test.ts:56:      pacotes: {
beauty-core-ui/src/features/dashboard/services/dashboard-api.test.ts:57:        pacotesAtivos: 3,
beauty-core-ui/src/features/dashboard/services/dashboard-api.test.ts:58:        pacotesFinalizados: 1,
beauty-core-ui/src/features/dashboard/services/dashboard-api.test.ts:59:        pacotesVencidos: 0,
beauty-core-ui/src/features/dashboard/services/dashboard-api.test.ts:124:        saldo: -1,
beauty-core-ui/src/features/dashboard/services/dashboard-api.ts:4:  appointmentsAnalyticsSchema,
beauty-core-ui/src/features/dashboard/services/dashboard-api.ts:10:  loyaltyAnalyticsSchema,
beauty-core-ui/src/features/dashboard/services/dashboard-api.ts:12:  packagesAnalyticsSchema,
beauty-core-ui/src/features/dashboard/services/dashboard-api.ts:19:  AppointmentsAnalytics,
beauty-core-ui/src/features/dashboard/services/dashboard-api.ts:25:  LoyaltyAnalytics,
beauty-core-ui/src/features/dashboard/services/dashboard-api.ts:27:  PackagesAnalytics,
beauty-core-ui/src/features/dashboard/services/dashboard-api.ts:102:export function getAppointmentsAnalytics(
beauty-core-ui/src/features/dashboard/services/dashboard-api.ts:104:): Promise<AppointmentsAnalytics> {
beauty-core-ui/src/features/dashboard/services/dashboard-api.ts:106:    "agendamentos",
beauty-core-ui/src/features/dashboard/services/dashboard-api.ts:107:    appointmentsAnalyticsSchema,
beauty-core-ui/src/features/dashboard/services/dashboard-api.ts:152:export function getLoyaltyAnalytics(): Promise<LoyaltyAnalytics> {
beauty-core-ui/src/features/dashboard/services/dashboard-api.ts:154:    "fidelidade",
beauty-core-ui/src/features/dashboard/services/dashboard-api.ts:155:    loyaltyAnalyticsSchema,
beauty-core-ui/src/features/dashboard/services/dashboard-api.ts:159:export function getPackagesAnalytics(): Promise<PackagesAnalytics> {
beauty-core-ui/src/features/dashboard/services/dashboard-api.ts:161:    "pacotes",
beauty-core-ui/src/features/dashboard/services/dashboard-api.ts:162:    packagesAnalyticsSchema,
beauty-core-ui/src/features/dashboard/services/dashboard-api.ts:199:  appointments: getAppointmentsAnalytics,
beauty-core-ui/src/features/dashboard/services/dashboard-api.ts:204:  loyalty: getLoyaltyAnalytics,
beauty-core-ui/src/features/dashboard/services/dashboard-api.ts:205:  packages: getPackagesAnalytics,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:9:    agendamentos: {
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:10:      totalAgendamentos: 28,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:19:      saldo: 6250,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:22:    fidelidade: {
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:27:    pacotes: {
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:28:      pacotesAtivos: 12,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:29:      pacotesFinalizados: 6,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:30:      pacotesVencidos: 2,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:46:  "/analytics/agendamentos": {
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:58:    saldo: 6250,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:99:      agendamentos: 17,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:106:      agendamentos: 11,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:110:  "/analytics/fidelidade": {
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:119:        nome: "Cliente Fidelidade",
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:125:  "/analytics/pacotes": {
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:126:    pacotesVendidos: 20,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:127:    pacotesAtivos: 12,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:128:    pacotesFinalizados: 6,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:129:    pacotesVencidos: 2,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:148:      AGENDAMENTO_CRIADO: 18,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:150:      PACOTE_VENDIDO: 5,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:153:      AGENDAMENTOS: 18,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:155:      PACOTES: 5,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:169:    agendamentos: {
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:170:      totalAgendamentos: 0,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:179:      saldo: 0,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:182:    fidelidade: {
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:187:    pacotes: {
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:188:      pacotesAtivos: 0,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:189:      pacotesFinalizados: 0,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:190:      pacotesVencidos: 0,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:206:  "/analytics/agendamentos": {
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:218:    saldo: 0,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:227:  "/analytics/fidelidade": {
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:234:  "/analytics/pacotes": {
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:235:    pacotesVendidos: 0,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:236:    pacotesAtivos: 0,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:237:    pacotesFinalizados: 0,
beauty-core-ui/src/features/dashboard/testing/dashboard-api-fixtures.ts:238:    pacotesVencidos: 0,
beauty-core-ui/src/features/dashboard/types/dashboard.types.ts:4:  appointmentsAnalyticsSchema,
beauty-core-ui/src/features/dashboard/types/dashboard.types.ts:10:  loyaltyAnalyticsSchema,
beauty-core-ui/src/features/dashboard/types/dashboard.types.ts:12:  packagesAnalyticsSchema,
beauty-core-ui/src/features/dashboard/types/dashboard.types.ts:34:export type AppointmentsAnalytics = z.infer<
beauty-core-ui/src/features/dashboard/types/dashboard.types.ts:35:  typeof appointmentsAnalyticsSchema
beauty-core-ui/src/features/dashboard/types/dashboard.types.ts:66:export type LoyaltyAnalytics = z.infer<
beauty-core-ui/src/features/dashboard/types/dashboard.types.ts:67:  typeof loyaltyAnalyticsSchema
beauty-core-ui/src/features/dashboard/types/dashboard.types.ts:70:export type PackagesAnalytics = z.infer<
beauty-core-ui/src/features/dashboard/types/dashboard.types.ts:71:  typeof packagesAnalyticsSchema
beauty-core-ui/src/features/dashboard/types/dashboard.types.ts:89:  | "agendamentos"
beauty-core-ui/src/features/dashboard/types/dashboard.types.ts:94:  | "fidelidade"
beauty-core-ui/src/features/dashboard/types/dashboard.types.ts:95:  | "pacotes"
beauty-core-ui/src/features/dashboard/types/dashboard.types.ts:103:  agendamentos: AppointmentsAnalytics;
beauty-core-ui/src/features/dashboard/types/dashboard.types.ts:108:  fidelidade: LoyaltyAnalytics;
beauty-core-ui/src/features/dashboard/types/dashboard.types.ts:109:  pacotes: PackagesAnalytics;
beauty-core-ui/src/features/dashboard/utils/dashboard-chart-data.test.ts:8:  buildAppointmentStatusData,
beauty-core-ui/src/features/dashboard/utils/dashboard-chart-data.test.ts:18:        saldo: 750,
beauty-core-ui/src/features/dashboard/utils/dashboard-chart-data.test.ts:29:        saldo: 750,
beauty-core-ui/src/features/dashboard/utils/dashboard-chart-data.test.ts:36:      buildAppointmentStatusData({
beauty-core-ui/src/features/dashboard/utils/dashboard-chart-data.ts:2:  AppointmentsAnalytics,
beauty-core-ui/src/features/dashboard/utils/dashboard-chart-data.ts:10:  saldo: number;
beauty-core-ui/src/features/dashboard/utils/dashboard-chart-data.ts:13:export type AppointmentStatusDatum = {
beauty-core-ui/src/features/dashboard/utils/dashboard-chart-data.ts:27:      saldo: data.saldo,
beauty-core-ui/src/features/dashboard/utils/dashboard-chart-data.ts:32:export function buildAppointmentStatusData(
beauty-core-ui/src/features/dashboard/utils/dashboard-chart-data.ts:33:  data: AppointmentsAnalytics,
beauty-core-ui/src/features/dashboard/utils/dashboard-chart-data.ts:34:): AppointmentStatusDatum[] {
beauty-core-ui/src/features/dashboard/utils/dashboard-distributions.test.ts:38:        "AGENDAMENTO_CONCLUIDO",
beauty-core-ui/src/features/dashboard/utils/dashboard-distributions.test.ts:41:      "Agendamento Concluido",
beauty-core-ui/src/features/dashboard/utils/dashboard-summary.test.ts:21:  agendamentos: {
beauty-core-ui/src/features/dashboard/utils/dashboard-summary.test.ts:22:    totalAgendamentos: 0,
beauty-core-ui/src/features/dashboard/utils/dashboard-summary.test.ts:31:    saldo: 0,
beauty-core-ui/src/features/dashboard/utils/dashboard-summary.test.ts:34:  fidelidade: {
beauty-core-ui/src/features/dashboard/utils/dashboard-summary.test.ts:39:  pacotes: {
beauty-core-ui/src/features/dashboard/utils/dashboard-summary.test.ts:40:    pacotesAtivos: 0,
beauty-core-ui/src/features/dashboard/utils/dashboard-summary.test.ts:41:    pacotesFinalizados: 0,
beauty-core-ui/src/features/dashboard/utils/dashboard-summary.test.ts:42:    pacotesVencidos: 0,
beauty-core-ui/src/features/dashboard/utils/dashboard-summary.test.ts:67:          saldo: -50,
beauty-core-ui/src/features/dashboard/utils/dashboard-summary.ts:10:    summary.agendamentos.totalAgendamentos === 0 &&
beauty-core-ui/src/features/dashboard/utils/dashboard-summary.ts:13:    summary.fidelidade.pontosDistribuidos === 0 &&
beauty-core-ui/src/features/dashboard/utils/dashboard-summary.ts:14:    summary.pacotes.pacotesAtivos === 0 &&
beauty-core-ui/src/features/fidelidade/beneficios/beneficio-form.schema.test.ts:11:      nome: "Benef├¡cio personalizado",
beauty-core-ui/src/features/fidelidade/beneficios/beneficio-form.schema.test.ts:20:      nome: "Benef├¡cio personalizado",
beauty-core-ui/src/features/fidelidade/beneficios/beneficio-form.schema.test.ts:29:        nome: " Benef├¡cio A ",
beauty-core-ui/src/features/fidelidade/beneficios/beneficio-form.schema.test.ts:34:      nome: "Benef├¡cio A",
beauty-core-ui/src/features/fidelidade/beneficios/beneficio-form.schema.test.ts:50:        nome: "Benef├¡cio v├ílido",
beauty-core-ui/src/features/fidelidade/beneficios/beneficio-form.tsx:149:              ? "Salvar benef├¡cio"
beauty-core-ui/src/features/fidelidade/beneficios/beneficio-form.tsx:150:              : "Criar benef├¡cio"}
beauty-core-ui/src/features/fidelidade/beneficios/beneficio.types.ts:3:import { beneficiosSchema } from "../schemas/fidelidade.schemas";
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-api.test.ts:27:  nome: "Benef├¡cio personalizado",
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-api.test.ts:42:  it("lista benef├¡cios", async () => {
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-api.test.ts:54:  it("busca benef├¡cio por id", async () => {
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-api.test.ts:72:      nome: "Benef├¡cio personalizado",
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-api.test.ts:94:      nome: "Benef├¡cio atualizado",
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-api.ts:3:import { beneficiosSchema } from "../schemas/fidelidade.schemas";
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-view.test.tsx:64:  nome: "Benef├¡cio personalizado",
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-view.test.tsx:95:        name: "Criar benef├¡cio",
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-view.test.tsx:119:        "Benef├¡cio personalizado",
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-view.test.tsx:125:        name: "Criar benef├¡cio",
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-view.test.tsx:136:  it("benef├¡cio inativo n├úo oferece reativa├º├úo", () => {
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-view.test.tsx:196:        "Nenhum benef├¡cio cadastrado",
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-view.tsx:8:  canAccessLoyalty,
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-view.tsx:9:  canManageBenefits,
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-view.tsx:10:} from "../permissions/fidelidade-permissions";
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-view.tsx:11:import { formatPontos } from "../utils/fidelidade-formatters";
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-view.tsx:23:    canAccessLoyalty(role);
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-view.tsx:26:    canManageBenefits(role);
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-view.tsx:50:        Benef├¡cios
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-view.tsx:54:        Cat├ílogo de benef├¡cios vinculados ├ás regras de
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-view.tsx:55:        fidelidade da empresa.
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-view.tsx:61:            Novo benef├¡cio
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-view.tsx:82:            Editar benef├¡cio
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-view.tsx:121:            N├úo foi poss├¡vel carregar os benef├¡cios.
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-view.tsx:139:            Nenhum benef├¡cio cadastrado
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-view.tsx:143:            O frontend n├úo cria benef├¡cios automaticamente.
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-view.tsx:152:          aria-label="Benef├¡cios de fidelidade"
beauty-core-ui/src/features/fidelidade/beneficios/beneficios-view.tsx:269:          N├úo foi poss├¡vel concluir a opera├º├úo do benef├¡cio.
beauty-core-ui/src/features/fidelidade/beneficios/use-beneficios.ts:9:import { fidelidadeQueryKeys } from "../queries/fidelidade-query-keys";
beauty-core-ui/src/features/fidelidade/beneficios/use-beneficios.ts:23:    queryKey: fidelidadeQueryKeys.beneficios(),
beauty-core-ui/src/features/fidelidade/beneficios/use-beneficios.ts:36:          fidelidadeQueryKeys.beneficios(),
beauty-core-ui/src/features/fidelidade/beneficios/use-beneficios.ts:57:          fidelidadeQueryKeys.beneficios(),
beauty-core-ui/src/features/fidelidade/beneficios/use-beneficios.ts:68:          fidelidadeQueryKeys.beneficios(),
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:29:const fidelidadePage =
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:31:    "src/app/(dashboard)/fidelidade/page.tsx",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:34:const fidelidadeOperationalView =
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:36:    "src/features/fidelidade/components/fidelidade-operacional-view.tsx",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:39:const pacotesPage =
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:41:    "src/app/(dashboard)/pacotes/page.tsx",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:69:const fidelidadeView =
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:71:    "src/features/fidelidade/components/fidelidade-operacional-view.tsx",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:74:const fidelidadeApi =
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:76:    "src/features/fidelidade/services/fidelidade-api.ts",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:79:const fidelidadeOperationsApi =
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:81:    "src/features/fidelidade/operacoes/fidelidade-operacoes-api.ts",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:84:const fidelidadeOperationsHook =
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:86:    "src/features/fidelidade/operacoes/use-fidelidade-operacoes.ts",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:89:const fidelidadePermissions =
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:91:    "src/features/fidelidade/permissions/fidelidade-permissions.ts",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:94:const clientePacotesApi =
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:96:    "src/features/pacotes/clientes-pacotes/clientes-pacotes-api.ts",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:99:const clientePacotesView =
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:101:    "src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:104:const clientePacotesHook =
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:106:    "src/features/pacotes/clientes-pacotes/use-clientes-pacotes.ts",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:109:const clientePacotesOptions =
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:111:    "src/features/pacotes/clientes-pacotes/use-clientes-pacotes-options.ts",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:114:const clientePacotesUrl =
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:116:    "src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.ts",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:119:const pacotesPermissions =
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:121:    "src/features/pacotes/permissions/pacotes-permissions.ts",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:128:      "comp├Áe todos os dom├¡nios reais pela ├írvore de Fidelidade",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:131:          fidelidadePage,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:133:          "FidelidadeOperacionalView",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:137:          fidelidadeOperationalView,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:139:          "FidelidadeProgramaView",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:143:          fidelidadeOperationalView,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:149:          fidelidadeOperationalView,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:155:          fidelidadeOperationalView,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:157:          "FidelidadeOperacoesView",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:163:      "comp├Áe cat├ílogo e v├¡nculos na rota de Pacotes",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:166:          pacotesPage,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:168:          "PacotesCatalogoView",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:172:          pacotesPage,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:174:          "ClientesPacotesView",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:180:      "leva o mesmo cliente de Pacotes para Fidelidade pela URL",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:183:          clientePacotesView,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:185:          "/fidelidade?clienteId=",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:189:          clientePacotesView,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:195:          clientePacotesUrl,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:206:          clientePacotesOptions,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:212:          clientePacotesOptions,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:218:          clientePacotesView,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:226:      "reutiliza o mesmo contrato ClientePacote do Perfil 360",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:229:          clientePacotesApi,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:235:          clientePacotesApi,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:237:          "clientePacoteSchema",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:241:          clientePacotesApi,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:243:          "clientesPacotesSchema",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:249:          "clientePacoteSchema",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:255:      "compartilha a mesma query key de pacotes entre Pacotes e Perfil 360",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:258:          clientePacotesHook,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:260:          "clienteProfileKeys.pacotes",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:266:          "clienteProfileKeys.pacotes",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:272:          '"pacotes"',
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:278:      "usa o mesmo endpoint de pacotes por cliente no m├│dulo e no Perfil 360",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:281:          clientePacotesApi,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:283:          "/clientes-pacotes/cliente/",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:289:          "/clientes-pacotes/cliente/",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:295:      "mant├®m saldo e hist├│rico de fidelidade vindos dos endpoints autoritativos",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:298:          fidelidadeApi,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:300:          "/fidelidade/cliente/",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:304:          fidelidadeApi,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:306:          "/fidelidade/historico/",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:312:          "/fidelidade/cliente/",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:318:          "/fidelidade/historico/",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:322:          fidelidadeView,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:324:          "saldo",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:333:          fidelidadeOperationsApi,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:335:          "/fidelidade/adicionar-pontos",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:339:          fidelidadeOperationsApi,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:341:          "/fidelidade/resgatar-pontos",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:345:          fidelidadeOperationsApi,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:347:          "/fidelidade/pontuar-por-valor",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:351:          fidelidadeOperationsApi,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:357:          fidelidadeOperationsApi,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:365:      "mant├®m consumo de sess├úo autoritativo sem sess├úo paralela",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:368:          clientePacotesApi,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:374:          clientePacotesApi,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:380:          clientePacotesApi,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:386:          clientePacotesHook,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:397:          clientePacotesHook,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:403:          clientePacotesHook,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:409:          fidelidadeOperationsHook,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:415:          fidelidadeOperationsHook,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:426:          fidelidadePermissions,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:428:          "canAccessLoyalty",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:432:          pacotesPermissions,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:434:          "canAccessPackages",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:438:          pacotesPermissions,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:440:          "canConsumePackageSession",
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:443:        const loyaltyStart =
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:445:            'id: "loyalty"',
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:448:        const packagesStart =
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:450:            'id: "packages"',
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:454:          loyaltyStart,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:460:          packagesStart,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:465:        const loyaltySegment =
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:467:            loyaltyStart,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:468:            packagesStart,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:474:            packagesStart +
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:475:              'id: "packages"'.length,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:478:        const packagesSegment =
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:480:            packagesStart,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:488:            loyaltySegment,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:489:            packagesSegment,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:530:            fidelidadeApi,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:531:            fidelidadeOperationsApi,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:532:            fidelidadeOperationsHook,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:533:            clientePacotesApi,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:534:            clientePacotesHook,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:535:            clientePacotesOptions,
beauty-core-ui/src/features/fidelidade/chat53-transversal.integration.test.ts:536:            clientePacotesView,
beauty-core-ui/src/features/fidelidade/chat53-ux-hardening.test.ts:20:    "fidelidade",
beauty-core-ui/src/features/fidelidade/chat53-ux-hardening.test.ts:26:    "pacotes",
beauty-core-ui/src/features/fidelidade/chat53-ux-hardening.test.ts:306:          /Nenhum|Nenhuma|sem pacotes|sem pacotes vinculados|sem hist├│rico/i,
beauty-core-ui/src/features/fidelidade/chat53-ux-hardening.test.ts:316:            "src/features/pacotes/catalogo/pacotes-catalogo-view.tsx",
beauty-core-ui/src/features/fidelidade/chat53-ux-hardening.test.ts:319:        const clientesPacotes =
beauty-core-ui/src/features/fidelidade/chat53-ux-hardening.test.ts:321:            "src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx",
beauty-core-ui/src/features/fidelidade/chat53-ux-hardening.test.ts:324:        const fidelidadeOperacoes =
beauty-core-ui/src/features/fidelidade/chat53-ux-hardening.test.ts:326:            "src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx",
beauty-core-ui/src/features/fidelidade/chat53-ux-hardening.test.ts:336:          clientesPacotes,
beauty-core-ui/src/features/fidelidade/chat53-ux-hardening.test.ts:342:          clientesPacotes,
beauty-core-ui/src/features/fidelidade/chat53-ux-hardening.test.ts:348:          fidelidadeOperacoes,
beauty-core-ui/src/features/fidelidade/chat53-ux-hardening.test.ts:354:          fidelidadeOperacoes,
beauty-core-ui/src/features/fidelidade/chat53-ux-hardening.test.ts:366:            "src/features/pacotes/catalogo/pacotes-catalogo-view.tsx",
beauty-core-ui/src/features/fidelidade/chat53-ux-hardening.test.ts:369:        const clientesPacotes =
beauty-core-ui/src/features/fidelidade/chat53-ux-hardening.test.ts:371:            "src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx",
beauty-core-ui/src/features/fidelidade/chat53-ux-hardening.test.ts:377:          'aria-label="Cat├ílogo de pacotes"',
beauty-core-ui/src/features/fidelidade/chat53-ux-hardening.test.ts:381:          clientesPacotes,
beauty-core-ui/src/features/fidelidade/chat53-ux-hardening.test.ts:383:          'aria-label="Pacotes vinculados ao cliente"',
beauty-core-ui/src/features/fidelidade/chat53-ux-hardening.test.ts:411:              "src/features/pacotes/catalogo/pacotes-catalogo-view.tsx",
beauty-core-ui/src/features/fidelidade/chat53-ux-hardening.test.ts:414:              "src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx",
beauty-core-ui/src/features/fidelidade/components/fidelidade-historico.tsx:1:import type { MovimentacaoPontos } from "../types/fidelidade.types";
beauty-core-ui/src/features/fidelidade/components/fidelidade-historico.tsx:2:import { formatPontos } from "../utils/fidelidade-formatters";
beauty-core-ui/src/features/fidelidade/components/fidelidade-historico.tsx:6:} from "../utils/fidelidade-historico-formatters";
beauty-core-ui/src/features/fidelidade/components/fidelidade-historico.tsx:8:type FidelidadeHistoricoProps = {
beauty-core-ui/src/features/fidelidade/components/fidelidade-historico.tsx:12:export function FidelidadeHistorico({
beauty-core-ui/src/features/fidelidade/components/fidelidade-historico.tsx:14:}: FidelidadeHistoricoProps) {
beauty-core-ui/src/features/fidelidade/components/fidelidade-historico.tsx:17:      aria-labelledby="fidelidade-historico-title"
beauty-core-ui/src/features/fidelidade/components/fidelidade-historico.tsx:22:          id="fidelidade-historico-title"
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:4:const { useFidelidadeClienteMock } = vi.hoisted(() => ({
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:5:  useFidelidadeClienteMock: vi.fn(),
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:8:vi.mock("../hooks/use-fidelidade-cliente", () => ({
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:9:  useFidelidadeCliente: useFidelidadeClienteMock,
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:12:vi.mock("./fidelidade-programa-view", () => ({
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:13:  FidelidadeProgramaView: () => (
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:14:    <div data-testid="fidelidade-programa" />
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:30:vi.mock("../operacoes/fidelidade-operacoes-view", () => ({
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:31:  FidelidadeOperacoesView: () => (
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:32:    <div data-testid="fidelidade-operacoes-view" />
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:36:import { FidelidadeOperacionalView } from "./fidelidade-operacional-view";
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:50:describe("FidelidadeOperacionalView", () => {
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:52:    useFidelidadeClienteMock.mockReset();
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:54:    useFidelidadeClienteMock.mockReturnValue({
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:55:      saldoQuery: createQueryState(),
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:63:    render(<FidelidadeOperacionalView />);
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:71:    expect(useFidelidadeClienteMock).toHaveBeenCalledWith("");
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:76:      <FidelidadeOperacionalView clienteId="id-invalido" />,
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:85:    expect(useFidelidadeClienteMock).toHaveBeenCalledWith("");
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:88:  it("mostra saldo backend e hist├│rico real", () => {
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:89:    useFidelidadeClienteMock.mockReturnValue({
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:90:      saldoQuery: createQueryState({
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:93:        saldoPontos: 350,
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:112:      <FidelidadeOperacionalView clienteId={clienteId} />,
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:121:    expect(useFidelidadeClienteMock).toHaveBeenCalledWith(
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:127:    useFidelidadeClienteMock.mockReturnValue({
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:128:      saldoQuery: createQueryState({
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:131:        saldoPontos: 0,
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:141:      <FidelidadeOperacionalView clienteId={clienteId} />,
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:152:    useFidelidadeClienteMock.mockReturnValue({
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:153:      saldoQuery: createQueryState({
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:156:        saldoPontos: 200,
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.test.tsx:170:      <FidelidadeOperacionalView clienteId={clienteId} />,
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:4:import { useFidelidadeCliente } from "../hooks/use-fidelidade-cliente";
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:5:import { FidelidadeHistorico } from "./fidelidade-historico";
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:8:import { FidelidadeOperacoesView } from "../operacoes/fidelidade-operacoes-view";
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:9:import { FidelidadeProgramaView } from "./fidelidade-programa-view";
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:10:import { FidelidadeSaldoCard } from "./fidelidade-saldo-card";
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:12:type FidelidadeOperacionalViewProps = {
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:19:function FidelidadeLoadingState() {
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:23:      aria-label="Carregando fidelidade"
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:32:export function FidelidadeOperacionalView({
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:34:}: FidelidadeOperacionalViewProps) {
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:43:    saldoQuery,
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:47:  } = useFidelidadeCliente(queryClienteId);
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:53:          Fidelidade
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:57:          Consulte o saldo autoritativo e o hist├│rico real de
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:63:      <FidelidadeProgramaView />
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:65:      <FidelidadeOperacoesView />
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:105:        <FidelidadeLoadingState />
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:110:          {saldoQuery.isError ? (
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:116:                N├úo foi poss├¡vel carregar o saldo
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:126:                  void saldoQuery.refetch();
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:130:                Tentar saldo novamente
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:133:          ) : saldoQuery.data ? (
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:134:            <FidelidadeSaldoCard
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:135:              saldoPontos={saldoQuery.data.saldoPontos}
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:150:                O saldo pode continuar dispon├¡vel mesmo quando
beauty-core-ui/src/features/fidelidade/components/fidelidade-operacional-view.tsx:165:            <FidelidadeHistorico
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.test.tsx:38:vi.mock("../hooks/use-fidelidade-programa", () => ({
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.test.tsx:39:  useFidelidadePrograma: programaMock,
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.test.tsx:42:import { FidelidadeProgramaView } from "./fidelidade-programa-view";
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.test.tsx:67:describe("FidelidadeProgramaView", () => {
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.test.tsx:75:        fidelidadeAtiva: true,
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.test.tsx:104:    render(<FidelidadeProgramaView />);
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.test.tsx:122:    render(<FidelidadeProgramaView />);
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.test.tsx:146:    render(<FidelidadeProgramaView />);
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.test.tsx:153:      screen.getByText("N├¡veis de fidelidade"),
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.test.tsx:163:    render(<FidelidadeProgramaView />);
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:7:import { ConfiguracaoFidelidadeForm } from "../forms/configuracao-fidelidade-form";
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:8:import { NivelFidelidadeForm } from "../forms/nivel-fidelidade-form";
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:9:import type { NivelFidelidadePayload } from "../forms/nivel-fidelidade-form.schema";
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:10:import { useFidelidadePrograma } from "../hooks/use-fidelidade-programa";
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:12:  canAccessLoyalty,
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:14:  canManageLoyaltySettings,
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:15:  canReadLoyaltySettings,
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:16:} from "../permissions/fidelidade-permissions";
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:17:import type { NivelFidelidade } from "../types/fidelidade.types";
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:18:import { formatPontos } from "../utils/fidelidade-formatters";
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:44:export function FidelidadeProgramaView() {
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:50:    canReadLoyaltySettings(role);
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:53:    canManageLoyaltySettings(role);
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:56:    canAccessLoyalty(role);
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:62:    useState<NivelFidelidade | null>(null);
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:75:  } = useFidelidadePrograma({
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:114:                <ConfiguracaoFidelidadeForm
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:195:                <ConfiguracaoFidelidadeForm
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:231:            N├¡veis de fidelidade
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:244:              <NivelFidelidadeForm
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:249:                  payload: NivelFidelidadePayload,
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:265:              <NivelFidelidadeForm
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:272:                  payload: NivelFidelidadePayload,
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:328:              aria-label="N├¡veis de fidelidade"
beauty-core-ui/src/features/fidelidade/components/fidelidade-programa-view.tsx:348:                          "Sem benef├¡cios informados."}
beauty-core-ui/src/features/fidelidade/components/fidelidade-saldo-card.tsx:1:import { formatPontos } from "../utils/fidelidade-formatters";
beauty-core-ui/src/features/fidelidade/components/fidelidade-saldo-card.tsx:3:type FidelidadeSaldoCardProps = {
beauty-core-ui/src/features/fidelidade/components/fidelidade-saldo-card.tsx:4:  saldoPontos: number;
beauty-core-ui/src/features/fidelidade/components/fidelidade-saldo-card.tsx:8:export function FidelidadeSaldoCard({
beauty-core-ui/src/features/fidelidade/components/fidelidade-saldo-card.tsx:9:  saldoPontos,
beauty-core-ui/src/features/fidelidade/components/fidelidade-saldo-card.tsx:11:}: FidelidadeSaldoCardProps) {
beauty-core-ui/src/features/fidelidade/components/fidelidade-saldo-card.tsx:14:      aria-labelledby="fidelidade-saldo-title"
beauty-core-ui/src/features/fidelidade/components/fidelidade-saldo-card.tsx:20:            id="fidelidade-saldo-title"
beauty-core-ui/src/features/fidelidade/components/fidelidade-saldo-card.tsx:23:            Saldo de pontos
beauty-core-ui/src/features/fidelidade/components/fidelidade-saldo-card.tsx:27:            {formatPontos(saldoPontos)}
beauty-core-ui/src/features/fidelidade/components/fidelidade-saldo-card.tsx:42:        Saldo informado diretamente pelo backend.
beauty-core-ui/src/features/fidelidade/cupons/cupom-validacao-form.tsx:13:  cupomValidationConsumesUsage,
beauty-core-ui/src/features/fidelidade/cupons/cupom-validacao-form.tsx:40:        if (cupomValidationConsumesUsage && !confirmed) {
beauty-core-ui/src/features/fidelidade/cupons/cupom-validacao-form.tsx:72:      {cupomValidationConsumesUsage ? (
beauty-core-ui/src/features/fidelidade/cupons/cupom-validacao-form.tsx:92:        disabled={isSubmitting || (cupomValidationConsumesUsage && !confirmed)}
beauty-core-ui/src/features/fidelidade/cupons/cupom-validation-contract.ts:1:export const cupomValidationConsumesUsage =
beauty-core-ui/src/features/fidelidade/cupons/cupom.types.ts:3:import { cuponsSchema } from "../schemas/fidelidade.schemas";
beauty-core-ui/src/features/fidelidade/cupons/cupons-api.ts:3:import { cuponsSchema } from "../schemas/fidelidade.schemas";
beauty-core-ui/src/features/fidelidade/cupons/cupons-view.tsx:8:  canAccessLoyalty,
beauty-core-ui/src/features/fidelidade/cupons/cupons-view.tsx:10:} from "../permissions/fidelidade-permissions";
beauty-core-ui/src/features/fidelidade/cupons/cupons-view.tsx:48:    canAccessLoyalty(role);
beauty-core-ui/src/features/fidelidade/cupons/use-cupons.ts:9:import { fidelidadeQueryKeys } from "../queries/fidelidade-query-keys";
beauty-core-ui/src/features/fidelidade/cupons/use-cupons.ts:11:import { cupomValidationConsumesUsage } from "./cupom-validation-contract";
beauty-core-ui/src/features/fidelidade/cupons/use-cupons.ts:25:      fidelidadeQueryKeys.cupons(),
beauty-core-ui/src/features/fidelidade/cupons/use-cupons.ts:38:          fidelidadeQueryKeys.cupons(),
beauty-core-ui/src/features/fidelidade/cupons/use-cupons.ts:59:          fidelidadeQueryKeys.cupons(),
beauty-core-ui/src/features/fidelidade/cupons/use-cupons.ts:70:          fidelidadeQueryKeys.cupons(),
beauty-core-ui/src/features/fidelidade/cupons/use-cupons.ts:80:        cupomValidationConsumesUsage
beauty-core-ui/src/features/fidelidade/cupons/use-cupons.ts:84:            fidelidadeQueryKeys.cupons(),
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.test.ts:4:  configuracaoFidelidadeFormSchema,
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.test.ts:5:  emptyConfiguracaoFidelidadeFormValues,
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.test.ts:6:  toConfiguracaoFidelidadePayload,
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.test.ts:7:} from "./configuracao-fidelidade-form.schema";
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.test.ts:9:describe("configuracao fidelidade form", () => {
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.test.ts:11:    const values = emptyConfiguracaoFidelidadeFormValues();
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.test.ts:14:      fidelidadeAtiva: "",
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.test.ts:24:      configuracaoFidelidadeFormSchema.safeParse(values).success,
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.test.ts:29:    const parsed = configuracaoFidelidadeFormSchema.parse({
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.test.ts:30:      fidelidadeAtiva: "true",
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.test.ts:41:      toConfiguracaoFidelidadePayload(parsed),
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.test.ts:43:      fidelidadeAtiva: true,
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.test.ts:53:    const parsed = configuracaoFidelidadeFormSchema.parse({
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.test.ts:54:      fidelidadeAtiva: "true",
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.test.ts:64:      toConfiguracaoFidelidadePayload(parsed),
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.ts:3:import type { ConfiguracaoFidelidade } from "../types/fidelidade.types";
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.ts:32:export const configuracaoFidelidadeFormSchema = z.object({
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.ts:33:  fidelidadeAtiva: booleanChoiceSchema,
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.ts:42:export type ConfiguracaoFidelidadeFormInput = z.input<
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.ts:43:  typeof configuracaoFidelidadeFormSchema
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.ts:46:export type ConfiguracaoFidelidadeFormValues = z.output<
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.ts:47:  typeof configuracaoFidelidadeFormSchema
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.ts:50:export type ConfiguracaoFidelidadePayload = {
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.ts:51:  fidelidadeAtiva: boolean;
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.ts:60:export function emptyConfiguracaoFidelidadeFormValues(): ConfiguracaoFidelidadeFormInput {
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.ts:62:    fidelidadeAtiva: "",
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.ts:72:export function configuracaoFidelidadeToFormValues(
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.ts:73:  configuracao: ConfiguracaoFidelidade,
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.ts:74:): ConfiguracaoFidelidadeFormInput {
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.ts:76:    fidelidadeAtiva: configuracao.fidelidadeAtiva
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.ts:109:export function toConfiguracaoFidelidadePayload(
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.ts:110:  values: ConfiguracaoFidelidadeFormValues,
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.ts:111:): ConfiguracaoFidelidadePayload {
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.ts:116:    fidelidadeAtiva:
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.schema.ts:117:      values.fidelidadeAtiva === "true",
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.tsx:9:import type { ConfiguracaoFidelidade } from "../types/fidelidade.types";
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.tsx:11:  configuracaoFidelidadeFormSchema,
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.tsx:12:  configuracaoFidelidadeToFormValues,
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.tsx:13:  emptyConfiguracaoFidelidadeFormValues,
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.tsx:14:  toConfiguracaoFidelidadePayload,
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.tsx:15:  type ConfiguracaoFidelidadeFormInput,
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.tsx:16:  type ConfiguracaoFidelidadeFormValues,
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.tsx:17:  type ConfiguracaoFidelidadePayload,
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.tsx:18:} from "./configuracao-fidelidade-form.schema";
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.tsx:21:  configuracao?: ConfiguracaoFidelidade | null;
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.tsx:24:    payload: ConfiguracaoFidelidadePayload,
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.tsx:28:export function ConfiguracaoFidelidadeForm({
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.tsx:38:    ConfiguracaoFidelidadeFormInput,
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.tsx:40:    ConfiguracaoFidelidadeFormValues
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.tsx:43:      configuracaoFidelidadeFormSchema,
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.tsx:47:      ? configuracaoFidelidadeToFormValues(
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.tsx:50:      : emptyConfiguracaoFidelidadeFormValues(),
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.tsx:59:          toConfiguracaoFidelidadePayload(
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.tsx:70:          Configura├º├úo de fidelidade
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.tsx:74:          id="fidelidade-ativa"
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.tsx:75:          label="Fidelidade ativa"
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.tsx:77:            "fidelidadeAtiva",
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.tsx:80:            errors.fidelidadeAtiva?.message
beauty-core-ui/src/features/fidelidade/forms/configuracao-fidelidade-form.tsx:129:          label="Benef├¡cios autom├íticos"
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.schema.test.ts:4:  nivelFidelidadeFormSchema,
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.schema.test.ts:5:  toNivelFidelidadePayload,
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.schema.test.ts:6:} from "./nivel-fidelidade-form.schema";
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.schema.test.ts:8:describe("nivel fidelidade form", () => {
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.schema.test.ts:10:    const parsed = nivelFidelidadeFormSchema.parse({
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.schema.test.ts:13:      beneficios: "Benef├¡cio real",
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.schema.test.ts:22:      beneficios: "Benef├¡cio real",
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.schema.test.ts:26:  it("omite benef├¡cio vazio", () => {
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.schema.test.ts:28:      toNivelFidelidadePayload({
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.schema.ts:3:export const nivelFidelidadeFormSchema = z.object({
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.schema.ts:11:export type NivelFidelidadeFormValues = z.infer<
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.schema.ts:12:  typeof nivelFidelidadeFormSchema
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.schema.ts:15:export type NivelFidelidadePayload = {
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.schema.ts:21:export function toNivelFidelidadePayload(
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.schema.ts:22:  values: NivelFidelidadeFormValues,
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.schema.ts:23:): NivelFidelidadePayload {
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.tsx:6:import type { NivelFidelidade } from "../types/fidelidade.types";
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.tsx:8:  nivelFidelidadeFormSchema,
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.tsx:9:  toNivelFidelidadePayload,
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.tsx:10:  type NivelFidelidadeFormValues,
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.tsx:11:  type NivelFidelidadePayload,
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.tsx:12:} from "./nivel-fidelidade-form.schema";
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.tsx:15:  nivel?: NivelFidelidade | null;
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.tsx:17:  onSubmit: (payload: NivelFidelidadePayload) => Promise<void>;
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.tsx:21:export function NivelFidelidadeForm({
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.tsx:31:  } = useForm<NivelFidelidadeFormValues>({
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.tsx:32:    resolver: zodResolver(nivelFidelidadeFormSchema),
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.tsx:45:        await onSubmit(toNivelFidelidadePayload(values));
beauty-core-ui/src/features/fidelidade/forms/nivel-fidelidade-form.tsx:106:          Benef├¡cios
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-cliente.ts:5:import { fidelidadeQueryOptions } from "../queries/fidelidade-query-options";
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-cliente.ts:7:export function useFidelidadeCliente(clienteId: string) {
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-cliente.ts:8:  const saldoQuery = useQuery(
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-cliente.ts:9:    fidelidadeQueryOptions.saldo(clienteId),
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-cliente.ts:13:    fidelidadeQueryOptions.historico(clienteId),
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-cliente.ts:17:    saldoQuery,
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-cliente.ts:20:      saldoQuery.isPending || historicoQuery.isPending,
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-cliente.ts:22:      saldoQuery.isFetching || historicoQuery.isFetching,
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:9:import type { ConfiguracaoFidelidadePayload } from "../forms/configuracao-fidelidade-form.schema";
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:10:import type { NivelFidelidadePayload } from "../forms/nivel-fidelidade-form.schema";
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:11:import { fidelidadeQueryKeys } from "../queries/fidelidade-query-keys";
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:12:import { fidelidadeProgramaApi } from "../services/fidelidade-programa-api";
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:19:export function useFidelidadePrograma({
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:26:    queryKey: fidelidadeQueryKeys.configuracao(),
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:27:    queryFn: fidelidadeProgramaApi.getConfiguracao,
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:32:    queryKey: fidelidadeQueryKeys.niveis(),
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:33:    queryFn: fidelidadeProgramaApi.getNiveis,
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:38:    mutationFn: (payload: ConfiguracaoFidelidadePayload) =>
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:39:      fidelidadeProgramaApi.createConfiguracao(payload),
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:43:        queryKey: fidelidadeQueryKeys.configuracao(),
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:49:    mutationFn: (payload: ConfiguracaoFidelidadePayload) =>
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:50:      fidelidadeProgramaApi.updateConfiguracao(payload),
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:54:        queryKey: fidelidadeQueryKeys.configuracao(),
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:60:    mutationFn: (payload: NivelFidelidadePayload) =>
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:61:      fidelidadeProgramaApi.createNivel(payload),
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:65:        queryKey: fidelidadeQueryKeys.niveis(),
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:76:      payload: NivelFidelidadePayload;
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:78:      fidelidadeProgramaApi.updateNivel(id, payload),
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:82:        queryKey: fidelidadeQueryKeys.niveis(),
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:88:    mutationFn: fidelidadeProgramaApi.removeNivel,
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:92:        queryKey: fidelidadeQueryKeys.niveis(),
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacao-limits.ts:1:export const FIDELIDADE_OPERACAO_LIMITS = {
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-api.test.ts:24:import { fidelidadeOperacoesApi } from "./fidelidade-operacoes-api";
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-api.test.ts:29:describe("fidelidadeOperacoesApi", () => {
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-api.test.ts:45:    await fidelidadeOperacoesApi.adicionarPontos(
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-api.test.ts:50:      "/fidelidade/adicionar-pontos",
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-api.test.ts:62:    await fidelidadeOperacoesApi.resgatarPontos(
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-api.test.ts:67:      "/fidelidade/resgatar-pontos",
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-api.test.ts:79:    await fidelidadeOperacoesApi.pontuarPorValor(
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-api.test.ts:84:      "/fidelidade/pontuar-por-valor",
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-api.test.ts:100:    await fidelidadeOperacoesApi.adicionarPontos(
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-api.ts:7:} from "./fidelidade-operacoes.schema";
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-api.ts:9:export const fidelidadeOperacoesApi = {
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-api.ts:14:      "/fidelidade/adicionar-pontos",
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-api.ts:23:      "/fidelidade/resgatar-pontos",
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-api.ts:32:      "/fidelidade/pontuar-por-valor",
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.test.tsx:55:vi.mock("./use-fidelidade-operacoes", () => ({
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.test.tsx:56:  useFidelidadeOperacoes:
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.test.tsx:60:import { FidelidadeOperacoesView } from "./fidelidade-operacoes-view";
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.test.tsx:74:describe("FidelidadeOperacoesView", () => {
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.test.tsx:92:      <FidelidadeOperacoesView />,
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.test.tsx:118:      <FidelidadeOperacoesView />,
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.test.tsx:132:      <FidelidadeOperacoesView />,
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.test.tsx:147:      <FidelidadeOperacoesView />,
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.test.tsx:159:      <FidelidadeOperacoesView />,
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.test.tsx:180:      <FidelidadeOperacoesView />,
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.test.tsx:204:      <FidelidadeOperacoesView />,
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:14:import { canAdjustPoints } from "../permissions/fidelidade-permissions";
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:15:import { FIDELIDADE_OPERACAO_LIMITS } from "./fidelidade-operacao-limits";
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:26:} from "./fidelidade-operacoes.schema";
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:27:import { useFidelidadeOperacoes } from "./use-fidelidade-operacoes";
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:70:export function FidelidadeOperacoesView() {
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:103:  } = useFidelidadeOperacoes(
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:171:        Saldo, hist├│rico e c├ílculos permanecem sob
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:211:              <label htmlFor="fidelidade-adicionar-pontos">
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:216:                id="fidelidade-adicionar-pontos"
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:219:                  FIDELIDADE_OPERACAO_LIMITS
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:242:              id="fidelidade-adicionar-descricao"
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:244:                FIDELIDADE_OPERACAO_LIMITS
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:307:              O backend rejeita saldo insuficiente.
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:318:              <label htmlFor="fidelidade-resgatar-pontos">
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:323:                id="fidelidade-resgatar-pontos"
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:326:                  FIDELIDADE_OPERACAO_LIMITS
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:349:              id="fidelidade-resgatar-descricao"
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:351:                FIDELIDADE_OPERACAO_LIMITS
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:384:                Confirmo a retirada dos pontos do saldo
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:440:              <label htmlFor="fidelidade-valor-gasto">
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:445:                id="fidelidade-valor-gasto"
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:448:                  FIDELIDADE_OPERACAO_LIMITS
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:471:              id="fidelidade-pontuar-descricao"
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:473:                FIDELIDADE_OPERACAO_LIMITS
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx:513:          Opera├º├úo conclu├¡da. Saldo e hist├│rico foram
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes.schema.test.ts:7:import { FIDELIDADE_OPERACAO_LIMITS } from "./fidelidade-operacao-limits";
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes.schema.test.ts:15:} from "./fidelidade-operacoes.schema";
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes.schema.test.ts:20:describe("fidelidade opera├º├Áes schema", () => {
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes.schema.test.ts:25:          FIDELIDADE_OPERACAO_LIMITS
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes.schema.test.ts:35:          FIDELIDADE_OPERACAO_LIMITS
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes.schema.test.ts:49:        FIDELIDADE_OPERACAO_LIMITS
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes.schema.test.ts:59:          FIDELIDADE_OPERACAO_LIMITS
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes.schema.test.ts:69:          FIDELIDADE_OPERACAO_LIMITS
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes.schema.test.ts:84:        FIDELIDADE_OPERACAO_LIMITS
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes.schema.test.ts:102:          FIDELIDADE_OPERACAO_LIMITS
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes.schema.test.ts:112:          FIDELIDADE_OPERACAO_LIMITS
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes.schema.test.ts:127:        FIDELIDADE_OPERACAO_LIMITS
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes.schema.test.ts:145:          FIDELIDADE_OPERACAO_LIMITS
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes.schema.test.ts:155:          FIDELIDADE_OPERACAO_LIMITS
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes.schema.test.ts:165:          FIDELIDADE_OPERACAO_LIMITS
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes.schema.ts:3:import { FIDELIDADE_OPERACAO_LIMITS } from "./fidelidade-operacao-limits";
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes.schema.ts:58:      FIDELIDADE_OPERACAO_LIMITS
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes.schema.ts:63:      FIDELIDADE_OPERACAO_LIMITS
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes.schema.ts:71:      FIDELIDADE_OPERACAO_LIMITS
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes.schema.ts:76:      FIDELIDADE_OPERACAO_LIMITS
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes.schema.ts:84:      FIDELIDADE_OPERACAO_LIMITS
beauty-core-ui/src/features/fidelidade/operacoes/fidelidade-operacoes.schema.ts:89:      FIDELIDADE_OPERACAO_LIMITS
beauty-core-ui/src/features/fidelidade/operacoes/use-fidelidade-operacoes.ts:8:import { fidelidadeQueryKeys } from "../queries/fidelidade-query-keys";
beauty-core-ui/src/features/fidelidade/operacoes/use-fidelidade-operacoes.ts:9:import { fidelidadeOperacoesApi } from "./fidelidade-operacoes-api";
beauty-core-ui/src/features/fidelidade/operacoes/use-fidelidade-operacoes.ts:14:} from "./fidelidade-operacoes.schema";
beauty-core-ui/src/features/fidelidade/operacoes/use-fidelidade-operacoes.ts:16:export function useFidelidadeOperacoes(
beauty-core-ui/src/features/fidelidade/operacoes/use-fidelidade-operacoes.ts:25:          fidelidadeQueryKeys.saldo(
beauty-core-ui/src/features/fidelidade/operacoes/use-fidelidade-operacoes.ts:32:          fidelidadeQueryKeys.historico(
beauty-core-ui/src/features/fidelidade/operacoes/use-fidelidade-operacoes.ts:43:      fidelidadeOperacoesApi.adicionarPontos(
beauty-core-ui/src/features/fidelidade/operacoes/use-fidelidade-operacoes.ts:54:      fidelidadeOperacoesApi.resgatarPontos(
beauty-core-ui/src/features/fidelidade/operacoes/use-fidelidade-operacoes.ts:65:      fidelidadeOperacoesApi.pontuarPorValor(
beauty-core-ui/src/features/fidelidade/permissions/fidelidade-permissions.test.ts:4:  canAccessLoyalty,
beauty-core-ui/src/features/fidelidade/permissions/fidelidade-permissions.test.ts:6:  canManageBenefits,
beauty-core-ui/src/features/fidelidade/permissions/fidelidade-permissions.test.ts:9:  canManageLoyaltySettings,
beauty-core-ui/src/features/fidelidade/permissions/fidelidade-permissions.test.ts:10:  canReadLoyaltySettings,
beauty-core-ui/src/features/fidelidade/permissions/fidelidade-permissions.test.ts:11:} from "./fidelidade-permissions";
beauty-core-ui/src/features/fidelidade/permissions/fidelidade-permissions.test.ts:13:describe("fidelidade permissions", () => {
beauty-core-ui/src/features/fidelidade/permissions/fidelidade-permissions.test.ts:21:      expect(canAccessLoyalty(role)).toBe(true);
beauty-core-ui/src/features/fidelidade/permissions/fidelidade-permissions.test.ts:33:    expect(canReadLoyaltySettings("ADMIN")).toBe(true);
beauty-core-ui/src/features/fidelidade/permissions/fidelidade-permissions.test.ts:34:    expect(canReadLoyaltySettings("GERENTE")).toBe(true);
beauty-core-ui/src/features/fidelidade/permissions/fidelidade-permissions.test.ts:35:    expect(canReadLoyaltySettings("RECEPCAO")).toBe(false);
beauty-core-ui/src/features/fidelidade/permissions/fidelidade-permissions.test.ts:39:    expect(canManageLoyaltySettings("ADMIN")).toBe(true);
beauty-core-ui/src/features/fidelidade/permissions/fidelidade-permissions.test.ts:40:    expect(canManageLoyaltySettings("GERENTE")).toBe(false);
beauty-core-ui/src/features/fidelidade/permissions/fidelidade-permissions.test.ts:48:    expect(canManageBenefits("ADMIN")).toBe(true);
beauty-core-ui/src/features/fidelidade/permissions/fidelidade-permissions.test.ts:53:    expect(canAccessLoyalty("SUPER_ADMIN")).toBe(false);
beauty-core-ui/src/features/fidelidade/permissions/fidelidade-permissions.ts:35:export function canAccessLoyalty(
beauty-core-ui/src/features/fidelidade/permissions/fidelidade-permissions.ts:47:export function canReadLoyaltySettings(
beauty-core-ui/src/features/fidelidade/permissions/fidelidade-permissions.ts:53:export function canManageLoyaltySettings(
beauty-core-ui/src/features/fidelidade/permissions/fidelidade-permissions.ts:65:export function canManageBenefits(
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.test.ts:3:import { fidelidadeQueryKeys } from "./fidelidade-query-keys";
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.test.ts:5:describe("fidelidadeQueryKeys", () => {
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.test.ts:6:  it("segmenta saldo e hist├│rico por cliente", () => {
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.test.ts:7:    expect(fidelidadeQueryKeys.saldo("cliente-1")).toEqual([
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.test.ts:8:      "fidelidade",
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.test.ts:9:      "saldo",
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.test.ts:14:      fidelidadeQueryKeys.historico("cliente-1"),
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.test.ts:16:      "fidelidade",
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.test.ts:23:    expect(fidelidadeQueryKeys.configuracao()).toEqual([
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.test.ts:24:      "fidelidade",
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.test.ts:28:    expect(fidelidadeQueryKeys.niveis()).toEqual([
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.test.ts:29:      "fidelidade",
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.test.ts:34:  it("reserva namespaces para benef├¡cios e cupons", () => {
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.test.ts:35:    expect(fidelidadeQueryKeys.beneficios()).toEqual([
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.test.ts:36:      "fidelidade",
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.test.ts:40:    expect(fidelidadeQueryKeys.cupons()).toEqual([
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.test.ts:41:      "fidelidade",
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.ts:1:export const fidelidadeQueryKeys = {
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.ts:2:  all: ["fidelidade"] as const,
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.ts:4:  saldo(clienteId: string) {
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.ts:6:      ...fidelidadeQueryKeys.all,
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.ts:7:      "saldo",
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.ts:14:      ...fidelidadeQueryKeys.all,
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.ts:22:      ...fidelidadeQueryKeys.all,
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.ts:29:      ...fidelidadeQueryKeys.all,
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.ts:36:      ...fidelidadeQueryKeys.all,
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-keys.ts:43:      ...fidelidadeQueryKeys.all,
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-options.ts:3:import { fidelidadeApi } from "../services/fidelidade-api";
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-options.ts:4:import { fidelidadeQueryKeys } from "./fidelidade-query-keys";
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-options.ts:6:export const fidelidadeQueryOptions = {
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-options.ts:7:  saldo(clienteId: string) {
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-options.ts:9:      queryKey: fidelidadeQueryKeys.saldo(clienteId),
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-options.ts:10:      queryFn: () => fidelidadeApi.getSaldo(clienteId),
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-options.ts:17:      queryKey: fidelidadeQueryKeys.historico(clienteId),
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-options.ts:18:      queryFn: () => fidelidadeApi.getHistorico(clienteId),
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-options.ts:25:      queryKey: fidelidadeQueryKeys.configuracao(),
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-options.ts:26:      queryFn: () => fidelidadeApi.getConfiguracao(),
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-options.ts:32:      queryKey: fidelidadeQueryKeys.niveis(),
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-options.ts:33:      queryFn: () => fidelidadeApi.getNiveis(),
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-options.ts:39:      queryKey: fidelidadeQueryKeys.beneficios(),
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-options.ts:40:      queryFn: () => fidelidadeApi.getBeneficios(),
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-options.ts:46:      queryKey: fidelidadeQueryKeys.cupons(),
beauty-core-ui/src/features/fidelidade/queries/fidelidade-query-options.ts:47:      queryFn: () => fidelidadeApi.getCupons(),
beauty-core-ui/src/features/fidelidade/schemas/fidelidade.schemas.test.ts:4:  configuracaoFidelidadeSchema,
beauty-core-ui/src/features/fidelidade/schemas/fidelidade.schemas.test.ts:6:  fidelidadeSchema,
beauty-core-ui/src/features/fidelidade/schemas/fidelidade.schemas.test.ts:7:  nivelFidelidadeSchema,
beauty-core-ui/src/features/fidelidade/schemas/fidelidade.schemas.test.ts:8:} from "./fidelidade.schemas";
beauty-core-ui/src/features/fidelidade/schemas/fidelidade.schemas.test.ts:12:describe("fidelidade schemas", () => {
beauty-core-ui/src/features/fidelidade/schemas/fidelidade.schemas.test.ts:13:  it("parseia saldo sem expor empresaId", () => {
beauty-core-ui/src/features/fidelidade/schemas/fidelidade.schemas.test.ts:14:    const parsed = fidelidadeSchema.parse({
beauty-core-ui/src/features/fidelidade/schemas/fidelidade.schemas.test.ts:18:      saldoPontos: 120,
beauty-core-ui/src/features/fidelidade/schemas/fidelidade.schemas.test.ts:23:    expect(parsed.saldoPontos).toBe(120);
beauty-core-ui/src/features/fidelidade/schemas/fidelidade.schemas.test.ts:28:    const parsed = configuracaoFidelidadeSchema.parse({
beauty-core-ui/src/features/fidelidade/schemas/fidelidade.schemas.test.ts:31:      fidelidadeAtiva: true,
beauty-core-ui/src/features/fidelidade/schemas/fidelidade.schemas.test.ts:54:    const parsed = nivelFidelidadeSchema.parse({
beauty-core-ui/src/features/fidelidade/schemas/fidelidade.schemas.test.ts:59:      beneficios: "Benef├¡cios configurados no backend",
beauty-core-ui/src/features/fidelidade/schemas/fidelidade.schemas.ts:13:export const fidelidadeSchema = z.object({
beauty-core-ui/src/features/fidelidade/schemas/fidelidade.schemas.ts:16:  saldoPontos: z.number().int().nonnegative(),
beauty-core-ui/src/features/fidelidade/schemas/fidelidade.schemas.ts:32:export const configuracaoFidelidadeSchema = z.object({
beauty-core-ui/src/features/fidelidade/schemas/fidelidade.schemas.ts:34:  fidelidadeAtiva: z.boolean(),
beauty-core-ui/src/features/fidelidade/schemas/fidelidade.schemas.ts:52:export const nivelFidelidadeSchema = z.object({
beauty-core-ui/src/features/fidelidade/schemas/fidelidade.schemas.ts:61:export const niveisFidelidadeSchema = z.array(nivelFidelidadeSchema);
beauty-core-ui/src/features/fidelidade/schemas/fidelidade.schemas.ts:95:  saldoPontos: z.number().int().nonnegative(),
beauty-core-ui/src/features/fidelidade/schemas/fidelidade.schemas.ts:96:  nivelAtual: nivelFidelidadeSchema.nullable(),
beauty-core-ui/src/features/fidelidade/schemas/fidelidade.schemas.ts:101:  saldoPontos: z.number().int().nonnegative(),
beauty-core-ui/src/features/fidelidade/services/fidelidade-api.test.ts:13:import { fidelidadeApi } from "./fidelidade-api";
beauty-core-ui/src/features/fidelidade/services/fidelidade-api.test.ts:17:describe("fidelidadeApi", () => {
beauty-core-ui/src/features/fidelidade/services/fidelidade-api.test.ts:22:  it("consulta saldo sem empresaId", async () => {
beauty-core-ui/src/features/fidelidade/services/fidelidade-api.test.ts:28:        saldoPontos: 80,
beauty-core-ui/src/features/fidelidade/services/fidelidade-api.test.ts:34:    const result = await fidelidadeApi.getSaldo(id);
beauty-core-ui/src/features/fidelidade/services/fidelidade-api.test.ts:37:      `/fidelidade/cliente/${id}`,
beauty-core-ui/src/features/fidelidade/services/fidelidade-api.test.ts:48:    await fidelidadeApi.getHistorico(id);
beauty-core-ui/src/features/fidelidade/services/fidelidade-api.test.ts:51:      `/fidelidade/historico/${id}`,
beauty-core-ui/src/features/fidelidade/services/fidelidade-api.test.ts:59:        fidelidadeAtiva: true,
beauty-core-ui/src/features/fidelidade/services/fidelidade-api.test.ts:78:    await fidelidadeApi.getConfiguracao();
beauty-core-ui/src/features/fidelidade/services/fidelidade-api.test.ts:81:      "/configuracao-fidelidade",
beauty-core-ui/src/features/fidelidade/services/fidelidade-api.ts:5:  configuracaoFidelidadeSchema,
beauty-core-ui/src/features/fidelidade/services/fidelidade-api.ts:7:  fidelidadeSchema,
beauty-core-ui/src/features/fidelidade/services/fidelidade-api.ts:9:  niveisFidelidadeSchema,
beauty-core-ui/src/features/fidelidade/services/fidelidade-api.ts:10:} from "../schemas/fidelidade.schemas";
beauty-core-ui/src/features/fidelidade/services/fidelidade-api.ts:12:export const fidelidadeApi = {
beauty-core-ui/src/features/fidelidade/services/fidelidade-api.ts:13:  async getSaldo(clienteId: string) {
beauty-core-ui/src/features/fidelidade/services/fidelidade-api.ts:15:      `/fidelidade/cliente/${encodeURIComponent(clienteId)}`,
beauty-core-ui/src/features/fidelidade/services/fidelidade-api.ts:18:    return fidelidadeSchema.parse(response.data);
beauty-core-ui/src/features/fidelidade/services/fidelidade-api.ts:23:      `/fidelidade/historico/${encodeURIComponent(clienteId)}`,
beauty-core-ui/src/features/fidelidade/services/fidelidade-api.ts:30:    const response = await getApiClient().get("/configuracao-fidelidade");
beauty-core-ui/src/features/fidelidade/services/fidelidade-api.ts:32:    return configuracaoFidelidadeSchema.parse(response.data);
beauty-core-ui/src/features/fidelidade/services/fidelidade-api.ts:36:    const response = await getApiClient().get("/niveis-fidelidade");
beauty-core-ui/src/features/fidelidade/services/fidelidade-api.ts:38:    return niveisFidelidadeSchema.parse(response.data);
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.test.ts:24:import { fidelidadeProgramaApi } from "./fidelidade-programa-api";
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.test.ts:30:  fidelidadeAtiva: true,
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.test.ts:57:describe("fidelidadeProgramaApi", () => {
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.test.ts:68:    await fidelidadeProgramaApi.getConfiguracao();
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.test.ts:71:      "/configuracao-fidelidade",
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.test.ts:79:      fidelidadeAtiva: true,
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.test.ts:87:    await fidelidadeProgramaApi.createConfiguracao(payload);
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.test.ts:90:      "/configuracao-fidelidade",
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.test.ts:95:      "/configuracao-fidelidade",
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.test.ts:104:      fidelidadeAtiva: true,
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.test.ts:113:    await fidelidadeProgramaApi.updateConfiguracao(payload);
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.test.ts:116:      "/configuracao-fidelidade",
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.test.ts:126:    await fidelidadeProgramaApi.getNiveis();
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.test.ts:129:      "/niveis-fidelidade",
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.test.ts:141:    await fidelidadeProgramaApi.createNivel(payload);
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.test.ts:144:      "/niveis-fidelidade",
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.test.ts:155:      beneficios: "Benef├¡cio",
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.test.ts:158:    await fidelidadeProgramaApi.updateNivel(id, payload);
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.test.ts:161:      `/niveis-fidelidade/${id}`,
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.test.ts:169:    await fidelidadeProgramaApi.removeNivel(id);
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.test.ts:172:      `/niveis-fidelidade/${id}`,
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.ts:5:import type { ConfiguracaoFidelidadePayload } from "../forms/configuracao-fidelidade-form.schema";
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.ts:6:import type { NivelFidelidadePayload } from "../forms/nivel-fidelidade-form.schema";
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.ts:8:  configuracaoFidelidadeSchema,
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.ts:9:  nivelFidelidadeSchema,
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.ts:10:} from "../schemas/fidelidade.schemas";
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.ts:12:const niveisSchema = z.array(nivelFidelidadeSchema);
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.ts:14:export const fidelidadeProgramaApi = {
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.ts:17:      "/configuracao-fidelidade",
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.ts:20:    return configuracaoFidelidadeSchema.parse(response.data);
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.ts:24:    payload: ConfiguracaoFidelidadePayload,
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.ts:27:      "/configuracao-fidelidade",
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.ts:31:    return configuracaoFidelidadeSchema.parse(response.data);
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.ts:35:    payload: ConfiguracaoFidelidadePayload,
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.ts:38:      "/configuracao-fidelidade",
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.ts:42:    return configuracaoFidelidadeSchema.parse(response.data);
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.ts:47:      "/niveis-fidelidade",
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.ts:53:  async createNivel(payload: NivelFidelidadePayload) {
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.ts:55:      "/niveis-fidelidade",
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.ts:59:    return nivelFidelidadeSchema.parse(response.data);
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.ts:64:    payload: NivelFidelidadePayload,
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.ts:67:      `/niveis-fidelidade/${encodeURIComponent(id)}`,
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.ts:71:    return nivelFidelidadeSchema.parse(response.data);
beauty-core-ui/src/features/fidelidade/services/fidelidade-programa-api.ts:76:      `/niveis-fidelidade/${encodeURIComponent(id)}`,
beauty-core-ui/src/features/fidelidade/types/fidelidade.types.ts:6:  configuracaoFidelidadeSchema,
beauty-core-ui/src/features/fidelidade/types/fidelidade.types.ts:8:  fidelidadeSchema,
beauty-core-ui/src/features/fidelidade/types/fidelidade.types.ts:11:  nivelFidelidadeSchema,
beauty-core-ui/src/features/fidelidade/types/fidelidade.types.ts:12:} from "../schemas/fidelidade.schemas";
beauty-core-ui/src/features/fidelidade/types/fidelidade.types.ts:14:export type Fidelidade = z.infer<typeof fidelidadeSchema>;
beauty-core-ui/src/features/fidelidade/types/fidelidade.types.ts:16:export type ConfiguracaoFidelidade = z.infer<
beauty-core-ui/src/features/fidelidade/types/fidelidade.types.ts:17:  typeof configuracaoFidelidadeSchema
beauty-core-ui/src/features/fidelidade/types/fidelidade.types.ts:19:export type NivelFidelidade = z.infer<typeof nivelFidelidadeSchema>;
beauty-core-ui/src/features/fidelidade/types/fidelidade.types.ts:27:export type FidelidadeRole =
beauty-core-ui/src/features/fidelidade/utils/fidelidade-formatters.test.ts:6:} from "./fidelidade-formatters";
beauty-core-ui/src/features/fidelidade/utils/fidelidade-formatters.test.ts:8:describe("fidelidade formatters", () => {
beauty-core-ui/src/features/fidelidade/utils/fidelidade-formatters.test.ts:14:  it("diferencia benef├¡cio ausente", () => {
beauty-core-ui/src/features/fidelidade/utils/fidelidade-formatters.test.ts:16:    expect(formatBeneficiosNivel("  Benef├¡cio real  ")).toBe(
beauty-core-ui/src/features/fidelidade/utils/fidelidade-formatters.test.ts:17:      "Benef├¡cio real",
beauty-core-ui/src/features/fidelidade/utils/fidelidade-historico-formatters.test.ts:6:} from "./fidelidade-historico-formatters";
beauty-core-ui/src/features/fidelidade/utils/fidelidade-historico-formatters.test.ts:8:describe("fidelidade hist├│rico formatters", () => {
beauty-core-ui/src/features/financeiro/chat52-financeiro-flow.integration.test.ts:113:      "agendamentoId",
beauty-core-ui/src/features/financeiro/chat52-financeiro-flow.integration.test.ts:225:      "agendamentoId",
beauty-core-ui/src/features/financeiro/components/cancelar-movimentacao-dialog.test.tsx:24:  agendamentoId: null,
beauty-core-ui/src/features/financeiro/components/comissao-create-dialog.tsx:68:            mesmo vinculado ao agendamento.
beauty-core-ui/src/features/financeiro/components/comissao-detail-dialog.tsx:72:              <dt className="text-sm text-muted-foreground">Agendamento</dt>
beauty-core-ui/src/features/financeiro/components/comissao-detail-dialog.tsx:73:              <dd className="break-all text-sm">{query.data.agendamentoId}</dd>
beauty-core-ui/src/features/financeiro/components/comissao-form.test.tsx:16:    expect(screen.getByLabelText("ID do agendamento")).toBeInTheDocument();
beauty-core-ui/src/features/financeiro/components/comissao-form.tsx:20:  agendamentoId: "",
beauty-core-ui/src/features/financeiro/components/comissao-form.tsx:60:        <label htmlFor="comissao-agendamento" className="text-sm font-medium">
beauty-core-ui/src/features/financeiro/components/comissao-form.tsx:61:          ID do agendamento
beauty-core-ui/src/features/financeiro/components/comissao-form.tsx:65:          id="comissao-agendamento"
beauty-core-ui/src/features/financeiro/components/comissao-form.tsx:67:          {...register("agendamentoId")}
beauty-core-ui/src/features/financeiro/components/comissao-form.tsx:70:        {errors.agendamentoId ? (
beauty-core-ui/src/features/financeiro/components/comissao-form.tsx:72:            {errors.agendamentoId.message}
beauty-core-ui/src/features/financeiro/components/comissoes-list.test.tsx:13:  agendamentoId: "9b2c7c4f-18d6-4b7e-8f31-51f6cbec4d15",
beauty-core-ui/src/features/financeiro/components/comissoes-list.tsx:34:                <p className="text-xs text-muted-foreground">Agendamento</p>
beauty-core-ui/src/features/financeiro/components/comissoes-list.tsx:35:                <p className="break-all text-sm">{comissao.agendamentoId}</p>
beauty-core-ui/src/features/financeiro/components/comissoes-section.tsx:36:            Comiss├Áes vinculadas a profissionais e agendamentos.
beauty-core-ui/src/features/financeiro/components/financeiro-operacional-cards.test.tsx:17:          saldo: 600,
beauty-core-ui/src/features/financeiro/components/financeiro-operacional-cards.test.tsx:30:    expect(screen.getByText("Saldo no per├¡odo")).toBeInTheDocument();
beauty-core-ui/src/features/financeiro/components/financeiro-operacional-cards.tsx:28:      label: "Saldo no per├¡odo",
beauty-core-ui/src/features/financeiro/components/financeiro-operacional-cards.tsx:29:      value: resumo.saldo,
beauty-core-ui/src/features/financeiro/components/movimentacao-financeira-form-dialog.tsx:85:    movimentacao && (movimentacao.clienteId || movimentacao.agendamentoId),
beauty-core-ui/src/features/financeiro/components/movimentacao-financeira-form-dialog.tsx:129:                  agendamentoId: movimentacao.agendamentoId ?? "",
beauty-core-ui/src/features/financeiro/components/movimentacao-financeira-form.test.tsx:63:          agendamentoId: "",
beauty-core-ui/src/features/financeiro/components/movimentacao-financeira-form.test.tsx:80:      screen.queryByLabelText("Agendamento ID (opcional)"),
beauty-core-ui/src/features/financeiro/components/movimentacao-financeira-form.tsx:26:  agendamentoId: "",
beauty-core-ui/src/features/financeiro/components/movimentacao-financeira-form.tsx:85:              cliente ou agendamento vinculado.
beauty-core-ui/src/features/financeiro/components/movimentacao-financeira-form.tsx:207:                htmlFor="movimentacao-agendamento"
beauty-core-ui/src/features/financeiro/components/movimentacao-financeira-form.tsx:210:                Agendamento ID (opcional)
beauty-core-ui/src/features/financeiro/components/movimentacao-financeira-form.tsx:214:                id="movimentacao-agendamento"
beauty-core-ui/src/features/financeiro/components/movimentacao-financeira-form.tsx:216:                {...register("agendamentoId")}
beauty-core-ui/src/features/financeiro/components/movimentacao-financeira-form.tsx:219:              {errors.agendamentoId ? (
beauty-core-ui/src/features/financeiro/components/movimentacao-financeira-form.tsx:221:                  {errors.agendamentoId.message}
beauty-core-ui/src/features/financeiro/components/movimentacoes-financeiras-filters.tsx:31:    query.agendamentoId ||
beauty-core-ui/src/features/financeiro/components/movimentacoes-financeiras-filters.tsx:205:      {query.agendamentoId ? (
beauty-core-ui/src/features/financeiro/components/movimentacoes-financeiras-filters.tsx:208:            Filtro por agendamento ativo.
beauty-core-ui/src/features/financeiro/components/movimentacoes-financeiras-filters.tsx:216:                agendamentoId: undefined,
beauty-core-ui/src/features/financeiro/components/movimentacoes-financeiras-filters.tsx:220:            Remover agendamento
beauty-core-ui/src/features/financeiro/components/movimentacoes-financeiras-list.test.tsx:14:  agendamentoId: null,
beauty-core-ui/src/features/financeiro/components/relatorios-financeiros-section.tsx:174:            Entradas, sa├¡das e saldo calculados pelo backend sobre movimenta├º├Áes
beauty-core-ui/src/features/financeiro/components/relatorios-financeiros-section.tsx:209:                <p className="text-sm text-muted-foreground">Saldo</p>
beauty-core-ui/src/features/financeiro/components/relatorios-financeiros-section.tsx:212:                  {formatFinanceiroCurrency(fluxo.data.saldo)}
beauty-core-ui/src/features/financeiro/forms/comissao-form.schema.test.ts:7:  agendamentoId: "9b2c7c4f-18d6-4b7e-8f31-51f6cbec4d15",
beauty-core-ui/src/features/financeiro/forms/comissao-form.schema.ts:15:    agendamentoId: z
beauty-core-ui/src/features/financeiro/forms/comissao-form.schema.ts:18:      .regex(uuidV4Pattern, "Informe um agendamento v├ílido."),
beauty-core-ui/src/features/financeiro/forms/comissao-payload.test.ts:9:      agendamentoId: "9b2c7c4f-18d6-4b7e-8f31-51f6cbec4d15",
beauty-core-ui/src/features/financeiro/forms/comissao-payload.test.ts:16:      agendamentoId: "9b2c7c4f-18d6-4b7e-8f31-51f6cbec4d15",
beauty-core-ui/src/features/financeiro/forms/comissao-payload.test.ts:31:      agendamentoId: "9b2c7c4f-18d6-4b7e-8f31-51f6cbec4d15",
beauty-core-ui/src/features/financeiro/forms/comissao-payload.test.ts:38:      agendamentoId: "9b2c7c4f-18d6-4b7e-8f31-51f6cbec4d15",
beauty-core-ui/src/features/financeiro/forms/comissao-payload.ts:20:    agendamentoId: values.agendamentoId,
beauty-core-ui/src/features/financeiro/forms/movimentacao-financeira-form.schema.test.ts:8:  agendamentoId: "",
beauty-core-ui/src/features/financeiro/forms/movimentacao-financeira-form.schema.ts:20:    agendamentoId: optionalUuidSchema,
beauty-core-ui/src/features/financeiro/forms/movimentacao-financeira-payload.test.ts:11:  agendamentoId: "9b2c7c4f-18d6-4b7e-8f31-51f6cbec4d15",
beauty-core-ui/src/features/financeiro/forms/movimentacao-financeira-payload.test.ts:26:      agendamentoId: receitaValues.agendamentoId,
beauty-core-ui/src/features/financeiro/forms/movimentacao-financeira-payload.test.ts:38:  it("n├úo envia cliente/agendamento em despesa", () => {
beauty-core-ui/src/features/financeiro/forms/movimentacao-financeira-payload.test.ts:46:    expect(payload).not.toHaveProperty("agendamentoId");
beauty-core-ui/src/features/financeiro/forms/movimentacao-financeira-payload.ts:23:  const agendamentoId =
beauty-core-ui/src/features/financeiro/forms/movimentacao-financeira-payload.ts:24:    values.tipo === "RECEITA" ? optionalText(values.agendamentoId) : undefined;
beauty-core-ui/src/features/financeiro/forms/movimentacao-financeira-payload.ts:31:    ...(agendamentoId ? { agendamentoId } : {}),
beauty-core-ui/src/features/financeiro/queries/financeiro-query-options.test.ts:13:      saldo: 75,
beauty-core-ui/src/features/financeiro/schemas/categorias-financeiras.schemas.test.ts:22:  it("remove empresaId da resposta consumida", () => {
beauty-core-ui/src/features/financeiro/schemas/comissoes.schemas.test.ts:11:  agendamentoId: "9b2c7c4f-18d6-4b7e-8f31-51f6cbec4d15",
beauty-core-ui/src/features/financeiro/schemas/comissoes.schemas.test.ts:40:  it("remove empresaId da resposta consumida", () => {
beauty-core-ui/src/features/financeiro/schemas/comissoes.schemas.ts:13:  agendamentoId: z.string().uuid(),
beauty-core-ui/src/features/financeiro/schemas/financeiro.schemas.test.ts:73:        saldo: 750,
beauty-core-ui/src/features/financeiro/schemas/financeiro.schemas.test.ts:78:      saldo: 750,
beauty-core-ui/src/features/financeiro/schemas/financeiro.schemas.ts:30:    agendamentoId: optionalUuidSchema,
beauty-core-ui/src/features/financeiro/schemas/financeiro.schemas.ts:59:    saldo: z.number(),
beauty-core-ui/src/features/financeiro/schemas/movimentacoes-financeiras.schemas.test.ts:12:  agendamentoId: null,
beauty-core-ui/src/features/financeiro/schemas/movimentacoes-financeiras.schemas.test.ts:54:  it("remove empresaId da resposta consumida", () => {
beauty-core-ui/src/features/financeiro/schemas/movimentacoes-financeiras.schemas.ts:27:const agendamentoRelacionadoSchema = z.object({
beauty-core-ui/src/features/financeiro/schemas/movimentacoes-financeiras.schemas.ts:35:  agendamentoId: z.string().uuid().nullable().optional(),
beauty-core-ui/src/features/financeiro/schemas/movimentacoes-financeiras.schemas.ts:47:  agendamento: agendamentoRelacionadoSchema.nullable().optional(),
beauty-core-ui/src/features/financeiro/schemas/relatorios-financeiros.schemas.test.ts:13:  agendamentoId: null,
beauty-core-ui/src/features/financeiro/schemas/relatorios-financeiros.schemas.test.ts:31:        saldo: 600,
beauty-core-ui/src/features/financeiro/schemas/relatorios-financeiros.schemas.test.ts:37:      saldo: 600,
beauty-core-ui/src/features/financeiro/schemas/relatorios-financeiros.schemas.test.ts:45:      saldo: 600,
beauty-core-ui/src/features/financeiro/schemas/relatorios-financeiros.schemas.test.ts:51:    expect(parsed.saldo).toBe(600);
beauty-core-ui/src/features/financeiro/schemas/relatorios-financeiros.schemas.ts:8:  saldo: z.number().finite(),
beauty-core-ui/src/features/financeiro/schemas/relatorios-financeiros.schemas.ts:14:  saldo: z.number().finite(),
beauty-core-ui/src/features/financeiro/services/comissoes-api.test.ts:27:  agendamentoId: "9b2c7c4f-18d6-4b7e-8f31-51f6cbec4d15",
beauty-core-ui/src/features/financeiro/services/comissoes-api.test.ts:70:      agendamentoId: comissao.agendamentoId,
beauty-core-ui/src/features/financeiro/services/financeiro-api.test.ts:33:      agendamentoId: "agendamento-1",
beauty-core-ui/src/features/financeiro/services/financeiro-api.test.ts:43:      agendamentoId: "agendamento-1",
beauty-core-ui/src/features/financeiro/services/financeiro-api.ts:43:  if (query.agendamentoId) {
beauty-core-ui/src/features/financeiro/services/financeiro-api.ts:44:    params.set("agendamentoId", query.agendamentoId);
beauty-core-ui/src/features/financeiro/services/movimentacoes-financeiras-api.test.ts:30:  agendamentoId: null,
beauty-core-ui/src/features/financeiro/services/relatorios-financeiros-api.test.ts:30:        saldo: 600,
beauty-core-ui/src/features/financeiro/services/relatorios-financeiros-api.test.ts:53:        saldo: 600,
beauty-core-ui/src/features/financeiro/services/relatorios-financeiros-api.test.ts:94:        saldo: 0,
beauty-core-ui/src/features/financeiro/testing/financeiro-ordering-contract.test.ts:31:        orderBy: "saldo",
beauty-core-ui/src/features/financeiro/types/financeiro.types.ts:52:  agendamentoId?: string;
beauty-core-ui/src/features/financeiro/types/financeiro.types.ts:67:  saldo: number;
beauty-core-ui/src/features/financeiro/types/financeiro.types.ts:101:export type MovimentacaoFinanceiraAgendamento = {
beauty-core-ui/src/features/financeiro/types/financeiro.types.ts:109:  agendamentoId?: string | null;
beauty-core-ui/src/features/financeiro/types/financeiro.types.ts:121:  agendamento?: MovimentacaoFinanceiraAgendamento | null;
beauty-core-ui/src/features/financeiro/types/financeiro.types.ts:135:  agendamentoId?: string;
beauty-core-ui/src/features/financeiro/types/financeiro.types.ts:153:  agendamentoId: string;
beauty-core-ui/src/features/financeiro/types/financeiro.types.ts:164:  agendamentoId: string;
beauty-core-ui/src/features/financeiro/utils/financeiro-query.ts:14:    ...(parsed.agendamentoId ? { agendamentoId: parsed.agendamentoId } : {}),
beauty-core-ui/src/features/financeiro/utils/movimentacoes-list-url.test.ts:64:        orderBy: "saldo",
beauty-core-ui/src/features/financeiro/utils/movimentacoes-list-url.ts:62:  const agendamentoId = uuid(params.get("agendamentoId"));
beauty-core-ui/src/features/financeiro/utils/movimentacoes-list-url.ts:80:    ...(agendamentoId ? { agendamentoId } : {}),
beauty-core-ui/src/features/financeiro/utils/movimentacoes-list-url.ts:107:  if (query.agendamentoId) {
beauty-core-ui/src/features/financeiro/utils/movimentacoes-list-url.ts:108:    params.set("agendamentoId", query.agendamentoId);
beauty-core-ui/src/features/notificacoes/schemas/notificacoes-settings-schema.test.ts:15:  notificarAgendamentos: true,
beauty-core-ui/src/features/notificacoes/schemas/notificacoes-settings-schema.test.ts:17:  notificarFidelidade: true,
beauty-core-ui/src/features/notificacoes/schemas/notificacoes-settings-schema.test.ts:18:  notificarPacotes: true,
beauty-core-ui/src/features/notificacoes/schemas/notificacoes-settings-schema.test.ts:35:      parsed.notificarAgendamentos,
beauty-core-ui/src/features/notificacoes/schemas/notificacoes-settings-schema.test.ts:65:        notificarAgendamentos: true,
beauty-core-ui/src/features/notificacoes/schemas/notificacoes-settings-schema.test.ts:67:        notificarFidelidade: true,
beauty-core-ui/src/features/notificacoes/schemas/notificacoes-settings-schema.test.ts:68:        notificarPacotes: true,
beauty-core-ui/src/features/notificacoes/schemas/notificacoes-settings-schema.test.ts:79:        notificarAgendamentos: true,
beauty-core-ui/src/features/notificacoes/schemas/notificacoes-settings-schema.test.ts:81:        notificarFidelidade: true,
beauty-core-ui/src/features/notificacoes/schemas/notificacoes-settings-schema.test.ts:82:        notificarPacotes: true,
beauty-core-ui/src/features/notificacoes/schemas/notificacoes-settings-schema.test.ts:94:        notificarAgendamentos: true,
beauty-core-ui/src/features/notificacoes/schemas/notificacoes-settings-schema.test.ts:96:        notificarFidelidade: true,
beauty-core-ui/src/features/notificacoes/schemas/notificacoes-settings-schema.test.ts:97:        notificarPacotes: true,
beauty-core-ui/src/features/notificacoes/schemas/notificacoes.schemas.ts:81:    notificarAgendamentos: z.boolean(),
beauty-core-ui/src/features/notificacoes/schemas/notificacoes.schemas.ts:83:    notificarFidelidade: z.boolean(),
beauty-core-ui/src/features/notificacoes/schemas/notificacoes.schemas.ts:84:    notificarPacotes: z.boolean(),
beauty-core-ui/src/features/notificacoes/schemas/notificacoes.schemas.ts:91:    notificarAgendamentos: z.boolean(),
beauty-core-ui/src/features/notificacoes/schemas/notificacoes.schemas.ts:93:    notificarFidelidade: z.boolean(),
beauty-core-ui/src/features/notificacoes/schemas/notificacoes.schemas.ts:94:    notificarPacotes: z.boolean(),
beauty-core-ui/src/features/notificacoes/services/notificacoes-settings-api.test.ts:40:  notificarAgendamentos: true,
beauty-core-ui/src/features/notificacoes/services/notificacoes-settings-api.test.ts:42:  notificarFidelidade: true,
beauty-core-ui/src/features/notificacoes/services/notificacoes-settings-api.test.ts:43:  notificarPacotes: true,
beauty-core-ui/src/features/notificacoes/services/notificacoes-settings-api.test.ts:53:  notificarAgendamentos: true,
beauty-core-ui/src/features/notificacoes/services/notificacoes-settings-api.test.ts:55:  notificarFidelidade: true,
beauty-core-ui/src/features/notificacoes/services/notificacoes-settings-api.test.ts:56:  notificarPacotes: true,
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.test.tsx:22:  notificarAgendamentos: true,
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.test.tsx:24:  notificarFidelidade: true,
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.test.tsx:25:  notificarPacotes: true,
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.test.tsx:45:      "Agendamentos",
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.test.tsx:47:      "Fidelidade",
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.test.tsx:48:      "Pacotes",
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.test.tsx:71:          name: /Agendamentos/i,
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.test.tsx:148:          notificarAgendamentos: true,
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.test.tsx:150:          notificarFidelidade: true,
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.test.tsx:151:          notificarPacotes: true,
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.tsx:27:    name: "notificarAgendamentos",
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.tsx:28:    title: "Agendamentos",
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.tsx:30:      "Permite notifica├º├Áes relacionadas a agendamentos.",
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.tsx:39:    name: "notificarFidelidade",
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.tsx:40:    title: "Fidelidade",
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.tsx:42:      "Permite notifica├º├Áes do programa de fidelidade.",
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.tsx:45:    name: "notificarPacotes",
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.tsx:46:    title: "Pacotes",
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.tsx:48:      "Permite notifica├º├Áes relacionadas a pacotes de clientes.",
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.tsx:68:    notificarAgendamentos:
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.tsx:69:      configuracao.notificarAgendamentos,
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.tsx:72:    notificarFidelidade:
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.tsx:73:      configuracao.notificarFidelidade,
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.tsx:74:    notificarPacotes:
beauty-core-ui/src/features/notificacoes/settings/notificacoes-settings-form.tsx:75:      configuracao.notificarPacotes,
beauty-core-ui/src/features/notificacoes/types/notificacoes.types.ts:5:  "AGENDAMENTO",
beauty-core-ui/src/features/notificacoes/types/notificacoes.types.ts:7:  "FIDELIDADE",
beauty-core-ui/src/features/notificacoes/types/notificacoes.types.ts:8:  "PACOTE",
beauty-core-ui/src/features/notificacoes/types/notificacoes.types.ts:91:  notificarAgendamentos: boolean;
beauty-core-ui/src/features/notificacoes/types/notificacoes.types.ts:93:  notificarFidelidade: boolean;
beauty-core-ui/src/features/notificacoes/types/notificacoes.types.ts:94:  notificarPacotes: boolean;
beauty-core-ui/src/features/pacotes/catalogo/pacote-form-limits.ts:1:export const PACOTE_FORM_LIMITS = {
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:7:import { PACOTE_FORM_LIMITS } from "./pacote-form-limits";
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:9:  emptyPacoteFormValues,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:10:  pacoteFormSchema,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:11:  toPacotePayload,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:12:} from "./pacote-form.schema";
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:14:describe("pacoteFormSchema", () => {
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:17:      emptyPacoteFormValues();
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:28:      pacoteFormSchema.safeParse(
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:36:      pacoteFormSchema.parse({
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:37:        nome: " Pacote real ",
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:40:          PACOTE_FORM_LIMITS.valorMin,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:43:          PACOTE_FORM_LIMITS
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:53:      toPacotePayload(parsed),
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:55:      nome: "Pacote real",
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:57:        PACOTE_FORM_LIMITS.valorMin,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:59:        PACOTE_FORM_LIMITS
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:66:      pacoteFormSchema.parse({
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:67:        nome: "Pacote v├ílido",
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:72:          PACOTE_FORM_LIMITS
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:78:      toPacotePayload(parsed),
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:80:      nome: "Pacote v├ílido",
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:85:        PACOTE_FORM_LIMITS
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:92:      pacoteFormSchema.safeParse({
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:93:        nome: "Pacote v├ílido",
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:96:          PACOTE_FORM_LIMITS.valorMin,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:99:          PACOTE_FORM_LIMITS
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:107:      pacoteFormSchema.safeParse({
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:108:        nome: "Pacote v├ílido",
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:111:          PACOTE_FORM_LIMITS.valorMin,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:114:          PACOTE_FORM_LIMITS
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.test.ts:118:          PACOTE_FORM_LIMITS
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.ts:3:import { PACOTE_FORM_LIMITS } from "./pacote-form-limits";
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.ts:13:        PACOTE_FORM_LIMITS.valorMin,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.ts:14:    `Informe um valor maior ou igual a ${PACOTE_FORM_LIMITS.valorMin}.`,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.ts:26:        PACOTE_FORM_LIMITS.quantidadeSessoesMin,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.ts:27:    `Informe um inteiro maior ou igual a ${PACOTE_FORM_LIMITS.quantidadeSessoesMin}.`,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.ts:40:          PACOTE_FORM_LIMITS.validadeDiasMin
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.ts:42:    `Informe um inteiro maior ou igual a ${PACOTE_FORM_LIMITS.validadeDiasMin}.`,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.ts:45:export const pacoteFormSchema = z.object({
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.ts:50:      PACOTE_FORM_LIMITS.nomeMin,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.ts:51:      `Informe pelo menos ${PACOTE_FORM_LIMITS.nomeMin} caracteres.`,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.ts:54:      PACOTE_FORM_LIMITS.nomeMax,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.ts:55:      `Use no m├íximo ${PACOTE_FORM_LIMITS.nomeMax} caracteres.`,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.ts:61:      PACOTE_FORM_LIMITS.descricaoMax,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.ts:62:      `Use no m├íximo ${PACOTE_FORM_LIMITS.descricaoMax} caracteres.`,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.ts:70:export type PacoteFormValues = z.infer<
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.ts:71:  typeof pacoteFormSchema
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.ts:74:export type PacotePayload = {
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.ts:82:export function emptyPacoteFormValues(): PacoteFormValues {
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.ts:92:export function toPacotePayload(
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.ts:93:  values: PacoteFormValues,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.schema.ts:94:): PacotePayload {
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:6:import type { Pacote } from "../types/pacotes.types";
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:7:import { PACOTE_FORM_LIMITS } from "./pacote-form-limits";
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:9:  emptyPacoteFormValues,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:10:  pacoteFormSchema,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:11:  toPacotePayload,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:12:  type PacoteFormValues,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:13:  type PacotePayload,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:14:} from "./pacote-form.schema";
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:17:  pacote?: Pacote | null;
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:19:  onSubmit: (payload: PacotePayload) => Promise<void>;
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:23:function pacoteToFormValues(pacote: Pacote): PacoteFormValues {
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:25:    nome: pacote.nome,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:26:    descricao: pacote.descricao ?? "",
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:27:    valor: String(pacote.valor),
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:28:    quantidadeSessoes: String(pacote.quantidadeSessoes),
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:30:      pacote.validadeDias == null ? "" : String(pacote.validadeDias),
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:34:export function PacoteForm({
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:35:  pacote,
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:44:  } = useForm<PacoteFormValues>({
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:45:    resolver: zodResolver(pacoteFormSchema),
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:47:    defaultValues: pacote
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:48:      ? pacoteToFormValues(pacote)
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:49:      : emptyPacoteFormValues(),
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:57:        await onSubmit(toPacotePayload(values));
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:61:        <legend className="sr-only">Dados do pacote</legend>
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:64:          <label htmlFor={`pacote-nome-${pacote?.id ?? "novo"}`}>Nome</label>
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:67:            id={`pacote-nome-${pacote?.id ?? "novo"}`}
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:71:                ? `pacote-nome-${pacote?.id ?? "novo"}-error`
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:74:            maxLength={PACOTE_FORM_LIMITS.nomeMax}
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:81:              id={`pacote-nome-${pacote?.id ?? "novo"}-error`}
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:91:          <label htmlFor={`pacote-descricao-${pacote?.id ?? "novo"}`}>
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:96:            id={`pacote-descricao-${pacote?.id ?? "novo"}`}
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:100:                ? `pacote-descricao-${pacote?.id ?? "novo"}-error`
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:103:            maxLength={PACOTE_FORM_LIMITS.descricaoMax}
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:111:              id={`pacote-descricao-${pacote?.id ?? "novo"}-error`}
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:122:            <label htmlFor={`pacote-valor-${pacote?.id ?? "novo"}`}>
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:127:              id={`pacote-valor-${pacote?.id ?? "novo"}`}
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:131:                  ? `pacote-valor-${pacote?.id ?? "novo"}-error`
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:135:              min={PACOTE_FORM_LIMITS.valorMin}
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:143:                id={`pacote-valor-${pacote?.id ?? "novo"}-error`}
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:153:            <label htmlFor={`pacote-sessoes-${pacote?.id ?? "novo"}`}>
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:158:              id={`pacote-sessoes-${pacote?.id ?? "novo"}`}
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:162:                  ? `pacote-sessoes-${pacote?.id ?? "novo"}-error`
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:166:              min={PACOTE_FORM_LIMITS.quantidadeSessoesMin}
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:174:                id={`pacote-sessoes-${pacote?.id ?? "novo"}-error`}
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:185:          <label htmlFor={`pacote-validade-${pacote?.id ?? "novo"}`}>
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:190:            id={`pacote-validade-${pacote?.id ?? "novo"}`}
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:194:                ? `pacote-validade-${pacote?.id ?? "novo"}-error`
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:198:            min={PACOTE_FORM_LIMITS.validadeDiasMin}
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:210:              id={`pacote-validade-${pacote?.id ?? "novo"}-error`}
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:228:            : pacote
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:229:              ? "Salvar pacote"
beauty-core-ui/src/features/pacotes/catalogo/pacote-form.tsx:230:              : "Criar pacote"}
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.test.ts:27:import { pacotesCatalogoApi } from "./pacotes-catalogo-api";
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.test.ts:29:const pacote = {
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.test.ts:32:  nome: "Pacote real",
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.test.ts:45:describe("pacotesCatalogoApi", () => {
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.test.ts:52:  it("lista pacotes", async () => {
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.test.ts:54:      data: [pacote],
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.test.ts:57:    await pacotesCatalogoApi.list();
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.test.ts:60:      "/pacotes",
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.test.ts:66:      data: pacote,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.test.ts:69:    await pacotesCatalogoApi.detail(id);
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.test.ts:72:      `/pacotes/${id}`,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.test.ts:78:      data: pacote,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.test.ts:82:      nome: "Pacote real",
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.test.ts:89:    await pacotesCatalogoApi.create(
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.test.ts:94:      "/pacotes",
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.test.ts:113:      data: pacote,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.test.ts:117:      nome: "Pacote atualizado",
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.test.ts:122:    await pacotesCatalogoApi.update(
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.test.ts:128:      `/pacotes/${id}`,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.test.ts:136:        ...pacote,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.test.ts:141:    await pacotesCatalogoApi.inativar(id);
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.test.ts:144:      `/pacotes/${id}/inativar`,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.ts:4:  pacoteSchema,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.ts:5:  pacotesSchema,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.ts:6:} from "../schemas/pacotes.schemas";
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.ts:8:import type { PacotePayload } from "./pacote-form.schema";
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.ts:10:export const pacotesCatalogoApi = {
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.ts:14:        "/pacotes",
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.ts:17:    return pacotesSchema.parse(response.data);
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.ts:23:        `/pacotes/${encodeURIComponent(id)}`,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.ts:26:    return pacoteSchema.parse(
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.ts:32:    payload: PacotePayload,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.ts:36:        "/pacotes",
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.ts:40:    return pacoteSchema.parse(
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.ts:47:    payload: PacotePayload,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.ts:51:        `/pacotes/${encodeURIComponent(id)}`,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.ts:55:    return pacoteSchema.parse(
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.ts:63:        `/pacotes/${encodeURIComponent(id)}/inativar`,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-api.ts:66:    return pacoteSchema.parse(
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.test.tsx:40:vi.mock("./use-pacotes-catalogo", () => ({
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.test.tsx:41:  usePacotesCatalogo:
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.test.tsx:45:import { PacotesCatalogoView } from "./pacotes-catalogo-view";
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.test.tsx:66:const pacoteAtivo = {
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.test.tsx:68:  nome: "Pacote real",
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.test.tsx:84:describe("PacotesCatalogoView", () => {
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.test.tsx:92:        pacoteAtivo,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.test.tsx:102:      <PacotesCatalogoView />,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.test.tsx:107:        name: "Criar pacote",
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.test.tsx:128:      <PacotesCatalogoView />,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.test.tsx:133:        "Pacote real",
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.test.tsx:139:        name: "Criar pacote",
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.test.tsx:148:      <PacotesCatalogoView />,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.test.tsx:159:        "Pacote real",
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.test.tsx:166:      <PacotesCatalogoView />,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.test.tsx:186:          ...pacoteAtivo,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.test.tsx:196:      <PacotesCatalogoView />,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.test.tsx:225:      <PacotesCatalogoView />,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.test.tsx:230:        "Nenhum pacote cadastrado",
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:8:  canAccessPackages,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:9:  canManagePackages,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:10:} from "../permissions/pacotes-permissions";
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:11:import { PacoteForm } from "./pacote-form";
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:12:import type { PacotePayload } from "./pacote-form.schema";
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:13:import { usePacotesCatalogo } from "./use-pacotes-catalogo";
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:27:export function PacotesCatalogoView() {
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:33:    canAccessPackages(role);
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:36:    canManagePackages(role);
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:49:  } = usePacotesCatalogo({
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:57:          Pacotes
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:61:          Seu perfil n├úo possui acesso ao cat├ílogo administrativo de pacotes.
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:69:      (pacote) =>
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:70:        pacote.id === editingId,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:81:          Pacotes
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:85:          Cadastre e mantenha o cat├ílogo de pacotes. Atribui├º├úo a clientes e consumo de sess├Áes ser├úo tratados separadamente.
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:92:            Novo pacote
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:96:            <PacoteForm
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:101:                payload: PacotePayload,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:115:            Editar pacote
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:119:            <PacoteForm
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:121:              pacote={editing}
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:126:                payload: PacotePayload,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:161:              N├úo foi poss├¡vel carregar os pacotes.
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:179:              Nenhum pacote cadastrado
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:183:              O frontend n├úo cria pacotes ou condi├º├Áes comerciais automaticamente.
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:192:            aria-label="Cat├ílogo de pacotes"
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:194:            {query.data.map((pacote) => (
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:196:                key={pacote.id}
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:203:                        {pacote.nome}
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:207:                        {pacote.ativo
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:214:                      {pacote.descricao?.trim() ||
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:226:                            pacote.valor,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:238:                            pacote
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:250:                          {pacote.validadeDias ==
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:253:                            : `${pacote.validadeDias} dias`}
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:265:                            pacote.id,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:273:                      {pacote.ativo ? (
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:275:                        pacote.id ? (
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:286:                                    pacote.id,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:295:                                      pacote.id
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:329:                                pacote.id,
beauty-core-ui/src/features/pacotes/catalogo/pacotes-catalogo-view.tsx:353:            N├úo foi poss├¡vel concluir a opera├º├úo do pacote.
beauty-core-ui/src/features/pacotes/catalogo/use-pacotes-catalogo.ts:9:import { pacotesQueryKeys } from "../queries/pacotes-query-keys";
beauty-core-ui/src/features/pacotes/catalogo/use-pacotes-catalogo.ts:10:import type { PacotePayload } from "./pacote-form.schema";
beauty-core-ui/src/features/pacotes/catalogo/use-pacotes-catalogo.ts:11:import { pacotesCatalogoApi } from "./pacotes-catalogo-api";
beauty-core-ui/src/features/pacotes/catalogo/use-pacotes-catalogo.ts:17:export function usePacotesCatalogo({
beauty-core-ui/src/features/pacotes/catalogo/use-pacotes-catalogo.ts:24:    queryKey: pacotesQueryKeys.all,
beauty-core-ui/src/features/pacotes/catalogo/use-pacotes-catalogo.ts:26:      pacotesCatalogoApi.list,
beauty-core-ui/src/features/pacotes/catalogo/use-pacotes-catalogo.ts:34:        payload: PacotePayload,
beauty-core-ui/src/features/pacotes/catalogo/use-pacotes-catalogo.ts:36:        pacotesCatalogoApi.create(
beauty-core-ui/src/features/pacotes/catalogo/use-pacotes-catalogo.ts:42:          queryKey: pacotesQueryKeys.all,
beauty-core-ui/src/features/pacotes/catalogo/use-pacotes-catalogo.ts:54:        payload: PacotePayload;
beauty-core-ui/src/features/pacotes/catalogo/use-pacotes-catalogo.ts:56:        pacotesCatalogoApi.update(
beauty-core-ui/src/features/pacotes/catalogo/use-pacotes-catalogo.ts:63:          queryKey: pacotesQueryKeys.all,
beauty-core-ui/src/features/pacotes/catalogo/use-pacotes-catalogo.ts:71:        pacotesCatalogoApi.inativar,
beauty-core-ui/src/features/pacotes/catalogo/use-pacotes-catalogo.ts:75:          queryKey: pacotesQueryKeys.all,
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.test.ts:8:  clientePacoteFormSchema,
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.test.ts:9:  toCreateClientePacotePayload,
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.test.ts:10:} from "./cliente-pacote-form.schema";
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.test.ts:15:const pacoteId =
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.test.ts:18:describe("clientePacoteFormSchema", () => {
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.test.ts:21:      clientePacoteFormSchema.safeParse({
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.test.ts:23:        pacoteId,
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.test.ts:28:      clientePacoteFormSchema.safeParse({
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.test.ts:30:        pacoteId,
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.test.ts:35:  it("gera somente clienteId + pacoteId", () => {
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.test.ts:37:      clientePacoteFormSchema.parse({
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.test.ts:39:        pacoteId,
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.test.ts:47:      toCreateClientePacotePayload(
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.test.ts:52:      pacoteId,
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.ts:3:export const clientePacoteFormSchema =
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.ts:11:    pacoteId: z
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.ts:14:        "Selecione um pacote v├ílido.",
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.ts:18:export type ClientePacoteFormValues =
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.ts:20:    typeof clientePacoteFormSchema
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.ts:23:export type CreateClientePacotePayload = {
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.ts:25:  pacoteId: string;
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.ts:28:export function toCreateClientePacotePayload(
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.ts:29:  values: ClientePacoteFormValues,
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.ts:30:): CreateClientePacotePayload {
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.ts:33:    pacoteId: values.pacoteId,
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:6:import type { Pacote } from "../types/pacotes.types";
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:8:  clientePacoteFormSchema,
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:9:  toCreateClientePacotePayload,
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:10:  type ClientePacoteFormValues,
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:11:  type CreateClientePacotePayload,
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:12:} from "./cliente-pacote-form.schema";
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:16:  pacotes: Pacote[];
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:17:  isLoadingPacotes: boolean;
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:19:  onSubmit: (payload: CreateClientePacotePayload) => Promise<void>;
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:22:export function ClientePacoteForm({
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:24:  pacotes,
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:25:  isLoadingPacotes,
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:33:  } = useForm<ClientePacoteFormValues>({
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:34:    resolver: zodResolver(clientePacoteFormSchema),
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:38:      pacoteId: "",
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:47:        await onSubmit(toCreateClientePacotePayload(values));
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:53:        <label htmlFor="cliente-pacote-pacote">Pacote</label>
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:56:          id="cliente-pacote-pacote"
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:57:          aria-invalid={Boolean(errors.pacoteId)}
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:59:            errors.pacoteId ? "cliente-pacote-pacote-error" : undefined
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:61:          disabled={isLoadingPacotes || isSubmitting}
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:62:          {...register("pacoteId")}
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:67:          {pacotes.map((pacote) => (
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:68:            <option key={pacote.id} value={pacote.id} disabled={!pacote.ativo}>
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:69:              {pacote.nome}
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:70:              {pacote.ativo ? "" : " ÔÇö inativo"}
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:75:        {errors.pacoteId ? (
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:77:            id="cliente-pacote-pacote-error"
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:81:            {errors.pacoteId.message}
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:94:        disabled={isLoadingPacotes || isSubmitting}
beauty-core-ui/src/features/pacotes/clientes-pacotes/cliente-pacote-form.tsx:97:        {isSubmitting ? "Atribuindo..." : "Atribuir pacote"}
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:27:import { clientesPacotesApi } from "./clientes-pacotes-api";
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:32:const pacoteId =
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:35:const clientePacoteId =
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:38:const clientePacote = {
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:39:  id: clientePacoteId,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:41:  pacoteId,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:54:  pacote: {
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:55:    id: pacoteId,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:56:    nome: "Pacote real",
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:64:describe("clientesPacotesApi", () => {
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:73:      data: [clientePacote],
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:76:    await clientesPacotesApi.all();
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:79:      "/clientes-pacotes",
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:85:      data: [clientePacote],
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:88:    await clientesPacotesApi.byCliente(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:93:      `/clientes-pacotes/cliente/${clienteId}`,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:97:  it("atribui somente clienteId + pacoteId", async () => {
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:99:      data: clientePacote,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:104:      pacoteId,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:107:    await clientesPacotesApi.create(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:112:      "/clientes-pacotes",
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:132:        ...clientePacote,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:138:    await clientesPacotesApi.usarSessao(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:139:      clientePacoteId,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:143:      `/clientes-pacotes/${clientePacoteId}/usar-sessao`,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:153:        ...clientePacote,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:158:    await clientesPacotesApi.cancelar(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:159:      clientePacoteId,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts:163:      `/clientes-pacotes/${clientePacoteId}/cancelar`,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.ts:2:  clientePacoteSchema,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.ts:3:  clientesPacotesSchema,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.ts:7:import type { CreateClientePacotePayload } from "./cliente-pacote-form.schema";
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.ts:9:export const clientesPacotesApi = {
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.ts:13:        "/clientes-pacotes",
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.ts:16:    return clientesPacotesSchema.parse(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.ts:26:        `/clientes-pacotes/cliente/${encodeURIComponent(clienteId)}`,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.ts:29:    return clientesPacotesSchema.parse(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.ts:35:    payload: CreateClientePacotePayload,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.ts:39:        "/clientes-pacotes",
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.ts:43:    return clientePacoteSchema.parse(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.ts:53:        `/clientes-pacotes/${encodeURIComponent(id)}/usar-sessao`,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.ts:56:    return clientePacoteSchema.parse(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.ts:65:        `/clientes-pacotes/${encodeURIComponent(id)}/cancelar`,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-api.ts:68:    return clientePacoteSchema.parse(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-permissions.test.ts:7:import { canReadClientPackages } from "./clientes-pacotes-permissions";
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-permissions.test.ts:9:describe("clientes-pacotes permissions", () => {
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-permissions.test.ts:16:    "%s pode consultar pacotes de cliente",
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-permissions.test.ts:19:        canReadClientPackages(role),
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-permissions.test.ts:26:      canReadClientPackages(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-permissions.test.ts:34:      canReadClientPackages(null),
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-permissions.ts:1:const CLIENTES_PACOTES_READ_ROLES = [
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-permissions.ts:8:export function canReadClientPackages(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-permissions.ts:11:  return CLIENTES_PACOTES_READ_ROLES.some(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.test.ts:8:  parseClientesPacotesStatusFilter,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.test.ts:9:  parseClientesPacotesUrlState,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.test.ts:10:  serializeClientesPacotesUrlState,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.test.ts:11:} from "./clientes-pacotes-url-state";
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.test.ts:16:describe("clientes-pacotes URL state", () => {
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.test.ts:25:      parseClientesPacotesUrlState(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.test.ts:42:      parseClientesPacotesUrlState(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.test.ts:53:      serializeClientesPacotesUrlState({
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.test.ts:62:      serializeClientesPacotesUrlState({
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.test.ts:73:      parseClientesPacotesStatusFilter(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.test.ts:79:      parseClientesPacotesStatusFilter(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.ts:3:import { statusClientePacoteSchema } from "@/features/clientes/schemas/cliente-profile-extras.schemas";
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.ts:7:export const CLIENTES_PACOTES_STATUS_FILTERS = [
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.ts:15:export type ClientesPacotesStatusFilter =
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.ts:16:  (typeof CLIENTES_PACOTES_STATUS_FILTERS)[number];
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.ts:18:export type ClientesPacotesUrlState = {
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.ts:20:  status: ClientesPacotesStatusFilter;
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.ts:23:export function parseClientesPacotesStatusFilter(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.ts:25:): ClientesPacotesStatusFilter {
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.ts:31:    statusClientePacoteSchema.safeParse(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.ts:40:export function parseClientesPacotesUrlState(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.ts:45:): ClientesPacotesUrlState {
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.ts:61:      parseClientesPacotesStatusFilter(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.ts:67:export function serializeClientesPacotesUrlState(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.ts:68:  state: ClientesPacotesUrlState,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:20:  clientesPacotesMock,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:28:  clientesPacotesMock:
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:80:  "./use-clientes-pacotes-options",
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:82:    useClientesPacotesOptions:
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:88:  "./use-clientes-pacotes",
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:90:    useClientesPacotes:
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:91:      clientesPacotesMock,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:95:import { ClientesPacotesView } from "./clientes-pacotes-view";
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:119:const pacote = {
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:122:  nome: "Pacote Premium",
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:134:const clientePacote = {
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:138:  pacoteId: pacote.id,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:151:  pacote: {
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:152:    id: pacote.id,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:153:    nome: pacote.nome,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:169:function packageQuery(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:203:    pacotesQuery: packageQuery([
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:204:      pacote,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:208:  clientesPacotesMock.mockReturnValue({
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:209:    query: packageQuery([
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:210:      clientePacote,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:222:describe("ClientesPacotesView", () => {
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:234:    clientesPacotesMock.mockReset();
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:241:      <ClientesPacotesView />,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:252:        name: "Atribuir pacote",
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:258:        name: "Pacotes vinculados ao cliente",
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:263:        "Pacote Premium",
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:269:        name: "Cancelar pacote",
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:278:      <ClientesPacotesView />,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:289:        name: "Cancelar pacote",
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:298:      <ClientesPacotesView />,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:315:        name: "Cancelar pacote",
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:324:      <ClientesPacotesView />,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:335:        name: "Pacotes vinculados ao cliente",
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:340:        "Pacote Premium",
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:346:        name: "Atribuir pacote",
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:352:        name: "Cancelar pacote",
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:359:      <ClientesPacotesView />,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:370:        name: "Cancelar pacote",
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:382:  it("exige confirma├º├úo expl├¡cita para consumir uma sess├úo", () => {
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:384:      <ClientesPacotesView />,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:413:  it("PROFISSIONAL pode consumir sess├úo sem receber gest├úo administrativa", () => {
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:417:      <ClientesPacotesView />,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:434:        name: "Cancelar pacote",
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:440:        name: "Atribuir pacote",
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:445:  it("n├úo oferece consumo para pacote FINALIZADO", () => {
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:446:    clientesPacotesMock.mockReturnValue({
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:447:      query: packageQuery([
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:449:          ...clientePacote,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:461:      <ClientesPacotesView />,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:479:      <ClientesPacotesView />,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:491:      `/pacotes?clienteId=${cliente.id}`,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:525:      pacotesQuery:
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:526:        packageQuery([
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:527:          pacote,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:532:      <ClientesPacotesView />,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:544:          "Abrir fidelidade deste cliente",
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:548:      `/fidelidade?clienteId=${cliente.id}`,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:554:      <ClientesPacotesView />,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx:578:      `/pacotes?clienteId=${cliente.id}&status=FINALIZADO`,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:14:  canAccessPackages,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:15:  canAssignPackage,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:16:  canConsumePackageSession,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:17:  canManagePackages,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:18:} from "../permissions/pacotes-permissions";
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:19:import { ClientePacoteForm } from "./cliente-pacote-form";
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:20:import type { CreateClientePacotePayload } from "./cliente-pacote-form.schema";
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:21:import { canReadClientPackages } from "./clientes-pacotes-permissions";
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:22:import { useClientesPacotes } from "./use-clientes-pacotes";
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:24:  parseClientesPacotesStatusFilter,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:25:  parseClientesPacotesUrlState,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:26:  serializeClientesPacotesUrlState,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:27:  type ClientesPacotesUrlState,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:28:} from "./clientes-pacotes-url-state";
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:29:import { useClientesPacotesOptions } from "./use-clientes-pacotes-options";
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:53:export function ClientesPacotesView() {
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:65:    canReadClientPackages(role);
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:68:    canAssignPackage(role);
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:71:    canAccessPackages(role);
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:74:    canManagePackages(role);
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:76:  const canConsume =
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:77:    canConsumePackageSession(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:82:    parseClientesPacotesUrlState(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:118:    pacotesQuery,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:119:  } = useClientesPacotesOptions({
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:141:    patch: Partial<ClientesPacotesUrlState>,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:143:    const nextState: ClientesPacotesUrlState = {
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:155:      serializeClientesPacotesUrlState(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:164:        ? `/pacotes?${queryString}`
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:165:        : "/pacotes",
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:177:  } = useClientesPacotes({
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:186:  const visibleClientePacotes =
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:188:      (clientePacote) =>
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:190:        clientePacote.status ===
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:202:          Clientes-Pacotes
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:206:          Pacotes dos clientes
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:210:          Consulte v├¡nculos, atribua pacotes quando o
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:211:          contrato permitir e preserve os saldos de sess├Áes
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:218:          htmlFor="clientes-pacotes-search"
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:225:          id="clientes-pacotes-search"
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:344:              href={`/fidelidade?clienteId=${encodeURIComponent(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:349:              Abrir fidelidade deste cliente
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:358:                Atribuir pacote
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:367:                <ClientePacoteForm
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:374:                  pacotes={
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:375:                    pacotesQuery.data ??
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:378:                  isLoadingPacotes={
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:379:                    pacotesQuery.isPending
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:386:                      CreateClientePacotePayload,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:395:              {pacotesQuery.isError ? (
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:411:              por├®m o cat├ílogo de pacotes n├úo ├® exposto a ele.
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:413:              inventar├í uma fonte alternativa de pacotes.
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:435:                  htmlFor="clientes-pacotes-status"
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:442:                  id="clientes-pacotes-status"
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:447:                        parseClientesPacotesStatusFilter(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:490:                  N├úo foi poss├¡vel carregar os pacotes do
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:506:            {visibleClientePacotes?.length === 0 ? (
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:509:                  Cliente sem pacotes vinculados
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:514:            {visibleClientePacotes && visibleClientePacotes.length > 0 ? (
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:517:                aria-label="Pacotes vinculados ao cliente"
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:519:                {visibleClientePacotes.map(
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:520:                  (clientePacote) => (
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:523:                        clientePacote.id
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:532:                                clientePacote
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:533:                                  .pacote
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:540:                                clientePacote
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:554:                                  clientePacote
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:567:                                  clientePacote
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:580:                                  clientePacote
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:590:                              clientePacote
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:598:                              clientePacote
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:604:                        {canConsume &&
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:605:                        clientePacote.status ===
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:607:                        clientePacote
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:612:                            clientePacote.id ? (
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:624:                                          clientePacote.id,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:669:                                    clientePacote.id,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:685:                        clientePacote.status !==
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:689:                            clientePacote.id ? (
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:701:                                          clientePacote.id,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:739:                                    clientePacote.id,
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:748:                                Cancelar pacote
beauty-core-ui/src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx:768:                pacote do cliente.
beauty-core-ui/src/features/pacotes/clientes-pacotes/use-clientes-pacotes-options.ts:8:import { pacotesCatalogoApi } from "../catalogo/pacotes-catalogo-api";
beauty-core-ui/src/features/pacotes/clientes-pacotes/use-clientes-pacotes-options.ts:9:import { pacotesQueryKeys } from "../queries/pacotes-query-keys";
beauty-core-ui/src/features/pacotes/clientes-pacotes/use-clientes-pacotes-options.ts:18:export function useClientesPacotesOptions({
beauty-core-ui/src/features/pacotes/clientes-pacotes/use-clientes-pacotes-options.ts:60:  const pacotesQuery = useQuery({
beauty-core-ui/src/features/pacotes/clientes-pacotes/use-clientes-pacotes-options.ts:62:      pacotesQueryKeys.all,
beauty-core-ui/src/features/pacotes/clientes-pacotes/use-clientes-pacotes-options.ts:65:      pacotesCatalogoApi.list,
beauty-core-ui/src/features/pacotes/clientes-pacotes/use-clientes-pacotes-options.ts:76:    pacotesQuery,
beauty-core-ui/src/features/pacotes/clientes-pacotes/use-clientes-pacotes.ts:11:import type { CreateClientePacotePayload } from "./cliente-pacote-form.schema";
beauty-core-ui/src/features/pacotes/clientes-pacotes/use-clientes-pacotes.ts:12:import { clientesPacotesApi } from "./clientes-pacotes-api";
beauty-core-ui/src/features/pacotes/clientes-pacotes/use-clientes-pacotes.ts:19:export function useClientesPacotes({
beauty-core-ui/src/features/pacotes/clientes-pacotes/use-clientes-pacotes.ts:28:      clienteProfileKeys.pacotes(
beauty-core-ui/src/features/pacotes/clientes-pacotes/use-clientes-pacotes.ts:33:      clientesPacotesApi.byCliente(
beauty-core-ui/src/features/pacotes/clientes-pacotes/use-clientes-pacotes.ts:48:          CreateClientePacotePayload,
beauty-core-ui/src/features/pacotes/clientes-pacotes/use-clientes-pacotes.ts:50:        clientesPacotesApi.create(
beauty-core-ui/src/features/pacotes/clientes-pacotes/use-clientes-pacotes.ts:60:            clienteProfileKeys.pacotes(
beauty-core-ui/src/features/pacotes/clientes-pacotes/use-clientes-pacotes.ts:75:        clientesPacotesApi.usarSessao(
beauty-core-ui/src/features/pacotes/clientes-pacotes/use-clientes-pacotes.ts:90:            clienteProfileKeys.pacotes(
beauty-core-ui/src/features/pacotes/clientes-pacotes/use-clientes-pacotes.ts:104:        clientesPacotesApi.cancelar(
beauty-core-ui/src/features/pacotes/clientes-pacotes/use-clientes-pacotes.ts:114:            clienteProfileKeys.pacotes(
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:4:  canAccessClientPackages,
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:5:  canAccessPackages,
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:6:  canAssignPackage,
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:7:  canCancelClientPackage,
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:8:  canConsumePackageSession,
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:9:  canManagePackages,
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:10:} from "./pacotes-permissions";
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:12:describe("pacotes permissions", () => {
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:13:  it("limita cat├ílogo de pacotes a ADMIN/GERENTE", () => {
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:14:    expect(canAccessPackages("ADMIN")).toBe(true);
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:15:    expect(canAccessPackages("GERENTE")).toBe(true);
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:16:    expect(canAccessPackages("RECEPCAO")).toBe(false);
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:17:    expect(canAccessPackages("PROFISSIONAL")).toBe(false);
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:21:    expect(canManagePackages("ADMIN")).toBe(true);
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:22:    expect(canManagePackages("GERENTE")).toBe(true);
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:23:    expect(canManagePackages("RECEPCAO")).toBe(false);
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:27:    expect(canAssignPackage("RECEPCAO")).toBe(true);
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:28:    expect(canAssignPackage("PROFISSIONAL")).toBe(false);
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:31:  it("permite consultar e consumir para profissional", () => {
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:32:    expect(canAccessClientPackages("PROFISSIONAL")).toBe(true);
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:33:    expect(canConsumePackageSession("PROFISSIONAL")).toBe(true);
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:37:    expect(canCancelClientPackage("ADMIN")).toBe(true);
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:38:    expect(canCancelClientPackage("GERENTE")).toBe(true);
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:39:    expect(canCancelClientPackage("RECEPCAO")).toBe(false);
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:40:    expect(canCancelClientPackage("PROFISSIONAL")).toBe(false);
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:44:    expect(canAccessPackages("SUPER_ADMIN")).toBe(false);
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:45:    expect(canAccessClientPackages("SUPER_ADMIN")).toBe(false);
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.test.ts:46:    expect(canAssignPackage("SUPER_ADMIN")).toBe(false);
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.ts:1:import type { PacotesRole } from "../types/pacotes.types";
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.ts:8:] as const satisfies readonly PacotesRole[];
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.ts:14:] as const satisfies readonly PacotesRole[];
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.ts:16:const clientPackagesAccessRoles = [
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.ts:21:] as const satisfies readonly PacotesRole[];
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.ts:25:  roles: readonly PacotesRole[],
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.ts:26:): role is PacotesRole {
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.ts:27:  return typeof role === "string" && roles.includes(role as PacotesRole);
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.ts:30:export function canAccessPackages(role: RoleInput): boolean {
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.ts:34:export function canManagePackages(role: RoleInput): boolean {
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.ts:38:export function canAccessClientPackages(role: RoleInput): boolean {
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.ts:39:  return includesRole(role, clientPackagesAccessRoles);
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.ts:42:export function canAssignPackage(role: RoleInput): boolean {
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.ts:46:export function canConsumePackageSession(role: RoleInput): boolean {
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.ts:47:  return includesRole(role, clientPackagesAccessRoles);
beauty-core-ui/src/features/pacotes/permissions/pacotes-permissions.ts:50:export function canCancelClientPackage(role: RoleInput): boolean {
beauty-core-ui/src/features/pacotes/queries/pacotes-query-keys.test.ts:3:import { pacotesQueryKeys } from "./pacotes-query-keys";
beauty-core-ui/src/features/pacotes/queries/pacotes-query-keys.test.ts:5:describe("pacotesQueryKeys", () => {
beauty-core-ui/src/features/pacotes/queries/pacotes-query-keys.test.ts:6:  it("mant├®m cat├ílogo e clientes-pacotes separados", () => {
beauty-core-ui/src/features/pacotes/queries/pacotes-query-keys.test.ts:7:    expect(pacotesQueryKeys.list()).toEqual([
beauty-core-ui/src/features/pacotes/queries/pacotes-query-keys.test.ts:8:      "pacotes",
beauty-core-ui/src/features/pacotes/queries/pacotes-query-keys.test.ts:12:    expect(pacotesQueryKeys.clientesPacotes()).toEqual([
beauty-core-ui/src/features/pacotes/queries/pacotes-query-keys.test.ts:13:      "pacotes",
beauty-core-ui/src/features/pacotes/queries/pacotes-query-keys.test.ts:14:      "clientes-pacotes",
beauty-core-ui/src/features/pacotes/queries/pacotes-query-keys.test.ts:18:  it("segmenta pacotes por cliente sem empresaId", () => {
beauty-core-ui/src/features/pacotes/queries/pacotes-query-keys.test.ts:19:    const key = pacotesQueryKeys.clientePacotes("cliente-1");
beauty-core-ui/src/features/pacotes/queries/pacotes-query-keys.test.ts:22:      "pacotes",
beauty-core-ui/src/features/pacotes/queries/pacotes-query-keys.test.ts:23:      "clientes-pacotes",
beauty-core-ui/src/features/pacotes/queries/pacotes-query-keys.ts:1:export const pacotesQueryKeys = {
beauty-core-ui/src/features/pacotes/queries/pacotes-query-keys.ts:2:  all: ["pacotes"] as const,
beauty-core-ui/src/features/pacotes/queries/pacotes-query-keys.ts:5:    [...pacotesQueryKeys.all, "list"] as const,
beauty-core-ui/src/features/pacotes/queries/pacotes-query-keys.ts:8:    [...pacotesQueryKeys.all, "detail", id] as const,
beauty-core-ui/src/features/pacotes/queries/pacotes-query-keys.ts:10:  clientesPacotes: () =>
beauty-core-ui/src/features/pacotes/queries/pacotes-query-keys.ts:11:    [...pacotesQueryKeys.all, "clientes-pacotes"] as const,
beauty-core-ui/src/features/pacotes/queries/pacotes-query-keys.ts:13:  clientePacotes: (clienteId: string) =>
beauty-core-ui/src/features/pacotes/queries/pacotes-query-keys.ts:15:      ...pacotesQueryKeys.all,
beauty-core-ui/src/features/pacotes/queries/pacotes-query-keys.ts:16:      "clientes-pacotes",
beauty-core-ui/src/features/pacotes/queries/pacotes-query-options.ts:3:import { pacotesApi } from "../services/pacotes-api";
beauty-core-ui/src/features/pacotes/queries/pacotes-query-options.ts:4:import { pacotesQueryKeys } from "./pacotes-query-keys";
beauty-core-ui/src/features/pacotes/queries/pacotes-query-options.ts:6:export const pacotesQueryOptions = {
beauty-core-ui/src/features/pacotes/queries/pacotes-query-options.ts:9:      queryKey: pacotesQueryKeys.list(),
beauty-core-ui/src/features/pacotes/queries/pacotes-query-options.ts:10:      queryFn: () => pacotesApi.getPacotes(),
beauty-core-ui/src/features/pacotes/queries/pacotes-query-options.ts:16:      queryKey: pacotesQueryKeys.detail(id),
beauty-core-ui/src/features/pacotes/queries/pacotes-query-options.ts:17:      queryFn: () => pacotesApi.getPacote(id),
beauty-core-ui/src/features/pacotes/queries/pacotes-query-options.ts:22:  clientesPacotes() {
beauty-core-ui/src/features/pacotes/queries/pacotes-query-options.ts:24:      queryKey: pacotesQueryKeys.clientesPacotes(),
beauty-core-ui/src/features/pacotes/queries/pacotes-query-options.ts:25:      queryFn: () => pacotesApi.getClientesPacotes(),
beauty-core-ui/src/features/pacotes/queries/pacotes-query-options.ts:29:  clientePacotes(clienteId: string) {
beauty-core-ui/src/features/pacotes/queries/pacotes-query-options.ts:31:      queryKey: pacotesQueryKeys.clientePacotes(clienteId),
beauty-core-ui/src/features/pacotes/queries/pacotes-query-options.ts:32:      queryFn: () => pacotesApi.getClientePacotes(clienteId),
beauty-core-ui/src/features/pacotes/schemas/pacotes.schemas.test.ts:4:  clientePacoteSchema,
beauty-core-ui/src/features/pacotes/schemas/pacotes.schemas.test.ts:5:  pacoteSchema,
beauty-core-ui/src/features/pacotes/schemas/pacotes.schemas.test.ts:6:} from "./pacotes.schemas";
beauty-core-ui/src/features/pacotes/schemas/pacotes.schemas.test.ts:10:describe("pacotes schemas", () => {
beauty-core-ui/src/features/pacotes/schemas/pacotes.schemas.test.ts:11:  it("parseia pacote sem inventar rela├º├úo com servi├ºo", () => {
beauty-core-ui/src/features/pacotes/schemas/pacotes.schemas.test.ts:12:    const parsed = pacoteSchema.parse({
beauty-core-ui/src/features/pacotes/schemas/pacotes.schemas.test.ts:15:      nome: "Pacote real",
beauty-core-ui/src/features/pacotes/schemas/pacotes.schemas.test.ts:31:  it("usa saldo de sess├Áes retornado pelo backend", () => {
beauty-core-ui/src/features/pacotes/schemas/pacotes.schemas.test.ts:32:    const parsed = clientePacoteSchema.parse({
beauty-core-ui/src/features/pacotes/schemas/pacotes.schemas.test.ts:36:      pacoteId: id,
beauty-core-ui/src/features/pacotes/schemas/pacotes.schemas.test.ts:51:    expect(parsed).not.toHaveProperty("agendamentoId");
beauty-core-ui/src/features/pacotes/schemas/pacotes.schemas.test.ts:61:      clientePacoteSchema.safeParse({
beauty-core-ui/src/features/pacotes/schemas/pacotes.schemas.test.ts:64:        pacoteId: id,
beauty-core-ui/src/features/pacotes/schemas/pacotes.schemas.ts:13:export const statusClientePacoteSchema = z.enum([
beauty-core-ui/src/features/pacotes/schemas/pacotes.schemas.ts:20:export const pacoteSchema = z.object({
beauty-core-ui/src/features/pacotes/schemas/pacotes.schemas.ts:32:export const pacotesSchema = z.array(pacoteSchema);
beauty-core-ui/src/features/pacotes/schemas/pacotes.schemas.ts:39:const pacoteResumoSchema = z.object({
beauty-core-ui/src/features/pacotes/schemas/pacotes.schemas.ts:47:export const clientePacoteSchema = z.object({
beauty-core-ui/src/features/pacotes/schemas/pacotes.schemas.ts:50:  pacoteId: z.string().uuid(),
beauty-core-ui/src/features/pacotes/schemas/pacotes.schemas.ts:56:  status: statusClientePacoteSchema,
beauty-core-ui/src/features/pacotes/schemas/pacotes.schemas.ts:61:  pacoteNome: z.string().optional(),
beauty-core-ui/src/features/pacotes/schemas/pacotes.schemas.ts:64:  pacote: pacoteResumoSchema.optional(),
beauty-core-ui/src/features/pacotes/schemas/pacotes.schemas.ts:67:export const clientesPacotesSchema = z.array(clientePacoteSchema);
beauty-core-ui/src/features/pacotes/services/pacotes-api.test.ts:13:import { pacotesApi } from "./pacotes-api";
beauty-core-ui/src/features/pacotes/services/pacotes-api.test.ts:17:describe("pacotesApi", () => {
beauty-core-ui/src/features/pacotes/services/pacotes-api.test.ts:22:  it("lista pacotes sem empresaId", async () => {
beauty-core-ui/src/features/pacotes/services/pacotes-api.test.ts:28:          nome: "Pacote real",
beauty-core-ui/src/features/pacotes/services/pacotes-api.test.ts:40:    const result = await pacotesApi.getPacotes();
beauty-core-ui/src/features/pacotes/services/pacotes-api.test.ts:42:    expect(getMock).toHaveBeenCalledWith("/pacotes");
beauty-core-ui/src/features/pacotes/services/pacotes-api.test.ts:47:  it("lista pacotes de cliente pelo endpoint real", async () => {
beauty-core-ui/src/features/pacotes/services/pacotes-api.test.ts:52:    await pacotesApi.getClientePacotes(id);
beauty-core-ui/src/features/pacotes/services/pacotes-api.test.ts:55:      `/clientes-pacotes/cliente/${id}`,
beauty-core-ui/src/features/pacotes/services/pacotes-api.test.ts:59:  it("lista clientes-pacotes sem par├ómetros tenant", async () => {
beauty-core-ui/src/features/pacotes/services/pacotes-api.test.ts:64:    await pacotesApi.getClientesPacotes();
beauty-core-ui/src/features/pacotes/services/pacotes-api.test.ts:66:    expect(getMock).toHaveBeenCalledWith("/clientes-pacotes");
beauty-core-ui/src/features/pacotes/services/pacotes-api.ts:4:  clientePacoteSchema,
beauty-core-ui/src/features/pacotes/services/pacotes-api.ts:5:  clientesPacotesSchema,
beauty-core-ui/src/features/pacotes/services/pacotes-api.ts:6:  pacoteSchema,
beauty-core-ui/src/features/pacotes/services/pacotes-api.ts:7:  pacotesSchema,
beauty-core-ui/src/features/pacotes/services/pacotes-api.ts:8:} from "../schemas/pacotes.schemas";
beauty-core-ui/src/features/pacotes/services/pacotes-api.ts:10:export const pacotesApi = {
beauty-core-ui/src/features/pacotes/services/pacotes-api.ts:11:  async getPacotes() {
beauty-core-ui/src/features/pacotes/services/pacotes-api.ts:12:    const response = await getApiClient().get("/pacotes");
beauty-core-ui/src/features/pacotes/services/pacotes-api.ts:14:    return pacotesSchema.parse(response.data);
beauty-core-ui/src/features/pacotes/services/pacotes-api.ts:17:  async getPacote(id: string) {
beauty-core-ui/src/features/pacotes/services/pacotes-api.ts:19:      `/pacotes/${encodeURIComponent(id)}`,
beauty-core-ui/src/features/pacotes/services/pacotes-api.ts:22:    return pacoteSchema.parse(response.data);
beauty-core-ui/src/features/pacotes/services/pacotes-api.ts:25:  async getClientesPacotes() {
beauty-core-ui/src/features/pacotes/services/pacotes-api.ts:26:    const response = await getApiClient().get("/clientes-pacotes");
beauty-core-ui/src/features/pacotes/services/pacotes-api.ts:28:    return clientesPacotesSchema.parse(response.data);
beauty-core-ui/src/features/pacotes/services/pacotes-api.ts:31:  async getClientePacotes(clienteId: string) {
beauty-core-ui/src/features/pacotes/services/pacotes-api.ts:33:      `/clientes-pacotes/cliente/${encodeURIComponent(clienteId)}`,
beauty-core-ui/src/features/pacotes/services/pacotes-api.ts:36:    return clientesPacotesSchema.parse(response.data);
beauty-core-ui/src/features/pacotes/services/pacotes-api.ts:39:  async parseClientePacoteResponse(value: unknown) {
beauty-core-ui/src/features/pacotes/services/pacotes-api.ts:40:    return clientePacoteSchema.parse(value);
beauty-core-ui/src/features/pacotes/types/pacotes.types.ts:4:  clientePacoteSchema,
beauty-core-ui/src/features/pacotes/types/pacotes.types.ts:5:  pacoteSchema,
beauty-core-ui/src/features/pacotes/types/pacotes.types.ts:6:  statusClientePacoteSchema,
beauty-core-ui/src/features/pacotes/types/pacotes.types.ts:7:} from "../schemas/pacotes.schemas";
beauty-core-ui/src/features/pacotes/types/pacotes.types.ts:9:export type Pacote = z.infer<typeof pacoteSchema>;
beauty-core-ui/src/features/pacotes/types/pacotes.types.ts:10:export type ClientePacote = z.infer<typeof clientePacoteSchema>;
beauty-core-ui/src/features/pacotes/types/pacotes.types.ts:11:export type StatusClientePacote = z.infer<
beauty-core-ui/src/features/pacotes/types/pacotes.types.ts:12:  typeof statusClientePacoteSchema
beauty-core-ui/src/features/pacotes/types/pacotes.types.ts:15:export type PacotesRole =
beauty-core-ui/src/features/pacotes/utils/pacotes-formatters.test.ts:4:  formatSaldoSessoes,
beauty-core-ui/src/features/pacotes/utils/pacotes-formatters.test.ts:5:  formatStatusClientePacote,
beauty-core-ui/src/features/pacotes/utils/pacotes-formatters.test.ts:7:} from "./pacotes-formatters";
beauty-core-ui/src/features/pacotes/utils/pacotes-formatters.test.ts:9:describe("pacotes formatters", () => {
beauty-core-ui/src/features/pacotes/utils/pacotes-formatters.test.ts:10:  it("formata saldo recebido do backend", () => {
beauty-core-ui/src/features/pacotes/utils/pacotes-formatters.test.ts:11:    expect(formatSaldoSessoes(3, 5)).toBe(
beauty-core-ui/src/features/pacotes/utils/pacotes-formatters.test.ts:28:    expect(formatStatusClientePacote("ATIVO")).toBe("Ativo");
beauty-core-ui/src/features/pacotes/utils/pacotes-formatters.test.ts:29:    expect(formatStatusClientePacote("FINALIZADO")).toBe(
beauty-core-ui/src/features/pacotes/utils/pacotes-formatters.test.ts:32:    expect(formatStatusClientePacote("VENCIDO")).toBe("Vencido");
beauty-core-ui/src/features/pacotes/utils/pacotes-formatters.test.ts:33:    expect(formatStatusClientePacote("CANCELADO")).toBe(
beauty-core-ui/src/features/pacotes/utils/pacotes-formatters.ts:1:import type { StatusClientePacote } from "../types/pacotes.types";
beauty-core-ui/src/features/pacotes/utils/pacotes-formatters.ts:3:const statusLabels: Record<StatusClientePacote, string> = {
beauty-core-ui/src/features/pacotes/utils/pacotes-formatters.ts:10:export function formatSaldoSessoes(
beauty-core-ui/src/features/pacotes/utils/pacotes-formatters.ts:27:export function formatStatusClientePacote(
beauty-core-ui/src/features/pacotes/utils/pacotes-formatters.ts:28:  status: StatusClientePacote,
beauty-core-ui/src/features/portal/assets/portal-assets.ts:6:  appointments: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:8:      src: "/images/portal/appointments/portal-appointments.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:27:  benefits: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:29:      src: "/images/portal/benefits/portal-benefits.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:60:  loyalty: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:62:      src: "/images/portal/loyalty/portal-loyalty.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:80:  packages: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:82:      src: "/images/portal/packages/portal-packages.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:122:  | (typeof portalAssets)["appointments"]["illustration"]
beauty-core-ui/src/features/portal/assets/portal-assets.ts:125:  | (typeof portalAssets)["benefits"]["illustration"]
beauty-core-ui/src/features/portal/assets/portal-assets.ts:131:  | (typeof portalAssets)["loyalty"]["illustration"]
beauty-core-ui/src/features/portal/assets/portal-assets.ts:135:  | (typeof portalAssets)["packages"]["illustration"]
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:11:    queryClient.setQueryData(["portal", "agendamentos"], [{ id: "agenda-1" }]);
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:20:      queryClient.getQueryData(["portal", "agendamentos"]),
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:62:  agendamentos: {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:201:      agendamentos: {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:217:    expect(screen.queryByText(/pontos|saldo|total/i)).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:2:  PortalAppointmentSummary,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:14:  type PortalAppointmentTransport,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:47:function toPortalAppointmentSummary(
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:48:  value: PortalAppointmentTransport,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:49:): PortalAppointmentSummary {
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:77:    agendamentos: {
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:78:      proximos: parsed.agendamentos.proximos.map(
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:79:        toPortalAppointmentSummary,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:81:      ultimo: parsed.agendamentos.ultimo
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:82:        ? toPortalAppointmentSummary(
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:83:            parsed.agendamentos.ultimo,
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:1:export const PORTAL_APPOINTMENT_STATUS_VALUES = [
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:10:export type PortalAppointmentStatus =
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:11:  (typeof PORTAL_APPOINTMENT_STATUS_VALUES)[number];
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:14:  "AGENDAMENTO",
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:16:  "PACOTE",
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:38:export type PortalAppointmentSummary = Readonly<{
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:41:  status: PortalAppointmentStatus;
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:50:  agendamentos: Readonly<{
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:51:    proximos: readonly PortalAppointmentSummary[];
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:52:    ultimo: PortalAppointmentSummary | null;
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:4:  PORTAL_APPOINTMENT_STATUS_VALUES,
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:35:export const portalAppointmentTransportSchema = z
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:39:    status: z.enum(PORTAL_APPOINTMENT_STATUS_VALUES),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:49:    agendamentos: z
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:51:        proximos: z.array(portalAppointmentTransportSchema),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:52:        ultimo: portalAppointmentTransportSchema.nullable(),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:97:export type PortalAppointmentTransport = z.infer<
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:98:  typeof portalAppointmentTransportSchema
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:17:  agendamentos: {
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:62:      agendamentos: {
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:2:  PortalAppointmentSummary,
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:6:export type PortalDashboardAppointmentViewModel =
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:10:    status: PortalAppointmentSummary["status"];
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:20:  proximos: readonly PortalDashboardAppointmentViewModel[];
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:21:  ultimo: PortalDashboardAppointmentViewModel | null;
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:24:function mapAppointment(
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:25:  value: PortalAppointmentSummary,
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:26:): PortalDashboardAppointmentViewModel {
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:44:    proximos: value.agendamentos.proximos.map(mapAppointment),
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:45:    ultimo: value.agendamentos.ultimo
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:46:      ? mapAppointment(value.agendamentos.ultimo)
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:43:    pacotesAtivos: [],
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:44:    quantidadeAgendamentos: 2,
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:52:function appointmentResponse() {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:54:    id: "agendamento-secreto",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:113:        agendamentos: {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:114:          proximos: [appointmentResponse()],
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:117:        fidelidade: {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:119:          saldoPontos: 999,
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:121:        pacotes: {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:145:      agendamentos: {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:168:          tipo: "AGENDAMENTO",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:174:            id: "agendamento-secreto",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:198:        tipo: "AGENDAMENTO",
beauty-core-ui/src/features/servicos/components/servicos-view.tsx:61:        description="Gest├úo do cat├ílogo operacional usado em atendimentos, agenda e produtos da empresa."
beauty-core-ui/src/features/whatsapp/components/templates-whatsapp-list.test.tsx:23:    "CONFIRMACAO_AGENDAMENTO" as const,
beauty-core-ui/src/features/whatsapp/components/templates-whatsapp-list.test.tsx:25:    "Agendamento confirmado",
beauty-core-ui/src/features/whatsapp/components/templates-whatsapp-list.test.tsx:56:        "Agendamento confirmado",
beauty-core-ui/src/features/whatsapp/schemas/template-whatsapp-schema.test.ts:16:    nome: "Lembrete de Agendamento",
beauty-core-ui/src/features/whatsapp/schemas/template-whatsapp-schema.test.ts:17:    tipo: "LEMBRETE_AGENDAMENTO",
beauty-core-ui/src/features/whatsapp/schemas/template-whatsapp-schema.test.ts:50:        nome: "Lembrete de Agendamento",
beauty-core-ui/src/features/whatsapp/schemas/template-whatsapp-schema.test.ts:51:        tipo: "LEMBRETE_AGENDAMENTO",
beauty-core-ui/src/features/whatsapp/schemas/template-whatsapp-schema.test.ts:64:        tipo: "LEMBRETE_AGENDAMENTO",
beauty-core-ui/src/features/whatsapp/schemas/template-whatsapp-schema.test.ts:77:        tipo: "LEMBRETE_AGENDAMENTO",
beauty-core-ui/src/features/whatsapp/schemas/template-whatsapp-schema.test.ts:90:        tipo: "LEMBRETE_AGENDAMENTO",
beauty-core-ui/src/features/whatsapp/schemas/template-whatsapp-schema.test.ts:99:        tipo: "LEMBRETE_AGENDAMENTO",
beauty-core-ui/src/features/whatsapp/services/whatsapp-campaigns-api.test.ts:204:  it("n├úo possui envio/agendamento/retry de campanha", () => {
beauty-core-ui/src/features/whatsapp/services/whatsapp-campaigns-api.test.ts:207:        /campanhas-whatsapp\/(enviar|agendar|retry|reprocess)/,
beauty-core-ui/src/features/whatsapp/services/whatsapp-templates-api.test.ts:63:  tipo: "LEMBRETE_AGENDAMENTO",
beauty-core-ui/src/features/whatsapp/services/whatsapp-templates-api.test.ts:77:    "LEMBRETE_AGENDAMENTO" as const,
beauty-core-ui/src/features/whatsapp/types/whatsapp.types.ts:11:  "LEMBRETE_AGENDAMENTO",
beauty-core-ui/src/features/whatsapp/types/whatsapp.types.ts:12:  "CONFIRMACAO_AGENDAMENTO",
beauty-core-ui/src/features/whatsapp/types/whatsapp.types.ts:13:  "CANCELAMENTO_AGENDAMENTO",
beauty-core-ui/src/features/whatsapp/types/whatsapp.types.ts:15:  "FIDELIDADE",
beauty-core-ui/src/features/whatsapp/types/whatsapp.types.ts:17:  "PACOTE",
beauty-core-ui/src/features/whatsapp/utils/whatsapp-status.ts:25:    normalized.includes("AGEND") ||
``

## 7. Estratégia mínima obrigatória

### Contratos e adapters

- dados válidos;
- dados inválidos;
- campos ausentes;
- normalização;
- respostas incompatíveis;
- erros de API.

### Query e cache

- query habilitada somente com sessão válida;
- estados anonymous e denied;
- isolamento por cliente e sessão;
- loading;
- erro;
- vazio;
- retry;
- invalidação;
- remoção no logout.

### Componentes

- renderização de sucesso;
- renderização de loading;
- renderização de erro;
- renderização vazia;
- acessibilidade;
- responsividade;
- ações desabilitadas durante mutação.

### Navegação

- rota privada;
- usuário anônimo;
- usuário negado;
- sessão restaurando;
- links corretos;
- isolamento Admin/Portal.

### E2E

- acesso autenticado;
- bloqueio sem autenticação;
- navegação entre superfícies;
- ausência de dados de outro cliente;
- comportamento mobile;
- recuperação de erro.

## 8. Matriz de cobertura futura

| Domínio | Unitário | Componente | Integração | E2E |
|---|---|---|---|---|
| Agendamentos | Obrigatório | Obrigatório | Obrigatório | Obrigatório |
| Fidelidade | Obrigatório | Obrigatório | Obrigatório | Recomendado |
| Benefícios | Obrigatório | Obrigatório | Obrigatório | Recomendado |
| Pacotes | Obrigatório | Obrigatório | Obrigatório | Recomendado |
| Consumo/saldo | Obrigatório | Obrigatório | Obrigatório | Recomendado |

## 9. Restrições

- Nenhum teste novo criado.
- Nenhum endpoint criado.
- Nenhuma alteração no backend.
- Nenhum dado real exposto.
- Nenhuma funcionalidade dos Chats 63 e 64 antecipada.
- Nenhum commit, push, tag ou deploy executado.

## 10. Próximo bloco

O BLOCO 11/15 deverá executar a validação técnica da fundação existente com typecheck, lint e testes focados, sem implementar ainda as funcionalidades de domínio.
