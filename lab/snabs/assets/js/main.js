/* ── Header: scroll effect + menu/cart toggle ── */
(function () {
  var header = document.getElementById("site-header");
  var menuBtn = document.getElementById("menuToggle");
  var navOverlay = document.getElementById("navOverlay");
  var navClose = document.getElementById("navClose");
  var cartBtn = document.getElementById("cartToggle");
  var cartPanel = document.getElementById("cartPanel");
  var cartClose = document.getElementById("cartClose");
  var backdrop = document.getElementById("overlayBackdrop");

  var lastScrollY = 0;
  var scrollThreshold = 120;

  window.addEventListener(
    "scroll",
    function () {
      var currentScrollY = window.scrollY;

      if (
        navOverlay.classList.contains("is-open") ||
        cartPanel.classList.contains("is-open")
      ) {
        header.classList.remove("hdr-hidden");
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY <= scrollThreshold) {
        header.classList.remove("hdr-hidden");
      } else if (currentScrollY > lastScrollY + 4) {
        header.classList.add("hdr-hidden");
      } else if (currentScrollY < lastScrollY - 4) {
        header.classList.remove("hdr-hidden");
      }

      lastScrollY = currentScrollY;
    },
    { passive: true },
  );

  function setPanelHidden(el, hidden) {
    if (!el) return;
    el.setAttribute("aria-hidden", hidden ? "true" : "false");
    if (hidden) {
      el.setAttribute("inert", "");
    } else {
      el.removeAttribute("inert");
    }
  }

  function lockScroll() {
    document.body.style.overflow = "hidden";
  }
  function unlockScroll() {
    if (
      !navOverlay.classList.contains("is-open") &&
      !cartPanel.classList.contains("is-open")
    ) {
      document.body.style.overflow = "";
    }
  }

  function openMenu() {
    navOverlay.classList.add("is-open");
    setPanelHidden(navOverlay, false);
    menuBtn.classList.add("is-open");
    menuBtn.setAttribute("aria-expanded", "true");
    backdrop.classList.add("is-visible");
    lockScroll();
  }
  function closeMenu() {
    navOverlay.classList.remove("is-open");
    setPanelHidden(navOverlay, true);
    menuBtn.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    if (!cartPanel.classList.contains("is-open")) {
      backdrop.classList.remove("is-visible");
    }
    unlockScroll();
  }

  function openCart() {
    cartPanel.classList.add("is-open");
    setPanelHidden(cartPanel, false);
    cartBtn.classList.add("is-open");
    cartBtn.setAttribute("aria-expanded", "true");
    backdrop.classList.add("is-visible");
    lockScroll();
  }
  function closeCart() {
    cartPanel.classList.remove("is-open");
    setPanelHidden(cartPanel, true);
    cartBtn.classList.remove("is-open");
    cartBtn.setAttribute("aria-expanded", "false");
    if (!navOverlay.classList.contains("is-open")) {
      backdrop.classList.remove("is-visible");
    }
    unlockScroll();
  }

  setPanelHidden(navOverlay, true);
  setPanelHidden(cartPanel, true);

  menuBtn.addEventListener("click", function () {
    if (navOverlay.classList.contains("is-open")) {
      closeMenu();
    } else {
      closeCart();
      openMenu();
    }
  });
  navClose.addEventListener("click", closeMenu);

  cartBtn.addEventListener("click", function () {
    if (cartPanel.classList.contains("is-open")) {
      closeCart();
    } else {
      closeMenu();
      openCart();
    }
  });
  cartClose.addEventListener("click", closeCart);

  backdrop.addEventListener("click", function () {
    closeMenu();
    closeCart();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMenu();
      closeCart();
    }
  });

  document.querySelectorAll(".nav-link").forEach(function (el) {
    el.addEventListener("click", closeMenu);
  });
})();

/* ── Hero slider ── */
(function () {
  var hero = document.querySelector(".hero");
  if (!hero) return;
  var slides = Array.from(hero.querySelectorAll(".slide"));
  var dots = Array.from(hero.querySelectorAll(".sdot"));
  var prev = hero.querySelector(".nav-prev");
  var next = hero.querySelector(".nav-next");
  var cur = 0;
  var timer;

  function triggerBurst(slide) {
    var fruits = slide.querySelectorAll(".bf");
    fruits.forEach(function (bf) {
      bf.style.animationName = "none";
    });
    slide.offsetHeight; /* force reflow */
    fruits.forEach(function (bf) {
      bf.style.animationName = "";
    });
  }

  function goTo(n) {
    slides[cur].classList.remove("is-active");
    dots[cur].classList.remove("is-active");
    dots[cur].setAttribute("aria-selected", "false");

    cur = ((n % slides.length) + slides.length) % slides.length;

    slides[cur].classList.add("is-active");
    dots[cur].classList.add("is-active");
    dots[cur].setAttribute("aria-selected", "true");

    hero.classList.toggle("hero-dark", cur === 1);

    triggerBurst(slides[cur]);
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(function () {
      goTo(cur + 1);
    }, 5000);
  }

  prev.addEventListener("click", function () {
    goTo(cur - 1);
    resetTimer();
  });
  next.addEventListener("click", function () {
    goTo(cur + 1);
    resetTimer();
  });
  dots.forEach(function (d, i) {
    d.addEventListener("click", function () {
      goTo(i);
      resetTimer();
    });
  });

  hero.addEventListener("keydown", function (e) {
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
  hero.addEventListener(
    "touchstart",
    function (e) {
      touchX = e.touches[0].clientX;
    },
    { passive: true },
  );
  hero.addEventListener(
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

  triggerBurst(slides[0]);
  resetTimer();
})();

/* ── Social marquee: seamless loop via cloned items ── */
(function () {
  var track = document.querySelector(".social-track");
  if (!track) return;
  Array.from(track.children).forEach(function (item) {
    var clone = item.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });
})();

/* ── Footer fruit animation ── */
(function () {
  var footer = document.querySelector(".site-footer");
  if (!footer) return;

  var fruits = Array.prototype.slice.call(footer.querySelectorAll(".ft-fruit"));
  var activated = false;

  function randomiseFruit(el) {
    var left = (5 + Math.random() * 82).toFixed(1);
    var drift = (Math.random() * 9 - 4.5).toFixed(2);
    el.style.left = left + "%";
    el.style.setProperty("--ft-drift", drift + "vw");
  }

  function initFruits() {
    fruits.forEach(function (el) {
      randomiseFruit(el);
      el.addEventListener("animationiteration", function () {
        randomiseFruit(el);
      });
    });
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (!activated) {
            footer.classList.add("ft-active");
            initFruits();
            activated = true;
          }
          footer.classList.add("ft-visible");
        } else {
          footer.classList.remove("ft-visible");
        }
      });
    },
    { threshold: 0.08 },
  );

  io.observe(footer);
})();

/* ── Flavor card: mobile touch toggle ── */
(function () {
  var isTouchDevice = window.matchMedia("(hover: none)").matches;
  if (!isTouchDevice) return;

  var cards = Array.from(document.querySelectorAll(".flavor-card"));

  cards.forEach(function (card) {
    card.addEventListener("click", function (e) {
      var isOpen = card.classList.contains("is-active");

      if (
        isOpen &&
        (e.target.closest(".fc-add-btn") ||
          e.target.closest(".fc-qty-select"))
      )
        return;

      cards.forEach(function (c) {
        c.classList.remove("is-active");
      });

      if (!isOpen) {
        card.classList.add("is-active");
        e.stopPropagation();
      }
    });
  });

  document.addEventListener("click", function () {
    cards.forEach(function (c) {
      c.classList.remove("is-active");
    });
  });
})();

/* ── Footer newsletter: consent checkbox enables submit ── */
(function () {
  var checkbox = document.getElementById("ft-consent");
  var submitBtn = document.getElementById("ft-nl-submit");
  if (!checkbox || !submitBtn) return;
  checkbox.addEventListener("change", function () {
    var active = checkbox.checked;
    submitBtn.disabled = !active;
    submitBtn.setAttribute("aria-disabled", String(!active));
  });
})();

/* ── Footer nav accordion (mobile only) ── */
(function () {
  var toggles = document.querySelectorAll(".ft-group-toggle");
  toggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!window.matchMedia("(max-width: 680px)").matches) return;
      var group = btn.closest(".ft-nav-group");
      var isOpen = group.classList.contains("is-open");
      group.classList.toggle("is-open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
  });
})();
