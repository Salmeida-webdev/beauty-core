#!/usr/bin/env sh
set -eu
DUMP=${1:?Informe o arquivo RDB.}
DATA_DIR=${REDIS_RESTORE_DATA_DIR:?Defina REDIS_RESTORE_DATA_DIR para um diretorio descartavel.}
[ -f "$DUMP" ] || { echo "Arquivo RDB nao encontrado." >&2; exit 1; }
if [ -f "$DUMP.sha256" ] && command -v sha256sum >/dev/null 2>&1; then
  sha256sum -c "$DUMP.sha256"
fi
mkdir -p "$DATA_DIR"
cp "$DUMP" "$DATA_DIR/dump.rdb"
printf '%s\n' "$DATA_DIR/dump.rdb"
echo "Reinicie o Redis em ambiente controlado para carregar o dump." >&2
