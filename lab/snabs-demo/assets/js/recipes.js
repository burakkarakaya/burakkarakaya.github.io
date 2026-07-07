/* ── Sticky filter bar: tracks header visibility ── */
(function () {
  var header = document.getElementById("site-header");
  var bar = document.querySelector(".rl-bar");
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

/* ── Hover video (desktop pointer device only) ── */
(function () {
  var isHoverDevice = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;
  if (!isHoverDevice) return;

  document.querySelectorAll(".rl-card[data-video]").forEach(function (card) {
    var src = card.dataset.video;
    if (!src) return;

    var video = card.querySelector(".rl-video");
    var img = card.querySelector(".rl-img");
    if (!video || !img) return;

    var source = video.querySelector("source");
    if (source) source.src = src;

    card.addEventListener("mouseenter", function () {
      video.load();
      video.play().catch(function () {});
      img.classList.add("rl-img-hidden");
      video.classList.add("rl-video-visible");
    });

    card.addEventListener("mouseleave", function () {
      video.pause();
      video.currentTime = 0;
      img.classList.remove("rl-img-hidden");
      video.classList.remove("rl-video-visible");
    });
  });
})();
