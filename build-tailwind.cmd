@echo off
setlocal
cd /d "%~dp0"
set "TAILWIND_EXE=tailwindcss-windows-x64.exe"
set "TAILWIND_URL=https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-windows-x64.exe"

if not exist "%TAILWIND_EXE%" (
  echo Downloading the official Tailwind CSS standalone CLI...
  curl.exe -L --fail --silent --show-error "%TAILWIND_URL%" -o "%TAILWIND_EXE%"
  if errorlevel 1 (
    echo.
    echo Download failed. Please check your internet connection and run this file again.
    pause
    exit /b 1
  )
)

echo Building ApexIQ production CSS...
"%TAILWIND_EXE%" -i css/input.css -o css/output.css --minify
if errorlevel 1 (
  echo.
  echo Tailwind build failed.
  pause
  exit /b 1
)

if not exist "css\output.css" (
  echo.
  echo Build finished but css\output.css was not created.
  pause
  exit /b 1
)

echo.
echo ApexIQ production CSS is ready.
echo Opening ApexIQ...
start "" "index.html"
endlocal
