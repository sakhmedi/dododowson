/* ============================================================================
   dododowson — SITE CONTENT  (unofficial fan page)
   ----------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT to update the website.

   ONE RULE ABOVE ALL: only put in things you can verify.
   Every release, link and video ID below was checked against the artist's own
   pages (Apple Music, Spotify, YouTube) in July 2026. If you can't confirm
   something on one of those pages, leave it blank — the site is built to look
   good with empty fields. Do NOT invent tour dates, quotes or bios.

   Sources used:
     Apple Music   https://music.apple.com/us/artist/dododowson/1544969924
     Spotify       https://open.spotify.com/artist/6fTZMQt93BHLcHHX1DTSbn
     YouTube       https://www.youtube.com/@dododowson
     Instagram     https://www.instagram.com/dododowson/

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
          past: "Өткен концерттер", noShows: "Жарияланған концерт күндері жоқ.",
          booking: "Байланыс", feat: "қатысуымен", play: "Ойнату",
          disclaimer: "Бейресми фан-парақша. Әртіспен байланысты емес. " +
                      "Барлық музыка ресми платформаларда." },
    ru: { music: "Музыка", videos: "Клипы", concerts: "Концерты", about: "Об артисте",
          listen: "Слушать", tickets: "Билеты", upcoming: "Ближайшие концерты",
          past: "Прошедшие концерты", noShows: "Объявленных дат нет.",
          booking: "Связь", feat: "при участии", play: "Смотреть",
          disclaimer: "Неофициальная фан-страница. Не связана с артистом. " +
                      "Вся музыка — на официальных платформах." },
    en: { music: "Music", videos: "Videos", concerts: "Concerts", about: "About",
          listen: "Listen", tickets: "Tickets", upcoming: "Upcoming shows",
          past: "Past shows", noShows: "No announced dates.",
          booking: "Booking", feat: "feat.", play: "Play",
          disclaimer: "Unofficial fan page. Not affiliated with the artist. " +
                      "All music is on the official platforms." }
  },

  /* ---------------------------------- HERO -------------------------------- */
  hero: {
    /* First release ("Bir Kase Suuu") came out in April 2020. */
    eyebrow: "since 2020",
    tagline: { kz: "Қазақстаннан шыққан рэп.",
               ru: "Рэп из Казахстана.",
               en: "Rap from Kazakhstan." }
  },

  /* -------------------------------- ALBUMS -------------------------------- */
  /* Newest first. Titles, years and links taken from the artist's own Apple   */
  /* Music and Spotify pages. `features` = artists actually credited on the    */
  /* release. Every cover in img/ was checked against the official artwork for  */
  /* that exact release — never point a cover at the wrong release's art.       */
  albums: [
    {
      title: "Barajatr",
      year: 2026,
      cover: "img/barajatr.jpeg",
      features: ["dudeontheguitar"],
      links: {
        spotify: "https://open.spotify.com/album/4enQITXdpEQuQgH3AngeuI",
        apple:   "https://music.apple.com/us/album/barajatr-single/1885101091"
      }
    },
    {
      title: "sart-sūrt — EP",
      year: 2026,
      cover: "img/sart-surt.jpg",
      features: ["Atlass", "Legion"],
      links: {
        spotify: "https://open.spotify.com/album/2LT5VpUFwJhxdLXcliH8KP",
        apple:   "https://music.apple.com/us/album/sart-s%C5%ABrt-ep/1876273277"
      }
    },
    {
      title: "Almaty uiqtamaid",
      year: 2026,
      cover: "img/almaty-uiqtamaid.jpg",
      features: [],
      links: {
        spotify: "https://open.spotify.com/album/7edbEpAMkfM3x7rrO7LDZx",
        apple:   "https://music.apple.com/us/album/almaty-uiqtamaid-single/1873092083"
      }
    },
    {
      title: "666",
      year: 2026,
      cover: "img/666.jpg",
      features: [],
      links: {
        spotify: "https://open.spotify.com/album/4bKpc8xzaY4KlN0sqXiV00",
        apple:   "https://music.apple.com/us/album/666-single/1869083475"
      }
    },
    {
      title: "offline",
      year: 2025,
      cover: "img/offline.jpg",
      features: [],
      links: {
        spotify: "https://open.spotify.com/album/4cPqgUO5CHd44a17pcFYTO",
        apple:   "https://music.apple.com/us/album/offline-single/1854151225"
      }
    },
    {
      title: "ауа",
      year: 2025,
      cover: "img/aya.jpeg",
      features: [],
      links: {
        spotify: "https://open.spotify.com/album/3IDV2QRo7yRG7u0ePSpyvw",
        apple:   "https://music.apple.com/us/album/%D0%B0%D1%83%D0%B0-single/1837762894"
      }
    },
    {
      title: "5:00",
      year: 2025,
      cover: "img/5-00.jpg",
      features: ["SHAKRAT"],
      links: {
        spotify: "https://open.spotify.com/album/0Kja4qUZEFMkDZYkYtB9h3",
        apple:   "https://music.apple.com/us/album/5-00-single/1833323667"
      }
    },
    {
      title: "ūmytu",
      year: 2025,
      cover: "img/umytu.jpg",
      features: ["Iceone"],
      links: {
        spotify: "https://open.spotify.com/album/71k0h8P2uV6DPKL292xdnp",
        apple:   "https://music.apple.com/us/album/%C5%ABmytu-single/1828537289"
      }
    },
    {
      title: "qum",
      year: 2025,
      cover: "img/qum.jpeg",
      features: [],
      links: {
        spotify: "https://open.spotify.com/album/266gAz9jJKCyo7PsoSRwAp",
        apple:   "https://music.apple.com/us/album/qum-single/1809380560"
      }
    },
    {
      title: "EX.DOWSON — EP",
      year: 2024,
      cover: "img/ex-dowson.jpeg",
      features: [],
      links: {
        spotify: "https://open.spotify.com/album/0eIcfR7wRIIptMuvjBV1AI",
        apple:   "https://music.apple.com/us/album/ex-dowson-ep/1746878078"
      }
    },
    {
      title: "YSTYQ BOLSYN DALA",
      year: 2023,
      cover: "img/ystyq-bolsyn-dala.jpeg",
      features: ["Atlass"],
      links: {
        spotify: "https://open.spotify.com/album/5Q45fTMBMAg8Zw9EJLrSZJ",
        apple:   "https://music.apple.com/us/album/ystyq-bolsyn-dala/1722358483"
      }
    }
  ],

  /* -------------------------------- VIDEOS -------------------------------- */
  /* youtubeId is the part after "v=" in a YouTube link:                       */
  /* https://www.youtube.com/watch?v=dQw4w9WgXcQ  ->  youtubeId: "dQw4w9WgXcQ" */
  /* Every ID below was checked to resolve to the titled video. Titles are     */
  /* left as published (they are not translated), so all 3 languages match.    */
  /*                                                                          */
  /* preview: optional short looping clip that fades in when the pointer is    */
  /* over the tile. Leave "" and the still frame simply stays.                 */
  /*   - use .mp4 or .webm, NOT .gif — same 3 seconds is ~150KB as mp4 and     */
  /*     ~4MB as a gif, and looks better                                       */
  /*   - 3-6 seconds, no sound needed (it is muted either way), ~640px wide    */
  /*   - put the file in img/ and write it like "img/preview-666.mp4"          */
  videos: [
    { title: { kz: "DODODOWSON — ALMATY UIQTAMAID",
               ru: "DODODOWSON — ALMATY UIQTAMAID",
               en: "DODODOWSON — ALMATY UIQTAMAID" },
      youtubeId: "6AJTe210d2U", poster: "", preview: "" },

    { title: { kz: "dododowson — 666", ru: "dododowson — 666", en: "dododowson — 666" },
      youtubeId: "WPMdtp1Jx30", poster: "", preview: "" },

    { title: { kz: "dudeontheguitar x dododowson — Barajatr",
               ru: "dudeontheguitar x dododowson — Barajatr",
               en: "dudeontheguitar x dododowson — Barajatr" },
      youtubeId: "lN0NpQMB1lI", poster: "", preview: "" },

    { title: { kz: "dododowson, iceone — litromantic (Lyrics Video)",
               ru: "dododowson, iceone — litromantic (Lyrics Video)",
               en: "dododowson, iceone — litromantic (Lyrics Video)" },
      youtubeId: "vJIQ_Olbzog", poster: "", preview: "" },

    { title: { kz: "dododowson — trump (Lyrics Video)",
               ru: "dododowson — trump (Lyrics Video)",
               en: "dododowson — trump (Lyrics Video)" },
      youtubeId: "5f1eOa7-8iI", poster: "", preview: "" },

    { title: { kz: "dododowson, Legion — PAKET",
               ru: "dododowson, Legion — PAKET",
               en: "dododowson, Legion — PAKET" },
      youtubeId: "3c-B9oZ59go", poster: "", preview: "" }
  ],

  /* ------------------------------- CONCERTS ------------------------------- */
  /* Intentionally empty: no tour dates have been publicly announced that could */
  /* be verified. NEVER put a made-up show here — the site shows a polite       */
  /* "no announced dates" line on its own. Add a row only from an official      */
  /* announcement, e.g.:                                                        */
  /*   { date: "2026-08-14", city: { kz: "Алматы", ru: "Алматы", en: "Almaty" },*/
  /*     venue: "…", tickets: "https://…" },                                    */
  concerts: [],

  /* -------------------------------- ABOUT --------------------------------- */
  about: {
    photo: "img/dododowson.jpeg",
    /* Facts only, all checkable on the streaming pages linked at the top. */
    bio: {
      kz: "dododowson — Қазақстаннан шыққан рэп-әртіс, қазақ және орыс тілдерінде " +
          "ән шығарады. Алғашқы релизі 2020 жылы жарық көрді. «YSTYQ BOLSYN DALA» " +
          "албомы Atlass-пен бірге 2023 жылы, «EX.DOWSON» EP-і 2024 жылы, " +
          "«sart-sūrt» EP-і 2026 жылы шықты. Iceone, Legion, Atlass, dudeontheguitar, " +
          "tellmetomyface және bir kyz сынды әртістермен бірге жазылған.",
      ru: "dododowson — рэп-исполнитель из Казахстана, читает на казахском и русском. " +
          "Первый релиз вышел в 2020 году. Альбом «YSTYQ BOLSYN DALA» вышел в 2023 году " +
          "совместно с Atlass, затем EP «EX.DOWSON» (2024) и EP «sart-sūrt» (2026). " +
          "Записывался с Iceone, Legion, Atlass, dudeontheguitar, tellmetomyface и bir kyz.",
      en: "dododowson is a rapper from Kazakhstan who releases music in Kazakh and " +
          "Russian. His first release came out in 2020. The album YSTYQ BOLSYN DALA " +
          "arrived in 2023 alongside Atlass, followed by the EPs EX.DOWSON (2024) and " +
          "sart-sūrt (2026). He has recorded with Iceone, Legion, Atlass, dudeontheguitar, " +
          "tellmetomyface and bir kyz."
    },
    /* No booking address here: this is a fan page, not the artist's management. */
    contact: {
      instagram: "https://www.instagram.com/dododowson/",
      youtube:   "https://www.youtube.com/@dododowson"
    }
  }
};
