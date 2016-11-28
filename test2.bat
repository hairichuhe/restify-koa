@echo off
fis3 server stop && fis3 server clean && fis3 server start && title web.bat && fis3 release -wL

rem rem taskkill /FI  "WINDOWTITLE eq web.bat" /IM cmd.exe /F
rem title web.bat
rem fis3 server stop&&fis3 server clean&&fis3 server start&&fis3 release -wL