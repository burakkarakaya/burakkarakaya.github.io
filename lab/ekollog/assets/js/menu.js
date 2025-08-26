// Menu JavaScript for Ekol Lojistik

// Menu initialization
function initMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-menu-btn');
    const slideMenu = document.getElementById('slideMenu');
    const quoteOpenBtn = document.getElementById('quote-open-btn');
    const quoteDrawer = document.getElementById('quoteDrawer');
    const quoteOverlay = document.getElementById('quoteOverlay');
    const quoteDrawerClose = document.getElementById('quoteDrawerClose');
    
    if (!menuBtn || !slideMenu) return;
    
    const menuIcon = menuBtn.querySelector('i');

    // Menüyü açma fonksiyonu
    function openMenu() {
        slideMenu.classList.remove('-right-full');
        slideMenu.classList.add('right-0');
        if (menuIcon) {
            menuIcon.classList.remove('ti-menu-2');
            menuIcon.classList.add('ti-x');
        }
    }

    // Menüyü kapatma fonksiyonu
    function closeMenu() {
        slideMenu.classList.remove('right-0');
        slideMenu.classList.add('-right-full');
        if (menuIcon) {
            menuIcon.classList.remove('ti-x');
            menuIcon.classList.add('ti-menu-2');
        }
    }

    // Event listeners with passive option where appropriate
    menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    
    // Teklif paneli aç/kapa
    function openQuote() {
        if (!quoteDrawer || !quoteOverlay) return;
        quoteDrawer.classList.remove('-right-full');
        quoteDrawer.classList.add('right-0');
        quoteOverlay.classList.remove('pointer-events-none');
        quoteOverlay.classList.remove('opacity-0');
        quoteOverlay.classList.add('opacity-100');
    }
    
    function closeQuote() {
        if (!quoteDrawer || !quoteOverlay) return;
        quoteDrawer.classList.remove('right-0');
        quoteDrawer.classList.add('-right-full');
        quoteOverlay.classList.add('pointer-events-none');
        quoteOverlay.classList.add('opacity-0');
        quoteOverlay.classList.remove('opacity-100');
    }
    
    if (quoteOpenBtn) quoteOpenBtn.addEventListener('click', openQuote);
    if (quoteOverlay) quoteOverlay.addEventListener('click', closeQuote);
    if (quoteDrawerClose) quoteDrawerClose.addEventListener('click', closeQuote);
    
    // Basit form doğrulama/gönderim simülasyonu
    const quoteForm = document.getElementById('quoteForm');
    const quoteSuccess = document.getElementById('quoteSuccess');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e){
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
            setTimeout(closeQuote, 1500);
            return false;
        });
    }
    
    // Prevent default form submissions (global)
    document.querySelectorAll('form').forEach(form => {
        if (form.id === 'quoteForm') return;
        form.addEventListener('submit', e => {
            e.preventDefault();
            return false;
        });
    });
    
    // Prevent default link clicks (sadece # olanlar)
    document.querySelectorAll('a[href="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
        });
    });
    
    // Prevent context menu
    document.addEventListener('contextmenu', e => {
        e.preventDefault();
    });
}

// Initialize menu when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize menu functionality if needed
    if (document.querySelector('.menu-btn')) {
        initMenu();
    }
}); 