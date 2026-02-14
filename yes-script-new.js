// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем эффект печатания для заголовков
    typeWriterEffect();
});

// Эффект печатания для заголовков
function typeWriterEffect() {
    const title = document.querySelector('.success-title');
    
    if (title) {
        const titleText = 'Урааа! Я так счастлив!';
        title.textContent = '';
        title.style.borderRight = '3px solid #e74c3c';
        
        let i = 0;
        function typeTitle() {
            if (i < titleText.length) {
                title.textContent += titleText.charAt(i);
                i++;
                setTimeout(typeTitle, 150);
            } else {
                title.style.borderRight = 'none';
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
