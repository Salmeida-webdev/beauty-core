# Changelog

Todas as mudanças relevantes do Beauty Core devem ser documentadas neste arquivo.

O projeto segue versionamento semântico conforme `docs/versioning.md`.

## [1.0.0-premium-readiness] — 2026-06-23

### Added

- CodeQL workflow para análise estática de segurança.
- Dependabot para npm e GitHub Actions.
- Workflow de auditoria de dependências com `npm audit --omit=dev`.
- Scripts `security:audit:prod` e `security:audit:prod:high`.
- ADRs oficiais de arquitetura, multi-tenant, autenticação/sessões, BullMQ/Scheduler e Backup/DR.
- Documentação de versionamento semântico.
- Runbooks operacionais premium.
- Playbooks de incidentes.
- Documento de resposta a incidentes.
- SLA, SLO e SLI iniciais.
- Documento de rotação de secrets.
- Capacity planning para 10, 100, 1.000 e 10.000 empresas.
- Checklist de prontidão Premium.
- Relatório técnico do Chat 40.

### Changed

- Governança técnica elevada com documentação formal de decisões arquiteturais.
- Operação documentada com critérios de severidade, escalonamento e recuperação.

### Security

- Adicionada varredura estática CodeQL.
- Adicionado gate de auditoria de dependências de produção.
- Adicionada política documentada de rotação de secrets.

### Notes

- O Chat 40 não altera regras de negócio.
- O Chat 40 não altera schema Prisma.
- O Chat 40 não cria endpoints novos.

<!-- CHAT40_SECURITY_PATCH -->
## [1.0.0-premium-readiness-security-patch] — 2026-06-23

### Security

- Corrigidas vulnerabilidades transitivas detectadas por `npm audit --omit=dev`.
- Adicionado override de `multer` para `2.2.0`.
- Adicionado override de `js-yaml` para `4.2.0`.
- Security audit de produção passou a retornar `found 0 vulnerabilities`.
- Correção validada com build, testes, e2e, coverage gate e Docker build.
