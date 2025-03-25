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

    // 重新设计的滚动动画函数
    function animateSlot(slotElement, emojiArray, finalEmoji, duration) {
        return new Promise(resolve => {
            const slotWrapper = slotElement.querySelector('.slot-wrapper');
            
            // 创建滚动内容
            let html = '';
            // 添加足够多的随机emoji以确保滚动效果
            for (let i = 0; i < 30; i++) {
                html += `<div class="emoji">${getRandomEmoji(emojiArray)}</div>`;
            }
            // 最后添加最终结果的emoji
            html += `<div class="emoji final">${finalEmoji}</div>`;
            
            // 设置滚动内容
            slotWrapper.innerHTML = html;
            slotWrapper.classList.add('spinning');
            
            // 设置动画持续时间
            slotWrapper.style.animationDuration = `${duration / 1000}s`;
            
            // 动画结束后停止并显示最终结果
            setTimeout(() => {
                slotWrapper.classList.remove('spinning');
                slotWrapper.innerHTML = `<div class="emoji">${finalEmoji}</div>`;
                resolve();
            }, duration);
        });
    }

    // 旋转动画函数
    async function spin() {
        // 禁用按钮
        spinButton.disabled = true;
        spinButton.textContent = '旋转中...';
        
        // 选择最终的emoji
        const finalGesture = getRandomEmoji(gestures);
        const finalFlag = getRandomEmoji(flags);
        const finalElement = getRandomEmoji(elements);
        
        // 设置不同的动画持续时间
        const duration1 = 1000 + Math.random() * 500;
        const duration2 = 1500 + Math.random() * 500;
        const duration3 = 2000 + Math.random() * 500;
        
        // 并行启动所有动画
        const animation1 = animateSlot(slot1, gestures, finalGesture, duration1);
        const animation2 = animateSlot(slot2, flags, finalFlag, duration2);
        const animation3 = animateSlot(slot3, elements, finalElement, duration3);
        
        // 等待所有动画完成
        await Promise.all([animation1, animation2, animation3]);
        
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
