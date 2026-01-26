# Start RIZE Backend Server
Write-Host "Starting RIZE Backend..." -ForegroundColor Green
Set-Location $PSScriptRoot
npx ts-node -r tsconfig-paths/register src/server.ts
