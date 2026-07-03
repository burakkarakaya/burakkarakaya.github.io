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

  function applyFit(img, fit) {
    if (!img) return;
    img.classList.toggle("is-contain", fit === "contain");
  }

  function rebuildMainTrack() {
    if (!mainTrack) return;
    mainTrack.innerHTML = "";
    productImages.forEach(function (img, i) {
      var slide = document.createElement("div");
      slide.className = "pdp-product__main-slide";
      slide.setAttribute("data-index", String(i));
      var im = document.createElement("img");
      im.src = img.src;
      im.alt = img.alt || "";
      im.className = "pdp-product__main-image" + (img.fit === "contain" ? " is-contain" : "");
      im.loading = i === 0 ? "eager" : "lazy";
      slide.appendChild(im);
      mainTrack.appendChild(slide);
    });
  }

  function scrollMainToIndex(i, smooth) {
    if (!mainWrap || !mainTrack || !galleryMq.matches) return;
    var slide = mainTrack.children[i];
    if (!slide) return;
    mainWrap.scrollTo({
      left: slide.offsetLeft,
      behavior: smooth ? "smooth" : "auto"
    });
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
      im.src = img.src;
      im.alt = "";
      im.loading = "lazy";
      btn.appendChild(im);
      btn.addEventListener("click", function () { setGallery(+btn.dataset.index); });
      thumbsTrack.appendChild(btn);
    });
    thumbs = slice(document.querySelectorAll(".pdp-product__thumb"));
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
    $("pdpGalleryPrev").addEventListener("click", function () { setGallery(galleryIndex - 1); });
  }
  if ($("pdpGalleryNext")) {
    $("pdpGalleryNext").addEventListener("click", function () { setGallery(galleryIndex + 1); });
  }

  thumbs.forEach(function (btn) {
    btn.addEventListener("click", function () { setGallery(+btn.dataset.index); });
  });

  /* ── Feature pills ──────────────────────────────────────── */
  slice(document.querySelectorAll(".pdp-feature-pill")).forEach(function (pill) {
    pill.addEventListener("click", function () {
      slice(document.querySelectorAll(".pdp-feature-pill")).forEach(function (p) {
        p.classList.remove("is-active");
      });
      pill.classList.add("is-active");
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
        if (vImg) stickyThumb.src = vImg.src;
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

  /* ── Benzer lezzetler scroll ────────────────────────────── */
  var picksScroll = $("pdpPicksScroll");
  if (picksScroll && $("pdpPicksPrev") && $("pdpPicksNext")) {
    var step = 452;
    $("pdpPicksPrev").addEventListener("click", function () {
      picksScroll.scrollBy({ left: -step, behavior: "smooth" });
    });
    $("pdpPicksNext").addEventListener("click", function () {
      picksScroll.scrollBy({ left: step, behavior: "smooth" });
    });
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

  galleryIndex = 0;
  applyMainImage(0, false);
  syncThumbActive();
  syncPrices();
})();
