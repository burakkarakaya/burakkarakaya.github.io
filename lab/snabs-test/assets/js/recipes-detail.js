/* ── Recipe detail: tab switching ── */
(function () {
  var tabs = document.querySelectorAll(".rd-tab");
  var panels = document.querySelectorAll(".rd-tab-panel");
  if (!tabs.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      panels.forEach(function (p) {
        p.classList.remove("is-active");
      });

      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");

      var panelId = tab.getAttribute("aria-controls");
      var panel = document.getElementById(panelId);
      if (panel) panel.classList.add("is-active");
    });
  });
})();

/* ── Recipe detail: video play/pause toggle ── */
(function () {
  var btn = document.getElementById("rdPlayBtn");
  var video = document.querySelector(".rd-media-video");
  var img = document.querySelector(".rd-media-img");
  if (!btn || !video) return;

  var playing = false;

  btn.addEventListener("click", function () {
    if (playing) {
      video.pause();
      video.classList.remove("is-playing");
      if (img) img.classList.remove("is-hidden");
      btn.classList.remove("is-playing");
      btn.setAttribute("aria-label", "Videoyu oynat");
      playing = false;
    } else {
      video.play().then(function () {
        video.classList.add("is-playing");
        if (img) img.classList.add("is-hidden");
        btn.classList.add("is-playing");
        btn.setAttribute("aria-label", "Videoyu durdur");
        playing = true;
      }).catch(function () {});
    }
  });
})();


/* ── Related recipes scroll: horizontal-scroll-nav.js (data-scroll-nav) ── */
