#!/bin/bash

# 小师傅来一卦 - 一键部署脚本
# Railway + Vercel 部署方案

echo "🚀 小师傅来一卦 - 一键部署工具"
echo "=================================="
echo ""

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查命令是否存在
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# 打印步骤
print_step() {
    echo -e "${BLUE}📋 $1${NC}"
}

# 打印成功
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# 打印错误
print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# 打印警告
print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# 检查依赖
check_dependencies() {
    print_step "检查依赖环境..."
    
    if ! command_exists node; then
        print_error "Node.js 未安装"
        echo "请访问 https://nodejs.org/ 下载安装 Node.js 18+"
        exit 1
    fi
    
    if ! command_exists npm; then
        print_error "npm 未安装"
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 16 ]; then
        print_error "Node.js 版本过低，需要 16+"
        exit 1
    fi
    
    print_success "依赖检查通过"
}

# 安装CLI工具
install_cli_tools() {
    print_step "安装CLI工具..."
    
    # 安装Railway CLI
    if ! command_exists railway; then
        print_step "安装 Railway CLI..."
        curl -fsSL https://railway.app/install.sh | sh
        print_success "Railway CLI 安装完成"
    fi
    
    # 安装Vercel CLI
    if ! command_exists vercel; then
        print_step "安装 Vercel CLI..."
        npm install -g vercel
        print_success "Vercel CLI 安装完成"
    fi
}

# 登录验证
login_check() {
    print_step "登录验证..."
    
    echo "请确保你已经注册并登录了以下平台："
    echo "1. Railway: https://railway.app"
    echo "2. Vercel: https://vercel.com"
    echo ""
    
    read -p "按回车键继续，或按 Ctrl+C 退出..."
    
    # Railway登录
    print_step "Railway 登录验证..."
    railway login
    if [ $? -ne 0 ]; then
        print_error "Railway 登录失败"
        exit 1
    fi
    print_success "Railway 登录成功"
    
    # Vercel登录
    print_step "Vercel 登录验证..."
    vercel login
    if [ $? -ne 0 ]; then
        print_error "Vercel 登录失败"
        exit 1
    fi
    print_success "Vercel 登录成功"
}

# 部署AI代理服务器
deploy_ai_proxy() {
    print_step "部署AI代理服务器到 Railway..."
    
    # 创建临时目录
    TEMP_DIR=$(mktemp -d)
    cd $TEMP_DIR
    
    # 创建Railway项目文件
    cat > package.json << 'EOF'
{
  "name": "xiaoshifu-ai-proxy",
  "version": "1.0.0",
  "description": "AI代理服务器 for 小师傅来一卦",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "node-fetch": "^2.6.7"
  },
  "engines": {
    "node": ">=16"
  }
}
EOF

    # 创建AI代理服务器代码
    cat > index.js << 'EOF'
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3001;

// 启用CORS
app.use(cors());
app.use(express.json());

// AI算命接口
app.post('/api/ai-fortune', async (req, res) => {
    try {
        const { card, num1, num2, weather, mood, guaXiang } = req.body;
        
        // 火山引擎API配置
        const apiKey = process.env.API_KEY || '3402183a-fbff-4f4d-8379-9477281a706c';
        const apiEndpoint = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';
        const model = 'doubao-1-5-pro-32k-250115';
        
        const messages = [
            {
                "role": "system",
                "content": "你是一位精通小六壬的国学大师，擅长结合卦象、天气和心情解读运势。"
            },
            {
                "role": "user",
                "content": `今日小六壬卦象：${guaXiang}，天气：${weather}，心情：${mood}。请用现代语言解读卦象含义，并给出具体实用的今日建议，语言要自然流畅。`
            }
        ];
        
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: messages,
                temperature: 1.2,
                max_tokens: 400
            })
        });
        
        if (!response.ok) {
            throw new Error(`API调用失败: ${response.status}`);
        }
        
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        
        res.json({
            success: true,
            data: {
                卦象: guaXiang,
                ai解读: aiResponse,
                时间: new Date().toLocaleString()
            }
        });
        
    } catch (error) {
        console.error('AI代理服务器错误:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 健康检查接口
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        service: '小师傅AI代理服务器'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 AI代理服务器运行在端口 ${PORT}`);
    console.log(`📝 健康检查: http://localhost:${PORT}/api/health`);
});
EOF

    # 初始化Railway项目
    railway init --name xiaoshifu-ai-proxy
    
    # 设置环境变量
    railway variables set API_KEY="3402183a-fbff-4f4d-8379-9477281a706c"
    railway variables set MODEL_NAME="doubao-1-5-pro-32k-250115"
    railway variables set API_ENDPOINT="https://ark.cn-beijing.volces.com/api/v3/chat/completions"
    
    # 部署
    print_step "开始部署AI代理服务器..."
    railway up
    
    # 获取部署URL
    AI_PROXY_URL=$(railway status | grep -o 'https://[^[:space:]]*\.up\.railway\.app' | head -1)
    
    if [ -z "$AI_PROXY_URL" ]; then
        print_error "无法获取AI代理服务器URL"
        exit 1
    fi
    
    print_success "AI代理服务器部署完成"
    print_success "API地址: $AI_PROXY_URL"
    
    # 保存URL供后续使用
    echo "$AI_PROXY_URL" > "$HOME/.xiaoshifu-ai-proxy-url"
    
    cd - > /dev/null
}

# 部署前端
deploy_frontend() {
    print_step "部署前端到 Vercel..."
    
    # 回到项目根目录
    cd "$(dirname "$0")"
    
    # 读取AI代理URL
    if [ -f "$HOME/.xiaoshifu-ai-proxy-url" ]; then
        AI_PROXY_URL=$(cat "$HOME/.xiaoshifu-ai-proxy-url")
        print_step "使用AI代理地址: $AI_PROXY_URL"
        
        # 更新前端配置
        sed -i.bak "s|your-ai-proxy-domain.com|$AI_PROXY_URL|g" script.js
        print_success "前端配置已更新"
    fi
    
    # 部署到Vercel
    print_step "开始部署前端..."
    vercel --prod
    
    if [ $? -eq 0 ]; then
        print_success "前端部署完成"
    else
        print_error "前端部署失败"
        exit 1
    fi
}

# 显示结果
show_result() {
    echo ""
    echo "🎉 部署完成！"
    echo "=============="
    echo ""
    echo "✅ 项目特色："
    echo "   • 小六壬算法 + AI智能解读"
    echo "   • 精美国风界面设计"
    echo "   • 水晶球加载动画"
    echo "   • 智能内容高亮"
    echo ""
    echo "📱 现在可以通过以下方式访问："
    echo "   • Vercel提供的域名"
    echo "   • 自定义域名（需配置）"
    echo ""
    echo "💡 提示："
    echo "   • Railway提供免费额度，足够日常使用"
    echo "   • Vercel自动提供HTTPS和全球CDN"
    echo "   • 两个平台都支持自动部署"
    echo ""
    echo "🔧 管理面板："
    echo "   • Railway: https://railway.app"
    echo "   • Vercel: https://vercel.com"
    echo ""
    echo "🚀 部署完成，享受你的小师傅来一卦应用！"
}

# 主函数
main() {
    echo "🚀 小师傅来一卦 - 一键部署工具"
    echo "=================================="
    echo ""
    
    # 检查依赖
    check_dependencies
    
    # 安装CLI工具
    install_cli_tools
    
    # 登录验证
    login_check
    
    # 部署AI代理服务器
    deploy_ai_proxy
    
    # 部署前端
    deploy_frontend
    
    # 显示结果
    show_result
}

# 运行主函数
main "$@"