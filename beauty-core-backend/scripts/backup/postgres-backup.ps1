param(
  [string]$Container = "",
  [string]$Database = "",
  [string]$User = "",
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
  $Container = docker ps --format "{{.Names}}" | Where-Object { $_ -match "postgres" } | Select-Object -First 1
}

if ([string]::IsNullOrWhiteSpace($Container)) {
  throw "Nenhum container PostgreSQL encontrado."
}

if ([string]::IsNullOrWhiteSpace($Database)) {
  $Database = Get-EnvValue "POSTGRES_DB"
}
if ([string]::IsNullOrWhiteSpace($Database)) {
  $Database = "postgres"
}

if ([string]::IsNullOrWhiteSpace($User)) {
  $User = Get-EnvValue "POSTGRES_USER"
}
if ([string]::IsNullOrWhiteSpace($User)) {
  $User = "postgres"
}

if ([string]::IsNullOrWhiteSpace($Password)) {
  $Password = Get-EnvValue "POSTGRES_PASSWORD"
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$fileName = "beauty-core-backup-$timestamp.sql.gz"
$outputPath = "backups/postgres/$fileName"
$logFile = "logs/backups/postgres-backup.log"

New-Item -ItemType Directory -Force -Path "backups/postgres" | Out-Null
New-Item -ItemType Directory -Force -Path "logs/backups" | Out-Null

"[$(Get-Date -Format s)] BACKUP_INICIADO container=$Container database=$Database file=$fileName" | Add-Content $logFile

$cmd = "export PGPASSWORD='$Password'; pg_dump -U '$User' -d '$Database' --clean --if-exists --no-owner --no-privileges | gzip -c > '/tmp/$fileName'"

docker exec $Container sh -c $cmd
docker cp "${Container}:/tmp/$fileName" $outputPath
docker exec $Container sh -c "rm -f '/tmp/$fileName'" | Out-Null

if (!(Test-Path $outputPath)) {
  throw "Backup PostgreSQL não foi gerado."
}

$size = (Get-Item $outputPath).Length

"[$(Get-Date -Format s)] BACKUP_CONCLUIDO file=$fileName size_bytes=$size" | Add-Content $logFile

Write-Host "Backup PostgreSQL concluído: $outputPath" -ForegroundColor Green
