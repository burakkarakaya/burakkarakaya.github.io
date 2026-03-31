/**
 * PRAVA Hero Slider
 * - loop: true, sadece mainSwiper — controller yok (Swiper 11'de çift loop + controller döngüyü kesiyor)
 * - Parallax: slide.progress × width × 0.5 → .hero-parallax-layer translateX
 * - Custom pagination: thumb halka + prev yok, yalnızca #hero-next
 * - Autoplay: imagesReady / load ile başlar
 */
(function () {
  'use strict';

  var interleaveOffset = 0.5;

  var mainEl  = document.querySelector('.hero-main');
  var pagHost = document.getElementById('hero-pagination-custom');
  var btnNext = document.getElementById('hero-next');

  if (mainEl && pagHost && btnNext) {

  /* Orijinal slaytları Swiper init'ten ÖNCE oku (klonlar henüz yok) */
  var origSlides = Array.prototype.slice.call(
    mainEl.querySelectorAll('.swiper-wrapper > .swiper-slide')
  );
  var slideCount  = origSlides.length;
  var thumbsData  = origSlides.map(function (s) {
    return s.getAttribute('data-thumb') || '';
  });

  var videoSlideIndex = -1;
  for (var vsi = 0; vsi < origSlides.length; vsi++) {
    if (origSlides[vsi].hasAttribute('data-hero-video')) {
      videoSlideIndex = vsi;
      break;
    }
  }
  var heroVideoEl = mainEl.querySelector('.hero-slide-video[data-src]');
  var heroVideoReduceMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function attachHeroVideoSrcOnce(video) {
    var src = video.getAttribute('data-src');
    if (!src) return;
    if (!video.getAttribute('src')) {
      video.setAttribute('src', src);
    }
  }

  function loadAndPlayHeroVideo(video) {
    if (!video || heroVideoReduceMotion) return;
    attachHeroVideoSrcOnce(video);
    video.load();
    var p = video.play();
    if (p && typeof p.catch === 'function') {
      p.catch(function () {});
    }
  }

  function pauseHeroVideo(video) {
    if (!video) return;
    video.pause();
    try {
      video.currentTime = 0;
    } catch (e) {}
  }

  function syncHeroVideoSlide(swiper) {
    if (videoSlideIndex < 0 || !heroVideoEl) return;
    var onVideo = swiper.realIndex === videoSlideIndex;
    if (onVideo) {
      if (swiper.autoplay && swiper.autoplay.stop) swiper.autoplay.stop();
      loadAndPlayHeroVideo(heroVideoEl);
    } else {
      pauseHeroVideo(heroVideoEl);
      if (swiper.autoplay && swiper.autoplay.start) swiper.autoplay.start();
    }
  }

  var mainSwiper = new Swiper(mainEl, {
    loop: true,
    speed: 1000,
    grabCursor: true,
    watchSlidesProgress: true,
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '#hero-next',   /* selector — DOM referansı değil */
      disabledClass: 'opacity-30 pointer-events-none',
    },
    on: {
      init: function () {
        var s = this;
        if (s.autoplay && s.autoplay.stop) s.autoplay.stop();
        buildPagination(s);
        applyParallax(s);
        syncHeroVideoSlide(s);
      },
      imagesReady: function () {
        var s = this;
        if (s.autoplay && s.autoplay.start) s.autoplay.start();
        applyParallax(s);
        syncHeroVideoSlide(s);
      },
      progress: function () {
        applyParallax(this);
      },
      touchStart: function () {
        clearBgTransition(this);
      },
      setTransition: function (swiper, speed) {
        /* Swiper 11: (swiper, speed) — eski sürümlerde (speed) */
        var ms = typeof speed === 'number' ? speed : this.params.speed;
        setBgTransition(this, ms);
      },
      slideChange: function () {
        updatePagination(this);
      },
      slideChangeTransitionEnd: function () {
        setBgTransition(this, this.params.speed);
        applyParallax(this);
        updatePagination(this);
        syncHeroVideoSlide(this);
      },
      touchEnd: function () {
        setBgTransition(this, this.params.speed);
      },
    },
  });

  if (heroVideoEl && videoSlideIndex >= 0 && !heroVideoReduceMotion) {
    heroVideoEl.addEventListener('ended', function () {
      if (!mainSwiper || mainSwiper.realIndex !== videoSlideIndex) return;
      mainSwiper.slideNext();
      if (mainSwiper.autoplay && mainSwiper.autoplay.start) mainSwiper.autoplay.start();
    });
  }

  /* ── Autoplay güvenli başlatma ─────────────────────────────────────── */
  window.addEventListener('load', function () {
    if (mainSwiper && mainSwiper.autoplay && mainSwiper.autoplay.start) {
      mainSwiper.autoplay.start();
    }
    if (mainSwiper) syncHeroVideoSlide(mainSwiper);
  });

  /* ── Parallax ──────────────────────────────────────────────────────── */
  function applyParallax(swiper) {
    var w      = swiper.width || swiper.el.offsetWidth || 1;
    var offset = w * interleaveOffset;
    for (var i = 0; i < swiper.slides.length; i++) {
      var slide    = swiper.slides[i];
      var progress = typeof slide.progress === 'number' ? slide.progress : 0;
      var layer    = slide.querySelector('.hero-parallax-layer');
      if (layer) layer.style.transform = 'translateX(' + (progress * offset) + 'px)';
    }
  }

  function clearBgTransition(swiper) {
    for (var i = 0; i < swiper.slides.length; i++) {
      swiper.slides[i].style.transition = '';
      var layer = swiper.slides[i].querySelector('.hero-parallax-layer');
      if (layer) layer.style.transition = '';
    }
  }

  function setBgTransition(swiper, ms) {
    for (var i = 0; i < swiper.slides.length; i++) {
      swiper.slides[i].style.transition = ms + 'ms';
      var layer = swiper.slides[i].querySelector('.hero-parallax-layer');
      if (layer) layer.style.transition = ms + 'ms';
    }
  }

  /* ── Özel sayfalama (DOM sabit; is-active ile CSS animasyonu) ───────── */
  function buildPagination(swiper) {
    pagHost.innerHTML = '';
    for (var i = 0; i < slideCount; i++) {
      (function (idx) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'hero-pag-btn';
        btn.setAttribute('role', 'tab');
        var slideAriaPrefix =
          window.PRAVA_I18N && window.PRAVA_I18N.slide_aria
            ? window.PRAVA_I18N.slide_aria
            : 'Slide';
        btn.setAttribute('aria-label', slideAriaPrefix + ' ' + (idx + 1));

        var inner = document.createElement('span');
        inner.className = 'hero-pag-thumb-inner';
        inner.appendChild(makeThumbImg(idx));
        btn.appendChild(inner);

        if (idx === swiper.realIndex) {
          btn.classList.add('is-active');
          btn.setAttribute('aria-selected', 'true');
        } else {
          btn.setAttribute('aria-selected', 'false');
        }

        btn.addEventListener('click', function () {
          if (mainSwiper.autoplay && mainSwiper.autoplay.stop) {
            mainSwiper.autoplay.stop();
          }
          mainSwiper.slideToLoop(idx);
        });

        pagHost.appendChild(btn);
      })(i);
    }
  }

  function updatePagination(swiper) {
    var active = swiper.realIndex;
    var buttons = pagHost.querySelectorAll('.hero-pag-btn');
    for (var i = 0; i < slideCount; i++) {
      var b = buttons[i];
      if (!b) continue;
      var on = i === active;
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      if (on) b.classList.add('is-active');
      else b.classList.remove('is-active');
    }
  }

  function makeThumbImg(idx) {
    var unsplash = [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80',
      'https://images.unsplash.com/photo-1476703993599-d85b5853188c?w=400&q=80',
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80',
    ];
    var img = document.createElement('img');
    img.src = thumbsData[idx] || '';
    img.alt = '';
    img.onerror = (function (i) {
      return function () {
        this.onerror = null;
        this.src = unsplash[i] || unsplash[0];
      };
    })(idx);
    return img;
  }

  }

  /* ── Kategori rayı (hero altı; ~3 tam + 4. kısmi) ───────────────────── */
  document.querySelectorAll('.prava-category-rail__swiper').forEach(function (el) {
    if (!el.querySelector('.swiper-slide')) return;
    new Swiper(el, {
      slidesPerView: 1.12,
      spaceBetween: 14,
      speed: 450,
      /* CSS cursor:url !important Swiper inline cursor’ı geçer; grab/grabbing sınıfları çalışır */
      grabCursor: true,
      watchOverflow: true,
      breakpoints: {
        520: {
          slidesPerView: 1.35,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 2.2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3.28,
          spaceBetween: 24,
        },
        1440: {
          slidesPerView: 3.35,
          spaceBetween: 28,
        },
      },
    });
  });

  /* ── En çok satılanlar (yatay Swiper; masaüstünde ~3 kart) ──────────── */
  document.querySelectorAll('.prava-bestsellers__swiper').forEach(function (el) {
    if (!el.querySelector('.swiper-slide')) return;
    var swiper = new Swiper(el, {
      slidesPerView: 1.12,
      spaceBetween: 16,
      speed: 450,
      grabCursor: true,
      watchOverflow: true,
      breakpoints: {
        520: {
          slidesPerView: 1.35,
          spaceBetween: 18,
        },
        768: {
          slidesPerView: 2.15,
          spaceBetween: 22,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1440: {
          slidesPerView: 3,
          spaceBetween: 28,
        },
      },
    });

    /* Hover’da başlayan ve her hover’da başa saran kart videoları */
    el.querySelectorAll('.prava-bestsellers-card').forEach(function (card) {
      var video = card.querySelector('video[data-bestseller-hover-video]');
      if (!video) return;

      card.addEventListener('mouseenter', function () {
        try {
          video.currentTime = 0;
        } catch (e) {}
        video.load();
        var p = video.play();
        if (p && typeof p.catch === 'function') {
          p.catch(function () {});
        }
      });

      card.addEventListener('mouseleave', function () {
        video.pause();
        try {
          video.currentTime = 0;
        } catch (e) {}
      });
    });
  });

  /* ── Blog rayı: 1 tam + ~½ kart (slidesPerView ~1.45–1.55) ───────────── */
  document.querySelectorAll('.prava-blog-rail__swiper').forEach(function (el) {
    if (!el.querySelector('.swiper-slide')) return;
    new Swiper(el, {
      slidesPerView: 1.15,
      spaceBetween: 14,
      speed: 450,
      grabCursor: true,
      watchOverflow: true,
      breakpoints: {
        480: {
          slidesPerView: 1.35,
          spaceBetween: 16,
        },
        640: {
          slidesPerView: 1.85,
          spaceBetween: 18,
        },
        768: {
          slidesPerView: 2.15,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 2.45,
          spaceBetween: 22,
        },
        1280: {
          slidesPerView: 2.5,
          spaceBetween: 24,
        },
      },
    });
  });

  /* ── Mega menü ─────────────────────────────────────────────────────── */
  var mega = document.getElementById('mega-menu');
  var btnMenu = document.getElementById('btn-menu');
  var btnClose = document.getElementById('mega-menu-close');
  var footerDiscover = document.getElementById('mega-footer-discover');
  var footerCta = document.getElementById('mega-footer-cta');

  function openMegaMenu() {
    if (!mega || !btnMenu) return;
    mega.removeAttribute('hidden');
    btnMenu.setAttribute('aria-expanded', 'true');
    document.body.classList.add('mega-menu-open');
    syncFooterFromPanel(getActivePanelIndex());
    if (btnClose) btnClose.focus();
  }

  function closeMegaMenu() {
    if (!mega || !btnMenu) return;
    mega.setAttribute('hidden', '');
    btnMenu.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mega-menu-open');
    btnMenu.focus();
  }

  function getActivePanelIndex() {
    var tabs = document.querySelectorAll('.mega-menu__tab');
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].classList.contains('is-active')) return i;
    }
    return 0;
  }

  function syncFooterFromPanel(index) {
    var panel = document.querySelector('.mega-menu__panel[data-mega-panel="' + index + '"]');
    if (!panel || !footerDiscover || !footerCta) return;
    var d = panel.getAttribute('data-footer-discover');
    var dh = panel.getAttribute('data-footer-discover-href') || '#';
    var c = panel.getAttribute('data-footer-cta');
    var ch = panel.getAttribute('data-footer-cta-href') || '#';
    if (d) footerDiscover.textContent = d;
    footerDiscover.setAttribute('href', dh);
    if (c) footerCta.textContent = c;
    footerCta.setAttribute('href', ch);
  }

  function setMegaTab(index) {
    var tabs = document.querySelectorAll('.mega-menu__tab');
    var panels = document.querySelectorAll('.mega-menu__panel');
    for (var i = 0; i < tabs.length; i++) {
      var on = i === index;
      tabs[i].classList.toggle('is-active', on);
      tabs[i].setAttribute('aria-selected', on ? 'true' : 'false');
    }
    for (var j = 0; j < panels.length; j++) {
      if (j === index) panels[j].removeAttribute('hidden');
      else panels[j].setAttribute('hidden', '');
    }
    syncFooterFromPanel(index);
  }

  if (mega && btnMenu) {
    var panelsInit = document.querySelectorAll('.mega-menu__panel');
    for (var p = 0; p < panelsInit.length; p++) {
      if (p === 0) panelsInit[p].removeAttribute('hidden');
      else panelsInit[p].setAttribute('hidden', '');
    }

    btnMenu.addEventListener('click', function () {
      if (mega.hasAttribute('hidden')) openMegaMenu();
      else closeMegaMenu();
    });

    if (btnClose) btnClose.addEventListener('click', closeMegaMenu);

    document.querySelectorAll('.mega-menu__tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var idx = parseInt(tab.getAttribute('data-mega-tab'), 10);
        if (!isNaN(idx)) setMegaTab(idx);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mega && !mega.hasAttribute('hidden')) {
        e.preventDefault();
        closeMegaMenu();
      }
    });

    function activateSubitem(list, item) {
      if (!item || !list.contains(item)) return;
      list.querySelectorAll('.mega-menu__subitem').forEach(function (el) {
        el.classList.remove('is-active');
      });
      item.classList.add('is-active');
    }

    document.querySelectorAll('.mega-menu__panel').forEach(function (panel) {
      panel.querySelectorAll('.mega-menu__sublist').forEach(function (list) {
        list.addEventListener('mouseover', function (e) {
          var item = e.target.closest('.mega-menu__subitem');
          activateSubitem(list, item);
        });
        list.addEventListener('focusin', function (e) {
          var item = e.target.closest('.mega-menu__subitem');
          activateSubitem(list, item);
        });
      });
    });
  }

  /*
   * Intro metin: PointC CodePen (MWQJWqJ) tarzı — satır mask, scroll’da scaleX:0, origin sağ.
   * https://codepen.io/PointC/pen/MWQJWqJ — SplitText/ScrollSmoother yok, manuel satır.
   */
  function escapeHtmlIntro(str) {
    var d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function initIntroLineReveal() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    document.querySelectorAll('.prava-intro-split__text--line-reveal').forEach(function (root) {
      var section = root.closest('.prava-intro-split');
      if (!section) return;

      var raw = (root.innerText || root.textContent || '').trim();
      if (!raw) return;

      var lines = raw.split(/\n+/).map(function (l) {
        return l.trim();
      }).filter(Boolean);

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        root.innerHTML = lines
          .map(function (line) {
            return '<p class="prava-intro-line-plain">' + escapeHtmlIntro(line) + '</p>';
          })
          .join('');
        return;
      }

      root.innerHTML = lines
        .map(function (line) {
          return (
            '<span class="prava-intro-line">' +
            '<span class="prava-intro-line__text">' +
            escapeHtmlIntro(line) +
            '</span>' +
            '<span class="prava-intro-line__mask" aria-hidden="true"></span>' +
            '</span>'
          );
        })
        .join('');

      gsap.registerPlugin(ScrollTrigger);

      root.querySelectorAll('.prava-intro-line').forEach(function (lineEl) {
        var mask = lineEl.querySelector('.prava-intro-line__mask');
        if (!mask) return;

        gsap.set(mask, { scaleX: 1 });

        gsap.to(mask, {
          scaleX: 0,
          transformOrigin: 'right center',
          ease: 'none',
          scrollTrigger: {
            trigger: lineEl,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
        });
      });
    });

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
      }, 200);
    });
  }

  function initIntroFigureReveal() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.prava-intro-split__figure-wrap--reveal').forEach(function (wrap) {
      var offset = window.matchMedia('(min-width: 768px)').matches ? -150 : 0;

      /* Görsel alan viewport’a girdiğinden çıkana kadar: animasyonun tamamı kaydırma boyunca görünür */
      gsap.fromTo(
        wrap,
        { opacity: 0, x: offset },
        {
          opacity: 1,
          x: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        }
      );
    });
  }

  function initParallaxEffects() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.parallax-item, .parallax-container').forEach(function (container) {
      var content = container.children[0];
      if (!content) return;

      var speed = parseFloat(container.dataset.speed) || 1;
      var startY = parseFloat(container.dataset.start) || -20;
      var endY = parseFloat(container.dataset.end) || 20;
      var direction = container.dataset.direction || 'vertical';
      var trigger = container.dataset.trigger || container;
      var scrub = container.dataset.scrub !== undefined ? parseFloat(container.dataset.scrub) : true;
      var pin = container.dataset.pin === 'true';
      var scaleEffect = container.dataset.scale === 'true';

      var targetElement = container.classList.contains('parallax-item')
        ? (container.querySelector('.parallax-content') || content)
        : content;

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          scrub: scrub,
          pin: pin,
        },
      });

      if (scaleEffect) {
        tl.fromTo(targetElement, {
          scale: 0.8,
          ease: 'none',
        }, {
          scale: 1.2,
          ease: 'none',
        }, 0);
      }

      if (direction === 'horizontal') {
        tl.fromTo(targetElement, {
          xPercent: startY,
          ease: 'none',
        }, {
          xPercent: endY,
          ease: 'none',
        }, 0);
      } else if (direction === 'both') {
        tl.fromTo(targetElement, {
          xPercent: startY,
          yPercent: startY,
          ease: 'none',
        }, {
          xPercent: endY,
          yPercent: endY,
          ease: 'none',
        }, 0);
      } else {
        tl.fromTo(targetElement, {
          yPercent: startY,
          ease: 'none',
        }, {
          yPercent: endY,
          ease: 'none',
        }, 0);
      }

      tl.timeScale(speed);
    });
  }

  function initSupportFaqAccordion() {
    document.querySelectorAll('.prava-support-faq__list').forEach(function (list) {
      list.querySelectorAll('details.prava-support-faq__item').forEach(function (el) {
        el.addEventListener('toggle', function () {
          if (!this.open) return;
          list.querySelectorAll('details.prava-support-faq__item').forEach(function (other) {
            if (other !== el) other.removeAttribute('open');
          });
        });
      });
    });
  }

  initIntroLineReveal();
  initIntroFigureReveal();
  initParallaxEffects();
  initSupportFaqAccordion();
})();
