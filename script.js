// 全局变量
let cards = [];
let selectedCard = null;
let isShuffled = false;

// 扑克牌数据
const cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// DOM元素
const shuffleBtn = document.getElementById('shuffleBtn');
const cardsContainer = document.getElementById('cardsContainer');
const selectedCardEl = document.getElementById('selectedCard');
const inputSection = document.getElementById('inputSection');
const cardSection = document.getElementById('cardSection');
const resultSection = document.getElementById('resultSection');
const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const numberError = document.getElementById('numberError');
const generateBtn = document.getElementById('generateBtn');
const restartBtn = document.getElementById('restartBtn');
const resultCard = document.getElementById('resultCard');
const nextToWeatherBtn = document.getElementById('nextToWeatherBtn');
const nextToMoodBtn = document.getElementById('nextToMoodBtn');
const numberInputGroup = document.getElementById('numberInputGroup');
const weatherInputGroup = document.getElementById('weatherInputGroup');
const moodInputGroup = document.getElementById('moodInputGroup');

// 初始化
function init() {
    // 初始化扑克牌
    initCards();
    
    // 绑定事件
    shuffleBtn.addEventListener('click', shuffleCards);
    generateBtn.addEventListener('click', generateFortune);
    restartBtn.addEventListener('click', restart);
    nextToWeatherBtn.addEventListener('click', showWeatherInput);
    nextToMoodBtn.addEventListener('click', showMoodInput);
    
    // 数字输入验证 - 两个数字
    num1.addEventListener('input', validateNumbers);
    num2.addEventListener('input', validateNumbers);
    
    // 初始化时允许直接选牌
    isShuffled = true;
}

// 初始化扑克牌
function initCards() {
    cards = [...cardValues];
    renderCards();
}

// 渲染扑克牌
function renderCards() {
    cardsContainer.innerHTML = '';
    cards.forEach((value, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.value = value;
        card.innerHTML = `
            <div class="card-value-top">${value}</div>
            <div class="card-suit">♠</div>
            <div class="card-value-bottom">${value}</div>
        `;
        card.addEventListener('click', () => selectCard(value));
        cardsContainer.appendChild(card);
    });
}

// Fisher-Yates 洗牌算法
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 洗牌功能
function shuffleCards() {
    // 添加洗牌动画
    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach((card, index) => {
        card.classList.add('shuffling');
        // 随机位置动画，增强洗牌视觉效果
        card.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 50 - 25}px) rotate(${Math.random() * 40 - 20}deg)`;
    });
    
    shuffleBtn.disabled = true;
    shuffleBtn.textContent = '洗牌中...';
    
    // 延迟执行洗牌，展示动画效果
    setTimeout(() => {
        // 重新洗牌
        cards = shuffleArray([...cardValues]);
        
        // 清除现有牌
        cardsContainer.innerHTML = '';
        
        // 重新渲染牌，带有入场动画
        cards.forEach((value, index) => {
            setTimeout(() => {
                const card = document.createElement('div');
                card.className = 'card';
                card.dataset.value = value;
                card.innerHTML = `
                    <div class="card-value-top">${value}</div>
                    <div class="card-suit">♠</div>
                    <div class="card-value-bottom">${value}</div>
                `;
                card.addEventListener('click', () => selectCard(value));
                
                // 入场动画
                card.style.opacity = '0';
                card.style.transform = 'scale(0.5) translateY(-20px)';
                cardsContainer.appendChild(card);
                
                // 动画效果
                setTimeout(() => {
                    card.style.transition = 'all 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1) translateY(0)';
                }, 50);
            }, index * 30); // 错开入场时间，增强洗牌效果
        });
        
        shuffleBtn.disabled = false;
        shuffleBtn.textContent = '重新洗牌';
        isShuffled = true;
    }, 1000);
}

// 选择扑克牌
function selectCard(value) {
    selectedCard = value;
    
    // 高亮选中的牌
    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach(card => {
        if (card.dataset.value === value) {
            card.classList.add('selected');
            card.style.pointerEvents = 'none';
        } else {
            card.style.pointerEvents = 'none';
        }
    });
    
    selectedCardEl.innerHTML = `<p>你选择了：<strong>${value}</strong> 牌</p>`;
    
    // 进入第二步
    setTimeout(() => {
        goToStep2();
    }, 500);
}

// 打字机效果函数 - 支持分阶段显示和起始位置
function applyTypingEffect(element, text, callback = null, delay = 50, startIndex = 0) {
    element.classList.add('typing-effect');
    element.style.overflow = 'hidden';
    element.style.borderRight = '.15em solid #8b4513';
    element.style.whiteSpace = 'nowrap';
    element.style.margin = '0 auto';
    
    let index = startIndex;
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, delay);
        } else {
            // 打字完成后移除光标
            element.style.borderRight = 'none';
            // 调用回调函数
            if (callback) {
                callback();
            }
        }
    }
    
    // 开始打字
    type();
}

// 进入第二步
function goToStep2() {
    // 切换显示区域
    cardSection.style.display = 'none';
    inputSection.style.display = 'block';
    
    // 获取相关元素
    const numberGroup = document.getElementById('numberInputGroup');
    const label = numberGroup.querySelector('label');
    const numberInputs = document.querySelector('.number-inputs');
    const numberError = document.getElementById('numberError');
    const nextBtn = document.getElementById('nextToWeatherBtn');
    
    // 初始化显示状态
    label.textContent = '';
    label.style.display = 'block';
    numberInputs.style.display = 'none';
    numberError.style.display = 'none';
    nextBtn.style.display = 'none';
    
    // 第一阶段：心中默念两个数
    setTimeout(() => {
        applyTypingEffect(label, '心中默念两个1-9的数字', () => {
            // 第二阶段：请写下来
            setTimeout(() => {
                label.textContent += '，';
                applyTypingEffect(label, '请写下来', () => {
                    // 第三阶段：显示输入框
                    setTimeout(() => {
                        numberInputs.style.display = 'flex';
                        numberError.style.display = 'block';
                        
                        // 为输入框添加淡入动画
                        const inputs = numberInputs.querySelectorAll('input');
                        inputs.forEach((input, index) => {
                            input.style.opacity = '0';
                            input.style.transform = 'translateY(-20px)';
                            input.offsetHeight; // 触发重排
                            
                            setTimeout(() => {
                                input.style.transition = 'all 0.5s ease';
                                input.style.opacity = '1';
                                input.style.transform = 'translateY(0)';
                            }, index * 200);
                        });
                    }, 500);
                }, 60, label.textContent.length);
            }, 1000);
        });
    }, 300);
}

// 显示天气选择
function showWeatherInput() {
    if (!validateNumbers()) {
        alert('请输入有效的数字');
        return;
    }
    
    numberInputGroup.style.display = 'none';
    weatherInputGroup.style.display = 'block';
    
    // 获取相关元素
    const weatherGroup = document.getElementById('weatherInputGroup');
    const label = weatherGroup.querySelector('label');
    const weatherOptions = document.querySelector('.weather-options');
    const nextBtn = document.getElementById('nextToMoodBtn');
    
    // 保存原始label文本
    const originalLabelText = label.textContent;
    
    // 初始化显示状态
    label.textContent = '';
    weatherOptions.style.display = 'none';
    nextBtn.style.display = 'none';
    
    // 为标签添加打字机效果
    setTimeout(() => {
        if (label) {
            applyTypingEffect(label, originalLabelText, () => {
                // 打字完成后显示天气选项
                setTimeout(() => {
                    weatherOptions.style.display = 'flex';
                    
                    // 为天气选项添加淡入动画
                    const options = weatherOptions.querySelectorAll('.weather-option');
                    options.forEach((option, index) => {
                        option.style.opacity = '0';
                        option.style.transform = 'translateY(-20px)';
                        option.offsetHeight; // 触发重排
                        
                        setTimeout(() => {
                            option.style.transition = 'all 0.5s ease';
                            option.style.opacity = '1';
                            option.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    
                    // 显示下一步按钮
                    setTimeout(() => {
                        nextBtn.style.display = 'inline-block';
                        nextBtn.style.opacity = '0';
                        nextBtn.offsetHeight; // 触发重排
                        setTimeout(() => {
                            nextBtn.style.transition = 'all 0.5s ease';
                            nextBtn.style.opacity = '1';
                        }, 50);
                    }, 800);
                }, 500);
            });
        }
    }, 300);
}

// 显示心情选择
function showMoodInput() {
    weatherInputGroup.style.display = 'none';
    moodInputGroup.style.display = 'block';
    
    // 获取相关元素
    const moodGroup = document.getElementById('moodInputGroup');
    const label = moodGroup.querySelector('label');
    const moodOptions = moodGroup.querySelector('.weather-options');
    const generateBtn = document.getElementById('generateBtn');
    
    // 保存原始label文本
    const originalLabelText = label.textContent;
    
    // 初始化显示状态
    label.textContent = '';
    moodOptions.style.display = 'none';
    generateBtn.style.display = 'none';
    
    // 为标签添加打字机效果
    setTimeout(() => {
        if (label) {
            applyTypingEffect(label, originalLabelText, () => {
                // 打字完成后显示心情选项
                setTimeout(() => {
                    moodOptions.style.display = 'flex';
                    
                    // 为心情选项添加淡入动画
                    const options = moodOptions.querySelectorAll('.weather-option');
                    options.forEach((option, index) => {
                        option.style.opacity = '0';
                        option.style.transform = 'translateY(-20px)';
                        option.offsetHeight; // 触发重排
                        
                        setTimeout(() => {
                            option.style.transition = 'all 0.5s ease';
                            option.style.opacity = '1';
                            option.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    
                    // 显示生成按钮
                    setTimeout(() => {
                        generateBtn.style.display = 'inline-block';
                        generateBtn.style.opacity = '0';
                        generateBtn.offsetHeight; // 触发重排
                        setTimeout(() => {
                            generateBtn.style.transition = 'all 0.5s ease';
                            generateBtn.style.opacity = '1';
                        }, 50);
                    }, 800);
                }, 500);
            });
        }
    }, 300);
}

// 验证数字输入 - 小六壬起卦，两个数字结合扑克牌组成三个数字
function validateNumbers() {
    const n1 = parseInt(num1.value);
    const n2 = parseInt(num2.value);
    let error = '';
    
    if (!n1 || !n2) {
        error = '';
    } else if (n1 < 1 || n1 > 9 || n2 < 1 || n2 > 9) {
        error = '请输入1-9之间的整数';
    } else {
        error = '';
    }
    
    numberError.textContent = error;
    
    // 显示或隐藏下一步按钮：只有当两个数字都输入且验证通过时才显示
    const shouldShowBtn = n1 && n2 && error === '';
    const isBtnVisible = nextToWeatherBtn.style.display === 'inline-block';
    
    // 避免频繁切换按钮显示状态
    if (shouldShowBtn && !isBtnVisible) {
        nextToWeatherBtn.style.display = 'inline-block';
        // 只在第一次显示时播放动画
        if (!nextToWeatherBtn.classList.contains('animated')) {
            nextToWeatherBtn.style.animation = 'fadeIn 0.5s ease-in-out';
            nextToWeatherBtn.classList.add('animated');
        }
    } else if (!shouldShowBtn && isBtnVisible) {
        nextToWeatherBtn.style.display = 'none';
    }
    
    return error === '';
}

// 生成运势
async function generateFortune() {
    const number1 = num1.value;
    const number2 = num2.value;
    const weather = document.querySelector('input[name="weather"]:checked').value;
    const mood = document.querySelector('input[name="mood"]:checked').value;
    
    // 更新界面
    resultCard.innerHTML = '<div class="loading-text">大师正在推演你的今日运势... <div class="loading"></div></div>';
    
    // 切换显示区域
    inputSection.style.display = 'none';
    resultSection.style.display = 'block';
    
    // 添加元素进入动画
    const elements = resultSection.querySelectorAll('*');
    elements.forEach((element, index) => {
        element.classList.add('fade-in-element');
        // 清除之前的动画效果，确保每次进入都有动画
        element.style.animation = 'none';
        element.offsetHeight; // 触发重排
        element.style.animation = '';
    });
    
    // 调用AI生成运势，传递两个数字，结合扑克牌组成三个数字用于小六壬起卦
    const fortune = await generateFortuneAI(selectedCard, number1, number2, weather, mood);
    
    // 显示结果，添加淡入动画
    resultCard.innerHTML = `<div class="fortune-content fade-in-element">${fortune}</div>`;
}

// 根据卦象、天气和心情生成个性化建议
function getPersonalizedAdvice(卦象, weather, mood) {
    // 基础建议映射
    const baseAdvice = {
        '大安': '今日适合展开新计划，一切顺利',
        '留连': '适合稳扎稳打，不宜急躁',
        '速喜': '适合抓住机会，积极行动',
        '赤口': '需注意人际关系，避免冲突',
        '小吉': '适合沟通交流，易得贵人相助',
        '空亡': '适合休养生息，不宜冒险'
    };
    
    // 天气影响
    const weatherAdvice = {
        '晴': '在晴朗天气下，心情愉悦，适合外出活动',
        '阴': '在阴沉天气下，适合室内思考，静心养性',
        '雨': '在雨天里，适合居家休息，整理思绪',
        '雪': '在雪天中，适合慢节奏，享受宁静时光',
        '风': '在风大天气下，适合保持灵活，随机应变',
        '多云': '在多云天气下，适合平衡心态，顺其自然',
        '雷阵雨': '在雷雨天气下，适合保持警觉，谨慎行事',
        '雾': '在雾天里，适合放慢脚步，仔细观察',
        '霾': '在霾天气下，适合室内活动，保护健康',
        '冰雹': '在冰雹天气下，适合寻找安全，避免外出'
    };
    
    // 心情影响
    const moodAdvice = {
        '开心': '保持这份愉悦，将正能量传递给身边的人',
        '平静': '保持内心的宁静，适合做出理性决策',
        '焦虑': '深呼吸，相信一切都会好起来',
        '沮丧': '给自己一些时间，明天会更好',
        '兴奋': '将这份热情转化为行动力',
        '疲惫': '适当休息，养精蓄锐',
        '愤怒': '深呼吸，让情绪慢慢平复',
        '期待': '保持希望，美好的事情即将发生',
        '紧张': '放松身心，相信自己能够应对',
        '悲伤': '允许自己感受情绪，然后慢慢放下'
    };
    
    // 组合建议
    let advice = baseAdvice[卦象] || '保持平和心态';
    advice += '，' + (weatherAdvice[weather] || '适应天气变化');
    advice += '，' + (moodAdvice[mood] || '保持内心平衡');
    advice += '。';
    
    return advice;
}

// 优化运势内容的HTML结构
function formatFortuneContent(content) {
    // 处理Markdown格式的符号
    // 移除标题前的#符号
    content = content.replace(/^#+/gm, '');
    
    // 处理粗体格式，转换为HTML strong标签
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // 处理列表项，移除-符号并添加适当的HTML格式
    content = content.replace(/^\s*-\s*/gm, '');
    
    // 处理换行，转换为HTML <br>标签
    content = content.replace(/\n/g, '<br>');
    
    // 分割内容为段落，移除空段落
    const paragraphs = content.split('<br><br>').filter(paragraph => paragraph.trim() !== '');
    
    // 生成HTML结构
    let html = '';
    paragraphs.forEach((paragraph, index) => {
        // 处理每段内容，确保不包含多余的标签
        let cleanParagraph = paragraph.trim();
        
        // 确保内容不为空
        if (cleanParagraph) {
            // 为卦象添加特殊样式
            cleanParagraph = cleanParagraph.replace(/卦象：<strong>(大安|留连|速喜|赤口|小吉|空亡)<\/strong>/, '卦象：<strong class="fortune-tone">$1</strong>');
            
            // 为今日建议添加特殊样式
            cleanParagraph = cleanParagraph.replace(/今日建议：(.*?)$/m, '今日建议：<strong class="fortune-advice">$1</strong>');
            
            // 添加段落标签
            html += `<p class="fortune-paragraph">${cleanParagraph}</p>`;
        }
    });
    
    return html;
}

// AI生成运势 - 火山方舟豆包API调用
async function generateFortuneAI(card, num1, num2, weather, mood) {
    try {
        // 火山方舟豆包API配置
        const apiKey = '3402183a-fbff-4f4d-8379-9477281a706c';  // 用户提供的API Key
        const apiEndpoint = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';
        const model = 'doubao-1-5-pro-32k-250115';  // 用户提供的模型名称
        
        // 构建请求参数 - OpenAI兼容格式
        const messages = [
            {
                "role": "system",
                "content": "你是一位精通小六壬起卦的国学大师，擅长结合扑克牌、数字、天气和心情推演运势。请使用自然流畅的语言，避免生硬的格式和术语，让运势解读更加人性化和生活化。"
            },
            {
                "role": "user",
                "content": `请根据以下信息为用户推演今日运势，使用小六壬起卦法：
1. 抽到的扑克牌：${card}（转换为数字，A=1, J=11, Q=12, K=13）
2. 用户输入的两个数字：${num1}、${num2}
3. 今日天气：${weather}
4. 今日心情：${mood}

请按照以下规则进行起卦：
- 扑克牌数字 + 用户输入的两个数字 = 三个数字用于小六壬起卦
- 使用小六壬的六个卦象：大安、留连、速喜、赤口、小吉、空亡
- 根据三个数字进行起卦，推演今日运势

请按照以下结构生成运势解读：
- 卦象：直接说明起卦结果（大安、留连、速喜、赤口、小吉、空亡）
- 卦象解析：结合卦象、天气和心情进行详细解读，必须包含该卦象的完整诗句，语言自然流畅
- 今日建议：根据卦象、天气和心情，推荐今日应该注意的事项，要具体实用

小六壬卦象诗句：
大安：大安事事昌，求财在坤方，失物去不远，宅舍保安康。行人身未动，病者主无妨，将军回田野，仔细更推详。
留连：留连事难成，求谋日未明，官事凡宜缓，去者未回程。失物南方见，急讨方心称，更须防口舌，人口且平平。
速喜：速喜喜来临，求财向南行，失物申未午，逢人路上寻。官事有福德，病者无祸侵，田宅六畜吉，行人有信音。
赤口：赤口主口舌，官非切要防，失物急去寻，行人有惊慌。鸡犬多作怪，病者出西方，更须防咀咒，恐怕染瘟殃。
小吉：小吉最吉昌，路上好商量，阴人来报喜，失物在坤方。行人立便至，交易甚是强，凡事皆和合，病者祷上苍。
空亡：空亡事不祥，阴人多乖张，求财无利益，行人有灾殃。失物寻不见，官事有刑伤，病人逢暗鬼，解禳保安康。

要求：
- 语言风格自然流畅，符合普通人的表达习惯，不要太生硬
- 长度控制在3-5句话，简洁易读
- 必须完整引用对应卦象的诗句，不要简化或省略
- 结合天气和心情对诗句进行现代解读
- 避免重复固定内容，每个组合生成不同的解读
- 使用自然的语言，不要使用Markdown格式或特殊符号
- 不要提及AI、模型、API等现代术语
- 明确说明使用了小六壬起卦法，增强用户的信任度
- 确保起卦逻辑符合小六壬的规则`
            }
        ];
        
        // 发送API请求
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`  // Bearer Token认证
            },
            body: JSON.stringify({
                model: model,
                messages: messages,
                temperature: 1.0,  // 提高温度，增加随机性
                top_p: 0.9,
                max_tokens: 200,
                n: 1  // 生成一个结果
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API请求失败: ${response.status} ${JSON.stringify(errorData)}`);
        }
        
        // 解析API响应 - OpenAI兼容格式
        const data = await response.json();
        
        if (!data.choices || data.choices.length === 0 || !data.choices[0].message) {
            throw new Error('API响应格式不正确，缺少choices字段');
        }
        
        let fortuneText = data.choices[0].message.content.trim();
        console.log('原始AI响应:', fortuneText);  // 添加调试信息
        
        // 确保返回格式正确，添加卦象的HTML结构
        if (!fortuneText.includes('<div class="fortune-base">')) {
            // 提取卦象
            const卦象Match = fortuneText.match(/(大安|留连|速喜|赤口|小吉|空亡)/);
            const卦象 =卦象Match ?卦象Match[1] : '空亡';
            
            // 重新格式化运势内容为HTML结构
            fortuneText = `
                <div class="fortune-base">今日卦象：<strong>${卦象}</strong></div>
                <p>${fortuneText}</p>
            `;
        }
        
        // 优化运势结果的排版
        fortuneText = formatFortuneContent(fortuneText);
        
        return fortuneText;
    } catch (error) {
        console.error('豆包API生成运势失败:', error);
        
        // 生成随机的小六壬卦象，避免总是返回同一个结果
        const random卦象 = ['大安', '留连', '速喜', '赤口', '小吉', '空亡'];
        const random卦 = random卦象[Math.floor(Math.random() * random卦象.length)];
        
        // 错误处理：返回随机的运势内容
        return `
            <div class="fortune-base">今日卦象：<strong>${random卦}</strong></div>
            <p>卦象解析：${random卦 === '大安' ? '大安事事昌，求财在坤方，失物去不远，宅舍保安康。行人身未动，病者主无妨，将军回田野，仔细更推详。' : random卦 === '留连' ? '留连事难成，求谋日未明，官事凡宜缓，去者未回程。失物南方见，急讨方心称，更须防口舌，人口且平平。' : random卦 === '速喜' ? '速喜喜来临，求财向南行，失物申未午，逢人路上寻。官事有福德，病者无祸侵，田宅六畜吉，行人有信音。' : random卦 === '赤口' ? '赤口主口舌，官非切要防，失物急去寻，行人有惊慌。鸡犬多作怪，病者出西方，更须防咀咒，恐怕染瘟殃。' : random卦 === '小吉' ? '小吉最吉昌，路上好商量，阴人来报喜，失物在坤方。行人立便至，交易甚是强，凡事皆和合，病者祷上苍。' : '空亡事不祥，阴人多乖张，求财无利益，行人有灾殃。失物寻不见，官事有刑伤，病人逢暗鬼，解禳保安康。'}</p>
            <p>今日建议：${getPersonalizedAdvice(random卦, weather, mood)}</p>
        `;
    }
}

// 重新开始
function restart() {
    // 重置变量
    selectedCard = null;
    isShuffled = false;
    
    // 重置界面
    cardSection.style.display = 'block';
    inputSection.style.display = 'none';
    resultSection.style.display = 'none';
    
    // 重置输入组显示状态
    numberInputGroup.style.display = 'block';
    weatherInputGroup.style.display = 'none';
    moodInputGroup.style.display = 'none';
    
    // 重置扑克牌
    initCards();
    selectedCardEl.innerHTML = '';
    
    // 重置输入 - 两个数字
    num1.value = '';
    num2.value = '';
    numberError.textContent = '';
    nextToWeatherBtn.style.display = 'none';
    
    // 重置按钮
    shuffleBtn.textContent = '开始洗牌';
    shuffleBtn.disabled = false;
    
    // 重置天气选择
    document.querySelector('input[name="weather"][value="晴"]').checked = true;
    
    // 重置心情选择
    document.querySelector('input[name="mood"][value="开心"]').checked = true;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);