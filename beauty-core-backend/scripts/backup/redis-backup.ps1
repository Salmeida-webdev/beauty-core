param(
  [string]$Container = "",
  [string]$Password = ""
)

$ErrorActionPreference = "Stop"

function Get-EnvValue($Name) {
  if (Test-Path ".env") {
    $line = Get-Content ".env" | Where-Object { $_ -match "^$Name=" } | Select-Object -First 1
    if ($line) {
      return ($line -split "=", 2)[1].Trim().Trim('"').Trim("'")
    }
  }
  return $null
}

if ([string]::IsNullOrWhiteSpace($Container)) {
  $Container = docker ps --format "{{.Names}}" | Where-Object { $_ -match "redis" } | Select-Object -First 1
}

if ([string]::IsNullOrWhiteSpace($Container)) {
  throw "Nenhum container Redis encontrado."
}

if ([string]::IsNullOrWhiteSpace($Password)) {
  $Password = Get-EnvValue "REDIS_PASSWORD"
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$fileName = "redis-backup-$timestamp.tar.gz"
$outputPath = "backups/redis/$fileName"
$logFile = "logs/backups/redis-backup.log"

New-Item -ItemType Directory -Force -Path "backups/redis" | Out-Null
New-Item -ItemType Directory -Force -Path "logs/backups" | Out-Null

$auth = ""
if (![string]::IsNullOrWhiteSpace($Password)) {
  $auth = "-a '$Password'"
}

"[$(Get-Date -Format s)] BACKUP_REDIS_INICIADO container=$Container file=$fileName" | Add-Content $logFile

docker exec $Container sh -c "redis-cli $auth BGSAVE || true"
Start-Sleep -Seconds 3
docker exec $Container sh -c "tar -czf '/tmp/$fileName' -C /data ."
docker cp "${Container}:/tmp/$fileName" $outputPath
docker exec $Container sh -c "rm -f '/tmp/$fileName'" | Out-Null

if (!(Test-Path $outputPath)) {
  throw "Backup Redis não foi gerado."
}

$size = (Get-Item $outputPath).Length

"[$(Get-Date -Format s)] BACKUP_REDIS_CONCLUIDO file=$fileName size_bytes=$size" | Add-Content $logFile

Write-Host "Backup Redis concluído: $outputPath" -ForegroundColor Green
