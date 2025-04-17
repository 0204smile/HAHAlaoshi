// 導航欄滾動效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.backgroundColor = '#fff';
    }
});

// 平滑滾動效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 頁面載入動畫
document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.querySelector('main');
    mainContent.style.opacity = '0';
    setTimeout(() => {
        mainContent.style.transition = 'opacity 0.5s ease-in';
        mainContent.style.opacity = '1';
    }, 100);
});

// 輪播功能
document.addEventListener('DOMContentLoaded', function() {
    const slideshowContainers = document.querySelectorAll('.slideshow-container');
    
    slideshowContainers.forEach(container => {
        const slides = container.querySelector('.slides');
        const images = slides.querySelectorAll('img');
        const prevBtn = container.querySelector('.prev');
        const nextBtn = container.querySelector('.next');
        const dotsContainer = container.querySelector('.slide-dots');
        
        let currentSlide = 0;
        
        // 創建導航點
        images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = dotsContainer.querySelectorAll('.dot');
        
        // 更新輪播圖和導航點
        function updateSlides() {
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        // 跳轉到指定幻燈片
        function goToSlide(index) {
            currentSlide = index;
            updateSlides();
        }
        
        // 下一張幻燈片
        function nextSlide() {
            currentSlide = (currentSlide + 1) % images.length;
            updateSlides();
        }
        
        // 上一張幻燈片
        function prevSlide() {
            currentSlide = (currentSlide - 1 + images.length) % images.length;
            updateSlides();
        }
        
        // 添加按鈕事件監聽器
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // 自動輪播
        let autoplayInterval = setInterval(nextSlide, 5000);
        
        // 滑鼠懸停時暫停自動輪播
        container.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });
        
        // 滑鼠離開時恢復自動輪播
        container.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(nextSlide, 5000);
        });
        
        // 觸摸事件處理
        let touchStartX = 0;
        let touchEndX = 0;
        
        container.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        });
        
        container.addEventListener('touchmove', e => {
            touchEndX = e.touches[0].clientX;
        });
        
        container.addEventListener('touchend', () => {
            const difference = touchStartX - touchEndX;
            if (Math.abs(difference) > 50) {
                if (difference > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        });
    });
});

// 照片輪播功能
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.photo-carousel');
    
    carousels.forEach(carousel => {
        const container = carousel.querySelector('.carousel-container');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        const thumbnails = carousel.querySelectorAll('.carousel-thumbnails img');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        // 初始化第一張幻燈片
        slides[0].classList.add('active');
        thumbnails[0].classList.add('active');
        
        function updateCarousel() {
            // 更新幻燈片
            slides.forEach(slide => slide.classList.remove('active'));
            slides[currentSlide].classList.add('active');
            
            // 更新縮略圖
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnails[currentSlide].classList.add('active');
            
            // 確保當前縮略圖可見
            thumbnails[currentSlide].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }
        
        // 按鈕點擊事件
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // 縮略圖點擊事件
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
            });
        });
        
        // 自動輪播
        let autoplay = setInterval(nextSlide, 5000);
        
        // 滑鼠懸停時暫停自動輪播
        carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
        carousel.addEventListener('mouseleave', () => {
            autoplay = setInterval(nextSlide, 5000);
        });
        
        // 觸控滑動支援
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        });
        
        carousel.addEventListener('touchmove', e => {
            touchEndX = e.touches[0].clientX;
        });
        
        carousel.addEventListener('touchend', () => {
            const difference = touchStartX - touchEndX;
            if (Math.abs(difference) > 50) {
                if (difference > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        });
        
        // 鍵盤控制支援
        document.addEventListener('keydown', e => {
            if (carousel.matches(':hover')) {
                if (e.key === 'ArrowLeft') {
                    prevSlide();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                }
            }
        });
    });
}); 