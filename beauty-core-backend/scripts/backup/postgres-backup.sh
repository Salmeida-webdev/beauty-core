#!/usr/bin/env sh
set -eu

# BEAUTY_CORE_CHAT03_LINUX_BACKUP_V1
# Required: POSTGRES_CONTAINER, POSTGRES_DB, POSTGRES_USER
# Optional: POSTGRES_PASSWORD, BACKUP_DIR

: "${POSTGRES_CONTAINER:?POSTGRES_CONTAINER is required}"
: "${POSTGRES_DB:?POSTGRES_DB is required}"
: "${POSTGRES_USER:?POSTGRES_USER is required}"

BACKUP_DIR="${BACKUP_DIR:-backups/postgres}"
TIMESTAMP="$(date -u +%Y%m%d-%H%M%S)"
BACKUP_FILE="${BACKUP_DIR}/postgres-backup-${TIMESTAMP}.sql.gz"
mkdir -p "${BACKUP_DIR}"

if [ -n "${POSTGRES_PASSWORD:-}" ]; then
  docker exec --env "PGPASSWORD=${POSTGRES_PASSWORD}" "${POSTGRES_CONTAINER}" \
    pg_dump --no-owner --no-privileges --format=plain --dbname="${POSTGRES_DB}" --username="${POSTGRES_USER}" \
    | gzip -c > "${BACKUP_FILE}"
else
  docker exec "${POSTGRES_CONTAINER}" \
    pg_dump --no-owner --no-privileges --format=plain --dbname="${POSTGRES_DB}" --username="${POSTGRES_USER}" \
    | gzip -c > "${BACKUP_FILE}"
fi

test -s "${BACKUP_FILE}"
gzip -t "${BACKUP_FILE}"

if command -v sha256sum >/dev/null 2>&1; then
  sha256sum "${BACKUP_FILE}" > "${BACKUP_FILE}.sha256"
else
  shasum -a 256 "${BACKUP_FILE}" > "${BACKUP_FILE}.sha256"
fi

printf '%s\n' "Backup criado: ${BACKUP_FILE}"
printf '%s\n' "Integridade gzip: PASS"
printf '%s\n' "Checksum criado: ${BACKUP_FILE}.sha256"