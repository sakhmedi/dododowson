/* dododowson — renderer & interactions
   Reads window.SITE (content.js) and builds every section.
   Vanilla JS, no dependencies. Runs on file:// and over https alike. */
(function () {
  "use strict";

  var SITE = window.SITE;
  if (!SITE) { console.error("content.js failed to load — SITE is undefined"); return; }

  var LANGS = [
    { code: "kz", short: "KZ", name: "Қазақша" },
    { code: "ru", short: "RU", name: "Русский" },
    { code: "en", short: "EN", name: "English" }
  ];
  var CODES = LANGS.map(function (l) { return l.code; });
  var STORE_KEY = "dododowson.lang";
  var FLASH_MS = 90;
  var FRAME_MS = 320;
  var FRAMES = ["hq1", "hq2", "hq3"];       // YouTube's auto frames at 25/50/75%
  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- state ------------------------------------------------------------- */
  function pickInitialLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORE_KEY); } catch (e) {}
    if (saved && CODES.indexOf(saved) !== -1) return saved;
    var nav = (navigator.language || "").slice(0, 2).toLowerCase();
    if (nav === "kk") nav = "kz";
    if (CODES.indexOf(nav) !== -1) return nav;
    return CODES.indexOf(SITE.defaultLang) !== -1 ? SITE.defaultLang : "ru";
  }
  var lang = pickInitialLang();
  var langMenuOpen = false;
  var hoverVideo = -1, frame = 0, frameTimer = null;
  var playingVideo = -1, playingEmbed = null;   // a playing iframe survives re-renders
  var flashTimer = null;

  /* ---- tiny helpers ------------------------------------------------------ */
  function t(v) {                       // resolve a {kz,ru,en} object or a plain string
    if (v == null) return "";
    if (typeof v === "string") return v;
    return v[lang] || v.en || v.ru || v.kz || "";
  }
  function ui(key) {
    return (SITE.ui[lang] && SITE.ui[lang][key]) || (SITE.ui.en && SITE.ui.en[key]) || "";
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function safeUrl(u) {                  // only allow real outbound links
    return (typeof u === "string" && /^https?:\/\//i.test(u)) ? u : null;
  }
  function hasPath(s) { return typeof s === "string" && s.trim() !== ""; }
  function extLink(href, cls, label) {
    var a = el("a", cls, label);
    a.href = href; a.target = "_blank"; a.rel = "noopener noreferrer";
    return a;
  }
  function placeholder() {
    var d = el("div", "ph");
    d.setAttribute("aria-hidden", "true");
    return d;
  }
  function image(src, alt, cls) {        // <img> or a plain placeholder tile
    if (!hasPath(src)) return placeholder();
    var img = el("img", cls);
    img.src = src; img.alt = alt || ""; img.loading = "lazy";
    img.onerror = function () { img.replaceWith(placeholder()); };
    return img;
  }
  function albumLink(al, key) { return safeUrl(al.links && al.links[key]); }
  function videoId(v) { return v.youtubeId || v.id || ""; }
  function ytImg(id, name) {
    return "https://i.ytimg.com/vi/" + encodeURIComponent(id) + "/" + name + ".jpg";
  }

  /* Feature credit — "feat. A, B" in every language (the names are Latin). */
  function featText(names) {
    return names && names.length ? "feat. " + names.join(", ") : "";
  }
  function releaseMeta(al) {
    var parts = [];
    if (al.type && ui(al.type)) parts.push(ui(al.type));
    var f = featText(al.features);
    if (f) parts.push(f);
    return parts.join(" · ");
  }

  /* ---- HERO -------------------------------------------------------------- */
  function renderHero() {
    document.getElementById("tagline").textContent = ui("bio");

    var box = document.getElementById("latest");
    box.innerHTML = "";
    var al = (SITE.albums || [])[0];
    if (!al) return;

    box.appendChild(image(al.cover, al.title, "latest-cover"));
    var body = el("div", "latest-body");
    body.appendChild(el("span", "label", ui("latest")));
    body.appendChild(el("span", "latest-title", al.title));
    var btns = el("div", "latest-btns");
    var sp = albumLink(al, "spotify"), ap = albumLink(al, "apple");
    if (sp) btns.appendChild(extLink(sp, "btn btn-solid", "Spotify"));
    if (ap) btns.appendChild(extLink(ap, "btn", "Apple Music"));
    if (btns.childNodes.length) body.appendChild(btns);
    box.appendChild(body);
  }

  /* ---- RELEASES (grouped by year, newest first) -------------------------- */
  function renderReleases() {
    var root = document.getElementById("years");
    root.innerHTML = "";
    var groups = [], byYear = {};
    (SITE.albums || []).forEach(function (al) {
      var y = String(al.year || "");
      if (!byYear[y]) { byYear[y] = { year: y, albums: [] }; groups.push(byYear[y]); }
      byYear[y].albums.push(al);
    });
    groups.sort(function (a, b) { return (parseInt(b.year, 10) || 0) - (parseInt(a.year, 10) || 0); });

    groups.forEach(function (g) {
      var row = el("div", "year-row");
      row.appendChild(el("span", "year", g.year));
      var grid = el("div", "covers");
      g.albums.forEach(function (al) { grid.appendChild(releaseCard(al)); });
      row.appendChild(grid);
      root.appendChild(row);
    });
  }
  function releaseCard(al) {
    var card = el("article", "rel");
    var sp = albumLink(al, "spotify"), ap = albumLink(al, "apple");

    var art = sp ? extLink(sp, "rel-art") : el("div", "rel-art");
    if (sp) art.setAttribute("aria-label", ui("listen") + " — " + al.title);
    art.appendChild(image(al.cover, al.title));
    card.appendChild(art);

    var text = el("div", "rel-text");
    text.appendChild(el("span", "rel-title", al.title));
    var meta = releaseMeta(al);
    if (meta) text.appendChild(el("span", "meta", meta));
    card.appendChild(text);

    var links = el("div", "rel-links");
    if (sp) links.appendChild(extLink(sp, null, "Spotify"));
    if (ap) links.appendChild(extLink(ap, null, "Apple"));
    if (links.childNodes.length) card.appendChild(links);
    return card;
  }

  /* ---- VIDEOS ------------------------------------------------------------ */

  /* Optional looping clip (content.js → preview) that replaces the flipbook.
     Nothing is downloaded until the pointer reaches the tile; if the file is
     missing the layer removes itself and the still frame stays. */
  function previewLayer(src) {
    var isGif = /\.gif($|\?)/i.test(src);
    var node;
    if (isGif) {
      node = el("img", "vid-preview");
      node.alt = "";
    } else {
      node = document.createElement("video");
      node.className = "vid-preview";
      node.muted = true; node.loop = true; node.playsInline = true;
      node.setAttribute("muted", "");          // Safari wants the attribute too
      node.setAttribute("playsinline", "");
      node.preload = "none";
    }
    node.addEventListener("error", function () { node.remove(); });

    // Only reveal the layer once it can paint a frame (no black box).
    var started = false, ready = false, wanted = false;
    node.addEventListener(isGif ? "load" : "loadeddata", function () {
      ready = true; if (wanted) node.classList.add("is-on");
    });
    return {
      node: node,
      start: function () {
        wanted = true;
        if (!started) { started = true; node.src = src; if (!isGif) node.preload = "auto"; }
        if (!isGif) { var p = node.play(); if (p && p.catch) p.catch(function () {}); }
        if (ready) node.classList.add("is-on");
      },
      stop: function () {
        wanted = false;
        node.classList.remove("is-on");
        if (!isGif && node.pause) node.pause();
      }
    };
  }

  var videoTiles = [];                   // per-index { thumb, segs, id, poster }
  var preloaded = {};

  function paintFlipbook(i) {
    var tile = videoTiles[i];
    if (!tile) return;
    var on = hoverVideo === i;
    tile.thumb.src = on ? ytImg(tile.id, FRAMES[frame]) : tile.poster;
    tile.segs.forEach(function (s, k) { s.classList.toggle("on", on && k <= frame); });
  }
  function enterVideo(i) {
    var tile = videoTiles[i];
    if (!tile || !tile.id || hoverVideo === i) return;
    leaveVideo();
    hoverVideo = i; frame = 0;
    if (!preloaded[tile.id]) {
      preloaded[tile.id] = true;
      FRAMES.forEach(function (f) { new Image().src = ytImg(tile.id, f); });
    }
    paintFlipbook(i);
    if (!reduceMotion) {
      frameTimer = setInterval(function () {
        frame = (frame + 1) % FRAMES.length;
        paintFlipbook(i);
      }, FRAME_MS);
    }
  }
  function leaveVideo() {
    clearInterval(frameTimer); frameTimer = null;
    var prev = hoverVideo;
    hoverVideo = -1; frame = 0;
    if (prev !== -1) paintFlipbook(prev);
  }

  function renderVideos() {
    leaveVideo();
    var grid = document.getElementById("videos-grid");
    grid.innerHTML = "";
    videoTiles = [];
    (SITE.videos || []).forEach(function (v, i) {
      var id = videoId(v);
      var title = t(v.title), artist = t(v.artist);
      var card = el("article", "vid");
      card.appendChild(i === playingVideo && playingEmbed ? playingEmbed : videoTile(v, i, id, title));

      var meta = el("div", "vid-meta");
      var text = el("div", "vid-text");
      text.appendChild(el("span", "vid-title", title));
      if (artist) text.appendChild(el("span", "meta", artist));
      meta.appendChild(text);
      // Embeds are blocked on file://, so always offer YouTube itself.
      if (id) meta.appendChild(extLink("https://www.youtube.com/watch?v=" + encodeURIComponent(id), "micro", "YouTube ↗"));
      card.appendChild(meta);
      grid.appendChild(card);
    });
  }
  function videoTile(v, i, id, title) {
    var btn = el("button", "vid-tile");
    btn.type = "button";
    btn.setAttribute("aria-label", ui("watch") + " — " + title);

    var poster = hasPath(v.poster) ? v.poster : (id ? ytImg(id, "hqdefault") : "");
    var thumb = el("img", "vid-thumb");
    thumb.alt = ""; thumb.loading = "lazy";
    if (poster) thumb.src = poster; else thumb.hidden = true;
    btn.appendChild(thumb);

    var segs = [];
    var preview = hasPath(v.preview) ? previewLayer(v.preview) : null;
    if (preview) {
      btn.appendChild(preview.node);
    } else {
      var bar = el("span", "vid-segs");
      bar.setAttribute("aria-hidden", "true");
      for (var k = 0; k < FRAMES.length; k++) { var s = el("span"); segs.push(s); bar.appendChild(s); }
      btn.appendChild(bar);
    }

    var play = el("span", "vid-play");
    play.setAttribute("aria-hidden", "true");
    play.appendChild(el("span", "tri-right"));
    btn.appendChild(play);

    videoTiles[i] = { thumb: thumb, segs: segs, id: preview ? "" : id, poster: poster };

    function on()  { if (preview) preview.start(); else enterVideo(i); }
    function off() { if (preview) preview.stop(); else if (hoverVideo === i) leaveVideo(); }
    btn.addEventListener("mouseenter", on);
    btn.addEventListener("focus", on);
    btn.addEventListener("mouseleave", off);
    btn.addEventListener("blur", off);

    btn.addEventListener("click", function () {
      if (!id) return;                   // nothing to play yet (placeholder)
      off();
      playingVideo = i;
      playingEmbed = embed(id, title);
      btn.replaceWith(playingEmbed);
      try { playingEmbed.focus(); } catch (e) {}
    });
    return btn;
  }
  function embed(id, title) {
    var f = document.createElement("iframe");
    f.className = "vid-embed";
    f.src = "https://www.youtube.com/embed/" + encodeURIComponent(id) + "?autoplay=1&rel=0&playsinline=1";
    f.title = title;
    // Without a Referer YouTube refuses with "Error 153". Keep this.
    f.referrerPolicy = "strict-origin-when-cross-origin";
    f.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    f.allowFullscreen = true;
    return f;
  }

  /* ---- CONCERTS ---------------------------------------------------------- */
  var MONTHS = {
    kz: ["қаң","ақп","нау","сәу","мам","мау","шіл","там","қыр","қаз","қар","жел"],
    ru: ["янв","фев","мар","апр","мая","июн","июл","авг","сен","окт","ноя","дек"],
    en: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  };
  function fmtDate(iso) {
    var p = String(iso).split("-");
    if (p.length !== 3) return String(iso);
    var mo = (MONTHS[lang] || MONTHS.en)[parseInt(p[1], 10) - 1] || p[1];
    return parseInt(p[2], 10) + " " + mo + " " + p[0];
  }
  function concertRow(c, isPast) {
    var row = el("div", "show" + (isPast ? " show-past" : ""));
    row.appendChild(el("span", "show-date", fmtDate(c.date)));
    var info = el("div", "show-info");
    info.appendChild(el("span", "show-city", t(c.city)));
    if (c.venue) info.appendChild(el("span", "show-venue", t(c.venue)));
    row.appendChild(info);
    var href = safeUrl(c.tickets);
    if (!isPast && href) row.appendChild(extLink(href, "cta", ui("tickets")));
    return row;
  }
  function followCta() {
    var ig = safeUrl(SITE.links && SITE.links.instagram);
    return ig ? extLink(ig, "cta", ui("follow") + " ↗") : null;
  }
  function renderConcerts() {
    var box = document.getElementById("concerts-body");
    box.innerHTML = "";
    var today = new Date(); today.setHours(0, 0, 0, 0);
    function day(c) { var p = String(c.date).split("-"); return new Date(+p[0], (+p[1] || 1) - 1, +p[2] || 1); }
    var list = (SITE.concerts || []).slice().sort(function (a, b) {
      return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    });
    var upcoming = list.filter(function (c) { return day(c) >= today; });
    var past = list.filter(function (c) { return day(c) < today; }).reverse();

    if (upcoming.length) {
      var u = el("div", "shows-list");
      upcoming.forEach(function (c) { u.appendChild(concertRow(c, false)); });
      box.appendChild(u);
    } else {
      box.appendChild(el("p", "shows-empty", ui("noShows")));
      var cta = followCta();
      if (cta) box.appendChild(cta);
    }

    if (past.length) {
      var det = el("details", "shows-past");
      det.appendChild(el("summary", null, ui("past")));
      var pWrap = el("div", "shows-list");
      past.forEach(function (c) { pWrap.appendChild(concertRow(c, true)); });
      det.appendChild(pWrap);
      box.appendChild(det);
    }
  }

  /* ---- FOOTER ------------------------------------------------------------ */
  function renderFooter() {
    document.getElementById("year").textContent = new Date().getFullYear();
    var box = document.getElementById("foot-links");
    box.innerHTML = "";
    var L = SITE.links || {};
    [["instagram", "Instagram"], ["youtube", "YouTube"], ["spotify", "Spotify"], ["apple", "Apple Music"]]
      .forEach(function (p) {
        var href = safeUrl(L[p[0]]);
        if (href) box.appendChild(extLink(href, null, p[1]));
      });
  }

  /* ---- language menu ----------------------------------------------------- */
  var langWrap = document.getElementById("lang");
  var langBtn = document.getElementById("lang-btn");
  var langMenu = document.getElementById("lang-menu");

  function renderLangMenu() {
    var cur = LANGS[CODES.indexOf(lang)];
    document.getElementById("lang-cur").textContent = cur.short;
    langBtn.setAttribute("aria-label", ui("lang") + ": " + cur.name);
    langMenu.setAttribute("aria-label", ui("lang"));
    langMenu.innerHTML = "";
    LANGS.forEach(function (l) {
      var b = el("button", "lang-opt");
      b.type = "button";
      b.setAttribute("role", "menuitemradio");
      b.setAttribute("aria-checked", l.code === lang ? "true" : "false");
      b.lang = l.code === "kz" ? "kk" : l.code;
      b.appendChild(el("span", "lang-name", l.name));
      b.appendChild(el("span", "lang-code", l.code === lang ? "●" : l.short));
      b.addEventListener("click", function () { setLang(l.code); });
      langMenu.appendChild(b);
    });
  }
  function setMenu(open, focusFirst) {
    langMenuOpen = open;
    langMenu.hidden = !open;
    langBtn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open && focusFirst) {
      var cur = langMenu.querySelector('[aria-checked="true"]') || langMenu.firstChild;
      if (cur) cur.focus();
    }
  }
  langBtn.addEventListener("click", function (e) {
    setMenu(!langMenuOpen, e.detail === 0);   // keyboard activation → move focus in
  });
  document.addEventListener("click", function (e) {
    if (langMenuOpen && !langWrap.contains(e.target)) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (!langMenuOpen) return;
    if (e.key === "Escape") { setMenu(false); langBtn.focus(); return; }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      var items = Array.prototype.slice.call(langMenu.children);
      var i = items.indexOf(document.activeElement);
      i = e.key === "ArrowDown" ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
      items[i].focus();
      e.preventDefault();
    }
  });
  langWrap.addEventListener("focusout", function (e) {
    if (langMenuOpen && e.relatedTarget && !langWrap.contains(e.relatedTarget)) setMenu(false);
  });

  function flash() {
    if (reduceMotion) return;
    var f = document.getElementById("flash");
    clearTimeout(flashTimer);
    f.hidden = false;
    flashTimer = setTimeout(function () { f.hidden = true; }, FLASH_MS);
  }

  /* ---- render ------------------------------------------------------------ */
  function renderAll() {
    document.documentElement.lang = lang === "kz" ? "kk" : lang;
    renderLangMenu();
    renderHero();
    renderReleases();
    renderVideos();
    renderConcerts();
    renderFooter();
  }

  function setLang(next) {
    var hadFocus = langMenu.contains(document.activeElement);
    setMenu(false);
    if (hadFocus) langBtn.focus();
    if (CODES.indexOf(next) === -1 || next === lang) return;
    lang = next;
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
    renderAll();
    flash();
  }

  /* ---- scroll spy for the nav ------------------------------------------- */
  function initScrollSpy() {
    if (!("IntersectionObserver" in window)) return;
    var links = {};
    document.querySelectorAll(".nav-link").forEach(function (a) {
      links[a.getAttribute("href").slice(1)] = a;
    });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        document.querySelectorAll(".nav-link").forEach(function (l) { l.removeAttribute("aria-current"); });
        var a = links[en.target.id];
        if (a) a.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { obs.observe(s); });
  }

  /* ---- boot -------------------------------------------------------------- */
  document.documentElement.setAttribute("data-covers", SITE.coverStyle === "color" ? "color" : "bw");
  renderAll();
  initScrollSpy();

  var hd = SITE.heroDither || {};
  var canvas = document.getElementById("dither");
  if (window.Dither && canvas) {
    window.Dither(canvas, {
      src: hasPath(hd.photo) ? hd.photo : "img/dododowson.jpeg",
      pixel: 3, focusX: 0.5, focusY: 0.5,
      contrast: 1.9, brightness: 0.02, spread: 0.6,
      ink: 226, bg: 0, fps: 7,
      animate: hd.animate !== false,
      mobile: { pixel: 2, focusY: 0.3 }
    });
  }
})();
