// 简单的静态文件服务器 - Railway版本
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 托管静态文件
app.use(express.static(path.join(__dirname)));

// AI代理API路由
app.use('/api', require('./ai-proxy-server.js'));

// 首页路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'simple-index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 小师傅来一卦服务器运行在端口 ${PORT}`);
    console.log(`📱 访问地址: http://localhost:${PORT}`);
});