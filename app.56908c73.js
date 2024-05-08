// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"assets/js/utils/helper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addClass = addClass;
exports.delay = delay;
exports.elementHeight = elementHeight;
exports.flattenObject = flattenObject;
exports.forEach = forEach;
exports.getDegree = getDegree;
exports.getElementOffset = getElementOffset;
exports.getMousePos = getMousePos;
exports.getSiblings = getSiblings;
exports.getWindowSize = getWindowSize;
exports.hasClass = hasClass;
exports.isLightingColor = isLightingColor;
exports.lerp = lerp;
exports.loadImage = loadImage;
exports.loadTexture = loadTexture;
exports.mobile = void 0;
exports.removeClass = removeClass;
exports.throttle = throttle;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function getMousePos(e) {
  var posx = 0;
  var posy = 0;
  if (!e) e = window.event;
  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  return {
    x: posx,
    y: posy
  };
}
function forEach(array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
}
function removeClass(o) {
  o = o || {};
  var cls = o['cls'] || '';
  if (o.ID.length > 0) forEach(o.ID, function (ind, item) {
    if (cls != '') item.classList.remove(cls);
  });
}
function addClass(o) {
  o = o || {};
  var cls = o['cls'] || '';
  if (o.ID.length > 0) forEach(o.ID, function (ind, item) {
    if (cls != '') item.classList.add(cls);
  });
}
function getDegree(n) {
  return n / 360 * Math.PI * 2;
}
function getElementOffset(el) {
  /* https://muffinman.io/javascript-get-element-offset/ */
  var top = 0;
  var left = 0;
  var element = el;

  // Loop through the DOM tree
  // and add it's parent's offset to get page offset
  do {
    top += element.offsetTop || 0;
    left += element.offsetLeft || 0;
    element = element.offsetParent;
  } while (element);
  return {
    top: top,
    left: left
  };
}
function getWindowSize() {
  var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return {
    width: windowWidth,
    height: windowHeight,
    centerX: Math.round(windowWidth * .5),
    centerY: Math.round(windowHeight * .5)
  };
}
;
function getSiblings(elem) {
  // Setup siblings array and get the first sibling
  var siblings = [];
  var sibling = elem.parentNode.firstChild;

  // Loop through each sibling and push to the array
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== elem) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
}
;
function loadTexture(svg, callback) {
  var entriesArray = Object.entries(svg);
  var letters = entriesArray.map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    return {
      key: key,
      value: value
    };
  });
  var start = 0;
  var end = letters.length - 1;
  var originalSize = {};
  var load = function load(ind) {
    var key = letters[ind]['key'];
    var src = letters[ind]['value'];
    var img = new Image();
    img.onload = function () {
      originalSize[key] = {
        width: this.width,
        height: this.height
      };
      if (ind < end) {
        ++ind;
        load(ind);
      } else {
        if (typeof callback !== 'undefined') callback(originalSize);
      }
    };
    img.src = src;
  };
  load(start);
}
function elementHeight(elm) {
  var elmHeight, elmMargin;
  if (document.all) {
    // IE
    elmHeight = elm.currentStyle.height;
    elmMargin = parseInt(elm.currentStyle.marginTop, 10) + parseInt(elm.currentStyle.marginBottom, 10);
  } else {
    // Mozilla
    elmHeight = document.defaultView.getComputedStyle(elm, '').getPropertyValue('height');
    elmMargin = parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-top')) + parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-bottom'));
  }
  return parseFloat(elmHeight) + parseFloat(elmMargin);
}
function delay(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}
function loadImage(url) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.src = url;
    img.onload = function () {
      return resolve(img);
    };
    img.onerror = reject;
  });
}
function hasClass(o) {
  o = o || {};
  var elm = o['element'] || {},
    classList = elm.classList || '',
    // classList
    value = (o['value'] || '').replace(/\./g, ''); // içerisinde bakilacak class

  return classList.contains(value) || false;
}
function flattenObject(obj) {
  var parentKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return Object.keys(obj).reduce(function (acc, key) {
    var newKey = parentKey ? "".concat(parentKey).concat(key) : key;
    if (_typeof(obj[key]) === 'object' && obj[key] !== null) {
      Object.assign(acc, flattenObject(obj[key], "".concat(newKey, "-")));
    } else {
      acc[newKey] = obj[key];
    }
    return acc;
  }, {});
}
;
function throttle(callback, delay) {
  var lastTime = 0;
  return function () {
    var now = new Date().getTime();
    if (now - lastTime >= delay) {
      callback.apply(null, arguments);
      lastTime = now;
    }
  };
}
function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}
function isLightingColor(color) {
  var hex = color.replace('#', ''); // HEX değeri temizle
  var r = parseInt(hex.substring(0, 2), 16); // Kırmızı bileşenini al
  var g = parseInt(hex.substring(2, 4), 16); // Yeşil bileşenini al
  var b = parseInt(hex.substring(4, 6), 16); // Mavi bileşenini al
  var sum = r + g + b; // Rengin toplamı

  // Toplamın 382'den büyük olması, çok parlak bir renge işaret eder
  return sum > 382;
}
var mobile = exports.mobile = function () {
  return {
    detect: function detect() {
      var uagent = navigator.userAgent.toLowerCase();
      var list = this.mobiles;
      var ismobile = false;
      for (var d = 0; d < list.length; d += 1) if (uagent.indexOf(list[d]) != -1) ismobile = true;
      return ismobile;
    },
    mobiles: ["midp", "240x320", "blackberry", "netfront", "nokia", "panasonic", "portalmmm", "sharp", "sie-", "sonyericsson", "symbian", "windows ce", "benq", "mda", "mot-", "opera mini", "philips", "pocket pc", "sagem", "samsung", "sda", "sgh-", "vodafone", "xda", "palm", "iphone", "ipod", "android", "ipad"]
  };
}();
},{}],"assets/images/nature-sprite.png":[function(require,module,exports) {
module.exports = "/nature-sprite.210e93a1.png";
},{}],"assets/images/urban-sprite.png":[function(require,module,exports) {
module.exports = "/urban-sprite.2ede9b37.png";
},{}],"assets/images/**/*.png":[function(require,module,exports) {
module.exports = {
  "nature-sprite": require("./../nature-sprite.png"),
  "urban-sprite": require("./../urban-sprite.png")
};
},{"./../nature-sprite.png":"assets/images/nature-sprite.png","./../urban-sprite.png":"assets/images/urban-sprite.png"}],"assets/svg/sections/awards/A-.svg":[function(require,module,exports) {
module.exports = "/A-.f64d8258.svg";
},{}],"assets/svg/sections/awards/a.svg":[function(require,module,exports) {
module.exports = "/a.2a4a6077.svg";
},{}],"assets/svg/sections/awards/d.svg":[function(require,module,exports) {
module.exports = "/d.c1c05517.svg";
},{}],"assets/svg/sections/awards/r.svg":[function(require,module,exports) {
module.exports = "/r.c0ceff5b.svg";
},{}],"assets/svg/sections/awards/s.svg":[function(require,module,exports) {
module.exports = "/s.3e8b364a.svg";
},{}],"assets/svg/sections/awards/w.svg":[function(require,module,exports) {
module.exports = "/w.0e59a802.svg";
},{}],"assets/svg/sections/contact/C-.svg":[function(require,module,exports) {
module.exports = "/C-.4558e05b.svg";
},{}],"assets/svg/sections/contact/a.svg":[function(require,module,exports) {
module.exports = "/a.d2f58dd3.svg";
},{}],"assets/svg/sections/contact/c.svg":[function(require,module,exports) {
module.exports = "/c.9bf2d9ff.svg";
},{}],"assets/svg/sections/contact/n.svg":[function(require,module,exports) {
module.exports = "/n.502f3fca.svg";
},{}],"assets/svg/sections/contact/o.svg":[function(require,module,exports) {
module.exports = "/o.db3d10e6.svg";
},{}],"assets/svg/sections/contact/t.svg":[function(require,module,exports) {
module.exports = "/t.b726ae98.svg";
},{}],"assets/svg/sections/projects/c.svg":[function(require,module,exports) {
module.exports = "/c.8ef60989.svg";
},{}],"assets/svg/sections/projects/e.svg":[function(require,module,exports) {
module.exports = "/e.34c18b53.svg";
},{}],"assets/svg/sections/projects/j.svg":[function(require,module,exports) {
module.exports = "/j.0711533a.svg";
},{}],"assets/svg/sections/projects/o.svg":[function(require,module,exports) {
module.exports = "/o.28de77da.svg";
},{}],"assets/svg/sections/projects/p.svg":[function(require,module,exports) {
module.exports = "/p.5d889256.svg";
},{}],"assets/svg/sections/projects/r.svg":[function(require,module,exports) {
module.exports = "/r.e67ebba7.svg";
},{}],"assets/svg/sections/projects/s.svg":[function(require,module,exports) {
module.exports = "/s.c6cafd8b.svg";
},{}],"assets/svg/sections/projects/t.svg":[function(require,module,exports) {
module.exports = "/t.1db0c41e.svg";
},{}],"assets/svg/sections/skills/S-.svg":[function(require,module,exports) {
module.exports = "/S-.b286cee9.svg";
},{}],"assets/svg/sections/skills/i.svg":[function(require,module,exports) {
module.exports = "/i.9a90006a.svg";
},{}],"assets/svg/sections/skills/k.svg":[function(require,module,exports) {
module.exports = "/k.a9c96b5d.svg";
},{}],"assets/svg/sections/skills/l.svg":[function(require,module,exports) {
module.exports = "/l.53805fdb.svg";
},{}],"assets/svg/sections/skills/s.svg":[function(require,module,exports) {
module.exports = "/s.d0a96628.svg";
},{}],"assets/svg/**/*.svg":[function(require,module,exports) {
module.exports = {
  "sections": {
    "awards": {
      "A-": require("./../sections/awards/A-.svg"),
      "a": require("./../sections/awards/a.svg"),
      "d": require("./../sections/awards/d.svg"),
      "r": require("./../sections/awards/r.svg"),
      "s": require("./../sections/awards/s.svg"),
      "w": require("./../sections/awards/w.svg")
    },
    "contact": {
      "C-": require("./../sections/contact/C-.svg"),
      "a": require("./../sections/contact/a.svg"),
      "c": require("./../sections/contact/c.svg"),
      "n": require("./../sections/contact/n.svg"),
      "o": require("./../sections/contact/o.svg"),
      "t": require("./../sections/contact/t.svg")
    },
    "projects": {
      "c": require("./../sections/projects/c.svg"),
      "e": require("./../sections/projects/e.svg"),
      "j": require("./../sections/projects/j.svg"),
      "o": require("./../sections/projects/o.svg"),
      "p": require("./../sections/projects/p.svg"),
      "r": require("./../sections/projects/r.svg"),
      "s": require("./../sections/projects/s.svg"),
      "t": require("./../sections/projects/t.svg")
    },
    "skills": {
      "S-": require("./../sections/skills/S-.svg"),
      "i": require("./../sections/skills/i.svg"),
      "k": require("./../sections/skills/k.svg"),
      "l": require("./../sections/skills/l.svg"),
      "s": require("./../sections/skills/s.svg")
    }
  }
};
},{"./../sections/awards/A-.svg":"assets/svg/sections/awards/A-.svg","./../sections/awards/a.svg":"assets/svg/sections/awards/a.svg","./../sections/awards/d.svg":"assets/svg/sections/awards/d.svg","./../sections/awards/r.svg":"assets/svg/sections/awards/r.svg","./../sections/awards/s.svg":"assets/svg/sections/awards/s.svg","./../sections/awards/w.svg":"assets/svg/sections/awards/w.svg","./../sections/contact/C-.svg":"assets/svg/sections/contact/C-.svg","./../sections/contact/a.svg":"assets/svg/sections/contact/a.svg","./../sections/contact/c.svg":"assets/svg/sections/contact/c.svg","./../sections/contact/n.svg":"assets/svg/sections/contact/n.svg","./../sections/contact/o.svg":"assets/svg/sections/contact/o.svg","./../sections/contact/t.svg":"assets/svg/sections/contact/t.svg","./../sections/projects/c.svg":"assets/svg/sections/projects/c.svg","./../sections/projects/e.svg":"assets/svg/sections/projects/e.svg","./../sections/projects/j.svg":"assets/svg/sections/projects/j.svg","./../sections/projects/o.svg":"assets/svg/sections/projects/o.svg","./../sections/projects/p.svg":"assets/svg/sections/projects/p.svg","./../sections/projects/r.svg":"assets/svg/sections/projects/r.svg","./../sections/projects/s.svg":"assets/svg/sections/projects/s.svg","./../sections/projects/t.svg":"assets/svg/sections/projects/t.svg","./../sections/skills/S-.svg":"assets/svg/sections/skills/S-.svg","./../sections/skills/i.svg":"assets/svg/sections/skills/i.svg","./../sections/skills/k.svg":"assets/svg/sections/skills/k.svg","./../sections/skills/l.svg":"assets/svg/sections/skills/l.svg","./../sections/skills/s.svg":"assets/svg/sections/skills/s.svg"}],"assets/icons.svg":[function(require,module,exports) {
module.exports = "/icons.1e7b2822.svg";
},{}],"assets/js/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = exports.colorSchemes = void 0;
var _icons = _interopRequireDefault(require("../icons.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var config = exports.config = [{
  key: "projects",
  button: {
    title: "Projects",
    degree: 202,
    degreeMobile: 260
  },
  layer: {
    color: "#e9e6c4",
    distance: 50,
    radius: 55,
    speed: 0,
    duration: 0.2
  },
  svg: {
    fill: "#ffffff",
    width: "580.205",
    height: "144.304",
    source: "/assets/svg/sections/projects/",
    letters: [{
      key: "p",
      path: "M 0 109.352 L 11.7 109.352 L 11.7 58.802 L 40.05 58.802 A 41.672 41.672 0 0 0 57.922 55.071 C 67.79 50.385 74.25 41.402 74.25 28.802 A 27.144 27.144 0 0 0 69.024 12.206 C 65.529 7.541 60.407 4.072 54.049 2.049 A 46.685 46.685 0 0 0 39.9 0.002 L 0 0.002 L 0 109.352 Z M 11.7 11.402 L 39.45 11.402 C 54.685 11.402 62.334 18.392 62.4 29.41 A 24.047 24.047 0 0 1 62.4 29.552 C 62.4 38.425 56.934 44.018 49.15 46.269 A 30.701 30.701 0 0 1 40.65 47.402 L 11.7 47.402 L 11.7 11.402 Z"
    }, {
      key: "r",
      path: "M 91.2 109.352 L 101.7 109.352 L 101.7 64.202 C 101.7 52.863 109.174 43.422 118.003 41.472 A 15.5 15.5 0 0 1 121.35 41.102 A 12.243 12.243 0 0 1 127.776 42.788 C 130.496 44.43 132.388 47.166 133.397 50.53 A 21.548 21.548 0 0 1 134.25 56.702 L 144.6 54.902 A 25.215 25.215 0 0 0 141.675 42.881 A 21.022 21.022 0 0 0 123.3 31.502 C 113.85 31.502 105.45 36.602 101.7 42.602 L 101.7 32.702 L 91.2 32.702 L 91.2 109.352 Z"
    }, {
      key: "o",
      path: "M 152.55 70.952 C 152.55 94.352 166.95 110.702 187.5 110.702 A 34.649 34.649 0 0 0 206.361 105.519 C 216.731 98.922 222.75 86.491 222.75 70.952 A 44.935 44.935 0 0 0 218.737 51.97 C 214.758 43.39 208.14 37.032 200.344 33.784 A 31.378 31.378 0 0 0 188.25 31.352 A 34.548 34.548 0 0 0 154.578 56.776 A 48.226 48.226 0 0 0 152.55 70.952 Z M 206.769 89.306 A 36.681 36.681 0 0 0 211.65 70.502 A 37.993 37.993 0 0 0 208.921 55.988 A 22.647 22.647 0 0 0 187.8 40.802 A 26.656 26.656 0 0 0 187.098 40.812 C 177.413 41.067 170.53 46.607 166.824 54.775 A 38.58 38.58 0 0 0 163.65 70.652 A 38.076 38.076 0 0 0 166.678 85.778 A 22.615 22.615 0 0 0 187.5 100.652 A 22.002 22.002 0 0 0 206.769 89.306 Z"
    }, {
      key: "j",
      path: "M 273.9 32.852 L 262.65 32.852 L 262.65 118.802 C 262.778 130.819 258.439 134.229 255.111 135.067 A 8.113 8.113 0 0 1 253.5 135.302 C 249.101 135.449 244.416 132.299 244.207 126.554 A 11.048 11.048 0 0 1 244.2 126.152 L 234 128.252 C 233.851 135.393 241.227 144.304 252.908 144.304 A 23.063 23.063 0 0 0 253.2 144.302 A 23.506 23.506 0 0 0 254.05 144.274 C 263.975 143.769 273.9 136.907 273.9 119.552 L 273.9 32.852 Z M 266.82 16.384 A 9.761 9.761 0 0 0 268.35 16.502 C 272.621 16.502 275.704 13.89 276.332 9.933 A 9.761 9.761 0 0 0 276.45 8.402 C 276.45 4.131 273.837 1.048 269.88 0.42 A 9.761 9.761 0 0 0 268.35 0.302 C 264.079 0.302 260.996 2.915 260.368 6.872 A 9.761 9.761 0 0 0 260.25 8.402 C 260.25 12.673 262.863 15.757 266.82 16.384 Z"
    }, {
      key: "e",
      path: "M 358.35 85.202 L 348 82.952 A 21.236 21.236 0 0 1 335.426 99.021 A 21.384 21.384 0 0 1 326.85 100.802 C 313.323 100.802 303.11 91.139 302.302 74.328 A 45.312 45.312 0 0 1 302.25 72.152 L 359.4 72.152 C 360 47.252 343.95 32.102 326.4 32.102 A 33.502 33.502 0 0 0 304.754 39.558 C 298.73 44.504 294.452 51.65 292.442 60.193 A 50.268 50.268 0 0 0 291.15 71.702 A 43.892 43.892 0 0 0 296.216 92.806 C 301.657 102.771 311.223 109.445 323.634 110.427 A 40.767 40.767 0 0 0 326.85 110.552 C 343.95 110.552 356.55 98.102 358.35 85.202 Z M 347.4 63.152 L 303 63.152 A 24.394 24.394 0 0 1 320.562 42.249 A 24.111 24.111 0 0 1 326.4 41.552 C 338.55 41.552 346.35 51.602 347.4 63.152 Z"
    }, {
      key: "c",
      path: "M 424.8 56.552 L 434.7 55.052 A 21.633 21.633 0 0 0 434.161 52.073 C 432.133 44.06 425.453 36.046 414.941 32.969 A 33.677 33.677 0 0 0 405.45 31.652 A 35.41 35.41 0 0 0 371.988 57.839 A 46.147 46.147 0 0 0 369.9 71.702 A 37.707 37.707 0 0 0 394.049 108.8 A 37.973 37.973 0 0 0 406.2 110.702 A 30.689 30.689 0 0 0 424.424 104.931 A 29.243 29.243 0 0 0 436.2 84.602 L 426 82.652 C 425.308 90.96 419.12 99.267 408.381 100.497 A 24.437 24.437 0 0 1 405.6 100.652 A 24.722 24.722 0 0 1 394.588 98.271 C 385.425 93.775 381 83.415 381 71.552 C 381 59.577 385.591 49.964 392.917 44.934 A 21.86 21.86 0 0 1 405.45 41.102 A 20.508 20.508 0 0 1 412.077 42.164 C 419.842 44.8 424.083 51.771 424.8 56.552 Z"
    }, {
      key: "t",
      path: "M 467.7 13.202 L 456.75 13.202 L 456.75 24.152 L 456.75 21.902 L 456.75 32.852 L 444.9 32.852 L 444.9 41.552 L 456.75 41.552 L 456.75 77.852 C 456.606 97.987 464.874 109.435 479.834 110.344 A 32.405 32.405 0 0 0 481.8 110.402 C 494.613 110.402 505.502 99.008 505.502 84.892 A 27.486 27.486 0 0 0 505.5 84.602 L 496.5 82.652 C 495 95.402 488.25 100.652 481.95 100.652 A 13.875 13.875 0 0 1 475.248 99.122 C 470.988 96.817 468.647 91.984 467.857 85.144 A 50.717 50.717 0 0 1 467.55 79.352 L 467.55 41.552 L 501.45 41.552 L 501.45 32.852 L 467.55 32.852 C 467.55 32.852 467.7 13.202 467.7 13.202 Z"
    }, {
      key: "s",
      path: "M 527.7 84.152 L 517.5 86.702 A 14.896 14.896 0 0 0 517.498 86.935 C 517.498 95.401 524.649 107.424 542.266 110.142 A 50.057 50.057 0 0 0 549.9 110.702 A 45.563 45.563 0 0 0 560.42 109.56 C 573.87 106.369 579.892 96.98 580.19 87.591 A 23.175 23.175 0 0 0 580.2 87.152 A 23.581 23.581 0 0 0 580.202 86.82 C 580.202 77.964 575.197 69.476 563.801 65.854 A 38.292 38.292 0 0 0 556.65 64.352 L 540.75 62.552 C 534.45 61.802 530.55 58.202 530.55 52.502 A 7.162 7.162 0 0 1 530.786 50.705 C 532.127 45.529 539.103 40.352 549.45 40.352 A 25.856 25.856 0 0 1 554.462 40.81 C 564.088 42.711 566.631 50.118 567.15 55.052 L 576.75 53.102 A 15.27 15.27 0 0 0 576.525 50.621 C 575.383 43.801 569.475 31.652 549.45 31.652 A 41.852 41.852 0 0 0 539.915 32.695 C 527.38 35.624 520.97 44.188 520.265 51.467 A 13.86 13.86 0 0 0 520.2 52.802 A 21.667 21.667 0 0 0 521.224 59.566 C 523.996 68.053 531.858 72.024 538.05 72.752 L 553.8 74.552 A 33.251 33.251 0 0 1 562.046 76.334 C 565.672 77.735 568.375 80.077 569.164 84.12 A 13.461 13.461 0 0 1 569.4 86.702 A 12.495 12.495 0 0 1 561.922 98.497 C 558.843 100.001 554.888 100.802 550.2 100.802 C 536.628 100.802 529.571 94.162 527.999 86.377 A 17.224 17.224 0 0 1 527.7 84.152 Z"
    }]
  },
  content: {
    type: "list",
    data: [{
      name: "Nike Geç Kendini",
      link: "https://player.vimeo.com/video/132407281?h=dc31d97a5e",
      agency: "minus99",
      technologies: ["CreateJS", "JQuery", "HTML5", "CSS3"],
      video: true,
      media: ['https://www.minus99.com/wp-content/uploads/nike-thumbnail.jpg'],
      type: "Web",
      awards: [{
        ico: "fwa",
        link: "https://thefwa.com/cases/nike-ge-kendini",
        title: "Site of the day"
      }, {
        ico: "webby",
        link: "https://winners.webbyawards.com/2016/websites/features-design/best-use-of-video-or-moving-image/161069/nike-ge%C3%A7-kendini",
        title: "Websites and Mobile Sites, Best Use of Video or Moving Image 2016"
      }, {
        ico: "awwwards",
        link: "https://www.awwwards.com/sites/nike-gec-kendini-experience",
        title: "Site of the day"
      }, {
        ico: "altinorumcek",
        link: "https://www.altinorumcek.com/ajanslar/99-design-studio/",
        title: "Site of the day"
      }, {
        ico: "cssda",
        link: "https://www.cssdesignawards.com/sites/nike-gec-kendini/26711/",
        title: ""
      }, {
        ico: "communicator",
        link: "",
        title: ""
      }, {
        ico: "w3",
        link: "",
        title: ""
      }],
      description: ""
    }, {
      name: "Vakko Özeldikim",
      link: "https://www.youtube.com/embed/017X_WLPCj8?si=Noiu7oAP1DavRIRt",
      agency: "minus99",
      technologies: ["Canvas", "JQuery", "HTML5", "CSS3"],
      video: true,
      media: ['https://www.cssdesignawards.com/cdasites/2013/201312/20131213033322.jpg'],
      type: "Web",
      awards: [{
        ico: "awwwards",
        link: "www.awwards.com/nikelidyana.com",
        title: "Site of the day"
      }, {
        ico: "altinorumcek",
        link: "",
        title: ""
      }],
      description: ""
    }, {
      name: "Flormar Mobile App",
      link: "javascript:void(0);",
      agency: "proj-e",
      technologies: ["CMS", "React Native"],
      media: ['https://www.minus99.com/wp-content/uploads/flormar-thumbnail.jpg'],
      type: "App",
      awards: [],
      description: ""
    }, {
      name: "Cosmetica Mobile App",
      link: "javascript:void(0);",
      agency: "proj-e",
      technologies: ["CMS", "React Native"],
      media: ['https://hcdn.proj-e.com/proje/uploads/works/cosmetica-poster.jpg'],
      type: "App",
      awards: [],
      description: ""
    }, {
      name: "VitrA",
      link: "https://www.vitra.com.tr/",
      agency: "proj-e",
      technologies: ["CMS", "C#", "Razor", "Vanilla JS"],
      media: ['https://hcdn.proj-e.com/proje/uploads/works/vitra-cover.jpg'],
      type: "Web",
      awards: [],
      description: ""
    }, {
      name: "Newbalance",
      link: "https://www.newbalance.com.tr/",
      agency: "proj-e",
      technologies: ["CMS", "C#", "Razor", "Vanilla JS"],
      media: ['https://hcdn.proj-e.com/proje/uploads/works/newbalance-poster.jpg'],
      type: "Web",
      awards: [],
      description: ""
    }, {
      name: "Kartalyuvasi",
      link: "https://www.kartalyuvasi.com.tr/",
      agency: "proj-e",
      technologies: ["CMS", "C#", "Razor", "Vanilla JS"],
      media: ['https://www.minus99.com/wp-content/uploads/bjk-thumbnail.jpg'],
      type: "Web",
      awards: [],
      description: ""
    }, {
      name: "Korayspor",
      link: "https://www.korayspor.com/",
      agency: "proj-e",
      technologies: ["CMS", "C#", "Razor", "Vanilla JS"],
      media: ['https://www.minus99.com/wp-content/uploads/korayspor-thumbnail.jpg'],
      type: "Web",
      awards: [],
      description: ""
    }, {
      name: "Monsternotebook",
      link: "https://www.monsternotebook.com.tr/",
      agency: "proj-e",
      technologies: ["CMS", "C#", "Razor", "Vanilla JS"],
      media: ['https://hcdn.proj-e.com/proje/uploads/works/monster-cover.jpg'],
      type: "Web",
      awards: [],
      description: ""
    }, {
      name: "Lescon",
      link: "https://www.lescon.com.tr/",
      agency: "proj-e",
      technologies: ["CMS", "C#", "Razor", "Vanilla JS"],
      media: ['https://hcdn.proj-e.com/proje/uploads/works/Lescon.jpg'],
      type: "Web",
      awards: [],
      description: ""
    }, {
      name: "Unibaby",
      link: "https://www.unibaby.com.tr/",
      agency: "proj-e",
      technologies: ["CMS", "C#", "Razor", "Vanilla JS"],
      media: ['https://www.minus99.com/wp-content/uploads/unibaby-thumbnail.jpg'],
      type: "Web",
      awards: [],
      description: ""
    }, {
      name: "Machka",
      link: "https://www.machka.com.tr/",
      agency: "proj-e",
      technologies: ["CMS", "C#", "Razor", "Vanilla JS"],
      media: ['https://www.minus99.com/wp-content/uploads/machka-thumbnail.jpg'],
      type: "Web",
      awards: [],
      description: ""
    }, {
      name: "İpekyol",
      link: "https://www.ipekyol.com.tr/",
      agency: "proj-e",
      technologies: ["CMS", "C#", "Razor", "Vanilla JS"],
      media: ['https://www.minus99.com/wp-content/uploads/ipekyol-thumbnail.jpg'],
      type: "Web",
      awards: [],
      description: ""
    }, {
      name: "Twist",
      link: "https://www.twist.com.tr/",
      agency: "proj-e",
      technologies: ["CMS", "C#", "Razor", "Vanilla JS"],
      media: ['https://www.minus99.com/wp-content/uploads/machka-thumbnail.jpg'],
      type: "Web",
      awards: [],
      description: ""
    }, {
      name: "Ok",
      link: "https://www.ok.com.tr/",
      agency: "proj-e",
      technologies: ["CMS", "C#", "Razor", "Vanilla JS"],
      media: [],
      type: "Web",
      awards: [],
      description: ""
    }]
  }
}, {
  key: "awards",
  button: {
    title: "Awards",
    degree: 210,
    degreeMobile: 240
  },
  layer: {
    color: "#bee7c3",
    distance: 50,
    radius: 44,
    speed: 0,
    duration: 0.4
  },
  svg: {
    fill: "#ffffff",
    width: "504.605",
    height: "110.702",
    source: "/assets/svg/sections/awards/",
    letters: [{
      key: "A-",
      path: "M 12 109.35 L 26.25 70.2 L 69.6 70.2 L 83.85 109.35 L 95.85 109.35 L 55.8 0 L 40.2 0 L 0 109.35 L 12 109.35 Z M 48 10.5 L 65.85 60 L 30 60 L 48 10.5 Z"
    }, {
      key: "w",
      path: "M 117.75 109.35 L 133.65 109.35 L 150.6 44.4 L 166.65 109.35 L 182.85 109.35 L 203.1 32.7 L 192 32.7 L 174.45 101.1 L 158.1 32.85 L 143.25 32.85 L 126 100.8 L 108.45 32.85 L 97.35 32.85 L 117.75 109.35 Z"
    }, {
      key: "a",
      path: "M 262.35 95.25 L 262.35 109.35 L 273.3 109.35 L 273.3 62.55 C 273.3 43.144 261.177 32.416 245.38 31.556 A 38.262 38.262 0 0 0 243.3 31.5 C 226.43 31.5 215.455 42.661 213.698 51.911 A 13.627 13.627 0 0 0 213.45 54.45 L 223.5 56.7 C 223.766 50.31 230.177 42.738 238.957 41.116 A 18.936 18.936 0 0 1 242.4 40.8 A 18.769 18.769 0 0 1 260.097 50.692 C 261.137 52.816 261.836 55.314 262.091 58.216 A 28.864 28.864 0 0 1 262.2 60.75 L 262.2 62.55 C 216.736 64.695 211.471 78.285 211.077 88.776 A 40.602 40.602 0 0 0 211.05 90.3 C 211.05 99.43 217.664 107.678 229.475 109.846 A 35.014 35.014 0 0 0 235.8 110.4 A 37.196 37.196 0 0 0 243.581 109.619 C 254.052 107.384 259.653 100.766 262.35 95.25 Z M 262.35 72 L 262.35 77.25 C 262.2 90.45 249.75 100.65 238.95 100.5 A 26.5 26.5 0 0 1 230.944 99.358 C 225.557 97.636 221.942 93.967 222.15 88.35 A 11.06 11.06 0 0 1 226.101 80.121 C 230.899 75.882 240.911 72.673 260.52 72.05 A 207.042 207.042 0 0 1 262.35 72 Z"
    }, {
      key: "r",
      path: "M 291.9 109.35 L 302.4 109.35 L 302.4 64.2 C 302.4 52.861 309.874 43.42 318.703 41.469 A 15.5 15.5 0 0 1 322.05 41.1 A 12.243 12.243 0 0 1 328.476 42.786 C 331.196 44.427 333.088 47.164 334.097 50.528 A 21.548 21.548 0 0 1 334.95 56.7 L 345.3 54.9 A 25.215 25.215 0 0 0 342.375 42.878 A 21.022 21.022 0 0 0 324 31.5 C 314.55 31.5 306.15 36.6 302.4 42.6 L 302.4 32.7 L 291.9 32.7 L 291.9 109.35 Z"
    }, {
      key: "d",
      path: "M 412.95 96.9 L 412.95 109.35 L 424.2 109.35 L 424.2 4.35 L 412.95 4.35 L 412.95 46.2 C 407.1 37.35 397.95 31.35 387 31.35 C 369.495 31.35 354.598 46.035 353.336 67.923 A 52.597 52.597 0 0 0 353.25 70.95 A 50.602 50.602 0 0 0 356.497 89.467 C 361.63 102.527 372.628 110.7 387.9 110.7 A 29.696 29.696 0 0 0 399.346 108.509 A 30.038 30.038 0 0 0 412.95 96.9 Z M 367.045 56.927 A 37.315 37.315 0 0 0 364.65 70.5 A 37.677 37.677 0 0 0 367.624 85.529 A 22.014 22.014 0 0 0 388.05 99.9 A 22.905 22.905 0 0 0 406.949 89.533 A 33.111 33.111 0 0 0 412.65 70.65 A 35.292 35.292 0 0 0 410.407 57.97 A 23.756 23.756 0 0 0 387.75 41.85 C 378.023 41.85 370.63 47.757 367.045 56.927 Z"
    }, {
      key: "s",
      path: "M 452.1 84.15 L 441.9 86.7 A 14.896 14.896 0 0 0 441.898 86.933 C 441.898 95.399 449.049 107.422 466.666 110.14 A 50.057 50.057 0 0 0 474.3 110.7 A 45.563 45.563 0 0 0 484.82 109.557 C 498.27 106.367 504.292 96.978 504.59 87.589 A 23.175 23.175 0 0 0 504.6 87.15 A 23.581 23.581 0 0 0 504.602 86.818 C 504.602 77.962 499.597 69.473 488.201 65.851 A 38.292 38.292 0 0 0 481.05 64.35 L 465.15 62.55 C 458.85 61.8 454.95 58.2 454.95 52.5 A 7.162 7.162 0 0 1 455.186 50.702 C 456.527 45.526 463.503 40.35 473.85 40.35 A 25.856 25.856 0 0 1 478.862 40.807 C 488.488 42.709 491.031 50.116 491.55 55.05 L 501.15 53.1 A 15.27 15.27 0 0 0 500.925 50.618 C 499.783 43.799 493.875 31.65 473.85 31.65 A 41.852 41.852 0 0 0 464.315 32.693 C 451.78 35.622 445.37 44.186 444.665 51.465 A 13.86 13.86 0 0 0 444.6 52.8 A 21.667 21.667 0 0 0 445.624 59.564 C 448.396 68.05 456.258 72.022 462.45 72.75 L 478.2 74.55 A 33.251 33.251 0 0 1 486.446 76.331 C 490.072 77.733 492.775 80.075 493.564 84.118 A 13.461 13.461 0 0 1 493.8 86.7 A 12.495 12.495 0 0 1 486.322 98.495 C 483.243 99.999 479.287 100.8 474.6 100.8 C 461.028 100.8 453.971 94.159 452.399 86.375 A 17.224 17.224 0 0 1 452.1 84.15 Z"
    }]
  },
  content: {
    type: "list",
    data: [{
      name: "Nike Geç Kendini",
      link: "https://player.vimeo.com/video/132407281?h=dc31d97a5e",
      agency: "minus99",
      technologies: ["CreateJS", "JQuery", "HTML5", "CSS3"],
      video: true,
      media: ['https://www.minus99.com/wp-content/uploads/nike-thumbnail.jpg'],
      type: "Web",
      awards: [{
        ico: "fwa",
        link: "https://thefwa.com/cases/nike-ge-kendini",
        title: "Site of the day"
      }, {
        ico: "webby",
        link: "https://winners.webbyawards.com/2016/websites/features-design/best-use-of-video-or-moving-image/161069/nike-ge%C3%A7-kendini",
        title: "Websites and Mobile Sites, Best Use of Video or Moving Image 2016"
      }, {
        ico: "awwwards",
        link: "https://www.awwwards.com/sites/nike-gec-kendini-experience",
        title: "Site of the day"
      }, {
        ico: "altinorumcek",
        link: "https://www.altinorumcek.com/ajanslar/99-design-studio/",
        title: "Site of the day"
      }, {
        ico: "cssda",
        link: "https://www.cssdesignawards.com/sites/nike-gec-kendini/26711/",
        title: ""
      }, {
        ico: "communicator",
        link: "",
        title: ""
      }, {
        ico: "w3",
        link: "",
        title: ""
      }],
      description: ""
    }, {
      name: "Vakko Özeldikim",
      link: "https://www.youtube.com/embed/017X_WLPCj8?si=Noiu7oAP1DavRIRt",
      agency: "minus99",
      technologies: ["Canvas", "JQuery", "HTML5", "CSS3"],
      video: true,
      media: ['https://www.cssdesignawards.com/cdasites/2013/201312/20131213033322.jpg'],
      type: "Web",
      awards: [{
        ico: "awwwards",
        link: "www.awwards.com/nikelidyana.com",
        title: "Site of the day"
      }, {
        ico: "altinorumcek",
        link: "",
        title: ""
      }],
      description: ""
    }, {
      name: "Ramsey",
      link: "https://www.ramsey.com.tr",
      agency: "minus99",
      technologies: ["Flash", "Actionscript 3.0"],
      media: [],
      type: "Web",
      awards: [{
        ico: "",
        link: "",
        title: "Designlicks"
      }],
      description: ""
    }]
  }
}, {
  key: "skills",
  button: {
    title: "Skills",
    degree: 215,
    degreeMobile: 250
  },
  layer: {
    color: "#c7dcd9",
    distance: 50,
    radius: 33,
    speed: 0,
    duration: 0.6
  },
  svg: {
    fill: "#ffffff",
    width: "333.026",
    height: "111.903",
    source: "/assets/svg/sections/skills/",
    letters: [{
      key: "S-",
      path: "M 47.871 47.252 L 28.071 43.202 A 21.834 21.834 0 0 1 22.746 41.406 C 20.495 40.277 18.784 38.803 17.551 37.057 A 15.053 15.053 0 0 1 15.021 28.202 A 16.07 16.07 0 0 1 23.212 14.146 C 27.14 11.767 32.44 10.352 39.021 10.352 C 55.111 10.352 64.228 18.632 64.228 30.475 A 23.372 23.372 0 0 1 64.221 31.052 L 75.021 28.802 C 75.021 15.425 64.952 1.221 42.302 0.076 A 59.065 59.065 0 0 0 39.321 0.002 A 49.59 49.59 0 0 0 25.25 1.916 C 12.297 5.744 4.715 14.808 3.383 24.508 A 22.732 22.732 0 0 0 3.171 27.602 A 29.758 29.758 0 0 0 5.264 38.991 C 8.402 46.613 14.941 51.719 24.021 53.702 L 44.271 58.052 A 98.184 98.184 0 0 1 51.62 59.921 C 66.708 64.457 67.971 70.314 67.971 79.502 C 67.971 88.732 62.024 98.595 45.598 100.142 A 49.35 49.35 0 0 1 40.971 100.352 C 23.667 100.352 10.446 92.04 11.66 72.541 A 42.648 42.648 0 0 1 11.721 71.702 L 0.021 73.952 A 41.919 41.919 0 0 0 0.005 75.092 C 0.005 96.522 16.632 111.152 39.921 111.152 A 58.858 58.858 0 0 0 54.451 109.468 C 59.936 108.071 64.495 105.861 68.173 103.054 A 30.673 30.673 0 0 0 80.121 78.002 C 80.121 64.881 73.197 55.222 57.237 49.76 A 76.424 76.424 0 0 0 47.871 47.252 Z"
    }, {
      key: "k",
      path: "M 96.021 1.052 L 96.021 110.552 L 107.121 110.702 L 106.971 86.402 L 119.571 72.752 L 147.171 110.552 L 160.971 110.552 L 126.471 65.702 L 154.521 34.052 L 141.171 34.052 L 107.121 71.402 L 107.121 1.052 L 96.021 1.052 Z"
    }, {
      key: "i",
      path: "M 177.471 110.552 L 188.721 110.552 L 188.721 34.052 L 177.471 34.052 L 177.471 110.552 Z M 181.491 17.584 A 9.761 9.761 0 0 0 183.021 17.702 C 187.292 17.702 190.375 15.089 191.003 11.132 A 9.761 9.761 0 0 0 191.121 9.602 C 191.121 5.331 188.508 2.248 184.551 1.62 A 9.761 9.761 0 0 0 183.021 1.502 C 178.75 1.502 175.667 4.114 175.039 8.072 A 9.761 9.761 0 0 0 174.921 9.602 C 174.921 13.873 177.533 16.956 181.491 17.584 Z"
    }, {
      key: "l",
      path: "M 211.071 110.552 L 221.871 110.552 L 221.871 1.052 L 211.221 1.052 L 211.071 110.552 Z"
    }, {
      key: "l",
      path: "M 241.821 110.552 L 252.621 110.552 L 252.621 1.052 L 241.971 1.052 L 241.821 110.552 Z"
    }, {
      key: "s",
      path: "M 280.521 85.352 L 270.321 87.902 A 14.896 14.896 0 0 0 270.319 88.134 C 270.319 96.601 277.47 108.624 295.086 111.341 A 50.057 50.057 0 0 0 302.721 111.902 A 45.563 45.563 0 0 0 313.24 110.759 C 326.691 107.568 332.713 98.179 333.011 88.791 A 23.175 23.175 0 0 0 333.021 88.352 A 23.581 23.581 0 0 0 333.023 88.02 C 333.023 79.163 328.017 70.675 316.622 67.053 A 38.292 38.292 0 0 0 309.471 65.552 L 293.571 63.752 C 287.271 63.002 283.371 59.402 283.371 53.702 A 7.162 7.162 0 0 1 283.607 51.904 C 284.948 46.728 291.924 41.552 302.271 41.552 A 25.856 25.856 0 0 1 307.283 42.009 C 316.909 43.91 319.451 51.317 319.971 56.252 L 329.571 54.302 A 15.27 15.27 0 0 0 329.346 51.82 C 328.204 45.001 322.295 32.852 302.271 32.852 A 41.852 41.852 0 0 0 292.736 33.895 C 280.201 36.824 273.791 45.388 273.086 52.667 A 13.86 13.86 0 0 0 273.021 54.002 A 21.667 21.667 0 0 0 274.044 60.766 C 276.817 69.252 284.679 73.223 290.871 73.952 L 306.621 75.752 A 33.251 33.251 0 0 1 314.867 77.533 C 318.493 78.935 321.196 81.277 321.985 85.319 A 13.461 13.461 0 0 1 322.221 87.902 A 12.495 12.495 0 0 1 314.743 99.697 C 311.663 101.201 307.708 102.002 303.021 102.002 C 289.449 102.002 282.392 95.361 280.82 87.577 A 17.224 17.224 0 0 1 280.521 85.352 Z"
    }]
  },
  content: {
    type: "text",
    data: "\n\n            <span class=\"animated skills-title\">\n            \n            <div class=\"text\">\n            <h1>\n              <span>Hello, I'm </span>\n                  <span class=\"vert-slider\">\n                    <div class=\"vert-slider-text3 word\">Burak Karakaya</div>\n                    <div class=\"vert-slider-text2 word\">a Javascript Developer</div>\n                </span>\n            </h1> \n            </div>\n\n            </span>\n\n            \n            <p class=\"animated skills-text\">\n              I am a seasoned professional with <mark>14 years of experience in JavaScript and frontend development</mark>. Throughout my career, I've developed a deep understanding of web development, responsive design, mobile app development, and the e-commerce sector. My areas of expertise include <mark>React</mark> and <mark>React Native technologies</mark>, interactive animations, and third-party integrations. I've refined these skills through hands-on experience and continuous learning.\n            </p>\n\n            <p class=\"animated skills-text\">\n              Over the course of my career, I've contributed to more than 100 e-commerce projects. In these projects, I created innovative features and interactive elements to enhance user experience. I have extensive experience in both web and mobile app development and have developed mobile applications for brands like Cosmetica and Flormar using React Native.\n            </p>\n\n            <p class=\"animated skills-text\">\n              My work philosophy promotes collaboration and creativity. While providing user-centric and innovative solutions, I also dive into the technical aspects of projects to ensure their quality. Additionally, my experience as a <mark>Frontend Team Lead</mark> has equipped me with strong team management and mentoring skills.\n            </p>\n\n            <p class=\"animated skills-text\">\n              Here are some highlights from my career:\n              <br>\n              <br>\n              Achievements: I've earned national and <mark>international awards</mark> for projects with brands like Nike and Vakko. The Nike project, in particular, received \"Site of The Day\" and Webby Awards, among other prestigious recognitions.\n              <br>\n              Roles and Responsibilities: I have extensive experience in frontend architecture, custom module development, and third-party integrations. For the past three years, I've served as a Frontend Team Lead, guiding and mentoring my team.\n              <br>\n              Looking Ahead: I'm always eager to explore new opportunities and potential collaborations. If you're interested in discussing industry trends, innovation, or new projects, feel free to reach out to me. Let's create something amazing together!\n            </p>\n            \n            <p class=\"animated skills-text\">\n                <svg viewBox=\"0 0 200 200\" class=\"textcircle\">\n                    <title>Projects &amp; client work 2020</title>\n                    <defs>\n                        <path id=\"textcircle\" d=\"M100,150 a50,50 0 0,1 0,-100a50,50 0 0,1 0,100Z\"></path>\n                    </defs>\n                    <text>\n                        <textPath xlink:href=\"#textcircle\" aria-label=\"Projects &amp; client work 2020\" textLength=\"300\">Senior - Javascript - Developer</textPath>\n                    </text>\n                </svg>\n            </p>\n\n            "
  }
}, {
  key: "contact",
  button: {
    title: "Contact",
    degree: 220,
    degreeMobile: 260
  },
  layer: {
    color: "#f5e4d9",
    distance: 50,
    radius: 22,
    speed: 0,
    duration: 0.8
  },
  svg: {
    fill: "#ffffff",
    width: "551.257",
    height: "112.806",
    source: "/assets/svg/sections/contact/",
    letters: [{
      key: "C-",
      path: "M 79.955 36 L 91.055 33.9 C 90.155 21 75.455 0 49.505 0 C 28.412 0 6.872 16.3 1.355 42.927 A 66.329 66.329 0 0 0 0.005 56.4 A 68.604 68.604 0 0 0 4.596 81.928 A 47.015 47.015 0 0 0 49.955 112.5 A 43.955 43.955 0 0 0 62.723 110.669 C 82.7 104.638 91.869 85.33 92.964 77.424 A 13.991 13.991 0 0 0 93.005 77.1 L 81.905 74.55 A 18.389 18.389 0 0 1 81.322 76.733 C 78.865 84.295 69.628 101.55 50.255 101.55 A 36.567 36.567 0 0 1 15.453 75.815 A 55.237 55.237 0 0 1 12.305 57 A 55.74 55.74 0 0 1 15.386 38.317 C 20.846 22.914 32.772 13.29 44.698 11.325 A 27.721 27.721 0 0 1 49.205 10.95 C 68.105 10.95 78.605 26.7 79.955 36 Z"
    }, {
      key: "o",
      path: "M 105.755 73.05 C 105.755 96.45 120.155 112.8 140.705 112.8 A 34.649 34.649 0 0 0 159.566 107.617 C 169.936 101.02 175.955 88.589 175.955 73.05 A 44.935 44.935 0 0 0 171.942 54.068 C 167.963 45.488 161.345 39.13 153.549 35.882 A 31.378 31.378 0 0 0 141.455 33.45 A 34.548 34.548 0 0 0 107.783 58.874 A 48.226 48.226 0 0 0 105.755 73.05 Z M 159.974 91.404 A 36.681 36.681 0 0 0 164.855 72.6 A 37.993 37.993 0 0 0 162.126 58.086 A 22.647 22.647 0 0 0 141.005 42.9 A 26.656 26.656 0 0 0 140.303 42.909 C 130.618 43.165 123.736 48.705 120.029 56.873 A 38.58 38.58 0 0 0 116.855 72.75 A 38.076 38.076 0 0 0 119.883 87.876 A 22.615 22.615 0 0 0 140.705 102.75 A 22.002 22.002 0 0 0 159.974 91.404 Z"
    }, {
      key: "n",
      path: "M 191.705 111.45 L 202.505 111.45 L 202.505 70.35 A 29.555 29.555 0 0 1 208.034 53.018 A 21.273 21.273 0 0 1 225.005 43.65 A 20.491 20.491 0 0 1 233.972 45.532 C 238.484 47.702 241.599 51.657 243.256 56.913 A 33.301 33.301 0 0 1 244.655 66.9 L 244.655 111.45 L 255.755 111.45 L 255.755 66.15 A 39.336 39.336 0 0 0 253.084 51.49 C 248.619 40.337 239.02 33.6 227.855 33.6 A 30.4 30.4 0 0 0 212.61 37.436 A 26.64 26.64 0 0 0 202.805 47.25 A 0.563 0.563 0 0 0 202.725 47.35 C 202.648 47.473 202.622 47.616 202.505 47.85 L 202.505 34.95 L 191.705 34.95 L 191.705 111.45 Z"
    }, {
      key: "t",
      path: "M 291.755 15.3 L 280.805 15.3 L 280.805 26.25 L 280.805 24 L 280.805 34.95 L 268.955 34.95 L 268.955 43.65 L 280.805 43.65 L 280.805 79.95 C 280.661 100.085 288.929 111.532 303.889 112.442 A 32.405 32.405 0 0 0 305.855 112.5 C 318.668 112.5 329.557 101.106 329.557 86.99 A 27.486 27.486 0 0 0 329.555 86.7 L 320.555 84.75 C 319.055 97.5 312.305 102.75 306.005 102.75 A 13.875 13.875 0 0 1 299.303 101.22 C 295.043 98.915 292.702 94.082 291.913 87.242 A 50.717 50.717 0 0 1 291.605 81.45 L 291.605 43.65 L 325.505 43.65 L 325.505 34.95 L 291.605 34.95 C 291.605 34.95 291.755 15.3 291.755 15.3 Z"
    }, {
      key: "a",
      path: "M 391.355 97.35 L 391.355 111.45 L 402.305 111.45 L 402.305 64.65 C 402.305 45.244 390.182 34.516 374.385 33.656 A 38.262 38.262 0 0 0 372.305 33.6 C 355.436 33.6 344.46 44.761 342.703 54.011 A 13.627 13.627 0 0 0 342.455 56.55 L 352.505 58.8 C 352.771 52.41 359.182 44.838 367.962 43.216 A 18.936 18.936 0 0 1 371.405 42.9 A 18.769 18.769 0 0 1 389.102 52.792 C 390.142 54.916 390.841 57.414 391.097 60.317 A 28.864 28.864 0 0 1 391.205 62.85 L 391.205 64.65 C 345.741 66.795 340.476 80.386 340.082 90.877 A 40.602 40.602 0 0 0 340.055 92.4 C 340.055 101.53 346.669 109.778 358.48 111.947 A 35.014 35.014 0 0 0 364.805 112.5 A 37.196 37.196 0 0 0 372.587 111.719 C 383.057 109.484 388.659 102.866 391.355 97.35 Z M 391.355 74.1 L 391.355 79.35 C 391.205 92.55 378.755 102.75 367.955 102.6 A 26.5 26.5 0 0 1 359.949 101.458 C 354.562 99.737 350.947 96.067 351.155 90.45 A 11.06 11.06 0 0 1 355.106 82.221 C 359.905 77.983 369.916 74.774 389.525 74.15 A 207.042 207.042 0 0 1 391.355 74.1 Z"
    }, {
      key: "c",
      path: "M 470.555 58.65 L 480.455 57.15 A 21.633 21.633 0 0 0 479.916 54.171 C 477.889 46.158 471.208 38.144 460.697 35.067 A 33.677 33.677 0 0 0 451.205 33.75 A 35.41 35.41 0 0 0 417.743 59.937 A 46.147 46.147 0 0 0 415.655 73.8 A 37.707 37.707 0 0 0 439.804 110.898 A 37.973 37.973 0 0 0 451.955 112.8 A 30.689 30.689 0 0 0 470.179 107.029 A 29.243 29.243 0 0 0 481.955 86.7 L 471.755 84.75 C 471.063 93.058 464.875 101.365 454.136 102.594 A 24.437 24.437 0 0 1 451.355 102.75 A 24.722 24.722 0 0 1 440.343 100.369 C 431.181 95.873 426.755 85.513 426.755 73.65 C 426.755 61.675 431.346 52.062 438.672 47.032 A 21.86 21.86 0 0 1 451.205 43.2 A 20.508 20.508 0 0 1 457.832 44.262 C 465.597 46.898 469.838 53.869 470.555 58.65 Z"
    }, {
      key: "t",
      path: "M 513.455 15.3 L 502.505 15.3 L 502.505 26.25 L 502.505 24 L 502.505 34.95 L 490.655 34.95 L 490.655 43.65 L 502.505 43.65 L 502.505 79.95 C 502.361 100.085 510.629 111.532 525.589 112.442 A 32.405 32.405 0 0 0 527.555 112.5 C 540.368 112.5 551.257 101.106 551.257 86.99 A 27.486 27.486 0 0 0 551.255 86.7 L 542.255 84.75 C 540.755 97.5 534.005 102.75 527.705 102.75 A 13.875 13.875 0 0 1 521.003 101.22 C 516.743 98.915 514.402 94.082 513.613 87.242 A 50.717 50.717 0 0 1 513.305 81.45 L 513.305 43.65 L 547.205 43.65 L 547.205 34.95 L 513.305 34.95 C 513.305 34.95 513.455 15.3 513.455 15.3 Z"
    }]
  },
  content: {
    type: "text",
    data: "\n              <div class=\"animated social-wrapper\">\n                <span class=\"mail-text animated\">\n                <small>Hello there <span class=\"waving-hand\">\uD83D\uDC4B</span></small>\n                <span class=\"t1\">Let\u2019s</span> <span class=\"t2\">start</span> <span class=\"t3\">talking!</span>\n                </span>\n\n                <a class=\"mail-button animated\" href=\"mailto:hello@burak.works\">hello@burak.works</a>\n\n                <div class=\"animated social d-flex\">\n\n                    <a title=\"github\" class=\"d-flex\" target=\"_blank\" href=\"https://github.com/burakkarakaya\">\n                        <span>Github</span>\n                    </a>\n\n                    <a title=\"linkedin\" class=\"d-flex\" target=\"_blank\" href=\"https://www.linkedin.com/in/brkkrky/\">\n                        <span>Linkedin</span>\n                    </a>\n\n                    <a title=\"instagram\" class=\"d-flex fs-20\" target=\"_blank\" href=\"https://www.instagram.com/travel.with.burak/\">\n                        <span>Instagram</span>\n                    </a>\n\n                    <a title=\"twitter\" class=\"d-flex\" target=\"_blank\" href=\"https://twitter.com/brk_efe\">\n                        <span>Twitter</span>\n                    </a>\n\n                </div>\n              </div>\n            "
  }
}, {
  key: "center",
  layer: {
    color: "#000000",
    distance: 50,
    radius: 11,
    speed: 0,
    duration: 1
  }
}];
var colorSchemes = exports.colorSchemes = [["#e9e6c4", "#bee7c3", "#c7dcd9", "#f5e4d9"], ["#CD8D7A", "#FFE4C9", "#E78895", "#E2BFB3"], ["#7BD3EA", "#A1EEBD", "#F6F7C4", "#F6D6D6"], ["#8E7AB5", "#B784B7", "#E493B3", "#EEA5A6"], ["#944E63", "#B47B84", "#CAA6A6", "#FFE7E7"], ["#FF407D", "#FFCAD4", "#40679E", "#1B3C73"], ["#35374B", "#344955", "#50727B", "#78A083"], ["#5E1675", "#EE4266", "#FFD23F", "#337357"]];
},{"../icons.svg":"assets/icons.svg"}],"assets/js/enums/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENT_TYPES = exports.CONTENT_TYPE = exports.ANIMATION = void 0;
var EVENT_TYPES = exports.EVENT_TYPES = {
  RESIZE: 'EVENTS_ON_RESIZE',
  RESIZE_STOP: 'EVENTS_ON_RESIZE_STOP',
  MOUSE_MOVE: 'EVENTS_ON_MOUSE_MOVE',
  MOUSE_ENTER: 'EVENTS_ON_MOUSE_ENTER',
  MOUSE_LEAVE: 'EVENTS_ON_MOUSE_LEAVE',
  CLICK: 'EVENTS_ON_CLICK',
  ANIMATION_END: 'ANIMATION_END'
};
var ANIMATION = exports.ANIMATION = {
  SPEED_X: 0.12,
  SPEED_Y: 0.4,
  EASE: 'sine.out'
};
var CONTENT_TYPE = exports.CONTENT_TYPE = {
  list: 'list',
  text: 'text',
  form: 'form'
};
},{}],"assets/js/events.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var helper = _interopRequireWildcard(require("./utils/helper"));
var _enums = require("./enums");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Events = /*#__PURE__*/function () {
  function Events(callback) {
    _classCallCheck(this, Events);
    this.callback = callback;
    this.timeOutFunctionId;
    this.duration = 555;
    this.isMobile = helper.mobile.detect();
    this.throttledMouseMove = helper.throttle(this.onMouseMove.bind(this), 16);
    var windowDimensions = helper.getWindowSize();
    this._mousePosition = {
      x: windowDimensions.centerX,
      y: windowDimensions.centerY
    };
    this.reAnimate = this.reAnimate.bind(this);
  }
  _createClass(Events, [{
    key: "handleEvent",
    value: function handleEvent(_ref) {
      var type = _ref.type,
        evt = _ref.evt;
      if (typeof this.callback !== 'undefined') {
        this.callback({
          type: type,
          evt: evt
        });
      }
    }
  }, {
    key: "onAdjust",
    value: function onAdjust(evt) {
      var _this = this;
      this.handleEvent({
        type: _enums.EVENT_TYPES.RESIZE,
        evt: evt
      });
      if (this.timeOutFunctionId) clearTimeout(this.timeOutFunctionId);
      this.timeOutFunctionId = setTimeout(function () {
        _this.handleEvent({
          type: _enums.EVENT_TYPES.RESIZE_STOP,
          evt: evt
        });
      }, this.duration);
    }
  }, {
    key: "reAnimate",
    value: function reAnimate() {
      this.handleEvent({
        type: _enums.EVENT_TYPES.MOUSE_MOVE,
        evt: this._mousePosition
      });
      window.requestAnimationFrame(this.reAnimate);
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(evt) {
      this._mousePosition = helper.getMousePos(evt);
      //this.handleEvent({ type: EVENT_TYPES.MOUSE_MOVE, evt: evt });
    }
  }, {
    key: "onMouseEnter",
    value: function onMouseEnter(evt) {
      this.handleEvent({
        type: _enums.EVENT_TYPES.MOUSE_ENTER,
        evt: evt
      });
    }
  }, {
    key: "onMouseLeave",
    value: function onMouseLeave(evt) {
      var windowDimensions = helper.getWindowSize();
      this._mousePosition = {
        x: windowDimensions.centerX,
        y: windowDimensions.centerY
      };
      this.handleEvent({
        type: _enums.EVENT_TYPES.MOUSE_LEAVE,
        evt: evt
      });
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      window.addEventListener('resize', this.onAdjust.bind(this), false);
      if (!this.isMobile) {
        document.addEventListener('mousemove', this.throttledMouseMove, false);
        document.addEventListener('mouseenter', this.onMouseEnter.bind(this), false);
        document.addEventListener('mouseleave', this.onMouseLeave.bind(this), false);
      }
    }
  }, {
    key: "removeEventListeners",
    value: function removeEventListeners() {
      window.removeEventListener('resize', this.onAdjust.bind(this), false);
      if (!this.isMobile) {
        document.removeEventListener('mousemove', this.throttledMouseMove, false);
        document.removeEventListener('mouseenter', this.onMouseEnter.bind(this), false);
        document.removeEventListener('mouseleave', this.onMouseLeave.bind(this), false);
      }
    }
  }, {
    key: "init",
    value: function init() {
      this.addEventListeners();
      this.onAdjust(new Event('resize'));
      this.reAnimate();
      //this.onMouseMove(new Event('mousemove'));
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.removeEventListeners();
    }
  }]);
  return Events;
}();
var _default = exports.default = Events;
},{"./utils/helper":"assets/js/utils/helper.js","./enums":"assets/js/enums/index.js"}],"../node_modules/gsap/gsap-core.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapYoyo = exports.wrap = exports.unitize = exports.toArray = exports.splitColor = exports.snap = exports.shuffle = exports.selector = exports.random = exports.pipe = exports.normalize = exports.mapRange = exports.interpolate = exports.gsap = exports.getUnit = exports.distribute = exports.default = exports.clamp = exports._ticker = exports._sortPropTweensByPriority = exports._setDefaults = exports._roundModifier = exports._round = exports._replaceRandom = exports._renderComplexString = exports._removeLinkedListItem = exports._relExp = exports._plugins = exports._parseRelative = exports._numWithUnitExp = exports._numExp = exports._missingPlugin = exports._isUndefined = exports._isString = exports._getSetter = exports._getProperty = exports._getCache = exports._forEachName = exports._config = exports._colorStringFilter = exports._colorExp = exports._checkPlugin = exports.TweenMax = exports.TweenLite = exports.Tween = exports.TimelineMax = exports.TimelineLite = exports.Timeline = exports.Strong = exports.SteppedEase = exports.Sine = exports.Quint = exports.Quart = exports.Quad = exports.PropTween = exports.Power4 = exports.Power3 = exports.Power2 = exports.Power1 = exports.Power0 = exports.Linear = exports.GSCache = exports.Expo = exports.Elastic = exports.Cubic = exports.Circ = exports.Bounce = exports.Back = exports.Animation = void 0;
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/*!
 * GSAP 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var _config = exports._config = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: {
      lineHeight: ""
    }
  },
  _defaults = {
    duration: .5,
    overwrite: false,
    delay: 0
  },
  _suppressOverwrites,
  _reverting,
  _context,
  _bigNum = 1e8,
  _tinyNum = 1 / _bigNum,
  _2PI = Math.PI * 2,
  _HALF_PI = _2PI / 4,
  _gsID = 0,
  _sqrt = Math.sqrt,
  _cos = Math.cos,
  _sin = Math.sin,
  _isString = exports._isString = function _isString(value) {
    return typeof value === "string";
  },
  _isFunction = function _isFunction(value) {
    return typeof value === "function";
  },
  _isNumber = function _isNumber(value) {
    return typeof value === "number";
  },
  _isUndefined = exports._isUndefined = function _isUndefined(value) {
    return typeof value === "undefined";
  },
  _isObject = function _isObject(value) {
    return typeof value === "object";
  },
  _isNotFalse = function _isNotFalse(value) {
    return value !== false;
  },
  _windowExists = function _windowExists() {
    return typeof window !== "undefined";
  },
  _isFuncOrString = function _isFuncOrString(value) {
    return _isFunction(value) || _isString(value);
  },
  _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function () {},
  // note: IE10 has ArrayBuffer, but NOT ArrayBuffer.isView().
  _isArray = Array.isArray,
  _strictNumExp = /(?:-?\.?\d|\.)+/gi,
  //only numbers (including negatives and decimals) but NOT relative values.
  _numExp = exports._numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
  //finds any numbers, including ones that start with += or -=, negative numbers, and ones in scientific notation like 1e-8.
  _numWithUnitExp = exports._numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
  _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
  //duplicate so that while we're looping through matches from exec(), it doesn't contaminate the lastIndex of _numExp which we use to search for colors too.
  _relExp = exports._relExp = /[+-]=-?[.\d]+/,
  _delimitedValueExp = /[^,'"\[\]\s]+/gi,
  // previously /[#\-+.]*\b[a-z\d\-=+%.]+/gi but didn't catch special characters.
  _unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
  _globalTimeline,
  _win,
  _coreInitted,
  _doc,
  _globals = {},
  _installScope = {},
  _coreReady,
  _install = function _install(scope) {
    return (_installScope = _merge(scope, _globals)) && gsap;
  },
  _missingPlugin = exports._missingPlugin = function _missingPlugin(property, value) {
    return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
  },
  _warn = function _warn(message, suppress) {
    return !suppress && console.warn(message);
  },
  _addGlobal = function _addGlobal(name, obj) {
    return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
  },
  _emptyFunc = function _emptyFunc() {
    return 0;
  },
  _startAtRevertConfig = {
    suppressEvents: true,
    isStart: true,
    kill: false
  },
  _revertConfigNoKill = {
    suppressEvents: true,
    kill: false
  },
  _revertConfig = {
    suppressEvents: true
  },
  _reservedProps = {},
  _lazyTweens = [],
  _lazyLookup = {},
  _lastRenderedFrame,
  _plugins = exports._plugins = {},
  _effects = {},
  _nextGCFrame = 30,
  _harnessPlugins = [],
  _callbackNames = "",
  _harness = function _harness(targets) {
    var target = targets[0],
      harnessPlugin,
      i;
    _isObject(target) || _isFunction(target) || (targets = [targets]);
    if (!(harnessPlugin = (target._gsap || {}).harness)) {
      // find the first target with a harness. We assume targets passed into an animation will be of similar type, meaning the same kind of harness can be used for them all (performance optimization)
      i = _harnessPlugins.length;
      while (i-- && !_harnessPlugins[i].targetTest(target)) {}
      harnessPlugin = _harnessPlugins[i];
    }
    i = targets.length;
    while (i--) {
      targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
    }
    return targets;
  },
  _getCache = exports._getCache = function _getCache(target) {
    return target._gsap || _harness(toArray(target))[0]._gsap;
  },
  _getProperty = exports._getProperty = function _getProperty(target, property, v) {
    return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
  },
  _forEachName = exports._forEachName = function _forEachName(names, func) {
    return (names = names.split(",")).forEach(func) || names;
  },
  //split a comma-delimited list of names into an array, then run a forEach() function and return the split array (this is just a way to consolidate/shorten some code).
  _round = exports._round = function _round(value) {
    return Math.round(value * 100000) / 100000 || 0;
  },
  _roundPrecise = function _roundPrecise(value) {
    return Math.round(value * 10000000) / 10000000 || 0;
  },
  // increased precision mostly for timing values.
  _parseRelative = exports._parseRelative = function _parseRelative(start, value) {
    var operator = value.charAt(0),
      end = parseFloat(value.substr(2));
    start = parseFloat(start);
    return operator === "+" ? start + end : operator === "-" ? start - end : operator === "*" ? start * end : start / end;
  },
  _arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
    //searches one array to find matches for any of the items in the toFind array. As soon as one is found, it returns true. It does NOT return all the matches; it's simply a boolean search.
    var l = toFind.length,
      i = 0;
    for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l;) {}
    return i < l;
  },
  _lazyRender = function _lazyRender() {
    var l = _lazyTweens.length,
      a = _lazyTweens.slice(0),
      i,
      tween;
    _lazyLookup = {};
    _lazyTweens.length = 0;
    for (i = 0; i < l; i++) {
      tween = a[i];
      tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
    }
  },
  _lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
    _lazyTweens.length && !_reverting && _lazyRender();
    animation.render(time, suppressEvents, force || _reverting && time < 0 && (animation._initted || animation._startAt));
    _lazyTweens.length && !_reverting && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
  },
  _numericIfPossible = function _numericIfPossible(value) {
    var n = parseFloat(value);
    return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
  },
  _passThrough = function _passThrough(p) {
    return p;
  },
  _setDefaults = exports._setDefaults = function _setDefaults(obj, defaults) {
    for (var p in defaults) {
      p in obj || (obj[p] = defaults[p]);
    }
    return obj;
  },
  _setKeyframeDefaults = function _setKeyframeDefaults(excludeDuration) {
    return function (obj, defaults) {
      for (var p in defaults) {
        p in obj || p === "duration" && excludeDuration || p === "ease" || (obj[p] = defaults[p]);
      }
    };
  },
  _merge = function _merge(base, toMerge) {
    for (var p in toMerge) {
      base[p] = toMerge[p];
    }
    return base;
  },
  _mergeDeep = function _mergeDeep(base, toMerge) {
    for (var p in toMerge) {
      p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
    }
    return base;
  },
  _copyExcluding = function _copyExcluding(obj, excluding) {
    var copy = {},
      p;
    for (p in obj) {
      p in excluding || (copy[p] = obj[p]);
    }
    return copy;
  },
  _inheritDefaults = function _inheritDefaults(vars) {
    var parent = vars.parent || _globalTimeline,
      func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults;
    if (_isNotFalse(vars.inherit)) {
      while (parent) {
        func(vars, parent.vars.defaults);
        parent = parent.parent || parent._dp;
      }
    }
    return vars;
  },
  _arraysMatch = function _arraysMatch(a1, a2) {
    var i = a1.length,
      match = i === a2.length;
    while (match && i-- && a1[i] === a2[i]) {}
    return i < 0;
  },
  _addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }
    if (lastProp === void 0) {
      lastProp = "_last";
    }
    var prev = parent[lastProp],
      t;
    if (sortBy) {
      t = child[sortBy];
      while (prev && prev[sortBy] > t) {
        prev = prev._prev;
      }
    }
    if (prev) {
      child._next = prev._next;
      prev._next = child;
    } else {
      child._next = parent[firstProp];
      parent[firstProp] = child;
    }
    if (child._next) {
      child._next._prev = child;
    } else {
      parent[lastProp] = child;
    }
    child._prev = prev;
    child.parent = child._dp = parent;
    return child;
  },
  _removeLinkedListItem = exports._removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }
    if (lastProp === void 0) {
      lastProp = "_last";
    }
    var prev = child._prev,
      next = child._next;
    if (prev) {
      prev._next = next;
    } else if (parent[firstProp] === child) {
      parent[firstProp] = next;
    }
    if (next) {
      next._prev = prev;
    } else if (parent[lastProp] === child) {
      parent[lastProp] = prev;
    }
    child._next = child._prev = child.parent = null; // don't delete the _dp just so we can revert if necessary. But parent should be null to indicate the item isn't in a linked list.
  },
  _removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
    child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove && child.parent.remove(child);
    child._act = 0;
  },
  _uncache = function _uncache(animation, child) {
    if (animation && (!child || child._end > animation._dur || child._start < 0)) {
      // performance optimization: if a child animation is passed in we should only uncache if that child EXTENDS the animation (its end time is beyond the end)
      var a = animation;
      while (a) {
        a._dirty = 1;
        a = a.parent;
      }
    }
    return animation;
  },
  _recacheAncestors = function _recacheAncestors(animation) {
    var parent = animation.parent;
    while (parent && parent.parent) {
      //sometimes we must force a re-sort of all children and update the duration/totalDuration of all ancestor timelines immediately in case, for example, in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
      parent._dirty = 1;
      parent.totalDuration();
      parent = parent.parent;
    }
    return animation;
  },
  _rewindStartAt = function _rewindStartAt(tween, totalTime, suppressEvents, force) {
    return tween._startAt && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween.vars.immediateRender && !tween.vars.autoRevert || tween._startAt.render(totalTime, true, force));
  },
  _hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
    return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
  },
  _elapsedCycleDuration = function _elapsedCycleDuration(animation) {
    return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
  },
  // feed in the totalTime and cycleDuration and it'll return the cycle (iteration minus 1) and if the playhead is exactly at the very END, it will NOT bump up to the next cycle.
  _animationCycle = function _animationCycle(tTime, cycleDuration) {
    var whole = Math.floor(tTime /= cycleDuration);
    return tTime && whole === tTime ? whole - 1 : whole;
  },
  _parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
    return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
  },
  _setEnd = function _setEnd(animation) {
    return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
  },
  _alignPlayhead = function _alignPlayhead(animation, totalTime) {
    // adjusts the animation's _start and _end according to the provided totalTime (only if the parent's smoothChildTiming is true and the animation isn't paused). It doesn't do any rendering or forcing things back into parent timelines, etc. - that's what totalTime() is for.
    var parent = animation._dp;
    if (parent && parent.smoothChildTiming && animation._ts) {
      animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));
      _setEnd(animation);
      parent._dirty || _uncache(parent, animation); //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
    }
    return animation;
  },
  /*
  _totalTimeToTime = (clampedTotalTime, duration, repeat, repeatDelay, yoyo) => {
  	let cycleDuration = duration + repeatDelay,
  		time = _round(clampedTotalTime % cycleDuration);
  	if (time > duration) {
  		time = duration;
  	}
  	return (yoyo && (~~(clampedTotalTime / cycleDuration) & 1)) ? duration - time : time;
  },
  */
  _postAddChecks = function _postAddChecks(timeline, child) {
    var t;
    if (child._time || !child._dur && child._initted || child._start < timeline._time && (child._dur || !child.add)) {
      // in case, for example, the _start is moved on a tween that has already rendered, or if it's being inserted into a timeline BEFORE where the playhead is currently. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning. Special case: if it's a timeline (has .add() method) and no duration, we can skip rendering because the user may be populating it AFTER adding it to a parent timeline (unconventional, but possible, and we wouldn't want it to get removed if the parent's autoRemoveChildren is true).
      t = _parentToChildTotalTime(timeline.rawTime(), child);
      if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
        child.render(t, true);
      }
    } //if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.

    if (_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
      //in case any of the ancestors had completed but should now be enabled...
      if (timeline._dur < timeline.duration()) {
        t = timeline;
        while (t._dp) {
          t.rawTime() >= 0 && t.totalTime(t._tTime); //moves the timeline (shifts its startTime) if necessary, and also enables it. If it's currently zero, though, it may not be scheduled to render until later so there's no need to force it to align with the current playhead position. Only move to catch up with the playhead.

          t = t._dp;
        }
      }
      timeline._zTime = -_tinyNum; // helps ensure that the next render() will be forced (crossingStart = true in render()), even if the duration hasn't changed (we're adding a child which would need to get rendered). Definitely an edge case. Note: we MUST do this AFTER the loop above where the totalTime() might trigger a render() because this _addToTimeline() method gets called from the Animation constructor, BEFORE tweens even record their targets, etc. so we wouldn't want things to get triggered in the wrong order.
    }
  },
  _addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
    child.parent && _removeFromParent(child);
    child._start = _roundPrecise((_isNumber(position) ? position : position || timeline !== _globalTimeline ? _parsePosition(timeline, position, child) : timeline._time) + child._delay);
    child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));
    _addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);
    _isFromOrFromStart(child) || (timeline._recent = child);
    skipChecks || _postAddChecks(timeline, child);
    timeline._ts < 0 && _alignPlayhead(timeline, timeline._tTime); // if the timeline is reversed and the new child makes it longer, we may need to adjust the parent's _start (push it back)

    return timeline;
  },
  _scrollTrigger = function _scrollTrigger(animation, trigger) {
    return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
  },
  _attemptInitTween = function _attemptInitTween(tween, time, force, suppressEvents, tTime) {
    _initTween(tween, time, tTime);
    if (!tween._initted) {
      return 1;
    }
    if (!force && tween._pt && !_reverting && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
      _lazyTweens.push(tween);
      tween._lazy = [tTime, suppressEvents];
      return 1;
    }
  },
  _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart(_ref) {
    var parent = _ref.parent;
    return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart(parent));
  },
  // check parent's _lock because when a timeline repeats/yoyos and does its artificial wrapping, we shouldn't force the ratio back to 0
  _isFromOrFromStart = function _isFromOrFromStart(_ref2) {
    var data = _ref2.data;
    return data === "isFromStart" || data === "isStart";
  },
  _renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
    var prevRatio = tween.ratio,
      ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1,
      // if the tween or its parent is reversed and the totalTime is 0, we should go to a ratio of 0. Edge case: if a from() or fromTo() stagger tween is placed later in a timeline, the "startAt" zero-duration tween could initially render at a time when the parent timeline's playhead is technically BEFORE where this tween is, so make sure that any "from" and "fromTo" startAt tweens are rendered the first time at a ratio of 1.
      repeatDelay = tween._rDelay,
      tTime = 0,
      pt,
      iteration,
      prevIteration;
    if (repeatDelay && tween._repeat) {
      // in case there's a zero-duration tween that has a repeat with a repeatDelay
      tTime = _clamp(0, tween._tDur, totalTime);
      iteration = _animationCycle(tTime, repeatDelay);
      tween._yoyo && iteration & 1 && (ratio = 1 - ratio);
      if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
        // if iteration changed
        prevRatio = 1 - ratio;
        tween.vars.repeatRefresh && tween._initted && tween.invalidate();
      }
    }
    if (ratio !== prevRatio || _reverting || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
      if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents, tTime)) {
        // if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
        return;
      }
      prevIteration = tween._zTime;
      tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0); // when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

      suppressEvents || (suppressEvents = totalTime && !prevIteration); // if it was rendered previously at exactly 0 (_zTime) and now the playhead is moving away, DON'T fire callbacks otherwise they'll seem like duplicates.

      tween.ratio = ratio;
      tween._from && (ratio = 1 - ratio);
      tween._time = 0;
      tween._tTime = tTime;
      pt = tween._pt;
      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
      totalTime < 0 && _rewindStartAt(tween, totalTime, suppressEvents, true);
      tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
      tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");
      if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
        ratio && _removeFromParent(tween, 1);
        if (!suppressEvents && !_reverting) {
          _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);
          tween._prom && tween._prom();
        }
      }
    } else if (!tween._zTime) {
      tween._zTime = totalTime;
    }
  },
  _findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
    var child;
    if (time > prevTime) {
      child = animation._first;
      while (child && child._start <= time) {
        if (child.data === "isPause" && child._start > prevTime) {
          return child;
        }
        child = child._next;
      }
    } else {
      child = animation._last;
      while (child && child._start >= time) {
        if (child.data === "isPause" && child._start < prevTime) {
          return child;
        }
        child = child._prev;
      }
    }
  },
  _setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
    var repeat = animation._repeat,
      dur = _roundPrecise(duration) || 0,
      totalProgress = animation._tTime / animation._tDur;
    totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
    animation._dur = dur;
    animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
    totalProgress > 0 && !leavePlayhead && _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress);
    animation.parent && _setEnd(animation);
    skipUncache || _uncache(animation.parent, animation);
    return animation;
  },
  _onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
    return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
  },
  _zeroPosition = {
    _start: 0,
    endTime: _emptyFunc,
    totalDuration: _emptyFunc
  },
  _parsePosition = function _parsePosition(animation, position, percentAnimation) {
    var labels = animation.labels,
      recent = animation._recent || _zeroPosition,
      clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur,
      //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
      i,
      offset,
      isPercent;
    if (_isString(position) && (isNaN(position) || position in labels)) {
      //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
      offset = position.charAt(0);
      isPercent = position.substr(-1) === "%";
      i = position.indexOf("=");
      if (offset === "<" || offset === ">") {
        i >= 0 && (position = position.replace(/=/, ""));
        return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
      }
      if (i < 0) {
        position in labels || (labels[position] = clippedDuration);
        return labels[position];
      }
      offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));
      if (isPercent && percentAnimation) {
        offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
      }
      return i > 1 ? _parsePosition(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
    }
    return position == null ? clippedDuration : +position;
  },
  _createTweenType = function _createTweenType(type, params, timeline) {
    var isLegacy = _isNumber(params[1]),
      varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1),
      vars = params[varsIndex],
      irVars,
      parent;
    isLegacy && (vars.duration = params[1]);
    vars.parent = timeline;
    if (type) {
      irVars = vars;
      parent = timeline;
      while (parent && !("immediateRender" in irVars)) {
        // inheritance hasn't happened yet, but someone may have set a default in an ancestor timeline. We could do vars.immediateRender = _isNotFalse(_inheritDefaults(vars).immediateRender) but that'd exact a slight performance penalty because _inheritDefaults() also runs in the Tween constructor. We're paying a small kb price here to gain speed.
        irVars = parent.vars.defaults || {};
        parent = _isNotFalse(parent.vars.inherit) && parent.parent;
      }
      vars.immediateRender = _isNotFalse(irVars.immediateRender);
      type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1]; // "from" vars
    }
    return new Tween(params[0], vars, params[varsIndex + 1]);
  },
  _conditionalReturn = function _conditionalReturn(value, func) {
    return value || value === 0 ? func(value) : func;
  },
  _clamp = function _clamp(min, max, value) {
    return value < min ? min : value > max ? max : value;
  },
  getUnit = exports.getUnit = function getUnit(value, v) {
    return !_isString(value) || !(v = _unitExp.exec(value)) ? "" : v[1];
  },
  // note: protect against padded numbers as strings, like "100.100". That shouldn't return "00" as the unit. If it's numeric, return no unit.
  clamp = exports.clamp = function clamp(min, max, value) {
    return _conditionalReturn(value, function (v) {
      return _clamp(min, max, v);
    });
  },
  _slice = [].slice,
  _isArrayLike = function _isArrayLike(value, nonEmpty) {
    return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
  },
  _flatten = function _flatten(ar, leaveStrings, accumulator) {
    if (accumulator === void 0) {
      accumulator = [];
    }
    return ar.forEach(function (value) {
      var _accumulator;
      return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
    }) || accumulator;
  },
  //takes any value and returns an array. If it's a string (and leaveStrings isn't true), it'll use document.querySelectorAll() and convert that to an array. It'll also accept iterables like jQuery objects.
  toArray = exports.toArray = function toArray(value, scope, leaveStrings) {
    return _context && !scope && _context.selector ? _context.selector(value) : _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call((scope || _doc).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
  },
  selector = exports.selector = function selector(value) {
    value = toArray(value)[0] || _warn("Invalid scope") || {};
    return function (v) {
      var el = value.current || value.nativeElement || value;
      return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc.createElement("div") : value);
    };
  },
  shuffle = exports.shuffle = function shuffle(a) {
    return a.sort(function () {
      return .5 - Math.random();
    });
  },
  // alternative that's a bit faster and more reliably diverse but bigger:   for (let j, v, i = a.length; i; j = Math.floor(Math.random() * i), v = a[--i], a[i] = a[j], a[j] = v); return a;
  //for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
  distribute = exports.distribute = function distribute(v) {
    if (_isFunction(v)) {
      return v;
    }
    var vars = _isObject(v) ? v : {
        each: v
      },
      //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
      ease = _parseEase(vars.ease),
      from = vars.from || 0,
      base = parseFloat(vars.base) || 0,
      cache = {},
      isDecimal = from > 0 && from < 1,
      ratios = isNaN(from) || isDecimal,
      axis = vars.axis,
      ratioX = from,
      ratioY = from;
    if (_isString(from)) {
      ratioX = ratioY = {
        center: .5,
        edges: .5,
        end: 1
      }[from] || 0;
    } else if (!isDecimal && ratios) {
      ratioX = from[0];
      ratioY = from[1];
    }
    return function (i, target, a) {
      var l = (a || vars).length,
        distances = cache[l],
        originX,
        originY,
        x,
        y,
        d,
        j,
        max,
        min,
        wrapAt;
      if (!distances) {
        wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];
        if (!wrapAt) {
          max = -_bigNum;
          while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {}
          wrapAt < l && wrapAt--;
        }
        distances = cache[l] = [];
        originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
        originY = wrapAt === _bigNum ? 0 : ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
        max = 0;
        min = _bigNum;
        for (j = 0; j < l; j++) {
          x = j % wrapAt - originX;
          y = originY - (j / wrapAt | 0);
          distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
          d > max && (max = d);
          d < min && (min = d);
        }
        from === "random" && shuffle(distances);
        distances.max = max - min;
        distances.min = min;
        distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
        distances.b = l < 0 ? base - l : base;
        distances.u = getUnit(vars.amount || vars.each) || 0; //unit

        ease = ease && l < 0 ? _invertEase(ease) : ease;
      }
      l = (distances[i] - distances.min) / distances.max || 0;
      return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u; //round in order to work around floating point errors
    };
  },
  _roundModifier = exports._roundModifier = function _roundModifier(v) {
    //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
    var p = Math.pow(10, ((v + "").split(".")[1] || "").length); //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed())

    return function (raw) {
      var n = _roundPrecise(Math.round(parseFloat(raw) / v) * v * p);
      return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw)); // n - n % 1 replaces Math.floor() in order to handle negative values properly. For example, Math.floor(-150.00000000000003) is 151!
    };
  },
  snap = exports.snap = function snap(snapTo, value) {
    var isArray = _isArray(snapTo),
      radius,
      is2D;
    if (!isArray && _isObject(snapTo)) {
      radius = isArray = snapTo.radius || _bigNum;
      if (snapTo.values) {
        snapTo = toArray(snapTo.values);
        if (is2D = !_isNumber(snapTo[0])) {
          radius *= radius; //performance optimization so we don't have to Math.sqrt() in the loop.
        }
      } else {
        snapTo = _roundModifier(snapTo.increment);
      }
    }
    return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function (raw) {
      is2D = snapTo(raw);
      return Math.abs(is2D - raw) <= radius ? is2D : raw;
    } : function (raw) {
      var x = parseFloat(is2D ? raw.x : raw),
        y = parseFloat(is2D ? raw.y : 0),
        min = _bigNum,
        closest = 0,
        i = snapTo.length,
        dx,
        dy;
      while (i--) {
        if (is2D) {
          dx = snapTo[i].x - x;
          dy = snapTo[i].y - y;
          dx = dx * dx + dy * dy;
        } else {
          dx = Math.abs(snapTo[i] - x);
        }
        if (dx < min) {
          min = dx;
          closest = i;
        }
      }
      closest = !radius || min <= radius ? snapTo[closest] : raw;
      return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
    });
  },
  random = exports.random = function random(min, max, roundingIncrement, returnFunction) {
    return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function () {
      return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * .99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
    });
  },
  pipe = exports.pipe = function pipe() {
    for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
      functions[_key] = arguments[_key];
    }
    return function (value) {
      return functions.reduce(function (v, f) {
        return f(v);
      }, value);
    };
  },
  unitize = exports.unitize = function unitize(func, unit) {
    return function (value) {
      return func(parseFloat(value)) + (unit || getUnit(value));
    };
  },
  normalize = exports.normalize = function normalize(min, max, value) {
    return mapRange(min, max, 0, 1, value);
  },
  _wrapArray = function _wrapArray(a, wrapper, value) {
    return _conditionalReturn(value, function (index) {
      return a[~~wrapper(index)];
    });
  },
  wrap = exports.wrap = function wrap(min, max, value) {
    // NOTE: wrap() CANNOT be an arrow function! A very odd compiling bug causes problems (unrelated to GSAP).
    var range = max - min;
    return _isArray(min) ? _wrapArray(min, wrap(0, min.length), max) : _conditionalReturn(value, function (value) {
      return (range + (value - min) % range) % range + min;
    });
  },
  wrapYoyo = exports.wrapYoyo = function wrapYoyo(min, max, value) {
    var range = max - min,
      total = range * 2;
    return _isArray(min) ? _wrapArray(min, wrapYoyo(0, min.length - 1), max) : _conditionalReturn(value, function (value) {
      value = (total + (value - min) % total) % total || 0;
      return min + (value > range ? total - value : value);
    });
  },
  _replaceRandom = exports._replaceRandom = function _replaceRandom(value) {
    //replaces all occurrences of random(...) in a string with the calculated random value. can be a range like random(-100, 100, 5) or an array like random([0, 100, 500])
    var prev = 0,
      s = "",
      i,
      nums,
      end,
      isArray;
    while (~(i = value.indexOf("random(", prev))) {
      end = value.indexOf(")", i);
      isArray = value.charAt(i + 7) === "[";
      nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
      s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
      prev = end + 1;
    }
    return s + value.substr(prev, value.length - prev);
  },
  mapRange = exports.mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
    var inRange = inMax - inMin,
      outRange = outMax - outMin;
    return _conditionalReturn(value, function (value) {
      return outMin + ((value - inMin) / inRange * outRange || 0);
    });
  },
  interpolate = exports.interpolate = function interpolate(start, end, progress, mutate) {
    var func = isNaN(start + end) ? 0 : function (p) {
      return (1 - p) * start + p * end;
    };
    if (!func) {
      var isString = _isString(start),
        master = {},
        p,
        i,
        interpolators,
        l,
        il;
      progress === true && (mutate = 1) && (progress = null);
      if (isString) {
        start = {
          p: start
        };
        end = {
          p: end
        };
      } else if (_isArray(start) && !_isArray(end)) {
        interpolators = [];
        l = start.length;
        il = l - 2;
        for (i = 1; i < l; i++) {
          interpolators.push(interpolate(start[i - 1], start[i])); //build the interpolators up front as a performance optimization so that when the function is called many times, it can just reuse them.
        }
        l--;
        func = function func(p) {
          p *= l;
          var i = Math.min(il, ~~p);
          return interpolators[i](p - i);
        };
        progress = end;
      } else if (!mutate) {
        start = _merge(_isArray(start) ? [] : {}, start);
      }
      if (!interpolators) {
        for (p in end) {
          _addPropTween.call(master, start, p, "get", end[p]);
        }
        func = function func(p) {
          return _renderPropTweens(p, master) || (isString ? start.p : start);
        };
      }
    }
    return _conditionalReturn(progress, func);
  },
  _getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
    //used for nextLabel() and previousLabel()
    var labels = timeline.labels,
      min = _bigNum,
      p,
      distance,
      label;
    for (p in labels) {
      distance = labels[p] - fromTime;
      if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
        label = p;
        min = distance;
      }
    }
    return label;
  },
  _callback = function _callback(animation, type, executeLazyFirst) {
    var v = animation.vars,
      callback = v[type],
      prevContext = _context,
      context = animation._ctx,
      params,
      scope,
      result;
    if (!callback) {
      return;
    }
    params = v[type + "Params"];
    scope = v.callbackScope || animation;
    executeLazyFirst && _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.

    context && (_context = context);
    result = params ? callback.apply(scope, params) : callback.call(scope);
    _context = prevContext;
    return result;
  },
  _interrupt = function _interrupt(animation) {
    _removeFromParent(animation);
    animation.scrollTrigger && animation.scrollTrigger.kill(!!_reverting);
    animation.progress() < 1 && _callback(animation, "onInterrupt");
    return animation;
  },
  _quickTween,
  _registerPluginQueue = [],
  _createPlugin = function _createPlugin(config) {
    if (!config) return;
    config = !config.name && config["default"] || config; // UMD packaging wraps things oddly, so for example MotionPathHelper becomes {MotionPathHelper:MotionPathHelper, default:MotionPathHelper}.

    if (_windowExists() || config.headless) {
      // edge case: some build tools may pass in a null/undefined value
      var name = config.name,
        isFunc = _isFunction(config),
        Plugin = name && !isFunc && config.init ? function () {
          this._props = [];
        } : config,
        //in case someone passes in an object that's not a plugin, like CustomEase
        instanceDefaults = {
          init: _emptyFunc,
          render: _renderPropTweens,
          add: _addPropTween,
          kill: _killPropTweensOf,
          modifier: _addPluginModifier,
          rawVars: 0
        },
        statics = {
          targetTest: 0,
          get: 0,
          getSetter: _getSetter,
          aliases: {},
          register: 0
        };
      _wake();
      if (config !== Plugin) {
        if (_plugins[name]) {
          return;
        }
        _setDefaults(Plugin, _setDefaults(_copyExcluding(config, instanceDefaults), statics)); //static methods

        _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics))); //instance methods

        _plugins[Plugin.prop = name] = Plugin;
        if (config.targetTest) {
          _harnessPlugins.push(Plugin);
          _reservedProps[name] = 1;
        }
        name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin"; //for the global name. "motionPath" should become MotionPathPlugin
      }
      _addGlobal(name, Plugin);
      config.register && config.register(gsap, Plugin, PropTween);
    } else {
      _registerPluginQueue.push(config);
    }
  },
  /*
   * --------------------------------------------------------------------------------------
   * COLORS
   * --------------------------------------------------------------------------------------
   */
  _255 = 255,
  _colorLookup = {
    aqua: [0, _255, _255],
    lime: [0, _255, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, _255],
    navy: [0, 0, 128],
    white: [_255, _255, _255],
    olive: [128, 128, 0],
    yellow: [_255, _255, 0],
    orange: [_255, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [_255, 0, 0],
    pink: [_255, 192, 203],
    cyan: [0, _255, _255],
    transparent: [_255, _255, _255, 0]
  },
  // possible future idea to replace the hard-coded color name values - put this in the ticker.wake() where we set the _doc:
  // let ctx = _doc.createElement("canvas").getContext("2d");
  // _forEachName("aqua,lime,silver,black,maroon,teal,blue,navy,white,olive,yellow,orange,gray,purple,green,red,pink,cyan", color => {ctx.fillStyle = color; _colorLookup[color] = splitColor(ctx.fillStyle)});
  _hue = function _hue(h, m1, m2) {
    h += h < 0 ? 1 : h > 1 ? -1 : 0;
    return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + .5 | 0;
  },
  splitColor = exports.splitColor = function splitColor(v, toHSL, forceAlpha) {
    var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0,
      r,
      g,
      b,
      h,
      s,
      l,
      max,
      min,
      d,
      wasHSL;
    if (!a) {
      if (v.substr(-1) === ",") {
        //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
        v = v.substr(0, v.length - 1);
      }
      if (_colorLookup[v]) {
        a = _colorLookup[v];
      } else if (v.charAt(0) === "#") {
        if (v.length < 6) {
          //for shorthand like #9F0 or #9F0F (could have alpha)
          r = v.charAt(1);
          g = v.charAt(2);
          b = v.charAt(3);
          v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
        }
        if (v.length === 9) {
          // hex with alpha, like #fd5e53ff
          a = parseInt(v.substr(1, 6), 16);
          return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
        }
        v = parseInt(v.substr(1), 16);
        a = [v >> 16, v >> 8 & _255, v & _255];
      } else if (v.substr(0, 3) === "hsl") {
        a = wasHSL = v.match(_strictNumExp);
        if (!toHSL) {
          h = +a[0] % 360 / 360;
          s = +a[1] / 100;
          l = +a[2] / 100;
          g = l <= .5 ? l * (s + 1) : l + s - l * s;
          r = l * 2 - g;
          a.length > 3 && (a[3] *= 1); //cast as number

          a[0] = _hue(h + 1 / 3, r, g);
          a[1] = _hue(h, r, g);
          a[2] = _hue(h - 1 / 3, r, g);
        } else if (~v.indexOf("=")) {
          //if relative values are found, just return the raw strings with the relative prefixes in place.
          a = v.match(_numExp);
          forceAlpha && a.length < 4 && (a[3] = 1);
          return a;
        }
      } else {
        a = v.match(_strictNumExp) || _colorLookup.transparent;
      }
      a = a.map(Number);
    }
    if (toHSL && !wasHSL) {
      r = a[0] / _255;
      g = a[1] / _255;
      b = a[2] / _255;
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      l = (max + min) / 2;
      if (max === min) {
        h = s = 0;
      } else {
        d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
        h *= 60;
      }
      a[0] = ~~(h + .5);
      a[1] = ~~(s * 100 + .5);
      a[2] = ~~(l * 100 + .5);
    }
    forceAlpha && a.length < 4 && (a[3] = 1);
    return a;
  },
  _colorOrderData = function _colorOrderData(v) {
    // strips out the colors from the string, finds all the numeric slots (with units) and returns an array of those. The Array also has a "c" property which is an Array of the index values where the colors belong. This is to help work around issues where there's a mis-matched order of color/numeric data like drop-shadow(#f00 0px 1px 2px) and drop-shadow(0x 1px 2px #f00). This is basically a helper function used in _formatColors()
    var values = [],
      c = [],
      i = -1;
    v.split(_colorExp).forEach(function (v) {
      var a = v.match(_numWithUnitExp) || [];
      values.push.apply(values, a);
      c.push(i += a.length + 1);
    });
    values.c = c;
    return values;
  },
  _formatColors = function _formatColors(s, toHSL, orderMatchData) {
    var result = "",
      colors = (s + result).match(_colorExp),
      type = toHSL ? "hsla(" : "rgba(",
      i = 0,
      c,
      shell,
      d,
      l;
    if (!colors) {
      return s;
    }
    colors = colors.map(function (color) {
      return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
    });
    if (orderMatchData) {
      d = _colorOrderData(s);
      c = orderMatchData.c;
      if (c.join(result) !== d.c.join(result)) {
        shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
        l = shell.length - 1;
        for (; i < l; i++) {
          result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
        }
      }
    }
    if (!shell) {
      shell = s.split(_colorExp);
      l = shell.length - 1;
      for (; i < l; i++) {
        result += shell[i] + colors[i];
      }
    }
    return result + shell[l];
  },
  _colorExp = exports._colorExp = function () {
    var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
      //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.,
      p;
    for (p in _colorLookup) {
      s += "|" + p + "\\b";
    }
    return new RegExp(s + ")", "gi");
  }(),
  _hslExp = /hsl[a]?\(/,
  _colorStringFilter = exports._colorStringFilter = function _colorStringFilter(a) {
    var combined = a.join(" "),
      toHSL;
    _colorExp.lastIndex = 0;
    if (_colorExp.test(combined)) {
      toHSL = _hslExp.test(combined);
      a[1] = _formatColors(a[1], toHSL);
      a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1])); // make sure the order of numbers/colors match with the END value.

      return true;
    }
  },
  /*
   * --------------------------------------------------------------------------------------
   * TICKER
   * --------------------------------------------------------------------------------------
   */
  _tickerActive,
  _ticker = exports._ticker = function () {
    var _getTime = Date.now,
      _lagThreshold = 500,
      _adjustedLag = 33,
      _startTime = _getTime(),
      _lastUpdate = _startTime,
      _gap = 1000 / 240,
      _nextTime = _gap,
      _listeners = [],
      _id,
      _req,
      _raf,
      _self,
      _delta,
      _i,
      _tick = function _tick(v) {
        var elapsed = _getTime() - _lastUpdate,
          manual = v === true,
          overlap,
          dispatch,
          time,
          frame;
        (elapsed > _lagThreshold || elapsed < 0) && (_startTime += elapsed - _adjustedLag);
        _lastUpdate += elapsed;
        time = _lastUpdate - _startTime;
        overlap = time - _nextTime;
        if (overlap > 0 || manual) {
          frame = ++_self.frame;
          _delta = time - _self.time * 1000;
          _self.time = time = time / 1000;
          _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
          dispatch = 1;
        }
        manual || (_id = _req(_tick)); //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.

        if (dispatch) {
          for (_i = 0; _i < _listeners.length; _i++) {
            // use _i and check _listeners.length instead of a variable because a listener could get removed during the loop, and if that happens to an element less than the current index, it'd throw things off in the loop.
            _listeners[_i](time, _delta, frame, v);
          }
        }
      };
    _self = {
      time: 0,
      frame: 0,
      tick: function tick() {
        _tick(true);
      },
      deltaRatio: function deltaRatio(fps) {
        return _delta / (1000 / (fps || 60));
      },
      wake: function wake() {
        if (_coreReady) {
          if (!_coreInitted && _windowExists()) {
            _win = _coreInitted = window;
            _doc = _win.document || {};
            _globals.gsap = gsap;
            (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);
            _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});
            _registerPluginQueue.forEach(_createPlugin);
          }
          _raf = typeof requestAnimationFrame !== "undefined" && requestAnimationFrame;
          _id && _self.sleep();
          _req = _raf || function (f) {
            return setTimeout(f, _nextTime - _self.time * 1000 + 1 | 0);
          };
          _tickerActive = 1;
          _tick(2);
        }
      },
      sleep: function sleep() {
        (_raf ? cancelAnimationFrame : clearTimeout)(_id);
        _tickerActive = 0;
        _req = _emptyFunc;
      },
      lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
        _lagThreshold = threshold || Infinity; // zero should be interpreted as basically unlimited

        _adjustedLag = Math.min(adjustedLag || 33, _lagThreshold);
      },
      fps: function fps(_fps) {
        _gap = 1000 / (_fps || 240);
        _nextTime = _self.time * 1000 + _gap;
      },
      add: function add(callback, once, prioritize) {
        var func = once ? function (t, d, f, v) {
          callback(t, d, f, v);
          _self.remove(func);
        } : callback;
        _self.remove(callback);
        _listeners[prioritize ? "unshift" : "push"](func);
        _wake();
        return func;
      },
      remove: function remove(callback, i) {
        ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
      },
      _listeners: _listeners
    };
    return _self;
  }(),
  _wake = function _wake() {
    return !_tickerActive && _ticker.wake();
  },
  //also ensures the core classes are initialized.

  /*
  * -------------------------------------------------
  * EASING
  * -------------------------------------------------
  */
  _easeMap = {},
  _customEaseExp = /^[\d.\-M][\d.\-,\s]/,
  _quotesExp = /["']/g,
  _parseObjectInString = function _parseObjectInString(value) {
    //takes a string like "{wiggles:10, type:anticipate})" and turns it into a real object. Notice it ends in ")" and includes the {} wrappers. This is because we only use this function for parsing ease configs and prioritized optimization rather than reusability.
    var obj = {},
      split = value.substr(1, value.length - 3).split(":"),
      key = split[0],
      i = 1,
      l = split.length,
      index,
      val,
      parsedVal;
    for (; i < l; i++) {
      val = split[i];
      index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
      parsedVal = val.substr(0, index);
      obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
      key = val.substr(index + 1).trim();
    }
    return obj;
  },
  _valueInParentheses = function _valueInParentheses(value) {
    var open = value.indexOf("(") + 1,
      close = value.indexOf(")"),
      nested = value.indexOf("(", open);
    return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
  },
  _configEaseFromString = function _configEaseFromString(name) {
    //name can be a string like "elastic.out(1,0.5)", and pass in _easeMap as obj and it'll parse it out and call the actual function like _easeMap.Elastic.easeOut.config(1,0.5). It will also parse custom ease strings as long as CustomEase is loaded and registered (internally as _easeMap._CE).
    var split = (name + "").split("("),
      ease = _easeMap[split[0]];
    return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
  },
  _invertEase = function _invertEase(ease) {
    return function (p) {
      return 1 - ease(1 - p);
    };
  },
  // allow yoyoEase to be set in children and have those affected when the parent/ancestor timeline yoyos.
  _propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
    var child = timeline._first,
      ease;
    while (child) {
      if (child instanceof Timeline) {
        _propagateYoyoEase(child, isYoyo);
      } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
        if (child.timeline) {
          _propagateYoyoEase(child.timeline, isYoyo);
        } else {
          ease = child._ease;
          child._ease = child._yEase;
          child._yEase = ease;
          child._yoyo = isYoyo;
        }
      }
      child = child._next;
    }
  },
  _parseEase = function _parseEase(ease, defaultEase) {
    return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
  },
  _insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
    if (easeOut === void 0) {
      easeOut = function easeOut(p) {
        return 1 - easeIn(1 - p);
      };
    }
    if (easeInOut === void 0) {
      easeInOut = function easeInOut(p) {
        return p < .5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
      };
    }
    var ease = {
        easeIn: easeIn,
        easeOut: easeOut,
        easeInOut: easeInOut
      },
      lowercaseName;
    _forEachName(names, function (name) {
      _easeMap[name] = _globals[name] = ease;
      _easeMap[lowercaseName = name.toLowerCase()] = easeOut;
      for (var p in ease) {
        _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
      }
    });
    return ease;
  },
  _easeInOutFromOut = function _easeInOutFromOut(easeOut) {
    return function (p) {
      return p < .5 ? (1 - easeOut(1 - p * 2)) / 2 : .5 + easeOut((p - .5) * 2) / 2;
    };
  },
  _configElastic = function _configElastic(type, amplitude, period) {
    var p1 = amplitude >= 1 ? amplitude : 1,
      //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
      p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1),
      p3 = p2 / _2PI * (Math.asin(1 / p1) || 0),
      easeOut = function easeOut(p) {
        return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
      },
      ease = type === "out" ? easeOut : type === "in" ? function (p) {
        return 1 - easeOut(1 - p);
      } : _easeInOutFromOut(easeOut);
    p2 = _2PI / p2; //precalculate to optimize

    ease.config = function (amplitude, period) {
      return _configElastic(type, amplitude, period);
    };
    return ease;
  },
  _configBack = function _configBack(type, overshoot) {
    if (overshoot === void 0) {
      overshoot = 1.70158;
    }
    var easeOut = function easeOut(p) {
        return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
      },
      ease = type === "out" ? easeOut : type === "in" ? function (p) {
        return 1 - easeOut(1 - p);
      } : _easeInOutFromOut(easeOut);
    ease.config = function (overshoot) {
      return _configBack(type, overshoot);
    };
    return ease;
  }; // a cheaper (kb and cpu) but more mild way to get a parameterized weighted ease by feeding in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEase = ratio => {
// 	let y = 0.5 + ratio / 2;
// 	return p => (2 * (1 - p) * p * y + p * p);
// },
// a stronger (but more expensive kb/cpu) parameterized weighted ease that lets you feed in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEaseStrong = ratio => {
// 	ratio = .5 + ratio / 2;
// 	let o = 1 / 3 * (ratio < .5 ? ratio : 1 - ratio),
// 		b = ratio - o,
// 		c = ratio + o;
// 	return p => p === 1 ? p : 3 * b * (1 - p) * (1 - p) * p + 3 * c * (1 - p) * p * p + p * p * p;
// };

_forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function (name, i) {
  var power = i < 5 ? i + 1 : i;
  _insertEase(name + ",Power" + (power - 1), i ? function (p) {
    return Math.pow(p, power);
  } : function (p) {
    return p;
  }, function (p) {
    return 1 - Math.pow(1 - p, power);
  }, function (p) {
    return p < .5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
  });
});
_easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;
_insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());
(function (n, c) {
  var n1 = 1 / c,
    n2 = 2 * n1,
    n3 = 2.5 * n1,
    easeOut = function easeOut(p) {
      return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
    };
  _insertEase("Bounce", function (p) {
    return 1 - easeOut(1 - p);
  }, easeOut);
})(7.5625, 2.75);
_insertEase("Expo", function (p) {
  return p ? Math.pow(2, 10 * (p - 1)) : 0;
});
_insertEase("Circ", function (p) {
  return -(_sqrt(1 - p * p) - 1);
});
_insertEase("Sine", function (p) {
  return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
});
_insertEase("Back", _configBack("in"), _configBack("out"), _configBack());
_easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
  config: function config(steps, immediateStart) {
    if (steps === void 0) {
      steps = 1;
    }
    var p1 = 1 / steps,
      p2 = steps + (immediateStart ? 0 : 1),
      p3 = immediateStart ? 1 : 0,
      max = 1 - _tinyNum;
    return function (p) {
      return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
    };
  }
};
_defaults.ease = _easeMap["quad.out"];
_forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (name) {
  return _callbackNames += name + "," + name + "Params,";
});
/*
 * --------------------------------------------------------------------------------------
 * CACHE
 * --------------------------------------------------------------------------------------
 */

var GSCache = exports.GSCache = function GSCache(target, harness) {
  this.id = _gsID++;
  target._gsap = this;
  this.target = target;
  this.harness = harness;
  this.get = harness ? harness.get : _getProperty;
  this.set = harness ? harness.getSetter : _getSetter;
};
/*
 * --------------------------------------------------------------------------------------
 * ANIMATION
 * --------------------------------------------------------------------------------------
 */

var Animation = exports.Animation = /*#__PURE__*/function () {
  function Animation(vars) {
    this.vars = vars;
    this._delay = +vars.delay || 0;
    if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
      // TODO: repeat: Infinity on a timeline's children must flag that timeline internally and affect its totalDuration, otherwise it'll stop in the negative direction when reaching the start.
      this._rDelay = vars.repeatDelay || 0;
      this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
    }
    this._ts = 1;
    _setDuration(this, +vars.duration, 1, 1);
    this.data = vars.data;
    if (_context) {
      this._ctx = _context;
      _context.data.push(this);
    }
    _tickerActive || _ticker.wake();
  }
  var _proto = Animation.prototype;
  _proto.delay = function delay(value) {
    if (value || value === 0) {
      this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
      this._delay = value;
      return this;
    }
    return this._delay;
  };
  _proto.duration = function duration(value) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
  };
  _proto.totalDuration = function totalDuration(value) {
    if (!arguments.length) {
      return this._tDur;
    }
    this._dirty = 0;
    return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
  };
  _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
    _wake();
    if (!arguments.length) {
      return this._tTime;
    }
    var parent = this._dp;
    if (parent && parent.smoothChildTiming && this._ts) {
      _alignPlayhead(this, _totalTime);
      !parent._dp || parent.parent || _postAddChecks(parent, this); // edge case: if this is a child of a timeline that already completed, for example, we must re-activate the parent.
      //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The start of that child would get pushed out, but one of the ancestors may have completed.

      while (parent && parent.parent) {
        if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
          parent.totalTime(parent._tTime, true);
        }
        parent = parent.parent;
      }
      if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
        //if the animation doesn't have a parent, put it back into its last parent (recorded as _dp for exactly cases like this). Limit to parents with autoRemoveChildren (like globalTimeline) so that if the user manually removes an animation from a timeline and then alters its playhead, it doesn't get added back in.
        _addToTimeline(this._dp, this, this._start - this._delay);
      }
    }
    if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
      // check for _ptLookup on a Tween instance to ensure it has actually finished being instantiated, otherwise if this.reverse() gets called in the Animation constructor, it could trigger a render() here even though the _targets weren't populated, thus when _init() is called there won't be any PropTweens (it'll act like the tween is non-functional)
      this._ts || (this._pTime = _totalTime); // otherwise, if an animation is paused, then the playhead is moved back to zero, then resumed, it'd revert back to the original time at the pause
      //if (!this._lock) { // avoid endless recursion (not sure we need this yet or if it's worth the performance hit)
      //   this._lock = 1;

      _lazySafeRender(this, _totalTime, suppressEvents); //   this._lock = 0;
      //}
    }
    return this;
  };
  _proto.time = function time(value, suppressEvents) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time; // note: if the modulus results in 0, the playhead could be exactly at the end or the beginning, and we always defer to the END with a non-zero value, otherwise if you set the time() to the very end (duration()), it would render at the START!
  };
  _proto.totalProgress = function totalProgress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() > 0 ? 1 : 0;
  };
  _proto.progress = function progress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  };
  _proto.iteration = function iteration(value, suppressEvents) {
    var cycleDuration = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
  } // potential future addition:
  // isPlayingBackwards() {
  // 	let animation = this,
  // 		orientation = 1; // 1 = forward, -1 = backward
  // 	while (animation) {
  // 		orientation *= animation.reversed() || (animation.repeat() && !(animation.iteration() & 1)) ? -1 : 1;
  // 		animation = animation.parent;
  // 	}
  // 	return orientation < 0;
  // }
  ;
  _proto.timeScale = function timeScale(value, suppressEvents) {
    if (!arguments.length) {
      return this._rts === -_tinyNum ? 0 : this._rts; // recorded timeScale. Special case: if someone calls reverse() on an animation with timeScale of 0, we assign it -_tinyNum to remember it's reversed.
    }
    if (this._rts === value) {
      return this;
    }
    var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime; // make sure to do the parentToChildTotalTime() BEFORE setting the new _ts because the old one must be used in that calculation.
    // future addition? Up side: fast and minimal file size. Down side: only works on this animation; if a timeline is reversed, for example, its childrens' onReverse wouldn't get called.
    //(+value < 0 && this._rts >= 0) && _callback(this, "onReverse", true);
    // prioritize rendering where the parent's playhead lines up instead of this._tTime because there could be a tween that's animating another tween's timeScale in the same rendering loop (same parent), thus if the timeScale tween renders first, it would alter _start BEFORE _tTime was set on that tick (in the rendering loop), effectively freezing it until the timeScale tween finishes.

    this._rts = +value || 0;
    this._ts = this._ps || value === -_tinyNum ? 0 : this._rts; // _ts is the functional timeScale which would be 0 if the animation is paused.

    this.totalTime(_clamp(-Math.abs(this._delay), this._tDur, tTime), suppressEvents !== false);
    _setEnd(this); // if parent.smoothChildTiming was false, the end time didn't get updated in the _alignPlayhead() method, so do it here.

    return _recacheAncestors(this);
  };
  _proto.paused = function paused(value) {
    if (!arguments.length) {
      return this._ps;
    }
    if (this._ps !== value) {
      this._ps = value;
      if (value) {
        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()); // if the pause occurs during the delay phase, make sure that's factored in when resuming.

        this._ts = this._act = 0; // _ts is the functional timeScale, so a paused tween would effectively have a timeScale of 0. We record the "real" timeScale as _rts (recorded time scale)
      } else {
        _wake();
        this._ts = this._rts; //only defer to _pTime (pauseTime) if tTime is zero. Remember, someone could pause() an animation, then scrub the playhead and resume(). If the parent doesn't have smoothChildTiming, we render at the rawTime() because the startTime won't get updated.

        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum)); // edge case: animation.progress(1).pause().play() wouldn't render again because the playhead is already at the end, but the call to totalTime() below will add it back to its parent...and not remove it again (since removing only happens upon rendering at a new time). Offsetting the _tTime slightly is done simply to cause the final render in totalTime() that'll pop it off its timeline (if autoRemoveChildren is true, of course). Check to make sure _zTime isn't -_tinyNum to avoid an edge case where the playhead is pushed to the end but INSIDE a tween/callback, the timeline itself is paused thus halting rendering and leaving a few unrendered. When resuming, it wouldn't render those otherwise.
      }
    }
    return this;
  };
  _proto.startTime = function startTime(value) {
    if (arguments.length) {
      this._start = value;
      var parent = this.parent || this._dp;
      parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
      return this;
    }
    return this._start;
  };
  _proto.endTime = function endTime(includeRepeats) {
    return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  };
  _proto.rawTime = function rawTime(wrapRepeats) {
    var parent = this.parent || this._dp; // _dp = detached parent

    return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
  };
  _proto.revert = function revert(config) {
    if (config === void 0) {
      config = _revertConfig;
    }
    var prevIsReverting = _reverting;
    _reverting = config;
    if (this._initted || this._startAt) {
      this.timeline && this.timeline.revert(config);
      this.totalTime(-0.01, config.suppressEvents);
    }
    this.data !== "nested" && config.kill !== false && this.kill();
    _reverting = prevIsReverting;
    return this;
  };
  _proto.globalTime = function globalTime(rawTime) {
    var animation = this,
      time = arguments.length ? rawTime : animation.rawTime();
    while (animation) {
      time = animation._start + time / (Math.abs(animation._ts) || 1);
      animation = animation._dp;
    }
    return !this.parent && this._sat ? this._sat.globalTime(rawTime) : time; // the _startAt tweens for .fromTo() and .from() that have immediateRender should always be FIRST in the timeline (important for context.revert()). "_sat" stands for _startAtTween, referring to the parent tween that created the _startAt. We must discern if that tween had immediateRender so that we can know whether or not to prioritize it in revert().
  };
  _proto.repeat = function repeat(value) {
    if (arguments.length) {
      this._repeat = value === Infinity ? -2 : value;
      return _onUpdateTotalDuration(this);
    }
    return this._repeat === -2 ? Infinity : this._repeat;
  };
  _proto.repeatDelay = function repeatDelay(value) {
    if (arguments.length) {
      var time = this._time;
      this._rDelay = value;
      _onUpdateTotalDuration(this);
      return time ? this.time(time) : this;
    }
    return this._rDelay;
  };
  _proto.yoyo = function yoyo(value) {
    if (arguments.length) {
      this._yoyo = value;
      return this;
    }
    return this._yoyo;
  };
  _proto.seek = function seek(position, suppressEvents) {
    return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
  };
  _proto.restart = function restart(includeDelay, suppressEvents) {
    return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
  };
  _proto.play = function play(from, suppressEvents) {
    from != null && this.seek(from, suppressEvents);
    return this.reversed(false).paused(false);
  };
  _proto.reverse = function reverse(from, suppressEvents) {
    from != null && this.seek(from || this.totalDuration(), suppressEvents);
    return this.reversed(true).paused(false);
  };
  _proto.pause = function pause(atTime, suppressEvents) {
    atTime != null && this.seek(atTime, suppressEvents);
    return this.paused(true);
  };
  _proto.resume = function resume() {
    return this.paused(false);
  };
  _proto.reversed = function reversed(value) {
    if (arguments.length) {
      !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0)); // in case timeScale is zero, reversing would have no effect so we use _tinyNum.

      return this;
    }
    return this._rts < 0;
  };
  _proto.invalidate = function invalidate() {
    this._initted = this._act = 0;
    this._zTime = -_tinyNum;
    return this;
  };
  _proto.isActive = function isActive() {
    var parent = this.parent || this._dp,
      start = this._start,
      rawTime;
    return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
  };
  _proto.eventCallback = function eventCallback(type, callback, params) {
    var vars = this.vars;
    if (arguments.length > 1) {
      if (!callback) {
        delete vars[type];
      } else {
        vars[type] = callback;
        params && (vars[type + "Params"] = params);
        type === "onUpdate" && (this._onUpdate = callback);
      }
      return this;
    }
    return vars[type];
  };
  _proto.then = function then(onFulfilled) {
    var self = this;
    return new Promise(function (resolve) {
      var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough,
        _resolve = function _resolve() {
          var _then = self.then;
          self.then = null; // temporarily null the then() method to avoid an infinite loop (see https://github.com/greensock/GSAP/issues/322)

          _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
          resolve(f);
          self.then = _then;
        };
      if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
        _resolve();
      } else {
        self._prom = _resolve;
      }
    });
  };
  _proto.kill = function kill() {
    _interrupt(this);
  };
  return Animation;
}();
_setDefaults(Animation.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: false,
  parent: null,
  _initted: false,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -_tinyNum,
  _prom: 0,
  _ps: false,
  _rts: 1
});
/*
 * -------------------------------------------------
 * TIMELINE
 * -------------------------------------------------
 */

var Timeline = exports.TimelineLite = exports.TimelineMax = exports.Timeline = /*#__PURE__*/function (_Animation) {
  _inheritsLoose(Timeline, _Animation);
  function Timeline(vars, position) {
    var _this;
    if (vars === void 0) {
      vars = {};
    }
    _this = _Animation.call(this, vars) || this;
    _this.labels = {};
    _this.smoothChildTiming = !!vars.smoothChildTiming;
    _this.autoRemoveChildren = !!vars.autoRemoveChildren;
    _this._sort = _isNotFalse(vars.sortChildren);
    _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
    vars.reversed && _this.reverse();
    vars.paused && _this.paused(true);
    vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
    return _this;
  }
  var _proto2 = Timeline.prototype;
  _proto2.to = function to(targets, vars, position) {
    _createTweenType(0, arguments, this);
    return this;
  };
  _proto2.from = function from(targets, vars, position) {
    _createTweenType(1, arguments, this);
    return this;
  };
  _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
    _createTweenType(2, arguments, this);
    return this;
  };
  _proto2.set = function set(targets, vars, position) {
    vars.duration = 0;
    vars.parent = this;
    _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
    vars.immediateRender = !!vars.immediateRender;
    new Tween(targets, vars, _parsePosition(this, position), 1);
    return this;
  };
  _proto2.call = function call(callback, params, position) {
    return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
  } //ONLY for backward compatibility! Maybe delete?
  ;
  _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.duration = duration;
    vars.stagger = vars.stagger || stagger;
    vars.onComplete = onCompleteAll;
    vars.onCompleteParams = onCompleteAllParams;
    vars.parent = this;
    new Tween(targets, vars, _parsePosition(this, position));
    return this;
  };
  _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.runBackwards = 1;
    _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
    return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
  };
  _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
    toVars.startAt = fromVars;
    _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
    return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
  };
  _proto2.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time,
      tDur = this._dirty ? this.totalDuration() : this._tDur,
      dur = this._dur,
      tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime),
      // if a paused timeline is resumed (or its _start is updated for another reason...which rounds it), that could result in the playhead shifting a **tiny** amount and a zero-duration child at that spot may get rendered at a different ratio, like its totalTime in render() may be 1e-17 instead of 0, for example.
      crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur),
      time,
      child,
      next,
      iteration,
      cycleDuration,
      prevPaused,
      pauseTween,
      timeScale,
      prevStart,
      prevIteration,
      yoyo,
      isYoyo;
    this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);
    if (tTime !== this._tTime || force || crossingStart) {
      if (prevTime !== this._time && dur) {
        //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
        tTime += this._time - prevTime;
        totalTime += this._time - prevTime;
      }
      time = tTime;
      prevStart = this._start;
      timeScale = this._ts;
      prevPaused = !timeScale;
      if (crossingStart) {
        dur || (prevTime = this._zTime); //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

        (totalTime || !suppressEvents) && (this._zTime = totalTime);
      }
      if (this._repeat) {
        //adjust the time for repeats and yoyos
        yoyo = this._yoyo;
        cycleDuration = dur + this._rDelay;
        if (this._repeat < -1 && totalTime < 0) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }
        time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (tTime === tDur) {
          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
          iteration = this._repeat;
          time = dur;
        } else {
          iteration = ~~(tTime / cycleDuration);
          if (iteration && iteration === tTime / cycleDuration) {
            time = dur;
            iteration--;
          }
          time > dur && (time = dur);
        }
        prevIteration = _animationCycle(this._tTime, cycleDuration);
        !prevTime && this._tTime && prevIteration !== iteration && this._tTime - prevIteration * cycleDuration - this._dur <= 0 && (prevIteration = iteration); // edge case - if someone does addPause() at the very beginning of a repeating timeline, that pause is technically at the same spot as the end which causes this._time to get set to 0 when the totalTime would normally place the playhead at the end. See https://gsap.com/forums/topic/23823-closing-nav-animation-not-working-on-ie-and-iphone-6-maybe-other-older-browser/?tab=comments#comment-113005 also, this._tTime - prevIteration * cycleDuration - this._dur <= 0 just checks to make sure it wasn't previously in the "repeatDelay" portion

        if (yoyo && iteration & 1) {
          time = dur - time;
          isYoyo = 1;
        }
        /*
        make sure children at the end/beginning of the timeline are rendered properly. If, for example,
        a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
        would get translated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
        could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
        we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
        ensure that zero-duration tweens at the very beginning or end of the Timeline work.
        */

        if (iteration !== prevIteration && !this._lock) {
          var rewinding = yoyo && prevIteration & 1,
            doesWrap = rewinding === (yoyo && iteration & 1);
          iteration < prevIteration && (rewinding = !rewinding);
          prevTime = rewinding ? 0 : tTime % dur ? dur : tTime; // if the playhead is landing exactly at the end of an iteration, use that totalTime rather than only the duration, otherwise it'll skip the 2nd render since it's effectively at the same time.

          this._lock = 1;
          this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
          this._tTime = tTime; // if a user gets the iteration() inside the onRepeat, for example, it should be accurate.

          !suppressEvents && this.parent && _callback(this, "onRepeat");
          this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);
          if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
            // if prevTime is 0 and we render at the very end, _time will be the end, thus won't match. So in this edge case, prevTime won't match _time but that's okay. If it gets killed in the onRepeat, eject as well.
            return this;
          }
          dur = this._dur; // in case the duration changed in the onRepeat

          tDur = this._tDur;
          if (doesWrap) {
            this._lock = 2;
            prevTime = rewinding ? dur : -0.0001;
            this.render(prevTime, true);
            this.vars.repeatRefresh && !isYoyo && this.invalidate();
          }
          this._lock = 0;
          if (!this._ts && !prevPaused) {
            return this;
          } //in order for yoyoEase to work properly when there's a stagger, we must swap out the ease in each sub-tween.

          _propagateYoyoEase(this, isYoyo);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2) {
        pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));
        if (pauseTween) {
          tTime -= time - (time = pauseTween._start);
        }
      }
      this._tTime = tTime;
      this._time = time;
      this._act = !timeScale; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

      if (!this._initted) {
        this._onUpdate = this.vars.onUpdate;
        this._initted = 1;
        this._zTime = totalTime;
        prevTime = 0; // upon init, the playhead should always go forward; someone could invalidate() a completed timeline and then if they restart(), that would make child tweens render in reverse order which could lock in the wrong starting values if they build on each other, like tl.to(obj, {x: 100}).to(obj, {x: 0}).
      }
      if (!prevTime && time && !suppressEvents && !iteration) {
        _callback(this, "onStart");
        if (this._tTime !== tTime) {
          // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
          return this;
        }
      }
      if (time >= prevTime && totalTime >= 0) {
        child = this._first;
        while (child) {
          next = child._next;
          if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
              return this.render(totalTime, suppressEvents, force);
            }
            child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);
            if (time !== this._time || !this._ts && !prevPaused) {
              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
              pauseTween = 0;
              next && (tTime += this._zTime = -_tinyNum); // it didn't finish rendering, so flag zTime as negative so that so that the next time render() is called it'll be forced (to render any remaining children)

              break;
            }
          }
          child = next;
        }
      } else {
        child = this._last;
        var adjustedTime = totalTime < 0 ? totalTime : time; //when the playhead goes backward beyond the start of this timeline, we must pass that information down to the child animations so that zero-duration tweens know whether to render their starting or ending values.

        while (child) {
          next = child._prev;
          if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
              return this.render(totalTime, suppressEvents, force);
            }
            child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force || _reverting && (child._initted || child._startAt)); // if reverting, we should always force renders of initted tweens (but remember that .fromTo() or .from() may have a _startAt but not _initted yet). If, for example, a .fromTo() tween with a stagger (which creates an internal timeline) gets reverted BEFORE some of its child tweens render for the first time, it may not properly trigger them to revert.

            if (time !== this._time || !this._ts && !prevPaused) {
              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
              pauseTween = 0;
              next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum); // it didn't finish rendering, so adjust zTime so that so that the next time render() is called it'll be forced (to render any remaining children)

              break;
            }
          }
          child = next;
        }
      }
      if (pauseTween && !suppressEvents) {
        this.pause();
        pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;
        if (this._ts) {
          //the callback resumed playback! So since we may have held back the playhead due to where the pause is positioned, go ahead and jump to where it's SUPPOSED to be (if no pause happened).
          this._start = prevStart; //if the pause was at an earlier time and the user resumed in the callback, it could reposition the timeline (changing its startTime), throwing things off slightly, so we make sure the _start doesn't shift.

          _setEnd(this);
          return this.render(totalTime, suppressEvents, force);
        }
      }
      this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
      if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!this._lock) {
        // remember, a child's callback may alter this timeline's playhead or timeScale which is why we need to add some of these checks.
        (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
          _callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);
          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }
    return this;
  };
  _proto2.add = function add(child, position) {
    var _this2 = this;
    _isNumber(position) || (position = _parsePosition(this, position, child));
    if (!(child instanceof Animation)) {
      if (_isArray(child)) {
        child.forEach(function (obj) {
          return _this2.add(obj, position);
        });
        return this;
      }
      if (_isString(child)) {
        return this.addLabel(child, position);
      }
      if (_isFunction(child)) {
        child = Tween.delayedCall(0, child);
      } else {
        return this;
      }
    }
    return this !== child ? _addToTimeline(this, child, position) : this; //don't allow a timeline to be added to itself as a child!
  };
  _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
    if (nested === void 0) {
      nested = true;
    }
    if (tweens === void 0) {
      tweens = true;
    }
    if (timelines === void 0) {
      timelines = true;
    }
    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = -_bigNum;
    }
    var a = [],
      child = this._first;
    while (child) {
      if (child._start >= ignoreBeforeTime) {
        if (child instanceof Tween) {
          tweens && a.push(child);
        } else {
          timelines && a.push(child);
          nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
        }
      }
      child = child._next;
    }
    return a;
  };
  _proto2.getById = function getById(id) {
    var animations = this.getChildren(1, 1, 1),
      i = animations.length;
    while (i--) {
      if (animations[i].vars.id === id) {
        return animations[i];
      }
    }
  };
  _proto2.remove = function remove(child) {
    if (_isString(child)) {
      return this.removeLabel(child);
    }
    if (_isFunction(child)) {
      return this.killTweensOf(child);
    }
    _removeLinkedListItem(this, child);
    if (child === this._recent) {
      this._recent = this._last;
    }
    return _uncache(this);
  };
  _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
    if (!arguments.length) {
      return this._tTime;
    }
    this._forcing = 1;
    if (!this._dp && this._ts) {
      //special case for the global timeline (or any other that has no parent or detached parent).
      this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
    }
    _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);
    this._forcing = 0;
    return this;
  };
  _proto2.addLabel = function addLabel(label, position) {
    this.labels[label] = _parsePosition(this, position);
    return this;
  };
  _proto2.removeLabel = function removeLabel(label) {
    delete this.labels[label];
    return this;
  };
  _proto2.addPause = function addPause(position, callback, params) {
    var t = Tween.delayedCall(0, callback || _emptyFunc, params);
    t.data = "isPause";
    this._hasPause = 1;
    return _addToTimeline(this, t, _parsePosition(this, position));
  };
  _proto2.removePause = function removePause(position) {
    var child = this._first;
    position = _parsePosition(this, position);
    while (child) {
      if (child._start === position && child.data === "isPause") {
        _removeFromParent(child);
      }
      child = child._next;
    }
  };
  _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    var tweens = this.getTweensOf(targets, onlyActive),
      i = tweens.length;
    while (i--) {
      _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
    }
    return this;
  };
  _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
    var a = [],
      parsedTargets = toArray(targets),
      child = this._first,
      isGlobalTime = _isNumber(onlyActive),
      // a number is interpreted as a global time. If the animation spans
      children;
    while (child) {
      if (child instanceof Tween) {
        if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
          // note: if this is for overwriting, it should only be for tweens that aren't paused and are initted.
          a.push(child);
        }
      } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
        a.push.apply(a, children);
      }
      child = child._next;
    }
    return a;
  } // potential future feature - targets() on timelines
  // targets() {
  // 	let result = [];
  // 	this.getChildren(true, true, false).forEach(t => result.push(...t.targets()));
  // 	return result.filter((v, i) => result.indexOf(v) === i);
  // }
  ;
  _proto2.tweenTo = function tweenTo(position, vars) {
    vars = vars || {};
    var tl = this,
      endTime = _parsePosition(tl, position),
      _vars = vars,
      startAt = _vars.startAt,
      _onStart = _vars.onStart,
      onStartParams = _vars.onStartParams,
      immediateRender = _vars.immediateRender,
      initted,
      tween = Tween.to(tl, _setDefaults({
        ease: vars.ease || "none",
        lazy: false,
        immediateRender: false,
        time: endTime,
        overwrite: "auto",
        duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
        onStart: function onStart() {
          tl.pause();
          if (!initted) {
            var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
            tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
            initted = 1;
          }
          _onStart && _onStart.apply(tween, onStartParams || []); //in case the user had an onStart in the vars - we don't want to overwrite it.
        }
      }, vars));
    return immediateRender ? tween.render(0) : tween;
  };
  _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
    return this.tweenTo(toPosition, _setDefaults({
      startAt: {
        time: _parsePosition(this, fromPosition)
      }
    }, vars));
  };
  _proto2.recent = function recent() {
    return this._recent;
  };
  _proto2.nextLabel = function nextLabel(afterTime) {
    if (afterTime === void 0) {
      afterTime = this._time;
    }
    return _getLabelInDirection(this, _parsePosition(this, afterTime));
  };
  _proto2.previousLabel = function previousLabel(beforeTime) {
    if (beforeTime === void 0) {
      beforeTime = this._time;
    }
    return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
  };
  _proto2.currentLabel = function currentLabel(value) {
    return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
  };
  _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = 0;
    }
    var child = this._first,
      labels = this.labels,
      p;
    while (child) {
      if (child._start >= ignoreBeforeTime) {
        child._start += amount;
        child._end += amount;
      }
      child = child._next;
    }
    if (adjustLabels) {
      for (p in labels) {
        if (labels[p] >= ignoreBeforeTime) {
          labels[p] += amount;
        }
      }
    }
    return _uncache(this);
  };
  _proto2.invalidate = function invalidate(soft) {
    var child = this._first;
    this._lock = 0;
    while (child) {
      child.invalidate(soft);
      child = child._next;
    }
    return _Animation.prototype.invalidate.call(this, soft);
  };
  _proto2.clear = function clear(includeLabels) {
    if (includeLabels === void 0) {
      includeLabels = true;
    }
    var child = this._first,
      next;
    while (child) {
      next = child._next;
      this.remove(child);
      child = next;
    }
    this._dp && (this._time = this._tTime = this._pTime = 0);
    includeLabels && (this.labels = {});
    return _uncache(this);
  };
  _proto2.totalDuration = function totalDuration(value) {
    var max = 0,
      self = this,
      child = self._last,
      prevStart = _bigNum,
      prev,
      start,
      parent;
    if (arguments.length) {
      return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
    }
    if (self._dirty) {
      parent = self.parent;
      while (child) {
        prev = child._prev; //record it here in case the tween changes position in the sequence...

        child._dirty && child.totalDuration(); //could change the tween._startTime, so make sure the animation's cache is clean before analyzing it.

        start = child._start;
        if (start > prevStart && self._sort && child._ts && !self._lock) {
          //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
          self._lock = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add().

          _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
        } else {
          prevStart = start;
        }
        if (start < 0 && child._ts) {
          //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
          max -= start;
          if (!parent && !self._dp || parent && parent.smoothChildTiming) {
            self._start += start / self._ts;
            self._time -= start;
            self._tTime -= start;
          }
          self.shiftChildren(-start, false, -1e999);
          prevStart = 0;
        }
        child._end > max && child._ts && (max = child._end);
        child = prev;
      }
      _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);
      self._dirty = 0;
    }
    return self._tDur;
  };
  Timeline.updateRoot = function updateRoot(time) {
    if (_globalTimeline._ts) {
      _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));
      _lastRenderedFrame = _ticker.frame;
    }
    if (_ticker.frame >= _nextGCFrame) {
      _nextGCFrame += _config.autoSleep || 120;
      var child = _globalTimeline._first;
      if (!child || !child._ts) if (_config.autoSleep && _ticker._listeners.length < 2) {
        while (child && !child._ts) {
          child = child._next;
        }
        child || _ticker.sleep();
      }
    }
  };
  return Timeline;
}(Animation);
_setDefaults(Timeline.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var _addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
    //note: we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
    var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter),
      index = 0,
      matchIndex = 0,
      result,
      startNums,
      color,
      endNum,
      chunk,
      startNum,
      hasRandom,
      a;
    pt.b = start;
    pt.e = end;
    start += ""; //ensure values are strings

    end += "";
    if (hasRandom = ~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }
    if (stringFilter) {
      a = [start, end];
      stringFilter(a, target, prop); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.

      start = a[0];
      end = a[1];
    }
    startNums = start.match(_complexStringNumExp) || [];
    while (result = _complexStringNumExp.exec(end)) {
      endNum = result[0];
      chunk = end.substring(index, result.index);
      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(") {
        color = 1;
      }
      if (endNum !== startNums[matchIndex++]) {
        startNum = parseFloat(startNums[matchIndex - 1]) || 0; //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.

        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
          s: startNum,
          c: endNum.charAt(1) === "=" ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
          m: color && color < 4 ? Math.round : 0
        };
        index = _complexStringNumExp.lastIndex;
      }
    }
    pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)

    pt.fp = funcParam;
    if (_relExp.test(end) || hasRandom) {
      pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
    }
    this._pt = pt; //start the linked list with this new PropTween. Remember, we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.

    return pt;
  },
  _addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam, optional) {
    _isFunction(end) && (end = end(index || 0, target, targets));
    var currentValue = target[prop],
      parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](),
      setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc,
      pt;
    if (_isString(end)) {
      if (~end.indexOf("random(")) {
        end = _replaceRandom(end);
      }
      if (end.charAt(1) === "=") {
        pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);
        if (pt || pt === 0) {
          // to avoid isNaN, like if someone passes in a value like "!= whatever"
          end = pt;
        }
      }
    }
    if (!optional || parsedStart !== end || _forceAllPropTweens) {
      if (!isNaN(parsedStart * end) && end !== "") {
        // fun fact: any number multiplied by "" is evaluated as the number 0!
        pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
        funcParam && (pt.fp = funcParam);
        modifier && pt.modifier(modifier, this, target);
        return this._pt = pt;
      }
      !currentValue && !(prop in target) && _missingPlugin(prop, end);
      return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
    }
  },
  //creates a copy of the vars object and processes any function-based values (putting the resulting values directly into the copy) as well as strings with "random()" in them. It does NOT process relative values.
  _processVars = function _processVars(vars, index, target, targets, tween) {
    _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));
    if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
      return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
    }
    var copy = {},
      p;
    for (p in vars) {
      copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
    }
    return copy;
  },
  _checkPlugin = exports._checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
    var plugin, pt, ptLookup, i;
    if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
      tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);
      if (tween !== _quickTween) {
        ptLookup = tween._ptLookup[tween._targets.indexOf(target)]; //note: we can't use tween._ptLookup[index] because for staggered tweens, the index from the fullTargets array won't match what it is in each individual tween that spawns from the stagger.

        i = plugin._props.length;
        while (i--) {
          ptLookup[plugin._props[i]] = pt;
        }
      }
    }
    return plugin;
  },
  _overwritingTween,
  //store a reference temporarily so we can avoid overwriting itself.
  _forceAllPropTweens,
  _initTween = function _initTween(tween, time, tTime) {
    var vars = tween.vars,
      ease = vars.ease,
      startAt = vars.startAt,
      immediateRender = vars.immediateRender,
      lazy = vars.lazy,
      onUpdate = vars.onUpdate,
      runBackwards = vars.runBackwards,
      yoyoEase = vars.yoyoEase,
      keyframes = vars.keyframes,
      autoRevert = vars.autoRevert,
      dur = tween._dur,
      prevStartAt = tween._startAt,
      targets = tween._targets,
      parent = tween.parent,
      fullTargets = parent && parent.data === "nested" ? parent.vars.targets : targets,
      autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites,
      tl = tween.timeline,
      cleanVars,
      i,
      p,
      pt,
      target,
      hasPriority,
      gsData,
      harness,
      plugin,
      ptLookup,
      index,
      harnessVars,
      overwritten;
    tl && (!keyframes || !ease) && (ease = "none");
    tween._ease = _parseEase(ease, _defaults.ease);
    tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;
    if (yoyoEase && tween._yoyo && !tween._repeat) {
      //there must have been a parent timeline with yoyo:true that is currently in its yoyo phase, so flip the eases.
      yoyoEase = tween._yEase;
      tween._yEase = tween._ease;
      tween._ease = yoyoEase;
    }
    tween._from = !tl && !!vars.runBackwards; //nested timelines should never run backwards - the backwards-ness is in the child tweens.

    if (!tl || keyframes && !vars.stagger) {
      //if there's an internal timeline, skip all the parsing because we passed that task down the chain.
      harness = targets[0] ? _getCache(targets[0]).harness : 0;
      harnessVars = harness && vars[harness.prop]; //someone may need to specify CSS-specific values AND non-CSS values, like if the element has an "x" property plus it's a standard DOM element. We allow people to distinguish by wrapping plugin-specific stuff in a css:{} object for example.

      cleanVars = _copyExcluding(vars, _reservedProps);
      if (prevStartAt) {
        prevStartAt._zTime < 0 && prevStartAt.progress(1); // in case it's a lazy startAt that hasn't rendered yet.

        time < 0 && runBackwards && immediateRender && !autoRevert ? prevStartAt.render(-1, true) : prevStartAt.revert(runBackwards && dur ? _revertConfigNoKill : _startAtRevertConfig); // if it's a "startAt" (not "from()" or runBackwards: true), we only need to do a shallow revert (keep transforms cached in CSSPlugin)
        // don't just _removeFromParent(prevStartAt.render(-1, true)) because that'll leave inline styles. We're creating a new _startAt for "startAt" tweens that re-capture things to ensure that if the pre-tween values changed since the tween was created, they're recorded.

        prevStartAt._lazy = 0;
      }
      if (startAt) {
        _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
          data: "isStart",
          overwrite: false,
          parent: parent,
          immediateRender: true,
          lazy: !prevStartAt && _isNotFalse(lazy),
          startAt: null,
          delay: 0,
          onUpdate: onUpdate && function () {
            return _callback(tween, "onUpdate");
          },
          stagger: 0
        }, startAt))); //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, from, to).fromTo(e, to, from);

        tween._startAt._dp = 0; // don't allow it to get put back into root timeline! Like when revert() is called and totalTime() gets set.

        tween._startAt._sat = tween; // used in globalTime(). _sat stands for _startAtTween

        time < 0 && (_reverting || !immediateRender && !autoRevert) && tween._startAt.revert(_revertConfigNoKill); // rare edge case, like if a render is forced in the negative direction of a non-initted tween.

        if (immediateRender) {
          if (dur && time <= 0 && tTime <= 0) {
            // check tTime here because in the case of a yoyo tween whose playhead gets pushed to the end like tween.progress(1), we should allow it through so that the onComplete gets fired properly.
            time && (tween._zTime = time);
            return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
          }
        }
      } else if (runBackwards && dur) {
        //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
        if (!prevStartAt) {
          time && (immediateRender = false); //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0

          p = _setDefaults({
            overwrite: false,
            data: "isFromStart",
            //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
            lazy: immediateRender && !prevStartAt && _isNotFalse(lazy),
            immediateRender: immediateRender,
            //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
            stagger: 0,
            parent: parent //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
          }, cleanVars);
          harnessVars && (p[harness.prop] = harnessVars); // in case someone does something like .from(..., {css:{}})

          _removeFromParent(tween._startAt = Tween.set(targets, p));
          tween._startAt._dp = 0; // don't allow it to get put back into root timeline!

          tween._startAt._sat = tween; // used in globalTime()

          time < 0 && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween._startAt.render(-1, true));
          tween._zTime = time;
          if (!immediateRender) {
            _initTween(tween._startAt, _tinyNum, _tinyNum); //ensures that the initial values are recorded
          } else if (!time) {
            return;
          }
        }
      }
      tween._pt = tween._ptCache = 0;
      lazy = dur && _isNotFalse(lazy) || lazy && !dur;
      for (i = 0; i < targets.length; i++) {
        target = targets[i];
        gsData = target._gsap || _harness(targets)[i]._gsap;
        tween._ptLookup[i] = ptLookup = {};
        _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)

        index = fullTargets === targets ? i : fullTargets.indexOf(target);
        if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
          tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);
          plugin._props.forEach(function (name) {
            ptLookup[name] = pt;
          });
          plugin.priority && (hasPriority = 1);
        }
        if (!harness || harnessVars) {
          for (p in cleanVars) {
            if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
              plugin.priority && (hasPriority = 1);
            } else {
              ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
            }
          }
        }
        tween._op && tween._op[i] && tween.kill(target, tween._op[i]);
        if (autoOverwrite && tween._pt) {
          _overwritingTween = tween;
          _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time)); // make sure the overwriting doesn't overwrite THIS tween!!!

          overwritten = !tween.parent;
          _overwritingTween = 0;
        }
        tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
      }
      hasPriority && _sortPropTweensByPriority(tween);
      tween._onInit && tween._onInit(tween); //plugins like RoundProps must wait until ALL of the PropTweens are instantiated. In the plugin's init() function, it sets the _onInit on the tween instance. May not be pretty/intuitive, but it's fast and keeps file size down.
    }
    tween._onUpdate = onUpdate;
    tween._initted = (!tween._op || tween._pt) && !overwritten; // if overwrittenProps resulted in the entire tween being killed, do NOT flag it as initted or else it may render for one tick.

    keyframes && time <= 0 && tl.render(_bigNum, true, true); // if there's a 0% keyframe, it'll render in the "before" state for any staggered/delayed animations thus when the following tween initializes, it'll use the "before" state instead of the "after" state as the initial values.
  },
  _updatePropTweens = function _updatePropTweens(tween, property, value, start, startIsRelative, ratio, time, skipRecursion) {
    var ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property],
      pt,
      rootPT,
      lookup,
      i;
    if (!ptCache) {
      ptCache = tween._ptCache[property] = [];
      lookup = tween._ptLookup;
      i = tween._targets.length;
      while (i--) {
        pt = lookup[i][property];
        if (pt && pt.d && pt.d._pt) {
          // it's a plugin, so find the nested PropTween
          pt = pt.d._pt;
          while (pt && pt.p !== property && pt.fp !== property) {
            // "fp" is functionParam for things like setting CSS variables which require .setProperty("--var-name", value)
            pt = pt._next;
          }
        }
        if (!pt) {
          // there is no PropTween associated with that property, so we must FORCE one to be created and ditch out of this
          // if the tween has other properties that already rendered at new positions, we'd normally have to rewind to put them back like tween.render(0, true) before forcing an _initTween(), but that can create another edge case like tweening a timeline's progress would trigger onUpdates to fire which could move other things around. It's better to just inform users that .resetTo() should ONLY be used for tweens that already have that property. For example, you can't gsap.to(...{ y: 0 }) and then tween.restTo("x", 200) for example.
          _forceAllPropTweens = 1; // otherwise, when we _addPropTween() and it finds no change between the start and end values, it skips creating a PropTween (for efficiency...why tween when there's no difference?) but in this case we NEED that PropTween created so we can edit it.

          tween.vars[property] = "+=0";
          _initTween(tween, time);
          _forceAllPropTweens = 0;
          return skipRecursion ? _warn(property + " not eligible for reset") : 1; // if someone tries to do a quickTo() on a special property like borderRadius which must get split into 4 different properties, that's not eligible for .resetTo().
        }
        ptCache.push(pt);
      }
    }
    i = ptCache.length;
    while (i--) {
      rootPT = ptCache[i];
      pt = rootPT._pt || rootPT; // complex values may have nested PropTweens. We only accommodate the FIRST value.

      pt.s = (start || start === 0) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
      pt.c = value - pt.s;
      rootPT.e && (rootPT.e = _round(value) + getUnit(rootPT.e)); // mainly for CSSPlugin (end value)

      rootPT.b && (rootPT.b = pt.s + getUnit(rootPT.b)); // (beginning value)
    }
  },
  _addAliasesToVars = function _addAliasesToVars(targets, vars) {
    var harness = targets[0] ? _getCache(targets[0]).harness : 0,
      propertyAliases = harness && harness.aliases,
      copy,
      p,
      i,
      aliases;
    if (!propertyAliases) {
      return vars;
    }
    copy = _merge({}, vars);
    for (p in propertyAliases) {
      if (p in copy) {
        aliases = propertyAliases[p].split(",");
        i = aliases.length;
        while (i--) {
          copy[aliases[i]] = copy[p];
        }
      }
    }
    return copy;
  },
  // parses multiple formats, like {"0%": {x: 100}, {"50%": {x: -20}} and { x: {"0%": 100, "50%": -20} }, and an "ease" can be set on any object. We populate an "allProps" object with an Array for each property, like {x: [{}, {}], y:[{}, {}]} with data for each property tween. The objects have a "t" (time), "v", (value), and "e" (ease) property. This allows us to piece together a timeline later.
  _parseKeyframe = function _parseKeyframe(prop, obj, allProps, easeEach) {
    var ease = obj.ease || easeEach || "power1.inOut",
      p,
      a;
    if (_isArray(obj)) {
      a = allProps[prop] || (allProps[prop] = []); // t = time (out of 100), v = value, e = ease

      obj.forEach(function (value, i) {
        return a.push({
          t: i / (obj.length - 1) * 100,
          v: value,
          e: ease
        });
      });
    } else {
      for (p in obj) {
        a = allProps[p] || (allProps[p] = []);
        p === "ease" || a.push({
          t: parseFloat(prop),
          v: obj[p],
          e: ease
        });
      }
    }
  },
  _parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
    return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
  },
  _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
  _staggerPropsToSkip = {};
_forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function (name) {
  return _staggerPropsToSkip[name] = 1;
});
/*
 * --------------------------------------------------------------------------------------
 * TWEEN
 * --------------------------------------------------------------------------------------
 */

var Tween = exports.TweenLite = exports.TweenMax = exports.Tween = /*#__PURE__*/function (_Animation2) {
  _inheritsLoose(Tween, _Animation2);
  function Tween(targets, vars, position, skipInherit) {
    var _this3;
    if (typeof vars === "number") {
      position.duration = vars;
      vars = position;
      position = null;
    }
    _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
    var _this3$vars = _this3.vars,
      duration = _this3$vars.duration,
      delay = _this3$vars.delay,
      immediateRender = _this3$vars.immediateRender,
      stagger = _this3$vars.stagger,
      overwrite = _this3$vars.overwrite,
      keyframes = _this3$vars.keyframes,
      defaults = _this3$vars.defaults,
      scrollTrigger = _this3$vars.scrollTrigger,
      yoyoEase = _this3$vars.yoyoEase,
      parent = vars.parent || _globalTimeline,
      parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets),
      tl,
      i,
      copy,
      l,
      p,
      curTarget,
      staggerFunc,
      staggerVarsToMerge;
    _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://gsap.com", !_config.nullTargetWarn) || [];
    _this3._ptLookup = []; //PropTween lookup. An array containing an object for each target, having keys for each tweening property

    _this3._overwrite = overwrite;
    if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
      vars = _this3.vars;
      tl = _this3.timeline = new Timeline({
        data: "nested",
        defaults: defaults || {},
        targets: parent && parent.data === "nested" ? parent.vars.targets : parsedTargets
      }); // we need to store the targets because for staggers and keyframes, we end up creating an individual tween for each but function-based values need to know the index and the whole Array of targets.

      tl.kill();
      tl.parent = tl._dp = _assertThisInitialized(_this3);
      tl._start = 0;
      if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
        l = parsedTargets.length;
        staggerFunc = stagger && distribute(stagger);
        if (_isObject(stagger)) {
          //users can pass in callbacks like onStart/onComplete in the stagger object. These should fire with each individual tween.
          for (p in stagger) {
            if (~_staggerTweenProps.indexOf(p)) {
              staggerVarsToMerge || (staggerVarsToMerge = {});
              staggerVarsToMerge[p] = stagger[p];
            }
          }
        }
        for (i = 0; i < l; i++) {
          copy = _copyExcluding(vars, _staggerPropsToSkip);
          copy.stagger = 0;
          yoyoEase && (copy.yoyoEase = yoyoEase);
          staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
          curTarget = parsedTargets[i]; //don't just copy duration or delay because if they're a string or function, we'd end up in an infinite loop because _isFuncOrString() would evaluate as true in the child tweens, entering this loop, etc. So we parse the value straight from vars and default to 0.

          copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
          copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;
          if (!stagger && l === 1 && copy.delay) {
            // if someone does delay:"random(1, 5)", repeat:-1, for example, the delay shouldn't be inside the repeat.
            _this3._delay = delay = copy.delay;
            _this3._start += delay;
            copy.delay = 0;
          }
          tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
          tl._ease = _easeMap.none;
        }
        tl.duration() ? duration = delay = 0 : _this3.timeline = 0; // if the timeline's duration is 0, we don't need a timeline internally!
      } else if (keyframes) {
        _inheritDefaults(_setDefaults(tl.vars.defaults, {
          ease: "none"
        }));
        tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
        var time = 0,
          a,
          kf,
          v;
        if (_isArray(keyframes)) {
          keyframes.forEach(function (frame) {
            return tl.to(parsedTargets, frame, ">");
          });
          tl.duration(); // to ensure tl._dur is cached because we tap into it for performance purposes in the render() method.
        } else {
          copy = {};
          for (p in keyframes) {
            p === "ease" || p === "easeEach" || _parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
          }
          for (p in copy) {
            a = copy[p].sort(function (a, b) {
              return a.t - b.t;
            });
            time = 0;
            for (i = 0; i < a.length; i++) {
              kf = a[i];
              v = {
                ease: kf.e,
                duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
              };
              v[p] = kf.v;
              tl.to(parsedTargets, v, time);
              time += v.duration;
            }
          }
          tl.duration() < duration && tl.to({}, {
            duration: duration - tl.duration()
          }); // in case keyframes didn't go to 100%
        }
      }
      duration || _this3.duration(duration = tl.duration());
    } else {
      _this3.timeline = 0; //speed optimization, faster lookups (no going up the prototype chain)
    }
    if (overwrite === true && !_suppressOverwrites) {
      _overwritingTween = _assertThisInitialized(_this3);
      _globalTimeline.killTweensOf(parsedTargets);
      _overwritingTween = 0;
    }
    _addToTimeline(parent, _assertThisInitialized(_this3), position);
    vars.reversed && _this3.reverse();
    vars.paused && _this3.paused(true);
    if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
      _this3._tTime = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

      _this3.render(Math.max(0, -delay) || 0); //in case delay is negative
    }
    scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
    return _this3;
  }
  var _proto3 = Tween.prototype;
  _proto3.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time,
      tDur = this._tDur,
      dur = this._dur,
      isNegative = totalTime < 0,
      tTime = totalTime > tDur - _tinyNum && !isNegative ? tDur : totalTime < _tinyNum ? 0 : totalTime,
      time,
      pt,
      iteration,
      cycleDuration,
      prevIteration,
      isYoyo,
      ratio,
      timeline,
      yoyoEase;
    if (!dur) {
      _renderZeroDurationTween(this, totalTime, suppressEvents, force);
    } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== isNegative) {
      //this senses if we're crossing over the start time, in which case we must record _zTime and force the render, but we do it in this lengthy conditional way for performance reasons (usually we can skip the calculations): this._initted && (this._zTime < 0) !== (totalTime < 0)
      time = tTime;
      timeline = this.timeline;
      if (this._repeat) {
        //adjust the time for repeats and yoyos
        cycleDuration = dur + this._rDelay;
        if (this._repeat < -1 && isNegative) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }
        time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (tTime === tDur) {
          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
          iteration = this._repeat;
          time = dur;
        } else {
          iteration = ~~(tTime / cycleDuration);
          if (iteration && iteration === _roundPrecise(tTime / cycleDuration)) {
            time = dur;
            iteration--;
          }
          time > dur && (time = dur);
        }
        isYoyo = this._yoyo && iteration & 1;
        if (isYoyo) {
          yoyoEase = this._yEase;
          time = dur - time;
        }
        prevIteration = _animationCycle(this._tTime, cycleDuration);
        if (time === prevTime && !force && this._initted && iteration === prevIteration) {
          //could be during the repeatDelay part. No need to render and fire callbacks.
          this._tTime = tTime;
          return this;
        }
        if (iteration !== prevIteration) {
          timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo); //repeatRefresh functionality

          if (this.vars.repeatRefresh && !isYoyo && !this._lock && this._time !== cycleDuration && this._initted) {
            // this._time will === cycleDuration when we render at EXACTLY the end of an iteration. Without this condition, it'd often do the repeatRefresh render TWICE (again on the very next tick).
            this._lock = force = 1; //force, otherwise if lazy is true, the _attemptInitTween() will return and we'll jump out and get caught bouncing on each tick.

            this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
          }
        }
      }
      if (!this._initted) {
        if (_attemptInitTween(this, isNegative ? totalTime : time, force, suppressEvents, tTime)) {
          this._tTime = 0; // in constructor if immediateRender is true, we set _tTime to -_tinyNum to have the playhead cross the starting point but we can't leave _tTime as a negative number.

          return this;
        }
        if (prevTime !== this._time && !(force && this.vars.repeatRefresh && iteration !== prevIteration)) {
          // rare edge case - during initialization, an onUpdate in the _startAt (.fromTo()) might force this tween to render at a different spot in which case we should ditch this render() call so that it doesn't revert the values. But we also don't want to dump if we're doing a repeatRefresh render!
          return this;
        }
        if (dur !== this._dur) {
          // while initting, a plugin like InertiaPlugin might alter the duration, so rerun from the start to ensure everything renders as it should.
          return this.render(totalTime, suppressEvents, force);
        }
      }
      this._tTime = tTime;
      this._time = time;
      if (!this._act && this._ts) {
        this._act = 1; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

        this._lazy = 0;
      }
      this.ratio = ratio = (yoyoEase || this._ease)(time / dur);
      if (this._from) {
        this.ratio = ratio = 1 - ratio;
      }
      if (time && !prevTime && !suppressEvents && !iteration) {
        _callback(this, "onStart");
        if (this._tTime !== tTime) {
          // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
          return this;
        }
      }
      pt = this._pt;
      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
      timeline && timeline.render(totalTime < 0 ? totalTime : timeline._dur * timeline._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);
      if (this._onUpdate && !suppressEvents) {
        isNegative && _rewindStartAt(this, totalTime, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

        _callback(this, "onUpdate");
      }
      this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");
      if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
        isNegative && !this._onUpdate && _rewindStartAt(this, totalTime, true, true);
        (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if we're rendering at exactly a time of 0, as there could be autoRevert values that should get set on the next tick (if the playhead goes backward beyond the startTime, negative totalTime). Don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

        if (!suppressEvents && !(isNegative && !prevTime) && (tTime || prevTime || isYoyo)) {
          // if prevTime and tTime are zero, we shouldn't fire the onReverseComplete. This could happen if you gsap.to(... {paused:true}).play();
          _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);
          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }
    return this;
  };
  _proto3.targets = function targets() {
    return this._targets;
  };
  _proto3.invalidate = function invalidate(soft) {
    // "soft" gives us a way to clear out everything EXCEPT the recorded pre-"from" portion of from() tweens. Otherwise, for example, if you tween.progress(1).render(0, true true).invalidate(), the "from" values would persist and then on the next render, the from() tweens would initialize and the current value would match the "from" values, thus animate from the same value to the same value (no animation). We tap into this in ScrollTrigger's refresh() where we must push a tween to completion and then back again but honor its init state in case the tween is dependent on another tween further up on the page.
    (!soft || !this.vars.runBackwards) && (this._startAt = 0);
    this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0;
    this._ptLookup = [];
    this.timeline && this.timeline.invalidate(soft);
    return _Animation2.prototype.invalidate.call(this, soft);
  };
  _proto3.resetTo = function resetTo(property, value, start, startIsRelative, skipRecursion) {
    _tickerActive || _ticker.wake();
    this._ts || this.play();
    var time = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
      ratio;
    this._initted || _initTween(this, time);
    ratio = this._ease(time / this._dur); // don't just get tween.ratio because it may not have rendered yet.
    // possible future addition to allow an object with multiple values to update, like tween.resetTo({x: 100, y: 200}); At this point, it doesn't seem worth the added kb given the fact that most users will likely opt for the convenient gsap.quickTo() way of interacting with this method.
    // if (_isObject(property)) { // performance optimization
    // 	for (p in property) {
    // 		if (_updatePropTweens(this, p, property[p], value ? value[p] : null, start, ratio, time)) {
    // 			return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
    // 		}
    // 	}
    // } else {

    if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time, skipRecursion)) {
      return this.resetTo(property, value, start, startIsRelative, 1); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
    } //}

    _alignPlayhead(this, 0);
    this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
    return this.render(0);
  };
  _proto3.kill = function kill(targets, vars) {
    if (vars === void 0) {
      vars = "all";
    }
    if (!targets && (!vars || vars === "all")) {
      this._lazy = this._pt = 0;
      return this.parent ? _interrupt(this) : this;
    }
    if (this.timeline) {
      var tDur = this.timeline.totalDuration();
      this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this); // if nothing is left tweening, interrupt.

      this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1); // if a nested tween is killed that changes the duration, it should affect this tween's duration. We must use the ratio, though, because sometimes the internal timeline is stretched like for keyframes where they don't all add up to whatever the parent tween's duration was set to.

      return this;
    }
    var parsedTargets = this._targets,
      killingTargets = targets ? toArray(targets) : parsedTargets,
      propTweenLookup = this._ptLookup,
      firstPT = this._pt,
      overwrittenProps,
      curLookup,
      curOverwriteProps,
      props,
      p,
      pt,
      i;
    if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
      vars === "all" && (this._pt = 0);
      return _interrupt(this);
    }
    overwrittenProps = this._op = this._op || [];
    if (vars !== "all") {
      //so people can pass in a comma-delimited list of property names
      if (_isString(vars)) {
        p = {};
        _forEachName(vars, function (name) {
          return p[name] = 1;
        });
        vars = p;
      }
      vars = _addAliasesToVars(parsedTargets, vars);
    }
    i = parsedTargets.length;
    while (i--) {
      if (~killingTargets.indexOf(parsedTargets[i])) {
        curLookup = propTweenLookup[i];
        if (vars === "all") {
          overwrittenProps[i] = vars;
          props = curLookup;
          curOverwriteProps = {};
        } else {
          curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
          props = vars;
        }
        for (p in props) {
          pt = curLookup && curLookup[p];
          if (pt) {
            if (!("kill" in pt.d) || pt.d.kill(p) === true) {
              _removeLinkedListItem(this, pt, "_pt");
            }
            delete curLookup[p];
          }
          if (curOverwriteProps !== "all") {
            curOverwriteProps[p] = 1;
          }
        }
      }
    }
    this._initted && !this._pt && firstPT && _interrupt(this); //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.

    return this;
  };
  Tween.to = function to(targets, vars) {
    return new Tween(targets, vars, arguments[2]);
  };
  Tween.from = function from(targets, vars) {
    return _createTweenType(1, arguments);
  };
  Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
    return new Tween(callback, 0, {
      immediateRender: false,
      lazy: false,
      overwrite: false,
      delay: delay,
      onComplete: callback,
      onReverseComplete: callback,
      onCompleteParams: params,
      onReverseCompleteParams: params,
      callbackScope: scope
    }); // we must use onReverseComplete too for things like timeline.add(() => {...}) which should be triggered in BOTH directions (forward and reverse)
  };
  Tween.fromTo = function fromTo(targets, fromVars, toVars) {
    return _createTweenType(2, arguments);
  };
  Tween.set = function set(targets, vars) {
    vars.duration = 0;
    vars.repeatDelay || (vars.repeat = 0);
    return new Tween(targets, vars);
  };
  Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    return _globalTimeline.killTweensOf(targets, props, onlyActive);
  };
  return Tween;
}(Animation);
_setDefaults(Tween.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
}); //add the pertinent timeline methods to Tween instances so that users can chain conveniently and create a timeline automatically. (removed due to concerns that it'd ultimately add to more confusion especially for beginners)
// _forEachName("to,from,fromTo,set,call,add,addLabel,addPause", name => {
// 	Tween.prototype[name] = function() {
// 		let tl = new Timeline();
// 		return _addToTimeline(tl, this)[name].apply(tl, toArray(arguments));
// 	}
// });
//for backward compatibility. Leverage the timeline calls.

_forEachName("staggerTo,staggerFrom,staggerFromTo", function (name) {
  Tween[name] = function () {
    var tl = new Timeline(),
      params = _slice.call(arguments, 0);
    params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
    return tl[name].apply(tl, params);
  };
});
/*
 * --------------------------------------------------------------------------------------
 * PROPTWEEN
 * --------------------------------------------------------------------------------------
 */

var _setterPlain = function _setterPlain(target, property, value) {
    return target[property] = value;
  },
  _setterFunc = function _setterFunc(target, property, value) {
    return target[property](value);
  },
  _setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
    return target[property](data.fp, value);
  },
  _setterAttribute = function _setterAttribute(target, property, value) {
    return target.setAttribute(property, value);
  },
  _getSetter = exports._getSetter = function _getSetter(target, property) {
    return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
  },
  _renderPlain = function _renderPlain(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1000000) / 1000000, data);
  },
  _renderBoolean = function _renderBoolean(ratio, data) {
    return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
  },
  _renderComplexString = exports._renderComplexString = function _renderComplexString(ratio, data) {
    var pt = data._pt,
      s = "";
    if (!ratio && data.b) {
      //b = beginning string
      s = data.b;
    } else if (ratio === 1 && data.e) {
      //e = ending string
      s = data.e;
    } else {
      while (pt) {
        s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 10000) / 10000) + s; //we use the "p" property for the text inbetween (like a suffix). And in the context of a complex string, the modifier (m) is typically just Math.round(), like for RGB colors.

        pt = pt._next;
      }
      s += data.c; //we use the "c" of the PropTween to store the final chunk of non-numeric text.
    }
    data.set(data.t, data.p, s, data);
  },
  _renderPropTweens = function _renderPropTweens(ratio, data) {
    var pt = data._pt;
    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }
  },
  _addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
    var pt = this._pt,
      next;
    while (pt) {
      next = pt._next;
      pt.p === property && pt.modifier(modifier, tween, target);
      pt = next;
    }
  },
  _killPropTweensOf = function _killPropTweensOf(property) {
    var pt = this._pt,
      hasNonDependentRemaining,
      next;
    while (pt) {
      next = pt._next;
      if (pt.p === property && !pt.op || pt.op === property) {
        _removeLinkedListItem(this, pt, "_pt");
      } else if (!pt.dep) {
        hasNonDependentRemaining = 1;
      }
      pt = next;
    }
    return !hasNonDependentRemaining;
  },
  _setterWithModifier = function _setterWithModifier(target, property, value, data) {
    data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
  },
  _sortPropTweensByPriority = exports._sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
    var pt = parent._pt,
      next,
      pt2,
      first,
      last; //sorts the PropTween linked list in order of priority because some plugins need to do their work after ALL of the PropTweens were created (like RoundPropsPlugin and ModifiersPlugin)

    while (pt) {
      next = pt._next;
      pt2 = first;
      while (pt2 && pt2.pr > pt.pr) {
        pt2 = pt2._next;
      }
      if (pt._prev = pt2 ? pt2._prev : last) {
        pt._prev._next = pt;
      } else {
        first = pt;
      }
      if (pt._next = pt2) {
        pt2._prev = pt;
      } else {
        last = pt;
      }
      pt = next;
    }
    parent._pt = first;
  }; //PropTween key: t = target, p = prop, r = renderer, d = data, s = start, c = change, op = overwriteProperty (ONLY populated when it's different than p), pr = priority, _next/_prev for the linked list siblings, set = setter, m = modifier, mSet = modifierSetter (the original setter, before a modifier was added)

var PropTween = exports.PropTween = /*#__PURE__*/function () {
  function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
    this.t = target;
    this.s = start;
    this.c = change;
    this.p = prop;
    this.r = renderer || _renderPlain;
    this.d = data || this;
    this.set = setter || _setterPlain;
    this.pr = priority || 0;
    this._next = next;
    if (next) {
      next._prev = this;
    }
  }
  var _proto4 = PropTween.prototype;
  _proto4.modifier = function modifier(func, tween, target) {
    this.mSet = this.mSet || this.set; //in case it was already set (a PropTween can only have one modifier)

    this.set = _setterWithModifier;
    this.m = func;
    this.mt = target; //modifier target

    this.tween = tween;
  };
  return PropTween;
}(); //Initialization tasks

_forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (name) {
  return _reservedProps[name] = 1;
});
_globals.TweenMax = _globals.TweenLite = Tween;
_globals.TimelineLite = _globals.TimelineMax = Timeline;
_globalTimeline = new Timeline({
  sortChildren: false,
  defaults: _defaults,
  autoRemoveChildren: true,
  id: "root",
  smoothChildTiming: true
});
_config.stringFilter = _colorStringFilter;
var _media = [],
  _listeners = {},
  _emptyArray = [],
  _lastMediaTime = 0,
  _contextID = 0,
  _dispatch = function _dispatch(type) {
    return (_listeners[type] || _emptyArray).map(function (f) {
      return f();
    });
  },
  _onMediaChange = function _onMediaChange() {
    var time = Date.now(),
      matches = [];
    if (time - _lastMediaTime > 2) {
      _dispatch("matchMediaInit");
      _media.forEach(function (c) {
        var queries = c.queries,
          conditions = c.conditions,
          match,
          p,
          anyMatch,
          toggled;
        for (p in queries) {
          match = _win.matchMedia(queries[p]).matches; // Firefox doesn't update the "matches" property of the MediaQueryList object correctly - it only does so as it calls its change handler - so we must re-create a media query here to ensure it's accurate.

          match && (anyMatch = 1);
          if (match !== conditions[p]) {
            conditions[p] = match;
            toggled = 1;
          }
        }
        if (toggled) {
          c.revert();
          anyMatch && matches.push(c);
        }
      });
      _dispatch("matchMediaRevert");
      matches.forEach(function (c) {
        return c.onMatch(c, function (func) {
          return c.add(null, func);
        });
      });
      _lastMediaTime = time;
      _dispatch("matchMedia");
    }
  };
var Context = /*#__PURE__*/function () {
  function Context(func, scope) {
    this.selector = scope && selector(scope);
    this.data = [];
    this._r = []; // returned/cleanup functions

    this.isReverted = false;
    this.id = _contextID++; // to work around issues that frameworks like Vue cause by making things into Proxies which make it impossible to do something like _media.indexOf(this) because "this" would no longer refer to the Context instance itself - it'd refer to a Proxy! We needed a way to identify the context uniquely

    func && this.add(func);
  }
  var _proto5 = Context.prototype;
  _proto5.add = function add(name, func, scope) {
    // possible future addition if we need the ability to add() an animation to a context and for whatever reason cannot create that animation inside of a context.add(() => {...}) function.
    // if (name && _isFunction(name.revert)) {
    // 	this.data.push(name);
    // 	return (name._ctx = this);
    // }
    if (_isFunction(name)) {
      scope = func;
      func = name;
      name = _isFunction;
    }
    var self = this,
      f = function f() {
        var prev = _context,
          prevSelector = self.selector,
          result;
        prev && prev !== self && prev.data.push(self);
        scope && (self.selector = selector(scope));
        _context = self;
        result = func.apply(self, arguments);
        _isFunction(result) && self._r.push(result);
        _context = prev;
        self.selector = prevSelector;
        self.isReverted = false;
        return result;
      };
    self.last = f;
    return name === _isFunction ? f(self, function (func) {
      return self.add(null, func);
    }) : name ? self[name] = f : f;
  };
  _proto5.ignore = function ignore(func) {
    var prev = _context;
    _context = null;
    func(this);
    _context = prev;
  };
  _proto5.getTweens = function getTweens() {
    var a = [];
    this.data.forEach(function (e) {
      return e instanceof Context ? a.push.apply(a, e.getTweens()) : e instanceof Tween && !(e.parent && e.parent.data === "nested") && a.push(e);
    });
    return a;
  };
  _proto5.clear = function clear() {
    this._r.length = this.data.length = 0;
  };
  _proto5.kill = function kill(revert, matchMedia) {
    var _this4 = this;
    if (revert) {
      (function () {
        var tweens = _this4.getTweens(),
          i = _this4.data.length,
          t;
        while (i--) {
          // Flip plugin tweens are very different in that they should actually be pushed to their end. The plugin replaces the timeline's .revert() method to do exactly that. But we also need to remove any of those nested tweens inside the flip timeline so that they don't get individually reverted.
          t = _this4.data[i];
          if (t.data === "isFlip") {
            t.revert();
            t.getChildren(true, true, false).forEach(function (tween) {
              return tweens.splice(tweens.indexOf(tween), 1);
            });
          }
        } // save as an object so that we can cache the globalTime for each tween to optimize performance during the sort

        tweens.map(function (t) {
          return {
            g: t._dur || t._delay || t._sat && !t._sat.vars.immediateRender ? t.globalTime(0) : -Infinity,
            t: t
          };
        }).sort(function (a, b) {
          return b.g - a.g || -Infinity;
        }).forEach(function (o) {
          return o.t.revert(revert);
        }); // note: all of the _startAt tweens should be reverted in reverse order that they were created, and they'll all have the same globalTime (-1) so the " || -1" in the sort keeps the order properly.

        i = _this4.data.length;
        while (i--) {
          // make sure we loop backwards so that, for example, SplitTexts that were created later on the same element get reverted first
          t = _this4.data[i];
          if (t instanceof Timeline) {
            if (t.data !== "nested") {
              t.scrollTrigger && t.scrollTrigger.revert();
              t.kill(); // don't revert() the timeline because that's duplicating efforts since we already reverted all the tweens
            }
          } else {
            !(t instanceof Tween) && t.revert && t.revert(revert);
          }
        }
        _this4._r.forEach(function (f) {
          return f(revert, _this4);
        });
        _this4.isReverted = true;
      })();
    } else {
      this.data.forEach(function (e) {
        return e.kill && e.kill();
      });
    }
    this.clear();
    if (matchMedia) {
      var i = _media.length;
      while (i--) {
        // previously, we checked _media.indexOf(this), but some frameworks like Vue enforce Proxy objects that make it impossible to get the proper result that way, so we must use a unique ID number instead.
        _media[i].id === this.id && _media.splice(i, 1);
      }
    }
  };
  _proto5.revert = function revert(config) {
    this.kill(config || {});
  };
  return Context;
}();
var MatchMedia = /*#__PURE__*/function () {
  function MatchMedia(scope) {
    this.contexts = [];
    this.scope = scope;
    _context && _context.data.push(this);
  }
  var _proto6 = MatchMedia.prototype;
  _proto6.add = function add(conditions, func, scope) {
    _isObject(conditions) || (conditions = {
      matches: conditions
    });
    var context = new Context(0, scope || this.scope),
      cond = context.conditions = {},
      mq,
      p,
      active;
    _context && !context.selector && (context.selector = _context.selector); // in case a context is created inside a context. Like a gsap.matchMedia() that's inside a scoped gsap.context()

    this.contexts.push(context);
    func = context.add("onMatch", func);
    context.queries = conditions;
    for (p in conditions) {
      if (p === "all") {
        active = 1;
      } else {
        mq = _win.matchMedia(conditions[p]);
        if (mq) {
          _media.indexOf(context) < 0 && _media.push(context);
          (cond[p] = mq.matches) && (active = 1);
          mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
        }
      }
    }
    active && func(context, function (f) {
      return context.add(null, f);
    });
    return this;
  } // refresh() {
  // 	let time = _lastMediaTime,
  // 		media = _media;
  // 	_lastMediaTime = -1;
  // 	_media = this.contexts;
  // 	_onMediaChange();
  // 	_lastMediaTime = time;
  // 	_media = media;
  // }
  ;
  _proto6.revert = function revert(config) {
    this.kill(config || {});
  };
  _proto6.kill = function kill(revert) {
    this.contexts.forEach(function (c) {
      return c.kill(revert, true);
    });
  };
  return MatchMedia;
}();
/*
 * --------------------------------------------------------------------------------------
 * GSAP
 * --------------------------------------------------------------------------------------
 */

var _gsap = {
  registerPlugin: function registerPlugin() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    args.forEach(function (config) {
      return _createPlugin(config);
    });
  },
  timeline: function timeline(vars) {
    return new Timeline(vars);
  },
  getTweensOf: function getTweensOf(targets, onlyActive) {
    return _globalTimeline.getTweensOf(targets, onlyActive);
  },
  getProperty: function getProperty(target, property, unit, uncache) {
    _isString(target) && (target = toArray(target)[0]); //in case selector text or an array is passed in

    var getter = _getCache(target || {}).get,
      format = unit ? _passThrough : _numericIfPossible;
    unit === "native" && (unit = "");
    return !target ? target : !property ? function (property, unit, uncache) {
      return format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
    } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
  },
  quickSetter: function quickSetter(target, property, unit) {
    target = toArray(target);
    if (target.length > 1) {
      var setters = target.map(function (t) {
          return gsap.quickSetter(t, property, unit);
        }),
        l = setters.length;
      return function (value) {
        var i = l;
        while (i--) {
          setters[i](value);
        }
      };
    }
    target = target[0] || {};
    var Plugin = _plugins[property],
      cache = _getCache(target),
      p = cache.harness && (cache.harness.aliases || {})[property] || property,
      // in case it's an alias, like "rotate" for "rotation".
      setter = Plugin ? function (value) {
        var p = new Plugin();
        _quickTween._pt = 0;
        p.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
        p.render(1, p);
        _quickTween._pt && _renderPropTweens(1, _quickTween);
      } : cache.set(target, p);
    return Plugin ? setter : function (value) {
      return setter(target, p, unit ? value + unit : value, cache, 1);
    };
  },
  quickTo: function quickTo(target, property, vars) {
    var _merge2;
    var tween = gsap.to(target, _merge((_merge2 = {}, _merge2[property] = "+=0.1", _merge2.paused = true, _merge2), vars || {})),
      func = function func(value, start, startIsRelative) {
        return tween.resetTo(property, value, start, startIsRelative);
      };
    func.tween = tween;
    return func;
  },
  isTweening: function isTweening(targets) {
    return _globalTimeline.getTweensOf(targets, true).length > 0;
  },
  defaults: function defaults(value) {
    value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
    return _mergeDeep(_defaults, value || {});
  },
  config: function config(value) {
    return _mergeDeep(_config, value || {});
  },
  registerEffect: function registerEffect(_ref3) {
    var name = _ref3.name,
      effect = _ref3.effect,
      plugins = _ref3.plugins,
      defaults = _ref3.defaults,
      extendTimeline = _ref3.extendTimeline;
    (plugins || "").split(",").forEach(function (pluginName) {
      return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
    });
    _effects[name] = function (targets, vars, tl) {
      return effect(toArray(targets), _setDefaults(vars || {}, defaults), tl);
    };
    if (extendTimeline) {
      Timeline.prototype[name] = function (targets, vars, position) {
        return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
      };
    }
  },
  registerEase: function registerEase(name, ease) {
    _easeMap[name] = _parseEase(ease);
  },
  parseEase: function parseEase(ease, defaultEase) {
    return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
  },
  getById: function getById(id) {
    return _globalTimeline.getById(id);
  },
  exportRoot: function exportRoot(vars, includeDelayedCalls) {
    if (vars === void 0) {
      vars = {};
    }
    var tl = new Timeline(vars),
      child,
      next;
    tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);
    _globalTimeline.remove(tl);
    tl._dp = 0; //otherwise it'll get re-activated when adding children and be re-introduced into _globalTimeline's linked list (then added to itself).

    tl._time = tl._tTime = _globalTimeline._time;
    child = _globalTimeline._first;
    while (child) {
      next = child._next;
      if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
        _addToTimeline(tl, child, child._start - child._delay);
      }
      child = next;
    }
    _addToTimeline(_globalTimeline, tl, 0);
    return tl;
  },
  context: function context(func, scope) {
    return func ? new Context(func, scope) : _context;
  },
  matchMedia: function matchMedia(scope) {
    return new MatchMedia(scope);
  },
  matchMediaRefresh: function matchMediaRefresh() {
    return _media.forEach(function (c) {
      var cond = c.conditions,
        found,
        p;
      for (p in cond) {
        if (cond[p]) {
          cond[p] = false;
          found = 1;
        }
      }
      found && c.revert();
    }) || _onMediaChange();
  },
  addEventListener: function addEventListener(type, callback) {
    var a = _listeners[type] || (_listeners[type] = []);
    ~a.indexOf(callback) || a.push(callback);
  },
  removeEventListener: function removeEventListener(type, callback) {
    var a = _listeners[type],
      i = a && a.indexOf(callback);
    i >= 0 && a.splice(i, 1);
  },
  utils: {
    wrap: wrap,
    wrapYoyo: wrapYoyo,
    distribute: distribute,
    random: random,
    snap: snap,
    normalize: normalize,
    getUnit: getUnit,
    clamp: clamp,
    splitColor: splitColor,
    toArray: toArray,
    selector: selector,
    mapRange: mapRange,
    pipe: pipe,
    unitize: unitize,
    interpolate: interpolate,
    shuffle: shuffle
  },
  install: _install,
  effects: _effects,
  ticker: _ticker,
  updateRoot: Timeline.updateRoot,
  plugins: _plugins,
  globalTimeline: _globalTimeline,
  core: {
    PropTween: PropTween,
    globals: _addGlobal,
    Tween: Tween,
    Timeline: Timeline,
    Animation: Animation,
    getCache: _getCache,
    _removeLinkedListItem: _removeLinkedListItem,
    reverting: function reverting() {
      return _reverting;
    },
    context: function context(toAdd) {
      if (toAdd && _context) {
        _context.data.push(toAdd);
        toAdd._ctx = _context;
      }
      return _context;
    },
    suppressOverwrites: function suppressOverwrites(value) {
      return _suppressOverwrites = value;
    }
  }
};
_forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function (name) {
  return _gsap[name] = Tween[name];
});
_ticker.add(Timeline.updateRoot);
_quickTween = _gsap.to({}, {
  duration: 0
}); // ---- EXTRA PLUGINS --------------------------------------------------------

var _getPluginPropTween = function _getPluginPropTween(plugin, prop) {
    var pt = plugin._pt;
    while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
      pt = pt._next;
    }
    return pt;
  },
  _addModifiers = function _addModifiers(tween, modifiers) {
    var targets = tween._targets,
      p,
      i,
      pt;
    for (p in modifiers) {
      i = targets.length;
      while (i--) {
        pt = tween._ptLookup[i][p];
        if (pt && (pt = pt.d)) {
          if (pt._pt) {
            // is a plugin
            pt = _getPluginPropTween(pt, p);
          }
          pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
        }
      }
    }
  },
  _buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
    return {
      name: name,
      rawVars: 1,
      //don't pre-process function-based values or "random()" strings.
      init: function init(target, vars, tween) {
        tween._onInit = function (tween) {
          var temp, p;
          if (_isString(vars)) {
            temp = {};
            _forEachName(vars, function (name) {
              return temp[name] = 1;
            }); //if the user passes in a comma-delimited list of property names to roundProps, like "x,y", we round to whole numbers.

            vars = temp;
          }
          if (modifier) {
            temp = {};
            for (p in vars) {
              temp[p] = modifier(vars[p]);
            }
            vars = temp;
          }
          _addModifiers(tween, vars);
        };
      }
    };
  }; //register core plugins

var gsap = exports.default = exports.gsap = _gsap.registerPlugin({
  name: "attr",
  init: function init(target, vars, tween, index, targets) {
    var p, pt, v;
    this.tween = tween;
    for (p in vars) {
      v = target.getAttribute(p) || "";
      pt = this.add(target, "setAttribute", (v || 0) + "", vars[p], index, targets, 0, 0, p);
      pt.op = p;
      pt.b = v; // record the beginning value so we can revert()

      this._props.push(p);
    }
  },
  render: function render(ratio, data) {
    var pt = data._pt;
    while (pt) {
      _reverting ? pt.set(pt.t, pt.p, pt.b, pt) : pt.r(ratio, pt.d); // if reverting, go back to the original (pt.b)

      pt = pt._next;
    }
  }
}, {
  name: "endArray",
  init: function init(target, value) {
    var i = value.length;
    while (i--) {
      this.add(target, i, target[i] || 0, value[i], 0, 0, 0, 0, 0, 1);
    }
  }
}, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap; //to prevent the core plugins from being dropped via aggressive tree shaking, we must include them in the variable declaration in this way.

Tween.version = Timeline.version = gsap.version = "3.12.5";
_coreReady = 1;
_windowExists() && _wake();
var Power0 = exports.Power0 = _easeMap.Power0,
  Power1 = exports.Power1 = _easeMap.Power1,
  Power2 = exports.Power2 = _easeMap.Power2,
  Power3 = exports.Power3 = _easeMap.Power3,
  Power4 = exports.Power4 = _easeMap.Power4,
  Linear = exports.Linear = _easeMap.Linear,
  Quad = exports.Quad = _easeMap.Quad,
  Cubic = exports.Cubic = _easeMap.Cubic,
  Quart = exports.Quart = _easeMap.Quart,
  Quint = exports.Quint = _easeMap.Quint,
  Strong = exports.Strong = _easeMap.Strong,
  Elastic = exports.Elastic = _easeMap.Elastic,
  Back = exports.Back = _easeMap.Back,
  SteppedEase = exports.SteppedEase = _easeMap.SteppedEase,
  Bounce = exports.Bounce = _easeMap.Bounce,
  Sine = exports.Sine = _easeMap.Sine,
  Expo = exports.Expo = _easeMap.Expo,
  Circ = exports.Circ = _easeMap.Circ;

//export some internal methods/orojects for use in CSSPlugin so that we can externalize that file and allow custom builds that exclude it.
},{}],"../node_modules/gsap/CSSPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.checkPrefix = exports._getBBox = exports._createElement = exports.CSSPlugin = void 0;
var _gsapCore = require("./gsap-core.js");
/*!
 * CSSPlugin 3.12.5
 * https://gsap.com
 *
 * Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */

var _win,
  _doc,
  _docElement,
  _pluginInitted,
  _tempDiv,
  _tempDivStyler,
  _recentSetterPlugin,
  _reverting,
  _windowExists = function _windowExists() {
    return typeof window !== "undefined";
  },
  _transformProps = {},
  _RAD2DEG = 180 / Math.PI,
  _DEG2RAD = Math.PI / 180,
  _atan2 = Math.atan2,
  _bigNum = 1e8,
  _capsExp = /([A-Z])/g,
  _horizontalExp = /(left|right|width|margin|padding|x)/i,
  _complexExp = /[\s,\(]\S/,
  _propertyAliases = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity"
  },
  _renderCSSProp = function _renderCSSProp(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
  },
  _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
    return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
  },
  _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
    return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u : data.b, data);
  },
  //if units change, we need a way to render the original unit/value when the tween goes all the way back to the beginning (ratio:0)
  _renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
    var value = data.s + data.c * ratio;
    data.set(data.t, data.p, ~~(value + (value < 0 ? -.5 : .5)) + data.u, data);
  },
  _renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
    return data.set(data.t, data.p, ratio ? data.e : data.b, data);
  },
  _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
    return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
  },
  _setterCSSStyle = function _setterCSSStyle(target, property, value) {
    return target.style[property] = value;
  },
  _setterCSSProp = function _setterCSSProp(target, property, value) {
    return target.style.setProperty(property, value);
  },
  _setterTransform = function _setterTransform(target, property, value) {
    return target._gsap[property] = value;
  },
  _setterScale = function _setterScale(target, property, value) {
    return target._gsap.scaleX = target._gsap.scaleY = value;
  },
  _setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
    var cache = target._gsap;
    cache.scaleX = cache.scaleY = value;
    cache.renderTransform(ratio, cache);
  },
  _setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
    var cache = target._gsap;
    cache[property] = value;
    cache.renderTransform(ratio, cache);
  },
  _transformProp = "transform",
  _transformOriginProp = _transformProp + "Origin",
  _saveStyle = function _saveStyle(property, isNotCSS) {
    var _this = this;
    var target = this.target,
      style = target.style,
      cache = target._gsap;
    if (property in _transformProps && style) {
      this.tfm = this.tfm || {};
      if (property !== "transform") {
        property = _propertyAliases[property] || property;
        ~property.indexOf(",") ? property.split(",").forEach(function (a) {
          return _this.tfm[a] = _get(target, a);
        }) : this.tfm[property] = cache.x ? cache[property] : _get(target, property); // note: scale would map to "scaleX,scaleY", thus we loop and apply them both.

        property === _transformOriginProp && (this.tfm.zOrigin = cache.zOrigin);
      } else {
        return _propertyAliases.transform.split(",").forEach(function (p) {
          return _saveStyle.call(_this, p, isNotCSS);
        });
      }
      if (this.props.indexOf(_transformProp) >= 0) {
        return;
      }
      if (cache.svg) {
        this.svgo = target.getAttribute("data-svg-origin");
        this.props.push(_transformOriginProp, isNotCSS, "");
      }
      property = _transformProp;
    }
    (style || isNotCSS) && this.props.push(property, isNotCSS, style[property]);
  },
  _removeIndependentTransforms = function _removeIndependentTransforms(style) {
    if (style.translate) {
      style.removeProperty("translate");
      style.removeProperty("scale");
      style.removeProperty("rotate");
    }
  },
  _revertStyle = function _revertStyle() {
    var props = this.props,
      target = this.target,
      style = target.style,
      cache = target._gsap,
      i,
      p;
    for (i = 0; i < props.length; i += 3) {
      // stored like this: property, isNotCSS, value
      props[i + 1] ? target[props[i]] = props[i + 2] : props[i + 2] ? style[props[i]] = props[i + 2] : style.removeProperty(props[i].substr(0, 2) === "--" ? props[i] : props[i].replace(_capsExp, "-$1").toLowerCase());
    }
    if (this.tfm) {
      for (p in this.tfm) {
        cache[p] = this.tfm[p];
      }
      if (cache.svg) {
        cache.renderTransform();
        target.setAttribute("data-svg-origin", this.svgo || "");
      }
      i = _reverting();
      if ((!i || !i.isStart) && !style[_transformProp]) {
        _removeIndependentTransforms(style);
        if (cache.zOrigin && style[_transformOriginProp]) {
          style[_transformOriginProp] += " " + cache.zOrigin + "px"; // since we're uncaching, we must put the zOrigin back into the transformOrigin so that we can pull it out accurately when we parse again. Otherwise, we'd lose the z portion of the origin since we extract it to protect from Safari bugs.

          cache.zOrigin = 0;
          cache.renderTransform();
        }
        cache.uncache = 1; // if it's a startAt that's being reverted in the _initTween() of the core, we don't need to uncache transforms. This is purely a performance optimization.
      }
    }
  },
  _getStyleSaver = function _getStyleSaver(target, properties) {
    var saver = {
      target: target,
      props: [],
      revert: _revertStyle,
      save: _saveStyle
    };
    target._gsap || _gsapCore.gsap.core.getCache(target); // just make sure there's a _gsap cache defined because we read from it in _saveStyle() and it's more efficient to just check it here once.

    properties && properties.split(",").forEach(function (p) {
      return saver.save(p);
    });
    return saver;
  },
  _supports3D,
  _createElement = exports._createElement = function _createElement(type, ns) {
    var e = _doc.createElementNS ? _doc.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.

    return e && e.style ? e : _doc.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://gsap.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
  },
  _getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
    var cs = getComputedStyle(target);
    return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, _checkPropPrefix(property) || property, 1) || ""; //css variables may not need caps swapped out for dashes and lowercase.
  },
  _prefixes = "O,Moz,ms,Ms,Webkit".split(","),
  _checkPropPrefix = exports.checkPrefix = function _checkPropPrefix(property, element, preferPrefix) {
    var e = element || _tempDiv,
      s = e.style,
      i = 5;
    if (property in s && !preferPrefix) {
      return property;
    }
    property = property.charAt(0).toUpperCase() + property.substr(1);
    while (i-- && !(_prefixes[i] + property in s)) {}
    return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
  },
  _initCore = function _initCore() {
    if (_windowExists() && window.document) {
      _win = window;
      _doc = _win.document;
      _docElement = _doc.documentElement;
      _tempDiv = _createElement("div") || {
        style: {}
      };
      _tempDivStyler = _createElement("div");
      _transformProp = _checkPropPrefix(_transformProp);
      _transformOriginProp = _transformProp + "Origin";
      _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"; //make sure to override certain properties that may contaminate measurements, in case the user has overreaching style sheets.

      _supports3D = !!_checkPropPrefix("perspective");
      _reverting = _gsapCore.gsap.core.reverting;
      _pluginInitted = 1;
    }
  },
  _getBBoxHack = function _getBBoxHack(swapIfPossible) {
    //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
    var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
      oldParent = this.parentNode,
      oldSibling = this.nextSibling,
      oldCSS = this.style.cssText,
      bbox;
    _docElement.appendChild(svg);
    svg.appendChild(this);
    this.style.display = "block";
    if (swapIfPossible) {
      try {
        bbox = this.getBBox();
        this._gsapBBox = this.getBBox; //store the original

        this.getBBox = _getBBoxHack;
      } catch (e) {}
    } else if (this._gsapBBox) {
      bbox = this._gsapBBox();
    }
    if (oldParent) {
      if (oldSibling) {
        oldParent.insertBefore(this, oldSibling);
      } else {
        oldParent.appendChild(this);
      }
    }
    _docElement.removeChild(svg);
    this.style.cssText = oldCSS;
    return bbox;
  },
  _getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
    var i = attributesArray.length;
    while (i--) {
      if (target.hasAttribute(attributesArray[i])) {
        return target.getAttribute(attributesArray[i]);
      }
    }
  },
  _getBBox = exports._getBBox = function _getBBox(target) {
    var bounds;
    try {
      bounds = target.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
    } catch (error) {
      bounds = _getBBoxHack.call(target, true);
    }
    bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true)); //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.

    return bounds && !bounds.width && !bounds.x && !bounds.y ? {
      x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
      y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
      width: 0,
      height: 0
    } : bounds;
  },
  _isSVG = function _isSVG(e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
  },
  //reports if the element is an SVG on which getBBox() actually works
  _removeProperty = function _removeProperty(target, property) {
    if (property) {
      var style = target.style,
        first2Chars;
      if (property in _transformProps && property !== _transformOriginProp) {
        property = _transformProp;
      }
      if (style.removeProperty) {
        first2Chars = property.substr(0, 2);
        if (first2Chars === "ms" || property.substr(0, 6) === "webkit") {
          //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
          property = "-" + property;
        }
        style.removeProperty(first2Chars === "--" ? property : property.replace(_capsExp, "-$1").toLowerCase());
      } else {
        //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
        style.removeAttribute(property);
      }
    }
  },
  _addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
    var pt = new _gsapCore.PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
    plugin._pt = pt;
    pt.b = beginning;
    pt.e = end;
    plugin._props.push(property);
    return pt;
  },
  _nonConvertibleUnits = {
    deg: 1,
    rad: 1,
    turn: 1
  },
  _nonStandardLayouts = {
    grid: 1,
    flex: 1
  },
  //takes a single value like 20px and converts it to the unit specified, like "%", returning only the numeric amount.
  _convertToUnit = function _convertToUnit(target, property, value, unit) {
    var curValue = parseFloat(value) || 0,
      curUnit = (value + "").trim().substr((curValue + "").length) || "px",
      // some browsers leave extra whitespace at the beginning of CSS variables, hence the need to trim()
      style = _tempDiv.style,
      horizontal = _horizontalExp.test(property),
      isRootSVG = target.tagName.toLowerCase() === "svg",
      measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"),
      amount = 100,
      toPixels = unit === "px",
      toPercent = unit === "%",
      px,
      parent,
      cache,
      isSVG;
    if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
      return curValue;
    }
    curUnit !== "px" && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
    isSVG = target.getCTM && _isSVG(target);
    if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
      px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
      return (0, _gsapCore._round)(toPercent ? curValue / px * amount : curValue / 100 * px);
    }
    style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
    parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;
    if (isSVG) {
      parent = (target.ownerSVGElement || {}).parentNode;
    }
    if (!parent || parent === _doc || !parent.appendChild) {
      parent = _doc.body;
    }
    cache = parent._gsap;
    if (cache && toPercent && cache.width && horizontal && cache.time === _gsapCore._ticker.time && !cache.uncache) {
      return (0, _gsapCore._round)(curValue / cache.width * amount);
    } else {
      if (toPercent && (property === "height" || property === "width")) {
        // if we're dealing with width/height that's inside a container with padding and/or it's a flexbox/grid container, we must apply it to the target itself rather than the _tempDiv in order to ensure complete accuracy, factoring in the parent's padding.
        var v = target.style[property];
        target.style[property] = amount + unit;
        px = target[measureProperty];
        v ? target.style[property] = v : _removeProperty(target, property);
      } else {
        (toPercent || curUnit === "%") && !_nonStandardLayouts[_getComputedProperty(parent, "display")] && (style.position = _getComputedProperty(target, "position"));
        parent === target && (style.position = "static"); // like for borderRadius, if it's a % we must have it relative to the target itself but that may not have position: relative or position: absolute in which case it'd go up the chain until it finds its offsetParent (bad). position: static protects against that.

        parent.appendChild(_tempDiv);
        px = _tempDiv[measureProperty];
        parent.removeChild(_tempDiv);
        style.position = "absolute";
      }
      if (horizontal && toPercent) {
        cache = (0, _gsapCore._getCache)(parent);
        cache.time = _gsapCore._ticker.time;
        cache.width = parent[measureProperty];
      }
    }
    return (0, _gsapCore._round)(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
  },
  _get = function _get(target, property, unit, uncache) {
    var value;
    _pluginInitted || _initCore();
    if (property in _propertyAliases && property !== "transform") {
      property = _propertyAliases[property];
      if (~property.indexOf(",")) {
        property = property.split(",")[0];
      }
    }
    if (_transformProps[property] && property !== "transform") {
      value = _parseTransform(target, uncache);
      value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
    } else {
      value = target.style[property];
      if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
        value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || (0, _gsapCore._getProperty)(target, property) || (property === "opacity" ? 1 : 0); // note: some browsers, like Firefox, don't report borderRadius correctly! Instead, it only reports every corner like  borderTopLeftRadius
      }
    }
    return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
  },
  _tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
    // note: we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
    if (!start || start === "none") {
      // some browsers like Safari actually PREFER the prefixed property and mis-report the unprefixed value like clipPath (BUG). In other words, even though clipPath exists in the style ("clipPath" in target.style) and it's set in the CSS properly (along with -webkit-clip-path), Safari reports clipPath as "none" whereas WebkitClipPath reports accurately like "ellipse(100% 0% at 50% 0%)", so in this case we must SWITCH to using the prefixed property instead. See https://gsap.com/forums/topic/18310-clippath-doesnt-work-on-ios/
      var p = _checkPropPrefix(prop, target, 1),
        s = p && _getComputedProperty(target, p, 1);
      if (s && s !== start) {
        prop = p;
        start = s;
      } else if (prop === "borderColor") {
        start = _getComputedProperty(target, "borderTopColor"); // Firefox bug: always reports "borderColor" as "", so we must fall back to borderTopColor. See https://gsap.com/forums/topic/24583-how-to-return-colors-that-i-had-after-reverse/
      }
    }
    var pt = new _gsapCore.PropTween(this._pt, target.style, prop, 0, 1, _gsapCore._renderComplexString),
      index = 0,
      matchIndex = 0,
      a,
      result,
      startValues,
      startNum,
      color,
      startValue,
      endValue,
      endNum,
      chunk,
      endUnit,
      startUnit,
      endValues;
    pt.b = start;
    pt.e = end;
    start += ""; // ensure values are strings

    end += "";
    if (end === "auto") {
      startValue = target.style[prop];
      target.style[prop] = end;
      end = _getComputedProperty(target, prop) || end;
      startValue ? target.style[prop] = startValue : _removeProperty(target, prop);
    }
    a = [start, end];
    (0, _gsapCore._colorStringFilter)(a); // pass an array with the starting and ending values and let the filter do whatever it needs to the values. If colors are found, it returns true and then we must match where the color shows up order-wise because for things like boxShadow, sometimes the browser provides the computed values with the color FIRST, but the user provides it with the color LAST, so flip them if necessary. Same for drop-shadow().

    start = a[0];
    end = a[1];
    startValues = start.match(_gsapCore._numWithUnitExp) || [];
    endValues = end.match(_gsapCore._numWithUnitExp) || [];
    if (endValues.length) {
      while (result = _gsapCore._numWithUnitExp.exec(end)) {
        endValue = result[0];
        chunk = end.substring(index, result.index);
        if (color) {
          color = (color + 1) % 5;
        } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
          color = 1;
        }
        if (endValue !== (startValue = startValues[matchIndex++] || "")) {
          startNum = parseFloat(startValue) || 0;
          startUnit = startValue.substr((startNum + "").length);
          endValue.charAt(1) === "=" && (endValue = (0, _gsapCore._parseRelative)(startNum, endValue) + startUnit);
          endNum = parseFloat(endValue);
          endUnit = endValue.substr((endNum + "").length);
          index = _gsapCore._numWithUnitExp.lastIndex - endUnit.length;
          if (!endUnit) {
            //if something like "perspective:300" is passed in and we must add a unit to the end
            endUnit = endUnit || _gsapCore._config.units[prop] || startUnit;
            if (index === end.length) {
              end += endUnit;
              pt.e += endUnit;
            }
          }
          if (startUnit !== endUnit) {
            startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
          } // these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.

          pt._pt = {
            _next: pt._pt,
            p: chunk || matchIndex === 1 ? chunk : ",",
            //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
            s: startNum,
            c: endNum - startNum,
            m: color && color < 4 || prop === "zIndex" ? Math.round : 0
          };
        }
      }
      pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)
    } else {
      pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
    }
    _gsapCore._relExp.test(end) && (pt.e = 0); //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).

    this._pt = pt; //start the linked list with this new PropTween. Remember, we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within another plugin too, thus "this" would refer to the plugin.

    return pt;
  },
  _keywordToPercent = {
    top: "0%",
    bottom: "100%",
    left: "0%",
    right: "100%",
    center: "50%"
  },
  _convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
    var split = value.split(" "),
      x = split[0],
      y = split[1] || "50%";
    if (x === "top" || x === "bottom" || y === "left" || y === "right") {
      //the user provided them in the wrong order, so flip them
      value = x;
      x = y;
      y = value;
    }
    split[0] = _keywordToPercent[x] || x;
    split[1] = _keywordToPercent[y] || y;
    return split.join(" ");
  },
  _renderClearProps = function _renderClearProps(ratio, data) {
    if (data.tween && data.tween._time === data.tween._dur) {
      var target = data.t,
        style = target.style,
        props = data.u,
        cache = target._gsap,
        prop,
        clearTransforms,
        i;
      if (props === "all" || props === true) {
        style.cssText = "";
        clearTransforms = 1;
      } else {
        props = props.split(",");
        i = props.length;
        while (--i > -1) {
          prop = props[i];
          if (_transformProps[prop]) {
            clearTransforms = 1;
            prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
          }
          _removeProperty(target, prop);
        }
      }
      if (clearTransforms) {
        _removeProperty(target, _transformProp);
        if (cache) {
          cache.svg && target.removeAttribute("transform");
          _parseTransform(target, 1); // force all the cached values back to "normal"/identity, otherwise if there's another tween that's already set to render transforms on this element, it could display the wrong values.

          cache.uncache = 1;
          _removeIndependentTransforms(style);
        }
      }
    }
  },
  // note: specialProps should return 1 if (and only if) they have a non-zero priority. It indicates we need to sort the linked list.
  _specialProps = {
    clearProps: function clearProps(plugin, target, property, endValue, tween) {
      if (tween.data !== "isFromStart") {
        var pt = plugin._pt = new _gsapCore.PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
        pt.u = endValue;
        pt.pr = -10;
        pt.tween = tween;
        plugin._props.push(property);
        return 1;
      }
    }
    /* className feature (about 0.4kb gzipped).
    , className(plugin, target, property, endValue, tween) {
    	let _renderClassName = (ratio, data) => {
    			data.css.render(ratio, data.css);
    			if (!ratio || ratio === 1) {
    				let inline = data.rmv,
    					target = data.t,
    					p;
    				target.setAttribute("class", ratio ? data.e : data.b);
    				for (p in inline) {
    					_removeProperty(target, p);
    				}
    			}
    		},
    		_getAllStyles = (target) => {
    			let styles = {},
    				computed = getComputedStyle(target),
    				p;
    			for (p in computed) {
    				if (isNaN(p) && p !== "cssText" && p !== "length") {
    					styles[p] = computed[p];
    				}
    			}
    			_setDefaults(styles, _parseTransform(target, 1));
    			return styles;
    		},
    		startClassList = target.getAttribute("class"),
    		style = target.style,
    		cssText = style.cssText,
    		cache = target._gsap,
    		classPT = cache.classPT,
    		inlineToRemoveAtEnd = {},
    		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
    		changingVars = {},
    		startVars = _getAllStyles(target),
    		transformRelated = /(transform|perspective)/i,
    		endVars, p;
    	if (classPT) {
    		classPT.r(1, classPT.d);
    		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
    	}
    	target.setAttribute("class", data.e);
    	endVars = _getAllStyles(target, true);
    	target.setAttribute("class", startClassList);
    	for (p in endVars) {
    		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
    			changingVars[p] = endVars[p];
    			if (!style[p] && style[p] !== "0") {
    				inlineToRemoveAtEnd[p] = 1;
    			}
    		}
    	}
    	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
    	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
    		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
    	}
    	_parseTransform(target, true); //to clear the caching of transforms
    	data.css = new gsap.plugins.css();
    	data.css.init(target, changingVars, tween);
    	plugin._props.push(...data.css._props);
    	return 1;
    }
    */
  },
  /*
   * --------------------------------------------------------------------------------------
   * TRANSFORMS
   * --------------------------------------------------------------------------------------
   */
  _identity2DMatrix = [1, 0, 0, 1, 0, 0],
  _rotationalProperties = {},
  _isNullTransform = function _isNullTransform(value) {
    return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
  },
  _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
    var matrixString = _getComputedProperty(target, _transformProp);
    return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_gsapCore._numExp).map(_gsapCore._round);
  },
  _getMatrix = function _getMatrix(target, force2D) {
    var cache = target._gsap || (0, _gsapCore._getCache)(target),
      style = target.style,
      matrix = _getComputedTransformMatrixAsArray(target),
      parent,
      nextSibling,
      temp,
      addedToDOM;
    if (cache.svg && target.getAttribute("transform")) {
      temp = target.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.

      matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
      return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
    } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
      //note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
      //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
      temp = style.display;
      style.display = "block";
      parent = target.parentNode;
      if (!parent || !target.offsetParent) {
        // note: in 3.3.0 we switched target.offsetParent to _doc.body.contains(target) to avoid [sometimes unnecessary] MutationObserver calls but that wasn't adequate because there are edge cases where nested position: fixed elements need to get reparented to accurately sense transforms. See https://github.com/greensock/GSAP/issues/388 and https://github.com/greensock/GSAP/issues/375
        addedToDOM = 1; //flag

        nextSibling = target.nextElementSibling;
        _docElement.appendChild(target); //we must add it to the DOM in order to get values properly
      }
      matrix = _getComputedTransformMatrixAsArray(target);
      temp ? style.display = temp : _removeProperty(target, "display");
      if (addedToDOM) {
        nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
      }
    }
    return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
  },
  _applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
    var cache = target._gsap,
      matrix = matrixArray || _getMatrix(target, true),
      xOriginOld = cache.xOrigin || 0,
      yOriginOld = cache.yOrigin || 0,
      xOffsetOld = cache.xOffset || 0,
      yOffsetOld = cache.yOffset || 0,
      a = matrix[0],
      b = matrix[1],
      c = matrix[2],
      d = matrix[3],
      tx = matrix[4],
      ty = matrix[5],
      originSplit = origin.split(" "),
      xOrigin = parseFloat(originSplit[0]) || 0,
      yOrigin = parseFloat(originSplit[1]) || 0,
      bounds,
      determinant,
      x,
      y;
    if (!originIsAbsolute) {
      bounds = _getBBox(target);
      xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
      yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin); // if (!("xOrigin" in cache) && (xOrigin || yOrigin)) { // added in 3.12.3, reverted in 3.12.4; requires more exploration
      // 	xOrigin -= bounds.x;
      // 	yOrigin -= bounds.y;
      // }
    } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
      //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
      x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
      y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
      xOrigin = x;
      yOrigin = y; // theory: we only had to do this for smoothing and it assumes that the previous one was not originIsAbsolute.
    }
    if (smooth || smooth !== false && cache.smooth) {
      tx = xOrigin - xOriginOld;
      ty = yOrigin - yOriginOld;
      cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
      cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
    } else {
      cache.xOffset = cache.yOffset = 0;
    }
    cache.xOrigin = xOrigin;
    cache.yOrigin = yOrigin;
    cache.smooth = !!smooth;
    cache.origin = origin;
    cache.originIsAbsolute = !!originIsAbsolute;
    target.style[_transformOriginProp] = "0px 0px"; //otherwise, if someone sets  an origin via CSS, it will likely interfere with the SVG transform attribute ones (because remember, we're baking the origin into the matrix() value).

    if (pluginToAddPropTweensTo) {
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
    }
    target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
  },
  _parseTransform = function _parseTransform(target, uncache) {
    var cache = target._gsap || new _gsapCore.GSCache(target);
    if ("x" in cache && !uncache && !cache.uncache) {
      return cache;
    }
    var style = target.style,
      invertedScaleX = cache.scaleX < 0,
      px = "px",
      deg = "deg",
      cs = getComputedStyle(target),
      origin = _getComputedProperty(target, _transformOriginProp) || "0",
      x,
      y,
      z,
      scaleX,
      scaleY,
      rotation,
      rotationX,
      rotationY,
      skewX,
      skewY,
      perspective,
      xOrigin,
      yOrigin,
      matrix,
      angle,
      cos,
      sin,
      a,
      b,
      c,
      d,
      a12,
      a22,
      t1,
      t2,
      t3,
      a13,
      a23,
      a33,
      a42,
      a43,
      a32;
    x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
    scaleX = scaleY = 1;
    cache.svg = !!(target.getCTM && _isSVG(target));
    if (cs.translate) {
      // accommodate independent transforms by combining them into normal ones.
      if (cs.translate !== "none" || cs.scale !== "none" || cs.rotate !== "none") {
        style[_transformProp] = (cs.translate !== "none" ? "translate3d(" + (cs.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (cs.rotate !== "none" ? "rotate(" + cs.rotate + ") " : "") + (cs.scale !== "none" ? "scale(" + cs.scale.split(" ").join(",") + ") " : "") + (cs[_transformProp] !== "none" ? cs[_transformProp] : "");
      }
      style.scale = style.rotate = style.translate = "none";
    }
    matrix = _getMatrix(target, cache.svg);
    if (cache.svg) {
      if (cache.uncache) {
        // if cache.uncache is true (and maybe if origin is 0,0), we need to set element.style.transformOrigin = (cache.xOrigin - bbox.x) + "px " + (cache.yOrigin - bbox.y) + "px". Previously we let the data-svg-origin stay instead, but when introducing revert(), it complicated things.
        t2 = target.getBBox();
        origin = cache.xOrigin - t2.x + "px " + (cache.yOrigin - t2.y) + "px";
        t1 = "";
      } else {
        t1 = !uncache && target.getAttribute("data-svg-origin"); //  Remember, to work around browser inconsistencies we always force SVG elements' transformOrigin to 0,0 and offset the translation accordingly.
      }
      _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
    }
    xOrigin = cache.xOrigin || 0;
    yOrigin = cache.yOrigin || 0;
    if (matrix !== _identity2DMatrix) {
      a = matrix[0]; //a11

      b = matrix[1]; //a21

      c = matrix[2]; //a31

      d = matrix[3]; //a41

      x = a12 = matrix[4];
      y = a22 = matrix[5]; //2D matrix

      if (matrix.length === 6) {
        scaleX = Math.sqrt(a * a + b * b);
        scaleY = Math.sqrt(d * d + c * c);
        rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).

        skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
        skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));
        if (cache.svg) {
          x -= xOrigin - (xOrigin * a + yOrigin * c);
          y -= yOrigin - (xOrigin * b + yOrigin * d);
        } //3D matrix
      } else {
        a32 = matrix[6];
        a42 = matrix[7];
        a13 = matrix[8];
        a23 = matrix[9];
        a33 = matrix[10];
        a43 = matrix[11];
        x = matrix[12];
        y = matrix[13];
        z = matrix[14];
        angle = _atan2(a32, a33);
        rotationX = angle * _RAD2DEG; //rotationX

        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a12 * cos + a13 * sin;
          t2 = a22 * cos + a23 * sin;
          t3 = a32 * cos + a33 * sin;
          a13 = a12 * -sin + a13 * cos;
          a23 = a22 * -sin + a23 * cos;
          a33 = a32 * -sin + a33 * cos;
          a43 = a42 * -sin + a43 * cos;
          a12 = t1;
          a22 = t2;
          a32 = t3;
        } //rotationY

        angle = _atan2(-c, a33);
        rotationY = angle * _RAD2DEG;
        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a * cos - a13 * sin;
          t2 = b * cos - a23 * sin;
          t3 = c * cos - a33 * sin;
          a43 = d * sin + a43 * cos;
          a = t1;
          b = t2;
          c = t3;
        } //rotationZ

        angle = _atan2(b, a);
        rotation = angle * _RAD2DEG;
        if (angle) {
          cos = Math.cos(angle);
          sin = Math.sin(angle);
          t1 = a * cos + b * sin;
          t2 = a12 * cos + a22 * sin;
          b = b * cos - a * sin;
          a22 = a22 * cos - a12 * sin;
          a = t1;
          a12 = t2;
        }
        if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
          //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
          rotationX = rotation = 0;
          rotationY = 180 - rotationY;
        }
        scaleX = (0, _gsapCore._round)(Math.sqrt(a * a + b * b + c * c));
        scaleY = (0, _gsapCore._round)(Math.sqrt(a22 * a22 + a32 * a32));
        angle = _atan2(a12, a22);
        skewX = Math.abs(angle) > 0.0002 ? angle * _RAD2DEG : 0;
        perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
      }
      if (cache.svg) {
        //sense if there are CSS transforms applied on an SVG element in which case we must overwrite them when rendering. The transform attribute is more reliable cross-browser, but we can't just remove the CSS ones because they may be applied in a CSS rule somewhere (not just inline).
        t1 = target.getAttribute("transform");
        cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
        t1 && target.setAttribute("transform", t1);
      }
    }
    if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
      if (invertedScaleX) {
        scaleX *= -1;
        skewX += rotation <= 0 ? 180 : -180;
        rotation += rotation <= 0 ? 180 : -180;
      } else {
        scaleY *= -1;
        skewX += skewX <= 0 ? 180 : -180;
      }
    }
    uncache = uncache || cache.uncache;
    cache.x = x - ((cache.xPercent = x && (!uncache && cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
    cache.y = y - ((cache.yPercent = y && (!uncache && cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
    cache.z = z + px;
    cache.scaleX = (0, _gsapCore._round)(scaleX);
    cache.scaleY = (0, _gsapCore._round)(scaleY);
    cache.rotation = (0, _gsapCore._round)(rotation) + deg;
    cache.rotationX = (0, _gsapCore._round)(rotationX) + deg;
    cache.rotationY = (0, _gsapCore._round)(rotationY) + deg;
    cache.skewX = skewX + deg;
    cache.skewY = skewY + deg;
    cache.transformPerspective = perspective + px;
    if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || !uncache && cache.zOrigin || 0) {
      style[_transformOriginProp] = _firstTwoOnly(origin);
    }
    cache.xOffset = cache.yOffset = 0;
    cache.force3D = _gsapCore._config.force3D;
    cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
    cache.uncache = 0;
    return cache;
  },
  _firstTwoOnly = function _firstTwoOnly(value) {
    return (value = value.split(" "))[0] + " " + value[1];
  },
  //for handling transformOrigin values, stripping out the 3rd dimension
  _addPxTranslate = function _addPxTranslate(target, start, value) {
    var unit = (0, _gsapCore.getUnit)(start);
    return (0, _gsapCore._round)(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
  },
  _renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
    cache.z = "0px";
    cache.rotationY = cache.rotationX = "0deg";
    cache.force3D = 0;
    _renderCSSTransforms(ratio, cache);
  },
  _zeroDeg = "0deg",
  _zeroPx = "0px",
  _endParenthesis = ") ",
  _renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
    var _ref = cache || this,
      xPercent = _ref.xPercent,
      yPercent = _ref.yPercent,
      x = _ref.x,
      y = _ref.y,
      z = _ref.z,
      rotation = _ref.rotation,
      rotationY = _ref.rotationY,
      rotationX = _ref.rotationX,
      skewX = _ref.skewX,
      skewY = _ref.skewY,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY,
      transformPerspective = _ref.transformPerspective,
      force3D = _ref.force3D,
      target = _ref.target,
      zOrigin = _ref.zOrigin,
      transforms = "",
      use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true; // Safari has a bug that causes it not to render 3D transform-origin values properly, so we force the z origin to 0, record it in the cache, and then do the math here to offset the translate values accordingly (basically do the 3D transform-origin part manually)

    if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
      var angle = parseFloat(rotationY) * _DEG2RAD,
        a13 = Math.sin(angle),
        a33 = Math.cos(angle),
        cos;
      angle = parseFloat(rotationX) * _DEG2RAD;
      cos = Math.cos(angle);
      x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
      y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
      z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
    }
    if (transformPerspective !== _zeroPx) {
      transforms += "perspective(" + transformPerspective + _endParenthesis;
    }
    if (xPercent || yPercent) {
      transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
    }
    if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
      transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
    }
    if (rotation !== _zeroDeg) {
      transforms += "rotate(" + rotation + _endParenthesis;
    }
    if (rotationY !== _zeroDeg) {
      transforms += "rotateY(" + rotationY + _endParenthesis;
    }
    if (rotationX !== _zeroDeg) {
      transforms += "rotateX(" + rotationX + _endParenthesis;
    }
    if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
      transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
    }
    if (scaleX !== 1 || scaleY !== 1) {
      transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
    }
    target.style[_transformProp] = transforms || "translate(0, 0)";
  },
  _renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
    var _ref2 = cache || this,
      xPercent = _ref2.xPercent,
      yPercent = _ref2.yPercent,
      x = _ref2.x,
      y = _ref2.y,
      rotation = _ref2.rotation,
      skewX = _ref2.skewX,
      skewY = _ref2.skewY,
      scaleX = _ref2.scaleX,
      scaleY = _ref2.scaleY,
      target = _ref2.target,
      xOrigin = _ref2.xOrigin,
      yOrigin = _ref2.yOrigin,
      xOffset = _ref2.xOffset,
      yOffset = _ref2.yOffset,
      forceCSS = _ref2.forceCSS,
      tx = parseFloat(x),
      ty = parseFloat(y),
      a11,
      a21,
      a12,
      a22,
      temp;
    rotation = parseFloat(rotation);
    skewX = parseFloat(skewX);
    skewY = parseFloat(skewY);
    if (skewY) {
      //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
      skewY = parseFloat(skewY);
      skewX += skewY;
      rotation += skewY;
    }
    if (rotation || skewX) {
      rotation *= _DEG2RAD;
      skewX *= _DEG2RAD;
      a11 = Math.cos(rotation) * scaleX;
      a21 = Math.sin(rotation) * scaleX;
      a12 = Math.sin(rotation - skewX) * -scaleY;
      a22 = Math.cos(rotation - skewX) * scaleY;
      if (skewX) {
        skewY *= _DEG2RAD;
        temp = Math.tan(skewX - skewY);
        temp = Math.sqrt(1 + temp * temp);
        a12 *= temp;
        a22 *= temp;
        if (skewY) {
          temp = Math.tan(skewY);
          temp = Math.sqrt(1 + temp * temp);
          a11 *= temp;
          a21 *= temp;
        }
      }
      a11 = (0, _gsapCore._round)(a11);
      a21 = (0, _gsapCore._round)(a21);
      a12 = (0, _gsapCore._round)(a12);
      a22 = (0, _gsapCore._round)(a22);
    } else {
      a11 = scaleX;
      a22 = scaleY;
      a21 = a12 = 0;
    }
    if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
      tx = _convertToUnit(target, "x", x, "px");
      ty = _convertToUnit(target, "y", y, "px");
    }
    if (xOrigin || yOrigin || xOffset || yOffset) {
      tx = (0, _gsapCore._round)(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
      ty = (0, _gsapCore._round)(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
    }
    if (xPercent || yPercent) {
      //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the translation to simulate it.
      temp = target.getBBox();
      tx = (0, _gsapCore._round)(tx + xPercent / 100 * temp.width);
      ty = (0, _gsapCore._round)(ty + yPercent / 100 * temp.height);
    }
    temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
    target.setAttribute("transform", temp);
    forceCSS && (target.style[_transformProp] = temp); //some browsers prioritize CSS transforms over the transform attribute. When we sense that the user has CSS transforms applied, we must overwrite them this way (otherwise some browser simply won't render the transform attribute changes!)
  },
  _addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue) {
    var cap = 360,
      isString = (0, _gsapCore._isString)(endValue),
      endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1),
      change = endNum - startNum,
      finalValue = startNum + change + "deg",
      direction,
      pt;
    if (isString) {
      direction = endValue.split("_")[1];
      if (direction === "short") {
        change %= cap;
        if (change !== change % (cap / 2)) {
          change += change < 0 ? cap : -cap;
        }
      }
      if (direction === "cw" && change < 0) {
        change = (change + cap * _bigNum) % cap - ~~(change / cap) * cap;
      } else if (direction === "ccw" && change > 0) {
        change = (change - cap * _bigNum) % cap - ~~(change / cap) * cap;
      }
    }
    plugin._pt = pt = new _gsapCore.PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
    pt.e = finalValue;
    pt.u = "deg";
    plugin._props.push(property);
    return pt;
  },
  _assign = function _assign(target, source) {
    // Internet Explorer doesn't have Object.assign(), so we recreate it here.
    for (var p in source) {
      target[p] = source[p];
    }
    return target;
  },
  _addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
    //for handling cases where someone passes in a whole transform string, like transform: "scale(2, 3) rotate(20deg) translateY(30em)"
    var startCache = _assign({}, target._gsap),
      exclude = "perspective,force3D,transformOrigin,svgOrigin",
      style = target.style,
      endCache,
      p,
      startValue,
      endValue,
      startNum,
      endNum,
      startUnit,
      endUnit;
    if (startCache.svg) {
      startValue = target.getAttribute("transform");
      target.setAttribute("transform", "");
      style[_transformProp] = transforms;
      endCache = _parseTransform(target, 1);
      _removeProperty(target, _transformProp);
      target.setAttribute("transform", startValue);
    } else {
      startValue = getComputedStyle(target)[_transformProp];
      style[_transformProp] = transforms;
      endCache = _parseTransform(target, 1);
      style[_transformProp] = startValue;
    }
    for (p in _transformProps) {
      startValue = startCache[p];
      endValue = endCache[p];
      if (startValue !== endValue && exclude.indexOf(p) < 0) {
        //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
        startUnit = (0, _gsapCore.getUnit)(startValue);
        endUnit = (0, _gsapCore.getUnit)(endValue);
        startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
        endNum = parseFloat(endValue);
        plugin._pt = new _gsapCore.PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
        plugin._pt.u = endUnit || 0;
        plugin._props.push(p);
      }
    }
    _assign(endCache, startCache);
  }; // handle splitting apart padding, margin, borderWidth, and borderRadius into their 4 components. Firefox, for example, won't report borderRadius correctly - it will only do borderTopLeftRadius and the other corners. We also want to handle paddingTop, marginLeft, borderRightWidth, etc.

(0, _gsapCore._forEachName)("padding,margin,Width,Radius", function (name, index) {
  var t = "Top",
    r = "Right",
    b = "Bottom",
    l = "Left",
    props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function (side) {
      return index < 2 ? name + side : "border" + side + name;
    });
  _specialProps[index > 1 ? "border" + name : name] = function (plugin, target, property, endValue, tween) {
    var a, vars;
    if (arguments.length < 4) {
      // getter, passed target, property, and unit (from _get())
      a = props.map(function (prop) {
        return _get(plugin, prop, property);
      });
      vars = a.join(" ");
      return vars.split(a[0]).length === 5 ? a[0] : vars;
    }
    a = (endValue + "").split(" ");
    vars = {};
    props.forEach(function (prop, i) {
      return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
    });
    plugin.init(target, vars, tween);
  };
});
var CSSPlugin = exports.default = exports.CSSPlugin = {
  name: "css",
  register: _initCore,
  targetTest: function targetTest(target) {
    return target.style && target.nodeType;
  },
  init: function init(target, vars, tween, index, targets) {
    var props = this._props,
      style = target.style,
      startAt = tween.vars.startAt,
      startValue,
      endValue,
      endNum,
      startNum,
      type,
      specialProp,
      p,
      startUnit,
      endUnit,
      relative,
      isTransformRelated,
      transformPropTween,
      cache,
      smooth,
      hasPriority,
      inlineProps;
    _pluginInitted || _initCore(); // we may call init() multiple times on the same plugin instance, like when adding special properties, so make sure we don't overwrite the revert data or inlineProps

    this.styles = this.styles || _getStyleSaver(target);
    inlineProps = this.styles.props;
    this.tween = tween;
    for (p in vars) {
      if (p === "autoRound") {
        continue;
      }
      endValue = vars[p];
      if (_gsapCore._plugins[p] && (0, _gsapCore._checkPlugin)(p, vars, tween, index, target, targets)) {
        // plugins
        continue;
      }
      type = typeof endValue;
      specialProp = _specialProps[p];
      if (type === "function") {
        endValue = endValue.call(tween, index, target, targets);
        type = typeof endValue;
      }
      if (type === "string" && ~endValue.indexOf("random(")) {
        endValue = (0, _gsapCore._replaceRandom)(endValue);
      }
      if (specialProp) {
        specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
      } else if (p.substr(0, 2) === "--") {
        //CSS variable
        startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
        endValue += "";
        _gsapCore._colorExp.lastIndex = 0;
        if (!_gsapCore._colorExp.test(startValue)) {
          // colors don't have units
          startUnit = (0, _gsapCore.getUnit)(startValue);
          endUnit = (0, _gsapCore.getUnit)(endValue);
        }
        endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
        this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
        props.push(p);
        inlineProps.push(p, 0, style[p]);
      } else if (type !== "undefined") {
        if (startAt && p in startAt) {
          // in case someone hard-codes a complex value as the start, like top: "calc(2vh / 2)". Without this, it'd use the computed value (always in px)
          startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
          (0, _gsapCore._isString)(startValue) && ~startValue.indexOf("random(") && (startValue = (0, _gsapCore._replaceRandom)(startValue));
          (0, _gsapCore.getUnit)(startValue + "") || startValue === "auto" || (startValue += _gsapCore._config.units[p] || (0, _gsapCore.getUnit)(_get(target, p)) || ""); // for cases when someone passes in a unitless value like {x: 100}; if we try setting translate(100, 0px) it won't work.

          (startValue + "").charAt(1) === "=" && (startValue = _get(target, p)); // can't work with relative values
        } else {
          startValue = _get(target, p);
        }
        startNum = parseFloat(startValue);
        relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
        relative && (endValue = endValue.substr(2));
        endNum = parseFloat(endValue);
        if (p in _propertyAliases) {
          if (p === "autoAlpha") {
            //special case where we control the visibility along with opacity. We still allow the opacity value to pass through and get tweened.
            if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
              //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
              startNum = 0;
            }
            inlineProps.push("visibility", 0, style.visibility);
            _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
          }
          if (p !== "scale" && p !== "transform") {
            p = _propertyAliases[p];
            ~p.indexOf(",") && (p = p.split(",")[0]);
          }
        }
        isTransformRelated = p in _transformProps; //--- TRANSFORM-RELATED ---

        if (isTransformRelated) {
          this.styles.save(p);
          if (!transformPropTween) {
            cache = target._gsap;
            cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform); // if, for example, gsap.set(... {transform:"translateX(50vw)"}), the _get() call doesn't parse the transform, thus cache.renderTransform won't be set yet so force the parsing of the transform here.

            smooth = vars.smoothOrigin !== false && cache.smooth;
            transformPropTween = this._pt = new _gsapCore.PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1); //the first time through, create the rendering PropTween so that it runs LAST (in the linked list, we keep adding to the beginning)

            transformPropTween.dep = 1; //flag it as dependent so that if things get killed/overwritten and this is the only PropTween left, we can safely kill the whole tween.
          }
          if (p === "scale") {
            this._pt = new _gsapCore.PropTween(this._pt, cache, "scaleY", cache.scaleY, (relative ? (0, _gsapCore._parseRelative)(cache.scaleY, relative + endNum) : endNum) - cache.scaleY || 0, _renderCSSProp);
            this._pt.u = 0;
            props.push("scaleY", p);
            p += "X";
          } else if (p === "transformOrigin") {
            inlineProps.push(_transformOriginProp, 0, style[_transformOriginProp]);
            endValue = _convertKeywordsToPercentages(endValue); //in case something like "left top" or "bottom right" is passed in. Convert to percentages.

            if (cache.svg) {
              _applySVGOrigin(target, endValue, 0, smooth, 0, this);
            } else {
              endUnit = parseFloat(endValue.split(" ")[2]) || 0; //handle the zOrigin separately!

              endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);
              _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
            }
            continue;
          } else if (p === "svgOrigin") {
            _applySVGOrigin(target, endValue, 1, smooth, 0, this);
            continue;
          } else if (p in _rotationalProperties) {
            _addRotationalPropTween(this, cache, p, startNum, relative ? (0, _gsapCore._parseRelative)(startNum, relative + endValue) : endValue);
            continue;
          } else if (p === "smoothOrigin") {
            _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);
            continue;
          } else if (p === "force3D") {
            cache[p] = endValue;
            continue;
          } else if (p === "transform") {
            _addRawTransformPTs(this, endValue, target);
            continue;
          }
        } else if (!(p in style)) {
          p = _checkPropPrefix(p) || p;
        }
        if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
          startUnit = (startValue + "").substr((startNum + "").length);
          endNum || (endNum = 0); // protect against NaN

          endUnit = (0, _gsapCore.getUnit)(endValue) || (p in _gsapCore._config.units ? _gsapCore._config.units[p] : startUnit);
          startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
          this._pt = new _gsapCore.PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, (relative ? (0, _gsapCore._parseRelative)(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
          this._pt.u = endUnit || 0;
          if (startUnit !== endUnit && endUnit !== "%") {
            //when the tween goes all the way back to the beginning, we need to revert it to the OLD/ORIGINAL value (with those units). We record that as a "b" (beginning) property and point to a render method that handles that. (performance optimization)
            this._pt.b = startValue;
            this._pt.r = _renderCSSPropWithBeginning;
          }
        } else if (!(p in style)) {
          if (p in target) {
            //maybe it's not a style - it could be a property added directly to an element in which case we'll try to animate that.
            this.add(target, p, startValue || target[p], relative ? relative + endValue : endValue, index, targets);
          } else if (p !== "parseTransform") {
            (0, _gsapCore._missingPlugin)(p, endValue);
            continue;
          }
        } else {
          _tweenComplexCSSString.call(this, target, p, startValue, relative ? relative + endValue : endValue);
        }
        isTransformRelated || (p in style ? inlineProps.push(p, 0, style[p]) : inlineProps.push(p, 1, startValue || target[p]));
        props.push(p);
      }
    }
    hasPriority && (0, _gsapCore._sortPropTweensByPriority)(this);
  },
  render: function render(ratio, data) {
    if (data.tween._time || !_reverting()) {
      var pt = data._pt;
      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
    } else {
      data.styles.revert();
    }
  },
  get: _get,
  aliases: _propertyAliases,
  getSetter: function getSetter(target, property, plugin) {
    //returns a setter function that accepts target, property, value and applies it accordingly. Remember, properties like "x" aren't as simple as target.style.property = value because they've got to be applied to a proxy object and then merged into a transform string in a renderer.
    var p = _propertyAliases[property];
    p && p.indexOf(",") < 0 && (property = p);
    return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !(0, _gsapCore._isUndefined)(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : (0, _gsapCore._getSetter)(target, property);
  },
  core: {
    _removeProperty: _removeProperty,
    _getMatrix: _getMatrix
  }
};
_gsapCore.gsap.utils.checkPrefix = _checkPropPrefix;
_gsapCore.gsap.core.getStyleSaver = _getStyleSaver;
(function (positionAndScale, rotation, others, aliases) {
  var all = (0, _gsapCore._forEachName)(positionAndScale + "," + rotation + "," + others, function (name) {
    _transformProps[name] = 1;
  });
  (0, _gsapCore._forEachName)(rotation, function (name) {
    _gsapCore._config.units[name] = "deg";
    _rotationalProperties[name] = 1;
  });
  _propertyAliases[all[13]] = positionAndScale + "," + rotation;
  (0, _gsapCore._forEachName)(aliases, function (name) {
    var split = name.split(":");
    _propertyAliases[split[1]] = all[split[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
(0, _gsapCore._forEachName)("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (name) {
  _gsapCore._config.units[name] = "px";
});
_gsapCore.gsap.registerPlugin(CSSPlugin);
},{"./gsap-core.js":"../node_modules/gsap/gsap-core.js"}],"../node_modules/gsap/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Back", {
  enumerable: true,
  get: function () {
    return _gsapCore.Back;
  }
});
Object.defineProperty(exports, "Bounce", {
  enumerable: true,
  get: function () {
    return _gsapCore.Bounce;
  }
});
Object.defineProperty(exports, "CSSPlugin", {
  enumerable: true,
  get: function () {
    return _CSSPlugin.CSSPlugin;
  }
});
Object.defineProperty(exports, "Circ", {
  enumerable: true,
  get: function () {
    return _gsapCore.Circ;
  }
});
Object.defineProperty(exports, "Cubic", {
  enumerable: true,
  get: function () {
    return _gsapCore.Cubic;
  }
});
Object.defineProperty(exports, "Elastic", {
  enumerable: true,
  get: function () {
    return _gsapCore.Elastic;
  }
});
Object.defineProperty(exports, "Expo", {
  enumerable: true,
  get: function () {
    return _gsapCore.Expo;
  }
});
Object.defineProperty(exports, "Linear", {
  enumerable: true,
  get: function () {
    return _gsapCore.Linear;
  }
});
Object.defineProperty(exports, "Power0", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power0;
  }
});
Object.defineProperty(exports, "Power1", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power1;
  }
});
Object.defineProperty(exports, "Power2", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power2;
  }
});
Object.defineProperty(exports, "Power3", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power3;
  }
});
Object.defineProperty(exports, "Power4", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power4;
  }
});
Object.defineProperty(exports, "Quad", {
  enumerable: true,
  get: function () {
    return _gsapCore.Quad;
  }
});
Object.defineProperty(exports, "Quart", {
  enumerable: true,
  get: function () {
    return _gsapCore.Quart;
  }
});
Object.defineProperty(exports, "Quint", {
  enumerable: true,
  get: function () {
    return _gsapCore.Quint;
  }
});
Object.defineProperty(exports, "Sine", {
  enumerable: true,
  get: function () {
    return _gsapCore.Sine;
  }
});
Object.defineProperty(exports, "SteppedEase", {
  enumerable: true,
  get: function () {
    return _gsapCore.SteppedEase;
  }
});
Object.defineProperty(exports, "Strong", {
  enumerable: true,
  get: function () {
    return _gsapCore.Strong;
  }
});
Object.defineProperty(exports, "TimelineLite", {
  enumerable: true,
  get: function () {
    return _gsapCore.TimelineLite;
  }
});
Object.defineProperty(exports, "TimelineMax", {
  enumerable: true,
  get: function () {
    return _gsapCore.TimelineMax;
  }
});
Object.defineProperty(exports, "TweenLite", {
  enumerable: true,
  get: function () {
    return _gsapCore.TweenLite;
  }
});
exports.gsap = exports.default = exports.TweenMax = void 0;
var _gsapCore = require("./gsap-core.js");
var _CSSPlugin = require("./CSSPlugin.js");
var gsapWithCSS = exports.default = exports.gsap = _gsapCore.gsap.registerPlugin(_CSSPlugin.CSSPlugin) || _gsapCore.gsap,
  // to protect from tree shaking
  TweenMaxWithCSS = exports.TweenMax = gsapWithCSS.core.Tween;
},{"./gsap-core.js":"../node_modules/gsap/gsap-core.js","./CSSPlugin.js":"../node_modules/gsap/CSSPlugin.js"}],"assets/js/components/hoverImg.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _gsap = require("gsap");
var helper = _interopRequireWildcard(require("../utils/helper"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var HoverImg = /*#__PURE__*/function () {
  function HoverImg(el) {
    _classCallCheck(this, HoverImg);
    this.DOM = {
      el: el
    };
    this.DOM.reveal = document.createElement('div');
    this.DOM.reveal.className = 'hover-reveal';
    this.DOM.reveal.innerHTML = "<div class=\"hover-reveal__inner\"><div class=\"hover-reveal__img\" style=\"background-image:url(".concat(this.DOM.el.dataset.img, ")\"></div></div>");
    this.DOM.el.appendChild(this.DOM.reveal);
    this.DOM.revealInner = this.DOM.reveal.querySelector('.hover-reveal__inner');
    this.DOM.revealInner.style.overflow = 'hidden';
    this.DOM.revealImg = this.DOM.revealInner.querySelector('.hover-reveal__img');
    this.initEvents();
  }
  _createClass(HoverImg, [{
    key: "initEvents",
    value: function initEvents() {
      var _this = this;
      this.positionElement = function (ev) {
        var mousePos = helper.getMousePos(ev);
        var docScrolls = {
          left: document.body.scrollLeft + document.documentElement.scrollLeft,
          top: document.body.scrollTop + document.documentElement.scrollTop
        };
        var spacing = 0;
        var clientRect = _this.DOM.revealImg.getBoundingClientRect();
        _this.DOM.reveal.style.top = "".concat(mousePos.y + spacing - docScrolls.top - clientRect.height * .5, "px");
        _this.DOM.reveal.style.left = "".concat(mousePos.x + spacing - docScrolls.left - clientRect.width * .5, "px");
      };
      this.mouseenterFn = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(ev) {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _this.positionElement(ev);
                _context.next = 3;
                return new Promise(function (resolve) {
                  return requestAnimationFrame(resolve);
                });
              case 3:
                _this.showImage();
              case 4:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }();
      this.mousemoveFn = function (ev) {
        return requestAnimationFrame(function () {
          _this.positionElement(ev);
        });
      };
      this.mouseleaveFn = function () {
        _this.hideImage();
      };
      this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
      this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
      this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
    }
  }, {
    key: "showImage",
    value: function showImage() {
      var _this2 = this;
      _gsap.gsap.killTweensOf([this.DOM.revealInner, this.DOM.revealImg]);
      this.tl = _gsap.gsap.timeline({
        onStart: function onStart() {
          _this2.DOM.reveal.style.opacity = 1;
          _gsap.gsap.set(_this2.DOM.el, {
            zIndex: 1000
          });
        }
      }).add('begin').to(this.DOM.revealInner, {
        duration: 0.2,
        ease: 'sine.out',
        startAt: {
          x: '-100%'
        },
        x: '0%'
      }, 'begin').to(this.DOM.revealImg, {
        duration: 0.2,
        ease: 'sine.out',
        startAt: {
          x: '100%'
        },
        x: '0%'
      }, 'begin');
    }
  }, {
    key: "hideImage",
    value: function hideImage() {
      var _this3 = this;
      _gsap.gsap.killTweensOf([this.DOM.revealInner, this.DOM.revealImg]);
      this.tl = _gsap.gsap.timeline({
        onStart: function onStart() {
          _gsap.gsap.set(_this3.DOM.el, {
            zIndex: 999
          });
        },
        onComplete: function onComplete() {
          _gsap.gsap.set(_this3.DOM.el, {
            zIndex: ''
          });
          _gsap.gsap.set(_this3.DOM.reveal, {
            opacity: 0
          });
        }
      }).add('begin').to(this.DOM.revealInner, {
        duration: 0.2,
        ease: 'sine.out',
        x: '100%'
      }, 'begin').to(this.DOM.revealImg, {
        duration: 0.2,
        ease: 'sine.out',
        x: '-100%'
      }, 'begin');
    }
  }]);
  return HoverImg;
}();
var _default = exports.default = HoverImg;
},{"gsap":"../node_modules/gsap/index.js","../utils/helper":"assets/js/utils/helper.js"}],"assets/js/components/modalVideo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var VideoModal = /*#__PURE__*/function () {
  function VideoModal() {
    _classCallCheck(this, VideoModal);
    this.element = {
      modal: '.custom-modal',
      closeBtn: '.custom-modal .close-button-holder',
      iframe: '.custom-modal iframe'
    };
    this.cls = {
      open: 'open'
    };
    this.hide = this.hide.bind(this);
    this.template = "\n            <div class=\"custom-modal video\">\n                <div class=\"modal-content\">\n\n                    <div class=\"close-button-holder\"> \n                        <a href=\"javascript:void(0);\" class=\"close before after\">\n                            <span class=\"ghost\"></span>\n                        </a> \n                    </div>\n\n                    <iframe\n                        id=\"videoFrame\"\n                        width=\"560\"\n                        height=\"315\"\n                        src=\"{{src}}\"\n                        frameborder=\"0\"\n                        allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\"\n                        allowfullscreen>\n                    </iframe>\n                </div>\n            </div>\n        ";
  }
  _createClass(VideoModal, [{
    key: "getTemplate",
    value: function getTemplate(o) {
      return this.template.replace(/{{src}}/g, o.src || '');
    }
  }, {
    key: "addEvent",
    value: function addEvent() {
      document.querySelector(this.element.closeBtn).addEventListener('click', this.hide);
    }
  }, {
    key: "show",
    value: function () {
      var _show = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(o) {
        var _this = this;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              document.body.insertAdjacentHTML('beforeend', this.getTemplate({
                src: o.src || ''
              }));
              _context.next = 3;
              return new Promise(function (resolve) {
                return requestAnimationFrame(resolve);
              });
            case 3:
              setTimeout(function () {
                document.querySelector(_this.element.modal).classList.add(_this.cls.open);
              }, 222);
              this.addEvent();
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function show(_x) {
        return _show.apply(this, arguments);
      }
      return show;
    }()
  }, {
    key: "hide",
    value: function hide() {
      document.querySelector(this.element.iframe).removeAttribute('src');
      document.querySelector(this.element.modal).parentNode.removeChild(document.querySelector(this.element.modal));
    }
  }]);
  return VideoModal;
}();
var _default = exports.default = VideoModal;
},{}],"assets/js/components/wordAnimator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var WordAnimate = /*#__PURE__*/function () {
  function WordAnimate(elements) {
    var _this = this;
    _classCallCheck(this, WordAnimate);
    this.words = elements;
    this.wordArray = [];
    this.currentWord = 0;
    this.init();
    //this.changeWord();
    window.wordAnimation = setInterval(function () {
      return _this.changeWord();
    }, 4000);
  }
  _createClass(WordAnimate, [{
    key: "init",
    value: function init() {
      var _this2 = this;
      this.words[this.currentWord].style.opacity = 1;
      this.words.forEach(function (word) {
        return _this2.splitLetters(word);
      });
    }
  }, {
    key: "changeWord",
    value: function changeWord() {
      var _this3 = this;
      console.log('fdfdfdfdfd');
      var cw = this.wordArray[this.currentWord];
      var nw = this.currentWord === this.words.length - 1 ? this.wordArray[0] : this.wordArray[this.currentWord + 1];
      cw.forEach(function (letter, i) {
        return _this3.animateLetterOut(cw, i);
      });
      nw.forEach(function (letter, i) {
        nw[i].className = 'letter behind';
        nw[0].parentElement.style.opacity = 1;
        _this3.animateLetterIn(nw, i);
      });
      this.currentWord = this.currentWord === this.wordArray.length - 1 ? 0 : this.currentWord + 1;
    }
  }, {
    key: "animateLetterOut",
    value: function animateLetterOut(wordArray, i) {
      setTimeout(function () {
        wordArray[i].className = 'letter out';
      }, i * 80);
    }
  }, {
    key: "animateLetterIn",
    value: function animateLetterIn(wordArray, i) {
      setTimeout(function () {
        wordArray[i].className = 'letter in';
      }, 340 + i * 80);
    }
  }, {
    key: "splitLetters",
    value: function splitLetters(word) {
      var content = word.innerHTML;
      word.innerHTML = '';
      var letters = [];
      for (var i = 0; i < content.length; i++) {
        var letter = document.createElement('span');
        letter.className = 'letter';
        if (content.charAt(i) === ' ') {
          letter.innerHTML = '&nbsp;'; // Boşluk karakteri ekliyoruz.
        } else {
          letter.textContent = content.charAt(i);
        }
        word.appendChild(letter);
        letters.push(letter);
      }
      this.wordArray.push(letters);
    }
  }]);
  return WordAnimate;
}();
var _default = exports.default = WordAnimate;
},{}],"assets/js/templates/content.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _gsap = require("gsap");
var helper = _interopRequireWildcard(require("../utils/helper"));
var _icons = _interopRequireDefault(require("../../icons.svg"));
var _enums = require("../enums");
var _hoverImg = _interopRequireDefault(require("../components/hoverImg"));
var _modalVideo = _interopRequireDefault(require("../components/modalVideo"));
var _wordAnimator = _interopRequireDefault(require("../components/wordAnimator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Content = /*#__PURE__*/function () {
  function Content() {
    _classCallCheck(this, Content);
    this.element = document.querySelector('.contents');
    this.docBody = document.body;
    this.cls = {
      backToHomeAnimate: 'back-to-home-animate'
    };
    this.videoModal = new _modalVideo.default();
  }
  _createClass(Content, [{
    key: "generateAwards",
    value: function generateAwards(_ref) {
      var awards = _ref.awards;
      return awards && awards.map(function (_ref2) {
        var ico = _ref2.ico,
          title = _ref2.title;
        return ico != '' ? "<svg class=\"icon ".concat(ico, "\">\n            <use xlink:href=\"").concat(_icons.default, "#").concat(ico, "\"></use>\n        </svg></a>") : title;
      }).join('');
    }
  }, {
    key: "endAnim",
    value: function endAnim() {
      var animated = Array.from(this.element.querySelectorAll('.animated'));
      if (animated.length > 0) {
        var tl = _gsap.gsap.timeline({
          defaults: {
            duration: 0.3,
            ease: 'power2.out'
          }
        });
        tl.to(animated, {
          opacity: 0,
          y: 20,
          rotateX: -90,
          transformOrigin: '50% 50% -50',
          stagger: 0.05,
          onComplete: function onComplete(index) {}
        });
      }
    }
  }, {
    key: "startAnim",
    value: function startAnim() {
      var _self = this;
      var animated = Array.from(this.element.querySelectorAll('.animated'));
      if (animated.length > 0) {
        var tl = _gsap.gsap.timeline({
          defaults: {
            duration: 0.3,
            ease: 'power2.out'
          }
        });
        tl.from(animated, {
          opacity: 0,
          y: 20,
          rotateX: -90,
          transformOrigin: '50% 50% -50',
          stagger: 0.05,
          onComplete: function onComplete(index) {
            if (!helper.hasClass({
              element: _self.docBody,
              value: _self.cls.backToHomeAnimate
            })) {
              animated.forEach(function (element) {
                return element.removeAttribute('style');
              });
            }
          }
        });
      }
    }
  }, {
    key: "initPlugins",
    value: function initPlugins() {
      var imgHover = this.element.querySelectorAll('[data-img]');
      imgHover.length > 0 && imgHover.forEach(function (element) {
        return new _hoverImg.default(element);
      });
      var words = this.element.querySelectorAll('.word');
      if (window.wordAnimation) {
        clearInterval(window.wordAnimation);
      }
      if (words.length > 0) {
        new _wordAnimator.default(words);
      }
    }
  }, {
    key: "generate",
    value: function () {
      var _generate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(content) {
        var _this = this;
        var type, data, list, title, htm;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              type = content.type, data = content.data;
              _context.t0 = type;
              _context.next = _context.t0 === _enums.CONTENT_TYPE.text ? 4 : _context.t0 === _enums.CONTENT_TYPE.list ? 6 : 12;
              break;
            case 4:
              this.element && (this.element.innerHTML = data);
              return _context.abrupt("break", 13);
            case 6:
              list = data.map(function (obj) {
                var isVideo = obj.video || false;
                return "\n                    <li ".concat(isVideo ? 'data-video' : '', " data-img=\"").concat(obj.media.join(), "\" class=\"animated\">\n                        <span class=\"name\">\n                            <a title=\"").concat(obj.name, "\" target=\"_blank\" href=\"").concat(obj.link, "\">\n                                <span title=\"").concat(obj.name, "\">").concat(obj.name, "</span>\n                            </a>\n                            <span class=\"awards d-flex\">").concat(_this.generateAwards(obj), "</span>\n                        </span>\n                        <span class=\"technologies\">").concat(obj.technologies.join(','), "</span>\n                        <span class=\"type\">").concat(obj.type, "</span>\n                        <span class=\"agency\">").concat(obj.agency, "</span>\n                    </li>");
              }).join('');
              title = "<li class=\"title animated\">\n                    <span class=\"name\">name</span>\n                    <span class=\"technologies\">technologies</span>\n                    <span class=\"type\">type</span>\n                    <span class=\"agency\">agency</span>\n                </li>";
              htm = "<ul class=\"list\">".concat(title).concat(list, "</ul>");
              this.element && (this.element.innerHTML = htm);
              this.addEvent();
              return _context.abrupt("break", 13);
            case 12:
              return _context.abrupt("break", 13);
            case 13:
              _context.next = 15;
              return new Promise(function (resolve) {
                return requestAnimationFrame(resolve);
              });
            case 15:
              this.startAnim();
              this.initPlugins();
            case 17:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function generate(_x) {
        return _generate.apply(this, arguments);
      }
      return generate;
    }()
  }, {
    key: "addEvent",
    value: function addEvent() {
      var _this2 = this;
      var videos = this.element.querySelectorAll('[data-video]');
      if (videos.length > 0) {
        videos.forEach(function (element) {
          element.addEventListener('click', function (evt) {
            var hrf = evt.currentTarget.querySelector('a').getAttribute('href') || '';
            if (hrf != '') _this2.videoModal.show({
              src: hrf
            });
          });
          element.querySelector('a').addEventListener('click', function (evt) {
            evt.preventDefault();
          });
        });
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.element && (this.element.innerHTML = '');
    }
  }]);
  return Content;
}();
var _default = exports.default = Content;
},{"gsap":"../node_modules/gsap/index.js","../utils/helper":"assets/js/utils/helper.js","../../icons.svg":"assets/icons.svg","../enums":"assets/js/enums/index.js","../components/hoverImg":"assets/js/components/hoverImg.js","../components/modalVideo":"assets/js/components/modalVideo.js","../components/wordAnimator":"assets/js/components/wordAnimator.js"}],"assets/js/templates/section.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _content = _interopRequireDefault(require("./content"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SvgGenerator = /*#__PURE__*/function () {
  function SvgGenerator(_ref) {
    var fill = _ref.fill,
      width = _ref.width,
      height = _ref.height,
      letters = _ref.letters;
    _classCallCheck(this, SvgGenerator);
    this.fill = fill;
    this.width = width;
    this.height = height;
    this.letters = letters;
  }
  _createClass(SvgGenerator, [{
    key: "generatePaths",
    value: function generatePaths() {
      var _this = this;
      return this.letters.map(function (letter) {
        return "<path fill=\"".concat(_this.fill, "\" data-letter=\"").concat(letter.key, "\" d=\"").concat(letter.path, "\" vector-effect=\"non-scaling-stroke\" />");
      }).join('');
    }
  }, {
    key: "generateSvgMarkup",
    value: function generateSvgMarkup() {
      var paths = this.generatePaths();
      return "<svg class=\"letters\" width=\"".concat(this.width, "\" height=\"").concat(this.height, "\" viewBox=\"0 0 ").concat(this.width, " ").concat(this.height, "\" xmlns=\"http://www.w3.org/2000/svg\"><g stroke-linecap=\"round\" fill-rule=\"evenodd\" font-size=\"9pt\">").concat(paths, "</g></svg>");
    }
  }]);
  return SvgGenerator;
}();
var Section = /*#__PURE__*/function () {
  function Section(options) {
    _classCallCheck(this, Section);
    this.options = options;
  }
  _createClass(Section, [{
    key: "generate",
    value: function generate() {
      var _this$options, _this$options2;
      var svgGenerator = ((_this$options = this.options) === null || _this$options === void 0 ? void 0 : _this$options.svg) && new SvgGenerator(this.options.svg);
      var svgMarkup = ((_this$options2 = this.options) === null || _this$options2 === void 0 ? void 0 : _this$options2.svg) && svgGenerator.generateSvgMarkup();
      return "<section rel=\"".concat(this.options.key, "\"><i></i>").concat(svgMarkup, "</section>");
    }
  }]);
  return Section;
}();
var _default = exports.default = Section;
},{"./content":"assets/js/templates/content.js"}],"assets/js/templates/button.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Button = /*#__PURE__*/function () {
  function Button(options) {
    _classCallCheck(this, Button);
    this.options = options;
  }
  _createClass(Button, [{
    key: "generate",
    value: function generate() {
      var _this$options = this.options,
        key = _this$options.key,
        button = _this$options.button;
      return "<button rel=\"".concat(key, "\"><i></i><span>").concat(button.title, "</span></button>");
    }
  }]);
  return Button;
}();
var _default = exports.default = Button;
},{}],"assets/js/templates/navigation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Navigation = /*#__PURE__*/function () {
  function Navigation(options) {
    _classCallCheck(this, Navigation);
    this.options = options;
  }
  _createClass(Navigation, [{
    key: "generate",
    value: function generate() {
      var _this$options = this.options,
        key = _this$options.key,
        button = _this$options.button;
      return "<a href=\"javascript:void(0);\" rel=\"".concat(key, "\"><i></i><span>").concat(button.title, "</span></a>");
    }
  }]);
  return Navigation;
}();
var _default = exports.default = Navigation;
},{}],"assets/js/templates/logo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Logo = /*#__PURE__*/function () {
  function Logo(_ref) {
    var cls = _ref.cls;
    _classCallCheck(this, Logo);
    this.cls = cls;
  }
  _createClass(Logo, [{
    key: "generate",
    value: function generate() {
      return "<div class=\"logo-wrapper ".concat(this.cls, "\"><svg class=\"logo\" id=\"OBJECTS\" xmlns=\"http://www.w3.org/2000/svg\" width=\"422.9\" height=\"186.7\" viewBox=\"0 0 422.9 186.7\"><defs><style>.cls-1{fill:#fff;}</style></defs><path class=\"cls-1\" d=\"M181.3,51.4a3,3,0,0,0-.6-2,4.5,4.5,0,0,0-1.7-1.3,12.3,12.3,0,0,0-2.3-.8l-2.8-.6-3.6-1a9.6,9.6,0,0,1-3-1.6,6.4,6.4,0,0,1-2.1-2.5,8,8,0,0,1-.8-3.9,10,10,0,0,1,.9-4.5,8.7,8.7,0,0,1,2.4-3.2,11.8,11.8,0,0,1,3.7-1.9,16.8,16.8,0,0,1,4.7-.6,30.5,30.5,0,0,1,5.2.5,27.7,27.7,0,0,1,4.5,1.3v5.1A32.1,32.1,0,0,0,181,33a23.7,23.7,0,0,0-4.4-.5,7.8,7.8,0,0,0-4.5,1.1,3.5,3.5,0,0,0-1.6,3.2,3.3,3.3,0,0,0,.5,2.1,3.5,3.5,0,0,0,1.4,1.3,10.2,10.2,0,0,0,2.1.9l2.5.5,3.9,1.1a9.7,9.7,0,0,1,3.4,1.6,6.5,6.5,0,0,1,2.3,2.6,8.7,8.7,0,0,1,.9,4.2,10.8,10.8,0,0,1-1,4.6,9.5,9.5,0,0,1-2.8,3.2,13,13,0,0,1-4.3,1.8,24.7,24.7,0,0,1-5.7.7,23.1,23.1,0,0,1-5.2-.6,15.5,15.5,0,0,1-4.3-1.4V54.3a23.2,23.2,0,0,0,4.7,1.5,25.2,25.2,0,0,0,4.8.5l2.8-.2a8.5,8.5,0,0,0,2.4-.8,6.5,6.5,0,0,0,1.8-1.5A4.8,4.8,0,0,0,181.3,51.4Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M200.1,55.7h16v5h-22V28.1h21.1v5H200.1v8.4h13v5h-13Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M239.5,43.3c2.3,3.3,4.2,6.3,5.7,8.9h.1q-.3-6.5-.3-9.3V28.1h6V60.7h-6.3l-10.6-15c-1.9-2.6-3.8-5.6-5.8-9h-.2q.3,6,.3,9.3V60.7h-5.9V28.1h6.2Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M258.8,60.7V28.1h6V60.7Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M302.9,44.4a21.7,21.7,0,0,1-1,6.9,16.5,16.5,0,0,1-3.1,5.3,14.6,14.6,0,0,1-5,3.5,18.3,18.3,0,0,1-6.8,1.3,17.8,17.8,0,0,1-6.7-1.3,12.9,12.9,0,0,1-5-3.5,14.8,14.8,0,0,1-3.1-5.3,21.7,21.7,0,0,1-1.1-6.9,21.1,21.1,0,0,1,1.1-6.8,14.4,14.4,0,0,1,3.1-5.4,14.1,14.1,0,0,1,5-3.5,17.8,17.8,0,0,1,6.7-1.2,18.3,18.3,0,0,1,6.8,1.2,16.1,16.1,0,0,1,5,3.5,15.9,15.9,0,0,1,3.1,5.4A21.1,21.1,0,0,1,302.9,44.4Zm-6.1,0a16.2,16.2,0,0,0-.8-5.2,10.1,10.1,0,0,0-2-3.7,8.4,8.4,0,0,0-3.1-2.2,9.9,9.9,0,0,0-7.8,0,8.4,8.4,0,0,0-3.1,2.2,11.8,11.8,0,0,0-2,3.7,16.4,16.4,0,0,0-.7,5.2,16.4,16.4,0,0,0,.7,5.2,10.8,10.8,0,0,0,2,3.7,8.7,8.7,0,0,0,3.1,2.3,11.2,11.2,0,0,0,7.8,0,8.7,8.7,0,0,0,3.1-2.3,9.3,9.3,0,0,0,2-3.7A16.2,16.2,0,0,0,296.8,44.4Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M333.4,37.9a8.8,8.8,0,0,1-1.9,5.8,10.5,10.5,0,0,1-5.8,3.5h0l9.7,13.4h-7.2l-8.9-12.6h-4.1V60.7h-5.9V28.1h9.9a33.3,33.3,0,0,1,4.6.3,24.5,24.5,0,0,1,3.6.8,10.2,10.2,0,0,1,4.5,3.3A9.1,9.1,0,0,1,333.4,37.9Zm-15.2,5.2,3.5-.2,2.4-.5a5,5,0,0,0,2.5-1.9,6,6,0,0,0,.7-2.7,4.1,4.1,0,0,0-.6-2.3,3.6,3.6,0,0,0-1.8-1.6,6.4,6.4,0,0,0-2.2-.6l-3.2-.2h-4.3v10Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M172.1,77.1H176v25.1a9.1,9.1,0,0,1-.6,3.5,6.9,6.9,0,0,1-1.7,2.6,8.9,8.9,0,0,1-2.7,1.5,13.6,13.6,0,0,1-3.6.5,10.9,10.9,0,0,1-2.8-.3,5.6,5.6,0,0,1-1.8-.5V106l2,.6,2.3.2a6.4,6.4,0,0,0,2-.3,3.5,3.5,0,0,0,1.6-.8,3.7,3.7,0,0,0,1-1.6,7.5,7.5,0,0,0,.4-2.4Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M180.9,109.7l13.3-32.6h3.5l13.2,32.6h-4.3l-3.9-9.8H189.1l-3.9,9.8Zm15-27.6c-1.5,4.1-2.8,7.8-4.2,11.1l-1.2,3.1h10.8l-1.2-3.1c-1.4-3.4-2.7-7.1-4.1-11.1Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M224.3,104.6c1.1-3.5,2.4-7.1,3.8-10.8l6.2-16.7h4l-12.4,32.6h-3.4L210.1,77.1h4l6.2,16.7q2.1,5.5,3.9,10.8Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M237.6,109.7l13.3-32.6h3.4l13.3,32.6h-4.3l-3.9-9.8H245.8l-3.9,9.8Zm15-27.6q-2.2,6.2-4.2,11.1l-1.2,3.1H258l-1.2-3.1c-1.4-3.4-2.7-7.1-4.1-11.1Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M275.8,85.7a4.5,4.5,0,0,0,.6,2.4,4.6,4.6,0,0,0,1.6,1.5,7.4,7.4,0,0,0,2.2,1l2.8.8,3.7,1a16.6,16.6,0,0,1,3.3,1.5,7.6,7.6,0,0,1,3.2,6.7,8.9,8.9,0,0,1-1,4.4,8.3,8.3,0,0,1-2.6,3,10.8,10.8,0,0,1-4.1,1.7,19.6,19.6,0,0,1-5,.6,11.4,11.4,0,0,1-2.6-.2l-2.6-.4-2.2-.6a5.2,5.2,0,0,1-1.5-.7v-3.6l2,.8a15.5,15.5,0,0,0,2.3.6l2.3.4,2.3.2a16.6,16.6,0,0,0,3.2-.3,6.6,6.6,0,0,0,2.7-1,5.8,5.8,0,0,0,1.9-1.9,6.2,6.2,0,0,0,.7-2.9,4.3,4.3,0,0,0-.6-2.4,4.9,4.9,0,0,0-1.6-1.6,9.4,9.4,0,0,0-2.3-1l-2.8-.8L278,94a10.7,10.7,0,0,1-3.2-1.6,6.9,6.9,0,0,1-2.3-2.5,7.5,7.5,0,0,1-.9-3.9,9.4,9.4,0,0,1,.9-4.3,8.1,8.1,0,0,1,2.5-3,12,12,0,0,1,3.6-1.7,14.5,14.5,0,0,1,4.3-.5,23.5,23.5,0,0,1,9,1.8v3.6l-4.2-1.4a22.4,22.4,0,0,0-4.6-.5,10,10,0,0,0-3.2.4,6.2,6.2,0,0,0-2.3,1.1,4.9,4.9,0,0,0-1.4,1.8A9.3,9.3,0,0,0,275.8,85.7Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M316,80a14.6,14.6,0,0,0-5.2.9,11.6,11.6,0,0,0-4.1,2.5,12.8,12.8,0,0,0-2.8,4.3,17.8,17.8,0,0,0-1,5.9,15.2,15.2,0,0,0,1,5.9,11.5,11.5,0,0,0,2.6,4.1,11,11,0,0,0,4.2,2.4,18,18,0,0,0,5.4.8h1.7l1.9-.3,1.8-.3,1.6-.5v3.5a15.3,15.3,0,0,1-3.4.9,25.6,25.6,0,0,1-3.9.3,22.7,22.7,0,0,1-7.2-1.1,14.9,14.9,0,0,1-5.3-3.3,13.1,13.1,0,0,1-3.2-5.2,18.5,18.5,0,0,1-1.1-6.9,22.3,22.3,0,0,1,1.1-7,15.4,15.4,0,0,1,8.7-9.1,19,19,0,0,1,7-1.2h2l1.9.3,1.7.4,1.3.4v3.5l-3.2-.8A20.7,20.7,0,0,0,316,80Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M333.6,96.2v13.5h-4V77.1h12.1l2.8.5a9.9,9.9,0,0,1,5.2,3.2,8.6,8.6,0,0,1,1.8,5.6,9.9,9.9,0,0,1-.6,3.5,12.7,12.7,0,0,1-1.8,2.7,9.2,9.2,0,0,1-2.8,1.9,12,12,0,0,1-3.5,1h0l9.6,14h-3.9L338.4,96.2Zm0-15.6v12h7.1L343,92a6.5,6.5,0,0,0,3.2-2,5.7,5.7,0,0,0,1.1-3.6,5.3,5.3,0,0,0-1.1-3.4,4.8,4.8,0,0,0-2.9-1.8l-2.1-.4-3.1-.2Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M359.2,109.7V77.1h4v32.6Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M375.4,109.7h-3.9V77.1h9a21.2,21.2,0,0,1,3.7.2,15,15,0,0,1,3.2.8,8.1,8.1,0,0,1,5.9,8.2,10.2,10.2,0,0,1-.9,4.4,8.8,8.8,0,0,1-2.9,3.2,14.8,14.8,0,0,1-4.6,1.9,28,28,0,0,1-6.1.6h-3.4Zm0-17.1,1.7.2h1.7a22.1,22.1,0,0,0,4.8-.4,8.6,8.6,0,0,0,3.2-1.3,4.9,4.9,0,0,0,1.8-2,6.1,6.1,0,0,0,.6-2.8,5.2,5.2,0,0,0-1-3.1,5.1,5.1,0,0,0-2.6-1.8,8.4,8.4,0,0,0-2.4-.6l-3.1-.2h-4.7Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M411.7,109.7h-4V80.6H396.8V77.1h25.8v3.5H411.7Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M191.9,142.2a19,19,0,0,1-.7,5.4,13.2,13.2,0,0,1-2.1,4.5,13.4,13.4,0,0,1-3.6,3.5,17,17,0,0,1-4.9,2.2l-3.6.7-4.1.2h-7.4V126H173l4.1.2a18.2,18.2,0,0,1,3.5.6,17.7,17.7,0,0,1,5,2.3,16.7,16.7,0,0,1,3.6,3.4,16.3,16.3,0,0,1,2.1,4.4A22,22,0,0,1,191.9,142.2Zm-3.9,0a12.7,12.7,0,0,0-2.1-7.6,11.1,11.1,0,0,0-5.9-4.2,15.9,15.9,0,0,0-3.4-.6l-4.1-.2h-3v25.5h3l4.1-.2a15.9,15.9,0,0,0,3.4-.6,11.3,11.3,0,0,0,5.9-4.3A13.3,13.3,0,0,0,188,142.2Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M203,155.1h16.7v3.6H199V126h19.8v3.6H203v10.5h14.1v3.6H203Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M237.6,153.6c1.1-3.6,2.4-7.2,3.8-10.8l6.2-16.8h4l-12.4,32.7h-3.4L223.4,126h4l6.2,16.8q2.1,5.4,3.9,10.8Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M260.9,155.1h16.7v3.6H256.9V126h19.8v3.6H260.9v10.5h14v3.6h-14Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M288.4,126v29.1h15.9v3.6H284.4V126Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M337.6,142.4a21.5,21.5,0,0,1-1,6.8,16.5,16.5,0,0,1-3.1,5.3,13,13,0,0,1-4.8,3.5,15.2,15.2,0,0,1-6.2,1.3,16.2,16.2,0,0,1-6.4-1.3,13,13,0,0,1-4.8-3.5,16.2,16.2,0,0,1-3-5.3,21.9,21.9,0,0,1,0-13.7,15.5,15.5,0,0,1,3.1-5.3,13,13,0,0,1,4.8-3.5,13.8,13.8,0,0,1,6.2-1.3,14.7,14.7,0,0,1,6.4,1.3,13,13,0,0,1,4.8,3.5,15.3,15.3,0,0,1,3,5.3A21.7,21.7,0,0,1,337.6,142.4Zm-3.9,0a16.8,16.8,0,0,0-.9-5.8,10.8,10.8,0,0,0-2.4-4.2,9.7,9.7,0,0,0-3.5-2.6,11.3,11.3,0,0,0-4.5-.9,11.2,11.2,0,0,0-4.4.9,10,10,0,0,0-3.6,2.6,10.6,10.6,0,0,0-2.3,4.2,16.8,16.8,0,0,0-.9,5.8,17.2,17.2,0,0,0,.9,5.8,12.7,12.7,0,0,0,2.4,4.1,9.7,9.7,0,0,0,3.5,2.6,13.3,13.3,0,0,0,4.5.8,12.7,12.7,0,0,0,4.4-.8,9.7,9.7,0,0,0,3.5-2.6,11.1,11.1,0,0,0,2.4-4.1A17.2,17.2,0,0,0,333.7,142.4Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M348.9,158.7H345V126h9a21.3,21.3,0,0,1,3.7.3,15,15,0,0,1,3.2.7,9.2,9.2,0,0,1,4.4,3.2,8.3,8.3,0,0,1,1.5,5.1,9.2,9.2,0,0,1-1,4.4,8.3,8.3,0,0,1-2.8,3.1,12.7,12.7,0,0,1-4.6,1.9,22.7,22.7,0,0,1-6.1.7l-3.4-.2Zm0-17.1,1.7.2h1.7a23.3,23.3,0,0,0,4.8-.4,11.9,11.9,0,0,0,3.2-1.3,5.3,5.3,0,0,0,2.3-4.8,5,5,0,0,0-.9-3.1,5.7,5.7,0,0,0-2.6-1.9l-2.4-.5-3.2-.2h-4.6Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M377.4,155.1h16.8v3.6H373.4V126h19.9v3.6H377.4v10.5h14.1v3.6H377.4Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M405,145.1v13.6h-4V126h8.4l3.7.2a10.8,10.8,0,0,1,2.7.5,9.4,9.4,0,0,1,5.2,3.1,8.7,8.7,0,0,1,1.8,5.6,9.5,9.5,0,0,1-.6,3.5,7.5,7.5,0,0,1-1.8,2.8,10.6,10.6,0,0,1-2.7,1.8,13.7,13.7,0,0,1-3.6,1.1h0l9.7,14h-4l-10-13.6Zm0-15.5v12h3.9l3.1-.2a7.9,7.9,0,0,0,2.3-.4,6.1,6.1,0,0,0,3.2-2,5.6,5.6,0,0,0,1.1-3.7,4.8,4.8,0,0,0-1-3.3,5.9,5.9,0,0,0-2.9-1.9l-2.1-.4H405Z\" transform=\"translate(-0.9 -0.6)\"/><path class=\"cls-1\" d=\"M131.6,17.5c0-2.1.5-4.2-.1-6.4-1.6-6.4-5.9-9.9-13-10H87.6C83.5.9,79.4.6,75.3.6A47.6,47.6,0,0,0,43.5,12,46,46,0,0,0,27.3,41.6,45.6,45.6,0,0,0,36.7,77c4,5.2,8.8,10,19.4,15.1-5.2.4-9.9.1-14.6.8a47.3,47.3,0,0,0-1.4,93.5,70.6,70.6,0,0,0,13.8.9c12.2,0,24.5-.2,36.7-.5,10-.2,20-.5,30.1-.4,6,0,11.1-5.6,11.1-12q-.2-45-.1-89.8C131.6,62.2,131.7,39.9,131.6,17.5ZM83.5,71.1a24.4,24.4,0,1,1,24.4-24.4A24.3,24.3,0,0,1,83.5,71.1Z\" transform=\"translate(-0.9 -0.6)\"/></svg></div>");
    }
  }]);
  return Logo;
}();
var _default = exports.default = Logo;
},{}],"assets/js/templates/template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _section = _interopRequireDefault(require("./section"));
var _button = _interopRequireDefault(require("./button"));
var _navigation = _interopRequireDefault(require("./navigation"));
var _logo = _interopRequireDefault(require("./logo"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var TemplateManagement = /*#__PURE__*/function () {
  function TemplateManagement(_ref) {
    var ID = _ref.ID,
      options = _ref.options;
    _classCallCheck(this, TemplateManagement);
    this.ID = ID;
    this.options = options;
  }
  _createClass(TemplateManagement, [{
    key: "init",
    value: function init() {
      var sections = this.options.map(function (obj) {
        return new _section.default(obj).generate();
      });
      var buttons = this.options.map(function (obj) {
        return obj.button && new _button.default(obj).generate();
      });
      var navigation = this.options.map(function (obj) {
        return obj.button && "<li>".concat(new _navigation.default(obj).generate(), "</li>");
      });
      var logoCenter = new _logo.default({
        cls: 'center'
      }).generate();
      var logoTop = new _logo.default({
        cls: 'top'
      }).generate();
      this.ID.innerHTML = "".concat(sections.join('')).concat(buttons.join('')).concat(logoTop, "<ul class=\"navigation\">").concat(navigation.join(''), "</ul>").concat(logoCenter, "<span class=\"intro\"></span><div class=\"contents\"></div><canvas class=\"stage\"></canvas><div class=\"myname\">Burak Karakaya</div>");
    }
  }]);
  return TemplateManagement;
}();
var _default = exports.default = TemplateManagement;
},{"./section":"assets/js/templates/section.js","./button":"assets/js/templates/button.js","./navigation":"assets/js/templates/navigation.js","./logo":"assets/js/templates/logo.js"}],"assets/js/components/colorSchemes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ColorSchemes = /*#__PURE__*/function () {
  function ColorSchemes(options) {
    _classCallCheck(this, ColorSchemes);
    this.options = options;
  }
  _createClass(ColorSchemes, [{
    key: "setColorRule",
    value: function setColorRule(color) {
      document.styleSheets[0].addRule(':root', "".concat(color));
    }
  }, {
    key: "init",
    value: function init() {
      var currentColorPalette = this.options[Math.floor((this.options.length - 1) * Math.random())];
      this.setColorRule("--project-color: ".concat(currentColorPalette[0]));
      this.setColorRule("--skills-color: ".concat(currentColorPalette[1]));
      this.setColorRule("--awards-color: ".concat(currentColorPalette[2]));
      this.setColorRule("--contact-color: ".concat(currentColorPalette[3]));
    }
  }]);
  return ColorSchemes;
}();
var _default = exports.default = ColorSchemes;
},{}],"assets/js/components/stage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var helper = _interopRequireWildcard(require("../utils/helper"));
var _enums = require("../enums");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Stage = /*#__PURE__*/function () {
  function Stage(options, originalSize, svgFileSrc, callback) {
    _classCallCheck(this, Stage);
    this.options = options;
    this.lettersOrginalSize = originalSize;
    this.svgFileSrc = svgFileSrc;

    //
    this.engine = null;
    this.world = null;
    this.render = null;
    this.mouseConstraint = null;
    this.content = null;

    //
    this.letterIsSleeping = true;
    this.letters = [];
    this.walls = {
      left: null,
      top: null,
      bottom: null,
      right: null
    };

    //
    this.el = {
      canvas: '.stage',
      title: '.is-active svg.letters',
      path: 'path',
      content: '.sidebar'
    };
    this.cls = {
      ready: 'ready'
    };

    // DOM Elements
    this.canvas = document.querySelector(this.el.canvas);
    this.title = document.querySelector(this.el.title);
    this.paths = this.title.querySelectorAll(this.el.path);

    // Set Stage
    this.setScene();
    this.addEvents();
    this.setMouse();
    this.addWalls();

    // callback
    this.callback = callback;
  }
  _createClass(Stage, [{
    key: "updateProp",
    value: function updateProp(options, originalSize, svgFileSrc) {
      this.options = options;
      this.lettersOrginalSize = originalSize;
      this.svgFileSrc = svgFileSrc;
      this.canvas = document.querySelector(this.el.canvas);
      this.title = document.querySelector(this.el.title);
      this.paths = this.title.querySelectorAll(this.el.path);
    }
  }, {
    key: "init",
    value: function init() {
      this.addLetters();
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(_ref) {
      var type = _ref.type;
      if (typeof this.callback !== 'undefined') {
        this.callback({
          type: type
        });
      }
    }

    // Set Scene
  }, {
    key: "setScene",
    value: function setScene() {
      this.engine = Matter.Engine.create({
        enableSleeping: true
      });
      this.world = this.engine.world;
      this.render = Matter.Render.create({
        element: document.body,
        engine: this.engine,
        canvas: this.canvas,
        options: {
          background: 'transparent',
          width: window.innerWidth,
          height: window.innerHeight,
          showAngleIndicator: false,
          showSleeping: false,
          wireframes: false
        }
      });
      Matter.Render.run(this.render);
      this.runner = Matter.Runner.create();
      Matter.Runner.run(this.runner, this.engine);
    }

    // Add Events
  }, {
    key: "addEvents",
    value: function addEvents() {
      var _this = this;
      var _self = this;
      Matter.Events.on(this.engine, 'afterUpdate', function (evt) {
        var _h = helper.elementHeight(_self.title);
        for (var i = _self.letters.length - 1; i >= 0; i--) {
          var letter = _self.letters[i];
          if (letter.position.y >= window.innerHeight + _h) {
            Matter.Composite.remove(_this.world, letter);
            _self.letters.splice(i, 1);
          }
        }
      });
    }

    // Set Mouse
  }, {
    key: "setMouse",
    value: function setMouse() {
      this.mouse = Matter.Mouse.create(this.render.canvas);
      this.mouseConstraint = Matter.MouseConstraint.create(this.engine, {
        mouse: this.mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      });
      Matter.Composite.add(this.world, this.mouseConstraint);
      this.render.mouse = this.mouse;
      this.mouseConstraint.collisionFilter.mask = 0x0004 | 0x0008;
    }

    // Walls
  }, {
    key: "getWallPos",
    value: function getWallPos(o) {
      o = o || {};
      var wt = window.innerWidth;
      var ht = window.innerHeight;
      var width = 10;
      var height = 10;
      var dir = o['direction'] || '';
      var pos = {};
      switch (dir) {
        case 'top':
          pos = {
            x: wt * .5,
            y: -ht,
            width: wt,
            height: height
          };
          break;
        case 'left':
          pos = {
            x: 0,
            y: ht * .5,
            width: width,
            height: ht
          };
          break;
        case 'right':
          pos = {
            x: wt,
            y: ht * .5,
            width: width,
            height: ht
          };
          break;
        case 'bottom':
          pos = {
            x: wt * .5,
            y: ht,
            width: wt,
            height: height
          };
          break;
        default:
          break;
      }
      return pos;
    }
  }, {
    key: "setWall",
    value: function setWall(_ref2) {
      var _ref2$dir = _ref2.dir,
        dir = _ref2$dir === void 0 ? '' : _ref2$dir,
        _ref2$isStatic = _ref2.isStatic,
        isStatic = _ref2$isStatic === void 0 ? true : _ref2$isStatic;
      var pos = this.getWallPos({
        direction: dir
      });
      this.walls[dir] = Matter.Bodies.rectangle(pos.x, pos.y, pos.width, pos.height, {
        restitution: 1,
        isStatic: isStatic,
        collisionFilter: {
          category: 0x0002
        },
        render: {
          visible: false
        }
      });
      Matter.Composite.add(this.world, this.walls[dir]);
    }
  }, {
    key: "addWalls",
    value: function addWalls() {
      this.setWall({
        dir: 'top'
      });
      this.setWall({
        dir: 'left'
      });
      this.setWall({
        dir: 'right'
      });
      this.setWall({
        dir: 'bottom'
      });
    }
  }, {
    key: "updateWalls",
    value: function updateWalls() {
      var _this2 = this;
      Object.entries(this.walls).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          wall = _ref4[1];
        var pos = _this2.getWallPos({
          direction: key
        });
        Matter.Body.set(wall, 'width', pos.width);
        Matter.Body.set(wall, 'height', pos.height);
        Matter.Body.setPosition(wall, {
          x: pos.x,
          y: pos.y
        });
      });
    }

    // Letters
  }, {
    key: "addLetters",
    value: function addLetters() {
      for (var i = 0; i < this.paths.length; ++i) {
        var path = this.paths[i];
        var letter = path.dataset.letter;
        var bounding = path.getBoundingClientRect();
        var fileSrc = this.svgFileSrc[letter];
        var xScale = 1;
        var yScale = 1;
        if (this.lettersOrginalSize[letter]) {
          xScale = bounding.width / this.lettersOrginalSize[letter].width;
          yScale = bounding.height / this.lettersOrginalSize[letter].height;
        }
        var _x = bounding.left + bounding.width / 2;
        var _y = bounding.top + bounding.height / 2;
        var _width = bounding.width;
        var _height = bounding.height + 20;
        var rectangle = Matter.Bodies.rectangle(_x, _y, _width, _height, {
          friction: 1,
          restitution: 1,
          isSleeping: this.letterIsSleeping,
          collisionFilter: {
            category: 0x0004
          },
          render: {
            sprite: {
              texture: fileSrc,
              xScale: xScale,
              yScale: yScale
            }
          }
        });
        Matter.Composite.add(this.world, rectangle);
        this.letters.push(rectangle);
      }
    }
  }, {
    key: "clearLetters",
    value: function clearLetters() {
      for (var i = this.letters.length - 1; i >= 0; i--) {
        var letter = this.letters[i];
        Matter.Composite.remove(this.world, letter);
        this.letters.splice(i, 1);
      }
    }

    //
  }, {
    key: "adjust",
    value: function adjust() {
      var wt = window.innerWidth;
      var ht = window.innerHeight;
      this.canvas.width = wt;
      this.canvas.height = ht;

      /*
      Matter.Composite.clear(this.world);
      Matter.Events.off(this.engine);
       this.setMouse();
      this.addWalls();
      this.addLetters();
      this.startAnim();
       */

      this.clearLetters();
      this.updateWalls();
      this.addLetters();
      this.startAnim();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      Matter.Render.stop(this.render);
      Matter.World.clear(this.engine.world);
      Matter.Engine.clear(this.engine);
      this.render.canvas.remove();
      this.render.canvas = null;
      this.render.context = null;
      this.render.textures = {};
    }
  }, {
    key: "reset",
    value: function reset() {
      var wt = window.innerWidth;
      var ht = window.innerHeight;
      this.canvas.width = wt;
      this.canvas.height = ht;
      this.updateWalls();
    }

    // animation
  }, {
    key: "startAnim",
    value: function startAnim() {
      for (var i = 0; i < this.letters.length; ++i) {
        var letter = this.letters[i];
        Matter.Body.set(letter, "isSleeping", false);
      }
    }
  }, {
    key: "endAnim",
    value: function endAnim() {
      for (var i = 0; i < this.letters.length; ++i) {
        var letter = this.letters[i];
        Matter.Body.set(letter, "isSleeping", false);
        Matter.Body.set(letter, 'isSensor', true);
      }
      Matter.Composite.rebase(this.world);
    }
  }]);
  return Stage;
}();
var _default = exports.default = Stage;
},{"../utils/helper":"assets/js/utils/helper.js","../enums":"assets/js/enums/index.js"}],"assets/js/components/layer_old.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _gsap = require("gsap");
var helper = _interopRequireWildcard(require("../utils/helper"));
var _enums = require("../enums");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Layer = /*#__PURE__*/function () {
  function Layer(_ref, callback) {
    var key = _ref.key,
      button = _ref.button,
      layer = _ref.layer;
    _classCallCheck(this, Layer);
    this.isMobile = helper.mobile.detect();
    this.key = key;
    this.degree = button && helper.getDegree(this.isMobile ? button.degreeMobile : button.degree);
    this.distance = layer.distance;
    this.radius = layer.radius;
    this.speed = layer.speed;
    this.duration = layer.duration;

    //
    this.buttonPointerWidth = 14;

    // element
    this.buttonElement = document.querySelector("button[rel=\"".concat(key, "\"]"));
    this.layerElement = document.querySelector("section[rel=\"".concat(key, "\"]"));
    this.addEventListeners();

    //
    this.initializePosition();

    //
    this.callback = callback;
  }
  _createClass(Layer, [{
    key: "handleEvent",
    value: function handleEvent(_ref2) {
      var type = _ref2.type,
        evt = _ref2.evt;
      if (typeof this.callback !== 'undefined') {
        this.callback({
          type: type,
          evt: evt
        });
      }
    }
  }, {
    key: "onMouseEnter",
    value: function onMouseEnter(evt) {
      this.handleEvent({
        type: _enums.EVENT_TYPES.MOUSE_ENTER,
        evt: evt
      });
    }
  }, {
    key: "onMouseLeave",
    value: function onMouseLeave(evt) {
      this.handleEvent({
        type: _enums.EVENT_TYPES.MOUSE_LEAVE,
        evt: evt
      });
    }
  }, {
    key: "onClick",
    value: function onClick(evt) {
      this.handleEvent({
        type: _enums.EVENT_TYPES.CLICK,
        evt: evt
      });
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      this.layerElement.addEventListener('mouseenter', this.onMouseEnter.bind(this), false);
      this.layerElement.addEventListener('mouseleave', this.onMouseLeave.bind(this), false);
      this.layerElement.addEventListener('click', this.onClick.bind(this), false);
    }
  }, {
    key: "removeEventListeners",
    value: function removeEventListeners() {
      this.layerElement.removeEventListener('mouseenter', this.onMouseEnter.bind(this), false);
      this.layerElement.removeEventListener('mouseleave', this.onMouseLeave.bind(this), false);
      this.layerElement.removeEventListener('click', this.onClick.bind(this), false);
    }
  }, {
    key: "initializePosition",
    value: function initializePosition() {
      var _this$buttonElement, _this$layerElement;
      var animated = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _this$calculateCoordi = this.calculateCoordinates(window.innerWidth * .5, window.innerHeight * .5, window.innerWidth, window.innerHeight),
        x = _this$calculateCoordi.x,
        y = _this$calculateCoordi.y,
        maskSize = _this$calculateCoordi.maskSize,
        newCoorX = _this$calculateCoordi.newCoorX,
        newCoorY = _this$calculateCoordi.newCoorY,
        percent = _this$calculateCoordi.percent;
      var _this$calculatePositi = this.calculatePosition(window.innerWidth, window.innerHeight, newCoorX, newCoorY, percent),
        px = _this$calculatePositi.px,
        py = _this$calculatePositi.py;
      if ((_this$buttonElement = this.buttonElement) !== null && _this$buttonElement !== void 0 && _this$buttonElement.style) {
        _gsap.gsap.killTweensOf(this.buttonElement);
        if (animated) {
          _gsap.gsap.to(this.buttonElement, {
            x: px,
            y: py,
            duration: this.duration * .5,
            ease: _enums.ANIMATION.EASE
          });
        } else {
          _gsap.gsap.set(this.buttonElement, {
            x: px,
            y: py
          });
        }
      }
      if ((_this$layerElement = this.layerElement) !== null && _this$layerElement !== void 0 && _this$layerElement.style) {
        _gsap.gsap.killTweensOf(this.layerElement);
        if (animated) {
          _gsap.gsap.to(this.layerElement, {
            "--x": "".concat(newCoorX, "%"),
            "--y": "".concat(newCoorY, "%"),
            duration: this.duration * .5,
            ease: _enums.ANIMATION.EASE
          });
        } else {
          _gsap.gsap.set(this.layerElement, {
            "--x": "".concat(newCoorX, "%"),
            "--y": "".concat(newCoorY, "%")
          });
        }
      }
    }
  }, {
    key: "calculateCoordinates",
    value: function calculateCoordinates(clientX, clientY, windowWidth, windowHeight) {
      var x = Math.round(clientX / window.innerWidth * 100);
      var y = Math.round(clientY / window.innerHeight * 100);
      var maskSize = Math.abs((x - this.distance) * this.speed);
      var newCoorX = this.distance - (x - this.distance) * _enums.ANIMATION.SPEED_X;
      var newCoorY = this.distance - (y - this.distance) * _enums.ANIMATION.SPEED_Y;
      var width = windowWidth / 100 * (this.radius + maskSize);
      var height = windowHeight / 100 * (this.radius + maskSize);
      var percent = Math.sqrt(width * width + height * height) / Math.sqrt(2);
      return {
        x: x,
        y: y,
        maskSize: maskSize,
        newCoorX: newCoorX,
        newCoorY: newCoorY,
        percent: percent
      };
    }
  }, {
    key: "calculatePosition",
    value: function calculatePosition(windowWidth, windowHeight, newCoorX, newCoorY, percent) {
      var px = windowWidth / 100 * newCoorX + percent * Math.cos(this.degree) - this.buttonPointerWidth * 0.5;
      var py = windowHeight / 100 * newCoorY + percent * Math.sin(this.degree) - this.buttonPointerWidth * 0.5;
      return {
        px: px,
        py: py
      };
    }
  }, {
    key: "animateButton",
    value: function animateButton(px, py) {
      var _this$buttonElement2;
      ((_this$buttonElement2 = this.buttonElement) === null || _this$buttonElement2 === void 0 ? void 0 : _this$buttonElement2.style) && _gsap.gsap.to(this.buttonElement, {
        x: px,
        y: py,
        duration: this.duration,
        ease: _enums.ANIMATION.EASE
      });
    }
  }, {
    key: "animateLayer",
    value: function animateLayer(newCoorX, newCoorY, maskSize) {
      var _this$layerElement2;
      ((_this$layerElement2 = this.layerElement) === null || _this$layerElement2 === void 0 ? void 0 : _this$layerElement2.style) && _gsap.gsap.to(this.layerElement, {
        "--x": "".concat(newCoorX, "%"),
        "--y": "".concat(newCoorY, "%"),
        duration: this.duration,
        ease: _enums.ANIMATION.EASE
      });
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(_ref3) {
      var clientX = _ref3.x,
        clientY = _ref3.y,
        windowWidth = _ref3.width,
        windowHeight = _ref3.height;
      var _this$calculateCoordi2 = this.calculateCoordinates(clientX, clientY, windowWidth, windowHeight),
        x = _this$calculateCoordi2.x,
        y = _this$calculateCoordi2.y,
        maskSize = _this$calculateCoordi2.maskSize,
        newCoorX = _this$calculateCoordi2.newCoorX,
        newCoorY = _this$calculateCoordi2.newCoorY,
        percent = _this$calculateCoordi2.percent;
      var _this$calculatePositi2 = this.calculatePosition(windowWidth, windowHeight, newCoorX, newCoorY, percent),
        px = _this$calculatePositi2.px,
        py = _this$calculatePositi2.py;
      this.animateButton(px, py);
      this.animateLayer(newCoorX, newCoorY, maskSize);
    }
  }]);
  return Layer;
}();
var _default = exports.default = Layer;
},{"gsap":"../node_modules/gsap/index.js","../utils/helper":"assets/js/utils/helper.js","../enums":"assets/js/enums/index.js"}],"assets/js/components/logo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _gsap = require("gsap");
var helper = _interopRequireWildcard(require("../utils/helper"));
var _enums = require("../enums");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Logo = /*#__PURE__*/function () {
  function Logo(callback) {
    _classCallCheck(this, Logo);
    this.distance = 50;
    this.duration = 1;

    // element
    this.logoElementWrapper = document.querySelector(".logo-wrapper.center");
    this.logoElement = document.querySelector(".logo-wrapper.top .logo");
    this.addEventListeners();

    //
    this.initializePosition();

    //
    this.callback = callback;
  }
  _createClass(Logo, [{
    key: "handleEvent",
    value: function handleEvent(_ref) {
      var type = _ref.type,
        evt = _ref.evt;
      if (typeof this.callback !== 'undefined') {
        this.callback({
          type: type,
          evt: evt
        });
      }
    }
  }, {
    key: "onMouseEnter",
    value: function onMouseEnter(evt) {
      this.handleEvent({
        type: _enums.EVENT_TYPES.MOUSE_ENTER,
        evt: evt
      });
    }
  }, {
    key: "onMouseLeave",
    value: function onMouseLeave(evt) {
      this.handleEvent({
        type: _enums.EVENT_TYPES.MOUSE_LEAVE,
        evt: evt
      });
    }
  }, {
    key: "onClick",
    value: function onClick(evt) {
      this.handleEvent({
        type: _enums.EVENT_TYPES.CLICK,
        evt: evt
      });
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      this.logoElement.addEventListener('mouseenter', this.onMouseEnter.bind(this), false);
      this.logoElement.addEventListener('mouseleave', this.onMouseLeave.bind(this), false);
      this.logoElement.addEventListener('click', this.onClick.bind(this), false);
    }
  }, {
    key: "removeEventListeners",
    value: function removeEventListeners() {
      this.logoElement.removeEventListener('mouseenter', this.onMouseEnter.bind(this), false);
      this.logoElement.removeEventListener('mouseleave', this.onMouseLeave.bind(this), false);
      this.logoElement.removeEventListener('click', this.onClick.bind(this), false);
    }
  }, {
    key: "initializePosition",
    value: function initializePosition() {
      var _this$logoElementWrap;
      var animated = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _this$calculateCoordi = this.calculateCoordinates(window.innerWidth * .5, window.innerHeight * .5, window.innerWidth, window.innerHeight),
        x = _this$calculateCoordi.x,
        y = _this$calculateCoordi.y,
        maskSize = _this$calculateCoordi.maskSize,
        newCoorX = _this$calculateCoordi.newCoorX,
        newCoorY = _this$calculateCoordi.newCoorY,
        percent = _this$calculateCoordi.percent;
      if ((_this$logoElementWrap = this.logoElementWrapper) !== null && _this$logoElementWrap !== void 0 && _this$logoElementWrap.style) {
        _gsap.gsap.killTweensOf(this.logoElementWrapper);
        if (animated) {
          _gsap.gsap.to(this.logoElementWrapper, {
            "--x": "".concat(newCoorX, "%"),
            "--y": "".concat(newCoorY, "%"),
            "duration": this.duration * .5,
            "ease": _enums.ANIMATION.EASE
          });
        } else {
          _gsap.gsap.set(this.logoElementWrapper, {
            "--x": "".concat(newCoorX, "%"),
            "--y": "".concat(newCoorY, "%")
          });
        }
      }
    }
  }, {
    key: "calculateCoordinates",
    value: function calculateCoordinates(clientX, clientY, windowWidth, windowHeight) {
      var x = Math.round(clientX / window.innerWidth * 100);
      var y = Math.round(clientY / window.innerHeight * 100);
      var newCoorX = this.distance - (x - this.distance) * _enums.ANIMATION.SPEED_X;
      var newCoorY = this.distance - (y - this.distance) * _enums.ANIMATION.SPEED_Y;
      return {
        x: x,
        y: y,
        newCoorX: newCoorX,
        newCoorY: newCoorY
      };
    }
  }, {
    key: "animateLogo",
    value: function animateLogo(newCoorX, newCoorY) {
      var _this$logoElementWrap2;
      ((_this$logoElementWrap2 = this.logoElementWrapper) === null || _this$logoElementWrap2 === void 0 ? void 0 : _this$logoElementWrap2.style) && _gsap.gsap.to(this.logoElementWrapper, {
        "--x": "".concat(newCoorX, "%"),
        "--y": "".concat(newCoorY, "%"),
        "duration": this.duration,
        "ease": _enums.ANIMATION.EASE
      });
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(_ref2) {
      var clientX = _ref2.x,
        clientY = _ref2.y,
        windowWidth = _ref2.width,
        windowHeight = _ref2.height;
      var _this$calculateCoordi2 = this.calculateCoordinates(clientX, clientY, windowWidth, windowHeight),
        newCoorX = _this$calculateCoordi2.newCoorX,
        newCoorY = _this$calculateCoordi2.newCoorY;
      this.animateLogo(newCoorX, newCoorY);
    }
  }]);
  return Logo;
}();
var _default = exports.default = Logo;
},{"gsap":"../node_modules/gsap/index.js","../utils/helper":"assets/js/utils/helper.js","../enums":"assets/js/enums/index.js"}],"assets/js/components/intro.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Intro = /*#__PURE__*/function () {
  function Intro() {
    _classCallCheck(this, Intro);
    this.element = document.querySelector('.intro');
    this.cls = {
      animate: 'animate'
    };
  }
  _createClass(Intro, [{
    key: "animate",
    value: function animate(b) {
      if (b) this.element.classList.add(this.cls.animate);else this.element.classList.remove(this.cls.animate);
    }
  }]);
  return Intro;
}();
var _default = exports.default = Intro;
},{}],"assets/js/components/navigation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var helper = _interopRequireWildcard(require("../utils/helper"));
var _enums = require("../enums");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Navigation = /*#__PURE__*/function () {
  function Navigation(callback) {
    _classCallCheck(this, Navigation);
    this.element = document.querySelector(".navigation");
    this.cls = {
      selected: 'selected'
    };
    this._activeted = true;
    this.timeout = 10;
    this.addEventListeners();

    //
    this.callback = callback;
  }
  _createClass(Navigation, [{
    key: "activeted",
    get: function get() {
      return this._activeted;
    },
    set: function set(b) {
      this._activeted = b;
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(_ref) {
      var type = _ref.type,
        evt = _ref.evt;
      if (typeof this.callback !== 'undefined') {
        this.callback({
          type: type,
          evt: evt
        });
      }
    }
  }, {
    key: "onClick",
    value: function onClick(evt) {
      var _this = this;
      if (this._activeted) {
        this._activeted = false;
        this.handleEvent({
          type: _enums.EVENT_TYPES.CLICK,
          evt: evt
        });
        setTimeout(function () {
          _this._activeted = true;
        }, this.timeout);
      }
    }
  }, {
    key: "focused",
    value: function focused(rel) {
      var _this2 = this;
      this.element.querySelectorAll("a").forEach(function (element) {
        return element.classList.remove(_this2.cls.selected);
      });
      this.element.querySelector("a[rel=\"".concat(rel, "\"]")).classList.add(this.cls.selected);
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var _this3 = this;
      this.element.querySelectorAll("a").forEach(function (element) {
        return element.addEventListener('click', _this3.onClick.bind(_this3), false);
      });
    }
  }, {
    key: "removeEventListeners",
    value: function removeEventListeners() {
      var _this4 = this;
      this.element.querySelectorAll("a").forEach(function (element) {
        return element.removeEventListener('click', _this4.onClick.bind(_this4), false);
      });
    }
  }]);
  return Navigation;
}();
var _default = exports.default = Navigation;
},{"../utils/helper":"assets/js/utils/helper.js","../enums":"assets/js/enums/index.js"}],"assets/js/components/layerManagement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ = _interopRequireDefault(require("../../svg/**/*.svg"));
var helper = _interopRequireWildcard(require("../utils/helper"));
var _enums = require("../enums");
var _stage = _interopRequireDefault(require("./stage"));
var _layer_old = _interopRequireDefault(require("./layer_old"));
var _logo = _interopRequireDefault(require("./logo"));
var _intro = _interopRequireDefault(require("./intro"));
var _navigation = _interopRequireDefault(require("./navigation"));
var _content = _interopRequireDefault(require("../templates/content"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var LayerManagement = /*#__PURE__*/function () {
  function LayerManagement(ID, options) {
    var _this = this;
    _classCallCheck(this, LayerManagement);
    this.stage = null;
    this.ID = ID;
    this.options = options;
    this.layers = options.map(function (obj) {
      return new _layer_old.default(obj, _this.layerCallback.bind(_this));
    });
    this.logo = new _logo.default(this.logoCallback.bind(this));
    this.intro = new _intro.default();
    this.navigation = new _navigation.default(this.navigationCallback.bind(this));
    this.content = new _content.default();
    this._activeted = false;
    this.adjust();

    //
    this.docBody = document.body;
    this.cls = {
      deActive: 'de-active',
      isActive: 'is-active',
      ready: 'ready',
      backToHomeAnimate: 'back-to-home-animate'
    };

    // Bind event handlers in the constructor
    this.handleLayerMouseEnter = this.handleLayerMouseEnter.bind(this);
    this.handleLayerMouseLeave = this.handleLayerMouseLeave.bind(this);
    this.handleLayerClick = this.handleLayerClick.bind(this);
    this.layerCallback = this.layerCallback.bind(this);
    this.logoCallback = this.logoCallback.bind(this);
    this.navigationCallback = this.navigationCallback.bind(this);
    this.resizeStop = this.resizeStop.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
  }

  // Getter and setter can be simplified to a single line
  _createClass(LayerManagement, [{
    key: "activeted",
    get: function get() {
      return this._activeted;
    },
    set: function set(b) {
      this._activeted = b;
    }

    // start scene
  }, {
    key: "starting",
    value: function starting() {
      this.intro.animate(true);
      this._activeted = true;
    }

    //
  }, {
    key: "handleLayerMouseEnter",
    value: function handleLayerMouseEnter(evt) {
      if (this._activeted) {
        var target = evt.currentTarget;
        this.ID.setAttribute('rel', target.getAttribute('rel') || '');
      }
    }
  }, {
    key: "handleLayerMouseLeave",
    value: function handleLayerMouseLeave() {
      if (this._activeted) {
        this.ID.removeAttribute('rel');
      }
    }
  }, {
    key: "handleLayerClick",
    value: function handleLayerClick(evt) {
      var _this2 = this;
      if (this._activeted) {
        var target = evt.currentTarget;
        var sib = helper.getSiblings(target);
        sib.forEach(function (element) {
          return element.classList.add(_this2.cls.deActive);
        });
        target.classList.add(this.cls.isActive);
        this.ID.setAttribute('rel', target.getAttribute('rel') || '');
        this._activeted = false;
        this.loadStage(target.getAttribute('rel') || '');
      }
    }
  }, {
    key: "loadStage",
    value: function loadStage(activeRel) {
      var _this3 = this;
      var activeSectionOptions = this.options.find(function (x) {
        return x.key === activeRel;
      });
      var activeSvgFileSrc = _.default.sections[activeRel];
      var activeBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--".concat(activeRel, "-color"));

      //console.log(activeBackgroundColor, helper.isLightingColor(activeBackgroundColor), helper.isLightingColor(activeBackgroundColor) ? 'dark' : 'light')

      this.navigation.focused(activeRel);
      helper.loadTexture(activeSvgFileSrc, function (originalSize) {
        if (!_this3.stage) {
          _this3.stage = new _stage.default(activeSectionOptions, originalSize, activeSvgFileSrc, function (obj) {
            if (obj.type === _enums.EVENT_TYPES.ANIMATION_END) {
              _this3.navigation.activeted = true;
            }
          });
        } else {
          _this3.stage.updateProp(activeSectionOptions, originalSize, activeSvgFileSrc);
          _this3.stage.reset();
        }
        _this3.stage.init();
        setTimeout(function () {
          _this3.stage.startAnim();
          activeSectionOptions.content ? _this3.content.generate(activeSectionOptions.content) : _this3.content.reset();
          _this3.docBody.classList.add(_this3.cls.ready);
        }, 111);
      });
    }
  }, {
    key: "backToReturn",
    value: function () {
      var _backToReturn = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this4 = this;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (helper.hasClass({
                element: this.docBody,
                value: this.cls.backToHomeAnimate
              })) {
                _context.next = 18;
                break;
              }
              this.docBody.classList.add(this.cls.backToHomeAnimate);
              if (this.content) {
                this.content.endAnim();
              }
              if (this.stage) {
                this.stage.endAnim();
              }
              _context.next = 6;
              return helper.delay(1000);
            case 6:
              this.intro.animate(false);
              this.docBody.classList.remove(this.cls.ready);
              document.querySelectorAll(".".concat(this.cls.deActive, ", .").concat(this.cls.isActive)).forEach(function (element) {
                return element.classList.remove(_this4.cls.deActive, _this4.cls.isActive);
              });
              _context.next = 11;
              return helper.delay(100);
            case 11:
              this.intro.animate(true);
              _context.next = 14;
              return helper.delay(2000);
            case 14:
              if (this.stage) {
                this.stage.clearLetters();
              }
              document.querySelector('main').removeAttribute('rel');
              this.docBody.classList.remove(this.cls.backToHomeAnimate);
              this._activeted = true;
            case 18:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function backToReturn() {
        return _backToReturn.apply(this, arguments);
      }
      return backToReturn;
    }()
  }, {
    key: "newStage",
    value: function () {
      var _newStage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(activeRel) {
        var _this5 = this;
        var target, sib;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (this.stage) {
                this.stage.endAnim();
              }

              //await helper.delay(1000);
              target = document.querySelector("section[rel=\"".concat(activeRel, "\"]"));
              sib = helper.getSiblings(target);
              sib.forEach(function (element) {
                element.classList.add(_this5.cls.deActive);
                element.classList.remove(_this5.cls.isActive);
              });
              target.classList.remove(this.cls.deActive);
              target.classList.add(this.cls.isActive);
              this.content.reset();
              this.ID.setAttribute('rel', target.getAttribute('rel') || '');
              this.loadStage(activeRel);
            case 9:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function newStage(_x) {
        return _newStage.apply(this, arguments);
      }
      return newStage;
    }()
  }, {
    key: "layerCallback",
    value: function layerCallback(obj) {
      if (this._activeted) {
        var evt = obj.evt;
        switch (obj.type) {
          case _enums.EVENT_TYPES.MOUSE_ENTER:
            this.handleLayerMouseEnter(evt);
            break;
          case _enums.EVENT_TYPES.MOUSE_LEAVE:
            this.handleLayerMouseLeave();
            break;
          case _enums.EVENT_TYPES.CLICK:
            this.handleLayerClick(evt);
            break;
          default:
            break;
        }
      }
    }
  }, {
    key: "logoCallback",
    value: function logoCallback(obj) {
      if (!this._activeted) {
        switch (obj.type) {
          case _enums.EVENT_TYPES.CLICK:
            this.backToReturn();
            break;
          default:
            break;
        }
      }
    }
  }, {
    key: "navigationCallback",
    value: function navigationCallback(obj) {
      if (!this._activeted) {
        var evt = obj.evt;
        switch (obj.type) {
          case _enums.EVENT_TYPES.CLICK:
            var target = evt.currentTarget;
            this.newStage(target.getAttribute('rel') || '');
            break;
          default:
            break;
        }
      }
    }
  }, {
    key: "adjust",
    value: function adjust() {
      this.initializePosition(false);
    }
  }, {
    key: "initializePosition",
    value: function initializePosition() {
      var animated = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.windowDimensions = helper.getWindowSize();
      this.layers.forEach(function (layer) {
        return layer.initializePosition(animated);
      });
      this.logo.initializePosition(animated);
    }
  }, {
    key: "resizeStop",
    value: function resizeStop() {
      this.stage && !this._activeted && this.stage.adjust();
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(evt) {
      if (this._activeted) {
        //const obj = { ...this.windowDimensions, ...helper.getMousePos(evt) };
        var obj = _objectSpread(_objectSpread({}, this.windowDimensions), evt);
        this.layers.forEach(function (layer) {
          return layer.mouseMove(obj);
        });
        this.logo.mouseMove(obj);
      }
    }
  }]);
  return LayerManagement;
}();
var _default = exports.default = LayerManagement;
},{"../../svg/**/*.svg":"assets/svg/**/*.svg","../utils/helper":"assets/js/utils/helper.js","../enums":"assets/js/enums/index.js","./stage":"assets/js/components/stage.js","./layer_old":"assets/js/components/layer_old.js","./logo":"assets/js/components/logo.js","./intro":"assets/js/components/intro.js","./navigation":"assets/js/components/navigation.js","../templates/content":"assets/js/templates/content.js"}],"assets/js/components/assetsLoader.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var helper = _interopRequireWildcard(require("../utils/helper"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var AssetsLoader = /*#__PURE__*/function () {
  function AssetsLoader(fileSrc, callback) {
    _classCallCheck(this, AssetsLoader);
    this.callback = callback;
    this.fileSrc = fileSrc;
    this.init();
  }
  _createClass(AssetsLoader, [{
    key: "dispatcher",
    value: function dispatcher(obj) {
      if (typeof this.callback !== 'undefined') {
        this.callback(obj);
      }
    }
  }, {
    key: "loadAll",
    value: function loadAll(files) {
      var promises = Object.values(files).map(helper.loadImage);
      return Promise.all(promises);
    }
  }, {
    key: "init",
    value: function init() {
      var _this = this;
      this.loadAll(this.fileSrc).then(function (files) {
        _this.dispatcher({
          type: 'success',
          data: files
        });
      }).catch(function (error) {
        _this.dispatcher({
          type: 'error',
          message: error
        });
      });
    }
  }]);
  return AssetsLoader;
}();
var _default = exports.default = AssetsLoader;
},{"../utils/helper":"assets/js/utils/helper.js"}],"assets/js/app.js":[function(require,module,exports) {
"use strict";

var helper = _interopRequireWildcard(require("./utils/helper"));
var _ = _interopRequireDefault(require("../images/**/*.png"));
var _2 = _interopRequireDefault(require("../svg/**/*.svg"));
var _config = require("./config");
var _enums = require("./enums");
var _events = _interopRequireDefault(require("./events"));
var _template = _interopRequireDefault(require("./templates/template"));
var _colorSchemes = _interopRequireDefault(require("./components/colorSchemes"));
var _layerManagement = _interopRequireDefault(require("./components/layerManagement"));
var _assetsLoader = _interopRequireDefault(require("./components/assetsLoader"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
new _colorSchemes.default(_config.colorSchemes).init();
var main = document.querySelector('main');
new _template.default({
  ID: main,
  options: _config.config
}).init();
window.layerManagement = new _layerManagement.default(main, _config.config);
new _events.default(function (obj) {
  switch (obj.type) {
    case _enums.EVENT_TYPES.RESIZE:
      layerManagement.adjust();
      break;
    case _enums.EVENT_TYPES.RESIZE_STOP:
      layerManagement.resizeStop();
      break;
    case _enums.EVENT_TYPES.MOUSE_MOVE:
      layerManagement.mouseMove(obj.evt);
      break;
    case _enums.EVENT_TYPES.MOUSE_LEAVE:
      //layerManagement.initializePosition(true);
      break;
    default:
      break;
  }
}).init();
new _assetsLoader.default(_objectSpread(_objectSpread({}, _.default), helper.flattenObject(_2.default.sections)), function (_ref) {
  var type = _ref.type,
    data = _ref.data;
  if (type == 'success') {
    layerManagement.starting();
  }
});
},{"./utils/helper":"assets/js/utils/helper.js","../images/**/*.png":"assets/images/**/*.png","../svg/**/*.svg":"assets/svg/**/*.svg","./config":"assets/js/config.js","./enums":"assets/js/enums/index.js","./events":"assets/js/events.js","./templates/template":"assets/js/templates/template.js","./components/colorSchemes":"assets/js/components/colorSchemes.js","./components/layerManagement":"assets/js/components/layerManagement.js","./components/assetsLoader":"assets/js/components/assetsLoader.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52408" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/js/app.js"], null)
//# sourceMappingURL=/app.56908c73.js.map