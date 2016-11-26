@echo off
if "%1"=="ray" goto s
start "" "%~0" ray
echo Home here.
pause>nul
exit
:s
echo yes.
ping -n 2 127.1>nul
echo no.
color f0
exit