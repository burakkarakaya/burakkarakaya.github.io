document.addEventListener('DOMContentLoaded', () => {
  const includeElements = document.querySelectorAll('[data-include]');

  includeElements.forEach(async (element) => {
    const url = element.getAttribute('data-include');
    if (!url) return;
    try {
      const response = await fetch(url, { cache: 'no-cache' });
      if (!response.ok) throw new Error(`Yüklenemedi: ${url}`);
      const html = await response.text();
      element.innerHTML = html;
      element.removeAttribute('data-include');
      
      // Bileşen yüklendikten sonra JavaScript fonksiyonlarını yeniden başlat
      if (url.includes('header.html')) {
        initHeaderFunctions();
      }
      if (url.includes('footer.html')) {
        initFooterFunctions();
      }
    } catch (error) {
      console.error('Bileşen yükleme hatası:', error);
    }
  });
});

// Header fonksiyonlarını yeniden başlat
function initHeaderFunctions() {
  // Menu butonları için event listener'ları
  const menuBtn = document.querySelector('.menu-btn');
  const closeBtn = document.querySelector('.close-menu-btn');
  const slideMenu = document.getElementById('slideMenu');
  const quoteOpenBtn = document.getElementById('quote-open-btn');
  const quoteDrawer = document.getElementById('quoteDrawer');
  const quoteOverlay = document.getElementById('quoteOverlay');
  const quoteDrawerClose = document.getElementById('quoteDrawerClose');
  
  if (menuBtn && slideMenu) {
    const menuIcon = menuBtn.querySelector('i');
    
    function openMenu() {
      slideMenu.classList.remove('-right-full');
      slideMenu.classList.add('right-0');
      if (menuIcon) {
        menuIcon.classList.remove('ti-menu-3');
        menuIcon.classList.add('ti-x');
      }
    }
    
    function closeMenu() {
      slideMenu.classList.remove('right-0');
      slideMenu.classList.add('-right-full');
      if (menuIcon) {
        menuIcon.classList.remove('ti-x');
        menuIcon.classList.add('ti-menu-3');
      }
    }
    
    // Event listener'ları temizle ve yeniden ekle
    menuBtn.removeEventListener('click', openMenu);
    menuBtn.addEventListener('click', openMenu);
    
    if (closeBtn) {
      closeBtn.removeEventListener('click', closeMenu);
      closeBtn.addEventListener('click', closeMenu);
    }
  }
  
  // Teklif paneli için event listener'ları
  if (quoteOpenBtn && quoteDrawer && quoteOverlay) {
    function openQuote() {
      quoteDrawer.classList.remove('-right-full');
      quoteDrawer.classList.add('right-0');
      quoteOverlay.classList.remove('pointer-events-none');
      quoteOverlay.classList.remove('opacity-0');
      quoteOverlay.classList.add('opacity-100');
    }
    
    function closeQuote() {
      quoteDrawer.classList.remove('right-0');
      quoteDrawer.classList.add('-right-full');
      quoteOverlay.classList.add('pointer-events-none');
      quoteOverlay.classList.add('opacity-0');
      quoteOverlay.classList.remove('opacity-100');
    }
    
    quoteOpenBtn.removeEventListener('click', openQuote);
    quoteOpenBtn.addEventListener('click', openQuote);
    
    if (quoteOverlay) {
      quoteOverlay.removeEventListener('click', closeQuote);
      quoteOverlay.addEventListener('click', closeQuote);
    }
    
    if (quoteDrawerClose) {
      quoteDrawerClose.removeEventListener('click', closeQuote);
      quoteDrawerClose.addEventListener('click', closeQuote);
    }
  }
  
  // Teklif formu için event listener'ları
  const quoteForm = document.getElementById('quoteForm');
  const quoteSuccess = document.getElementById('quoteSuccess');
  if (quoteForm) {
    function handleQuoteSubmit(e) {
      e.preventDefault();
      const formData = new FormData(quoteForm);
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const phone = String(formData.get('phone') || '').trim();
      const consent = !!quoteForm.querySelector('input[name="consent"]').checked;
      
      if (!name || !email || !phone) {
        alert('Lütfen zorunlu alanları doldurunuz.');
        return false;
      }
      
      if (!consent) {
        alert('Lütfen KVKK onayını işaretleyiniz.');
        return false;
      }
      
      if (quoteSuccess) quoteSuccess.classList.remove('hidden');
      quoteForm.reset();
      setTimeout(() => {
        if (quoteDrawer && quoteOverlay) {
          quoteDrawer.classList.remove('right-0');
          quoteDrawer.classList.add('-right-full');
          quoteOverlay.classList.add('pointer-events-none');
          quoteOverlay.classList.add('opacity-0');
          quoteOverlay.classList.remove('opacity-100');
        }
      }, 1500);
      return false;
    }
    
    quoteForm.removeEventListener('submit', handleQuoteSubmit);
    quoteForm.addEventListener('submit', handleQuoteSubmit);
  }
}

// Footer fonksiyonlarını başlat
function initFooterFunctions() {
  // Mobil accordion yapısı için
  const footerSections = document.querySelectorAll('footer .col-span-1');
  
  footerSections.forEach(section => {
    const title = section.querySelector('p.font-bold');
    const content = section.querySelector('div');
    
    if (title && content) {
      // Mobil için accordion toggle butonu ekle
      if (window.innerWidth <= 768) {
        title.style.cursor = 'pointer';
        title.classList.add('flex', 'items-center', 'justify-between');
        
        // Toggle ikonu ekle
        const toggleIcon = document.createElement('i');
        toggleIcon.className = 'ti ti-chevron-down text-gray-600 transition-transform';
        title.appendChild(toggleIcon);
        
        // Mobilde başlangıçta gizle
        content.classList.add('hidden', 'md:block');
        
        // Click event ekle
        title.addEventListener('click', () => {
          content.classList.toggle('hidden');
          toggleIcon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
        });
      }
    }
  });
  
  // Newsletter form için event listener
  const newsletterForm = document.querySelector('footer input[type="email"]');
  const newsletterBtn = document.querySelector('footer .newsletter-submit-btn');
  
  if (newsletterForm && newsletterBtn) {
    function handleNewsletterSubmit(e) {
      e.preventDefault();
      const email = newsletterForm.value.trim();
      if (email && email.includes('@')) {
        alert('Bülten kaydınız alınmıştır. Teşekkürler!');
        newsletterForm.value = '';
      } else {
        alert('Lütfen geçerli bir e-posta adresi giriniz.');
      }
    }
    
    newsletterBtn.addEventListener('click', handleNewsletterSubmit);
  }
  
  // Window resize event'i ekle
  window.addEventListener('resize', () => {
    const isMobile = window.innerWidth <= 768;
    footerSections.forEach(section => {
      const title = section.querySelector('p.font-bold');
      const content = section.querySelector('div');
      
      if (title && content) {
        if (isMobile) {
          title.style.cursor = 'pointer';
          title.classList.add('flex', 'items-center', 'justify-between');
          
          // Toggle ikonu yoksa ekle
          if (!title.querySelector('i.ti-chevron-down')) {
            const toggleIcon = document.createElement('i');
            toggleIcon.className = 'ti ti-chevron-down text-gray-600 transition-transform';
            title.appendChild(toggleIcon);
          }
          
          content.classList.add('hidden', 'md:block');
        } else {
          title.style.cursor = 'default';
          title.classList.remove('flex', 'items-center', 'justify-between');
          
          // Toggle ikonunu kaldır
          const toggleIcon = title.querySelector('i.ti-chevron-down');
          if (toggleIcon) toggleIcon.remove();
          
          content.classList.remove('hidden');
        }
      }
    });
  });
}

