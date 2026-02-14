// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем интерактивность к эмодзи
    addEmojiInteractions();
    
    // Добавляем эффект печатания для заголовка
    typeWriter();
    
    // Создаем дополнительные сердечки
    createExtraHearts();
    
    // Сбрасываем позицию кнопки "Нет"
    resetNoButtonPosition();
    
    // Инициализируем счетчик перемещений
    window.noButtonMoves = 0;
    window.maxNoButtonMoves = 3;
});

// Сброс позиции кнопки "Нет"
function resetNoButtonPosition() {
    const noBtn = document.getElementById('noBtn');
    noBtn.style.position = 'static';
    noBtn.style.left = '';
    noBtn.style.top = '';
    noBtn.style.zIndex = '';
    window.noButtonMoves = 0;
}

// Функция для кнопки "Да"
function sayYes() {
    // Создаем праздничные эффекты перед переходом
    createHeartExplosion();
    createConfetti();
    
    // Добавляем пульсацию к карточке
    const card = document.querySelector('.valentine-card');
    card.style.animation = 'pulse 1s ease-in-out infinite';
    
    // Проигрываем звуковой эффект (если нужно)
    playSuccessSound();
    
    // Переходим на страницу поздравления через 1.5 секунды
    setTimeout(() => {
        window.location.href = 'yes.html';
    }, 1500);
}

// Функция для кнопки "Нет" - убегающая кнопка
function sayNo() {
    const noBtn = document.getElementById('noBtn');
    noBtn.classList.add('running');
    
    // Показываем модальное окно с милым сообщением
    const modal = document.getElementById('responseModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    
    modalTitle.textContent = "Ой! 😊";
    modalMessage.textContent = "Я знаю, что ты хочешь сказать 'Да'! Просто попробуй еще раз! 💕";
    
    modal.style.display = 'block';
    
    setTimeout(() => {
        noBtn.classList.remove('running');
    }, 500);
}

// Функция для перемещения кнопки "Нет" при наведении
function moveNoButton() {
    // Проверяем, не превышен ли лимит перемещений
    if (window.noButtonMoves >= window.maxNoButtonMoves) {
        return; // Кнопка больше не убегает
    }
    
    const noBtn = document.getElementById('noBtn');
    const card = document.querySelector('.valentine-card');
    
    // Получаем границы карточки
    const cardRect = card.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Увеличиваем счетчик перемещений
    window.noButtonMoves++;
    
    // Генерируем случайное направление (вверх или вниз, влево или вправо)
    const directions = [
        { x: 0, y: -80 },   // вверх
        { x: 0, y: 80 },    // вниз
        { x: -80, y: 0 },   // влево
        { x: 80, y: 0 },    // вправо
        { x: 60, y: -60 },  // вверх-вправо
        { x: -60, y: -60 }, // вверх-влево
        { x: 60, y: 60 },   // вниз-вправо
        { x: -60, y: 60 }   // вниз-влево
    ];
    
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    
    // Вычисляем новую позицию
    let newX = btnRect.left + randomDirection.x;
    let newY = btnRect.top + randomDirection.y;
    
    // Ограничиваем в пределах карточки
    newX = Math.max(cardRect.left + 20, Math.min(cardRect.right - btnRect.width - 20, newX));
    newY = Math.max(cardRect.top + 20, Math.min(cardRect.bottom - btnRect.height - 20, newY));
    
    // Применяем новую позицию
    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.zIndex = '1000';
    
    // Добавляем смешной текст при наведении
    const messages = [
        "Не-не-не! 😜",
        "Попробуй поймать! 🏃‍♀️",
        "Я убегаю! 💨",
        "Догони меня! 😂",
        "Не так быстро! 🎯",
        "Ха-ха-ха! 😄",
        "Меня не поймать! 🎪",
        "Почти! Но не сейчас! 😏",
        "Умница, но не сегодня! 🤪"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showFloatingMessage(randomMessage, noBtn);
    
    // Если это последнее перемещение, меняем цвет кнопки чтобы показать что ее можно нажать
    if (window.noButtonMoves >= window.maxNoButtonMoves) {
        noBtn.style.background = 'linear-gradient(45deg, #95a5a6, #7f8c8d)';
        noBtn.style.cursor = 'pointer';
    }
}

// Закрыть модальное окно
function closeModal() {
    const modal = document.getElementById('responseModal');
    modal.style.display = 'none';
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('responseModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Создать взрыв сердечек
function createHeartExplosion() {
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘'];
    const colors = ['#e74c3c', '#ff6b9d', '#c44569', '#f8b500', '#ff6348'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = Math.random() * 30 + 15 + 'px';
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            heart.style.animation = `heartBurst ${Math.random() * 3 + 2}s ease-out forwards`;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * 50);
    }
}

// Создать конфетти
function createConfetti() {
    const colors = ['#e74c3c', '#ff6b9d', '#c44569', '#f8b500', '#ff6348', '#4ecdc4', '#45b7d1', '#9b59b6'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = Math.random() * 15 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.animation = `confettiFall ${Math.random() * 4 + 3}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 7000);
        }, i * 20);
    }
}

// Показать плавающее сообщение
function showFloatingMessage(message, element) {
    const floatingMsg = document.createElement('div');
    floatingMsg.textContent = message;
    floatingMsg.style.position = 'fixed';
    floatingMsg.style.left = element.offsetLeft + 'px';
    floatingMsg.style.top = (element.offsetTop - 30) + 'px';
    floatingMsg.style.backgroundColor = '#ff6b9d';
    floatingMsg.style.color = 'white';
    floatingMsg.style.padding = '8px 15px';
    floatingMsg.style.borderRadius = '20px';
    floatingMsg.style.fontSize = '14px';
    floatingMsg.style.fontWeight = '600';
    floatingMsg.style.pointerEvents = 'none';
    floatingMsg.style.zIndex = '10000';
    floatingMsg.style.animation = 'fadeInOut 2s ease-out forwards';
    
    document.body.appendChild(floatingMsg);
    
    setTimeout(() => {
        floatingMsg.remove();
    }, 2000);
}

// Добавить интерактивность к эмодзи
function addEmojiInteractions() {
    const emoji = document.querySelector('.love-emoji');
    
    emoji.addEventListener('click', function() {
        // Создаем маленькие сердечки вокруг эмодзи
        for (let i = 0; i < 8; i++) {
            const smallHeart = document.createElement('div');
            smallHeart.innerHTML = '💕';
            smallHeart.style.position = 'fixed';
            smallHeart.style.left = '50%';
            smallHeart.style.top = '50%';
            smallHeart.style.fontSize = '20px';
            smallHeart.style.pointerEvents = 'none';
            smallHeart.style.zIndex = '9999';
            
            const angle = (i * 45) * Math.PI / 180;
            const distance = 100;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            smallHeart.style.animation = `heartFloat ${1.5}s ease-out forwards`;
            smallHeart.style.transform = `translate(${x}px, ${y}px)`;
            
            document.body.appendChild(smallHeart);
            
            setTimeout(() => {
                smallHeart.remove();
            }, 1500);
        }
    });
}

// Эффект печатания для заголовка
function typeWriter() {
    const title = document.querySelector('.main-title');
    const text = title.textContent;
    title.textContent = '';
    title.style.borderRight = '3px solid #e74c3c';
    
    let i = 0;
    function type() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        } else {
            title.style.borderRight = 'none';
        }
    }
    
    setTimeout(type, 500);
}

// Создать дополнительные сердечки на фоне
function createExtraHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = ['❤️', '💕', '💖'][Math.floor(Math.random() * 3)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '-50px';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1';
        heart.style.animation = `floatUp ${Math.random() * 5 + 5}s linear forwards`;
        heart.style.opacity = '0.6';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }, 3000);
}

// Добавляем CSS анимации динамически
const style = document.createElement('style');
style.textContent = `
    @keyframes heartBurst {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + ${Math.random() * 400 - 200}px), calc(-50% + ${Math.random() * 400 - 200}px)) scale(1.5);
            opacity: 0;
        }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes fadeInOut {
        0% {
            opacity: 0;
            transform: translateY(10px);
        }
        50% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    @keyframes heartFloat {
        0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(var(--x, 0), var(--y, 0)) scale(1);
            opacity: 0;
        }
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.6;
        }
        100% {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(style);

// Звуковой эффект успеха (заглушка)
function playSuccessSound() {
    // В реальном приложении здесь можно добавить звуковой файл
    console.log('🎵 Воспроизведение звукового эффекта успеха!');
}

// Добавляем интерактивность к фоновым сердечкам
document.querySelectorAll('.floating-heart').forEach(heart => {
    heart.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
        
        // Создаем маленькое сердечко при клике
        const smallHeart = document.createElement('div');
        smallHeart.innerHTML = '💕';
        smallHeart.style.position = 'fixed';
        smallHeart.style.left = this.style.left;
        smallHeart.style.top = '50%';
        smallHeart.style.fontSize = '30px';
        smallHeart.style.pointerEvents = 'none';
        smallHeart.style.zIndex = '9999';
        smallHeart.style.animation = 'heartBurst 1s ease-out forwards';
        
        document.body.appendChild(smallHeart);
        
        setTimeout(() => {
            smallHeart.remove();
        }, 1000);
    });
});

// Предотвращаем уход кнопки "Нет" за пределы экрана
window.addEventListener('resize', function() {
    const noBtn = document.getElementById('noBtn');
    if (noBtn.style.position === 'fixed') {
        const card = document.querySelector('.valentine-card');
        
        // Получаем новые границы карточки
        const cardRect = card.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();
        
        // Вычисляем доступное пространство внутри карточки
        const minX = cardRect.left + 20;
        const maxX = cardRect.right - btnRect.width - 20;
        const minY = cardRect.top + 20;
        const maxY = cardRect.bottom - btnRect.height - 20;
        
        // Корректируем позицию кнопки если она вышла за пределы
        let currentX = parseInt(noBtn.style.left);
        let currentY = parseInt(noBtn.style.top);
        
        if (currentX < minX) {
            noBtn.style.left = minX + 'px';
        } else if (currentX > maxX) {
            noBtn.style.left = maxX + 'px';
        }
        
        if (currentY < minY) {
            noBtn.style.top = minY + 'px';
        } else if (currentY > maxY) {
            noBtn.style.top = maxY + 'px';
        }
    }
});
