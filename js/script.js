'use strict'

//menu
const menu = document.querySelector('.menuToggle'),
    navList = document.querySelector('.nav-list');

menu.addEventListener('click', () => {
    navList.classList.toggle('active');
})

//slider
const slider = () => {
    const slide = document.querySelectorAll('.slider-item'),
        slider = document.querySelector('.slider-content'),
        dotsList = document.querySelector('.slider-dots');

    let currentSlide = 0,
        interval;

    const dotsAdd = () => {
        slide.forEach(() => {
            let dot = document.createElement('li');
            dot.classList.add('dot');
            dotsList.append(dot);
        });
    };
    dotsAdd();

    let dot = document.querySelectorAll('.dot');
    const prevSlide = (elem, index, strClass) => {
        elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
        elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
        prevSlide(slide, currentSlide, 'slider-item-active');
        prevSlide(dot, currentSlide, 'dot-active');
        currentSlide++;
        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }
        nextSlide(slide, currentSlide, 'slider-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    };
    const startSlide = (time = 3000) => {
        interval = setInterval(autoPlaySlide, time);
    };
    const stopSlide = () => {
        clearInterval(interval);
    };
    slider.addEventListener('click', event => {
        event.preventDefault();

        let target = event.target;

        if (!target.matches('.slider-btn, .dot')) {
            return;
        }

        prevSlide(slide, currentSlide, 'slider-item-active');
        prevSlide(dot, currentSlide, 'dot-active');

        if (target.matches('#arrow-right')) {
            currentSlide++;
        } else if (target.matches('#arrow-left')) {
            currentSlide--;
        } else if (target.matches('.dot')) {
            dot.forEach((elem, index) => {
                if (elem === target) {
                    currentSlide = index;
                }
            });
        }

        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }
        if (currentSlide < 0) {
            currentSlide = slide.length - 1;
        }

        nextSlide(slide, currentSlide, 'slider-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', event => {
        if (event.target.matches('.slider-btn') || event.target.matches('.dot')) {
            stopSlide();
        }
    });
    slider.addEventListener('mouseout', event => {
        if (event.target.matches('.slider-btn') || event.target.matches('.dot')) {
            stopSlide();
        }
    });

    startSlide(1500);
};
slider();