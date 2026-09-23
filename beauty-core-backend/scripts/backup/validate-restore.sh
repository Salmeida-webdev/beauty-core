#!/usr/bin/env sh
set -eu
TARGET=${1:?Informe o artefato a validar.}
[ -f "$TARGET" ] || { echo "Artefato nao encontrado." >&2; exit 1; }
case "$TARGET" in
  *.tar.gz) tar -tzf "$TARGET" >/dev/null ;;
  *.sql.gz) gzip -t "$TARGET" ;;
  *.dump|*.backup) command -v pg_restore >/dev/null 2>&1 || exit 1; pg_restore --list "$TARGET" >/dev/null ;;
  *.rdb) test -s "$TARGET" ;;
  *) echo "Formato nao suportado." >&2; exit 1 ;;
esac
if [ -f "$TARGET.sha256" ] && command -v sha256sum >/dev/null 2>&1; then
  sha256sum -c "$TARGET.sha256"
fi
printf '%s\n' "$TARGET"
