(function () {
  "use strict";

  var canvas = document.getElementById("nfCanvas");
  if (!canvas) return;

  var ctx = canvas.getContext("2d");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  var FRUIT_SRC = [
    "assets/mango.png",
    "assets/cilek.png",
    "assets/images/fruits/mango-accent-graphic-1.png",
    "assets/images/fruits/mango-accent-graphic-2.png",
    "assets/images/fruits/strawberry-accent-graphic-4.png",
    "assets/images/fruits/banana-accent-graphic-2.png",
    "assets/images/fruits/banana-accent-graphic-3.png",
    "assets/images/fruits/pineapple-accent-graphic-2.png",
    "assets/images/fruits/blueberry-accent-graphic-4.png",
    "assets/images/fruits/blackberry-accent-graphic-3.png",
  ];

  var images = [];
  var loaded = 0;
  var particles = [];
  var width = 0;
  var height = 0;
  var rafId = 0;
  var maxParticles = reducedMotion ? 18 : 42;

  function loadImages(cb) {
    if (!FRUIT_SRC.length) {
      cb();
      return;
    }

    FRUIT_SRC.forEach(function (src) {
      var img = new Image();
      img.decoding = "async";
      img.onload = img.onerror = function () {
        loaded += 1;
        if (loaded === FRUIT_SRC.length) cb();
      };
      img.src = src;
      images.push(img);
    });
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function pickImage() {
    return images[Math.floor(Math.random() * images.length)];
  }

  function spawnParticle(fromTop) {
    var img = pickImage();
    if (!img || !img.complete || !img.naturalWidth) return null;

    var size = rand(28, reducedMotion ? 52 : 72);
    var aspect = img.naturalHeight / img.naturalWidth;
    var w = size;
    var h = size * aspect;

    return {
      img: img,
      x: rand(-w * 0.2, width + w * 0.2),
      y: fromTop ? rand(-h * 2, -h * 0.2) : rand(-h, height * 0.4),
      w: w,
      h: h,
      rot: rand(0, Math.PI * 2),
      rotSpeed: rand(-0.02, 0.02),
      vy: rand(0.6, reducedMotion ? 1.2 : 2.4),
      vx: rand(-0.35, 0.35),
      opacity: rand(0.55, 0.95),
    };
  }

  function fillParticles() {
    particles = [];
    var count = reducedMotion ? 14 : maxParticles;
    for (var i = 0; i < count; i += 1) {
      var p = spawnParticle(false);
      if (p) particles.push(p);
    }
  }

  function drawParticle(p) {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
    ctx.rotate(p.rot);
    ctx.drawImage(p.img, -p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  }

  function tick() {
    ctx.clearRect(0, 0, width, height);

    for (var i = 0; i < particles.length; i += 1) {
      var p = particles[i];

      if (!reducedMotion) {
        p.y += p.vy;
        p.x += p.vx;
        p.rot += p.rotSpeed;
        p.vy += 0.012;
      }

      drawParticle(p);

      if (p.y > height + p.h * 1.5) {
        var next = spawnParticle(true);
        if (next) particles[i] = next;
      }
    }

    if (!reducedMotion) {
      if (Math.random() < 0.04 && particles.length < maxParticles) {
        var extra = spawnParticle(true);
        if (extra) particles.push(extra);
      }
      rafId = requestAnimationFrame(tick);
    }
  }

  function start() {
    resize();
    fillParticles();
    tick();

    if (reducedMotion) {
      window.addEventListener(
        "resize",
        function () {
          resize();
          fillParticles();
          tick();
        },
        { passive: true }
      );
      return;
    }

    window.addEventListener(
      "resize",
      function () {
        resize();
      },
      { passive: true }
    );
  }

  loadImages(start);
})();
