param(
  [string]$BaseUrl = "http://localhost:3000",
  [string]$TenantSlug = "",
  [switch]$DocsEnabled
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

  try {
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 20
    $status = [int]$response.StatusCode

    if ($status -lt 200 -or $status -ge 400) {
      throw "Status inesperado: $status"
    }

    Write-Host "OK $status $endpoint" -ForegroundColor Green
  }
  catch {
    Write-Host "FAIL $endpoint" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
  }
}

Write-Host "Smoke test aprovado." -ForegroundColor Green
