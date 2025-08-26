// YouTube Video JavaScript for Ekol Lojistik

// Load YouTube Iframe API once
(function ensureYouTubeAPI(){
    if (window.YT && window.YT.Player) return;
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
})();

let ytPlayers = {};
let modalPlayer = null;

// Create modal markup lazily
function ensureVideoModal(){
    if (document.getElementById('videoModalOverlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'videoModalOverlay';
    overlay.className = 'fixed inset-0 bg-black bg-opacity-70 z-50 hidden flex items-center justify-center p-4';
    overlay.innerHTML = `
        <div id="videoModal" class="bg-black rounded-xl overflow-hidden relative max-w-4xl w-full aspect-video">
            <button id="videoModalClose" aria-label="Kapat" class="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center text-gray-800"><i class="ti ti-x"></i></button>
            <div id="videoModalPlayer" class="w-full h-full"></div>
        </div>`;
    document.body.appendChild(overlay);
    const close = () => {
        overlay.classList.add('hidden');
        if (modalPlayer && modalPlayer.pauseVideo) modalPlayer.pauseVideo();
    };
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelector('#videoModalClose').addEventListener('click', close);
}

function playInModal(videoId){
    ensureVideoModal();
    const overlay = document.getElementById('videoModalOverlay');
    overlay.classList.remove('hidden');
    function createOrLoad(){
        if (modalPlayer) {
            modalPlayer.loadVideoById(videoId);
            modalPlayer.playVideo();
            return;
        }
        if (!window.YT || !window.YT.Player) {
            setTimeout(createOrLoad, 120);
            return;
        }
        modalPlayer = new YT.Player('videoModalPlayer', {
            videoId,
            playerVars: { autoplay: 1, controls: 1, rel: 0, modestbranding: 1 },
            events: {
                onReady: (ev) => ev.target.playVideo()
            }
        });
    }
    createOrLoad();
}

function attachHoverPreviews(){
    const cards = document.querySelectorAll('.news-card[data-video-id]');
    cards.forEach((card, idx) => {
        const videoId = card.getAttribute('data-video-id');
        const previewHost = card.querySelector('.video-preview');
        if (!previewHost) return;

        // create iframe once per card (muted & playsinline)
        function ensurePreview(){
            if (previewHost.dataset.ready === '1') return;
            if (!window.YT || !window.YT.Player) { setTimeout(ensurePreview, 120); return; }
            const containerId = 'yt_prev_' + idx + '_' + Math.random().toString(36).slice(2);
            previewHost.id = containerId;
            // absolute cover
            previewHost.style.pointerEvents = 'none';

            const player = new YT.Player(containerId, {
                videoId: videoId,
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    mute: 1,
                    playsinline: 1,
                    rel: 0,
                    modestbranding: 1,
                    loop: 1,
                    fs: 0
                },
                events: {
                    onReady: (ev) => {
                        ytPlayers[containerId] = ev.target;
                        try {
                            const iframe = ev.target.getIframe();
                            iframe.style.width = '100%';
                            iframe.style.height = '100%';
                            iframe.style.objectFit = 'cover';
                            iframe.style.borderRadius = '0.75rem';
                        } catch(_) {}
                        previewHost.dataset.ready = '1';
                    }
                }
            });
        }

        // initialize preview immediately so video area görünür olsun
        ensurePreview();

        card.addEventListener('mouseenter', () => {
            // play shortly
            const id = previewHost.id;
            const player = ytPlayers[id];
            if (player && player.playVideo) {
                player.mute && player.mute();
                player.seekTo(0, true);
                player.playVideo();
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const id = previewHost.id;
            const player = ytPlayers[id];
            if (player && player.pauseVideo) {
                player.pauseVideo();
                try { player.seekTo(0, true); } catch(_){}
            }
        });

        // click to open modal full playback
        card.addEventListener('click', (e) => {
            // Avoid interfering with internal links/buttons
            const isButton = e.target.closest('button,a');
            if (isButton) return;
            playInModal(videoId);
        });

        // also open modal when the internal action button is clicked
        const detailBtn = card.querySelector('.news-content button');
        if (detailBtn) {
            detailBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                playInModal(videoId);
            });
        }
    });
}

// Pause previews when slide changes
function stopAllPreviews(){
    Object.values(ytPlayers).forEach(p => { try { p.pauseVideo && p.pauseVideo(); } catch(_){} });
}

// Hook into existing ideasSwiper if created
(function hookIdeasSwiper(){
    const tryHook = () => {
        const swiperEl = document.querySelector('.ideasSwiper');
        if (!swiperEl || !swiperEl.swiper) { setTimeout(tryHook, 200); return; }
        swiperEl.swiper.on('slideChangeTransitionStart', stopAllPreviews);
    };
    tryHook();
})();

document.addEventListener('DOMContentLoaded', attachHoverPreviews);

// Expose for debugging if needed
window._ekolVideo = { playInModal, stopAllPreviews }; 