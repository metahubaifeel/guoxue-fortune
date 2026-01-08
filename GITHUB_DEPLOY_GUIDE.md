# 🚀 GitHub Pages 部署完整指南

## 📋 步骤概览

### 第1步：创建GitHub仓库
1. 访问 https://github.com/new
2. 仓库名称：`guoxue-fortune`
3. 选择 **Public**（公开仓库）
4. **不要** 勾选 "Initialize this repository with a README"
5. 点击 **Create repository**

### 第2步：准备本地代码
在您的项目目录中执行以下命令：

```bash
# 1. 删除现有的git仓库（如果有）
rd /s /q .git 2>nul || Remove-Item -Recurse -Force .git -ErrorAction SilentlyComplete

# 2. 初始化新的git仓库
git init

# 3. 添加.gitignore文件（已创建）
echo node_modules/ > .gitignore
echo dist/ >> .gitignore

# 4. 添加所有文件
git add .

# 5. 提交代码
git commit -m "Initial commit: 国学今日运势 - 小六壬起卦运势测算工具"
```

### 第3步：推送到GitHub
```bash
# 1. 添加远程仓库（替换YOUR_USERNAME为您的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/guoxue-fortune.git

# 2. 创建main分支
git branch -M main

# 3. 推送代码
git push -u origin main
```

### 第4步：启用GitHub Pages
1. 进入您的GitHub仓库页面
2. 点击 **Settings** 标签
3. 向下滚动到 **Pages** 部分
4. 在 **Source** 下选择：
   - **Deploy from a branch**
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. 点击 **Save**

### 第5步：等待部署
- GitHub Pages需要2-3分钟来部署您的网站
- 部署完成后，访问：`https://YOUR_USERNAME.github.io/guoxue-fortune/`

## 🎯 验证部署成功

### 检查部署状态
1. 在GitHub仓库页面，点击 **Actions** 标签
2. 查看是否有绿色的✅标记
3. 如果有红色❌，点击查看错误详情

### 访问您的网站
打开浏览器，访问：
```
https://YOUR_USERNAME.github.io/guoxue-fortune/
```

## 🔧 常见问题解决

### 问题1：页面显示404
**原因**：GitHub Pages还未完成部署
**解决**：等待2-3分钟后刷新页面

### 问题2：CSS/JS文件加载失败
**原因**：文件路径不正确
**解决**：检查index.html中的文件引用路径

### 问题3：API调用失败
**原因**：GitHub Pages不支持后端API
**解决**：确保使用的是前端JavaScript API调用

### 问题4：中文显示乱码
**原因**：字符编码设置
**解决**：确认index.html中有：
```html
<meta charset="UTF-8">
```

## 🚀 高级配置（可选）

### 绑定自定义域名
1. 在Settings → Pages中
2. Custom domain输入您的域名
3. 在DNS提供商处添加CNAME记录：
   - 主机记录：`www` 或 `@`
   - 记录值：`YOUR_USERNAME.github.io`

### 启用HTTPS
GitHub Pages会自动为GitHub子域名启用HTTPS
自定义域名需要等待SSL证书签发

### 添加网站图标
1. 创建favicon.ico文件
2. 在index.html的`<head>`中添加：
```html
<link rel="icon" type="image/x-icon" href="favicon.ico">
```

## 📱 测试您的网站

### 功能测试清单
- ✅ 页面正常加载
- ✅ 扑克牌洗牌功能
- ✅ 数字输入验证
- ✅ 天气选择功能
- ✅ 心情选择功能
- ✅ 运势生成正常
- ✅ 完整卦象诗句显示
- ✅ 个性化建议生成
- ✅ 移动端适配良好

### 浏览器兼容性测试
- Chrome/Chromium
- Firefox
- Safari
- Edge

## 🎉 恭喜！

您的国学今日运势应用已经成功部署到GitHub Pages！

现在您可以：
- 分享链接给朋友和家人
- 在社交媒体上展示您的作品
- 继续优化和完善功能

部署地址：`https://YOUR_USERNAME.github.io/guoxue-fortune/`

如果遇到任何问题，请随时询问！