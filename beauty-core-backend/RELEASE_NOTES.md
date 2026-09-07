# Release Notes — Beauty Core 1.0 Premium Readiness

## Release

`1.0.0-premium-readiness`

## Data

2026-06-23

## Objetivo

Elevar o Beauty Core 1.0 de Enterprise Certificado para candidato a Enterprise Certificado Premium por meio de governança, segurança automatizada, documentação operacional, SLA/SLO/SLI, rotação de secrets e capacity planning.

## Destaques

- CodeQL configurado.
- Dependabot configurado.
- Auditoria de dependências de produção configurada.
- ADRs criados.
- Changelog e release notes criados.
- Versionamento semântico documentado.
- Runbooks e playbooks criados.
- Incident response documentado.
- SLA, SLO e SLI definidos.
- Rotação de secrets documentada.
- Capacity planning por escala documentado.
- Checklist premium criado.

## Impacto técnico

Não há alteração de regra de negócio, banco, módulos, APIs, DTOs, guards ou Dockerfile.

## Impacto operacional

A operação passa a ter documentação formal para:

- API fora do ar;
- banco indisponível;
- Redis indisponível;
- DLQ crescendo;
- backup falhando;
- restore emergencial;
- deploy com falha;
- rollback;
- vazamento de segredo;
- tenant com problema.

## Validações esperadas

- `npm run prisma:validate`
- `npm run build`
- `npm run test`
- `npm run test:e2e`
- `npm run test:all:cov`
- `npm run coverage:check`
- `docker build -t beauty-core-api:chat40 .`

## Recomendação

Após aprovação do Chat 40, o Chat 41 deve focar em auditoria final premium, hardening de pipeline, validação dos workflows no GitHub Actions e simulação de incidentes controlados.

<!-- CHAT40_SECURITY_PATCH_RELEASE_NOTES -->
## Security Patch Pos-Audit

Durante a validacao local do Chat 40, o gate npm audit --omit=dev detectou vulnerabilidades transitivas em dependencias de producao.

A correcao foi aplicada sem npm audit fix --force, usando overrides controlados:

- multer 2.2.0;
- js-yaml 4.2.0.

Apos a correcao, o audit retornou found 0 vulnerabilities.

A correcao foi validada com:

- build;
- testes padrao;
- testes e2e;
- coverage completo;
- coverage gate;
- Docker build.
