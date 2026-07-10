# Beauty Core UI

Frontend administrativo do **Beauty Core 1.0**, um SaaS premium, multiempresa e white-label direcionado a clínicas de estética, salões, barbearias, profissionais autônomos e redes com múltiplas unidades.

## Status

**Chat 44 — Fundação profissional do frontend administrativo.**

A fundação contém arquitetura, providers, integração HTTP, autenticação, roles, tenant, formulários e testes. Os módulos funcionais e o Design System completo serão implementados nos próximos chats.

## Stack

- Next.js 16 com App Router
- React 19
- TypeScript estrito
- Tailwind CSS 4
- shadcn/ui
- TanStack Query
- Axios
- Zustand
- Zod
- React Hook Form
- next-themes
- Sonner
- date-fns
- Recharts
- Vitest e Testing Library
- Playwright

## Pré-requisitos

- Node.js 22 ou versão compatível definida pelo projeto
- npm 10 ou superior
- Backend Beauty Core disponível para fluxos integrados

## Instalação

```bash
npm install
```

Para instalar o navegador utilizado nos testes E2E:

```bash
npx playwright install chromium
```

## Variáveis de ambiente

Copie o arquivo de exemplo:

```bash
copy .env.example .env.local
```

Variáveis públicas previstas:

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_APP_NAME=Beauty Core
NEXT_PUBLIC_APP_ENV=development
```

Não inclua tokens, senhas, secrets ou chaves privadas em variáveis `NEXT_PUBLIC_*`.

## Execução

```bash
npm run dev
```

## Scripts

| Script | Finalidade |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build otimizado de produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | ESLint sem tolerância a warnings |
| `npm run typecheck` | Verificação TypeScript |
| `npm run test` | Testes unitários |
| `npm run test:watch` | Testes em modo interativo |
| `npm run test:coverage` | Testes com cobertura |
| `npm run test:e2e` | Smoke tests Playwright |
| `npm run test:e2e:ui` | Playwright em modo visual |
| `npm run validate` | Validação completa da fundação |

## Estrutura principal

```text
src/
├── app/                  # App Router, layout e providers
├── components/           # Componentes compartilhados e shadcn/ui
├── config/               # Ambiente público tipado
├── constants/            # Roles e constantes globais
├── features/
│   ├── auth/             # Contratos, API, sessão, formulários e permissões
│   └── tenant/           # Tipos, schema e configuração white-label
├── lib/                  # Utilitários compartilhados
├── providers/            # Query, autenticação, tema, tenant e toasts
├── services/
│   ├── api/              # Cliente Axios e normalização de erros
│   └── auth/             # Tokens e coordenação de refresh
├── stores/               # Estado local resumido com Zustand
└── test/                 # Configuração dos testes

e2e/                      # Smoke tests Playwright
docs/                     # Relatórios técnicos
```

## Arquitetura resumida

- TanStack Query é responsável por dados e cache de servidor.
- Zustand armazena somente estado local e identidade resumida da sessão.
- Axios está centralizado em clientes público e autenticado.
- O access token permanece somente em memória.
- O refresh token utiliza `sessionStorage` por limitação do contrato atual.
- O refresh é rotativo e protegido contra concorrência.
- O backend continua sendo a autoridade definitiva de autorização.
- Roles e permissões do frontend servem para navegação e experiência.
- Branding e configurações públicas ficam centralizados no tenant.

## Integração com o backend

A fundação está preparada para os endpoints administrativos:

```text
POST   /auth/login
POST   /auth/refresh
POST   /auth/logout
POST   /auth/logout-all
GET    /auth/me
GET    /auth/sessoes
DELETE /auth/sessoes/:sessaoId
```

O backend permanece congelado na versão 1.0 durante o Chat 44.

## Contribuição

1. Não espalhe chamadas Axios em páginas ou componentes.
2. Não use Zustand como cache paralelo de dados do servidor.
3. Não armazene access token em `localStorage`.
4. Não registre tokens, credenciais ou dados sensíveis.
5. Valide entradas externas com Zod.
6. Preserve o isolamento entre tenants.
7. Mantenha testes para regras críticas.
8. Execute `npm run validate` antes de concluir uma alteração.

## Próxima fase

O Chat 45 desenvolverá o Design System premium e a identidade visual definitiva, sem alterar as decisões estruturais consolidadas nesta fundação.
