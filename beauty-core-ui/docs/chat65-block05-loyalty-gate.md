# BEAUTY CORE 1.0 — CHAT 65
# BLOCO 05/15 — Fidelidade

## Contratos backend confirmados

- GET /area-cliente/me/fidelidade
- GET /area-cliente/me/pontos
- GET /area-cliente/me/beneficios

## Dados confirmados

- saldo de pontos;
- total recebido;
- total resgatado;
- nível atual;
- próximo nível;
- pontos necessários;
- benefícios elegíveis;
- extrato paginado;

## Segurança

- clienteId derivado da sessão;
- empresaId derivado do token;
- cliente ativo e ativoPortal validados;
- ownership por empresaId + clienteId;

## Escopo

A implementação frontend deve criar contratos, adapters, queries e página de fidelidade usando exclusivamente esses endpoints.

Resgate de pontos permanece reservado até existir contrato Portal específico.
