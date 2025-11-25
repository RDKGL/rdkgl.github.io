// Переключение вкладок
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Проверяем, есть ли у элемента data-tab (вкладка) или это внешняя ссылка
            if (this.getAttribute('data-tab')) {
                e.preventDefault();
                
                // Убираем активный класс у всех пунктов меню и вкладок
                menuItems.forEach(i => i.classList.remove('active'));
                tabContents.forEach(tab => tab.classList.remove('active'));
                
                // Добавляем активный класс текущему пункту
                this.classList.add('active');
                
                // Показываем соответствующую вкладку
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            }
            // Если нет data-tab, то это внешняя ссылка и она откроется в новой вкладке
        });
    });
    
    // Функция для копирования платежных реквизитов
    const paymentElements = document.querySelectorAll('.payment-info');
    
    paymentElements.forEach(element => {
        element.addEventListener('click', function() {
            const textToCopy = this.textContent;
            
            // Создаем временный textarea для копирования
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            // Визуальное подтверждение
            const originalText = this.textContent;
            this.textContent = 'Скопировано!';
            this.style.background = '#8a2be2';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
                this.style.color = '';
            }, 2000);
        });
    });
    
    // Управление видео фоном
    const bgVideo = document.getElementById('bgVideo');
    
    // Гарантируем, что видео без звука
    bgVideo.muted = true;
    bgVideo.volume = 0;
    
    // Перезапуск видео если оно остановилось
    bgVideo.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    });
});
