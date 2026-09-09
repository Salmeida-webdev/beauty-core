#!/usr/bin/env sh
set -eu

# BEAUTY_CORE_CHAT03_LINUX_RESTORE_VERIFY_V1
# This script targets a disposable PostgreSQL container only.
# Required: BACKUP_FILE, RESTORE_CONTAINER, RESTORE_DB, RESTORE_USER
# Optional: RESTORE_PASSWORD

: "${BACKUP_FILE:?BACKUP_FILE is required}"
: "${RESTORE_CONTAINER:?RESTORE_CONTAINER is required}"
: "${RESTORE_DB:?RESTORE_DB is required}"
: "${RESTORE_USER:?RESTORE_USER is required}"

test -f "${BACKUP_FILE}"
gzip -t "${BACKUP_FILE}"
TEMP_PATH="/tmp/beauty-core-restore-$(basename "${BACKUP_FILE}")"
docker cp "${BACKUP_FILE}" "${RESTORE_CONTAINER}:${TEMP_PATH}"

if [ -n "${RESTORE_PASSWORD:-}" ]; then
  docker exec --env "PGPASSWORD=${RESTORE_PASSWORD}" "${RESTORE_CONTAINER}" sh -c \
    "gunzip -c '${TEMP_PATH}' | psql --username='${RESTORE_USER}' --dbname='${RESTORE_DB}' --set=ON_ERROR_STOP=1" \
    >/dev/null
else
  docker exec "${RESTORE_CONTAINER}" sh -c \
    "gunzip -c '${TEMP_PATH}' | psql --username='${RESTORE_USER}' --dbname='${RESTORE_DB}' --set=ON_ERROR_STOP=1" \
    >/dev/null
fi

COUNT_SQL="SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';"
if [ -n "${RESTORE_PASSWORD:-}" ]; then
  TABLE_COUNT="$(docker exec --env "PGPASSWORD=${RESTORE_PASSWORD}" "${RESTORE_CONTAINER}" \
    psql --username="${RESTORE_USER}" --dbname="${RESTORE_DB}" --tuples-only --no-align --command="${COUNT_SQL}")"
else
  TABLE_COUNT="$(docker exec "${RESTORE_CONTAINER}" \
    psql --username="${RESTORE_USER}" --dbname="${RESTORE_DB}" --tuples-only --no-align --command="${COUNT_SQL}")"
fi

case "${TABLE_COUNT}" in
  ''|*[!0-9]*) printf '%s\n' 'Restore invalido: contagem de tabelas ausente ou nao numerica.' >&2; exit 1 ;;
esac
test "${TABLE_COUNT}" -gt 0
docker exec "${RESTORE_CONTAINER}" rm -f "${TEMP_PATH}" >/dev/null
printf '%s\n' "Restore validado: ${TABLE_COUNT} tabela(s) publica(s)."