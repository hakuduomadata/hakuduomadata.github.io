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
        // 创建彩带
        createConfetti();
        
        // 添加槽位高亮效果
        slot1.classList.add('jackpot');
        slot2.classList.add('jackpot');
        slot3.classList.add('jackpot');
        
        // 显示大奖特效
        jackpotEffect.classList.add('active');
        
        // 播放音效（如果需要）
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3');
        audio.play().catch(e => console.log('无法播放音效:', e));
        
        // 5秒后关闭特效
        setTimeout(() => {
            jackpotEffect.classList.remove('active');
            slot1.classList.remove('jackpot');
            slot2.classList.remove('jackpot');
            slot3.classList.remove('jackpot');
        }, 5000);
    }

    // 旋转动画函数
    function spin() {
        // 禁用按钮
        spinButton.disabled = true;
        spinButton.textContent = '旋转中...';
        
        // 添加旋转动画类
        slot1.querySelector('.slot-wrapper').classList.add('spinning');
        slot2.querySelector('.slot-wrapper').classList.add('spinning');
        slot3.querySelector('.slot-wrapper').classList.add('spinning');
        
        // 随机设置停止时间
        const spinDurations = [
            1000 + Math.random() * 500,
            1500 + Math.random() * 500,
            2000 + Math.random() * 500
        ];
        
        // 停止第一个槽位
        setTimeout(() => {
            slot1.querySelector('.slot-wrapper').classList.remove('spinning');
            const selectedGesture = getRandomEmoji(gestures);
            slot1.querySelector('.emoji').textContent = selectedGesture;
        }, spinDurations[0]);
        
        // 停止第二个槽位
        setTimeout(() => {
            slot2.querySelector('.slot-wrapper').classList.remove('spinning');
            const selectedFlag = getRandomEmoji(flags);
            slot2.querySelector('.emoji').textContent = selectedFlag;
        }, spinDurations[1]);
        
        // 停止第三个槽位并显示结果
        setTimeout(() => {
            slot3.querySelector('.slot-wrapper').classList.remove('spinning');
            const selectedElement = getRandomEmoji(elements);
            slot3.querySelector('.emoji').textContent = selectedElement;
            
            // 重新启用按钮
            spinButton.disabled = false;
            spinButton.textContent = '旋转!';
            
            // 显示结果
            checkResult();
        }, spinDurations[2]);
    }

    // 检查结果并显示消息
    function checkResult() {
        const emoji1 = slot1.querySelector('.emoji').textContent;
        const emoji2 = slot2.querySelector('.emoji').textContent;
        const emoji3 = slot3.querySelector('.emoji').textContent;
        
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