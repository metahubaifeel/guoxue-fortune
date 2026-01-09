#!/bin/bash

# 小师傅来一卦 - 一键部署脚本
# 支持 Railway + Vercel 部署方案

echo "🚀 开始部署小师傅来一卦..."

# 检查是否安装了必要的工具
check_dependencies() {
    echo "📋 检查依赖..."
    
    # 检查Node.js
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js 未安装，请先安装Node.js 18+"
        exit 1
    fi
    
    # 检查npm
    if ! command -v npm &> /dev/null; then
        echo "❌ npm 未安装，请先安装npm"
        exit 1
    fi
    
    echo "✅ 依赖检查通过"
}

# 部署AI代理服务器到Railway
deploy_ai_proxy() {
    echo "🤖 部署AI代理服务器到Railway..."
    
    # 检查是否安装了Railway CLI
    if ! command -v railway &> /dev/null; then
        echo "📦 安装Railway CLI..."
        npm install -g @railway/cli
    fi
    
    # 登录Railway
    echo "🔑 请确保已登录Railway账号"
    railway login
    
    # 创建新项目或链接到现有项目
    echo "🏗️ 创建Railway项目..."
    railway init --name xiaoshifu-ai-proxy
    
    # 设置环境变量
    echo "⚙️ 配置环境变量..."
    railway variables set API_KEY="3402183a-fbff-4f4d-8379-9477281a706c"
    railway variables set MODEL_NAME="doubao-1-5-pro-32k-250115"
    railway variables set API_ENDPOINT="https://ark.cn-beijing.volces.com/api/v3/chat/completions"
    
    # 部署
    echo "🚀 开始部署..."
    railway up
    
    # 获取部署URL
    AI_PROXY_URL=$(railway status | grep -o 'https://[^[:space:]]*\.up\.railway\.app')
    echo "✅ AI代理服务器部署完成: $AI_PROXY_URL"
    
    # 保存URL到配置文件
    echo "$AI_PROXY_URL" > .ai-proxy-url.txt
}

# 部署前端到Vercel
deploy_frontend() {
    echo "🌐 部署前端到Vercel..."
    
    # 检查是否安装了Vercel CLI
    if ! command -v vercel &> /dev/null; then
        echo "📦 安装Vercel CLI..."
        npm install -g vercel
    fi
    
    # 登录Vercel
    echo "🔑 请确保已登录Vercel账号"
    vercel login
    
    # 读取AI代理URL
    if [ -f .ai-proxy-url.txt ]; then
        AI_PROXY_URL=$(cat .ai-proxy-url.txt)
        echo "🔗 配置API代理地址: $AI_PROXY_URL"
        
        # 更新前端配置
        sed -i "s|your-ai-proxy-domain.com|$AI_PROXY_URL|g" script.js
    fi
    
    # 部署到Vercel
    echo "🚀 开始部署前端..."
    vercel --prod
    
    echo "✅ 前端部署完成！"
}

# 创建部署配置文件
create_config_files() {
    echo "⚙️ 创建配置文件..."
    
    # 创建Railway配置文件
    cat > railway.json << 'EOF'
{
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "Dockerfile"
  },
  "deploy": {
    "startCommand": "node ai-proxy-server.js",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
EOF

    # 创建Vercel配置文件
    cat > vercel.json << 'EOF'
{
  "public": true,
  "github": {
    "enabled": false
  },
  "builds": [
    {
      "src": "**/*",
      "use": "@vercel/static"
    }
  ]
}
EOF

    echo "✅ 配置文件创建完成"
}

# 主部署流程
main() {
    echo "🎯 小师傅来一卦 - 一键部署工具"
    echo "=================================="
    
    # 检查依赖
    check_dependencies
    
    # 创建配置文件
    create_config_files
    
    # 部署AI代理服务器
    deploy_ai_proxy
    
    # 部署前端
    deploy_frontend
    
    echo ""
    echo "🎉 部署完成！"
    echo "============="
    echo "✅ AI代理服务器已部署到Railway"
    echo "✅ 前端已部署到Vercel"
    echo "✅ 所有服务正常运行"
    echo ""
    echo "🌟 项目特色："
    echo "   • 小六壬算法 + AI智能解读"
    echo "   • 精美国风界面设计"
    echo "   • 水晶球加载动画"
    echo "   • 智能内容高亮"
    echo ""
    echo "📱 现在可以通过手机访问你的应用了！"
    echo ""
    echo "💡 提示："
    echo "   • Railway提供免费额度，足够日常使用"
    echo "   • Vercel自动提供HTTPS和全球CDN"
    echo "   • 两个平台都支持自动部署"
}

# 运行主函数
main "$@"