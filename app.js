/* dododowson — renderer & interactions
   Reads window.SITE (content.js) and builds every section.
   Vanilla JS, no dependencies. Runs on file:// and over https alike. */
(function () {
  "use strict";

  var SITE = window.SITE;
  if (!SITE) { console.error("content.js failed to load — SITE is undefined"); return; }

  var LANGS = ["kz", "ru", "en"];
  var STORE_KEY = "dododowson.lang";

  /* ---- language state ---------------------------------------------------- */
  function pickInitialLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORE_KEY); } catch (e) {}
    if (saved && LANGS.indexOf(saved) !== -1) return saved;
    var nav = (navigator.language || "").slice(0, 2).toLowerCase();
    if (LANGS.indexOf(nav) !== -1) return nav;
    return (SITE.defaultLang && LANGS.indexOf(SITE.defaultLang) !== -1) ? SITE.defaultLang : "ru";
  }
  var lang = pickInitialLang();

  /* ---- tiny helpers ------------------------------------------------------ */
  function t(v) {                       // resolve a {kz,ru,en} object or a plain string
    if (v == null) return "";
    if (typeof v === "string") return v;
    return v[lang] || v.en || v.ru || v.kz || "";
  }
  function ui(key) { return (SITE.ui[lang] && SITE.ui[lang][key]) || (SITE.ui.en && SITE.ui.en[key]) || key; }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function safeUrl(u) {                  // only allow real outbound links
    return (typeof u === "string" && /^https?:\/\//i.test(u)) ? u : null;
  }
  function extLink(href, cls, label) {
    var a = el("a", cls, label);
    a.href = href; a.target = "_blank"; a.rel = "noopener noreferrer";
    return a;
  }
  function coverTile(src, alt) {         // <img> or an elegant placeholder
    if (safeUrlOrPath(src)) {
      var img = el("img", "tile-img");
      img.src = src; img.alt = alt || ""; img.loading = "lazy";
      img.onerror = function () { img.replaceWith(placeholder()); };
      return img;
    }
    return placeholder();
  }
  function safeUrlOrPath(s) { return typeof s === "string" && s.trim() !== ""; }
  function placeholder() {
    var d = el("div", "tile-ph");
    d.setAttribute("aria-hidden", "true");
    return d;
  }

  /* ---- MUSIC ------------------------------------------------------------- */
  function renderMusic() {
    var grid = document.getElementById("music-grid");
    grid.innerHTML = "";
    (SITE.albums || []).forEach(function (al) {
      var card = el("article", "card");
      var art = el("div", "card-art");
      art.appendChild(coverTile(al.cover, al.title));
      card.appendChild(art);

      var body = el("div", "card-body");
      body.appendChild(el("h3", "card-title", al.title));
      var meta = String(al.year || "");
      if (al.features && al.features.length) meta += "  ·  " + ui("feat") + " " + al.features.join(", ");
      body.appendChild(el("p", "card-meta", meta));

      var links = el("div", "card-links");
      var order = [["spotify", "Spotify"], ["apple", "Apple"], ["youtube", "YouTube"]];
      order.forEach(function (p) {
        var href = safeUrl(al.links && al.links[p[0]]);
        if (href) links.appendChild(extLink(href, "chip", p[1]));
      });
      if (links.childNodes.length) body.appendChild(links);
      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  /* ---- VIDEOS (click-to-play facade) ------------------------------------- */

  /* Optional looping preview that fades in over the still frame on hover.
     Accepts .mp4/.webm (preferred — far smaller than a GIF) or .gif.
     Nothing is downloaded until the pointer actually reaches the tile, and if
     the file is missing the layer removes itself and the still frame stays. */
  function previewLayer(src, frame) {
    var isGif = /\.gif($|\?)/i.test(src);
    var node;

    if (isGif) {
      node = el("img", "video-preview");
      node.alt = "";
      node.dataset.src = src;                 // real src set on first hover
    } else {
      node = document.createElement("video");
      node.className = "video-preview";
      node.muted = true; node.loop = true; node.playsInline = true;
      node.setAttribute("muted", "");          // Safari wants the attribute too
      node.setAttribute("playsinline", "");
      node.preload = "none";
      node.dataset.src = src;
    }
    node.addEventListener("error", function () { node.remove(); });

    /* Only ever reveal the layer once it can actually paint a frame —
       otherwise a missing or still-loading file shows as a black box. */
    var started = false, ready = false, wanted = false;
    function markReady() { ready = true; if (wanted) node.classList.add("is-on"); }
    node.addEventListener(isGif ? "load" : "loadeddata", markReady);

    function start() {
      wanted = true;
      if (!started) {
        started = true;
        node.src = node.dataset.src;
        if (!isGif) node.preload = "auto";
      }
      if (!isGif) {
        var p = node.play();
        if (p && p.catch) p.catch(function () {});   // autoplay refusal is fine
      }
      if (ready) node.classList.add("is-on");
    }
    function stop() {
      wanted = false;
      node.classList.remove("is-on");
      if (!isGif && node.pause) node.pause();
    }
    frame.addEventListener("mouseenter", start);
    frame.addEventListener("focus", start);
    frame.addEventListener("mouseleave", stop);
    frame.addEventListener("blur", stop);
    return node;
  }

  function renderVideos() {
    var grid = document.getElementById("videos-grid");
    grid.innerHTML = "";
    (SITE.videos || []).forEach(function (v) {
      var wrap = el("article", "video");
      var frame = el("button", "video-frame");
      frame.type = "button";
      frame.setAttribute("aria-label", ui("play") + " — " + t(v.title));

      var posterSrc = safeUrlOrPath(v.poster) ? v.poster
        : (v.youtubeId ? "https://i.ytimg.com/vi/" + encodeURIComponent(v.youtubeId) + "/hqdefault.jpg" : "");

      var media = el("div", "video-media");
      media.appendChild(coverTile(posterSrc, t(v.title)));
      if (safeUrlOrPath(v.preview)) media.appendChild(previewLayer(v.preview, frame));
      frame.appendChild(media);
      frame.appendChild(el("span", "video-play", "▸"));

      frame.addEventListener("click", function () {
        if (!v.youtubeId) return;       // nothing to play yet (placeholder)
        var iframe = document.createElement("iframe");
        iframe.className = "video-embed";
        iframe.src = "https://www.youtube-nocookie.com/embed/" +
          encodeURIComponent(v.youtubeId) + "?autoplay=1&rel=0";
        iframe.title = t(v.title);
        iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        frame.replaceWith(iframe);
      });

      wrap.appendChild(frame);

      var meta = el("div", "video-meta");
      meta.appendChild(el("p", "video-title", t(v.title)));
      // Fallback: embeds are blocked when the page is opened straight from disk
      // (file://), so always offer the video on YouTube itself.
      if (v.youtubeId) {
        meta.appendChild(extLink(
          "https://www.youtube.com/watch?v=" + encodeURIComponent(v.youtubeId),
          "video-link", "YouTube ↗"));
      }
      wrap.appendChild(meta);
      grid.appendChild(wrap);
    });
  }

  /* ---- CONCERTS ---------------------------------------------------------- */
  var MONTHS = {
    kz: ["қаң","ақп","нау","сәу","мам","мау","шіл","там","қыр","қаз","қар","жел"],
    ru: ["янв","фев","мар","апр","мая","июн","июл","авг","сен","окт","ноя","дек"],
    en: ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
  };
  function fmtDate(iso) {
    var p = String(iso).split("-");
    if (p.length !== 3) return iso;
    var mo = (MONTHS[lang] || MONTHS.en)[parseInt(p[1], 10) - 1] || p[1];
    return { day: p[2], mon: mo, year: p[0] };
  }
  function concertRow(c, isPast) {
    var row = el("div", "show" + (isPast ? " show-past" : ""));
    var d = fmtDate(c.date);
    var date = el("div", "show-date");
    date.appendChild(el("span", "show-day", d.day || ""));
    date.appendChild(el("span", "show-mon", d.mon || ""));
    row.appendChild(date);

    var info = el("div", "show-info");
    info.appendChild(el("span", "show-city", t(c.city)));
    if (c.venue) info.appendChild(el("span", "show-venue", c.venue));
    row.appendChild(info);

    var href = safeUrl(c.tickets);
    if (!isPast && href) row.appendChild(extLink(href, "chip chip-solid", ui("tickets")));
    return row;
  }
  function renderConcerts() {
    var box = document.getElementById("concerts-body");
    box.innerHTML = "";
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var list = (SITE.concerts || []).slice().sort(function (a, b) {
      return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    });
    var upcoming = list.filter(function (c) { return new Date(c.date) >= today; });
    var past = list.filter(function (c) { return new Date(c.date) < today; }).reverse();

    box.appendChild(el("h3", "shows-heading", ui("upcoming")));
    if (upcoming.length) {
      var u = el("div", "shows");
      upcoming.forEach(function (c) { u.appendChild(concertRow(c, false)); });
      box.appendChild(u);
    } else {
      box.appendChild(el("p", "shows-empty", ui("noShows")));
    }

    if (past.length) {
      var det = el("details", "shows-past");
      var sum = el("summary", null, ui("past"));
      det.appendChild(sum);
      var pWrap = el("div", "shows");
      past.forEach(function (c) { pWrap.appendChild(concertRow(c, true)); });
      det.appendChild(pWrap);
      box.appendChild(det);
    }
  }

  /* ---- ABOUT ------------------------------------------------------------- */
  function renderAbout() {
    var a = SITE.about || {};
    var photo = document.getElementById("about-photo");
    photo.innerHTML = "";
    photo.appendChild(coverTile(a.photo, "dododowson"));

    document.getElementById("about-bio").textContent = t(a.bio);

    var links = document.getElementById("about-links");
    links.innerHTML = "";
    var c = a.contact || {};
    if (c.booking) {
      var mail = el("a", "chip", ui("booking"));
      mail.href = "mailto:" + c.booking;
      links.appendChild(mail);
    }
    [["instagram", "Instagram"], ["tiktok", "TikTok"], ["youtube", "YouTube"]].forEach(function (p) {
      var href = safeUrl(c[p[0]]);
      if (href) links.appendChild(extLink(href, "chip", p[1]));
    });
  }

  /* ---- static UI text (nav, headings, hero) ------------------------------ */
  function renderChrome() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-ui]").forEach(function (n) {
      n.textContent = ui(n.getAttribute("data-ui"));
    });
    var h = SITE.hero || {};
    var eb = document.querySelector(".eyebrow");
    if (eb && h.eyebrow) eb.textContent = h.eyebrow;
    var tg = document.querySelector(".tagline");
    if (tg) tg.textContent = t(h.tagline);
    document.querySelectorAll(".lang-btn").forEach(function (b) {
      b.setAttribute("aria-current", b.dataset.lang === lang ? "true" : "false");
    });
  }

  function renderAll() {
    renderChrome();
    renderMusic();
    renderVideos();
    renderConcerts();
    renderAbout();
  }

  /* ---- language switch --------------------------------------------------- */
  function setLang(next) {
    if (LANGS.indexOf(next) === -1 || next === lang) return;
    lang = next;
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
    renderAll();
  }

  /* ---- scroll spy for the nav ------------------------------------------- */
  function initScrollSpy() {
    var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
    var links = {};
    document.querySelectorAll(".nav-link").forEach(function (a) {
      links[a.getAttribute("href").slice(1)] = a;
    });
    if (!("IntersectionObserver" in window)) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var a = links[en.target.id];
        if (a && en.isIntersecting) {
          document.querySelectorAll(".nav-link").forEach(function (l) { l.removeAttribute("aria-current"); });
          a.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { obs.observe(s); });
  }

  /* ---- boot -------------------------------------------------------------- */
  document.querySelectorAll(".lang-btn").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.lang); });
  });
  renderAll();
  initScrollSpy();

  // reveal-on-scroll (respects reduced motion)
  if ("IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var rev = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); o.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    document.querySelectorAll(".reveal").forEach(function (n) { rev.observe(n); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (n) { n.classList.add("in"); });
  }
})();
