@echo off
setlocal
echo ========================================================
echo   READY PLAYER ONE // OASIS PORTFOLIO GITHUB DEPLOYER
echo ========================================================
echo.
echo Your Git user email is configured as: nithin.ase22@gmail.com
echo.
set /p REPO_NAME="Enter your GitHub repository name [default: portfolio]: "
if "%REPO_NAME%"=="" set REPO_NAME=portfolio

set REMOTE_URL=https://github.com/NithinReddy22/%REPO_NAME%.git

echo.
echo Connecting to remote: %REMOTE_URL%
git remote remove origin 2>nul
git remote add origin %REMOTE_URL%
git branch -M main

echo.
echo Pushing code to GitHub...
git push -u origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo ========================================================
    echo   [SUCCESS] CODE DEPLOYED TO GITHUB!
    echo   If using NithinReddy22.github.io, your site will be live at:
    echo   https://nithinreddy22.github.io/
    echo ========================================================
) else (
    echo.
    echo [NOTE] If this is a new repository, make sure you created the repo on github.com first!
    echo URL: https://github.com/new
)
echo.
pause
