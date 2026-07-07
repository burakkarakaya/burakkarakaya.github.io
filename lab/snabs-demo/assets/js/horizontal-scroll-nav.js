/* ============================================================
   SNAB'S — Horizontal Scroll Nav
   Wrapper-scoped carousel: prev/next + card-index scroll
   Usage:
     <section class="scroller" data-scroll-nav data-scroll-item=".sp-card">
       <button class="scroller__prev">…</button>
       <button class="scroller__next">…</button>
       <div class="scroller__viewport">…items…</div>
     </section>
   Auto-init: document.querySelectorAll('[data-scroll-nav]')
   Manual:    SnabsScrollNav.create(wrapper, { item: '.recipe-card' })
   ============================================================ */
(function (global) {
  "use strict";

  var DEFAULTS = {
    viewport: ".scroller__viewport",
    prev: ".scroller__prev",
    next: ".scroller__next",
    item: ".scroller__item",
    step: 1,
    lockMs: 380,
    behavior: "smooth",
    disableEdges: false,
    clamp: true,
    edgeThreshold: 4
  };

  function resolveEl(root, sel) {
    if (!sel) return null;
    if (typeof sel === "string") return root.querySelector(sel);
    return sel;
  }

  function clampScroll(el) {
    if (!el) return;
    var max = Math.max(0, el.scrollWidth - el.clientWidth);
    if (el.scrollLeft > max) el.scrollLeft = max;
    if (el.scrollLeft < 0) el.scrollLeft = 0;
  }

  function itemScrollLeft(card, scroll) {
    return card.getBoundingClientRect().left
      - scroll.getBoundingClientRect().left
      + scroll.scrollLeft;
  }

  function optionsFromDataset(el) {
    var ds = el.dataset;
    var o = {};
    if (ds.scrollItem) o.item = ds.scrollItem;
    if (ds.scrollStep) o.step = parseInt(ds.scrollStep, 10) || 1;
    if (ds.scrollLockMs) o.lockMs = parseInt(ds.scrollLockMs, 10) || DEFAULTS.lockMs;
    if (ds.scrollDisableEdges !== undefined) o.disableEdges = true;
    if (ds.scrollViewport) o.viewport = ds.scrollViewport;
    if (ds.scrollPrev) o.prev = ds.scrollPrev;
    if (ds.scrollNext) o.next = ds.scrollNext;
    if (ds.scrollBehavior) o.behavior = ds.scrollBehavior;
    return o;
  }

  function create(wrapper, userOpts) {
    if (!wrapper) return null;

    var opts = {};
    var key;
    for (key in DEFAULTS) {
      if (Object.prototype.hasOwnProperty.call(DEFAULTS, key)) {
        opts[key] = DEFAULTS[key];
      }
    }
    var dsOpts = optionsFromDataset(wrapper);
    for (key in dsOpts) {
      if (Object.prototype.hasOwnProperty.call(dsOpts, key)) {
        opts[key] = dsOpts[key];
      }
    }
    if (userOpts) {
      for (key in userOpts) {
        if (Object.prototype.hasOwnProperty.call(userOpts, key)) {
          opts[key] = userOpts[key];
        }
      }
    }

    var scroll = resolveEl(wrapper, opts.viewport);
    var prev = resolveEl(wrapper, opts.prev);
    var next = resolveEl(wrapper, opts.next);
    if (!scroll || !prev || !next) return null;

    var navLock = false;
    var destroyed = false;

    function getCards() {
      return Array.prototype.slice.call(scroll.querySelectorAll(opts.item));
    }

    function getActiveIndex() {
      var cards = getCards();
      if (!cards.length) return 0;
      var left = scroll.scrollLeft;
      var best = 0;
      var bestDist = Infinity;
      cards.forEach(function (card, i) {
        var dist = Math.abs(itemScrollLeft(card, scroll) - left);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      return best;
    }

    function scrollToIndex(i) {
      var cards = getCards();
      if (!cards.length) return;
      i = Math.max(0, Math.min(i, cards.length - 1));
      scroll.scrollTo({
        left: itemScrollLeft(cards[i], scroll),
        behavior: opts.behavior
      });
      if (opts.clamp) {
        setTimeout(function () {
          if (!destroyed) clampScroll(scroll);
        }, opts.lockMs);
      }
    }

    function updateEdges() {
      if (opts.clamp) clampScroll(scroll);
      if (!opts.disableEdges) return;
      prev.disabled = scroll.scrollLeft <= opts.edgeThreshold;
      next.disabled =
        scroll.scrollLeft >= scroll.scrollWidth - scroll.clientWidth - opts.edgeThreshold;
    }

    function go(delta) {
      if (navLock || destroyed) return;
      var cards = getCards();
      if (!cards.length) return;
      var step = opts.step || 1;
      var target = Math.max(
        0,
        Math.min(getActiveIndex() + delta * step, cards.length - 1)
      );
      if (target === getActiveIndex()) return;
      navLock = true;
      scrollToIndex(target);
      setTimeout(function () {
        if (destroyed) return;
        navLock = false;
        updateEdges();
      }, opts.lockMs);
    }

    function onPrev() { go(-1); }
    function onNext() { go(1); }
    function onScroll() { updateEdges(); }

    prev.addEventListener("click", onPrev);
    next.addEventListener("click", onNext);
    scroll.addEventListener("scroll", onScroll, { passive: true });
    updateEdges();

    return {
      go: go,
      getIndex: getActiveIndex,
      scrollTo: scrollToIndex,
      destroy: function () {
        destroyed = true;
        prev.removeEventListener("click", onPrev);
        next.removeEventListener("click", onNext);
        scroll.removeEventListener("scroll", onScroll);
      }
    };
  }

  function initAll(root) {
    var scope = root || document;
    return Array.prototype.map.call(
      scope.querySelectorAll("[data-scroll-nav]"),
      function (wrapper) {
        return create(wrapper);
      }
    ).filter(Boolean);
  }

  global.SnabsScrollNav = {
    create: create,
    initAll: initAll
  };

  function boot() {
    initAll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})(typeof window !== "undefined" ? window : this);
