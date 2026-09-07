# Observabilidade segura - Prometheus e Grafana

## Politica oficial

- Prometheus nao deve ser exposto publicamente.
- Grafana nao deve usar senha padrao.
- Anonymous auth do Grafana deve permanecer desabilitado.
- Acesso externo deve ser feito apenas por VPN, tunel SSH, rede privada ou reverse proxy corporativo com TLS e autenticacao.

## Portas seguras

| Servico | Bind seguro | Observacao |
|---|---|---|
| Prometheus | 127.0.0.1:9090:9090 | Acesso apenas local no host |
| Grafana | 127.0.0.1:3003:3000 | Acesso apenas local no host |

## Variaveis obrigatorias

- GRAFANA_ADMIN_USER=admin
- GRAFANA_ADMIN_PASSWORD=CHANGE_ME_GRAFANA_ADMIN_PASSWORD_64_CHARS
- METRICS_TOKEN=CHANGE_ME_METRICS_TOKEN_64_CHARS

## Acesso recomendado

Para acessar Grafana remotamente, usar tunel SSH:

ssh -L 3003:127.0.0.1:3003 usuario@servidor

Depois acessar:

http://127.0.0.1:3003

## Proibido em producao

- Expor Prometheus com 9090:9090 em interface publica.
- Expor Grafana com 3003:3000 em interface publica.
- Usar admin/admin.
- Habilitar anonymous auth.

