param(
  [string]$BaseUrl = "http://localhost:30043",
  [string]$MetricsToken = "chat43_release_metrics_token_temporario_com_mais_de_32_caracteres"
)

$ErrorActionPreference = "Stop"

function Assert-Status {
  param(
    [string]$Method = "GET",
    [string]$Path,
    [int[]]$Expected,
    [hashtable]$Headers = @{},
    [object]$Body = $null,
    [string]$ContentType = "application/json"
  )

  $url = "$BaseUrl$Path"
  $status = $null

  try {
    if ($null -ne $Body) {
      $response = Invoke-WebRequest -Uri $url -Method $Method -Headers $Headers -Body $Body -ContentType $ContentType -UseBasicParsing -TimeoutSec 20
    } else {
      $response = Invoke-WebRequest -Uri $url -Method $Method -Headers $Headers -UseBasicParsing -TimeoutSec 20
    }

    $status = [int]$response.StatusCode
  } catch {
    if ($_.Exception.Response) {
      $status = [int]$_.Exception.Response.StatusCode.value__
    } else {
      throw
    }
  }

  if ($Expected -notcontains $status) {
    throw "FAIL $Method $Path => $status esperado: $($Expected -join ',')"
  }

  Write-Host "OK $Method $Path => $status"
}

Write-Host "Beauty Core Chat43 Release Smoke"
Write-Host "BaseUrl: $BaseUrl"

Write-Host ""
Write-Host "--- API health publico ---"
Assert-Status -Path "/health" -Expected @(200)
Assert-Status -Path "/health/live" -Expected @(200)
Assert-Status -Path "/health/ready" -Expected @(200)

Write-Host ""
Write-Host "--- Health interno protegido ---"
Assert-Status -Path "/health/full" -Expected @(401)
Assert-Status -Path "/health/database" -Expected @(401)
Assert-Status -Path "/health/redis" -Expected @(401)
Assert-Status -Path "/health/queues" -Expected @(401)

Write-Host ""
Write-Host "--- Metrics protegido com token operacional ---"
Assert-Status -Path "/metrics" -Expected @(200) -Headers @{ "x-metrics-token" = $MetricsToken }

Write-Host ""
Write-Host "--- Auth negativo controlado ---"
$invalidLoginBody = '{"email":"nao-existe-chat43@example.com","senha":"senha-invalida"}'
Assert-Status -Method "POST" -Path "/auth/login" -Expected @(400,401) -Body $invalidLoginBody

Write-Host ""
Write-Host "--- Scheduler protegido sem token ---"
Assert-Status -Path "/scheduler/status" -Expected @(401)

Write-Host ""
Write-Host "--- Filas protegidas sem token ---"
Assert-Status -Path "/queues" -Expected @(401,404)
Assert-Status -Path "/health/queues" -Expected @(401)

Write-Host ""
Write-Host "--- Upload privado protegido sem token ---"
Assert-Status -Method "POST" -Path "/arquivos/private/documentos" -Expected @(401,403,415)

Write-Host ""
Write-Host "Smoke operacional Chat43 aprovado."
