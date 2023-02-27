"use strict";
const main = () => {
    const HTMLFactory = (selector) => document.querySelector(selector);
    const $modal = HTMLFactory('.modal');
    const $overlay = HTMLFactory('.overlay');
    const $btnCloseModal = HTMLFactory('.btn--close-modal');
    const $btnsOpenModal = document.querySelectorAll('.btn--show-modal');
    const $btnScroll = HTMLFactory('.btn--scroll-to');
    const $section1 = HTMLFactory('#section--1');
    HTMLFactory('.nav__links').addEventListener('click', (e) => {
        e.preventDefault();
        const element = e.target;
        if (element.classList.contains('nav__link')) {
            const section = document.querySelector(element.getAttribute('href'));
            section === null || section === void 0 ? void 0 : section.scrollIntoView({ behavior: 'smooth' });
        }
    });
    const openModal = (e) => {
        e.preventDefault();
        $modal.classList.remove('hidden');
        $overlay.classList.remove('hidden');
    };
    const closeModal = () => {
        $modal.classList.add('hidden');
        $overlay.classList.add('hidden');
    };
    Array.from($btnsOpenModal, (e) => {
        e.addEventListener('click', openModal);
    });
    $btnCloseModal.addEventListener('click', closeModal);
    $overlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !$modal.classList.contains('hidden')) {
            closeModal();
        }
    });
    $btnScroll.addEventListener('click', (e) => {
        const { top, left } = $section1.getBoundingClientRect();
        $section1.scrollIntoView({ behavior: 'smooth' });
    });
    const $tabs = document.querySelectorAll('.operations__tab');
    const $tabsContainer = HTMLFactory('.operations__tab-container');
    const $tabsContent = document.querySelectorAll('.operations__content');
    $tabsContainer.addEventListener('click', (e) => {
        e.preventDefault();
        const element = e.target.closest('.operations__tab');
        if (!element)
            return;
        if (element.classList.contains('operations__tab')) {
            $tabs.forEach((tab) => tab.classList.remove('operations__tab--active'));
            element.classList.add('operations__tab--active');
            $tabsContent.forEach((tab) => tab.classList.remove('operations__content--active'));
            HTMLFactory(`.operations__content--${element.dataset.tab}`).classList.add('operations__content--active');
        }
    });
    const $nav = HTMLFactory('.nav');
    function handleNavHover(e) {
        var _a, _b;
        if (e.target.classList.contains('nav__link')) {
            const link = e.target;
            const siblings = (_a = link
                .closest('.nav')) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.nav__link');
            const logo = (_b = link.closest('.nav')) === null || _b === void 0 ? void 0 : _b.querySelector('img');
            siblings === null || siblings === void 0 ? void 0 : siblings.forEach((el) => {
                if (el !== link)
                    el.style.opacity = this + '';
            });
            logo.style.opacity = this + '';
        }
    }
    $nav.addEventListener('mouseover', handleNavHover.bind(0.5));
    $nav.addEventListener('mouseout', handleNavHover.bind(1));
    const $header = HTMLFactory('.header');
    const headerCoordinates = $nav.getBoundingClientRect();
    const headerObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting)
            $nav.classList.add('sticky');
        else
            $nav.classList.remove('sticky');
    }, {
        root: null,
        threshold: 0,
        rootMargin: `-${headerCoordinates.height}px`,
    });
    headerObserver.observe($header);
    const $allSections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting)
            return;
        entry.target.classList.remove('section--hidden');
        sectionObserver.unobserve(entry.target);
    }, {
        root: null,
        threshold: 0.15,
    });
    $allSections.forEach((section) => {
        sectionObserver.observe(section);
    });
    const $imgs = document.querySelectorAll('img[data-src]');
    const imgsObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting)
            return;
        entry.target.src = entry.target.dataset.src;
        entry.target.addEventListener('load', () => {
            entry.target.classList.remove('lazy-img');
        });
        imgsObserver.unobserve(entry.target);
    }, {
        root: null,
        threshold: 0,
        rootMargin: '+200px',
    });
    $imgs.forEach((img) => imgsObserver.observe(img));
    const $slides = document.querySelectorAll('.slide');
    const $sliderBtnLeft = HTMLFactory('.slider__btn--left');
    const $sliderBtnRight = HTMLFactory('.slider__btn--right');
    let curSlide = 0;
    const maxSlides = $slides.length;
    const goToSlide = (slideI) => {
        $slides.forEach((slide, i) => (slide.style.transform = `translateX(${100 * (i - slideI)}%)`));
    };
    goToSlide(0);
    const nextSlide = () => {
        if (curSlide === maxSlides - 1)
            curSlide = 0;
        else
            curSlide++;
        activateDot(curSlide);
        goToSlide(curSlide);
    };
    $sliderBtnRight.addEventListener('click', nextSlide);
    const prevSlide = () => {
        if (curSlide === 0)
            curSlide = maxSlides - 1;
        else
            curSlide--;
        activateDot(curSlide);
        goToSlide(curSlide);
    };
    $sliderBtnLeft.addEventListener('click', prevSlide);
    document.addEventListener('keydown', (e) => {
        e.key === 'ArrowRight' && nextSlide();
        e.key === 'ArrowLeft' && prevSlide();
    });
    const $dots = HTMLFactory('.dots');
    $slides.forEach((_, i) => $dots.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`));
    activateDot(0);
    function activateDot(slideI) {
        var _a;
        document
            .querySelectorAll('.dots__dot')
            .forEach((dot) => dot.classList.remove('dots__dot--active'));
        (_a = document
            .querySelector(`.dots__dot[data-slide="${slideI}"]`)) === null || _a === void 0 ? void 0 : _a.classList.add('dots__dot--active');
    }
    $dots.addEventListener('click', (e) => {
        const element = e.target;
        if (element.classList.contains('dots__dot')) {
            const { slide } = element.dataset;
            if (!slide)
                return;
            activateDot(+slide);
            goToSlide(+slide);
        }
    });
    document.addEventListener('DOMContentLoaded', (e) => {
        console.log(`HTML construído e DOM Tree finalizada - ${e.timeStamp}`);
    });
    window.addEventListener('load', (e) => {
        console.log(`Tudo foi carregado - ${e}`);
    });
};
main();
