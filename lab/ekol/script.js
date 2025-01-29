console.clear();
/* Video boyutları animasyonu */

gsap.registerPlugin(ScrollTrigger);

// Video elementini seç
const video = document.querySelector(".video-background");
let src = video.currentSrc || video.src;
console.log(video, src);

// Video başlatma için iOS çözümü
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
/* Scroll kontrolü ve boyutlandırma animasyonu */
gsap.timeline({
  scrollTrigger: {
    trigger: "#container", // Scroll trigger'ı belirle
    start: "top top",
    end: "bottom bottom",
    scrub: true, // Scrub özelliği ile scroll ile zaman uyumlu hareket
  }
})
  .fromTo(
    video, // Animasyonu video elementine uygula
    {
      scaleX: 1, // Başlangıçta video boyutu
      scaleY: 2, // Başlangıçta video boyutu (100vw x 200vh)
      width: "100vw", // Başlangıçta genişlik
      height: "200vh", // Başlangıçta yükseklik
    },
    {
      scaleX: 1, // Scroll ile en son boyut
      scaleY: 1, // Scroll ile en son boyut
      width: "100vw", // En son genişlik
      height: "100vh", // En son yükseklik
    }
  );

/* Video loop animasyonu */
once(video, "loadedmetadata", () => {
  gsap.fromTo(
    video,
    { currentTime: 0 },
    {
      currentTime: video.duration || 1,
      repeat: -1, // Sürekli döngü
      yoyo: true, // Her defasında geriye dönecek şekilde
      ease: "none", // Yavaşlatma veya hızlanma yok, sabit hızla
      duration: 0 // Bir saniyelik animasyon süresi
    }
  );
});

/* ---------------------------------- */
/* Video blob verisi */
setTimeout(function () {
  if (window["fetch"]) {
    fetch(src)
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
}, 1000);