# Beauty Core 1.0 — Chat 51 — Agenda e Agendamentos

Data de fechamento: 2026-08-29

## 1. Status

Chat 51 implementado e validado sobre o baseline:

`a107513792afad0cfeaab746021c0bb8e68dac5e`

Branch:

`chat32-bullmq-enterprise`

O Chat 51 adiciona a Agenda operacional do painel administrativo sem criar contratos fictícios de backend.

## 2. Backend real utilizado

Endpoints principais:

- POST `/agendamentos`
- GET `/agendamentos`
- GET `/agendamentos/:id`
- PATCH `/agendamentos/:id`
- PATCH `/agendamentos/:id/cancelar`

Lookups least-privilege adicionados no escopo de Agendamentos:

- GET `/agendamentos/opcoes/profissionais`
- GET `/agendamentos/opcoes/unidades`

Clientes reutilizam o contrato real de `/clientes`.
Serviços reutilizam o contrato real de `/servicos`.

## 3. Roles

Agenda disponível somente para:

- ADMIN
- GERENTE
- RECEPCAO
- PROFISSIONAL

SUPER_ADMIN não recebe a Agenda tenant.

O E2E confirma que SUPER_ADMIN não dispara consulta de Agendamentos.

## 4. Isolamento tenant

O tenant continua sendo derivado no backend pela autenticação.

O frontend de Agenda não envia `empresaId`.

As respostas backend podem conter campos extras, mas os schemas runtime do frontend selecionam somente o contrato necessário.

## 5. Status

Status reais:

- PENDENTE
- CONFIRMADO
- EM_ANDAMENTO
- CONCLUIDO
- CANCELADO
- FALTOU

A interface não inventa máquina de transições.

CANCELADO é separado das ações gerais e utiliza a rota dedicada de cancelamento.

## 6. Query e filtros

Filtros server-side suportados:

- dataInicio
- dataFim
- status
- clienteId
- profissionalId
- servicoId
- unidadeId

Ordenações suportadas:

- dataHoraInicio
- dataHoraFim
- status
- createdAt
- updatedAt

Foi criado `ListAgendamentosQueryDto` para alinhar o controller ao contrato realmente utilizado pelo service.

## 7. Datas e timezone

Datas de formulário `datetime-local` são convertidas para ISO 8601 antes do envio.

O frontend não força horário comercial fictício.

A semana visual começa na segunda-feira.

A filtragem backend por período atua sobre `dataHoraInicio`.

Não foi introduzida regra adicional de timezone de negócio sem contrato backend explícito.

## 8. Arquitetura frontend

Rota administrativa:

`/agenda`

Estrutura principal:

- types
- schemas
- permissions
- services
- queries
- forms
- hooks
- utils
- components

Tecnologias reutilizadas:

- Next.js App Router
- TanStack Query
- React Hook Form
- Zod
- date-fns
- Design System existente
- shadcn/Radix
- Playwright
- Vitest

Nenhuma dependência nova foi adicionada.

## 9. Visualizações

A Agenda possui:

- Dia
- Semana
- Lista

Calendar e lista utilizam os mesmos filtros operacionais.

O calendário não usa horários comerciais inventados.

## 10. URL state

A URL persiste:

- view
- date
- status
- clienteId
- profissionalId
- servicoId
- unidadeId

UUIDs inválidos e status inválidos são descartados pelo parsing.

O status legado `AGENDADO` não faz parte do contrato atual.

## 11. Seletores relacionados

Seletores integrados:

- Cliente
- Serviço
- Profissional
- Unidade

Cliente, profissional e unidade usam busca assíncrona quando aplicável.

Serviços reutilizam a listagem real existente.

Nenhuma relação fictícia profissional-serviço ou profissional-unidade foi criada.

## 12. Criação

POST `/agendamentos` integrado.

Campos:

- cliente
- serviço
- profissional
- unidade
- início
- fim
- observações

O status inicial permanece delegado ao backend.

O frontend não calcula duração automaticamente a partir do serviço.

## 13. Detalhe, edição e reagendamento

GET `/agendamentos/:id` alimenta o detalhe.

PATCH `/agendamentos/:id` permite edição dos campos sustentados pelo DTO real.

A interface permite editar:

- cliente
- serviço
- profissional
- unidade
- início
- fim
- observações

Assim, início e fim podem ser alterados pelo PATCH real, cobrindo o reagendamento sustentado pelo contrato.

Status fica fora do formulário geral de edição e possui fluxo próprio.

## 14. Status e cancelamento

Mudança geral de status:

PATCH `/agendamentos/:id`

Cancelamento:

PATCH `/agendamentos/:id/cancelar`

Ambas as ações críticas exigem confirmação.

Não há optimistic update.

O backend permanece autoridade final.

## 15. Conflitos e disponibilidade

Gap conhecido do Backend 1.1:

Não foi comprovado endpoint de disponibilidade.

Não foi comprovado endpoint dedicado de conflito/sobreposição.

Não foi comprovada proteção transacional/concurrency para dois agendamentos simultâneos no mesmo horário.

Por isso o frontend não afirma:

- horário disponível;
- profissional disponível;
- ausência de conflito.

Nenhuma simulação de disponibilidade foi criada.

## 16. Cache

Namespaces de cache:

- all
- list
- calendar
- detail

Após mutations, list/calendar são invalidados pelo namespace de Agendamentos e o detail relevante é atualizado quando aplicável.

Mutations críticas usam `retry: false`.

Não há optimistic update.

## 17. Estados de interface

Foram cobertos:

- loading
- empty
- error
- retry
- detail não encontrado
- erros normalizados de mutation

## 18. Acessibilidade

Foram implementados e testados:

- eventos acionáveis por teclado;
- accessible names contextuais;
- regiões nomeadas;
- `aria-busy`;
- `aria-current`;
- grupos de navegação;
- `aria-pressed`;
- status textual;
- dialogs e confirmações acessíveis;
- reduced motion.

## 19. Responsividade

E2E validado em:

- 360 × 800
- 390 × 844
- 768 × 1024
- 1366 × 768
- 1440 × 900
- 1920 × 1080

Nenhuma dessas resoluções apresentou overflow horizontal global.

## 20. Dark mode e white-label

A Agenda usa tokens semânticos do Design System.

Não foram adicionadas cores hex/rgb hardcoded no módulo visual.

Dark mode e white-label permanecem dependentes dos tokens globais.

## 21. Performance

Foram evitados:

- query por evento;
- query por cliente em cada evento;
- N+1 visual;
- cálculos derivados repetidos desnecessariamente.

Eventos repetitivos e cálculos de calendário utilizam memoização onde apropriado.

A consulta de calendário mantém limite de segurança e avisa quando o total do backend excede os itens carregados.

## 22. Testes

Antes do quality gate final, o Chat 51 alcançou:

- 542/542 testes Vitest no frontend;
- 100% de statements;
- 100% de branches;
- 100% de functions;
- 100% de lines.

E2E Chat 51:

- 10/10 cenários aprovados;
- repeat-each sem flakiness.

E2E global:

- 52/52 aprovados.

O Bloco 19 reexecuta o `npm run validate` completo.

## 23. Backend quality gates

Como o backend foi alterado, o fechamento executa:

- testes cirúrgicos de query DTO;
- testes cirúrgicos de options;
- suíte Chat 51 de Agendamentos;
- regressão global Jest;
- Prisma validate;
- build NestJS;
- ESLint do novo escopo;
- ESLint semântico de controller/service sem formatar dívida histórica;
- npm audit.

## 24. Segurança

Regras preservadas:

- frontend não envia `empresaId`;
- nenhum secret novo;
- nenhum endpoint fictício;
- nenhum mock em produção;
- nenhuma máquina de transições inventada;
- nenhum optimistic update crítico;
- nenhum `npm audit fix --force`;
- nenhum `git reset --hard`;
- nenhum `git clean -fd`.

Mocks existem apenas no ambiente de testes E2E.

## 25. Gaps Backend 1.1

Permanecem fora do Chat 51:

1. endpoint explícito de disponibilidade;
2. contrato explícito de detecção de conflito/sobreposição;
3. garantia comprovada de concorrência para reservas simultâneas;
4. regra de timezone de negócio explicitamente configurável, caso seja necessária.

Esses pontos não foram simulados no frontend.

## 26. Estado final

O módulo Agenda possui:

- calendário Dia;
- calendário Semana;
- Lista;
- filtros server-side;
- URL state;
- cliente;
- serviço;
- profissional;
- unidade;
- criação;
- detalhe;
- edição;
- reagendamento pelos campos temporais do PATCH;
- status;
- cancelamento dedicado;
- loading;
- empty;
- error;
- retry;
- responsividade;
- acessibilidade;
- dark mode;
- white-label;
- hardening unitário;
- integração;
- E2E.

Conflito/disponibilidade permanecem documentados como gap real de backend.

Nenhum commit ou push é executado no Bloco 19.

O commit final pertence exclusivamente ao Bloco 20/20.
