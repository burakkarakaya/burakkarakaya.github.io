/* ============================================================
   SNAB'S — Add-to-cart feedback (Split Pill + legacy buttons)
   ============================================================ */
(function () {
  "use strict";

  var badge = document.getElementById("cartBadge");

  function bumpBadge(qty) {
    if (!badge) return;
    var n = parseInt(badge.textContent || "0", 10) || 0;
    badge.textContent = n + qty;
    badge.classList.remove("pop");
    void badge.offsetWidth;
    badge.classList.add("pop");
  }

  function isTextCartBtn(btn) {
    if (btn.classList.contains("sp-cta")) return true;
    if (btn.classList.contains("fs-add")) return true;
    if (btn.classList.contains("rd-product-cta")) return true;
    var label = btn.querySelector(".pl-add-label");
    if (!label) return false;
    return window.getComputedStyle(label).display !== "none";
  }

  function resetCartBtn(btn, label, prevText, wasText) {
    btn.classList.remove("is-loading", "is-added", "is-icon-mode", "is-text-mode");
    delete btn.dataset.busy;
    if (wasText) {
      if (label) label.textContent = prevText;
      else btn.textContent = prevText;
    }
  }

  document.querySelectorAll(".pl-add-btn, .vpc-add").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (btn.disabled || btn.dataset.busy) return;

      var card = btn.closest(".pl-cta, .vpc-card, .pl-card, .sp-card");
      var actionRoot = btn.closest(
        ".sp-m-actions, .sp-hover, .pl-pop-row, .pl-cta-hover"
      );
      var sel =
        (actionRoot &&
          actionRoot.querySelector(".pl-qty-select, .vpc-qty")) ||
        (card && card.querySelector(".pl-qty-select, .vpc-qty"));
      var qty = sel ? parseInt(sel.value, 10) || 1 : 1;

      var label = btn.querySelector(".pl-add-label");
      var prevText = label ? label.textContent : btn.textContent.trim();
      var wasText = isTextCartBtn(btn);

      btn.dataset.busy = "1";
      btn.classList.add("is-loading");

      if (wasText) {
        btn.classList.add("is-text-mode");
        if (label) label.textContent = "Ekleniyor...";
        else btn.textContent = "Ekleniyor...";
      } else {
        btn.classList.add("is-icon-mode");
      }

      setTimeout(function () {
        btn.classList.remove("is-loading");
        btn.classList.add("is-added");

        if (wasText) {
          if (label) label.textContent = "Eklendi...";
          else btn.textContent = "Eklendi...";
        }

        bumpBadge(qty);
        if (window.cartBurstFromBtn) window.cartBurstFromBtn(btn);

        setTimeout(function () {
          resetCartBtn(btn, label, prevText, wasText);
        }, 900);
      }, 700);
    });
  });
})();
