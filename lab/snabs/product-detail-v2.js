/* ============================================================
   SNAB'S — PRODUCT DETAIL PAGE (PDP)
   OHME hero gallery · feature pills · showcase tabs · packs
   variants · güven kartı · sticky bar · picks scroll
   ============================================================ */
(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };
  var slice = function (nl) { return Array.prototype.slice.call(nl); };

  /* ── Galeri ─────────────────────────────────────────────── */
  var productImages = [
    { src: "assets/mango.png", fit: "contain", alt: "Snab's Mango Dilimleri paketi" },
    { src: "assets/images/gallery/mango-detail-gallery-02.png", fit: "cover", alt: "Mango dilimleri yakın çekim" },
    { src: "assets/images/gallery/mango-detail-gallery-03.png", fit: "cover", alt: "Dondurularak kurutulmuş mango dokusu" },
    { src: "assets/images/gallery/mango-detail-gallery-04.png", fit: "cover", alt: "Mango kullanım" },
    { src: "assets/images/gallery/mango-detail-gallery-05.png", fit: "cover", alt: "Mango lifestyle" }
  ];

  var galleryIndex = 0;
  var mainWrap = $("pdpMainWrap");
  var mainTrack = $("pdpMainTrack");
  var mainImg = $("pdpMainImg");
  var thumbs = slice(document.querySelectorAll(".pdp-product__thumb"));
  var thumbsTrack = document.querySelector(".pdp-product__thumbs-track");
  var galleryMq = window.matchMedia("(max-width: 899px)");

  var THUMB_DIR = "assets/images/gallery/thumbs/";

  function galleryThumbSrc(src) {
    if (!src) return src;
    if (src === "assets/mango.png") return THUMB_DIR + "mango-pack.png";
    if (src === "assets/cilek.png") return THUMB_DIR + "cilek-pack.png";
    var prefix = "assets/images/gallery/";
    if (src.indexOf(prefix) === 0) {
      return THUMB_DIR + src.slice(prefix.length);
    }
    return src;
  }

  function applyFit(img, fit) {
    if (!img) return;
    img.classList.toggle("is-contain", fit === "contain");
  }

  function imgDimsForFit(fit) {
    return fit === "contain" ? { w: 800, h: 800 } : { w: 1200, h: 900 };
  }

  function applyImgHints(im, opts) {
    opts = opts || {};
    var dims =
      opts.w != null && opts.h != null
        ? { w: opts.w, h: opts.h }
        : imgDimsForFit(opts.fit || "cover");
    im.width = dims.w;
    im.height = dims.h;
    im.decoding = "async";
    if (opts.loading) im.loading = opts.loading;
    if (opts.fetchPriority === "high") {
      im.setAttribute("fetchpriority", "high");
    } else {
      im.removeAttribute("fetchpriority");
    }
  }

  function lazyObserve(root) {
    if (!root || !window.SnabsLazyImages) return;
    window.SnabsLazyImages.observe(root.querySelectorAll("img[data-src]"));
  }

  function rebuildMainTrack() {
    if (!mainTrack) return;
    mainTrack.innerHTML = "";
    productImages.forEach(function (img, i) {
      var slide = document.createElement("div");
      slide.className = "pdp-product__main-slide";
      slide.setAttribute("data-index", String(i));
      var im = document.createElement("img");
      im.alt = img.alt || "";
      im.className = "pdp-product__main-image" + (img.fit === "contain" ? " is-contain" : "");
      if (i === 0) {
        im.src = img.src;
        applyImgHints(im, {
          fit: img.fit,
          loading: "eager",
          fetchPriority: "high"
        });
      } else {
        im.setAttribute("data-src", img.src);
        applyImgHints(im, { fit: img.fit });
      }
      slide.appendChild(im);
      mainTrack.appendChild(slide);
    });
    lazyObserve(mainTrack);
  }

  function scrollMainToIndex(i, smooth) {
    if (!mainWrap || !mainTrack || !galleryMq.matches) return;
    var slide = mainTrack.children[i];
    if (!slide) return;
    mainWrap.scrollTo({
      left: slide.offsetLeft,
      behavior: smooth ? "smooth" : "auto"
    });
    clampScrollLeft(mainWrap);
  }

  function clampScrollLeft(el) {
    if (!el) return;
    var max = Math.max(0, el.scrollWidth - el.clientWidth);
    if (el.scrollLeft > max) el.scrollLeft = max;
    if (el.scrollLeft < 0) el.scrollLeft = 0;
  }

  var galleryNavLock = false;

  function goGallery(delta) {
    if (galleryNavLock) return;
    setGallery(galleryIndex + delta);
    if (!galleryMq.matches) return;
    galleryNavLock = true;
    setTimeout(function () {
      galleryNavLock = false;
      clampScrollLeft(mainWrap);
    }, 380);
  }

  function syncThumbActive() {
    thumbs.forEach(function (t, j) {
      t.classList.toggle("is-active", j === galleryIndex);
    });
    var active = thumbs[galleryIndex];
    if (active) {
      active.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
    }
  }

  function applyMainImage(i, smooth) {
    var img = productImages[i];
    if (!img) return;
    if (galleryMq.matches && mainTrack) {
      if (!mainTrack.children.length) rebuildMainTrack();
      scrollMainToIndex(i, smooth !== false);
    } else if (mainImg) {
      mainImg.src = img.src;
      mainImg.alt = img.alt || "";
      applyFit(mainImg, img.fit || "cover");
      applyImgHints(mainImg, {
        fit: img.fit,
        loading: i === 0 ? "eager" : undefined,
        fetchPriority: i === 0 ? "high" : null
      });
    }
  }

  function rebuildThumbsFromImages() {
    if (!thumbsTrack) return;
    thumbsTrack.innerHTML = "";
    productImages.forEach(function (img, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pdp-product__thumb" + (i === 0 ? " is-active" : "");
      btn.setAttribute("data-index", String(i));
      btn.setAttribute("data-fit", img.fit || "cover");
      btn.setAttribute("aria-label", img.alt || "Görsel " + (i + 1));
      var im = document.createElement("img");
      im.alt = "";
      if (i === 0) {
        im.src = galleryThumbSrc(img.src);
        applyImgHints(im, { w: 72, h: 72, loading: "eager" });
      } else {
        im.setAttribute("data-src", galleryThumbSrc(img.src));
        applyImgHints(im, { w: 72, h: 72 });
      }
      btn.appendChild(im);
      btn.addEventListener("click", function () { setGallery(+btn.dataset.index); });
      thumbsTrack.appendChild(btn);
    });
    thumbs = slice(document.querySelectorAll(".pdp-product__thumb"));
    lazyObserve(thumbsTrack);
  }

  function setGallery(i, fromScroll) {
    if (!productImages.length) return;
    galleryIndex = (i + productImages.length) % productImages.length;
    if (!fromScroll) applyMainImage(galleryIndex);
    syncThumbActive();
  }

  if (mainWrap) {
    var scrollTick = false;
    mainWrap.addEventListener("scroll", function () {
      if (!galleryMq.matches || scrollTick) return;
      scrollTick = true;
      requestAnimationFrame(function () {
        scrollTick = false;
        if (!mainWrap) return;
        var w = mainWrap.clientWidth;
        if (!w) return;
        var i = Math.round(mainWrap.scrollLeft / w);
        i = Math.max(0, Math.min(i, productImages.length - 1));
        if (i !== galleryIndex) setGallery(i, true);
      });
    }, { passive: true });
  }

  rebuildMainTrack();

  if ($("pdpGalleryPrev")) {
    $("pdpGalleryPrev").addEventListener("click", function () { goGallery(-1); });
  }
  if ($("pdpGalleryNext")) {
    $("pdpGalleryNext").addEventListener("click", function () { goGallery(1); });
  }

  thumbs.forEach(function (btn) {
    btn.addEventListener("click", function () { setGallery(+btn.dataset.index); });
  });

  /* ── Feature pills ──────────────────────────────────────── */
  slice(document.querySelectorAll(".pdp-feature-pill")).forEach(function (pill) {
    pill.addEventListener("click", function () {
      slice(document.querySelectorAll(".pdp-feature-pill")).forEach(function (p) {
        p.classList.remove("is-active");
        p.setAttribute("aria-pressed", "false");
      });
      pill.classList.add("is-active");
      pill.setAttribute("aria-pressed", "true");
    });
  });

  /* ── Sekmeli ürün hikayesi (showcase) tabs ──────────────── */
  slice(document.querySelectorAll("[data-showcase-tab]")).forEach(function (tab) {
    tab.addEventListener("click", function () {
      var id = tab.getAttribute("data-showcase-tab");
      slice(document.querySelectorAll("[data-showcase-tab]")).forEach(function (t) {
        var on = t === tab;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });
      slice(document.querySelectorAll("[data-showcase-panel]")).forEach(function (p) {
        p.classList.toggle("is-active", p.getAttribute("data-showcase-panel") === id);
      });
      var activePanel = document.querySelector(".pdp-showcase__panel.is-active");
      lazyObserve(activePanel);
    });
  });

  /* ── Paket seçici + adet + fiyat ────────────────────────── */
  var packs = slice(document.querySelectorAll(".pdp-pack"));
  var addPrice = $("pdpAddPrice");
  var addBtn = $("pdpAddBtn");
  var addLabel = $("pdpAddLabel");
  var qtyVal = $("pdpQtyVal");
  var qtyMinus = $("pdpQtyMinus");
  var qtyPlus = $("pdpQtyPlus");
  var stickyPrice = $("pdpStickyPrice");
  var stickyName = $("pdpStickyName");
  var stickyThumb = $("pdpStickyThumb");
  var titleEl = $("pdpTitle");
  var qty = 1;
  var packPrice = 89;

  function syncPrices() {
    var total = packPrice * qty;
    if (addPrice) addPrice.textContent = "₺" + total;
    if (addBtn) addBtn.setAttribute("data-price", String(packPrice));
    if (stickyPrice) stickyPrice.textContent = "₺" + total;
  }

  function selectPack(pack) {
    packs.forEach(function (p) {
      var on = p === pack;
      p.classList.toggle("is-selected", on);
      var input = p.querySelector("input");
      if (input) input.checked = on;
    });
    packPrice = parseInt(pack.getAttribute("data-price"), 10) || 89;
    syncPrices();
  }

  packs.forEach(function (pack) {
    pack.addEventListener("click", function () { selectPack(pack); });
  });

  if (qtyMinus && qtyPlus && qtyVal) {
    qtyMinus.addEventListener("click", function () {
      if (qty > 1) { qty--; qtyVal.textContent = qty; syncPrices(); }
    });
    qtyPlus.addEventListener("click", function () {
      if (qty < 99) { qty++; qtyVal.textContent = qty; syncPrices(); }
    });
  }

  /* ── Varyant → galeri + başlık + fiyat ──────────────────── */
  slice(document.querySelectorAll(".pdp-variant")).forEach(function (v) {
    v.addEventListener("click", function () {
      slice(document.querySelectorAll(".pdp-variant")).forEach(function (x) {
        x.classList.remove("is-active");
      });
      v.classList.add("is-active");

      var raw = v.getAttribute("data-images");
      if (raw) {
        try {
          productImages = JSON.parse(raw);
        } catch (e) {
          productImages = [];
        }
        rebuildThumbsFromImages();
        rebuildMainTrack();
        galleryIndex = 0;
        applyMainImage(0, false);
        syncThumbActive();
      }

      var name = v.getAttribute("data-name");
      var price = parseInt(v.getAttribute("data-price"), 10);
      if (name && titleEl) titleEl.textContent = name;
      if (name && stickyName) stickyName.textContent = name;
      if (stickyThumb) {
        var vImg = v.querySelector("img");
        if (vImg) {
          stickyThumb.src = vImg.src || vImg.getAttribute("data-src") || "";
        }
      }
      if (!isNaN(price) && packs[0]) {
        packs[0].setAttribute("data-price", String(price));
        var pp = packs[0].querySelector(".pdp-pack-price");
        if (pp) pp.textContent = "₺" + price;
        selectPack(packs[0]);
      }
    });
  });

  /* ── Sepete ekle ────────────────────────────────────────── */
  var badge = $("cartBadge");

  function bumpBadge(n) {
    if (!badge) return;
    var cur = parseInt(badge.textContent || "0", 10) || 0;
    badge.textContent = cur + n;
    badge.classList.remove("pop");
    void badge.offsetWidth;
    badge.classList.add("pop");
  }

  function doAdd(sourceBtn) {
    if (!addBtn || addBtn.dataset.busy) return;
    addBtn.dataset.busy = "1";
    var prev = addLabel ? addLabel.textContent : "Sepete Ekle";
    if (addLabel) addLabel.textContent = "Ekleniyor...";
    setTimeout(function () {
      if (addLabel) addLabel.textContent = "Eklendi ✓";
      bumpBadge(qty);
      if (window.cartBurstFromBtn) window.cartBurstFromBtn(sourceBtn || addBtn);
      setTimeout(function () {
        if (addLabel) addLabel.textContent = prev;
        delete addBtn.dataset.busy;
      }, 1000);
    }, 600);
  }

  if (addBtn) addBtn.addEventListener("click", function () { doAdd(addBtn); });

  /* Basit metin butonları (güven kartı + sticky) — kendi "Ekleniyor/Eklendi" geri bildirimi */
  function addToCartSimple(btn) {
    if (!btn || btn.dataset.busy) return;
    btn.dataset.busy = "1";
    var prev = btn.textContent.trim();
    btn.textContent = "Ekleniyor...";
    setTimeout(function () {
      btn.textContent = "Eklendi ✓";
      bumpBadge(qty);
      if (window.cartBurstFromBtn) window.cartBurstFromBtn(btn);
      setTimeout(function () {
        btn.textContent = prev;
        delete btn.dataset.busy;
      }, 1000);
    }, 600);
  }

  /* Güven kartındaki "Hemen Sepete Ekle" — doğrudan sepete ekler */
  var confidenceCta = $("pdpConfidenceCta");
  if (confidenceCta) {
    confidenceCta.addEventListener("click", function () { addToCartSimple(confidenceCta); });
  }

  /* ── Sticky bar — CTA kaybolunca göster, footer yaklaşınca gizle ── */
  var stickybar = $("pdpStickybar");
  var stickyAdd = $("pdpStickyAdd");
  var siteFooter = document.querySelector(".site-footer");
  var stickyWantShow = false;
  var stickyNearFooter = false;

  function updateStickyBar() {
    if (!stickybar) return;
    var show = stickyWantShow && !stickyNearFooter;
    stickybar.classList.toggle("is-visible", show);
    stickybar.setAttribute("aria-hidden", show ? "false" : "true");
    if (show) {
      stickybar.removeAttribute("inert");
    } else {
      stickybar.setAttribute("inert", "");
    }
  }

  if (stickybar && addBtn && "IntersectionObserver" in window) {
    var ctaIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        stickyWantShow = !en.isIntersecting && en.boundingClientRect.top < 0;
        updateStickyBar();
      });
    }, { threshold: 0 });
    ctaIo.observe(addBtn);

    if (siteFooter) {
      var footerIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          stickyNearFooter = en.isIntersecting;
          updateStickyBar();
        });
      }, {
        threshold: 0,
        /* Footer ekrana girmeden ~80px önce bar kaybolsun */
        rootMargin: "0px 0px 80px 0px"
      });
      footerIo.observe(siteFooter);
    }
  }
  if (stickyAdd) stickyAdd.addEventListener("click", function () { addToCartSimple(stickyAdd); });
  updateStickyBar();

  /* ── SSS accordion (below-fold; faq-content-page.js yerine) ── */
  slice(document.querySelectorAll(".fq-question")).forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".fq-item");
      if (!item || !item.parentElement) return;
      var isOpen = item.classList.contains("is-open");

      item.parentElement.querySelectorAll(".fq-item.is-open").forEach(function (other) {
        other.classList.remove("is-open");
        var q = other.querySelector(".fq-question");
        if (q) q.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ── Social marquee: CSS transform IO'yu yanıltır — bölüm görününce hepsini yükle ── */
  var socialSection = document.getElementById("social");
  if (socialSection && window.SnabsLazyImages) {
    function loadSocialImages() {
      socialSection.querySelectorAll("img[data-src]").forEach(function (img) {
        window.SnabsLazyImages.load(img);
      });
    }
    if ("IntersectionObserver" in window) {
      var socialIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          loadSocialImages();
          socialIo.disconnect();
        });
      }, { rootMargin: "300px 0px", threshold: 0 });
      socialIo.observe(socialSection);
    } else {
      loadSocialImages();
    }
  }

  galleryIndex = 0;
  applyMainImage(0, false);
  syncThumbActive();
  syncPrices();
})();
