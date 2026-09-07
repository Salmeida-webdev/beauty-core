#!/usr/bin/env bash
set -euo pipefail

OUTPUT_DIR="${1:-.release}"
STAMP="$(date +%Y%m%d-%H%M%S)"
PACKAGE_NAME="${2:-beauty-core-backend-release-$STAMP.zip}"
TMP_DIR="$OUTPUT_DIR/release-tmp-$STAMP"
ZIP_PATH="$OUTPUT_DIR/$PACKAGE_NAME"

echo "=== CREATE RELEASE PACKAGE ==="

if [ ! -f "package.json" ] || [ ! -f "prisma/schema.prisma" ] || [ ! -d "src" ]; then
  echo "Execute este script na raiz do backend."
  exit 1
fi

mkdir -p "$OUTPUT_DIR"
rm -rf "$TMP_DIR"
rm -f "$ZIP_PATH"
mkdir -p "$TMP_DIR"

INCLUDES=(
  "src"
  "prisma"
  "docs"
  ".github"
  "test"
  "README.md"
  "package.json"
  "package-lock.json"
  "Dockerfile"
  ".env.example"
  ".env.dev.example"
  ".env.staging.example"
  ".env.prod.example"
  ".env.production.example"
  ".dockerignore"
  ".gitignore"
  "docker-compose.yml"
  "docker-compose.dev.yml"
  "docker-compose.staging.yml"
  "docker-compose.prod.yml"
  "docker-compose.observability.yml"
  "scripts/backup"
  "scripts/uploads"
  "scripts/smoke"
  "scripts/ci"
  "scripts/release"
)

for item in "${INCLUDES[@]}"; do
  if [ -e "$item" ]; then
    mkdir -p "$TMP_DIR/$(dirname "$item")"
    cp -R "$item" "$TMP_DIR/$item"
    echo "Incluido: $item"
  fi
done

rm -rf "$TMP_DIR/.git" \
  "$TMP_DIR/node_modules" \
  "$TMP_DIR/dist" \
  "$TMP_DIR/coverage" \
  "$TMP_DIR/logs" \
  "$TMP_DIR/backups" \
  "$TMP_DIR/uploads/private" \
  "$TMP_DIR/uploads/temp" \
  "$TMP_DIR/uploads/deleted"

find "$TMP_DIR" -type d -name "backups" -prune -exec rm -rf {} +

find "$TMP_DIR" -type f \( -name "*.bak" -o -name "*.backup" -o -name "*.tmp" -o -name "*.temp" -o -name "*.old" \) -delete

find "$TMP_DIR" -type f \( -name ".env" -o -name ".env.*" \) \
  ! -name ".env.example" \
  ! -name ".env.dev.example" \
  ! -name ".env.staging.example" \
  ! -name ".env.prod.example" \
  ! -name ".env.production.example" \
  -delete

if ! command -v zip >/dev/null 2>&1; then
  echo "Comando zip nao encontrado."
  exit 1
fi

(
  cd "$TMP_DIR"
  zip -qr "../$PACKAGE_NAME" .
)

rm -rf "$TMP_DIR"

echo "OK: release criado com sucesso."
echo "ZIP: $ZIP_PATH"