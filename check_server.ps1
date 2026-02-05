$ErrorActionPreference = "SilentlyContinue"
$job = Get-Job -Name "ExpoServer"
"Job State: $($job.State)" | Out-File c:\Users\Arigo\OneDrive\Escritorio\web-dev\rize\server_status.txt
$conn = Get-NetTCPConnection -LocalPort 8082
if ($conn) { "Port 8082: OPEN" | Out-File c:\Users\Arigo\OneDrive\Escritorio\web-dev\rize\server_status.txt -Append }
else { "Port 8082: CLOSED" | Out-File c:\Users\Arigo\OneDrive\Escritorio\web-dev\rize\server_status.txt -Append }
