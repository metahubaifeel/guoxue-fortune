# 国学今日运势 - 部署指南

## 🚀 快速部署

### 方式1：静态文件部署（推荐）

#### 1. 构建项目
```bash
npm install
npm run build
```

#### 2. 上传文件
将 `dist` 目录下的所有文件上传到您的服务器或静态托管服务。

#### 3. 访问应用
通过浏览器访问上传的 `index.html` 文件即可。

### 方式2：GitHub Pages 部署

#### 1. 创建GitHub仓库
- 在GitHub上创建新仓库
- 命名为 `guoxue-fortune` 或其他您喜欢的名称

#### 2. 推送代码
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/guoxue-fortune.git
git push -u origin main
```

#### 3. 启用GitHub Pages
- 进入仓库设置
- 找到 "Pages" 选项
- 选择 "Deploy from a branch"
- 选择 `main` 分支和 `/` 根目录
- 保存设置

#### 4. 访问应用
等待几分钟后，访问 `https://your-username.github.io/guoxue-fortune/`

### 方式3：Netlify 部署

#### 1. 准备构建
```bash
npm run build
```

#### 2. 拖拽部署
- 访问 [Netlify](https://netlify.com)
- 拖拽 `dist` 文件夹到部署区域
- 自动获得部署链接

### 方式4：Vercel 部署

#### 1. 安装Vercel CLI
```bash
npm i -g vercel
```

#### 2. 部署项目
```bash
vercel --prod
```

## 📁 文件结构说明

```
guoxue-fortune/
├── dist/                    # 构建输出目录
│   ├── index.html          # 主页面文件
│   ├── style.min.css       # 压缩后的样式文件
│   ├── script.min.js       # 压缩后的脚本文件
│   └── version.txt         # 版本信息
├── src/                     # 源代码目录
│   ├── index.html          # 原始HTML文件
│   ├── style.css           # 原始样式文件
│   └── script.js           # 原始脚本文件
├── package.json             # 项目配置文件
├── build.sh                 # Linux/Mac构建脚本
├── build.bat                # Windows构建脚本
└── deploy.md                # 部署指南
```

## 🔧 环境要求

- Node.js 14.0.0 或更高版本
- 现代浏览器（Chrome 80+, Firefox 75+, Safari 13+, Edge 80+）
- 静态文件服务器（如nginx、Apache、或简单的HTTP服务器）

## 🌐 服务器配置

### Nginx 配置示例
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        root /path/to/your/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # 静态资源缓存
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Apache 配置示例
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /path/to/your/dist
    
    <Directory /path/to/your/dist>
        AllowOverride All
        Require all granted
    </Directory>
    
    # 静态资源缓存
    <FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
        Header set Cache-Control "max-age=31536000, public, immutable"
    </FilesMatch>
</VirtualHost>
```

## 🔒 安全建议

1. **API密钥安全**：
   - 将API密钥存储在环境变量中
   - 不要在客户端代码中暴露敏感信息
   - 考虑使用后端代理来隐藏API调用

2. **HTTPS 配置**：
   - 使用SSL证书启用HTTPS
   - 配置HSTS头部
   - 启用内容安全策略(CSP)

3. **性能优化**：
   - 启用Gzip压缩
   - 配置适当的缓存策略
   - 使用CDN加速静态资源

## 📊 性能优化

### 构建优化
```bash
# 压缩图片（如果有的话）
# 压缩CSS和JS
npm run build
```

### 加载优化
- 使用懒加载技术
- 预加载关键资源
- 优化字体加载

## 🎯 监控和维护

### 1. 性能监控
- 使用Google PageSpeed Insights检查性能
- 监控Core Web Vitals指标
- 定期检查加载时间

### 2. 错误监控
- 配置前端错误收集
- 监控API调用失败率
- 设置告警机制

### 3. 内容更新
- 定期更新运势内容
- 优化AI提示词
- 收集用户反馈

## 📞 技术支持

如果遇到部署问题，请检查：
1. 文件路径是否正确
2. 静态资源是否可访问
3. 浏览器控制台是否有错误
4. 网络连接是否正常

## 🎉 恭喜！

您的国学今日运势应用已经成功部署！用户现在可以通过您提供的链接访问应用，体验小六壬起卦的乐趣。