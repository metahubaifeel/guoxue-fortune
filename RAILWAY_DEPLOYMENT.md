# Railway部署AI代理服务器 - 超详细教程

## 🚀 第一步：点击一键部署按钮

### 点击这个按钮开始部署：

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2Fyour-username%2Fxiaoshifu-fortune&envs=API_KEY%2CMODEL_NAME%2CAPI_ENDPOINT&API_KEY=3402183a-fbff-4f4d-8379-9477281a706c&MODEL_NAME=doubao-1-5-pro-32k-250115&API_ENDPOINT=https%3A%2F%2Fark.cn-beijing.volces.com%2Fapi%2Fv3%2Fchat%2Fcompletions)

## 📋 第二步：详细操作步骤

### 1. 登录Railway

**情况A：已有GitHub账号**
- 点击 "Continue with GitHub"
- 授权Railway访问你的GitHub账号

**情况B：没有账号**
- 点击 "Sign up"
- 填写邮箱、用户名、密码
- 验证邮箱

### 2. 创建项目

点击部署按钮后，你会看到：

![Railway部署页面](https://i.imgur.com/创建项目示意图.png)

**填写信息：**
- **Project Name**: `xiaoshifu-ai-proxy`
- **Environment Variables**: 已经自动填好了
  - API_KEY: `3402183a-fbff-4f4d-8379-9477281a706c`
  - MODEL_NAME: `doubao-1-5-pro-32k-250115`
  - API_ENDPOINT: `https://ark.cn-beijing.volces.com/api/v3/chat/completions`

### 3. 部署过程

点击 "Deploy" 按钮后，你会看到部署进度：

```
🚀 Deploying your project...
📦 Installing dependencies...
📝 Building application...
🌟 Starting service...
```

**部署时间**：约2-3分钟

### 4. 部署成功

当看到绿色勾勾 ✅ 时，表示部署成功！

你会看到类似这样的信息：
```
✅ Deployment successful!
🌐 Your service is live at:
   https://xiaoshifu-ai-proxy-production.up.railway.app
```

## 📍 第三步：获取部署地址

### 1. 找到你的服务地址

在Railway控制台，你会看到你的服务URL：
- 格式：`https://[项目名称].up.railway.app`
- 示例：`https://xiaoshifu-ai-proxy-production.up.railway.app`

### 2. 测试服务

打开浏览器，访问：
```
https://你的地址/api/health
```

如果看到：
```json
{
  "status": "ok",
  "timestamp": "2024-01-XXTXX:XX:XX.XXXZ",
  "service": "小师傅AI代理服务器"
}
```

**恭喜！AI代理服务器部署成功！** 🎉

## 🧪 第四步：测试AI接口

### 测试命令：
```bash
curl -X POST https://你的地址/api/ai-fortune \
  -H "Content-Type: application/json" \
  -d '{
    "card": "A",
    "num1": 1,
    "num2": 2,
    "weather": "晴",
    "mood": "开心",
    "guaXiang": "大安"
  }'
```

### 预期响应：
```json
{
  "success": true,
  "data": {
    "卦象": "大安",
    "ai解读": "今日卦象为大安，结合晴朗天气和你的开心心情...",
    "时间": "2024/1/XX XX:XX:XX"
  }
}
```

## 📝 重要提醒

### 1. 保存你的地址
**复制并保存你的Railway地址**，下一步Vercel部署需要用到：
```
https://xiaoshifu-ai-proxy-production.up.railway.app
```

### 2. 免费额度
- **运行时间**: 每月500小时（足够）
- **内存**: 512MB
- **硬盘**: 1GB

### 3. 常见问题

**Q: 部署失败了怎么办？**
A: 检查GitHub仓库是否公开，重新点击部署按钮

**Q: 地址访问不了？**
A: 等待1-2分钟让服务完全启动，或检查Railway控制台

**Q: 想修改配置？**
A: 在Railway控制台 → 你的项目 → Variables 中修改

## 🎯 下一步

**AI代理服务器部署完成！**

现在你可以进行**Vercel前端部署**了！

**下一步：** [点击这里查看Vercel部署教程](VERCEL_DEPLOYMENT.md)

---

**💡 小贴士：**
- 记住你的Railway地址，下一步要用
- 建议截图保存部署成功页面
- 有任何问题随时问我！