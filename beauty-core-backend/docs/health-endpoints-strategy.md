# Beauty Core 1.0 - Health Endpoints Strategy

Data de geracao: 2026-06-23 20:16:37 -03:00
Contexto: Chat 43 - Encerramento Operacional Definitivo + Release Oficial

## 1. Objetivo

Este documento define a politica oficial de health endpoints do Beauty Core 1.0.
A estrategia separa endpoints publicos de disponibilidade, endpoints de prontidao operacional e endpoints internos protegidos.

## 2. Politica oficial

| Endpoint | Exposicao | Autenticacao | Finalidade | Status Chat 43 |
|---|---|---|---|---|
| GET /health | Publico | Nao | Resumo operacional basico | Validado 200 |
| GET /health/live | Publico | Nao | Liveness check do container/orquestrador | Validado 200 |
| GET /health/ready | Publico operacional | Nao | Readiness check para dependencia basica | Validado 200 |
| GET /health/full | Interno | JWT | Diagnostico completo | Validado 401 sem token |
| GET /health/database | Interno | JWT | Diagnostico de banco | Validado 401 sem token |
| GET /health/redis | Interno | JWT | Diagnostico de Redis | Validado 401 sem token |
| GET /health/summary | Interno | JWT | Resumo detalhado de infraestrutura | Validado 401 sem token |
| GET /health/queues | Interno | JWT | Diagnostico de filas | Validado 401 sem token |
| GET /metrics | Operacional protegido | x-metrics-token | Metricas Prometheus | Validado 200 com token |

## 3. Justificativa

Endpoints publicos devem permitir que Docker, load balancer, health checker e orquestradores validem disponibilidade sem credenciais.
Endpoints internos nao devem revelar detalhes de infraestrutura, banco, Redis, filas, scheduler ou diagnosticos completos sem autenticacao.

## 4. Decisao aplicada no Chat 43

Durante a validacao Docker real, /health/live respondia 200, mas /health retornava 401 por causa de JwtAuthGuard aplicado em nivel de classe no HealthController.
A correcao aplicada removeu o guard da classe e aplicou JwtAuthGuard individualmente nos endpoints internos.

Resultado da correcao:
- /health ficou publico.
- /health/live permaneceu publico.
- /health/ready permaneceu publico operacional.
- /health/full permaneceu protegido.
- /health/database permaneceu protegido.
- /health/redis permaneceu protegido.
- /health/summary permaneceu protegido.
- /health/queues permaneceu protegido.

## 5. Evidencias runtime Chat 43

- API container running.
- API container healthy.
- GET /health retornou 200.
- GET /health/live retornou 200.
- GET /health/ready retornou 200.
- GET /health/full sem token retornou 401.
- GET /health/database sem token retornou 401.
- GET /health/redis sem token retornou 401.
- GET /health/summary sem token retornou 401.
- GET /health/queues sem token retornou 401.
- GET /metrics com token operacional retornou 200.
- Smoke operacional Chat 43 aprovado.

## 6. Regras de manutencao

- Nao aplicar JwtAuthGuard em nivel de classe no HealthController se /health precisar continuar publico.
- Aplicar JwtAuthGuard individualmente nos endpoints internos.
- Nao expor payload completo de dependencias em endpoint publico.
- Manter /health/live simples e rapido.
- Manter /health/ready adequado para readiness de infraestrutura.
- Proteger /metrics com x-metrics-token.
- Atualizar smoke test sempre que a politica de health mudar.

## 7. Criterios de aceite

- /health retorna 200 sem token.
- /health/live retorna 200 sem token.
- /health/ready retorna 200 sem token em ambiente saudavel.
- /health/full retorna 401 sem token.
- /health/database retorna 401 sem token.
- /health/redis retorna 401 sem token.
- /health/summary retorna 401 sem token.
- /health/queues retorna 401 sem token.
- /metrics exige token valido.
- Docker healthcheck fica healthy.
- Smoke operacional passa.

## 8. Resultado Chat 43

Status: APROVADO

Conclusao: a estrategia de health endpoints do Beauty Core 1.0 esta alinhada com operacao real em Docker, seguranca de endpoints internos e readiness para release controlado.
