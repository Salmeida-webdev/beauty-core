# Beauty Core 1.0 — Chat 59 Portal Foundation

## Escopo

Fechamento da foundation arquitetural do Portal Cliente, sem implementar fluxos de negócio dos Chats 60–64.

Baseline validada:

- Branch: `chat32-bullmq-enterprise`
- HEAD: `fe0bbb820a2670e95f970f9922e65ed3760f44d1`
- Backend preservado
- Stage vazio durante a execução

## Foundation entregue

- Rota `/portal`
- `PortalShell` com header, main, footer e skip link
- Navegação segura e responsiva
- Tenant e branding runtime
- Registry tipado de assets runtime
- Primitive `PortalAssetImage` com `next/image`
- Estados loading, empty, error, offline, success e access unavailable
- Auth foundation do cliente
- Estados unknown, restoring, anonymous, authenticated e denied
- Query keys públicas e privadas
- Query gating para dados privados
- Limpeza de cache privado
- Tratamento arquitetural de 401 e 403
- Sanitização de `returnTo`
- Focus-visible, touch targets, safe area e reduced motion

## Auditoria de performance e hardening

- Nenhum segundo `QueryClient`
- Nenhum API client paralelo
- Nenhum token storage criado
- Nenhum endpoint de negócio antecipado
- `next/image` preservado para imagens do Portal
- Carregamento eager não utilizado indevidamente
- Nenhum dynamic import necessário para esta foundation
- Cache privado cancelado e removido durante perda de acesso
- Callbacks e valor do `PortalAuthProvider` estabilizados com `useCallback` e `useMemo`
- Nenhum `console` ou debug permanente
- Nenhum sink `dangerouslySetInnerHTML` ou `innerHTML`
- Nenhuma referência a sources visuais no runtime
- Nenhuma seleção arbitrária de `empresaId`
- Navegação externa e redirects inseguros rejeitados

## Limites preservados

Ainda não foram implementados:

- OTP funcional
- Primeiro acesso
- Termos e consentimento
- Dashboard com dados reais
- Perfil funcional
- Histórico funcional
- Agendamentos
- Fidelidade
- Benefícios
- Pacotes
- Notificações funcionais
- WhatsApp funcional
- PWA real
- Service worker

## Validação

A suíte focada da foundation deve permanecer verde antes do Bloco 16.

O Bloco 15 não declara score Lighthouse nem substitui a suíte unitária completa, as integrações e os testes E2E previstos nos blocos seguintes.

## E2E DO PORTAL FOUNDATION

E2E executado nos seis viewports oficiais:

- 360x800
- 390x844
- 768x1024
- 1366x768
- 1440x900
- 1920x1080

Coberturas:

- render da rota `/portal`
- isolamento entre Admin e Portal
- branding fallback
- shell responsivo
- navegação sem destinos externos
- ausência de overflow horizontal
- keyboard e focus
- returnTo malicioso sem navegação externa
- ausência de `console.error`
- ausência de `pageerror`
- ausência de telas privadas ou de negócio antecipadas

A execução inicial e a execução com `--repeat-each=2` foram aprovadas.

## GLOBAL QUALITY GATE

- Frontend unit tests: PASS
- Frontend coverage: PASS
- Frontend lint: PASS
- Frontend typecheck: PASS
- Frontend build: PASS
- Frontend E2E: PASS
- Frontend audit: PASS
- Backend tests: PASS
- Prisma validate: PASS
- Backend build: PASS
- Backend audit: PASS
- Portal registry and runtime assets: 25/25 PASS
- Portal production hardening scan: PASS

**PORTAL FOUNDATION: APPROVED**
