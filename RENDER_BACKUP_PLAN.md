# Render部署方案 - 备用选择

## 🚀 Render部署（和Railway类似）

### 第一步：访问Render
1. 打开 https://render.com
2. 用GitHub账号登录

### 第二步：创建Web Service
1. 点击 "New" → "Web Service"
2. 连接你的GitHub仓库：`metahubaifeel/xiaoshifu-fortune`
3. 配置：
   - **Name**: `xiaoshifu-ai-proxy`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node ai-proxy-server.js`

### 第三步：设置环境变量
```
API_KEY=3402183a-fbff-4f4d-8379-9477281a706c
MODEL_NAME=doubao-1-5-pro-32k-250115
API_ENDPOINT=https://ark.cn-beijing.volces.com/api/v3/chat/completions
```

### 第四步：部署
点击 "Create Web Service"，等待部署完成

### 第五步：获取地址
Render会给你类似这样的地址：
```
https://xiaoshifu-ai-proxy.onrender.com
```

## 🎯 下一步

**告诉我现在的情况：**

1. ✅ **Railway页面上有什么变化吗？**
2. ✅ **看到新的错误信息了吗？**
3. ✅ **要不要试试Render方案？**

**我一步步帮你解决！** 💪

**无论用什么平台，最终目标都是让你的AI代理服务器跑起来！**