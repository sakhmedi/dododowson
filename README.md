# dododowson

Website of **dododowson**, a rapper from Kazakhstan. Every release links out to the official platforms.
A single scrolling page: Hero → Releases → Videos → Concerts. Trilingual (KZ / RU / EN);
section titles and the menu stay in English on purpose.

No build step, no framework. Just open `index.html` in a browser.

---

## ⚠️ The one rule: only verified information

This page is about a real person. Everything in `content.js` — every release, year,
link and video ID — was checked against the artist's own pages:

| | |
|---|---|
| Apple Music | <https://music.apple.com/us/artist/dododowson/1544969924> |
| Spotify | <https://open.spotify.com/artist/6fTZMQt93BHLcHHX1DTSbn> |
| YouTube | <https://www.youtube.com/@dododowson> |
| Instagram | <https://www.instagram.com/dododowson/> |

If you can't confirm something on one of those, **leave it out**. Blank fields are a
supported state — the site renders placeholder tiles and a "no announced dates" line
without looking broken. Never invent a tour date, a quote, a bio detail or a collaborator.

Also: don't publish anyone's personal contact details here (phone numbers, private
emails), even if you found them on a public profile.

---

## ✏️ How to update the site

**You only ever edit one file: `content.js`.** Open it in any text editor.
Change the text between the quotes, save, refresh the page. Nothing else to touch.

A few rules:
- Keep every `"quote"` and every `,` comma in place.
- Text shown in all 3 languages looks like `{ kz: "…", ru: "…", en: "…" }`.
- Links must start with `https://`.
- Dates are `YYYY-MM-DD` (e.g. `"2026-08-14"`).

### Add an album
Copy one `{ … }` block inside `albums: [ … ]` and edit the title, `type` (`"single"`, `"ep"` or
`"album"`), year, features and links. Put the newest first — the first one is shown as
"New release" at the top. Releases are grouped by year automatically.

If a new featured artist appears, add their Kazakh "with" ending to `kzWith`
(e.g. `dudeontheguitar’мен бірге`). The rule is written next to `kzWith` in `content.js`.

### Add a music video
Add a block to `videos: [ … ]` with `artist`, `title` and `youtubeId` — the code after `v=` in a YouTube URL:
`youtube.com/watch?v=`**`dQw4w9WgXcQ`** → `youtubeId: "dQw4w9WgXcQ"`.
(The thumbnail and the hover preview frames are pulled from YouTube automatically; the video only
loads when clicked. Opened straight from disk (`file://`), YouTube refuses to play embeds — use the
"YouTube ↗" link, or view the site on GitHub Pages.)

### Add a concert
`concerts: [ … ]` is deliberately **empty** — no shows have been publicly announced that could
be verified. Add a row only from an official announcement. **Past dates move to “Past shows”
automatically** — you never need to delete old ones.

### Change a language / tagline
Edit the matching `kz` / `ru` / `en` text in `ui` (the tagline is `bio`). The `defaultLang` at the top
sets the first-visit language.

### Colour or black-and-white covers
`coverStyle: "bw"` shows album covers and video thumbnails in greyscale; `"color"` shows the originals.
`heroDither.animate: false` stops the grain on the portrait at the top.

---

## 🖼 Images (optional)

Placeholders show automatically, so images aren't required. To add real art, drop files in
the `img/` folder and point to them in `content.js`, e.g. `cover: "img/album1.jpg"`.

- Album covers: square (1:1), ~1000×1000px
- Hero portrait: `img/dododowson.jpeg` (`heroDither.photo` in `content.js`)
- `img/og.jpg`: a 1200×630px image used when the link is shared on Telegram/Instagram

---

## 🌐 Publishing it online (free)

The site is static, so it can be hosted for free on **GitHub Pages**:
1. Push this repo to GitHub.
2. Repo **Settings → Pages → Build from branch → `main` / root**.
3. Your site goes live at `https://<username>.github.io/dododowson`.

A custom domain (e.g. `dododowson.com`) can be pointed at it later.
Netlify or Vercel (drag-and-drop the folder) work the same way.

---

## Files

| File | What it is |
|------|------------|
| `content.js` | **All content + translations — the file you edit.** |
| `index.html` | Page structure (rarely touched). |
| `styles.css` | Look & feel. |
| `app.js` | Builds the sections from `content.js`. |
| `dither.js` | The live black-and-white dither portrait in the hero. |
| `fonts.css` | Latin-only display/mono fonts (Cyrillic falls back to Onest). |
