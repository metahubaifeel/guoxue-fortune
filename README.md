# 抽牌问运 · 每日一牌

## 项目简介
一款以 "扑克抽牌" 为基础，融合随机洗牌机制、用户自定义数字、实时天气三大变量，通过 AI 生成个性化运势解读的轻量娱乐工具。

## 核心功能
- 真随机扑克洗牌系统（Fisher-Yates 算法）
- 支持用户输入2个1-9的不同数字
- 支持选择当日天气
- 基于多变量融合 AI 生成运势解读
- 国学风设计，简洁美观的界面

## 配置豆包API

### 所需信息
要使用豆包API，你需要准备以下信息：
1. **豆包API密钥**：从豆包开发者平台获取
2. **API端点**：豆包API的访问地址
3. **模型名称**：你要使用的豆包模型名称

### 如何获取豆包API信息
1. 访问 [豆包开发者平台](https://console.bce.baidu.com/ai/) 并登录
2. 创建一个新的应用或使用现有应用
3. 获取API密钥（API Key 和 Secret Key）
4. 查看豆包API文档，获取正确的API端点和模型名称

### 配置步骤
1. 在 `script.js` 文件中找到 `generateFortuneAI` 函数
2. 将 `apiKey` 替换为你的豆包API密钥
3. 将 `apiEndpoint` 替换为豆包API的访问地址
4. 将 `model` 替换为你要使用的豆包模型名称

### 豆包API示例配置
```javascript
// 豆包API配置示例
const apiKey = 'YOUR_BAIDU_API_KEY';
const secretKey = 'YOUR_BAIDU_SECRET_KEY'; // 豆包可能需要Secret Key进行认证
const apiEndpoint = 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/eb-instant';
const model = 'eb-instant';
```

## 运行方式

### 本地运行
1. 使用HTTP服务器运行项目
   ```bash
   python -m http.server 8000
   ```
2. 在浏览器中访问 `http://localhost:8000`

### 直接打开
直接在浏览器中打开 `index.html` 文件即可运行

## 技术栈
- HTML5
- CSS3
- JavaScript (ES6+)

## 项目结构
```
.
├── index.html    # 主页面
├── style.css     # 样式文件
├── script.js     # 核心功能实现
└── README.md     # 项目说明
```

## 核心功能说明

### 1. 洗牌抽牌
- 点击「开始洗牌」按钮，系统使用Fisher-Yates算法随机打乱牌序
- 洗牌后可选择任意一张牌，不可重复选择
- 支持多次洗牌，每次洗牌后牌序重新随机

### 2. 变量输入
- 输入2个1-9的不同数字，作为个性化变量
- 选择当日天气，影响运势解读

### 3. 运势生成
- 结合扑克牌、数字和天气多变量生成运势
- 包含运势基调、核心提示和小建议
- 国学风表述，避免现代术语

## 自定义配置

### 修改主题色
在 `style.css` 文件中修改以下变量：
```css
:root {
    --primary-color: #8b4513;  /* 主色调 */
    --secondary-color: #d4c5b0; /* 辅助色 */
    --background-color: #f5f0e6; /* 背景色 */
    --text-color: #5a4a38; /* 文字色 */
}
```

### 修改牌面样式
在 `script.js` 文件中修改 `renderCards` 函数

### 修改运势生成逻辑
在 `script.js` 文件中修改 `generateFortuneAI` 函数

## 浏览器兼容性
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 注意事项
- 本项目仅作为娱乐工具，请勿过度依赖
- API调用可能产生费用，请根据实际使用情况控制调用频率
- 请妥善保管你的API密钥，不要泄露到客户端代码中

## 更新日志

### v1.0.0
- 初始版本发布
- 实现核心功能
- 支持豆包API调用

## 许可证
MIT License