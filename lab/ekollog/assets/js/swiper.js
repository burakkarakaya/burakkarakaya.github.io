// Swiper JavaScript for Ekol Lojistik

// Swiper initialization with performance optimizations
function initSwiper() {
    // Load Swiper dynamically if needed
    if (typeof Swiper === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/10.0.4/swiper-bundle.min.js';
        script.onload = createSwiper;
        document.head.appendChild(script);
    } else {
        createSwiper();
    }
}

function createSwiper() {
    const swiper = new Swiper('.mainSwiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        autoplay: {
            delay: 5000,
            disableOnInteraction: true // Kullanıcı etkileşiminden sonra autoplay'ı durdurur
        },
        loop: true,
        speed: 1500,
        effect: 'slide',
        fadeEffect: { crossFade: true },
        navigation: {
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
        },
        on: {
            init: function() {
                updateSlideNumbers(this);
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) initTextAnimation(activeSlide);
            },
            slideChangeTransitionStart: function() {
                const nextSlide = this.slides[this.activeIndex];
                if (nextSlide) {
                    prepareTextAnimation(nextSlide);
                    initTextAnimation(nextSlide);
                }
            },
            slideChange: function() {
                updateSlideNumbers(this);
            }
        }
    });
}

// Optimized slide number updates + hide navigation if single slide
function updateSlideNumbers(swiper) {
    if (!swiper || !swiper.el) return;

    // Navigation kökünü güvenli şekilde bul
    var navRoot = swiper.el.querySelector('.navigation')
        || (swiper.el.closest('.swiper') ? swiper.el.closest('.swiper').querySelector('.navigation') : null)
        || (swiper.el.parentElement ? swiper.el.parentElement.querySelector('.navigation') : null)
        || document.querySelector('#mainSlider .navigation');

    var currentSlideEl = navRoot ? navRoot.querySelector('.current-slide') : null;
    var totalSlidesEl = navRoot ? navRoot.querySelector('.total-slides') : null;

    // Gerçek slayt sayısı: klonlar hariç
    var slidesAll = Array.from(swiper.slides || []);
    var realSlides = slidesAll.filter(function(s){ return !s.classList.contains('swiper-slide-duplicate'); });
    var realCount = realSlides.length || slidesAll.length || 0;

    if (currentSlideEl) {
        currentSlideEl.textContent = (swiper.realIndex + 1).toString().padStart(2, '0');
    }
    if (totalSlidesEl) {
        totalSlidesEl.textContent = realCount.toString().padStart(2, '0');
    }

    // Tek slaytta navigasyonu gizle (navRoot bulunduysa uygula)
    if (navRoot) {
        navRoot.style.display = realCount <= 1 ? 'none' : '';
    }
}

// Text animation preparation
function prepareTextAnimation(slide) {
    if (!slide) return;
    
    const text = slide.querySelector('h1');
    const paragraph = slide.querySelector('p');
    
    if (text) {
        text.style.whiteSpace = 'normal';
        text.style.wordSpacing = 'normal';
        text.style.letterSpacing = 'normal';
    }
    
    if (paragraph) {
        paragraph.style.whiteSpace = 'normal';
    }
}

// Optimized text animation with fragment-based DOM updates
function initTextAnimation(slide) {
    if (!slide) return;
    
    const text = slide.querySelector('h1');
    const paragraph = slide.querySelector('p');

    // Kill previous animations if they exist
    if (text && text._animation) text._animation.kill();
    if (paragraph && paragraph._animation) paragraph._animation.kill();

    // Animate heading with efficient DOM manipulation
    if (text) {
        const originalHTML = text.dataset.original || text.innerHTML.trim();
        if (!text.dataset.original) text.dataset.original = originalHTML;

        // Use DocumentFragment for better performance
        const fragment = document.createDocumentFragment();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = originalHTML;
        
        // Process text and create animation spans
        Array.from(tempDiv.childNodes).forEach(node => {
            if (node.nodeName === 'BR') {
                fragment.appendChild(document.createElement('br'));
                return;
            }
            
            // Process text nodes
            if (node.nodeType === 3) {
                const words = node.textContent.trim().split(/\s+/);
                const lineWrapper = document.createElement('span');
                lineWrapper.style.display = 'inline-block';
                lineWrapper.style.width = '100%';
                
                words.forEach((word, index) => {
                    if (word.length === 0) return;
                    
                    const wordSpan = document.createElement('span');
                    wordSpan.style.display = 'inline-block';
                    wordSpan.style.marginRight = '8px';
                    wordSpan.style.whiteSpace = 'nowrap';
                    
                    // Create spans for each character
                    for (let i = 0; i < word.length; i++) {
                        const charSpan = document.createElement('span');
                        charSpan.textContent = word[i];
                        charSpan.style.display = 'inline-block';
                        charSpan.style.opacity = '0';
                        charSpan.style.transform = 'translateY(20px)';
                        wordSpan.appendChild(charSpan);
                    }
                    
                    lineWrapper.appendChild(wordSpan);
                    
                    if (index < words.length - 1) {
                        const space = document.createElement('span');
                        space.innerHTML = '&nbsp;';
                        lineWrapper.appendChild(space);
                    }
                });
                
                fragment.appendChild(lineWrapper);
            } else {
                // Handle other node types
                fragment.appendChild(node.cloneNode(true));
            }
        });
        
        // Update DOM once with all changes
        text.innerHTML = '';
        text.appendChild(fragment);
        
        // Apply GSAP animation
        if (typeof gsap !== 'undefined') {
            text._animation = gsap.to(text.querySelectorAll('span span'), {
                opacity: 1,
                y: 0,
                stagger: 0.05,
                duration: 0.4,
                ease: 'power2.out',
                delay: 0.1
            });
        }
    }

    // Animate paragraph
    if (paragraph && typeof gsap !== 'undefined') {
        gsap.set(paragraph, {
            opacity: 0,
            y: 20
        });

        paragraph._animation = gsap.to(paragraph, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.4,
            ease: 'power3.out'
        });
    }
}

// Ideas Swiper initialization
function initIdeasSwiper() {
    if (typeof Swiper !== 'undefined') {
        const ideasSwiper = new Swiper('.ideasSwiper', {
            slidesPerView: 1.5,
            spaceBetween: 20,
            centeredSlides: false,
            navigation: {
                nextEl: '.ideas-swiper-button-next',
                prevEl: '.ideas-swiper-button-prev',
            },
            on: {
                init: function() {
                    updateIdeasSlideNumbers(this);
                },
                slideChange: function() {
                    updateIdeasSlideNumbers(this);
                }
            },
            breakpoints: {
                640: {
                    spaceBetween: 30,
                }
            }
        });

        // Slide numaralarını güncelleme ve tek slaytta navigasyonu gizleme
        function updateIdeasSlideNumbers(swiper) {
            if (!swiper || !swiper.el) return;

            // Navigation kökünü güvenli şekilde bul
            var navRoot = swiper.el.querySelector('.navigation')
                || (swiper.el.closest('.swiper') ? swiper.el.closest('.swiper').querySelector('.navigation') : null)
                || (swiper.el.parentElement ? swiper.el.parentElement.querySelector('.navigation') : null)
                || document.querySelector('.ideasSwiper .navigation');

            var currentSlideEl = navRoot ? navRoot.querySelector('.current-slide') : null;
            var totalSlidesEl = navRoot ? navRoot.querySelector('.total-slides') : null;

            // Gerçek slayt sayısı: klonlar hariç
            var slidesAll = Array.from(swiper.slides || []);
            var realSlides = slidesAll.filter(function(s){ return !s.classList.contains('swiper-slide-duplicate'); });
            var realCount = realSlides.length || slidesAll.length || 0;

            if (currentSlideEl) {
                currentSlideEl.textContent = (swiper.realIndex + 1).toString().padStart(2, '0');
            }
            if (totalSlidesEl) {
                totalSlidesEl.textContent = realCount.toString().padStart(2, '0');
            }

            // Tek slaytta navigasyonu gizle (navRoot bulunduysa uygula)
            if (navRoot) {
                navRoot.style.display = realCount <= 1 ? 'none' : '';
            }
        }

        // Başlangıçta numaraları güncelle
        updateIdeasSlideNumbers(ideasSwiper);
    }
}

// Initialize Ideas Swiper when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Ideas Swiper if it exists
    if (document.querySelector('.ideasSwiper')) {
        initIdeasSwiper();
    }
}); 