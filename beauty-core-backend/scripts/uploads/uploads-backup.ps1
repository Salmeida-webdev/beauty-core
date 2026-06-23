param(
  [string]$OutputDir = "backups/uploads"
)

$ErrorActionPreference = "Stop"

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$fileName = "uploads-backup-$timestamp.tar.gz"
$outputPath = "$OutputDir/$fileName"
$logFile = "logs/backups/uploads-backup.log"

New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null
New-Item -ItemType Directory -Force -Path "logs/backups" | Out-Null

$paths = @()

if (Test-Path "uploads/public") {
  $paths += "uploads/public"
}

if (Test-Path "uploads/private") {
  $paths += "uploads/private"
}

if ($paths.Count -eq 0) {
  throw "Nenhuma pasta encontrada: uploads/public ou uploads/private."
}

"[$(Get-Date -Format s)] BACKUP_UPLOADS_INICIADO file=$fileName paths=$($paths -join ',')" | Add-Content $logFile

tar -czf $outputPath $paths

if (!(Test-Path $outputPath)) {
  throw "Backup de uploads não foi gerado."
}

$size = (Get-Item $outputPath).Length

"[$(Get-Date -Format s)] BACKUP_UPLOADS_CONCLUIDO file=$fileName size_bytes=$size" | Add-Content $logFile

Write-Host "Backup de uploads concluído: $outputPath" -ForegroundColor Green
