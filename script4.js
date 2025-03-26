document.addEventListener('DOMContentLoaded', () => {
    // 定义三种不同类型的emoji
    const gestures = ['👊', '✌️', '👍', '👋', '✊', '👏', '🤝', '🙏', '🤌🏻', '💪🏻', '👐🏻', '☝🏻️', '🙌🏻', '✋🏻', '🖕🏻', '✍🏻️', '👎🏻'];
    const flags = ['🇨🇳', '🇺🇸', '🇯🇵', '🇬🇧', '🇫🇷', '🇩🇪', '🇮🇹', '🇪🇸', '🇷🇺', '🇧🇷', '🇰🇷', '🇦🇺', '🇨🇦', '🇮🇳', '🇲🇽', '🇿🇦', '🇸🇦', '🇪🇺'];
    // 添加各国特色食物emoji到元素中
    const elements = [
        '🔥', '💧', '⚡', '🌪️', '❄️', '🌊', '🌈', '☀️', '🌙', '⭐', '☁️', '🌱',
        '🍕', '🍔', '🍣', '🥖', '🥐', '🌮', '🌯', '🍜', '🍚', '🍝', '🥟', '🍤',
        '🍦', '🥗', '🍺', '🍾', '🍵', '🧋', '🍡', '🥘', '🍲', '🍛', '🫔', '🥓'
    ];

    // 获取DOM元素
    const slot1 = document.getElementById('slot1');
    const slot2 = document.getElementById('slot2');
    const slot3 = document.getElementById('slot3');
    const spinButton = document.getElementById('spin-button');
    const winButton = document.getElementById('win-button');
    const resultDisplay = document.getElementById('result');
    const jackpotEffect = document.getElementById('jackpot-effect');
    const confettiContainer = document.querySelector('.confetti-container');
    const lever = document.getElementById('lever');
    const coinSlot = document.querySelector('.coin-slot');
    const coinCountDisplay = document.getElementById('coin-count'); // 添加金币计数器元素
    
    // 添加游戏币计数
    let coins = 0;
    const coinSlotText = document.querySelector('.coin-slot-text');
    updateCoinDisplay();
    
    // 更新投币口和金币计数器显示
    function updateCoinDisplay() {
        // 移除投币口的金币计数，只显示"投币口"文字
        coinSlotText.textContent = `投币口`;
        
        // 更新右上角的金币计数器
        coinCountDisplay.textContent = coins;
        
        // 添加金币增加动画
        coinCountDisplay.style.animation = 'none';
        setTimeout(() => {
            coinCountDisplay.style.animation = 'pulse 0.5s';
        }, 10);
    }
    
    // 定义大奖组合
    const JACKPOT_COMBINATION = {
        gesture: '👊',
        flag: '🇺🇸',
        element: '🔥'
    };

    // 随机选择emoji的函数
    function getRandomEmoji(emojiArray) {
        return emojiArray[Math.floor(Math.random() * emojiArray.length)];
    }

    // 创建彩带效果
    function createConfetti() {
        // 现有代码保持不变
        confettiContainer.innerHTML = '';
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#8800ff'];
        
        for (let i = 0; i < 200; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = `${5 + Math.random() * 10}px`;
            confetti.style.height = `${5 + Math.random() * 10}px`;
            confetti.style.opacity = Math.random();
            confetti.style.animationDuration = `${3 + Math.random() * 5}s`;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            
            confettiContainer.appendChild(confetti);
        }
    }

    // 显示大奖特效
    function showJackpotEffect() {
        // 创建更多彩带
        createConfetti();
        
        // 添加震动效果
        document.body.classList.add('shake');
        
        slot1.classList.add('jackpot');
        slot2.classList.add('jackpot');
        slot3.classList.add('jackpot');
        
        jackpotEffect.classList.add('active');
        
        // 播放多重音效
        const winSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3');
        winSound.volume = 0.7;
        winSound.play().catch(e => console.log('无法播放音效:', e));
        
        // 播放欢呼声
        setTimeout(() => {
            const cheerSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-crowd-in-stadium-cheering-loop-442.mp3');
            cheerSound.volume = 0.4;
            cheerSound.play().catch(e => console.log('无法播放音效:', e));
        }, 500);
        
        // 播放金币掉落音效
        setTimeout(() => {
            const coinSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-coins-handling-1939.mp3');
            coinSound.volume = 0.5;
            coinSound.play().catch(e => console.log('无法播放音效:', e));
        }, 1000);
        
        // 添加额外的视觉效果
        createExtraEffects();
        
        setTimeout(() => {
            jackpotEffect.classList.remove('active');
            slot1.classList.remove('jackpot');
            slot2.classList.remove('jackpot');
            slot3.classList.remove('jackpot');
            document.body.classList.remove('shake');
        }, 5000);
    }

    // 创建彩带效果
    function createConfetti() {
        confettiContainer.innerHTML = '';
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#8800ff', '#ff0088', '#00ff88', '#gold', '#silver'];
        
        // 增加彩带数量
        for (let i = 0; i < 300; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = `${5 + Math.random() * 15}px`;
            confetti.style.height = `${5 + Math.random() * 15}px`;
            confetti.style.opacity = Math.random();
            confetti.style.animationDuration = `${3 + Math.random() * 5}s`;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            
            // 随机形状
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            } else if (Math.random() > 0.5) {
                confetti.style.borderRadius = '5px';
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            }
            
            confettiContainer.appendChild(confetti);
        }
    }

    // 添加额外的视觉效果
    function createExtraEffects() {
        // 创建闪光效果
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const flash = document.createElement('div');
                flash.className = 'jackpot-flash';
                document.body.appendChild(flash);
                
                setTimeout(() => {
                    flash.remove();
                }, 500);
            }, i * 300);
        }
        
        // 创建金币雨
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const coin = document.createElement('div');
                coin.className = 'jackpot-coin';
                coin.textContent = '💰';
                coin.style.left = `${Math.random() * 100}%`;
                coin.style.animationDuration = `${1 + Math.random() * 3}s`;
                coin.style.fontSize = `${20 + Math.random() * 30}px`;
                document.body.appendChild(coin);
                
                setTimeout(() => {
                    coin.remove();
                }, 3000);
            }, i * 100);
        }
    }

    // 创建更真实的老虎机滚动效果
    function createSlotReel(slotElement, emojiArray, finalEmoji) {
        const slotWrapper = slotElement.querySelector('.slot-wrapper');
        slotWrapper.innerHTML = '';
        slotWrapper.classList.add('spinning');
        
        // 创建emoji容器
        const emojiContainer = document.createElement('div');
        emojiContainer.className = 'emoji-container';
        
        // 添加足够多的随机emoji，确保滚动效果连贯
        for (let i = 0; i < 20; i++) {
            const emojiDiv = document.createElement('div');
            emojiDiv.className = 'emoji';
            emojiDiv.textContent = getRandomEmoji(emojiArray);
            emojiContainer.appendChild(emojiDiv);
        }
        
        // 最后添加最终结果的emoji
        const finalEmojiDiv = document.createElement('div');
        finalEmojiDiv.className = 'emoji final';
        finalEmojiDiv.textContent = finalEmoji;
        emojiContainer.appendChild(finalEmojiDiv);
        
        slotWrapper.appendChild(emojiContainer);
        
        return {
            container: emojiContainer,
            finalEmoji: finalEmoji
        };
    }

    // 停止滚动并显示结果
    function stopReel(slotElement, finalEmoji, delay) {
        return new Promise(resolve => {
            setTimeout(() => {
                const slotWrapper = slotElement.querySelector('.slot-wrapper');
                slotWrapper.classList.remove('spinning');
                slotWrapper.innerHTML = '';
                
                const emojiDiv = document.createElement('div');
                emojiDiv.className = 'emoji';
                emojiDiv.textContent = finalEmoji;
                slotWrapper.appendChild(emojiDiv);
                
                // 添加停止音效
                const stopSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-slot-machine-wheel-1932.mp3');
                stopSound.volume = 0.3;
                stopSound.play().catch(e => console.log('无法播放音效:', e));
                
                resolve();
            }, delay);
        });
    }

    // 拉杆动画
    function pullLever() {
        return new Promise(resolve => {
            lever.classList.add('pulled');
            
            // 播放拉杆音效
            const leverSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-metal-handle-pull-2709.mp3');
            leverSound.volume = 0.5;
            leverSound.play().catch(e => console.log('无法播放音效:', e));
            
            setTimeout(() => {
                lever.classList.remove('pulled');
                resolve();
            }, 1000);
        });
    }

    // 旋转动画函数
    async function spin(forceWin = false) {
        // 检查是否有足够的币
        if (coins <= 0 && !forceWin) {
            resultDisplay.textContent = "请先投币后再玩！点击投币口添加游戏币。";
            resultDisplay.style.animation = 'none';
            setTimeout(() => {
                resultDisplay.style.animation = 'pulse 0.5s';
            }, 10);
            return;
        }
        
        // 如果不是强制获胜模式，消耗一个币
        if (!forceWin) {
            coins--;
            updateCoinDisplay();
        }
        
        // 禁用按钮和拉杆
        spinButton.disabled = true;
        winButton.disabled = true;
        lever.style.pointerEvents = 'none';
        spinButton.textContent = '旋转中...';
        
        // 播放开始旋转音效
        const spinSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-slot-machine-spin-1931.mp3');
        spinSound.volume = 0.5;
        spinSound.play().catch(e => console.log('无法播放音效:', e));
        
        // 选择最终的emoji
        let finalGesture, finalFlag, finalElement;
        
        if (forceWin) {
            // 如果是必胜模式，直接使用大奖组合
            finalGesture = JACKPOT_COMBINATION.gesture;
            finalFlag = JACKPOT_COMBINATION.flag;
            finalElement = JACKPOT_COMBINATION.element;
        } else {
            // 随机选择
            finalGesture = getRandomEmoji(gestures);
            finalFlag = getRandomEmoji(flags);
            finalElement = getRandomEmoji(elements);
        }
        
        // 创建滚动动画
        const reel1 = createSlotReel(slot1, gestures, finalGesture);
        const reel2 = createSlotReel(slot2, flags, finalFlag);
        const reel3 = createSlotReel(slot3, elements, finalElement);
        
        // 设置不同的停止时间，增加悬念感
        const stopDelay1 = 750 + Math.random() * 500;
        const stopDelay2 = stopDelay1 + 200 + Math.random() * 300;
        const stopDelay3 = stopDelay2 + 10 + Math.random() * 50;
        
        // 依次停止每个转轮
        await stopReel(slot1, finalGesture, stopDelay1);
        await stopReel(slot2, finalFlag, stopDelay2);
        await stopReel(slot3, finalElement, stopDelay3);
        
        // 重新启用按钮和拉杆
        spinButton.disabled = false;
        winButton.disabled = false;
        lever.style.pointerEvents = 'auto';
        spinButton.textContent = '旋转!';
        
        // 显示结果
        checkResult(finalGesture, finalFlag, finalElement);
    }

    // 检查结果并显示消息
    function checkResult(emoji1, emoji2, emoji3) {
        // 检查是否是大奖组合
        const isJackpot = (
            emoji1 === JACKPOT_COMBINATION.gesture && 
            emoji2 === JACKPOT_COMBINATION.flag && 
            emoji3 === JACKPOT_COMBINATION.element
        );
        
        // 检查是否是欧洲国家旗帜
        const europeanFlags = ['🇬🇧', '🇫🇷', '🇩🇪', '🇮🇹', '🇪🇸', '🇪🇺'];
        const isEuropeanFlag = europeanFlags.includes(emoji2);
        
        // 检查是否是中国国旗
        const isChinaFlag = emoji2 === '🇨🇳';
        
        // 创建结果消息
        let message = `你的组合是: ${emoji1} ${emoji2} ${emoji3}`;
        
        // 添加奖励
        let reward = 0;
        
        if (isChinaFlag) {
            // 中国国旗惩罚 - 扣光所有金币
            const lostCoins = coins;
            coins = 0;
            message += ` - 中国移民偷走了你的工作！😱损失了${lostCoins}金币`;
            resultDisplay.textContent = message;
            
            // 显示中国国旗惩罚特效
            showChinaPenaltyEffect();
        } else if (isJackpot) {
            reward = 100;
            message += ` - 50天50场胜利！！！🥳🥳🥳🥳🥳 +${reward}金币`;
            resultDisplay.textContent = message;
            
            // 触发大奖特效
            showJackpotEffect();
        } else if (isEuropeanFlag) {
            reward = 10;
            message += ` - 你不准吃白食 +${reward}金币`;
            resultDisplay.textContent = message;
        } else {
            // 添加一些随机的有趣评论
            const comments = [
                "哇！这是个有趣的组合！",
                "看看你得到了什么！",
                "这个组合很特别！",
                "再试一次，运气可能会更好！",
                "这个组合看起来很有意思！",
                "继续旋转，看看会发生什么！",
                "这个组合有什么特别的含义吗？",
                "真是个奇妙的组合！"
            ];
            
            message += " - " + comments[Math.floor(Math.random() * comments.length)];
            resultDisplay.textContent = message;
        }
        
        // 添加奖励金币
        if (reward > 0) {
            coins += reward;
            updateCoinDisplay();
            
            // 播放获得金币音效
            const rewardSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-bonus-earned-in-video-game-2058.mp3');
            rewardSound.volume = 0.5;
            rewardSound.play().catch(e => console.log('无法播放音效:', e));
        }
        
        // 添加特效
        resultDisplay.style.animation = 'none';
        setTimeout(() => {
            resultDisplay.style.animation = 'pulse 0.5s';
        }, 10);
    }

    // 添加点击事件监听器
    spinButton.addEventListener('click', () => spin(false));
    
    // 添加必胜按钮点击事件
    winButton.addEventListener('click', () => spin(true));
    
    // 添加拉杆点击事件
    lever.addEventListener('click', async () => {
        await pullLever();
        spin(false);
    });

    // 添加键盘事件监听器（空格键也可以旋转）
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space' && !spinButton.disabled) {
            event.preventDefault();
            spin(false);
        }
    });

    // 添加脉冲动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // 添加投币口点击事件
    coinSlot.addEventListener('click', () => {
        // 播放投币音效
        const coinSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-coins-handling-1939.mp3');
        coinSound.volume = 0.5;
        coinSound.play().catch(e => console.log('无法播放音效:', e));
        
        // 添加游戏币
        coins += 5;
        updateCoinDisplay();
        
        // 显示提示
        resultDisplay.textContent = `已添加5个游戏币！当前共有${coins}个游戏币。`;
        resultDisplay.style.animation = 'none';
        setTimeout(() => {
            resultDisplay.style.animation = 'pulse 0.5s';
        }, 10);
        
        // 添加投币动画
        const coin = document.createElement('div');
        coin.className = 'coin';
        coinSlot.appendChild(coin);
        
        setTimeout(() => {
            coin.remove();
        }, 1000);
    });
});

// 显示中国国旗惩罚特效
function showChinaPenaltyEffect() {
    const penaltyEffect = document.getElementById('china-penalty-effect');
    penaltyEffect.classList.add('active');
    
    // 播放惩罚音效
    const penaltySound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-retro-arcade-game-over-470.mp3');
    penaltySound.volume = 0.7;
    penaltySound.play().catch(e => console.log('无法播放音效:', e));
    
    // 添加震动效果
    document.body.classList.add('shake');
    
    setTimeout(() => {
        penaltyEffect.classList.remove('active');
        document.body.classList.remove('shake');
    }, 3000);
}
