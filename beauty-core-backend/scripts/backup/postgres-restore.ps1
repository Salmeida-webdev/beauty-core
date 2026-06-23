param(
  [Parameter(Mandatory = $true)]
  [string]$BackupFile,

  [string]$Container = "",
  [string]$Database = "",
  [string]$User = "",
  [string]$Password = "",

  [switch]$Force
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

if (!(Test-Path $BackupFile)) {
  throw "Arquivo de backup não encontrado: $BackupFile"
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

$logFile = "logs/backups/postgres-restore.log"
New-Item -ItemType Directory -Force -Path "logs/backups" | Out-Null

$countCmd = "export PGPASSWORD='$Password'; psql -U '$User' -d '$Database' -tAc `"SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';`""
$tableCount = docker exec $Container sh -c $countCmd
$tableCount = [int]($tableCount.Trim())

if ($tableCount -gt 0 -and !$Force) {
  throw "Banco possui $tableCount tabelas. Para restaurar sobre banco existente, use -Force."
}

$backupName = Split-Path $BackupFile -Leaf
$tmpPath = "/tmp/$backupName"

"[$(Get-Date -Format s)] RESTORE_INICIADO database=$Database file=$BackupFile force=$Force" | Add-Content $logFile

docker cp $BackupFile "${Container}:$tmpPath"

if ($BackupFile.EndsWith(".gz")) {
  $restoreCmd = "export PGPASSWORD='$Password'; gunzip -c '$tmpPath' | psql -U '$User' -d '$Database' -v ON_ERROR_STOP=1"
} else {
  $restoreCmd = "export PGPASSWORD='$Password'; psql -U '$User' -d '$Database' -v ON_ERROR_STOP=1 < '$tmpPath'"
}

docker exec $Container sh -c $restoreCmd
docker exec $Container sh -c "rm -f '$tmpPath'" | Out-Null

"[$(Get-Date -Format s)] RESTORE_CONCLUIDO database=$Database file=$BackupFile" | Add-Content $logFile

Write-Host "Restore PostgreSQL concluído." -ForegroundColor Green
