const main = (): void => {
  const HTMLFactory = <T>(selector: string): T => document.querySelector(selector)! as T;

  const $modal = HTMLFactory<HTMLDivElement>('.modal');
  const $overlay = HTMLFactory<HTMLDivElement>('.overlay');
  const $btnCloseModal = HTMLFactory<HTMLButtonElement>('.btn--close-modal');
  const $btnsOpenModal = document.querySelectorAll<HTMLButtonElement>(
    '.btn--show-modal'
  )! as NodeListOf<HTMLButtonElement>;
  const $btnScroll = HTMLFactory<HTMLButtonElement>('.btn--scroll-to');
  const $section1 = HTMLFactory<HTMLElement>('#section--1');

  // + não eficiente porque para cada link tudo isso vai ser executado
  // * é melhor utilizar event bubbling, consiste em atribuir o eventListener em um parente em comum
  // * entre todos os links, assim só existe um eventListener para todos os botões que vão gerar um evento
  // document.querySelectorAll<HTMLButtonElement>('.nav__link').forEach((btn) => {
  //   btn.addEventListener('click', function (e: MouseEvent) {
  //     e.preventDefault();
  //     const id = this.getAttribute('href')!;
  //     document.querySelector<HTMLElement>(id)?.scrollIntoView({ behavior: 'smooth' });
  //   });
  // });
  // + event delegation - muito mais eficiente do que adicionar listener para vários elementos
  HTMLFactory<HTMLUListElement>('.nav__links').addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    // + e.target mostra qual elemento que "herda" o listener foi clicado
    // console.log(e.target);
    const element = e.target as HTMLElement;
    // + se clicar fora, o target vai ser a própria <ul>, mas ela não sentino nenhum para o funcionamento
    // * por isso vamos checar se o e.target contém a classe nav__link, para poder atribuir o funcionamento
    // * do scroll somente nos links
    if (element.classList.contains('nav__link')) {
      const section = document.querySelector(element.getAttribute('href')!);
      section?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  const openModal = (e: MouseEvent): void => {
    e.preventDefault();
    $modal.classList.remove('hidden');
    $overlay.classList.remove('hidden');

    // + remover eventListener
    // * a função precisa ser exportada para seu próprio bloco e em seguida fazer o target pro elemento
    // * que não vai ter mais o evento
    // $btnsOpenModal[0].removeEventListener('click', openModal)
  };

  const closeModal = (): void => {
    $modal.classList.add('hidden');
    $overlay.classList.add('hidden');
  };

  Array.from($btnsOpenModal, (e: HTMLButtonElement) => {
    e.addEventListener('click', openModal);
  });

  $btnCloseModal.addEventListener('click', closeModal);
  $overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !$modal.classList.contains('hidden')) {
      closeModal();
    }
  });
  // - old school - parece com o react, para cada evento, existe uma propriedade
  // $btnScroll.onmouseenter = (e) => console.log('scroll');
  $btnScroll.addEventListener('click', (e: MouseEvent) => {
    // + getBoundingClientRect relativo a parte vísivel
    const { top, left } = $section1.getBoundingClientRect();
    // console.log(section1Coordinates);
    // console.log(e.target.getBoundingClientRect());
    // console.log(`Scroll: (x/y) ${window.scrollX} - ${window.scrollY}`); // + em px
    // console.log(
    //   `Altura e Largura da tela: ${document.documentElement.clientHeight} - ${document.documentElement.clientWidth}`
    // );
    // - jeito antigo de se fazer
    // * da certo porém como essas medidas são relativas a tela vísivel, quando scrolla um pouco e aperta
    // * o botão, o efeito não "centraliza"
    // window.scrollTo({ top, left });
    // window.scrollTo({ top: top + window.scrollY, left: left + window.scrollX, behavior: 'smooth' });
    // + jeito moderno
    $section1.scrollIntoView({ behavior: 'smooth' });
  });

  const $tabs = document.querySelectorAll('.operations__tab');
  const $tabsContainer = HTMLFactory<HTMLDivElement>('.operations__tab-container');
  const $tabsContent = document.querySelectorAll('.operations__content');

  $tabsContainer.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    // + sem o closest quando se clicava no número do botão selecionava o span
    // * o closest garante que em qualquer lugar que for clicado o botão que vai ser selecionado
    const element = (e.target as HTMLDivElement).closest('.operations__tab')! as HTMLButtonElement;

    // + guard clause
    if (!element) return;

    if (element.classList.contains('operations__tab')) {
      $tabs.forEach((tab) => tab.classList.remove('operations__tab--active'));
      element.classList.add('operations__tab--active');

      $tabsContent.forEach((tab) => tab.classList.remove('operations__content--active'));

      HTMLFactory<HTMLDivElement>(`.operations__content--${element.dataset.tab}`).classList.add(
        'operations__content--active'
      );
    }
  });

  const $nav = HTMLFactory<HTMLElement>('.nav');
  function handleNavHover(this: number, e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('nav__link')) {
      const link = e.target as HTMLElement;
      const siblings = link
        .closest('.nav')
        ?.querySelectorAll('.nav__link') as NodeListOf<HTMLAnchorElement>;
      const logo = link.closest('.nav')?.querySelector('img')!;
      siblings?.forEach((el) => {
        if (el !== link) el.style.opacity = this + '';
      });
      logo.style.opacity = this + '';
    }
  }
  $nav.addEventListener('mouseover', handleNavHover.bind(0.5));
  $nav.addEventListener('mouseout', handleNavHover.bind(1));

  // + gera um evento para cada scroll - ruim pra performace, Observer API é melhor
  // const coordinates = $section1.getBoundingClientRect();
  // window.addEventListener('scroll', (e: Event) => {
  //   if (window.scrollY > coordinates.top) {
  //     $nav.classList.add('sticky');
  //     console.log('true');
  //   } else $nav.classList.remove('sticky');
  // });
  // + IntersectionObserver - muito mais performático porque vai ser gerado muito menos eventos
  // const observerCallback: IntersectionObserverCallback = (
  //   entries: IntersectionObserverEntry[],
  //   observer: IntersectionObserver
  // ) => {
  //   entries.forEach((entry) => console.log(entry));
  // };
  // const observerOptions: IntersectionObserverInit = {
  // + nulo para que a viewport seja a root
  // root: null,
  // + quando a viewport "encontrar" 20% do elemento que está sendo observado, o callback vai ser chamado
  // * quando o elemento estiver ocupando 20% ou estiver ocupando 0%, o callback vai ser chamado
  // threshold: [0, 0.2],
  // };
  // const observer: IntersectionObserver = new IntersectionObserver(
  // observerCallback,
  // // observerOptions
  // );
  // + na section para testes
  // observer.observe($section1);
  const $header = HTMLFactory<HTMLElement>('.header');
  const headerCoordinates = $nav.getBoundingClientRect();
  const headerObserver = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (!entry.isIntersecting) $nav.classList.add('sticky');
      else $nav.classList.remove('sticky');
    },
    {
      root: null,
      threshold: 0,
      // + aparecer 90 px antes para não cobrir a seção logo de cara
      rootMargin: `-${headerCoordinates.height}px`,
    }
  );
  headerObserver.observe($header);

  // + da para observar vários elementos apenas com um obesrver
  const $allSections = document.querySelectorAll('.section') as NodeListOf<HTMLElement>;
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;

      // + como está sendo observado vários elementos, o target específica qual é o exato no momento
      if (!entry.isIntersecting) return;

      entry.target.classList.remove('section--hidden');
      sectionObserver.unobserve(entry.target);
    },
    {
      root: null,
      threshold: 0.15,
    }
  );

  $allSections.forEach((section) => {
    sectionObserver.observe(section);
    // section.classList.add('section--hidden');
  });

  const $imgs = document.querySelectorAll('img[data-src]') as NodeListOf<HTMLImageElement>;
  const imgsObserver = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;

      if (!entry.isIntersecting) return;

      (entry.target as HTMLImageElement).src = (entry.target as HTMLImageElement).dataset.src!;

      // + se a internet do caba for lenta, é melhor adicionar um evento de load e assim que emitir remover a classe
      // * se a remoção da classe estivesse fora do evento, o código tiraria o blur com a imagem errada, porque
      // * nem sempre é rápido para algumas internets mostrar as imagens
      entry.target.addEventListener('load', () => {
        entry.target.classList.remove('lazy-img');
      });

      imgsObserver.unobserve(entry.target);
    },
    {
      root: null,
      threshold: 0,
      rootMargin: '+200px',
    }
  );
  $imgs.forEach((img) => imgsObserver.observe(img));

  const $slides = document.querySelectorAll('.slide') as NodeListOf<HTMLDivElement>;
  // + 0%, 100%, 200%, 300%
  // $slides.forEach((slide, i) => (slide.style.transform = `translateX(${100 * i}%)`));
  // const $slider = HTMLFactory<HTMLDivElement>('.slider');

  const $sliderBtnLeft = HTMLFactory<HTMLButtonElement>('.slider__btn--left');
  const $sliderBtnRight = HTMLFactory<HTMLButtonElement>('.slider__btn--right');

  let curSlide = 0;
  const maxSlides = $slides.length;

  const goToSlide = (slideI: number) => {
    $slides.forEach((slide, i) => (slide.style.transform = `translateX(${100 * (i - slideI)}%)`));
  };
  goToSlide(0);

  const nextSlide = () => {
    if (curSlide === maxSlides - 1) curSlide = 0;
    else curSlide++;

    activateDot(curSlide);
    goToSlide(curSlide);
  };
  $sliderBtnRight.addEventListener('click', nextSlide);
  const prevSlide = () => {
    if (curSlide === 0) curSlide = maxSlides - 1;
    else curSlide--;

    activateDot(curSlide);
    goToSlide(curSlide);
  };
  $sliderBtnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });

  const $dots = HTMLFactory<HTMLDivElement>('.dots');
  $slides.forEach((_, i) =>
    $dots.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
  );
  activateDot(0);

  function activateDot(slideI: number) {
    document
      .querySelectorAll('.dots__dot')
      .forEach((dot) => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slideI}"]`)
      ?.classList.add('dots__dot--active');
  }
  $dots.addEventListener('click', (e: MouseEvent) => {
    const element = e.target as HTMLButtonElement;

    if (element.classList.contains('dots__dot')) {
      const { slide } = element.dataset;
      if (!slide) return;
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
  // window.addEventListener('beforeunload', (e) => {
  //   e.returnValue = '';
  // });
};

main();
