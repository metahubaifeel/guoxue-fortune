# 小师傅来一卦 - 一键部署指南

## 🚀 最简单方案：Railway + Vercel（推荐）

### 第一步：部署AI代理服务器（Railway）

1. **点击一键部署按钮**
   
   [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2Fyour-username%2Fxiaoshifu-fortune&envs=API_KEY%2CMODEL_NAME%2CAPI_ENDPOINT&API_KEY=3402183a-fbff-4f4d-8379-9477281a706c&MODEL_NAME=doubao-1-5-pro-32k-250115&API_ENDPOINT=https%3A%2F%2Fark.cn-beijing.volces.com%2Fapi%2Fv3%2Fchat%2Fcompletions)

2. **或者手动部署**
   ```bash
   # 安装Railway CLI
   npm install -g @railway/cli
   
   # 登录
   railway login
   
   # 在ai-proxy-server.js目录下
   railway init --name xiaoshifu-ai-proxy
   railway variables set API_KEY="3402183a-fbff-4f4d-8379-9477281a706c"
   railway up
   ```

3. **获取部署地址**
   部署完成后，Railway会给你一个类似 `https://xiaoshifu-ai-proxy.up.railway.app` 的地址

### 第二步：部署前端（Vercel）

1. **点击一键部署按钮**
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fxiaoshifu-fortune)

2. **或者手动部署**
   ```bash
   # 安装Vercel CLI
   npm install -g vercel
   
   # 登录
   vercel login
   
   # 在项目根目录下
   vercel --prod
   ```

3. **配置环境变量**
   在Vercel控制台中，设置AI代理地址：
   ```
   AI_PROXY_URL=https://xiaoshifu-ai-proxy.up.railway.app
   ```

## 🎯 方案二：国内服务器部署（推荐国内用户）

### 购买腾讯云轻量应用服务器
1. **配置选择**
   - 地区：中国大陆
   - 系统：Ubuntu 20.04
   - 配置：1核2G，50GB SSD
   - 价格：约30元/月

### 一键部署脚本
```bash
# 连接服务器后执行
wget -O deploy.sh https://raw.githubusercontent.com/your-username/xiaoshifu-fortune/main/deploy-prod.sh
chmod +x deploy.sh
./deploy.sh
```

### 手动部署步骤
```bash
# 1. 安装Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. 安装PM2进程管理器
npm install -g pm2

# 3. 克隆项目
git clone https://github.com/your-username/xiaoshifu-fortune.git
cd xiaoshifu-fortune

# 4. 安装依赖
npm install

# 5. 启动AI代理服务器
pm2 start ai-proxy-server.js --name "ai-proxy"

# 6. 启动前端服务
pm2 start "npm run serve" --name "frontend"

# 7. 设置开机自启
pm2 save
pm2 startup
```

### Nginx配置（反向代理）
```nginx
server {
    listen 80;
    server_name xiaoshifu.com;  # 你的域名
    
    # 前端
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    
    # AI代理API
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        
        # 添加CORS头
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
        add_header Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range";
        
        # 处理OPTIONS请求
        if ($request_method = 'OPTIONS') {
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
            add_header Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range";
            add_header Access-Control-Max-Age 1728000;
            add_header Content-Type 'text/plain; charset=utf-8';
            add_header Content-Length 0;
            return 204;
        }
    }
}
```

## 🔧 环境变量配置

### Railway环境变量
```bash
API_KEY=3402183a-fbff-4f4d-8379-9477281a706c
MODEL_NAME=doubao-1-5-pro-32k-250115
API_ENDPOINT=https://ark.cn-beijing.volces.com/api/v3/chat/completions
```

### 前端配置更新
在部署前，需要更新 `script.js` 中的API地址：

```javascript
// 根据部署环境自动选择API地址
const getApiEndpoint = () => {
    if (window.location.hostname === 'localhost') {
        return 'http://localhost:3001/api/ai-fortune';
    }
    
    // Railway部署
    if (window.location.hostname.includes('railway.app')) {
        return 'https://xiaoshifu-ai-proxy.up.railway.app/api/ai-fortune';
    }
    
    // 自定义域名
    return 'https://你的域名.com/api/ai-fortune';
};
```

## 🌟 部署完成后的优化

### 1. 添加域名
- 在Railway/Vercel控制台添加自定义域名
- 配置DNS解析

### 2. 启用HTTPS
- Railway和Vercel自动提供HTTPS
- 国内服务器需要申请SSL证书

### 3. 性能优化
- 启用CDN加速
- 配置浏览器缓存
- 压缩静态资源

### 4. 监控告警
- 设置服务健康检查
- 配置错误日志收集
- 添加访问统计

## 📱 测试部署结果

部署完成后，可以通过以下方式测试：

1. **访问前端页面**
   ```
   https://你的域名.com
   ```

2. **测试AI代理**
   ```bash
   curl -X POST https://你的域名.com/api/ai-fortune \
     -H "Content-Type: application/json" \
     -d '{"card":"A","num1":1,"num2":2,"weather":"晴","mood":"开心","guaXiang":"大安"}'
   ```

3. **完整功能测试**
   - 洗牌抽牌
   - 输入数字
   - 选择天气心情
   - 获取运势解读

## 🎯 选择建议

### 推荐方案对比

| 方案 | 优点 | 缺点 | 费用 | 推荐指数 |
|-----|------|------|------|----------|
| **Railway+Vercel** | 免费、简单、自动HTTPS | 国外服务 | ¥0 | ⭐⭐⭐⭐⭐ |
| **腾讯云** | 国内访问快、稳定 | 需要备案、付费 | ¥40/月 | ⭐⭐⭐⭐ |
| **阿里云** | 国内访问快、生态完善 | 需要备案、付费 | ¥40/月 | ⭐⭐⭐⭐ |

### 选择建议
- **个人项目/测试**: Railway + Vercel
- **国内商业项目**: 腾讯云/阿里云
- **国外用户**: Railway + Vercel

---

**祝你部署顺利！有问题随时联系我** 🚀