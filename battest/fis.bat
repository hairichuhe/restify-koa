@echo off
echo start
rem if 
rem 	"fis3 server stop"; then
rem 	fis3 server clean
rem 	fis3 server start
rem 	fis3 release -wL
rem else
rem 	fis3 server clean
rem 	fis3 server start
rem 	fis3 release -wL
rem cmd
fis3 server stop&&fis3 server clean&&fis3 server start&&fis3 release -wL