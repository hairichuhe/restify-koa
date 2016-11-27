@echo off
echo clean
node koa-demo.js
if %ERRORLEVEL% EQU 0 (echo success) else (exit)
cmd