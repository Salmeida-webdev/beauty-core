# ADR 0002 — Multi-Tenant Strategy

## Status

Aceito.

## Contexto

O Beauty Core atende múltiplas empresas dentro da mesma base de produto. Cada empresa deve operar de forma isolada, impedindo vazamento de dados entre tenants e garantindo que usuários administrativos acessem apenas recursos permitidos.

O produto também prevê operação white-label, com front-end e domínio personalizados por cliente, mas backend reutilizável.

## Decisão

A estratégia multi-tenant oficial é isolamento lógico forte por `empresaId`.

Diretrizes:

- entidades de negócio carregam `empresaId`;
- consultas administrativas devem filtrar por `empresaId`;
- usuários ADMIN, GERENTE, RECEPCAO e PROFISSIONAL operam restritos ao tenant;
- SUPER_ADMIN pode operar globalmente quando explicitamente permitido;
- autenticação deve carregar identidade, role e tenant;
- validações de tenant devem ocorrer antes de leitura, escrita, atualização ou exclusão;
- endpoints públicos usam slug/domínio para resolver tenant;
- endpoints do cliente final usam token próprio e não aceitam `clienteId` externo como autoridade;
- índices e uniques por tenant devem ser preferidos quando a regra de negócio for local à empresa.

## Consequências

### Positivas

- Modelo mais simples e econômico que banco por tenant.
- Permite operação com dezenas ou milhares de empresas.
- Facilita relatórios globais para SUPER_ADMIN.
- Facilita deploy único e evolução centralizada.

### Negativas

- Uma falha de filtro por `empresaId` pode causar incidente grave.
- Testes de IDOR e isolamento precisam ser permanentes.
- Crescimento extremo pode exigir particionamento, read replicas ou sharding futuro.

## Controles obrigatórios

- validação por `TenantValidatorService` ou equivalente;
- políticas centralizadas de role;
- testes e2e de isolamento;
- auditoria com `empresaId`;
- revisão obrigatória em PRs que alterem queries multiempresa.

## Critérios de aceite

- Usuário comum não acessa dados de outro tenant.
- Cliente final não escolhe outro `clienteId`.
- SUPER_ADMIN tem permissões globais apenas onde documentado.
- Recursos sensíveis exigem autenticação e autorização compatíveis.
