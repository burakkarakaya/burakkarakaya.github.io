console.clear();
/* The encoding is super important here to enable frame-by-frame scrubbing. */

// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -movflags faststart -vcodec libx264 -crf 23 -g 1 -pix_fmt yuv420p output.mp4
// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output_960.mp4

const video = document.querySelector(".video-background");
let src = video.currentSrc || video.src;
console.log(video, src);

// Performans için scroll throttling
let lastScrollTime = 0;
const scrollThrottle = 10; // ms

/* Make sure the video is 'activated' on iOS */
function once(el, event, fn, opts) {
  var onceFn = function (e) {
    el.removeEventListener(event, onceFn);
    fn.apply(this, arguments);
  };
  el.addEventListener(event, onceFn, opts);
  return onceFn;
}

once(document.documentElement, "touchstart", function (e) {
  video.play();
  video.pause();
});

/* ---------------------------------- */
/* Scroll Control! */

gsap.registerPlugin(ScrollTrigger);

// Video performansını artırmak için buffer ayarları
video.preload = "auto";
video.setAttribute("playsinline", "");
video.setAttribute("muted", "");
video.muted = true;

// ScrollTrigger smoothness ayarları
let tl = gsap.timeline({
  defaults: { 
    duration: 1, 
    ease: "linear" // En pürüzsüz geçiş için linear ease
  },
  scrollTrigger: {
    trigger: "#container",
    start: "top top",
    end: "bottom bottom",
    scrub: 2, // Daha yüksek değer daha yumuşak scroll (1'den 2'ye çıkarıldı)
    anticipatePin: 1,
    fastScrollEnd: true,
    preventOverlaps: true,
    refreshPriority: 1,
    invalidateOnRefresh: true,
    markers: false
  }
});

// Video frame kontrolü için RAF kullanımı
let rafId = null;
const updateVideoFrame = () => {
  if (rafId) {
    cancelAnimationFrame(rafId);
  }
  rafId = requestAnimationFrame(() => {
    const currentTime = Date.now();
    if (currentTime - lastScrollTime > scrollThrottle) {
      lastScrollTime = currentTime;
    }
  });
};

once(video, "loadedmetadata", () => {
  tl.fromTo(
    video,
    {
      currentTime: 0
    },
    {
      currentTime: video.duration || 1,
      ease: "linear", // Linear ease en pürüzsüz geçişi sağlar
    }
  );
});

// Video buffer optimizasyonu
video.addEventListener('loadeddata', () => {
  video.playbackRate = 1;
  video.defaultPlaybackRate = 1;
}, { once: true });

/* Gelişmiş video önbellekleme */
setTimeout(function () {
  if (window["fetch"]) {
    fetch(src, {
      priority: "high",
      cache: 'force-cache'
    })
      .then((response) => response.blob())
      .then((response) => {
        var blobURL = URL.createObjectURL(response);

        var t = video.currentTime;
        once(document.documentElement, "touchstart", function (e) {
          video.play();
          video.pause();
        });

        video.setAttribute("src", blobURL);
        video.currentTime = t + 0.01;
      });
  }
}, 500); // 1000ms'den 500ms'ye düşürüldü

// Optimize edilmiş scroll listener
window.addEventListener('scroll', () => {
  updateVideoFrame();
}, { 
  passive: true,
  capture: false 
});

// Memory cleanup
window.addEventListener('beforeunload', () => {
  if (rafId) {
    cancelAnimationFrame(rafId);
  }
});

/* ---------------------------------- */