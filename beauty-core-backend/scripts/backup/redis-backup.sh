#!/usr/bin/env sh
set -eu
command -v redis-cli >/dev/null 2>&1 || { echo "redis-cli nao encontrado." >&2; exit 1; }
OUTPUT_DIR=${BACKUP_OUTPUT_DIR:-backups/redis}
mkdir -p "$OUTPUT_DIR"
STAMP=$(date -u +%Y%m%dT%H%M%SZ)
ARTIFACT="$OUTPUT_DIR/redis-$STAMP.rdb"
if [ -n "${REDIS_PASSWORD:-}" ]; then
  REDISCLI_AUTH="$REDIS_PASSWORD"
  export REDISCLI_AUTH
fi
redis-cli -h "${REDIS_HOST:-redis}" -p "${REDIS_PORT:-6379}" -n "${REDIS_DB:-0}" --rdb "$ARTIFACT"
unset REDISCLI_AUTH 2>/dev/null || true
if command -v sha256sum >/dev/null 2>&1; then
  sha256sum "$ARTIFACT" > "$ARTIFACT.sha256"
elif command -v shasum >/dev/null 2>&1; then
  shasum -a 256 "$ARTIFACT" > "$ARTIFACT.sha256"
else
  echo "Ferramenta SHA-256 nao encontrada." >&2
  exit 1
fi
printf '%s\n' "$ARTIFACT"
