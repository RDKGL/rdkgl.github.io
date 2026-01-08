class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.maxOpacity = this.opacity;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Отскок от краев
        if (this.x < 0 || this.x > this.canvas.width) {
            this.speedX *= -1;
            this.x = Math.max(0, Math.min(this.canvas.width, this.x));
        }
        if (this.y < 0 || this.y > this.canvas.height) {
            this.speedY *= -1;
            this.y = Math.max(0, Math.min(this.canvas.height, this.y));
        }

        // Пульсирующая прозрачность
        this.opacity += (Math.random() - 0.5) * 0.05;
        this.opacity = Math.max(0.2, Math.min(this.maxOpacity, this.opacity));
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    // Установка размера canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Создание частиц
    const particleCount = 100;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas));
    }

    // Анимационный цикл
    function animate() {
        // Очистка canvas с черным фоном
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Обновление и рисование частиц
        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });

        requestAnimationFrame(animate);
    }

    animate();
});
