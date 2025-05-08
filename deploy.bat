@echo off

echo Step 0: Incrementing version number in public/version.json...
powershell -Command "$v = Get-Content 'public/version.json' | ConvertFrom-Json; $parts = $v.version -split '\.'; $parts[2] = [int]$parts[2] + 1; $v.version = ($parts -join '.'); $v | ConvertTo-Json -Depth 10 | Set-Content 'public/version.json'"
if errorlevel 1 (
    echo Failed to update version.json.
    exit /b %errorlevel%
)

echo Step 1: Building with yarn...
call yarn build
if errorlevel 1 (
    echo Build failed.
    exit /b %errorlevel%
)

echo Step 2: Running css_trans.py...
python css_trans.py
if errorlevel 1 (
    echo Python script failed.
    exit /b %errorlevel%
)

echo Step 3: Deleting existing boramae.zip if it exists...
if exist boramae.zip del boramae.zip

echo Step 4: Zipping the dist folder into boramae.zip...
powershell -Command "Compress-Archive -Path dist\* -DestinationPath boramae.zip"
if errorlevel 1 (
    echo Zipping failed.
    exit /b %errorlevel%
)

echo All steps completed successfully.

