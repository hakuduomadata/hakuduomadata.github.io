// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化轮播图
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });
    
        // VR展示功能
    document.addEventListener('DOMContentLoaded', function() {
        const vrFrame = document.getElementById('vr-frame');
        const thumbnails = document.querySelectorAll('.thumbnail');
        const fullscreenBtn = document.querySelector('.fullscreen-btn');

        // 切换VR场景
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // 移除其他缩略图的active类
                thumbnails.forEach(t => t.classList.remove('active'));
                // 添加当前缩略图的active类
                this.classList.add('active');
                // 更新iframe的src
                vrFrame.src = this.dataset.vrSrc;
            });
        });

        // 全屏功能
        fullscreenBtn.addEventListener('click', function() {
            if (vrFrame.requestFullscreen) {
                vrFrame.requestFullscreen();
            } else if (vrFrame.webkitRequestFullscreen) {
                vrFrame.webkitRequestFullscreen();
            } else if (vrFrame.msRequestFullscreen) {
                vrFrame.msRequestFullscreen();
            }
        });
    });

    // 语言切换功能
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            langButtons.forEach(btn => btn.classList.remove('active'));
            // 为当前点击的按钮添加active类
            this.classList.add('active');
            
            // 获取选中的语言
            const selectedLang = this.getAttribute('data-lang');
            // 这里可以添加切换语言的具体逻辑
            console.log('切换到语言：', selectedLang);
        });
    });
});

