@echo off
taskkill /FI  "WINDOWTITLE eq web.bat" /IM cmd.exe /F
title web.bat
cmd