@echo off
title Khoi Chay Website Tinh Yeu
echo =======================================================
echo     KHOI DONG DIGITAL MEMORY CAPSULE (WEBSITE TINH YEU)
echo =======================================================
echo.
echo Dang kiem tra va tai cau hinh he thong...

:: Thiet lap PATH du phong
set PATH=%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;C:\Program Files\nodejs\;%USERPROFILE%\AppData\Roaming\npm;%PATH%

echo Server dang duoc khoi chay tai dia chi: http://localhost:3000
echo.
echo =======================================================
echo HUONG DAN TRUY CAP:
echo 1. Trang chu: http://localhost:3000
echo 2. Trang Admin quan ly: http://localhost:3000/admin
echo.
echo Luu y: KHONG TAT cua so nay khi dang xem trang web!
echo Tu dong mo website trong 3 giay...
echo =======================================================

:: Mo trinh duyet mac dinh
timeout /t 3 /nobreak > null
start http://localhost:3000

:: Chay bang duong dan tuyet doi den npm.cmd de dam bao thanh cong 100% khong phu thuoc vao bien PATH
"C:\Program Files\nodejs\npm.cmd" run dev
pause
