Start-Job -Name "ExpoServer" -ScriptBlock {
    param($root)
    Set-Location $root
    cd mobile
    $env:CI="true"
    npx expo start --web --port 8082 --localhost
} -ArgumentList $PWD
Write-Host "Server job started. Waiting for it to warm up..."
Start-Sleep -Seconds 15
Write-Host "Checking job status..."
Get-Job
