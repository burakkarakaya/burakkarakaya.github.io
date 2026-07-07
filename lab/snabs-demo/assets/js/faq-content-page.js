/* ── FAQ: tab switching ── */
(function () {
  var tabs = document.querySelectorAll(".fq-tab");
  var groups = document.querySelectorAll(".fq-group");
  if (!tabs.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      groups.forEach(function (g) {
        g.classList.remove("is-active");
      });

      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");

      var target = tab.getAttribute("data-tab");
      var group = document.querySelector('.fq-group[data-group="' + target + '"]');
      if (group) group.classList.add("is-active");
    });
  });
})();

/* ── FAQ: accordion toggle ── */
(function () {
  var questions = document.querySelectorAll(".fq-question");
  if (!questions.length) return;

  questions.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".fq-item");
      var isOpen = item.classList.contains("is-open");

      item.parentElement.querySelectorAll(".fq-item.is-open").forEach(function (other) {
        other.classList.remove("is-open");
        other.querySelector(".fq-question").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
})();

/* ── FAQ: sticky tab bar tracks header visibility ── */
(function () {
  var header = document.getElementById("site-header");
  var bar = document.querySelector(".fq-tabs-bar");
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
