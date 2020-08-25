function slider() {
    const slidesWrapper = document.querySelector('.slider__slides'),
          slidesField = document.querySelector('.slider__inner'),
          slides = document.querySelectorAll('.slider__slide'),
          prev = document.querySelector('.slider__arrow_left'),
          next = document.querySelector('.slider__arrow_right'),
          dots = document.querySelectorAll('.slider__dot'),
          width = window.getComputedStyle(slidesWrapper).width;

    
    let slideIndex = 1;
    let offset = 0;
    toggleDots();
    slidesField.style.width = 100 * slides.length  + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(slide => {
        slide.style.width = width;
    });

    function toggleDots() {
        if (slideIndex < 1) {
            slideIndex = slides.length;
        } 

        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        dots.forEach(dot => dot.classList.remove('slider__dot_active'));
        dots[slideIndex - 1].classList.add('slider__dot_active');
    }

    function changeTransform(offset) {
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    next.addEventListener('click', () => {

        if (offset === +width.replace(/[a-z]/g, '') * (slides.length - 1)) {
            offset = 0;
            slideIndex = 1;
        } else {
            offset +=  +width.replace(/[a-z]/g, '');
            slideIndex += 1;
        }
        toggleDots();
        changeTransform(offset);
    });

    prev.addEventListener('click', () => {

        if (offset === 0) {
            offset = +width.replace(/[a-z]/g, '') * (slides.length - 1);
            slideIndex = slides.length;
        } else {
            offset -=  +width.replace(/[a-z]/g, '');
            slideIndex -= 1;
        }
        toggleDots();
        changeTransform(offset);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            offset = +width.replace(/[a-z]/g, '') * i;
            changeTransform(offset);
            slideIndex = i + 1;
            toggleDots();
        });
    });
}

export default slider;