
// Переключение вкладок
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Добавляем задержки для анимации элементов меню
    menuItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.getAttribute('data-tab')) {
                e.preventDefault();
                
                menuItems.forEach(i => i.classList.remove('active'));
                tabContents.forEach(tab => tab.classList.remove('active'));
                
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            }
        });
    });
    
    // Функция для копирования платежных реквизитов
    const paymentElements = document.querySelectorAll('.payment-info');
    
    paymentElements.forEach(element => {
        element.addEventListener('click', function() {
            const textToCopy = this.textContent;
            
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
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
    bgVideo.muted = true;
    bgVideo.volume = 0;
    bgVideo.setAttribute('playsinline', '');
    bgVideo.setAttribute('webkit-playsinline', '');
    
    // Попытка воспроизведения на мобильных устройствах
    const playPromise = bgVideo.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // Автовоспроизведение не удалось, пробуем при первом взаимодействии пользователя
            document.addEventListener('touchstart', function playVideo() {
                bgVideo.play().catch(() => {});
                document.removeEventListener('touchstart', playVideo);
            }, { once: true });
        });
    }
    
    bgVideo.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    });
    
    // Обработка для мобильных устройств
    bgVideo.addEventListener('loadedmetadata', function() {
        this.play().catch(() => {});
    });
    
    // Музыкальный проигрыватель
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const playIcon = document.getElementById('playIcon');
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');
    const currentTime = document.getElementById('currentTime');
    
    let isPlaying = false;
    
    // Воспроизведение/пауза
    playBtn.addEventListener('click', function() {
        if (isPlaying) {
            audioPlayer.pause();
            playIcon.className = 'fas fa-play';
        } else {
            audioPlayer.play();
            playIcon.className = 'fas fa-pause';
        }
        isPlaying = !isPlaying;
    });
    
    // Обновление прогресса
    audioPlayer.addEventListener('timeupdate', function() {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progress.style.width = percent + '%';
        
        // Форматирование времени
        const minutes = Math.floor(audioPlayer.currentTime / 60);
        const seconds = Math.floor(audioPlayer.currentTime % 60);
        currentTime.textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    });
    
    // Перемотка по клику на прогресс-бар
    progressBar.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audioPlayer.currentTime = percent * audioPlayer.duration;
    });
    
    // Сброс при окончании трека
    audioPlayer.addEventListener('ended', function() {
        playIcon.className = 'fas fa-play';
        isPlaying = false;
        progress.style.width = '0%';
        currentTime.textContent = '0:00';
    });
    
    // Всплывающее окно
    const popupOverlay = document.getElementById('popupOverlay');
    const popupClose = document.getElementById('popupClose');
    
    // Показываем popup при загрузке
    setTimeout(() => {
        popupOverlay.style.display = 'flex';
    }, 1000);
    
    // Закрытие popup
    popupClose.addEventListener('click', function() {
        popupOverlay.style.display = 'none';
    });
    
    // Закрытие по клику на overlay
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            popupOverlay.style.display = 'none';
        }
    });
});
