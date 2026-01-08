@echo off
REM 国学今日运势 - Windows构建脚本
echo 🚀 开始构建国学今日运势项目...

REM 检查Node.js是否安装
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ 请先安装Node.js
    exit /b 1
)

REM 安装依赖
echo 📦 安装依赖...
call npm install
if %errorlevel% neq 0 (
    echo ❌ 依赖安装失败
    exit /b 1
)

REM 创建构建目录
echo 📁 创建构建目录...
if not exist dist mkdir dist

REM 复制HTML文件
echo 📄 处理HTML文件...
copy index.html dist\ >nul

REM 压缩CSS文件
echo 🎨 压缩CSS文件...
where cleancss >nul 2>nul
if %errorlevel% equ 0 (
    cleancss -o dist\style.min.css style.css
    echo ✅ CSS压缩完成
) else (
    echo ⚠️  未找到cleancss，直接复制CSS文件
    copy style.css dist\ >nul
)

REM 压缩JS文件
echo 📜 压缩JS文件...
where uglifyjs >nul 2>nul
if %errorlevel% equ 0 (
    uglifyjs script.js -o dist\script.min.js -c -m
    echo ✅ JS压缩完成
) else (
    echo ⚠️  未找到uglifyjs，直接复制JS文件
    copy script.js dist\ >nul
)

REM 更新HTML文件中的引用
echo 🔗 更新HTML引用...
if exist dist\style.min.css (
    powershell -Command "(Get-Content dist\index.html) -replace 'style\.css', 'style.min.css' | Set-Content dist\index.html"
)
if exist dist\script.min.js (
    powershell -Command "(Get-Content dist\index.html) -replace 'script\.js', 'script.min.js' | Set-Content dist\index.html"
)

REM 创建版本信息
echo 🏷️  创建版本信息...
echo 构建时间: %date% %time% > dist\version.txt
echo 版本: 1.0.0 >> dist\version.txt

REM 计算文件大小
echo 📊 构建文件大小统计:
dir dist\

echo ✅ 构建完成！文件已保存到dist目录
echo 📂 构建文件说明:
echo   - index.html: 主页面文件
echo   - style.css/style.min.css: 样式文件
echo   - script.js/script.min.js: 脚本文件
echo   - version.txt: 版本信息
echo.
echo 🌐 部署方式:
echo 1. 将dist目录下的所有文件上传到您的服务器
echo 2. 或者使用GitHub Pages、Netlify等静态托管服务
echo 3. 确保服务器支持静态文件访问
echo.
echo 🎯 快速测试: cd dist && python -m http.server 8080
pause