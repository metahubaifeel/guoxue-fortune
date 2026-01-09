# 小师傅来一卦 - 部署文档

## 🎯 项目概述
一个结合小六壬算法和AI智能解读的国学运势应用，用户通过抽牌+数字+天气+心情获得个性化运势建议。

## 🏗️ 系统架构

### 前端服务
- **端口**: 8080
- **技术**: 纯HTML/CSS/JavaScript
- **功能**: 用户界面、小六壬算法、结果展示

### AI代理服务
- **端口**: 3001
- **技术**: Node.js + Express
- **功能**: 调用火山引擎豆包API、处理跨域问题

## 🔧 部署步骤

### 1. 环境要求
```bash
# Node.js 16+ 版本
node --version

# npm 包管理器
npm --version
```

### 2. 安装依赖
```bash
# 安装AI代理服务器依赖
npm install express cors node-fetch@2
```

### 3. 启动服务
```bash
# 启动AI代理服务器（先启动）
node ai-proxy-server.js

# 启动前端Web服务器
npm run serve
```

### 4. 配置文件
- **API密钥**: `3402183a-fbff-4f4d-8379-9477281a706c`
- **模型**: `doubao-1-5-pro-32k-250115`
- **API端点**: `https://ark.cn-beijing.volces.com/api/v3/chat/completions`

### 5. 端口配置
- 前端: `http://localhost:8080`
- AI代理: `http://localhost:3001`

## 📁 文件结构
```
今日运势 带AI版/
├── index.html              # 主页面
├── script.js               # 前端逻辑
├── style.css               # 样式文件
├── ai-proxy-server.js      # AI代理服务器
├── package.json            # 项目配置
└── README.md               # 项目说明
```

## ⚡ 核心功能

### 小六壬算法
- 扑克牌A-K转换为数字（A=1, J=11, Q=12, K=13）
- 三数相加，模6运算确定卦象
- 六个卦象：大安、留连、速喜、赤口、小吉、空亡

### AI智能解读
- 调用火山引擎豆包API
- 结合卦象+天气+心情生成个性化建议
- 温度参数1.2确保内容变化性

## 🎨 用户体验优化
- **标题**: "小师傅来一卦"
- **加载动画**: 水晶球+掐指一算文案
- **视觉层次**: 智能高亮重要建议内容
- **响应式设计**: 适配移动端

## 🔒 安全注意事项
- API密钥需妥善保管
- 建议添加请求频率限制
- 可考虑添加用户输入验证

## 📊 监控建议
- 监控AI API调用成功率
- 记录用户操作日志
- 设置错误告警机制

## 🚀 上线建议
1. **域名配置**: 建议配置正式域名
2. **HTTPS**: 启用SSL证书
3. **CDN**: 静态资源使用CDN加速
4. **负载均衡**: 高并发时考虑多实例部署

## 📞 技术支持
- 火山引擎API文档: [https://www.volcengine.com/docs](https://www.volcengine.com/docs)
- 小六壬算法: 传统国学占卜方法
- Express.js文档: [https://expressjs.com](https://expressjs.com)

---
**部署完成！祝上线顺利！** 🎉