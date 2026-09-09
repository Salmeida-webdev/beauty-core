# Chat 03 - Bloco 03G - Backup e restore Linux

## Estrategia

O backend passa a ter scripts POSIX shell para execucao em runner, job ou sidecar Linux. Os scripts usam `docker exec`, `pg_dump`, `psql`, `gzip -t`, checksum SHA-256 e codigos de saida nao zero em caso de falha.

## Backup

Arquivo: `scripts/backup/postgres-backup.sh`

Variaveis obrigatorias: `POSTGRES_CONTAINER`, `POSTGRES_DB`, `POSTGRES_USER`.

Variaveis opcionais: `POSTGRES_PASSWORD`, `BACKUP_DIR`.

O password e usado apenas via ambiente do processo/container e nunca e impresso.

## Restore de validacao

Arquivo: `scripts/backup/postgres-restore-verify.sh`

O destino deve ser um PostgreSQL descartavel. O script valida `gzip`, restaura com `ON_ERROR_STOP=1`, conta tabelas publicas e remove somente o arquivo temporario dentro do container.

Variaveis obrigatorias: `BACKUP_FILE`, `RESTORE_CONTAINER`, `RESTORE_DB`, `RESTORE_USER`.

Variavel opcional: `RESTORE_PASSWORD`.

## Limites

- Nenhum deploy ou migration de producao foi executado.
- Nenhum banco real foi restaurado ou apagado.
- O teste operacional deve continuar usando banco e container descartaveis.
- Em Linux, o executor deve conceder permissao de execucao ou chamar os scripts com `sh`.