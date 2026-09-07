# Security Scanning — Beauty Core 1.0

## Objetivo

Documentar a estratégia de varredura de segurança automatizada do Beauty Core 1.0.

A camada de security scanning cobre:

- análise estática com CodeQL;
- monitoramento de dependências com Dependabot;
- auditoria de dependências de produção com npm audit --omit=dev;
- quality gate em CI;
- correção controlada de vulnerabilidades transitivas;
- registro operacional em changelog, release notes e relatório técnico.

## Componentes implementados

### CodeQL

Arquivo:

- .github/workflows/codeql.yml

Função:

- executar análise estática em JavaScript/TypeScript;
- rodar em push, pull request, agenda semanal e execução manual;
- usar queries security-extended e security-and-quality;
- publicar alertas em GitHub Code Scanning.

### Dependabot

Arquivo:

- .github/dependabot.yml

Função:

- monitorar dependências npm;
- monitorar GitHub Actions;
- abrir pull requests semanais;
- agrupar dependências de produção e desenvolvimento;
- reduzir risco de dependências obsoletas.

### Dependency Security Audit

Arquivo:

- .github/workflows/security-audit.yml

Função:

- executar npm ci;
- validar schema Prisma;
- executar npm audit --omit=dev;
- falhar o workflow quando houver vulnerabilidade auditável em dependência de produção.

## Scripts locais

Scripts adicionados ao package.json:

- security:audit:prod = npm audit --omit=dev
- security:audit:prod:high = npm audit --omit=dev --audit-level=high

## Quality gate

O gate oficial do Chat 40 é:

npm run security:audit:prod

Critério de aceite:

- exit code 0;
- found 0 vulnerabilities;
- sem uso de npm audit fix --force;
- sem downgrade inseguro;
- sem breaking change não revisada.

## Correção controlada pós-audit

Durante o Chat 40, o primeiro npm audit --omit=dev detectou vulnerabilidades reais em dependências transitivas de produção:

- multer 2.1.1, via @nestjs/platform-express;
- js-yaml 4.1.1, via @nestjs/swagger.

A correção foi feita de forma controlada por overrides no package.json:

- multer = 2.2.0;
- js-yaml = 4.2.0.

## Motivo para não usar npm audit fix --force

O npm audit fix --force sugeriu alterações com breaking changes em pacotes centrais do NestJS.

Como o Beauty Core já estava em estado enterprise certificado, a estratégia correta foi:

1. inspecionar árvore de dependências;
2. aplicar override mínimo;
3. atualizar lockfile;
4. validar npm audit;
5. reexecutar build, testes, coverage e Docker build.

## Validações pós-correção

Após os overrides, foram aprovados:

- npm run security:audit:prod;
- npm run build;
- npm run test;
- npm run test:e2e;
- npm run test:all:cov;
- npm run coverage:check;
- docker build -t beauty-core-api:chat40 .

## Política operacional

Toda vulnerabilidade encontrada deve ser classificada por:

- severidade;
- pacote direto ou transitivo;
- explorabilidade real;
- impacto no Beauty Core;
- disponibilidade de patch;
- risco de breaking change;
- necessidade de rollback.

## Critério para produção premium

Antes de release premium, o projeto deve ter:

- CodeQL ativo;
- Dependabot ativo;
- workflow de security audit ativo;
- npm audit --omit=dev aprovado;
- alertas críticos tratados;
- branch protection exigindo os checks de segurança;
- política de atualização de dependências.
