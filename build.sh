#!/bin/bash

# 国学今日运势 - 构建脚本
echo "🚀 开始构建国学今日运势项目..."

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 请先安装Node.js"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
npm install

# 创建构建目录
echo "📁 创建构建目录..."
mkdir -p dist

# 复制HTML文件
echo "📄 处理HTML文件..."
cp index.html dist/

# 压缩CSS文件
echo "🎨 压缩CSS文件..."
if command -v cleancss &> /dev/null; then
    cleancss -o dist/style.min.css style.css
    echo "✅ CSS压缩完成"
else
    echo "⚠️  未找到cleancss，直接复制CSS文件"
    cp style.css dist/
fi

# 压缩JS文件
echo "📜 压缩JS文件..."
if command -v uglifyjs &> /dev/null; then
    uglifyjs script.js -o dist/script.min.js -c -m
    echo "✅ JS压缩完成"
else
    echo "⚠️  未找到uglifyjs，直接复制JS文件"
    cp script.js dist/
fi

# 更新HTML文件中的引用
echo "🔗 更新HTML引用..."
if [ -f dist/style.min.css ]; then
    sed -i 's/style\.css/style.min.css/g' dist/index.html
fi
if [ -f dist/script.min.js ]; then
    sed -i 's/script\.js/script.min.js/g' dist/index.html
fi

# 创建版本信息
echo "🏷️  创建版本信息..."
echo "构建时间: $(date)" > dist/version.txt
echo "版本: 1.0.0" >> dist/version.txt

# 计算文件大小
echo "📊 构建文件大小统计:"
ls -lh dist/

echo "✅ 构建完成！文件已保存到dist目录"
echo "📂 构建文件说明:"
echo "  - index.html: 主页面文件"
echo "  - style.css/style.min.css: 样式文件"
echo "  - script.js/script.min.js: 脚本文件"
echo "  - version.txt: 版本信息"
echo ""
echo "🌐 部署方式:"
echo "1. 将dist目录下的所有文件上传到您的服务器"
echo "2. 或者使用GitHub Pages、Netlify等静态托管服务"
echo "3. 确保服务器支持静态文件访问"
echo ""
echo "🎯 快速测试: cd dist && python -m http.server 8080"