/* ============================================================
   SNAB'S — Lazy Images (IntersectionObserver + data-src)
   Usage:
     <img data-src="photo.jpg" width="600" height="400" alt="…" />
   Auto-init: img[data-src] at DOMContentLoaded
   Manual:    SnabsLazyImages.observe(nodeList)
              SnabsLazyImages.observeAll(container)
   ============================================================ */
(function (global) {
  "use strict";

  var DEFAULTS = {
    root: null,
    rootMargin: "200px 0px",
    threshold: 0
  };

  var observer = null;

  function loadImage(img) {
    var url = img.getAttribute("data-src");
    if (!url || img.dataset.lazyLoaded) return;
    img.dataset.lazyLoaded = "1";
    img.src = url;
    img.removeAttribute("data-src");
  }

  function getObserver() {
    if (observer) return observer;
    if (!("IntersectionObserver" in global)) return null;

    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        loadImage(entry.target);
        observer.unobserve(entry.target);
      });
    }, {
      root: DEFAULTS.root,
      rootMargin: DEFAULTS.rootMargin,
      threshold: DEFAULTS.threshold
    });

    return observer;
  }

  function observe(images) {
    if (!images || !images.length) return;

    var io = getObserver();
    if (!io) {
      for (var i = 0; i < images.length; i++) {
        loadImage(images[i]);
      }
      return;
    }

    for (var j = 0; j < images.length; j++) {
      var img = images[j];
      if (!img.getAttribute("data-src") || img.dataset.lazyLoaded) continue;
      io.observe(img);
    }
  }

  function observeAll(root) {
    var scope = root || document;
    observe(scope.querySelectorAll("img[data-src]"));
  }

  global.SnabsLazyImages = {
    load: loadImage,
    observe: observe,
    observeAll: observeAll
  };

  function boot() {
    observeAll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})(typeof window !== "undefined" ? window : this);
