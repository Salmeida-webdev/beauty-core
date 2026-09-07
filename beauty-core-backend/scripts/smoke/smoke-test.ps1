param(
  [string]$BaseUrl = "http://localhost:3000",
  [string]$TenantSlug = "",
  [switch]$DocsEnabled,
  [string]$MetricsToken = $env:METRICS_TOKEN
)

$ErrorActionPreference = "Stop"

Write-Host "Beauty Core smoke test"
Write-Host "BaseUrl: $BaseUrl"

$endpoints = @(
  "/health",
  "/health/ready",
  "/health/full",
  "/metrics"
)

if ($DocsEnabled) {
  $endpoints += "/api/docs"
}

if ($TenantSlug -ne "") {
  $endpoints += "/public/tenant/$TenantSlug"
}

foreach ($endpoint in $endpoints) {
  $url = "$BaseUrl$endpoint"
  $headers = @{}

  if ($endpoint -eq "/metrics" -and -not [string]::IsNullOrWhiteSpace($MetricsToken)) {
    $headers["x-metrics-token"] = $MetricsToken
  }

  try {
    $response = Invoke-WebRequest -Uri $url -Headers $headers -UseBasicParsing -TimeoutSec 20
    $status = [int]$response.StatusCode

    if ($status -lt 200 -or $status -ge 400) {
      throw "Status inesperado: $status"
    }

    Write-Host "OK $status $endpoint" -ForegroundColor Green
  }
  catch {
    Write-Host "FAIL $endpoint" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red

    if ($endpoint -eq "/metrics" -and [string]::IsNullOrWhiteSpace($MetricsToken)) {
      Write-Host "Dica: defina METRICS_TOKEN no ambiente ou informe -MetricsToken para validar /metrics protegido." -ForegroundColor Yellow
    }

    exit 1
  }
}

Write-Host "Smoke test aprovado." -ForegroundColor Green
