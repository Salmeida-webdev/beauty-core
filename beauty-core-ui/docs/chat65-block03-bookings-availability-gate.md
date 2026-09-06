# BEAUTY CORE 1.0 — CHAT 65
# BLOCO 03/15 — Agendamentos, Listagem e Disponibilidade

## Backend confirmado

- AreaClienteController possui listagem de agendamentos;
- AreaClienteService filtra por empresaId e clienteId;
- próximos e último agendamento estão disponíveis;
- serviço, profissional, unidade, data/hora e status são retornados;
- clienteId não é recebido pela URL;

## Disponibilidade

O domínio administrativo possui evidências de profissionais e unidades disponíveis. A regra completa de disponibilidade deverá ser validada antes de criar contrato Portal específico.

## Frontend

O inventário frontend foi executado para localizar adapters, queries, contratos e páginas de agendamento.

## Restrições

- Nenhuma mutation implementada;
- Nenhuma regra administrativa duplicada;
- Nenhuma alteração Prisma;
- Nenhuma migration, stage, commit, push ou deploy.
