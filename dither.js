/* dododowson — live 1-bit dither portrait
   Draws an image into a <canvas> at (css size / pixel), turns it into
   luminance and re-thresholds it with random noise a few times a second,
   so the portrait reads as living film grain. Re-samples on every resize
   so it never stretches, and pauses while it is off-screen.
   Vanilla JS, no dependencies.

   Usage:
     Dither(canvas, {
       src: "img/photo.jpg",
       pixel: 3, contrast: 1.9, brightness: 0.02, spread: 0.6,
       ink: 226, bg: 0, focusX: 0.5, focusY: 0.5, fps: 7, animate: true,
       mobile: { pixel: 2, focusY: 0.3 },     // overrides at ≤ 760px
       mobileQuery: "(max-width: 760px)"
     });                                                                    */
(function () {
  "use strict";

  var DEFAULTS = {
    pixel: 3, contrast: 1.9, brightness: 0.02, spread: 0.6,
    ink: 226, bg: 0, focusX: 0.5, focusY: 0.5, fps: 7, animate: true,
    mobile: null, mobileQuery: "(max-width: 760px)"
  };

  function Dither(cv, opts) {
    var o = {}, k;
    for (k in DEFAULTS) o[k] = DEFAULTS[k];
    for (k in opts) o[k] = opts[k];

    var ctx = cv.getContext("2d");
    if (!ctx) return null;
    var img = new Image();
    var lum = null, w = 0, h = 0;
    var timer = null, rt = null, ro = null, io = null;
    var visible = true, plain = false;
    var mq = window.matchMedia ? window.matchMedia(o.mobileQuery) : null;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var animate = o.animate !== false && !reduce;

    function param(name) {
      if (o.mobile && mq && mq.matches && o.mobile[name] != null) return o.mobile[name];
      return o[name];
    }

    function layout() {
      if (!img.complete || !img.naturalWidth) return;
      var r = cv.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return;
      var px = param("pixel");
      w = Math.max(1, Math.round(r.width / px));
      h = Math.max(1, Math.round(r.height / px));
      cv.width = w; cv.height = h;

      // cover fit around the focal point
      var s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      var dw = img.naturalWidth * s, dh = img.naturalHeight * s;
      ctx.drawImage(img, (w - dw) * param("focusX"), (h - dh) * param("focusY"), dw, dh);

      var d;
      try { d = ctx.getImageData(0, 0, w, h).data; }
      catch (e) {
        // On file:// the canvas counts as cross-origin and pixels can't be read.
        // Fall back to the plain photo at full resolution (greyscaled in CSS).
        lum = null; stop(); plain = true;
        cv.classList.add("is-plain");
        cv.width = Math.round(r.width); cv.height = Math.round(r.height);
        s = Math.max(cv.width / img.naturalWidth, cv.height / img.naturalHeight);
        dw = img.naturalWidth * s; dh = img.naturalHeight * s;
        ctx.drawImage(img, (cv.width - dw) * param("focusX"), (cv.height - dh) * param("focusY"), dw, dh);
        return;
      }
      var c = param("contrast"), b = param("brightness");
      lum = new Float32Array(w * h);
      for (var i = 0; i < w * h; i++) {
        var l = (d[i * 4] * 0.3 + d[i * 4 + 1] * 0.59 + d[i * 4 + 2] * 0.11) / 255;
        lum[i] = Math.min(1, Math.max(0, (l - 0.5) * c + 0.5 + b));
      }
      render();
    }

    function render() {
      if (!lum) return;
      var out = ctx.createImageData(w, h), p = out.data;
      var ink = param("ink"), bg = param("bg"), sp = param("spread");
      for (var i = 0; i < lum.length; i++) {
        var v = lum[i] + (Math.random() - 0.5) * sp > 0.5 ? ink : bg;
        p[i * 4] = p[i * 4 + 1] = p[i * 4 + 2] = v;
        p[i * 4 + 3] = 255;
      }
      ctx.putImageData(out, 0, 0);
    }

    function start() {
      if (!animate || plain || timer || !visible) return;
      timer = setInterval(render, 1000 / param("fps"));
    }
    function stop() { clearInterval(timer); timer = null; }
    function relayout() { clearTimeout(rt); rt = setTimeout(layout, 60); }

    img.onload = function () { layout(); start(); };

    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(relayout);
      ro.observe(cv);
    } else {
      window.addEventListener("resize", relayout);
    }
    if (mq) {
      if (mq.addEventListener) mq.addEventListener("change", relayout);
      else if (mq.addListener) mq.addListener(relayout);
    }
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) start(); else stop();
      });
      io.observe(cv);
    }

    img.src = o.src;

    return {
      destroy: function () {
        stop(); clearTimeout(rt);
        if (ro) ro.disconnect(); else window.removeEventListener("resize", relayout);
        if (io) io.disconnect();
        if (mq && mq.removeEventListener) mq.removeEventListener("change", relayout);
      }
    };
  }

  window.Dither = Dither;
})();
