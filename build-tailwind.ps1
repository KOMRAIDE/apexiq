$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
$exe = Join-Path $PSScriptRoot 'tailwindcss-windows-x64.exe'
$url = 'https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-windows-x64.exe'
if (-not (Test-Path $exe)) {
    Write-Host 'Downloading the official Tailwind CSS standalone CLI...'
    Invoke-WebRequest -Uri $url -OutFile $exe
}
& $exe -i (Join-Path $PSScriptRoot 'css\input.css') -o (Join-Path $PSScriptRoot 'css\output.css') --minify
if (-not (Test-Path (Join-Path $PSScriptRoot 'css\output.css'))) { throw 'Tailwind build did not create css\output.css.' }
Write-Host 'ApexIQ production CSS is ready.'
