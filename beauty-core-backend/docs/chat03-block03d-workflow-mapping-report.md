# Chat 03 - Bloco 03D - Diagnostico de mapeamento dos workflows

Projeto: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core
Somente leitura. Valores de secrets, URLs, tokens e senhas nao foram exibidos.

## Resultado

| Status | Arquivo | Linha | Chave | Origem segura |
|---|---|---:|---|---|
| REVIEW | .github/workflows/production.yml | 28 | DATABASE_URL_PRODUCTION | secrets.DATABASE_URL_PRODUCTION |
| REVIEW | .github/workflows/production.yml | 29 | REDIS_URL_PRODUCTION | secrets.REDIS_URL_PRODUCTION |
| REVIEW | .github/workflows/production.yml | 30 | JWT_SECRET | secrets.JWT_SECRET |
| REVIEW | .github/workflows/production.yml | 31 | JWT_CLIENT_SECRET | secrets.JWT_CLIENT_SECRET |
| REVIEW | .github/workflows/production.yml | 32 | JWT_REFRESH_SECRET | secrets.JWT_REFRESH_SECRET |
| REVIEW | .github/workflows/production.yml | 33 | JWT_CLIENT_REFRESH_SECRET | secrets.JWT_CLIENT_REFRESH_SECRET |
| CONTEXT | .github/workflows/production.yml | 34 | run | valor-ou-expressao-nao-exibido |
| BLOCKER | .github/workflows/production.yml | 0 | DATABASE_URL mapping | expected secrets.DATABASE_URL_PRODUCTION |
| BLOCKER | .github/workflows/production.yml | 0 | REDIS_URL mapping | expected secrets.REDIS_URL_PRODUCTION |
| REVIEW | .github/workflows/staging.yml | 27 | DATABASE_URL_STAGING | secrets.DATABASE_URL_STAGING |
| REVIEW | .github/workflows/staging.yml | 28 | REDIS_URL_STAGING | secrets.REDIS_URL_STAGING |
| REVIEW | .github/workflows/staging.yml | 29 | JWT_SECRET | secrets.JWT_SECRET |
| REVIEW | .github/workflows/staging.yml | 30 | JWT_CLIENT_SECRET | secrets.JWT_CLIENT_SECRET |
| REVIEW | .github/workflows/staging.yml | 31 | JWT_REFRESH_SECRET | secrets.JWT_REFRESH_SECRET |
| REVIEW | .github/workflows/staging.yml | 32 | JWT_CLIENT_REFRESH_SECRET | secrets.JWT_CLIENT_REFRESH_SECRET |
| CONTEXT | .github/workflows/staging.yml | 33 | run | valor-ou-expressao-nao-exibido |
| BLOCKER | .github/workflows/staging.yml | 0 | DATABASE_URL mapping | expected secrets.DATABASE_URL_STAGING |
| BLOCKER | .github/workflows/staging.yml | 0 | REDIS_URL mapping | expected secrets.REDIS_URL_STAGING |

## Regra

- ``DATABASE_URL`` deve receber o secret especifico do ambiente.
- ``REDIS_URL`` deve receber o secret especifico do ambiente.
- O diagnostico nao altera workflows e nao executa deploy.
