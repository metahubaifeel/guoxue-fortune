# 小师傅来一卦 - 现代部署方案

## 🚀 推荐方案：Vercel + Railway (免费且简单)

### 步骤1：部署AI代理服务器到Railway

1. **注册Railway账号**
   - 访问 [https://railway.app](https://railway.app)
   - 使用GitHub账号登录

2. **创建新项目**
   ```bash
   # 在项目根目录创建railway配置文件
   touch railway.json
   ```

3. **创建railway.json配置**
   ```json
   {
     "project": "xiaoshifu-ai-proxy",
     "services": {
       "ai-proxy": {
         "build": "npm install",
         "start": "node ai-proxy-server.js",
         "env": {
           "NODE_ENV": "production",
           "PORT": "${PORT}"
         }
       }
     }
   }
   ```

4. **部署到Railway**
   ```bash
   # 安装Railway CLI
   npm install -g @railway/cli
   
   # 登录
   railway login
   
   # 部署
   railway up
   ```

### 步骤2：部署前端到Vercel

1. **注册Vercel账号**
   - 访问 [https://vercel.com](https://vercel.com)
   - 使用GitHub账号登录

2. **修改前端API调用**
   ```javascript
   // 在script.js中修改AI代理地址
   const proxyEndpoint = 'https://xiaoshifu-ai-proxy.up.railway.app/api/ai-fortune';
   ```

3. **创建vercel.json**
   ```json
   {
     "public": true,
     "github": {
       "enabled": false
     },
     "functions": {
       "api/*.js": {
         "runtime": "nodejs18.x"
       }
     }
   }
   ```

4. **部署到Vercel**
   ```bash
   # 安装Vercel CLI
   npm install -g vercel
   
   # 部署
   vercel --prod
   ```

## 🎯 方案2：Netlify + Render (备选免费方案)

### Render部署AI代理
```bash
# 创建render.yaml
services:
  - type: web
    name: xiaoshifu-ai-proxy
    env: node
    buildCommand: npm install
    startCommand: node ai-proxy-server.js
    envVars:
      - key: NODE_ENV
        value: production
```

### Netlify部署前端
1. 拖拽项目到 [netlify.com](https://netlify.com)
2. 自动构建部署
3. 设置环境变量

## 🌟 方案3：腾讯云轻量应用服务器 (国内推荐)

### 服务器配置
```bash
# 购买轻量应用服务器 (Ubuntu 20.04)
# 配置：1核2G，50GB SSD，月流量500GB
# 价格：约30元/月

# SSH连接服务器
ssh root@your-server-ip

# 安装Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装PM2进程管理器
npm install -g pm2
```

### 部署脚本
```bash
#!/bin/bash
# deploy.sh

# 克隆项目
git clone https://github.com/your-username/xiaoshifu-fortune.git
cd xiaoshifu-fortune

# 安装依赖
npm install

# 启动AI代理服务器
pm2 start ai-proxy-server.js --name "ai-proxy"

# 启动前端服务
pm2 start "npm run serve" --name "frontend"

# 保存PM2配置
pm2 save
pm2 startup
```

### Nginx配置
```nginx
server {
    listen 80;
    server_name xiaoshifu.com;
    
    # 前端代理
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    # AI代理API
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🔧 环境变量配置

### Railway环境变量
```bash
# 在Railway控制台设置
API_KEY=3402183a-fbff-4f4d-8379-9477281a706c
MODEL_NAME=doubao-1-5-pro-32k-250115
API_ENDPOINT=https://ark.cn-beijing.volces.com/api/v3/chat/completions
```

### 前端配置更新
```javascript
// 根据不同环境设置API地址
const getApiEndpoint = () => {
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:3001/api/ai-fortune';
  }
  // Railway部署地址
  return 'https://xiaoshifu-ai-proxy.up.railway.app/api/ai-fortune';
};
```

## 🚀 一键部署按钮

### Railway一键部署
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/your-username/xiaoshifu-fortune)

### Vercel一键部署
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/xiaoshifu-fortune)

## 📊 成本对比

| 方案 | 前端托管 | AI代理 | 域名 | 月费用 | 推荐指数 |
|-----|---------|--------|------|--------|----------|
| Vercel+Railway | 免费 | 免费 | 可选 | ¥0 | ⭐⭐⭐⭐⭐ |
| Netlify+Render | 免费 | 免费 | 可选 | ¥0 | ⭐⭐⭐⭐ |
| 腾讯云 | ¥30 | ¥0 | ¥10 | ¥40 | ⭐⭐⭐⭐ |
| 阿里云 | ¥30 | ¥0 | ¥10 | ¥40 | ⭐⭐⭐⭐ |

## 🎯 推荐选择

### 初学者推荐：Vercel + Railway
- ✅ 完全免费
- ✅ 一键部署
- ✅ 自动HTTPS
- ✅ 全球CDN
- ✅ Git集成

### 国内用户推荐：腾讯云
- ✅ 国内访问快
- ✅ 备案支持
- ✅ 中文文档
- ✅ 客服支持

## 🚨 注意事项

1. **API密钥安全**
   - 不要硬编码在代码中
   - 使用环境变量
   - 定期更换密钥

2. **请求频率限制**
   - 添加请求限流
   - 防止恶意调用
   - 监控API使用量

3. **错误处理**
   - 添加备用方案
   - 友好的错误提示
   - 日志记录

## 📞 技术支持

- Railway文档: https://docs.railway.app
- Vercel文档: https://vercel.com/docs
- 火山引擎API: https://www.volcengine.com/docs

---

**选择适合你的方案，开始部署吧！** 🚀