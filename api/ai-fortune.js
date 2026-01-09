// api/ai-fortune.js - Vercel Serverless Function
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // 设置CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持POST方法' });
  }

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

    res.status(200).json({
      success: true,
      data: {
        卦象: guaXiang,
        ai解读: aiResponse,
        时间: new Date().toLocaleString()
      }
    });

  } catch (error) {
    console.error('Vercel Function错误:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}