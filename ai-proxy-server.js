const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

// 启用CORS
app.use(cors());
app.use(express.json());

// AI代理端点
app.post('/api/ai-fortune', async (req, res) => {
    try {
        const { card, num1, num2, weather, mood, guaXiang } = req.body;
        
        console.log('收到AI算命请求:', { card, num1, num2, weather: decodeURIComponent(weather), mood: decodeURIComponent(mood), guaXiang: decodeURIComponent(guaXiang) });
        
        // 调用火山引擎API
        const apiKey = '3402183a-fbff-4f4d-8379-9477281a706c';
        const apiEndpoint = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';
        const model = 'doubao-1-5-pro-32k-250115';
        
        const messages = [
            {
                "role": "system",
                "content": "你是一位精通小六壬的国学大师，擅长结合卦象、天气和心情解读运势。"
            },
            {
                "role": "user",
                "content": `今日小六壬卦象：${decodeURIComponent(guaXiang)}，天气：${decodeURIComponent(weather)}，心情：${decodeURIComponent(mood)}。请用现代语言解读卦象含义，并给出具体实用的今日建议，语言要自然流畅。`
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
        
        console.log('AI回复:', aiResponse);
        
        res.json({
            success: true,
            data: {
                卦象: decodeURIComponent(guaXiang),
                ai解读: aiResponse,
                时间: new Date().toLocaleString()
            }
        });
        
    } catch (error) {
        console.error('代理服务器错误:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 健康检查端点
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`AI代理服务器运行在 http://localhost:${PORT}`);
    console.log('可用的端点:');
    console.log(`  - POST http://localhost:${PORT}/api/ai-fortune`);
    console.log(`  - GET  http://localhost:${PORT}/api/health`);
});