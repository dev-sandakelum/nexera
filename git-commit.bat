@echo off
setlocal enabledelayedexpansion

echo ================================
echo Git Commit Helper
echo ================================
echo.

REM Stage all changes
echo [1/2] Staging all changes...

git add .

echo ✓ Changes staged successfully
echo.

REM Commit using the message file
git commit -F git_commit_msg.txt

REM Clean up message file
echo ✓ Commit created successfully
echo.

echo ================================
echo Commit done! ✓
echo ================================
echo Run 'git push' when ready to push to GitHub
pause