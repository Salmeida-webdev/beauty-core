# Beauty Core 1.0 — Chat 52

## Financeiro, pagamentos, comissões e relatórios

Data de fechamento técnico: 29/08/2026.

## 1. Escopo

O Chat 52 implementa a gestão financeira operacional do Beauty Core 1.0 usando somente contratos reais do backend.

Inclui:

- categorias financeiras;
- movimentações financeiras;
- filtros, ordenação, paginação e URL state;
- criação e edição de movimentações;
- pagamento;
- cancelamento;
- comissões;
- relatórios financeiros;
- RBAC e navegação;
- responsividade e acessibilidade;
- testes unitários, integração e E2E.

## 2. Backend

Foi criado o DTO específico `ListMovimentacoesQueryDto` para a listagem financeira.

Filtros reais suportados:

- `categoriaId`;
- `clienteId`;
- `agendamentoId`;
- `tipo`;
- `status`;
- `page`;
- `limit`;
- `orderBy`;
- `orderDirection`.

Não foram adicionados `empresaId`, `unidadeId`, `dataInicio` ou `dataFim` à listagem.

## 3. Categorias

Tipos reais: `RECEITA` e `DESPESA`.

Foram implementadas listagem, criação, edição e inativação.

## 4. Movimentações

Status reais: `PENDENTE`, `PAGO`, `CANCELADO` e `ESTORNADO`.

Formas de pagamento reais: `DINHEIRO`, `PIX`, `CARTAO_CREDITO`, `CARTAO_DEBITO`, `TRANSFERENCIA`, `BOLETO` e `OUTRO`.

O frontend não calcula valores financeiros autoritativos.

## 5. Pagamento

Endpoint real: `PATCH /financeiro/:id/pagar`.

Payload real: somente `formaPagamento`.

Somente movimentações `PENDENTE` oferecem registro de pagamento.

Não existe entidade paralela de pagamento, parcelamento, pagamento parcial ou endpoint `/pagamentos`.

## 6. Cancelamento

Endpoint real: `PATCH /financeiro/:id/cancelar`.

A operação não possui payload.

Uma movimentação `PAGO` pode ser cancelada, mas a UI informa que isso não representa estorno externo de processador.

Não foi criada mutation fictícia de estorno.

## 7. Comissões

Payload real de criação: `profissionalId`, `agendamentoId`, `valorServico` e `percentual`.

O frontend não envia `valorComissao`; o backend realiza o cálculo.

Pagamento real: `PATCH /comissoes/:id/pagar`.

## 8. Relatórios

Endpoints utilizados:

- `GET /financeiro/resumo`;
- `GET /financeiro/fluxo-caixa`;
- `GET /financeiro/receitas-mes`;
- `GET /financeiro/despesas-mes`.

O módulo não utiliza `/analytics/financeiro`, evitando duplicação do Dashboard Executivo.

## 9. RBAC

| Role         | Financeiro |
| ------------ | ---------- |
| ADMIN        | Permitido  |
| GERENTE      | Permitido  |
| SUPER_ADMIN  | Bloqueado  |
| RECEPCAO     | Bloqueado  |
| PROFISSIONAL | Bloqueado  |
| CLIENTE      | Bloqueado  |

`SUPER_ADMIN` permanece fora dos módulos tenant.

## 10. Tenant e segurança

O frontend Financeiro não envia `empresaId`, não cria tenant arbitrário, não cria segunda instância Axios e não cria segundo QueryClient.

As mutations críticas utilizam `retry: false`, não usam optimistic update e bloqueiam double submit.

## 11. Testes do Chat 52

Suíte unitária consolidada: 48 arquivos, 186 testes, 186 aprovados.

Backend focado do DTO: 5/5 testes aprovados.

Integração transversal: 15/15 testes aprovados.

E2E oficial: 11/11 cenários aprovados.

`repeat-each=2`: 22/22 execuções aprovadas.

Cancelamento isolado adicional: 4/4 execuções aprovadas.

## 12. E2E e responsividade

Viewports validados:

- 360x800;
- 390x844;
- 768x1024;
- 1366x768;
- 1440x900;
- 1920x1080.

A fixture E2E usa paginação flat: `data`, `total`, `page`, `limit` e `totalPages`.

Movimentações são renderizadas como `article`.

A ação real de pagamento possui accessible name `Registrar pagamento`.

## 13. Estado antes do quality gate global

- TypeScript aprovado;
- ESLint E2E com zero warnings;
- `git diff --check` aprovado;
- stage vazio;
- nenhum commit;
- nenhum push.

## 14. Quality gate global

Status final: **aprovado para o escopo do Chat 52**, com exceção documentada do ESLint global histórico do backend.

### Frontend — gate global

- `npm run validate`: aprovado com exit code 0.
- Vitest global: **166 arquivos de teste / 734 testes aprovados**.
- Cobertura configurada: **100% de statements, branches, functions e lines**.
- ESLint frontend: aprovado.
- TypeScript (`tsc --noEmit`): aprovado.
- Build Next.js: aprovado; rota `/financeiro` incluída no build.
- Playwright global: **63/63 testes aprovados**.
- `npm audit`: **0 vulnerabilidades**.

### Backend — gates globais e focados

- Jest global: **26 suites / 1462 testes aprovados**.
- `prisma validate`: schema válido.
- ESLint focado nos três arquivos backend alterados pelo Chat 52: aprovado com **0 erros e 0 warnings**.
- ESLint global backend: executado, porém **não aprovado por dívida técnica histórica fora do escopo do Chat 52** — **4923 problemas**, sendo **4652 erros e 271 warnings**.
- Nenhuma correção massiva da dívida histórica foi aplicada.
- NestJS `npm run build`: aprovado com exit code 0.
- `npm audit --audit-level=high`: aprovado; saída final **`found 0 vulnerabilities`**.

### Regressão específica do Chat 52

- Suíte unitária consolidada do Chat 52: **48 arquivos / 186 testes aprovados**.
- DTO backend `ListMovimentacoesQueryDto`: **5/5 testes aprovados**.
- Integração transversal `chat52-financeiro-flow.integration.test.ts`: **15/15 testes aprovados**.
- E2E Chat 52: **11/11 testes aprovados**.
- E2E com `--repeat-each=2`: **22/22 execuções aprovadas**.
- Viewports validados: `360x800`, `390x844`, `768x1024`, `1366x768`, `1440x900` e `1920x1080`.

### Auditorias arquiteturais finais

- Padrões proibidos: nenhuma violação encontrada no código de produção do Financeiro.
- Tenant: frontend não envia `empresaId`; DTO público não o expõe; backend deriva tenant via `getEmpresaId(req)`.
- Endpoints: Financeiro utiliza somente contratos reais do backend.
- `/analytics/financeiro`: removido do módulo Financeiro por ser configuração morta; usos legítimos do Dashboard Executivo foram preservados.
- Endpoints fictícios `/pagamentos` e `/estornar`: ausentes do Financeiro.
- RBAC efetivo: allow-list exatamente `ADMIN` e `GERENTE`.
- `RECEPCAO`, `PROFISSIONAL`, `SUPER_ADMIN` e `CLIENTE`: fora da allow-list financeira.
- Controllers de Financeiro, Categorias Financeiras e Comissões: `@Roles('ADMIN', 'GERENTE')`.
- `JwtAuthGuard` e `RolesGuard`: confirmados.
- Suíte focada final de RBAC/navegação: **29/29 testes aprovados**.

### Higiene do repositório

- Artefatos removidos/ausentes: frontend `coverage`, `.next`, `playwright-report`, `test-results`; backend `coverage`, `dist`.
- `node_modules` foi preservado.
- Nenhum temporário ou backup pertence ao working tree atual ou ao escopo do Chat 52.
- **44 backups históricos de chats anteriores foram preservados deliberadamente**, pois não pertencem ao Chat 52.
- Stage permanece vazio nesta etapa.
- `git diff --check`: aprovado.

> Exceção registrada: o ESLint global do backend continua bloqueado por dívida técnica histórica preexistente. O código backend alterado pelo Chat 52 está lint-clean e todos os demais gates executáveis do escopo foram aprovados.
