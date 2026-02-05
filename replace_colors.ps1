# Script para reemplazar colores antiguos con la nueva paleta
# Primary: #9D12DE (Morado)
# Highlight/Accent: #FFEA00 (Amarillo)
# Background: #262626
# Text: #E3E3E3

$mobileAppPath = "c:\Users\Arigo\OneDrive\Escritorio\web-dev\rize\mobile\app"

Write-Host "Reemplazando colores en archivos .tsx..." -ForegroundColor Cyan

# Obtener todos los archivos .tsx
$files = Get-ChildItem -Path $mobileAppPath -Filter "*.tsx" -Recurse

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $originalContent = $content
    
    # Reemplazar colores hexadecimales
    $content = $content -replace '#10B981', '#9D12DE'  # Verde principal -> Morado
    $content = $content -replace '#059669', '#7C3AED'  # Verde oscuro -> Morado oscuro
    $content = $content -replace '#047857', '#6D28D9'  # Verde más oscuro -> Morado más oscuro
    $content = $content -replace '#34D399', '#C084FC'  # Verde claro -> Morado claro
    $content = $content -replace '#3B82F6', '#9D12DE'  # Azul -> Morado
    $content = $content -replace '#2563EB', '#7C3AED'  # Azul oscuro -> Morado oscuro
    $content = $content -replace '#60A5FA', '#C084FC'  # Azul claro -> Morado claro
    $content = $content -replace '#F59E0B', '#FFEA00'  # Naranja -> Amarillo
    
    # Reemplazar clases Tailwind emerald
    $content = $content -replace 'bg-emerald-500', 'bg-primary'
    $content = $content -replace 'bg-emerald-600', 'bg-primary'
    $content = $content -replace 'bg-emerald-400', 'bg-primary'
    $content = $content -replace 'bg-emerald-100', 'bg-primary/10'
    $content = $content -replace 'text-emerald-500', 'text-primary'
    $content = $content -replace 'text-emerald-600', 'text-primary'
    $content = $content -replace 'text-emerald-400', 'text-primary'
    $content = $content -replace 'text-emerald-100', 'text-primary/50'
    $content = $content -replace 'border-emerald-500', 'border-primary'
    $content = $content -replace 'border-emerald-200', 'border-primary/20'
    
    # Reemplazar clases Tailwind blue
    $content = $content -replace 'bg-blue-500', 'bg-primary'
    $content = $content -replace 'bg-blue-600', 'bg-primary'
    $content = $content -replace 'bg-blue-400', 'bg-primary/80'
    $content = $content -replace 'bg-blue-100', 'bg-primary/10'
    $content = $content -replace 'bg-blue-50', 'bg-primary/5'
    $content = $content -replace 'text-blue-500', 'text-primary'
    $content = $content -replace 'text-blue-600', 'text-primary'
    $content = $content -replace 'text-blue-400', 'text-primary/80'
    $content = $content -replace 'text-blue-300', 'text-primary/60'
    $content = $content -replace 'text-blue-200', 'text-primary/40'
    $content = $content -replace 'text-blue-100', 'text-highlight'
    $content = $content -replace 'border-blue-500', 'border-primary'
    $content = $content -replace 'border-blue-200', 'border-primary/20'
    
    # Reemplazar clases Tailwind green
    $content = $content -replace 'bg-green-500', 'bg-primary'
    $content = $content -replace 'text-green-500', 'text-primary'
    $content = $content -replace 'border-green-500', 'border-primary'
    
    # Reemplazar clases Tailwind yellow/amber para highlight
    $content = $content -replace 'bg-yellow-400', 'bg-highlight'
    $content = $content -replace 'bg-amber-400', 'bg-highlight'
    $content = $content -replace 'text-yellow-400', 'text-highlight'
    
    # Si hubo cambios, guardar el archivo
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Updated: $($file.Name)" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "Color replacement completed!" -ForegroundColor Cyan
