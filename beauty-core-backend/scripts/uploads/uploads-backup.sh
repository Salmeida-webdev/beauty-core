#!/usr/bin/env sh
set -eu
SOURCE_DIR=${UPLOADS_DIR:-uploads}
OUTPUT_DIR=${BACKUP_OUTPUT_DIR:-backups/uploads}
mkdir -p "$OUTPUT_DIR"
[ -d "$SOURCE_DIR" ] || { echo "Diretorio de uploads nao encontrado." >&2; exit 1; }
STAMP=$(date -u +%Y%m%dT%H%M%SZ)
ARTIFACT="$OUTPUT_DIR/uploads-$STAMP.tar.gz"
tar -czf "$ARTIFACT" -C "$SOURCE_DIR" .
if command -v sha256sum >/dev/null 2>&1; then
  sha256sum "$ARTIFACT" > "$ARTIFACT.sha256"
elif command -v shasum >/dev/null 2>&1; then
  shasum -a 256 "$ARTIFACT" > "$ARTIFACT.sha256"
else
  echo "Ferramenta SHA-256 nao encontrada." >&2
  exit 1
fi
printf '%s\n' "$ARTIFACT"
