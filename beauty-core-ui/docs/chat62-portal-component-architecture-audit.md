# Beauty Core 1.0 — Chat 62
## BLOCO 09/15 — Auditoria da Arquitetura de Componentes

- Data: 2026-09-05 23:14:19 -03:00
- Branch: chat32-bullmq-enterprise
- HEAD: b9913a7c007e03929ac893ef01e1a849f04394fe
- Backend alterado: NÃO

## 1. Objetivo

Mapear os componentes reutilizáveis e definir a composição técnica das superfícies de:

- agendamentos;
- fidelidade;
- benefícios;
- pacotes;
- consumo e saldo.

Este bloco não implementa telas funcionais.

## 2. Componentes candidatos

Quantidade: 244

- `src\components\dashboard\kpi-card.tsx`
- `src\components\design-system\foundations-demo.tsx`
- `src\components\forms\form-field-message.tsx`
- `src\components\forms\form-foundation.test.tsx`
- `src\components\forms\form-foundation.tsx`
- `src\components\forms\form-submit-button.tsx`
- `src\components\layout\admin-app-shell.tsx`
- `src\components\layout\admin-shell-boundary.test.tsx`
- `src\components\layout\admin-shell-boundary.tsx`
- `src\components\layout\admin-sidebar.test.tsx`
- `src\components\layout\admin-sidebar.tsx`
- `src\components\layout\admin-topbar.tsx`
- `src\components\layout\breadcrumbs.tsx`
- `src\components\layout\page-container.tsx`
- `src\components\layout\page-header.test.tsx`
- `src\components\layout\page-header.tsx`
- `src\components\layout\page-section.tsx`
- `src\components\layout\theme-toggle.tsx`
- `src\components\overlays\design-system-overlays-demo.tsx`
- `src\components\states\feedback-states.test.tsx`
- `src\components\states\feedback-states.tsx`
- `src\components\tables\design-system-table-demo.tsx`
- `src\components\tables\table-foundation.tsx`
- `src\components\ui\alert-dialog.tsx`
- `src\components\ui\badge.tsx`
- `src\components\ui\button.tsx`
- `src\components\ui\card.tsx`
- `src\components\ui\checkbox.tsx`
- `src\components\ui\dialog.tsx`
- `src\components\ui\dropdown-menu.tsx`
- `src\components\ui\input.tsx`
- `src\components\ui\label.tsx`
- `src\components\ui\radio-group.tsx`
- `src\components\ui\select.tsx`
- `src\components\ui\separator.tsx`
- `src\components\ui\sheet.tsx`
- `src\components\ui\skeleton.tsx`
- `src\components\ui\status-badge.test.tsx`
- `src\components\ui\status-badge.tsx`
- `src\components\ui\switch.tsx`
- `src\components\ui\table.tsx`
- `src\components\ui\textarea.tsx`
- `src\components\ui\tooltip.tsx`
- `src\features\agendamentos\components\agenda-list.test.tsx`
- `src\features\agendamentos\components\agenda-list.tsx`
- `src\features\agendamentos\components\agendamento-create-dialog.integration.test.tsx`
- `src\features\agendamentos\components\agendamento-create-dialog.tsx`
- `src\features\agendamentos\components\agendamento-detail-dialog.integration.test.tsx`
- `src\features\agendamentos\components\agendamento-detail-dialog.tsx`
- `src\features\agendamentos\components\agenda-status-badge.test.tsx`
- `src\features\agendamentos\components\agenda-status-badge.tsx`
- `src\features\agendamentos\forms\agendamento-create-form.schema.test.ts`
- `src\features\agendamentos\forms\agendamento-create-form.schema.ts`
- `src\features\agendamentos\forms\agendamento-create-form.test.tsx`
- `src\features\agendamentos\forms\agendamento-create-form.tsx`
- `src\features\agendamentos\forms\agendamento-edit-form.tsx`
- `src\features\arquivos\components\arquivo-detail-dialog.tsx`
- `src\features\arquivos\components\arquivo-remove-dialog.test.tsx`
- `src\features\arquivos\components\arquivo-remove-dialog.tsx`
- `src\features\arquivos\components\arquivos-list.test.tsx`
- `src\features\arquivos\components\arquivos-list.tsx`
- `src\features\arquivos\components\arquivo-upload-dialog.test.tsx`
- `src\features\arquivos\components\arquivo-upload-dialog.tsx`
- `src\features\arquivos\utils\arquivos-formatters.ts`
- `src\features\arquivos\utils\arquivos-list-url.test.ts`
- `src\features\arquivos\utils\arquivos-list-url.ts`
- `src\features\auth\components\admin-login-form.tsx`
- `src\features\auth\forms\use-login-form.ts`
- `src\features\automacoes\forms\automacao-evento-form.test.tsx`
- `src\features\automacoes\forms\automacao-evento-form.tsx`
- `src\features\automacoes\utils\automacoes-formatters.ts`
- `src\features\clientes\components\cliente-form-dialog.integration.test.tsx`
- `src\features\clientes\components\cliente-form-dialog.tsx`
- `src\features\clientes\components\clientes-list.tsx`
- `src\features\clientes\forms\cliente-form.schema.test.ts`
- `src\features\clientes\forms\cliente-form.schema.ts`
- `src\features\clientes\forms\cliente-form.test.tsx`
- `src\features\clientes\forms\cliente-form.tsx`
- `src\features\clientes\forms\cliente-form-error.test.ts`
- `src\features\clientes\forms\cliente-form-error.ts`
- `src\features\clientes\utils\clientes-list-url.test.ts`
- `src\features\clientes\utils\clientes-list-url.ts`
- `src\features\configuracoes\components\branding-capabilities-card.test.tsx`
- `src\features\configuracoes\components\branding-capabilities-card.tsx`
- `src\features\configuracoes\components\branding-logo-upload-card.test.tsx`
- `src\features\configuracoes\components\branding-logo-upload-card.tsx`
- `src\features\configuracoes\components\branding-preview-card.test.tsx`
- `src\features\configuracoes\components\branding-preview-card.tsx`
- `src\features\configuracoes\components\configuracoes-gerais-card.test.tsx`
- `src\features\configuracoes\components\configuracoes-gerais-card.tsx`
- `src\features\configuracoes\components\configuracoes-navigation-card.test.tsx`
- `src\features\configuracoes\components\configuracoes-navigation-card.tsx`
- `src\features\dashboard\utils\dashboard-formatters.test.ts`
- `src\features\dashboard\utils\dashboard-formatters.ts`
- `src\features\fidelidade\beneficios\beneficio-form.schema.test.ts`
- `src\features\fidelidade\beneficios\beneficio-form.schema.ts`
- `src\features\fidelidade\beneficios\beneficio-form.tsx`
- `src\features\fidelidade\components\fidelidade-saldo-card.tsx`
- `src\features\fidelidade\cupons\cupom-form.schema.test.ts`
- `src\features\fidelidade\cupons\cupom-form.schema.ts`
- `src\features\fidelidade\cupons\cupom-form.tsx`
- `src\features\fidelidade\cupons\cupom-validacao-form.tsx`
- `src\features\fidelidade\forms\configuracao-fidelidade-form.schema.test.ts`
- `src\features\fidelidade\forms\configuracao-fidelidade-form.schema.ts`
- `src\features\fidelidade\forms\configuracao-fidelidade-form.tsx`
- `src\features\fidelidade\forms\nivel-fidelidade-form.schema.test.ts`
- `src\features\fidelidade\forms\nivel-fidelidade-form.schema.ts`
- `src\features\fidelidade\forms\nivel-fidelidade-form.tsx`
- `src\features\fidelidade\utils\fidelidade-formatters.test.ts`
- `src\features\fidelidade\utils\fidelidade-formatters.ts`
- `src\features\fidelidade\utils\fidelidade-historico-formatters.test.ts`
- `src\features\fidelidade\utils\fidelidade-historico-formatters.ts`
- `src\features\financeiro\components\cancelar-movimentacao-dialog.test.tsx`
- `src\features\financeiro\components\cancelar-movimentacao-dialog.tsx`
- `src\features\financeiro\components\categoria-financeira-form.test.tsx`
- `src\features\financeiro\components\categoria-financeira-form.tsx`
- `src\features\financeiro\components\categoria-financeira-form-dialog.tsx`
- `src\features\financeiro\components\categoria-financeira-inativar-dialog.tsx`
- `src\features\financeiro\components\comissao-create-dialog.tsx`
- `src\features\financeiro\components\comissao-detail-dialog.tsx`
- `src\features\financeiro\components\comissao-form.test.tsx`
- `src\features\financeiro\components\comissao-form.tsx`
- `src\features\financeiro\components\comissao-pay-dialog.tsx`
- `src\features\financeiro\components\comissoes-list.test.tsx`
- `src\features\financeiro\components\comissoes-list.tsx`
- `src\features\financeiro\components\financeiro-operacional-cards.test.tsx`
- `src\features\financeiro\components\financeiro-operacional-cards.tsx`
- `src\features\financeiro\components\fluxo-caixa-operacional-list.tsx`
- `src\features\financeiro\components\movimentacao-financeira-detail-dialog.tsx`
- `src\features\financeiro\components\movimentacao-financeira-form.test.tsx`
- `src\features\financeiro\components\movimentacao-financeira-form.tsx`
- `src\features\financeiro\components\movimentacao-financeira-form-dialog.tsx`
- `src\features\financeiro\components\movimentacoes-financeiras-list.test.tsx`
- `src\features\financeiro\components\movimentacoes-financeiras-list.tsx`
- `src\features\financeiro\components\pagamento-movimentacao-dialog.tsx`
- `src\features\financeiro\components\pagamento-movimentacao-form.test.tsx`
- `src\features\financeiro\components\pagamento-movimentacao-form.tsx`
- `src\features\financeiro\forms\categoria-financeira-form.schema.test.ts`
- `src\features\financeiro\forms\categoria-financeira-form.schema.ts`
- `src\features\financeiro\forms\comissao-form.schema.test.ts`
- `src\features\financeiro\forms\comissao-form.schema.ts`
- `src\features\financeiro\forms\movimentacao-financeira-form.schema.test.ts`
- `src\features\financeiro\forms\movimentacao-financeira-form.schema.ts`
- `src\features\financeiro\forms\pagamento-movimentacao-form.schema.test.ts`
- `src\features\financeiro\forms\pagamento-movimentacao-form.schema.ts`
- `src\features\financeiro\hooks\use-movimentacoes-list-url-state.ts`
- `src\features\financeiro\utils\comissao-formatters.ts`
- `src\features\financeiro\utils\financeiro-formatters.test.ts`
- `src\features\financeiro\utils\financeiro-formatters.ts`
- `src\features\financeiro\utils\movimentacao-financeira-formatters.test.ts`
- `src\features\financeiro\utils\movimentacao-financeira-formatters.ts`
- `src\features\financeiro\utils\movimentacoes-list-url.test.ts`
- `src\features\financeiro\utils\movimentacoes-list-url.ts`
- `src\features\notificacoes\components\notificacoes-list.test.tsx`
- `src\features\notificacoes\components\notificacoes-list.tsx`
- `src\features\notificacoes\settings\notificacoes-settings-form.test.tsx`
- `src\features\notificacoes\settings\notificacoes-settings-form.tsx`
- `src\features\notificacoes\utils\notificacoes-formatters.ts`
- `src\features\pacotes\catalogo\pacote-form.schema.test.ts`
- `src\features\pacotes\catalogo\pacote-form.schema.ts`
- `src\features\pacotes\catalogo\pacote-form.tsx`
- `src\features\pacotes\catalogo\pacote-form-limits.ts`
- `src\features\pacotes\clientes-pacotes\cliente-pacote-form.schema.test.ts`
- `src\features\pacotes\clientes-pacotes\cliente-pacote-form.schema.ts`
- `src\features\pacotes\clientes-pacotes\cliente-pacote-form.tsx`
- `src\features\pacotes\utils\pacotes-formatters.test.ts`
- `src\features\pacotes\utils\pacotes-formatters.ts`
- `src\features\portal\components\portal-asset-image.test.tsx`
- `src\features\portal\components\portal-asset-image.tsx`
- `src\features\portal\components\portal-branding.test.tsx`
- `src\features\portal\components\portal-branding.tsx`
- `src\features\portal\components\portal-dashboard-data-boundary.test.tsx`
- `src\features\portal\components\portal-dashboard-data-boundary.tsx`
- `src\features\portal\components\portal-navigation.test.tsx`
- `src\features\portal\components\portal-navigation.tsx`
- `src\features\portal\components\portal-page-container.test.tsx`
- `src\features\portal\components\portal-page-container.tsx`
- `src\features\portal\components\portal-responsive-a11y.test.tsx`
- `src\features\portal\components\portal-shell.test.tsx`
- `src\features\portal\components\portal-shell.tsx`
- `src\features\portal\pages\portal-authenticated-surface.test.tsx`
- `src\features\portal\pages\portal-authenticated-surface.tsx`
- `src\features\portal\pages\portal-auth-ux.test.tsx`
- `src\features\portal\pages\portal-first-access-experience.test.tsx`
- `src\features\portal\pages\portal-first-access-experience.tsx`
- `src\features\portal\pages\portal-first-access-page.test.tsx`
- `src\features\portal\pages\portal-first-access-page.tsx`
- `src\features\portal\pages\portal-foundation-page.tsx`
- `src\features\portal\pages\portal-otp-request-page.tsx`
- `src\features\portal\pages\portal-private-route-page.tsx`
- `src\features\portal\pages\portal-terms-consent.test.tsx`
- `src\features\portal\pages\portal-terms-consent.tsx`
- `src\features\profissionais\components\profissionais-list.tsx`
- `src\features\profissionais\components\profissional-form-dialog.integration.test.tsx`
- `src\features\profissionais\components\profissional-form-dialog.tsx`
- `src\features\profissionais\utils\profissionais-formatters.test.ts`
- `src\features\profissionais\utils\profissionais-formatters.ts`
- `src\features\profissionais\utils\profissionais-list-url.test.ts`
- `src\features\profissionais\utils\profissionais-list-url.ts`
- `src\features\servicos\components\servico-deactivate-dialog.tsx`
- `src\features\servicos\components\servico-form-dialog.tsx`
- `src\features\servicos\components\servicos-list.tsx`
- `src\features\servicos\forms\servico-form.schema.test.ts`
- `src\features\servicos\forms\servico-form.schema.ts`
- `src\features\servicos\forms\servico-form.test.tsx`
- `src\features\servicos\forms\servico-form.tsx`
- `src\features\servicos\forms\servico-form-error.ts`
- `src\features\servicos\utils\servicos-formatters.test.ts`
- `src\features\servicos\utils\servicos-formatters.ts`
- `src\features\unidades\components\unidade-deactivate-dialog.tsx`
- `src\features\unidades\components\unidade-form-dialog.tsx`
- `src\features\unidades\components\unidades-list.tsx`
- `src\features\unidades\forms\unidade-form.schema.test.ts`
- `src\features\unidades\forms\unidade-form.schema.ts`
- `src\features\unidades\forms\unidade-form.test.tsx`
- `src\features\unidades\forms\unidade-form.tsx`
- `src\features\unidades\forms\unidade-form-error.ts`
- `src\features\unidades\utils\unidades-formatters.test.ts`
- `src\features\unidades\utils\unidades-formatters.ts`
- `src\features\usuarios\components\usuario-deactivate-dialog.tsx`
- `src\features\usuarios\components\usuario-form-dialog.integration.test.tsx`
- `src\features\usuarios\components\usuario-form-dialog.tsx`
- `src\features\usuarios\components\usuarios-list.tsx`
- `src\features\usuarios\forms\usuario-form.schema.test.ts`
- `src\features\usuarios\forms\usuario-form.schema.ts`
- `src\features\usuarios\forms\usuario-form.test.tsx`
- `src\features\usuarios\forms\usuario-form.tsx`
- `src\features\usuarios\forms\usuario-form-error.ts`
- `src\features\usuarios\utils\usuarios-formatters.test.ts`
- `src\features\usuarios\utils\usuarios-formatters.ts`
- `src\features\usuarios\utils\usuarios-list-url.test.ts`
- `src\features\usuarios\utils\usuarios-list-url.ts`
- `src\features\whatsapp\campaigns\campanha-whatsapp-form.tsx`
- `src\features\whatsapp\components\campanhas-whatsapp-list.test.tsx`
- `src\features\whatsapp\components\campanhas-whatsapp-list.tsx`
- `src\features\whatsapp\components\campanha-whatsapp-form-dialog.tsx`
- `src\features\whatsapp\components\mensagens-whatsapp-list.test.tsx`
- `src\features\whatsapp\components\mensagens-whatsapp-list.tsx`
- `src\features\whatsapp\components\templates-whatsapp-list.test.tsx`
- `src\features\whatsapp\components\templates-whatsapp-list.tsx`
- `src\features\whatsapp\components\template-whatsapp-form-dialog.tsx`
- `src\features\whatsapp\messages\mensagem-whatsapp-form.tsx`
- `src\features\whatsapp\templates\template-whatsapp-form.tsx`
- `src\features\whatsapp\utils\whatsapp-formatters.ts`

## 3. Padrões de composição

Quantidade de ocorrências: 1384

``text
beauty-core-ui/src/components/dashboard/kpi-card.tsx:5:  Card,
beauty-core-ui/src/components/dashboard/kpi-card.tsx:6:  CardContent,
beauty-core-ui/src/components/dashboard/kpi-card.tsx:7:} from "@/components/ui/card";
beauty-core-ui/src/components/dashboard/kpi-card.tsx:9:type KpiCardProps = {
beauty-core-ui/src/components/dashboard/kpi-card.tsx:14:  badge?: ReactNode;
beauty-core-ui/src/components/dashboard/kpi-card.tsx:17:export function KpiCard({
beauty-core-ui/src/components/dashboard/kpi-card.tsx:22:  badge,
beauty-core-ui/src/components/dashboard/kpi-card.tsx:23:}: KpiCardProps) {
beauty-core-ui/src/components/dashboard/kpi-card.tsx:25:    <Card className="gap-0 border-border-subtle bg-surface-elevated py-0 shadow-card">
beauty-core-ui/src/components/dashboard/kpi-card.tsx:26:      <CardContent className="p-card">
beauty-core-ui/src/components/dashboard/kpi-card.tsx:46:        {(description || badge) && (
beauty-core-ui/src/components/dashboard/kpi-card.tsx:48:            {badge}
beauty-core-ui/src/components/dashboard/kpi-card.tsx:57:      </CardContent>
beauty-core-ui/src/components/dashboard/kpi-card.tsx:58:    </Card>
beauty-core-ui/src/components/design-system/foundations-demo.tsx:5:type TokenSwatchProps = {
beauty-core-ui/src/components/design-system/foundations-demo.tsx:15:}: TokenSwatchProps) {
beauty-core-ui/src/components/design-system/foundations-demo.tsx:29:export function FoundationsDemo() {
beauty-core-ui/src/components/design-system/foundations-demo.tsx:110:        <div className="rounded-large border border-border-subtle bg-surface-elevated p-card shadow-card">
beauty-core-ui/src/components/design-system/foundations-demo.tsx:216:        <div className="space-y-5 rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle">
beauty-core-ui/src/components/design-system/foundations-demo.tsx:254:            Caption ÔÇö metadados e informa├º├Áes auxiliares.
beauty-core-ui/src/components/design-system/foundations-demo.tsx:265:          <p className="text-table">
beauty-core-ui/src/components/design-system/foundations-demo.tsx:266:            Table ÔÇö conte├║do tabular.
beauty-core-ui/src/components/design-system/foundations-demo.tsx:283:          <div className="rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle">
beauty-core-ui/src/components/design-system/foundations-demo.tsx:290:              <div className="h-2 w-[var(--spacing-card)] bg-brand-primary" />
beauty-core-ui/src/components/design-system/foundations-demo.tsx:291:              <div className="h-2 w-[var(--spacing-form)] bg-brand-primary" />
beauty-core-ui/src/components/design-system/foundations-demo.tsx:296:          <div className="rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle">
beauty-core-ui/src/components/design-system/foundations-demo.tsx:309:          <div className="rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle">
beauty-core-ui/src/components/design-system/foundations-demo.tsx:319:              <div className="flex h-16 items-center justify-center rounded-medium bg-surface text-caption shadow-card">
beauty-core-ui/src/components/design-system/foundations-demo.tsx:320:                card
beauty-core-ui/src/components/design-system/foundations-demo.tsx:327:              <div className="flex h-16 items-center justify-center rounded-medium bg-surface text-caption shadow-modal">
beauty-core-ui/src/components/design-system/foundations-demo.tsx:328:                modal
beauty-core-ui/src/components/forms/form-field-message.tsx:1:´╗┐import type { FieldError } from "react-hook-form";
beauty-core-ui/src/components/forms/form-field-message.tsx:5:type FormFieldMessageProps = {
beauty-core-ui/src/components/forms/form-field-message.tsx:12:  error: FormFieldMessageProps["error"],
beauty-core-ui/src/components/forms/form-field-message.tsx:27:export function FormFieldMessage({
beauty-core-ui/src/components/forms/form-field-message.tsx:31:}: FormFieldMessageProps) {
beauty-core-ui/src/components/forms/form-field-message.tsx:41:      role="alert"
beauty-core-ui/src/components/forms/form-foundation.test.tsx:5:  FormActions,
beauty-core-ui/src/components/forms/form-foundation.test.tsx:6:  FormField,
beauty-core-ui/src/components/forms/form-foundation.test.tsx:7:  FormGrid,
beauty-core-ui/src/components/forms/form-foundation.test.tsx:8:  FormSection,
beauty-core-ui/src/components/forms/form-foundation.test.tsx:9:} from "@/components/forms/form-foundation";
beauty-core-ui/src/components/forms/form-foundation.test.tsx:10:import { Button } from "@/components/ui/button";
beauty-core-ui/src/components/forms/form-foundation.test.tsx:11:import { Input } from "@/components/ui/input";
beauty-core-ui/src/components/forms/form-foundation.test.tsx:13:describe("form foundation", () => {
beauty-core-ui/src/components/forms/form-foundation.test.tsx:16:      <FormField
beauty-core-ui/src/components/forms/form-foundation.test.tsx:23:        <Input id="customer-name" />
beauty-core-ui/src/components/forms/form-foundation.test.tsx:24:      </FormField>,
beauty-core-ui/src/components/forms/form-foundation.test.tsx:42:      screen.getByRole("alert"),
beauty-core-ui/src/components/forms/form-foundation.test.tsx:54:      <FormSection
beauty-core-ui/src/components/forms/form-foundation.test.tsx:58:        <FormGrid>
beauty-core-ui/src/components/forms/form-foundation.test.tsx:61:        </FormGrid>
beauty-core-ui/src/components/forms/form-foundation.test.tsx:63:        <FormActions>
beauty-core-ui/src/components/forms/form-foundation.test.tsx:64:          <Button>
beauty-core-ui/src/components/forms/form-foundation.test.tsx:66:          </Button>
beauty-core-ui/src/components/forms/form-foundation.test.tsx:67:        </FormActions>
beauty-core-ui/src/components/forms/form-foundation.test.tsx:68:      </FormSection>,
beauty-core-ui/src/components/forms/form-foundation.test.tsx:82:      screen.getByRole("button", {
beauty-core-ui/src/components/forms/form-foundation.tsx:6:type FormFieldProps = {
beauty-core-ui/src/components/forms/form-foundation.tsx:9:  children: ReactNode;
beauty-core-ui/src/components/forms/form-foundation.tsx:16:export function FormField({
beauty-core-ui/src/components/forms/form-foundation.tsx:19:  children,
beauty-core-ui/src/components/forms/form-foundation.tsx:24:}: FormFieldProps) {
beauty-core-ui/src/components/forms/form-foundation.tsx:58:      {children}
beauty-core-ui/src/components/forms/form-foundation.tsx:72:          role="alert"
beauty-core-ui/src/components/forms/form-foundation.tsx:82:type FormSectionProps = {
beauty-core-ui/src/components/forms/form-foundation.tsx:85:  children: ReactNode;
beauty-core-ui/src/components/forms/form-foundation.tsx:89:export function FormSection({
beauty-core-ui/src/components/forms/form-foundation.tsx:92:  children,
beauty-core-ui/src/components/forms/form-foundation.tsx:94:}: FormSectionProps) {
beauty-core-ui/src/components/forms/form-foundation.tsx:98:        "rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle",
beauty-core-ui/src/components/forms/form-foundation.tsx:114:      <div className="mt-form space-y-form">
beauty-core-ui/src/components/forms/form-foundation.tsx:115:        {children}
beauty-core-ui/src/components/forms/form-foundation.tsx:121:type FormGridProps = {
beauty-core-ui/src/components/forms/form-foundation.tsx:122:  children: ReactNode;
beauty-core-ui/src/components/forms/form-foundation.tsx:126:export function FormGrid({
beauty-core-ui/src/components/forms/form-foundation.tsx:127:  children,
beauty-core-ui/src/components/forms/form-foundation.tsx:129:}: FormGridProps) {
beauty-core-ui/src/components/forms/form-foundation.tsx:133:        "grid grid-cols-1 gap-form md:grid-cols-2",
beauty-core-ui/src/components/forms/form-foundation.tsx:137:      {children}
beauty-core-ui/src/components/forms/form-foundation.tsx:142:type FormActionsProps = {
beauty-core-ui/src/components/forms/form-foundation.tsx:143:  children: ReactNode;
beauty-core-ui/src/components/forms/form-foundation.tsx:147:export function FormActions({
beauty-core-ui/src/components/forms/form-foundation.tsx:148:  children,
beauty-core-ui/src/components/forms/form-foundation.tsx:150:}: FormActionsProps) {
beauty-core-ui/src/components/forms/form-foundation.tsx:158:      {children}
beauty-core-ui/src/components/forms/form-submit-button.tsx:4:import type { ComponentProps } from "react";
beauty-core-ui/src/components/forms/form-submit-button.tsx:6:import { Button } from "@/components/ui/button";
beauty-core-ui/src/components/forms/form-submit-button.tsx:8:type FormSubmitButtonProps = ComponentProps<typeof Button> & {
beauty-core-ui/src/components/forms/form-submit-button.tsx:13:export function FormSubmitButton({
beauty-core-ui/src/components/forms/form-submit-button.tsx:14:  children,
beauty-core-ui/src/components/forms/form-submit-button.tsx:17:  ...props
beauty-core-ui/src/components/forms/form-submit-button.tsx:18:}: FormSubmitButtonProps) {
beauty-core-ui/src/components/forms/form-submit-button.tsx:19:  const disabled = pending || props.disabled;
beauty-core-ui/src/components/forms/form-submit-button.tsx:22:    <Button
beauty-core-ui/src/components/forms/form-submit-button.tsx:23:      {...props}
beauty-core-ui/src/components/forms/form-submit-button.tsx:24:      type={props.type ?? "submit"}
beauty-core-ui/src/components/forms/form-submit-button.tsx:37:        children
beauty-core-ui/src/components/forms/form-submit-button.tsx:39:    </Button>
beauty-core-ui/src/components/layout/admin-app-shell.tsx:12:type AdminAppShellProps = {
beauty-core-ui/src/components/layout/admin-app-shell.tsx:13:  children: ReactNode;
beauty-core-ui/src/components/layout/admin-app-shell.tsx:18:export function AdminAppShell({
beauty-core-ui/src/components/layout/admin-app-shell.tsx:19:  children,
beauty-core-ui/src/components/layout/admin-app-shell.tsx:22:}: AdminAppShellProps) {
beauty-core-ui/src/components/layout/admin-app-shell.tsx:53:            {children}
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:18:import { AdminShellBoundary } from "@/components/layout/admin-shell-boundary";
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:34:  "@/components/layout/admin-app-shell",
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:36:    AdminAppShell: ({
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:37:      children,
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:41:      children: ReactNode;
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:46:        data-testid="mock-admin-shell"
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:54:        {children}
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:81:describe("AdminShellBoundary", () => {
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:88:      <AdminShellBoundary>
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:90:      </AdminShellBoundary>,
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:93:    const shell = screen.getByTestId(
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:94:      "mock-admin-shell",
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:97:    expect(shell).toHaveAttribute(
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:102:    expect(shell).toHaveAttribute(
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:126:      <AdminShellBoundary>
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:128:      </AdminShellBoundary>,
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:131:    const shell = screen.getByTestId(
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:132:      "mock-admin-shell",
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:135:    expect(shell).toHaveAttribute(
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:140:    expect(shell).toHaveAttribute(
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:159:      <AdminShellBoundary>
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:161:      </AdminShellBoundary>,
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:190:      <AdminShellBoundary>
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:192:      </AdminShellBoundary>,
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:219:      <AdminShellBoundary>
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:221:      </AdminShellBoundary>,
beauty-core-ui/src/components/layout/admin-shell-boundary.test.tsx:226:        "mock-admin-shell",
beauty-core-ui/src/components/layout/admin-shell-boundary.tsx:12:import { AdminAppShell } from "@/components/layout/admin-app-shell";
beauty-core-ui/src/components/layout/admin-shell-boundary.tsx:23:type AdminShellBoundaryProps = {
beauty-core-ui/src/components/layout/admin-shell-boundary.tsx:24:  children: ReactNode;
beauty-core-ui/src/components/layout/admin-shell-boundary.tsx:32:export function AdminShellBoundary({
beauty-core-ui/src/components/layout/admin-shell-boundary.tsx:33:  children,
beauty-core-ui/src/components/layout/admin-shell-boundary.tsx:34:}: AdminShellBoundaryProps) {
beauty-core-ui/src/components/layout/admin-shell-boundary.tsx:107:      <AdminAppShell role={user.role}>
beauty-core-ui/src/components/layout/admin-shell-boundary.tsx:108:        {children}
beauty-core-ui/src/components/layout/admin-shell-boundary.tsx:109:      </AdminAppShell>
beauty-core-ui/src/components/layout/admin-shell-boundary.tsx:115:      <AdminAppShell
beauty-core-ui/src/components/layout/admin-shell-boundary.tsx:119:        {children}
beauty-core-ui/src/components/layout/admin-shell-boundary.tsx:120:      </AdminAppShell>
beauty-core-ui/src/components/layout/admin-shell-boundary.tsx:134:        <div className="max-w-md rounded-large border border-border-subtle bg-surface-elevated p-modal text-center shadow-card">
beauty-core-ui/src/components/layout/admin-shell-boundary.tsx:153:      <div className="max-w-md rounded-large border border-border-subtle bg-surface-elevated p-modal text-center shadow-card">
beauty-core-ui/src/components/layout/admin-sidebar.tsx:11:import { Button } from "@/components/ui/button";
beauty-core-ui/src/components/layout/admin-sidebar.tsx:33:type AdminSidebarProps = {
beauty-core-ui/src/components/layout/admin-sidebar.tsx:90:          {item.badge && (
beauty-core-ui/src/components/layout/admin-sidebar.tsx:92:              {item.badge}
beauty-core-ui/src/components/layout/admin-sidebar.tsx:96:          {disabled && !item.badge && (
beauty-core-ui/src/components/layout/admin-sidebar.tsx:139:export function AdminSidebar({ role }: AdminSidebarProps) {
beauty-core-ui/src/components/layout/admin-sidebar.tsx:191:          <Button
beauty-core-ui/src/components/layout/admin-sidebar.tsx:192:            type="button"
beauty-core-ui/src/components/layout/admin-sidebar.tsx:199:          </Button>
beauty-core-ui/src/components/layout/admin-sidebar.tsx:207:              <Button
beauty-core-ui/src/components/layout/admin-sidebar.tsx:208:                type="button"
beauty-core-ui/src/components/layout/admin-sidebar.tsx:215:              </Button>
beauty-core-ui/src/components/layout/admin-sidebar.tsx:278:export function AdminMobileSidebar({
beauty-core-ui/src/components/layout/admin-sidebar.tsx:280:}: AdminSidebarProps) {
beauty-core-ui/src/components/layout/admin-topbar.tsx:13:import { Button } from "@/components/ui/button";
beauty-core-ui/src/components/layout/admin-topbar.tsx:22:type AdminTopbarProps = {
beauty-core-ui/src/components/layout/admin-topbar.tsx:26:export function AdminTopbar({
beauty-core-ui/src/components/layout/admin-topbar.tsx:28:}: AdminTopbarProps) {
beauty-core-ui/src/components/layout/admin-topbar.tsx:60:        <Button
beauty-core-ui/src/components/layout/admin-topbar.tsx:61:          type="button"
beauty-core-ui/src/components/layout/admin-topbar.tsx:73:        </Button>
beauty-core-ui/src/components/layout/breadcrumbs.tsx:11:type BreadcrumbsProps = {
beauty-core-ui/src/components/layout/breadcrumbs.tsx:16:export function Breadcrumbs({
beauty-core-ui/src/components/layout/breadcrumbs.tsx:19:}: BreadcrumbsProps) {
beauty-core-ui/src/components/layout/page-container.tsx:5:type PageContainerSize =
beauty-core-ui/src/components/layout/page-container.tsx:10:type PageContainerProps = HTMLAttributes<HTMLDivElement> & {
beauty-core-ui/src/components/layout/page-container.tsx:11:  children: ReactNode;
beauty-core-ui/src/components/layout/page-container.tsx:12:  size?: PageContainerSize;
beauty-core-ui/src/components/layout/page-container.tsx:15:const SIZE_CLASSES: Record<PageContainerSize, string> = {
beauty-core-ui/src/components/layout/page-container.tsx:21:export function PageContainer({
beauty-core-ui/src/components/layout/page-container.tsx:22:  children,
beauty-core-ui/src/components/layout/page-container.tsx:25:  ...props
beauty-core-ui/src/components/layout/page-container.tsx:26:}: PageContainerProps) {
beauty-core-ui/src/components/layout/page-container.tsx:34:      {...props}
beauty-core-ui/src/components/layout/page-container.tsx:36:      {children}
beauty-core-ui/src/components/layout/page-header.test.tsx:5:import { Button } from "@/components/ui/button";
beauty-core-ui/src/components/layout/page-header.test.tsx:43:          <Button>
beauty-core-ui/src/components/layout/page-header.test.tsx:45:          </Button>
beauty-core-ui/src/components/layout/page-header.test.tsx:55:      screen.getByRole("button", {
beauty-core-ui/src/components/layout/page-header.tsx:5:type PageHeaderProps = {
beauty-core-ui/src/components/layout/page-header.tsx:14:export function PageHeader({
beauty-core-ui/src/components/layout/page-header.tsx:21:}: PageHeaderProps) {
beauty-core-ui/src/components/layout/page-section.tsx:8:type PageSectionProps = {
beauty-core-ui/src/components/layout/page-section.tsx:9:  children: ReactNode;
beauty-core-ui/src/components/layout/page-section.tsx:16:export function PageSection({
beauty-core-ui/src/components/layout/page-section.tsx:17:  children,
beauty-core-ui/src/components/layout/page-section.tsx:22:}: PageSectionProps) {
beauty-core-ui/src/components/layout/page-section.tsx:74:        {children}
beauty-core-ui/src/components/layout/page-section.tsx:80:type ResponsiveGridProps = {
beauty-core-ui/src/components/layout/page-section.tsx:81:  children: ReactNode;
beauty-core-ui/src/components/layout/page-section.tsx:85:export function ResponsiveGrid({
beauty-core-ui/src/components/layout/page-section.tsx:86:  children,
beauty-core-ui/src/components/layout/page-section.tsx:88:}: ResponsiveGridProps) {
beauty-core-ui/src/components/layout/page-section.tsx:96:      {children}
beauty-core-ui/src/components/layout/page-section.tsx:101:type ContentToolbarProps = {
beauty-core-ui/src/components/layout/page-section.tsx:102:  children: ReactNode;
beauty-core-ui/src/components/layout/page-section.tsx:106:export function ContentToolbar({
beauty-core-ui/src/components/layout/page-section.tsx:107:  children,
beauty-core-ui/src/components/layout/page-section.tsx:109:}: ContentToolbarProps) {
beauty-core-ui/src/components/layout/page-section.tsx:113:        "flex min-w-0 flex-col gap-3 rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle sm:flex-row sm:items-center sm:justify-between",
beauty-core-ui/src/components/layout/page-section.tsx:117:      {children}
beauty-core-ui/src/components/layout/theme-toggle.tsx:7:import { Button } from "@/components/ui/button";
beauty-core-ui/src/components/layout/theme-toggle.tsx:19:export function ThemeToggle() {
beauty-core-ui/src/components/layout/theme-toggle.tsx:43:        <Button
beauty-core-ui/src/components/layout/theme-toggle.tsx:44:          type="button"
beauty-core-ui/src/components/layout/theme-toggle.tsx:58:        </Button>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:11:  AlertDialog,
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:12:  AlertDialogAction,
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:13:  AlertDialogCancel,
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:14:  AlertDialogContent,
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:15:  AlertDialogDescription,
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:16:  AlertDialogFooter,
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:17:  AlertDialogHeader,
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:18:  AlertDialogTitle,
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:19:  AlertDialogTrigger,
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:20:} from "@/components/ui/alert-dialog";
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:21:import { Button } from "@/components/ui/button";
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:23:  Dialog,
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:24:  DialogContent,
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:25:  DialogDescription,
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:26:  DialogFooter,
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:27:  DialogHeader,
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:28:  DialogTitle,
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:29:  DialogTrigger,
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:30:} from "@/components/ui/dialog";
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:49:export function DesignSystemOverlaysDemo() {
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:52:      <div className="rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle">
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:54:          Dialog
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:58:          Modal para edi├º├úo ou cria├º├úo de conte├║do.
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:61:        <Dialog>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:62:          <DialogTrigger asChild>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:63:            <Button
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:64:              type="button"
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:68:              Abrir dialog
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:69:            </Button>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:70:          </DialogTrigger>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:72:          <DialogContent>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:73:            <DialogHeader>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:74:              <DialogTitle>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:76:              </DialogTitle>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:78:              <DialogDescription>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:79:                Exemplo t├®cnico de modal administrativo.
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:80:              </DialogDescription>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:81:            </DialogHeader>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:87:            <DialogFooter>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:88:              <Button type="button">
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:90:              </Button>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:91:            </DialogFooter>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:92:          </DialogContent>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:93:        </Dialog>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:96:      <div className="rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle">
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:105:        <AlertDialog>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:106:          <AlertDialogTrigger asChild>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:107:            <Button
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:108:              type="button"
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:113:            </Button>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:114:          </AlertDialogTrigger>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:116:          <AlertDialogContent>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:117:            <AlertDialogHeader>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:118:              <AlertDialogTitle>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:120:              </AlertDialogTitle>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:122:              <AlertDialogDescription>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:124:              </AlertDialogDescription>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:125:            </AlertDialogHeader>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:127:            <AlertDialogFooter>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:128:              <AlertDialogCancel>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:130:              </AlertDialogCancel>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:132:              <AlertDialogAction>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:134:              </AlertDialogAction>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:135:            </AlertDialogFooter>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:136:          </AlertDialogContent>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:137:        </AlertDialog>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:140:      <div className="rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle">
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:151:            <Button
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:152:              type="button"
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:158:            </Button>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:181:      <div className="rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle">
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:183:          Drawer lateral
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:192:            <Button
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:193:              type="button"
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:198:              Abrir drawer
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:199:            </Button>
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:212:                Drawer demonstrativo do Design System.
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:223:              <Button type="button">
beauty-core-ui/src/components/overlays/design-system-overlays-demo.tsx:225:              </Button>
beauty-core-ui/src/components/states/feedback-states.test.tsx:19:import { Button } from "@/components/ui/button";
beauty-core-ui/src/components/states/feedback-states.test.tsx:22:  it("exp├Áe loading de forma acess├¡vel", () => {
beauty-core-ui/src/components/states/feedback-states.test.tsx:40:          <Button>
beauty-core-ui/src/components/states/feedback-states.test.tsx:42:          </Button>
beauty-core-ui/src/components/states/feedback-states.test.tsx:54:      screen.getByRole("button", {
beauty-core-ui/src/components/states/feedback-states.test.tsx:68:      screen.getByRole("button", {
beauty-core-ui/src/components/states/feedback-states.tsx:3:  CircleAlert,
beauty-core-ui/src/components/states/feedback-states.tsx:8:import { Button } from "@/components/ui/button";
beauty-core-ui/src/components/states/feedback-states.tsx:12:type StateFrameProps = {
beauty-core-ui/src/components/states/feedback-states.tsx:13:  children: ReactNode;
beauty-core-ui/src/components/states/feedback-states.tsx:18:  children,
beauty-core-ui/src/components/states/feedback-states.tsx:20:}: StateFrameProps) {
beauty-core-ui/src/components/states/feedback-states.tsx:24:        "flex min-h-56 flex-col items-center justify-center rounded-large border border-border-subtle bg-surface-elevated p-modal text-center shadow-subtle",
beauty-core-ui/src/components/states/feedback-states.tsx:28:      {children}
beauty-core-ui/src/components/states/feedback-states.tsx:33:export function LoadingState() {
beauty-core-ui/src/components/states/feedback-states.tsx:40:      className="rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle"
beauty-core-ui/src/components/states/feedback-states.tsx:64:type EmptyStateProps = {
beauty-core-ui/src/components/states/feedback-states.tsx:70:export function EmptyState({
beauty-core-ui/src/components/states/feedback-states.tsx:74:}: EmptyStateProps) {
beauty-core-ui/src/components/states/feedback-states.tsx:101:type ErrorStateProps = {
beauty-core-ui/src/components/states/feedback-states.tsx:107:export function ErrorState({
beauty-core-ui/src/components/states/feedback-states.tsx:111:}: ErrorStateProps) {
beauty-core-ui/src/components/states/feedback-states.tsx:117:        <CircleAlert
beauty-core-ui/src/components/states/feedback-states.tsx:132:        <Button
beauty-core-ui/src/components/states/feedback-states.tsx:133:          type="button"
beauty-core-ui/src/components/states/feedback-states.tsx:139:        </Button>
beauty-core-ui/src/components/states/feedback-states.tsx:145:type PermissionStateProps = {
beauty-core-ui/src/components/states/feedback-states.tsx:150:export function PermissionState({
beauty-core-ui/src/components/states/feedback-states.tsx:153:}: PermissionStateProps) {
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:8:  DataTableFrame,
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:9:  ResponsiveTableRegion,
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:10:  TableFooter,
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:11:  TableToolbar,
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:12:} from "@/components/tables/table-foundation";
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:13:import { Button } from "@/components/ui/button";
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:14:import { Input } from "@/components/ui/input";
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:15:import { StatusBadge } from "@/components/ui/status-badge";
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:17:  Table,
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:18:  TableBody,
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:19:  TableCell,
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:20:  TableHead,
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:21:  TableHeader,
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:22:  TableRow,
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:23:} from "@/components/ui/table";
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:60:export function DesignSystemTableDemo() {
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:62:    <DataTableFrame>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:63:      <TableToolbar>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:70:          <Input
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:78:        <Button
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:79:          type="button"
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:83:        </Button>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:84:      </TableToolbar>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:86:      <ResponsiveTableRegion label="Agendamentos demonstrativos">
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:87:        <Table className="min-w-[760px]">
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:88:          <TableHeader>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:89:            <TableRow>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:90:              <TableHead className="w-28">
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:92:              </TableHead>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:93:              <TableHead>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:95:              </TableHead>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:96:              <TableHead>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:98:              </TableHead>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:99:              <TableHead>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:101:              </TableHead>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:102:              <TableHead>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:104:              </TableHead>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:105:              <TableHead className="text-right">
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:107:              </TableHead>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:108:            </TableRow>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:109:          </TableHeader>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:111:          <TableBody>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:113:              <TableRow key={row.id}>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:114:                <TableCell className="font-mono text-caption text-text-muted">
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:116:                </TableCell>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:118:                <TableCell className="font-medium text-text-primary">
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:120:                </TableCell>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:122:                <TableCell className="text-text-secondary">
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:124:                </TableCell>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:126:                <TableCell className="text-text-secondary">
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:128:                </TableCell>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:130:                <TableCell>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:131:                  <StatusBadge tone={row.tone}>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:133:                  </StatusBadge>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:134:                </TableCell>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:136:                <TableCell className="text-right">
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:137:                  <Button
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:138:                    type="button"
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:143:                  </Button>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:144:                </TableCell>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:145:              </TableRow>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:147:          </TableBody>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:148:        </Table>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:149:      </ResponsiveTableRegion>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:151:      <TableFooter>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:157:          <Button
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:158:            type="button"
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:165:          </Button>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:171:          <Button
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:172:            type="button"
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:179:          </Button>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:181:      </TableFooter>
beauty-core-ui/src/components/tables/design-system-table-demo.tsx:182:    </DataTableFrame>
beauty-core-ui/src/components/tables/table-foundation.tsx:5:type DataTableFrameProps = {
beauty-core-ui/src/components/tables/table-foundation.tsx:6:  children: ReactNode;
beauty-core-ui/src/components/tables/table-foundation.tsx:10:export function DataTableFrame({
beauty-core-ui/src/components/tables/table-foundation.tsx:11:  children,
beauty-core-ui/src/components/tables/table-foundation.tsx:13:}: DataTableFrameProps) {
beauty-core-ui/src/components/tables/table-foundation.tsx:21:      {children}
beauty-core-ui/src/components/tables/table-foundation.tsx:26:type TableToolbarProps = {
beauty-core-ui/src/components/tables/table-foundation.tsx:27:  children: ReactNode;
beauty-core-ui/src/components/tables/table-foundation.tsx:31:export function TableToolbar({
beauty-core-ui/src/components/tables/table-foundation.tsx:32:  children,
beauty-core-ui/src/components/tables/table-foundation.tsx:34:}: TableToolbarProps) {
beauty-core-ui/src/components/tables/table-foundation.tsx:38:        "flex flex-col gap-3 border-b border-border-subtle p-card sm:flex-row sm:items-center sm:justify-between",
beauty-core-ui/src/components/tables/table-foundation.tsx:42:      {children}
beauty-core-ui/src/components/tables/table-foundation.tsx:47:type ResponsiveTableRegionProps = {
beauty-core-ui/src/components/tables/table-foundation.tsx:48:  children: ReactNode;
beauty-core-ui/src/components/tables/table-foundation.tsx:53:export function ResponsiveTableRegion({
beauty-core-ui/src/components/tables/table-foundation.tsx:54:  children,
beauty-core-ui/src/components/tables/table-foundation.tsx:57:}: ResponsiveTableRegionProps) {
beauty-core-ui/src/components/tables/table-foundation.tsx:68:      {children}
beauty-core-ui/src/components/tables/table-foundation.tsx:73:type TableFooterProps = {
beauty-core-ui/src/components/tables/table-foundation.tsx:74:  children: ReactNode;
beauty-core-ui/src/components/tables/table-foundation.tsx:78:export function TableFooter({
beauty-core-ui/src/components/tables/table-foundation.tsx:79:  children,
beauty-core-ui/src/components/tables/table-foundation.tsx:81:}: TableFooterProps) {
beauty-core-ui/src/components/tables/table-foundation.tsx:85:        "flex flex-col gap-3 border-t border-border-subtle px-card py-3 text-caption text-text-muted sm:flex-row sm:items-center sm:justify-between",
beauty-core-ui/src/components/tables/table-foundation.tsx:89:      {children}
beauty-core-ui/src/components/ui/alert-dialog.tsx:4:import { AlertDialog as AlertDialogPrimitive } from "radix-ui"
beauty-core-ui/src/components/ui/alert-dialog.tsx:7:import { Button } from "@/components/ui/button"
beauty-core-ui/src/components/ui/alert-dialog.tsx:9:function AlertDialog({
beauty-core-ui/src/components/ui/alert-dialog.tsx:10:  ...props
beauty-core-ui/src/components/ui/alert-dialog.tsx:11:}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
beauty-core-ui/src/components/ui/alert-dialog.tsx:12:  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
beauty-core-ui/src/components/ui/alert-dialog.tsx:15:function AlertDialogTrigger({
beauty-core-ui/src/components/ui/alert-dialog.tsx:16:  ...props
beauty-core-ui/src/components/ui/alert-dialog.tsx:17:}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
beauty-core-ui/src/components/ui/alert-dialog.tsx:19:    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
beauty-core-ui/src/components/ui/alert-dialog.tsx:23:function AlertDialogPortal({
beauty-core-ui/src/components/ui/alert-dialog.tsx:24:  ...props
beauty-core-ui/src/components/ui/alert-dialog.tsx:25:}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
beauty-core-ui/src/components/ui/alert-dialog.tsx:27:    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
beauty-core-ui/src/components/ui/alert-dialog.tsx:31:function AlertDialogOverlay({
beauty-core-ui/src/components/ui/alert-dialog.tsx:33:  ...props
beauty-core-ui/src/components/ui/alert-dialog.tsx:34:}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
beauty-core-ui/src/components/ui/alert-dialog.tsx:36:    <AlertDialogPrimitive.Overlay
beauty-core-ui/src/components/ui/alert-dialog.tsx:37:      data-slot="alert-dialog-overlay"
beauty-core-ui/src/components/ui/alert-dialog.tsx:42:      {...props}
beauty-core-ui/src/components/ui/alert-dialog.tsx:47:function AlertDialogContent({
beauty-core-ui/src/components/ui/alert-dialog.tsx:50:  ...props
beauty-core-ui/src/components/ui/alert-dialog.tsx:51:}: React.ComponentProps<typeof AlertDialogPrimitive.Content> & {
beauty-core-ui/src/components/ui/alert-dialog.tsx:55:    <AlertDialogPortal>
beauty-core-ui/src/components/ui/alert-dialog.tsx:56:      <AlertDialogOverlay />
beauty-core-ui/src/components/ui/alert-dialog.tsx:57:      <AlertDialogPrimitive.Content
beauty-core-ui/src/components/ui/alert-dialog.tsx:58:        data-slot="alert-dialog-content"
beauty-core-ui/src/components/ui/alert-dialog.tsx:61:          "group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
beauty-core-ui/src/components/ui/alert-dialog.tsx:64:        {...props}
beauty-core-ui/src/components/ui/alert-dialog.tsx:66:    </AlertDialogPortal>
beauty-core-ui/src/components/ui/alert-dialog.tsx:70:function AlertDialogHeader({
beauty-core-ui/src/components/ui/alert-dialog.tsx:72:  ...props
beauty-core-ui/src/components/ui/alert-dialog.tsx:73:}: React.ComponentProps<"div">) {
beauty-core-ui/src/components/ui/alert-dialog.tsx:76:      data-slot="alert-dialog-header"
beauty-core-ui/src/components/ui/alert-dialog.tsx:78:        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
beauty-core-ui/src/components/ui/alert-dialog.tsx:81:      {...props}
beauty-core-ui/src/components/ui/alert-dialog.tsx:86:function AlertDialogFooter({
beauty-core-ui/src/components/ui/alert-dialog.tsx:88:  ...props
beauty-core-ui/src/components/ui/alert-dialog.tsx:89:}: React.ComponentProps<"div">) {
beauty-core-ui/src/components/ui/alert-dialog.tsx:92:      data-slot="alert-dialog-footer"
beauty-core-ui/src/components/ui/alert-dialog.tsx:94:        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
beauty-core-ui/src/components/ui/alert-dialog.tsx:97:      {...props}
beauty-core-ui/src/components/ui/alert-dialog.tsx:102:function AlertDialogMedia({
beauty-core-ui/src/components/ui/alert-dialog.tsx:104:  ...props
beauty-core-ui/src/components/ui/alert-dialog.tsx:105:}: React.ComponentProps<"div">) {
beauty-core-ui/src/components/ui/alert-dialog.tsx:108:      data-slot="alert-dialog-media"
beauty-core-ui/src/components/ui/alert-dialog.tsx:110:        "mb-2 inline-flex size-10 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6",
beauty-core-ui/src/components/ui/alert-dialog.tsx:113:      {...props}
beauty-core-ui/src/components/ui/alert-dialog.tsx:118:function AlertDialogTitle({
beauty-core-ui/src/components/ui/alert-dialog.tsx:120:  ...props
beauty-core-ui/src/components/ui/alert-dialog.tsx:121:}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
beauty-core-ui/src/components/ui/alert-dialog.tsx:123:    <AlertDialogPrimitive.Title
beauty-core-ui/src/components/ui/alert-dialog.tsx:124:      data-slot="alert-dialog-title"
beauty-core-ui/src/components/ui/alert-dialog.tsx:126:        "font-heading text-base font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
beauty-core-ui/src/components/ui/alert-dialog.tsx:129:      {...props}
beauty-core-ui/src/components/ui/alert-dialog.tsx:134:function AlertDialogDescription({
beauty-core-ui/src/components/ui/alert-dialog.tsx:136:  ...props
beauty-core-ui/src/components/ui/alert-dialog.tsx:137:}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
beauty-core-ui/src/components/ui/alert-dialog.tsx:139:    <AlertDialogPrimitive.Description
beauty-core-ui/src/components/ui/alert-dialog.tsx:140:      data-slot="alert-dialog-description"
beauty-core-ui/src/components/ui/alert-dialog.tsx:145:      {...props}
beauty-core-ui/src/components/ui/alert-dialog.tsx:150:function AlertDialogAction({
beauty-core-ui/src/components/ui/alert-dialog.tsx:154:  ...props
beauty-core-ui/src/components/ui/alert-dialog.tsx:155:}: React.ComponentProps<typeof AlertDialogPrimitive.Action> &
beauty-core-ui/src/components/ui/alert-dialog.tsx:156:  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
beauty-core-ui/src/components/ui/alert-dialog.tsx:158:    <Button variant={variant} size={size} asChild>
beauty-core-ui/src/components/ui/alert-dialog.tsx:159:      <AlertDialogPrimitive.Action
beauty-core-ui/src/components/ui/alert-dialog.tsx:160:        data-slot="alert-dialog-action"
beauty-core-ui/src/components/ui/alert-dialog.tsx:162:        {...props}
beauty-core-ui/src/components/ui/alert-dialog.tsx:164:    </Button>
beauty-core-ui/src/components/ui/alert-dialog.tsx:168:function AlertDialogCancel({
beauty-core-ui/src/components/ui/alert-dialog.tsx:172:  ...props
beauty-core-ui/src/components/ui/alert-dialog.tsx:173:}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel> &
beauty-core-ui/src/components/ui/alert-dialog.tsx:174:  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
beauty-core-ui/src/components/ui/alert-dialog.tsx:176:    <Button variant={variant} size={size} asChild>
beauty-core-ui/src/components/ui/alert-dialog.tsx:177:      <AlertDialogPrimitive.Cancel
beauty-core-ui/src/components/ui/alert-dialog.tsx:178:        data-slot="alert-dialog-cancel"
beauty-core-ui/src/components/ui/alert-dialog.tsx:180:        {...props}
beauty-core-ui/src/components/ui/alert-dialog.tsx:182:    </Button>
beauty-core-ui/src/components/ui/alert-dialog.tsx:187:  AlertDialog,
beauty-core-ui/src/components/ui/alert-dialog.tsx:188:  AlertDialogAction,
beauty-core-ui/src/components/ui/alert-dialog.tsx:189:  AlertDialogCancel,
beauty-core-ui/src/components/ui/alert-dialog.tsx:190:  AlertDialogContent,
beauty-core-ui/src/components/ui/alert-dialog.tsx:191:  AlertDialogDescription,
beauty-core-ui/src/components/ui/alert-dialog.tsx:192:  AlertDialogFooter,
beauty-core-ui/src/components/ui/alert-dialog.tsx:193:  AlertDialogHeader,
beauty-core-ui/src/components/ui/alert-dialog.tsx:194:  AlertDialogMedia,
beauty-core-ui/src/components/ui/alert-dialog.tsx:195:  AlertDialogOverlay,
beauty-core-ui/src/components/ui/alert-dialog.tsx:196:  AlertDialogPortal,
beauty-core-ui/src/components/ui/alert-dialog.tsx:197:  AlertDialogTitle,
beauty-core-ui/src/components/ui/alert-dialog.tsx:198:  AlertDialogTrigger,
beauty-core-ui/src/components/ui/badge.tsx:2:import { cva, type VariantProps } from "class-variance-authority"
beauty-core-ui/src/components/ui/badge.tsx:7:const badgeVariants = cva(
beauty-core-ui/src/components/ui/badge.tsx:8:  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
beauty-core-ui/src/components/ui/badge.tsx:30:function Badge({
beauty-core-ui/src/components/ui/badge.tsx:34:  ...props
beauty-core-ui/src/components/ui/badge.tsx:35:}: React.ComponentProps<"span"> &
beauty-core-ui/src/components/ui/badge.tsx:36:  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
beauty-core-ui/src/components/ui/badge.tsx:41:      data-slot="badge"
beauty-core-ui/src/components/ui/badge.tsx:43:      className={cn(badgeVariants({ variant }), className)}
beauty-core-ui/src/components/ui/badge.tsx:44:      {...props}
beauty-core-ui/src/components/ui/badge.tsx:49:export { Badge, badgeVariants }
beauty-core-ui/src/components/ui/button.tsx:2:import { cva, type VariantProps } from "class-variance-authority"
beauty-core-ui/src/components/ui/button.tsx:7:const buttonVariants = cva(
beauty-core-ui/src/components/ui/button.tsx:8:  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
beauty-core-ui/src/components/ui/button.tsx:14:          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
beauty-core-ui/src/components/ui/button.tsx:26:        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
beauty-core-ui/src/components/ui/button.tsx:27:        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
beauty-core-ui/src/components/ui/button.tsx:31:          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
beauty-core-ui/src/components/ui/button.tsx:33:          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
beauty-core-ui/src/components/ui/button.tsx:44:function Button({
beauty-core-ui/src/components/ui/button.tsx:49:  ...props
beauty-core-ui/src/components/ui/button.tsx:50:}: React.ComponentProps<"button"> &
beauty-core-ui/src/components/ui/button.tsx:51:  VariantProps<typeof buttonVariants> & {
beauty-core-ui/src/components/ui/button.tsx:54:  const Comp = asChild ? Slot.Root : "button"
beauty-core-ui/src/components/ui/button.tsx:58:      data-slot="button"
beauty-core-ui/src/components/ui/button.tsx:61:      className={cn(buttonVariants({ variant, size, className }))}
beauty-core-ui/src/components/ui/button.tsx:62:      {...props}
beauty-core-ui/src/components/ui/button.tsx:67:export { Button, buttonVariants }
beauty-core-ui/src/components/ui/card.tsx:5:function Card({
beauty-core-ui/src/components/ui/card.tsx:8:  ...props
beauty-core-ui/src/components/ui/card.tsx:9:}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
beauty-core-ui/src/components/ui/card.tsx:12:      data-slot="card"
beauty-core-ui/src/components/ui/card.tsx:15:        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
beauty-core-ui/src/components/ui/card.tsx:18:      {...props}
beauty-core-ui/src/components/ui/card.tsx:23:function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
beauty-core-ui/src/components/ui/card.tsx:26:      data-slot="card-header"
beauty-core-ui/src/components/ui/card.tsx:28:        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
beauty-core-ui/src/components/ui/card.tsx:31:      {...props}
beauty-core-ui/src/components/ui/card.tsx:36:function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
beauty-core-ui/src/components/ui/card.tsx:39:      data-slot="card-title"
beauty-core-ui/src/components/ui/card.tsx:41:        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
beauty-core-ui/src/components/ui/card.tsx:44:      {...props}
beauty-core-ui/src/components/ui/card.tsx:49:function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
beauty-core-ui/src/components/ui/card.tsx:52:      data-slot="card-description"
beauty-core-ui/src/components/ui/card.tsx:54:      {...props}
beauty-core-ui/src/components/ui/card.tsx:59:function CardAction({ className, ...props }: React.ComponentProps<"div">) {
beauty-core-ui/src/components/ui/card.tsx:62:      data-slot="card-action"
beauty-core-ui/src/components/ui/card.tsx:67:      {...props}
beauty-core-ui/src/components/ui/card.tsx:72:function CardContent({ className, ...props }: React.ComponentProps<"div">) {
beauty-core-ui/src/components/ui/card.tsx:75:      data-slot="card-content"
beauty-core-ui/src/components/ui/card.tsx:76:      className={cn("px-(--card-spacing)", className)}
beauty-core-ui/src/components/ui/card.tsx:77:      {...props}
beauty-core-ui/src/components/ui/card.tsx:82:function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
beauty-core-ui/src/components/ui/card.tsx:85:      data-slot="card-footer"
beauty-core-ui/src/components/ui/card.tsx:87:        "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
beauty-core-ui/src/components/ui/card.tsx:90:      {...props}
beauty-core-ui/src/components/ui/card.tsx:96:  Card,
beauty-core-ui/src/components/ui/card.tsx:97:  CardHeader,
beauty-core-ui/src/components/ui/card.tsx:98:  CardFooter,
beauty-core-ui/src/components/ui/card.tsx:99:  CardTitle,
beauty-core-ui/src/components/ui/card.tsx:100:  CardAction,
beauty-core-ui/src/components/ui/card.tsx:101:  CardDescription,
beauty-core-ui/src/components/ui/card.tsx:102:  CardContent,
beauty-core-ui/src/components/ui/checkbox.tsx:11:  ...props
beauty-core-ui/src/components/ui/checkbox.tsx:12:}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
beauty-core-ui/src/components/ui/checkbox.tsx:17:        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground group-has-[:focus-visible]/field-label:data-checked:border-primary dark:data-checked:bg-primary",
beauty-core-ui/src/components/ui/checkbox.tsx:20:      {...props}
beauty-core-ui/src/components/ui/dialog.tsx:4:import { Dialog as DialogPrimitive } from "radix-ui"
beauty-core-ui/src/components/ui/dialog.tsx:7:import { Button } from "@/components/ui/button"
beauty-core-ui/src/components/ui/dialog.tsx:10:function Dialog({
beauty-core-ui/src/components/ui/dialog.tsx:11:  ...props
beauty-core-ui/src/components/ui/dialog.tsx:12:}: React.ComponentProps<typeof DialogPrimitive.Root>) {
beauty-core-ui/src/components/ui/dialog.tsx:13:  return <DialogPrimitive.Root data-slot="dialog" {...props} />
beauty-core-ui/src/components/ui/dialog.tsx:16:function DialogTrigger({
beauty-core-ui/src/components/ui/dialog.tsx:17:  ...props
beauty-core-ui/src/components/ui/dialog.tsx:18:}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
beauty-core-ui/src/components/ui/dialog.tsx:19:  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
beauty-core-ui/src/components/ui/dialog.tsx:22:function DialogPortal({
beauty-core-ui/src/components/ui/dialog.tsx:23:  ...props
beauty-core-ui/src/components/ui/dialog.tsx:24:}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
beauty-core-ui/src/components/ui/dialog.tsx:25:  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
beauty-core-ui/src/components/ui/dialog.tsx:28:function DialogClose({
beauty-core-ui/src/components/ui/dialog.tsx:29:  ...props
beauty-core-ui/src/components/ui/dialog.tsx:30:}: React.ComponentProps<typeof DialogPrimitive.Close>) {
beauty-core-ui/src/components/ui/dialog.tsx:31:  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
beauty-core-ui/src/components/ui/dialog.tsx:34:function DialogOverlay({
beauty-core-ui/src/components/ui/dialog.tsx:36:  ...props
beauty-core-ui/src/components/ui/dialog.tsx:37:}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
beauty-core-ui/src/components/ui/dialog.tsx:39:    <DialogPrimitive.Overlay
beauty-core-ui/src/components/ui/dialog.tsx:40:      data-slot="dialog-overlay"
beauty-core-ui/src/components/ui/dialog.tsx:45:      {...props}
beauty-core-ui/src/components/ui/dialog.tsx:50:function DialogContent({
beauty-core-ui/src/components/ui/dialog.tsx:52:  children,
beauty-core-ui/src/components/ui/dialog.tsx:53:  showCloseButton = true,
beauty-core-ui/src/components/ui/dialog.tsx:54:  ...props
beauty-core-ui/src/components/ui/dialog.tsx:55:}: React.ComponentProps<typeof DialogPrimitive.Content> & {
beauty-core-ui/src/components/ui/dialog.tsx:56:  showCloseButton?: boolean
beauty-core-ui/src/components/ui/dialog.tsx:59:    <DialogPortal>
beauty-core-ui/src/components/ui/dialog.tsx:60:      <DialogOverlay />
beauty-core-ui/src/components/ui/dialog.tsx:61:      <DialogPrimitive.Content
beauty-core-ui/src/components/ui/dialog.tsx:62:        data-slot="dialog-content"
beauty-core-ui/src/components/ui/dialog.tsx:67:        {...props}
beauty-core-ui/src/components/ui/dialog.tsx:69:        {children}
beauty-core-ui/src/components/ui/dialog.tsx:70:        {showCloseButton && (
beauty-core-ui/src/components/ui/dialog.tsx:71:          <DialogPrimitive.Close data-slot="dialog-close" asChild>
beauty-core-ui/src/components/ui/dialog.tsx:72:            <Button
beauty-core-ui/src/components/ui/dialog.tsx:80:            </Button>
beauty-core-ui/src/components/ui/dialog.tsx:81:          </DialogPrimitive.Close>
beauty-core-ui/src/components/ui/dialog.tsx:83:      </DialogPrimitive.Content>
beauty-core-ui/src/components/ui/dialog.tsx:84:    </DialogPortal>
beauty-core-ui/src/components/ui/dialog.tsx:88:function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
beauty-core-ui/src/components/ui/dialog.tsx:91:      data-slot="dialog-header"
beauty-core-ui/src/components/ui/dialog.tsx:93:      {...props}
beauty-core-ui/src/components/ui/dialog.tsx:98:function DialogFooter({
beauty-core-ui/src/components/ui/dialog.tsx:100:  showCloseButton = false,
beauty-core-ui/src/components/ui/dialog.tsx:101:  children,
beauty-core-ui/src/components/ui/dialog.tsx:102:  ...props
beauty-core-ui/src/components/ui/dialog.tsx:103:}: React.ComponentProps<"div"> & {
beauty-core-ui/src/components/ui/dialog.tsx:104:  showCloseButton?: boolean
beauty-core-ui/src/components/ui/dialog.tsx:108:      data-slot="dialog-footer"
beauty-core-ui/src/components/ui/dialog.tsx:113:      {...props}
beauty-core-ui/src/components/ui/dialog.tsx:115:      {children}
beauty-core-ui/src/components/ui/dialog.tsx:116:      {showCloseButton && (
beauty-core-ui/src/components/ui/dialog.tsx:117:        <DialogPrimitive.Close asChild>
beauty-core-ui/src/components/ui/dialog.tsx:118:          <Button variant="outline">Close</Button>
beauty-core-ui/src/components/ui/dialog.tsx:119:        </DialogPrimitive.Close>
beauty-core-ui/src/components/ui/dialog.tsx:125:function DialogTitle({
beauty-core-ui/src/components/ui/dialog.tsx:127:  ...props
beauty-core-ui/src/components/ui/dialog.tsx:128:}: React.ComponentProps<typeof DialogPrimitive.Title>) {
beauty-core-ui/src/components/ui/dialog.tsx:130:    <DialogPrimitive.Title
beauty-core-ui/src/components/ui/dialog.tsx:131:      data-slot="dialog-title"
beauty-core-ui/src/components/ui/dialog.tsx:136:      {...props}
beauty-core-ui/src/components/ui/dialog.tsx:141:function DialogDescription({
beauty-core-ui/src/components/ui/dialog.tsx:143:  ...props
beauty-core-ui/src/components/ui/dialog.tsx:144:}: React.ComponentProps<typeof DialogPrimitive.Description>) {
beauty-core-ui/src/components/ui/dialog.tsx:146:    <DialogPrimitive.Description
beauty-core-ui/src/components/ui/dialog.tsx:147:      data-slot="dialog-description"
beauty-core-ui/src/components/ui/dialog.tsx:152:      {...props}
beauty-core-ui/src/components/ui/dialog.tsx:158:  Dialog,
beauty-core-ui/src/components/ui/dialog.tsx:159:  DialogClose,
beauty-core-ui/src/components/ui/dialog.tsx:160:  DialogContent,
beauty-core-ui/src/components/ui/dialog.tsx:161:  DialogDescription,
beauty-core-ui/src/components/ui/dialog.tsx:162:  DialogFooter,
beauty-core-ui/src/components/ui/dialog.tsx:163:  DialogHeader,
beauty-core-ui/src/components/ui/dialog.tsx:164:  DialogOverlay,
beauty-core-ui/src/components/ui/dialog.tsx:165:  DialogPortal,
beauty-core-ui/src/components/ui/dialog.tsx:166:  DialogTitle,
beauty-core-ui/src/components/ui/dialog.tsx:167:  DialogTrigger,
beauty-core-ui/src/components/ui/dropdown-menu.tsx:10:  ...props
beauty-core-ui/src/components/ui/dropdown-menu.tsx:11:}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
beauty-core-ui/src/components/ui/dropdown-menu.tsx:12:  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
beauty-core-ui/src/components/ui/dropdown-menu.tsx:16:  ...props
beauty-core-ui/src/components/ui/dropdown-menu.tsx:17:}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
beauty-core-ui/src/components/ui/dropdown-menu.tsx:19:    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
beauty-core-ui/src/components/ui/dropdown-menu.tsx:24:  ...props
beauty-core-ui/src/components/ui/dropdown-menu.tsx:25:}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
beauty-core-ui/src/components/ui/dropdown-menu.tsx:29:      {...props}
beauty-core-ui/src/components/ui/dropdown-menu.tsx:38:  ...props
beauty-core-ui/src/components/ui/dropdown-menu.tsx:39:}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
beauty-core-ui/src/components/ui/dropdown-menu.tsx:46:        className={cn("z-50 max-h-(--radix-dropdown-menu-content-available-height) w-(--radix-dropdown-menu-trigger-width) min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:overflow-hidden data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
beauty-core-ui/src/components/ui/dropdown-menu.tsx:47:        {...props}
beauty-core-ui/src/components/ui/dropdown-menu.tsx:54:  ...props
beauty-core-ui/src/components/ui/dropdown-menu.tsx:55:}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
beauty-core-ui/src/components/ui/dropdown-menu.tsx:57:    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
beauty-core-ui/src/components/ui/dropdown-menu.tsx:65:  ...props
beauty-core-ui/src/components/ui/dropdown-menu.tsx:66:}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
beauty-core-ui/src/components/ui/dropdown-menu.tsx:76:        "group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
beauty-core-ui/src/components/ui/dropdown-menu.tsx:79:      {...props}
beauty-core-ui/src/components/ui/dropdown-menu.tsx:86:  children,
beauty-core-ui/src/components/ui/dropdown-menu.tsx:89:  ...props
beauty-core-ui/src/components/ui/dropdown-menu.tsx:90:}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> & {
beauty-core-ui/src/components/ui/dropdown-menu.tsx:98:        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
beauty-core-ui/src/components/ui/dropdown-menu.tsx:102:      {...props}
beauty-core-ui/src/components/ui/dropdown-menu.tsx:113:      {children}
beauty-core-ui/src/components/ui/dropdown-menu.tsx:119:  ...props
beauty-core-ui/src/components/ui/dropdown-menu.tsx:120:}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
beauty-core-ui/src/components/ui/dropdown-menu.tsx:124:      {...props}
beauty-core-ui/src/components/ui/dropdown-menu.tsx:131:  children,
beauty-core-ui/src/components/ui/dropdown-menu.tsx:133:  ...props
beauty-core-ui/src/components/ui/dropdown-menu.tsx:134:}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> & {
beauty-core-ui/src/components/ui/dropdown-menu.tsx:142:        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
beauty-core-ui/src/components/ui/dropdown-menu.tsx:145:      {...props}
beauty-core-ui/src/components/ui/dropdown-menu.tsx:156:      {children}
beauty-core-ui/src/components/ui/dropdown-menu.tsx:164:  ...props
beauty-core-ui/src/components/ui/dropdown-menu.tsx:165:}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
beauty-core-ui/src/components/ui/dropdown-menu.tsx:176:      {...props}
beauty-core-ui/src/components/ui/dropdown-menu.tsx:183:  ...props
beauty-core-ui/src/components/ui/dropdown-menu.tsx:184:}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
beauty-core-ui/src/components/ui/dropdown-menu.tsx:189:      {...props}
beauty-core-ui/src/components/ui/dropdown-menu.tsx:196:  ...props
beauty-core-ui/src/components/ui/dropdown-menu.tsx:197:}: React.ComponentProps<"span">) {
beauty-core-ui/src/components/ui/dropdown-menu.tsx:205:      {...props}
beauty-core-ui/src/components/ui/dropdown-menu.tsx:211:  ...props
beauty-core-ui/src/components/ui/dropdown-menu.tsx:212:}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
beauty-core-ui/src/components/ui/dropdown-menu.tsx:213:  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
beauty-core-ui/src/components/ui/dropdown-menu.tsx:219:  children,
beauty-core-ui/src/components/ui/dropdown-menu.tsx:220:  ...props
beauty-core-ui/src/components/ui/dropdown-menu.tsx:221:}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
beauty-core-ui/src/components/ui/dropdown-menu.tsx:229:        "flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
beauty-core-ui/src/components/ui/dropdown-menu.tsx:232:      {...props}
beauty-core-ui/src/components/ui/dropdown-menu.tsx:234:      {children}
beauty-core-ui/src/components/ui/dropdown-menu.tsx:242:  ...props
beauty-core-ui/src/components/ui/dropdown-menu.tsx:243:}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
beauty-core-ui/src/components/ui/dropdown-menu.tsx:247:      className={cn("z-50 min-w-[96px] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-lg bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
beauty-core-ui/src/components/ui/dropdown-menu.tsx:248:      {...props}
beauty-core-ui/src/components/ui/input.tsx:5:function Input({ className, type, ...props }: React.ComponentProps<"input">) {
beauty-core-ui/src/components/ui/input.tsx:7:    <input
beauty-core-ui/src/components/ui/input.tsx:9:      data-slot="input"
beauty-core-ui/src/components/ui/input.tsx:11:        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
beauty-core-ui/src/components/ui/input.tsx:14:      {...props}
beauty-core-ui/src/components/ui/input.tsx:19:export { Input }
beauty-core-ui/src/components/ui/label.tsx:10:  ...props
beauty-core-ui/src/components/ui/label.tsx:11:}: React.ComponentProps<typeof LabelPrimitive.Root>) {
beauty-core-ui/src/components/ui/label.tsx:16:        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
beauty-core-ui/src/components/ui/label.tsx:19:      {...props}
beauty-core-ui/src/components/ui/radio-group.tsx:10:  ...props
beauty-core-ui/src/components/ui/radio-group.tsx:11:}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
beauty-core-ui/src/components/ui/radio-group.tsx:16:      {...props}
beauty-core-ui/src/components/ui/radio-group.tsx:23:  ...props
beauty-core-ui/src/components/ui/radio-group.tsx:24:}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
beauty-core-ui/src/components/ui/radio-group.tsx:29:        "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground group-has-[:focus-visible]/field-label:data-checked:border-primary dark:data-checked:bg-primary",
beauty-core-ui/src/components/ui/radio-group.tsx:32:      {...props}
beauty-core-ui/src/components/ui/select.tsx:4:import { Select as SelectPrimitive } from "radix-ui"
beauty-core-ui/src/components/ui/select.tsx:9:function Select({
beauty-core-ui/src/components/ui/select.tsx:10:  ...props
beauty-core-ui/src/components/ui/select.tsx:11:}: React.ComponentProps<typeof SelectPrimitive.Root>) {
beauty-core-ui/src/components/ui/select.tsx:12:  return <SelectPrimitive.Root data-slot="select" {...props} />
beauty-core-ui/src/components/ui/select.tsx:15:function SelectGroup({
beauty-core-ui/src/components/ui/select.tsx:17:  ...props
beauty-core-ui/src/components/ui/select.tsx:18:}: React.ComponentProps<typeof SelectPrimitive.Group>) {
beauty-core-ui/src/components/ui/select.tsx:20:    <SelectPrimitive.Group
beauty-core-ui/src/components/ui/select.tsx:21:      data-slot="select-group"
beauty-core-ui/src/components/ui/select.tsx:23:      {...props}
beauty-core-ui/src/components/ui/select.tsx:28:function SelectValue({
beauty-core-ui/src/components/ui/select.tsx:29:  ...props
beauty-core-ui/src/components/ui/select.tsx:30:}: React.ComponentProps<typeof SelectPrimitive.Value>) {
beauty-core-ui/src/components/ui/select.tsx:31:  return <SelectPrimitive.Value data-slot="select-value" {...props} />
beauty-core-ui/src/components/ui/select.tsx:34:function SelectTrigger({
beauty-core-ui/src/components/ui/select.tsx:37:  children,
beauty-core-ui/src/components/ui/select.tsx:38:  ...props
beauty-core-ui/src/components/ui/select.tsx:39:}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
beauty-core-ui/src/components/ui/select.tsx:43:    <SelectPrimitive.Trigger
beauty-core-ui/src/components/ui/select.tsx:44:      data-slot="select-trigger"
beauty-core-ui/src/components/ui/select.tsx:47:        "flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
beauty-core-ui/src/components/ui/select.tsx:50:      {...props}
beauty-core-ui/src/components/ui/select.tsx:52:      {children}
beauty-core-ui/src/components/ui/select.tsx:53:      <SelectPrimitive.Icon asChild>
beauty-core-ui/src/components/ui/select.tsx:55:      </SelectPrimitive.Icon>
beauty-core-ui/src/components/ui/select.tsx:56:    </SelectPrimitive.Trigger>
beauty-core-ui/src/components/ui/select.tsx:60:function SelectContent({
beauty-core-ui/src/components/ui/select.tsx:62:  children,
beauty-core-ui/src/components/ui/select.tsx:65:  ...props
beauty-core-ui/src/components/ui/select.tsx:66:}: React.ComponentProps<typeof SelectPrimitive.Content>) {
beauty-core-ui/src/components/ui/select.tsx:68:    <SelectPrimitive.Portal>
beauty-core-ui/src/components/ui/select.tsx:69:      <SelectPrimitive.Content
beauty-core-ui/src/components/ui/select.tsx:70:        data-slot="select-content"
beauty-core-ui/src/components/ui/select.tsx:72:        className={cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-36 origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", position ==="popper"&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className )}
beauty-core-ui/src/components/ui/select.tsx:75:        {...props}
beauty-core-ui/src/components/ui/select.tsx:77:        <SelectScrollUpButton />
beauty-core-ui/src/components/ui/select.tsx:78:        <SelectPrimitive.Viewport
beauty-core-ui/src/components/ui/select.tsx:81:            "data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width)",
beauty-core-ui/src/components/ui/select.tsx:85:          {children}
beauty-core-ui/src/components/ui/select.tsx:86:        </SelectPrimitive.Viewport>
beauty-core-ui/src/components/ui/select.tsx:87:        <SelectScrollDownButton />
beauty-core-ui/src/components/ui/select.tsx:88:      </SelectPrimitive.Content>
beauty-core-ui/src/components/ui/select.tsx:89:    </SelectPrimitive.Portal>
beauty-core-ui/src/components/ui/select.tsx:93:function SelectLabel({
beauty-core-ui/src/components/ui/select.tsx:95:  ...props
beauty-core-ui/src/components/ui/select.tsx:96:}: React.ComponentProps<typeof SelectPrimitive.Label>) {
beauty-core-ui/src/components/ui/select.tsx:98:    <SelectPrimitive.Label
beauty-core-ui/src/components/ui/select.tsx:99:      data-slot="select-label"
beauty-core-ui/src/components/ui/select.tsx:101:      {...props}
beauty-core-ui/src/components/ui/select.tsx:106:function SelectItem({
beauty-core-ui/src/components/ui/select.tsx:108:  children,
beauty-core-ui/src/components/ui/select.tsx:109:  ...props
beauty-core-ui/src/components/ui/select.tsx:110:}: React.ComponentProps<typeof SelectPrimitive.Item>) {
beauty-core-ui/src/components/ui/select.tsx:112:    <SelectPrimitive.Item
beauty-core-ui/src/components/ui/select.tsx:113:      data-slot="select-item"
beauty-core-ui/src/components/ui/select.tsx:115:        "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
beauty-core-ui/src/components/ui/select.tsx:118:      {...props}
beauty-core-ui/src/components/ui/select.tsx:121:        <SelectPrimitive.ItemIndicator>
beauty-core-ui/src/components/ui/select.tsx:123:        </SelectPrimitive.ItemIndicator>
beauty-core-ui/src/components/ui/select.tsx:125:      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
beauty-core-ui/src/components/ui/select.tsx:126:    </SelectPrimitive.Item>
beauty-core-ui/src/components/ui/select.tsx:130:function SelectSeparator({
beauty-core-ui/src/components/ui/select.tsx:132:  ...props
beauty-core-ui/src/components/ui/select.tsx:133:}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
beauty-core-ui/src/components/ui/select.tsx:135:    <SelectPrimitive.Separator
beauty-core-ui/src/components/ui/select.tsx:136:      data-slot="select-separator"
beauty-core-ui/src/components/ui/select.tsx:138:      {...props}
beauty-core-ui/src/components/ui/select.tsx:143:function SelectScrollUpButton({
beauty-core-ui/src/components/ui/select.tsx:145:  ...props
beauty-core-ui/src/components/ui/select.tsx:146:}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
beauty-core-ui/src/components/ui/select.tsx:148:    <SelectPrimitive.ScrollUpButton
beauty-core-ui/src/components/ui/select.tsx:149:      data-slot="select-scroll-up-button"
beauty-core-ui/src/components/ui/select.tsx:154:      {...props}
beauty-core-ui/src/components/ui/select.tsx:158:    </SelectPrimitive.ScrollUpButton>
beauty-core-ui/src/components/ui/select.tsx:162:function SelectScrollDownButton({
beauty-core-ui/src/components/ui/select.tsx:164:  ...props
beauty-core-ui/src/components/ui/select.tsx:165:}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
beauty-core-ui/src/components/ui/select.tsx:167:    <SelectPrimitive.ScrollDownButton
beauty-core-ui/src/components/ui/select.tsx:168:      data-slot="select-scroll-down-button"
beauty-core-ui/src/components/ui/select.tsx:173:      {...props}
beauty-core-ui/src/components/ui/select.tsx:177:    </SelectPrimitive.ScrollDownButton>
beauty-core-ui/src/components/ui/select.tsx:182:  Select,
beauty-core-ui/src/components/ui/select.tsx:183:  SelectContent,
beauty-core-ui/src/components/ui/select.tsx:184:  SelectGroup,
beauty-core-ui/src/components/ui/select.tsx:185:  SelectItem,
beauty-core-ui/src/components/ui/select.tsx:186:  SelectLabel,
beauty-core-ui/src/components/ui/select.tsx:187:  SelectScrollDownButton,
beauty-core-ui/src/components/ui/select.tsx:188:  SelectScrollUpButton,
beauty-core-ui/src/components/ui/select.tsx:189:  SelectSeparator,
beauty-core-ui/src/components/ui/select.tsx:190:  SelectTrigger,
beauty-core-ui/src/components/ui/select.tsx:191:  SelectValue,
beauty-core-ui/src/components/ui/separator.tsx:12:  ...props
beauty-core-ui/src/components/ui/separator.tsx:13:}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
beauty-core-ui/src/components/ui/separator.tsx:23:      {...props}
beauty-core-ui/src/components/ui/sheet.tsx:4:import { Dialog as SheetPrimitive } from "radix-ui"
beauty-core-ui/src/components/ui/sheet.tsx:7:import { Button } from "@/components/ui/button"
beauty-core-ui/src/components/ui/sheet.tsx:10:function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
beauty-core-ui/src/components/ui/sheet.tsx:11:  return <SheetPrimitive.Root data-slot="sheet" {...props} />
beauty-core-ui/src/components/ui/sheet.tsx:15:  ...props
beauty-core-ui/src/components/ui/sheet.tsx:16:}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
beauty-core-ui/src/components/ui/sheet.tsx:17:  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
beauty-core-ui/src/components/ui/sheet.tsx:21:  ...props
beauty-core-ui/src/components/ui/sheet.tsx:22:}: React.ComponentProps<typeof SheetPrimitive.Close>) {
beauty-core-ui/src/components/ui/sheet.tsx:23:  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
beauty-core-ui/src/components/ui/sheet.tsx:27:  ...props
beauty-core-ui/src/components/ui/sheet.tsx:28:}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
beauty-core-ui/src/components/ui/sheet.tsx:29:  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
beauty-core-ui/src/components/ui/sheet.tsx:34:  ...props
beauty-core-ui/src/components/ui/sheet.tsx:35:}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
beauty-core-ui/src/components/ui/sheet.tsx:43:      {...props}
beauty-core-ui/src/components/ui/sheet.tsx:50:  children,
beauty-core-ui/src/components/ui/sheet.tsx:52:  showCloseButton = true,
beauty-core-ui/src/components/ui/sheet.tsx:53:  ...props
beauty-core-ui/src/components/ui/sheet.tsx:54:}: React.ComponentProps<typeof SheetPrimitive.Content> & {
beauty-core-ui/src/components/ui/sheet.tsx:56:  showCloseButton?: boolean
beauty-core-ui/src/components/ui/sheet.tsx:65:          "fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-modal transition duration-[var(--motion-duration-normal)] ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10",
beauty-core-ui/src/components/ui/sheet.tsx:68:        {...props}
beauty-core-ui/src/components/ui/sheet.tsx:70:        {children}
beauty-core-ui/src/components/ui/sheet.tsx:71:        {showCloseButton && (
beauty-core-ui/src/components/ui/sheet.tsx:73:            <Button
beauty-core-ui/src/components/ui/sheet.tsx:81:            </Button>
beauty-core-ui/src/components/ui/sheet.tsx:89:function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
beauty-core-ui/src/components/ui/sheet.tsx:94:      {...props}
beauty-core-ui/src/components/ui/sheet.tsx:99:function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
beauty-core-ui/src/components/ui/sheet.tsx:104:      {...props}
beauty-core-ui/src/components/ui/sheet.tsx:111:  ...props
beauty-core-ui/src/components/ui/sheet.tsx:112:}: React.ComponentProps<typeof SheetPrimitive.Title>) {
beauty-core-ui/src/components/ui/sheet.tsx:120:      {...props}
beauty-core-ui/src/components/ui/sheet.tsx:127:  ...props
beauty-core-ui/src/components/ui/sheet.tsx:128:}: React.ComponentProps<typeof SheetPrimitive.Description>) {
beauty-core-ui/src/components/ui/sheet.tsx:133:      {...props}
beauty-core-ui/src/components/ui/skeleton.tsx:3:function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
beauty-core-ui/src/components/ui/skeleton.tsx:8:      {...props}
beauty-core-ui/src/components/ui/status-badge.test.tsx:4:import { StatusBadge } from "@/components/ui/status-badge";
beauty-core-ui/src/components/ui/status-badge.test.tsx:6:describe("StatusBadge", () => {
beauty-core-ui/src/components/ui/status-badge.test.tsx:9:      <StatusBadge>
beauty-core-ui/src/components/ui/status-badge.test.tsx:11:      </StatusBadge>,
beauty-core-ui/src/components/ui/status-badge.test.tsx:24:      <StatusBadge tone="success">
beauty-core-ui/src/components/ui/status-badge.test.tsx:26:      </StatusBadge>,
beauty-core-ui/src/components/ui/status-badge.test.tsx:39:      <StatusBadge tone="danger">
beauty-core-ui/src/components/ui/status-badge.test.tsx:41:      </StatusBadge>,
beauty-core-ui/src/components/ui/status-badge.tsx:3:import { Badge } from "@/components/ui/badge";
beauty-core-ui/src/components/ui/status-badge.tsx:13:type StatusBadgeProps = {
beauty-core-ui/src/components/ui/status-badge.tsx:14:  children: ReactNode;
beauty-core-ui/src/components/ui/status-badge.tsx:32:export function StatusBadge({
beauty-core-ui/src/components/ui/status-badge.tsx:33:  children,
beauty-core-ui/src/components/ui/status-badge.tsx:36:}: StatusBadgeProps) {
beauty-core-ui/src/components/ui/status-badge.tsx:38:    <Badge
beauty-core-ui/src/components/ui/status-badge.tsx:46:      {children}
beauty-core-ui/src/components/ui/status-badge.tsx:47:    </Badge>
beauty-core-ui/src/components/ui/switch.tsx:11:  ...props
beauty-core-ui/src/components/ui/switch.tsx:12:}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
beauty-core-ui/src/components/ui/switch.tsx:20:        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none group-has-[:focus-visible]/field-label:border-transparent group-has-[:focus-visible]/field-label:ring-0 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50",
beauty-core-ui/src/components/ui/switch.tsx:23:      {...props}
beauty-core-ui/src/components/ui/switch.tsx:27:        className="pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground"
beauty-core-ui/src/components/ui/table.tsx:7:function Table({ className, ...props }: React.ComponentProps<"table">) {
beauty-core-ui/src/components/ui/table.tsx:10:      data-slot="table-container"
beauty-core-ui/src/components/ui/table.tsx:13:      <table
beauty-core-ui/src/components/ui/table.tsx:14:        data-slot="table"
beauty-core-ui/src/components/ui/table.tsx:16:        {...props}
beauty-core-ui/src/components/ui/table.tsx:22:function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
beauty-core-ui/src/components/ui/table.tsx:25:      data-slot="table-header"
beauty-core-ui/src/components/ui/table.tsx:27:      {...props}
beauty-core-ui/src/components/ui/table.tsx:32:function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
beauty-core-ui/src/components/ui/table.tsx:35:      data-slot="table-body"
beauty-core-ui/src/components/ui/table.tsx:37:      {...props}
beauty-core-ui/src/components/ui/table.tsx:42:function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
beauty-core-ui/src/components/ui/table.tsx:45:      data-slot="table-footer"
beauty-core-ui/src/components/ui/table.tsx:50:      {...props}
beauty-core-ui/src/components/ui/table.tsx:55:function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
beauty-core-ui/src/components/ui/table.tsx:58:      data-slot="table-row"
beauty-core-ui/src/components/ui/table.tsx:60:        "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
beauty-core-ui/src/components/ui/table.tsx:63:      {...props}
beauty-core-ui/src/components/ui/table.tsx:68:function TableHead({ className, ...props }: React.ComponentProps<"th">) {
beauty-core-ui/src/components/ui/table.tsx:71:      data-slot="table-head"
beauty-core-ui/src/components/ui/table.tsx:76:      {...props}
beauty-core-ui/src/components/ui/table.tsx:81:function TableCell({ className, ...props }: React.ComponentProps<"td">) {
beauty-core-ui/src/components/ui/table.tsx:84:      data-slot="table-cell"
beauty-core-ui/src/components/ui/table.tsx:89:      {...props}
beauty-core-ui/src/components/ui/table.tsx:94:function TableCaption({
beauty-core-ui/src/components/ui/table.tsx:96:  ...props
beauty-core-ui/src/components/ui/table.tsx:97:}: React.ComponentProps<"caption">) {
beauty-core-ui/src/components/ui/table.tsx:100:      data-slot="table-caption"
beauty-core-ui/src/components/ui/table.tsx:102:      {...props}
beauty-core-ui/src/components/ui/table.tsx:108:  Table,
beauty-core-ui/src/components/ui/table.tsx:109:  TableHeader,
beauty-core-ui/src/components/ui/table.tsx:110:  TableBody,
beauty-core-ui/src/components/ui/table.tsx:111:  TableFooter,
beauty-core-ui/src/components/ui/table.tsx:112:  TableHead,
beauty-core-ui/src/components/ui/table.tsx:113:  TableRow,
beauty-core-ui/src/components/ui/table.tsx:114:  TableCell,
beauty-core-ui/src/components/ui/table.tsx:115:  TableCaption,
beauty-core-ui/src/components/ui/textarea.tsx:5:function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
beauty-core-ui/src/components/ui/textarea.tsx:10:        "flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
beauty-core-ui/src/components/ui/textarea.tsx:13:      {...props}
beauty-core-ui/src/components/ui/tooltip.tsx:10:  ...props
beauty-core-ui/src/components/ui/tooltip.tsx:11:}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
beauty-core-ui/src/components/ui/tooltip.tsx:16:      {...props}
beauty-core-ui/src/components/ui/tooltip.tsx:22:  ...props
beauty-core-ui/src/components/ui/tooltip.tsx:23:}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
beauty-core-ui/src/components/ui/tooltip.tsx:24:  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
beauty-core-ui/src/components/ui/tooltip.tsx:28:  ...props
beauty-core-ui/src/components/ui/tooltip.tsx:29:}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
beauty-core-ui/src/components/ui/tooltip.tsx:30:  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
beauty-core-ui/src/components/ui/tooltip.tsx:36:  children,
beauty-core-ui/src/components/ui/tooltip.tsx:37:  ...props
beauty-core-ui/src/components/ui/tooltip.tsx:38:}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
beauty-core-ui/src/components/ui/tooltip.tsx:45:          "z-50 inline-flex w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
beauty-core-ui/src/components/ui/tooltip.tsx:48:        {...props}
beauty-core-ui/src/components/ui/tooltip.tsx:50:        {children}
beauty-core-ui/src/features/portal/assets/portal-assets.ts:5:export const portalAssets = {
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:24:export const portalAuthApi = {
beauty-core-ui/src/features/portal/auth/portal-auth-cache.ts:3:export function clearPortalPrivateQueries(queryClient: QueryClient) {
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:49:      <button
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:50:        type="button"
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:56:      </button>
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:57:      <button
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:58:        type="button"
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:64:      </button>
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:79:    screen.getByRole("button", {
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:103:    screen.getByRole("button", {
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:130:    screen.getByRole("button", {
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:5:  PortalAuthBoundary,
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:35:      <button type="button" onClick={auth.beginRestore}>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:37:      </button>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:38:      <button type="button" onClick={auth.markAnonymous}>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:40:      </button>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:41:      <button
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:42:        type="button"
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:46:      </button>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:47:      <button type="button" onClick={auth.markDenied}>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:49:      </button>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:50:      <button type="button" onClick={auth.clearSession}>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:52:      </button>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:77:    fireEvent.click(screen.getByRole("button", { name: "restaurar" }));
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:80:    fireEvent.click(screen.getByRole("button", { name: "autenticar" }));
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:87:    fireEvent.click(screen.getByRole("button", { name: "negar" }));
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:92:    fireEvent.click(screen.getByRole("button", { name: "limpar" }));
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:97:describe("PortalAuthBoundary", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:106:        <PortalAuthBoundary
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:112:        </PortalAuthBoundary>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:125:        <PortalAuthBoundary
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:131:        </PortalAuthBoundary>
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:48:type PortalAuthProviderProps = {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:49:  children: ReactNode;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:54:export function PortalAuthProvider({
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:55:  children,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:58:}: PortalAuthProviderProps) {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:182:      {children}
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:187:export function usePortalAuth(): PortalAuthContextValue {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:199:type PortalAuthBoundaryProps = {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:200:  children: ReactNode;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:206:export function PortalAuthBoundary({
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:207:  children,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:211:}: PortalAuthBoundaryProps) {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:226:  return children;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:85:export const portalAuthQueryKeys = {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:50:      return "Confira os dados informados.";
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:68:export function normalizePortalAuthError(
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:143:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:19:type PortalAuthRouteOrchestratorProps = {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:20:  children: ReactNode;
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:24:export function PortalAuthRouteOrchestrator({
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:25:  children,
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:27:}: PortalAuthRouteOrchestratorProps) {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:46:    return <>{children}</>;
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:53:      {children}
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:58:type PortalAuthenticatedRouteControllerProps = {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:59:  children: ReactNode;
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:64:  children,
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:66:}: PortalAuthenticatedRouteControllerProps) {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:151:        role="alert"
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:158:  return <>{children}</>;
beauty-core-ui/src/features/portal/auth/portal-auth-routing.ts:5:export const PORTAL_FIRST_ACCESS_PATH =
beauty-core-ui/src/features/portal/auth/portal-auth-routing.ts:8:export function sanitizePortalFirstAccessReturnTo(
beauty-core-ui/src/features/portal/auth/portal-auth-routing.ts:18:export function getPortalFirstAccessHref(
beauty-core-ui/src/features/portal/auth/portal-auth-routing.ts:27:type ResolvePortalAuthRouteInput = {
beauty-core-ui/src/features/portal/auth/portal-auth-routing.ts:33:export function resolvePortalAuthRoute({
beauty-core-ui/src/features/portal/auth/portal-auth-routing.ts:37:}: ResolvePortalAuthRouteInput): string | null {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:199:export function hasPortalSession(): boolean {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:206:export function startPortalSession(
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:285:export function clearPortalSession(): void {
beauty-core-ui/src/features/portal/auth/portal-auth.ts:1:´╗┐export const PORTAL_AUTH_STATUSES = [
beauty-core-ui/src/features/portal/auth/portal-auth.ts:22:export const PORTAL_AUTH_INITIAL_STATE: PortalAuthState = {
beauty-core-ui/src/features/portal/auth/portal-auth.ts:34:export function portalAuthReducer(
beauty-core-ui/src/features/portal/auth/portal-auth.ts:54:export function canUsePortalPrivateQueries(
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:22:  PortalOtpRequestForm,
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:56:function renderForm() {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:59:      <PortalOtpRequestForm />
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:72:describe("PortalOtpRequestForm", () => {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:73:  it("normalizes formatted phone numbers according to the backend contract", () => {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:79:      "Informe um telefone v├ílido com DDD.",
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:84:    renderForm();
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:91:      screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:97:      screen.getByRole("alert"),
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:98:    ).toHaveTextContent("Informe um telefone v├ílido com DDD.");
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:106:    renderForm();
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:113:      screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:145:    renderForm();
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:151:    const form = screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:155:    fireEvent.submit(form);
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:156:    fireEvent.submit(form);
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:159:    expect(screen.getByRole("button")).toBeDisabled();
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:175:    renderForm();
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:182:      screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:188:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:3:import type { FormEvent } from "react";
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:6:import { Button } from "@/components/ui/button";
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:7:import { Input } from "@/components/ui/input";
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:15:type PortalOtpRequestFormProps = {
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:19:export function normalizePortalPhone(value: string): string {
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:23:export function validatePortalPhone(value: string): string | null {
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:27:    return "Informe seu telefone com DDD.";
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:31:    return "Informe um telefone v├ílido com DDD.";
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:53:export function getPortalOtpRequestErrorMessage(error: unknown): string {
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:56:      return "Confira o telefone informado e tente novamente.";
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:60:      return "N├úo foi poss├¡vel concluir a solicita├º├úo com os dados informados.";
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:68:export function PortalOtpRequestForm({
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:70:}: PortalOtpRequestFormProps) {
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:78:  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:142:      <form
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:157:          <Input
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:163:            inputMode="tel"
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:181:            Informe o n├║mero usado no cadastro da empresa.
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:188:              role="alert"
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:195:        <Button
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:201:        </Button>
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:212:      </form>
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:23:  PortalOtpVerificationForm,
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:95:function renderForm() {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:98:      <PortalOtpVerificationForm
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:128:describe("PortalOtpVerificationForm", () => {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:130:    renderForm();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:132:    const input = screen.getByLabelText("C├│digo de acesso");
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:134:    expect(input).toHaveAttribute("autoComplete", "one-time-code");
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:135:    expect(input).toHaveAttribute("inputMode", "numeric");
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:136:    expect(input).toHaveAttribute("maxLength", "6");
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:138:    fireEvent.change(input, {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:144:    expect(input).toHaveValue("123456");
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:152:    renderForm();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:159:      screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:164:    expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:174:    renderForm();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:181:      screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:215:    renderForm();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:221:    const form = screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:225:    fireEvent.submit(form);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:226:    fireEvent.submit(form);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:229:    expect(screen.getByRole("button", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:249:    renderForm();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:256:      screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:262:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:263:        "O c├│digo informado ├® inv├ílido ou expirou.",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:271:    renderForm();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:274:      screen.getByRole("button", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:291:      screen.getByRole("button", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:304:    renderForm();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:307:      screen.getByRole("button", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:313:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:327:    renderForm();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:334:      screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:340:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:3:import type { FormEvent } from "react";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:6:import { Button } from "@/components/ui/button";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:7:import { Input } from "@/components/ui/input";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:17:type PortalOtpVerificationFormProps = {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:22:export function normalizePortalOtpCode(value: string): string {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:26:export function validatePortalOtpCode(value: string): string | null {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:30:    return "Informe o c├│digo recebido.";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:56:export function getPortalOtpVerificationErrorMessage(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:62:      return "O c├│digo informado ├® inv├ílido ou expirou. Solicite um novo c├│digo.";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:66:      return "N├úo foi poss├¡vel validar o c├│digo com os dados informados.";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:77:      return "Confira os dados informados e tente novamente.";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:89:export function PortalOtpVerificationForm({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:92:}: PortalOtpVerificationFormProps) {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:106:  async function handleVerify(event: FormEvent<HTMLFormElement>) {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:200:          Informe os 6 d├¡gitos para confirmar seu acesso ao portal.
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:204:      <form
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:219:          <Input
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:225:            inputMode="numeric"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:251:              role="alert"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:258:        <Button
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:264:        </Button>
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:266:        <Button
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:269:          type="button"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:273:        </Button>
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:294:      </form>
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:296:      <Button
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:299:        type="button"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:303:      </Button>
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:26:  PortalAuthRouteOrchestrator: ({ children }: { children: ReactNode }) => (
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:27:    <>{children}</>
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:81:  it("exposes the children only after authentication", () => {
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:17:type PortalPrivateRouteProps = {
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:18:  children: ReactNode;
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:23:export function PortalPrivateRoute({
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:24:  children,
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:25:}: PortalPrivateRouteProps) {
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:54:      <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:65:      {children}
beauty-core-ui/src/features/portal/components/portal-asset-image.tsx:5:type PortalAssetImageProps = {
beauty-core-ui/src/features/portal/components/portal-asset-image.tsx:16:export function PortalAssetImage({
beauty-core-ui/src/features/portal/components/portal-asset-image.tsx:25:}: PortalAssetImageProps) {
beauty-core-ui/src/features/portal/components/portal-branding.tsx:7:export function PortalBranding() {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:21:import { PortalDashboardDataBoundary } from "./portal-dashboard-data-boundary";
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:91:  children: ReactNode,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:104:        {children}
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:110:function renderBoundary(state: PortalAuthState) {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:113:    <PortalDashboardDataBoundary>
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:119:    </PortalDashboardDataBoundary>,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:186:    renderBoundary(AUTHENTICATED_STATE);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:207:    renderBoundary(AUTHENTICATED_STATE);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:226:    renderBoundary(AUTHENTICATED_STATE);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:237:      screen.getByRole("button", { name: "Tentar novamente" }),
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:244:    renderBoundary(ANONYMOUS_STATE);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:21:type PortalDashboardDataBoundaryProps = {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:22:  children: (dashboard: PortalDashboardViewModel) => ReactNode;
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:25:export function PortalDashboardDataBoundary({
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:26:  children,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:27:}: PortalDashboardDataBoundaryProps) {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:44:      <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:72:        <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:83:        <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:99:      <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:138:  return <>{children(dashboard)}</>;
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:15:type PortalNavigationProps = {
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:20:export function PortalNavigation({
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:23:}: PortalNavigationProps) {
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:64:        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] shadow-lg backdrop-blur md:hidden"
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx:4:import { PortalPageContainer } from "./portal-page-container";
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx:6:describe("PortalPageContainer", () => {
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx:7:  it("renders children inside the shared Card primitive", () => {
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx:9:      <PortalPageContainer>
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx:11:      </PortalPageContainer>,
beauty-core-ui/src/features/portal/components/portal-page-container.tsx:3:import { Card, CardContent } from "@/components/ui/card";
beauty-core-ui/src/features/portal/components/portal-page-container.tsx:5:type PortalPageContainerProps = {
beauty-core-ui/src/features/portal/components/portal-page-container.tsx:6:  children: ReactNode;
beauty-core-ui/src/features/portal/components/portal-page-container.tsx:9:export function PortalPageContainer({
beauty-core-ui/src/features/portal/components/portal-page-container.tsx:10:  children,
beauty-core-ui/src/features/portal/components/portal-page-container.tsx:11:}: PortalPageContainerProps) {
beauty-core-ui/src/features/portal/components/portal-page-container.tsx:14:      <Card className="w-full border-border/80 bg-card/95 shadow-sm">
beauty-core-ui/src/features/portal/components/portal-page-container.tsx:15:        <CardContent className="p-6 sm:p-8 lg:p-10">
beauty-core-ui/src/features/portal/components/portal-page-container.tsx:16:          {children}
beauty-core-ui/src/features/portal/components/portal-page-container.tsx:17:        </CardContent>
beauty-core-ui/src/features/portal/components/portal-page-container.tsx:18:      </Card>
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:6:import { PortalShell } from "./portal-shell";
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:17:        <PortalShell>
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:19:        </PortalShell>
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:39:  it("keeps the shell within responsive content bounds", () => {
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:42:        <PortalShell>
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:44:        </PortalShell>
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:72:    const button = screen.getByRole("button", {
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:76:    expect(button).toHaveClass("min-h-11");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:77:    expect(button).toHaveClass("focus-visible:outline-none");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:78:    expect(button).toHaveClass("focus-visible:ring-2");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:79:    expect(button).toHaveClass("motion-reduce:transition-none");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:86:        title="Lista vazia"
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:91:      name: "Lista vazia",
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:16:import { PortalShell } from "./portal-shell";
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:22:describe("PortalShell", () => {
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:23:  it("renders shell landmarks with real tenant branding", () => {
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:26:        <PortalShell>
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:28:        </PortalShell>
beauty-core-ui/src/features/portal/components/portal-shell.tsx:11:type PortalShellProps = {
beauty-core-ui/src/features/portal/components/portal-shell.tsx:12:  children: ReactNode;
beauty-core-ui/src/features/portal/components/portal-shell.tsx:15:export function PortalShell({ children }: PortalShellProps) {
beauty-core-ui/src/features/portal/components/portal-shell.tsx:26:        className="border-border bg-card/80 backdrop-blur"
beauty-core-ui/src/features/portal/components/portal-shell.tsx:39:        {children}
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:7:  PortalProfileUpdateInput,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:13:  portalProfileUpdateInputSchema,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:29:    throw new TypeError("Data de nascimento fora do formato ISO.");
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:61:export function adaptPortalProfile(
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:69:export function adaptPortalDashboard(
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:90:export function adaptPortalHistory(
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:106:export function normalizePortalProfileUpdate(
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:107:  value: PortalProfileUpdateInput,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:108:): PortalProfileUpdateInput {
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:110:    portalProfileUpdateInputSchema.parse(value);
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:1:export const PORTAL_APPOINTMENT_STATUS_VALUES = [
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:13:export const PORTAL_HISTORY_TYPE_VALUES = [
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:32:export type PortalProfileUpdateInput = Readonly<{
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:25:export const portalProfileTransportSchema = z
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:35:export const portalAppointmentTransportSchema = z
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:46:export const portalDashboardTransportSchema = z
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:58:export const portalHistoryItemTransportSchema = z
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:69:export const portalHistoryTransportSchema = z.array(
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:73:export const portalProfileUpdateInputSchema = z
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:89:      message: "Informe pelo menos um campo para atualizar.",
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:109:export type PortalProfileUpdateInputParsed = z.infer<
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:110:  typeof portalProfileUpdateInputSchema
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:8:export function normalizePortalResourceError(
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:14:export function getPortalResourceErrorStatus(
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:20:export function isPortalResourceAccessError(
beauty-core-ui/src/features/portal/navigation/portal-navigation-config.ts:3:export const portalNavigationItems: readonly PortalNavigationItem[] = [
beauty-core-ui/src/features/portal/navigation/portal-navigation.ts:7:export function isSafePortalHref(href: string): boolean {
beauty-core-ui/src/features/portal/navigation/portal-navigation.ts:11:export function isPortalNavigationItemActive(
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:9:import { PortalShell } from "@/features/portal/components/portal-shell";
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:22:function renderPage(
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:29:        <PortalShell>
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:31:        </PortalShell>
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:53:        "Informe seu telefone com DDD para receber um c├│digo de acesso.",
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:76:    const image = surface?.querySelector("img");
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:124:    expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:132:    const deniedImage = deniedState?.querySelector("img");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:111:    fireEvent.click(screen.getByRole("button", { name: "Sair" }));
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:133:      screen.getByRole("button", { name: "Encerrar todas as sess├Áes" }),
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:158:    const button = screen.getByRole("button", { name: "Sair" });
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:160:    fireEvent.click(button);
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:161:    fireEvent.click(button);
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:164:    expect(button).toBeDisabled();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:182:    fireEvent.click(screen.getByRole("button", { name: "Sair" }));
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:187:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:195:    expect(screen.getByRole("alert")).not.toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:11:import { PortalPageContainer } from "../components/portal-page-container";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:15:export function PortalAuthenticatedSurface() {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:56:    <PortalPageContainer>
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:84:            role="alert"
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:91:          <button
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:96:            type="button"
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:99:          </button>
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:101:          <button
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:106:            type="button"
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:111:          </button>
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:114:    </PortalPageContainer>
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:21:  it("uses the official asset and does not expose a complete profile form", () => {
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:29:      screen.getByRole("button", { name: "Concluir primeiro acesso" }),
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:41:      screen.getByRole("button", { name: "Concluir primeiro acesso" }),
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:46:      screen.getByRole("alert"),
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:60:    const button = screen.getByRole("button", {
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:64:    fireEvent.click(button);
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:65:    fireEvent.click(button);
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:68:    expect(button).toBeDisabled();
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:87:      screen.getByRole("button", { name: "Concluir primeiro acesso" }),
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:91:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:95:    expect(screen.getByRole("alert")).not.toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.tsx:5:type PortalFirstAccessExperienceProps = {
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.tsx:9:export function PortalFirstAccessExperience({
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.tsx:11:}: PortalFirstAccessExperienceProps) {
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:150:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:14:export function PortalFirstAccessPage() {
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:118:      <p aria-live="assertive" className="py-10 text-center text-sm text-destructive" role="alert">
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:3:import { PortalPageContainer } from "../components/portal-page-container";
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:11:export function PortalFoundationPage() {
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:13:    <PortalPageContainer>
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:40:    </PortalPageContainer>
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:4:import { PortalOtpRequestForm as OtpRequestComponent } from "@/features/portal/auth/portal-otp-request";
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:24:      <div className="grid w-full min-w-0 overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm lg:grid-cols-2">
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:39:              Informe seu telefone com DDD para receber um c├│digo de acesso.
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:92:      role="alert"
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:102:export function PortalOtpRequestPage() {
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:6:import { PortalPageContainer } from "../components/portal-page-container";
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:8:type PortalPrivateRoutePageProps = {
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:11:  children?: ReactNode;
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:14:export function PortalPrivateRoutePage({
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:17:  children,
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:18:}: PortalPrivateRoutePageProps) {
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:21:      <PortalPageContainer>
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:39:          {children}
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:41:      </PortalPageContainer>
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:37:    expect(screen.getByRole("button", { name: "Aceitar e continuar" })).toBeInTheDocument();
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:45:    fireEvent.click(screen.getByRole("button", { name: "Aceitar e continuar" }));
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:48:    expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:64:    const button = screen.getByRole("button", {
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:68:    fireEvent.click(button);
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:69:    fireEvent.click(button);
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:72:    expect(button).toBeDisabled();
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:91:      screen.getByRole("button", { name: "Aceitar e continuar" }),
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:95:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:100:    expect(screen.getByRole("alert")).not.toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:3:import { useId, useRef, useState, type FormEvent } from "react";
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:8:import { PortalPageContainer } from "../components/portal-page-container";
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:10:type PortalTermsConsentProps = {
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:16:export function PortalTermsConsent({
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:20:}: PortalTermsConsentProps) {
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:30:  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:58:      <PortalPageContainer>
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:89:      </PortalPageContainer>
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:94:    <PortalPageContainer>
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:147:          <form
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:162:                <input
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:181:                role="alert"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:187:            <button
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:194:            </button>
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:195:          </form>
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:198:    </PortalPageContainer>
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:15:  PortalAuthBoundary,
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:50:function PrivateBoundaryProbe() {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:52:    <PortalAuthBoundary
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:58:    </PortalAuthBoundary>
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:73:  it("composes the real route with PortalAuthProvider, PortalShell and Tenant", () => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:104:        <PrivateBoundaryProbe />
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:186:          <PortalAuthBoundary
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:190:          </PortalAuthBoundary>
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:224:        title="Lista vazia"
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:229:      screen.getByRole("heading", { name: "Lista vazia" }),
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:233:      screen.getByRole("heading", { name: "Lista vazia" })
beauty-core-ui/src/features/portal/query/portal-client-query-keys.ts:3:export const portalClientQueryKeys = {
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:38:export function mapPortalDashboardToViewModel(
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:51:export function isPortalDashboardEmpty(
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:6:export const PORTAL_DASHBOARD_STALE_TIME = 60_000;
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:8:export function portalDashboardQueryOptions(
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:13:export function usePortalDashboardQuery() {
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:12:export function usePortalQueryGate(
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:20:export function usePortalAccessErrorHandler() {
beauty-core-ui/src/features/portal/query/portal-query.test.ts:14:  it("creates stable public and private namespaces without tenant selection", () => {
beauty-core-ui/src/features/portal/query/portal-query.ts:5:export const portalQueryKeys = {
beauty-core-ui/src/features/portal/query/portal-query.ts:23:export function portalQueryEnabled(
beauty-core-ui/src/features/portal/query/portal-query.ts:38:export function cleanupPortalPrivateQueries(
beauty-core-ui/src/features/portal/query/portal-query.ts:52:export function portalAccessTransitionFromStatus(
beauty-core-ui/src/features/portal/query/portal-query.ts:66:export function handlePortalAccessError(
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:20:      "javascript:alert(1)",
beauty-core-ui/src/features/portal/security/portal-safe-return-to.ts:59:export function isSafePortalReturnTo(value: unknown): boolean {
beauty-core-ui/src/features/portal/security/portal-safe-return-to.ts:63:export function sanitizePortalReturnTo(
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:88:  it("consulta perfil pela rota canonica e retorna somente a allowlist publica", async () => {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:109:  it("consulta dashboard sem query e remove subobjetos fora da allowlist", async () => {
beauty-core-ui/src/features/portal/services/portal-client-api.ts:9:  PortalProfileUpdateInput,
beauty-core-ui/src/features/portal/services/portal-client-api.ts:21:export const PORTAL_CLIENT_ENDPOINTS = {
beauty-core-ui/src/features/portal/services/portal-client-api.ts:44:  input: PortalProfileUpdateInput,
beauty-core-ui/src/features/portal/services/portal-client-api.ts:46:  const payload = normalizePortalProfileUpdate(input);
beauty-core-ui/src/features/portal/services/portal-client-api.ts:63:export const portalClientApi = {
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:83:      document.querySelectorAll("[data-portal-state]"),
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:102:      screen.getByRole("button", { name: "Tentar novamente" }),
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:112:        title="Lista vazia"
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:116:    expect(container.querySelector("img")).toHaveAttribute("alt", "");
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:3:import { useId, type ComponentProps, type ReactNode } from "react";
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:16:type PortalAsset = ComponentProps<typeof PortalAssetImage>["asset"];
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:18:export type PortalStatePanelProps = {
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:28:  children?: ReactNode;
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:31:type PortalStateContentProps = Omit<
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:32:  PortalStatePanelProps,
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:36:export function PortalStatePanel({
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:43:  children,
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:44:}: PortalStatePanelProps) {
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:52:      className="mx-auto flex w-full max-w-xl flex-col items-center justify-center gap-5 rounded-xl border border-border/80 bg-card/80 px-5 py-8 text-center shadow-sm sm:px-8 sm:py-10"
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:80:      {children}
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:83:        <button
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:86:          type="button"
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:89:        </button>
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:95:export function PortalLoadingState(props: PortalStateContentProps) {
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:98:      {...props}
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:105:export function PortalEmptyState(props: PortalStateContentProps) {
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:108:      {...props}
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:115:export function PortalErrorState(props: PortalStateContentProps) {
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:118:      {...props}
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:125:export function PortalOfflineState(props: PortalStateContentProps) {
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:128:      {...props}
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:135:export function PortalSuccessState(props: PortalStateContentProps) {
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:138:      {...props}
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:145:export function PortalAccessUnavailableState(
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:146:  props: PortalStateContentProps,
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:150:      {...props}
``

## 4. Ocorrências dos domínios

Quantidade de ocorrências: 72

``text
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
``

## 5. Testes existentes

Quantidade: 41

- `src\components\forms\form-foundation.test.tsx`
- `src\components\layout\admin-shell-boundary.test.tsx`
- `src\components\layout\admin-sidebar.test.tsx`
- `src\components\layout\page-header.test.tsx`
- `src\components\states\feedback-states.test.tsx`
- `src\components\ui\status-badge.test.tsx`
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

## 6. Arquitetura recomendada

Cada domínio deverá ser composto por camadas separadas:

1. contrato e schema;
2. adapter/normalização;
3. query option;
4. boundary de dados;
5. página ou superfície;
6. componentes de apresentação;
7. estados loading, error, empty e denied;
8. testes focados.

As páginas não devem conter lógica HTTP diretamente.

## 7. Regras de reutilização

- Reutilizar PortalShell, navegação, containers e boundaries existentes.
- Reutilizar tokens e componentes visuais já disponíveis.
- Evitar componentes monolíticos.
- Evitar duplicação de cards, tabelas, estados e controles.
- Separar dados privados de dados públicos.
- Manter componentes acessíveis e responsivos.
- Não criar componentes para funcionalidades fora do Chat 62.

## 8. Matriz de superfícies

| Domínio | Superfície provável | Componentes compartilhados |
|---|---|---|
| Agendamentos | Lista, detalhe e estado vazio | Shell, cards, badges, boundary |
| Fidelidade | Resumo de pontos e progresso | Cards, progress, badges, estados |
| Benefícios | Lista de benefícios elegíveis | Cards, dialogs, alertas |
| Pacotes | Lista e saldo | Cards, progress, badges |
| Consumo | Histórico ou resumo de utilização | Lista, tabela responsiva, estados |

A existência de cada superfície depende de contrato real confirmado.

## 9. Restrições

- Nenhum componente funcional novo criado.
- Nenhuma página nova criada.
- Nenhum endpoint criado.
- Nenhuma alteração no backend.
- Nenhuma funcionalidade dos Chats 63 e 64 antecipada.
- Nenhum commit, push, tag ou deploy executado.

## 10. Próximo bloco

O BLOCO 10/15 deverá auditar e definir a estratégia de testes unitários, integração e E2E para os domínios autorizados do Chat 62.
