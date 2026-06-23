$ErrorActionPreference = "Continue"

$BaseUrl = "http://localhost:3000"

Write-Host ""
Write-Host "=== Beauty Core Chat 32 - Runtime Validation ===" -ForegroundColor Cyan
Write-Host ""

function Test-Endpoint {
  param (
    [string]$Name,
    [string]$Method,
    [string]$Url,
    [string]$Token = ""
  )

  Write-Host "[$Name] $Method $Url" -ForegroundColor Yellow

  try {
    $headers = @{}

    if ($Token -ne "") {
      $headers["Authorization"] = "Bearer $Token"
    }

    if ($Method -eq "GET") {
      $response = Invoke-RestMethod -Uri $Url -Method GET -Headers $headers
    }

    if ($Method -eq "POST") {
      $response = Invoke-RestMethod -Uri $Url -Method POST -Headers $headers
    }

    Write-Host "OK" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 10
  }
  catch {
    Write-Host "FALHOU" -ForegroundColor Red

    if ($_.Exception.Response) {
      Write-Host "StatusCode:" $_.Exception.Response.StatusCode.value__
    }

    Write-Host $_.Exception.Message
  }

  Write-Host ""
}

Test-Endpoint -Name "Health Geral" -Method "GET" -Url "$BaseUrl/health"
Test-Endpoint -Name "Health Redis" -Method "GET" -Url "$BaseUrl/health/redis"
Test-Endpoint -Name "Health Queues" -Method "GET" -Url "$BaseUrl/health/queues"
if ($env:CHAT32_TOKEN) {
  Test-Endpoint -Name "Scheduler Status" -Method "GET" -Url "$BaseUrl/scheduler/status" -Token $env:CHAT32_TOKEN
}
else {
  Test-Endpoint -Name "Scheduler Status" -Method "GET" -Url "$BaseUrl/scheduler/status"
}

if ($env:CHAT32_TOKEN) {
  Write-Host "Token encontrado em CHAT32_TOKEN. Testando endpoints protegidos..." -ForegroundColor Cyan
  Write-Host ""

  Test-Endpoint -Name "Queues Status" -Method "GET" -Url "$BaseUrl/queues/status" -Token $env:CHAT32_TOKEN
  Test-Endpoint -Name "Queues Metrics" -Method "GET" -Url "$BaseUrl/queues/metrics" -Token $env:CHAT32_TOKEN
  Test-Endpoint -Name "Queues DLQ" -Method "GET" -Url "$BaseUrl/queues/dlq?limit=50" -Token $env:CHAT32_TOKEN
}
else {
  Write-Host "CHAT32_TOKEN não definido. Endpoints protegidos /queues/* foram ignorados." -ForegroundColor DarkYellow
  Write-Host "Depois de obter um token SUPER_ADMIN, rode:" -ForegroundColor DarkYellow
  Write-Host '$env:CHAT32_TOKEN="COLE_SEU_TOKEN_AQUI"' -ForegroundColor DarkYellow
  Write-Host '.\test\chat32-runtime-queues.ps1' -ForegroundColor DarkYellow
}

Write-Host ""
Write-Host "=== Validação concluída ===" -ForegroundColor Cyan

