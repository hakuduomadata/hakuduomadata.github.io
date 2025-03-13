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





// 添加以下代码到现有的 JavaScript 文件中
const certificatesSwiper = new Swiper('.certificates-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        },
        1200: {
            slidesPerView: 4,
        },
    }
});



// 添加以下代码到现有的JavaScript文件中
const featureSwiper = new Swiper('.feature-swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});
