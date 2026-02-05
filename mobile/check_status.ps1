try {
    $job = Get-Job -Name "ExpoServer" -ErrorAction SilentlyContinue
    "Job Status: $($job.State)" | Out-File status_check.txt
    
    $tcp = Get-NetTCPConnection -LocalPort 8082 -ErrorAction SilentlyContinue
    if ($tcp) {
        "Port 8082: OPEN" | Out-File status_check.txt -Append
    } else {
        "Port 8082: CLOSED" | Out-File status_check.txt -Append
    }
} catch {
    $_ | Out-File status_check.txt -Append
}
