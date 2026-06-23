param(
  [Parameter(Mandatory = $true)]
  [string]$BackupFile,

  [switch]$Force
)

$ErrorActionPreference = "Stop"

if (!(Test-Path $BackupFile)) {
  throw "Arquivo de backup não encontrado: $BackupFile"
}

$logFile = "logs/backups/uploads-restore.log"
New-Item -ItemType Directory -Force -Path "logs/backups" | Out-Null

if ((Test-Path "uploads") -and !$Force) {
  throw "A pasta uploads já existe. Use -Force para renomear a atual e restaurar."
}

if ((Test-Path "uploads") -and $Force) {
  $old = "uploads-before-restore-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
  Rename-Item -Path "uploads" -NewName $old
  "[$(Get-Date -Format s)] UPLOADS_EXISTENTES_RENOMEADOS para=$old" | Add-Content $logFile
}

"[$(Get-Date -Format s)] RESTORE_UPLOADS_INICIADO file=$BackupFile force=$Force" | Add-Content $logFile

tar -xzf $BackupFile

"[$(Get-Date -Format s)] RESTORE_UPLOADS_CONCLUIDO file=$BackupFile" | Add-Content $logFile

Write-Host "Restore de uploads concluído." -ForegroundColor Green
