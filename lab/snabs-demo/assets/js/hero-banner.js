/* ── Hero Banner Slider — alternate home page ── */
(function () {
  var banner = document.querySelector(".hero-banner");
  if (!banner) return;

  var slides = Array.from(banner.querySelectorAll(".hb-slide"));
  var dots = Array.from(banner.querySelectorAll(".hb-dot"));
  var prev = banner.querySelector(".hb-prev");
  var next = banner.querySelector(".hb-next");
  var cur = 0;
  var timer;
  var AUTO_MS = 6000;

  function goTo(n) {
    slides[cur].classList.remove("is-active");
    slides[cur].setAttribute("aria-hidden", "true");
    dots[cur].classList.remove("is-active");
    dots[cur].setAttribute("aria-selected", "false");

    cur = ((n % slides.length) + slides.length) % slides.length;

    slides[cur].classList.add("is-active");
    slides[cur].setAttribute("aria-hidden", "false");
    dots[cur].classList.add("is-active");
    dots[cur].setAttribute("aria-selected", "true");
  }

  function onNavClick(e, fn) {
    e.preventDefault();
    e.stopPropagation();
    fn();
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(function () {
      goTo(cur + 1);
    }, AUTO_MS);
  }

  if (prev) {
    prev.addEventListener("click", function (e) {
      onNavClick(e, function () {
        goTo(cur - 1);
      });
    });
  }

  if (next) {
    next.addEventListener("click", function (e) {
      onNavClick(e, function () {
        goTo(cur + 1);
      });
    });
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function (e) {
      onNavClick(e, function () {
        goTo(i);
      });
    });
  });

  banner.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      goTo(cur - 1);
      resetTimer();
    }
    if (e.key === "ArrowRight") {
      goTo(cur + 1);
      resetTimer();
    }
  });

  var touchX = 0;
  banner.addEventListener(
    "touchstart",
    function (e) {
      touchX = e.touches[0].clientX;
    },
    { passive: true },
  );
  banner.addEventListener(
    "touchend",
    function (e) {
      var dx = touchX - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 48) {
        goTo(cur + (dx > 0 ? 1 : -1));
        resetTimer();
      }
    },
    { passive: true },
  );

  banner.addEventListener("mouseenter", function () {
    clearInterval(timer);
  });
  banner.addEventListener("mouseleave", resetTimer);

  resetTimer();
})();
