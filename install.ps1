# RIZE - Quick Start Script
# Este script automatiza la instalación inicial del proyecto

Write-Host "🚀 RIZE - Instalación Rápida" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

# Verificar Node.js
Write-Host "📦 Verificando Node.js..." -ForegroundColor Cyan
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js instalado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js no encontrado. Por favor instala Node.js 18+ desde https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Backend Setup
Write-Host ""
Write-Host "📚 Instalando Backend..." -ForegroundColor Cyan
Set-Location backend

if (!(Test-Path ".env")) {
    Write-Host "  → Creando archivo .env desde template..." -ForegroundColor Yellow
    Copy-Item ".env.example" -Destination ".env"
    Write-Host "  ⚠ IMPORTANTE: Edita backend/.env con tus credenciales MongoDB y JWT secrets" -ForegroundColor Yellow
}

Write-Host "  → Instalando dependencias npm..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Backend instalado correctamente" -ForegroundColor Green
} else {
    Write-Host "✗ Error instalando backend" -ForegroundColor Red
    exit 1
}

Set-Location ..

# Mobile Setup
Write-Host ""
Write-Host "📱 Instalando Mobile..." -ForegroundColor Cyan
Set-Location mobile

if (!(Test-Path ".env")) {
    Write-Host "  → Creando archivo .env desde template..." -ForegroundColor Yellow
    Copy-Item ".env.example" -Destination ".env"
    Write-Host "  ℹ Si usarás dispositivo físico, actualiza EXPO_PUBLIC_API_URL con tu IP local" -ForegroundColor Yellow
}

Write-Host "  → Instalando dependencias npm..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Mobile instalado correctamente" -ForegroundColor Green
} else {
    Write-Host "✗ Error instalando mobile" -ForegroundColor Red
    exit 1
}

Set-Location ..

# Summary
Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "✓ Instalación completada!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Próximos pasos:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Configura variables de entorno:" -ForegroundColor White
Write-Host "   - Edita backend/.env con tus credenciales MongoDB" -ForegroundColor Gray
Write-Host "   - Genera JWT secrets seguros (ver SETUP.md)" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Descarga las fuentes (si aún no lo hiciste):" -ForegroundColor White
Write-Host "   - Barlow: https://fonts.google.com/specimen/Barlow" -ForegroundColor Gray
Write-Host "   - Inter: https://fonts.google.com/specimen/Inter" -ForegroundColor Gray
Write-Host "   - Colócalas en mobile/assets/fonts/" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Inicia el backend:" -ForegroundColor White
Write-Host "   cd backend" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "4. En otra terminal, inicia mobile:" -ForegroundColor White
Write-Host "   cd mobile" -ForegroundColor Gray
Write-Host "   npm start" -ForegroundColor Gray
Write-Host ""
Write-Host "📖 Ver SETUP.md para más detalles" -ForegroundColor Cyan
Write-Host ""
