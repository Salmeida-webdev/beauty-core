# Chat 49 — Gestão de Clientes e Perfil 360

## 1. Objetivo

O Chat 49 implementa a Gestão de Clientes do painel administrativo do Beauty Core 1.0.

A entrega substitui o estado indisponível da navegação por um módulo real, protegido, responsivo e integrado aos contratos existentes do backend.

O módulo foi preparado para operação comercial e administrativa, contemplando listagem server-side, cadastro, edição, inativação, foto, Perfil 360, fidelidade, pacotes e ações de privacidade previstas pela LGPD.

## 2. Resultado executivo

A implementação contempla:

- navegação administrativa para Clientes;
- rota de listagem em `/clientes`;
- rota dinâmica de perfil em `/clientes/[id]`;
- listagem paginada pelo servidor;
- busca com debounce;
- filtros e ordenação;
- sincronização do estado da listagem com a URL;
- preservação dos filtros ao acessar e retornar do perfil;
- criação de cliente;
- edição cadastral;
- inativação com confirmação;
- upload de foto;
- fallback visual para foto indisponível;
- Perfil 360;
- informações de portal e consentimento;
- fidelidade;
- nível atual;
- benefício disponível;
- histórico de pontos;
- pacotes vinculados;
- exportação de dados LGPD;
- anonimização permanente com confirmação;
- permissões por ação;
- estados de carregamento, vazio, erro e recuperação;
- responsividade desktop e mobile;
- validação de respostas da API;
- testes unitários, integração e E2E;
- build de produção;
- documentação dos gaps existentes no Backend 1.1.

## 3. Rotas e navegação

As rotas implementadas são:

- `src/app/(dashboard)/clientes/page.tsx`;
- `src/app/(dashboard)/clientes/[id]/page.tsx`.

A navegação administrativa foi atualizada em:

- `src/config/admin-navigation.ts`;
- `src/config/admin-navigation.test.ts`.

O item Clientes deixou de ser apresentado como indisponível e passou a encaminhar usuários autorizados para `/clientes`.

A página do App Router permanece enxuta. As regras do domínio, queries, formulários e apresentação ficam concentradas na feature de Clientes.

## 4. Arquitetura da feature

A implementação está organizada em:

- `src/features/clientes/components`;
- `src/features/clientes/forms`;
- `src/features/clientes/hooks`;
- `src/features/clientes/permissions`;
- `src/features/clientes/queries`;
- `src/features/clientes/schemas`;
- `src/features/clientes/services`;
- `src/features/clientes/types`;
- `src/features/clientes/utils`.

Entre os componentes principais estão:

- listagem de clientes;
- formulário cadastral;
- diálogo de criação e edição;
- Perfil 360;
- seções complementares do perfil;
- ações LGPD.

A arquitetura separa:

- apresentação;
- validação;
- transformação de payload;
- acesso à API;
- cache;
- permissões;
- sincronização da URL;
- download LGPD;
- tratamento de erros.

Essa separação reduz acoplamento, facilita testes e prepara o módulo para evolução sem concentrar regras nas páginas.

## 5. Listagem server-side

A listagem utiliza o contrato paginado real do backend.

Parâmetros suportados:

- `page`;
- `limit`;
- `search`;
- `orderBy`;
- `orderDirection`.

Campos permitidos para ordenação:

- `nome`;
- `telefone`;
- `email`;
- `createdAt`;
- `updatedAt`;
- `ultimoAcessoPortal`.

Direções permitidas:

- `asc`;
- `desc`.

A busca usa debounce para reduzir requisições enquanto o usuário digita.

O estado reproduzível da listagem é mantido na query string. Pesquisa, página, limite e ordenação podem ser preservados durante navegação, atualização da página e retorno do Perfil 360.

## 6. Estados da listagem

A interface diferencia explicitamente:

- carregamento inicial;
- listagem vazia sem pesquisa;
- pesquisa sem resultados;
- erro da API;
- recuperação por retry manual;
- paginação;
- dados carregados.

Uma falha controlada pode ser recuperada sem recarregar toda a aplicação.

Os links para o perfil carregam o estado atual da listagem, permitindo retornar ao mesmo contexto operacional.

## 7. Gestão cadastral

O formulário trabalha somente com campos aceitos pelo DTO real.

A gestão cadastral contempla:

- criação;
- edição;
- validação Zod;
- transformação de payload;
- exibição de erros normalizados;
- invalidação das listagens após mutações;
- atualização do detalhe após edição;
- bloqueio de submissões concorrentes.

A inativação utiliza endpoint dedicado e exige confirmação explícita.

Não foi implementada exclusão física. A inativação preserva os vínculos históricos e operacionais do cliente.

## 8. Perfil 360

O Perfil 360 apresenta informações reais do cliente, incluindo:

- nome;
- telefone;
- email;
- foto;
- data de nascimento;
- observações;
- estado ativo ou inativo;
- datas de criação e atualização;
- acesso ao portal;
- aceite de termos;
- data do aceite;
- último acesso ao portal.

O perfil também integra:

- edição cadastral;
- upload de foto;
- inativação;
- fidelidade;
- histórico de pontos;
- nível atual;
- benefício disponível;
- pacotes;
- exportação LGPD;
- anonimização LGPD.

O retorno à listagem preserva os filtros recebidos na navegação.

## 9. Contratos reais utilizados

| Método | Endpoint | Finalidade |
|---|---|---|
| `GET` | `/clientes` | Listagem paginada, pesquisa e ordenação |
| `GET` | `/clientes/:clienteId` | Detalhe do cliente |
| `POST` | `/clientes` | Criação de cliente |
| `PATCH` | `/clientes/:clienteId` | Atualização cadastral |
| `PATCH` | `/clientes/:clienteId/inativar` | Inativação do cliente |
| `POST` | `/arquivos/clientes/:clienteId/foto` | Upload da foto |
| `GET` | `/fidelidade/cliente/:clienteId` | Saldo de pontos |
| `GET` | `/fidelidade/historico/:clienteId` | Histórico de pontos |
| `GET` | `/fidelidade/beneficio-disponivel/:clienteId` | Benefício disponível |
| `GET` | `/fidelidade/nivel-atual/:clienteId` | Nível atual |
| `GET` | `/clientes-pacotes/cliente/:clienteId` | Pacotes vinculados |
| `GET` | `/lgpd/exportar-cliente/:clienteId` | Exportação dos dados |
| `POST` | `/lgpd/anonimizar-cliente/:clienteId` | Anonimização permanente |

Nenhum endpoint foi inventado no frontend.

As respostas são validadas antes de alimentar os componentes.

Os schemas foram alinhados ao Zod 4, incluindo registros com chave e valor declarados explicitamente.

## 10. Dados, queries e cache

A camada de dados utiliza TanStack Query com:

- chaves centralizadas;
- opções reutilizáveis;
- queries condicionais;
- retry controlado;
- invalidação após mutações;
- remoção de detalhes privados após anonimização;
- recuperação isolada de seções;
- separação entre listagem e perfil.

As seções complementares do perfil usam consultas independentes.

Uma falha na consulta de pacotes, por exemplo, não derruba as informações cadastrais, a fidelidade ou as demais seções do perfil.

O retry de uma seção isolada refaz somente a consulta afetada.

## 11. Foto do cliente

O upload utiliza `FormData` e o endpoint real de Arquivos.

A permissão de upload é independente da permissão geral de gestão cadastral.

O avatar possui fallback quando:

- o cliente não possui foto;
- a URL da foto falha;
- uma foto anteriormente inválida é substituída por outra URL.

O fallback foi implementado sem atualização síncrona de estado dentro de `useEffect`, evitando renderizações em cascata rejeitadas pelo ESLint do React.

## 12. Privacidade e LGPD

A exportação LGPD:

- consulta o endpoint protegido;
- valida o retorno;
- serializa os dados em JSON;
- cria um `Blob` em memória;
- inicia o download no navegador;
- utiliza nome de arquivo sanitizado;
- revoga a URL temporária;
- não persiste o conteúdo exportado no estado global.

O nome do arquivo segue o padrão:

- `cliente-<clienteId>-lgpd.json`.

A anonimização:

- exige confirmação;
- informa que a operação é permanente;
- chama o endpoint sem body artificial;
- preserva movimentações financeiras, vínculos técnicos e auditoria histórica conforme contrato do backend;
- invalida as listagens;
- remove detalhes privados do cache;
- fecha o diálogo após sucesso;
- redireciona para a listagem;
- apresenta erros normalizados quando falha.

## 13. Segurança e permissões

As permissões foram alinhadas aos controllers reais.

| Capacidade | Roles autorizadas |
|---|---|
| Acessar listagem e perfil | `ADMIN`, `GERENTE`, `RECEPCAO`, `PROFISSIONAL` |
| Criar, editar e inativar | `ADMIN`, `GERENTE`, `RECEPCAO`, `PROFISSIONAL` |
| Enviar foto | `ADMIN`, `GERENTE`, `RECEPCAO` |
| Exportar ou anonimizar via LGPD dentro do módulo | `ADMIN` |

A role `SUPER_ADMIN` não recebe acesso ao módulo Clientes porque o controller principal de Clientes não a inclui.

Embora o controller LGPD também aceite `SUPER_ADMIN`, não foi criado um acesso indireto ao Perfil 360 para contornar a proteção do módulo principal.

A implementação preserva:

- autenticação administrativa;
- guards existentes;
- contexto da empresa;
- isolamento de tenant;
- tratamento centralizado de 401 e 403;
- fluxo de sessão do Chat 47;
- limpeza de dados privados;
- navegação protegida.

## 14. Acessibilidade, responsividade e experiência

Foram validados:

- hierarquia de títulos;
- labels dos formulários;
- descrições e mensagens de erro;
- nomes acessíveis para botões;
- estados de processamento;
- confirmações destrutivas;
- feedback por toast;
- navegação por links;
- tabela desktop;
- cartões responsivos;
- listagem mobile;
- Perfil 360 mobile;
- ausência de overflow global em 375 × 812;
- seleção do conteúdo realmente visível em layouts responsivos;
- compatibilidade com o shell administrativo.

## 15. Gaps confirmados do Backend 1.1

Três seções desejáveis do Perfil 360 não possuem contrato seguro de listagem por cliente no Backend 1.1.

### Agendamentos

O endpoint de listagem de agendamentos recebe apenas paginação e não oferece filtro dedicado por `clienteId`.

### Notificações

A listagem de notificações é vinculada ao usuário administrativo autenticado, não a um cliente específico.

Embora o modelo possa conter `clienteId`, não existe contrato de listagem segura do histórico de notificações por cliente.

### Documentos e arquivos

O modelo e o upload privado aceitam vínculo com `clienteId`.

Entretanto, os endpoints de listagem disponíveis trabalham com paginação geral ou tipo de arquivo, sem filtro dedicado por cliente.

### Decisão de segurança

O frontend não consulta coleções globais para filtrá-las no navegador.

Essa decisão evita:

- transferência desnecessária de dados;
- exposição de registros não relacionados;
- filtragem incompleta por paginação;
- risco de vazamento entre clientes;
- falsa impressão de suporte contratual;
- degradação de performance.

Para concluir essas seções em uma versão futura, o backend deverá oferecer endpoints ou filtros server-side por `clienteId`, mantendo validação de tenant e autorização.

## 16. Estratégia de testes

### Testes de Clientes

A feature possui 22 arquivos de testes e 109 testes cobrindo:

- schemas;
- parâmetros de listagem;
- serviços da API;
- payloads;
- formulário;
- erros do formulário;
- debounce;
- sincronização da URL;
- chaves de query;
- opções de query;
- permissões;
- criação;
- edição;
- upload de foto;
- inativação;
- Perfil 360;
- fidelidade;
- pacotes;
- LGPD;
- estados de erro;
- retry manual;
- preservação de filtros.

### Testes E2E do Chat 49

O arquivo `e2e/chat49-clientes.spec.ts` possui 6 cenários:

1. listagem com filtros sincronizados na URL e na API;
2. Perfil 360 com preservação dos filtros no retorno;
3. recuperação da listagem após erro controlado;
4. permissões de `PROFISSIONAL`;
5. exportação e anonimização LGPD por `ADMIN`;
6. ausência de overflow na listagem e no perfil mobile.

A fixture `e2e/fixtures/chat49-clientes.fixture.ts` centraliza:

- autenticação simulada;
- dados cadastrais;
- respostas paginadas;
- fidelidade;
- pacotes;
- falhas controladas;
- histórico de requisições;
- respostas LGPD;
- monitoramento de console e runtime.

## 17. Resultado consolidado dos testes

| Validação | Resultado |
|---|---:|
| Arquivos Vitest globais | 62/62 |
| Testes Vitest globais | 262/262 |
| Cobertura considerada pela configuração | 100% |
| Arquivos de teste de Clientes | 22/22 |
| Testes de Clientes | 109/109 |
| E2E Chat 49 | 6/6 |
| E2E global | 28/28 |
| Typecheck | Aprovado |
| ESLint | Aprovado, zero warnings |
| Build | Aprovado |
| Auditoria de dependências | 0 vulnerabilidades |
| Diff check | Aprovado |
| Backend | Preservado |

A cobertura considerada pela configuração do projeto alcançou:

- 100% de statements;
- 100% de branches;
- 100% de functions;
- 100% de lines.

## 18. Build de produção

O build foi validado com:

- Next.js 16.3.3;
- Turbopack;
- compilação otimizada;
- TypeScript;
- coleta de dados;
- geração estática;
- finalização das páginas;
- manifesto do App Router.

Rotas confirmadas:

- `/clientes` como rota estática;
- `/clientes/[id]` como rota dinâmica.

As duas rotas foram localizadas em `.next/server/app-paths-manifest.json`.

Métricas observadas:

| Métrica | Resultado |
|---|---:|
| Arquivos estáticos | 45 |
| Tamanho estático total | 2,09 MB |
| Maior chunk JavaScript | 355,63 KB |
| Geração estática | 10/10 |
| Rota `/clientes` | Confirmada |
| Rota `/clientes/[id]` | Confirmada |

Os arquivos são divididos pelo Next.js e incluem chunks compartilhados. O maior chunk não representa necessariamente o carregamento exclusivo do módulo Clientes.

## 19. Compatibilidade preservada

A regressão completa confirmou compatibilidade com:

- Design System do Chat 45;
- autenticação do Chat 47;
- Dashboard Executivo do Chat 48;
- rota raiz;
- login;
- acesso negado;
- sessões;
- logout atual;
- logout global;
- shell administrativo;
- sidebar desktop;
- drawer mobile;
- temas;
- Clientes;
- Perfil 360;
- LGPD.

Os 28 testes E2E globais foram aprovados.

Nenhum arquivo do backend foi alterado durante o Chat 49.

## 20. Decisões técnicas

- A página do App Router atua somente como ponto de entrada.
- As respostas da API são validadas antes de chegar à interface.
- O estado da listagem é reproduzível pela URL.
- A busca utiliza debounce.
- Listagem e detalhe possuem chaves de cache independentes.
- Mutações invalidam somente os dados relacionados.
- Falhas complementares do perfil são isoladas.
- Exclusão física foi substituída pelo contrato real de inativação.
- Ações destrutivas exigem confirmação.
- Dados LGPD exportados não são persistidos no estado global.
- Dados privados são removidos do cache após anonimização.
- Permissões são verificadas por capacidade, não apenas por página.
- Gaps do backend não são contornados com filtragem insegura no navegador.
- O backend foi preservado integralmente.

## 21. Estado final do Chat 49

A Gestão de Clientes está:

- implementada;
- integrada;
- protegida;
- responsiva;
- acessível;
- validada contra os contratos reais;
- coberta por testes unitários e de integração;
- coberta por E2E;
- compilável em produção;
- auditada;
- documentada;
- preparada para o stage seletivo e commit final.

Os gaps do Backend 1.1 estão documentados e não comprometem as funcionalidades entregues.

Nenhum commit ou push deve ser executado antes da auditoria final de escopo e do stage seguro.
