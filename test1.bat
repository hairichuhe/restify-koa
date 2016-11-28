@echo off  
start cmd /c "cd/d d:\&&echo 这是一个窗口&&pause&&ping 172.30.218.1&&ping 172.30.218.111"  
start cmd /c "cd/d d:\&&echo 这是另一个窗口&&pause&&ping 192.168.91.1"
exit