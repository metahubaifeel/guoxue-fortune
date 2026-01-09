// GitHub Pages版本 - 直接调用AI API
const AI_PROXY_URL = 'https://xiaoshifu-fortune-production.up.railway.app/api/ai-fortune';

// 如果GitHub Pages有CORS问题，使用备用方案
const getApiEndpoint = () => {
    // 直接使用Railway地址
    return AI_PROXY_URL;
};