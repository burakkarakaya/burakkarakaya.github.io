(function () {
  var MIX_ASSETS = [
    "assets/images/fruits/strawberry-accent-graphic-4.png",
    "assets/images/fruits/mango-accent-graphic-1.png",
    "assets/images/fruits/mango-accent-graphic-2.png",
    "assets/images/fruits/banana-accent-graphic-2.png",
    "assets/images/fruits/banana-accent-graphic-3.png",
    "assets/images/fruits/pineapple-accent-graphic-2.png",
    "assets/images/fruits/blueberry-accent-graphic-4.png",
    "assets/images/fruits/blackberry-accent-graphic-3.png",
  ];

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.cartBurstFromBtn = function (btn) {
    if (reducedMotion || !btn) return;

    var rect = btn.getBoundingClientRect();
    var isMobile = window.innerWidth < 640;
    var count = isMobile ? 4 : 6;
    var maxDist = isMobile ? 68 : 108;

    var host = document.createElement("div");
    host.className = "cart-burst";
    host.setAttribute("aria-hidden", "true");
    host.style.left = rect.left + rect.width / 2 + "px";
    host.style.top = rect.top + rect.height / 2 + "px";
    document.body.appendChild(host);

    var maxDuration = 0;

    for (var i = 0; i < count; i++) {
      var angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.55;
      var dist = maxDist * (0.62 + Math.random() * 0.48);
      var bx = Math.cos(angle) * dist;
      var by = Math.sin(angle) * dist - (isMobile ? 6 : 10);
      var rot = (Math.random() - 0.5) * 90;
      var size = (isMobile ? 18 : 22) + Math.random() * (isMobile ? 10 : 14);
      var delay = Math.round(Math.random() * 70);
      var duration = isMobile ? 680 : 760;

      maxDuration = Math.max(maxDuration, delay + duration);

      var bit = document.createElement("span");
      bit.className = "cart-burst__bit";
      bit.style.setProperty("--bx", bx.toFixed(1) + "px");
      bit.style.setProperty("--by", by.toFixed(1) + "px");
      bit.style.setProperty("--rot", rot.toFixed(1) + "deg");
      bit.style.setProperty("--size", size.toFixed(0) + "px");
      bit.style.setProperty("--delay", delay + "ms");
      bit.style.setProperty("--dur", duration + "ms");

      var img = document.createElement("img");
      img.src = MIX_ASSETS[Math.floor(Math.random() * MIX_ASSETS.length)];
      img.alt = "";
      img.decoding = "async";
      img.draggable = false;
      bit.appendChild(img);
      host.appendChild(bit);
    }

    window.setTimeout(function () {
      if (host.parentNode) host.parentNode.removeChild(host);
    }, maxDuration + 80);
  };
})();
