# GitHub上传脚本 - 一键上传所有文件

# 配置你的GitHub用户名和邮箱
GITHUB_USERNAME="metahubaifeel"
GITHUB_EMAIL="your-email@example.com"  # 替换为你的邮箱
REPO_NAME="xiaoshifu-fortune"

# 初始化Git仓库（如果还没做）
if [ ! -d ".git" ]; then
    echo "🚀 初始化Git仓库..."
    git init
fi

# 配置Git用户信息
echo "⚙️ 配置Git用户信息..."
git config user.name "$GITHUB_USERNAME"
git config user.email "$GITHUB_EMAIL"

# 添加所有文件
echo "📁 添加所有文件..."
git add .

# 提交更改
echo "💾 提交更改..."
git commit -m "小师傅来一卦 - 完整应用上传"

# 关联远程仓库
echo "🔗 关联远程仓库..."
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git 2>/dev/null || true

# 推送到GitHub
echo "🚀 推送到GitHub..."
git branch -M main
git push -u origin main

echo "✅ 上传完成！"
echo "🌟 你的GitHub仓库地址："
echo "https://github.com/$GITHUB_USERNAME/$REPO_NAME"