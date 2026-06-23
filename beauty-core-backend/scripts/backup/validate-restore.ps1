param(
  [string]$BackupFile = "",
  [string]$Container = "",
  [string]$Database = "",
  [string]$User = "",
  [string]$Password = "",
  [switch]$SkipIfNoBackup,
  [switch]$KeepValidationDatabase
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

function Write-ValidationLog($Message) {
  New-Item -ItemType Directory -Force -Path "logs/backups" | Out-Null
  "[$(Get-Date -Format s)] $Message" | Add-Content "logs/backups/restore-validation.log"
}

function Resolve-PostgresContainer {
  param([string]$RequestedContainer)

  if (![string]::IsNullOrWhiteSpace($RequestedContainer)) {
    return $RequestedContainer
  }

  $detected = docker ps --format "{{.Names}}" | Where-Object { $_ -match "postgres" } | Select-Object -First 1

  if ([string]::IsNullOrWhiteSpace($detected)) {
    throw "Nenhum container PostgreSQL encontrado."
  }

  return $detected
}

function Resolve-LatestBackup {
  param([string]$RequestedBackup)

  if (![string]::IsNullOrWhiteSpace($RequestedBackup)) {
    if (!(Test-Path $RequestedBackup)) {
      throw "Arquivo de backup nao encontrado: $RequestedBackup"
    }

    return (Resolve-Path $RequestedBackup).Path
  }

  if (!(Test-Path "backups/postgres")) {
    if ($SkipIfNoBackup) {
      return $null
    }

    throw "Diretorio backups/postgres nao encontrado."
  }

  $latest = Get-ChildItem "backups/postgres" -File |
    Where-Object { $_.Name -match "\.sql$|\.sql\.gz$" } |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 1

  if (!$latest) {
    if ($SkipIfNoBackup) {
      return $null
    }

    throw "Nenhum backup PostgreSQL encontrado em backups/postgres."
  }

  return $latest.FullName
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

$backupPath = Resolve-LatestBackup -RequestedBackup $BackupFile

if ($null -eq $backupPath) {
  Write-ValidationLog "RESTORE_VALIDATION_SKIPPED motivo=nenhum_backup"
  Write-Host "Validacao de restore ignorada: nenhum backup encontrado." -ForegroundColor Yellow
  exit 0
}

$Container = Resolve-PostgresContainer -RequestedContainer $Container
$backupName = Split-Path $backupPath -Leaf
$tmpPath = "/tmp/$backupName"
$validationDb = "beauty_core_restore_validation_$(Get-Date -Format 'yyyyMMddHHmmss')"

Write-ValidationLog "RESTORE_VALIDATION_STARTED container=$Container source_database=$Database validation_database=$validationDb backup=$backupPath"

try {
  docker cp $backupPath "${Container}:$tmpPath"

  $createDbCmd = "export PGPASSWORD='$Password'; createdb -U '$User' '$validationDb'"
  docker exec $Container sh -c $createDbCmd

  if ($backupPath.EndsWith(".gz")) {
    $restoreCmd = "export PGPASSWORD='$Password'; gunzip -c '$tmpPath' | psql -U '$User' -d '$validationDb' -v ON_ERROR_STOP=1"
  } else {
    $restoreCmd = "export PGPASSWORD='$Password'; psql -U '$User' -d '$validationDb' -v ON_ERROR_STOP=1 < '$tmpPath'"
  }

  docker exec $Container sh -c $restoreCmd

  $countCmd = "export PGPASSWORD='$Password'; psql -U '$User' -d '$validationDb' -tAc ""SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';"""
  $tableCountRaw = docker exec $Container sh -c $countCmd
  $tableCount = [int]($tableCountRaw.Trim())

  if ($tableCount -le 0) {
    throw "Restore validado, mas nenhuma tabela foi encontrada no banco temporario."
  }

  Write-ValidationLog "RESTORE_VALIDATION_SUCCESS validation_database=$validationDb tables=$tableCount backup=$backupPath"
  Write-Host "Restore validation OK. Banco temporario=$validationDb Tabelas=$tableCount" -ForegroundColor Green
}
finally {
  docker exec $Container sh -c "rm -f '$tmpPath'" | Out-Null

  if (!$KeepValidationDatabase) {
    $dropCmd = "export PGPASSWORD='$Password'; dropdb -U '$User' --if-exists '$validationDb'"
    docker exec $Container sh -c $dropCmd | Out-Null
    Write-ValidationLog "RESTORE_VALIDATION_TEMP_DATABASE_DROPPED validation_database=$validationDb"
  } else {
    Write-ValidationLog "RESTORE_VALIDATION_TEMP_DATABASE_KEPT validation_database=$validationDb"
  }
}