#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:3000}"
TENANT_SLUG="${TENANT_SLUG:-}"
DOCS_ENABLED="${DOCS_ENABLED:-false}"
METRICS_TOKEN="${METRICS_TOKEN:-}"

echo "Beauty Core smoke test"
echo "BaseUrl: ${BASE_URL}"

ENDPOINTS=(
  "/health"
  "/health/ready"
  "/health/full"
  "/metrics"
)

if [ "${DOCS_ENABLED}" = "true" ]; then
  ENDPOINTS+=("/api/docs")
fi

if [ -n "${TENANT_SLUG}" ]; then
  ENDPOINTS+=("/public/tenant/${TENANT_SLUG}")
fi

for endpoint in "${ENDPOINTS[@]}"; do
  url="${BASE_URL}${endpoint}"

  curl_args=(-sS -o /tmp/beauty-core-smoke-response.txt -w "%{http_code}" --max-time 20)

  if [ "${endpoint}" = "/metrics" ] && [ -n "${METRICS_TOKEN}" ]; then
    curl_args+=(-H "x-metrics-token: ${METRICS_TOKEN}")
  fi

  status="$(curl "${curl_args[@]}" "$url" || true)"

  if [ "$status" -lt 200 ] || [ "$status" -ge 400 ]; then
    echo "FAIL ${status} ${endpoint}"
    cat /tmp/beauty-core-smoke-response.txt || true

    if [ "${endpoint}" = "/metrics" ] && [ -z "${METRICS_TOKEN}" ]; then
      echo "Dica: defina METRICS_TOKEN no ambiente para validar /metrics protegido."
    fi

    exit 1
  fi

  echo "OK ${status} ${endpoint}"
done

echo "Smoke test aprovado."
