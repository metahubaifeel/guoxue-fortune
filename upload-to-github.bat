@echo off
echo 🚀 GitHub上传脚本 - 小师傅来一卦
echo ======================================

:: 配置你的GitHub用户名和邮箱
set GITHUB_USERNAME=metahubaifeel
set GITHUB_EMAIL=your-email@example.com  :: 替换为你的邮箱
set REPO_NAME=xiaoshifu-fortune

echo ⚙️ 配置Git用户信息...
git config user.name "%GITHUB_USERNAME%"
git config user.email "%GITHUB_EMAIL%"

echo 📁 添加所有文件...
git add .

echo 💾 提交更改...
git commit -m "小师傅来一卦 - 完整应用上传"

echo 🔗 关联远程仓库...
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git 2>nul

echo 🚀 推送到GitHub...
git branch -M main
git push -u origin main

echo ✅ 上传完成！
echo 🌟 你的GitHub仓库地址：
echo https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo.
echo 🎯 下一步：回到Railway继续部署！
pause