#!/usr/bin/env sh
set -eu
ARCHIVE=${1:?Informe o arquivo tar.gz de uploads.}
DESTINATION=${2:-${UPLOADS_RESTORE_DIR:-uploads-restore}}
[ -f "$ARCHIVE" ] || { echo "Arquivo de uploads nao encontrado." >&2; exit 1; }
if [ -f "$ARCHIVE.sha256" ] && command -v sha256sum >/dev/null 2>&1; then
  sha256sum -c "$ARCHIVE.sha256"
fi
mkdir -p "$DESTINATION"
tar -xzf "$ARCHIVE" -C "$DESTINATION"
printf '%s\n' "$DESTINATION"
