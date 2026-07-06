/* ============================================================
   SNAB'S — Flash Sale floating widget
   Manifesto geçildikten sonra görünür; footer yakınında gizlenir.
   ============================================================ */
(function () {
  "use strict";

  var STORAGE_KEY = "snabs-flash-sale-dismissed";
  var ITEMS = [
    {
      name: "Çilek Dilimleri · 3'lü Paket",
      img: "assets/cilek.png",
      alt: "Snab's Çilek Dilimleri",
      flavor: "cilek",
      oldPrice: 89,
      price: 71,
      discount: 17,
      pack: 3,
    },
    {
      name: "Mango Dilimleri · 3'lü Paket",
      img: "assets/mango.png",
      alt: "Snab's Mango Dilimleri",
      flavor: "mango",
      oldPrice: 89,
      price: 75,
      discount: 16,
      pack: 3,
    },
    {
      name: "Meyveli Jelibon · 3'lü Paket",
      img: "assets/jelibon.png",
      alt: "Snab's Meyveli Jelibon",
      flavor: "jelibon",
      oldPrice: 79,
      price: 65,
      discount: 18,
      pack: 3,
    },
  ];

  var widget = document.getElementById("flashSaleWidget");
  var trigger = document.getElementById("flashSaleTrigger");
  if (!widget || !trigger) return;

  if (sessionStorage.getItem(STORAGE_KEY) === "1") {
    widget.classList.add("is-hidden-user");
    return;
  }

  var card = widget.querySelector(".fs-deal-card");
  var thumb = widget.querySelector(".fs-thumb");
  var nameEl = widget.querySelector(".fs-name");
  var oldPriceEl = widget.querySelector(".fs-old-price");
  var discountEl = widget.querySelector(".fs-discount");
  var priceEl = widget.querySelector(".fs-price");
  var addBtn = widget.querySelector(".fs-add");
  var dotsWrap = widget.querySelector(".fs-dots");
  var prevBtn = widget.querySelector(".fs-prev");
  var nextBtn = widget.querySelector(".fs-next");
  var closeBtn = widget.querySelector(".fs-close");
  var footer = document.querySelector(".site-footer");

  var index = 0;
  var wantShow = false;
  var nearFooter = false;
  var dotBtns = [];

  function formatPrice(n) {
    return "₺" + n;
  }

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    dotBtns = ITEMS.map(function (item, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "fs-dot" + (i === 0 ? " is-active" : "");
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-label", item.name);
      btn.setAttribute("aria-selected", i === 0 ? "true" : "false");
      btn.addEventListener("click", function () {
        goTo(i);
      });
      dotsWrap.appendChild(btn);
      return btn;
    });
  }

  function renderSlide(i) {
    var item = ITEMS[i];
    if (!item) return;

    if (card) card.setAttribute("data-flavor", item.flavor);
    if (thumb) {
      thumb.src = item.img;
      thumb.alt = item.alt;
    }
    if (nameEl) nameEl.textContent = item.name;
    if (oldPriceEl) oldPriceEl.textContent = formatPrice(item.oldPrice);
    if (discountEl) discountEl.textContent = "-" + item.discount + "%";
    if (priceEl) priceEl.textContent = formatPrice(item.price);
    if (addBtn) addBtn.setAttribute("data-price", String(item.price));

    dotBtns.forEach(function (dot, di) {
      var active = di === i;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-selected", active ? "true" : "false");
    });

    if (prevBtn) prevBtn.disabled = ITEMS.length <= 1;
    if (nextBtn) nextBtn.disabled = ITEMS.length <= 1;
  }

  function updateVisibility() {
    var show = wantShow && !nearFooter;
    widget.classList.toggle("is-visible", show);
    widget.setAttribute("aria-hidden", show ? "false" : "true");
    if (show) {
      widget.removeAttribute("inert");
    } else {
      widget.setAttribute("inert", "");
    }
  }

  function goTo(i) {
    index = (i + ITEMS.length) % ITEMS.length;
    renderSlide(index);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      goTo(index - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      goTo(index + 1);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      sessionStorage.setItem(STORAGE_KEY, "1");
      widget.classList.remove("is-visible");
      widget.classList.add("is-hidden-user");
      widget.setAttribute("aria-hidden", "true");
      widget.setAttribute("inert", "");
    });
  }

  buildDots();
  renderSlide(0);

  if ("IntersectionObserver" in window) {
    var triggerIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          wantShow = !en.isIntersecting && en.boundingClientRect.top < 0;
          updateVisibility();
        });
      },
      { threshold: 0 }
    );
    triggerIo.observe(trigger);

    if (footer) {
      var footerIo = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (en) {
            nearFooter = en.isIntersecting;
            updateVisibility();
          });
        },
        { threshold: 0, rootMargin: "0px 0px 80px 0px" }
      );
      footerIo.observe(footer);
    }
  } else {
    window.addEventListener(
      "scroll",
      function () {
        var rect = trigger.getBoundingClientRect();
        wantShow = rect.bottom < 0;
        updateVisibility();
      },
      { passive: true }
    );
  }
})();
