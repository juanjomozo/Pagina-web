petfinderKey = 'J8hCKybRh0ZkaPmUlsebnom7f37as0sxoUKtf7QyFfu1bYL842';
petfinderSecret = '6QGDviuadsdyzXgDQJhpGZzAlLo1aCUwiwjGSBpw';

document.addEventListener('DOMContentLoaded', () => {
    const slide = document.querySelector('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let counter = 0;
    const size = images[0].clientWidth;
    let intervalId;

    // Función para mover el carrusel
    const moveSlide = (direction) => {
        if (direction === 'next') {
            counter = (counter >= images.length - 1) ? 0 : counter + 1;
        } else {
            counter = (counter <= 0) ? images.length - 1 : counter - 1;
        }
        slide.style.transition = "transform 0.5s ease-in-out";
        slide.style.transform = `translateX(${-size * counter}px)`;
    };

    // Autoplay cada 3 segundos
    const startAutoplay = () => {
        intervalId = setInterval(() => moveSlide('next'), 3000);
    };

    // Detener autoplay al interactuar
    const stopAutoplay = () => {
        clearInterval(intervalId);
    };

    // Event listeners
    nextBtn.addEventListener('click', () => {
        stopAutoplay();
        moveSlide('next');
        startAutoplay();
    });

    prevBtn.addEventListener('click', () => {
        stopAutoplay();
        moveSlide('prev');
        startAutoplay();
    });

    // Reiniciar autoplay al dejar el ratón quieto
    slide.addEventListener('mouseenter', stopAutoplay);
    slide.addEventListener('mouseleave', startAutoplay);

    // Iniciar autoplay al cargar la página
    startAutoplay();
});
