param(
  [Parameter(Mandatory = $true)]
  [string]$BackupFile,

  [string]$Container = "",

  [switch]$Force
)

$ErrorActionPreference = "Stop"

if (!(Test-Path $BackupFile)) {
  throw "Arquivo de backup não encontrado: $BackupFile"
}

if (!$Force) {
  throw "Restore Redis sobrescreve estado de filas/cache. Use -Force apenas em ambiente controlado."
}

if ([string]::IsNullOrWhiteSpace($Container)) {
  $Container = docker ps --format "{{.Names}}" | Where-Object { $_ -match "redis" } | Select-Object -First 1
}

if ([string]::IsNullOrWhiteSpace($Container)) {
  throw "Nenhum container Redis encontrado."
}

$logFile = "logs/backups/redis-restore.log"
New-Item -ItemType Directory -Force -Path "logs/backups" | Out-Null

$backupName = Split-Path $BackupFile -Leaf
$tmpPath = "/tmp/$backupName"

"[$(Get-Date -Format s)] RESTORE_REDIS_INICIADO container=$Container file=$BackupFile" | Add-Content $logFile

docker cp $BackupFile "${Container}:$tmpPath"
docker exec $Container sh -c "rm -rf /data/* && tar -xzf '$tmpPath' -C /data && rm -f '$tmpPath'"
docker restart $Container | Out-Null

"[$(Get-Date -Format s)] RESTORE_REDIS_CONCLUIDO container=$Container file=$BackupFile" | Add-Content $logFile

Write-Host "Restore Redis concluído. Container reiniciado: $Container" -ForegroundColor Green
