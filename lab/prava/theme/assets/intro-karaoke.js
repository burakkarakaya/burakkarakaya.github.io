(function () {
  var root = document.getElementById('intro-karaoke-root');
  var section = document.getElementById('intro-karaoke-section');
  if (!root || !section || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof SplitText === 'undefined') return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger, SplitText);

  var split;
  var karaokeTrigger;
  var DIM = '#a3a3a3';
  var LIT = '#171717';

  function applyKaraoke(progress, chars) {
    var n = chars.length;
    if (!n) return;
    var p = gsap.utils.clamp(0, 1, progress);
    for (var i = 0; i < n; i++) {
      var start = i / n;
      var seg = 1 / n;
      var w = (p - start) / seg;
      w = gsap.utils.clamp(0, 1, w);
      var el = chars[i];
      el.style.opacity = String(0.3 + 0.7 * w);
      el.style.color = w > 0.45 ? LIT : DIM;
    }
  }

  function setup() {
    if (split && split.revert) split.revert();
    if (karaokeTrigger) karaokeTrigger.kill();

    // Kelime bütünlüğü bozulmasın diye words+chars birlikte split ediyoruz.
    split = SplitText.create('#intro-karaoke-root', {
      type: 'words,chars',
      wordsClass: 'word',
      charsClass: 'char',
    });

    var chars = split.chars;
    if (!chars || !chars.length) return;

    applyKaraoke(0, chars);

    karaokeTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 72%',
      end: 'bottom center',
      scrub: 0.65,
      onUpdate: function (self) {
        applyKaraoke(self.progress, chars);
      },
    });
  }

  setup();

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      setup();
      ScrollTrigger.refresh();
    }, 200);
  });
})();
