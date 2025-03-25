document.addEventListener('DOMContentLoaded', () => {
    // 定义三种不同类型的emoji
    const gestures = ['👊', '✌️', '👍', '👋', '👈', '👉', '👆', '👇', '✊', '👏', '🤝', '🙏'];
    const flags = ['🇨🇳', '🇺🇸', '🇯🇵', '🇬🇧', '🇫🇷', '🇩🇪', '🇮🇹', '🇪🇸', '🇷🇺', '🇧🇷', '🇰🇷', '🇦🇺', '🇨🇦', '🇮🇳', '🇲🇽', '🇿🇦', '🇸🇦', '🇪🇺'];
    const elements = ['🔥', '💧', '⚡', '🌪️', '❄️', '🌊', '🌈', '☀️', '🌙', '⭐', '☁️', '🌱'];

    // 获取DOM元素
    const slot1 = document.getElementById('slot1');
    const slot2 = document.getElementById('slot2');
    const slot3 = document.getElementById('slot3');
    const spinButton = document.getElementById('spin-button');
    const resultDisplay = document.getElementById('result');
    const jackpotEffect = document.getElementById('jackpot-effect');
    const confettiContainer = document.querySelector('.confetti-container');

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
        // 现有代码保持不变
        createConfetti();
        
        slot1.classList.add('jackpot');
        slot2.classList.add('jackpot');
        slot3.classList.add('jackpot');
        
        jackpotEffect.classList.add('active');
        
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3');
        audio.play().catch(e => console.log('无法播放音效:', e));
        
        setTimeout(() => {
            jackpotEffect.classList.remove('active');
            slot1.classList.remove('jackpot');
            slot2.classList.remove('jackpot');
            slot3.classList.remove('jackpot');
        }, 5000);
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

    // 旋转动画函数
    async function spin() {
        // 禁用按钮
        spinButton.disabled = true;
        spinButton.textContent = '旋转中...';
        
        // 播放开始旋转音效
        const spinSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-slot-machine-spin-1931.mp3');
        spinSound.volume = 0.5;
        spinSound.play().catch(e => console.log('无法播放音效:', e));
        
        // 选择最终的emoji
        const finalGesture = getRandomEmoji(gestures);
        const finalFlag = getRandomEmoji(flags);
        const finalElement = getRandomEmoji(elements);
        
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
        
        // 重新启用按钮
        spinButton.disabled = false;
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
        
        // 创建结果消息
        let message = `你的组合是: ${emoji1} ${emoji2} ${emoji3}`;
        
        if (isJackpot) {
            message += " - 恭喜你获得大奖！！！";
            resultDisplay.textContent = message;
            
            // 触发大奖特效
            showJackpotEffect();
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
        
        // 添加特效
        resultDisplay.style.animation = 'none';
        setTimeout(() => {
            resultDisplay.style.animation = 'pulse 0.5s';
        }, 10);
    }

    // 添加点击事件监听器
    spinButton.addEventListener('click', spin);

    // 添加键盘事件监听器（空格键也可以旋转）
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space' && !spinButton.disabled) {
            event.preventDefault();
            spin();
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
});
