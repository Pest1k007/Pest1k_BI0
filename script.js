// Функция переключения между экранами
function showScreen(screenId) {
    // Скрываем все экраны
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Показываем выбранный экран
    const activeScreen = document.getElementById(screenId);
    activeScreen.classList.add('active');
    
    // Прокручиваем вверх
    window.scrollTo(0, 0);
}

// Создание частиц для фона
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Случайный размер
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Случайная позиция
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Случайная прозрачность
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Случайная анимация
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        
        // Случайное направление анимации
        const keyframes = `
            @keyframes float-${i} {
                0%, 100% { 
                    transform: translate(0, 0) rotate(0deg); 
                }
                25% { 
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg); 
                }
                50% { 
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg); 
                }
                75% { 
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg); 
                }
            }
        `;
        
        // Добавляем ключевые кадры в стили
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);
        
        // Применяем анимацию
        particle.style.animation = `float-${i} ${duration}s ease-in-out infinite`;
        
        particlesContainer.appendChild(particle);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Создаем частицы для фона
    createParticles();
    
    // Показываем главный экран
    showScreen('home');
    
    // Добавляем обработчики для кнопок
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Добавляем эффект нажатия
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Добавляем эффект печатания для заголовка
    const title = document.querySelector('.animated-text');
    if (title) {
        // Уже есть анимация градиента в CSS
        title.style.animationDelay = '0.5s';
    }
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Добавляем анимацию появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдаем за элементами, которые должны появляться при прокрутке
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.profile-card, .project-card, .price-section, .learning-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});
