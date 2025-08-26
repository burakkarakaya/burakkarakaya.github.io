// Main JavaScript for Ekol Lojistik

// Utility function to preload images
const preloadImages = (selector) => {
    return new Promise((resolve) => {
        const images = document.querySelectorAll(selector);
        
        if (!images.length) {
            resolve();
            return;
        }
        
        let loadedCount = 0;
        const totalImages = images.length;
        
        const imageLoaded = () => {
            loadedCount++;
            if (loadedCount >= totalImages) {
                resolve();
            }
        };
        
        images.forEach(img => {
            if (img.complete) {
                imageLoaded();
            } else {
                img.addEventListener('load', imageLoaded);
                img.addEventListener('error', imageLoaded); // Also count errors as "loaded"
            }
        });
    });
};

// Debounce function to limit function calls
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Footer accordion functionality
function initFooterAccordion() {
    const footerSections = document.querySelectorAll('.bg-gray-100 footer.grid > div:not(.col-span-2)');
    
    footerSections.forEach(section => {
        const title = section.querySelector('p.font-bold');
        const content = section.querySelector('div.mt-4');
        
        if (title && content) {
            // Başlangıçta tüm içerikleri gizle
            content.style.maxHeight = '0';
            content.style.overflow = 'hidden';
            content.style.transition = 'max-height 0.3s ease';
            
            title.addEventListener('click', () => {
                const isActive = section.classList.contains('active');
                
                // Tüm diğer section'ları kapat
                footerSections.forEach(s => {
                    s.classList.remove('active');
                    const c = s.querySelector('div.mt-4');
                    if (c) {
                        c.style.maxHeight = '0';
                    }
                });
                
                // Bu section'ı aç/kapat
                if (!isActive) {
                    section.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        }
    });
}

// Global başlık ve açıklama animasyonu
function initTitleAnimations() {
    // Tüm başlık ve açıklama elementlerini seç
    const titleSections = document.querySelectorAll('.title-section');
    
    titleSections.forEach((section) => {
        const title = section.querySelector('.title-animate');
        const desc = section.querySelector('.desc-animate');
        
        if (title) {
            // Başlık animasyonu - her seferinde yeniden başlat
            gsap.fromTo(title.querySelectorAll('span'), 
                {
                    y: 100,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse",
                        markers: false,
                        onEnter: () => {
                            // Animasyon durumunu sıfırla ve yeniden başlat
                            gsap.set(title.querySelectorAll('span'), { y: 100, opacity: 0 });
                        }
                    }
                }
            );
        }
        
        if (desc) {
            // Açıklama animasyonu - her seferinde yeniden başlat
            gsap.fromTo(desc,
                {
                    y: 50,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse",
                        markers: false,
                        onEnter: () => {
                            // Animasyon durumunu sıfırla ve yeniden başlat
                            gsap.set(desc, { y: 50, opacity: 0 });
                        }
                    }
                }
            );
        }
    });
}

// Parallax efektlerini başlatma fonksiyonu
function initParallaxEffects() {
    // Tüm parallax elementlerini seç
    gsap.utils.toArray('[class*="parallax"]').forEach(container => {
        // Container içindeki tüm çocukları al (img, div, p, h1 vb.)
        const content = container.children[0];
        if (!content) return;

        // Data attribute'lardan ayarları al (varsayılan değerlerle)
        const speed = parseFloat(container.dataset.speed) || 1;
        const startY = parseFloat(container.dataset.start) || -20;
        const endY = parseFloat(container.dataset.end) || 20;
        const direction = container.dataset.direction || 'vertical';
        const trigger = container.dataset.trigger || container;
        const scrub = container.dataset.scrub !== undefined ? parseFloat(container.dataset.scrub) : true;
        const pin = container.dataset.pin === "true";
        const scaleEffect = container.dataset.scale === "true";
        
        // Eğer parallax-item ise ve özel bir sınıfı varsa, onu kullan
        const targetElement = container.classList.contains('parallax-item') ? 
                            (container.querySelector('.parallax-content') || content) : 
                            content;

        // Timeline oluştur
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: trigger,
                scrub: scrub,
                pin: pin,
                // markers: true // Debug için açabilirsiniz
            }
        });

        // Scale efekti ekle (isteğe bağlı)
        if (scaleEffect) {
            tl.fromTo(targetElement, {
                scale: 0.8,
                ease: 'none'
            }, {
                scale: 1.2,
                ease: 'none'
            }, 0);
        }

        // Yatay veya dikey hareket için farklı animasyonlar
        if (direction === 'horizontal') {
            tl.fromTo(targetElement, {
                xPercent: startY,
                ease: 'none'
            }, {
                xPercent: endY,
                ease: 'none'
            }, 0);
        } else if (direction === 'both') {
            // Hem yatay hem dikey hareket
            tl.fromTo(targetElement, {
                xPercent: startY,
                yPercent: startY,
                ease: 'none'
            }, {
                xPercent: endY,
                yPercent: endY,
                ease: 'none'
            }, 0);
        } else {
            // Varsayılan dikey hareket
            tl.fromTo(targetElement, {
                yPercent: startY,
                ease: 'none'
            }, {
                yPercent: endY,
                ease: 'none'
            }, 0);
        }

        // Hız ayarı
        tl.timeScale(speed);
    });
}

// Initialize all animations
function initAnimations() {
    // Performance optimized scroll handler
    let lastScrollPosition = 0;
    let ticking = false;
    let brandWithGSAP = false; // GSAP sürümü aktifse vanilla güncellemeleri atla
    
    // Using passive true for better scroll performance
    window.addEventListener('scroll', function() {
        lastScrollPosition = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                if (lastScrollPosition > 50) {
                    document.body.classList.add('header-sticky');
                } else {
                    document.body.classList.remove('header-sticky');
                }

                // Brand caption: small önce, sonra span fade/translate
                if (!brandWithGSAP) {
                    const brandCaption = document.querySelector('.brand-caption');
                    if (brandCaption) {
                        const titleSpan = brandCaption.querySelector('span');
                        const subSmall = brandCaption.querySelector('small');
                        const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

                        const baseRange = 220; // toplam hareket mesafesi
                        const spanOffset = 80;  // span daha geç başlasın

                        // small
                        const smallProg = clamp(lastScrollPosition / baseRange, 0, 1);
                        const smallOpacity = 1 - smallProg;
                        const smallY = smallProg * 22;
                        if (subSmall) {
                            subSmall.style.opacity = String(smallOpacity);
                            subSmall.style.transform = `translateY(${smallY}px)`;
                        }

                        // span
                        const spanProg = clamp((lastScrollPosition - spanOffset) / baseRange, 0, 1);
                        const spanOpacity = 1 - spanProg;
                        const spanY = spanProg * 22;
                        if (titleSpan) {
                            titleSpan.style.opacity = String(spanOpacity);
                            titleSpan.style.transform = `translateY(${spanY}px)`;
                        }
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Variable to store the Lenis smooth scrolling object
    let lenis;
    
    // Selecting DOM elements
    const contentElements = [...document.querySelectorAll('.content--sticky')];
    const totalContentElements = contentElements.length;

    // Initialize Lenis smooth scrolling if libraries are available
    const initLenisScroll = () => {
        if (typeof Lenis !== 'undefined' && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            initSmoothScrolling();
            scroll();
            setupBrandCaptionScroll();
        } else {
            // If libraries aren't loaded yet, wait and try again
            setTimeout(checkDependencies, 100);
        }
    };

    // Check if all required libraries are loaded
    const checkDependencies = () => {
        if (typeof Lenis !== 'undefined' && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            initLenisScroll();
        } else {
            // Load missing libraries
            if (typeof Lenis === 'undefined') {
                loadScript('https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.33/dist/lenis.min.js', checkDependencies);
            }
            if (typeof gsap === 'undefined') {
                loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', checkDependencies);
            }
            if (typeof ScrollTrigger === 'undefined' && typeof gsap !== 'undefined') {
                loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js', checkDependencies);
            }
        }
    };

    // Load libraries that don't exist
    function loadScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        document.head.appendChild(script);
    }

    // Initialize smooth scrolling with Lenis
    const initSmoothScrolling = () => {
        // Create Lenis instance with optimal settings
        lenis = new Lenis({
            lerp: 0.07,
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false
        });

        // Update ScrollTrigger on scroll
        lenis.on('scroll', () => ScrollTrigger.update());

        // Create RAF loop for smooth animations
        const scrollFn = (time) => {
            lenis.raf(time);
            requestAnimationFrame(scrollFn);
        };
        
        // Start animation loop
        requestAnimationFrame(scrollFn);
    };

    // Brand caption GSAP/ScrollTrigger alternative driven by Lenis
    function setupBrandCaptionScroll() {
        const brandCaption = document.querySelector('.brand-caption');
        if (!brandCaption || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        const titleSpan = brandCaption.querySelector('span');
        const subSmall = brandCaption.querySelector('small');
        if (!titleSpan || !subSmall) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: '+=220',
                scrub: true
            }
        });

        // small önce
        tl.fromTo(subSmall, { opacity: 1, y: 0 }, { opacity: 0, y: 22, ease: 'none' }, 0);
        // span biraz gecikmeli
        tl.fromTo(titleSpan, { opacity: 1, y: 0 }, { opacity: 0, y: 22, ease: 'none' }, 0.35);

        // GSAP aktifken vanilla güncellemeleri devre dışı
        brandWithGSAP = true;
    }

    // Function to handle scroll-triggered animations
    const scroll = () => {
        contentElements.forEach((el, position) => {
            const isLast = position === totalContentElements - 1;
            
            gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: 'top top',
                    end: '+=60%',
                    scrub: true
                }
            })
            .to(el, {
                ease: 'none',
                startAt: {filter: 'brightness(100%)', borderRadius: isLast ? 10 : 10, scale: isLast ? 1 : 1, opacity: 1 },
                filter: isLast ? 'none' : 'brightness(20%)',
                scale: isLast ? 1 : 0.6,
                borderRadius: isLast ? "inherit" : 20,
                opacity: 0 
            }, 0);
        });

        // Parallax efektlerini başlat
        initParallaxEffects();
    };

    // Preload images and initialize
    const initWithPreload = () => {
        if (document.querySelectorAll('.content__img').length > 0) {
            preloadImages('.content__img').then(() => {
                document.body.classList.remove('loading');
                checkDependencies();
            });
        } else {
            checkDependencies();
        }
    };

    // Load GSAP only if needed
    if (document.querySelector('.main-slider')) {
        // Initialize GSAP
        const gsapInit = () => {
            gsap.registerPlugin(ScrollTrigger);
            
            // Main slider parallax effect
            gsap.fromTo(
                ".main-slider img, .main-slider video",
                { y: 0 },
                {
                    y: -60,
                    scrollTrigger: {
                        trigger: ".main-slider",
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                }
            );

            // Text animations
            gsap.fromTo(
                ".main-slider h1",
                { y: 0, opacity: 1 },
                {
                    y: -100, opacity: 0,
                    scrollTrigger: {
                        trigger: ".main-slider",
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                }
            );

            gsap.fromTo(
                ".main-slider p",
                { y: 0, opacity: 1 },
                {
                    y: -90, opacity: 0,
                    scrollTrigger: {
                        trigger: ".main-slider",
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                }
            );

            // Initial animations
            gsap.from(".main-slider h1", { 
                y: 100, 
                opacity: 0,
                duration: 1, 
                ease: "power3.out" 
            });

            gsap.from(".main-slider p", { 
                y: 80, 
                opacity: 0,
                duration: 1, 
                delay: 0.5, 
                ease: "power3.out" 
            });

            // Counter animations
            if (document.querySelector('.counter-section')) {
                ScrollTrigger.create({
                    trigger: ".counter-section",
                    start: "top 80%",
                    onEnter: initCounters,
                    once: true
                });
            }
        };

        // Load GSAP dynamically
        if (typeof gsap === 'undefined') {
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', () => {
                loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js', () => {
                    gsapInit();
                    initWithPreload();
                });
            });
        } else {
            gsapInit();
            initWithPreload();
        }
    } else {
        initWithPreload();
    }

    // Initialize Swiper only if needed
    if (document.querySelector('.mainSwiper')) {
        initSwiper();
    }

    // Initialize menu functionality if needed
    if (document.querySelector('.menu-btn')) {
        initMenu();
    }

    // Mobil header eventleri: masaüstü butonlarını tetikler
    (function attachMobileHeaderEvents(){
        const mobileMenuBtn = document.querySelector('.menu-btn-mobile');
        const desktopMenuBtn = document.querySelector('.menu-btn');
        if (mobileMenuBtn && desktopMenuBtn) {
            mobileMenuBtn.addEventListener('click', function(){ desktopMenuBtn.click(); });
        }
        const mobileQuoteBtn = document.getElementById('quote-open-btn-mobile');
        const desktopQuoteBtn = document.getElementById('quote-open-btn');
        if (mobileQuoteBtn && desktopQuoteBtn) {
            mobileQuoteBtn.addEventListener('click', function(){ desktopQuoteBtn.click(); });
        }
    })();

    // Initialize footer accordion
    initFooterAccordion();
}

// Optimized counter animation function
function initCounters() {
    animateCounter('.experience-counter', 0, 30, 2000, "MIL €/yıl Yatırım");
    animateCounter('.team-counter', 0, 200, 2000, "+");
    animateCounter('.modern-counter', 0, 150, 2000, "+ Proje");
    animateCounter('.roro-counter', 0, 5, 2000, "");
}

// More efficient counter animation
function animateCounter(selector, start, end, duration, suffix = "") {
    const element = document.querySelector(selector);
    if (!element) return;
    
    const frameDuration = 1000/60;
    const totalFrames = Math.round(duration / frameDuration);
    const increment = (end - start) / totalFrames;
    
    let currentValue = start;
    let frame = 0;
    
    const animate = () => {
        frame++;
        currentValue += increment;
        
        if (frame <= totalFrames) {
            element.textContent = Math.floor(currentValue) + suffix;
            requestAnimationFrame(animate);
        } else {
            element.textContent = end + suffix;
        }
    };
    
    requestAnimationFrame(animate);
}

// Document ready event listener
document.addEventListener("DOMContentLoaded", function() {
    // Initialize title animations
    initTitleAnimations();
    
    // Initialize all animations
    initAnimations();
    
    // Register GSAP plugins if available
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Logo animasyonu bittikten sonra brand caption'ı göster
    (function revealBrandCaptionAfterLogo(){
        const logoIntro = document.getElementById('logoIntro');
        const brandCaption = document.querySelector('.brand-caption');
        if (!brandCaption) return;

        // Güvenlik: çok erken görünmesin diye başlangıç durumunu uygula
        brandCaption.classList.remove('brand-caption--show');

        let revealed = false;
        const reveal = () => {
            if (revealed) return;
            revealed = true;
            brandCaption.classList.add('brand-caption--show');
        };

        // prefers-reduced-motion: reduce ise beklemeden göster
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
            reveal();
            return;
        }

        // Logo intro kapsayıcısının animasyon sonunu yakala
        if (logoIntro) {
            logoIntro.addEventListener('animationend', reveal, { once: true });
        }

        // Yedek: 2.2s sonra yine de göster (slideUpAndHide toplamı ~2.3s)
        setTimeout(reveal, 2300);
    })();
}); 