/* ============================================================================
   dododowson — SITE CONTENT
   ----------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT to update the website.
   Change the text, add albums / videos / concerts, then save. That's it.

   Rules of thumb:
   - Keep the quotes "…" and the commas. Every item ends with a comma.
   - Text that appears in 3 languages looks like:  { kz: "…", ru: "…", en: "…" }
   - Links must start with https://
   - Dates are YYYY-MM-DD (year-month-day), e.g. "2026-08-14"
   - Images go in the img/ folder; write the path like "img/album1.jpg"
     (Leave cover/poster/photo as "" to show an elegant placeholder tile.)
   ========================================================================== */

window.SITE = {

  /* Default language shown on first visit: "kz", "ru", or "en" */
  defaultLang: "ru",

  /* ---- Interface labels (buttons, headings). Usually no need to touch. ---- */
  ui: {
    kz: { music: "Музыка", videos: "Клиптер", concerts: "Концерттер", about: "Туралы",
          listen: "Тыңдау", tickets: "Билеттер", upcoming: "Алдағы концерттер",
          past: "Өткен концерттер", noShows: "Жаңа күндер жақында жарияланады.",
          booking: "Байланыс", feat: "қатысуымен", play: "Ойнату" },
    ru: { music: "Музыка", videos: "Клипы", concerts: "Концерты", about: "Обо мне",
          listen: "Слушать", tickets: "Билеты", upcoming: "Ближайшие концерты",
          past: "Прошедшие концерты", noShows: "Новые даты скоро будут объявлены.",
          booking: "Связь", feat: "при участии", play: "Смотреть" },
    en: { music: "Music", videos: "Videos", concerts: "Concerts", about: "About",
          listen: "Listen", tickets: "Tickets", upcoming: "Upcoming shows",
          past: "Past shows", noShows: "New dates announced soon.",
          booking: "Booking", feat: "feat.", play: "Play" }
  },

  /* ---------------------------------- HERO -------------------------------- */
  hero: {
    eyebrow: "est. mmxxvi",
    tagline: { kz: "Қараңғылықтан туған форма.",
               ru: "Форма, найденная во тьме.",
               en: "Form found in the dark." }
  },

  /* -------------------------------- ALBUMS -------------------------------- */
  /* Add a new release by copying one { … } block and editing it.            */
  albums: [
    {
      title: "Түн / Noise",
      year: 2026,
      cover: "",                       // e.g. "img/album1.jpg"
      features: ["ALEM"],              // guests on the record (leave [] if none)
      links: {
        spotify: "https://open.spotify.com/",
        apple:   "https://music.apple.com/",
        youtube: "https://music.youtube.com/"
      }
    },
    {
      title: "Grey Season",
      year: 2026,
      cover: "",
      features: [],
      links: {
        spotify: "https://open.spotify.com/",
        apple:   "https://music.apple.com/",
        youtube: "https://music.youtube.com/"
      }
    },
    {
      title: "Almaty Nights — EP",
      year: 2025,
      cover: "",
      features: ["Nurbek", "MONA"],
      links: {
        spotify: "https://open.spotify.com/",
        apple:   "https://music.apple.com/",
        youtube: "https://music.youtube.com/"
      }
    }
  ],

  /* -------------------------------- VIDEOS -------------------------------- */
  /* youtubeId is the part after "v=" in a YouTube link:                      */
  /* https://www.youtube.com/watch?v=dQw4w9WgXcQ  ->  youtubeId: "dQw4w9WgXcQ"*/
  videos: [
    { title: { kz: "Түн — клип", ru: "Түн — клип", en: "Түн — Official Video" },
      youtubeId: "", poster: "" },
    { title: { kz: "Grey Season", ru: "Grey Season", en: "Grey Season" },
      youtubeId: "", poster: "" },
    { title: { kz: "Live @ Almaty", ru: "Live @ Almaty", en: "Live @ Almaty" },
      youtubeId: "", poster: "" }
  ],

  /* ------------------------------- CONCERTS ------------------------------- */
  /* Past dates move to "Past shows" automatically. Just keep adding rows.    */
  concerts: [
    { date: "2026-08-14", city: { kz: "Алматы", ru: "Алматы", en: "Almaty" },
      venue: "Almaty Arena", tickets: "https://" },
    { date: "2026-09-05", city: { kz: "Астана", ru: "Астана", en: "Astana" },
      venue: "Barys Arena", tickets: "https://" },
    { date: "2026-10-12", city: { kz: "Шымкент", ru: "Шымкент", en: "Shymkent" },
      venue: "Central Stadium", tickets: "https://" },
    { date: "2026-01-20", city: { kz: "Алматы", ru: "Алматы", en: "Almaty" },
      venue: "Forte Club", tickets: "" }
  ],

  /* -------------------------------- ABOUT --------------------------------- */
  about: {
    photo: "",                          // e.g. "img/press.jpg"
    bio: {
      kz: "dododowson — Қазақстанның жаңа буын рэп-әртісі. Оның дауысы қала түндерінің салқындығы мен ішкі жарықтың арасында өмір сүреді.",
      ru: "dododowson — рэп-артист нового поколения из Казахстана. Его звук живёт между холодом городских ночей и внутренним светом.",
      en: "dododowson is a new-generation rap artist from Kazakhstan. His sound lives between the cold of city nights and an inner light."
    },
    contact: {
      booking:   "booking@dododowson.com",
      instagram: "https://instagram.com/",
      tiktok:    "https://tiktok.com/",
      youtube:   "https://youtube.com/"
    }
  }
};
