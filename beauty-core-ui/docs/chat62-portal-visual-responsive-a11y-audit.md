# Beauty Core 1.0 — Chat 62
## BLOCO 07/15 — Auditoria Visual, Responsividade e Acessibilidade

- Data: 2026-09-05 23:10:12 -03:00
- Branch: chat32-bullmq-enterprise
- HEAD: b9913a7c007e03929ac893ef01e1a849f04394fe
- Backend alterado: NÃO

## 1. Objetivo

Auditar os padrões visuais e de acessibilidade existentes para garantir que as futuras telas do Chat 62 sejam integradas à identidade do Portal Cliente.

Este bloco não cria telas nem altera componentes de produção.

## 2. Tokens e classes visuais

Quantidade de ocorrências: 159

``text
beauty-core-ui/src/app/portal/primeiro-acesso/page.tsx:11:          className="py-10 text-center text-sm text-muted-foreground"
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:37:        className="flex min-h-40 items-center justify-center text-sm text-muted-foreground"
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:139:        className="flex min-h-40 items-center justify-center text-sm text-muted-foreground"
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:150:        className="flex min-h-40 items-center justify-center text-sm text-destructive"
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:127:      className="space-y-5 border-t border-border/80 pt-6"
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:129:      <div className="space-y-2">
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:131:          className="text-xl font-semibold tracking-tight"
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:137:        <p className="text-sm leading-6 text-muted-foreground">
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:145:        className="space-y-5"
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:149:        <div className="space-y-2">
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:151:            className="text-sm font-medium text-foreground"
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:178:            className="text-xs leading-5 text-muted-foreground"
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:186:              className="text-sm text-destructive"
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:196:          className="min-h-11 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:206:            className="text-sm text-emerald-700 dark:text-emerald-400"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:189:      className="space-y-5 border-t border-border/80 pt-6"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:191:      <div className="space-y-2">
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:193:          className="text-xl font-semibold tracking-tight"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:199:        <p className="text-sm leading-6 text-muted-foreground">
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:207:        className="space-y-5"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:211:        <div className="space-y-2">
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:213:            className="text-sm font-medium text-foreground"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:241:            className="text-xs leading-5 text-muted-foreground"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:249:              className="text-sm text-destructive"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:259:          className="min-h-11 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:267:          className="min-h-11 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:278:            className="text-sm text-muted-foreground"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:288:            className="text-sm text-emerald-700 dark:text-emerald-400"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:297:        className="min-h-11 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:43:      <div aria-live="polite" className="w-full" role="status">
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:54:      <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/components/portal-asset-image.tsx:29:      className={className}
beauty-core-ui/src/features/portal/components/portal-branding.tsx:16:      className="flex min-w-0 items-center gap-3"
beauty-core-ui/src/features/portal/components/portal-branding.tsx:21:          className="h-10 w-10 rounded-lg object-cover"
beauty-core-ui/src/features/portal/components/portal-branding.tsx:30:          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-primary-foreground"
beauty-core-ui/src/features/portal/components/portal-branding.tsx:37:      <span className="truncate text-sm font-semibold tracking-wide text-foreground">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:33:      <div aria-live="polite" className="w-full" role="status">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:44:      <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:55:      <div aria-live="polite" className="w-full" role="status">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:72:        <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:83:        <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:99:      <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:116:      <div aria-live="polite" className="w-full" role="status">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:129:      <div className="w-full">
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:38:        className="hidden md:block"
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:40:        <ul className="flex items-center gap-1">
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:51:                  className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors motion-reduce:transition-none hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:64:        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] shadow-lg backdrop-blur md:hidden"
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:66:        <ul className="mx-auto flex min-h-16 w-full max-w-6xl items-stretch justify-around px-2">
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:74:              <li className="flex flex-1" key={item.href}>
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:77:                  className="flex min-h-11 flex-1 items-center justify-center rounded-md px-2 text-center text-xs font-medium text-muted-foreground transition-colors motion-reduce:transition-none hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx:4:import { PortalPageContainer } from "./portal-page-container";
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx:6:describe("PortalPageContainer", () => {
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx:9:      <PortalPageContainer>
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx:11:      </PortalPageContainer>,
beauty-core-ui/src/features/portal/components/portal-page-container.tsx:5:type PortalPageContainerProps = {
beauty-core-ui/src/features/portal/components/portal-page-container.tsx:9:export function PortalPageContainer({
beauty-core-ui/src/features/portal/components/portal-page-container.tsx:11:}: PortalPageContainerProps) {
beauty-core-ui/src/features/portal/components/portal-page-container.tsx:13:    <div className="mx-auto flex w-full max-w-3xl flex-1 items-start justify-center">
beauty-core-ui/src/features/portal/components/portal-page-container.tsx:14:      <Card className="w-full border-border/80 bg-card/95 shadow-sm">
beauty-core-ui/src/features/portal/components/portal-page-container.tsx:15:        <CardContent className="p-6 sm:p-8 lg:p-10">
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:50:    expect(main).toHaveClass("w-full");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:51:    expect(main).toHaveClass("max-w-6xl");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:53:    expect(main).toHaveClass("sm:px-6");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:54:    expect(main).toHaveClass("lg:px-8");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:55:    expect(main).toHaveClass("flex-1");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:76:    expect(button).toHaveClass("min-h-11");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:94:    expect(panel).toHaveClass("w-full");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:95:    expect(panel).toHaveClass("max-w-xl");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:97:    expect(panel).toHaveClass("sm:px-8");
beauty-core-ui/src/features/portal/components/portal-shell.tsx:17:    <div className="min-h-dvh bg-background text-foreground">
beauty-core-ui/src/features/portal/components/portal-shell.tsx:19:        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
beauty-core-ui/src/features/portal/components/portal-shell.tsx:26:        className="border-border bg-card/80 backdrop-blur"
beauty-core-ui/src/features/portal/components/portal-shell.tsx:29:        <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
beauty-core-ui/src/features/portal/components/portal-shell.tsx:36:        className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10"
beauty-core-ui/src/features/portal/components/portal-shell.tsx:43:        className="border-border text-muted-foreground"
beauty-core-ui/src/features/portal/components/portal-shell.tsx:46:        <div className="mx-auto flex min-h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 text-xs sm:px-6 lg:px-8">
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:72:    expect(surface).toHaveClass("w-full");
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:73:    expect(surface).toHaveClass("max-w-6xl");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:11:import { PortalPageContainer } from "../components/portal-page-container";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:56:    <PortalPageContainer>
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:59:        className="space-y-6"
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:64:        <div className="space-y-3">
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:65:          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:69:            className="text-3xl font-semibold tracking-tight text-foreground"
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:74:          <p className="text-base leading-7 text-muted-foreground">
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:83:            className="text-sm font-medium text-destructive"
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:90:        <div className="grid gap-3 sm:grid-cols-2">
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:93:            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:103:            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:114:    </PortalPageContainer>
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:110:      <p aria-live="polite" className="py-10 text-center text-sm text-muted-foreground" role="status">
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:118:      <p aria-live="assertive" className="py-10 text-center text-sm text-destructive" role="alert">
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:3:import { PortalPageContainer } from "../components/portal-page-container";
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:13:    <PortalPageContainer>
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:14:      <div className="space-y-6">
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:23:          className="h-auto max-h-64 w-full rounded-lg object-cover"
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:26:        <div className="space-y-4">
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:27:          <p className="text-sm font-medium text-muted-foreground">
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:31:          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:35:          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:40:    </PortalPageContainer>
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:21:      className="mx-auto flex min-h-[calc(100dvh-9rem)] w-full max-w-6xl items-center pb-[calc(1rem+env(safe-area-inset-bottom))]"
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:24:      <div className="grid w-full min-w-0 overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm lg:grid-cols-2">
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:25:        <div className="min-w-0 p-5 sm:p-8 lg:p-12">
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:26:          <div className="space-y-3">
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:27:            <p className="text-sm font-medium text-primary">
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:33:              className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:38:            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:42:            <p className="text-xs leading-5 text-muted-foreground">
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:47:          <div className="mt-6 min-w-0">
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:54:          className="relative hidden min-h-[28rem] min-w-0 overflow-hidden bg-muted/40 lg:block"
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:59:            className="h-full w-full object-cover object-center"
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:76:      className="w-full"
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:91:      className="w-full"
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:6:import { PortalPageContainer } from "../components/portal-page-container";
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:21:      <PortalPageContainer>
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:24:          className="space-y-4"
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:27:          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:31:            className="text-3xl font-semibold tracking-tight text-foreground"
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:36:          <p className="text-base leading-7 text-muted-foreground">
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:41:      </PortalPageContainer>
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:8:import { PortalPageContainer } from "../components/portal-page-container";
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:58:      <PortalPageContainer>
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:61:          className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:64:          <div className="order-2 lg:order-1">
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:68:              className="mx-auto h-auto w-full max-w-md"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:76:          <div className="order-1 space-y-5 lg:order-2">
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:78:            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:81:            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:84:            <p className="text-base leading-7 text-muted-foreground">
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:89:      </PortalPageContainer>
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:94:    <PortalPageContainer>
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:96:        className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:99:        <div className="order-2 lg:order-1">
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:103:            className="mx-auto h-auto w-full max-w-md"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:111:        <div className="order-1 space-y-6 lg:order-2">
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:114:          <div className="space-y-3">
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:115:            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:118:            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:121:            <p className="text-base leading-7 text-muted-foreground">
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:129:            className="space-y-3 rounded-xl border border-border bg-muted/30 p-4 text-sm leading-6 text-foreground"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:132:              className="font-semibold"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:141:            <p className="text-muted-foreground">
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:149:            className="space-y-5"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:153:            <fieldset className="space-y-3" disabled={submitting}>
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:154:              <legend className="sr-only">
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:159:                className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 text-sm leading-6 text-foreground"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:164:                  className="mt-1 h-4 w-4 shrink-0 accent-primary"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:180:                className="text-sm font-medium text-destructive"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:189:              className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:198:    </PortalPageContainer>
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:109:    const { container } = render(
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:116:    expect(container.querySelector("img")).toHaveAttribute("alt", "");
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:52:      className="mx-auto flex w-full max-w-xl flex-col items-center justify-center gap-5 rounded-xl border border-border/80 bg-card/80 px-5 py-8 text-center shadow-sm sm:px-8 sm:py-10"
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:64:      <div className="space-y-2">
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:66:          className="text-xl font-semibold tracking-tight text-foreground"
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:73:          className="text-sm leading-6 text-muted-foreground sm:text-base"
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:84:          className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors motion-reduce:transition-none hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
``

Critérios:

- reutilizar tokens existentes;
- preservar a identidade visual do Portal;
- evitar estilos isolados sem justificativa;
- manter contraste adequado;
- não introduzir dependências visuais no Admin.

## 3. Semântica e acessibilidade

Quantidade de ocorrências: 189

``text
beauty-core-ui/src/app/portal/portal-routing.test.tsx:46:      screen.getByLabelText("Telefone com DDD"),
beauty-core-ui/src/app/portal/primeiro-acesso/page.tsx:10:          aria-live="polite"
beauty-core-ui/src/app/portal/primeiro-acesso/page.tsx:12:          role="status"
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:49:      <button
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:57:      <button
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:35:      <button type="button" onClick={auth.beginRestore}>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:38:      <button type="button" onClick={auth.markAnonymous}>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:41:      <button
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:47:      <button type="button" onClick={auth.markDenied}>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:50:      <button type="button" onClick={auth.clearSession}>
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:36:        aria-busy="true"
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:38:        role="status"
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:138:        aria-busy="true"
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:140:        role="status"
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:151:        role="alert"
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:86:    fireEvent.change(screen.getByLabelText("Telefone com DDD"), {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:108:    fireEvent.change(screen.getByLabelText("Telefone com DDD"), {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:147:    fireEvent.change(screen.getByLabelText("Telefone com DDD"), {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:177:    fireEvent.change(screen.getByLabelText("Telefone com DDD"), {
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:125:    <section
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:126:      aria-labelledby="portal-otp-request-heading"
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:130:        <h2
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:143:        aria-busy={pending}
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:144:        aria-label="Solicitar c├│digo de acesso"
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:150:          <label
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:152:            htmlFor="portal-otp-phone"
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:155:          </label>
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:158:            aria-describedby={describedBy}
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:159:            aria-invalid={Boolean(error)}
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:188:              role="alert"
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:195:        <Button
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:196:          className="min-h-11 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:205:            aria-live="polite"
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:207:            role="status"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:132:    const input = screen.getByLabelText("C├│digo de acesso");
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:154:    fireEvent.change(screen.getByLabelText("C├│digo de acesso"), {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:176:    fireEvent.change(screen.getByLabelText("C├│digo de acesso"), {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:217:    fireEvent.change(screen.getByLabelText("C├│digo de acesso"), {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:251:    fireEvent.change(screen.getByLabelText("C├│digo de acesso"), {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:329:    fireEvent.change(screen.getByLabelText("C├│digo de acesso"), {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:187:    <section
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:188:      aria-labelledby="portal-otp-verification-heading"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:192:        <h2
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:205:        aria-busy={isBusy}
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:206:        aria-label="Verificar c├│digo de acesso"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:212:          <label
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:214:            htmlFor="portal-otp-code"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:217:          </label>
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:220:            aria-describedby={describedBy}
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:221:            aria-invalid={Boolean(error)}
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:251:              role="alert"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:258:        <Button
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:259:          className="min-h-11 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:266:        <Button
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:267:          className="min-h-11 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:277:            aria-live="polite"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:279:            role="status"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:287:            aria-live="polite"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:289:            role="status"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:296:      <Button
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:297:        className="min-h-11 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:43:      <div aria-live="polite" className="w-full" role="status">
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:54:      <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:12:        alt="Visual principal do Portal"
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:32:        alt="Nao deve ser anunciado"
beauty-core-ui/src/features/portal/components/portal-asset-image.tsx:28:      alt={decorative ? "" : alt}
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:52:    expect(screen.getByLabelText("Studio Aurora")).toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-branding.tsx:15:      aria-label={tenantName}
beauty-core-ui/src/features/portal/components/portal-branding.tsx:20:          alt=""
beauty-core-ui/src/features/portal/components/portal-branding.tsx:29:          aria-hidden="true"
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:33:      <div aria-live="polite" className="w-full" role="status">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:44:      <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:55:      <div aria-live="polite" className="w-full" role="status">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:72:        <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:83:        <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:86:              label: "Tentar novamente",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:99:      <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:102:            label: "Tentar novamente",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:116:      <div aria-live="polite" className="w-full" role="status">
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:30:        (link) => link.getAttribute("aria-current") === "page",
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:35:        (link) => link.getAttribute("aria-current") === null,
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:47:  it("renders safe routes with aria-current on the active route", () => {
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:52:          { href: "/portal", label: "Inicio" },
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:53:          { href: "/portal/historico", label: "Historico" },
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:63:        (link) => link.getAttribute("aria-current") === "page",
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:74:            label: "Externo",
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:78:            label: "Admin",
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:82:            label: "Protocol Relative",
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:13:const navigationLabel = "Navegacao principal";
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:36:      <nav
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:37:        aria-label={navigationLabel}
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:50:                  aria-current={active ? "page" : undefined}
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:51:                  className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors motion-reduce:transition-none hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:54:                  {item.label}
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:62:      <nav
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:63:        aria-label={navigationLabel}
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:76:                  aria-current={active ? "page" : undefined}
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:77:                  className="flex min-h-11 flex-1 items-center justify-center rounded-md px-2 text-center text-xs font-medium text-muted-foreground transition-colors motion-reduce:transition-none hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:80:                  {item.label}
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx:10:        <h1>Foundation do portal</h1>
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:14:  it("exposes landmarks and a keyboard skip link", () => {
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:18:          <h1>Conteudo principal</h1>
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:35:    expect(skipLink).toHaveClass("focus:not-sr-only");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:36:    expect(skipLink).toHaveClass("focus-visible:outline-none");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:43:          <h1>Conteudo principal</h1>
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:58:  it("keeps state actions keyboard accessible and motion-aware", () => {
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:64:          label: "Tentar novamente",
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:77:    expect(button).toHaveClass("focus-visible:outline-none");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:78:    expect(button).toHaveClass("focus-visible:ring-2");
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:27:          <h1>Conteudo do portal</h1>
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:37:      screen.getByLabelText(DEFAULT_TENANT.name),
beauty-core-ui/src/features/portal/components/portal-shell.tsx:9:const skipLinkLabel = "Pular para o conte\u00fado principal";
beauty-core-ui/src/features/portal/components/portal-shell.tsx:19:        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
beauty-core-ui/src/features/portal/components/portal-shell.tsx:22:        {skipLinkLabel}
beauty-core-ui/src/features/portal/components/portal-shell.tsx:25:      <header
beauty-core-ui/src/features/portal/components/portal-shell.tsx:35:      <main
beauty-core-ui/src/features/portal/navigation/portal-navigation-config.ts:4:  { href: "/portal", label: "Inicio" },
beauty-core-ui/src/features/portal/navigation/portal-navigation-config.ts:5:  { href: "/portal/perfil", label: "Perfil" },
beauty-core-ui/src/features/portal/navigation/portal-navigation-config.ts:6:  { href: "/portal/historico", label: "Historico" },
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:24:      { href: "/portal", label: "Inicio" },
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:25:      { href: "/portal/perfil", label: "Perfil" },
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:26:      { href: "/portal/historico", label: "Historico" },
beauty-core-ui/src/features/portal/navigation/portal-navigation.ts:3:  label: string;
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:57:    expect(screen.getByLabelText("Telefone com DDD")).toHaveAttribute(
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:97:    expect(screen.getByLabelText("Studio Aurora")).toBeInTheDocument();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:57:      <section
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:58:        aria-labelledby="portal-authenticated-heading"
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:68:          <h1
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:82:            aria-live="assertive"
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:84:            role="alert"
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:91:          <button
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:92:            aria-busy={activeAction === "current"}
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:101:          <button
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:102:            aria-busy={activeAction === "all"}
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:31:    expect(screen.queryByLabelText(/nome completo/i)).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:32:    expect(screen.queryByLabelText(/data de nascimento/i)).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.tsx:12:  return <PortalTermsConsent onAccept={onComplete} submitLabel="Concluir primeiro acesso" errorMessage="N├úo foi poss├¡vel concluir o primeiro acesso. Tente novamente." />;
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:110:      <p aria-live="polite" className="py-10 text-center text-sm text-muted-foreground" role="status">
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:118:      <p aria-live="assertive" className="py-10 text-center text-sm text-destructive" role="alert">
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:16:          alt=""
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:31:          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:19:    <section
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:20:      aria-labelledby="portal-otp-entry-heading"
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:31:            <h1
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:53:          aria-label="Ilustra├º├úo de acesso do Portal"
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:57:            alt=""
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:75:      aria-live="polite"
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:77:      role="status"
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:90:      aria-live="assertive"
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:92:      role="alert"
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:22:        <section
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:23:          aria-labelledby="portal-private-route-heading"
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:30:          <h1
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:12:  submitLabel?: string;
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:18:  submitLabel = "Aceitar e continuar",
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:59:        <section
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:60:          aria-live="polite"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:62:          role="status"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:66:              alt="Ilustra├º├úo do primeiro acesso"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:81:            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:101:            alt="Ilustra├º├úo do primeiro acesso"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:118:            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:127:          <section
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:128:            aria-labelledby={termsHeadingId}
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:131:            <h2
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:148:            aria-label="Aceite dos termos de uso"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:154:              <legend className="sr-only">
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:158:              <label
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:160:                htmlFor={checkboxId}
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:174:              </label>
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:179:                aria-live="assertive"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:181:                role="alert"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:187:            <button
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:188:              aria-busy={submitting}
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:193:              {submitting ? "Registrando aceite..." : submitLabel}
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:92:    expect(screen.getByLabelText("Beauty Core")).toBeInTheDocument();
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:155:        assetAlt="Ilustracao de sucesso"
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:25:      <main>
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:93:          label: "Tentar novamente",
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:122:        assetAlt="Ilustracao de sucesso"
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:25:    label: string;
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:49:    <section
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:50:      aria-describedby={descriptionId}
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:51:      aria-labelledby={titleId}
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:56:        alt={assetAlt ?? ""}
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:65:        <h2
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:83:        <button
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:84:          className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors motion-reduce:transition-none hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:88:          {action.label}
``

Critérios obrigatórios:

- headings em hierarquia lógica;
- landmarks semânticos;
- controles nativos quando aplicável;
- nomes acessíveis;
- foco visível;
- navegação por teclado;
- mensagens de erro associadas ao contexto;
- nenhuma informação comunicada apenas por cor;
- imagens com alt adequado ou marcadas como decorativas.

## 4. Responsividade

Quantidade de ocorrências: 32

``text
beauty-core-ui/src/features/portal/components/portal-branding.tsx:37:      <span className="truncate text-sm font-semibold tracking-wide text-foreground">
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:38:        className="hidden md:block"
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:64:        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] shadow-lg backdrop-blur md:hidden"
beauty-core-ui/src/features/portal/components/portal-page-container.tsx:15:        <CardContent className="p-6 sm:p-8 lg:p-10">
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:13:describe("Portal responsive and accessibility foundation", () => {
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:39:  it("keeps the shell within responsive content bounds", () => {
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:53:    expect(main).toHaveClass("sm:px-6");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:54:    expect(main).toHaveClass("lg:px-8");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:97:    expect(panel).toHaveClass("sm:px-8");
beauty-core-ui/src/features/portal/components/portal-shell.tsx:27:        style={{ paddingTop: "env(safe-area-inset-top)" }}
beauty-core-ui/src/features/portal/components/portal-shell.tsx:29:        <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
beauty-core-ui/src/features/portal/components/portal-shell.tsx:36:        className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10"
beauty-core-ui/src/features/portal/components/portal-shell.tsx:44:        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
beauty-core-ui/src/features/portal/components/portal-shell.tsx:46:        <div className="mx-auto flex min-h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 text-xs sm:px-6 lg:px-8">
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:74:    expect(surface).toHaveClass("pb-[calc(1rem+env(safe-area-inset-bottom))]");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:90:        <div className="grid gap-3 sm:grid-cols-2">
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:31:          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:35:          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:21:      className="mx-auto flex min-h-[calc(100dvh-9rem)] w-full max-w-6xl items-center pb-[calc(1rem+env(safe-area-inset-bottom))]"
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:24:      <div className="grid w-full min-w-0 overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm lg:grid-cols-2">
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:25:        <div className="min-w-0 p-5 sm:p-8 lg:p-12">
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:33:              className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:38:            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:54:          className="relative hidden min-h-[28rem] min-w-0 overflow-hidden bg-muted/40 lg:block"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:61:          className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:64:          <div className="order-2 lg:order-1">
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:76:          <div className="order-1 space-y-5 lg:order-2">
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:96:        className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:99:        <div className="order-2 lg:order-1">
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:111:        <div className="order-1 space-y-6 lg:order-2">
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:52:      className="mx-auto flex w-full max-w-xl flex-col items-center justify-center gap-5 rounded-xl border border-border/80 bg-card/80 px-5 py-8 text-center shadow-sm sm:px-8 sm:py-10"
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:73:          className="text-sm leading-6 text-muted-foreground sm:text-base"
``

Critérios obrigatórios:

- mobile-first;
- ausência de overflow horizontal indevido;
- alvos de toque adequados;
- tabelas e cards adaptáveis;
- textos sem truncamento que remova informação importante;
- navegação utilizável em telas pequenas;
- estados de loading, erro e vazio responsivos.

## 5. Assets

Quantidade de ocorrências: 37

``text
beauty-core-ui/src/features/portal/assets/portal-assets.ts:8:      src: "/images/portal/appointments/portal-appointments.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:29:      src: "/images/portal/benefits/portal-benefits.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:62:      src: "/images/portal/loyalty/portal-loyalty.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:82:      src: "/images/portal/packages/portal-packages.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:105:      src: "/images/portal/states/portal-empty-state.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:108:      src: "/images/portal/states/portal-error-state.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:111:      src: "/images/portal/states/portal-offline.webp",
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:12:        alt="Visual principal do Portal"
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:15:        sizes="(max-width: 768px) 100vw, 768px"
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:32:        alt="Nao deve ser anunciado"
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:36:        sizes="100vw"
beauty-core-ui/src/features/portal/components/portal-asset-image.tsx:1:import Image from "next/image";
beauty-core-ui/src/features/portal/components/portal-asset-image.tsx:12:  priority?: boolean;
beauty-core-ui/src/features/portal/components/portal-asset-image.tsx:23:  priority = false,
beauty-core-ui/src/features/portal/components/portal-asset-image.tsx:27:    <Image
beauty-core-ui/src/features/portal/components/portal-asset-image.tsx:28:      alt={decorative ? "" : alt}
beauty-core-ui/src/features/portal/components/portal-asset-image.tsx:31:      priority={priority}
beauty-core-ui/src/features/portal/components/portal-asset-image.tsx:32:      sizes={sizes}
beauty-core-ui/src/features/portal/components/portal-branding.tsx:3:import Image from "next/image";
beauty-core-ui/src/features/portal/components/portal-branding.tsx:19:        <Image
beauty-core-ui/src/features/portal/components/portal-branding.tsx:20:          alt=""
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:16:          alt=""
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:20:          priority
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:21:          sizes="(max-width: 768px) 100vw, 768px"
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:57:            alt=""
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:62:            priority
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:63:            sizes="(max-width: 1024px) 100vw, 50vw"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:66:              alt="Ilustra├º├úo do primeiro acesso"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:70:              priority
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:71:              sizes="(max-width: 1024px) 100vw, 45vw"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:101:            alt="Ilustra├º├úo do primeiro acesso"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:105:            priority
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:106:            sizes="(max-width: 1024px) 100vw, 45vw"
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:155:        assetAlt="Ilustracao de sucesso"
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:122:        assetAlt="Ilustracao de sucesso"
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:56:        alt={assetAlt ?? ""}
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:60:        sizes="(max-width: 640px) 80vw, 320px"
``

Nenhum asset será reprocessado ou substituído neste Chat.

## 6. Testes

- `e2e\portal-foundation.spec.ts`
- `src\app\portal\portal-private-routing.test.tsx`
- `src\app\portal\portal-routing.test.tsx`
- `src\features\agendamentos\components\agenda-calendar-accessibility.test.tsx`
- `src\features\agendamentos\components\agenda-visual-audit.test.ts`
- `src\features\arquivos\utils\arquivos-query-access.test.ts`
- `src\features\configuracoes\components\branding-preview-a11y.test.tsx`
- `src\features\dashboard\components\dashboard-accessibility.test.tsx`
- `src\features\financeiro\permissions\financeiro-module-access.test.ts`
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
- `src\services\auth\access-events.test.ts`

## 7. Checklist para implementação futura

| Critério | Obrigatório |
|---|---|
| Reutilização dos tokens existentes | Sim |
| Contraste e foco visível | Sim |
| Teclado e leitor de tela | Sim |
| Mobile-first | Sim |
| Sem overflow horizontal indevido | Sim |
| Alt ou decoração explícita nas imagens | Sim |
| Estados responsivos | Sim |
| Nenhuma alteração no Admin | Sim |

## 8. Restrições

- Nenhuma tela criada.
- Nenhum asset alterado.
- Nenhum endpoint criado.
- Nenhuma alteração no backend.
- Nenhum bypass de autenticação.
- Nenhuma funcionalidade dos Chats 63 e 64 antecipada.
- Nenhum commit, push, tag ou deploy executado.

## 9. Próximo bloco

O BLOCO 08/15 deverá auditar performance, carregamento de assets, bundle, cache, prefetch, lazy loading e riscos de regressão no Portal Cliente.
