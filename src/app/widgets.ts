type SwiperInstance = {
  destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void;
};

declare global {
  interface Window {
    Swiper?: new (selector: string, options: object) => SwiperInstance;
  }
}

function mountSwiper(selector: string, options: object) {
  if (!window.Swiper || !document.querySelector(selector)) return;
  const instance = new window.Swiper(selector, options);
  return () => instance.destroy(true, true);
}

export function mountPageWidgets() {
  const cleanups: Array<() => void> = [];
  const track = (stop?: () => void) => {
    if (stop) cleanups.push(stop);
  };

  const thumb = document.querySelector('.ul-banner-2-thumb-slider');
  const banner = document.querySelector('.ul-banner-2-slider');
  if (window.Swiper && thumb && banner) {
    const thumbs = new window.Swiper('.ul-banner-2-thumb-slider', {
      slidesPerView: 3,
      spaceBetween: 10,
      slideToClickedSlide: true,
      loop: true,
      autoplay: true,
      speed: 1000,
      centeredSlides: true,
    });
    const slides = new window.Swiper('.ul-banner-2-slider', {
      slidesPerView: 1,
      loop: true,
      autoplay: true,
      spaceBetween: 0,
      speed: 1000,
      navigation: {
        nextEl: '.ul-banner-2-slider-navigation .next',
        prevEl: '.ul-banner-2-slider-navigation .prev',
      },
      thumbs: { swiper: thumbs },
    });
    cleanups.push(() => {
      slides.destroy(true, true);
      thumbs.destroy(true, true);
    });
  }

  track(
    mountSwiper('.ul-donations-slider', {
      slidesPerView: 4,
      spaceBetween: 20,
      autoplay: true,
      navigation: {
        prevEl: '.ul-donations-slider-nav .prev',
        nextEl: '.ul-donations-slider-nav .next',
      },
      breakpoints: {
        0: { slidesPerView: 1.15, centeredSlides: true },
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      },
    }),
  );

  track(
    mountSwiper('.ul-services-slider', {
      slidesPerView: 3,
      spaceBetween: 20,
      autoplay: true,
      navigation: {
        prevEl: '.ul-services-slider-nav .prev',
        nextEl: '.ul-services-slider-nav .next',
      },
      breakpoints: {
        0: { slidesPerView: 1.15 },
        768: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
      },
    }),
  );

  track(
    mountSwiper('.ul-testimonial-slider', {
      slidesPerView: 3,
      spaceBetween: 24,
      loop: true,
      autoplay: true,
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
      },
    }),
  );

  track(
    mountSwiper('.ul-blogs-slider', {
      slidesPerView: 2,
      spaceBetween: 24,
      loop: true,
      autoplay: true,
      navigation: {
        nextEl: '.ul-blogs-slider-nav .next',
        prevEl: '.ul-blogs-slider-nav .prev',
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
      },
    }),
  );

  document.querySelectorAll<HTMLElement>('.ul-progressbar').forEach((bar) => {
    const value = Number(bar.dataset['ulProgressValue'] || 0);
    bar.style.width = `${value}%`;
    const label = bar.querySelector('.ul-progress-label');
    if (label) label.textContent = `${value}%`;
  });

  const header = document.querySelector('.to-be-sticky');
  const onScroll = () => {
    header?.classList.toggle('sticky', window.scrollY > 80);
  };
  onScroll();
  window.addEventListener('scroll', onScroll);
  cleanups.push(() => window.removeEventListener('scroll', onScroll));

  return () => cleanups.forEach((stop) => stop());
}
