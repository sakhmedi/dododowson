/* ============================================================================
   dododowson — SITE CONTENT
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
     (Leave cover/poster as "" to show a plain placeholder tile.)
   ========================================================================== */

window.SITE = {

  /* Default language shown on first visit: "kz", "ru", or "en" */
  defaultLang: "ru",

  /* Album covers and video thumbnails:
       "bw"    — greyscale
       "color" — original colours                                              */
  coverStyle: "color",

  /* Portrait at the top of the page, drawn as a live black-and-white dither.
     animate: false  — keep it still (it is also still for visitors who turned
                       off animations in their system settings).               */
  heroDither: { photo: "img/dododowson.jpeg", animate: true },

  /* ---- Interface labels. Usually no need to touch. ----
     Section titles and the menu ("Releases", "Videos", "Concerts") are always
     in English on purpose — they are not translated.                          */
  ui: {
    kz: { latest: "Жаңа релиз", listen: "Тыңдау", watch: "Көру",
          single: "Сингл", ep: "EP", album: "Альбом",
          bio: "Жаңа музыка — барлық платформаларда.",
          noShows: "Концерт күндері жақында жарияланады.",
          follow: "Анонстар — Instagram-да", lang: "Тіл",
          tickets: "Билеттер", past: "Өткен концерттер" },
    ru: { latest: "Новый релиз", listen: "Слушать", watch: "Смотреть",
          single: "Сингл", ep: "EP", album: "Альбом",
          bio: "Новая музыка — уже на всех площадках.",
          noShows: "Даты концертов будут объявлены позже.",
          follow: "Анонсы — в Instagram", lang: "Язык",
          tickets: "Билеты", past: "Прошедшие концерты" },
    en: { latest: "New release", listen: "Listen", watch: "Watch",
          single: "Single", ep: "EP", album: "Album",
          bio: "New music out now on all platforms.",
          noShows: "Tour dates will be announced soon.",
          follow: "Announcements on Instagram", lang: "Language",
          tickets: "Tickets", past: "Past shows" }
  },

  /* Official profiles (footer + concerts button). */
  links: {
    instagram: "https://www.instagram.com/dododowson/",
    youtube:   "https://www.youtube.com/@dododowson",
    spotify:   "https://open.spotify.com/artist/6fTZMQt93BHLcHHX1DTSbn",
    apple:     "https://music.apple.com/us/artist/dododowson/1544969924"
  },

  /* -------------------------------- ALBUMS -------------------------------- */
  /* Newest first — the FIRST one is shown as "New release" at the top.        */
  /* Titles, years and links taken from the artist's own Apple Music and       */
  /* Spotify pages. type: "single", "ep" or "album".                           */
  /* `features` = artists actually credited on the release. Every cover in     */
  /* img/ was checked against the official artwork for that exact release —    */
  /* never point a cover at the wrong release's art.                           */
  albums: [
    {
      title: "Barajatr",
      type: "single",
      year: 2026,
      cover: "img/barajatr.jpeg",
      features: ["dudeontheguitar"],
      links: {
        spotify: "https://open.spotify.com/album/4enQITXdpEQuQgH3AngeuI",
        apple:   "https://music.apple.com/us/album/barajatr-single/1885101091"
      }
    },
    {
      title: "sart-sūrt",
      type: "ep",
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
      type: "single",
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
      type: "single",
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
      type: "single",
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
      type: "single",
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
      type: "single",
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
      type: "single",
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
      type: "single",
      year: 2025,
      cover: "img/qum.jpeg",
      features: [],
      links: {
        spotify: "https://open.spotify.com/album/266gAz9jJKCyo7PsoSRwAp",
        apple:   "https://music.apple.com/us/album/qum-single/1809380560"
      }
    },
    {
      title: "EX.DOWSON",
      type: "ep",
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
      type: "album",
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
  /* Every ID below was checked to resolve to the titled video. Artist and     */
  /* title are written as published (not translated).                          */
  /*                                                                          */
  /* On hover the tile flips through YouTube's own preview frames by itself.   */
  /* preview: optional short looping clip to play on hover instead.            */
  /*   - use .mp4 or .webm, NOT .gif (same 3 seconds: ~150KB vs ~4MB)          */
  /*   - 3-6 seconds, no sound needed (it is muted either way), ~640px wide    */
  /*   - put the file in img/ and write it like "img/preview-666.mp4"          */
  videos: [
    { artist: "dododowson", title: "sheshimdi qabylda",
      youtubeId: "KCXEcZ6-f3U", poster: "", preview: "" },

    { artist: "dododowson, bir kyz", title: "Neverland",
      youtubeId: "ht1iExxqOlI", poster: "", preview: "" },

    { artist: "dododowson x dudeontheguitar", title: "auen | ÄUEN LIVE",
      youtubeId: "LSX2Xgfzy30", poster: "", preview: "" },

    { artist: "DODODOWSON", title: "ALMATY UIQTAMAID",
      youtubeId: "6AJTe210d2U", poster: "", preview: "" },

    { artist: "dudeontheguitar x dododowson", title: "Barajatr",
      youtubeId: "lN0NpQMB1lI", poster: "", preview: "" },

    { artist: "dododowson, Legion", title: "PAKET",
      youtubeId: "3c-B9oZ59go", poster: "", preview: "" }
  ],

  /* ------------------------------- CONCERTS ------------------------------- */
  /* Intentionally empty: no tour dates have been publicly announced that could */
  /* be verified. NEVER put a made-up show here — the site shows a polite       */
  /* "dates will be announced" line on its own. Add a row only from an official */
  /* announcement, e.g.:                                                        */
  /*   { date: "2026-08-14", city: { kz: "Алматы", ru: "Алматы", en: "Almaty" },*/
  /*     venue: "…", tickets: "https://…" },                                    */
  concerts: []
};
