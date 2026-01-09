# GitHub上传步骤详解

## 第一步：创建GitHub仓库

### 方法一：网页创建（推荐新手）

1. **登录GitHub**
   - 访问 https://github.com
   - 点击右上角 "+" 号
   - 选择 "New repository"

2. **填写仓库信息**
   - Repository name: `xiaoshifu-fortune`
   - Description: `小师傅来一卦 - 结合小六壬算法和AI智能的国学运势应用`
   - 选择 "Public"（免费）
   - 勾选 "Add a README file"
   - 点击 "Create repository"

### 方法二：命令行创建（适合熟悉Git的用户）

```bash
# 在本地项目目录执行
git init
git add .
git commit -m "小师傅来一卦 - 初始版本"

# 创建GitHub仓库并推送
git remote add origin https://github.com/你的用户名/xiaoshifu-fortune.git
git branch -M main
git push -u origin main
```

## 第二步：上传文件

### 方法一：拖拽上传（最简单）

1. **进入你的仓库页面**
   - https://github.com/你的用户名/xiaoshifu-fortune

2. **上传文件**
   - 点击 "Add file" → "Upload files"
   - 拖拽以下文件到上传区域：
     - index.html
     - script.js
     - style.css
     - ai-proxy-server.js
     - package.json
     - README.md
     - 其他文档文件

3. **提交更改**
   - 在下方填写提交信息："上传小师傅来一卦应用文件"
   - 点击 "Commit changes"

### 方法二：Git命令行上传

```bash
# 1. 初始化Git仓库（如果还没做）
git init

# 2. 添加所有文件
git add .

# 3. 提交更改
git commit -m "小师傅来一卦 - 完整应用上传"

# 4. 关联远程仓库
git remote add origin https://github.com/你的用户名/xiaoshifu-fortune.git

# 5. 推送到GitHub
git push -u origin main
```

## 第三步：验证上传

1. **检查文件**
   - 确保所有文件都已上传到GitHub
   - 检查文件内容是否正确

2. **测试访问**
   - 访问：https://github.com/你的用户名/xiaoshifu-fortune
   - 确认能看到所有文件

## 🎯 完成！

上传完成后，你就可以进行下一步的Railway部署了！

**下一步：** [点击这里查看Railway部署教程](RAILWAY_DEPLOYMENT.md)