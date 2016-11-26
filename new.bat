@echo off
if "%1"=="ray" goto s
start "" "%~0" ray
echo Home here.
rem pause>nul
rem exit
:s
echo yes.
rem ping -n 2 127.1>nul
rem echo no.
rem color f0
rem exit