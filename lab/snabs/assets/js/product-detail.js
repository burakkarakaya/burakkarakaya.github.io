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
  var mainImg = $("pdpMainImg");
  var thumbs = slice(document.querySelectorAll(".pdp-product__thumb"));
  var thumbsTrack = document.querySelector(".pdp-product__thumbs-track");

  function applyFit(img, fit) {
    if (!img) return;
    img.classList.toggle("is-contain", fit === "contain");
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

  function setGallery(i) {
    if (!productImages.length || !mainImg) return;
    galleryIndex = (i + productImages.length) % productImages.length;
    var img = productImages[galleryIndex];
    mainImg.src = img.src;
    mainImg.alt = img.alt || "";
    applyFit(mainImg, img.fit || "cover");
    thumbs.forEach(function (t, j) {
      t.classList.toggle("is-active", j === galleryIndex);
    });
  }

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
        galleryIndex = 0;
        setGallery(0);
      }

      var name = v.getAttribute("data-name");
      var price = parseInt(v.getAttribute("data-price"), 10);
      if (name && titleEl) titleEl.textContent = name;
      if (name && stickyName) stickyName.textContent = name;
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

  /* Güven kartındaki "Hemen Sepete Ekle" — doğrudan sepete ekler */
  var confidenceCta = $("pdpConfidenceCta");
  if (confidenceCta) {
    confidenceCta.addEventListener("click", function () {
      if (confidenceCta.dataset.busy) return;
      confidenceCta.dataset.busy = "1";
      var prev = confidenceCta.textContent.trim();
      confidenceCta.textContent = "Ekleniyor...";
      setTimeout(function () {
        confidenceCta.textContent = "Eklendi ✓";
        bumpBadge(qty);
        if (window.cartBurstFromBtn) window.cartBurstFromBtn(confidenceCta);
        setTimeout(function () {
          confidenceCta.textContent = prev;
          delete confidenceCta.dataset.busy;
        }, 1000);
      }, 600);
    });
  }

  /* ── Benzer lezzetler scroll ────────────────────────────── */
  var picksScroll = $("pdpPicksScroll");
  if (picksScroll && $("pdpPicksPrev") && $("pdpPicksNext")) {
    var step = 340;
    $("pdpPicksPrev").addEventListener("click", function () {
      picksScroll.scrollBy({ left: -step, behavior: "smooth" });
    });
    $("pdpPicksNext").addEventListener("click", function () {
      picksScroll.scrollBy({ left: step, behavior: "smooth" });
    });
  }

  /* ── Mobil sticky bar ───────────────────────────────────── */
  var stickybar = $("pdpStickybar");
  var stickyAdd = $("pdpStickyAdd");
  if (stickybar && addBtn && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var show = !en.isIntersecting && en.boundingClientRect.top < 0;
        stickybar.classList.toggle("is-visible", show);
        stickybar.setAttribute("aria-hidden", show ? "false" : "true");
      });
    }, { threshold: 0 });
    io.observe(addBtn);
  }
  if (stickyAdd) stickyAdd.addEventListener("click", function () { doAdd(stickyAdd); });

  syncPrices();
})();
