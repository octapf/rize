# Fix remaining emerald colors in .tsx files

Write-Host "Fixing remaining text-emerald classes..." -ForegroundColor Cyan

$files = Get-ChildItem -Path "c:\Users\Arigo\OneDrive\Escritorio\web-dev\rize\mobile\app" -Recurse -Filter "*.tsx"

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName | Out-String
    $originalContent = $content
    
    # Replace text-emerald classes
    $content = $content -replace 'text-emerald-100', 'text-white/80'
    $content = $content -replace 'text-emerald-200', 'text-white/70'
    $content = $content -replace 'text-emerald-300', 'text-primary/80'
    $content = $content -replace 'text-emerald-400', 'text-primary'
    $content = $content -replace 'text-emerald-500', 'text-primary'
    $content = $content -replace 'text-emerald-600', 'text-primary'
    $content = $content -replace 'text-emerald-700', 'text-primary'
    $content = $content -replace 'text-emerald-800', 'text-primary'
    $content = $content -replace 'text-emerald-900', 'text-primary'
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Fixed: $($file.Name)" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "Done!" -ForegroundColor Cyan
