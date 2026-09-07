# Beauty Core 1.0 — Chat 62

## BLOCO 14/15 — Plano de Implementação Permitido

- Data: 2026-09-05 23:20:28 -03:00
- Branch: chat32-bullmq-enterprise
- HEAD: b9913a7c007e03929ac893ef01e1a849f04394fe
- Backend alterado: NÃO

## 1. Objetivo

Consolidar a evidência técnica dos Blocos 02–13 e definir exatamente o que pode ser implementado no frontend sem inventar contratos, endpoints ou dados.

Este bloco não implementa funcionalidades.

## 2. Arquivos nominais de domínio

Nenhum arquivo nominal de domínio localizado.

## 3. Evidências HTTP

Quantidade: 6

``text
beauty-core-ui/src/features/portal/assets/portal-assets.ts:8:      src: "/images/portal/appointments/portal-appointments.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:29:      src: "/images/portal/benefits/portal-benefits.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:62:      src: "/images/portal/loyalty/portal-loyalty.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:82:      src: "/images/portal/packages/portal-packages.webp",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:88:                void query.refetch();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:104:              void query.refetch();
``

## 4. Evidências de Query

Quantidade: 55

``text
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:23:  portalAuthQueryKeys,
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:203:    expect(portalAuthQueryKeys.me()).toEqual([
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:210:      JSON.stringify(portalAuthQueryKeys.me()),
beauty-core-ui/src/features/portal/auth/portal-auth-cache.ts:4:  queryClient.removeQueries({
beauty-core-ui/src/features/portal/auth/portal-auth-cache.ts:5:    predicate: ({ queryKey }) => queryKey[0] === "portal",
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:85:export const portalAuthQueryKeys = {
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:88:  me: () => [...portalAuthQueryKeys.all, "me"] as const,
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:5:import { useQueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:17:  const queryClient = useQueryClient();
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:24:  portalQueryKeys,
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:123:    const privateKey = portalQueryKeys.privateResource("profile");
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:8:  portalClientQueryKeys,
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:11:describe("portalClientQueryKeys", () => {
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:13:    expect(portalClientQueryKeys.all()).toEqual([
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:17:    expect(portalClientQueryKeys.dashboard()).toEqual([
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:22:    expect(portalClientQueryKeys.profile()).toEqual([
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:27:    expect(portalClientQueryKeys.history()).toEqual([
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:36:      portalClientQueryKeys.dashboard(),
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:37:      portalClientQueryKeys.profile(),
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:38:      portalClientQueryKeys.history(),
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:48:      portalClientQueryKeys.dashboard(),
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:49:    ).not.toEqual(portalClientQueryKeys.profile());
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:51:      portalClientQueryKeys.profile(),
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:52:    ).not.toEqual(portalClientQueryKeys.history());
beauty-core-ui/src/features/portal/query/portal-client-query-keys.ts:1:import { portalQueryKeys } from "./portal-query";
beauty-core-ui/src/features/portal/query/portal-client-query-keys.ts:3:export const portalClientQueryKeys = {
beauty-core-ui/src/features/portal/query/portal-client-query-keys.ts:4:  all: () => portalQueryKeys.private(),
beauty-core-ui/src/features/portal/query/portal-client-query-keys.ts:6:    portalQueryKeys.privateResource("dashboard"),
beauty-core-ui/src/features/portal/query/portal-client-query-keys.ts:8:    portalQueryKeys.privateResource("profile"),
beauty-core-ui/src/features/portal/query/portal-client-query-keys.ts:10:    portalQueryKeys.privateResource("history"),
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:12:    expect(options.queryKey).toEqual([
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:21:    expect(JSON.stringify(options.queryKey)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:28:    expect(options.queryKey).toEqual([
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:4:import { portalClientQueryKeys } from "./portal-client-query-keys";
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:9:  enabled: boolean,
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:12:    queryKey: portalClientQueryKeys.dashboard(),
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:13:    queryFn: () => getPortalDashboard(),
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:4:import { useQuery } from "@tanstack/react-query";
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:16:  const query = useQuery(portalDashboardQueryOptions(enabled));
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:4:import { useQueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:21:  const queryClient = useQueryClient();
beauty-core-ui/src/features/portal/query/portal-query.test.ts:9:  portalQueryKeys,
beauty-core-ui/src/features/portal/query/portal-query.test.ts:15:    const publicKey = portalQueryKeys.publicResource("tenant");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:16:    const privateKey = portalQueryKeys.privateResource("profile", "current");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:47:    const privateKey = portalQueryKeys.privateResource("profile");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:48:    const publicKey = portalQueryKeys.publicResource("tenant");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:67:    const privateKey = portalQueryKeys.privateResource("history");
beauty-core-ui/src/features/portal/query/portal-query.ts:5:export const portalQueryKeys = {
beauty-core-ui/src/features/portal/query/portal-query.ts:8:  public: () => [...portalQueryKeys.all, "public"] as const,
beauty-core-ui/src/features/portal/query/portal-query.ts:10:  private: () => [...portalQueryKeys.all, "private"] as const,
beauty-core-ui/src/features/portal/query/portal-query.ts:15:  ) => [...portalQueryKeys.public(), resource, ...parts] as const,
beauty-core-ui/src/features/portal/query/portal-query.ts:20:  ) => [...portalQueryKeys.private(), resource, ...parts] as const,
beauty-core-ui/src/features/portal/query/portal-query.ts:42:    queryKey: portalQueryKeys.private(),
beauty-core-ui/src/features/portal/query/portal-query.ts:45:  queryClient.removeQueries({
beauty-core-ui/src/features/portal/query/portal-query.ts:46:    queryKey: portalQueryKeys.private(),
``

## 5. Evidências de Mutation

Quantidade: 102

``text
beauty-core-ui/docs/chat60-portal-auth-audit.md:13562:          /useMutation\s*\(/g,
beauty-core-ui/docs/chat60-portal-auth-audit.md:25705:    expect(combined).toContain("useMutation");
beauty-core-ui/docs/chat61-portal-dashboard-profile-history-audit.md:26622:13562 |           /useMutation\s*\(/g,
beauty-core-ui/docs/chat61-portal-dashboard-profile-history-audit.md:38765:25705 |     expect(combined).toContain("useMutation");
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.tsx:7:  useMutation,
beauty-core-ui/src/features/agendamentos/components/agendamento-create-dialog.tsx:47:  const mutation = useMutation({
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:8:  useMutation,
beauty-core-ui/src/features/agendamentos/components/agendamento-detail-dialog.tsx:142:  const mutation = useMutation({
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:7:  useMutation,
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:101:    useMutation({
beauty-core-ui/src/features/agendamentos/components/agendamento-status-actions.tsx:143:    useMutation({
beauty-core-ui/src/features/arquivos/components/arquivos-view.tsx:5:import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/arquivos/components/arquivos-view.tsx:95:  const uploadDocumentMutation = useMutation({
beauty-core-ui/src/features/arquivos/components/arquivos-view.tsx:109:  const uploadGalleryMutation = useMutation({
beauty-core-ui/src/features/arquivos/components/arquivos-view.tsx:127:  const downloadMutation = useMutation({
beauty-core-ui/src/features/arquivos/components/arquivos-view.tsx:137:  const removeMutation = useMutation({
beauty-core-ui/src/features/auth/components/admin-sessions-panel.tsx:17:  useMutation,
beauty-core-ui/src/features/auth/components/admin-sessions-panel.tsx:206:    useMutation({
beauty-core-ui/src/features/automacoes/components/automacoes-operacionais-section.tsx:7:  useMutation,
beauty-core-ui/src/features/automacoes/components/automacoes-operacionais-section.tsx:132:  const processMutation = useMutation({
beauty-core-ui/src/features/automacoes/components/automacoes-operacionais-section.tsx:149:  const birthdayMutation = useMutation({
beauty-core-ui/src/features/automacoes/components/automacoes-operacionais-section.tsx:164:  const reportMutation = useMutation({
beauty-core-ui/src/features/chat54/chat54-cross-integration.test.ts:242:          /useMutation\s*\(/g,
beauty-core-ui/src/features/clientes/components/cliente-form-dialog.tsx:7:  useMutation,
beauty-core-ui/src/features/clientes/components/cliente-form-dialog.tsx:77:  const mutation = useMutation({
beauty-core-ui/src/features/clientes/components/cliente-lgpd-actions.tsx:12:  useMutation,
beauty-core-ui/src/features/clientes/components/cliente-lgpd-actions.tsx:80:    useMutation({
beauty-core-ui/src/features/clientes/components/cliente-profile-view.tsx:21:  useMutation,
beauty-core-ui/src/features/clientes/components/cliente-profile-view.tsx:692:    useMutation({
beauty-core-ui/src/features/clientes/components/cliente-profile-view.tsx:723:    useMutation({
beauty-core-ui/src/features/configuracoes/components/branding-view.tsx:5:import { useMutation, useQueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/configuracoes/components/branding-view.tsx:35:  const uploadLogoMutation = useMutation({
beauty-core-ui/src/features/fidelidade/beneficios/use-beneficios.ts:4:  useMutation,
beauty-core-ui/src/features/fidelidade/beneficios/use-beneficios.ts:28:  const createMutation = useMutation({
beauty-core-ui/src/features/fidelidade/beneficios/use-beneficios.ts:41:  const updateMutation = useMutation({
beauty-core-ui/src/features/fidelidade/beneficios/use-beneficios.ts:62:  const inativarMutation = useMutation({
beauty-core-ui/src/features/fidelidade/cupons/use-cupons.ts:4:  useMutation,
beauty-core-ui/src/features/fidelidade/cupons/use-cupons.ts:30:  const createMutation = useMutation({
beauty-core-ui/src/features/fidelidade/cupons/use-cupons.ts:43:  const updateMutation = useMutation({
beauty-core-ui/src/features/fidelidade/cupons/use-cupons.ts:64:  const inativarMutation = useMutation({
beauty-core-ui/src/features/fidelidade/cupons/use-cupons.ts:75:  const validarMutation = useMutation({
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:4:  useMutation,
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:37:  const createConfiguracaoMutation = useMutation({
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:48:  const updateConfiguracaoMutation = useMutation({
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:59:  const createNivelMutation = useMutation({
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:70:  const updateNivelMutation = useMutation({
beauty-core-ui/src/features/fidelidade/hooks/use-fidelidade-programa.ts:87:  const removeNivelMutation = useMutation({
beauty-core-ui/src/features/fidelidade/operacoes/use-fidelidade-operacoes.ts:4:  useMutation,
beauty-core-ui/src/features/fidelidade/operacoes/use-fidelidade-operacoes.ts:39:  const adicionarMutation = useMutation({
beauty-core-ui/src/features/fidelidade/operacoes/use-fidelidade-operacoes.ts:50:  const resgatarMutation = useMutation({
beauty-core-ui/src/features/fidelidade/operacoes/use-fidelidade-operacoes.ts:61:  const pontuarMutation = useMutation({
beauty-core-ui/src/features/financeiro/chat52-financeiro-flow.integration.test.ts:297:    expect(combined).toContain("useMutation");
beauty-core-ui/src/features/financeiro/hooks/use-categorias-financeiras.ts:3:import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/financeiro/hooks/use-categorias-financeiras.ts:24:  return useMutation({
beauty-core-ui/src/features/financeiro/hooks/use-categorias-financeiras.ts:39:  return useMutation({
beauty-core-ui/src/features/financeiro/hooks/use-categorias-financeiras.ts:64:  return useMutation({
beauty-core-ui/src/features/financeiro/hooks/use-comissoes.ts:3:import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/financeiro/hooks/use-comissoes.ts:27:  return useMutation({
beauty-core-ui/src/features/financeiro/hooks/use-comissoes.ts:42:  return useMutation({
beauty-core-ui/src/features/financeiro/hooks/use-movimentacoes-financeiras.ts:3:import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/financeiro/hooks/use-movimentacoes-financeiras.ts:59:  return useMutation({
beauty-core-ui/src/features/financeiro/hooks/use-movimentacoes-financeiras.ts:72:  return useMutation({
beauty-core-ui/src/features/financeiro/hooks/use-movimentacoes-financeiras.ts:90:  return useMutation({
beauty-core-ui/src/features/financeiro/hooks/use-movimentacoes-financeiras.ts:108:  return useMutation({
beauty-core-ui/src/features/notificacoes/components/notificacoes-section.tsx:8:  useMutation,
beauty-core-ui/src/features/notificacoes/components/notificacoes-section.tsx:146:  const readMutation = useMutation({
beauty-core-ui/src/features/notificacoes/components/notificacoes-section.tsx:152:  const archiveMutation = useMutation({
beauty-core-ui/src/features/notificacoes/components/notificacoes-section.tsx:158:  const deleteMutation = useMutation({
beauty-core-ui/src/features/notificacoes/components/notificacoes-settings-section.tsx:4:  useMutation,
beauty-core-ui/src/features/notificacoes/components/notificacoes-settings-section.tsx:55:  const updateMutation = useMutation({
beauty-core-ui/src/features/pacotes/catalogo/use-pacotes-catalogo.ts:4:  useMutation,
beauty-core-ui/src/features/pacotes/catalogo/use-pacotes-catalogo.ts:32:    useMutation({
beauty-core-ui/src/features/pacotes/catalogo/use-pacotes-catalogo.ts:48:    useMutation({
beauty-core-ui/src/features/pacotes/catalogo/use-pacotes-catalogo.ts:69:    useMutation({
beauty-core-ui/src/features/pacotes/clientes-pacotes/use-clientes-pacotes.ts:4:  useMutation,
beauty-core-ui/src/features/pacotes/clientes-pacotes/use-clientes-pacotes.ts:45:    useMutation({
beauty-core-ui/src/features/pacotes/clientes-pacotes/use-clientes-pacotes.ts:68:    useMutation({
beauty-core-ui/src/features/pacotes/clientes-pacotes/use-clientes-pacotes.ts:97:    useMutation({
beauty-core-ui/src/features/profissionais/components/profissional-form-dialog.tsx:4:import { useMutation, useQueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/profissionais/components/profissional-form-dialog.tsx:60:  const mutation = useMutation({
beauty-core-ui/src/features/servicos/components/servico-deactivate-dialog.tsx:4:import { useMutation, useQueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/servicos/components/servico-deactivate-dialog.tsx:37:  const mutation = useMutation({
beauty-core-ui/src/features/servicos/components/servico-form-dialog.tsx:4:import { useMutation, useQueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/servicos/components/servico-form-dialog.tsx:51:  const mutation = useMutation({
beauty-core-ui/src/features/unidades/components/unidade-deactivate-dialog.tsx:4:import { useMutation, useQueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/unidades/components/unidade-deactivate-dialog.tsx:37:  const mutation = useMutation({
beauty-core-ui/src/features/unidades/components/unidade-form-dialog.tsx:4:import { useMutation, useQueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/unidades/components/unidade-form-dialog.tsx:51:  const mutation = useMutation({
beauty-core-ui/src/features/usuarios/components/usuario-deactivate-dialog.tsx:4:import { useMutation, useQueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/usuarios/components/usuario-deactivate-dialog.tsx:38:  const mutation = useMutation({
beauty-core-ui/src/features/usuarios/components/usuario-form-dialog.tsx:4:import { useMutation, useQueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/usuarios/components/usuario-form-dialog.tsx:91:  const mutation = useMutation({
beauty-core-ui/src/features/whatsapp/components/campanhas-whatsapp-section.tsx:5:  useMutation,
beauty-core-ui/src/features/whatsapp/components/campanhas-whatsapp-section.tsx:109:  const createMutation = useMutation({
beauty-core-ui/src/features/whatsapp/components/campanhas-whatsapp-section.tsx:121:  const updateMutation = useMutation({
beauty-core-ui/src/features/whatsapp/components/campanhas-whatsapp-section.tsx:142:  const cancelMutation = useMutation({
beauty-core-ui/src/features/whatsapp/components/mensagens-whatsapp-section.tsx:8:  useMutation,
beauty-core-ui/src/features/whatsapp/components/mensagens-whatsapp-section.tsx:103:  const sendMutation = useMutation({
beauty-core-ui/src/features/whatsapp/components/templates-whatsapp-section.tsx:5:  useMutation,
beauty-core-ui/src/features/whatsapp/components/templates-whatsapp-section.tsx:103:  const createMutation = useMutation({
beauty-core-ui/src/features/whatsapp/components/templates-whatsapp-section.tsx:114:  const updateMutation = useMutation({
beauty-core-ui/src/features/whatsapp/components/templates-whatsapp-section.tsx:136:    useMutation({
``

## 6. Classificação operacional

| Domínio | Leitura | Escrita | Situação |
|---|---|---|---|
| Agendamentos | Permitida somente após confirmação do contrato | BLOQUEADA se não houver mutation real | Validar método e resposta |
| Fidelidade | Permitida somente após confirmação do contrato | BLOQUEADA se não houver mutation real | Validar cliente/sessão |
| Benefícios | Não confirmada por arquivo nominal | BLOQUEADA | Não criar tela fictícia |
| Pacotes | Permitida somente após confirmação do contrato | BLOQUEADA se não houver mutation real | Validar saldo e validade |
| Consumo/saldo | Permitida somente após confirmação do contrato | BLOQUEADA se não houver mutation real | Validar origem do saldo |

## 7. Implementação autorizada no BLOCO 15

Somente poderão ser implementados:

- adapters para contratos já existentes;
- query options para endpoints comprovados;
- telas de leitura quando resposta e identificação do cliente estiverem confirmadas;
- loading, erro, vazio e denied;
- testes dos fluxos realmente suportados;
- navegação somente para superfícies implementadas.

## 8. Implementação proibida

- criar endpoints;
- criar mutations sem endpoint real;
- simular persistência;
- inventar pontos, benefícios, pacotes ou saldos;
- enviar empresaId manualmente sem contrato;
- criar dados mockados como se fossem reais;
- alterar o backend;
- antecipar Chats 63 e 64;
- alterar o Admin.

## 9. Critério de aprovação do BLOCO 15

O BLOCO 15 somente poderá ser aprovado se:

1. typecheck passar;
2. lint passar;
3. testes focados passarem;
4. testes de segurança e isolamento passarem;
5. nenhuma chamada for feita para endpoint inexistente;
6. nenhuma alteração ocorrer no backend;
7. o working tree for revisado;
8. a documentação final registrar limitações reais.

## 10. Decisão

Com as evidências atuais, mutations de escrita não estão confirmadas para agendamentos. Os demais domínios também exigem confirmação manual dos arquivos antes de qualquer implementação funcional.

## 11. Próximo bloco

O BLOCO 15/15 deverá executar a auditoria final, validar os artefatos gerados, rodar o quality gate e preparar a documentação de encerramento. Nenhum commit será feito sem aprovação explícita do usuário.
