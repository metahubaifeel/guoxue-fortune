// 修复版服务器 - 直接托管前端+API
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 启用CORS
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// AI算命接口
app.post('/api/ai-fortune', async (req, res) => {
    try {
        console.log('收到AI算命请求:', req.body);
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
        
        console.log('正在调用火山引擎API...');
        
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
        
        console.log('API响应状态:', response.status);
        
        if (!response.ok) {
            const errorData = await response.text();
            console.error('API错误:', errorData);
            throw new Error(`API调用失败: ${response.status} - ${errorData}`);
        }
        
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        
        console.log('AI回复:', aiResponse.substring(0, 100) + '...');
        
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

// 首页路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'simple-index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 小师傅来一卦服务器运行在端口 ${PORT}`);
    console.log(`📱 访问地址: http://localhost:${PORT}`);
    console.log(`📝 健康检查: http://localhost:${PORT}/api/health`);
});