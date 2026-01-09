# 小师傅来一卦 - 超简单部署方案

## 🚀 最简方案：GitHub + 一键部署

### 第一步：上传到GitHub

1. **创建GitHub仓库**
   - 访问 [github.com](https://github.com)
   - 点击右上角 "+" → "New repository"
   - 仓库名称：`xiaoshifu-fortune`
   - 选择 "Public"（免费）
   - 点击 "Create repository"

2. **上传代码**
   ```bash
   # 在项目目录下执行
   git init
   git add .
   git commit -m "小师傅来一卦 - 初始版本"
   git remote add origin https://github.com/你的用户名/xiaoshifu-fortune.git
   git push -u origin main
   ```

### 第二步：一键部署AI代理服务器

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2Fyour-username%2Fxiaoshifu-fortune&envs=API_KEY%2CMODEL_NAME%2CAPI_ENDPOINT&API_KEY=3402183a-fbff-4f4d-8379-9477281a706c&MODEL_NAME=doubao-1-5-pro-32k-250115&API_ENDPOINT=https%3A%2F%2Fark.cn-beijing.volces.com%2Fapi%2Fv3%2Fchat%2Fcompletions)

**点击上方按钮，然后：**
1. 登录Railway（可用GitHub账号）
2. 确认部署配置
3. 点击 "Deploy" 按钮
4. 等待部署完成（约2分钟）

### 第三步：一键部署前端

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fxiaoshifu-fortune)

**点击上方按钮，然后：**
1. 登录Vercel（可用GitHub账号）
2. 点击 "Deploy" 按钮
3. 等待部署完成（约1分钟）

### 第四步：配置连接

1. **获取AI代理地址**
   - 在Railway控制台找到你的项目
   - 复制类似 `https://xiaoshifu-ai-proxy.up.railway.app` 的地址

2. **更新前端配置**
   - 在Vercel控制台找到你的项目
   - 进入 "Settings" → "Environment Variables"
   - 添加变量：`AI_PROXY_URL=https://你的railway地址`
   - 重新部署前端

## 🎯 完成！你的应用现在可以访问了

- **前端地址**: Vercel提供的域名
- **管理面板**: Railway + Vercel控制台
- **费用**: 完全免费（有额度限制）

## 📱 移动端优化

部署完成后，你的应用会自动：
- ✅ 适配手机屏幕
- ✅ 支持触摸操作
- ✅ 加载优化
- ✅ HTTPS安全连接

## 🔧 自定义域名（可选）

### 购买域名
- 推荐：腾讯云、阿里云、Namecheap
- 价格：约30-60元/年

### 配置步骤
1. **Vercel配置**
   - 进入项目设置
   - 添加自定义域名
   - 按提示配置DNS

2. **Railway配置**
   - 进入项目设置
   - 添加自定义域名
   - 配置CNAME记录

## 🚨 注意事项

### API使用限制
- 免费额度：每月约1000次调用
- 超出后需要升级付费计划
- 建议添加使用统计

### 服务限制
- Railway：每月500小时运行时间
- Vercel：每月100GB流量
- 对于个人使用完全足够

### 安全建议
- 定期更换API密钥
- 监控异常调用
- 添加访问日志

## 🎉 恭喜！

你的"小师傅来一卦"应用已经成功部署！

### 特色功能
- 🎯 小六壬算法 + AI智能解读
- ✨ 精美国风界面设计
- 🔮 水晶球加载动画
- 💡 智能内容高亮
- 📱 完美移动端适配

### 项目亮点
- **传统国学现代化**：小六壬算法 + AI大模型
- **个性化体验**：每次占卜都独一无二
- **零成本部署**：完全免费托管方案
- **一键部署**：无需技术背景

---

**遇到问题？** 随时联系我，我会帮你解决！

**祝你上线大卖！** 🚀✨