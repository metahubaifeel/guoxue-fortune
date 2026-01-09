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
    
    // 隐藏调试信息区域（不在界面上显示）
    const debugInfo = document.getElementById('debugInfo');
    debugInfo.style.display = 'none';
    
    // 更新界面 - 更生动的文案和动效
    resultCard.innerHTML = `
        <div class="loading-container">
            <div class="loading-emoji">🔮</div>
            <div class="loading-text">小师傅正在起卦中</div>
            <div class="loading-subtext">天机不可泄露，容我掐指一算</div>
            <div class="loading-dots">
                <span class="dot">.</span>
                <span class="dot">.</span>
                <span class="dot">.</span>
            </div>
            <div class="loading"></div>
        </div>
    `;
    
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
    
    // 如果是备用结果，显示提示
    if (fortune.includes('使用备用算法')) {
        debugInfo.innerHTML += '<br><span style="color: orange;">⚠️ 当前为备用算法结果，AI API可能暂时不可用</span>';
    }
}

// 小六壬起卦算法
function calculateXiaoLiuRen(cardNum, num1, num2) {
    // 小六壬六个卦象
    const guaXiang = ['大安', '留连', '速喜', '赤口', '小吉', '空亡'];
    
    // 计算三个数字的和
    const total = cardNum + num1 + num2;
    
    // 小六壬算法：用总和除以6，取余数确定卦象
    // 余数为0时是第6个卦象（空亡），余数为1-5对应前5个卦象
    const remainder = total % 6;
    const guaIndex = remainder === 0 ? 5 : remainder - 1;
    
    return {
        卦象: guaXiang[guaIndex],
        数字和: total,
        余数: remainder
    };
}

// 获取卦象的完整诗句
function getGuaXiangPoem(卦象) {
    const poems = {
        '大安': '大安事事昌，求财在坤方，失物去不远，宅舍保安康。行人身未动，病者主无妨，将军回田野，仔细更推详。',
        '留连': '留连事难成，求谋日未明，官事凡宜缓，去者未回程。失物南方见，急讨方心称，更须防口舌，人口且平平。',
        '速喜': '速喜喜来临，求财向南行，失物申未午，逢人路上寻。官事有福德，病者无祸侵，田宅六畜吉，行人有信音。',
        '赤口': '赤口主口舌，官非切要防，失物急去寻，行人有惊慌。鸡犬多作怪，病者出西方，更须防咀咒，恐怕染瘟殃。',
        '小吉': '小吉最吉昌，路上好商量，阴人来报喜，失物在坤方。行人立便至，交易甚是强，凡事皆和合，病者祷上苍。',
        '空亡': '空亡事不祥，阴人多乖张，求财无利益，行人有灾殃。失物寻不见，官事有刑伤，病人逢暗鬼，解禳保安康。'
    };
    
    return poems[卦象] || '';
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
    content = content.replace(/。/g, '。<br>');
    content = content.replace(/！/g, '！<br>');
    content = content.replace(/？/g, '？<br>');
    content = content.replace(/；/g, '；<br>');
    
    // 处理数字列表
    content = content.replace(/(\d+)[\.、]/g, '<br><strong class="fortune-number">$1.</strong>');
    
    // 处理建议部分
    content = content.replace(/建议[：:]/g, '<br><strong class="fortune-advice-title">建议：</strong>');
    content = content.replace(/今日建议[：:]/g, '<br><strong class="fortune-advice-title">今日建议：</strong>');
    
    // 处理工作、学习、生活等方面
    content = content.replace(/工作[：:]/g, '<br><strong class="fortune-category">工作：</strong>');
    content = content.replace(/学习[：:]/g, '<br><strong class="fortune-category">学习：</strong>');
    content = content.replace(/生活[：:]/g, '<br><strong class="fortune-category">生活：</strong>');
    content = content.replace(/人际[：:]/g, '<br><strong class="fortune-category">人际：</strong>');
    content = content.replace(/健康[：:]/g, '<br><strong class="fortune-category">健康：</strong>');
    content = content.replace(/财运[：:]/g, '<br><strong class="fortune-category">财运：</strong>');
    content = content.replace(/感情[：:]/g, '<br><strong class="fortune-category">感情：</strong>');
    
    // 处理卦象名称
    content = content.replace(/(大安|留连|速喜|赤口|小吉|空亡)/g, '<strong class="fortune-guaxiang">$1</strong>');
    
    // 处理天气和心情关键词
    content = content.replace(/(晴天|阴天|雨天|雪天|大风|晴朗)/g, '<strong class="fortune-weather">$1</strong>');
    content = content.replace(/(开心|焦虑|平静|兴奋|烦躁|忧郁|期待)/g, '<strong class="fortune-mood">$1</strong>');
    
    // 处理强调语气
    content = content.replace(/(注意|提醒|切记|务必|特别)/g, '<strong class="fortune-emphasis">$1</strong>');
    
    // 重点：处理实际的建议性内容，而不是无意义的词
    content = content.replace(/(主动与朋友、同事交流互动|其实是充满活力与希望的|不要过于吹嘘或夸大其词|保持平和心态|顺其自然|提前做好准备|多留意细节|灵活应对|保持乐观|积极面对|谨慎处理|认真对待|用心经营|把握机会|化解矛盾|增进感情|提升自我|调整心态|做好准备|留有余地|循序渐进|稳扎稳打|脚踏实地|量力而行|适可而止|见好就收|及时止损|保持冷静|理性分析|深思熟虑|全面考虑|权衡利弊|做出选择|承担责任|勇于面对|敢于尝试|突破自我|开拓创新|与时俱进|不断学习|积累经验|提升能力|完善自我|追求卓越|精益求精|追求完美|注重细节|把握时机|抢占先机|赢得主动|占据优势|脱颖而出|展现自我|实现价值|达成目标|实现梦想|追求幸福|享受生活|珍惜当下|感恩拥有|保持初心|不忘本心|坚持原则|守住底线|不越红线|谨言慎行|三思而后行|谋定而后动|审时度势|随机应变|因势利导|顺势而为|借势发力|借力打力|以退为进|以守为攻|攻守兼备|进退有度|收放自如|张弛有度|劳逸结合|松紧适度|把握分寸|掌握火候|恰到好处|适可而止|见好就收|穷寇莫追|逢凶化吉|转危为安|化险为夷|遇难呈祥|否极泰来|时来运转|柳暗花明|峰回路转|绝处逢生|起死回生|脱胎换骨|焕然一新|重获新生|重新开始|重新出发|从头再来|再接再厉|百折不挠|永不言弃|坚持不懈|持之以恒|锲而不舍|金石可镂|水滴石穿|绳锯木断|铁杵成针|百炼成钢|千锤百炼|精益求精|追求完美|至善至美|美轮美奂|巧夺天工|出神入化|炉火纯青|登峰造极|无与伦比|无可比拟|前所未有|闻所未闻|见所未见)/g, '<strong class="fortune-key-advice">$1</strong>');
    
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
            cleanParagraph = cleanParagraph.replace(/卦象：<strong class="fortune-guaxiang">(大安|留连|速喜|赤口|小吉|空亡)<\/strong>/, '卦象：<strong class="fortune-tone">$1</strong>');
            
            // 为今日建议添加特殊样式
            cleanParagraph = cleanParagraph.replace(/今日建议：<strong class="fortune-advice-title">(.*?)<\/strong>/, '今日建议：<strong class="fortune-advice">$1</strong>');
            
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
- 长度控制在3-8句话，简洁易读
- 必须完整引用对应卦象的诗句，不要简化或省略
- 结合天气和心情对诗句进行现代解读
- 避免重复固定内容，每个组合生成不同的解读
- 使用自然的语言，不要使用Markdown格式或特殊符号
- 不要提及AI、模型、API等现代术语
- 明确说明使用了小六壬起卦法，增强用户的信任度
- 确保起卦逻辑符合小六壬的规则`
            }
        ];
        
        // 将扑克牌转换为数字
        const cardValues = {
            'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13
        };
        const cardNum = cardValues[card];
        
        // 使用小六壬算法计算卦象
        const xiaoLiuRenResult = calculateXiaoLiuRen(cardNum, parseInt(num1), parseInt(num2));
        const 卦象 = xiaoLiuRenResult.卦象;
        const 数字和 = xiaoLiuRenResult.数字和;
        const 余数 = xiaoLiuRenResult.余数;
        
        // 更新消息内容，使用真实的卦象结果
        const uniqueId = Date.now() + Math.random(); // 生成唯一标识符
        messages[1].content = `请根据以下信息为用户推演今日运势：

起卦信息：
- 抽到的扑克牌：${card}（对应数字：${cardNum}）
- 用户输入的两个数字：${num1}、${num2}
- 三个数字之和：${数字和}
- 小六壬算法：${数字和} ÷ 6 = ${Math.floor(数字和/6)}余${余数} → 卦象：${卦象}
- 唯一标识：${uniqueId}（确保每次生成内容都不同）

环境因素：
- 今日天气：${weather}
- 今日心情：${mood}

请按照以下结构生成运势解读：
1. 卦象：明确告知用户今日卦象是${卦象}
2. 卦象诗句：完整引用${卦象}的诗句
3. 现代解读：结合天气（${weather}）和心情（${mood}），用现代语言解读这首诗句的含义
4. 今日建议：根据${卦象}、${weather}天气和${mood}心情，给出具体实用的建议（至少4-5句话，每句话都要有独特的角度和建议）

要求：
- 语言风格要像一位真正的国学大师，自然流畅，符合现代人的表达习惯
- 必须完整引用${卦象}的原始诗句，不要简化或省略
- 结合天气和心情对诗句进行个性化现代解读
- 今日建议要具体实用，避免空话套话，每句话都要有独特的观点
- 即使相同的卦象和输入条件，也要用不同的词语和表达方式
- 使用自然的语言，不要使用Markdown格式或特殊符号
- 不要提及AI、模型、API等现代术语
- 让用户感受到这是真正的小六壬占卜，增强信任感
- 每次生成都要有不同的表达角度和侧重点`
        
        // 发送API请求 - 使用本地代理服务器
        console.log('正在调用AI API...');
        console.log('请求参数:', JSON.stringify(messages, null, 2));
        
        // 在界面上显示调试信息
        const debugInfo = document.getElementById('debugInfo');
        debugInfo.innerHTML = `
            <strong>调试信息：</strong><br>
            扑克牌: ${card}<br>
            数字: ${num1}, ${num2}<br>
            天气: ${weather}<br>
            心情: ${mood}<br>
            正在调用AI API...<br>
            <small>时间: ${new Date().toLocaleTimeString()}</small>
        `;
        
        // 智能判断API端点
        const getApiEndpoint = () => {
            // 开发环境
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                return 'http://localhost:3001/api/ai-fortune';
            }
            
            // Railway部署环境
            if (window.location.hostname.includes('railway.app')) {
                return 'https://xiaoshifu-ai-proxy.up.railway.app/api/ai-fortune';
            }
            
            // Vercel部署环境
            if (window.location.hostname.includes('vercel.app')) {
                return 'https://xiaoshifu-ai-proxy.up.railway.app/api/ai-fortune';
            }
            
            // 自定义域名
            return 'https://your-ai-proxy-domain.com/api/ai-fortune';
        };
        
        const proxyEndpoint = getApiEndpoint();
        
        const response = await fetch(proxyEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                card: card,
                num1: num1,
                num2: num2,
                weather: weather,
                mood: mood,
                guaXiang: 卦象
            })
        }).catch(error => {
            console.error('代理服务器请求失败:', error);
            debugInfo.innerHTML += `<br><span style="color: red;">✗ 代理服务器请求失败: ${error.message}</span>`;
            throw error;
        });
        
        console.log('代理API响应状态:', response.status);
        debugInfo.innerHTML += `<br>代理API响应状态: ${response.status}`;
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('API请求失败:', errorData);
            throw new Error(`API请求失败: ${response.status} ${JSON.stringify(errorData)}`);
        }
        
        // 解析代理服务器响应
        const result = await response.json();
        console.log('代理服务器响应:', result);
        
        if (!result.success) {
            throw new Error(result.error || '代理服务器处理失败');
        }
        
        let fortuneText = result.data.ai解读;
        console.log('AI生成的运势:', fortuneText);
        
        // 更新调试信息显示AI已响应
        debugInfo.innerHTML += '<br><span style="color: green;">✓ AI API响应成功</span>';
        console.log('原始AI响应:', fortuneText);  // 添加调试信息
        
        // 确保返回格式正确，添加卦象的HTML结构
        if (!fortuneText.includes('<div class="fortune-base">')) {
            // 提取卦象
            const guaXiangMatch = fortuneText.match(/(大安|留连|速喜|赤口|小吉|空亡)/);
            const guaXiang = guaXiangMatch ? guaXiangMatch[1] : '空亡';
            
            // 重新格式化运势内容为HTML结构
            fortuneText = `
                <div class="fortune-base">今日卦象：<strong>${guaXiang}</strong></div>
                <p>${fortuneText}</p>
            `;
        }
        
        // 优化运势结果的排版
        fortuneText = formatFortuneContent(fortuneText);
        
        return fortuneText;
    } catch (error) {
        console.error('豆包API生成运势失败:', error);
        
        // 更新调试信息显示错误
        const debugInfo = document.getElementById('debugInfo');
        debugInfo.innerHTML += `<br><span style="color: red;">✗ AI API调用失败: ${error.message}</span><br><small>使用备用算法生成结果</small>`;
        
        // 错误处理：使用真实的小六壬算法计算卦象
        const cardValues = {
            'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13
        };
        const cardNum = cardValues[card];
        const fallbackResult = calculateXiaoLiuRen(cardNum, parseInt(num1), parseInt(num2));
        const fallbackGua = fallbackResult.卦象;
        const fallbackPoem = getGuaXiangPoem(fallbackGua);
        
        return `
            <div class="fortune-base">今日卦象：<strong>${fallbackGua}</strong></div>
            <p>卦象解析：${fallbackPoem}</p>
            <p>今日建议：今日${fallbackGua}，结合${weather}天气和您的${mood}心情，建议您保持平和心态，顺其自然。<small>（使用备用算法生成）</small></p>
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