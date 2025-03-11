// 数字递增动画函数
function animateNumber(element, target) {
    let current = 0;
    const duration = 1300;  // 修改：将动画时间从 2000ms 改为 1300ms
    const steps = 60;
    const increment = target / (duration / 1000 * steps);
    const interval = duration / steps;
    const plusSpan = element.querySelector('.plus');

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            // 分别设置数字和加号
            element.textContent = Math.round(target);
            element.appendChild(plusSpan);
            clearInterval(counter);
        } else {
            // 分别设置数字和加号
            element.textContent = Math.round(current);
            element.appendChild(plusSpan);
        }
    }, interval);
}


// 创建观察者
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberElement = entry.target;
            const targetValue = parseInt(numberElement.dataset.target);
            animateNumber(numberElement, targetValue);
            observer.unobserve(numberElement); // 动画只执行一次
        }
    });
}, {
    threshold: 0.5
});

// 当页面加载完成后开始观察
document.addEventListener('DOMContentLoaded', () => {
    const numbers = document.querySelectorAll('.strength-item .number');
    numbers.forEach(number => observer.observe(number));
});