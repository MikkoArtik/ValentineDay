// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем эффект печатания для заголовков
    typeWriterEffect();
});

// Эффект печатания для заголовков
function typeWriterEffect() {
    const title = document.querySelector('.success-title');
    const subtitle = document.querySelector('.success-subtitle');
    
    if (title) {
        const titleText = title.textContent;
        title.textContent = '';
        title.style.borderRight = '3px solid #e74c3c';
        
        let i = 0;
        function typeTitle() {
            if (i < titleText.length) {
                title.textContent += titleText.charAt(i);
                i++;
                setTimeout(typeTitle, 100);
            } else {
                title.style.borderRight = 'none';
                // Начинаем печатать подзаголовок
                setTimeout(typeSubtitle, 500);
            }
        }
        
        setTimeout(typeTitle, 500);
    }
}

// Вернуться на главную страницу
function goBack() {
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}
