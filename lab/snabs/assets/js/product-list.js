/* ============================================================
   SNAB'S — Product List Page JS
   ============================================================ */

/* ── Sticky filter bar: tracks header visibility ── */
(function () {
  var header = document.getElementById("site-header");
  var bar = document.querySelector(".pl-bar");
  if (!header || !bar) return;

  function syncTop() {
    bar.style.top = header.classList.contains("hdr-hidden")
      ? "0px"
      : header.offsetHeight + "px";
  }

  syncTop();

  new MutationObserver(syncTop).observe(header, {
    attributes: true,
    attributeFilter: ["class"],
  });

  window.addEventListener("resize", syncTop, { passive: true });
})();

/* ── SEO text toggle ── */
(function () {
  "use strict";

  var toggle = document.getElementById("plSeoToggle");
  var body = document.getElementById("plSeoBody");

  if (toggle && body) {
    toggle.addEventListener("click", function () {
      var expanded = body.classList.toggle("is-expanded");
      toggle.classList.toggle("is-expanded", expanded);
      toggle.setAttribute("aria-expanded", expanded);
      toggle.firstChild.textContent = expanded ? "Daha Az Göster " : "Daha Fazla Oku ";
    });
  }
})();
